import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(_error, _errorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gamingBg flex items-center justify-center px-4">
          <div className="bg-gamingCard border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
            <AlertTriangle className="w-12 h-12 text-gamingOrange mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Algo salió mal</h1>
            <p className="text-gray-400 text-sm mb-6">
              Ha ocurrido un error inesperado. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 mx-auto bg-gamingOrange text-black px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
