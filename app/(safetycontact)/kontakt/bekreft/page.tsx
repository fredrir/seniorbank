import ApprovalCard from "../(components)/ApprovalCard";
import Heading from "../(components)/Heading";

// TODO mock

const toBeApproved = [
  {
    recipient: "Mottager",
    amount: "699",
    date: new Date(),
    isSuspicious: false,
  },
  {
    recipient: "Sus mottaker",
    amount: "15 999",
    date: new Date(),
    isSuspicious: true,
  },
];

export default function ContactPersonConfirmationPage() {
  return (
    <main>
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <div className="mx-auto flex max-w-lg flex-col gap-8 p-4">
        {toBeApproved.map((item, index) => (
          <ApprovalCard
            key={index}
            recipient={item.recipient}
            amount={item.amount}
            date={item.date}
            isSuspicious={item.isSuspicious}
          />
        ))}
      </div>
    </main>
  );
}
