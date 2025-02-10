import SplitScreen from "./components/SplitScreen";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main
          className={`flex-1 relative flex flex-col bg-background transition-[margin] duration-200 ease-linear ${
            open ? "ml-[16rem]" : "ml-0"
          }`}
        >
          <Navbar />
          <SplitScreen />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
