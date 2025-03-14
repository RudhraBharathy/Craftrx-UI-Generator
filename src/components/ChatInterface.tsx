import { useRef, useState, useEffect } from "react";
import useGemini from "@/hooks/useGemini";
import useStarCoder from "@/hooks/useStarCoder";
import ChatLoading from "./ChatLoading";
import CodeBlock from "./CodeBlock";
import { extractCodeInfo } from "@/utils/extractCode";
import MessageInput from "./MessageInput";
interface ChatInterfaceProps {
  userName?: string;
}

const ChatInterface = ({ userName = "Crafter" }: ChatInterfaceProps) => {
  const {
    messages: geminiMessages,
    sendMessage: sendGeminiMessage,
    loading: geminiLoading,
  } = useGemini();
  const {
    messages: starcoderMessages,
    sendMessage: sendStarcoderMessage,
    loading: starcoderLoading,
  } = useStarCoder();
  const [inputValue, setInputValue] = useState("");
  const [aiProvider, setAiProvider] = useState<"gemini" | "starcoder">(
    "gemini"
  );
  const [isInitialState, setIsInitialState] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [geminiMessages, starcoderMessages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    if (isInitialState) {
      setIsInitialState(false);
    }

    aiProvider === "gemini"
      ? sendGeminiMessage(inputValue)
      : sendStarcoderMessage(inputValue);
    setInputValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const messages = aiProvider === "gemini" ? geminiMessages : starcoderMessages;
  const loading = aiProvider === "gemini" ? geminiLoading : starcoderLoading;

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height =
        scrollHeight > 150 ? "150px" : `${scrollHeight}px`;
      textareaRef.current.style.overflowY =
        scrollHeight > 150 ? "auto" : "hidden";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col pt-16">
      {" "}
      {isInitialState ? (
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-center mb-8 w-full max-w-4xl">
            <h1 className="text-white text-3xl mb-2">
              Good evening, {userName}.
            </h1>
            <p className="text-zinc-300 text-lg mb-8">
              How can I help you today?
            </p>

            <div className="w-[90%] mx-auto bg-zinc-800/20 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
              <MessageInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSend={handleSend}
                loading={loading}
                aiProvider={aiProvider}
                setAiProvider={setAiProvider}
                textareaRef={textareaRef}
                adjustTextareaHeight={adjustTextareaHeight}
                placeholder="What do you want to know?"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <div
            ref={chatContainerRef}
            className="flex-grow p-4 md:px-4 pt-18 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
          >
            <div className="max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-6 ${
                    msg.role === "user" ? "pl-12 md:pl-24" : ""
                  }`}
                >
                  <div
                    className={`text-sm mb-2 ${
                      msg.role === "user"
                        ? "text-right text-zinc-400"
                        : "text-zinc-400"
                    }`}
                  >
                    {msg.role === "user"
                      ? "You"
                      : aiProvider === "gemini"
                      ? "Gemini"
                      : "Starcoder"}
                  </div>
                  <div
                    className={`text-base md:text-lg ${
                      msg.role === "user" ? "text-zinc-200" : "text-white"
                    }`}
                  >
                    {msg.text.includes("```") ||
                    msg.text.includes("generated_text")
                      ? (() => {
                          const { language, code } = extractCodeInfo(msg.text);
                          return <CodeBlock language={language} code={code} />;
                        })()
                      : msg.text.split("\n").map((line, idx) =>
                          line ? (
                            <p key={idx} className="mb-4">
                              {line}
                            </p>
                          ) : (
                            <div key={idx} className="h-4" />
                          )
                        )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mb-6">
                  <div className="text-sm mb-2 text-zinc-400">
                    {aiProvider === "gemini" ? "Gemini" : "Starcoder"}
                  </div>
                  <ChatLoading />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-zinc-800 bg-zinc-900">
            <div className="max-w-3xl mx-auto p-4">
              <MessageInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSend={handleSend}
                loading={loading}
                aiProvider={aiProvider}
                setAiProvider={setAiProvider}
                textareaRef={textareaRef}
                adjustTextareaHeight={adjustTextareaHeight}
                className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 focus-visible:ring-1 focus-visible:ring-zinc-500 p-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
