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
  
  return (
    <div className="font-mono flex items-center flex-col gap-y-4 h-full justify-center py-24">
      <div className="border px-4 py-3 w-2/3 rounded-md">
        <div className="flex items-center justify-between gap-x-4">
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="w-8 h-8 rounded-md bg-[var(--main-red)]"></div>
              <h1 className="text-sm font-semibold">PopOps</h1>
            </div>
            <p className="text-xs mt-2">
              {startupData['PopOps']['description']}
            </p>
            <div className="text-xs mt-2">
              <p>Key Metrics:</p>
              <div className="grid grid-cols-2 grid-rows-2">
                <p>Starting Fund: <span className="font-semibold">{startupData['PopOps'].startingFund}</span></p>
                <p>MRR: <span className="font-semibold">{startupData['PopOps'].mrr}</span></p>
                <p>Monthly Expenses: <span className="font-semibold">{startupData['PopOps'].monthlyExpenses}</span></p>
                <p>Risk Tolerance: <span className="font-semibold">{startupData['PopOps'].riskTolerance}</span></p>
              </div>
            </div>
          </div>
          <button 
          onClick={() => setStartupName('PopOps')}
          className={`flex-1 text-xs px-4 py-2 font-semibold rounded-md shrink-0 ${
            startupName === 'PopOps' 
              ? 'bg-gray-100 cursor-default' 
              : 'bg-[var(--main-red)] text-white cursor-pointer hover:bg-[var(--main-red)]'
          }`}>
          {startupName === 'PopOps' ? 'Current' : 'Switch to'}
        </button>
        </div>
      </div>

      <div className="border px-4 py-3 w-2/3 rounded-md">
        <div className="flex items-center gap-x-4">
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="w-8 h-8 rounded-md bg-[var(--main-red)]"></div>
              <h1 className="text-sm font-semibold">SamSamTech</h1>
            </div>
            <p className="text-xs mt-2">
              {startupData['SamSamTech']['description']}
            </p>
            <div className="text-xs mt-2">
              <p>Key Metrics:</p>
              <div className="grid grid-cols-2 grid-rows-2">
                <p>Starting Fund: <span className="font-semibold">{startupData['SamSamTech'].startingFund}</span></p>
                <p>MRR: <span className="font-semibold">{startupData['SamSamTech'].mrr}</span></p>
                <p>Monthly Expenses: <span className="font-semibold">{startupData['SamSamTech'].monthlyExpenses}</span></p>
                <p>Risk Tolerance: <span className="font-semibold">{startupData['SamSamTech'].riskTolerance}</span></p>
              </div>
            </div>
          </div>
          <button 
          onClick={() => setStartupName('SamSamTech')}
          className={`flex-1 text-xs px-4 py-2 font-semibold rounded-md shrink-0 ${
            startupName === 'SamSamTech' 
              ? 'bg-gray-100 cursor-default' 
              : 'bg-[var(--main-red)] text-white cursor-pointer hover:bg-[var(--main-red)]'
          }`}>
          {startupName === 'SamSamTech' ? 'Current' : 'Switch to'}
        </button>
        </div>
      </div>

      <div className="border px-4 py-3 w-2/3 rounded-md">
        <div className="flex items-center gap-x-4">
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="w-8 h-8 rounded-md bg-[var(--main-red)]"></div>
              <h1 className="text-sm font-semibold">Craftly Market</h1>
            </div>
            <p className="text-xs mt-2">
              {startupData['Craftly Market']['description']}
            </p>
            <div className="text-xs mt-2">
              <p>Key Metrics:</p>
              <div className="grid grid-cols-2 grid-rows-2">
                <p>Starting Fund: <span className="font-semibold">{startupData['Craftly Market'].startingFund}</span></p>
                <p>MRR: <span className="font-semibold">{startupData['Craftly Market'].mrr}</span></p>
                <p>Monthly Expenses: <span className="font-semibold">{startupData['Craftly Market'].monthlyExpenses}</span></p>
                <p>Risk Tolerance: <span className="font-semibold">{startupData['Craftly Market'].riskTolerance}</span></p>
              </div>
            </div>
          </div>
          <button 
          onClick={() => setStartupName('Craftly Market')}
          className={`flex-1 text-xs px-4 py-2 font-semibold rounded-md shrink-0 ${
            startupName === 'Craftly Market' 
              ? 'bg-gray-100 cursor-default' 
              : 'bg-[var(--main-red)] text-white cursor-pointer hover:bg-[var(--main-red)]'
          }`}>
          {startupName === 'Craftly Market' ? 'Current' : 'Switch to'}
        </button>
        </div>
      </div>
    </div>
  );
}
