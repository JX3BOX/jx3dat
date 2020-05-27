import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        mode : '',
        subtype : '',

        pid : 0,
        post : {},
        meta : {},
        setting : {},
        author : {},
        status : false
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
