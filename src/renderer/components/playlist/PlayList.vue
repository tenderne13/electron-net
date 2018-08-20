<template>
  <div class="playlistPanel" v-show="playlistShow">
      <div class="titleCount">
        <span>总{{playlist.length}}首</span>
        <div class="close-btn" @click="setPlayListShow">
          <Icon type="ios-close" size="25"/>
        </div>
      </div>
      <div class="list-content">
          <ul>
            <li v-for="item in playlist">
              <div class="stateDiv">
                <Icon :type="playstatus"  color="red" size="16" v-show="item.id==currentIndex"/>
              </div>
              <div class="songname" @dblclick="playThis(item)">
                {{item.name}}
              </div>
              <div class="singer">{{item.ar[0].name}}</div>
              <div class="duration">{{item.dt | transformHuman}}</div>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
  import {humanTime} from "../../api/util";

  export default {
    data () {
      return {
      }
    },
      filters:{
        transformHuman(input){
            return humanTime(input)
        }
      },
    computed:{
        ...mapState([
            'playlistShow',
            'playlist',
            'isplaying',
            'currentIndex'
        ]),
        playstatus(){
            let typePrefix = 'ios-'
            this.isplaying ? (typePrefix+='play') : (typePrefix+='pause')
            return typePrefix
        }
    },
    methods:{
        ...mapActions([
            'playTrack'
        ]),
        ...mapMutations({
            setPlayListShow:'SET_PLAYLIST_SHOW'
        }),
        playThis(song){
            console.log(song)
            this.playTrack(song.id)
        }
    }
  }
</script>

<style lang="less">
  .playlistPanel{
    z-index: 19930307;
    position: absolute;
    right: 0;
    bottom: 50px;
    width: 50%;
    height: 70%;
    background: #f5f5f7;
    box-shadow: -2px -2px 10px 0px #c2c2c4;
    .titleCount{
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 100%;
      background-color: #c62f2f;
      font-size: 16px;
      color: white;
      display: inline-grid;
      .close-btn{
          position: absolute;
          right: 10px;
      }
    }
    .list-content{
      overflow-y: auto;
      top: 30px;
      bottom: 0;
      width: 100%;
      position: absolute;
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }

      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(225, 225, 226, 0.2);
        background: #e1e1e2;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        background: #f5f5f7;
      }
      ul{
        list-style: none outside;
        &>li{
          padding: 5px;
          &:nth-child(2n){
            background: #ebeced;
          }

          &:hover{
            background: #e3e3e5;
          }
        }
        .stateDiv{
          float: left;
          width: 10px;
        }
        .songname{
          float: left;
          width: 60%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: black;
          font-size: 13px;
          margin-left: 5px;
          cursor: pointer;
        }
        .singer{
          float: left;
          width: 30%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .duration{

        }
      }
    }
  }
</style>
