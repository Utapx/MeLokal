import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, children, title }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[1000] bg-ink/50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-6 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-display font-semibold text-lg text-ink">{title}</h3>}
          <button onClick={onClose} aria-label="Tutup" className="ml-auto p-1.5 rounded-full hover:bg-ink/5 text-ink-soft">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
