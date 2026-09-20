import { describe, expect, it, vi } from "vitest";
import toast from "react-hot-toast";
import { isFileAllowed } from "@/lib/checkFile";

vi.mock("react-hot-toast", () => ({ default: { error: vi.fn() } }));

describe("image upload policy", () => {
  it.each(["image/png", "image/jpeg", "image/gif"])(
    "accepts %s up to 10MiB",
    (type) => {
      expect(
        isFileAllowed(
          new File([new Uint8Array(10 * 1024 * 1024)], "image", { type }),
        ),
      ).toBe(true);
    },
  );

  it("rejects an image above 10MiB", () => {
    expect(
      isFileAllowed(
        new File([new Uint8Array(10 * 1024 * 1024 + 1)], "image", {
          type: "image/png",
        }),
      ),
    ).toBe(false);
    expect(toast.error).toHaveBeenLastCalledWith(
      "File size must be less than 10MB",
    );
  });

  it.each(["image/svg+xml", "text/html", "application/pdf", ""])(
    "rejects unsupported type %s",
    (type) => {
      expect(isFileAllowed(new File(["content"], "file", { type }))).toBe(
        false,
      );
      expect(toast.error).toHaveBeenLastCalledWith("File type not supported");
    },
  );
});
