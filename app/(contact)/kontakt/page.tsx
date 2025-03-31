import { getCurrentUser } from "@/lib/auth";
import AccountOverview from "@/app/(contact)/kontakt/(components)/AccountOverview";
import ActionOverview from "@/app/(contact)/kontakt/(components)/ActionOverview";
import ApprovalSlider from "@/app/(contact)/kontakt/(components)/ApprovalSlider";

export default async function ContactPersonPage() {
  const user = await getCurrentUser();

  return (
    <main>
      <h1 className="pt-8 text-2xl font-bold text-[#002776] md:text-4xl">
        Velkommen, {user.name}!
      </h1>

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
