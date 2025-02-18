import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CodeBlock from "./CodeBlock";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { PiTelegramLogo } from "react-icons/pi";
import ChatLoading from "./ChatLoading";

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API;

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setLoading(true);
    setInput("");

    try {
      const { data } = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `${input}\nFormat your response in Markdown with code blocks.`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      setMessages((prev) => [...prev, { role: "bot", text: aiText }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const extractCodeInfo = (text: string) => {
    const match = text.match(/```(\w+)?\n([\s\S]*?)```/);
    return match
      ? { language: match[1] || "text", code: match[2].trim() }
      : { language: "text", code: text };
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-lg shadow-lg">
      <div className="flex-1 bg-white p-2 rounded-lg border border-gray-200 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {msg.text.includes("```")
                    ? (() => {
                        const { language, code } = extractCodeInfo(msg.text);
                        return <CodeBlock language={language} code={code} />;
                      })()
                    : msg.text
                        .split("\n")
                        .map((line, idx) => <p key={idx}>{line}</p>)}
                </div>
              </div>
            </div>
          ))}
          {loading && <ChatLoading />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-2 border-t border-gray-300 bg-white">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-white"
            disabled={loading}
          />
          <Button
            onClick={handleSend}
            className={`px-4 py-2 ${
              loading ? "opacity-50" : "hover:bg-black-700"
            }`}
            disabled={loading}
          >
            <PiTelegramLogo className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
