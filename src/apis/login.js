import request from '@/utils/request'
// 用密码登录
export const loginPasApi = (data) => {
  return request.post('/login', data)
}
// 获取验证码
export const getCodeApi = (mobile) => {
  return request({
    url: '/login/code',
    params: { mobile }
  })
}
// 短信验证码登录
export const loginCodeApi = (data) => {
  return request.post('/login/code', data)
}
