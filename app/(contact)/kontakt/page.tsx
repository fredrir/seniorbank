import { authOptions } from "@/app/api/[auth]/[...nextauth]/authOptions";
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
    </main>
  );
}
