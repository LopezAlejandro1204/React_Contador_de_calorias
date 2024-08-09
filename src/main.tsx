import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActivityProvider } from './context/ActivityContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ActivityProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </ActivityProvider>
)
