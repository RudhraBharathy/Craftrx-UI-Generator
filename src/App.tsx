import SplitScreen from "./components/SplitScreen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="themes-wrapper bg-background">
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <AppSidebar />
          <main className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
            <header className="flex items-center justify-between px-4 h-14">
              <SidebarTrigger />
            </header>
            <SplitScreen />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}

export default App;
