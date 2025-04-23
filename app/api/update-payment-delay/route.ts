import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { delayDays } = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Ingen epost" }, { status: 401 });
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { paymentDelayDays: Number(delayDays) }, // mangler felt i databassen til dette
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feil:", err);
    return NextResponse.json(
      { error: "Kunne ikke oppdatere" },
      { status: 500 },
    );
  }
}
