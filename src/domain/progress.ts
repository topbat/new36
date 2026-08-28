export const PROGRESS_STORAGE_KEY = "ai36.progress.v1";

export type ReviewRecord = {
  stratagemId: string;
  optionId: string;
  recordedAt: string;
};

export type ProgressState = {
  version: 1;
  favorites: string[];
  read: string[];
  reviews: ReviewRecord[];
};

export function createEmptyProgress(): ProgressState {
  return { version: 1, favorites: [], read: [], reviews: [] };
}

function unique(values: string[]) {
  return [...new Set(values)];
}

export function markRead(state: ProgressState, stratagemId: string): ProgressState {
  return { ...state, read: unique([...state.read, stratagemId]) };
}

export function toggleFavorite(state: ProgressState, stratagemId: string): ProgressState {
  const favorites = state.favorites.includes(stratagemId)
    ? state.favorites.filter((id) => id !== stratagemId)
    : [...state.favorites, stratagemId];
  return { ...state, favorites };
}

export function recordReview(
  state: ProgressState,
  stratagemId: string,
  optionId: string,
  recordedAt = new Date().toISOString(),
): ProgressState {
  return { ...state, reviews: [...state.reviews, { stratagemId, optionId, recordedAt }] };
}

export function parseProgress(raw: string | null): ProgressState {
  if (!raw) return createEmptyProgress();
  try {
    const value = JSON.parse(raw) as Partial<ProgressState>;
    if (
      value.version !== 1 ||
      !Array.isArray(value.favorites) ||
      !Array.isArray(value.read) ||
      !Array.isArray(value.reviews)
    ) return createEmptyProgress();
    return {
      version: 1,
      favorites: unique(value.favorites.filter((item): item is string => typeof item === "string")),
      read: unique(value.read.filter((item): item is string => typeof item === "string")),
      reviews: value.reviews.filter(
        (item): item is ReviewRecord =>
          typeof item === "object" && item !== null &&
          typeof item.stratagemId === "string" && typeof item.optionId === "string" &&
          typeof item.recordedAt === "string",
      ),
    };
  } catch {
    return createEmptyProgress();
  }
}

export function summarizeProgress(state: ProgressState) {
  return {
    readCount: state.read.length,
    favoriteCount: state.favorites.length,
    reviewCount: state.reviews.length,
  };
}
