const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('minimize').addEventListener('click', () => ipcRenderer.send('minimize'));
    document.getElementById('close').addEventListener('click', () => ipcRenderer.send('close'));
})
