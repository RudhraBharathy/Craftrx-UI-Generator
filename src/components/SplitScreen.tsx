import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatInterface from "./ChatInterface";

export default function SplitScreen() {
  return (
    <PanelGroup direction="horizontal">
      <Panel className="h-full" minSize={30} defaultSize={40}>
        <div className="flex items-center justify-around flex-col h-full bg-gray-200">
          <ChatInterface />
        </div>
      </Panel>

      <PanelResizeHandle className="w-2 bg-gray-400 cursor-col-resize" />

      <Panel defaultSize={60}>
        <div className="flex items-center justify-center h-full bg-gray-300">
          Other Content
        </div>
      </Panel>
    </PanelGroup>
  );
}
