<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="../assets/logo.png" alt="">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRule">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input @keyup.enter.native="loginSubmit" v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="密码"></el-input>
        </el-form-item>
          <el-button  @click="loginSubmit" type="primary">登录</el-button>
          <el-button>重置</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit () {
      // 先验证表单验证成功再调用接口
      this.$refs.loginForm.validate(async ok => {
        if (ok) {
          const { data: res } = await this.axios.post('/login', this.loginForm)
          if (res.meta.status !== 200) return this.$message.error('账号或密码输入有误')
          // 保存令牌到本地 关闭浏览器需要重新登录
          sessionStorage.setItem('token', res.data.token)
          this.$message.success('登录成功')
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
<style>
.login {
  height: 100%;
  background-color: #294a69;
}
.login .login-box {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  /* 向左上移动自身的 50% */
  transform: translate(-50%, -50%);
}
.login-box .logo {
  width: 130px;
  height: 130px;
  border: 7px solid #fff;
  border-radius: 50%;
  background-color: #eee;
  box-shadow: 0 0 10px #ccc;
  position: absolute;
  left: 50%;
  top: -50%;
  /* 向左上移动自身的 50% */
  transform: translate(-50%, 50%);
}
.login-box .el-form {
  width: 100%;
  padding: 0 20px 30px 20px;
  position: absolute;
  bottom: 0;
  /* 内边距向内压挤，不会影响最终宽 */
  box-sizing: border-box;
  text-align: right;
}
.login-box .el-input {
  margin-bottom: 20px;
}
</style>
