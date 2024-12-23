import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../../types";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("error", error);
    console.log("errorInfo", errorInfo);
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return <h4>Что-то пошло не так</h4>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
