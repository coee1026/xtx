<script setup>
import topCom from '@/components/topCom.vue'
import logo from '@/assets/logo.png'
import loginbg from '@/assets/login-bg.png'
import qrcode from '@/assets/qrcode.jpg'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { loginPasApi, loginCodeApi, getCodeApi } from '@/apis/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/login'
const isAccount = ref(true)
const isPhone = ref(false)
const checked = ref(true)
// 用户名 密码
const formPassword = ref({ account: '', password: '' })
// 用户名 验证码
const formCode = ref({ mobile: '', code: '' })
const rulesPas = {
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名应为3~10位中英文字符构成' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[\w@!#]{6,16}$/,
      message: '密码应为6~16位英文字符组成',
      trigger: 'blur'
    }
  ]
}
const rulesCode = {
  mobile: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入合法的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码应为6位数字', trigger: 'blur' }
  ]
}
const userStore = useUserStore()
const pasRef = ref()
const codeRef = ref()
const router = useRouter()
// 账号heima293 密码hm#qd@23! 手机12056258293
const login = async () => {
  if (!isPhone.value) {
    await pasRef.value.validate()
    if (!checked.value) {
      ElMessage.warning('请先阅读并同意《服务条款》和《服务条款》')
      return
    }
    // 发请求
    const res = await loginPasApi(formPassword.value)
    await userStore.setInfo(res.data.result)
    ElMessage.success('登陆成功')
  } else {
    await codeRef.value.validate()
    if (!checked.value) {
      ElMessage.warning('请先阅读并同意《服务条款》和《服务条款》')
      return
    }
    // 发请求
    const res = await loginCodeApi(formCode.value)
    await userStore.setInfo(res.data.result)
    ElMessage.success('登陆成功')
  }
  router.push('/')
}
const timeStr = ref('获取验证码')
const time = ref(60)
const flag = ref(false)
const getCode = async () => {
  await getCodeApi(formCode.value.mobile)
  if (flag.value) {
    return
  }
  timeStr.value = '60秒后获取'
  flag.value = true
  time.value = 60
  let timeId = setInterval(() => {
    time.value = time.value - 1
    timeStr.value = `${time.value}秒后获取`
    if (time.value <= 0) {
      flag.value = false
      clearInterval(timeId)
      timeStr.value = '获取验证码'
    }
  }, 1000)
}
</script>
<template>
  <topCom />
  <div class="header">
    <h1>小兔鲜儿</h1>
    <div class="img"><img :src="logo" alt="" /></div>
    <p>
      <a href="/"
        >进入网站首页<i class="iconfont icon-you"></i>
        <i class="iconfont icon-you"></i
      ></a>
    </p>
  </div>
  <div class="bg">
    <img :src="loginbg" alt="" />
    <div class="formbox">
      <div class="title">
        <div class="account">
          <h3 :class="{ active: isAccount }" @click="isAccount = true">
            账户登录
          </h3>
        </div>
        <div class="line">|</div>
        <div
          class="qccode"
          :class="{ active: !isAccount }"
          @click="isAccount = false"
        >
          <h3>二维码登录</h3>
        </div>
      </div>
      <div class="qr" v-if="!isAccount">
        <img :src="qrcode" alt="" />
        <p>请用移动端小兔鲜扫码</p>
      </div>

      <div class="form" v-else>
        <div v-if="!isPhone" class="phone" @click="isPhone = !isPhone">
          <h4>手机验证码登录</h4>
        </div>
        <div v-else class="phone" @click="isPhone = !isPhone">
          <h4>密码登录</h4>
        </div>
        <!-- ----------------- -->
        <!-- ----------------- -->

        <el-form
          v-if="!isPhone"
          :model="formPassword"
          :rules="rulesPas"
          ref="pasRef"
        >
          <el-form-item prop="account">
            <el-input
              v-model.trim="formPassword.account"
              placeholder="请输入用户名称/手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="formPassword.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- ---------------- -->
        <!-- ----------------- -->
        <el-form v-else :model="formCode" :rules="rulesCode" ref="codeRef">
          <el-form-item prop="mobile">
            <el-input
              v-model.trim="formCode.mobile"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model.trim="formCode.code"
              style="width: 60%"
              placeholder="请输入六位验证码"
            ></el-input>
            <el-button
              style="margin-left: 24px"
              type="primary"
              @click="getCode"
              size="middle"
              >{{ timeStr }}</el-button
            >
          </el-form-item>
        </el-form>
        <!-- ------------- -->
        <!-- ------------- -->
        <!-- ------------- -->
        <el-checkbox v-model="checked" />
        <span
          >我已同意<a href="#">《服务条款》</a>和<a href="#"
            >《服务条款》</a
          ></span
        >
        <el-button @click="login" style="width: 320px; margin: 28px 0"
          >登录</el-button
        >
        <div class="bottom">
          <div class="left"><a href="/register">忘记密码？</a></div>
          <div class="right"><a href="#">免费注册</a></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  height: 140px;
  padding: 0 220px;
  // background-color: skyblue;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 0;
  }
  position: relative;
  .img {
    position: absolute;
    left: 220px;
    top: 36px;
    width: 200px;
    img {
      width: 100%;
    }
  }
  p {
    padding-top: 88px;
    font-size: 16px;
    a {
      color: #333;
      .iconfont {
        // font-size: 12px;
        font-weight: 600;

        color: #5bcfb8;
        &:nth-child(2) {
          color: #9fe3d6;
        }
      }
    }
  }
}
.bg {
  width: 100%;
  // height: 200px;
  position: relative;
  .formbox {
    position: absolute;
    top: 100px;
    right: 160px;
    width: 380px;
    height: 380px;
    background-color: #fff;
    padding: 20px 30px 30px;
    .title {
      display: flex;
      justify-content: space-between;
      .account,
      .qccode {
        // width: 159px;

        h3 {
          line-height: 30px;
          font-size: 18px;
          font-weight: 500;
        }
      }
      .line {
        color: #f2f2f2;
        font-weight: 100;
      }
    }
    .phone {
      margin: 20px 0;
      text-align: end;
      font-size: 14px;
      color: #17bb9b;
      font-weight: 100;
    }
    span {
      margin-left: 6px;
      font-size: 14px;
      color: #b6b5ba;
      a {
        color: #167ab8;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .left,
      .right {
        font-size: 14px;
      }
    }
    .qr {
      margin: 20px auto;
      width: 188px;
      // height: 188px;
      img {
        width: 100%;
      }
      p {
        text-align: center;
        margin-top: 30px;
      }
    }
  }
}
.active {
  border-bottom: 2px solid #17bb9b;
}
</style>
