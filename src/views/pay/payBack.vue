<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const flag = route.query.payResult
const money = route.query.money
</script>
<template>
  <div class="payback" v-if="flag">
    <h1>订单支付成功</h1>
    <p>我们将尽快为您发货，收货期间请保持手机畅通</p>
    <div>支付方式：在线支付</div>
    <div>
      支付金额<i>￥</i><span>{{ money }}</span>
    </div>
    <div class="button">
      <el-button type="primary">查看订单</el-button>
      <el-button @click="router.replace('/')">进入首页</el-button>
    </div>
  </div>
  <div class="payback" v-else>
    <h1>订单支付失败</h1>
    <div class="button">
      <el-button type="warning">查看帮助</el-button>
      <el-button @click="router.replace('/')">进入首页</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.payback {
  padding: 180px 640px;
  text-align: center;

  h1 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  p {
    font-size: 14px;
    color: #b2b2b2;
    margin-bottom: 16px;
  }
  div {
    font-size: 12px;
    margin-bottom: 8px;
    i {
      font-size: 16px;
      color: red;
    }
    span {
      color: red;
    }
  }
  .button {
    margin-top: 30px;
  }
}
</style>
