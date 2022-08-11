import { resGetAccountType, resLoginType, resType } from '@/@types/api'
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
  GET_ACCOUNT(): Promise<resGetAccountType> {
    return request.get('/getAccount')
  },
  TEST(): Promise<resType> {
    return request.get('/')
  }
}
