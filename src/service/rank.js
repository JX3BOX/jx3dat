import axios from "axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
import failCallback from "../utils/fail";

const API = __next + "api/plugins/";   //TODO:
// const API = "/api/plugins/";

function getRank(limit=10,vm) {
    return axios
        .get(API + 'jx3dat/rank',{
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

function getHistory(uid){
    return axios.get(API + uid + '/dbm/list').then((res) => {
        return res.data
    }).catch((err) => {
        failCallback(err, vm);
    });
}

export { getRank, getHistory };
