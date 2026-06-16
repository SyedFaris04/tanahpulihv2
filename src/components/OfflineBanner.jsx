import React, { useState, useEffect } from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showBack, setShowBack] = useState(false)
  const [backTimer, setBackTimer] = useState(null)

  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true)
      setShowBack(true)
      const t = setTimeout(() => setShowBack(false), 3000)
      setBackTimer(t)
    }
    const goOffline = () => {
      setIsOnline(false)
      setShowBack(false)
      if (backTimer) clearTimeout(backTimer)
    }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [backTimer])

  // "Back online" toast
  if (showBack) {
    return (
      <div
        className="flex items-center justify-center gap-2 py-2 px-4"
        style={{
          background: '#43A047',
          animation: 'fadeIn 0.3s ease',
        }}
      >
        <RefreshCw size={13} color="white" />
        <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
          Back online — data synced
        </span>
      </div>
    )
  }

  // Offline banner
  if (!isOnline) {
    return (
      <div
        className="flex items-center gap-2 py-2.5 px-4"
        style={{ background: '#E53935' }}
      >
        <WifiOff size={14} color="white" />
        <div className="flex-1">
          <p style={{ color: 'white', fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}>
            You're offline
          </p>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, lineHeight: 1.3 }}>
            Showing last synced data · {new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    )
  }

  return null
}
