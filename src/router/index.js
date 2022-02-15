import Vue from "vue";
import VueRouter from "vue-router";

import Userdata from "../views/Userdata.vue";
import Rank from "../views/Rank.vue";
import Plugins from "../views/Plugins.vue";

Vue.use(VueRouter);
const index_redirect = location.href.includes("origin") ? "/plugins?subtype=5" : "/plugins"
const routes = [
    { name: "index", path: "/", redirect: index_redirect },
    { name: "userdata", path: "/userdata", component: Userdata, meta: { side: false } },
    { name: "plugins", path: "/plugins", component: Plugins, meta: { side: true } },
    { name: "rank", path: "/rank", component: Rank, meta: { belongs: "dbm", side: false } },
];

const router = new VueRouter({
    routes,
});

export default router;
