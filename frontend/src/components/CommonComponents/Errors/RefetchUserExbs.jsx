import { Component } from "react";
import Btn from "../Btn";

class RefetchUserExbs extends Component {
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
    console.error("RefetchUserExbs caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1 className="text-2xl md:text-3xl text-center w-full font-cardo">
            Could not fetch your exhibitions. Please refetch them with the
            button below
          </h1>
          <Btn
            text="Refetch Exhibitions"
            handleAction={() => console.log("hi")}
          />
        </>
      );
    }

    return this.props.children;
  }
}

export default RefetchUserExbs;
