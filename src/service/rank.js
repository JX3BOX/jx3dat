import axios from "axios";
import { __hub } from "@jx3box/jx3box-common/js/jx3box.json";
const statAPI = __hub + "api/plugins/jx3dat/rank";   //TODO:
// const statAPI = "/api/plugins/jx3dat/rank";
// const searchAPI = "https://dbm.j3cx.com/api/plugins/jx3dat/rank";
const searchAPI = "/api/plugins/jx3dat/rank";
import failCallback from "../utils/fail";
// https://pull.j3cx.com/api/plugins/jx3dat/rank?pageSize=20

function getRank(limit=10,vm) {
    return axios
        .get(statAPI,{
            params : {
                pageSize : limit
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            failCallback(err, vm);
        });
}

function searchFeed(query,vm) {
    return axios
        .get(searchAPI, {
            params: {
                search: query,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            failCallback(err, vm);
        });
}

export { getRank, searchFeed };
