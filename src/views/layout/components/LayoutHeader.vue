<script setup>
import logo from '@/assets/logo.png'
import { useCateStore } from '@/stores/category'
import topCom from '@/components/topCom.vue'
const cateStore = useCateStore()
const onCate = (id) => {
  console.log(id)
}
</script>
<template>
  <topCom />
  <div class="header">
    <div class="left"><img :src="logo" alt="" /></div>
    <div class="tab">
      <ul>
        <li
          v-for="item in cateStore.cateList"
          :key="item.id"
          @click="onCate(item.id)"
        >
          <RouterLink to="/home" />{{ item.name }}
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="ipt">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <i class="iconfont icon-gouwuche"></i>
      <i class="count">0</i>
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
        width: 32px;
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
