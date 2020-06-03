<template>
    <div class="m-jx3dat-rank-mini m-jx3dat-rank">
        <h3 class="c-sidebar-right-title">
            <img class="u-icon" svg-inline src="../assets/img/rank.svg" />排行榜
            <span class="u-more" @click="viewRank">查看更多 &raquo;</span>
        </h3>
        <ul class="u-list">
            <li v-for="(item, j) in data" :key="j">
                <span class="u-order">{{ j + 1 }}</span>
                <span class="u-name"
                    >{{ item.author
                    }}<span v-if="item.v != '默认版'">#{{ item.v }}</span></span
                >
                <span class="u-per"
                    ><i
                        class="el-icon-top u-trending"
                        v-if="trending(item) > 0"
                        >{{ (trending(item) * 100).toFixed(2) + "%" }}</i
                    >
                    <i
                        class="el-icon-bottom u-trending"
                        v-if="trending(item) < 0"
                        >{{ (trending(item) * 100).toFixed(2) + "%" }}</i
                    >
                    <span
                        class="u-trending u-trending-keep"
                        v-if="trending(item) == 0"
                        >-</span
                    ></span
                >
            </li>
        </ul>
    </div>
</template>

<script>
import { getRank } from "../service/rank";
export default {
    name: "rank",
    data: function() {
        return {
            data: [],
        };
    },
    computed: {},
    methods: {
        trending: function(item) {
            let trending_1 = (item.before3 - item.before2) / item.before2;
            let trending_2 = (item.before2 - item.yesterday) / item.yesterday;
            let average = (trending_1 + trending_2) / 2;
            return isNaN(average) ? "N/A" : average.toFixed(4);
        },
        viewRank : function (){
            this.$router.push({ name: 'rank' });
        }
    },
    mounted: function() {
        getRank(this).then((data) => {
            let _data = [];
            for (let [i, item] of data.entries()) {
                if (item["7days"]) {
                    _data.push(item);
                }
            }
            _data = _data.sort((old,now) => {
                return now['7days'] - old['7days']
            }).slice(0,10)
            this.data = _data;
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
