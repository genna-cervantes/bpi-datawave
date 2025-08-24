'use client'

import { useStartup } from '@/contexts/StartupContext'

const startupData = {
  'PopOps': {
    description: 'EcoCart Logistics is a green supply chain startup focused on last-mile delivery using electric bikes and solar-powered charging hubs in urban centers.',
    startingFund: '$750,000',
    mrr: '$45,000',
    monthlyExpenses: '$38,000',
    riskTolerance: 'Moderate'
  },
  'SamSamTech': {
    description: 'NeuroLearn AI builds personalized learning assistants powered by generative AI, helping students with real-time feedback, adaptive exercises, and multilingual tutoring.',
    startingFund: '$1,200,000',
    mrr: '$90,000',
    monthlyExpenses: '$65,000',
    riskTolerance: 'High'
  },
  'Craftly Market': {
    description: 'Craftly Market is a curated online marketplace that connects Filipino artisans to global buyers, focusing on handmade crafts, ethical sourcing, and sustainable packaging.',
    startingFund: '$250,000',
    mrr: '$12,000',
    monthlyExpenses: '$10,500',
    riskTolerance: 'Low'
  }
}

export default function Profile() {
  const { startupName, setStartupName } = useStartup()
  const currentStartup = startupData[startupName as keyof typeof startupData]
  
  return (
    <div className="font-mono flex items-center flex-col gap-y-4 h-full justify-center py-24">
      <div className="border px-4 py-3 w-2/3 rounded-md">
        <div className="flex items-center gap-x-4">
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="w-8 h-8 rounded-md bg-[var(--main-red)]"></div>
              <h1 className="text-sm font-semibold">{startupName}</h1>
            </div>
            <p className="text-xs mt-2">
              {currentStartup.description}
            </p>
            <div className="text-xs mt-2">
              <p>Key Metrics:</p>
              <div className="grid grid-cols-2 grid-rows-2">
                <p>Starting Fund: <span className="font-semibold">{currentStartup.startingFund}</span></p>
                <p>MRR: <span className="font-semibold">{currentStartup.mrr}</span></p>
                <p>Monthly Expenses: <span className="font-semibold">{currentStartup.monthlyExpenses}</span></p>
                <p>Risk Tolerance: <span className="font-semibold">{currentStartup.riskTolerance}</span></p>
              </div>
            </div>
          </div>
          <button className="text-xs px-2 py-2 shrink-0 bg-gray-100 cursor-default font-semibold rounded-md">
            Current
          </button>
        </div>
      </div>
      
      <div className="flex gap-x-4 w-2/3">
        <button 
          onClick={() => setStartupName('EcoCart Logistics')}
          className={`flex-1 text-xs px-4 py-2 font-semibold rounded-md ${
            startupName === 'EcoCart Logistics' 
              ? 'bg-gray-100 cursor-default' 
              : 'bg-[var(--main-red)] text-white cursor-pointer hover:bg-[var(--main-red)]'
          }`}>
          {startupName === 'EcoCart Logistics' ? 'Current' : 'Switch to EcoCart'}
        </button>
        <button 
          onClick={() => setStartupName('NeuroLearn AI')}
          className={`flex-1 text-xs px-4 py-2 font-semibold rounded-md ${
            startupName === 'NeuroLearn AI' 
              ? 'bg-gray-100 cursor-default' 
              : 'bg-[var(--main-red)] text-white cursor-pointer hover:bg-[var(--main-red)]'
          }`}>
          {startupName === 'NeuroLearn AI' ? 'Current' : 'Switch to NeuroLearn'}
        </button>
        <button 
          onClick={() => setStartupName('Craftly Market')}
          className={`flex-1 text-xs px-4 py-2 font-semibold rounded-md ${
            startupName === 'Craftly Market' 
              ? 'bg-gray-100 cursor-default' 
              : 'bg-[var(--main-red)] text-white cursor-pointer hover:bg-[var(--main-red)]'
          }`}>
          {startupName === 'Craftly Market' ? 'Current' : 'Switch to Craftly'}
        </button>
      </div>
    </div>
  );
}
