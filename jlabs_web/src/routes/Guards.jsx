import { Navigate } from 'react-router-dom'
import { isAuthed } from '../auth'

export function Protected({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}

export function IfAuthedGoHome({ children }) {
  return isAuthed() ? <Navigate to="/" replace /> : children
}
