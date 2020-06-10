<template>
    <div id="app" :class="{ 'p-list': mode == 'list', 'p-single': mode == 'single' }">
        <Header></Header>
        <Breadcrumb
            name="插件数据"
            slug="jx3dat"
            root="/jx3dat"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/jx3dat.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single v-if="mode == 'single'" />
            <list v-else />
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import Extend from "@/components/Extend.vue";
import list from "@/components/list.vue";
import single from "@/components/single.vue";
const { getRewrite } = require("@jx3box/jx3box-common/js/utils");

export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    watch : {
        $route: {
            handler : function (newdata){
                this.$store.state.subtype = newdata.params.subtype;
            },
            deep: true,
        }
    },
    beforeCreate: function() {
        let params = new URLSearchParams(location.search);
        this.$store.state.pid = params.get("pid") || getRewrite("pid");
        this.$store.state.mode = this.$store.state.pid ? "single" : "list";
        this.$store.state.subtype = this.$route.params.subtype;
    },
    components: {
        Info,
        Nav,
        Extend,
        list,
        single,
    },
};
</script>

<style lang="less">
    @import './assets/css/layout.less';
</style>