import { Component, PropsWithChildren, ReactNode } from "react";

import { ErrorAlert } from "../../../shared/errors/ui";

export class PixelArtEditorErrorBoundary extends Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("PixelArtEditor crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorAlert
          header="Something went wrong"
          cta={{ onClick: () => window.location.reload(), isPending: false }}
        >
          The editor encountered an unexpected error. You can try refreshing the
          page to continue.
        </ErrorAlert>
      );
    }

    return this.props.children;
  }
}
