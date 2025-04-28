import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaymentConfirmationStep from "../payment/(components)/PaymentConfirmationStep";

describe("PaymentConfirmationStep", () => {
  it("Renders form data correctly", () => {
    const mockFormData = {
      comment: "Test comment",
      amount: "1000",
      toAccount: "1111",
      fromAccount: "5555",
    };
    render(<PaymentConfirmationStep formData={mockFormData} onClick={() => {}} />);
    expect(screen.getByText("1000 kr")).toBeInTheDocument();
  });
});