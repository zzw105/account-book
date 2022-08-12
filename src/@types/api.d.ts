export interface accountProps {
  id: number
  userName: string
  dateTime: string
  price: number
  leaveOne: string
  leaveTwo: string
  remarkText: string
}
// /register
export interface resType {
  code: number
  message: string
}
//  /login
export interface resLoginType extends resType {
  token: string
}
//  /getAccount
export interface resGetAccountType extends resType {
  data: accountProps[]
}
