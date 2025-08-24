'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Blend, Clock, DollarSign, HandCoins, Info, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useStartup } from '@/contexts/StartupContext';

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

export default function Overview(){
    const { startupName } = useStartup();
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8000/db/overview', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ startup_name: startupName }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
                console.error('Error fetching overview data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOverviewData();
    }, [startupName]);

    if (loading) {
        return (
            <div className="flex flex-col gap-y-3">
                <div className="px-1 grid grid-cols-4 gap-x-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="border rounded-md px-3 py-3">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                                <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-32"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-x-3 px-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border rounded-md px-3 py-3">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-16 mb-3"></div>
                                <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-28"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value: number, decimals: number = 1) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value);
    };

    return (
        <div className="flex flex-col gap-y-3">
            <div className="px-1 grid grid-cols-4 gap-x-3">
        
        {/* current cash */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>Current Cash</h1>
                <DollarSign className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                    <h1 className="text-lg font-bold">{formatCurrency(data.current_cash)}</h1>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipContent>
                            <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                Ask AI
                            </button>
                        </TooltipContent>
                        <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-700" />
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </span>
                <p className="text-xs">+<span className="font-semibold text-green-500">2.1%</span> from last month</p>
            </div>
        </div>

        {/* monthly burn */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>Monthly Burn</h1>
                <TrendingDown className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                <h1 className="text-lg font-bold">{formatCurrency(data.monthly_burn)}</h1>
                <TooltipProvider>
                        <Tooltip>
                        <TooltipContent>
                            <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                Ask AI
                            </button>
                        </TooltipContent>
                        <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-700" />
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </span>
                <p className="text-xs">+<span className="font-semibold text-red-500">5.1%</span> from last month</p>
            </div>
        </div>

        {/* mrr */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>MRR</h1>
                <TrendingUp className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                <h1 className="text-lg font-bold">{formatCurrency(data.mrr)}</h1>
                <TooltipProvider>
                        <Tooltip>
                        <TooltipContent>
                            <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                Ask AI
                            </button>
                        </TooltipContent>
                        <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-700" />
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </span>

                <p className="text-xs">+<span className="font-semibold text-green-500">12.3%</span> from last month</p>
            </div>
        </div>

        {/* runway */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>Runway</h1>
                <Clock className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                    <h1 className="text-lg font-bold">{data.runway} months</h1>
                    <TooltipProvider>
                            <Tooltip>
                            <TooltipContent>
                                <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                    Ask AI
                                </button>
                            </TooltipContent>
                            <TooltipTrigger>
                                <Info className="h-3 w-3 text-gray-700" />
                            </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>

                </span>
            </div>
        </div>
    </div>
    <div className="grid grid-cols-3 gap-x-3 px-1">
        {/* arr */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>ARR</h1>
                <TrendingUp className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                <h1 className="text-lg font-bold">{formatCurrency(data.arr)}</h1>
                <TooltipProvider>
                        <Tooltip>
                        <TooltipContent>
                            <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                Ask AI
                            </button>
                        </TooltipContent>
                        <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-700" />
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </span>

                <p className="text-xs">+<span className="font-semibold text-green-500">5.1%</span> from last month</p>
            </div>
        </div>
        
        {/* ltv cac */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>LTV:CAC</h1>
                <Blend className="w-4 h-4" />
            </span>
            <div className="mt-3">
                <span className="flex items-center gap-x-2">
                <h1 className="text-lg font-bold">{formatNumber(data.ltv / data.cac, 1)}:1</h1>
                <TooltipProvider>
                        <Tooltip>
                        <TooltipContent>
                            <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                Ask AI
                            </button>
                        </TooltipContent>
                        <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-700" />
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </span>
                <p className="text-xs">LTV: {formatCurrency(data.ltv)} | CAC: {formatCurrency(data.cac)}</p>
            </div>
        </div>

        {/* payback period */}
        <div className="border rounded-md px-3 py-3">
            <span className="flex justify-between items-center text-xs">
                <h1>Payback Period</h1>
                <HandCoins className="w-4 h-4" />
            </span>
            <div className="mt-3 flex flex-col items-start">
                <span className="gap-x-2 flex items-center">
                <h1 className="text-lg font-bold">{formatNumber(data.payback_period, 1)} Months</h1>
                <TooltipProvider>
                        <Tooltip>
                        <TooltipContent>
                            <button className="cursor-pointer bg-gray-200 text-xs mb-2 px-2 py-1 rounded-sm">
                                Ask AI
                            </button>
                        </TooltipContent>
                        <TooltipTrigger>
                            <Info className="h-3 w-3 text-gray-700" />
                        </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </span>
                <p className="text-xs px-2 bg-green-300 rounded-sm border border-green-500">Healthy</p>
            </div>
        </div>
    </div>
        </div>
    )
}