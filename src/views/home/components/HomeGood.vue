<script setup>
defineProps({
  bgc: String,
  name: String,
  price: [Number, String],
  pic: String,
  content: String,
  title: String
})
</script>
<template>
  <div class="goods">
    <div class="img"><img :src="pic" alt="" /></div>
    <div class="txt">
      <h3 v-show="name">{{ name }}</h3>
      <h3 v-show="title">{{ title }}</h3>
      <p v-show="price"><span>￥</span>{{ price }}</p>
      <p v-show="content" class="content">{{ content }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.goods {
  width: 304px;
  height: 406px;
  background-color: v-bind(bgc);
  .img {
    width: 304px;
    height: 304px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  transition: all 0.5s ease-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
  .txt {
    text-align: center;
    h3 {
      height: 50px;
      line-height: 50px;
      font-weight: 400;
      overflow: hidden;
    }
    p {
      color: red;
      span {
        font-size: 20px;
      }
    }
    .content {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
