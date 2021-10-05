<template>
    <div class="m-extend-list">
        <RightSideMsg>
            <em>团控数据作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=vLtgy0HG">608303480</a>
            </strong>
        </RightSideMsg>
        <minirank />
        <!-- 其他链接 -->
        <div class="m-jx3dat-links m-side-links">
            <h3 class="c-sidebar-right-title" style="border-bottom:none;">
                <img class="u-icon" svg-inline src="../assets/img/puzzle.svg" />
                帮助文档
            </h3>
            <el-collapse class="u-groups" v-model="activeDocGroup">
                <el-collapse-item title="入门帮助" name="newbie">
                    <div class="u-docs">
                        <a
                            v-for="(item, i) in jx3dat_newbie"
                            :key="i"
                            class="u-doc"
                            :href="item.link"
                            target="_blank"
                        >
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="发布指南" name="senior">
                    <div class="u-docs">
                        <a
                            v-for="(item, i) in jx3dat_senior"
                            :key="i"
                            class="u-doc"
                            :href="item.link"
                            target="_blank"
                        >
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from "@/components/minirank.vue";
import { getMenuGroups } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            activeDocGroup: "",
            jx3dat_newbie: [],
            jx3dat_senior: [],
        };
    },
    computed: {},
    methods: {},
    mounted: function () {
        getMenuGroups(["jx3dat_newbie", "jx3dat_senior"]).then((res) => {
            let data = res.data.data.data || {};
            for (let key in data) {
                this[key] = data[key]["menus"];
            }
        });
    },
    components: {
        minirank,
    },
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
