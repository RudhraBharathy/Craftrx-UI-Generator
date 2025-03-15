import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { useAppStore } from "@/store/appStore";
import SplitScreen from "./components/SplitScreen";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  // Example Zustand state usage
  const [open, setOpen] = useState(false);
  // const { user, setUser } = useAppStore();

  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <SidebarProvider open={open} onOpenChange={setOpen}>
                    <div className="flex h-screen w-full overflow-hidden">
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
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
