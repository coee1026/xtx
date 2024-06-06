import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore(
  'xtx-user',
  () => {
    const userInfo = ref({
      account: '',
      mobile: '',
      token: '',
      avatar: '',
      gender: '',
      birthday: '',
      cityCode: '',
      provinceCode: '',
      profession: ''
    })
    // 密码
    const setInfo = async (newUserInfo) => {
      userInfo.value = newUserInfo
    }
    return { userInfo, setInfo }
  },
  {
    persist: true
  }
)
