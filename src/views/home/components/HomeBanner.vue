<script setup>
import { ref } from 'vue'
import { useCateStore } from '@/stores/category.js'
import { getBannerApi } from '@/apis/home'
const cateStore = useCateStore()
cateStore.getCateList()
// 轮播图数据
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerApi()
  bannerList.value = res.data.result
}
getBanner()
const onCate = (id) => {
  console.log(id)
}
</script>
<template>
  <div class="home">
    <div class="banner">
      <div class="carousel">
        <el-carousel height="450px" motion-blur>
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul>
        <li
          v-for="item in cateStore.cateList"
          :key="item.id"
          @click="onCate(item.id)"
        >
          <a href="#">
            <div class="img"><img :src="item.picture" alt="" /></div>
            <h4>
              {{ item.name }}
            </h4>
            <p v-for="i in item.children.splice(0, 2)" :key="i.id">
              {{ i.name }}
            </p></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  padding: 0 220px;
  .banner {
    background-color: #f5f5f5;
    height: 450px;
    width: 100%;
    position: relative;
    ul {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(50% 50%);
      height: 100%;
      width: 200px;
    }
    li a {
      width: 200px;
      height: 50px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      line-height: 50px;
      padding-left: 8px;
      font-size: 18px;
      color: #fff;
      font-weight: 400;
      display: flex;
      &:hover {
        background-color: #27ba9b;
      }
      .img {
        margin-top: 10px;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        img {
          width: 100%;
        }
      }
      h4 {
        font-size: 14px;
        font-weight: 400;
        margin-right: 8px;
      }
      p {
        font-size: 10px;
        margin-right: 5px;
      }
    }
    .carousel {
      width: 100%;
      height: 450px;
      // background-color: skyblue;
    }
  }
}
</style>
