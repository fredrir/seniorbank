// import { afterEach, describe, it, vi } from "vitest";
// import { render, screen } from "@testing-library/react";
// import { deleteAccount } from "@/lib/fixtures";
// import { Difficulty } from "@prisma/client";
// import RegisterAccountPage from "@/app/(authentication)/register/page";

// describe("RegisterAccount", () => {
//   const mockSession = {
//     user: {
//       name: "Test name",
//       email: "TestEmail@hotmail.com",
//       phoneNumber: "91091099",
//       address: "Gløshaugen",
//       hasRegistered: true,
//       bankAccounts: [],
//       difficulty: Difficulty.EASY,
//     },
//     expires: "2025",
//   };
//   afterEach(async () => {
//     await deleteAccount(mockSession.user.email);
//   })
//   it("Submits form data correctly", () => {
//     const mockRegisterAccount = vi.fn().mockResolvedValue(true);
//     render(<RegisterAccountPage session={mockSession} />);
//     const button = screen.getByRole("button", { name: /next/i });
//   });
// });