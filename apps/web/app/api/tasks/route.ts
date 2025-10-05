// apps/web/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { verifyToken } from "../../../lib/auth";
import { TaskSchema } from "@/lib/validators/task";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");

  const tasks = await prisma.task.findMany({
    where: { projectId: projectId || undefined },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = TaskSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: parsed.data,
  });

  return NextResponse.json(task);
}
