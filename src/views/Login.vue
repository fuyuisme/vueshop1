<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="../assets/logo.png" alt="">
      <el-form
        class="demo-ruleForm"
      >
        <el-form-item>
          <el-input type="password"></el-input>
          <el-input type="password"></el-input>
          <el-button type="primary" >提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {}
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
