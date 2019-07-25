<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="15" class="search-box">
        <el-col :span="10">
          <!-- 第三方组件要用.native -->
          <el-input @keyup.enter.native="queryInfo.query=searchKey" :v-model="searchKey" placeholder="请输入搜索关键字" v-model="searchKey">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
        <el-button type="primary">添加新用户</el-button>
        </el-col>
      </el-row>
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
          <template slot-scope="data">
            <!-- data.row当前这行数据 是对象类型
            data.$index当前数据的下标
             -->
              <!-- {{ data.row }}
              {{ data.$index }} -->
              <!-- 添加开关组件并和每行的mg_state绑定 -->
              <el-switch
              @change="changState($event,data.row)"
                v-model="data.row.mg_state"
                active-color="#399bfb"
                >
              </el-switch>
          </template>
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
    <!-- 添加用户的表单 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialog">
      <el-form :model="addUserfrom" :rules="addUserRules">
        <el-form-item prop="username" label="用户名" label-width="80px">
          <el-input v-model="addUserfrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="80px">
          <el-input type="password" v-model="addUserfrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" label-width="80px">
          <el-input v-model="addUserfrom.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号" label-width="80px">
          <el-input v-model="addUserfrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import User from './User.js'
export default {
  mixins: [User]
}
</script>
<style>
  .home .search-box{
    margin-bottom: 15px;
  }
</style>
