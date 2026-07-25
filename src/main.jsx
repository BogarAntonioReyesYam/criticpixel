import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { WishlistProvider } from './context/WishlistContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <NotificationProvider>
                <WishlistProvider>
                  <App />
                </WishlistProvider>
              </NotificationProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
