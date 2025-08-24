import Overview from "@/components/subpages/dashboard/Overview";
import DashboardNavigation from "@/components/ui/DashboardNavigation";
import { ArrowUpDown, BanknoteArrowDown, BanknoteArrowUp, Bell, PanelsTopLeft, Plane } from "lucide-react";

export default function Dashboard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return <div className="px-2 py-4 font-mono flex flex-col">

    <p className="text-sm font-semibold">Your startup's financial health at a glance,</p>

    <div className="flex flex-col gap-y-4">
    {/* runway alert */}
    <div className="bg-red-200 border border-red-700 flex flex-col gap-y-1 rounded-md px-4 py-2 mt-2">
      <span className="flex gap-x-2 text-red-700">
        <Bell className="h-4 w-4" />
        <p className="text-xs">Runway Alert</p>
      </span>
      <div>
        <h1 className="font-bold">11 months</h1>
        <h2 className="text-xs">You have 11 months of runway remaining at current burn rate.</h2>
      </div>
    </div>

    {/* navigation */}
    <DashboardNavigation />

    {/* views */}
    {children}
    </div>
  </div>;
} 