import { Component } from "react";
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="grid min-h-screen place-items-center p-6">
          <div className="glass max-w-lg rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-slate-500">
              Please refresh the page or check the console during development.
            </p>
          </div>
        </div>
      );
    return this.props.children;
  }
}
