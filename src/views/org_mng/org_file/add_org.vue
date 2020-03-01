<template>
  <div id="scrollBox" class="add_org" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" :sticky-top="130">
      <div class="add_org_nav">
        <div class="add_org_nav_left">
          <p class="tabItem  tab_active" @click="returnToView('baseView1',$event)">基础信息</p>
          <p class="tabItem" @click="returnToView('baseView2',$event)">机构介绍</p>
          <p class="tabItem" @click="returnToView('baseView3',$event)">收费标准</p>
        </div>
        <div class="add_org_nav_right">
          <el-checkbox v-model="promitLicense" class="add_org_nav_right_checkbox" />
          <p>立即启用</p>
        </div>
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
            <el-form-item label="机构等级">
              <el-input v-model="ruleForm.level" class="org_addr" />
            </el-form-item>
            <el-form-item label="机构类型" required prop="organizationType">
              <el-select v-model="ruleForm.organizationType" clearable style="margin-right: 209px;">
                <el-option
                  v-for="item in org_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <!-- <el-option
                  v-for="item in org_type"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                /> -->
              </el-select>
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="服务类型" required prop="serviceType">
              <el-checkbox-group v-model="ruleForm.serviceType">
                <el-checkbox
                  v-for="service in type_service"
                  :key="service.value"
                  :label="service.value"
                >{{ service.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="定点机构" required prop="designatedAgencie">
              <el-checkbox-group v-model="ruleForm.designatedAgencie">
                <el-checkbox
                  v-for="service in fixedPointMechanismList"
                  :key="service.value"
                  :label="service.value"
                >{{ service.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="base_info_main_one">
            <el-form-item label="内设医务室" required>
              <el-radio v-model="ruleForm.hasClinic" :label="true" style="margin-left:20px;">有</el-radio>
              <el-radio v-model="ruleForm.hasClinic" :label="false">无</el-radio>
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
            <el-form-item label="床位数量" required prop="bedQuantities">
              <el-input v-model.number="ruleForm.bedQuantities" />
            </el-form-item>
            <el-form-item label="护工人数" required prop="careWorkerQuantities">
              <el-input v-model.number="ruleForm.careWorkerQuantities" />
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
          <div class="base_info_main_one">
            <el-form-item label="状态" required>
              <el-radio v-model="ruleForm.organizationStatus" label="1" style="margin-left:20px;">启用</el-radio>
              <el-radio v-model="ruleForm.organizationStatus" label="0">无效</el-radio>
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
            <el-form-item label="缩略图" prop="listPicture">
              <span style="margin-left:29px;">单张图片大小不能超过3M，图片规格比例至少为420*300</span>
              <div class="click_upimg">
                <el-upload
                  style="margin-left:20px;"
                  class="avatar-uploader avatar-uploader1"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="getImageSuccessSLT"
                  :before-upload="beforeAvatarUploadSLT"
                  :http-request="fnUploadRequestSLT"
                >
                  <!-- <img v-if="ruleForm.listPicture" :src="ruleForm.listPicture" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
                  <i
                    v-if="!ruleForm.listPicture"
                    slot="default"
                    class="el-icon-plus avatar-uploader-icon"
                  />
                  <div v-if="ruleForm.listPicture" class="slotBox" style="width:120px;height:120px;" @click="clickStop">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="ruleForm.listPicture"
                      alt
                      style="width:100%;height:100%"
                    >
                    <span class="el-upload-list__item-actions" style="padding-top:20px;z-index:2;">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePicturePreview('-2')"
                      >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <!-- <span class="el-upload-list__item-preview" @click="handleDownload(index)">
                        <i class="el-icon-download" />
                      </span>-->
                      <span class="el-upload-list__item-preview" @click="handleRemove('-2')">
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                </el-upload>
              </div>
            </el-form-item>
          </div>
        </div>
        <div style="height:176px;padding-left:67px;margin-bottom:10px;">
          <div style="display:flex">
            <el-form-item label="详情页图片" prop="picInfo">
              <!-- <el-form-item label="详情页图片" required> -->
              <span style="margin-left:29px;">单张图片大小不能超过3M，图片规格比例至少为750*360</span>
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
                      <!-- <i v-if="index==0" style="position:absolute;top:0;left:0;display:inline-block;width:100%;background:rgb(0,0,0,0.3);height:30px;line-height:30px;color:white;font-style:normal">主图</i>
                      <img v-if="item.url" :src="item.url" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
                      <!-- <i v-if="index==0" style="position:absolute;z-index:1;top:0;left:0;display:inline-block;width:100%;background:rgb(0,0,0,0.3);height:30px;line-height:30px;color:white;font-style:normal">主图</i> -->
                      <!-- <img v-if="item.url" :src="item.url" class="avatar"> -->
                      <i v-if="index==0" style="position:absolute;z-index:1;top:0;left:0;display:inline-block;width:100%;background:rgb(0,0,0,0.3);height:30px;line-height:30px;color:white;font-style:normal">主图</i>
                      <i
                        v-if="!item.url"
                        slot="default"
                        class="el-icon-plus avatar-uploader-icon"
                      />
                      <div v-if="item.url" class="slotBox" style="width:120px;height:120px;" @click="clickStop">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="item.url"
                          alt
                          style="width:100%;height:100%"
                        >
                        <span class="el-upload-list__item-actions" style="padding-top:20px;z-index:2;">
                          <span
                            class="el-upload-list__item-preview"
                            @click="handlePicturePreview(index)"
                          >
                            <i class="el-icon-zoom-in" />
                          </span>
                          <!-- <span class="el-upload-list__item-preview" @click="handleDownload(index)">
                            <i class="el-icon-download" />
                          </span>-->
                          <span class="el-upload-list__item-preview" @click="handleRemove(index)">
                            <i class="el-icon-delete" />
                          </span>
                        </span>
                      </div>
                    </el-upload>
                    <el-dialog :visible.sync="picturePreviewDialog" width="500px">
                      <img width="100%" :src="dialogImageUrl" alt>
                    </el-dialog>
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
      <div class="org_submit">
        <el-button class="org_submit_btn" size="medium" @click="colse_off">取消</el-button>
        <el-button type="primary" size="medium" class="org_submit_btn" @click="add_submit()">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import 'babel-polyfill' // es6 shim
import { orgAdd } from '@/api/organization'
import { searchCity } from '@/api/city'
import { Debounce } from '@/utils/public'

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
    Sticky
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
        return callback(new Error('请上传主图'))
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
        return callback(new Error('请上传缩略图'))
      }
    }
    var type_service2 = (rule, value, callback) => {
      if (this.ruleForm.serviceType && this.ruleForm.serviceType.length) {
        callback()
      } else {
        return callback(new Error('至少选择一个服务类型'))
      }
    }
    var fixedPointMechanism2 = (rule, value, callback) => {
      if (this.ruleForm.designatedAgencie && this.ruleForm.designatedAgencie.length) {
        callback()
      } else {
        return callback(new Error('至少选择一个定点机构'))
      }
    }

    return {
      // 图片放大相关
      dialogImageUrl: '',
      picturePreviewDialog: false,
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
      size: 0.1,
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
      serve_cityAll: [],
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
        level: '',
        organizationType: '',
        designatedAgencie: [],
        serviceType: [],
        hasClinic: '1',
        legalRepresentative: '',
        legalRepresentativePhoneNumber: '',
        manager: '',
        managerPhoneNumber: '',
        bedQuantities: '',
        careWorkerQuantities: '',
        bankAccount: '',
        depositBank: '',
        cardNumber: '',
        email: '',
        organizationStatus: '1',
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
        chargingStandards: ''
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
        bedQuantities: [
          { required: true, message: '请输入床位数量', trigger: 'blur' }
        ],
        careWorkerQuantities: [
          { required: true, message: '请输入护工人数', trigger: 'blur' }
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
        serviceType: [{ required: true, validator: type_service2, trigger: 'change' }],
        designatedAgencie: [{ required: true, validator: fixedPointMechanism2, trigger: 'change' }],
        picInfo: [{ required: true, validator: picInfoValidate2, trigger: 'change' }],
        servingTheCity: [{ validator: serve_city2, trigger: 'change' }],
        organizationType: [{ validator: org_type2, trigger: 'change' }],
        tradingCertificate: [{ required: true, validator: picInfoValidate1, trigger: 'change' }],
        listPicture: [{ required: true, validator: listPicture1, trigger: 'change' }],
        organizationIntroduction: { required: true, message: '请填写机构介绍的图文详情', trigger: 'blur' }
      }
    }
  },
  computed: {
  },
  watch: {
    promitLicense: function(val) {
      if (val) {
        this.ruleForm.organizationStatus = '1'
      } else {
        this.ruleForm.organizationStatus = '0'
      }
    },
    'ruleForm.organizationStatus': function(val) {
      if (val == '1') {
        this.promitLicense = true
      } else {
        this.promitLicense = false
      }
    }
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
    // 图片放大相关
    handlePicturePreview(index) {
      const that = this
      this.dialogImageUrl = ''
      that.$nextTick(() => {
        if (index == '-2') {
          that.dialogImageUrl = that.ruleForm.listPicture
        } else {
          that.dialogImageUrl = that.ruleForm.Imglist[index].url
        }
        that.picturePreviewDialog = true
      })
    },
    clickStop(e) {
      const event = window.event || e
      if (window.event) {
        // 只有ie识别
        event.cancelBubble = true
      } else {
        event.stopPropagation()
      }
    },
    handleRemove(index) {
      const that = this
      that.$nextTick(() => {
        if (index == '-2') {
          that.ruleForm.listPicture = ''
          that.$forceUpdate()
        } else {
          that.ruleForm.Imglist[index].url = ''
        }
      })
    },
    getCityData() {
      searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
        if (res) {
          const map1 = res.data.map(item => {
            return {
              value: item.name,
              label: item.name
            }
          })
          this.serve_city = map1
          this.serve_cityAll = res.data
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
    // 缩略图上传相关
    fnUploadRequestSLT(option) {
      console.log('11', option)
      var file = option.file
      const that = this
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`
      client.multipartUpload(fileNames, option.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          option.onProgress(e)
        }
      }).then((val) => {
        console.info('66', val)
        if (val.res.statusCode === 200) {
          this.ruleForm.listPicture = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
          return val
        } else {
          option.onError('上传失败')
        }
      }, err => {
        option.onError('上传失败')
        reject(err)
      })
    },
    getImageSuccessSLT: function(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
    },
    beforeAvatarUploadSLT(file) {
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
        return false
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        return false
      }
      // const isCC1 = file.size >= 420 * 300
      // if (!isCC1) {
      //   this.$message.error('上传图片大小规格至少为420*300!')
      //   return false
      // }
      const isSize = new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
          if (this.width % 420 != 0 || this.height % 300 != 0) {
            reject()
          } else {
            resolve()
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$message.error('上传图片大小规格比例应为420*300!')
        return Promise.reject()
      })
      return isSize
    },
    // 详情页图片上传相关
    fnUploadRequest2(option) {
      var file = option.file
      const that = this
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`
      client.multipartUpload(fileNames, option.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          option.onProgress(e)
        }
      }).then((val) => {
        console.info('66', val)
        if (val.res.statusCode === 200) {
          this.ruleForm.Imglist[this.uploadImageIndex].url = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
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
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
        return false
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        return false
      }
      // const isCC1 = file.size >= 750 * 360
      // if (!isCC1) {
      //   this.$message.error('上传图片大小规格至少为750*360!')
      //   return false
      // }
      const isSize = new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
          if (this.width % 750 != 0 || this.height % 360 != 0) {
            reject()
          } else {
            resolve()
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$message.error('上传图片大小规格比例应为750*360!')
        return Promise.reject()
      })
      return isSize
    },
    // 收费标准图文详情
    fnUploadRequestTWTest(option) {
      var file = option.file
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
        return
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/richTextTW/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`
      client.multipartUpload(fileNames, option.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          option.onProgress(e)
        }
      }).then((val) => {
        if (val.res.statusCode === 200) {
          const vm = this
          const quill = this.$refs.myQuillEditor.quill
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
      this.ruleForm.tradingCertificate = URL.createObjectURL(file.raw)
    },
    beforeAvatarUploadTWTest(file) {
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
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
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
        return
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/richText/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`
      client.multipartUpload(fileNames, option.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          option.onProgress(e)
        }
      }).then((val) => {
        console.info('66', val)
        if (val.res.statusCode === 200) {
          const vm = this
          const quill = this.$refs.myQuillEditor1.quill
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
      this.ruleForm.tradingCertificate = URL.createObjectURL(file.raw)
    },
    beforeAvatarUploadTest(file) {
      console.log('转码测试')
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
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
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
        return
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
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
      const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`
      client.multipartUpload(fileNames, option.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          option.onProgress(e)
        }
      }).then((val) => {
        console.info('66', val)
        if (val.res.statusCode === 200) {
          this.ruleForm.tradingCertificate = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
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
      this.ruleForm.tradingCertificate = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload1(file) {
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
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
      this.$router.push('/org_mng/care_org/care_org_list')
    },
    add_submit: Debounce(function() {
      var randomTime = this.$moment().format('YYYYMMDDHHmmssSSSS')
      var randomFour = parseInt(Math.random() * 9000 + 1000)
      var makeCode = 30 + randomTime + randomFour
      // console.log(randomTime,randomFour)
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
          for (var item of this.serve_cityAll) {
            if (item.name == obj.city) {
              console.log(item.cityCode)
              obj.cityCode = item.cityCode
            }
          }

          orgAdd(obj).then(res => {
            // console.log('成功了', res)
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push({ path: `/org_mng/care_org/care_org_list` })
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
    }, 500)
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

