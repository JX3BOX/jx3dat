<template>
    <el-tabs class="m-jx3dat-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="最后更新数据" name="index">
            <span slot="label">
                <i class="el-icon-s-promotion"></i>
                <b>最近更新数据</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="订阅排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>订阅号排行榜</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="我的数据仓库" name="store">
            <span slot="label">
                <i class="el-icon-receiving"></i>
                <b>我的数据仓库</b>
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "tabs",
    data: function() {
        return {
            view: "index",
        };
    },
    computed: {},
    methods: {
        changeView: function() {
            this.$router.push({ name: this.view });
        },
    },
    mounted: function() {
        this.view = this.$route.name;
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
