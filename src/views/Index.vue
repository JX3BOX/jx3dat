<template>
    <div class="m-jx3dat-jx3dat">
        <el-input class="m-jx3dat-search" placeholder="请输入关键词" v-model="search" @change="searchDBM">
            <template slot="prepend">
                DBM
            </template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="m-jx3dat-label">
            <span class="u-name">订阅名格式 : <b>作者昵称@jx3box</b></span>
            <span class="u-order">排序 : 最后更新</span>
        </div>
        <ul class="m-jx3data-list" v-if="data.length">
            <li v-for="(item,i) in data" :key="item + i">
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
                    <Mark :value="item.author.name" :BGR="item | highlight" />
                </b>
                <a class="u-title" :href="item.post.ID | postLink">
                    {{ item.post.post_title }}
                    <span class="u-tags" v-if="item.post.post_meta">
                        <i
                            class="u-tag"
                            v-for="tag in item.post.post_meta.tag"
                            :key="tag"
                            >{{ tag }}</i
                        >
                    </span>
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
import moment, { fn } from "moment";
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
            subtype: "", //TODO:修改为1
            search : '',
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
    },
    methods: {
        searchDBM : function (){
            
        },
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
                    console.log(res.data.data)
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
        postLink: function(val) {
            return "./?pid=" + val;
        },
        highlight: function(item) {
            if (item.post.sticky) {
                return "#f39";
            } else {
                return "#0366d6";
            }
        },
        dateFormat: function(val) {
            return moment(val).fromNow();
        },
    },
    mounted: function() {
        this.changePage(1)
    },
};
</script>

<style lang="less">
@import "../assets/css/jx3dat.less";
</style>
