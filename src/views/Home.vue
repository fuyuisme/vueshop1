<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo-box">
          <!-- 左侧logo框 -->
          <img width="50" src="../assets/logo.png" alt />
          <span>电商后台管理系统</span>
        </div>
        <!-- 右侧按钮 -->
        <el-button @click="longout">退出</el-button>
      </el-header>
      <el-container>
              <!-- 左侧菜单 -->
        <el-aside :width="collapse?`65px`:`200px`">
          <div class="collapse-btn" @click="collapse=!collapse">|||</div>
          <el-menu
            :default-active="$route.path"
            :router="true"
            :collapse-transition="false"
            :collapse="collapse"
            background-color="#333743"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu v-for="(item, index) in muneList" :key="index" :index="'/'+item.path">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
                <el-menu-item v-for="(item1, index1) in item.children" :key="index1"  :index="'/'+item1.path">
                  <i class="el-icon-location"></i>
                  <span>{{item1.authName}}</span>
                </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <!-- 路由的容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    // 页面计算的数据保存在data
    return {
      // 控制折叠
      collapse: false,
      muneList: []
    }
  },
  async created () {
    // console.log(this.$route)
    const menus = await this.axios.get('/menus')
    // console.log(menus)
    if (menus.data.meta.status !== 200) return this.$message.error('获取菜单列表失败')
    this.muneList = menus.data.data
  },
  methods: {
    longout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.home,
.el-container {
  height: 100%;
}
.home .el-menu{
  border-right: none;
}
.home .collapse-btn {
  background-color: #4a4f63;
  color:#fff;
  text-align: center;
  letter-spacing: .1em;
  user-select:none;
  cursor:pointer;
  font-size: 15px;
  padding:2px 0;
}
.home .el-header {
  background-color: #373d41;
  /* flex 布局 */
  display: flex;
  /* 一左 一右 */
  justify-content: space-between;
  /* 垂直居中 */
  align-items: center;
  /* 内容无法选中 */
  user-select: none;
  font-size: 25px;
  color: #fff;
}
.home .el-aside {
  background-color: #333743;
  height: 100%;
}
/* 图片和文字垂直中线对齐 */
.home .logo-box img {
  vertical-align: middle;
  margin-right: 20px;
}
.el-main{
  background-color: #eaedf1;
}

/* .logo-box{
  height: 60px;
  width: 600px;
}
.logo-box h3{
  display: inline-block;
} */
</style>
