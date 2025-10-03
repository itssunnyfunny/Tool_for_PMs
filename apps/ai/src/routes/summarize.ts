import { Router } from "express";
import cerebrasClient from "../cerebras";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await cerebrasClient.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        { role: "system", content: "Summarize the project update in 2-3 concise sentences." },
        { role: "user", content: text }
      ],
      temperature: 0.3,
      max_tokens: 150,
    });
  // @ts-ignore
    res.json({ summary: response.choices[0].message.content });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
