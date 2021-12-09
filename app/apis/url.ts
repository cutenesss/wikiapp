import env from "../env"

const ROOT_API = env.serverURL
const URL = {
  ROOT_API,
  REGISTER: "/user/register",
  LOGIN: "/auth/login/mobile",
  LOGOUT: "/auth/logout/mobile",
  GET_MY_PROFILE: "/user/me",
  SETTING: "/setting/",

  UPLOADE_IMAGE_SINGLE: "/file/image/single",
}
export default URL
