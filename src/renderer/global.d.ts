interface Window {
  minimium: {
    subscribe: (channel: string, callback: () => void) => void;
    unsubscribe: (channel: string) => void;
  };
}
