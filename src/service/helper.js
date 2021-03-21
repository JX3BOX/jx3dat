import axios from 'axios';
import { __helperUrl } from "@jx3box/jx3box-common/data/jx3box.json";
import {
    installInterceptors,
    installNextInterceptors,
} from "@jx3box/jx3box-common/js/axios";

function getLinks() {
    return axios.get(__helperUrl + "api/menu_group/jx3dat-links");
}

const $http = axios.create({
    withCredentials: true,
    // baseURL: process.env.NODE_ENV === "production" ? __helperUrl : "/",
    baseURL: __helperUrl,
});
installInterceptors($http);

function getCollection($collection_id, params = {}) {
    return $http({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

export { $http, getCollection,getLinks };
