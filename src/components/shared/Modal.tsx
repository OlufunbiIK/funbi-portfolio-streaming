'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  id: string
  label: string
  open: boolean
  onClose: () => void
  className?: string
  children: ReactNode
}

/** A native <dialog>: focus trapping, Esc to close and the backdrop come from the browser. */
export function Modal({ id, label, open, onClose, className, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      id={id}
      ref={ref}
      className={className}
      aria-label={label}
      onClose={() => {
        // Only react to the visitor closing it (Esc). Closing it from code is handled by the parent's state.
        if (open) onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {open ? children : null}
    </dialog>
  )
}
