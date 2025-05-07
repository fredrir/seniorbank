import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { getSession } from "@/lib/auth";
import { bankAccountService } from "@/model/core";
import React from "react";
import { User } from "@/model/domain/user/User";
import { BankAccount } from "@/model/domain/payment/BankAccount";
import { Difficulty } from "@/model/domain/user/User";
import Home from "@/app/(seniorbank)/page";

const mockBankAccount: BankAccount = new BankAccount({
  id: "acc123",
  name: "Main Account",
  category: "Checking",
  userId: "123",
  balance: 1000,
  main: true,
  countryCode: "NO",
});

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

vi.mock("@/app/(seniorbank)/(components)/BankAccountCard", () => ({
  BankAccountCard: ({ bankAccount }: { bankAccount: BankAccount }) => (
    <div data-testid="bank-account-card">Account: {bankAccount.id}</div>
  ),
}));

vi.mock("@/app/(seniorbank)/(components)/MenuOptions", () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="menu-option">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("@/app/(seniorbank)/(components)/WarningSection", () => ({
  WarningSection: () => (
    <div data-testid="warning-section">Warning Section</div>
  ),
}));

vi.mock("@/ui/molecules/BackgroundGraphic", () => ({
  BackgroundGraphic: ({ variant }: { variant: string }) => (
    <div data-testid="background-graphic">Background: {variant}</div>
  ),
}));

interface MenuOption {
  title: string;
  description: string;
  availableFor: Difficulty[];
  icon: React.ReactNode;
  href?: string;
}

vi.mock("@/app/(seniorbank)/(components)/HiddenMenuOptions", () => ({
  default: ({ hiddenMenuOptions }: { hiddenMenuOptions: MenuOption[] }) => (
    <div data-testid="hidden-menu-options">
      Hidden options: {hiddenMenuOptions.length}
    </div>
  ),
}));

vi.mock("@/lib/auth", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/model/core", () => ({
  bankAccountService: {
    getUserMainAccount: vi.fn(),
  },
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders correctly for EASY difficulty user", async () => {
    const mockUser: User = new User({
      id: "123",
      name: "Test User",
      email: "test@example.com",
      birthDate: new Date("2000-01-01T00:00:00.000Z"),
      phoneNumber: "1234567890",
      address: "123 Test St",
      paymentDelayDays: 3,
      difficulty: "EASY",
    });

    vi.mocked(getSession).mockResolvedValue({
      user: { ...mockUser, birthDate: mockUser.birthDate.toISOString() },
      userId: mockUser.id,
      email: mockUser.email,
      isRegistered: true,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
    vi.mocked(bankAccountService.getUserMainAccount).mockResolvedValue(
      mockBankAccount,
    );

    const Component = await Home();
    render(Component);

    expect(screen.getByTestId("heading")).toHaveTextContent("Hei, Test User");
    expect(screen.getByTestId("bank-account-card")).toBeInTheDocument();
    expect(screen.getByTestId("warning-section")).toBeInTheDocument();

    expect(screen.getByTestId("hidden-menu-options")).toBeInTheDocument();

    const menuOptions = screen.getAllByTestId("menu-option");
    expect(menuOptions.length).toBe(5);
  });

  test("renders correctly for MEDIUM difficulty user", async () => {
    const mockUser: User = new User({
      id: "123",
      name: "Test User",
      email: "test@example.com",
      birthDate: new Date("2000-01-01T00:00:00.000Z"),
      phoneNumber: "1234567890",
      address: "123 Test St",
      paymentDelayDays: 3,
      difficulty: "MEDIUM",
    });

    vi.mocked(getSession).mockResolvedValue({
      user: { ...mockUser, birthDate: mockUser.birthDate.toISOString() },
      userId: mockUser.id,
      email: mockUser.email,
      isRegistered: true,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
    vi.mocked(bankAccountService.getUserMainAccount).mockResolvedValue(
      mockBankAccount,
    );

    const Component = await Home();
    render(Component);

    expect(screen.getByTestId("heading")).toHaveTextContent("Hei, Test User");

    expect(screen.getByTestId("hidden-menu-options")).toBeInTheDocument();

    const menuOptionsContainer =
      screen.getAllByTestId("menu-option")[0].parentElement;
    expect(menuOptionsContainer).toHaveClass("md:grid-cols-2");
  });

  test("renders correctly for HARD difficulty user", async () => {
    const mockUser: User = new User({
      id: "123",
      name: "Test User",
      email: "test@example.com",
      birthDate: new Date("2000-01-01T00:00:00.000Z"),
      phoneNumber: "1234567890",
      address: "123 Test St",
      paymentDelayDays: 3,
      difficulty: "HARD",
    });

    vi.mocked(getSession).mockResolvedValue({
      user: { ...mockUser, birthDate: mockUser.birthDate.toISOString() },
      userId: mockUser.id,
      email: mockUser.email,
      isRegistered: true,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
    vi.mocked(bankAccountService.getUserMainAccount).mockResolvedValue(
      mockBankAccount,
    );

    const Component = await Home();
    render(Component);

    expect(screen.queryByTestId("hidden-menu-options")).not.toBeInTheDocument();

    const menuOptions = screen.getAllByTestId("menu-option");
    expect(menuOptions.length).toBe(6);
  });

  test("handles null bank account", async () => {
    const mockUser: User = {
      id: "123",
      name: "Test User",
      email: "test@example.com",
      birthDate: new Date("2000-01-01T00:00:00.000Z"),
      phoneNumber: "1234567890",
      address: "123 Test St",
      paymentDelayDays: 3,
      difficulty: "EASY",
      setDifficulty: vi.fn(),
      setPaymentDelayDays: vi.fn(),
    };

    vi.mocked(getSession).mockResolvedValue({
      user: { ...mockUser, birthDate: mockUser.birthDate.toISOString() },
      userId: mockUser.id,
      email: mockUser.email,
      isRegistered: true,
      expires: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
    vi.mocked(bankAccountService.getUserMainAccount).mockResolvedValue(
      null as unknown as BankAccount,
    );

    const Component = await Home();
    render(Component);

    expect(screen.queryByTestId("bank-account-card")).not.toBeInTheDocument();
  });
});
