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
        >
            <img slot="logo" svg-inline src="./assets/img/jx3dat.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <list v-if="mode == 'list'" />
            <!-- <single v-if="mode == 'single'" /> -->
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
// import single from "@/components/single.vue";
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
    mounted: function() {
        let params = new URLSearchParams(location.search);
        this.$store.state.subtype = params.get("subtype") || "1";
        this.$store.state.pid = params.get("pid") || getRewrite("pid");
        this.$store.state.mode = this.$store.state.pid ? "single" : "list";
    },
    components: {
        Info,
        Nav,
        Extend,
        list,
        // single,
    },
};
</script>
