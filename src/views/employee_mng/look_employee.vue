<template>
  <div id="add_employee1" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row v-if="status == 2">
        <el-col :span="24">
          <div class="out_reason">
            审核未通过原因：{{ reason }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form ref="ruleForm" label-width="160px" :model="ruleForm" :rules="rules" disabled>
            <el-row id="zhqx1">
              <!-- <el-form-item label="新增人员" /> -->
              <span style="font-size: 20px;color: #3e8dff;">人员信息</span>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="上传头像">
                  <el-upload
                    class="avatar-uploader avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="(value)=>fnUploadProfilePicture(1,value)"
                  >
                    <img v-if="ruleForm.profilePicture" :src="ruleForm.profilePicture" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="人员编码" required>
                  <el-input v-model="ruleForm.code" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="登录账号" required prop="userName">
                  <el-input v-model="ruleForm.userName" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="9">
                <el-form-item label="密码" required prop="passWord">
                  <el-input v-model="ruleForm.passWord" />
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="9">
                <el-form-item label="姓" required prop="lastName">
                  <el-input v-model="ruleForm.lastName" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="名" required prop="firstName">
                  <el-input v-model="ruleForm.firstName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="性别" required prop="sex">
                  <el-radio v-model="ruleForm.sex" label="0" style="margin-left:20px;">男</el-radio>
                  <el-radio v-model="ruleForm.sex" label="1">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="身份证" required prop="identityCard">
                  <el-input v-model="ruleForm.identityCard" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="公安实名认证" prop="identityCardCertificationStatus">
                  <el-select v-model="ruleForm.identityCardCertificationStatus" disabled clearable>
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <!-- <el-input v-model="ruleForm.identityCardCertificationStatus" /> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="身份证正面照片">
                  <el-upload
                    class="avatar-uploader avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="(value)=>fnUploadProfilePicture(2,value)"
                  >
                    <img v-if="ruleForm.identityCardFrontPhoto" :src="ruleForm.identityCardFrontPhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="身份证背面照片">
                  <el-upload
                    class="avatar-uploader avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="(value)=>fnUploadProfilePicture(3,value)"
                  >
                    <img v-if="ruleForm.identityCardReversePhoto" :src="ruleForm.identityCardReversePhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="社保状态" required prop="socialSecurityStatus">
                  <el-select v-model="ruleForm.socialSecurityStatus" clearable>
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <!-- <el-input v-model="ruleForm.socialSecurityStatus" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="人员分类" required prop="type">
                  <el-select v-model="ruleForm.type" clearable>
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="资质证书类型" required prop="qualificationCertificateType">
                  <el-select v-model="ruleForm.qualificationCertificateType" clearable>
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="人员资质照片上传">
                  <el-upload
                    class="avatar-uploader avatar-uploader2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="(value)=>fnUploadProfilePicture(4,value)"
                  >
                    <img v-if="ruleForm.qualificationCertificatePhoto" :src="ruleForm.qualificationCertificatePhoto" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="所属机构" required prop="organizationId">
                  <el-select v-model="ruleForm.organizationId" clearable>
                    <el-option
                      v-for="item in orgOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="联系电话" required prop="phoneNumber">
                  <el-input v-model="ruleForm.phoneNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="联系地址" required prop="areaCode">
                  <el-row>
                    <el-col :span="4">
                      城市
                    </el-col>
                    <el-col :span="18">
                      <el-cascader
                        v-model="ruleForm.areaCode"
                        :options="szdOptions"
                        :props="optionProps"
                        separator="—"
                        style="width:100%"
                        @change="szdHandleChange"
                      />
                    </el-col>
                  </el-row>
                  <!-- <span style="display:inline-block;">城市</span>
                  <el-cascader
                    v-model="szdValue"
                    :options="szdOptions"
                    :props="optionProps"
                    separator="—"
                    style="width:266px;"
                    @change="szdHandleChange"
                  /> -->
                  <!-- <el-cascader :options="citys" clearable v-model="ruleForm.areaCode"/> -->
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="详细地址" prop="areaAddress">
                  <el-input v-model="ruleForm.areaAddress" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="银行户名">
                  <el-input v-model="ruleForm.bankAccountName" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="银行卡号">
                  <el-input v-model="ruleForm.bankCardNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="开户银行">
                  <el-input v-model="ruleForm.bankAccount" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row style="margin-top:20px;">
              <el-form-item>
                <el-button class="org_submit_btn" @click="close_add_employee">取消</el-button>
                <el-button type="primary" class="org_submit_btn" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-row> -->
          </el-form>
        </el-col>
      </el-row>
      <el-row id="zhqx1">
        <span style="font-size: 20px;color: #3e8dff;">操作历史</span>
      </el-row>
      <div style="padding:16px 60px;height:300px;box-sizing:border-box;">
        <!-- <div style="height:100%"> -->
        <el-table
          class="employee_table"
          :data="employee_history_table"
          element-loading-text="Loading"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
          height="250"
          border
          style="width: 100%"
          :show-header="true"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="operator"
            align="center"
            label="操作人"
          />
          <el-table-column
            prop="content"
            align="center"
            label="操作动作"
          />
          <el-table-column
            prop="createdUTC"
            align="center"
            label="操作时间"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm') }}</p>
              <p v-else>{{ scope.row.createdUTC }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="状态"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.status==0">待审核</p>
              <p v-else-if="scope.row.status==1">审核通过</p>
              <p v-else-if="scope.row.status==2">审核未通过</p>
              <p v-else>{{ scope.row.status }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row style="margin-top:10px;margin-left:100px;">
        <el-button class="org_submit_btn" size="medium" @click="close_add_employee">关闭</el-button>
        <!-- <el-button type="primary" class="org_submit_btn" @click="submitForm('ruleForm')">提交</el-button> -->
      </el-row>
    </div>
  </div>
</template>
<script>
import { staffAdd, staffInfo } from '@/api/nursingStaff'
import { offset } from '@/utils/offset'
import { orgSearch } from '@/api/organization'

export default {
  name: 'AddEmployee',
  data() {
    return {
      reason: '',
      status: '',
      offset: 8,
      employee_history_table: [],
      labelPosition: 'right',
      imageUrl: '',
      radio: '1',
      //   人员分类
      options1: [{
        value: '0',
        label: '护工'
      }, {
        value: '1',
        label: '护士'
      }, {
        value: '2',
        label: '医生'
      }],
      //   资格证书类型
      options2: [{
        value: '0',
        label: '护理资格证'
      }],
      //   社保状态
      options3: [{
        value: '0',
        label: '停缴'
      }, {
        value: '1',
        label: '未缴'
      }, {
        value: '2',
        label: '在缴'
      }],
      //   实名认证
      options4: [{
        value: '0',
        label: '未通过'
      }, {
        value: '1',
        label: '通过'
      }],
      //   所属机构
      // orgOptions: [{
      //   value: '6738f94f-e599-4a4a-ac1e-81bbb255a84b',
      //   label: '机构一'
      // }, {
      //   value: '6738f94f-e599-4a4a-ac1e-81bbb255a866',
      //   label: '机构二'
      // }],
      orgOptions: [],
      orgListCrrentPage: 1,
      value: '',
      ruleForm: {
        'userName': '',
        'passWord': '',
        'code': '',
        'profilePicture': '',
        'firstName': '',
        'lastName': '',
        'sex': '',
        'identityCard': '',
        'identityCardCertificationStatus': '',
        'identityCardFrontPhoto': '',
        'identityCardReversePhoto': '',
        'socialSecurityStatus': '',
        'type': '',
        'qualificationCertificateType': '',
        'qualificationCertificatePhoto': '',
        'organizationId': '',
        'organizationName': '',
        'phoneNumber': '',
        'areaCode': [],
        'areaName': '',
        'areaAddress': '',
        'bankAccountName': '',
        'bankCardNumber': '',
        'bankAccount': '',
        'email': ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码应为字母+数字，长度为 6 - 20位' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        identityCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证格式' }
        ],
        // identityCardCertificationStatus: [
        //   { required: true, message: '请选择公安实名认证', trigger: 'change' }
        // ],
        socialSecurityStatus: [
          { required: true, message: '请选择社保状态', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择人员分类', trigger: 'change' }
        ],
        qualificationCertificateType: [
          { required: true, message: '请选择资质证书类型', trigger: 'change' }
        ],
        organizationId: [
          { required: true, message: '请选择所属机构', trigger: 'change' }
        ],
        phoneNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确格式的手机号' }
        ],
        areaCode: [
          { type: 'array', required: true, message: '请选择联系地址', trigger: 'change' }
        ],
        areaAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      //
      // 所在地
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'children'
      },
      szdOptions: [
      ]
    }
  },
  created() {
    this._getAreaJson()
    this.getStaffInfo()
    this.offset = offset()
    this.getOrgList()
  },
  methods: {
    getOrgList() {
      orgSearch({ 'numberPerPage': 30, 'currentPage': this.orgListCrrentPage, 'sortList': [{ 'columnName': 'Id', 'sortOrder': 1 }] }).then(res => {
        if (res) {
          var newList = res.data.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.$nextTick(function() {
            this.orgOptions = this.orgOptions.concat(newList)
          })
        }
      })
    },
    // 获取信息
    getStaffInfo() {
      staffInfo(this.$route.query.id).then(res => {
        if (res) {
          var obj1 = []
          var obj2 = []
          if (res.areaName && res.areaCode) {
            var areaNameArray = res.areaName.split('-')
            var areaCodeArray = res.areaCode.split(',')
            obj1 = [
              {
                code: areaCodeArray[0],
                name: areaNameArray[0]
              },
              {
                code: areaCodeArray[1],
                name: areaNameArray[1]
              },
              {
                code: areaCodeArray[2],
                name: areaNameArray[2]
              }
            ]
            obj2 = [areaCodeArray[0], areaCodeArray[1], areaCodeArray[2]]
          }
          this.ruleForm = {
            'userName': res.userName,
            // 'passWord': '123456ff',
            'code': res.code,
            'profilePicture': res.profilePicture,
            'firstName': res.firstName,
            'lastName': res.lastName,
            'sex': res.sex + '',
            'identityCard': res.identityCard,
            'identityCardCertificationStatus': res.identityCardCertificationStatus + '',
            'identityCardFrontPhoto': res.identityCardFrontPhoto,
            'identityCardReversePhoto': res.identityCardReversePhoto,
            'socialSecurityStatus': res.socialSecurityStatus + '',
            'type': res.type + '',
            'qualificationCertificateType': res.qualificationCertificateType + '',
            'qualificationCertificatePhoto': res.qualificationCertificatePhoto,
            'organizationId': res.organizationId,
            'organizationName': res.organizationName,
            'phoneNumber': res.phoneNumber,
            'areaCode': obj2,
            'areaName': obj1,
            'areaAddress': res.areaAddress,
            'bankAccountName': res.bankAccountName,
            'bankCardNumber': res.bankCardNumber,
            'bankAccount': res.bankAccount,
            'email': res.email
          }
          this.reason = res.refusalOfReason
          this.status = res.status
          if (res.staffLogs) {
            this.employee_history_table = res.staffLogs
          }
          this.$nextTick(function() {
            this.$refs.ruleForm.clearValidate()
          })
          //   this.ruleForm = res
          // console.log(res)
        }
      })
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
      const fileNames = `nursingStaff/${this.$moment().format('YYYYMMDD')}/${fileName}_${date}${suffix}`
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
            this.ruleForm.profilePicture = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          } else if (type == 2) {
            this.ruleForm.identityCardFrontPhoto = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          } else if (type == 3) {
            this.ruleForm.identityCardReversePhoto = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          } else if (type == 4) {
            this.ruleForm.qualificationCertificatePhoto = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
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
    _getAreaJson() {
      // const data=require('@/assets/data/pca-code.json')
      this.$axios.get(`${process.env.BASE_URL}data/pca-code.json`).then(res => {
        // console.log(res)
        this.szdOptions = res.data
      })
    },
    // 获取级联选择器的label值
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.code == value) { opt = itm.children; return itm }
        }
        return null
      })
    },
    // 省市区选择
    szdHandleChange(value) {
      this.ruleForm.areaName = this.getCascaderObj(value, this.szdOptions)

    //   console.log(value,this.ruleForm.areaName)
    },
    submitForm(formName) {
      // organizationId有验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var makeCode = 60 + this.$moment().format('YYYYMMDDHHmmss') + Math.random().toString(36).substr(2, 4)
          this.ruleForm.code = makeCode
          this.ruleForm.areaCode = this.ruleForm.areaCode.join(',')
          this.ruleForm.areaName = this.ruleForm.areaName.map(item => { return item.name }).join('-')
          this.ruleForm.organizationName = this.orgOptions.map(item => { if (item.value == this.ruleForm.organizationId) { return item.label } }).join('')
          staffAdd(this.ruleForm).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push({ path: `/employee_mng/care_employee/all_employee` })
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
    },
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
    close_add_employee() {
      this.$router.push('/employee_mng/care_employee/all_employee')
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;'
    }
  }
}
</script>
<style lang="scss" scoped>
.out_reason{
    width: 80%;
    height: 30px;
    background-color: #f2f2f2;
    margin:15px auto;
    border-radius: 5px;
    border:1px solid #ccc;
    font-size: 14px;
    line-height: 30px;
    text-indent:30px;
    color: #b90000;
}
span {
  font-size: 16px;
  color: #666666;
  font-weight: 400;
  font-style: normal;
}
</style>
<style lang="scss">
#add_employee1 .el-tabs__content{
  height: 96%;
}
#add_employee1 .el-select .el-input {
  width: 100%;
}
#add_employee1 .el-form-item__content .el-input__inner{
  width: 100%;
}
#add_employee1 .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
// #add_employee .el-table__header-wrapper{
//   display: none;
// }
#add_employee1 .el-select{
  width: 100%;
}
#add_employee1 #zhqx .el-form-item__label,#zhqx1 .el-form-item__label{
  margin: 20px 0px;
  font-size: 20px;
  color:rgb(62, 141, 255);
}
#add_employee1 #zhqx .el-form-item,#zhqx1 .el-form-item{
  margin-bottom: 0px;
}
</style>
