<script setup></script>
<template>
  <div class="user">
    <div class="tab">
      <div class="item">
        <h3>我的账户</h3>
        <RouterLink to="/user/message">个人中心 </RouterLink>
      </div>
      <div class="item">
        <h3>交易管理</h3>
        <RouterLink to="/user/userorder">我的订单 </RouterLink>
      </div>
    </div>
    <div class="right">
      <RouterView />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user {
  background-color: #f3f3f3;
  padding: 30px 220px;
  display: flex;
  justify-content: space-between;
  // height: ;
  .tab {
    background-color: #fff;
    width: 20%;
    height: 600px;
    padding: 40px 40px;
    .item {
      margin-bottom: 40px;
      h3 {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      a {
        font-size: 12px;
        position: relative;
        &:hover {
          color: #2b9f85;
        }
        &.router-link-exact-active {
          color: #2b9f85;
          &::before {
            display: block;
          }
        }
        &::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: #2b9f85;
          position: absolute;
          top: 50%;
          left: -10px;
          transform: translateY(-50%);
          display: none;
        }
      }
      .active {
        color: #2b9f85;
      }
    }
  }
  .right {
    width: 79%;
    background-color: #fff;
  }
}
</style>
