<script setup>
import { ref } from 'vue'
import { getUserOrderApi } from '@/apis/user'
// tab列表
const active = ref('all')
const tabTypes = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]

const params = ref({
  orderState: 'all',
  page: '1',
  pageSize: '2'
})
const orderList = ref([])
const total = ref([])
const getOrderList = async () => {
  const res = await getUserOrderApi()
  console.log(res)
  console.log(1111)
  orderList.value = res.data.result.items
  total.value = res.data.result.counts
}
getOrderList()
const handleClick = (type) => {
  params.value.orderState = type.props.name
  getOrderList()
}
const handleSizeChange = (val) => {
  params.value.pageSize = val
  getOrderList()
}
const handleCurrentChange = (val) => {
  params.value.page = val
  getOrderList()
}
</script>
<template>
  <div class="order">
    <div class="tab">
      <el-tabs v-model="active" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in tabTypes"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          >{{ item.label }}</el-tab-pane
        >
      </el-tabs>
      <div class="goods"></div>
    </div>
    <div class="page">
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[2, 4, 6, 10]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.order {
  position: relative;
  .tab {
    padding: 30px 10px 20px 30px;
  }
  .page {
    position: absolute;
    // transform: translateY(200px);
    transform: translate(40px, 400px);
  }
}
</style>
