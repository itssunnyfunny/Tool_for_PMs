// apps/web/app/api/auth/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email });

  return NextResponse.json({ token });
}
