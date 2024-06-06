<script setup>
import { ref } from 'vue'
import { getProductApi } from '@/apis/product'
import { useRoute } from 'vue-router'
import XtxSku from '@/components/XtxSku/index.vue'
import { useMouseInElement } from '@vueuse/core'
import { onMounted } from 'vue'
import { addCartApi } from '@/apis/cart'
import eachGoods from '@/components/eachGoods.vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cart'

// import { addCartApi } from '@/apis/cart'
const route = useRoute()
const tab = ref({ id: '', name: '', parent: { id: '', name: '' } })
const detailObj = ref({
  id: '',
  name: '',
  desc: '',
  price: '',
  oldPrice: '',
  salesCount: '',
  commentCount: '',
  collectCount: '',
  brand: {
    id: '',
    name: ''
  }
})
const productImgList = ref([])
// sku
const goods = ref({ specs: [], skus: [] })
// 详情图片
const detailPicList = ref([])
// 同类商品
const similarList = ref([])
// 热榜
const hotList = ref([])
const getProduct = async () => {
  const res = await getProductApi(route.params.id)
  // console.log(res.data.result)
  tab.value = res.data.result.categories[0]
  detailObj.value = res.data.result
  productImgList.value = res.data.result.mainPictures
  goods.value.specs = res.data.result.specs
  goods.value.skus = res.data.result.skus
  detailPicList.value = res.data.result.details.pictures
  hotList.value = res.data.result.hotByDay
  similarList.value = res.data.result.similarProducts
  console.log(hotList.value, similarList.value)
}
getProduct()
// 商品数量计数器
const num = ref(1)
const onChangeNum = (n) => {
  if (num.value + n < 1) {
    return
  }
  num.value += n
}
// 是否显示大图
const isShow = ref(false)
// 显示的图片的下标
const imgIndex = ref(0)
//
const left = ref(0)
const top = ref(0)
onMounted(() => {})
const middleRef = ref()
// if (isOutside) {}
const { elementX, elementY } = useMouseInElement(middleRef)
// return { x, y, isOutside }
const onMoveLargeImg = () => {
  const x = elementX.value
  const y = elementY.value
  if (x < 100) {
    left.value = 0
  } else if (x > 300) {
    left.value = 200
  } else {
    left.value = x - 100
  }
  if (y < 100) {
    top.value = 0
  } else if (y > 300) {
    top.value = 200
  } else {
    top.value = y - 100
  }
}
// sku
const skuId = ref('')
const change = async (obj) => {
  console.log(obj)
  if (!obj.skuId) {
    return
  }
  skuId.value = obj.skuId
}
// 加入购物车
const addCart = async () => {
  const res = await addCartApi(skuId.value, num.value)
  console.log(res.data.result)
  const cartStore = useCartStore()
  cartStore.getCartList()
  ElMessage.success('加入成功')
}
</script>
<template>
  <div class="product">
    <div class="tab">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${tab.parent.id}` }">{{
          tab.parent.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/subcategory/${tab.id}` }">{{
          tab.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ detailObj.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- [1].parent.id -->
    </div>
    <div class="top">
      <div class="left">
        <div class="box">
          <div
            @mouseenter="isShow = true"
            @mouseleave="isShow = false"
            @mousemove="onMoveLargeImg"
            class="middle"
            ref="middleRef"
          >
            <img :src="productImgList[imgIndex]" alt="" />
            <div
              :style="{ left: left + 'px', top: top + 'px' }"
              class="see"
            ></div>
          </div>
          <div class="small">
            <ul>
              <li
                @click="imgIndex = index"
                v-for="(item, index) in productImgList"
                :key="index"
                :class="{ active: imgIndex === index }"
              >
                <img :src="item" alt="" />
              </li>
            </ul>
          </div>
          <div v-show="isShow" class="large">
            <div class="img">
              <img
                :style="{ left: -left * 2 + 'px', top: -top * 2 + 'px' }"
                :src="productImgList[imgIndex]"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="data">
          <ul>
            <li>
              <h4>销量人气</h4>
              <div class="num">{{ detailObj.salesCount }}</div>
              <a href="#">销量人气</a>
            </li>
            <li>
              <h4>商品评价</h4>
              <div class="num">{{ detailObj.commentCount }}</div>
              <a href="#">查看评价</a>
            </li>
            <li>
              <h4>收藏人气</h4>
              <div class="num">{{ detailObj.collectCount }}</div>
              <a href="#">收藏人气</a>
            </li>
            <li>
              <h4>品牌信息</h4>
              <div class="num">{{ detailObj.brand.name }}</div>
              <a href="#">品牌主页</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="right">
        <h2>{{ detailObj.name }}</h2>
        <p>{{ detailObj.desc }}</p>
        <div class="price">
          <i>￥</i>{{ detailObj.price
          }}<del><i>￥</i>{{ detailObj.oldPrice }}</del>
        </div>
        <div class="other">
          <p><span>促销</span>12月好物欢送，App领券购买直降120元</p>
          <p>
            <span>服务</span>质量优秀 &nbsp;快速退款 &nbsp;免费包邮 &nbsp;<a
              href="#"
              >&nbsp;&nbsp;了解详情</a
            >
          </p>
        </div>
        <!-- sku组件 -->
        <XtxSku @change="change" :goods="goods" />
        <!--  -->
        <!-- 计数器 -->
        <div class="count">
          <span>数量</span>
          <div class="box">
            <!-- <div class="sub">+</div> -->
            <el-button size="small" @click="onChangeNum(-1)">-</el-button>
            <div class="num">{{ num }}</div>
            <!-- <div class="add">-</div> -->
            <el-button size="small" @click="onChangeNum(1)">+</el-button>
          </div>
        </div>
        <el-button size="large" @click="addCart">加入购物车</el-button>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <h3>商品详情</h3>
        <div v-for="(item, index) in detailPicList" :key="index" class="img">
          <img v-img-lazy="item" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="box">
          <h4>24小时热榜</h4>
          <div v-for="item in hotList" :key="item.id" class="goods">
            <eachGoods :goods="item" />
            <!-- {{ item }} -->
          </div>
        </div>
        <div class="box">
          <h4>同类商品</h4>
          <div v-for="item in similarList" :key="item.id" class="goods">
            <eachGoods :goods="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  padding: 30px 220px;
  background-color: #f3f3f3;
  .tab {
    margin-bottom: 30px;
  }
  .top {
    display: flex;
    background-color: white;
    .left {
      .box {
        height: 400px;
        width: 480px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .middle {
          width: 400px;
          height: 400px;
          img {
            width: 100%;
            height: 100%;
          }
          position: relative;
          .see {
            width: 200px;
            height: 200px;
            background-color: rgba($color: #000000, $alpha: 0.5);
            position: absolute;
          }
        }
        .small {
          ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            .active {
              border: #17bb9b solid 2px;
            }
            li {
              width: 68px;
              height: 68px;
              margin-bottom: 15px;
              // background-color: pink;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        position: relative;
        .large {
          width: 400px;
          height: 400px;
          position: absolute;
          left: 412px;
          top: 0;
          // background-color: skyblue;
          overflow: hidden;
          .img {
            position: relative;
            img {
              position: absolute;
            }
          }
        }
      }
      .data {
        width: 400px;
        height: 120px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            border-left: solid 1px #ddd;
            width: 98px;
            height: 98px;
            text-align: center;
            h4 {
              line-height: 36px;
              font-size: 14px;
              font-weight: 400;
            }
            .num {
              color: red;
              font-size: 12px;
            }
            a {
              line-height: 36px;
              font-size: 12px;
            }
          }
        }
      }
    }

    .right {
      margin: 18px 30px 10px 36px;
      h2 {
        font-size: 16px;
        font-weight: 500;
      }
      p {
        font-size: 12px;
        margin: 12px 0;
      }
      .price {
        color: red;
        font-size: 14px;
        i {
          font-size: 10px;
        }
        del {
          color: #bfbfbf;
          font-size: 10px;
          i {
            font-size: 8px;
          }
        }
      }
      .other {
        width: 400px;
        height: 80px;
        background-color: #f3f3f3;
        border-radius: 5px;
        margin: 20px 0;
        padding: 8px 6px;
        p {
          font-size: 12px;
          color: #a3a3a3;
          a {
            color: #17bb9b;
          }
        }
      }

      .count {
        width: 120px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        // background-color: skyblue;
        display: flex;
        justify-content: space-between;
        color: #cacaca;
        margin-bottom: 30px;
        .box {
          width: 88px;
          height: 24px;
          // background-color: skyblue;
          display: flex;
          .num {
            flex: 1;
            text-align: center;
            color: #000;
          }
        }
      }
    }
  }
  .bottom {
    margin-top: 20px;
    background-color: #f3f3f3;
    display: flex;
    justify-content: space-between;
    .left {
      width: 78%;
      background-color: #fff;
      padding: 20px 24px 0;
      h3 {
        font-size: 16px;
        font-weight: 400;
        padding-bottom: 24px;
        border-bottom: solid 1px #f3f3f3;
      }
      .img {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
    .right {
      width: 18%;
      background-color: #fff;
      .box {
        margin-bottom: 20px;
        h4 {
          padding-left: 10px;
          line-height: 48px;
          background-color: #ff3d06;
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 10px;
        }
        .goods {
          margin: auto;
        }
      }
    }
  }
}
</style>
