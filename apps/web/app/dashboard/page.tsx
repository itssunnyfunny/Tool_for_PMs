"use client";
import { useState } from "react";

export default function DashboardPage() {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/task-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: "123",
        projectDescription: desc,
      }),
    });
    const data = await res.json();
    setSuggestions(data.data.content);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <textarea
        className="w-full border p-2"
        placeholder="Describe your project..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
        {loading ? "Generating..." : "Generate Tasks"}
      </button>
      {suggestions && <pre className="bg-gray-100 p-4 rounded">{suggestions}</pre>}
    </div>
  );
}
