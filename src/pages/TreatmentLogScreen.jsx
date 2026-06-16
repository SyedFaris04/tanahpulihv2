import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, X, Droplets, Leaf, Bug, Beaker, CheckCircle, Calendar, ChevronDown } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const INITIAL_LOGS = [
  {
    id: 1,
    type: 'fertilizer',
    name: 'Urea (46% N)',
    field: 'Field A',
    amount: '75',
    unit: 'kg/ha',
    date: '2024-06-01',
    notes: 'First top dressing, applied in the morning',
    linkedAlert: 'Nitrogen Deficiency',
  },
  {
    id: 2,
    type: 'pesticide',
    name: 'Mancozeb Fungicide',
    field: 'Field B',
    amount: '2',
    unit: 'kg/ha',
    date: '2024-06-05',
    notes: 'Applied after brown spot diagnosis from AI scan',
    linkedAlert: 'Brown Spot Disease',
  },
  {
    id: 3,
    type: 'irrigation',
    name: 'Field Flooding',
    field: 'All Fields',
    amount: '5',
    unit: 'cm depth',
    date: '2024-05-28',
    notes: 'Maintained after transplanting',
    linkedAlert: null,
  },
  {
    id: 4,
    type: 'fertilizer',
    name: 'NPK 15:15:15',
    field: 'Field A & C',
    amount: '150',
    unit: 'kg/ha',
    date: '2024-05-14',
    notes: 'Basal application at transplanting',
    linkedAlert: null,
  },
]

const TYPE_CONFIG = {
  fertilizer: { label: 'Fertilizer', icon: Droplets, color: '#2E7D32', bg: '#E8F5E9' },
  pesticide:  { label: 'Pesticide',  icon: Bug,      color: '#E53935', bg: '#FFEBEE' },
  fungicide:  { label: 'Fungicide',  icon: Beaker,   color: '#7B1FA2', bg: '#F3E5F5' },
  irrigation: { label: 'Irrigation', icon: Droplets,  color: '#1976D2', bg: '#E3F2FD' },
  other:      { label: 'Other',      icon: Leaf,     color: '#FB8C00', bg: '#FFF3E0' },
}

const FIELDS = ['Field A', 'Field B', 'Field C', 'All Fields']
const UNITS  = ['kg/ha', 'L/ha', 'g/ha', 'ml/ha', 'cm depth', 'bags']

function LogCard({ log, onDelete }) {
  const cfg = TYPE_CONFIG[log.type] || TYPE_CONFIG.other
  const Icon = cfg.icon
  const d = new Date(log.date)
  const dateStr = d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
             style={{ background: cfg.bg }}>
          <Icon size={18} color={cfg.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-bold text-gray-900">{log.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{log.field}</p>
            </div>
            <button onClick={() => onDelete(log.id)} className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 flex-shrink-0">
              <X size={12} color="#9CA3AF" />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>
              {cfg.label}
            </span>
            <span className="text-xs text-gray-600 font-semibold">{log.amount} {log.unit}</span>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <Calendar size={11} color="#9CA3AF" />
            <span className="text-xs text-gray-400">{dateStr}</span>
          </div>

          {log.notes && (
            <p className="text-xs text-gray-500 mt-2 leading-relaxed italic">"{log.notes}"</p>
          )}

          {log.linkedAlert && (
            <div className="flex items-center gap-1.5 mt-2 px-2 py-1 rounded-lg" style={{ background: '#FFF3E0' }}>
              <CheckCircle size={11} color="#FB8C00" />
              <p className="text-[10px] text-orange-600 font-semibold">Following up: {log.linkedAlert}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AddLogModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    type: 'fertilizer',
    name: '',
    field: 'Field A',
    amount: '',
    unit: 'kg/ha',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.name.trim() || !form.amount.trim()) return
    onSave({ ...form, id: Date.now() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="flex-1" onClick={onClose} />
      <div className="bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: '90vh' }}>
        {/* Modal header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Add Treatment</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} color="#6B7280" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 space-y-4" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          {/* Type picker */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Type</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(TYPE_CONFIG).map(([key, cfg]) => {
                const Icon = cfg.icon
                return (
                  <button
                    key={key}
                    onClick={() => set('type', key)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: form.type === key ? cfg.color : cfg.bg,
                      color: form.type === key ? 'white' : cfg.color,
                      border: `1.5px solid ${form.type === key ? cfg.color : 'transparent'}`,
                    }}
                  >
                    <Icon size={13} />
                    {cfg.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Product Name *</label>
            <input
              className="input-field"
              placeholder="e.g. Urea 46%, Mancozeb..."
              value={form.name}
              onChange={e => set('name', e.target.value)}
            />
          </div>

          {/* Field */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Field</label>
            <div className="relative">
              <select
                className="input-field appearance-none pr-8"
                value={form.field}
                onChange={e => set('field', e.target.value)}
              >
                {FIELDS.map(f => <option key={f}>{f}</option>)}
              </select>
              <ChevronDown size={15} color="#9CA3AF" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Amount + Unit */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Amount *</label>
            <div className="flex gap-2">
              <input
                className="input-field flex-1"
                placeholder="e.g. 75"
                type="number"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
              />
              <div className="relative">
                <select
                  className="input-field appearance-none pr-7"
                  style={{ width: 100 }}
                  value={form.unit}
                  onChange={e => set('unit', e.target.value)}
                >
                  {UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
                <ChevronDown size={13} color="#9CA3AF" className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Date Applied</label>
            <input
              className="input-field"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Notes (optional)</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="e.g. Applied after AI recommendation, weather was dry..."
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
            />
          </div>
        </div>

        {/* Save button */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="btn-primary"
            style={{ opacity: (!form.name.trim() || !form.amount.trim()) ? 0.5 : 1 }}
          >
            Save Treatment
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TreatmentLogScreen() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState('all')

  const deleteLog = (id) => setLogs(l => l.filter(x => x.id !== id))
  const addLog = (log) => setLogs(l => [log, ...l])

  const filtered = filterType === 'all' ? logs : logs.filter(l => l.type === filterType)

  // Summary counts
  const summary = {
    fertilizer: logs.filter(l => l.type === 'fertilizer').length,
    pesticide:  logs.filter(l => l.type === 'pesticide').length,
    irrigation: logs.filter(l => l.type === 'irrigation').length,
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8F9F4' }}>
      {showModal && <AddLogModal onClose={() => setShowModal(false)} onSave={addLog} />}

      <div className="flex-1 overflow-y-auto pb-1">
        <StatusBar />

        {/* Header */}
        <div className="px-4 pt-2 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/home')} className="w-8 h-8 flex items-center justify-center">
              <ChevronLeft size={22} color="#212121" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Treatment Log</h1>
              <p className="text-xs text-gray-400">{logs.length} records this season</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: '#2E7D32' }}
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-4 space-y-3">

          {/* Summary row */}
          <div className="flex gap-2">
            {[
              { label: 'Fertilizer', count: summary.fertilizer, color: '#2E7D32', bg: '#E8F5E9' },
              { label: 'Pesticide',  count: summary.pesticide,  color: '#E53935', bg: '#FFEBEE' },
              { label: 'Irrigation', count: summary.irrigation, color: '#1976D2', bg: '#E3F2FD' },
            ].map(s => (
              <div key={s.label} className="flex-1 card p-3 text-center">
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.count}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {[{ key: 'all', label: 'All' }, ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0"
                style={{
                  background: filterType === f.key ? '#2E7D32' : 'white',
                  color: filterType === f.key ? 'white' : '#6B7280',
                  boxShadow: filterType === f.key ? '0 2px 8px rgba(46,125,50,.25)' : '0 1px 4px rgba(0,0,0,.06)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Log list */}
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Leaf size={24} color="#D1D5DB" />
              </div>
              <p className="text-gray-400 font-medium text-sm">No records yet</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-3 text-primary text-sm font-bold"
              >
                + Add first treatment
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map(log => (
                <LogCard key={log.id} log={log} onDelete={deleteLog} />
              ))}
            </div>
          )}

          <div className="pb-4" />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
