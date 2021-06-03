<template>
    <div class="m-lanren-box">
        <listbox 
            :data="data"
            :total="total" 
            :pages="pages" 
            :per="per" 
            :page="page" 
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <!-- 搜索 -->
            <div class="m-archive-search m-jx3dat-search" slot="search-before">
                <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary"
                    v-if="!isLogin || !hasFeed"
                >+ 创建订阅</a>
                <a :href="myFeed" class="u-publish el-button el-button--primary" v-else>
                    <i class="el-icon-setting"></i> 我的数据
                </a>
                <el-input class="m-jx3dat-input" placeholder="请输入关键词" v-model="search">
                    <template slot="prepend">订阅号</template>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 过滤 -->
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 语言过滤 -->
                <menuBy @filter="filter" :data="langs" type="lang" placeholder="语言"></menuBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import {
    authorLink,
    getThumbnail,
    buildTarget,
    publishLink,
    getAppType,
} from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: 'Lanren',
    props: [],
    components: {
        listbox
    },
    data: function () {
        return {
            loading: false,

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 20, //每页条目

            appendMode: false, // 追加模式

            order: "update", //排序
            mark: "", //角标
            lang: "", //语言
            client: this.$store.state.client, //版本选择

            langs: {
                cn: "简体中文",
                tr: "繁體中文",
            },

            search: '',
            subtype: 'lanren',
            hasFeed: false,
            isLogin: User.isLogin(),
        }
    },
    computed: {
        publish_link() {
            return publishLink("jx3dat");
        },
        myFeed: function () {
            return "/publish/#/cms/jx3dat";
        },
    },
    methods: {
        appendPage() {},
        changePage() {},
        filter: function (o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
}
</script>