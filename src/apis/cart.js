import request from '@/utils/request'
// 加入购物车
export const addCartApi = (skuId, count) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: { skuId, count }
  })
}
// 获取购物车列表
export const getCartListApi = () => {
  return request.get('/member/cart')
}
// 修改商品数量
export const changeCountApi = (id, data) => {
  return request({
    url: `/member/cart/${id}`,
    method: 'PUT',
    data
  })
}

// 全选
export const allSelectApi = (data) => {
  return request({
    url: '/member/cart/selected',
    method: 'PUT',
    data
  })
}
// 删除
export const deleteApi = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
