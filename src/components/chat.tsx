import { useRef, useState, useEffect } from "react";
import { Mic, SendHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dropdown } from "./Dropdown";

interface ChatInterfaceProps {
  userName?: string;
}

export const ChatNewInterface = ({
  userName = "Crafter",
}: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const AiChatModalPreference = ["Gemini 1.5 Flash", "Startcoder"];

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight > 100) {
        textareaRef.current.style.height = "100px";
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.height = `${scrollHeight}px`;
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  };

  const textareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl mb-2">Good evening, {userName}.</h1>
        <p className="text-zinc-300 text-xl">How can I help you today?</p>
      </div>

      <Card className="w-full max-w-2xl bg-zinc-800/50 border-zinc-700">
        <div className="flex justify-center items-center flex-col gap-3 px-2">
          <Textarea
            placeholder="What do you want to know?"
            value={inputValue}
            onChange={textareaChange}
            ref={textareaRef}
            className="resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 w-full"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #f1f1f1",
              minHeight: "50px",
            }}
          />

          <div className="w-full">
            <div className="flex justify-between gap-2">
              <Dropdown dropdownvalue={AiChatModalPreference} />
              <Button
                size="icon"
                variant="ghost"
                className="text-zinc-400 bg-zinc-700 rounded-2xl"
              >
                {inputValue.length > 0 ? (
                  <SendHorizontal className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
