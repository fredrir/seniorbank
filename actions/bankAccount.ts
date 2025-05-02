"use server";

import { getSession } from "@/lib/auth";
import { bankAccountService } from "@/model/core";

export async function createTransaction(
  accountId: string,
  toAccountId: string,
  amount: number,
) {
  const { user } = await getSession();

  return await bankAccountService.createTransaction(
    user.id,
    accountId,
    toAccountId,
    amount,
  );
}

export async function listAccounts() {
  const { user } = await getSession();

  return await bankAccountService.list(user.id);
}

export async function listApprovedPeers() {
  const { user } = await getSession();

  return await bankAccountService.listApprovedPeers(user.id);
}

export async function getAccount(id: string) {
  const { user } = await getSession();

  return await bankAccountService.get(id, user.id);
}

export async function listHeldTransactions() {
  const { user } = await getSession();

  return await bankAccountService.listHeldTransactions(user.id);
}

export async function listAllTransactions() {
  const { user } = await getSession();

  return await bankAccountService.listAllTransactions(user.id);
}

export async function approveTransaction(id: string, accountId: string) {
  const { user } = await getSession();

  await bankAccountService.approveTransaction(id, accountId, user.id);
}

export async function denyTransaction(id: string, accountId: string) {
  const { user } = await getSession();

  await bankAccountService.denyTransaction(id, accountId, user.id);
}
