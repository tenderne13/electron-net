const baseUrl = 'http://localhost:3000/'
import axios from 'axios'

const TOP_PLAYLIST = baseUrl + 'top/playlist'
const ALBUM_DETAIL = baseUrl + 'playlist/detail'
const MUSIC_URL = baseUrl + 'music/url'
const CAT_LIST = baseUrl +'playlist/hot'

export function getHotCatList(){
    return new Promise(((resolve, reject) => {
        axios.get(CAT_LIST)
            .then((result) =>{
                resolve(result.data)
            })
            .catch(reason => {
                reject(reason)
            })
    }))
}

export function getAlbumList(type, offset,cat) {
    let order = (type ? type : 'hot')
    let size = (offset ? offset : 36)
    let cate = (cat ? cat:'全部')
    return new Promise((resolve, reject) => {
        axios.get(TOP_PLAYLIST + '?order=' + order + '&limit=' + size+'&cat='+cate)
            .then((result) => {
                resolve(result.data)
            })
            .catch(reason => {
                reject(reason)
            })
    })
}

export function getAlbumDetail(id) {
    return new Promise((resolve, reject) => {
        axios.get(ALBUM_DETAIL + '?id='+id)
            .then((result) =>{
                resolve(result.data)
            })
    })
}


//获取音乐url
export function getMusicUrl(track) {
    return new Promise(((resolve, reject) => {
        axios.get(MUSIC_URL + '?id='+track.id)
            .then((result) => {
                if(result.data.data[0].url){
                    track.url = result.data.data[0].url
                    resolve(track.url)
                }else{
                    reject('版权原因无法播放')
                }


            })
            .catch(reason => {
                reject(reason)
            })
    }))

}

//获取下载url
function getDownLoadUrl(songId){
    return new Promise((resolve, reject) => {
        axios.get(MUSIC_URL + '?id='+songId)
            .then((result) => {
                let songData = result.data.data;
                if(songData && songData.length>0){
                    resolve(songData[0])
                }else {
                    reject(result.data)
                }
            })
            .catch(reason => {
                reject(reason)
            })
    })

}

//下载音乐
export function downLoadSong(songInfo,infoFn) {
    let dialog = require('electron').remote.dialog;
    let ipcRenderer = require('electron').ipcRenderer
    dialog.showOpenDialog({
        //默认路径
        defaultPath :'',
        //选择操作，此处是打开文件夹
        properties: [
            'openDirectory',
        ],
        //过滤条件
        filters: [
            { name: 'All', extensions: ['*'] },
        ]
    },function(res){
        //回调函数内容，此处是将路径内容显示在input框内
        if(res && res.length>0){
            let params = {
                dir: res[0],
                url: '',
                name:'',
                type:'mp3'
            }
            //开始获取url
            getDownLoadUrl(songInfo.id)
                .then((song)=>{
                    console.log(song)
                    params.url = song.url
                    params.name = songInfo.name
                    params.type = song.type
                    ipcRenderer.send('download',params);
                })
                .catch((err)=>{
                    console.error('获取url出错'+err)
                    infoFn.error('下载出错:'+err)
                })

        }else{
            //infoFn.info('请选择文件夹')
        }
    })
}