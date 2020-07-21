<template>
    <div class="m-jx3dat">
        <tabs v-if="isDBM"/>
        <router-view />
    </div>
</template>

<script>
import tabs from "./tabs";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        isDBM : function (){
            return this.subtype == '1' || !this.subtype
        }
    },
    methods: {
    },
    mounted: function() {
    },
    components: {
        tabs,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
