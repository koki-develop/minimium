import type { WebviewTag as ElectronWebviewTag } from "electron";
import {
  type ComponentPropsWithoutRef,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const webviewEvents = [
  "load-commit",
  "did-finish-load",
  "did-fail-load",
  "did-frame-finish-load",
  "did-start-loading",
  "did-stop-loading",
  "did-attach",
  "dom-ready",
  "page-title-updated",
  "page-favicon-updated",
  "enter-html-full-screen",
  "leave-html-full-screen",
  "console-message",
  "found-in-page",
  "will-navigate",
  "will-frame-navigate",
  "did-start-navigation",
  "did-redirect-navigation",
  "did-navigate",
  "did-frame-navigate",
  "did-navigate-in-page",
  "close",
  "ipc-message",
  "render-process-gone",
  "plugin-crashed",
  "destroyed",
  "media-started-playing",
  "media-paused",
  "did-change-theme-color",
  "update-target-url",
  "devtools-open-url",
  "devtools-search-query",
  "devtools-opened",
  "devtools-closed",
  "devtools-focused",
  "context-menu",
];

export type WebviewTag = ElectronWebviewTag;

export type WebviewProps = ComponentPropsWithoutRef<"webview"> & {
  ref?: RefObject<WebviewTag | null>;
};

export default function Webview({
  ref,

  ...props
}: WebviewProps) {
  const webviewRef = useRef<ElectronWebviewTag>(null);
  const [ready, setReady] = useState<boolean>(false);

  const handleDomReady = useCallback(() => {
    setReady(true);
  }, []);

  const reflectRef = useCallback(() => {
    if (!ref) return;
    if (!ready) return;
    ref.current = webviewRef.current;
  }, [ref, ready]);

  const reflect = useCallback(() => {
    reflectRef();
  }, [reflectRef]);

  useEffect(() => {
    webviewRef.current?.addEventListener("dom-ready", handleDomReady);
    return () => {
      webviewRef.current?.removeEventListener("dom-ready", handleDomReady);
    };
  }, [handleDomReady]);

  useEffect(() => {
    for (const event of webviewEvents) {
      webviewRef.current?.addEventListener(event, reflect);
    }

    return () => {
      for (const event of webviewEvents) {
        webviewRef.current?.removeEventListener(event, reflect);
      }
    };
  }, [reflect]);

  return <webview ref={webviewRef} {...props} />;
}
