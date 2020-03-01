<template>
  <div id="add_community">
    <div class="add_community_tit">
      <h4>
        新增社区
      </h4>
    </div>
    <div class="add_community_input">
      <el-form ref="ruleForm" label-width="160px" :rules="rules" :model="ruleForm">
        <el-row style="display:none;">
          <el-col :span="24">
            <el-form-item label="社区编号" required>
              <el-input v-model="ruleForm.code" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="社区名称" required prop="writeName">
              <el-input v-model="ruleForm.writeName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="社区地址" required prop="communityName">
              <el-input id="keyword" v-model="ruleForm.communityName" placeholder="请输入社区名称" name="keyword" />
              <div id="container" />
              <p v-show="mapShow">
                <span>经度：{{ longitude }}</span>
                <span style="margin-left:20px;">纬度：{{ latitude }}</span>
              </p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传头像" prop="imageUrl">
              <el-upload
                class="avatar-uploader avatar-uploader2"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="getImageSuccess1"
                :before-upload="beforeAvatarUpload1"
                :http-request="fnUploadRequest1"
              >
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属城市" required prop="city">
              <el-select v-model="ruleForm.city" clearable @change="formCity">
                <el-option
                  v-for="item in isCity"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="社区街道/镇" required>
              <el-select v-model="ruleForm.community" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row style="display:flex">
          <el-form-item label="社区群主" required prop="groupLeaderFullName">
            <el-input v-model="ruleForm.groupLeaderFullName" style="width:220px;" />
            <el-button @click="groupLeaderFullName">点击选择</el-button>
          </el-form-item>
          <el-form-item label="社区助理" required prop="assistantFullName">
            <el-input v-model="ruleForm.assistantFullName" style="width:220px;" />
            <el-button @click="assistantFullName">点击选择</el-button>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态" required>
              <el-radio v-model="ruleForm.radio" label="1" style="margin-left:20px;">有效</el-radio>
              <el-radio v-model="ruleForm.radio" label="2">无效</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="community_submit" style="margin-left:100px;">
          <el-button class="community_submit_btn" @click="close_add_employee">取消</el-button>
          <el-button type="primary" class="community_submit_btn" :plain="true" @click="add_community('ruleForm')">确定</el-button>
        </div>
      </el-form>
    </div>
    <div>
      <el-dialog title="社区群主" :visible.sync="dialogFormVisible" width="500px">
        <el-form>
          <el-form-item label class="searchFormItem">
            <el-input v-model.trim="input" placeholder="请输入内容" class="input-with-select" style="width:90%;margin-left:22px;">
              <el-select slot="prepend" v-model="select" placeholder="请输入内容" style="width:110px;">
                <el-option label="用户名" value="IsInBlacklist" />
                <el-option label="姓名" value="FullName" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getFilter" />
            </el-input>
          </el-form-item>
          <div class="dialog_list">
            <ul class="dialog_list2">
              <li v-for="(item,index) in list_dialog" :key="index" class="list_dialog" @click="click_list(item)">
                <span>用户名：{{ item.user }}</span>
                <span>姓名：{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="get_user_name">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="社区助手" :visible.sync="dialogFormVisible2" width="500px">
        <el-form>
          <el-form-item label class="searchFormItem">
            <el-input v-model.trim="input" placeholder="请输入内容" class="input-with-select" style="width:90%;margin-left:22px;">
              <el-select slot="prepend" v-model="select" placeholder="请输入内容" style="width:110px;">
                <el-option label="用户名" value="IsInBlacklist" />
                <el-option label="姓名" value="FullName" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="getFilter" />
            </el-input>
          </el-form-item>
          <div class="dialog_list">
            <ul class="dialog_list2">
              <li v-for="(item,index) in list_dialog" :key="index" class="list_dialog" @click="click_list2(item)">
                <span>用户名：{{ item.user }}</span>
                <span>姓名：{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="get_user_name2">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addCommunity } from '@/api/community'
import { allUser } from '@/api/auth'
import { searchCity } from '@/api/city'
export default {
  name: 'AddCommunity',
  data() {
    var picInfoValidate1 = (rule, value, callback) => {
      if (this.ruleForm.imageUrl !== '') {
        callback()
      } else {
        return callback(new Error('请上传图片'))
      }
    }
    var serve_city2 = (rule, value, callback) => {
      if (this.ruleForm.city === '') {
        callback(new Error('请选择城市'))
      } else {
        callback()
      }
    }
    return {
      select: 'IsInBlacklist',
      input: '',
      isCity: [],
      ruleForm: {
        code: '',
        id: '',
        communityName: '',
        groupLeaderUserName: '',
        groupLeaderFullName: '',
        assistantUserName: '',
        assistantFullName: '',
        groupLeaderUserId: '',
        assistantUserId: '',
        radio: '1',
        housing: '',
        city: '',
        areaCode: '',
        community: '',
        writeName: '',
        imageUrl: ''
      },
      city: '',
      address_detail: null, // 详细地址
      add_housing_list: [],
      userlocation: { lng: '', lat: '' },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      list_dialog: [],
      mapShow: false,
      longitude: null,
      latitude: null,
      map: null,
      rules: {
        writeName: [{ required: true, message: '请输入社区名称', trigger: 'blur' }],
        communityName: [{ required: true, message: '请输入社区地址', trigger: 'blur' }],
        imageUrl: [{ required: true, validator: picInfoValidate1, trigger: 'change' }],
        city: [{ required: true, validator: serve_city2, trigger: 'change' }],
        groupLeaderFullName: [{ required: true, message: '请选择社区群主', trigger: 'blur' }],
        assistantFullName: [{ required: true, message: '请选择社区助手', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getcity()
    this.fetchCity()
    this.fetchUser()
  },
  methods: {
    // 城市管理接口
    fetchCity() {
      var data = {
        'filters': [
          {
            'key': 'CityLevel',
            'value': '1'
          }
        ],
        'numberPerPage': 200,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 0
          }
        ]
      }
      searchCity(data).then(res => {
        // console.log('我是拉取城市列表', res.data)
        var arrCity = []
        for (var i = 0; i < res.data.length; i++) {
          arrCity.push({ value: res.data[i].cityCode, label: res.data[i].name },)
        }
        this.isCity = arrCity
        // console.log('我是城市列表', this.isCity)
      })
    },
    // 点击城市
    formCity(item) {
      // console.log(item)
      this.ruleForm.city = item.label
      this.ruleForm.areaCode = item.value
    },
    // 获取用户
    fetchUser() {
      var data = {
        'numberPerPage': 1000,
        'currentPage': 1,
        'filters': [
          {
            'key': 'HasAuthentication', // 实名认证过滤
            'filterType': 0,
            'value': 'true'
          }
        ]
      }
      allUser(data).then(res => {
        console.log('用户列表', res.data)
        for (var i = 0; i < res.data.length; i++) {
          this.list_dialog.push({ user: res.data[i].userName,
            name: res.data[i].userProfile.lastName + res.data[i].userProfile.firstName,
            userId: res.data[i].userProfile.userId },)
        }
      })
    },
    // 筛选用户  判断用户点击输入
    getFilter() {
      var data = null
      // console.log('我是select',this.select,'我是input',this.input)
      if (this.input == '' && this.select == 'FullName') {
        data = {
          'numberPerPage': 1000,
          'currentPage': 1
        }
      }
      if (this.input == '' && this.select == 'IsInBlacklist') {
        data = {
          'numberPerPage': 1000,
          'currentPage': 1
        }
      } if (this.input !== '' && this.select == 'FullName') {
        data = {
          'numberPerPage': 1000,
          'currentPage': 1,
          'filters': [
            {
              'key': 'FullName',
              'value': this.input
            }
          ]
        }
      } if (this.input !== '' && this.select == 'IsInBlacklist') {
        data = {
          'numberPerPage': 10,
          'currentPage': 1,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ],
          'filters': [
            {
              'key': 'IsInBlacklist',
              'value': 'false'
            }
          ],
          'userName': this.input
        }
      }
      allUser(data).then(res => {
        // console.log('用户', res.data)
        // console.log('我是data',data)
        this.list_dialog = [] // 每次请求将原来用户列表清空
        for (var i = 0; i < res.data.length; i++) {
          this.list_dialog.push({ user: res.data[i].userName,
            name: res.data[i].userProfile.lastName + res.data[i].userProfile.firstName,
            userId: res.data[i].userProfile.userId },)
        }
      })
    },
    // 添加社区
    add_community(formName) {
      // console.log(this.ruleForm.groupLeaderUserId)
      // console.log(this.ruleForm.groupLeaderUserName)
      // console.log(this.ruleForm.groupLeaderFullName)
      // console.log(this.ruleForm.assistantUserId)
      // console.log(this.ruleForm.assistantUserName)
      // console.log(this.ruleForm.assistantFullName)
      // console.log(this.ruleForm.city)
      if (this.ruleForm.groupLeaderUserId == this.ruleForm.assistantUserId) {
        this.$message({
          message: '群主和助手不能为同一人',
          type: 'warning'
        })
      } if (this.longitude == null || this.latitude == null) {
        this.$message({
          message: '请下拉选择社区地址',
          type: 'warning'
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            alert('请填写表单内容')
            return false
          } else {
            const list = []
            let isActived
            if (this.ruleForm.radio == '1') {
              isActived = true
            } else if (this.ruleForm.radio == '2') {
              isActived = false
            }
            var data = {
              'data': {
                'code': '40201910011232541234', // 社区编号
                'name': this.ruleForm.writeName, // 社区名称
                'profilePicture': this.ruleForm.imageUrl, // 头像
                'areaCode': this.ruleForm.areaCode, // 城市编号
                'areaAddress': this.ruleForm.city, // 城市
                'streetOrTownCode': '0002',
                'streetOrTownAddress': '街道地址',
                'residentialAreas': [
                  {
                    'name': '小区添加测试',
                    'address': '详细地址',
                    'id': null
                  }
                ],
                'isActived': isActived, // 是否启用 默认 启用
                'groupLeaderUserId': this.ruleForm.groupLeaderUserId,
                'groupLeaderUserName': this.ruleForm.groupLeaderUserName,
                'groupLeaderFullName': this.ruleForm.groupLeaderFullName,
                'assistantUserId': this.ruleForm.assistantUserId,
                'assistantUserName': this.ruleForm.assistantUserName,
                'assistantFullName': this.ruleForm.assistantFullName,
                'longitude': this.longitude,
                'latitude': this.latitude,
                'id': this.$route.query.id
              },
              'correlationId': '7869889d-efcd-4ed4-bd55-31fa837aa278',
              'invokingUser': '07ed2085-052c-47af-b3a7-b5f3d9ab6550',
              'businessProcessName': 'CommunityCreateService'
            }
            addCommunity(data).then(res => {
              console.log('添加社区', res)
              this.$router.push('/community/community_list/list')
            })
          }
        })
      }
    },
    // 坐标
    getcity() {
      var th = this
      var windowsArr = []
      var marker = []
      var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [120.211877, 30.255194], // 地图中心点
        zoom: 13, // 地图显示的缩放级别
        keyboardEnable: false
      })
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        var autoOptions = {
          city: '杭州', // 城市，默认全国
          input: 'keyword'// 使用联想输入的input的id
        }
        var autocomplete = new AMap.Autocomplete(autoOptions)
        var placeSearch = new AMap.PlaceSearch({
          city: '杭州',
          map: map
        })
        AMap.event.addListener(autocomplete, 'select', function(e) {
          // TODO 针对选中的poi实现自己的功能
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name)
          th.mapShow = true
          th.longitude = e.poi.location.lng
          th.latitude = e.poi.location.lat
          // console.log('经度',e.poi.location.lng)
          // console.log('纬度',e.poi.location.lat)
        })
      })
    },

    // 图片上传
    // 上传前
    beforeAvatarUpload1(file) {
      var file = file
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
        return false
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
        return false
      }
      const isSize = new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
          if (this.width % 100 != 0 || this.height % 100 != 0) {
            reject()
          } else {
            resolve()
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$message.error('上传图片大小规格比例应为100*100!')
        return Promise.reject()
      })
      return isSize
    },
    // 点击上传事件
    fnUploadRequest1(option) {
      var file = option.file
      const that = this

      var OSS = require('ali-oss')
      var client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIbqxBSqfHEmbk',
        accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
        bucket: 'ecare-test' })
      const files = option.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`
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
        console.info('之前', val.name)
        if (val.res.statusCode === 200) {
          this.ruleForm.imageUrl = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          console.log('之后', val)
          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    // 上传成功
    getImageSuccess1: function(res, file) {
      console.log('我是上传成功的file', res)
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
    },
    // 弹窗
    groupLeaderFullName() {
      this.dialogFormVisible = true
    },
    assistantFullName() {
      this.dialogFormVisible2 = true
    },
    // 点击用户列表 获取当前用户名姓名和id
    click_list(item) {
      // console.log(item.name)
      this.input = item.user + ' ' + item.name
      this.ruleForm.groupLeaderFullName = item.name
      this.ruleForm.groupLeaderUserName = item.user
      this.ruleForm.groupLeaderUserId = item.userId
    },
    click_list2(item) {
      this.input = item.user + ' ' + item.name
      this.ruleForm.assistantFullName = item.name
      this.ruleForm.assistantUserId = item.userId
      this.ruleForm.assistantUserName = item.user
    },
    // 用户列表弹窗确定
    get_user_name() {
      this.dialogFormVisible = false
      this.input = ''
    },
    get_user_name2() {
      this.dialogFormVisible2 = false
      this.input = ''
    },
    // 关闭
    close_add_employee() {
      this.$router.push('/community/community_list/list')
    }
  }
}
</script>
<style scoped>
.add_community_tit h4{
  width: 128px;
  color:#409EFF;
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.add_community_input{
  padding-left: 67px;
}
.el-input{
  width: 800px;
 }
 .housing_input .el-input{
  width: 730px;
 }
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader2 .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader2 .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-upload{
  border: 1px dashed #d9d9d9 !important;
}
.delete_button{
  color: #409EFF;
  text-decoration: underline;
  border:none;
  background:#fff;
  cursor: pointer;
}
.community_select .el-input{
  width: 320px;
}
.community_submit_btn{
  width: 100px;
  font-size: 18px;
}
.community_submit{
  padding: 30px;
}
.community_submit .el-button+.el-button{
  margin-left: 80px;
}
.dialog_list{
  width: 90%;
  height: 300px;
  border: 1px solid #ccc;
  margin:auto;
  overflow-y: auto;
  overflow-x: scroll;
}
.list_dialog{
  list-style: none;
  height: 45px;
  border-bottom: 1px solid #ccc;
  line-height: 45px;
}
.list_dialog:hover{
  background: #409EFF;
  color: #fff;
  cursor: pointer;
}
.list_dialog span{
  margin-left:30px;
}
/* 地图相关 */
#container{
    width: 400px;
    height: 400px;
    display: none;
}
.auto-item .auto-item-span{
    white-space: nowrap;
    font-size: 16px;
    cursor: pointer;
    padding: 9px !important;
}
</style>

