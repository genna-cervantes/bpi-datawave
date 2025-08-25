"use client";

import {
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipShad,
} from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { useStartup } from "@/contexts/StartupContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RunwayData {
  data: {
    month: number;
    current_cash: number;
    optimistic_cash: number;
    pessimistic_cash: number;
    current_runway_remaining: number;
    optimistic_runway_remaining: number;
    pessimistic_runway_remaining: number;
  }[];
  summary: {
    current_cash: number;
    avg_monthly_revenue: number;
    avg_monthly_expenses: number;
    current_net_flow: number;
    scenarios: {
      current: {
        runway_months: number;
        net_flow: number;
        description: string;
      };
      optimistic: {
        runway_months: number;
        net_flow: number;
        description: string;
      };
      pessimistic: {
        runway_months: number;
        net_flow: number;
        description: string;
      };
    };
  }
}

export default function Runway() {

  const {startupName} = useStartup();
  const [runwayData, setRunwayData] = useState<RunwayData | null>(null);
  const [chartType, setChartType] = useState('cash');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/db/runway`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            startup_name: startupName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch revenue data");
        }


        const data = await response.json();
        setRunwayData(data);

        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    }

    fetchExpenseData()
  }, [startupName])

  if (loading){
    return <div className="flex px-2 gap-x-3">
    <div className="w-1/2 h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={[]}></LineChart>
      </ResponsiveContainer>
    </div>
    <div className="w-1/2 flex flex-col gap-y-3">
      <div className="border rounded-md px-3 py-3">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-28 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded my-3 w-full"></div>
          <div className="mt-4 border-t flex flex-col gap-y-2 w-full">
            <div className="h-8 bg-gray-200 rounded mb-3 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-3 w-full"></div>
            <div className="h-8 bg-gray-200 rounded mb-3 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  }

  if (error){
    return (
      <div className="flex flex-col gap-y-3">
          <div className="px-1">
              <div className="border rounded-md px-3 py-3 bg-red-50 border-red-200">
                  <p className="text-red-600 text-sm">Error loading data: {error}</p>
                  <button 
                      onClick={() => window.location.reload()} 
                      className="mt-2 text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
                  >
                      Retry
                  </button>
              </div>
          </div>
      </div>
    )
  }

  if (!runwayData){
    return null;
  }

  return (
    <div className="flex px-2 gap-x-3">
      <div className="flex flex-col w-2/3">
      {chartType === 'cash' ?<CashFlowChart data={runwayData.data} /> : <RunwayChart data={runwayData.data} />}
      <div className="flex gap-x-2 text-xs mx-8">
        <button className={`px-2 py-1 cursor-pointer rounded-md ${chartType === 'cash' ? 'bg-[var(--main-red)] text-white' : 'bg-gray-100'}`} onClick={() => setChartType('cash')}>Cash Flow</button>
        <button className={`px-2 py-1 cursor-pointer rounded-md ${chartType === 'runway' ? 'bg-[var(--main-red)] text-white' : 'bg-gray-100'}`} onClick={() => setChartType('runway')}>Runway</button>
      </div>
      </div>

      
      <div className="w-1/2 flex flex-col gap-y-3">
        {/* Funding History */}
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Funding History</h1>
          </span>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-x-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Series A</span>
                  <span className="text-xs">15% dilution</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">$2.5M raised</span>
                  <span className="text-xs text-gray-600">January 2024</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="w-1 h-4 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">Seed Round</span>
                  <span className="text-xs">20% dilution</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">$500K raised</span>
                  <span className="text-xs text-gray-600">June 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Burn Multiple */}
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Burn Multiple</h1>
          </span>
          <div className="mt-1">
            <div className="flex items-center gap-x-2">
              <h1 className="text-lg font-bold">1.6x</h1>
              <TooltipProvider>
                <TooltipShad>
                  <TooltipContent>
                  <button onClick={() => {
                                router.push('/assistant?message=How to compute burn multiple?');
                            }} className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                      Ask AI
                    </button>
                  </TooltipContent>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-gray-700" />
                  </TooltipTrigger>
                </TooltipShad>
              </TooltipProvider>
              <span className="bg-green-200 border border-green-500 text-xs px-2 rounded-sm">
                Good
              </span>
            </div>
            <p className="text-xs text-gray-600">Net Burn / Net New ARR</p>
          </div>
        </div>

        {/* Next Milestone */}
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Next Milestone</h1>
          </span>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Target ARR</span>
              <span className="text-xs font-semibold">$500K</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">Current ARR</span>
              <span className="text-xs font-semibold">$300,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">8 months to milestone</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RunwayChart({data}: {data: RunwayData["data"]}) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis tick={{ fontSize: 12, fill: "#333" }} />
          <Tooltip
            contentStyle={{ fontSize: "12px" }}
            labelStyle={{ fontSize: "12px" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="current_runway_remaining"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="optimistic_runway_remaining" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pessimistic_runway_remaining" stroke="#fb2c36" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CashFlowChart({data}: {data: RunwayData["data"]}) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis tick={{ fontSize: 12, fill: "#333" }} />
          <Tooltip
            contentStyle={{ fontSize: "12px" }}
            labelStyle={{ fontSize: "12px" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="current_cash"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="optimistic_cash" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pessimistic_cash" stroke="#fb2c36" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
