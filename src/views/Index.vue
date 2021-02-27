<template>
    <div class="m-jx3dat-jx3dat" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <template slot="filter">
                <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary el-button--small"
                    v-if="!isLogin || !hasFeed"
                >
                    + 创建订阅号
                </a>
                <a
                    :href="myFeed"
                    class="u-publish el-button el-button--primary el-button--small"
                    v-else
                >
                    <i class="el-icon-setting"></i> 我的订阅号
                </a>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 语言过滤 -->
                <menuBy @filter="filter" :data="langs" type="lang" placeholder="语言"></menuBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 搜索 -->
            <div class="m-jx3dat-search" slot="search-after">
                <el-input
                    class="m-jx3dat-input"
                    placeholder="请输入关键词"
                    v-model="search"
                >
                    <template slot="prepend">
                        订阅号
                    </template>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 列表 -->
            <ul class="m-jx3data-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="item + i">
                    <div
                        class="u-feeds"
                        v-if="
                            item.post.post_meta &&
                                item.post.post_meta.data &&
                                item.post.post_meta.data.length
                        "
                    >
                        <div
                            class="u-feed"
                            v-for="(feed, i) in item.post.post_meta.data"
                            :key="feed + i"
                        >
                            <Mark
                                v-if="i == 0"
                                :label="item.author.name"
                                BGR="#035cc1"
                                v-clipboard:copy="item.author.name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                :key="item.author.name + i"
                            />
                            <Mark
                                v-if="i != 0 && feed.status"
                                :label="item.author.name"
                                :value="feed.name"
                                :BGR="item | highlight"
                                BGL="#24292e"
                                v-clipboard:copy="
                                    item.author.name + '#' + feed.name
                                "
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                :key="item.author.name + i"
                            />
                        </div>
                    </div>
                    <div class="u-feeds" v-else>
                        <div class="u-feed">
                            <Mark
                                :label="item.author.name"
                                BGL="#24292e"
                                v-clipboard:copy="item.author.name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            />
                        </div>
                    </div>
                    <a
                        class="u-title"
                        :href="item.post.ID | postLink"
                        :target="target"
                    >
                        <i class="u-prefix el-icon-box"></i>
                        <span
                            class="u-text"
                            :style="item.post.color | isHighlight"
                            >{{ item.post.post_title || "无标题" }}
                        </span>
                        <span class="u-tags" v-if="item.post.post_meta">
                            <i
                                class="u-tag"
                                v-for="tag in item.post.post_meta.tag"
                                :key="tag"
                                >{{ tag }}</i
                            >
                        </span>
                        <!-- 角标 -->
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
                    </a>
                    <div class="u-desc">
                        {{
                            item.post.post_excerpt ||
                                item.post.post_title ||
                                "作者很懒,什么也没有留下"
                        }}
                    </div>
                    <div class="u-info">
                        <!-- <a class="u-author" :href="item.author.uid | authorLink">
                        <img
                            :src="item.author.avatar | showAvatar"
                            :alt="item.author.name"
                            class="u-avatar"
                        />
                        <span>{{item.author.name}}</span>
                    </a> -->
                        <time class="u-update">{{
                            item.post.post_modified | dateFormat
                        }}</time>
                    </div>
                    <a
                        :href="item.post.ID | postLink"
                        :target="target"
                        class="u-view el-button el-button--default el-button--small is-plain"
                        >查看详情<i class="el-icon-arrow-right"></i
                    ></a>
                </li>
            </ul>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { getPosts } from "../service/post";
import {hasFeed} from '@/service/server.js'
import { cms as mark_map } from "@jx3box/jx3box-common/js/mark.json";
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    authorLink,
    showAvatar,
    buildTarget,
    publishLink,
    getAppType
} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
import User from '@jx3box/jx3box-common/js/user'

export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            loading: false,

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 20, //每页条目
            appendMode : false, //追加模式

            search: "",

            order: "", //排序
            mark: "", //角标
            lang: "", //语言

            langs: {
                cn: "简体中文",
                tr: "繁體中文",
            },
            subtype: 1,
            hasFeed : false,
            isLogin : User.isLogin()
        };
    },
    computed: {
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
                page : ~~this.page || 1
            };
            if (this.search) {
                params.search = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            if (this.lang) {
                params.meta_4 = this.lang;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        publish_link: function(val) {
            return publishLink("jx3dat");
        },
        myFeed: function(val) {
            return __Links.dashboard.work + "/jx3dat";
        },
    },
    methods: {
        loadPosts: function() {
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
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.appendMode = false
            this.page = i
            window.scrollTo(0, 0);
        },
        appendPage: function(i) {
            this.appendMode = true
            this.page = i
        },
        filter: function(o) {
            this.appendMode = false
            this[o["type"]] = o["val"];
        },
        onCopy: function(val) {
            this.$notify({
                title: "订阅号复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function() {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
    },
    filters: {
        authorLink: function(val) {
            return authorLink(val);
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        postLink: function(val) {
            // return "./?pid=" + val;
            return location.origin + '/' + getAppType() + '/' + val;
        },
        highlight: function(item) {
            const colormap = {
                newbie: "#49c10f",
                advanced: "#fba524",
                recommended: "#cb91ff",
                geek: "#fc3c3c",
            };
            if (item.post.mark) {
                return colormap[item.post.mark[0]];
            }
            return "#035cc1";
        },
        dateFormat: function(val) {
            return dateFormat(val);
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val];
        },
    },
    watch : {
        params : {
            deep : true,
            handler : function (){
                this.loadPosts()
            }
        },
        '$route.query.page' : function (val){
            this.page = ~~val
        }
    },
    created: function() {
        this.page = ~~this.$route.query.page || 1
        this.loadPosts()
        this.isLogin && hasFeed().then((res) => {
            this.hasFeed = !!res.data.data
        })
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
