import request from './request'

export default {
  login() {
    return request.post('/login')
  }
}
