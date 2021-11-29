import URL from "../url"
import { getData, postData } from "../helpers"
import {
  BodyPostAttendance,
  BodyGetPageable,
  BodyXinNghiHoc,
  IResponseHistoryAbsent,
  BodyHistoryAttendance,
  IResponseListStudentAttendance,
  IBodyTime,
} from "@types"

export const getHistoryAttendance = (body: BodyHistoryAttendance) =>
  getData<BodyHistoryAttendance, { data: IResponseListStudentAttendance }>({
    endpoint: `${URL.HISTORY_STUDENT_ATTENDANCE}`,
    params: body,
  }).then((res) => res.data)

export const postStudentAttendanceClass = (body: BodyPostAttendance) =>
  postData<BodyPostAttendance, any>({
    endpoint: `${URL.POST_ATTENDANCE_STUDENT}`,
    params: body,
  }).then((res) => res.data)

export const postStudentAbsent = (body: BodyXinNghiHoc) =>
  postData<BodyXinNghiHoc, any>({
    endpoint: `${URL.XIN_NGHI_HOC}`,
    params: body,
  }).then((res) => res.data)

export const getHistoryAbsent = (body: BodyGetPageable) =>
  getData<BodyGetPageable, { data: IResponseHistoryAbsent }>({
    endpoint: `${URL.LICH_SU_XIN_NGHI_HOC}`,
    params: body,
  }).then((res) => res.data)

export const getCurrentStudentStatus = (body: IBodyTime) =>
  getData<IBodyTime, { data: BodyPostAttendance }>({
    endpoint: `${URL.CURRENT_STUDENT_STATUS}`,
    params: body,
  }).then((res) => res.data)
