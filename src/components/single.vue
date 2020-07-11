<template>
    <div class="m-single-box m-fb-single" :loading="loading">
        <header class="m-single-header">
            <div class="m-single-title">
                <!-- 标题 -->
                <a class="u-title u-sub-block" :href="url"><i v-if="isOriginal" class="u-original">原创</i> {{ title }}</a>
            </div>

            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-icon-author2"
                        ><img svg-inline src="../assets/img/author.svg"
                    /></i>
                    <a class="u-name" :href="authorLink">{{ author.name }}</a>
                </div>

                <!-- tags -->
                <div class="u-meta u-sub-block" v-if="post.post_subtype == '1'">
                    <em class="u-label">标签</em>
                    <span class="u-value">
                        {{ format(post.post_meta, "tag") }}
                    </span>
                </div>

                <!-- 发布日期 -->
                <span class="u-podate u-sub-block" title="发布日期">
                    <i class="u-icon-podate"
                        ><img svg-inline src="../assets/img/podate.svg"
                    /></i>
                    <time>{{ post.post_date | dateFormat }}</time>
                </span>

                <!-- 最后更新时间 -->
                <span class="u-modate u-sub-block" title="最后更新">
                    <i class="u-icon-modate"
                        ><img svg-inline src="../assets/img/modate.svg"
                    /></i>
                    <time>{{ post.post_modified | dateFormat }}</time>
                </span>

                <!-- 查看次数 -->
                <span class="u-views u-sub-block">
                    <i class="el-icon-view"></i>
                    {{ setting.views }}
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="editLink" v-if="showEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>
        </header>

        <div class="m-single-meta">
            <div class="u-subtype-1" v-if="subtype == 1 && data.length">
                <div v-for="(feed, i) in data" :key="feed + i">
                    <div class="u-data" v-if="i == 0">
                        <div class="u-feed">
                            <Mark
                                :label="author.name"
                                v-clipboard:copy="author.name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            />
                        </div>
                        <span class="u-desc">{{ feed.desc }}</span>
                        <a
                            class="u-down el-button el-button--default el-button--small is-plain"
                            :href="feed.file"
                            target="_blank"
                            ><i class="el-icon-download"></i
                            ><span>本地下载</span></a
                        >
                    </div>
                    <div class="u-data" v-if="i != 0 && feed.status">
                        <div class="u-feed">
                            <Mark
                                :label="author.name"
                                :value="feed.name"
                                :BGR="post | highlight"
                                BGL="#24292e"
                                v-clipboard:copy="author.name + '#' + feed.name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            />
                        </div>
                        <span class="u-desc">{{ feed.desc }}</span>
                        <a
                            class="u-down el-button el-button--default el-button--small is-plain"
                            :href="feed.file"
                            target="_blank"
                            ><i class="el-icon-download"></i
                            ><span>本地下载</span></a
                        >
                    </div>
                    <div class="u-data" v-if="!feed.status && cansee">
                        <div class="u-feed">
                            <Mark
                                :label="author.name"
                                :value="feed.name"
                                BGR="#f39"
                                BGL="#24292e"
                                v-clipboard:copy="author.name + '#' + feed.name"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            />
                        </div>
                        <span class="u-desc">{{ feed.desc }}</span>
                        <a
                            class="u-down el-button el-button--default el-button--small is-plain"
                            :href="feed.file"
                            target="_blank"
                            ><i class="el-icon-download"></i
                            ><span>本地下载</span></a
                        >
                    </div>
                </div>
                <div class="u-data u-data-add">
                    <div class="u-feed" v-if="meta.github">
                        <Mark
                            :label="meta.github"
                            value="@github"
                            BGR="#3d454d"
                            BGL="#24292e"
                            v-clipboard:copy="meta.github + '@github'"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            ><img
                                class=""
                                svg-inline
                                src="../assets/img/github.svg"
                        /></Mark>
                    </div>
                    <div class="u-feed" v-if="meta.gitee">
                        <Mark
                            :label="meta.gitee"
                            value="@gitee"
                            BGR="#c71d23"
                            BGL="#24292e"
                            v-clipboard:copy="meta.gitee + '@gitee'"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            ><img
                                class="u-gitee"
                                svg-inline
                                src="../assets/img/gitee.svg"
                        /></Mark>
                    </div>
                    <div class="u-feed" v-if="meta.aliyun">
                        <Mark
                            :label="meta.aliyun"
                            value="@aliyun"
                            BGR="#ff6a00"
                            BGL="#24292e"
                            v-clipboard:copy="meta.aliyun + '@aliyun'"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            ><img
                                class=""
                                svg-inline
                                src="../assets/img/aliyun.svg"
                        /></Mark>
                    </div>
                </div>
            </div>
            <div class="u-subtype-other" v-if="subtype != 1">
                <span class="u-typename">数据类型：{{ typename }}</span>
                <a
                    class="u-download el-button el-button--primary el-button--small"
                    :href="meta.down | showDown"
                    target="_blank"
                    v-if="meta.down"
                >
                    <i class="el-icon-download"></i><span>默认数据下载</span>
                </a>
            </div>
        </div>

        <div class="m-single-prepend">
            <div class="m-single-excerpt" v-if="post.post_excerpt">
                <el-divider content-position="left">Excerpt</el-divider>
                {{ post.post_excerpt }}
            </div>
        </div>

        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article
                    :content="post.post_content"
                    directorybox="#directory"
                />
            </div>
        </div>

        <div class="m-single-append">
            <!-- 操作 -->
            <div class="m-single-panel" v-if="!loading">
                <div class="u-minigroup">
                    <Print class="u-fn" :title="title" :authorID="post.post_author" />
                    <QRcode class="u-fn" />
                    <Sharing class="u-fn" :title="title" />
                </div>
                <Fav />
            </div>
        </div>

        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id" />
        </div>

        <footer class="m-single-footer">
            <!-- <ins
                class="adsbygoogle"
                style="display:block;max-width:100%;overflow:hidden;margin:10px;"
                data-ad-client="ca-pub-4388499329141185"
                data-ad-slot="1787190081"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins> -->
        </footer>
    </div>
</template>

<script>
import lodash from "lodash";
import { getPost } from "../service/post";
import dateFormat from "../utils/dateFormat";
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    authorLink,
    editLink,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils.js";
import User from "@jx3box/jx3box-common/js/user.js";
import { fn } from "moment";
import { jx3dat_types } from "../assets/data/types.json";
import { getStat, postStat } from "../service/stat.js";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            post: {},
            setting: {},
            meta: {},
            author: {},
            loading: false,
            url: location.href,
            data: [],
            typemap: jx3dat_types,
        };
    },
    computed: {
        isOriginal:function (){
            return !!~~_.get(this.post, "original")
        },
        authorLink: function() {
            return authorLink(this.author.uid);
        },
        editLink: function() {
            return editLink(this.post.post_type, this.post.ID);
        },
        id: function() {
            return this.$store.state.pid;
        },
        showEdit: function() {
            return (
                this.post.post_author == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
        typename: function() {
            return this.typemap[this.post.post_subtype];
        },
        cansee: function() {
            return (
                User.getInfo().group >= 64 ||
                User.getInfo().uid == this.author.uid
            );
        },
        subtype: function() {
            return this.post.post_subtype || "1";
        },
        title: function() {
            return _.get(this.post, "post_title") || "无标题";
        },
    },
    methods: {
        format: function(parent, key) {
            let val = lodash.get(parent, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
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
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        highlight: function(item) {
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
        showDown: function(val) {
            return val && resolveImagePath(val);
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post =
                        res.data.data.post || {};
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta || {};
                    this.author = this.$store.state.author =
                        res.data.data.author || {};
                    this.data = (this.meta && this.meta.data) || [];
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.setting = this.$store.state.setting = data;
            });
            postStat(this.id);
        }
    },
    components: {
        Article,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/meta.less";
</style>
