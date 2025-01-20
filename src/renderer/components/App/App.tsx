import Webview from "../Webview";

export default function App() {
  return (
    <div className="flex min-h-dvh min-w-dvw flex-col">
      <Webview className="flex-grow" src="https://duckduckgo.com" />
    </div>
  );
}
