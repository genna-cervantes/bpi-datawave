'use client'

import { LayoutDashboard, LogOut, MessageSquare, UserCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuItem, SidebarSeparator } from "./sidebar";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStartup } from "@/contexts/StartupContext";

export default function AppSidebar() {

    const { startupName } = useStartup()
    const pathname = usePathname();

    return (
        <Sidebar className="py-4 px-2 h-screen">
        <SidebarHeader>
            <SidebarGroupContent className="flex items-center font-mono text-sm gap-x-2">
                <div className="h-8 w-8 rounded-sm bg-[var(--main-red)]"></div>
                <div>
                  <p className="text-sm font-bold">{startupName}</p>
                  <p className="text-xs text-gray-500">Basic Plan</p>
                </div>
            </SidebarGroupContent>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>App</SidebarGroupLabel>
                <SidebarGroupContent className="flex flex-col gap-y-1 items-start font-mono px-1">
                    <SidebarMenuItem className={`w-full text-[0.8rem] flex hover:cursor-pointer hover:bg-gray-100 rounded-sm ${pathname === "/assistant" ? "bg-gray-100" : ""}`}>  
                        <Link href="/assistant" className="w-full flex items-center gap-x-3 py-2">
                            <MessageSquare className="w-4 h-4" />
                            <p>Assistant</p>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem className={`w-full flex hover:cursor-pointer text-[0.8rem] hover:bg-gray-100 rounded-sm ${pathname.startsWith("/dashboard") ? "bg-gray-100" : ""}`}>
                        <Link href="/dashboard/overview" className="w-full flex items-center gap-x-3 py-2">
                            <LayoutDashboard className="w-4 h-4" />
                            <p>Dashboard</p>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem className={`w-full flex hover:cursor-pointer text-[0.8rem] hover:bg-gray-100 rounded-sm ${pathname === "/profile" ? "bg-gray-100" : ""}`}>
                        <Link href="/profile" className="w-full flex items-center gap-x-3 py-2">
                            <UserCircle className="w-4 h-4" />
                            <p>Profile</p>
                        </Link>
                    </SidebarMenuItem>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator className="my-2" />
        <SidebarFooter className="pt-2 flex justify-between font-mono">
            <div className="flex items-center gap-x-2">
              <div className="h-8 w-8 rounded-sm bg-[var(--main-red)]"></div>
                <div>
                  <p className="text-sm font-bold">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
            </div>
        </SidebarFooter>
    </Sidebar>
    )
}