import { describe, expect, it } from "vitest";
import AccountCard from "../konto/(components)/AccountCard";
import { render, screen } from "@testing-library/react";
import { BankAccount } from "@prisma/client";
import "@testing-library/jest-dom";


describe("AccountCard", () => {
  const mockAccount: BankAccount = {
    name: "Test account",
    id: "1",
    category: "Test category",
    userId: "1",
    balance: 1_000,
    main: true,
    countryCode: "NO",
  };
  it("Renders account name", () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText("Test account")).toBeInTheDocument();
  });
  it("Renders account balance", () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText(/1\s000\s?kr/i)).toBeInTheDocument();
  });
  it("Renders account link", () => {
    render(<AccountCard account={mockAccount} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/konto/1");
  });
});