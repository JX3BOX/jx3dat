<template>
    <el-tabs class="m-jx3dat-tabs" v-model="tab">
        <el-tab-pane label="最后更新数据" name="index">
            <span slot="label">
                <i class="el-icon-s-promotion"></i>
                <b>最近更新数据</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="订阅排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>订阅号排行榜</b>
            </span>
        </el-tab-pane>

    </el-tabs>
</template>

<script>
export default {
    name: "tabs",
    data: function() {
        return {
            tab : 'index'
        };
    },
    computed: {
        view : function (){
            return this.$route.name
        }
    },
    watch : {
        view : function (val){
            this.tab = val
        },
        tab : function (val){
            this.$router.push({
                name : val
            })
        }
    },
    methods: {
    },
    mounted: function() {
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
