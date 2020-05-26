import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Plugins from "../views/Plugins.vue";
import DBM from "../views/DBM.vue";
import Docs from "../views/Docs.vue";
import Feedback from "../views/Feedback.vue";

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "plugins", path: "/plugins", component: Plugins },
    { name: "dbm", path: "/dbm", component: DBM },
    { name: "feedback", path: "/feedback", component: Feedback },
    { name: "docs", path: "/docs", component: Docs },
];

const router = new VueRouter({
    routes,
});

export default router;
