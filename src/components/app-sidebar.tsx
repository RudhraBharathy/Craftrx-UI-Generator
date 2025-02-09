import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const chats = [
  { title: "Enhancing Syntax Highlighting", date: "2025-02-10" },
  { title: "Optimizing AI-Powered Buttons", date: "2025-02-10" },
  { title: "Copy-to-Clipboard Feature", date: "2025-02-10" },
  { title: "Vite + React Performance Tweaks", date: "2025-02-10" },
  { title: "Debugging API Responses", date: "2025-02-10" },
  { title: "StarCoder API Integration", date: "2025-02-09" },
  { title: "Adding Live Customization Panel", date: "2025-02-09" },
  { title: "Converting React Components to Vue", date: "2025-02-09" },
  { title: "Implementing Tailwind with Vite", date: "2025-02-09" },
  { title: "Project Roadmap Discussion", date: "2025-02-09" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <p>{item.title}</p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
