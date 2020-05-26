<template>
    <div class="m-extend-list">
        <RightSideMsg>
            <em>团控数据作者交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=vLtgy0HG"
                    >608303480</a
                ></strong
            >
        </RightSideMsg>
        <div class="m-jx3dat-rank">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/rank.svg"
                />排行榜
            </h3>
            <el-tabs v-model="focus" @tab-click="loadRank">
                <el-tab-pane
                    :label="name"
                    :name="i + ''"
                    v-for="(name, i) in subnav"
                    :key="i"
                ></el-tab-pane>
            </el-tabs>
        </div>
        <div class="m-jx3dat-links">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/puzzle.svg"
                />相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a
                    class="u-item"
                    href="https://www.jx3box.com/tool/260/"
                    target="_blank"
                    >如何加载团队监控数据文件？</a
                >
                <a
                    class="u-item"
                    href="https://www.jx3box.com/tool/420/"
                    target="_blank"
                    >团队监控插件教程</a
                >
                <a
                    class="u-item"
                    href="https://gitee.com/tinymins/my/issues"
                    target="_blank"
                    >茗伊插件集反馈</a
                >
                <a
                    class="u-item"
                    href="https://gitee.com/hugeforest/PLUGIN_ISSUES/issues"
                    target="_blank"
                    >懒人插件集反馈</a
                >
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
            focus:0,
            subnav : ['趋势榜','7日下载榜','30日下载榜']
        };
    },
    computed: {},
    methods: {
        loadRank(){

        }
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
