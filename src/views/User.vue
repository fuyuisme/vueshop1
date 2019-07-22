<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
    <el-table
    :data="userList"
    border
    style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="操作">
        </el-table-column>
      </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  // 页面中要使用的数据要在data()中定义
  data () {
    return {
      userList: [], // 用户列表
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total: 0 // 总的记录数
    }
  },
  // watch是对象  对象后要用：
  watch: {
    queryInfo: {
      deep: true,
      handler () {
        this.getData()
      }
    }
  },
  // methods是对象 对象后要用：
  methods: {
    async getData () {
      let { data: res } = await this.axios.get('/users', { params: this.queryInfo })
      // 保存用户列表
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      this.total = res.data.total
      // console.log(res)
    },
    // 当每页条数改变时触发
    handleSizeChange (val) {
      // 更新当前每页条数
      this.queryInfo.pagesize = val
    },
    handleCurrentChange (val) {
      // 改变当前
      this.queryInfo.pagenum = val
    }
  },
  // 获取页面初始函数
  created () {
    this.getData()
  }
}
</script>
