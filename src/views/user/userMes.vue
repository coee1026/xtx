<script setup>
import { useUserStore } from '@/stores/login'
import { onMounted, ref } from 'vue'
import { getLikeApi } from '@/apis/user'
// import eachGoods from '@/components/eachGoods.vue';
const userInfo = ref({
  avatar: '',
  account: ''
})
onMounted(() => {
  const userStore = useUserStore()
  userInfo.value = userStore.userInfo
})
const goodsList = ref([])
const getLike = async () => {
  const res = await getLikeApi()
  // console.log(res.data.result)
  goodsList.value = res.data.result
}
getLike()
</script>
<template>
  <div class="mes">
    <div class="head">
      <div class="left">
        <div class="img"><img :src="userInfo.avatar" alt="" /></div>
        <p>{{ userInfo.account }}</p>
      </div>
      <div class="right">
        <div class="box">
          <a href="#"
            ><div class="iconfont icon-huiyuan"></div>
            <p>会员中心</p></a
          >
        </div>
        <div class="box">
          <a href="#"
            ><div class="iconfont icon-shezhi"></div>
            <p>安全设置</p></a
          >
        </div>
        <div class="box">
          <a href="#"
            ><div class="iconfont icon-dingwei"></div>
            <p>地址管理</p></a
          >
        </div>
      </div>
    </div>
    <div class="body">
      <h4>猜你喜欢</h4>
      <div class="goods">
        <eachGoods v-for="item in goodsList" :key="item.id" :goods="item" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mes {
  .head {
    background-image: url(../../assets/center-bg.png);
    height: 130px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .img {
        margin: 35px 20px 0 50px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        overflow: hidden;
        background-color: pink;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 14px;
        line-height: 130px;
        color: #fff;
      }
    }
    .right {
      display: flex;
      .box {
        margin: 36px 64px 0 0;
        a {
          color: #fff;
          .iconfont {
            font-size: 24px;
            margin-bottom: 16px;
            text-align: center;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
  .body {
    padding: 30px;
    h4 {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .goods {
      padding: 0 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
