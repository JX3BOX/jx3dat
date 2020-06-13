<template>
    <div class="m-info">
        <div class="m-info-notice">
            <a class="u-item" href="https://www.jx3box.com/tool/13912/" target="_blank">🍭 支持子版本与私藏版</a>
            <a class="u-item" href="/jx3dat/#/dbm">🍬 即将开启·游戏内一键下载默认数据</a>
            <a class="u-item" href="/jx3dat/#/store">⚽️ 即将开启·在线数据构建功能即将来袭</a>
        </div>

        <div class="m-info-router">
            <router-link title="订阅号" to="/"><i class="el-icon-collection"></i></router-link>
            <router-link title="排行榜" to="/rank"><i class="el-icon-s-data"></i></router-link>
            <!-- <router-link title="在线构建" to="/bucket"><i class="el-icon-receiving"></i></router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
    @import '../assets/css/info.less';
    
</style>