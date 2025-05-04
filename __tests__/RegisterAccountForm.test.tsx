import React from "react";
import { expect, test, vi, beforeEach, describe } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { register } from "@/actions/user";
import toast from "react-hot-toast";
import RegisterAccountForm from "@/app/(authentication)/register/(components)/RegisterAccountForm";
import { Difficulty } from "@prisma/client";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("@/actions/user", () => ({
  register: vi.fn(),
}));

vi.mock("@/ui/molecules/BackgroundGraphic", () => ({
  BackgroundGraphic: ({
    variant,
    className,
  }: {
    variant: string;
    className: string;
  }) => (
    <div
      data-testid="background-graphic"
      data-variant={variant}
      className={className}
    ></div>
  ),
}));

vi.mock("@/ui/molecules/LogoutButton", () => ({
  LogoutButton: ({ title }: { title: string }) => (
    <button data-testid="logout-button">{title}</button>
  ),
}));

vi.mock("@/ui/organisms/ProgressBar", () => ({
  ProgressBar: ({
    totalSteps,
    currentStep,
  }: {
    totalSteps: number;
    currentStep: number;
  }) => (
    <div
      data-testid="progress-bar"
      data-total-steps={totalSteps}
      data-current-step={currentStep}
    ></div>
  ),
}));

vi.mock("@/app/(authentication)/register/(components)/FirstStep", () => ({
  default: ({
    setFormData,
    setStep,
  }: {
    setFormData: React.Dispatch<React.SetStateAction<{ difficulty?: string }>>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
  }) => (
    <div data-testid="first-step">
      <button
        data-testid="select-difficulty"
        onClick={() => {
          setFormData((prev) => ({ ...prev, difficulty: "EASY" }));
          setStep(2);
        }}
      >
        Select Difficulty
      </button>
    </div>
  ),
}));

vi.mock("@/app/(authentication)/register/(components)/SecondStep", () => ({
  default: ({
    formData,
    handleChange,
    handleNextStep,
  }: {
    formData: {
      firstName: string;
      lastName: string;
      birthDate: string;
      phoneNumber: string;
      address: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNextStep: (e: React.FormEvent) => void;
  }) => (
    <div data-testid="second-step">
      <input
        data-testid="first-name-input"
        id="firstName"
        value={formData.firstName}
        onChange={(e) => handleChange(e)}
      />
      <input
        data-testid="last-name-input"
        id="lastName"
        value={formData.lastName}
        onChange={(e) => handleChange(e)}
      />
      <input
        data-testid="birth-date-input"
        id="birthDate"
        value={formData.birthDate}
        onChange={(e) => handleChange(e)}
      />
      <input
        data-testid="phone-number-input"
        id="phoneNumber"
        value={formData.phoneNumber}
        onChange={(e) => handleChange(e)}
      />
      <input
        data-testid="address-input"
        id="address"
        value={formData.address}
        onChange={(e) => handleChange(e)}
      />
      <form
        data-testid="second-step-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleNextStep(e);
        }}
      >
        <button type="submit">Next</button>
      </form>
    </div>
  ),
}));

vi.mock("@/app/(authentication)/register/(components)/ThirdStep", () => ({
  default: ({
    termsAccepted,
    setTermsAccepted,
    handleNextStep,
  }: {
    termsAccepted: boolean;
    setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
    handleNextStep: (e: React.FormEvent) => void;
  }) => (
    <div data-testid="third-step">
      <input
        type="checkbox"
        data-testid="terms-checkbox"
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
      />
      <form
        data-testid="third-step-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleNextStep(e);
        }}
      >
        <button type="submit">Next</button>
      </form>
    </div>
  ),
}));

vi.mock("@/app/(authentication)/register/(components)/FourthStep", () => ({
  default: ({
    formData,
    email,
    handleSubmit,
  }: {
    formData: { firstName: string; lastName: string };
    email: string;
    handleSubmit: (e: React.FormEvent) => void;
  }) => (
    <div data-testid="fourth-step">
      <div data-testid="summary-first-name">{formData.firstName}</div>
      <div data-testid="summary-last-name">{formData.lastName}</div>
      <div data-testid="summary-email">{email}</div>
      <form
        data-testid="fourth-step-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <button type="submit">Fullfør registrering</button>
      </form>
    </div>
  ),
}));

describe("RegisterAccountForm", () => {
  const mockSession = {
    user: {
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      birthDate: "1970-01-01",
      phoneNumber: "12345678",
      address: "123 Main St",
      paymentDelayDays: 0,
      difficulty: "EASY" as Difficulty,
    },
    email: "test@example.com",
    userId: "user-123",
    isRegistered: false,
    expires: "2023-12-31T23:59:59.999Z",
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the first step initially", () => {
    render(<RegisterAccountForm session={mockSession} />);

    expect(screen.getByTestId("first-step")).toBeInTheDocument();
    expect(screen.getByText("Opprett ny bruker")).toBeInTheDocument();
  });

  test("navigates through all steps correctly", async () => {
    render(<RegisterAccountForm session={mockSession} />);

    fireEvent.click(screen.getByTestId("select-difficulty"));
    expect(screen.getByTestId("second-step")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("birth-date-input"), {
      target: { value: "1970-01-01" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "123 Main St" },
    });

    fireEvent.submit(screen.getByTestId("second-step-form"));
    expect(screen.getByTestId("third-step")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("terms-checkbox"));

    fireEvent.submit(screen.getByTestId("third-step-form"));
    expect(screen.getByTestId("fourth-step")).toBeInTheDocument();

    expect(screen.getByTestId("summary-first-name")).toHaveTextContent("John");
    expect(screen.getByTestId("summary-last-name")).toHaveTextContent("Doe");
    expect(screen.getByTestId("summary-email")).toHaveTextContent(
      "test@example.com",
    );
  });

  test("validates form data in step 2", async () => {
    render(<RegisterAccountForm session={mockSession} />);

    fireEvent.click(screen.getByTestId("select-difficulty"));

    fireEvent.submit(screen.getByTestId("second-step-form"));

    expect(toast.error).toHaveBeenCalledWith(
      "Vennligst fyll ut alle feltene før du går videre",
    );
    expect(screen.getByTestId("second-step")).toBeInTheDocument();
  });

  test("validates terms acceptance in step 3", async () => {
    render(<RegisterAccountForm session={mockSession} />);

    fireEvent.click(screen.getByTestId("select-difficulty"));

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("birth-date-input"), {
      target: { value: "1970-01-01" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "123 Main St" },
    });

    fireEvent.submit(screen.getByTestId("second-step-form"));

    fireEvent.submit(screen.getByTestId("third-step-form"));

    expect(toast.error).toHaveBeenCalledWith(
      "Du må godkjenne vilkårene før du kan fullføre registreringen",
    );
    expect(screen.getByTestId("third-step")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    vi.mocked(register).mockResolvedValue(undefined);

    render(<RegisterAccountForm session={mockSession} />);

    fireEvent.click(screen.getByTestId("select-difficulty"));

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("birth-date-input"), {
      target: { value: "1970-01-01" },
    });
    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "123 Main St" },
    });

    fireEvent.submit(screen.getByTestId("second-step-form"));

    fireEvent.click(screen.getByTestId("terms-checkbox"));

    fireEvent.submit(screen.getByTestId("third-step-form"));

    fireEvent.click(
      screen.getByRole("button", { name: /fullfør registrering/i }),
    );

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        birthDate: "1970-01-01",
        phoneNumber: "12345678",
        address: "123 Main St",
        difficulty: "EASY",
      });
      expect(toast.success).toHaveBeenCalledWith("Brukeren er opprettet!");
    });
  });

  test("handles back button correctly", async () => {
    render(<RegisterAccountForm session={mockSession} />);

    fireEvent.click(screen.getByTestId("select-difficulty"));
    expect(screen.getByTestId("second-step")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Tilbake"));
    expect(screen.getByTestId("first-step")).toBeInTheDocument();
  });
});
