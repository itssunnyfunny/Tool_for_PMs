// apps/web/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { verifyToken } from "../../../lib/auth";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const user = verifyToken(token!);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { userId: (user as any).id },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const user = verifyToken(token!);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, description } = await req.json();

  const project = await prisma.project.create({
    data: {
      name,
      description,
      userId: (user as any).id,
    },
  });

  return NextResponse.json(project);
}
