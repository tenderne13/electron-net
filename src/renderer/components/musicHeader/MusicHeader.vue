<template>
    <div>
        <div class="left-title">
            <Icon type="ios-musical-notes" size="25" color="#ffffff"/>
            <span class="title">
                音乐播放器
            </span>
        </div>
        <div class="middle-header">
            <Input class="searchInput" search  placeholder="搜索音乐、歌单" />
        </div>
        <div class="right-header">
            <ButtonGroup size="small" class="optionBox">
                <Button type="text" ghost @click="hide()">&#45;&#45;</Button>
                <Button type="text" ghost @click="maxWindow()">口</Button>
                <Button type="text" ghost @click="close()">X</Button>
            </ButtonGroup>
        </div>
        <!--<Row>
            <Col span="6">
                        <span class="title">
                            音乐播放器
                        </span>
            </Col>
            <Col span="16">
                <Input class="searchInput" search  placeholder="搜索音乐、歌单" />
            </Col>
            <Col span="2">
                <ButtonGroup size="small" class="optionBox">
                    <Button type="text" ghost @click="hide()">&#45;&#45;</Button>
                    <Button type="text" ghost @click="maxWindow()">口</Button>
                    <Button type="text" ghost @click="hide()">X</Button>
                </ButtonGroup>
            </Col>
        </Row>-->
    </div>
</template>
<style lang="less">
    .left-title{
        padding-left: 20px;
        float: left;
        width: 200px;
    }
    .middle-header{
        float:left;
    }
    .right-header{
        float:right;
    }
</style>
<script>
    import {ipcRenderer} from 'electron'
    export default {
        name: 'main-header',
        components: {},
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
            hide(){
                ipcRenderer.send('hide-window')
            },
            maxWindow(){
                ipcRenderer.send('show-window')
            },
            close(){
                ipcRenderer.send('close-window')
            }
        }
    }
</script>


