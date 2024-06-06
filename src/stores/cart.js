import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCartListApi } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const getCartList = async () => {
      const res = await getCartListApi()
      cartList.value = res.data.result
    }
    return { cartList, getCartList }
  },
  { persist: true }
)
