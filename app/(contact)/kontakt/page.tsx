import { authOptions } from "@/app/api/[auth]/[...nextauth]/authOptions";
import AccountOverview from "@/components/contact-page/AccountOverview";
import ApprovalSlider from "@/components/contact-page/ApprovalSlider";
import { getServerSession } from "next-auth";

export default async function ContactPersonPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1 className="pt-8 text-2xl font-bold text-[#002776] md:text-4xl">
        Velkommen, {session?.user?.name}!
      </h1>

      {/* TODO integrere med backend */}
      <h3 className="mx-auto max-w-3xl pt-4 text-lg">
        Her kan du hjelpe [Brukerens navn] med viktige bankhandlinger.
      </h3>

      <ApprovalSlider />

      <section className="mx-auto grid max-w-3xl grid-cols-2 gap-16 pt-16">
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
        </div>
      </section>
    </main>
  );
}
