<template>
  <div class="top">
    <p style="line-height:60px;font-weight:650;font-style:normal;color:#FFFFFF;font-size:24px;float:left;">我来照顾运营管理平台</p>
    <div class="right-menu" style="float:right;">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/header.png" style="width:40px;height:40px;margin-top:10px;border-radius:20px;cursor:pointer;">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="userInfo">账号信息</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="update">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <p style="line-height:60px;font-weight:650;font-style:normal;color:#FFFFFF;float:right;margin-right:18px;">{{ fullName }}</p>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm2"
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="旧密码"
          prop="oldPwd"
        >
          <el-input
            v-model="ruleForm2.oldPwd"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="pass"
        >
          <el-input
            v-model="ruleForm2.pass"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            v-model="ruleForm2.checkPass"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm2')"
          >提交</el-button>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        hidden
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    var checkOldPwd = (rule, value, callback) => {}
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginName: '超级管理员',
      fullName: '超级管理员',
      dialogVisible: false,
      userName: '超级管理员',
      ruleForm2: {
        oldPwd: '',
        pass: '',
        checkPass: ''
      },
      rules2: {
        oldPwd: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    var data = JSON.parse(window.localStorage.getItem('userInfo'))
    this.fullName = data ? data.user.username : '超级管理员'
  },
  methods: {
    async logout() {
      this.$confirm('确定要退出登录状态吗?', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // center: true
      }).then(() => {
        window.localStorage.removeItem('testRouter')
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        window.localStorage.removeItem('userRolesPer')
        window.localStorage.removeItem('userInfo')
        this.$router.push(`/`)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    userInfo() {
      this.$router.push(`/user/user_info`)
    },
    update() {
      this.$router.push(`/user/update`)
    },
    // 修改弹出框相关
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm(formName) {
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
    background: #409eff;
    margin-bottom: 20px;
    padding: 0 60px;
}
</style>
<style lang="scss" scoped>
.el-dropdown-menu {
  position: absolute;
  top: 43px!important;
  padding: 3px;
  text-align: center;
  width: 130px;
  overflow:visible;
}
.el-dropdown-menu__item {
  line-height: 30px!important;
}
</style>
