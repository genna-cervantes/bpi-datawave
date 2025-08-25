"use client";

import {
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  AreaChart,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { BanknoteArrowDown, CreditCard, Info, Smartphone } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip as TooltipShad } from "@radix-ui/react-tooltip";
import { useStartup } from "@/contexts/StartupContext";
import { formatCurrency, formatNumber } from "./Overview";
import { useRouter } from "next/navigation";


interface RevenueData {
  data: {
    month: string;
    revenue: number;
    mrr_growth_amount: number;
    mrr_growth_pct: number;
    churn_rate: number;
    arpu: number;
    nrr: number;
    active_customers: number;
    new_customers: number;
  }[];
  summary: {
    avg_mrr_growth_pct: number;
    avg_churn_rate: number;
    avg_arpu: number;
    avg_nrr: number;
    total_months: number;
  }
}

export default function Revenue() {

  const {startupName} = useStartup();
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {

    const fetchRevenueData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/db/revenue`, {
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
        setData(data);

        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchRevenueData();
  }, [startupName]);


  if (loading){
    return <div className="flex px-2 gap-x-3">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={[]}></AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="w-2/3 flex flex-col gap-y-3">
        <div className="border rounded-md px-3 py-3">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="grid mt-2 grid-cols-2 grid-rows-2 gap-x-3 gap-y-3">
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="mt-4 border-t flex flex-col gap-y-2 w-full">
              <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-3 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>;
    
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
  );
  }

  if (!data){
    return null;
  }

  return (
    <div className="flex items-start">
      <Example data={data.data} />

      <div className="border rounded-md px-3 py-3 w-2/3">
        <span className="flex justify-between items-center">
          <span className="flex flex-col text-xs">
            <h1 className="font-semibold text-sm">Revenue Metrics</h1>
            <p className="text-gray-500">Key performance Indicators</p>
          </span>
          <BanknoteArrowDown className="w-4 h-4" />
        </span>
        <div className="mt-5 pb-4 border-b">
          <div className="grid grid-cols-2 grid-rows-2 px-4 gap-y-3">
            <span>
              <p className="text-xs">MRR Growth Rate</p>
              <span className="flex items-center gap-x-2">
                <h1 className=" text-green-400 font-semibold">{formatNumber(data.summary.avg_mrr_growth_pct)}%</h1>  
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                    <button onClick={() => {
                                router.push('/assistant?message=How to compute MRR growth rate?');
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
            </span>
            <span>
              <p className="text-xs">Churn Rate</p>
              <span className="flex items-center gap-x-2">
                <h1 className=" text-red-400 font-semibold">{formatNumber(data.summary.avg_churn_rate)}%</h1>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                    <button onClick={() => {
                                router.push('/assistant?message=How to compute churn rate?');
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
            </span>
            <span>
              <p className="text-xs">ARPU</p>
              <span className="flex items-center gap-x-2">
                <h1 className="font-semibold">{formatCurrency(data.summary.avg_arpu)}</h1>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                    <button onClick={() => {
                                router.push('/assistant?message=How to compute ARPU?');
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
            </span>
            <span>
              <p className="text-xs">Net Revenue Retention</p>
              <span className="flex items-center gap-x-2">
                <h1 className=" text-green-400 font-semibold">{formatNumber(data.summary.avg_nrr)}%</h1>
                <TooltipProvider>
                  <TooltipShad>
                    <TooltipContent>
                    <button onClick={() => {
                                router.push('/assistant?message=How to compute net revenue retention?');
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
            </span>
          </div>
        </div>
        <div className="text-xs mt-3">
            <p>Payment Processors</p>
            <div className="flex flex-col mt-1 px-1 gap-y-2">
                <span className="flex w-full justify-between">
                    <span className="flex items-center gap-x-2">
                        <CreditCard className="w-4 h-4" />
                        Stripe
                    </span>
                    <p className="px-2 bg-green-300 border border-green-500 rounded-sm">Connected</p>
                </span>
                <span className="flex w-full justify-between">
                    <span className="flex items-center gap-x-2">
                        <Smartphone className="w-4 h-4" />
                        Paypal
                    </span>
                    <p className="px-2 bg-gray-100 cursor-pointer border rounded-sm">Connect</p>
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}

export function Example({data}: {data: RevenueData["data"]}) {
  return (
    
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#333" }}  />
          <YAxis tick={{ fontSize: 12, fill: "#333" }} />
          <Tooltip contentStyle={{ fontSize: "12px" }}
                labelStyle={{ fontSize: "12px" }} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    
  );
}
