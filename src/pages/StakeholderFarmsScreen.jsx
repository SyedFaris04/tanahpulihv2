import React, { useState } from 'react'
import { ChevronDown, Map, Search } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import StakeholderBottomNav from '../components/StakeholderBottomNav'
import { stakeholderRegions, getStakeholderData } from '../data/mockData'

const statusStyles = {
  Healthy: { color: '#2E7D32', bg: '#E8F5E9' },
  Moderate: { color: '#FB8C00', bg: '#FFF3E0' },
  Severe: { color: '#E53935', bg: '#FFEBEE' },
}

function FarmCard({ farm }) {
  const style = statusStyles[farm.status] || statusStyles.Healthy
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-bold text-gray-900">{farm.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{farm.owner} · {farm.id}</p>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-1 rounded-full"
          style={{ color: style.color, background: style.bg }}
        >
          {farm.status}
        </span>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 font-medium">Size</p>
          <p className="text-sm font-semibold text-gray-800">{farm.size}</p>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 font-medium">Health Score</p>
          <p className="text-sm font-bold text-primary">{farm.health}%</p>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 font-medium">Active Alerts</p>
          <p className="text-sm font-semibold text-alert-red">{farm.alerts}</p>
        </div>
      </div>
    </div>
  )
}

export default function StakeholderFarmsScreen() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [showRegionDropdown, setShowRegionDropdown] = useState(false)
  const [query, setQuery] = useState('')

  const regionData = getStakeholderData(selectedRegion)
  const farms = regionData.farms.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.owner.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        <div className="px-4 pt-2 pb-4">
          <h1 className="text-xl font-bold text-gray-900">Farms</h1>
          <p className="text-xs text-gray-500 mt-0.5">{farms.length} farm{farms.length !== 1 ? 's' : ''} in {selectedRegion}</p>
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

          {/* Search */}
          <div className="card p-3 flex items-center gap-2">
            <Search size={16} color="#9CA3AF"/>
            <input
              className="flex-1 text-sm outline-none bg-transparent"
              placeholder="Search by farm or owner name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Farm list */}
          <div className="space-y-3 pb-4">
            {farms.length > 0 ? (
              farms.map(farm => <FarmCard key={farm.id} farm={farm} />)
            ) : (
              <div className="card p-6 text-center text-sm text-gray-400">No farms match your search.</div>
            )}
          </div>
        </div>
      </div>
      <StakeholderBottomNav />
    </div>
  )
}
