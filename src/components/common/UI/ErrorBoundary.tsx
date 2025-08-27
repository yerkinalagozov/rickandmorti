import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--color-background))]">
          <div className="text-center p-8">
            <div className="portal-loader mx-auto mb-8"></div>
            <h1 className="text-3xl font-bold text-[rgb(var(--color-text))] mb-4 glitch-text">
              Oops! Something went wrong
            </h1>
            <p className="text-[rgb(var(--color-text-secondary))] mb-6">
              The portal encountered an error. Rick would not be pleased.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="neon-button"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}