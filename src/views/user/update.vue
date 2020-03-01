<template>
  <div id="userInfo" style="height:100%;">
    <div style="padding:0px 20px;height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <span style="margin:20px 0px;display:block;font-size:20px;color:rgb(62, 141, 255);">修改密码</span>
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="输入原密码" prop="oldPassword">
              <el-input v-model.trim="form.oldPassword" />
            </el-form-item>
            <el-form-item label="输入新密码" prop="password">
              <el-input v-model.trim="form.password" />
            </el-form-item>
            <el-form-item label="重复新密码" prop="repassword">
              <el-input v-model.trim="form.repassword" />
            </el-form-item>
            <el-form-item>
              <el-button size="medium" @click="cancel">取消</el-button>
              <el-button size="medium" type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { putPassword } from '@/api/login'
import { Debounce } from '@/utils/public'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空!'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        password: '',
        repassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '原始密码应为字母+数字，长度为 6 - 20位' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码为字母+数字，长度为 6 - 20位' }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ path: `/index` })
    },
    onSubmit: Debounce(function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = {
            'id': JSON.parse(window.localStorage.getItem('userInfo')).user.id,
            'currentPassword': this.form.oldPassword,
            'newPassword': this.form.password
          }
          putPassword(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              setTimeout(() => {
                this.$router.push({ path: `/index` })
              }, 500)
            } else {
              this.$message.warning('修改失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, 500)
  }
}
</script>
