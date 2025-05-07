import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi, Mock } from "vitest";
import * as actions from "@/actions/bankAccount";
import { Difficulty } from "@prisma/client";
import { User } from "@/model/domain/user/User";
import PaymentForm from "@/app/(seniorbank)/betal/(components)/PaymentView";
import Payment from "@/app/(seniorbank)/betal/page";
import { BankAccount } from "@/model/domain/payment/BankAccount";

vi.mock("@/actions/bankAccount", () => ({
  listAccounts: vi.fn(),
  listApprovedPeers: vi.fn(),
}));

describe("Payment Server Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("fetches accounts and peers and renders PaymentForm", async () => {
    const fakeAccounts = [{ id: "1", name: "Account A", balance: 100 }];
    const fakePeers = [
      { id: "2", name: "Peer B", balance: 50, category: null },
    ];
    (actions.listAccounts as Mock).mockResolvedValue(fakeAccounts);
    (actions.listApprovedPeers as Mock).mockResolvedValue(fakePeers);

    render(<Payment />);

    expect(actions.listAccounts).toHaveBeenCalled();
    expect(actions.listApprovedPeers).toHaveBeenCalled();
    expect(await screen.findByTestId("payment-form")).toBeInTheDocument();
  });
});

vi.mock("@/actions/bankAccount", () => ({
  createTransaction: vi.fn(),
}));

describe("PaymentForm Client Component", () => {
  const accounts = [
    {
      id: "1",
      name: "Acc1",
      balance: 100,
      main: true,
      category: "SAVINGS",
      userId: "user1",
      countryCode: "NO",
    },
    {
      id: "2",
      name: "Acc2",
      balance: 200,
      main: false,
      category: "CHECKING",
      userId: "user2",
      countryCode: "NO",
    },
  ];
  const peers = [{ id: "3", name: "Peer1", balance: 300, category: null }];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("walks through all steps and completes transaction", async () => {
    (actions.createTransaction as Mock).mockResolvedValue({
      contactNotified: false,
    });
    render(<PaymentForm accounts={accounts} approvedPeers={peers} />);

    expect(
      screen.getByText(/Velg konto du vil betale fra:/i),
    ).toBeInTheDocument();
    userEvent.click(screen.getByText("Acc1"));
    userEvent.click(screen.getByRole("button", { name: /Neste/i }));

    expect(screen.getByText(/Velg mottaker/i)).toBeInTheDocument();
    userEvent.type(
      screen.getByPlaceholderText(/Skriv inn kontonummer her/i),
      "3",
    );
    userEvent.clear(screen.getByPlaceholderText(/Skriv inn beløp her/i));
    userEvent.type(screen.getByPlaceholderText(/Skriv inn beløp her/i), "50");
    userEvent.click(screen.getByRole("button", { name: /Neste/i }));

    expect(screen.getByText(/Bekreft betaling/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /Bekreft/i }));

    expect(
      await screen.findByText(/Betalingen er gjennomført/i),
    ).toBeInTheDocument();
  });
});

describe("User Model", () => {
  const validData = {
    id: "user1",
    email: "test@example.com",
    name: "Test User",
    birthDate: new Date("1990-01-01"),
    phoneNumber: "12345678",
    address: "Street 1",
    paymentDelayDays: 3,
    difficulty: "MEDIUM" as Difficulty,
  };

  test("constructs with valid data", () => {
    const user = new User(validData);
    expect(user.id).toBe(validData.id);
    expect(user.email).toBe(validData.email);
  });

  test("throws on invalid email", () => {
    expect(() => new User({ ...validData, email: "bad-email" })).toThrow(
      /Invalid email/,
    );
  });

  test("throws on empty id", () => {
    expect(() => new User({ ...validData, id: "" })).toThrow(
      /ID cannot be empty/,
    );
  });

  test("sets difficulty", () => {
    const user = new User(validData);
    user.setDifficulty("HARD");
    expect(user.difficulty).toBe("HARD");
  });

  test("sets valid paymentDelayDays", () => {
    const user = new User(validData);
    user.setPaymentDelayDays(0);
    expect(user.paymentDelayDays).toBe(0);
  });

  test("throws on negative paymentDelayDays", () => {
    const user = new User(validData);
    expect(() => user.setPaymentDelayDays(-1)).toThrow(/below 0/);
  });

  test("throws on paymentDelayDays over 7", () => {
    const user = new User(validData);
    expect(() => user.setPaymentDelayDays(8)).toThrow(/over 7/);
  });
});

describe("BankAccount Model", () => {
  const data = {
    id: "acc1",
    name: "Account1",
    category: "SAVINGS",
    balance: 1000,
    userId: "user1",
    main: true,
    countryCode: "NO",
  };

  test("publicDetails returns correct shape", () => {
    const acc = new BankAccount(data);
    expect(acc.publicDetails()).toEqual({
      id: data.id,
      name: data.name,
      category: data.category,
      balance: data.balance,
    });
  });
});
