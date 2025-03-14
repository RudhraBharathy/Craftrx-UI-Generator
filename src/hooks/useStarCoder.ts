import { useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "bot";
  text: string;
}

const STARCODER_API_URL =
  "https://api-inference.huggingface.co/models/bigcode/starcoder2-3b";
const STARCODER_API_KEY = import.meta.env.VITE_HF_API;

const useStarCoder = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setLoading(true);

    try {
      const { data } = await axios.post(
        STARCODER_API_URL,
        {
          inputs: `${input}\nFormat your response in Markdown.`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.2,
            top_p: 0.9,
            do_sample: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${STARCODER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiText = data?.[0]?.generated_text?.trim() || "No response received.";
      const { language, code } = aiText;
      const finalText = code ? `\n\`\`\`${language}\n${code}\n\`\`\`` : aiText;

      setMessages((prev) => [...prev, { role: "bot", text: finalText }]);
    } catch (error) {
      console.error("StarCoder API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useStarCoder;
