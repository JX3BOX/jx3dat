<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
        <div class="m-single-meta" v-if="visible">
            <div class="u-subtype-1" v-if="subtype == 1 && data.length">
                <div v-for="(feed, i) in data" :key="feed + i">
                    <div class="u-data" v-if="i == 0">
                        <div class="u-feed">
                            <Mark
                                :label="post.author"
                                v-clipboard:copy="post.author"
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
                                :label="post.author"
                                :value="feed.name"
                                :BGR="post | highlight"
                                BGL="#24292e"
                                v-clipboard:copy="post.author + '#' + feed.name"
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
                                :label="post.author"
                                :value="feed.name"
                                BGR="#f39"
                                BGL="#24292e"
                                v-clipboard:copy="post.author + '#' + feed.name"
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
                <span class="u-typename">数据类型：{{ post_subtype }}</span>
                <a
                    class="u-download el-button el-button--primary el-button--small"
                    :href="meta.down | showDown"
                    target="_blank"
                    v-if="meta.down"
                >
                    <i class="el-icon-download"></i><span class="u-long">默认数据下载</span><span class="u-short">下载</span>
                </a>
            </div>
        </div>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import { jx3dat_types } from "../assets/data/types.json";
import {resolveImagePath} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            meta: {},
            data: [],
            author: {},
            stat: {},
            typemap: jx3dat_types,
        };
    },
    computed: {
        id: function() {
            return this.$store.state.id;
        },
        subtype : function (){
            return _.get(this.post, "post_subtype");
        },
        post_subtype: function() {
            if (this.subtype) {
                return this.typemap[this.subtype];
            } else {
                return "";
            }
        },
        visible : function (){
            return this.post._check
        },
    },
    methods: {
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
                    this.post = this.$store.state.post = res.data.data;
                    this.data = this.post.post_meta && this.post.post_meta.data;
                    this.meta = this.post.post_meta;
                    this.$store.state.user_id = this.post.post_author;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat('jx3dat',this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat('jx3dat',this.id);
        }
    },
    components: {
        singlebox,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/meta.less";
</style>
