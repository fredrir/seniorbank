import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { BankAccountCard } from "../(components)/BankAccountCard";

describe("BankAccountCard", () => {
  it("Renders correct link", () => {
    const mockBankAccount = {
      main: true,
      name:"Test bank account",
      id: "123",
      category: null,
      userId: "1",
      balance: 1000,
      countryCode: "No",
    };

    render(<BankAccountCard bankAccount={mockBankAccount} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/konto/123");
  });
});