<template>
    <div class="m-jx3dat-plugins" v-loading="loading">
        <h1 class="m-plugins-title">
            <i class="el-icon-box"></i>{{ typemap[subtype] }}
        </h1>
        <div class="m-archive-list m-plugins-list" v-if="data.length">
            <ul class="u-list">
                <li class="u-item" v-for="(item, i) in data" :key="i">
                    <a class="u-banner" :href="item.post.ID | postLink" :style="{ background: randomColor(i) }">
                        <img
                            v-if="item.post.post_banner"
                            :src="showBanner(item.post.post_banner)"
                        />
                        <img
                            class="u-default-banner"
                            v-else
                            src="../assets/img/logo2.svg"
                        />
                    </a>

                    <h2 class="u-post" :class="{ isSticky: item.post.sticky }">
                        <img
                            class="u-icon"
                            svg-inline
                            src="../assets/img/post.svg"
                        />
                        <a
                            class="u-title"
                            :style="item.post.color | isHighlight"
                            :href="item.post.ID | postLink"
                            target="_blank"
                            >{{ item.post.post_title }}</a
                        >
                        <span
                            class="u-marks"
                            v-if="item.post.mark && item.post.mark.length"
                        >
                            <i
                                v-for="mark in item.post.mark"
                                class="u-mark"
                                :key="mark"
                                >{{ mark | showMark }}</i
                            >
                        </span>
                    </h2>

                    <div class="u-desc">
                        {{ item.post.post_content }}
                    </div>

                    <div class="u-misc">
                        <img
                            class="u-author-avatar"
                            :src="item.author.avatar | showAvatar"
                            :alt="item.author.name"
                        />
                        <a
                            class="u-author-name"
                            :href="item.author.uid | authorLink"
                            target="_blank"
                            >{{ item.author.name }}</a
                        >
                        <span class="u-date">
                            Updated on
                            <time>{{
                                item.post.post_modified | dateFormat
                            }}</time>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >
        <el-pagination
            class="m-archive-pages"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import {
    showAvatar,
    authorLink,
    showMinibanner,
} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
import { jx3dat_types } from "@jx3box/jx3box-common/js/types.json";
import { fn } from "moment";
export default {
    name: "Plugins",
    props: [],
    data: function() {
        return {
            data: [],
            page: 1,
            total: 1,
            pages: 1,
            loading: false,
            typemap: jx3dat_types,
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        defaultBanner: function() {
            return this.subtype + ".png";
        },
    },
    watch: {
        subtype(newdata) {
            if (newdata != "1") this.changePage(1);
        },
    },
    methods: {
        appendPage: function(i) {
            this.loading = true;
            getPosts(
                {
                    page: i,
                    subtype: this.subtype,
                },
                this
            )
                .then((res) => {
                    this.data = this.data.concat(res.data.data.list);
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.loading = true;
            getPosts(
                {
                    page: i,
                    subtype: this.subtype,
                },
                this
            )
                .then((res) => {
                    // console.log(res.data.data);
                    window.scrollTo(0, 0);
                    this.data = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        showBanner: function(val) {
            return showMinibanner(val);
        },
        randomColor: function(i) {
            const colormap = [
                "rgb(143,179,204)",
                "rgb(151,204,172)",
                "rgb(151,204,172)",
                "rgb(204,167,151)",
                "rgb(204,167,151)",
                "rgb(155,151,204)",
                '#b7b3e4',
                '#a3c9e0',
                '#b4e5c9',
                '#dfe0ac',
                '#e1bfae',
                '#e8bce9'
            ];
            return colormap[i];
        },
    },
    filters: {
        authorLink: function(val) {
            return authorLink(val);
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        dateFormat: function(val) {
            return dateFormat(val);
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            const mark_map = {
                newbie: "新手易用",
                advanced: "进阶推荐",
                recommended: "编辑精选",
                geek: "骨灰必备",
            };
            return mark_map[val];
        },
    },
    mounted: function() {
        if (this.subtype != "1") this.changePage(1);
    },
};
</script>

<style lang="less">
@import "../assets/css/plugins.less";
</style>
