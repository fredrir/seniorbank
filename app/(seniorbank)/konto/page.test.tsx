import React from "react";
import { expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { getSession } from "@/lib/auth";
import { bankAccountService } from "@/model/core";
import AccountOverviewPage from "./page";
import { BankAccount } from "@prisma/client";

// Mock the dependencies
vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/model/core", () => ({
  bankAccountService: {
    list: vi.fn(),
  },
}));

// Mock the components
vi.mock("@/ui/molecules/Heading", () => ({
  default: ({ title }: { title: string }) => (
    <h1 data-testid="heading">{title}</h1>
  ),
}));

vi.mock("@/ui/molecules/SubHeading", () => ({
  default: ({ title }: { title: string }) => (
    <h2 data-testid="subheading">{title}</h2>
  ),
}));

vi.mock("@/ui/molecules/BackgroundGraphic", () => ({
  BackgroundGraphic: ({
    variant,
    className,
  }: {
    variant: string;
    className?: string;
  }) => (
    <div
      data-testid="background-graphic"
      data-variant={variant}
      className={className}
    ></div>
  ),
}));

vi.mock("./(components)/AccountCard", () => ({
  default: ({ account }: { account: BankAccount }) => (
    <div data-testid="account-card" data-account-id={account.id}>
      {account.name} - {account.balance}
    </div>
  ),
}));

describe("AccountOverviewPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Setup default mocks
    vi.mocked(getSession).mockResolvedValue({
      user: {
        id: "user-123",
        name: "John Doe",
        email: "john.doe@example.com",
        birthDate: "1990-01-01",
        phoneNumber: "12345678",
        address: "123 Main St",
        paymentDelayDays: 0,
        difficulty: "EASY",
      },
      userId: "user-123",
      email: "john.doe@example.com",
      isRegistered: true,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });

    vi.mocked(bankAccountService.list).mockResolvedValue([
      {
        id: "acc-1",
        name: "Brukskonto",
        balance: 5000,
        userId: "user-123",
        category: null,
        main: true,
        countryCode: "NO",
      },
      {
        id: "acc-2",
        name: "Sparekonto",
        balance: 10000,
        userId: "user-123",
        category: null,
        main: false,
        countryCode: "NO",
      },
    ]);
  });

  test("renders the account overview page with correct headings", async () => {
    const page = await AccountOverviewPage();
    render(page);

    expect(screen.getByTestId("heading")).toHaveTextContent("Kontooversikt");
    expect(screen.getAllByTestId("subheading")[0]).toHaveTextContent(
      "Bankkontoer",
    );
    expect(screen.getAllByTestId("subheading")[1]).toHaveTextContent("Fond");
  });

  test("fetches and displays user accounts", async () => {
    const page = await AccountOverviewPage();
    render(page);

    expect(getSession).toHaveBeenCalled();
    expect(bankAccountService.list).toHaveBeenCalledWith("user-123");

    const accountCards = screen.getAllByTestId("account-card");
    expect(accountCards).toHaveLength(2);
    expect(accountCards[0]).toHaveAttribute("data-account-id", "acc-1");
    expect(accountCards[1]).toHaveAttribute("data-account-id", "acc-2");
  });

  test("displays security warning message", async () => {
    const page = await AccountOverviewPage();
    render(page);

    expect(
      screen.getByText(/Vær oppmerksom på uvanlige transaksjoner/i),
    ).toBeInTheDocument();
  });
});
