<template>
    <el-tabs class="m-jx3dat-tabs" v-model="tab">
        <el-tab-pane label="最后更新数据" name="index">
            <span slot="label">
                <i class="el-icon-s-promotion"></i>
                <b>最近更新数据</b>
            </span>
        </el-tab-pane>

        <el-tab-pane label="订阅排行榜" name="rank">
            <span slot="label">
                <i class="el-icon-s-data"></i>
                <b>订阅号排行榜</b>
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "tabs",
    data: function() {
        return {
            tab : 'index'
        };
    },
    computed: {
        view : function (){
            return this.$route.name
        }
    },
    watch : {
        view : function (val){
            this.tab = val
        },
        tab : function (val){
            this.$router.push({
                name : val
            })
        }
    },
    methods: {
    },
    mounted: function() {
    },
    components: {},
};
</script>

<style lang="less">
.m-jx3dat-tabs{
    position: sticky;
    top: 112px;
    background-color:#fff;
    .z(100);
    b{
        // font-weight: normal;
        color:@color;
    }

    i{
        .mr(2px);
    }

    .el-tabs__item.is-active{
        b,i{
            color:@primary;
        }
    }

    .el-tabs__item:hover{
        b,i{
            color:@primary;
        }
    }

    em{
        .fz(12px);
        .pr;top:-5px;.ml(3px);
        padding:0 4px;
        .r(2px);
        font-style:normal;
    }
    .u-secret{
        background-color:#c00;
        // color:#f00 !important;
        color:#fff;
    }
    .u-new{
        background-color:#49c10f;
        color:#fff;
    }
    .u-pending{
        background-color:#aaa;
        color:#fff;
    }
    .u-ready{
        background-color:#fba524;
        color:#fff;
    }
    user-select: none;

}

@media screen and (max-width:@phone){
    .m-jx3dat-tabs{
        .none;
    }
}
</style>
