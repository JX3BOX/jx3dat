<template>
    <div class="m-store">
        <div class="m-store-list" v-if="uid">
            <div class="u-list" v-if="data.length">
                <div class="u-item" v-for="(item,i) in data" :key="i">
                    <a :href="item.download_url" target="_blank"><i class="el-icon-box"></i> {{item.name}}</a>
                </div>
            </div>
            <el-alert v-else title="没有任何上传记录" type="info" show-icon></el-alert>
        </div>
        <el-alert v-else title="请先登录" type="warning" show-icon></el-alert>
    </div>
</template>

<script>
import User from '@jx3box/jx3box-common/js/user'
import { getHistory } from "../service/rank";
export default {
    name: "Store",
    props: [],
    data: function() {
        return {
            uid : 8,    //TODO:
            data : []
        };
    },
    computed: {},
    methods: {
        loadData : function (){
            
        }
    },
    created: function() {
        // this.uid = User.getInfo().uid
        if(this.uid){
            getHistory(this.uid).then((data) => {
                this.data = data
            })
        }
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/store.less";
</style>