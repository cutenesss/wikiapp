export interface IUserInformation {
  _id?: string
  username?: string
  profile: TypeProfile
  role: RoleBody
  roles: Array<RoleBody>
  gioiTinh?: string
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
  username: string
  password: string
  deviceId: string
  oneSignalId: string
}

export interface IResponseLogin {
  role: RoleBody
  accessToken: string
}

export interface RoleBody {
  systemRole: string
  listOrgIdAccess: Array<any>
  organizationId: string
  name: string
  expireDate: string
  roleId: string
  organization: {
    tenDonVi: string
    id?: string
  }
}

export interface IBodyRegiter {
  username: string
  password: string
  profile: {
    username: string
    fullname: string
    phoneNumber: string
  }
}
export interface IResponseRegister {
  accessToken: string
  role: Array<IResponseLogin>
}

export interface IResponeSuccessBase {
  success: boolean
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
