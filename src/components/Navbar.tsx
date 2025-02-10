import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-4 h-14">
      <SidebarTrigger />
    </header>
  );
};

export default Navbar;
