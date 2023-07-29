import { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary - error :: ', error);
    console.error('ErrorBoundary - errorInfo :: ', errorInfo);
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        // TODO: Add Layout
        // <Layout>
        <>
          <h1>Sembra che la pagina abbia un problema :)</h1>
          <button>
            <Link href="/">
              <a>TORNA ALLA HOME</a>
            </Link>
          </button>
        </>
        // </Layout>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}
