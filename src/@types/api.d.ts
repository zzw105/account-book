// /register
export interface resType {
  code: number
  message: string
}
//  /login
export interface resLoginType extends resType {
  token: string
}
