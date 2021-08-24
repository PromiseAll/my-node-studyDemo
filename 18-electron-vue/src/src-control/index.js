const { app, BrowserWindow, Menu, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    // backgroundColor: '#2e2c29',
    width: 800,
    height: 600,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      //   preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  //   win.loadFile("index.html");
  win.loadURL("http://127.0.0.1:8080");
}
app.whenReady().then(() => {
  console.log("准备结束");

  createWindow();
  Menu.setApplicationMenu(null);
  // dialog.showMessageBox({type:'info', message: "提示你", buttons: ["确实", "取消"], title: "提示" });
});
