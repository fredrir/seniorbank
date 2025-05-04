import React from "react";
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { formatCurrency } from "@/lib/utils";
import { BankAccount } from "@prisma/client";
import AccountCard from "@/app/(seniorbank)/konto/(components)/AccountCard";

vi.mock("next/link", () => ({
  default: ({
    href,
    className,
    children,
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
  }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ),
}));

vi.mock("@/lib/utils", () => ({
  formatCurrency: vi.fn((amount) => `${amount} kr`),
}));

describe("AccountCard", () => {
  const mockAccount: BankAccount = {
    id: "acc-123",
    name: "Brukskonto",
    balance: 5000,
    userId: "user-123",
    category: null,
    main: false,
    countryCode: "NO",
  };

  test("renders account name correctly", () => {
    render(<AccountCard account={mockAccount} />);

    expect(screen.getByText("Brukskonto")).toBeInTheDocument();
  });

  test("formats and displays account balance", () => {
    render(<AccountCard account={mockAccount} />);

    expect(formatCurrency).toHaveBeenCalledWith(5000);
    expect(screen.getByText("5000 kr")).toBeInTheDocument();
  });

  test("links to the correct account detail page", () => {
    render(<AccountCard account={mockAccount} />);

    const link = screen.getByTestId("next-link");
    expect(link).toHaveAttribute("href", "/konto/acc-123");
  });

  test("has the correct styling classes", () => {
    render(<AccountCard account={mockAccount} />);

    const link = screen.getByTestId("next-link");
    expect(link.className).toContain("group");
    expect(link.className).toContain("flex");

    const accountName = screen.getByText("Brukskonto");
    expect(accountName.className).toContain("text-seniorBankDarkBlue");
  });
});
