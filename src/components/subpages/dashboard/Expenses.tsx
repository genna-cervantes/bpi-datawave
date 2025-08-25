"use client";

import { useStartup } from "@/contexts/StartupContext";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipShad } from "@radix-ui/react-tooltip";
import { Info, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatNumber } from "./Overview";

// Color palette for the pie chart
const chartColors = [
  "#3B82F6", // Blue
  "#14B8A6", // Teal
  "#F97316", // Orange
  "#EAB308", // Yellow
  "#A855F7", // Purple
  "#22C55E", // Green
  "#EF4444", // Red
  "#8B5CF6", // Violet
];

interface ExpensesData {
  data: {
    month: string;
    total_expenses: number;
    product_dev_amount: number;
    product_dev_pct: number;
    manpower_amount: number;
    manpower_pct: number;
    marketing_amount: number;
    marketing_pct: number;
    operations_amount: number;
    operations_pct: number;
    other_amount: number;
    other_pct: number;
  }[];
  summary: {
    product_dev_pct: number;
    manpower_pct: number;
    marketing_pct: number;
    operations_pct: number;
    other_pct: number;
    total_avg_expenses: number;
  }
}

export default function Expenses() {

  const {startupName} = useStartup();
  const [expenseData, setExpenseData] = useState<ExpensesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URL}/db/expenses`, {
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
        setExpenseData(data);

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
        <PieChart data={[]}></PieChart>
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

  if (!expenseData){
    return null;
  }

  // Transform summary data for the pie chart
  const chartData = Object.entries(expenseData.summary)
    .filter(([key]) => key !== 'total_avg_expenses')
    .map(([key, value], index) => ({
      name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: value,
      color: chartColors[index % chartColors.length]
    }));

  return (
    <div className="flex ">
      <div className="w-1/2">
        <div className="flex flex-col ">
          <div className="w-full">
            <ExpensesPieChart data={chartData} />
          </div>

          <div className="px-2 grid grid-cols-3 gap-x-4  gap-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-xs">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600">
                    {formatNumber(item.value)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="bg-white rounded-lg px-3 py-3 border text-xs">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-900">Cost Optimization</h2>
            <p className="text-xs text-gray-600">AI-powered savings recommendations</p>
          </div>
          
          {/* Potential Savings Summary */}
          <div className="border rounded-md px-3 py-2 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                <p className="text-xsfont-medium">Potential Savings:</p>
                <p className="text-xs font-bold ">$2,400/month</p>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="space-y-2">
            {/* SaaS Subscriptions */}
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[0.80rem] text-gray-900">SaaS Subscriptions</h3>
                <span className="bg-red-200 border border-red-500 text-red-900 text-xs font-medium px-2 rounded-sm">
                  High Impact
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                You have 3 unused licenses in your design tools subscription.
              </p>
              <span className="flex items-center gap-x-2 mt-1">
                <p className="text-green-600 font-semibold text-xs">
                    Save $840/month
                </p>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                      <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                        Ask AI
                      </button>
                    </TooltipContent>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-700" />
                    </TooltipTrigger>
                  </TooltipShad>
                </TooltipProvider>
              </span>
            </div>
            
            {/* Cloud Infrastructure */}
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[0.80rem] text-gray-900">Cloud Infrastructure</h3>
                <span className="bg-gray-100 text-xs font-medium px-2 rounded-sm">
                  Medium Impact
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                You have 3 unused licenses in your design tools subscription.
              </p>
              <span className="flex items-center gap-x-2 mt-1">
                <p className="text-green-600 font-semibold text-xs">
                    Save $840/month
                </p>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                      <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                        Ask AI
                      </button>
                    </TooltipContent>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-700" />
                    </TooltipTrigger>
                  </TooltipShad>
                </TooltipProvider>
              </span>
            </div>
            
            {/* Office Expenses */}
            <div className="border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-[0.80rem] text-gray-900">Office Expenses</h3>
                <span className="bg-gray-100 text-xs font-medium px-2 rounded-sm">
                  Medium Impact
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                You have 3 unused licenses in your design tools subscription.
              </p>
              <span className="flex items-center gap-x-2 mt-1">
                <p className="text-green-600 font-semibold text-xs">
                    Save $840/month
                </p>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                      <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                        Ask AI
                      </button>
                    </TooltipContent>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-700" />
                    </TooltipTrigger>
                  </TooltipShad>
                </TooltipProvider>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function ExpensesPieChart({data}: {data: Array<{name: string, value: number, color: string}>}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
