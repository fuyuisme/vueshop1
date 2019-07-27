export default {
  // 页面中要使用的数据要在data()中定义
  data () {
    /* rule 验证规则
    value 验证的值
    callback 回调函数，必须调用
    */
    let validateNameExists = async (rule, value, callback) => {
      // 查询数据
      // let queryData = {
      //   query: value,
      //   pagenum: 1,
      //   pagesize: 1
      // }
      // 调用接口查询服务器
      let exists = await this.axios.get('/users/exists/' + value)
      console.log(exists)
      // 判断有没有数据有就报错没有就通过
      if (exists.data.meta.status === 200) {
        callback(new Error('用户名已经存在'))
      } else {
        callback()
      }
    }
    return {
      // 控制修改用户的表单是否显示
      editUserDialog: false,
      // 修改用户的表单
      editUserFrom: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      editUserRules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          // 邮箱验证
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          // 自定义手机号验证
          { pattern: /^1[3456789]\d{9}$/, message: '手机格式不正确', trigger: ['blur', 'change'] }
        ]
      },
      // 控制添加用户的表单是否显示
      addUserDialog: false,
      // 添加用户的表单
      addUserFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          // 唯一用户名规则
          { validator: validateNameExists, message: '用户名已经存在', trigger: 'blur' }
        ],
        password: { required: true, message: '密码不能为空', trigger: 'blur' },
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          // 邮箱验证
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          // 自定义手机号验证
          { pattern: /^1[3456789]\d{9}$/, message: '手机格式不正确', trigger: ['blur', 'change'] }
        ]
      },
      searchKey: '', // 搜索关键字
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
    // 修改状态方法
    async changState (val, row) {
      // console.log(val)
      // console.log(row)
      let res = await this.axios.put(`/users/${row.id}/state/${val}`)

      console.log(res)
      if (res.data.meta.status !== 200) {
        this.$message.error('更新用户状态失败')
        setTimeout(() => {
          row.mg_state = !row.mg_state
        }, 300)
      }
      // this.total = res.data.total
    },
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
    // 改变当前
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
    },
    add () {
      // 先验证表单
      this.$refs.addUserRef.validate(async c => {
        if (c) {
          const res = await this.axios.post('/users', this.addUserFrom)
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success('添加成功')
            // 重新获取数据
            this.getData()
            // 关闭框
            this.addUserDialog = false
          }
        }
      })
    },
    edit () {
      // 先验证表单
      this.$refs.editUserRef.validate(async c => {
        if (c) {
          const res = await this.axios.put(`/users/${this.editUserFrom.id}`, this.editUserFrom)
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('更新成功')
            // 重新获取数据
            this.getData()
            // 关闭框
            this.editUserDialog = false
          }
        }
      })
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.axios.delete(`/users/${id}`)
        if (res.data.meta.status === 200) {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新加载数据
          this.getData()
        } else {
          this.$message.error('操作失败，失败原因:' + res.data.meta.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击修改时显示表单
    showEditForm (data) {
      // 把要修改的数据绑定到表单中
      this.editUserFrom.id = data.id
      this.editUserFrom.username = data.username
      this.editUserFrom.email = data.email
      this.editUserFrom.mobile = data.mobile
      this.editUserDialog = true
    }
  },
  // 获取页面初始函数
  created () {
    this.getData()
  }
}
