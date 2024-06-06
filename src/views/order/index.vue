<script setup>
import { getOrderApi, commitOrderApi } from '@/apis/order'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import goodsDetail from '@/components/goodsDetail.vue'
import {
  getAddressApi,
  changeAddressApi,
  addAddressApi,
  deleteAddressApi
} from '@/apis/address'
import { ElMessage } from 'element-plus'
const goodsList = ref([])
const sumObj = ref({
  discountPrice: '',
  goodsCount: '',
  postFee: '',
  totalPayPrice: '',
  totalPrice: ''
})
const addresses = ref([])
const address = ref({
  address: '',
  id: '',
  receiver: '',
  contact: '',
  isDefault: 1,
  fullLocation: ''
})
// 获取地址
const getAddress = async () => {
  const addressRes = await getAddressApi()
  addresses.value = addressRes.data.result
  address.value = addresses.value.find((item) => item.isDefault === 0) || {
    address: '',
    id: '',
    receiver: '',
    contact: '',
    isDefault: 0,
    fullLocation: ''
  }
}
getAddress()
const getOrder = async () => {
  const res = await getOrderApi()
  goodsList.value = res.data.result.goods
  sumObj.value = res.data.result.summary
}
getOrder()
const changeAddress = ref(false)
const addAddress = ref(false)
const onChangeAddress = () => {
  tmpAddredd.value = address.value
  changeAddress.value = true
}
// 修改
const chooseAddress = () => {
  tmpAddredd.value = address.value
  changeAddress.value = true
}
// 切换地址
const id = ref('')
const tmpAddredd = ref({
  address: '',
  id: '',
  receiver: '',
  contact: '',
  isDefault: 0,
  fullLocation: ''
})
const switchAddress = async (item) => {
  tmpAddredd.value = item
  id.value = item.id
}
const confirmSwitch = async () => {
  if (!id.value) {
    ElMessage.warning('请先选择要修改的地址')
    return
  }
  address.value = tmpAddredd.value
  await changeAddressApi(id.value, address.value)
  // getAddress()
  changeAddress.value = false
}
const cancleSwitch = () => {
  changeAddress.value = false
  id.value = ''
}
// 添加地址
const addressData = ref({
  receiver: '',
  contact: '',
  address: '',
  addressTags: '',
  isDefault: 1,
  fullLocation: '',
  postalCode: '344900',
  countyCode: '344900',
  cityCode: '344900',
  provinceCode: '344900'
})
const comfirmAdd = async () => {
  await addAddressApi(addressData.value) //
  getAddress()
  addAddress.value = false
  ElMessage.success('添加成功')
}
const cancleAdd = () => {
  addAddress.value = false
}
// 删除
// const deletlDialog = ref(false)
const deletlDialog = ref(false)
const delId = ref('')
const delAdderss = (item) => {
  tmpAddredd.value = item
  delId.value = item.id
}
const confirmDel = async () => {
  if (!delId.value) {
    ElMessage.warning('请先选择要删除的地址')
    return
  }
  await deleteAddressApi(delId.value)
  deletlDialog.value = false
  getAddress()
  ElMessage.success('删除成功')
}
const cancelDelete = () => {
  delId.value = ''
  deletlDialog.value = false
}

// 提交订单
const onGoPay = async () => {
  if (!address.value.id) {
    ElMessage.warning('请先选择收货地址')
    return
  }
  const res = await commitOrderApi({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: goodsList.value,
    addressId: address.value.id
  })
  ElMessage.success('订单提交成功')
  console.log(res.data)
  router.push({
    path: '/pay',
    query: {
      id: res.data.result.id,
      price: res.data.result.payMoney
    }
  })
}
</script>
<template>
  <div class="order">
    <div class="address">
      <h3>收货地址</h3>
      <div class="box">
        <div class="left" v-if="address.id">
          <p>
            收货人：<span>{{ address.receiver }}</span>
          </p>
          <p>
            联系方式：<span>{{ address.contact }}</span>
          </p>
          <p>
            收货地址：<span
              >{{ address.fullLocation }} {{ address.address }}</span
            >
          </p>
        </div>
        <div @click="chooseAddress" class="notDefault" v-else>
          <a href="#">请选择地址</a>
        </div>
        <div class="right">
          <el-button @click="onChangeAddress">切换地址</el-button>
          <el-button @click="addAddress = true">添加地址</el-button>
          <el-button @click="deletlDialog = true">删除地址</el-button>
        </div>
      </div>
    </div>
    <!--  -->

    <div class="message">
      <h3>商品信息</h3>
      <div class="head">
        <div class="goods">商品信息</div>
        <div class="price">单价</div>
        <div class="count">数量</div>
        <div class="total">小计</div>
        <div class="real-total">实付</div>
      </div>
      <div class="body">
        <div class="goods" v-for="item in goodsList" :key="item.id">
          <goodsDetail
            :picture="item.picture"
            :name="item.name"
            :attrsText="item.attrsText"
          />
          <div class="price">{{ item.price }}</div>
          <div class="count">{{ item.count }}</div>
          <div class="total">{{ item.totalPrice }}</div>
          <div class="real-total">{{ item.totalPayPrice }}</div>
        </div>
      </div>
    </div>
    <div class="money">
      <h3>金额明细</h3>
      <div class="item">
        <div class="left">商品件数：</div>
        <div class="right">{{ sumObj.goodsCount }}件</div>
      </div>
      <div class="item">
        <div class="left">商品总价：</div>
        <div class="right">￥{{ sumObj.totalPrice }}</div>
      </div>
      <div class="item">
        <div class="left">运费：</div>
        <div class="right">￥{{ sumObj.postFee }}</div>
      </div>
      <div class="item">
        <div class="left">折扣：</div>
        <div class="right">￥{{ sumObj.discountPrice }}</div>
      </div>
      <div class="item">
        <div class="left">应付金额：</div>
        <div class="right" style="color: red; font-size: 16px">
          ￥{{ sumObj.totalPayPrice }}
        </div>
      </div>
    </div>
    <div class="pay">
      <el-button type="primary" @click="onGoPay">在线支付</el-button>
      <el-button type="primary" @click="onGoPay">货到付款</el-button>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog
    v-model="changeAddress"
    title="选择地址"
    width="500"
    :before-close="handleClose"
  >
    <div class="dialog">
      <a
        v-for="item in addresses"
        :key="item.id"
        href="#"
        @click.prevent="switchAddress(item)"
      >
        <div
          class="dialog-address"
          :class="{ active: tmpAddredd.id === item.id }"
        >
          <div><span>收货人：</span> {{ item.receiver }}</div>
          <div><span>联系方式：</span> {{ item.contact }}</div>
          <div>
            <span>收货地址：</span> {{ item.fullLocation }} {{ item.address }}
          </div>
        </div>
      </a>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleSwitch">取消</el-button>
        <el-button type="primary" @click="confirmSwitch"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <!--  -->
  <el-dialog
    v-model="addAddress"
    title="添加地址"
    width="500"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="姓名"
        ><el-input v-model="addressData.receiver"></el-input
      ></el-form-item>
      <el-form-item label="联系方式"
        ><el-input v-model="addressData.contact"></el-input
      ></el-form-item>
      <el-form-item label="详细地址"
        ><el-input v-model="addressData.address"></el-input
      ></el-form-item>
      <el-form-item label="地址标签"
        ><el-input v-model="addressData.addressTags"></el-input
      ></el-form-item>
      <el-form-item label="完整地址"
        ><el-input v-model="addressData.fullLocation"></el-input
      ></el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleAdd">取消</el-button>
        <el-button @click="comfirmAdd" type="primary"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 删除地址 -->
  <el-dialog
    v-model="deletlDialog"
    title="删除地址"
    width="500"
    :before-close="handleClose"
  >
    <div class="dialog">
      <a
        v-for="item in addresses"
        :key="item.id"
        href="#"
        @click.prevent="delAdderss(item)"
      >
        <div
          class="dialog-address"
          :class="{ active: tmpAddredd.id === item.id }"
        >
          <div><span>收货人：</span> {{ item.receiver }}</div>
          <div><span>联系方式：</span> {{ item.contact }}</div>
          <div>
            <span>收货地址：</span> {{ item.fullLocation }} {{ item.address }}
          </div>
        </div>
      </a>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelDelete">取消删除</el-button>
        <el-button type="primary" @click="confirmDel"> 确认删除 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.order {
  padding: 0px 220px 20px;
  // position: relative;
  .address {
    margin-bottom: 30px;
    h3 {
      font-size: 16px;
      font-weight: 400;
      height: 60px;
      line-height: 60px;
      border-bottom: solid 1px #f3f3f3;
      margin-bottom: 20px;
    }
    .box {
      height: 112px;
      border: 1px solid #f3f3f3;
      padding: 18px 88px 0 20px;
      display: flex;
      justify-content: space-between;
      p {
        font-size: 12px;
        color: #aaa;
        margin-bottom: 10px;
        span {
          color: #000;
        }
      }
      .right {
        line-height: 94px;
      }
    }
  }
  .notDefault {
    a {
      display: block;
      height: 20px;
    }
  }
  .message {
    margin-bottom: 30px;
    h3 {
      font-size: 16px;
      font-weight: 400;
      height: 60px;
      line-height: 60px;
      margin-bottom: 20px;
      border-bottom: solid 1px #f3f3f3;
    }
    .head {
      height: 66px;
      background-color: #f3f3f3;
      display: flex;
      line-height: 66px;
      justify-content: space-between;
      .goods {
        width: 480px;
        text-align: center;
      }
      .price,
      .count,
      .total,
      .real-total {
        text-align: center;
        width: 100px;
      }
    }
    .body {
      height: 78px;
      .goods {
        margin: 12px 0;
        display: flex;
        justify-content: space-between;
        .price,
        .count,
        .total,
        .real-total {
          text-align: center;
          width: 100px;
          line-height: 78px;
          // font-size: ;
        }
      }
    }
  }
  .money {
    h3 {
      font-size: 16px;
      font-weight: 400;
      height: 60px;
      line-height: 60px;
      margin-bottom: 20px;
      border-bottom: solid 1px #f3f3f3;
    }

    .item {
      // text-align: end;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
      .left {
        font-size: 14px;
        width: 300px;
      }
      .right {
        font-size: 14px;

        width: 100px;
      }
    }
  }
  .pay {
    margin-top: 50px;
    text-align: end;
  }
}
.dialog {
  .dialog-address {
    height: 88px;
    font-size: 12px;
    border: 1px solid #f3f3f3;
    padding: 12px 10px 10px 16px;
    margin-bottom: 8px;
    div {
      margin-bottom: 8px;
    }
    span {
      color: #aaaaaa;
    }
  }
  .active {
    border: solid 1px #68cfb9;
    background-color: rgba($color: #68cfb9, $alpha: 0.2);
  }
}
</style>
