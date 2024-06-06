<script setup>
import logo from '@/assets/logo.png'
import { useCateStore } from '@/stores/category'
import topCom from '@/components/topCom.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
const router = useRouter()
const cartStore = useCartStore()
const cateStore = useCateStore()
const route = useRoute()
cartStore.getCartList()
const total = computed(() => {
  return cartStore.cartList.reduce((sum, item) => sum + item.count, 0)
})
const price = computed(() => {
  return cartStore.cartList.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  )
})
</script>
<template>
  <topCom />
  <div class="header">
    <div class="left"><img :src="logo" alt="" /></div>
    <div class="tab">
      <ul>
        <li><RouterLink to="/home">首页</RouterLink></li>
        <li
          v-for="item in cateStore.cateList"
          :key="item.id"
          :class="{ active: item.id === route.params.id }"
        >
          <RouterLink :to="`/category/${item.id}`">{{ item.name }} </RouterLink>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="ipt">
        <i @click="router.push('/cart')" class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜一搜" />
      </div>

      <el-popover
        placement="bottom"
        title="购物车"
        :width="320"
        trigger="hover"
      >
        <template #reference>
          <i class="iconfont icon-gouwuche"></i>
        </template>
        <!-- 组件 -->
        <template #default>
          <div
            v-for="item in cartStore.cartList"
            :key="item.id"
            class="goods"
            style="
              width: 300px;
              height: 72px;
              display: flex;
              margin-bottom: 20px;
            "
          >
            <div class="left" style="height: 72px; width: 72px">
              <img
                style="width: 100%; height: 100%"
                :src="item.picture"
                alt=""
              />
            </div>
            <div class="middle" style="padding: 8px 8px; flex: 1">
              <h4
                style="
                  font-size: 12px;
                  font-weight: 400;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  margin-bottom: 8px;
                "
              >
                {{ item.name }}
              </h4>
              <p
                style="
                  font-size: 8px;
                  color: #b6b6b6;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 1;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                "
              >
                {{ item.attrsText }}
              </p>
            </div>
            <div
              class="right"
              style="
                width: 88px;
                text-align: center;
                display: flex;
                padding-top: 10px;
              "
            >
              <div>
                <div
                  class="price"
                  style="color: red; font-size: 12px; margin: 4px 0 6px 6px"
                >
                  <span style="font-size: 14px">￥</span>109.99
                </div>
                <div class="num" style="color: #a9a9a9; font-size: 10px">
                  <span style="font-size: 12px">x</span> {{ item.count }}
                </div>
              </div>
              <div
                style="
                  font-size: 16px;
                  flex: 1;
                  text-align: center;
                  margin-top: 10px;
                "
              >
                <a href="#">x</a>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between">
            <div>
              <p style="font-size: 12px; color: #b1b1b1">共{{ total }}件商品</p>
              <p style="color: red; font-size: 12px">
                <span style="font-size: 14px">￥</span>{{ price }}
              </p>
            </div>
            <el-button @click="router.push('/cart')" size="small" type="primary"
              >前往购物车</el-button
            >
          </div>
        </template>
      </el-popover>
      <i class="count">{{ total }}</i>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  // width: 100%;
  height: 120px;
  padding: 0 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 240px;
    height: 96px;
    // transform: translateY(1px);
    img {
      width: 100%;
    }
    // background-image: url(logo);
    // background-repeat: no-repeat;
    // background-size: contain;
  }
  .tab {
    // width: 600px;
    flex: 1;
    ul {
      display: flex;
      li {
        font-size: 14px;
        width: 28px;
        height: 50px;
        line-height: 50px;
        margin-right: 60px;
        &:nth-child(1) {
          margin-left: 60px;
        }
        &:hover {
          color: #27ba9b;
          border-bottom: #27ba9b solid 2px;
        }
      }
      .active {
        color: #27ba9b;
        border-bottom: #27ba9b solid 2px;
      }
    }
  }
  .right {
    height: 30px;
    width: 180px;
    display: flex;
    // background-color: pink;
    .ipt {
      height: 24px;
      width: 128px;
      // background-color: pink;
      border-radius: 12px;
      border-bottom: #e7e7e7 1px solid;
      border-left: #e7e7e7 2px solid;
      border-right: #e7e7e7 2px solid;
      box-shadow: 0px 1px rgba(0, 0, 0, 0.2);
      display: flex;
      input {
        height: 100%;
        outline: none;
        width: 100%;
        border: 0;
      }
    }
    .iconfont {
      font-size: 20px;
      line-height: 30px;
      margin: 0 6px;
      transform: translateY(-2px);
    }
    .icon-sousuo {
      margin-left: 4px;
    }
    .icon-gouwuche {
      font-size: 24px;
    }
    position: relative;
    .count {
      display: block;
      width: 20px;
      height: 14px;
      font-size: 12px;
      line-height: 14px;
      border-radius: 7px;
      background-color: orange;
      position: absolute;
      right: -4px;
      top: 0;
      text-align: center;
    }
  }
}
</style>
