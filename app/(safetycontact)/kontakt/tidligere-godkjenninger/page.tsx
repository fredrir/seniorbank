import Heading from "../(components)/Heading";
import PaymentList from "../(components)/PaymentList";

export default function PreviousApprovalsPage() {
  return (
    <main>
      <Heading title="Bekreft" href="/kontakt" className="pt-8" />

      <div className="mx-auto max-w-md">
        <PaymentList />
      </div>
    </main>
  );
}
