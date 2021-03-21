import axios from "axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";

function hasFeed() {
    return axios.get(__server + `server/jx3dat/feed/has`);
}

export { hasFeed };
