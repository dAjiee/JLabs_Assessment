import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { Protected, IfAuthedGoHome } from './routes/Guards.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Protected><App /></Protected>, children: [{ index: true, element: <Home /> }] },
  { path: '/login', element: <IfAuthedGoHome><Login /></IfAuthedGoHome> },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
