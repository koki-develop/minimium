import { useRef, useState } from "react";
import AddressBar from "../AddressBar";
import Webview, { type WebviewTag } from "../Webview";

export default function App() {
  const webviewRef = useRef<WebviewTag>(null);
  const [webviewUrl, setWebviewUrl] = useState("https://duckduckgo.com");
  const [url, setUrl] = useState("https://duckduckgo.com");

  return (
    <div className="flex min-h-dvh min-w-dvw flex-col">
      <AddressBar query={url} onChange={setUrl} onSubmit={setWebviewUrl} />

      <Webview
        ref={webviewRef}
        className="flex-grow"
        src={webviewUrl}
        onUrlChange={(url) => setUrl(url)}
      />
    </div>
  );
}
