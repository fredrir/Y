import Footer from "@/components/ui/Footer";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the footer with the correct copyright year", () => {
    const { container } = render(<Footer />);
    const copyrightText = container.querySelector("p");

    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText?.textContent).toContain(
      new Date().getFullYear().toString(),
    );
  });

  it("renders correctly in the DOM", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
