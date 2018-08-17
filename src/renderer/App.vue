<template>
  <div id="app">
    <div class="mainLayout">
        <div class="mainHeader">
            <music-header></music-header>
        </div>
        <div class="mainContent">
            <Row>
                <Col span="4" class="fixedMenu">
                    <Menu width="auto"  active-name="1">
                        <MenuGroup title="推荐">
                            <MenuItem name="1" to="/">
                                <Icon type="ios-musical-notes" />
                                发现音乐
                            </MenuItem>
                            <MenuItem name="2" to="/info">
                                <Icon type="ios-radio-outline" />
                                私人FM
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="ios-videocam-outline" />
                                视频
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="md-contacts" />
                                朋友
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="我的音乐">
                            <MenuItem name="5">
                                <Icon type="ios-download-outline" />
                                下载管理
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Col>
                <Col span="20" push="4">
                    <div class="contentMargin">
                        <router-view></router-view>
                    </div>

                </Col>
            </Row>
        </div>
        <div class="mainFooter">
            <music-player></music-player>
        </div>
    </div>
  </div>
</template>

<script>
    import MusicHeader from './components/musicHeader/MusicHeader'
    import MusicPlayer from './components/player/Player'
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        components:{
            MusicHeader,
            MusicPlayer
        },
        computed:{
            ...mapGetters([
                'albumList',
                'tracks'
            ])
        },
        data(){
            return {

            }
        },
        methods:{
        }
    }
</script>

<style lang="less">
  /* CSS */
  html,body{
    height: 100%;
  }
  #app{
    height: 100%;
  }

  .mainLayout {
      height: 100%;
      .mainHeader{
          position: absolute;
          width: 100%;
          background: #c62f2f;
          padding: 0 10px;
          height: 50px;
          line-height: 50px;
          -webkit-app-region: drag;
          .title{
              color: #ffffff;
              font-size: 16px;
              font-weight: bold;
          }
          .searchInput{
              width: 200px;
              -webkit-app-region: no-drag;
          }
          .optionBox{
              -webkit-app-region: no-drag;
          }
      }
      .mainContent {
          width: 100%;
          position: absolute;
          overflow-y: auto;
          top:50px;
          bottom: 50px;

          .fixedMenu{
              position: fixed;
          }

          .contentMargin{
              padding-left: 10px;
              padding-right: 10px;
          }



      }

      .mainContent::-webkit-scrollbar {/*滚动条整体样式*/
          width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
      }

      .mainContent::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(225, 225, 226, 0.2);
          background: #e1e1e2;
      }
      .mainContent::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: #ffffff;
      }

      .mainFooter {
          height: 50px;
          line-height: 50px;
          position: absolute;
          bottom: 0px;
          width: 100%;
      }
  }


</style>
