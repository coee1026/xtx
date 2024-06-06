import request from '@/utils/request'
// 生成订单
export const getOrderApi = () => {
  return request({
    url: '/member/order/pre'
  })
}
// 提交订单
export const commitOrderApi = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
// 去支付
// export const goAlpay = (orderId, redirect) => {
//   return request({
//     url: '/pay/aliPay',
//     params: { orderId, redirect }
//   })
// }
