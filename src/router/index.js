import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Rank from "../views/Rank.vue";
import Plugins from "../views/Plugins.vue";
import Lanren from "../views/Lanren.vue";

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "plugins", path: "/plugins/:subtype", component: Plugins },
    { name: "lanren", path: "/lanren/:subtype", component: Lanren },
    { name: "rank", path: "/rank", component: Rank },
];

const router = new VueRouter({
    routes,
});

export default router;
