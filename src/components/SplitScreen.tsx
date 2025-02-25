import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatInterface from "./ChatInterface";
import { ChatNewInterface } from "./chat";

export default function SplitScreen() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)]">
      <ResizablePanel className="h-full flex" minSize={30} defaultSize={40}>
        <div className="flex flex-col h-full w-full bg-gray-200">
          <ChatInterface />
        </div>
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className="w-1 bg-gray-400 cursor-col-resize"
      />

      <ResizablePanel defaultSize={60} className="h-full">
        <ChatNewInterface />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
