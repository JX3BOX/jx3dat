<template>
    <div class="m-jx3dat-jx3dat" v-loading="loading">
        <el-input
            class="m-jx3dat-search"
            placeholder="请输入关键词"
            v-model="search"
            @change="searchDBM"
            disabled
        >
            <template slot="prepend">
                DBM
            </template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-tabs class="m-jx3dat-tabs" v-model="view" @tab-click="changeView">
            <el-tab-pane label="最后更新" name="index">
                <span slot="label">
                    <i class="el-icon-s-promotion"></i>
                    <b>最近更新</b>
                </span>
            </el-tab-pane>

            <el-tab-pane label="趋势榜" name="trending">
                <span slot="label">
                    <i class="el-icon-data-line"></i>
                    <b>趋势榜</b>
                </span>
            </el-tab-pane>

            <el-tab-pane label="7日下载排行" name="7days">
                <span slot="label">
                    <i class="el-icon-s-data"></i>
                    <b>7日下载排行</b>
                </span>
            </el-tab-pane>

            <el-tab-pane label="30日下载排行" name="30days">
                <span slot="label">
                    <i class="el-icon-trophy"></i>
                    <b>30日下载排行</b>
                </span>
            </el-tab-pane>

            <el-tab-pane label="收藏榜" name="star">
                <span slot="label">
                    <i class="el-icon-star-on"></i>
                    <b>收藏口碑榜</b>
                </span>
            </el-tab-pane>

            <el-tab-pane label="推荐榜" name="rec">
                <span slot="label">
                    <i class="el-icon-medal-1"></i>
                    <b>编辑推荐榜</b>
                </span>
            </el-tab-pane>
        </el-tabs>
        <ul class="m-jx3data-list" v-if="data.length">
            <li v-for="(item, i) in data" :key="item + i">
                <div class="u-feeds" v-if="item.post.post_meta.data.length">
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
                <a class="u-title" :href="item.post.ID | postLink">
                    {{ item.post.post_title || '无标题'}}
                    <span class="u-tags" v-if="item.post.post_meta">
                        <i
                            class="u-tag"
                            v-for="tag in item.post.post_meta.tag"
                            :key="tag"
                            >{{ tag }}</i
                        >
                    </span>
                </a>
                <div class="u-desc">
                    {{item.post.post_excerpt}}
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
                    class="u-view el-button el-button--default el-button--small is-plain"
                    >查看详情<i class="el-icon-arrow-right"></i></a
                >
            </li>
        </ul>
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
            :page-size="20"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import { authorLink, showAvatar } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
import { fn } from "moment";
export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            data: [],
            page: 1,
            total: 1,
            pages: 1,
            loading: false,
            subtype: 1,
            search: "",
            view: "index",
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
    },
    methods: {
        searchDBM: function() {},
        appendPage: function(i) {
            this.loading = true;
            getPosts(
                {
                    page: i,
                    per: 20,
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
                    per: 20,
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
        changeView: function() {},
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
    },
    mounted: function() {
        this.changePage(1);
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
@import "../assets/css/tabs.less";
</style>
