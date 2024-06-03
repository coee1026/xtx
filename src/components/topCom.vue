<template>
  <div class="top">
    <ul>
      <li><RouterLink to="/login" />请先登录</li>
      <li><RouterLink to="/register" />免费注册</li>
      <li><RouterLink to="/home" />我的订单</li>
      <li><RouterLink to="/home" />会员中心</li>
      <li><RouterLink to="/home" />帮助中心</li>
      <li><RouterLink to="/home" />联系我</li>
      <li><RouterLink to="/home" />关注我</li>
      <li><a href="https://github.com/coee1026">我的博客</a></li>
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
      color: #fff;
      font-size: 13px;
      padding: 0 18px;
      border-left: #999 solid 1px;
      &:nth-child(1) {
        border: 0;
      }
      &:hover {
        color: #27ba9b;
      }
    }
  }
}
</style>
