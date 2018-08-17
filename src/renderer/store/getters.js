//人类人看懂的时间
import state from "./state";

function humanTime(input) {
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    var min = (input / 1000 / 60) << 0,
        sec = Math.floor((input / 1000) % 60);

    return pad(min) + ':' + pad(sec);
}


export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const currentIndex = state => state.currentIndex

export const disc = state => state.disc

export const topList = state => state.topList

export const albumList = state => state.albumList

export const album = state => state.album

export const tracks = status => status.tracks

export const currentSong = status => status.currentSong

export const progress = status => status.progress

export const downLoadSong = status => status.downLoadSong

export const dirPath = status => status.dirPath

export const offset = status => status.offset

export const cat = status => status.cat

export const catlist = status => status.catlist

export const humanPosition = status =>{
    return humanTime(status.position)
}

export const humanDuration = state =>{
    return humanTime(state.duration)
}