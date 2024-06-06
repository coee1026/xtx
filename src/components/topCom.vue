<script setup>
import { useUserStore } from '@/stores/login'
const userStore = useUserStore()
const exit = () => {
  userStore.setInfo({
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
}
</script>
<template>
  <div class="top">
    <ul v-if="!userStore.userInfo.token">
      <li><a href="/login">请先登录 </a></li>

      <li><a href="/register">免费注册</a></li>

      <li><a href="https://github.com/coee1026">GitHub</a></li>
    </ul>
    <ul v-else>
      <li>
        <a href="/user">{{ userStore.userInfo.account }} </a>
      </li>
      <li>
        <a href="/login" @click="exit">退出登录</a>
      </li>
      <li><a href="/home">我的订单</a></li>
      <li><a href="/home">会员中心</a></li>
      <li><a href="/home">帮助中心</a></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 50px;
  background-color: #333;
  padding: 0 220px;
  ul {
    transform: translateY(6px);
    display: flex;
    justify-content: end;
    li {
      margin: 10px 0;
      font-size: 13px;
      padding: 0 18px;
      color: #fff;

      border-left: #999 solid 1px;
      &:nth-child(1) {
        border: 0;
      }
      &:hover {
        color: #27ba9b;
      }
      a {
        color: #fff;
      }
    }
  }
}
</style>
