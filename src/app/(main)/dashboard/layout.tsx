import RunwayAlert from "@/components/RunwayAlert";
import DashboardNavigation from "@/components/ui/DashboardNavigation";

export default function Dashboard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return <div className="px-2 py-4 font-mono flex flex-col">

    <p className="text-sm font-semibold">Your startup's financial health at a glance,</p>

    <div className="flex flex-col gap-y-4">
    {/* runway alert */}
    <RunwayAlert />

    {/* navigation */}
    <DashboardNavigation />

    {/* views */}
    {children}
    </div>
  </div>;
} 