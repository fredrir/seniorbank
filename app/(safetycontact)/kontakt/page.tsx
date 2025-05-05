import AccountOverview from "@/app/(safetycontact)/kontakt/(components)/AccountOverview";
import ActionOverview from "@/app/(safetycontact)/kontakt/(components)/ActionOverview";
import ApprovalCarousel from "@/app/(safetycontact)/kontakt/(components)/ApprovalCarousel";
import Heading from "./(components)/Heading";
import { getSession } from "@/lib/auth";
import { listHeldTransactions } from "@/actions/bankAccount";
import { BackgroundGraphic } from "@/ui/molecules/BackgroundGraphic";

export default async function ContactPersonPage() {
  const { user } = await getSession();

  const heldTransactions = await listHeldTransactions();

  return (
    <>
      <BackgroundGraphic variant="mid-wave" className="text-[#F8E9DD]" />
      <Heading title={`Velkommen, trygghetskontakt!`} className="pt-8" />

      <h3 className="mx-auto max-w-3xl pt-4 text-lg">
        Her kan du hjelpe til å sikre {user.name} sine bankhandlinger.
      </h3>

      <ApprovalCarousel initialTransactions={heldTransactions} />

      <section className="mx-auto grid max-w-3xl grid-cols-2 gap-16 pb-16 pt-24">
        <div>
          <h2 className="mb-8 text-xl font-bold text-[#002776] md:text-2xl">
            Kontoversikt
          </h2>

          <AccountOverview />
        </div>

        <div>
          <h2 className="mb-8 text-xl font-bold text-[#002776] md:text-2xl">
            Handlinger
          </h2>

          <ActionOverview />
        </div>
      </section>
    </>
  );
}
