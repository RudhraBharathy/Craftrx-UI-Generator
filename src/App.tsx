import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "./components/Navbar";
import SplitScreen from "./components/SplitScreen";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showPublicNavbar = !["/sign-in", "/sign-up"].includes(
    location.pathname
  );

  return (
    <>
      {showPublicNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <SidebarProvider open={open} onOpenChange={setOpen}>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <div className="flex h-[92dvh] mt-20">
                        <AppSidebar />
                        <main
                          className={
                            "flex-1 relative flex flex-col bg-background transition-[margin] duration-200 ease-linear"
                          }
                        >
                          <SplitScreen />
                        </main>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
