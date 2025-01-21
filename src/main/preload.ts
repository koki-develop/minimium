import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("minimium", {
  subscribe: (channel: string, callback: () => void) => {
    ipcRenderer.on(channel, callback);
  },
  unsubscribe: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
