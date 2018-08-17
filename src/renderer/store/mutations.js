import * as types from './mutation-types'

const matutaions = {
    [types.SET_SINGER](state, singer) {
      state.singer = singer
    },
    [types.SET_PLAYLIST](state, list) {
      state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
      state.sequenceList = list
    },
    [types.SET_CURRENT_INDEX](state, index) {
      state.currentIndex = index
    },
    [types.SET_DISC](state, disc) {
      state.disc = disc
    },
    [types.SET_TOP_LIST](state, topList) {
      state.topList = topList
    },
    [types.SET_ALBUM_LIST](state, albumList){
      state.albumList = albumList
    },
    [types.SET_ALBUM](state, album){
      state.album = album
    },
    [types.SET_TRACKS](state, tracks){
      state.tracks = tracks
    },
    [types.SET_CURRENT_SONG](state,song){
      state.currentSong = song
    },
    [types.SET_PROGRESS](state,progress){
      state.progress = progress;
    },
    [types.SET_DOWNLOAD_SONG](state,song){
      state.downLoadSong = song;
    },
    [types.SET_DIR_PATH](state,path){
        state.dirPath = path;
    },
    [types.SET_OFFSET](state,offset){
        state.offset+=offset;
    },
    [types.SET_CAT](state,cat){
        state.cat = cat;
    },
    [types.SET_CAT_LIST](state,catlist){
      state.catlist = catlist;
    },
    [types.RESET_OFFSET](state){
      state.offset = 36;
    },
    [types.SET_POSITION](state,position){
      state.position = position
    },
    [types.SET_DURATION](state,duration){
      state.duration = duration
    },
    [types.SET_ISPLAYING](state,isplaying){
      state.isplaying = isplaying
    },
    [types.SET_LOADING_STATE](state,loadingState){
      state.loadingState = loadingState
    }

}

export default matutaions