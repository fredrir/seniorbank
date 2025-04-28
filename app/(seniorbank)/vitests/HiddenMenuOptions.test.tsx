import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import HiddenMenuOptions from "../(components)/HiddenMenuOptions";

describe("HiddenMenuOptions", () => {
  it("Renders menu options correctly", () => {
    const mockHiddenMenuOption = [
      {
        title: "option",
        description: "description",
        icon: <div>icon</div>,
        href: "/"
      },
    ];
    render(<HiddenMenuOptions hiddenMenuOptions={mockHiddenMenuOption} />);
    expect(screen.getByText("Flere handlinger")).toBeInTheDocument();
    const button = screen.getByText("Flere handlinger");
    fireEvent.click(button);
    expect(screen.getByText("description")).toBeInTheDocument();
  });
});