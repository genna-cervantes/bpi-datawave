import Cashflow from "@/components/subpages/dashboard/Cashflow";
import Expenses from "@/components/subpages/dashboard/Expenses";
import Overview from "@/components/subpages/dashboard/Overview";
import Revenue from "@/components/subpages/dashboard/Revenue";
import Runway from "@/components/subpages/dashboard/Runway";

export default function DashboardSubpage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "overview") {
    return <Overview />;
  }

  if (params.slug === "cashflow") {
    return <Cashflow />;
  }

  if (params.slug === "revenue") {
    return <Revenue />;
  }
  if (params.slug === "expenses") {
    return <Expenses />;
  }
  if (params.slug === "runway") {
    return <Runway />;
  }
}
