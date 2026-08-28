export type Role = "viewer" | "editor" | "reviewer" | "publisher";
export type Action = "submit" | "request_changes" | "approve" | "publish" | "rollback";
export type ContentStatus = "draft" | "in_review" | "approved" | "changes_requested" | "published";

export type AuditEvent = {
  action: "create" | Action;
  actorId: string;
  role: Role;
  at: string;
  from: ContentStatus | null;
  to: ContentStatus;
};

export type GovernedContent = {
  stratagemId: string;
  body: string;
  status: ContentStatus;
  audit: AuditEvent[];
};

const permissions: Record<Role, Action[]> = {
  viewer: [],
  editor: ["submit"],
  reviewer: ["request_changes", "approve"],
  publisher: ["publish", "rollback"],
};

const transitions: Record<Action, Partial<Record<ContentStatus, ContentStatus>>> = {
  submit: { draft: "in_review", changes_requested: "in_review" },
  request_changes: { in_review: "changes_requested", approved: "changes_requested" },
  approve: { in_review: "approved" },
  publish: { approved: "published" },
  rollback: { published: "draft" },
};

export function can(role: Role, action: Action) {
  return permissions[role].includes(action);
}

export function createDraft(
  stratagemId: string,
  body: string,
  actorId: string,
  at = new Date().toISOString(),
): GovernedContent {
  return {
    stratagemId,
    body,
    status: "draft",
    audit: [{ action: "create", actorId, role: "editor", at, from: null, to: "draft" }],
  };
}

export function applyAction(
  content: GovernedContent,
  action: Action,
  role: Role,
  actorId: string,
  at = new Date().toISOString(),
): GovernedContent {
  if (!can(role, action)) throw new Error(`${role} 无权执行 ${action}`);
  const next = transitions[action][content.status];
  if (!next) throw new Error(`${content.status} 状态不能执行 ${action}`);
  return {
    ...content,
    status: next,
    audit: [...content.audit, { action, actorId, role, at, from: content.status, to: next }],
  };
}

export function compareVersions(
  before: Record<string, string>,
  after: Record<string, string>,
) {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .filter((field) => before[field] !== after[field])
    .map((field) => ({ field, before: before[field] ?? "", after: after[field] ?? "" }));
}
