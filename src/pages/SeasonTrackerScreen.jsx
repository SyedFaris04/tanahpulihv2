import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Camera, Upload, X, Sun, Droplets, Thermometer, Wind, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

// Season detection results — simulated AI output based on visual cues
const SEASON_RESULTS = [
  {
    id: 'vegetative',
    stage: 'Vegetative Growth',
    emoji: '🌾',
    confidence: 91,
    daysRange: 'Day 42–77',
    color: '#1976D2',
    bgColor: '#E3F2FD',
    description: 'Crop is in active tillering phase. Leaves are lush green with dense canopy formation. Stem count and height are increasing rapidly.',
    indicators: [
      { label: 'Canopy Cover', value: 'Dense', status: 'good' },
      { label: 'Leaf Color',   value: 'Deep Green', status: 'good' },
      { label: 'Water Level',  value: 'Adequate', status: 'good' },
      { label: 'Stress Signs', value: 'None Detected', status: 'good' },
    ],
    actions: [
      'Apply 2nd nitrogen top dressing (50 kg/ha urea)',
      'Monitor for brown spot and blast disease',
      'Maintain 5–10 cm water depth in field',
      'Check for pest activity near field edges',
    ],
    nextStage: 'Flowering in ~17 days',
  },
  {
    id: 'flowering',
    stage: 'Reproductive / Flowering',
    emoji: '🌸',
    confidence: 87,
    daysRange: 'Day 77–107',
    color: '#7B1FA2',
    bgColor: '#F3E5F5',
    description: 'Panicles are emerging. This is a critical stress-sensitive phase. Ensure no water deficit and protect from neck blast.',
    indicators: [
      { label: 'Panicle',     value: 'Emerging',    status: 'good' },
      { label: 'Leaf Color',  value: 'Light Green',  status: 'warn' },
      { label: 'Water Level', value: 'Low — Check',  status: 'warn' },
      { label: 'Stress Signs','value': 'Mild Stress', status: 'warn' },
    ],
    actions: [
      'Ensure consistent water supply — no stress',
      'Apply potassium fertilizer (MOP 30 kg/ha)',
      'Spray fungicide for neck blast prevention',
      'Avoid pesticide application during anthesis',
    ],
    nextStage: 'Ripening in ~30 days',
  },
  {
    id: 'ripening',
    stage: 'Ripening',
    emoji: '🌕',
    confidence: 94,
    daysRange: 'Day 107–137',
    color: '#F57F17',
    bgColor: '#FFF8E1',
    description: 'Grains are filling and turning golden. NDVI values naturally declining. Begin drainage preparation for harvest.',
    indicators: [
      { label: 'Grain Color',  value: 'Golden Yellow', status: 'good' },
      { label: 'Leaf Color',   value: 'Yellowing',     status: 'warn' },
      { label: 'Water Level',  value: 'Start Draining', status: 'warn' },
      { label: 'Grain Fill',   value: '75% Complete',   status: 'good' },
    ],
    actions: [
      'Begin field drainage 2 weeks before harvest',
      'Test grain moisture regularly (target: 22–25%)',
      'Prepare combine harvester for operation',
      'Monitor for grain discolouration or lodging',
    ],
    nextStage: 'Harvest Ready in ~10 days',
  },
]

function IndicatorRow({ label, value, status }) {
  const color = status === 'good' ? '#43A047' : status === 'warn' ? '#FB8C00' : '#E53935'
  const bg    = status === 'good' ? '#E8F5E9' : status === 'warn' ? '#FFF3E0' : '#FFEBEE'
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: bg, color }}>{value}</span>
    </div>
  )
}

export default function SeasonTrackerScreen() {
  const navigate    = useNavigate()
  const cameraRef   = useRef(null)
  const galleryRef  = useRef(null)

  const [phase, setPhase]         = useState('idle')   // idle | scanning | result
  const [progress, setProgress]   = useState(0)
  const [previewSrc, setPreviewSrc] = useState(null)
  const [result, setResult]       = useState(null)

  // Pick a random result each time (prototype)
  const runScan = (imgUrl) => {
    setPreviewSrc(imgUrl)
    setPhase('scanning')
    setProgress(0)
    const picked = SEASON_RESULTS[Math.floor(Math.random() * SEASON_RESULTS.length)]
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setResult(picked)
          setTimeout(() => setPhase('result'), 300)
          return 100
        }
        return p + 4
      })
    }, 80)
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    runScan(URL.createObjectURL(file))
    e.target.value = ''
  }

  const reset = () => {
    setPhase('idle')
    setPreviewSrc(null)
    setResult(null)
    setProgress(0)
  }

  // ── RESULT VIEW ──────────────────────────────────────────────
  if (phase === 'result' && result) {
    return (
      <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
        <div className="flex-1 overflow-y-auto pb-1">
          <StatusBar />
          <div className="px-4 pt-2 pb-3 flex items-center gap-3">
            <button onClick={reset} className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft size={22} color="#212121" strokeWidth={2.5}/>
            </button>
            <h1 className="text-lg font-bold text-gray-900">Season Detection Result</h1>
          </div>

          <div className="px-4 space-y-3">

            {/* Main result card */}
            <div className="card p-4">
              <div className="flex items-start gap-3 mb-4">
                {/* Preview thumbnail */}
                {previewSrc && (
                  <div style={{ width: 72, height: 72, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={previewSrc} alt="scan" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle size={13} color="#43A047"/>
                    <p className="text-xs text-gray-400 font-semibold">Season Detected</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{result.emoji}</span>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">{result.stage}</h2>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{result.daysRange}</p>
                </div>
              </div>

              {/* Confidence + next stage */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-2xl p-3 text-center" style={{ background: '#F8F9F4' }}>
                  {/* Confidence arc */}
                  <div className="relative w-14 h-14 mx-auto mb-1">
                    <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="28" cy="28" r="22" fill="none" stroke="#E8F5E9" strokeWidth="5"/>
                      <circle cx="28" cy="28" r="22" fill="none" stroke="#2E7D32" strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 22}
                        strokeDashoffset={2 * Math.PI * 22 * (1 - result.confidence / 100)}/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color: '#2E7D32' }}>{result.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">Confidence</p>
                </div>
                <div className="flex-1 rounded-2xl p-3 flex flex-col items-center justify-center text-center" style={{ background: '#F8F9F4' }}>
                  <span className="text-xl mb-1">⏭️</span>
                  <p className="text-[10px] text-gray-400 font-medium">Next Stage</p>
                  <p className="text-xs font-bold text-gray-700 mt-0.5 leading-tight">{result.nextStage}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card p-4">
              <p className="text-sm font-bold text-gray-800 mb-2">What This Means</p>
              <p className="text-xs text-gray-600 leading-relaxed">{result.description}</p>
            </div>

            {/* Field Indicators */}
            <div className="card p-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Field Indicators</p>
              {result.indicators.map((ind, i) => (
                <IndicatorRow key={i} {...ind}/>
              ))}
            </div>

            {/* Recommended Actions */}
            <div className="card p-4">
              <p className="text-sm font-bold text-gray-800 mb-3">Recommended Actions</p>
              <div className="space-y-2.5">
                {result.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                         style={{ background: result.bgColor }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: result.color }}>{i + 1}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <button onClick={() => navigate('/assistant')}
                    className="btn-primary flex items-center justify-center gap-2">
              Ask AI About This Stage
            </button>
            <button onClick={reset}
                    className="w-full py-3 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 flex items-center justify-center gap-2 mb-4">
              <RefreshCw size={15}/> Scan Again
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  // ── SCANNER VIEW (idle + scanning) ───────────────────────────
  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      {/* Hidden inputs */}
      <input ref={cameraRef}  type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleFile}/>
      <input ref={galleryRef} type="file" accept="image/*"                       style={{ display: 'none' }} onChange={handleFile}/>

      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        <div className="px-4 pt-2 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft size={22} color="#212121" strokeWidth={2.5}/>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Season Scanner</h1>
            <p className="text-xs text-gray-400">Scan your field to detect crop season</p>
          </div>
        </div>

        <div className="px-4 space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Take a photo of your paddy field or crop<br/>to detect the current growing season
          </p>

          {/* Viewfinder */}
          <div
            className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center"
            style={{
              height: 250,
              background: previewSrc ? '#000' : 'linear-gradient(160deg,#1B5E20 0%,#2E7D32 40%,#388E3C 70%,#4CAF50 100%)',
            }}
          >
            {/* Preview image */}
            {previewSrc && (
              <img src={previewSrc} alt="field" className="absolute inset-0 w-full h-full object-cover"
                   style={{ opacity: phase === 'scanning' ? 0.6 : 1 }}/>
            )}

            {/* Clear button */}
            {previewSrc && phase === 'idle' && (
              <button onClick={reset}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-10">
                <X size={16} color="white"/>
              </button>
            )}

            {/* Scanning overlay */}
            {phase === 'scanning' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Grid scan effect */}
                <div className="relative w-40 h-40">
                  {/* Horizontal scan line */}
                  <div className="absolute left-0 right-0 h-0.5 z-20"
                       style={{
                         background: 'rgba(76,255,80,0.9)',
                         boxShadow: '0 0 12px rgba(76,255,80,0.8)',
                         top: `${progress}%`,
                         transition: 'top 0.08s linear',
                       }}/>
                  {/* Grid lines */}
                  {[25, 50, 75].map(p => (
                    <div key={p} className="absolute left-0 right-0 h-px bg-green-400/20" style={{ top: `${p}%` }}/>
                  ))}
                  {[25, 50, 75].map(p => (
                    <div key={p} className="absolute top-0 bottom-0 w-px bg-green-400/20" style={{ left: `${p}%` }}/>
                  ))}
                  {/* Corner brackets */}
                  {[
                    { top: 0, left: 0,    style: { borderWidth: '3px 0 0 3px', borderRadius: '8px 0 0 0' } },
                    { top: 0, right: 0,   style: { borderWidth: '3px 3px 0 0', borderRadius: '0 8px 0 0' } },
                    { bottom: 0, left: 0, style: { borderWidth: '0 0 3px 3px', borderRadius: '0 0 0 8px' } },
                    { bottom: 0, right: 0,style: { borderWidth: '0 3px 3px 0', borderRadius: '0 0 8px 0' } },
                  ].map((c, i) => (
                    <div key={i} className="absolute w-7 h-7"
                         style={{
                           top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                           borderColor: '#4CAF50', borderStyle: 'solid', ...c.style,
                         }}/>
                  ))}
                </div>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <p className="text-green-300 font-semibold text-sm">
                    {progress < 30 ? 'Reading field conditions...'
                      : progress < 60 ? 'Analysing vegetation patterns...'
                      : progress < 85 ? 'Detecting growth stage...'
                      : 'Finalising season detection...'}
                  </p>
                  <div className="w-36 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-green-400 transition-all duration-100"
                         style={{ width: `${progress}%` }}/>
                  </div>
                  <p className="text-white/60 text-xs">{progress}%</p>
                </div>
              </div>
            )}

            {/* Idle empty state */}
            {phase === 'idle' && !previewSrc && (
              <>
                {/* Paddy field SVG background suggestion */}
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 320 250" preserveAspectRatio="xMidYMid slice">
                  {[...Array(12)].map((_, i) => (
                    <g key={i} transform={`translate(${i * 30},0)`}>
                      <line x1="15" y1="250" x2="15" y2="120" stroke="#A5D6A7" strokeWidth="2"/>
                      <ellipse cx="15" cy="115" rx="4" ry="14" fill="#81C784"/>
                    </g>
                  ))}
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center border-2 border-white/30">
                    <span style={{ fontSize: 36 }}>🌾</span>
                  </div>
                  <p className="text-white/70 text-xs font-medium">Point camera at your field</p>
                </div>
                {/* Corner marks */}
                <div className="absolute inset-8 pointer-events-none">
                  {[
                    { top: 0, left: 0,    s: { borderWidth: '3px 0 0 3px', borderRadius: '12px 0 0 0' } },
                    { top: 0, right: 0,   s: { borderWidth: '3px 3px 0 0', borderRadius: '0 12px 0 0' } },
                    { bottom: 0, left: 0, s: { borderWidth: '0 0 3px 3px', borderRadius: '0 0 0 12px' } },
                    { bottom: 0, right: 0,s: { borderWidth: '0 3px 3px 0', borderRadius: '0 0 12px 0' } },
                  ].map((c, i) => (
                    <div key={i} className="absolute w-8 h-8"
                         style={{
                           top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                           borderColor: 'rgba(255,255,255,0.65)', borderStyle: 'solid', ...c.s,
                         }}/>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <button
            onClick={() => cameraRef.current?.click()}
            disabled={phase === 'scanning'}
            className="btn-primary flex items-center justify-center gap-2"
            style={{ opacity: phase === 'scanning' ? 0.5 : 1 }}
          >
            <Camera size={18}/> Scan Field
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          <button
            onClick={() => galleryRef.current?.click()}
            disabled={phase === 'scanning'}
            className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-gray-200 rounded-2xl bg-white font-semibold text-sm text-gray-700 active:bg-gray-50"
            style={{ opacity: phase === 'scanning' ? 0.5 : 1 }}
          >
            <Upload size={18} color="#6B7280"/> Upload Field Photo
          </button>

          {/* What it detects */}
          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">What We Detect</p>
            <div className="space-y-2.5">
              {[
                { icon: '🌱', label: 'Growth Stage',   desc: 'Identifies vegetative, flowering, or ripening phase' },
                { icon: '🌿', label: 'Canopy Health',  desc: 'Assesses leaf colour and canopy coverage' },
                { icon: '💧', label: 'Water Stress',   desc: 'Detects signs of drought or waterlogging' },
                { icon: '📋', label: 'Action Plan',    desc: 'Recommends what to do right now for this stage' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="card p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">i</span>
              Tips for best results
            </p>
            <div className="space-y-1.5">
              {[
                'Take photo in daylight for best accuracy',
                'Capture a wide shot of the field rows',
                'Include both crop and sky in the frame',
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"/>
                  <span className="text-xs text-gray-600">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
