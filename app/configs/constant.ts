export const INPUT_TYPE = {
  TEXT_INPUT: 1,
  PICKER: 2,
  DATE_PICKER: 3,
}

export const defaultBody = {
  page: 1,
  limit: 15,
}

export const VERIFY_EMAIL_ERROR = {
  BAD_REQUEST_CODE_EXISTS: "BAD_REQUEST_CODE_EXISTS",
  BAD_REQUEST_EMAIL_VERIFIED: "BAD_REQUEST_EMAIL_VERIFIED",
}

export const THU_TRONG_TUAN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const DAY_BY_MILLISECONDS = 60 * 60 * 24 * 1000

export const THU_TRONG_TUAN_NUMBER = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
}
export const normalChar = /[a-zA-Z0-9]/

export const LOAI_DIEM_DANH = {
  DAU_GIO: 0,
  LAI: 1,
  CUOI_GIO: 2,
  MUON: 3,
  NGOAI_GIO: -1,
}

export const TRANG_THAI_DIEM_DANH = {
  XIN_NGHI_HOC: "Xin nghỉ học",
  KHONG_DI_HOC: "Không đi học",
  DA_DI_HOC: "Đã đi học",
  DA_DON_CON: "Đã đón con",
}

export const THANG_TRONG_NAM = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]
export const DS_NAM = ["2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028"]
