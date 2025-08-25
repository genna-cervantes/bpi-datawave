"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { DollarSign, Info } from "lucide-react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipShad,
} from "@radix-ui/react-tooltip";
import { useStartup } from "@/contexts/StartupContext";
import { formatCurrency } from "./Overview";
import { useRouter } from "next/navigation";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     qv: 6000,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     qv: 6000,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     qv: 6000,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     qv: 6000,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     qv: 6000,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     qv: 6000,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     qv: 6000,
//     amt: 2100,
//   },
// ];

interface CashflowData {
  data: {
    month: string;
    cash_in: number;
    cash_out: number;
    cash_balance: number;
    net_flow: number;
  }[];
  summary: {
    initial_cash: number;
    current_balance: number;
    total_months: number;
  };
}

export default function Cashflow() {
  const { startupName } = useStartup();
  const [data, setData] = useState<CashflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCashflowData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/db/cashflow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startup_name: startupName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cashflow data");
        }

        const data = await response.json();
        setData(data);

        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchCashflowData();
  }, [startupName]);

  if (loading) {
    // skeleton
    return <div className="flex px-2 gap-x-3">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[]}></LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-2/3 flex flex-col gap-y-3">
        <div className="border rounded-md px-3 py-3">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="border rounded-md px-3 py-3">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>;
  }

  if (error) {
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
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex px-2 gap-x-3">
      <CashFlowChart data={data.data} />
      <div className="w-2/3 flex flex-col gap-y-3">
        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Cash Position</h1>
            <DollarSign className="w-4 h-4" />
          </span>
          <div className="mt-3">
            <span className="flex items-center gap-x-2">
              <h1 className="text-lg font-bold">{formatCurrency(data.summary.current_balance)}</h1>
              <TooltipProvider>
                <TooltipShad>
                  <TooltipContent>
                  <button onClick={() => {
                                router.push('/assistant?message=How to compute current cash balance?');
                            }} className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                      Ask AI
                    </button>
                  </TooltipContent>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-gray-700" />
                  </TooltipTrigger>
                </TooltipShad>
              </TooltipProvider>
            </span>
            <span className="flex justify-between items-center">
              <p className="text-xs">Operating Account</p>
              <p className="text-xs">{formatCurrency(data.summary.current_balance * .8)}</p>
            </span>
            <span className="flex justify-between items-center">
              <p className="text-xs">Reserve Fund</p>
              <p className="text-xs">{formatCurrency(data.summary.current_balance * .2)}</p>
            </span>
          </div>
        </div>

        <div className="border rounded-md px-3 py-3">
          <span className="flex justify-between items-center text-xs">
            <h1>Upcoming Payments</h1>
          </span>
          <div className="mt-3 flex flex-col gap-y-2">
            <span className="flex justify-between items-center">
              <span>
                <p className="text-xs font-semibold">Payroll</p>
                <p className="text-xs text-gray-400 ">Due in 5 days</p>
              </span>
              <p className="text-xs">{formatCurrency(startupName === "PopOps" ? 28000 : 10000)}</p>
            </span>
            <span className="flex justify-between items-center">
              <span>
                <p className="text-xs font-semibold">AWS</p>
                <p className="text-xs text-gray-400 ">Due in 12 days</p>
              </span>
              <p className="text-xs">{formatCurrency(startupName === "PopOps" ? 3200 : 800)}</p>
            </span>
            <span className="flex justify-between items-center">
              <span>
                <p className="text-xs font-semibold">Office Rent</p>
                <p className="text-xs text-gray-400 ">Due in 18 days</p>
              </span>
              <p className="text-xs">{formatCurrency(startupName === "PopOps" ? 4500 : 1500)}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CashFlowChart({ data }: { data: CashflowData["data"] }) {
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
          <Legend  />
          <Line
            type="monotone"
            dataKey="cash_balance"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="cash_in" stroke="#82ca9d" />
          <Line type="monotone" dataKey="cash_out" stroke="#fb2c36" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
