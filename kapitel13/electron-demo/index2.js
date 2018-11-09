const {app, BrowserWindow, Menu, Tray, dialog} = require('electron');
const path = require('path');

let mainWindow;
let trayIcon;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: false }
  });
  
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => mainWindow = null);

  dialog.showMessageBox(mainWindow, {
    title: 'Information',
    message: 'Anwendung erfolgreich gestartet.',
    details: 'Das ist gut.',
    type: 'info'
  });
}

app.on('ready', () => {
  createWindow();

  trayIcon = new Tray(path.join(__dirname, 'icon.png'));
  trayIcon.setToolTip('My Tray Icon');
  trayIcon.setContextMenu(Menu.buildFromTemplate([{
    label: 'Schließen',
    click() { app.quit(); }
  }]));

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
