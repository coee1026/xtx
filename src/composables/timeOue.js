import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { computed, ref } from 'vue'
dayjs.extend(duration)
// time 秒数
export const useTimeOut = () => {
  const time = ref(0)
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分钟ss秒')
  })
  const timeOut = (currentTime) => {
    time.value = currentTime
    setInterval(() => {
      time.value--
    }, 1000)
  }

  return { formatTime, timeOut }
}

// 在.vue文件中使用
// import { useTimeOut } from '@/composables/timeOue'
// const { formatTime, timeOut } = useTimeOut()
// timeOut(1000)
