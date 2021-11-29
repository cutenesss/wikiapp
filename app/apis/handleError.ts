import Toast from "react-native-root-toast"
import STATUS from "./status"
import { IResponse } from "./helpers"

import { ApiResponse } from "apisauce"
import { ErrorCode } from "./errorType"
import STATUS_CODE from "./errorCode"
import { popupOk } from "@configs/functions"
import { translate } from "@i18n"

type IResponseError = IResponse<unknown> & {
  customMessage?: string
}

export const showMessageError = (responseError: Partial<IResponseError>) => {
  const toast = Toast.show(
    responseError.customMessage || responseError.problem || "Network Error",
    {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    },
  )
  setTimeout(function () {
    Toast.hide(toast)
  }, 1000)
}

function handleData<R>(responseError: IResponse<R>, showToast?, message?): IResponse<R> {
  if (showToast) {
    showMessageError({ ...responseError, customMessage: message })
  }
  return responseError
}

export function handleErrorApi<R>(
  response: ApiResponse<R & ErrorCode>,
  showToast?,
): ApiResponse<R> {
  switch (response.status) {
    case STATUS.FAILED:
      return handleData(response, showToast, "Bad request")
    case STATUS.TOKEN_EXPIRED:
      return handleData(response, showToast, "Token expired")
    case STATUS.FORBIDDEN:
      return handleData(response, showToast, "Forbidden")
    case STATUS.NOT_FOUND:
      return handleData(response, showToast, "Page not found")
    case STATUS.UNAUTHORIZED:
      return handleData(response, showToast, "Unauthorized")
  }
  return handleData<R>(response, showToast)
}

export const checkStatus = (responseStatus, checkingStatus = STATUS.SUCCESS) =>
  responseStatus === checkingStatus

export const handleErrorApiWithStatusCode = (responsecode: string) => {
  switch (responsecode) {
    case "UNAUTHORIZED_USERNAME_NOT_FOUND":
      popupOk(translate("notice_t"), translate("TEN_DANG_NHAP_KHONG_TON_TAI"))
      break
    case "UNAUTHORIZED_WRONG_PASSWORD":
      popupOk(translate("notice_t"), translate("SAI_MAT_KHAU"))
      break
    case "HO_SO_GIAO_VIEN_NOT_FOUND":
      popupOk(translate("notice_t"), translate("HO_SO_GIAO_VIEN_NOT_FOUND"))
      break
    case "DOCUMENT_EXISTS":
      popupOk(translate("notice_t"), translate("DA_DIEM_DANH_ROI"))
      break
    default:
      popupOk(translate("notice_t"), translate("something_wentwrong"))
      break
  }
}
