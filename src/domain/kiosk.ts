export type IdleResetController = {
  start: () => void;
  activity: () => void;
  dispose: () => void;
};

export function createIdleResetController({
  timeoutMs,
  onReset,
}: {
  timeoutMs: number;
  onReset: () => void;
}): IdleResetController {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(onReset, timeoutMs);
  };
  return {
    start: schedule,
    activity: schedule,
    dispose: () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
    },
  };
}

export function normalizeContinuationUrl(path: string, origin: string) {
  try {
    const candidate = new URL(path, origin);
    return candidate.origin === origin ? candidate.href : `${origin}/`;
  } catch {
    return `${origin}/`;
  }
}
