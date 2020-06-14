<template>
    <div class="m-jx3dat-jx3dat" v-loading="loading">
        <tabs />

        <!-- 排序 -->
        <div class="m-archive-order">
            <!-- 发布按钮 -->
            <a
                :href="publish_link"
                class="u-publish el-button el-button--primary el-button--small"
            >
                + 创建订阅号
            </a>
            <!-- <a
                :href="mywork_link"
                class="u-publish el-button el-button--primary el-button--small"
            >
                <i class="el-icon-setting"></i> 我的团控数据
            </a> -->

            <!-- 角标过滤 -->
            <div class="u-filter" :class="{ on: filter_visible }">
                <span class="u-label" @click="showFilter">
                    <span class="u-current-filter"
                        >筛选 : {{ currentMark || "全部" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-all"
                        :class="{ on: mark == '' }"
                        @click="filterMark('')"
                        ><i class="el-icon-s-operation"></i> 全部</span
                    >
                    <span
                        class="u-mode u-newbie"
                        :class="{ on: mark == 'newbie' }"
                        @click="filterMark('newbie')"
                        ><i class="el-icon-user"></i> 新手易用</span
                    >
                    <span
                        class="u-mode u-advanced"
                        :class="{ on: mark == 'advanced' }"
                        @click="filterMark('advanced')"
                        ><i class="el-icon-data-line"></i> 进阶推荐</span
                    >
                    <span
                        class="u-mode u-recommended"
                        :class="{ on: mark == 'recommended' }"
                        @click="filterMark('recommended')"
                        ><i class="el-icon-star-off"></i> 编辑精选</span
                    >
                    <span
                        class="u-mode u-geek"
                        :class="{ on: mark == 'geek' }"
                        plain
                        @click="filterMark('geek')"
                        ><i class="el-icon-medal-1"></i> 骨灰必备</span
                    >
                </span>
            </div>

            <!-- 排序模式 -->
            <div class="u-modes" :class="{ on: order_visible }">
                <span class="u-label" @click="showOrder">
                    <span class="u-current-order"
                        >排序 : {{ currentOrder || "最后更新" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-update"
                        :class="{ on: order == 'update' }"
                        @click="reorder('update')"
                        ><i class="el-icon-refresh"></i> 最后更新</span
                    >
                    <span
                        class="u-mode u-podate"
                        :class="{ on: order == 'podate' }"
                        @click="reorder('podate')"
                        ><i class="el-icon-sort"></i> 最早发布</span
                    >
                    <span
                        class="u-mode u-likes"
                        :class="{ on: order == 'favs' }"
                        @click="reorder('favs')"
                        ><i class="el-icon-star-off"></i> 收藏最多</span
                    >
                </span>
            </div>
        </div>

        <!-- 搜索 -->
        <div class="m-jx3dat-search">
            <el-input
                class="m-jx3dat-input"
                placeholder="请输入关键词"
                v-model="search"
                @change="commitSearch"
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
                        >{{ item.post.post_title || '无标题'}}
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

        <!-- 空 -->
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>

        <!-- 下一页 -->
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >

        <!-- 分页 -->
        <el-pagination
            class="m-archive-pages"
            :page-size="per"
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
import tabs from "@/components/tabs.vue";
import { getPosts } from "../service/post";
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    authorLink,
    showAvatar,
    buildTarget,
    publishLink,
} from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
const mark_map = {
    newbie: "新手易用",
    advanced: "进阶推荐",
    recommended: "编辑精选",
    geek: "骨灰必备",
};
const order_map = {
    update: "最后更新",
    podate: "最早发布",
    favs: "收藏最多",
    likes: "点赞最多",
    downs: "下载最多",
};
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
            order: "", //排序模式
            mark: "", //筛选模式

            filter_visible: false,
            order_visible: false,

            subtype: 1,

            search: "",
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            if (this.search) {
                params.authorname = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        currentMark: function() {
            return mark_map[this.mark];
        },
        currentOrder: function() {
            return order_map[this.order];
        },
        publish_link: function(val) {
            return publishLink("jx3dat");
        },
        mywork_link: function(val) {
            return __Links.dashboard.work;
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            let query = Object.assign(this.params, {
                page: i,
            });
            this.loading = true;
            getPosts(query, this)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        changePage: function(i) {
            this.loadPosts(i);
        },
        commitSearch: function() {
            this.loadPosts();
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
        filterMark: function(val) {
            this.mark = val;
            this.filter_visible = false;
            this.loadPosts();
        },
        reorder: function(val) {
            this.order = val;
            this.order_visible = false;
            this.loadPosts();
        },
        showFilter: function() {
            this.filter_visible = !this.filter_visible;
        },
        showOrder: function() {
            this.order_visible = !this.order_visible;
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
            return "./?pid=" + val;
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
    created: function() {
        this.loadPosts(1);
    },
    components: {
        tabs,
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
@import "../assets/css/tabs.less";
</style>
