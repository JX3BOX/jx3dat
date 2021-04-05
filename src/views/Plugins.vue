<template>
    <div class="m-jx3dat-plugins" v-loading="loading">
        <div class="m-plugins-header">
            <h1 class="m-plugins-title">
                <i :class="typeicon(subtype)"></i>
                {{ typemap[subtype] }}
            </h1>
        </div>
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <!-- 搜索 -->
            <div class="m-archive-search m-jx3dat-search" slot="search-before">
                <a :href="publish_link" class="u-publish el-button el-button--primary">+ 发布数据</a>
                <el-input class="m-jx3dat-input" placeholder="请输入搜索内容" v-model="search">
                    <template slot="prepend">关键词</template>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 过滤 -->
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 列表 -->
            <div class="m-archive-list m-plugins-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <a class="u-banner" :href="item.ID | postLink" :target="target">
                            <img v-if="item.post_banner" :src="showBanner(item.post_banner)" />
                            <img
                                class="u-default-banner"
                                v-else
                                :src="item.post_subtype | showDefaultBanner"
                            />
                        </a>

                        <h2 class="u-post" :class="{ isSticky: item.sticky }">
                            <img class="u-icon" svg-inline src="../assets/img/post.svg" />
                            <a
                                class="u-title"
                                :style="item.color | isHighlight"
                                :href="item.ID | postLink"
                                :target="target"
                            >{{ item.post_title }}</a>
                            <span class="u-marks" v-if="item.mark && item.mark.length">
                                <i
                                    v-for="mark in item.mark"
                                    class="u-mark"
                                    :key="mark"
                                >{{ mark | showMark }}</i>
                            </span>
                        </h2>

                        <div class="u-desc">{{ item.post_content || item.post_title }}</div>

                        <div class="u-misc">
                            <img
                                class="u-author-avatar"
                                :src="item.author_info.user_avatar | showAvatar"
                                :alt="item.author_info.display_name"
                            />
                            <a
                                class="u-author-name"
                                :href="item.post_author | authorLink"
                                target="_blank"
                            >{{ item.author_info.display_name }}</a>
                            <span class="u-date">
                                Updated on
                                <time v-if="order == 'update'">{{item.post_modified | dateFormat}}</time>
                                <time v-else>{{item.post_date | dateFormat}}</time>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getPosts } from "../service/post";
import {
    showAvatar,
    authorLink,
    getThumbnail,
    buildTarget,
    publishLink,
    getAppType,
    showBanner,
} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
import { jx3dat_types } from "../assets/data/types.json";
const typeicons = {
    "2": "el-icon-aim",
    "3": "el-icon-news",
    "4": "el-icon-brush",
    "5": "el-icon-magic-stick",
};
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";

export default {
    name: "Plugins",
    props: [],
    data: function () {
        return {
            loading: false,

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 10, //每页条目
            appendMode: false, //追加模式

            search: "",

            order: "", //排序
            mark: "", //角标
            client: this.$store.state.client, //版本选择

            typemap: jx3dat_types,
        };
    },
    computed: {
        resetParams: function () {
            return [
                this.subtype,
                this.search,
                this.mark,
                this.lang,
                this.client,
            ];
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
                sticky: 1,
            };
            let optionalParams = [
                "subtype",
                "search",
                "order",
                "mark",
                "lang",
                "client",
            ];
            optionalParams.forEach((item) => {
                if (this[item]) {
                    params[item] = this[item];
                }
            });
            return params;
        },
        subtype: function () {
            return this.$route.params.subtype;
        },
        defaultBanner: function () {
            return this.subtype + ".png";
        },
        target: function () {
            return buildTarget();
        },
        publish_link: function (val) {
            return publishLink("jx3dat");
        },
    },
    watch: {
        subtype : function (){
            this.search = ''  
        },
        resetParams: function () {
            this.page = 1;
        },
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadPosts();
            },
        },
        "$route.query.page": function (val) {
            this.page = ~~val;
        },
    },
    methods: {
        loadPosts: function () {
            this.loading = true;
            getPosts(this.params, this)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.appendMode = false
                    this.loading = false;
                });
        },
        changePage: function (i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function (i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function (o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
        showBanner: showBanner,
        randomColor: function (i) {
            const colormap = [
                "rgb(143,179,204)",
                "rgb(151,204,172)",
                "rgb(151,204,172)",
                "rgb(204,167,151)",
                "rgb(204,167,151)",
                "rgb(155,151,204)",
                "#b7b3e4",
                "#a3c9e0",
                "#b4e5c9",
                "#dfe0ac",
                "#e1bfae",
                "#e8bce9",
            ];
            return colormap[i];
        },
        typeicon: function (subtype) {
            return typeicons[subtype];
        },
    },
    filters: {
        authorLink: function (val) {
            return authorLink(val);
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        dateFormat: function (val) {
            return dateFormat(val);
        },
        postLink: function (val) {
            return location.origin + "/" + getAppType() + "/" + val;
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
        showDefaultBanner: function (val) {
            val = val || "2";
            return __imgPath + "image/banner/jx3dat" + val + ".png";
        },
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/plugins.less";
</style>
