const ROOT = "https://apidevmamnon.aisenote.com/"
const ROOT_API = ROOT
const URL = {
  ROOT_API,
  REGISTER: "/user/register",
  LOGIN: "/auth/login/mobile",
  LOGOUT: "/auth/logout/mobile",
  GET_MY_PROFILE: "/user/me",
  SETTING: "/setting/",

  UPLOADE_IMAGE_SINGLE: "/file/image/single",

  // lop
  DETAIL_LOP: "/don-vi/",

  // diem danh
  LIST_STUDENT_ATTENDANCE: "/diem-danh/lop",
  HISTORY_STUDENT_ATTENDANCE: "/diem-danh/my/pageable",
  LIST_STUDENT_ATTENDANCE_LATE: "/diem-danh/pageable/diem-danh-muon/",
  POST_ATTENDANCE: "/diem-danh/many",
  CURRENT_STUDENT_STATUS: "/diem-danh/my",
  POST_ATTENDANCE_STUDENT: "/diem-danh",

  // xin nghi hoc
  XIN_NGHI_HOC: "/xin-nghi-hoc",
  LICH_SU_XIN_NGHI_HOC: "/xin-nghi-hoc/pageable/my",

  // xin nghi hoc
  DIEM_DANH_DI_LAM: "/cham-cong",
  LICH_SU_DIEM_DANH_DI_LAM: "/cham-cong/pageable/giao-vien/my",

  // xem luong
  BANG_LUONG: "/luong-thang/pageable/giao-vien/my",
}
export default URL
