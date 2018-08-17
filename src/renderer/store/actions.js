import * as types from './mutation-types'
import '../util/soundmanager2'
import {getMusicUrl} from '../api/api'
export function saveFavorite(song) {
    let songs = storage.get('favorite',[])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY, songs)
    return songs
}
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

export const saveFavoriteList = function ({commit},song){
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

//播放器初始化
export const playerInit = function ({commit,state}){
    soundManager.setup({
        //url: '/path/to/swfs/',
        //flashVersion: 9,
        preferFlash: false, // prefer 100% HTML5 mode, where both supported
        debugMode: false, // enable debugging output ($log.debug() with HTML fallback)
        useHTML5Audio: true,
        onready: function() {
            console.log('播放器准备完毕开始加载歌单')
            //加载第一首歌
            loadTrack({commit,state})
        },
        ontimeout: function() {
            alert('SM2 failed to start. Flash missing, blocked or security error?');
            alert('The status is ' + status.success + ', the error type is ' + status.error.type);
        },
        defaultOptions: {
            // set global default volume for all sound objects
            autoLoad: false, // enable automatic loading (otherwise .load() will call with .play())
            autoPlay: false, // enable playing of file ASAP (much faster if "stream" is true)
            from: null, // position to start playback within a sound (msec), see demo
            loops: 1, // number of times to play the sound. Related: looping (API demo)
            multiShot: false, // let sounds "restart" or "chorus" when played multiple times..
            multiShotEvents: false, // allow events (onfinish()) to fire for each shot, if supported.
            onid3: null, // callback function for "ID3 data is added/available"
            onload: null, // callback function for "load finished"
            onstop: null, // callback for "user stop"
            onfailure: 'nextTrack', // callback function for when playing fails
            onpause: null, // callback for "pause"
            onplay: null, // callback for "play" start
            onresume: null, // callback for "resume" (pause toggle)
            position: null, // offset (milliseconds) to seek to within downloaded sound.
            pan: 0, // "pan" settings, left-to-right, -100 to 100
            stream: true, // allows playing before entire file has loaded (recommended)
            to: null, // position to end playback within a sound (msec), see demo
            type: 'audio/mp3', // MIME-like hint for canPlay() tests, eg. 'audio/mp3'
            usePolicyFile: false, // enable crossdomain.xml request for remote domains (for ID3/waveform access)
            volume: 100, // self-explanatory. 0-100, the latter being the max.
            whileloading: function() {
                //soundManager._writeDebug('sound '+this.id+' loading, '+this.bytesLoaded+' of '+this.bytesTotal);
                var trackLoaded = ((this.bytesLoaded/this.bytesTotal)*100);
                commit(types.SET_LOADING_STATE,trackLoaded)
            },
            whileplaying: function() {
                //soundManager._writeDebug('sound '+this.id+' playing, '+this.position+' of '+this.duration);
                //broadcast current playing track id
                let currentTrack = this.id;
                let trackProgress = ((this.position / this.duration) * 100);
                commit(types.SET_POSITION,this.position)
                commit(types.SET_DURATION,this.duration)
                commit(types.SET_PROGRESS,trackProgress)


            },
            onfinish: function() {
                soundManager._writeDebug(this.id + ' finished playing');
                commit(types.SET_POSITION,0)
                commit(types.SET_DURATION,0)
                commit(types.SET_PROGRESS,0)
                commit(types.SET_ISPLAYING,false)

                nextTrack({commit,state})

            }
        }
    });
}

function initPlayTrack(trackId,isResume,commit,state){
    return new Promise((resolve, reject) => {
        if(isResume !== true){
            console.log('开始停止当前播放的音乐')
            stop({commit,state})
            commit(types.SET_CURRENT_INDEX,trackId)
            var track = soundManager.getSoundById(trackId)
            resolve(track)
        }else{
            soundManager.play(trackId)
            commit(types.SET_ISPLAYING,true)
            //this.setIsplaying(true)
        }
    })
}

//播放
export const play = function ({commit,state}) {
    let currentIndex = state.currentIndex;
    if(currentIndex == -1){
        console.log('当前没有播放歌曲将播放列表第一个');
        if(soundManager.soundIDs.length === 0) {
            console.log('当前列表中没有音乐')
            return;
        }
        commit(types.SET_CURRENT_INDEX,soundManager.soundIDs[0])
        playTrack({commit,state},state.currentIndex)
    }else{
        initPlayTrack(currentIndex,true,commit)
    }


}

//暂停
export const pause = function({commit,state}){
    soundManager.pause(state.currentIndex)
    console.log(state.currentIndex+'已暂停')
    commit(types.SET_ISPLAYING,false)
}
//停止
export const stop = function({commit,state}){
    soundManager.stop(state.currentIndex)
    commit(types.SET_POSITION,0)
    commit(types.SET_DURATION,0)
    commit(types.SET_PROGRESS,0)
    commit(types.SET_ISPLAYING,false)
    console.log('停止方法')
}

//isInarray
function isInArray(array,value){
    for(var i = 0; i < array.length; i++) {
        if(array[i].id === value) {
            return i;
        }
    }
    return false;
}
//获取某个歌
function getPlayList(state,key) {
    if(typeof key === 'undefined'){
        return state.playlist
    }else{
        return state.playlist[key]
    }
}

//从播放列表里获取歌曲信息
function getSongById(playlist,id){
    for(let i=0;i<playlist.length;i++){
        if(id == playlist[i].id){
            return playlist[i]
        }
    }

    return []
}

//清除现有playList
export const clearPlayList = function ({commit, state}) {
    return new Promise((resolve, reject) => {
        try {
            //先停止播放
            stop({commit,state})

            commit(types.SET_PLAYLIST,[])

            let smIdsLength = soundManager.soundIDs.length

            for(let i=0;i<smIdsLength;i++){
                soundManager.destroySound(soundManager.soundIDs[0])
            }
            console.log('清除完成可以进行下一步了')
            resolve()
        }catch (e) {
            reject(e)
        }
    })


}
//添加单个
export const addTrack = function ({commit, state},track) {
    var inArrayKey = isInArray(state.playlist, track.id);
    if(inArrayKey === false) {
        //$log.debug('song does not exists in playlist');
        //add to sound manager
        soundManager.createSound({
            id: track.id,
            url: track.url
        });
    }
    return track.id;
}
//添加歌单到播放器
export const addTrackArray = function ({commit, state}, trackArray) {
    console.log('开始添加歌单')
    clearPlayList({commit,state})
        .then((result)=>{
            if(typeof trackArray === 'undefined'){
                trackArray = state.tracks
            }
            commit(types.SET_CURRENT_INDEX,-1)
            //添加歌单到playList
            commit(types.SET_PLAYLIST,trackArray)
            for(var i = 0; i < trackArray.length; i++) {
                var track = trackArray[i];
                soundManager.createSound({
                    id: track.id,
                    url: track.url
                });
                //var inArrayKey = isInArray(state.playlist, track.id);
                //if(inArrayKey === false) {
                    //$log.debug('song does not exists in playlist');
                    //add to sound manager

               // }
            }
            play({commit,state})
            console.log('添加完成')
        })
        .catch((reason => {
            console.error(reason)
        }))
}

//加载第一首歌曲
export const loadTrack = function ({commit, state},track) {
    play({commit,state})
}
function getIndexByValue(array, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] === value) {
            return i;
        }
    }
    return false;
}

export const playTrack = function ({commit, state},trackId){

    let currentSong =  getSongById(state.playlist,trackId)
    console.log(currentSong)
    commit(types.SET_CURRENT_SONG,currentSong)

    initPlayTrack(trackId,false,commit,state)
        .then(getMusicUrl)
        .then((result)=>{
            console.log('开始播放歌曲')
            soundManager.play(trackId)
            commit(types.SET_ISPLAYING,true)
        })
        .catch(reason => {
            console.log(reason)
            commit(types.SET_ISPLAYING,false)
            console.log('开始尝试播放下一首歌')
            nextTrack({commit,state})
        })
}

//下一首歌
export const nextTrack = function ({commit, state}){
    let currentTrackKey = getIndexByValue(soundManager.soundIDs, state.currentIndex)
    var nextTrackKey = +currentTrackKey + 1;
    var nextTrackId = soundManager.soundIDs[nextTrackKey];
    if(typeof nextTrackId !== 'undefined') {
        console.log('下一首Id为:【'+nextTrackId+'】')
        playTrack({commit,state},nextTrackId)
    } else {
        alert('这里预留还不知道做啥')
        /*//if no next track found
        if(repeat === true) {
            //start first track if repeat is on
            playTrack(soundManager.soundIDs[0]);
        } else {
            //breadcase not playing anything
            isPlaying = false;
            $rootScope.$broadcast('music:isPlaying', isPlaying);
        }*/
    }
}


export const setSongPosition = function ({commit, state}, persent) {
    let tempPosition = state.duration*(persent/100)
    commit(types.SET_POSITION,tempPosition)
    soundManager.setPosition(state.currentIndex,tempPosition)
}