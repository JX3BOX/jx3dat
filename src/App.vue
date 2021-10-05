<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="插件数据"
            slug="jx3dat"
            root="/jx3dat"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('jx3dat')" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-jx3dat">
                <tabs v-if="isDBM" />
                <router-view />
            </div>
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/list_nav.vue";
import Side from "@/components/list_side.vue";
import tabs from "@/components/tabs";
import {getAppIcon} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        isDBM: function () {
            return this.$route.meta.belongs == 'dbm'
        },
    },
    methods: {getAppIcon},
    watch: {},
    components: {
        Info,
        Nav,
        Side,
        tabs,
    },
};
</script>

<style lang="less">
@import "./assets/css/layout.less";
@import "./assets/css/list.less";
@media screen and (max-width: @phone) {
    .c-breadcrumb{
        .u-op{
            .none;
        }
    }
}
</style>
