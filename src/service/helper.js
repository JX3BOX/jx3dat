import { $helper } from "@jx3box/jx3box-common/js/https";
import axios from "axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

function getFrames() {
    return axios.get(__imgPath + "data/user_avatar_frame.json");
}

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getLinks() {
    return $helper().get("api/menu_group/jx3dat-links");
}

export { getCollection, getLinks, getFrames };
