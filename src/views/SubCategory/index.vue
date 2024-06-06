<script setup>
import { getSubCategoryApi, getCategoryFilterApi } from '@/apis/cate'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import sbuCateGoods from '@/components/eachGoods.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const whatData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
})
const subGoodsList = ref([])
const getSubCateList = async () => {
  const res = await getSubCategoryApi(whatData.value)
  const goodsList = res.data.result.items
  for (let i in goodsList) {
    subGoodsList.value.push(goodsList[i])
  }
  // console.log(res.data)
}
// getSubCate()
const parent = ref({})
const getcate = async () => {
  const res = await getCategoryFilterApi(route.params.id)
  // console.log(res.data)
  parent.value = res.data.result
}
getcate()
watch(
  whatData,
  (newvalue) => {
    getSubCateList(newvalue)
  },
  { deep: true, immediate: true }
)
const handleClick = () => {
  whatData.value.page = 1
  subGoodsList.value = []
}
// 加载更多
const disabled = ref(false)
const goodsBox = ref()
const load = async () => {
  whatData.value.page += 1
  const res = await getSubCategoryApi(whatData.value)
  const goodsList = res.data.result.items
  if (goodsList.lenght <= 0) {
    disabled.value = true
    return
  }
  for (let i in goodsList) {
    subGoodsList.value.push(goodsList[i])
  }
}
</script>
<template>
  <div>{{}}</div>
  <div class="subcate">
    <div class="bread-tab">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${parent.parentId}` }">{{
          parent.parentName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ parent.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tab">
      <el-tabs
        v-model="whatData.sortField"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="最新商品" name="publishTime" />
        <el-tab-pane label="最高人气" name="orderNum" />
        <el-tab-pane label="评论最多" name="evaluateNum" />
      </el-tabs>
    </div>
    <div
      class="goods"
      ref="goodsBox"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
    >
      <ul>
        <li
          @click="router.push(`/product/${item.id}`)"
          v-for="item in subGoodsList"
          :key="item.id"
        >
          <sbuCateGoods :goods="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.subcate {
  padding: 30px 220px;
  .bread-tab {
    margin: 0 36px;
  }
  .tab {
    margin: 40px 0 30px;
  }
  .goods {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
</style>
