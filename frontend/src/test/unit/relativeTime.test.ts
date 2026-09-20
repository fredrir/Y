import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatTimestamp } from "@/lib/dateUtils";

describe("relative timestamps", () => {
  const now = Date.UTC(2026, 8, 20, 12);
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });
  afterEach(() => vi.useRealTimers());

  it.each([
    [0, "Just now"],
    [59, "59s"],
    [60, "1m"],
    [3599, "59m"],
    [3600, "1h"],
    [86400, "1d"],
    [604800, "1w"],
  ])("formats %s seconds elapsed", (elapsed, expected) => {
    expect(formatTimestamp(now - Number(elapsed) * 1000)).toBe(expected);
  });

  it("accepts numeric timestamp strings", () => {
    expect(formatTimestamp(String(now - 60000))).toBe("1m");
  });

  it("rejects invalid timestamp text", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(formatTimestamp("invalid")).toBe("Invalid Timestamp");
    error.mockRestore();
  });
});
