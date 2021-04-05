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
            <!-- 搜索 -->
            <div class="m-archive-search m-jx3dat-search" slot="search-before">
                <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary"
                    v-if="!isLogin || !hasFeed"
                >+ 创建订阅</a>
                <a :href="myFeed" class="u-publish el-button el-button--primary" v-else>
                    <i class="el-icon-setting"></i> 我的数据
                </a>
                <el-input class="m-jx3dat-input" placeholder="请输入关键词" v-model="search">
                    <template slot="prepend">订阅号</template>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 过滤 -->
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 语言过滤 -->
                <menuBy @filter="filter" :data="langs" type="lang" placeholder="语言"></menuBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 列表 -->
            <ul class="m-jx3data-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="item + i">
                    <a class="u-author" :href="item.post_author | authorLink" target="_blank">
                        <img
                            :src="item.author_info.user_avatar | showAvatar"
                            :alt="item.author_info.display_name"
                            class="u-avatar"
                            :class="{isCircle : isCircle(item.author.avatar_frame)}"
                        />
                        <i
                            class="u-avatar-frame"
                            v-if="isValidFrame(item.author_info.user_avatar_frame)"
                        >
                            <img :src="showFrame(item.author_info.user_avatar_frame)" />
                        </i>
                    </a>
                    <div
                        class="u-feeds"
                        v-if="
                            item.post_meta &&
                                item.post_meta.data &&
                                item.post_meta.data.length
                        "
                    >
                        <div
                            class="u-feed"
                            v-for="(feed, i) in item.post_meta.data"
                            :key="feed + i"
                        >
                            <Mark
                                v-if="i == 0"
                                :label="item.author_info.display_name"
                                BGR="#035cc1"
                                v-clipboard:copy="item.author_info.display_name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                :key="item.author_info.display_name + i"
                            />
                            <Mark
                                v-if="i != 0 && feed.status"
                                :label="item.author_info.display_name"
                                :value="feed.name"
                                :BGR="item | highlight"
                                BGL="#24292e"
                                v-clipboard:copy="
                                    item.author_info.display_name + '#' + feed.name
                                "
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                :key="item.author_info.display_name + i"
                            />
                        </div>
                    </div>
                    <div class="u-feeds" v-else>
                        <div class="u-feed">
                            <Mark
                                :label="item.author_info.display_name"
                                BGL="#24292e"
                                v-clipboard:copy="item.author_info.display_name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            />
                        </div>
                    </div>
                    <a class="u-title" :href="item.ID | postLink" :target="target">
                        <i class="u-prefix el-icon-box"></i>
                        <span
                            class="u-text"
                            :style="item.color | isHighlight"
                        >{{ item.post_title || "无标题" }}</span>
                        <span class="u-tags" v-if="item.post_meta">
                            <i class="u-tag" v-for="tag in item.post_meta.tag" :key="tag">{{ tag }}</i>
                        </span>
                        <!-- 角标 -->
                        <span class="u-marks" v-if="item.mark && item.mark.length">
                            <i
                                v-for="mark in item.mark"
                                class="u-mark"
                                :key="mark"
                            >{{ mark | showMark }}</i>
                        </span>
                    </a>
                    <div class="u-desc">
                        {{
                        item.post_excerpt ||
                        item.post_title ||
                        "作者很懒,什么也没有留下"
                        }}
                    </div>
                    <div class="u-info">
                        <time class="u-update" v-if="order == 'update'">{{item.post_modified | dateFormat}}</time>
                        <time class="u-update" v-else>{{item.post_date | dateFormat}}</time>
                    </div>
                    <a
                        :href="item.ID | postLink"
                        :target="target"
                        class="u-view el-button el-button--default el-button--small is-plain"
                    >
                        查看详情
                        <i class="el-icon-arrow-right"></i>
                    </a>
                </li>
            </ul>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";

import { getPosts, getMyPostCount } from "../service/post";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import {
    __Links,
    default_avatar,
    __imgPath,
} from "@jx3box/jx3box-common/data/jx3box.json";
import {
    authorLink,
    getThumbnail,
    buildTarget,
    publishLink,
    getAppType,
} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
import User from "@jx3box/jx3box-common/js/user";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";

import { getFrames } from "@/service/helper.js";
export default {
    name: "Index",
    props: [],
    data: function () {
        return {
            loading: false,

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 20, //每页条目
            appendMode: false, //追加模式

            search: "",

            order: "update", //排序
            mark: "", //角标
            lang: "", //语言
            client: this.$store.state.client, //版本选择

            langs: {
                cn: "简体中文",
                tr: "繁體中文",
            },
            subtype: 1,
            hasFeed: false,
            isLogin: User.isLogin(),

            frames,
        };
    },
    computed: {
        resetParams: function () {
            return [this.search, this.mark, this.lang, this.client];
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
                sticky: 1,
                subtype: 1,
            };
            let optionalParams = ["search", "order", "mark", "lang", "client"];
            optionalParams.forEach((item) => {
                if (this[item]) {
                    params[item] = this[item];
                }
            });
            return params;
        },
        target: function () {
            return buildTarget();
        },
        publish_link: function (val) {
            return publishLink("jx3dat");
        },
        myFeed: function () {
            return "/publish/#/cms/jx3dat";
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
        onCopy: function (val) {
            this.$notify({
                title: "订阅号复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function () {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        isValidFrame: function (frame) {
            return frame && this.frames[frame];
        },
        isCircle: function (frame) {
            return (
                frame &&
                this.frames[frame] &&
                this.frames[frame].style == "circle"
            );
        },
        loadFrames: function () {
            getFrames().then((res) => {
                this.frames = res.data;
            });
        },
        showFrame: function (frame) {
            if (frame) {
                let fileName = this.frames[frame].files.s.file;
                return __imgPath + `image/avatar/${frame}/${fileName}`;
            }
            return "";
        },
    },
    filters: {
        authorLink: function (val) {
            return authorLink(val);
        },
        showAvatar: function (val) {
            return (
                (val && getThumbnail(val, 48, true)) ||
                getThumbnail(default_avatar, 48, true)
            );
        },
        postLink: function (val) {
            return location.origin + "/" + getAppType() + "/" + val;
        },
        highlight: function (item) {
            const colormap = {
                newbie: "#49c10f",
                advanced: "#fba524",
                recommended: "#cb91ff",
                geek: "#fc3c3c",
            };
            if (item.mark) {
                return colormap[item.mark[0]];
            }
            return "#035cc1";
        },
        dateFormat: function (val) {
            return dateFormat(val);
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
    },
    watch: {
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
    created: function () {
        this.page = ~~this.$route.query.page || 1;
        this.loadFrames();
        this.isLogin &&
            getMyPostCount().then((res) => {
                this.hasFeed = !!res.data.data.jx3dat;
            });
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
