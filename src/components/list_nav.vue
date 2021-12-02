<template>
    <div class="m-list-nav m-jx3dat-list-nav">
        <h5 class="u-title">配置数据</h5>
        <div class="m-nav-group">
            <router-link to="/userdata">
                <!-- <i class="el-icon-user"></i> -->
                <img src="../assets/img/nav/userdata.svg" />
                <span>用户配置数据</span>
            </router-link>
        </div>

        <h5 class="u-title">插件数据</h5>
        <div class="m-nav-group">
            <router-link to="/plugins/1">
                <!-- <i class="el-icon-box"></i> -->
                <img src="../assets/img/nav/1.svg" />
                <span>团队监控数据</span>
            </router-link>
            <router-link to="/plugins/2">
                <!-- <i class="el-icon-aim"></i> -->
                <img src="../assets/img/nav/2.png" />
                <span>目标监控数据</span>
            </router-link>
            <router-link to="/plugins/3">
                <!-- <i class="el-icon-news"></i> -->
                <img src="../assets/img/nav/3.svg" />
                <span>团队面板数据</span>
            </router-link>
            <router-link to="/plugins/5">
                <!-- <i class="el-icon-magic-stick"></i> -->
                <img src="../assets/img/nav/more.png" />
                <span>其它插件数据</span>
            </router-link>
        </div>

        <!-- <a class="m-nav-dbm" href="/dbm" target="_blank">
            <img svg-inline src="../assets/img/jx3datbuilder.svg" />
            <b>在线数据构建器</b>
            <span>DBM Data Builder</span>
        </a>-->
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        isIndex: function () {
            return this.$route.name == "index";
        },
    },
    methods: {
        isPlugin: function (val) {
            return (
                this.$route.name == "plugins" &&
                this.$route.params.subtype == val
            );
        },
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/list_nav.less";
</style>
