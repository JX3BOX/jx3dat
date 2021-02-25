import { $server } from "@jx3box/jx3box-common/js/axios";

function hasFeed() {
    return $server.get(`server/jx3dat/feed/has`);
}

export { hasFeed };
