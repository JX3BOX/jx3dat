<template>
    <div class="m-list-nav m-jx3dat-list-nav">

        <h5 class="u-title">团队监控</h5>
        <div class="m-nav-group">
            <a href="/jx3dat" :class="{on:isIndex}"><i class="el-icon-box"></i><span>订阅号</span></a>
        </div>

        <h5 class="u-title">其它数据</h5>
        <div class="m-nav-group">
            <a href="/jx3dat#/plugins/2" :class="{on:isPlugin('2')}"><i class="el-icon-aim"></i><span>目标监控数据</span></a>
            <a href="/jx3dat#/plugins/3" :class="{on:isPlugin('3')}"><i class="el-icon-news"></i><span>团队面板buff数据</span></a>
            <a href="/jx3dat#/plugins/4" :class="{on:isPlugin('4')}"><i class="el-icon-brush"></i><span>团队面板UI皮肤</span></a>
            <a href="/jx3dat#/plugins/5" :class="{on:isPlugin('5')}"><i class="el-icon-magic-stick"></i><span>其它数据下载</span></a>
        </div>

        <!-- <a class="m-nav-dbm" href="/dbm" target="_blank">
            <img svg-inline src="../assets/img/jx3datbuilder.svg" />
            <b>在线数据构建器</b>
            <span>DBM Data Builder</span>
        </a> -->
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
        mode: function() {
            return this.$store.state.mode;
        },
        isIndex : function (){
            return this.mode == 'list' && this.$route.name == 'index'
        },
    },
    methods: {
        isPlugin : function (val){
            return this.mode == 'list' && this.$route.name == 'plugins' && this.$route.params.subtype == val
        }
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/list_nav.less";
</style>
