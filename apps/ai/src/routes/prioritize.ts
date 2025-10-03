import { Router } from "express";
import cerebrasClient from "../cerebras";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { tasks } = req.body; // Expect an array of task descriptions

    const response = await cerebrasClient.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        { role: "system", content: "You are an assistant that reorders tasks by priority (High, Medium, Low). Return JSON with tasks and priorities." },
        { role: "user", content: JSON.stringify(tasks) }
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    res.json({ prioritized: response.choices[0].message.content });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
