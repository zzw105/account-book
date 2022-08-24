export interface accountProps {
  id: number
  userName: string
  dateTime: string
  price: number
  leaveOne: string
  leaveTwo: string
  remarkText: string
  assetId: number
  type: number
}

export interface assetProps {
  id: number
  userName: string
  assetName: string
  assetType: number
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

//  /getAsset
export interface resGetAssetType extends resType {
  data: assetProps[]
}
