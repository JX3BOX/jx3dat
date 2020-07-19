<template>
    <div class="m-single-nav m-jx3dat-single-nav">
        <Author :author="author"/>
        <Authorposts :uid="uid"/>
    </div>
</template>

<script>
export default {
    name: "single_nav",
    props: [],
    data: function() {
        return {
            
        };
    },
    computed: {
        author : function (){
            return this.$store.state.author
        },
        uid : function (){
            return this.author.uid
        }
    },
    methods: {
        
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/single_nav.less";
</style>
