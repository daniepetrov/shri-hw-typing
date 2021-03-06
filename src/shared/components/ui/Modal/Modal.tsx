import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import s from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  'data-testid': string
}

function Modal({ isOpen, children, ...props }: ModalProps): JSX.Element | null {
  if (!isOpen) return null
  return createPortal(
    <div className={s.root} {...props}>
      <div className={s.overlay} />
      <div className={s.content}>{children}</div>
    </div>,
    document.body,
  )
}

export default Modal
