<template>
    <div class="m-jx3dat">
        <!-- <tabs /> -->
        <router-view />
    </div>
</template>

<script>
// import tabs from "./tabs";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {},
    methods: {
    },
    mounted: function() {},
    components: {
        // tabs,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
