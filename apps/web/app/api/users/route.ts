// apps/web/app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  });
  return NextResponse.json(users);
}
