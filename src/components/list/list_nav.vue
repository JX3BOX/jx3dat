<template>
    <div class="m-list-nav m-jx3dat-list-nav">
        <h5 class="u-title">配置数据</h5>
        <div class="m-nav-group">
            <router-link to="/userdata">
                <img src="../../assets/img/nav/userdata.svg" />
                <span>用户配置数据</span>
            </router-link>
        </div>

        <h5 class="u-title">插件数据</h5>
        <div class="m-nav-group">
            <router-link v-for="(label, key) in jx3dat_types" :key="label" :to="{ name: 'plugins', query: { subtype: key } }" :class="{ on: isActive(key) }">
                <img :src="getIcon(key)" />
                <span>{{ label }}</span>
            </router-link>
        </div>

        <!-- <a class="m-nav-dbm" href="/dbm" target="_blank">
            <img svg-inline src="../../assets/img/jx3datbuilder.svg" />
            <b>在线数据构建器</b>
            <span>DBM Data Builder</span>
        </a>-->
    </div>
</template>

<script>
import { jx3dat_types } from "@/assets/data/types.json";
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            jx3dat_types,
        };
    },
    computed: {
    },
    methods: {
        getIcon: function(subtype) {
            return require(`../../assets/img/nav/${subtype}.svg`);
        },
        isActive : function (key){
            if(this.$route.name == 'plugins'){
                if(this.$route.query.subtype){
                    return key == this.$route.query.subtype
                }else{
                    return key == 1
                }
                
            }
            return false
        }
    },
};
</script>

<style lang="less">
@import "../../assets/css/nav.less";
</style>
