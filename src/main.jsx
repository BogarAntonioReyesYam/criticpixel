import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import App from './App'
import './index.css'

console.log('PixelVerdict: App Initializing...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>,
)
