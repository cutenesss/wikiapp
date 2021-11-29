import { getFileName } from "@configs/functions"
import {
  IBodyLogin,
  IBodyRegiter,
  IBodyUploadFile,
  IResponeSuccessBase,
  IResponseLogin,
  IResponseRegister,
  IResponseUploadFile,
  IUserInformation,
} from "@types"
import { getData, postData, postFormData } from "../helpers"
import URL from "../url"

export const register = (body: IBodyRegiter) =>
  postData<IBodyRegiter, Array<IResponseRegister>>({
    endpoint: URL.REGISTER,
    params: body,
  }).then((res) => res)

export const login = (body: IBodyLogin) =>
  postData<IBodyLogin, { data: Array<IResponseLogin>; status: number }>({
    endpoint: URL.LOGIN,
    params: body,
  }).then((res) => res)

export const logout = () =>
  postData<IBodyLogin, IResponeSuccessBase>({
    endpoint: URL.LOGOUT,
  }).then((res) => res)

export const getMyProfile = () =>
  getData<null, IUserInformation>({
    endpoint: URL.GET_MY_PROFILE,
  }).then((res) => res)

export const uploadImage = async (imagefile: IBodyUploadFile, isPublic: boolean) => {
  const formUpdate = new FormData()
  formUpdate.append("public", isPublic)
  formUpdate.append("file", imagefile)
  formUpdate.append("filename", getFileName(imagefile.name))
  return await postFormData<unknown, IResponseUploadFile>({
    endpoint: URL.UPLOADE_IMAGE_SINGLE,
    params: formUpdate,
  })
}

export const getSetting = (key: string) =>
  getData<{ key: string }, IUserInformation>({
    endpoint: `${URL.SETTING}${key}`,
  }).then((res) => res)
