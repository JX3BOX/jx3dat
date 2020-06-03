import axios from "axios";
import { __hub } from "@jx3box/jx3box-common/js/jx3box.json";
const rankAPI = __hub + "subscribe";
const statAPI = __hub + "api/plugins/jx3dat/rank";   //TODO:
// const statAPI = "/api/plugins/jx3dat/rank";
import failCallback from "../utils/fail";

// before2 是前面第二天一天的数据
// before3 是前面第三天一天的数据
// 7days是前7天 7天下载总量的数据
// 30day是前30天 30天下载总量的数据

function getRank(vm) {
    return axios
        .get(statAPI)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            failCallback(err, vm);
        });
}

export { getRank };
