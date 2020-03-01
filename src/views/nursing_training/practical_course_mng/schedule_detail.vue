
/**
新增商品
action
  1 新增
  2修改
  3  查看
*/
<template>
  <!-- <div class="app-container"> -->
  <div id="scrollBox" class="ss" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" style="margin-bottom:20px" :sticky-top="130">
      <div class="gray_box">
        <div class="herfTab">
          <div class="float_left tabItem tab_active" @click="returnToView('baseView1',$event)">
            <span>基础信息</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView3',$event)">
            <span>本批学员</span>
          </div>
        </div>
      </div>
    </sticky>
    <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="200px" class="demo-ruleForm">
      <div class="gray_box baseView baseView1 ">
        <div>
          <h2 class="item_title">基础信息</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="期数" prop="name">
                  <el-input v-model="baseForm.name" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                &nbsp;
              </el-col>
              <el-col :span="8">
                <el-form-item label="已通过/已报名/人数限制" prop="description">
                  <el-input v-model="baseForm.description" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开始时间" prop="code">
                  <el-input v-model="baseForm.code" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                &nbsp;
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束时间" prop="description">
                  <el-input v-model="baseForm.description" disabled />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="gray_box baseView baseView3">
        <div>
          <h2 class="item_title">本批学员</h2>
          <div class="item_form">
            <current-studentlist />
          </div>
        </div>
      </div>
      <div class="gray_box">
        <div>
          <h2 v-show="false" class="item_title">BAR</h2>
          <div class="item_form">
            <el-row>
              <el-form-item style="margin-bottom:0px">
                <el-button size="medium" @click="cancel">返回</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
import Sticky from '@/components/Sticky'
import MinXin from '@/components/MiXins'
import client from '@/utils/ali-oss.js'
import { dateFormat } from '@/utils/dateFormat.js'
import currentStudentList from './current_student_list'

const ali_oss_path = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/'
export default {
  name: 'CreateGoods',
  components: {
    Sticky,
    // 'my-upload': myUpload,
    'current-studentlist': currentStudentList
  },
  mixins: [MinXin],
  data() {
    var picInfoValidate = (rule, value, callback) => {
      // console.log(this.imageUrl)
      const arr = this.productImages.some((item) => {
        return item.url !== ''
      })
      if (arr && this.productImages[0].url !== '') {
        callback()
      } else {
        return callback(new Error('至少上传一张主图'))
      }
    }
    return {
      listImg: '',
      show: false,
      size: 1.1,
      disabled: false,
      uploadDisabled: false, // 图片上传禁用
      // isOnline: true,
      checked: false,
      handleChange: false,
      baseForm: {
        name: '',
        description: '',
        code: ''
      },
      baseRules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        picInfo: [{ required: true, validator: picInfoValidate, trigger: 'change' }],
        description: [
          { required: true, message: '请输入授课机构', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入授课地址', trigger: 'blur' }
        ]
      },
      productDetail: {// 商品内容对象
        content: ''
      },
      productImages: [
        {
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
        },
        {
          name: '图5',
          url: '',
          isPrimary: false
        }
      ],
      imgIndex: '',
      editorOption: {},
      upLoadFlage: false, // 上传进度条标记
      upLoadImgPercentage: 0,
      dialogImageUrl: '',
      picturePreviewDialog: false,
      suoluetu: {
        name: '缩略图',
        url: '',
        isPrimary: false
      }
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  watch: {

  },
  beforeCreate() {
    // console.log(this.$route)
  },
  created() {
  },
  mounted() {
    // console.log(this.$route)
    // console.log(this.productImages)
    if (document.getElementById('scrollBox')) {
      document.getElementById('scrollBox').addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    }
    // ----------------------------
  },
  destroyed: function() {
    if (document.getElementById('scrollBox')) {
      document.getElementById('scrollBox').removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    }
  },
  methods: {
    cancel() {
      this.$router.push('/nursing_training/practical_course_mng/schedule_setting')
    },
    getImgIndex(index) {
      this.imgIndex = index
    },
    beforeAvatarUpload(file) {
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      const readyDocument = new FileReader()
      let isSize = 'fjsihse'
      readyDocument.readAsDataURL(file)
      readyDocument.onload = function() {
        const res = this.result
        isSize = that.canvasDataURL(res)
        if (!isSize) {
          that.$message.error('图片不是700*700!')
        }
      }

      // this.$message.warning('图片格式验证！')
      // return (isJPG || isPng) && isLt3M&&isSize
      return (isJPG || isPng) && isLt3M
      // return false
    },
    canvasDataURL(path) {
      var img = new Image()
      img.src = path
      var flage = false
      img.onload = function() {
        var w = this.width
        var h = this.height
        console.log(`图片长${h},宽${w}`)
        if ((w != 700) || (h != 700)) {
          flage = false
          return false
        } else {
          flage = true
          return true
        }
      }
      img.onload()
      return flage
    },
    handleProgress(event, file, fileList) {
      //   console.log(event)
      console.log(file)
      this.upLoadFlage = true
      this.upLoadImgPercentage = Number(file.percentage.toFixed(0))
    },
    handleAvatarSuccess(res, file) {
      // this.productImages[this.imgIndex].url = URL.createObjectURL(file.raw)
      console.log(file)
      this.productImages[this.imgIndex].url = ali_oss_path + file.response.name
      this.productImages[this.imgIndex].name = file.name
    },
    handleRemove(index) {
      console.log(index)
      const that = this
      this.upLoadFlage = false
      that.$nextTick(() => {
        that.productImages[index].url = ''
      })
    },
    handlePicturePreview(index) {
      console.log(index)
      const that = this
      this.dialogImageUrl = ''
      that.$nextTick(() => {
        that.dialogImageUrl = this.productImages[index].url
        that.picturePreviewDialog = true
      })
    },
    handleDownload(index) {
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
    picUpload(file) {
      this.upLoadFlage = false
      const that = this
      const files = file.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      const fileNames = `product/${dateFormat(new Date(), 'yyyyMMdd')}/${fileName}_${date}${suffix}`

      client.multipartUpload(fileNames, file.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          file.onProgress(e)
        }
      }).then(result => {
        // 下面是如果对返回结果再进行处理，根据项目需要
        // console.log(result)

        if (result.res.status === 200) {
          file.onSuccess(result, file)
          that.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      }).catch(err => {
        that.$message.error('上传失败')
      })
    },
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus(val) { // 富文本获得焦点时的事件
    },
    onEditorChange() {}, // 内容改变事件
    // 缩略图部分
    srcFileSet(file) {
      console.log(file)
    },
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是经过base64转码过的图片
      this.listImg = imgDataUrl
      // console.log(imgDataUrl)// 这里打印出来的是base64格式的资源，太长了
      // base64转blob格式
      const arr = imgDataUrl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const bdata = new Blob([u8arr], { type: mime })
      console.log(bdata)

      // var OSS = require('ali-oss')
      // var client = new OSS({
      //   region: 'oss-cn-hangzhou',
      //   accessKeyId: 'LTAIbqxBSqfHEmbk',
      //   accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
      //   bucket: 'ecare-test' }
      // )
      client.multipartUpload('product/test/base64.jpg', bdata, {
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
    }
  }

}

</script>
<style scoped lang='scss'>
  li {
    list-style:none
    }
.float_left{
  float: left;
}
.float_right{
  float: right;
  margin-right: 30px
}
.app-container{
background: #F2F2F2;
margin: 0px
}
.gray_box{
  border:1px solid #dddddd;
  margin-bottom: 20px;
  background: #FFFFFF
}
.herfTab{
  background: #FFFFFF;
  position: relative;
  overflow: hidden;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  .tabItem{
    width:130px;
    line-height: 57px;
    border-top: 3px solid transparent
  }
  .tab_active{
      border-color:#409eff;
      background: rgba(30,144,255,0.2);
      color :#3E8DFF
    }
}
.item_title{
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 55px;
  border-bottom: 1px solid #dddddd;
  background: #FFFFFF;
  padding-left: 20px;
}
.item_form{
  padding: 20px;
}
.wid_320{
  width: 320px
}
.marg_20{
  margin-left:20px
}
.wid_110{
  width: 110px
}
.uploader-box-div .avatar-uploader{
  float: left;
  margin-right:20px
}
// 图片上传
.uploader-box-div .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .uploader-box-div .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .uploader-box-div .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .uploader-box-div .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
//  .edit_container .ql-container{
//     height: 400px;
//   }
  .org_select{
    width: 100%
  }
  .listImgBox{
    width:110px;
    height:100px;
  }
</style>

<style lang="scss">
//  图片上传
.uploader-box-div .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.uploader-box-div  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.uploader-box-div  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .uploader-box-div .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .edit_container .ql-container{
    height: 400px;
  }
</style>

