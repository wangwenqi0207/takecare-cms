<template>
  <div id="scrollBox" class="add_org" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" :sticky-top="130">
      <div class="add_org_nav">
        <div class="add_org_nav_left">
          <p class="tabItem  tab_active" @click="returnToView('baseView1',$event)">基础信息</p>
          <p class="tabItem" @click="returnToView('baseView2',$event)">机构介绍</p>
          <p class="tabItem" @click="returnToView('baseView3',$event)">收费标准</p>
        </div>
        <!-- <div class="add_org_nav_right">
          <el-checkbox v-model="promitLicense" class="add_org_nav_right_checkbox" />
          <p>立即启用</p>
        </div> -->
      </div>
    </sticky>
    <el-form
      ref="ruleForm"
      label-width="160px"
      :rules="rules"
      :model="ruleForm"
    >
      <div id="Base" class="base_info baseView baseView1">
        <div class="base_info_tit">
          <p>基础信息</p>
        </div>
        <div class="base_info_main">
          <div class="base_info_main_one">
            <el-form-item label="机构编码" required prop="organizationCode">
              <el-input v-model="ruleForm.organizationCode" disabled />
            </el-form-item>
            <el-form-item label="机构名称" required prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="服务城市" required prop="city">
              <el-select v-model="ruleForm.city" clearable filterable placeholder="请选择" style="margin-right: 209px;">
                <el-option
                  v-for="(item,index) in serve_city"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="主管部门" required prop="competentAuthority">
              <el-input v-model="ruleForm.competentAuthority" />
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="统一社会信用代码" required prop="unifiedSocialCreditCode">
              <el-input v-model="ruleForm.unifiedSocialCreditCode" />
            </el-form-item>
            <el-form-item label="上传营业执照图片" required prop="tradingCertificate">
              <el-upload
                class="avatar-uploader avatar-uploader1"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="getImageSuccess1"
                :before-upload="beforeAvatarUpload1"
                :http-request="fnUploadRequest1"
              >
                <img v-if="ruleForm.tradingCertificate" :src="ruleForm.tradingCertificate" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="上传营业执照图片" style="display:none;">
              <el-upload
                id="testIMG"
                class="avatar-uploader avatar-uploader1"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="getImageSuccessTest"
                :before-upload="beforeAvatarUploadTest"
                :http-request="fnUploadRequestTest"
              >
                <!-- <img v-if="ruleForm.tradingCertificate" :src="ruleForm.tradingCertificate" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="上传营业执照图片" style="display:none;">
              <el-upload
                id="testTWIMG"
                class="avatar-uploader avatar-uploader1"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="getImageSuccessTWTest"
                :before-upload="beforeAvatarUploadTWTest"
                :http-request="fnUploadRequestTWTest"
              >
                <!-- <img v-if="ruleForm.tradingCertificate" :src="ruleForm.tradingCertificate" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
              </el-upload>
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="机构地址" required prop="address">
              <el-input v-model="ruleForm.address" style="width:820px;" class="org_addr" />
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="法定代表人" required prop="legalRepresentative">
              <el-input v-model="ruleForm.legalRepresentative" />
            </el-form-item>
            <el-form-item label="法人联系电话" required prop="legalRepresentativePhoneNumber">
              <el-input v-model="ruleForm.legalRepresentativePhoneNumber" />
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="专管员" required prop="manager">
              <el-input v-model="ruleForm.manager" />
            </el-form-item>
            <el-form-item label="专管员电话" required prop="managerPhoneNumber">
              <el-input v-model="ruleForm.managerPhoneNumber" />
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="银行户名" required prop="bankAccount">
              <el-input v-model="ruleForm.bankAccount" />
            </el-form-item>
            <el-form-item label="银行卡号" required prop="cardNumber">
              <el-input v-model="ruleForm.cardNumber" />
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="开户银行" required prop="depositBank">
              <el-input v-model="ruleForm.depositBank" />
            </el-form-item>
            <el-form-item label="邮箱" required prop="email">
              <el-input v-model="ruleForm.email" />
            </el-form-item>
          </div>
        </div>
      </div>
      <div id="Intro" class="org_intro baseView baseView2">
        <div class="base_info_tit">
          <p>机构介绍</p>
        </div>
        <div style="height:176px;padding-left:67px;margin-bottom:10px;">
          <div style="display:flex">
            <!-- <el-form-item label="图片" required prop="picInfo"> -->
            <el-form-item label="缩略图" required prop="listPicture">
              <span style="margin-left:29px;">图片单张图片大小不能超过3M，图片规格700*700</span>
              <div class="click_upimg">
                <my-upload v-model="show" field="img" :width="140" :height="100" img-format="png" :size="size" @src-file-set="srcFileSet" @crop-success="cropSuccess" />
                <div class="avatar-uploader avatar-uploader2" style="cursor:pointer" @click="changeListPicture">
                  <img v-if="ruleForm.listPicture" :src="ruleForm.listPicture" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </div>
                <!-- <el-upload
                  class="avatar-uploader avatar-uploader2"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="getImageSuccess3"
                  :before-upload="beforeAvatarUpload3"
                  :http-request="fnUploadRequest3"
                >
                  <img v-if="ruleForm.listPicture" :src="ruleForm.listPicture" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload> -->
              </div>
            </el-form-item>
          </div>
        </div>
        <div style="height:176px;padding-left:67px;margin-bottom:10px;">
          <div style="display:flex">
            <el-form-item label="详情页图片" prop="picInfo">
              <!-- <el-form-item label="详情页图片" required> -->
              <span style="margin-left:29px;">图片单张图片大小不能超过3M，图片规格700*700</span>
              <div class="click_upimg">
                <div v-for="(item,index) in ruleForm.Imglist" :key="index">
                  <div @click="getImageTypeIndex(index)">
                    <el-upload
                      class="avatar-uploader avatar-uploader2"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-success="getImageSuccess2"
                      :before-upload="beforeAvatarUpload2"
                      :show-file-list="false"
                      :file-list="item.file"
                      :http-request="fnUploadRequest2"
                    >
                      <i v-if="index==0" style="position:absolute;top:0;left:0;display:inline-block;width:100%;background:rgb(0,0,0,0.3);height:30px;line-height:30px;color:white;font-style:normal">主图</i>
                      <img v-if="item.url" :src="item.url" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="edit_box">
          <!-- <div style="display:flex;width:80%"> -->
          <el-form-item label="图文详情" required prop="organizationIntroduction">
            <!-- organizationIntroduction -->
            <!-- <editBox /> -->
            <div style="width:60%;" class="edit_container">
              <quill-editor
                ref="myQuillEditor1"
                v-model="ruleForm.organizationIntroduction"
                class="ql-editor"
                :options="editorOption1"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              />
            </div>
          </el-form-item>
        </div>
        <!-- </div> -->
      </div>
      <div id="Charge" class="org_intro baseView baseView3">
        <div class="base_info_tit">
          <p>收费标准</p>
        </div>
        <div class="edit_box">
          <!-- <div style="display:flex;width:80%;"> -->
          <el-form-item label="图文详情">
            <!-- chargingStandards -->
            <!-- <editBox /> -->
            <div style="width:60%;" class="edit_container">
              <quill-editor
                ref="myQuillEditor"
                v-model="ruleForm.chargingStandards"
                class="ql-editor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              />
            </div>
          </el-form-item>
          <!-- </div> -->
        </div>
      </div>
      <div class="org_intro" style="padding-bottom:10px;padding-top:10px;padding-left:30px;">
        <el-checkbox v-model="ruleForm.organizationStatus">启用此机构</el-checkbox>
      </div>
      <div class="org_submit">
        <el-button class="org_submit_btn" size="medium" @click="colse_off">取消</el-button>
        <el-button type="primary" size="medium" class="org_submit_btn" @click="add_submit()">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
// import editBox from './edit_box'
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
// import { orgAdd } from '@/api/nursing_training'
import { orgAdd } from '@/api/organization'
import { searchCity } from '@/api/city'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image']
  // ['clean']
]

export default {
  name: 'AddOrg',
  components: {
    // editBox,
    Sticky,
    'my-upload': myUpload
  },
  data() {
    var picInfoValidate2 = (rule, value, callback) => {
      // console.log(this.imageUrl)
      const arr = this.ruleForm.Imglist.some((item) => {
        return item.url !== ''
      })
      if (arr && this.ruleForm.Imglist[0].url !== '') {
        callback()
      } else {
        return callback(new Error('请至少上传一张主图'))
      }
    }
    var serve_city2 = (rule, value, callback) => {
      if (this.ruleForm.city === '') {
        callback(new Error('请选择服务城市'))
      } else {
        callback()
      }
    }
    var org_type2 = (rule, value, callback) => {
      if (this.ruleForm.organizationType === '') {
        callback(new Error('请选择机构类型'))
      } else {
        callback()
      }
    }
    var picInfoValidate1 = (rule, value, callback) => {
      if (this.ruleForm.tradingCertificate !== '') {
        callback()
      } else {
        return callback(new Error('请上传营业执照图片'))
      }
    }
    var listPicture1 = (rule, value, callback) => {
      if (this.ruleForm.listPicture !== '') {
        callback()
      } else {
        return callback(new Error('请上传列表页图片'))
      }
    }
    return {
      promitLicense: true,
      editorOption: {
        modules: {
          // theme: 'snow',
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('#testTWIMG input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      editorOption1: {
        modules: {
          // theme: 'snow',
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  document.querySelector('#testIMG input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      show: false,
      size: 1,
      uploadImageIndex: null,
      labelPosition: 'left',
      value: '',
      type_service: [{
        label: '居家生活照料',
        value: '0',
        checked: true
      }, {
        label: '居家医疗护理',
        value: '1',
        checked: false
      }, {
        label: '机构生活照料',
        value: '2',
        checked: false
      }, {
        label: '机构医疗护理',
        value: '3',
        checked: false
      }],
      fixedPointMechanismList: [{
        label: '医保定点',
        value: '0',
        checked: true
      }, {
        label: '长护定点',
        value: '1',
        checked: false
      }, {
        label: '民政定点',
        value: '2',
        checked: false
      }, {
        label: '残联定点',
        value: '3',
        checked: false
      }, {
        label: '卫健委定点',
        value: '4',
        checked: false
      }],
      serve_city: [],
      serveAllcity: [],
      org_type: [{
        value: '0',
        label: '敬老院'
      }, {
        value: '1',
        label: '福利院'
      }, {
        value: '2',
        label: '养老院'
      }, {
        value: '3',
        label: '老年公寓'
      }, {
        value: '4',
        label: '护理院'
      }, {
        value: '5',
        label: '医院'
      }, {
        value: '6',
        label: '社区卫生服务中心'
      }, {
        value: '7',
        label: '私营公司'
      }],
      ruleForm: {
        organizationCode: '',
        name: '',
        city: '',
        competentAuthority: '',
        unifiedSocialCreditCode: '',
        tradingCertificate: '',
        listPicture: '',
        address: '',
        legalRepresentative: '',
        legalRepresentativePhoneNumber: '',
        manager: '',
        managerPhoneNumber: '',
        bankAccount: '',
        depositBank: '',
        cardNumber: '',
        email: '',
        Imglist: [{
          name: '图一',
          url: '',
          isPrimary: true
        },
        {
          name: '图2',
          url: '',
          isPrimary: false
        },
        {
          name: '图3',
          url: '',
          isPrimary: false
        },
        {
          name: '图4',
          url: '',
          isPrimary: false
        }],
        organizationIntroduction: '',
        chargingStandards: '',
        organizationStatus: true
      },
      rules: {
        organizationCode: [
          { required: true, message: '请输入机构编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        competentAuthority: [
          { required: true, message: '请输入主管部门', trigger: 'blur' }
        ],
        unifiedSocialCreditCode: [
          { required: true, message: '请输入社会信用代码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入机构地址', trigger: 'blur' }
        ],
        legalRepresentative: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        legalRepresentativePhoneNumber: [
          { required: true, message: '请输入法人电话', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确格式的手机号' }
        ],
        manager: [
          { required: true, message: '请输入专管员姓名', trigger: 'blur' }
        ],
        managerPhoneNumber: [
          { required: true, message: '请输入专管员电话', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确格式的手机号' }
        ],
        bankAccount: [
          { required: true, message: '请输入银行户名', trigger: 'blur' }
        ],
        cardNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        depositBank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        picInfo: [{ required: true, validator: picInfoValidate2, trigger: 'change' }],
        servingTheCity: [{ validator: serve_city2, trigger: 'change' }],
        tradingCertificate: [{ required: true, validator: picInfoValidate1, trigger: 'change' }],
        listPicture: [{ required: true, validator: listPicture1, trigger: 'change' }],
        organizationIntroduction: { required: true, message: '请填写机构介绍的图文详情', trigger: 'blur' }
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getCityData()
  },
  mounted() {
    document.getElementById('scrollBox').addEventListener('scroll', this.handleScroll, true)
  },
  destroyed: function() {
    document.getElementById('scrollBox').removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    getCityData() {
      searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
        if (res) {
          const map1 = res.data.map(item => {
            return {
              value: item.name,
              label: item.name
            }
          })
          // var data2 = [{ value: '', label: '全部城市' }]
          this.serve_city = map1
          this.serveAllcity = res.data
          // searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'key': 'CityLevel', 'value': '2' }] }).then(res => {
          //   if (res) {
          //     const map2 = res.data.map(item => {
          //       return {
          //         value: item.name,
          //         label: item.name
          //       }
          //     })
          //     // var data3 = [{ value: '', label: '全部城市' }]
          //     this.serve_city = this.serve_city.concat(map2)
          //   }
          // })
        }
      })
    },
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 获取图片index
    getImageTypeIndex(index) {
      this.uploadImageIndex = index
    },
    // 列表页图片
    changeListPicture() {
      this.show = !this.show
    },
    srcFileSet(file) {
      // console.log(file)
    },
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是经过base64转码过的图片
      // this.listPicture = imgDataUrl
      // console.log(imgDataUrl)// 这里打印出来的是base64格式的资源，太长了
      // base64转blob格式
      const arr = imgDataUrl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const bdata = new Blob([u8arr], { type: mime })
      console.log(bdata)

      var OSS = require('ali-oss')
      var client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIbqxBSqfHEmbk',
        accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
        bucket: 'ecare-test' }
      )

      const that = this
      const suffix = '.' + bdata.type.split('/')[1]
      const date = Date.parse(new Date())
      const name = `thumbnail_${date}${suffix}`
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${name}`
      client.multipartUpload(fileNames, bdata, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          // console.log('Progress: ' + p)
          // option.onProgress(e)
          // console.log(e.percent)
          // 显示上传进度条
          // this.videoFlag = true
          // this.videoUploadPercent = e.percent
        }
      }).then((val) => {
        console.info('66', val)
        if (val.res.statusCode === 200) {
          // this.videoFlag = false
          // this.videoUploadPercent = 0
          // // this.videoForm.videoUploadId = res.data.uploadId
          // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
          // option.onSuccess(val)
          this.ruleForm.listPicture = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          return val
        } else {
          // option.onError('上传失败')
        }
      }, err => {
        // option.onError('上传失败')
        reject(err)
      })
      // console.log(bdata)
      // console.log(new Blob([u8arr], { type: mime })) ;//这里打印base64转成blob的资源，根据自己的项目需求去转吧
    },
    // 详情页图片
    fnUploadRequest2(option) {
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
      console.log('上传图片编号', this.uploadImageIndex)
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${fileName}_${date}${suffix}`
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
        console.info('66', val)
        if (val.res.statusCode === 200) {
          // this.videoFlag = false
          // this.videoUploadPercent = 0
          // // this.videoForm.videoUploadId = res.data.uploadId
          // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
          // option.onSuccess(val)
          this.ruleForm.Imglist[this.uploadImageIndex].url = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          // this.ruleForm.Imglist[this.uploadImageIndex].name = file.name
          // this.ruleForm.tradingCertificate = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/'+val.name
          console.log('11', val)
          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    // 图片上传成功
    getImageSuccess2: function(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      console.log(file)
      this.ruleForm.Imglist[this.uploadImageIndex].url = URL.createObjectURL(file.raw)
      this.ruleForm.Imglist[this.uploadImageIndex].name = file.name
    },

    beforeAvatarUpload2(file) {
      const isLt3M = file.size / 1024 / 1024 < 3
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      var ready = new FileReader()
      /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,
      如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(file)
      ready.onload = function() {
        var re = this.result
        that.canvasDataURL(re)
      }
      return isLt3M
    },
    canvasDataURL(path) {
      var img = new Image()
      img.src = path
      img.onload = function() {
        var that = this
        // 默认按比例压缩
        var w = that.width
        var h = that.height
        console.log('图片宽高', w, h)

        // var scale = w / h
        // w = obj.width || w
        // h = obj.height || (w / scale)
        // var quality = 0.7 // 默认图片质量为0.7
        // // 生成canvas
        // var canvas = document.createElement('canvas')
        // var ctx = canvas.getContext('2d')
        // // 创建属性节点
        // var anw = document.createAttribute('width')
        // anw.nodeValue = w
        // var anh = document.createAttribute('height')
        // anh.nodeValue = h
        // canvas.setAttributeNode(anw)
        // canvas.setAttributeNode(anh)

        // // ctx.fillStyle = "#fff"

        // // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // // for(var i = 0; i < imageData.data.length; i += 4) {
        // //   // 当该像素是透明的,则设置成白色
        // //   if(imageData.data[i + 3] == 0) {
        // //     imageData.data[i] = 255;
        // //     imageData.data[i + 1] = 255;
        // //     imageData.data[i + 2] = 255;
        // //     imageData.data[i + 3] = 255;
        // //   }
        // // }
        // // ctx.putImageData(imageData, 0, 0);

        // ctx.drawImage(that, 0, 0, w, h)
        // // 图像质量
        // if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        //   quality = obj.quality
        // }
        // // quality值越小，所绘制出的图像越模糊
        // // var base64 = canvas.toDataURL('image/jpeg', quality);
        // var base64 = canvas.toDataURL('image/png', quality)
        // // 回调函数返回base64的值
        // callback(base64)
      }
    },
    // 收费标准图文详情
    fnUploadRequestTWTest(option) {
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/richTextTW/${fileName}_${date}${suffix}`
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
        console.info('66', val)
        if (val.res.statusCode === 200) {
          // this.videoFlag = false
          // this.videoUploadPercent = 0
          // // this.videoForm.videoUploadId = res.data.uploadId
          // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
          // option.onSuccess(val)
          // this.ruleForm.tradingCertificate = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          console.log('11', val)
          const vm = this
          const quill = this.$refs.myQuillEditor.quill
          console.log('转码成功---', vm.$refs.myQuillEditor.quill.getSelection())
          // 如果上传成功

          var quillLength
          var length
          // 获取光标所在位置
          // 判断如果用户没有将光标移入富文本而是直接上传图片的情况
          // var quillLength = vm.$refs.myQuillEditor1.quill.getSelection();
          // if(vm.$refs.myQuillEditor1.quill.getSelection){
          //   length = quill.getSelection().index
          // }else{
          //   length = 0
          // }
          quillLength = quill.getSelection()
          if (quillLength) {
            length = quill.getSelection().index
          } else {
            length = 0
          }

          // 插入图片 val.name为服务器返回的图片地址
          quill.insertEmbed(length, 'image', 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name)
          // 调整光标到最后
          quill.setSelection(length + 1)

          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    getImageSuccessTWTest: function(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      console.log(file)
      this.ruleForm.tradingCertificate = URL.createObjectURL(file.raw)
    },

    beforeAvatarUploadTWTest(file) {
      console.log('转码测试')
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isLt3M
    },
    // 机构介绍图文详情
    fnUploadRequestTest(option) {
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/richText/${fileName}_${date}${suffix}`
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
        console.info('66', val)
        if (val.res.statusCode === 200) {
          // this.videoFlag = false
          // this.videoUploadPercent = 0
          // // this.videoForm.videoUploadId = res.data.uploadId
          // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
          // option.onSuccess(val)
          // this.ruleForm.tradingCertificate = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          console.log('11', val)
          const vm = this
          const quill = this.$refs.myQuillEditor1.quill
          console.log('转码成功---', vm.$refs.myQuillEditor1.quill.getSelection())
          // 如果上传成功

          var quillLength
          var length
          // 获取光标所在位置
          // 判断如果用户没有将光标移入富文本而是直接上传图片的情况
          // var quillLength = vm.$refs.myQuillEditor1.quill.getSelection();
          // if(vm.$refs.myQuillEditor1.quill.getSelection){
          //   length = quill.getSelection().index
          // }else{
          //   length = 0
          // }
          quillLength = quill.getSelection()
          if (quillLength) {
            length = quill.getSelection().index
          } else {
            length = 0
          }

          // 插入图片 val.name为服务器返回的图片地址
          quill.insertEmbed(length, 'image', 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name)
          // 调整光标到最后
          quill.setSelection(length + 1)

          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    getImageSuccessTest: function(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      console.log(file)
      this.ruleForm.tradingCertificate = URL.createObjectURL(file.raw)
    },

    beforeAvatarUploadTest(file) {
      console.log('转码测试')
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isLt3M
    },

    // 营业执照图片
    fnUploadRequest1(option) {
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${fileName}_${date}${suffix}`
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
        console.info('66', val)
        if (val.res.statusCode === 200) {
          // this.videoFlag = false
          // this.videoUploadPercent = 0
          // // this.videoForm.videoUploadId = res.data.uploadId
          // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
          // option.onSuccess(val)
          this.ruleForm.tradingCertificate = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          console.log('11', val)
          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    getImageSuccess1: function(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      console.log(file)
      this.ruleForm.tradingCertificate = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload1(file) {
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isLt3M
    },
    // 锚点
    returnToView(tagName, event) {
      const returnEle = document.querySelectorAll(`.${tagName}`)[0]
      document.getElementById('scrollBox').scrollTo(0, returnEle.offsetTop - 90)
    },
    // 鼠标滚动 tabs
    handleScroll() {
      const $scrolltop = document.getElementById('scrollBox').scrollTop
      const ele = document.querySelectorAll('.baseView')
      const tab_item = document.querySelectorAll('.tabItem')
      for (const index in ele) {
        const $top = ele[index].offsetTop + ele[index].offsetHeight / 2

        // tab_item[index].classList.remove('tab_active')
        tab_item.forEach((objs, objIndex) => {
          tab_item[objIndex].classList.remove('tab_active')
        })
        if ($top > $scrolltop) {
          this.$nextTick(() => {
            tab_item[index].classList.add('tab_active')
          })
          return false
        }
      }
    },
    // 取消
    colse_off() {
      this.$confirm('取消后将不保存该机构信息，是否取消?', '提示', {
        cancelButtonText: '再想想',
        confirmButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/nursing_training/training_org/org_list')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回'
        })
      })
    },
    add_submit() {
      var makeCode = 30 + this.$moment().format('YYYYMMDDHHmmss') + Math.random().toString(36).substr(2, 4)
      this.ruleForm.organizationCode = makeCode
      this.$refs.ruleForm.validate((valid) => {
        // console.log(this.ruleForm)
        if (valid) {
          var orgImg = []
          orgImg.push(this.ruleForm.listPicture)
          for (var item of this.ruleForm.Imglist) {
            if (item.url) {
              orgImg.push(item.url)
            }
          }
          var obj = JSON.parse(JSON.stringify(this.ruleForm))
          delete obj.Imglist
          delete obj.listPicture
          obj.organizationImages = orgImg
          if (obj.organizationStatus) {
            obj.organizationStatus = 1
          } else {
            obj.organizationStatus = 0
          }
          for (var item of this.serveAllcity) {
            if (item.name == obj.city) {
              obj.cityCode = item.cityCode
            }
          }
          // console.log(obj)

          orgAdd(obj).then(res => {
            // console.log('成功了', res)
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push({ path: `/nursing_training/training_org/org_list` })
            } else {
              // this.$message.warning('添加失败')
              // console.log('88888',res.response.data.error)
            }
          })
        } else {
          this.$message.success('请正确填写表单')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .add_org{
    width: 100%;
    height: 86%;
    //margin:20px auto;
 }
 /*add_org_nav*/
 .add_org_nav{
    width: 100%;
    height: 60px;
    border:1px solid #ddd;
    background-color: #fff;
 }
 .add_org_nav_left{
   float: left;
 }
 .add_org_nav_left p{
   cursor:pointer;
   float: left;
   width: 128px;
   text-align: center;
   line-height: 58px;
 }
 .add_org_nav_left p:nth-child(1){
   border-left: 1px solid #ddd;
 }
 .add_org_nav_right{
   height: 60px;
   float: right;
   margin-right: 52px;
   display: flex;
   align-items: center;
 }
 .add_org_nav_right_checkbox{
   width: 20px;
 }
 .el-checkbox__inner{
    width: 20px;
    height: 20px;
 }
 .el-checkbox__inner::after{
   width: 8px;
   height: 10px;
 }
 /*base_info*/
 .base_info{
   background-color: #fff;
   margin-top:10px;
   border: 1px solid #ddd;
   padding-bottom: 50px;
 }
 .base_info_tit{
   height: 54px;
   border-bottom:1px solid #ddd;
 }
 .base_info_tit p{
   width: 128px;
   text-align: center;
   line-height: 53px;
   box-sizing: border-box;
 }
 .base_info_main{
   padding-left: 67px;
   border-top:none;
 }
 .base_info_main_one{
   margin-top:27px;
   display: flex;
 }
 .el-input{
   width: 300px;
   //margin-left:16px;
   margin-right:116px;
 }
  .el-select-dropdown {
    min-width: 302px !important ;
  }
  .el-input__inner{
    width: 306px !important;
}
  .org_addr .el-input__inner{
    width: 820px !important;
  }
  /*upload1*/

  /*org_intro*/
  .org_intro{
    background-color: #fff;
    margin-top:10px;
    border: 1px solid #ddd;
    padding-bottom: 100px;
  }
  /*upload*/
  .click_upimg{
    display: flex;
  }
  .avatar-uploader2{
    margin-left: 20px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader2 .avatar-uploader-icon ,.avatar-uploader1 .avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 1px dashed #d9d9d9 !important;
  }
 .avatar-uploader2 .avatar ,.avatar-uploader1 .avatar{
    width: 120px;
    height: 120px;
    display: block;
  }
   .el-upload{
    border: 1px dashed #d9d9d9 !important;
    width: 120px !important;
  }
  .up_load_img ,.edit_box{
    padding-left: 67px;
  }
   .el-upload .el-upload-dragger{
    width: 120px !important;
    height: 120px !important;
    border:0;
  }
  // //editor
  // .quill-editor{
  //     width: 792px;
  //     height: 370px;
  //     margin-top: 15px;
  //     overflow: hidden;
  //     border-bottom: 1px solid #ccc;
  // }
  // .ql-container{
  //   height: 320px;
  // }
  //org_submit
  .org_submit{
    background-color: #fff;
    margin-top:10px;
    border: 1px solid #ddd;
    height: 89px;
  }
  .org_submit_btn{
    width: 100px;
    margin-left: 80px;
    margin-top:20px;
    font-size: 18px;
  }
  .org_submit .el-button+.el-button{
    margin-left: 80px;
  }
  .add_org_nav_left .tab_active{
    background-color:rgba(62, 141, 255, 0.3);
    color:rgba(62, 141, 255, 1);
    border-top: 2px solid rgba(62, 141, 255, 1);
  }
  .add_org_nav_left .tabItem{
    width:130px;
    line-height: 57px;
  }
</style>
<style lang="scss">
// //editor
//   .quill-editor{
//       width: 792px;
//       height: 370px;
//       margin-top: 15px;
//       overflow: auto;
//       border-bottom: 1px solid #ccc;
//       border-top: 1px solid #ccc;
//   }
//   .ql-container{
//     height: 272px!important;
//   }
</style>

