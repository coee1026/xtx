<script setup>
import { useCartStore } from '@/stores/cart'
import { changeCountApi, allSelectApi, deleteApi } from '@/apis/cart'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import goodsDetail from '@/components/goodsDetail.vue'
const router = useRouter()
const cartStore = useCartStore()
cartStore.getCartList()
const checked = ref(false)
const cartList = ref([])
cartList.value = cartStore.cartList

checked.value = cartList.value.every((item) => item.selected)
// 改变商品数量和选中状态
const onChange = async (skuId, count, selected) => {
  await changeCountApi(skuId, { count, selected })
  checked.value = cartList.value.every((item) => item.selected === true)
}
//  全选
const onAllSelect = async () => {
  const ids = cartList.value.map((item) => item.skuId)
  // console.log(checked.value)
  await allSelectApi({ selected: !checked.value, ids })
  // console.log(res.data)
  cartList.value.forEach((item) => (item.selected = checked.value))
}
// delete
const onDelete = async (id) => {
  await deleteApi([id])
  // console.log(res.data)
  const index = cartList.value.findIndex((item) => item.skuId === id)
  cartList.value = cartList.value.splice(index, 1)
  ElMessage.success('删除成功')
}
// total
const total = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.count, 0) || 0
})
const price = computed(() => {
  const newCartList = cartList.value.filter((item) => item.selected)
  return (
    newCartList.reduce((sum, item) => sum + item.count * item.price, 0) || 0
  )
})
const selectTotal = computed(() => {
  const newCartList = cartList.value.filter((item) => item.selected)
  return newCartList.reduce((sum, item) => sum + item.count, 0) || 0
})
// 删除选中的
const onSelectDel = () => {
  ElMessageBox.confirm('确认要删除勾选的商品吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const ids = cartList.value
        .filter((item) => item.selected)
        .map((item) => item.skuId)
      // console.log(ids)
      deleteApi(ids)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}
</script>

<template>
  <div class="cart">
    <div class="head">
      <div class="all">
        <el-checkbox @click="onAllSelect" v-model="checked" size="large" />
      </div>
      <h3>商品信息</h3>
      <div class="price">单价</div>
      <div class="count">数量</div>
      <div class="delete"></div>
    </div>
    <div class="body">
      <div v-for="item in cartList" :key="item.skuId" class="goods">
        <div class="select">
          <el-checkbox
            @click="onChange(item.skuId, item.count, !item.selected)"
            v-model="item.selected"
            size="large"
          />
        </div>
        <!--  -->
        <goodsDetail
          :picture="item.picture"
          :name="item.name"
          :attrsText="item.attrsText"
        />
        <!-- {{ item }} -->
        <div class="price"><span>￥</span>{{ item.price }}</div>
        <div class="count">
          <el-input-number
            v-model="item.count"
            :min="1"
            @change="onChange(item.skuId, item.count, item.selected)"
          />
        </div>
        <div class="delete">
          <el-button @click="onDelete(item.skuId)" type="danger"
            >删除</el-button
          >
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="total">
        共{{ total }}件商品，已选择{{ selectTotal }}件，商品合计：￥{{
          price.toFixed(2)
        }}
      </div>
      <div class="button">
        <el-button @click="onSelectDel" type="danger">删除</el-button>
        <el-button type="primary" @click="router.push('/order')"
          >结算</el-button
        >
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.cart {
  padding: 20px 220px;
  .head {
    height: 80px;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    border-bottom: solid 2px #fafafa;
    .all {
      margin-left: 20px;
    }
    h3 {
      width: 480px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }
    .price,
    .count {
      text-align: center;
      font-size: 14px;
      width: 150px;
    }
    .delete {
      width: 80px;
    }
  }
  .body {
    margin-top: 10px;
    .goods {
      margin-bottom: 8px;
      border-bottom: solid 2px #fafafa;
      padding: 10px 0;
      height: 100px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      .select {
        margin-left: 20px;
      }

      .price,
      .count {
        span {
          font-size: 14px;
        }
        text-align: center;

        font-size: 12px;
        width: 150px;
      }
      .delete {
        width: 80px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    .total {
      font-size: 14px;
    }
    .button {
      display: flex;
    }
  }
}
</style>
