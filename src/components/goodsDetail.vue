<script setup>
defineProps({
  picture: String,
  name: String,
  attrsText: String
})
</script>
<template>
  <div class="detail">
    <img :src="picture" alt="" />
    <div class="name">
      <p>{{ name }}</p>
      <p>{{ attrsText }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detail {
  width: 480px;
  font-size: 14px;
  font-weight: 400;
  // text-align: center;
  // line-height: 80px;
  display: flex;
  // background-color: skyblue;
  img {
    width: 80px;
    height: 80px;
  }
  .name {
    margin-left: 12px;
    padding: 16px 8px 8px 12px;
    // font-size: 14px;
    p {
      &:nth-child(1) {
        color: #000;
        font-size: 14px;
      }
      // height: 14px;
      line-height: 20px;
      font-size: 12px;
      color: #bababa;
    }
  }
}
</style>
