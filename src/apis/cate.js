import request from '@/utils/request'
//
export const getCateDataApi = (id) => {
  return request({
    url: '/category',
    params: { id }
  })
}

// 二级分类
export const getSubCategoryApi = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}

// 二级分类面包屑
export const getCategoryFilterApi = (id) => {
  return request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
