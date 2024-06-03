<script setup>
const props = defineProps({ title: String, content: String, isNew: Boolean })
import HomeGood from './HomeGood.vue'
import { getNewApi, getComApi } from '@/apis/home'
import { ref } from 'vue'
const goodsList = ref([])

const getnewList = async () => {
  if (props.isNew) {
    const res = await getNewApi()
    goodsList.value = res.data.result
  } else {
    const res = await getComApi()
    goodsList.value = res.data.result
  }
}
getnewList()
</script>
<template>
  <div class="box">
    <div class="head">
      <div class="left">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
      <div class="right">
        <a href="#">
          <p>查看更多</p>
          <i class="iconfont icon-you"></i
        ></a>
      </div>
    </div>
    <div class="goods">
      <ul>
        <li v-for="item in goodsList" :key="item.id">
          <HomeGood
            bgc="#f0f9f4"
            :name="item.name"
            :price="item.price"
            :pic="item.picture"
            :content="item.alt"
            :title="item.title"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  height: 520px;
  padding: 0 220px;
  padding-top: 50px;

  .head {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-bottom: 36px;
    .left {
      display: flex;
      h2 {
        margin-right: 32px;
        font-size: 30px;
        font-weight: 500;
      }
      p {
        font-size: 16px;
        color: #9f9f9f;
      }
    }
    .right a {
      display: flex;
      color: #9f9f9f;
      font-size: 14px;
      .iconfont {
        font-size: 12px;
      }
    }
  }
  .goods {
    ul {
      display: flex;
      li {
        width: 304px;
        margin-right: 8px;
      }
    }
  }
}
</style>
