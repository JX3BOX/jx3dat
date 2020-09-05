import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Rank from "../views/Rank.vue";
import Plugins from "../views/Plugins.vue";
// import DBM from "../views/DBM.vue";
// import Store from "../views/Store.vue";
// import Query from "../views/Query.vue";

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "plugins", path: "/plugins/:subtype", component: Plugins },
    // { name: "dbm", path: "/dbm", component: DBM },
    // { name: "store", path: "/store", component: Store },
    { name: "rank", path: "/rank", component: Rank },
    // { name: "query", path: "/query", component: Query },
];

const router = new VueRouter({
    routes,
});

export default router;
