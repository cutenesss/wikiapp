/* eslint-disable camelcase */
import { getFileName } from "@configs/functions"
import {
  IBodyLogin,
  IBodyRegiter,
  IBodyUploadFile,
  IAuthorityBody,
  IResponseLogin,
  IResponseRegister,
  IResponseUploadFile,
  IUserInformation,
  IBodyInit,
  IResponseInit,
  IResponseNewsInLocalArea,
  IResponseBookmarkNews,
  IResponseArea,
} from "@types"
import { postData, postFormData } from "../helpers"
import URL from "../url"

export const checkAndInit = (body: IBodyInit) =>
  postData<IBodyInit, { data: IResponseInit }>({
    endpoint: URL.INIT,
    params: body,
  }).then((res) => res.data)

export const register = (body: IBodyRegiter) =>
  postData<IBodyRegiter, IResponseRegister>({
    endpoint: URL.REGISTER,
    params: body,
  }).then((res) => res.data)

export const login = (body: IBodyLogin) =>
  postData<IBodyLogin, IResponseLogin>({
    endpoint: URL.LOGIN,
    params: body,
  }).then((res) => res.data)

export const logout = (body: IBodyLogin) =>
  postData<IBodyLogin, IResponseLogin>({
    endpoint: URL.LOGOUT,
    params: body,
  }).then((res) => res.data)

export const getAuthorityInfo = (body: IAuthorityBody) =>
  postData<IAuthorityBody, IResponseInit>({
    endpoint: URL.AUTHORITY,
    params: body,
  }).then((res) => res.data)

export const getNewsInLocalArea = (body: IBodyInit) =>
  postData<IBodyInit, IResponseNewsInLocalArea>({
    endpoint: URL.LOCAL_AREA_NEWS,
    params: body,
  }).then((res) => res.data)

export const postBookmarkNews = (body: IBodyInit) =>
  postData<IBodyInit, IResponseBookmarkNews>({
    endpoint: URL.BOOKMARK_NEWS,
    params: body,
  }).then((res) => res.data)

export const getSubArea = (id: string) =>
  postData<{ parent_id: string }, IResponseArea>({
    endpoint: URL.GET_AREA,
    params: { parent_id: id },
  }).then((res) => res.data)

export const getMyProfile = (body: IBodyInit) =>
  postData<IBodyInit, IUserInformation>({
    endpoint: URL.GET_MY_PROFILE,
    params: body,
  }).then((res) => res.data)

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
