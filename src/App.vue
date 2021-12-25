<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="数据下载" slug="jx3dat" root="/jx3dat" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('jx3dat')" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="hideSide">
            <router-view />
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        hideSide: function() {
            return !this.$route.meta.side || false;
        },
    },
    methods: { getAppIcon },
    watch: {},
    components: {
        Info,
        Nav,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@import "./assets/css/list.less";
</style>
