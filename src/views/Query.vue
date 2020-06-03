<template>
    <div class="m-jx3dat-query" v-loading="loading">
        <search />
        <tabs />
        <div class="m-jx3dat-search-result">
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
import tabs from "@/components/tabs.vue";
import search from "@/components/search.vue";
import { searchFeed } from "../service/rank";
export default {
    name: "Query",
    props: [],
    data: function() {
        return {
            data: [],
            loading: false,
        };
    },
    watch: {
        '$store.state.query' : function (){
            this.search(this.$store.state.query);
        }
    },
    computed: {
    },
    methods: {
        search: function(query) {
            this.loading = true;
            searchFeed(query)
                .then((data) => {
                    this.data = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
    },
    components: {
        tabs,
        search,
    },
};
</script>

<style lang="less">
@import "../assets/css/query.less";
</style>
