import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import { Component, ComponentType, ErrorInfo, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

// Error Boundary to catch rendering errors
class MDXErrorBoundary extends Component<
  { children: React.ReactNode; onError: (error: string) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: string) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    this.props.onError(`Rendering error: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return null; // Let parent handle error display
    }
    return this.props.children;
  }
}

export default function MDXRenderer({ content }: { content: string }) {
  const [MDXComponent, setMDXComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderString = async (content: string) => {
      setMDXComponent(null);
      setError(null);

      try {
        const { default: MDXContent } = await evaluate(content, {
          ...runtime,
          remarkPlugins: [remarkGfm],
        });
        setMDXComponent(() => MDXContent);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    // wrap try and catch at an higher level
    try {
      renderString(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [content]);

  if (error)
    return (
      <div style={{ color: "red" }}>
        <h3>Error compiling MDX file</h3> {error}
      </div>
    );

  return (
    <MDXProvider>
      {MDXComponent ? (
        <MDXErrorBoundary onError={setError}>
          <MDXComponent />
        </MDXErrorBoundary>
      ) : (
        "404"
      )}
    </MDXProvider>
  );
}
