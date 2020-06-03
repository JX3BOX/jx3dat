<template>
    <el-input
        class="m-jx3dat-search"
        placeholder="请输入关键词"
        v-model="search"
        @change="searchDBM"
        disabled
    >
        <template slot="prepend">
            团队监控数据
        </template>
        <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
</template>

<script>
export default {
    name: "search",
    props: [],
    data: function() {
        return {
            search: "",
        };
    },
    computed: {},
    methods: {
        searchDBM: function() {
            // this.$router.push({ name: this.view });
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less"></style>
