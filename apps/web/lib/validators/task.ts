// apps/web/lib/validators/task.ts
import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
  projectId: z.string().uuid(),
});
