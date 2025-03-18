import { useAiPreferenceStore } from "@/store/useAiPreferenceStore"; // Import Zustand store
import { Mic, SendHorizontal } from "lucide-react";
import { Dropdown } from "./Dropdown";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
import { log } from "console";

const MessageInput = ({
  inputValue,
  setInputValue,
  handleSend,
  loading,
  aiProvider,
  setAiProvider,
  textareaRef,
  adjustTextareaHeight,
  placeholder = "Message",
  className = "",
  dropdownClassName = "cursor-pointer outline-none bg-transparent text-white border-zinc-600 w-[180px]",
}: any) => {
  const AiChatModalPreference = ["Gemini 1.5 Flash", "Starcoder"];

  const { currAiPreference, setAiPreference } = useAiPreferenceStore();

  const handleKeyDown = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const textareaChange = (e: { target: { value: any } }) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  useEffect(() => {
    setAiProvider(currAiPreference);
  }, [currAiPreference]);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Textarea
        placeholder={placeholder}
        value={inputValue}
        onChange={textareaChange}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        className="resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-400 min-h-[50px]"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
      />
      <div className="flex justify-between gap-2">
        <Dropdown
          dropdownvalue={AiChatModalPreference}
          value={
            currAiPreference === "gemini" ? "Gemini 1.5 Flash" : "Starcoder"
          }
          onChange={(value: string) =>
            setAiPreference(
              value === "Gemini 1.5 Flash" ? "gemini" : "starcoder"
            )
          }
          className={dropdownClassName}
        />

        <Button
          size="icon"
          variant="ghost"
          className="text-zinc-400 hover:text-white bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-colors"
          onClick={handleSend}
          disabled={loading}
        >
          {inputValue.length > 0 ? (
            <SendHorizontal className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
