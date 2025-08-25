"use client";
import { useStartup } from "@/contexts/StartupContext";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

interface OverviewData {
  current_cash: number;
  monthly_burn: number;
  mrr: number;
  runway: number;
  arr: number;
  ltv: number;
  cac: number;
  payback_period: number;
}

export default function RunwayAlert() {
  const { startupName } = useStartup();
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/db/overview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startup_name: startupName }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Error fetching overview data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [startupName]);

  if (loading) {
    return <div className="flex flex-col gap-y-2 px-3 py-4 w-full h-20 border-gray-300 border bg-gray-100 rounded-md animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded-sm"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-sm"></div>
    </div>;
  }

  if (error) {
    return null;
  }


  return (
    <div className="bg-red-200 border border-red-700 flex flex-col gap-y-1 rounded-md px-4 py-2 mt-2">
      <span className="flex gap-x-2 text-red-700">
        <Bell className="h-4 w-4" />
        <p className="text-xs">Runway Alert</p>
      </span>
      <div>
        <h1 className="font-bold">{data?.runway} months</h1>
        <h2 className="text-xs">
          You have {data?.runway} months of runway remaining at current burn
          rate.
        </h2>
      </div>
    </div>
  );
}
