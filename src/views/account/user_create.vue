<template>
  <div id="rolePermission" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" label-width="120px" :model="form" :rules="rules">
            <el-row id="zhqx1">
              <el-form-item label="用户注册" />
            </el-row>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="用户名" prop="phone">
                  <el-input v-model.trim="form.phone" placeholder="请输入手机号" />
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="用户名" prop="account">
                  <el-input v-model.trim="form.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" style="width:100%;" placeholder="请输入密码" />
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row style="display:none;">
              <el-col :span="8">
                <el-form-item label="用户名" required>
                  <el-input v-model="form.userName" style="width:100%;" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="display:none;">
              <el-col :span="8">
                <el-form-item label="" style="margin-bottom:2px;">
                  <el-row>
                    <el-col :span="7">
                      <div style="width:100%;background:#eee;height:30px;text-align:center;line-height:30px;">弱</div>
                    </el-col>
                    <el-col :span="0.5">
                      &nbsp;
                    </el-col>
                    <el-col :span="7">
                      <div style="width:100%;background:#eee;height:30px;text-align:center;line-height:30px;">中</div>
                    </el-col>
                    <el-col :span="0.5">
                      &nbsp;
                    </el-col>
                    <el-col :span="7">
                      <div style="width:100%;background:#eee;height:30px;text-align:center;line-height:30px;">强</div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="确认密码" prop="repassword">
                  <el-input v-model="form.repassword" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓" prop="lastName">
                  <el-input v-model="form.lastName" style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="名" prop="firstName">
                  <el-input v-model="form.firstName" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="性别" prop="gender">
                  <el-radio v-model="form.gender" :label="false">男</el-radio>
                  <el-radio v-model="form.gender" :label="true">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="身份证" prop="idCardNumber">
                  <el-input v-model="form.idCardNumber" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机" prop="phoneNumber">
                  <el-input v-model.trim="form.phoneNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="身份证正面照片">
                  <el-upload
                    class="avatar-uploader avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="(value)=>fnUploadProfilePicture(1,value)"
                  >
                    <img v-if="form.idCardFrontPhoto" :src="form.idCardFrontPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份证反面照片">
                  <el-upload
                    class="avatar-uploader avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="(value)=>fnUploadProfilePicture(2,value)"
                  >
                    <img v-if="form.idCardBackPhoto" :src="form.idCardBackPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所在地">
                  <el-cascader
                    v-model="form.locationId"
                    style="width:100%;"
                    :options="szdOptions"
                    :props="optionProps"
                    separator="—"
                    @change="szdHandleChange"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="地址">
                  <el-input v-model="form.address" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="长护参保状态">
                  <el-select v-model="sbStatus" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="民政参保状态">
                  <el-select v-model="sbStatus" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="残联参保状态">
                  <el-select v-model="sbStatus" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="健委参保状态">
                  <el-select v-model="sbStatus" placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-form-item>
                <el-button size="medium" @click="cancelSubmit">取消</el-button>
                <el-button type="primary" size="medium" @click="onSubmit">提交</el-button>
              </el-form-item>
            </el-row>

          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { appUserAdd } from '@/api/auth'
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
      sbStatus: '',
      options: [{
        value: '0',
        label: '停缴'
      }, {
        value: '1',
        label: '未缴'
      }, {
        value: '2',
        label: '在缴'
      }],
      form: {
        phoneNumber: '',
        password: '',
        repassword: '',
        userName: '',
        firstName: '',
        lastName: '',
        gender: '',
        idCardNumber: '',
        address: '',
        locationId: [],
        location: [],
        idCardFrontPhoto: '',
        idCardBackPhoto: ''
      },
      rules: {
        phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确格式的手机号' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码为字母+数字，长度为 6 - 20位' }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        idCardNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证格式' }
        ]
      },
      value: '1',
      // 所在地
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'children'
      },
      szdOptions: []
    }
  },
  created() {
    this._getAreaJson()
  },
  methods: {
    _getAreaJson() {
      // const data=require('@/assets/data/pca-code.json')
      this.$axios.get(`${process.env.BASE_URL}data/pca-code.json`).then(res => {
        console.log(res)
        this.szdOptions = res.data
      })
    },
    cancelSubmit() {
      this.$router.push('/account/user_mng')
    },
    onSubmit: Debounce(function() {
      // console.log(this.form)
      var makeCode = 60 + this.$moment().format('YYYYMMDDHHmmss') + Math.random().toString(36).substr(2, 4)
      this.form.userName = makeCode
      this.$refs.form.validate((valid) => {
        if (valid) {
          // var myLocationId = Array.isArray(this.form.location) ? this.form.location.map(item => { return item.code }).join(',') : ''
          var myLocation = this.form.location
          var trueOrfalse = Array.isArray(myLocation) && myLocation.length
          var obj = {
            'accountType': 1,
            'password': this.form.password,
            'phoneNumber': this.form.phoneNumber,
            'userName': this.form.userName,
            'userProfile': {
              'userId': '00000000-0000-0000-0000-000000000000',
              'status': 0,
              'firstName': this.form.firstName,
              'lastName': this.form.lastName,
              'weChat': '',
              'qq': '',
              'nickname': '',
              'gender': this.form.gender,
              'idCardNumber': this.form.idCardNumber,
              'idCardFrontPhoto': this.form.idCardFrontPhoto,
              'idCardBackPhoto': this.form.idCardBackPhoto,
              'provinceCode': trueOrfalse ? myLocation[0].code : '',
              'provinceName': trueOrfalse ? myLocation[0].name : '',
              'cityCode': trueOrfalse ? myLocation[1].code : '',
              'cityName': trueOrfalse ? myLocation[1].name : '',
              'districtCode': trueOrfalse ? myLocation[2].code : '',
              'districtName': trueOrfalse ? myLocation[2].name : '',
              'address': this.form.address,
              'isInBlacklist': false,
              'blacklistReason': '',
              'hasAuthentication': false,
              'aliPay': '',
              'blog': '',
              'headPortrait': '',
              'id': null
            }
          }
          appUserAdd(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push({ path: `/account/user_mng` })
            } else {
              // this.$message.warning('添加失败')
              // console.log('88888',res.response.data.error)
            }
          })
        } else {
          this.$message.warning('请正确填写表单')
          return false
        }
      })
    }, 500),
    handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
    // //   const isJPG = file.type === 'image/jpeg'
    //   const isLt3M = file.size / 1024 / 1024 < 3

    // //   if (!isJPG) {
    // //     this.$message.error('上传头像图片只能是 JPG 格式!')
    // //   }
    //   if (!isLt3M) {
    //     this.$message.error('上传头像图片大小不能超过 3MB!')
    //   }
    //   return isLt3M
    },
    // 上传头像
    fnUploadProfilePicture(type, option) {
    //   console.log(type,option)
      var file = option.file
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
        return
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
        return
      }

      var OSS = require('ali-oss')
      var client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIbqxBSqfHEmbk',
        accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
        bucket: 'ecare-test' }
      )
      const files = option.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      const fileNames = `AppUser/${this.$moment().format('YYYYMMDD')}/${fileName}_${date}${suffix}`
      client.multipartUpload(fileNames, option.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          // console.log('Progress: ' + p)
          option.onProgress(e)
          // console.log(e.percent)
          // 显示上传进度条
          // this.videoFlag = true
          // this.videoUploadPercent = e.percent
        }
      }).then((val) => {
        if (val.res.statusCode === 200) {
          // this.videoFlag = false
          // this.videoUploadPercent = 0
          // // this.videoForm.videoUploadId = res.data.uploadId
          // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
          // option.onSuccess(val)
          if (type == 1) {
            this.form.idCardFrontPhoto = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          } else if (type == 2) {
            this.form.idCardBackPhoto = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          }
          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    // 省市区选择
    // 省市区选择
    szdHandleChange(value) {
      this.form.location = this.getCascaderObj(value, this.szdOptions)

    //   console.log(value,this.ruleForm.areaName)
    },
    // 获取级联选择器的label值
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.code == value) { opt = itm.children; return itm }
        }
        return null
      })
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  font-size: 16px;
  color: #666666;
  font-weight: 400;
  font-style: normal;
}
</style>
<style lang="scss">
#staffMng #rolePermission .el-tabs__content{
  height: 96%;
}
#staffMng #rolePermission .el-select .el-input {
  width: 100%;
}
#staffMng #rolePermission .el-form-item__content .el-input__inner{
  width: 100%;
}
#staffMng #rolePermission .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#rolePermission .el-table__header-wrapper{
  display: none;
}
#rolePermission .el-select{
  width: 100%;
}
#rolePermission #zhqx .el-form-item__label,#zhqx1 .el-form-item__label{
  margin: 20px 0px;
  font-size: 20px;
  color:rgb(62, 141, 255);
}
#rolePermission #zhqx .el-form-item,#zhqx1 .el-form-item{
  margin-bottom: 0px;
}
</style>
<style>
#rolePermission .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
#rolePermission .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
#rolePermission .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
#rolePermission .avatar {
    width: 100%;
    height: 120px;
    display: block;
  }
</style>
