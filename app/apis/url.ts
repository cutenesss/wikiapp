import env from "../env"

const ROOT_API = env.serverURL
const URL = {
  ROOT_API,
  INIT: "resident/checkandinit",
  REGISTER: "resident/user/register",
  LOGIN: "resident/residentlogin",
  LOGOUT: "resident/logout",
  GET_MY_PROFILE: "/resident/getresidentprofile",
  AUTHORITY: "resident/get_local_author_info",

  GET_AREA: "/area/getsubarea",
  UPLOADE_IMAGE_SINGLE: "/file/image/single",

  LOCAL_AREA_NEWS: "resident/residentrefresh",
  BOOKMARK_NEWS: "message/createbookmark",
}
export default URL
