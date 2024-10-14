// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { spawn } = require("child_process");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  // mainWindow.loadFile(path.join(__dirname, "./frontend/dist/index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  // Automatically start the Python backend
  const pythonProcess = spawn("python", ["./backend/app.py"], { shell: true });

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  pythonProcess.on("error", (err) => {
    console.error("Failed to start Python process:", err); // Log if the process fails to start
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
