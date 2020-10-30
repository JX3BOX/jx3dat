import { $next } from "@jx3box/jx3box-common/js/axios";

function getRank(limit = 10, vm) {
    return $next
        .get("api/plugins/jx3dat/rank", {
            params: {
                pageSize: limit,
            },
        })
        .then((res) => {
            return res.data;
        });
}

function getHistory(uid) {
    return $next.get("api/plugins/" + uid + "/dbm/list").then((res) => {
        return res.data;
    });
}

export { getRank, getHistory };
