import { app, BrowserWindow,ipcMain, Tray, Menu ,webContents} from 'electron'
const path = require('path')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
	  minWidth:1050,
	  minHeight:670,
    height: 670,
    useContentSize: true,
    width: 1050,
    frame:false,
    webPreferences: {webSecurity: false},
	  //transparent:true
  })




	// 系统托盘右键菜单
	/*var trayMenuTemplate = [
		{
			label: '设置',
			click: function () {} // 打开相应页面
		},
		{
			label: '意见反馈',
			click: function () {}
		},
		{
			label: '帮助',
			click: function () {}
		},
		{
			label: '关于',
			click: function () {}
		},
		{
			label: '退出圣诞',
			click: function () {
				// ipc.send('close-main-window');
				app.quit()
			}
		}
	]

	const url = path.join(__dirname, '../../static/img/net.PNG')
	// 系统托盘图标
	let tray = new Tray(url)
	// 鼠标放到系统托盘图标上时的tips;
	tray.setToolTip('网易云音乐')
	// 图标的上下文菜单
	const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
	// 设置此图标的上下文菜单
	tray.setContextMenu(contextMenu)
	// 双击图片显示窗口
	tray.on('double-click', () => {
		mainWindow.show()
		mainWindow.focus()
	})*/


	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})


    ipcMain.on('hide-window',()=>{
        console.log('最小化');
        mainWindow.minimize()
    })
    ipcMain.on('close-window',()=>{
        mainWindow.close()
        app.quit()
    })

    let flag = false;
    let tempFolder = '';
    //let songname = '';
    let songInfo = {
    	name: '',
		type: 'mp3',
	}
    ipcMain.on('show-window',()=>{
        (flag = !flag)==false? mainWindow.maximize() :mainWindow.unmaximize()
    });


    ipcMain.on('download',(evt,args)=>{
        tempFolder = args.dir;
        //songname = args.name;
		songInfo.name = args.name;
		songInfo.type = args.type;
        let url = args.url;
        mainWindow.webContents.downloadURL(url)
    })

    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
		let path = tempFolder+`\\${songInfo.name}.${songInfo.type}`
        //设置文件存放位置
        item.setSavePath(path);
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                	let total = item.getTotalBytes()
					let received = item.getReceivedBytes()
					let progress = (received/total)
                    console.log('已下载:【'+progress*100+'%】')
                    mainWindow.setProgressBar(progress)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully')
            } else {
                console.log(`Download failed: ${state}`)
            }
            mainWindow.setProgressBar(-1)
        })
    })


}







app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
