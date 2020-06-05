<template>
    <div class="m-jx3dat-search">
        <el-input
            class="m-jx3dat-input"
            placeholder="请输入关键词"
            v-model="search"
            @change="searchDBM"
            disabled
        >
            <template slot="prepend">
                订阅号搜索
            </template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="m-jx3dat-search-result" v-if="data.length">
            <ul>
                <li v-for="(item, i) in data" :key="i">
                    <a :href="postLink(item.pid)">
                        &raquo;
                        {{ item.author
                        }}<span v-if="item.v != '默认版'">#{{ item.v }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { searchFeed } from "../service/rank";
export default {
    name: "search",
    props: [],
    data: function() {
        return {
            search: "",
            data: [],
        };
    },
    computed: {},
    methods: {
        query: function() {
            searchFeed(this.search,this).then((data) => {
                this.data = data;
            });
        },
        searchDBM: function() {
            if (this.search) {
                this.query();
            }
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less"></style>
