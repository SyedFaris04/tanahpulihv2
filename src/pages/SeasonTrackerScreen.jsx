import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Circle, Clock, Calendar, Droplets, Leaf, Sun, Wheat } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const STAGES = [
  {
    id: 1,
    name: 'Land Preparation',
    icon: '🚜',
    color: '#8D6E63',
    bgColor: '#EFEBE9',
    duration: 14,
    startDay: 0,
    description: 'Ploughing, levelling, and preparing field bunds for planting.',
    tips: [
      'Plough to 20–25 cm depth for best results',
      'Apply lime if soil pH is below 5.5',
      'Ensure proper bund height to retain water',
    ],
    status: 'done',
  },
  {
    id: 2,
    name: 'Nursery & Seeding',
    icon: '🌱',
    color: '#43A047',
    bgColor: '#E8F5E9',
    duration: 21,
    startDay: 14,
    description: 'Seed germination and nursery management before transplanting.',
    tips: [
      'Soak seeds for 24h then incubate for 48h',
      'Maintain 2–3 cm water depth in nursery',
      'Apply nursery fertilizer at day 7',
    ],
    status: 'done',
  },
  {
    id: 3,
    name: 'Transplanting',
    icon: '🌿',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    duration: 7,
    startDay: 35,
    description: 'Moving seedlings from nursery to the main field.',
    tips: [
      'Transplant seedlings at 21–25 days old',
      'Plant 2–3 seedlings per hill, 20×20 cm spacing',
      'Keep field flooded at 3–5 cm after transplanting',
    ],
    status: 'done',
  },
  {
    id: 4,
    name: 'Vegetative Growth',
    icon: '🌾',
    color: '#1976D2',
    bgColor: '#E3F2FD',
    duration: 35,
    startDay: 42,
    description: 'Active tillering and leaf development stage. Most critical for NDVI monitoring.',
    tips: [
      'Apply 1st top dressing nitrogen at 21 DAS',
      'Monitor for brown spot and blast disease',
      'Maintain 5–10 cm water depth',
    ],
    status: 'current',
    currentDay: 18,
  },
  {
    id: 5,
    name: 'Reproductive / Flowering',
    icon: '🌸',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    duration: 30,
    startDay: 77,
    description: 'Panicle initiation, heading, and anthesis. Very sensitive to stress.',
    tips: [
      'Apply 2nd top dressing at panicle initiation',
      'Ensure no water stress during flowering',
      'Watch for neck blast and sheath blight',
    ],
    status: 'upcoming',
  },
  {
    id: 6,
    name: 'Ripening',
    icon: '🌕',
    color: '#F57F17',
    bgColor: '#FFF8E1',
    duration: 30,
    startDay: 107,
    description: 'Grain filling and maturation. NDVI values will decline naturally.',
    tips: [
      'Drain field 2 weeks before harvest',
      'Monitor for grain discolouration',
      'Test grain moisture — harvest at 22–25%',
    ],
    status: 'upcoming',
  },
  {
    id: 7,
    name: 'Harvest',
    icon: '🏆',
    color: '#E65100',
    bgColor: '#FBE9E7',
    duration: 7,
    startDay: 137,
    description: 'Mechanical or manual harvesting and field cleanup.',
    tips: [
      'Harvest when 80–85% of grains are golden',
      'Use combine harvester for best efficiency',
      'Store paddy at below 14% moisture content',
    ],
    status: 'upcoming',
  },
]

const TOTAL_DAYS = 144
const PLANTING_DATE = new Date('2024-05-12')

function daysSincePlanting() {
  const today = new Date()
  const diff = Math.floor((today - PLANTING_DATE) / (1000 * 60 * 60 * 24))
  return Math.max(0, Math.min(diff, TOTAL_DAYS))
}

function formatDate(daysFromStart) {
  const d = new Date(PLANTING_DATE)
  d.setDate(d.getDate() + daysFromStart)
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function SeasonTrackerScreen() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(4) // current stage open by default
  const elapsed = daysSincePlanting()
  const progress = Math.round((elapsed / TOTAL_DAYS) * 100)
  const currentStage = STAGES.find(s => s.status === 'current')
  const daysToHarvest = TOTAL_DAYS - elapsed

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft size={22} color="#212121" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Season Tracker</h1>
            <p className="text-xs text-gray-400">MR219 · Planted 12 May 2024</p>
          </div>
        </div>

        <div className="px-4 space-y-3">

          {/* Season overview card */}
          <div className="card p-4" style={{ background: 'linear-gradient(135deg,#1B5E20,#2E7D32)' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-white/70 text-xs font-medium mb-1">Current Stage</p>
                <p className="text-white font-bold text-lg">{currentStage?.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Clock size={12} color="rgba(255,255,255,0.8)" />
                  <p className="text-white/80 text-xs">Day {elapsed} of {TOTAL_DAYS}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs font-medium">Harvest In</p>
                <p className="text-white font-bold text-2xl">{daysToHarvest}</p>
                <p className="text-white/70 text-xs">days</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-1">
              <div className="flex justify-between mb-1">
                <span className="text-white/70 text-[10px]">Season Progress</span>
                <span className="text-white text-[10px] font-bold">{progress}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.85)' }}
                />
              </div>
            </div>

            {/* Stage markers on bar */}
            <div className="relative h-3 mt-1">
              {STAGES.map(s => (
                <div
                  key={s.id}
                  className="absolute top-0 w-0.5 h-3"
                  style={{
                    left: `${(s.startDay / TOTAL_DAYS) * 100}%`,
                    background: 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>

            {/* Key dates */}
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <Calendar size={11} color="rgba(255,255,255,0.7)" />
                <span className="text-white/70 text-[10px]">Planted: 12 May 2024</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wheat size={11} color="rgba(255,255,255,0.7)" />
                <span className="text-white/70 text-[10px]">Est. Harvest: {formatDate(TOTAL_DAYS)}</span>
              </div>
            </div>
          </div>

          {/* Current stage highlight */}
          {currentStage && (
            <div className="card p-4" style={{ border: '2px solid #2E7D32' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs font-bold text-primary uppercase tracking-wide">You Are Here</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentStage.icon}</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900">{currentStage.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Day {currentStage.currentDay} of {currentStage.duration} in this stage
                  </p>
                  {/* Mini progress for current stage */}
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(currentStage.currentDay / currentStage.duration) * 100}%`,
                        background: '#2E7D32',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All stages timeline */}
          <p className="text-sm font-bold text-gray-700 px-1">Growing Stages</p>

          <div className="space-y-2">
            {STAGES.map((stage, idx) => {
              const isExpanded = expanded === stage.id
              const isDone = stage.status === 'done'
              const isCurrent = stage.status === 'current'
              const isUpcoming = stage.status === 'upcoming'

              return (
                <div key={stage.id} className="card overflow-hidden">
                  {/* Stage row */}
                  <button
                    className="w-full flex items-center gap-3 p-3.5 active:bg-gray-50 transition-colors"
                    onClick={() => setExpanded(isExpanded ? null : stage.id)}
                  >
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
                      {isDone ? (
                        <CheckCircle size={22} color="#43A047" fill="#E8F5E9" strokeWidth={2} />
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                        </div>
                      ) : (
                        <Circle size={22} color="#D1D5DB" strokeWidth={2} />
                      )}
                      {idx < STAGES.length - 1 && (
                        <div className="w-0.5 mt-1" style={{ height: 12, background: isDone ? '#43A047' : '#E5E7EB' }} />
                      )}
                    </div>

                    {/* Stage info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{stage.icon}</span>
                        <p className={`text-sm font-bold ${isDone ? 'text-gray-500' : isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                          {stage.name}
                        </p>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#2E7D32' }}>
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {formatDate(stage.startDay)} · {stage.duration} days
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronLeft
                      size={16}
                      color="#9CA3AF"
                      style={{ transform: isExpanded ? 'rotate(-90deg)' : 'rotate(180deg)', transition: 'transform 0.2s', flexShrink: 0 }}
                    />
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                      <p className="text-xs text-gray-600 leading-relaxed mt-3 mb-3">
                        {stage.description}
                      </p>
                      <p className="text-xs font-bold text-gray-700 mb-2">Key Actions</p>
                      <div className="space-y-2">
                        {stage.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                 style={{ background: stage.bgColor }}>
                              <span style={{ fontSize: 9, fontWeight: 700, color: stage.color }}>{i + 1}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                      {isCurrent && (
                        <button
                          onClick={() => navigate('/scan')}
                          className="mt-3 w-full py-2.5 rounded-xl text-xs font-bold text-white"
                          style={{ background: '#2E7D32' }}
                        >
                          Scan Leaf for This Stage →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="pb-4" />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
