import AppSidebar from "@/components/ui/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
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
