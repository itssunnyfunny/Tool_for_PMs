import { Router } from "express";
import cerebrasClient from "../cerebras";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await cerebrasClient.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        { role: "system", content: "You are a project management assistant. Break tasks into subtasks in JSON array format." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 200,
    });
   // @ts-ignore
    const text = response.choices[0].message.content ?? "[]";
    res.json({ subtasks: text });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
