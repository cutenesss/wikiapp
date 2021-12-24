/* eslint-disable camelcase */
export interface IUserInformation {
  code: number
  id: number
  mail: string
  phone: string
  l2_name: string
  l3_name: string
  l1_name?: string
  name: string
  gioiTinh?: string
}

export interface IResponseArea {
  code: number
  subarea_list: Array<ItemArea>
}

export interface ItemArea {
  area_name: string
  area_code: number
  area_id: number
  x: number
  y: number
}

export interface TypeProfile {
  username?: string
  phoneNumber?: string
  fullname?: string
  firstname?: string
  dateOfBirth?: string
  lastname?: string
}
// login
export interface IBodyLogin {
  user_name?: string
  user_password?: string
  token_id?: string
  session_id: string
}

export interface IResponseLogin {
  code: number
  loyalty_id: number
  resident_id: number
  resident_message_list: Array<any>
  resident_survey_list: Array<any>
  session_id: string
  user_name: string
}

export interface IBodyInit {
  session_id: string
  token_id?: string
  device_id: string
  is_login?: number
  message_id?: number
}

export interface IResponseInit {
  session_id: string
  resident_id: number
  is_login: number
  code: number
}

export interface IResponseNewsInLocalArea {
  code: number
  resident_survey_list: Array<ItemSurvey>
  resident_message_list: Array<ItemBodyNews>
}

export interface IResponseBookmarkNews {
  code: number
  is_bookmark: boolean
}

export interface IBodyRegiter {
  user_name: string
  email: string
  mobile: string
  user_password: string
  district_id: string
  province_id: string
  village_id: string
}
export interface IResponseRegister {
  code: number
}

export interface IAuthorityBody {
  l3_name: string
  l2_name: string
  device_id: string
  session_id: string
  lat: string
  lng: string
}

export interface OrgDetail {
  is_showed: number
  org_type: number
  address: string
  telephone: string
  email: string
  url: string
  name: string
  org_type_name: string
}

export interface IAuthorityResponse {
  code: number
  id: number
  org_list: Array<OrgDetail>
  districtservice: string
  hotline: string
  session_id: string
  url: string
  serviceportal: string
  guest_survey_list: Array<ItemSurvey>
  active_status: boolean
  province: string
  cityportal: string
  districtportal: string
  village: string
  district: string
  guest_message_list: Array<ItemBodyNews>
}

export interface ItemBodyNews {
  id: number
  is_read: number
  read_count: number
  total_like: number
  is_violated: number
  created_time: string
  msg_content: string
  from: string
  is_like: boolean
  is_bookmark: boolean
  msg_subject: string
}

export interface ItemSurvey {
  survey_id: number
  qr_id: number
  do_count: number
  view_count: number
  status: number
  created_time: string
  enddate: string
  survey_content: string
  qr_code: string
  startdate: string
  qr_name: string
  survey_name: string
}

export enum ESystemRoles {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
  SuperAdmin = "SuperAdmin",
  GiaoVien = "GiaoVien",
  HieuTruong = "HieuTruong",
  PhuHuynh = "PhuHuynh",
}

export enum EGender {
  Male = "Male",
  FeMail = "FeMail",
}

export interface BodyGetPageable {
  page: number
  limit: number
  cond?: any
}
