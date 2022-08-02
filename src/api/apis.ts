import request from './request'

export default {
  login(data: any) {
    return request.post('/login', data)
  },
  register(data: any) {
    return request.post('/register', data)
  }
}
