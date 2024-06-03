import request from '@/utils/request'
// 获取首页的分类及其详情
export const getCateApi = () => {
  return request.get('/home/category/head')
}
// 获取轮播图数据 1为首页，2为分类商品页 默认位1
export const getBannerApi = (distributionSite = 1) => {
  return request({
    url: '/home/banner',
    params: { distributionSite }
  })
}
// 获取新鲜好物区域的数据
export const getNewApi = () => {
  return request.get('/home/new')
}
// 获取人气推荐区域的数据
export const getComApi = () => {
  return request.get('/home/hot')
}
