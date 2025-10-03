import express from "express";
import cors from "cors";
import generateRoutes from "./routes/generate";import summarizeRoutes from "./routes/summarize";
import prioritizeRoutes from "./routes/prioritize";
import risksRoutes from "./routes/risks";


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/generateTasks", generateRoutes);
app.use("/summarize", summarizeRoutes);
app.use("/prioritize", prioritizeRoutes);
app.use("/risks", risksRoutes);

app.get("/health", (_, res) => res.json({ status: "AI Service is running 🚀" }));

app.listen(5000, () => {
  console.log("AI service running on http://localhost:5000");
});
