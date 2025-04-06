import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[auth]/[...nextauth]/authOptions";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) {
    return NextResponse.json({ error: "Ikke innlogget" }, { status: 401 });
  }

  const { delayDays } = await req.json();

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { paymentDelayDays: Number(delayDays) }, // mangler felt i databassen til dette 
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feil:", err);
    return NextResponse.json({ error: "Kunne ikke oppdatere" }, { status: 500 });
  }
}
