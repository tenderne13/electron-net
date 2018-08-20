const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    currentIndex: -1,
    disc: {},
    topList: {},
    album: {},
    albumList: [],
    tracks: [],
    currentSong:{
        id:0,
        al:{

        },
        ar:[
            {
            }
        ],
        name:''
    },
    progress:0,
    downLoadSong:{},
    dirPath:'',
    offset:36,
    cat:'全部',
    catlist:[],
    position:0,
    duration:0,
    isplaying:false,
    loadingState:0,
    //0：循环顺序 1:随机 2.单曲循环
    playmode:0,
    //播放列表是否显示
    playlistShow:false
}

export default state