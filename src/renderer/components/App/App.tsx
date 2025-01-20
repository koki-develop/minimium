export default function App() {
  console.log(window.minimium);
  return (
    <div className="flex min-h-dvh min-w-dvw flex-col">
      <webview className="flex-grow" src="https://duckduckgo.com" />
    </div>
  );
}
