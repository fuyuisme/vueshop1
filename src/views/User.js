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
      if (exists.data.mate.status === 200) {
        callback(new Error('用户名已经存在'))
      } else {
        callback()
      }
    }
    return {
      addUserDialog: true,
      // 添加用户的表单
      addUserfrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validateNameExists, message: '用户名已经存在', trigger: 'blur' }
        ],
        password: { required: true, message: '密码不能为空', trigger: 'blur' },
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
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
