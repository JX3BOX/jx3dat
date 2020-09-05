<template>
    <div class="m-list-nav m-jx3dat-list-nav">
        <h5 class="u-title">数据下载</h5>
        <div class="m-nav-group">
            <router-link to="/"><i class="el-icon-box"></i><span>团队监控数据</span></router-link>
            <router-link to="/plugins/2"><i class="el-icon-aim"></i><span>目标监控数据</span></router-link>
            <router-link to="/plugins/3"><i class="el-icon-news"></i><span>团队面板buff数据</span></router-link>
            <router-link to="/plugins/4"><i class="el-icon-brush"></i><span>团队面板UI皮肤</span></router-link>
            <router-link to="/plugins/5"><i class="el-icon-magic-stick"></i><span>其它数据下载</span></router-link>
        </div>

        <!-- <h5 class="u-title">在线应用</h5> -->
        <!-- <div class="m-nav-group"> -->
        <a class="m-nav-dbm" href="/dbm" target="_blank">
            <img svg-inline src="../assets/img/jx3datbuilder.svg" />
            <b>数据在线构建</b>
            <span>DBM Data Builder</span>
        </a>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/list_nav.less";
</style>
