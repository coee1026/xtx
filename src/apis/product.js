import request from '@/utils/request'
// 获取商品详情
export const getProductApi = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}
