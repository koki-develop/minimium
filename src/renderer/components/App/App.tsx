import { useRef, useState } from "react";
import AddressBar from "../AddressBar";
import Webview, { type WebviewState, type WebviewTag } from "../Webview";

export default function App() {
  const webviewRef = useRef<WebviewTag>(null);
  const [webviewUrl, setWebviewUrl] = useState<string>(
    "https://duckduckgo.com",
  );
  const [webviewState, setWebviewState] = useState<WebviewState | null>(null);

  const [query, setQuery] = useState<string>("");

  const handleWebviewStateChange = (state: WebviewState) => {
    setWebviewState(state);
  };

  const handleWebviewUrlChange = (url: string) => {
    setQuery(url);
  };

  const handleSubmit = (query: string) => {
    setWebviewUrl(query);
  };

  return (
    <div className="flex min-h-dvh min-w-dvw flex-col">
      <title>{webviewState?.title ?? "Minimium"}</title>

      <AddressBar
        query={query}
        loading={webviewState?.isLoading ?? false}
        canGoBack={webviewState?.canGoBack ?? false}
        canGoForward={webviewState?.canGoForward ?? false}
        onQueryChange={(query) => setQuery(query)}
        onGoBack={() => webviewRef.current?.goBack()}
        onGoForward={() => webviewRef.current?.goForward()}
        onRefresh={() => webviewRef.current?.reload()}
        onStop={() => webviewRef.current?.stop()}
        onSubmit={handleSubmit}
      />

      <Webview
        ref={webviewRef}
        className="flex-grow"
        src={webviewUrl}
        onStateChange={(state) => handleWebviewStateChange(state)}
        onUrlChange={(url) => handleWebviewUrlChange(url)}
      />
    </div>
  );
}
