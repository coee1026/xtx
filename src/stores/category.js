import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCateApi } from '@/apis/home'

export const useCateStore = defineStore(
  'xxt-cate',
  () => {
    const cateList = ref([])
    const getCateList = async () => {
      const res = await getCateApi()
      cateList.value = res.data.result
    }
    return { cateList, getCateList }
  },
  {
    persist: true
  }
)
