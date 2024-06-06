<script setup>
import { ref } from 'vue'
// defineProps({ imgUrl: Array })
import { getBannerApi } from '@/apis/home'
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerApi(2)
  bannerList.value = res.data.result
}
getBanner()
</script>
<template>
  <!-- <div class="home"> -->
  <div class="banner">
    <div class="carousel">
      <el-carousel height="450px" motion-blur>
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
          <img :src="item.imgUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.banner {
  // padding: 0 220px;
  background-color: #f5f5f5;
  height: 450px;
  width: 100%;
}
</style>
