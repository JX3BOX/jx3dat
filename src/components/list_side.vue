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
            <div class="c-sidebar-right-list" v-if="links && links.length">
                <a
                    v-for="(item, i) in links"
                    :key="i"
                    class="u-item"
                    :href="item.link"
                    target="_blank"
                    ><i class="el-icon-collection"></i>{{ item.label }}</a
                >
            </div>
        </div>
        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from '@/components/minirank.vue'
import { getLinks } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
            focus:0,
            subnav : ['趋势榜','7日下载榜','30日下载榜'],
            links : []
        };
    },
    computed: {},
    methods: {
        
    },
    mounted: function() {
        getLinks().then((res) => {
            this.links = res.data.data.menu_group.menus
        })
    },
    components: {
        minirank
    },
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
