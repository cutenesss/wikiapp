import { TypeProfile } from "@types"

export interface BodyAttendance {
  ngay: number
  thang: number
  nam: number
  page: number
  limit: number
  cond?: any
}

export interface BodyHistoryAttendance {
  sort: any
  page: number
  limit: number
}

export interface BodyPostAttendance {
  conId: string
  phuHuynhId: string
  donViId: string
  trangThai: string
}

export interface BodyXinNghiHoc {
  thoiGianXinNghi: string
  lyDo: string
}

export interface BodyDiemDanhDiLam {
  thoiGianChamCong: string
  lat: number
  long: number
}

export interface ClassBody {
  danhSachCTDTId: Array<string>
  ancestors: Array<string>
  _id: string
  tenDonVi: string
  chuongTrinhDaoTaoId: string
  loaiDonVi: string
  id: string
  parent: string
  doTuoi: number
  sySo: number
  truong: TruongThoiGianDiemDanhBody
}

export interface TruongThoiGianDiemDanhBody {
  _id: string
  diemDanhMuon: TimeStartEndType
  diemDanhLai: TimeStartEndType
  diemDanhDauGio: TimeStartEndType
  diemDanhCuoiGio: TimeStartEndType
}

export interface TimeStartEndType {
  gioBatDau: string
  gioKetThuc: string
}

export interface IResponseListStudentAttendance {
  total: number
  result: Array<Student>
}

export interface IResponseHistoryAbsent {
  total: number
  result: Array<DonXinNghi>
}

export interface IResponseSalary {
  total: number
  result: Array<Salary>
}

export interface Salary {
  userId: string
  donViId: string
  hoTen: string
  soDienThoai: string
  chucVu: string
  ngayCongThucTe: number
  ngayCongQuyDinh: number
  luongThoaThuan: number
  thuongThang: number
  phuCap: number
  luongDongBaoHiem: number
  tienDongBHCuaGV: number
  tienDongBHCuaTruong: number
  luongThucTe: number
  thang: number
  nam: number
}

export interface DonXinNghi {
  thoiGianXinNghi: string
  lyDo: string
}

export interface Student {
  id: string
  phuHuynhId: string
  _id: string
  conId: string
  trangThai: string
  thoiGianDiemDanh?: string
  donViId: string
  donVi: {
    tenDonVi: string
    id?: string
  }
  phuHuynh: {
    _id: string
    profile: TypeProfile
  }
  con: {
    _id: string
    id: string
    hoTen: string
    userId: string
    donViId: string
    ngaySinh: number
    thangSinh: number
    namSinh: number
  }
}
