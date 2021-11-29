export * from "./UserType"
export * from "./ClassType"
export interface IBodyUploadFile {
  uri: string
  type: string
  name: string
}

export interface IBodyTime {
  ngay: number
  thang: number
  nam: number
}

export interface IResponseUploadFile {
  data: {
    url: string
    file: {
      filename: string
      public: true
      mimetype: string
      path: string
      url: string
    }
  }
}
