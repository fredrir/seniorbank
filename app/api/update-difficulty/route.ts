import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Ikke autentisert" }, { status: 401 });
  }

  const { newDifficulty } = await req.json();

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { difficulty: newDifficulty },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feil ved oppdatering:", error);
    return NextResponse.json(
      { error: "Kunne ikke oppdatere" },
      { status: 500 },
    );
  }
}
