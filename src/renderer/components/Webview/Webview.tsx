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

export type WebviewState = {
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
};

export type WebviewTag = ElectronWebviewTag;

export type WebviewProps = ComponentPropsWithoutRef<"webview"> & {
  ref: RefObject<WebviewTag | null>;
  onStateChange: (state: WebviewState) => void;
  onUrlChange: (url: string) => void;
};

export default function Webview({
  ref,
  onStateChange,
  onUrlChange,

  ...props
}: WebviewProps) {
  const webviewRef = useRef<ElectronWebviewTag>(null);
  const [domReady, setReady] = useState<boolean>(false);

  const reflectRef = useCallback(() => {
    if (!ref) return;
    if (!domReady) return;
    ref.current = webviewRef.current;
  }, [ref, domReady]);

  const reflectState = useCallback(() => {
    if (!webviewRef.current) return;
    onStateChange?.({
      isLoading: webviewRef.current.isLoadingMainFrame(),
      canGoBack: webviewRef.current.canGoBack(),
      canGoForward: webviewRef.current.canGoForward(),
    });
  }, [onStateChange]);

  const reflect = useCallback(() => {
    reflectRef();
    reflectState();
  }, [reflectRef, reflectState]);

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

  /*
   * dom-ready
   */

  const handleDomReady = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    webviewRef.current?.addEventListener("dom-ready", handleDomReady);
    return () => {
      webviewRef.current?.removeEventListener("dom-ready", handleDomReady);
    };
  }, [handleDomReady]);

  /*
   * did-navigate
   */

  const handleDidNavigate = useCallback(
    ({ url }: { url: string }) => {
      onUrlChange?.(url);
    },
    [onUrlChange],
  );

  useEffect(() => {
    webviewRef.current?.addEventListener("did-navigate", handleDidNavigate);
    return () => {
      webviewRef.current?.removeEventListener(
        "did-navigate",
        handleDidNavigate,
      );
    };
  }, [handleDidNavigate]);

  /*
   * did-navigate-in-page
   */

  const handleDidNavigateInPage = useCallback(
    ({ isMainFrame, url }: { isMainFrame: boolean; url: string }) => {
      if (isMainFrame) {
        onUrlChange?.(url);
      }
    },
    [onUrlChange],
  );

  useEffect(() => {
    webviewRef.current?.addEventListener(
      "did-navigate-in-page",
      handleDidNavigateInPage,
    );
    return () => {
      webviewRef.current?.removeEventListener(
        "did-navigate-in-page",
        handleDidNavigateInPage,
      );
    };
  }, [handleDidNavigateInPage]);

  return <webview ref={webviewRef} {...props} />;
}
