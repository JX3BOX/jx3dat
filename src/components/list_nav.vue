<template>
    <div class="m-jx3dat-list-nav">
        <h5 class="u-title">数据下载</h5>
        <div class="m-nav-group">
            <router-link to="/"><img svg-inline src="../assets/img/jx3dat.svg" /><span>团控监控数据</span></router-link>
            <router-link to="/plugins/2"><img svg-inline src="../assets/img/jx3dat.svg" /><span>目标监控数据</span></router-link>
            <router-link to="/plugins/3"><img svg-inline src="../assets/img/jx3dat.svg" /><span>团队面板buff数据</span></router-link>
            <router-link to="/plugins/4"><img svg-inline src="../assets/img/jx3dat.svg" /><span>团队面板UI皮肤</span></router-link>
            <router-link to="/plugins/5"><img svg-inline src="../assets/img/jx3dat.svg" /><span>其它数据下载</span></router-link>
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/dbm"><img svg-inline src="../assets/img/logo.svg" /><span>数据在线构建</span></router-link>
            <router-link to="/store"><img svg-inline src="../assets/img/logo.svg" /><span>我的数据仓库</span></router-link>
        </div>
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
