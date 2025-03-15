import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const isProtectedRoute = window.location.pathname.startsWith("/dashboard");

  return (
    <header className="flex items-center justify-between px-4 h-14">
      {isProtectedRoute && <SidebarTrigger />}
    </header>
  );
};

export default Navbar;
