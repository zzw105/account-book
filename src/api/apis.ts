import { resLoginType, resType } from '@/@types/api'
import request from './request'

export default {
  LOGIN(data: any): Promise<resLoginType> {
    return request.post('/login', data)
  },
  REGISTER(data: any): Promise<resType> {
    return request.post('/register', data)
  }
}
