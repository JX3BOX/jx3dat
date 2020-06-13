<template>
    <div class="m-jx3dat-jx3dat" v-loading="loading">
        <tabs />
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
                <a class="u-title" :href="item.post.ID | postLink" :target="target">
                    {{ item.post.post_title || "无标题" }}
                    <span class="u-tags" v-if="item.post.post_meta">
                        <i
                            class="u-tag"
                            v-for="tag in item.post.post_meta.tag"
                            :key="tag"
                            >{{ tag }}</i
                        >
                    </span>
                </a>
                <div class="u-desc" v-if="item.post.post_excerpt">
                    {{ item.post.post_excerpt }}
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
                    :href="item.post.ID | postLink"  :target="target"
                    class="u-view el-button el-button--default el-button--small is-plain"
                    >查看详情<i class="el-icon-arrow-right"></i
                ></a>
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
import { authorLink, showAvatar,buildTarget } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/moment";
export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            loading: false,

            data: [],
            page: 1,
            total: 1,
            pages: 1,
            per : 20,
            
            subtype: 1,

            search : ''
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
            return params;
        },
        target: function (){
            return buildTarget()
        }
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
