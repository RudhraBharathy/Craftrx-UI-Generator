import { useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "bot";
  text: string;
}

const STARCODER_API_URL = "https://api-inference.huggingface.co/models/bigcode/starcoder2-3b";
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
          inputs: input,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.2,
            top_p: 0.9,
            do_sample: true,
            return_full_text: true,
          },
        },
        {
          headers: {
            "Authorization": `Bearer ${STARCODER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let aiText = data?.[0]?.generated_text || "No response received.";
      
      if (aiText.includes("```") && aiText.split("```").length % 2 === 1) {
        aiText += "```";
      }
      
      const formattedResponse = JSON.stringify({ generated_text: aiText });
      setMessages((prev) => [...prev, { role: "bot", text: formattedResponse }]);
    } catch (error) {
      console.error("StarCoder API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useStarCoder;