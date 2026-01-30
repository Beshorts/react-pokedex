import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="flex min-h-screen items-center justify-center bg-charcoal-5 p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
            <h1 className="mb-4 text-h3 font-semibold leading-h3 text-charcoal-100">
              Oops! Something went wrong
            </h1>
            <p className="mb-6 text-body-md leading-body-md text-charcoal-100">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-charcoal-100 px-6 py-3 text-body-md font-medium leading-body-md text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-charcoal-100 focus:ring-offset-2"
              aria-label="Reload page"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}