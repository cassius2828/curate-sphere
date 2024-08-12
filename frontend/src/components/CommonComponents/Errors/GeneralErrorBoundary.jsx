import { Component } from "react";

class GeneralErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("GeneralErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1 className="mt-48 text-5xl md:text-8xl text-center w-full font-cardo">
          Something went wrong. Refresh or visit another page
        </h1>
      );
    }

    return this.props.children;
  }
}

export default GeneralErrorBoundary;
