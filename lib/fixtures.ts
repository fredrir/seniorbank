import { prisma } from "./db"

function randomNDigitNumber(n: number) {
  return String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, '0');
}

function randomBankAccountNumber() {
  return `${randomNDigitNumber(4)} ${randomNDigitNumber(2)} ${randomNDigitNumber(5)}`
}

function randomSparebank1BankAccountNumber() {
  return `1080 ${randomNDigitNumber(2)} ${randomNDigitNumber(5)}`
}

async function findOrCreateExternalBankAccount(name: string, category: string, countryCode: string) {
  const existingAccount = await prisma.bankAccount.findFirst({ where: { name } })

  if (existingAccount !== null) {
    return existingAccount
  }

  return await prisma.bankAccount.create({ data: { name, id: randomBankAccountNumber(), balance: 0, category, countryCode } })
}

export async function createFixturesForUser(userId: string) {
  const mainAccountId = randomSparebank1BankAccountNumber();

  await prisma.bankAccount.createMany({ data: [
    { name: "Brukskonto", balance: 18_932.54, id: mainAccountId, main: true, userId, countryCode: "NO" },
    { name: "Sparekonto", balance: 830_726, id: randomSparebank1BankAccountNumber(), userId, countryCode: "NO" },
    { name: "Barnebarn", balance: 34_835, id: randomSparebank1BankAccountNumber(), userId, countryCode: "NO" },
    { name: "Russetid", balance: 10_835, id: randomSparebank1BankAccountNumber(), userId, countryCode: "NO" }
  ]})

  const remaAccount = await findOrCreateExternalBankAccount("Rema 1000", "Dagligvare", "NO")
  const sitAccount = await findOrCreateExternalBankAccount("SIT kantine", "Kiosk", "NO")
  const jokerSamfAccount = await findOrCreateExternalBankAccount("Joker stud.samf.", "Dagligvare", "NO")
  // const nigerianPrinceAccount = await findOrCreateExternalBankAccount("Nigerian prince", "Privatperson", "NG")
  const clippersAccount = await findOrCreateExternalBankAccount("Klippers", "Kosmetikk", "NO")
  // const pensionAccount = await findOrCreateExternalBankAccount("Pensjon", "Diverse", "NO")
  const privatePersonAccount = await findOrCreateExternalBankAccount("Navn Navnesen", "Privatperson", "NO")

  await prisma.transaction.createMany({ data: [
    { fromAccountId: mainAccountId, toAccountId: remaAccount.id, amount: 826.8, dueDate: new Date() },
    { fromAccountId: mainAccountId, toAccountId: sitAccount.id, amount: 45.87, dueDate: new Date() },
    { fromAccountId: privatePersonAccount.id, toAccountId: mainAccountId, amount: 1_000, dueDate: new Date() },
    { fromAccountId: mainAccountId, toAccountId: jokerSamfAccount.id, amount: 72.46, dueDate: new Date() },
    { fromAccountId: mainAccountId, toAccountId: clippersAccount.id, amount: -599, dueDate: new Date() },
  ] })
}
