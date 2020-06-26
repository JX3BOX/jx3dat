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
        <minirank />
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
                    href="/tool/?pid=13912"
                    target="_blank"
                    ><i class="el-icon-collection"></i> 新版订阅号发布规则须知</a
                >
                <a
                    class="u-item"
                    href="/tool/?pid=260"
                    target="_blank"
                    ><i class="el-icon-collection"></i> 如何加载团队监控数据文件？</a
                >
                <a
                    class="u-item"
                    href="/tool/?pid=420"
                    target="_blank"
                    ><i class="el-icon-collection"></i> 团队监控插件教程</a
                >
                <a
                    class="u-item"
                    href="https://gitee.com/tinymins/my/issues"
                    target="_blank"
                    ><i class="el-icon-warning-outline"></i> 茗伊插件集反馈</a
                >
                <a
                    class="u-item"
                    href="https://gitee.com/hugeforest/PLUGIN_ISSUES/issues"
                    target="_blank"
                    ><i class="el-icon-warning-outline"></i> 懒人插件集反馈</a
                >
            </div>
        </div>
        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from '@/components/minirank.vue'
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
        
    },
    mounted: function() {},
    components: {
        minirank
    },
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
