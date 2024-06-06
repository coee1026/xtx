<script setup>
defineProps({ goods: Object })
</script>

<template>
  <div class="goods">
    <img v-img-lazy="goods.picture" alt="" />
    <h4>{{ goods.name }}</h4>
    <div class="desc">{{ goods.desc }}</div>
    <div class="price">
      <span>￥</span>{{ goods.price
      }}<i
        style="margin-left: 5px; font-size: 10px; color: #888"
        v-if="goods.orderNum"
        >已售{{ goods.orderNum }}</i
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.goods {
  width: 180px;
  height: 290px;
  text-align: center;
  // background-color: skyblue;
  img {
    width: 180px;
    height: 180px;
  }
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 36px;
    // overflow: hidden;
    font-size: 14px;
    font-weight: 400;
  }
  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 24px;
    // height: 16px;
    // overflow: hidden;
    font-size: 10px;
  }
  .price {
    color: red;
    font-size: 12px;
    span {
      font-size: 16px;
    }
  }
}
</style>
