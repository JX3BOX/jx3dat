<template>
    <div class="m-jx3dat-jx3dat" v-loading="loading">
        <!-- <search /> -->
        <tabs />
        <div class="m-jx3dat-rank-full m-jx3dat-rank">
            <el-table
                :data="data"
                :default-sort="{ prop: '7days', order: 'descending' }"
                :row-class-name="tableRowClassName"
            >
                <el-table-column type="index" label="排名" width="48">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="订阅号"
                    sortable
                    :formatter="feed"
                >
                </el-table-column>
                <el-table-column
                    prop="7days"
                    label="7天下载量"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="30days"
                    label="30天下载量"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="yesterday"
                    label="昨日下载量"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="before2"
                    label="前日下载量"
                    sortable
                >
                </el-table-column>
                <el-table-column
                    prop="trending"
                    label="累计趋势"
                    :formatter="trending"
                >
                    <template slot-scope="scope">
                        <i
                            class="el-icon-top u-trending"
                            v-if="trending(scope.row) > 0"
                            >{{ (trending(scope.row) * 100).toFixed(2) + "%" }}</i
                        >
                        <i
                            class="el-icon-bottom u-trending"
                            v-if="trending(scope.row) < 0"
                            >{{ (trending(scope.row) * 100).toFixed(2) + "%" }}</i
                        >
                        <span
                            class="u-trending u-trending-keep"
                            v-if="trending(scope.row) == 0"
                            >-</span
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="view"
                    label="详情"
                >
                    <template slot-scope="scope">
                        <a :href="postLink(scope.row.pid)" class="el-button el-button--default is-plain el-button--mini">查看详情<i class="el-icon-arrow-right"></i></a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getRank } from "../service/rank";
import tabs from "@/components/tabs.vue";
// import search from "@/components/search.vue";
export default {
    name: "Rank",
    data: function() {
        return {
            data: [],
            loading: false,
        };
    },
    computed: {},
    methods: {
        feed: function(row, column) {
            let name = row.author;
            if (row.v != "默认版") name += "#" + row.v;
            return name;
        },
        trending: function(row, column) {
            let trending_1 = (row.before3 - row.before2) / row.before2;
            let trending_2 = (row.before2 - row.yesterday) / row.yesterday;
            let average = (trending_1 + trending_2) / 2;
            return isNaN(average) ? "N/A" : average.toFixed(4);
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex < 3) {
                return "t1";
            } else if (rowIndex >= 3 && rowIndex < 10) {
                return "t2";
            } else if (rowIndex >= 10 && rowIndex < 20) {
                return "t3";
            }
            return "";
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
    },
    mounted: function() {
        this.loading = true
        getRank(40,this).then((data) => {
            let _data = [];
            data.forEach((item) => {
                if (item["7days"]) {
                    _data.push(item);
                }
            });
            this.data = _data;
        }).finally(() => {
            this.loading = false
        })
    },
    components: {
        tabs,
        // search
    },
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
