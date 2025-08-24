import AppSidebar from "@/components/ui/AppSidebar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LayoutDashboard, LogOut, MessageSquare, UserCircle } from "lucide-react";
import type { Metadata } from "next";
import { StartupProvider } from "@/contexts/StartupContext";

export const metadata: Metadata = {
  title: "Cashflow Guardian - Assistant",
  description:
    "Cashflow Guard is a tool that helps you manage your cashflow - Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <>
      <StartupProvider>
        <SidebarProvider className="bg-white">
          <AppSidebar />
          <SidebarInset>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </StartupProvider>
      {/* {children} */}
    </>
  );
}
