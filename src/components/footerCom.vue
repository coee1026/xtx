<script setup>
import qrcrode from '@/assets/qrcode.jpg'
</script>
<template>
  <div class="footer">
    <div class="top">
      <ul>
        <li>
          <h3>客户服务</h3>
          <div class="box">
            <div class="left">
              <i class="iconfont icon-kefu"></i>
              <a href="#">在线客服</a>
            </div>
            <div class="right">
              <i class="iconfont icon-fankui"></i>
              <a href="">问题反馈</a>
            </div>
          </div>
        </li>
        <li>
          <h3>关注我们</h3>
          <div class="box">
            <div class="left">
              <i class="iconfont icon-weixin"></i> <a href="#">公众号</a>
            </div>
            <div class="right">
              <i class="iconfont icon-xinlangweibo"></i> <a href="">微博</a>
            </div>
          </div>
        </li>
        <li>
          <h3>下载APP</h3>
          <div class="box">
            <div class="left">
              <img :src="qrcrode" alt="" />
            </div>
            <div class="right">
              <p>扫描二维码立即下载APP</p>
              <el-button type="primary">立即下载</el-button>
            </div>
          </div>
        </li>
        <li>
          <h3>服务热线</h3>
          <h2>400-0000-000</h2>
          <p>周一至周日8:00-18:00</p>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="s">
        <ul>
          <li>价格亲民</li>
          <li>物流快捷</li>
          <li>品质新鲜</li>
        </ul>
      </div>
      <div class="x">
        <div class="sh">
          <ul>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">帮助中心</a></li>
            <li><a href="#">售后服务</a></li>
            <li><a href="#">配送与验收</a></li>
            <li><a href="#">商务合作</a></li>
            <li><a href="#">搜索推荐</a></li>
            <li><a href="#">友情链接</a></li>
          </ul>
        </div>
        <div class="xi">
          <h4>CopyRight @A Lucky Boy 版权所有豫ICP备2021028593号</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  border-top: solid 2px #eeeeee;
  margin: 50px 0;
  .top {
    padding: 0 248px;
    height: 240px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 240px;
        height: 300px;
        // background-color: pink;
        text-align: center;
        h3 {
          font-size: 18px;
          color: #b5b5b5;
          font-weight: 300;
          padding-top: 30px;
          margin-bottom: 50px;
        }
        .box {
          display: flex;
          justify-content: space-around;
          .left,
          .right {
            width: 100px;
            height: 100px;
            // background-color: skyblue;
            border: solid 0.5px #eeeeee;
            padding-top: 12px;
            .iconfont {
              font-size: 40px;
              margin-bottom: 12px;
              display: block;
            }
            a {
              font-size: 16px;
              color: #999999;
            }
          }
        }
        &:nth-child(3) {
          // display: flex;
          .box {
            display: flex;
            justify-content: space-around;
            .left,
            .right {
              width: 100px;
              height: 100px;
              // background-color: skyblue;
              border: 0;
              padding: 0;
              img {
                width: 100%;
              }
              p {
                font-size: 14px;
                color: #999;
                padding-right: 10px;
                margin-top: 10px;
                margin-bottom: 12px;
              }
            }
          }
        }
        &:nth-child(4) {
          h2 {
            margin-bottom: 10px;
            color: #666;
            font-size: 20px;
            font-weight: 500;
          }
          p {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
  }
  .bottom {
    background-color: #333;
    height: 360px;
    .s {
      height: 180px;

      ul {
        display: flex;
        justify-content: space-evenly;
        border-bottom: 4px solid #434343;
        li {
          line-height: 180px;
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .x {
      margin-top: 30px;
      .sh {
        padding-top: 18px;
        ul {
          margin: auto;
          // background-color: pink;
          width: 795px;
          display: flex;
          li {
            width: 111px;
            text-align: center;
            border-left: solid 3px #999;
            a {
              color: #999;
              font-size: 14px;
              line-height: 16px;
            }
            &:nth-child(1) {
              border: 0;
            }
          }
        }
      }
      .xi {
        margin-top: 30px;
        h4 {
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          color: #999;
        }
      }
    }
  }
}
</style>
