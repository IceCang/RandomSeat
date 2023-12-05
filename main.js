const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
if (require('electron-squirrel-startup')) app.quit();
// require('update-electron-app')()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 658,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        frame: false
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.handle('ping', () => 'pong')
    ipcMain.on('close', (evt) => {
        BrowserWindow.fromWebContents(evt.sender).close()
    })
    ipcMain.on('minimize', (evt) => {
        BrowserWindow.fromWebContents(evt.sender).minimize()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})