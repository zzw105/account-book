import { resGetAccountType, resLoginType, resType, resGetAssetType } from '@/@types/api'
import request from './request'

export default {
  LOGIN(data: any): Promise<resLoginType> {
    return request.post('/login', data)
  },

  REGISTER(data: any): Promise<resType> {
    return request.post('/register', data)
  },

  ADD_ACCOUNT(data: any): Promise<resType> {
    return request.post('/addAccount', data)
  },

  DEL_ACCOUNT(data: any): Promise<resType> {
    return request.delete('/delAccount', { data })
  },

  GET_ACCOUNT(): Promise<resGetAccountType> {
    return request.get('/getAccount')
  },

  GET_ASSET(): Promise<resGetAssetType> {
    return request.get('/getAsset')
  },

  ADD_ASSET(data: any): Promise<resType> {
    return request.post('/addAsset', data)
  },

  TEST(): Promise<resType> {
    return request.get('/')
  }
}
