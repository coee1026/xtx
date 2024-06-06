<script setup>
import { baseURL } from '@/utils/request'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const money = ref(0)
// const time = ref(1800)
money.value = route.query.price
// 去支付
const redirect = encodeURIComponent('http://localhost:5173/#/paycallback')
const url = `${baseURL}/pay/aliPay?orderId=${route.query.id}&redirect=${redirect}`
</script>
<template>
  <div class="pay">
    <div class="head">
      <div class="left">
        <h3>订单提交成功！请尽快完成支付</h3>
        <p>支付还剩24分30秒，超时后将取消订单</p>
      </div>
      <div class="right">
        <div class="money">
          应付总额：<span>￥</span><i>{{ money }}</i>
        </div>
      </div>
    </div>
    <div class="body">
      <h4>选择以下支付方式付款</h4>
      <div class="zfb">
        <h5>支付平台</h5>
        <div class="big">
          <a href="#">
            <div class="small">微信支付</div>
          </a>
          <a :href="url">
            <div class="small">支付宝</div>
          </a>
        </div>
      </div>
      <div class="method">
        <h5>支付方式</h5>
        <div class="big">
          <a href="#">
            <div class="small">招商银行</div>
          </a>
          <a href="#">
            <div class="small">建设银行</div>
          </a>
          <a href="#">
            <div class="small">农业银行</div>
          </a>
          <a href="#">
            <div class="small">交通银行</div>
          </a>
          <a href="#">
            <div class="small">工商银行</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pay {
  padding: 30px 220px;
  background-color: #f3f3f3;
  .head {
    background-color: #fff;
    height: 120px;
    margin-bottom: 20px;
    padding: 30px 40px 30px 50px;
    display: flex;
    justify-content: space-between;

    .left {
      font-weight: 600;
      h3 {
        font-size: 16px;
        margin: 4px 0 10px;
      }
      p {
        color: #9e9e9e;
        font-size: 12px;
      }
    }
    .right {
      .money {
        font-size: 12px;
        color: #9e9e9e;
        margin-top: 12px;
        span {
          font-size: 16px;
          color: red;
        }
        i {
          color: #000;
        }
      }
    }
  }
  .body {
    padding-left: 24px;
    background-color: #fff;
    padding-bottom: 30px;
    h4 {
      line-height: 68px;
      font-size: 14px;
      font-weight: 500;
      border-bottom: solid #f3f3f3 1px;
    }
    .zfb,
    .method {
      margin-top: 24px;
      h5 {
        font-size: 12px;
        font-weight: 500;
      }
      .big {
        margin-top: 18px;
        display: flex;
        .small {
          margin-right: 20px;
          width: 94px;
          height: 32px;
          // background-color: pink;
          border: 2px solid #f3f3f3;
          font-size: 12px;
          text-align: center;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
