import React, { useState } from 'react'
import { ChevronDown, Map, FileText, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import StatusBar from '../components/StatusBar'
import StakeholderBottomNav from '../components/StakeholderBottomNav'
import { stakeholderRegions, getStakeholderData, stakeholderReports } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl p-2.5 shadow-lg border border-gray-100">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-bold text-primary">{payload[0].value} tonnes</p>
      </div>
    )
  }
  return null
}

export default function StakeholderReportsScreen() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)

  const regionData = getStakeholderData(selectedRegion)
  const report = stakeholderReports[selectedRegion] || stakeholderReports['All Regions']

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        <div className="px-4 pt-2 pb-4">
          <h1 className="text-xl font-bold text-gray-900">Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">Monthly performance summary</p>
        </div>

        <div className="px-4 space-y-3">
          {/* Region selector */}
          <div className="relative">
            <button
              className="w-full card p-3 flex items-center justify-between"
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
            >
              <div className="flex items-center gap-2">
                <Map size={16} color="#2E7D32"/>
                <span className="text-sm font-semibold text-gray-800">Region: {selectedRegion}</span>
              </div>
              <ChevronDown size={16} color="#6B7280" style={{ transform: showRegionDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}/>
            </button>
            {showRegionDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 z-10 overflow-hidden">
                {stakeholderRegions.map(region => (
                  <button
                    key={region}
                    className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    style={{ color: selectedRegion === region ? '#2E7D32' : '#212121' }}
                    onClick={() => { setSelectedRegion(region); setShowRegionDropdown(false) }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Summary card */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={15} color="#2E7D32"/>
              <p className="text-sm font-semibold text-gray-700">Summary</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{report.summary}</p>
          </div>

          {/* Production trend */}
          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Production Trend (tonnes)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={report.productionTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={28}/>
                <Tooltip content={<CustomTooltip />}/>
                <Bar dataKey="tonnes" fill="#2E7D32" radius={[6, 6, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key metrics recap */}
          <div className="flex gap-3">
            <div className="card p-4 flex-1">
              <p className="text-2xl font-bold text-gray-900">{regionData.totalFarms}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Total Farms</p>
            </div>
            <div className="card p-4 flex-1">
              <p className="text-2xl font-bold text-primary">{regionData.avgHealthScore}%</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Avg Health Score</p>
            </div>
          </div>

          {/* Top issues */}
          <div className="card p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Top Issues This Month</p>
            <div className="space-y-2">
              {report.topIssues.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl" style={{ background: '#FFF3E0' }}>
                  <AlertTriangle size={14} color="#FB8C00" className="mt-0.5"/>
                  <span className="text-sm text-gray-700 flex-1">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StakeholderBottomNav />
    </div>
  )
}
