import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const showToast = useCallback((title, message) => {
    const id = ++idRef.current
    setToasts((list) => [...list, { id, title, message }])
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="mkt-toast-wrap" aria-live="polite" role="status">
        {toasts.map((t) => (
          <div key={t.id} className="mkt-toast">
            <p className="text-white text-sm font-bold">{t.title}</p>
            {t.message && <p className="text-slate-400 text-xs mt-0.5">{t.message}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
