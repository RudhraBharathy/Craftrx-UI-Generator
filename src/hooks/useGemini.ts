import { useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "bot";
  text: string;
}

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API;

const useGemini = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: `${input}\nFormat your response in Markdown.` }],
            },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

      setMessages((prev) => [...prev, { role: "bot", text: aiText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useGemini;
