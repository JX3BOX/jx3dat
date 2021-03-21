import axios from "axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

function getFrames() {
    return axios.get(__imgPath + "data/user_avatar_frame.json")
}

export { getFrames };
