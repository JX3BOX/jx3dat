import Vue from "vue";
import VueRouter from "vue-router";

import Userdata from "../views/Userdata.vue";
import Rank from "../views/Rank.vue";
import Plugins from "../views/Plugins.vue";

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", redirect: "/plugins/1" },
    { name: "userdata", path: "/userdata", component: Userdata, meta: { side: false } },
    { name: "plugins", path: "/plugins", component: Plugins, meta: { side: true } },
    { name: "rank", path: "/rank", component: Rank, meta: { belongs: "dbm", side: false } },
];

const router = new VueRouter({
    routes,
});

export default router;
