import { checkRegisteredUser } from "@/lib/auth";
import AccountOverview from "@/app/(safetycontact)/kontakt/(components)/AccountOverview";
import ActionOverview from "@/app/(safetycontact)/kontakt/(components)/ActionOverview";
import ApprovalSlider from "@/app/(safetycontact)/kontakt/(components)/ApprovalSlider";
import Heading from "./(components)/Heading";

export default async function ContactPersonPage() {
  const user = await checkRegisteredUser();

  return (
    <main>
      <Heading title={`Velkom, ${user.name}!`} className="pt-8" />

      {/* TODO integrere med backend */}
      <h3 className="mx-auto max-w-3xl pt-4 text-lg">
        Her kan du hjelpe [Brukerens navn] med viktige bankhandlinger.
      </h3>

      <ApprovalSlider />

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
    </main>
  );
}
