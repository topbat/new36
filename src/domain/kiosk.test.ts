import { afterEach, describe, expect, it, vi } from "vitest";

import { createIdleResetController, normalizeContinuationUrl } from "./kiosk";

describe("kiosk mode", () => {
  afterEach(() => vi.useRealTimers());

  it("resets to the museum home after the configured idle interval", () => {
    vi.useFakeTimers();
    const onReset = vi.fn();
    const controller = createIdleResetController({ timeoutMs: 1_000, onReset });
    controller.start();
    vi.advanceTimersByTime(800);
    controller.activity();
    vi.advanceTimersByTime(999);
    expect(onReset).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onReset).toHaveBeenCalledTimes(1);
    controller.dispose();
  });

  it("allows only same-origin continuation URLs", () => {
    expect(normalizeContinuationUrl("/exhibit/02", "https://museum.test")).toBe("https://museum.test/exhibit/02");
    expect(normalizeContinuationUrl("https://evil.test/x", "https://museum.test")).toBe("https://museum.test/");
  });
});
