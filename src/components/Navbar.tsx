import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import CraftrxLogo from "../assets/logo.svg";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isProtectedRoute = window.location.pathname.startsWith("/dashboard");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <header className="flex items-center justify-between px-4 h-14">
          {isProtectedRoute && <SidebarTrigger />}
        </header>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <img src={CraftrxLogo} alt="Logo" className="w-10" />
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md">
              Craftrx
            </span>
            <span className="text-foreground">UI Generator</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Workspace
            </Link>
          )}
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            Features
          </Link>
          <a
            href="https://github.com/RudhraBharathy/Craftrx-UI-Generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="hidden sm:flex btn-outline">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
