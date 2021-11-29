import URL from "../url"
import { getData, postData } from "../helpers"
import {
  BodyAttendance,
  BodyPostAttendance,
  ClassBody,
  IResponseListStudentAttendance,
  BodyGetPageable,
  IResponseHistoryAbsent,
  BodyDiemDanhDiLam,
  IResponseSalary,
} from "@types"

export const getDetailInfoClass = (id: string) =>
  getData<null, { data: ClassBody }>({
    endpoint: `${URL.DETAIL_LOP}${id}`,
  }).then((res) => res.data)

export const getListAttendanceClass = (body: BodyAttendance, id: string) =>
  getData<BodyAttendance, { data: IResponseListStudentAttendance }>({
    endpoint: `${URL.LIST_STUDENT_ATTENDANCE}/${id}`,
    params: body,
  }).then((res) => res.data)

export const getListAttendanceClassLate = (body: BodyAttendance, id: string) =>
  getData<BodyAttendance, { data: IResponseListStudentAttendance }>({
    endpoint: `${URL.LIST_STUDENT_ATTENDANCE_LATE}/${id}`,
    params: body,
  }).then((res) => res.data)

export const postListAttendanceClass = (body: Array<BodyPostAttendance>) =>
  postData<Array<BodyPostAttendance>, any>({
    endpoint: `${URL.POST_ATTENDANCE}`,
    params: body,
  }).then((res) => res.data)

export const postWorkAttendance = (body: BodyDiemDanhDiLam) =>
  postData<BodyDiemDanhDiLam, any>({
    endpoint: `${URL.DIEM_DANH_DI_LAM}`,
    params: body,
  }).then((res) => res.data)

export const getHistoryWorkAttendance = (body: BodyGetPageable) =>
  getData<BodyGetPageable, { data: IResponseHistoryAbsent }>({
    endpoint: `${URL.LICH_SU_DIEM_DANH_DI_LAM}`,
    params: body,
  }).then((res) => res.data)

export const getHistorySalary = (body: BodyGetPageable) =>
  getData<BodyGetPageable, { data: IResponseSalary; statusCode: number }>({
    endpoint: `${URL.BANG_LUONG}`,
    params: body,
  }).then((res) => res.data)
