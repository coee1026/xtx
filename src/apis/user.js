import request from '@/utils/request'
// 猜你喜欢
export const getLikeApi = (limit = 4) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}
// 获取订单
export const getUserOrderApi = (params) => {
  return request({
    url: '/member/order',
    method: 'GET',
    params
  })
}
