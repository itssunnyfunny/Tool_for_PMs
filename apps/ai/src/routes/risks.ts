import { Router } from "express";
import cerebrasClient from "../cerebras";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { projectDescription } = req.body;

    const response = await cerebrasClient.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        { role: "system", content: "Analyze risks in this project. Output risks in JSON array format with severity levels (Low, Medium, High)." },
        { role: "user", content: projectDescription }
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    res.json({ risks: response.choices[0].message.content });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
