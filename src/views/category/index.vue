<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { ref } from 'vue'
import { getCateDataApi } from '@/apis/cate'
import HomeBanner from '@/components/HomeBanner.vue'
import CateGoods from '@/components/eachGoods.vue'

const cateobj = ref({
  id: '',
  name: '',
  picture: ''
})
const children = ref([])
const getCate = async () => {
  const res = await getCateDataApi(route.params.id)
  cateobj.value = res.data.result
  const chi = res.data.result.children
  for (let item in chi) {
    children.value.push(chi[item])
  }
}
getCate()
</script>

<template>
  <div class="cate">
    <div class="tab">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ cateobj.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <HomeBanner :imgUrl="cateobj.children" />
    <div class="all-cate">
      <h2>全部分类</h2>
      <ul>
        <li v-for="item in cateobj.children" :key="item.id">
          <img :src="item.picture" :alt="item.name" />
          <h3>{{ item.name }}</h3>
        </li>
      </ul>
    </div>
    <div class="secondCate" v-for="item in children" :key="item.id">
      <div class="head">
        <h3>{{ item.name }}</h3>
        <a :href="`/subcategory/${item.id}`"
          >查看更多<i class="iconfont icon-you"></i
        ></a>
      </div>
      <div class="content">
        <div
          class="goods"
          v-for="i in item.goods"
          :key="i.id"
          @click="router.push(`/product/${i.id}`)"
        >
          <CateGoods :goods="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cate {
  padding: 0 220px;
  .tab {
    padding: 20px;
  }
  .all-cate {
    padding: 48px 0 20px;
    text-align: center;
    h2 {
      margin-bottom: 30px;
      font-size: 24px;
      font-weight: 500;
    }
    ul {
      display: flex;
      justify-content: space-between;
      li {
        height: 160px;
        width: 120px;
        // background-color: pink;/

        img {
          background-color: #e6e6e6;
          width: 100%;
          height: 120px;
          overflow: hidden;
        }
        h3 {
          &:hover {
            color: #27ba9b;
          }
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
  .secondCate {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
    .head {
      display: flex;
      margin-bottom: 30px;
      h3 {
        // margin: auto;
        flex: 1;
        font-weight: 400;
      }
      a {
        font-size: 12px;
        color: #999;
        .iconfont {
          font-size: 10px;
        }
      }
    }
    .content {
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>
