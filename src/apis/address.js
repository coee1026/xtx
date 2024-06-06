import request from '@/utils/request'

// 获取地址
export const getAddressApi = () => {
  return request({
    url: '/member/address'
  })
}

//
export const changeAddressApi = (id, data) => {
  // console.log(id)
  return request({
    url: `/member/address/${id}`,
    method: 'PUT',
    data
  })
}
//
export const addAddressApi = (data) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data
  })
}
//
export const deleteAddressApi = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'DELETE'
  })
}
