import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatInterface from "./ChatInterface";

export default function SplitScreen() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-full" minSize={30} defaultSize={40}>
        <div className="flex items-center justify-around flex-col h-full bg-gray-200">
          <ChatInterface />
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className="w-1 bg-gray-400 cursor-col-resize"
      />

      <ResizablePanel defaultSize={60}>
        <div className="flex items-center justify-center h-full bg-gray-300">
          Other Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
