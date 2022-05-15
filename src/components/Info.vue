<template>
    <div class="m-info">
        <div class="m-info-router">
            <router-link to="/userdata"><i class="el-icon-user"></i><span>用户配置数据</span></router-link>
            <router-link to="/plugins?subtype=1"><i class="el-icon-box"></i><span>团队监控数据</span></router-link>
            <router-link to="/plugins?subtype=2"><i class="el-icon-aim"></i><span>目标监控数据</span></router-link>
            <router-link to="/plugins?subtype=3"><i class="el-icon-news"></i><span>团队面板数据</span></router-link>
            <router-link to="/plugins?subtype=5"><i class="el-icon-magic-stick"></i><span>其它插件数据</span></router-link>
            <!-- <a title="在线构建" href="/dbm" target="_blank"><i class="el-icon-receiving"></i></a> -->
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
};
</script>

<style lang="less">
@import "../assets/css/info.less";
</style>
