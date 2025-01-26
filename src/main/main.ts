import path from "node:path";
import { BrowserWindow, Menu, app } from "electron";
import contextMenu from "electron-context-menu";
import started from "electron-squirrel-startup";

if (started) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../assets/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
    },
  });

  contextMenu({ window: mainWindow, showInspectElement: false });

  const menu = Menu.buildFromTemplate([
    {
      label: "Minimium",
      submenu: [
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Tools",
      submenu: [
        {
          label: "Reload",
          accelerator: process.platform === "darwin" ? "Cmd+R" : "Ctrl+R",
          click: () => {
            mainWindow.webContents.send("RELOAD");
          },
        },
        {
          label: "Force reload",
          accelerator:
            process.platform === "darwin" ? "Cmd+Shift+R" : "Ctrl+Shift+R",
          click: () => {
            mainWindow.webContents.send("FORCE_RELOAD");
          },
        },
        {
          label: "Focus address bar",
          accelerator: process.platform === "darwin" ? "Cmd+L" : "Ctrl+L",
          click: () => {
            mainWindow.webContents.send("FOCUS_ADDRESS_BAR");
          },
        },
        {
          label: "Close tab",
          accelerator: process.platform === "darwin" ? "Cmd+W" : "Ctrl+W",
          click: () => {
            mainWindow.close();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("web-contents-created", (_, contents) => {
  if (contents.getType() === "webview") {
    contextMenu({ window: contents });
    contents.setWindowOpenHandler(({ url }) => {
      contents.loadURL(url);
      return { action: "deny" };
    });
  }
});
