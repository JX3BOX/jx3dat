<template>
    <div class="m-jx3dat-plugins" v-loading="loading">
        <h1 class="m-jx3dat-title">{{typemap[subtype]}}</h1>
        <ul class="m-jx3data-list" v-if="data.length">
            <li v-for="(item, i) in data" :key="item + i">
                <a class="u-author" :href="item.author.uid | authorLink"
                    ><img
                        :src="item.author.avatar | showAvatar"
                        :alt="item.author.name"
                        class="u-avatar"
                /></a>
                <time class="u-update">{{
                    item.post.post_modified | dateFormat
                }}</time>
                <b class="u-feed">
                    <Mark />
                </b>
                <a class="u-title" :href="item.post.ID | postLink">
                    {{ item.post.post_title }}
                    <!-- <span class="u-tags" v-if="item.post.post_meta">
                        <i
                            class="u-tag"
                            v-for="tag in item.post.post_meta.tag"
                            :key="tag"
                            >{{ tag }}</i
                        >
                    </span> -->
                </a>
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
import {jx3dat_types} from '@jx3box/jx3box-common/js/types.json'
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
            typemap : jx3dat_types
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
    },
    watch : {
        subtype(newdata){
            if (newdata != "1") this.changePage(1);
        }
    },
    methods: {
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
                    console.log(res.data.data);
                    window.scrollTo(0, 0);
                    this.data = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
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
        dateFormat: function(val) {
            return dateFormat(val)
        },
        postLink: function(val) {
            return "./?pid=" + val;
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
