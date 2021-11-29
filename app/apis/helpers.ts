import APISauce, { ApiResponse } from "apisauce"
import { ErrorCode } from "./errorType"
import { handleErrorApi } from "./handleError"
import URL from "./url"
import { popupOk } from "@configs/functions"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"
import { getActiveRouteState, reset } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"

export type IRequest<P> = {
  endpoint: string
  params?: P
  showToast?: boolean
}

export type IResponse<R> = ApiResponse<R & ErrorCode> & {
  showToast?: boolean
}

export const rootServerInstance = APISauce.create({
  baseURL: URL.ROOT_API,
})

rootServerInstance.axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response intercep", response)
    return response
  },
  (error) => {
    if (
      error.toString() === "Error: Request failed with status code 401" &&
      getActiveRouteState() !== ScreenName.Login &&
      getActiveRouteState() !== ScreenName.Launching
    ) {
      AsyncStorageUtils.remove(AsyncStorageUtils.KEY.USER_DATA)
      AsyncStorageUtils.remove(AsyncStorageUtils.KEY.PASSWORD)
      popupOk("Thông báo", "Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại!", () =>
        reset(ScreenName.Login),
      )
    }
    return Promise.reject(error)
  },
)

const formdataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
}

export async function getData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .get<R & ErrorCode>(request.endpoint, request.params)
    .then((response) => {
      return handleErrorApi<R & ErrorCode>(response, request.showToast)
    })
}
export async function postData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .post<R & ErrorCode>(request.endpoint, request.params)
    .then((response) => {
      return handleErrorApi<R & ErrorCode>(response, request.showToast)
    })
}
export async function putData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .put<R & ErrorCode>(request.endpoint, request.params)
    .then((response) => {
      return handleErrorApi<R & ErrorCode>(response, request.showToast)
    })
}
export async function delData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .delete<R & ErrorCode>(request.endpoint, request.params)
    .then((response) => {
      return handleErrorApi<R & ErrorCode>(response, request.showToast)
    })
}

export async function postFormData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .post<R & ErrorCode>(request.endpoint, request.params, formdataConfig)
    .then((response) => {
      return handleErrorApi<R & ErrorCode>(response, request.showToast)
    })
}
