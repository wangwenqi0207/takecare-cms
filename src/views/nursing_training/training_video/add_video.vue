/** 上传视频

 */
<template>
  <div class="comment_box">
    <div class="defined_ulpoad">
      <upload-video ref="uploadTrainingVideo" :options="uploadVedioOptions" @isFinished="isFinished">
        <div slot="Tip" class="el-upload__tip">只能上传.mp4文件，且不超过100M</div>
      </upload-video>
      <div v-if="!editShow" style="padding-top:20px">
        <el-button plain size="small" style="width:100px;" @click.prevent="cancleUpload">取消</el-button>
      </div>
    </div>
    <div v-if="editShow">
      <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="100px" label-position="left" class="demo-ruleForm">
        <div class="gray_box" style="margin-top:20px">
          <div>
            <h2 class="item_title">基本信息</h2>
            <div style="padding:20px 20px 0px 20px;width:80%;">
              <!-- <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="100px" label-position="left" class="demo-ruleForm"> -->
              <el-form-item label="视频标题" prop="name">
                <el-input v-model="baseForm.name" style="width:200px" />
              </el-form-item>
              <el-form-item label="视频封面设置" label-width="130px" prop="cover">
                <el-col><span>图片单张大小不超过3M，图片规格546*310</span></el-col>
                <el-col>
                  <div class="avatar-uploader">
                    <div class="el-upload el-upload--text coverImgBox" @click="function(){show=true}">
                      <i v-if="!coverImgUrl" class="el-icon-plus avatar-uploader-icon" />
                      <img v-else :src="coverImgUrl" :alt="imgName" style="width:110px;height:100px">
                    </div>
                  </div>
                </el-col>
                <my-upload v-model="show" field="img" :width="546" :height="320" img-format="png" size="1.1" @src-file-set="srcFileSet" @crop-success="cropSuccess" />
                <!-- <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->
              </el-form-item>
              <el-form-item label="视频类型" prop="type">
                <el-select v-model="baseForm.type" placeholder="请选择视频类型" size="medium" clearable>
                  <el-option label="生活照料" value="1" />
                  <el-option label="医疗护理" value="2" />
                </el-select>
              </el-form-item>
              <!-- </el-form> -->
            </div>
          </div>
        </div>
        <div class="gray_box">
          <div style="padding:20px 20px 0px 20px;">
            <el-form-item label="" label-width="10">
              <el-checkbox v-model="baseForm.status">发布此视频</el-checkbox>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-form-item label-width="10">
            <el-button size="small" style="width:80px" @click.prevent="cancle">取消</el-button>
            <el-button type="primary" size="small" style="width:80px" @click.prevent="onSubmit('baseForm')">确定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
import uploadVideo from '@/components/Upload/upload_video'
import client from '@/utils/ali-oss.js'
// import { client, ali_oss_path } from '@/utils/ali-oss.js'
import { Debounce } from '@/utils/public'
const ali_oss_path = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/'
export default {
  'name': 'addVideo',
  components: {
    uploadVideo,
    myUpload
  },
  data() {
    var coverValidate = (rule, value, callback) => {
      if (this.coverImgUrl) {
        callback()
      } else {
        return callback(new Error('请上传一张封面~'))
      }
    }
    return {
      editShow: false,
      // 上传视频
      uploadVedioOptions: {
        format: ['mp4'], // 上传文件类型
        size: 20480// 上传文件大小
      },
      show: false,
      coverImgUrl: '',
      imgName: '',
      // oss返回路径name
      onLineImgPath: '',
      // 基本信息表单
      baseForm: {
        name: '',
        cover: '',
        type: '',
        status: true,
        coverName: ''
      },
      videopath: '',
      videoName: '',
      baseRules: {
        name: [
          { required: true, message: '请输入视频标题', trigger: 'blur' }
        ],
        cover: [{ required: true, validator: coverValidate, trigger: 'change' }],
        type: [{ required: true, message: '请选择视频类型', trigger: 'change' }]
      }
    }
  },
  computed: {
    // editShow:function(){
    //   return
    // }
    // coverImgUrl:function(){
    //   if(this.onLineImgPath){
    //     return ali_oss_path+this.onLineImgPath
    //   }else{
    //     return ''
    //   }
    // }
  },
  mounted() {

  },
  methods: {
    cancleUpload() {
      // console.log(this.$refs.uploadTrainingVideo.customColor)
      this.$message.warning('取消上传视频')
      this.$router.push({ path: '/nursing_training/training_video/video_list' })
    },
    isFinished(res, file) {
      console.log(res)
      console.log(file)
      this.editShow = true
      this.videopath = res.name
      this.videoName = res.name.substr(res.name.lastIndexOf('/') + 1)
      console.log(this.videopath)
      console.log(this.videoName)
    },
    // 封面图片部分
    srcFileSet(fileName, fileType, fileSize) {
      console.log(fileName)
      this.imgName = fileName
    },
    cropSuccess(imgDataUrl, field) {
      //  imgDataUrl其实就是经过base64转码过的图片
      // this.coverImgUrl = imgDataUrl
      // console.log(imgDataUrl)// 这里打印出来的是base64格式的资源，太长了
      // base64转blob格式
      const arr = imgDataUrl.split(','); const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const bdata = new Blob([u8arr], { type: mime })
      console.log(bdata)
      const isLt3M = bdata.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('不得传入大于3M的图片')
        return false
      }
      const date = Date.parse(new Date())
      const point = this.imgName.lastIndexOf('.')
      const suffix = this.imgName.substr(point)
      const fileName = this.imgName.substr(0, point)
      const name = `${fileName}_${date}${suffix}`
      this.imgName = name
      // client.multipartUpload(`nursing_training/test/${name}`, bdata, {
      //   progress: function(p) {
      //     const e = {}
      //     e.percent = Math.floor(p * 100)
      //     // console.log('Progress: ' + p)
      //     // option.onProgress(e)
      //     // console.log(e.percent)
      //     // 显示上传进度条
      //     // this.videoFlag = true
      //     // this.videoUploadPercent = e.percent
      //   }
      // }).then((response) => {
      //   if (response.res.statusCode === 200) {
      //     this.coverImgUrl = ''
      //     this.onLineImgPath = response.name
      //     this.coverImgUrl = ali_oss_path + response.name
      //     this.imgName = response.name.substr(response.name.lastIndexOf('/') + 1)
      //     this.$message.success('上传成功')
      //     return response
      //   }
      // }).catch(err => {
      //   this.$message.error('解析失败')
      // })
      const _this = this
      let checkpoint
      const progress = async function(p, cpt, res) {
        console.log('~~' + p)
        console.log(cpt)
        checkpoint = cpt
      }

      async function multipartUpload() {
        try {
          const result = await client.multipartUpload(`nursing_training/test/${name}`, bdata, {
            progress, checkpoint, partSize: 102400,
            meta: {
              year: 2017,
              people: 'test'
            }
          })
          console.log(result)
          const head = await client.head(`nursing_training/test/${name}`)
          console.log(head)
          if (head.res.statusCode === 200) {
            _this.onLineImgPath = result.name
            _this.coverImgUrl = ''
            _this.coverImgUrl = head.res.requestUrls[0]
            _this.imgName = result.name.substr(result.name.lastIndexOf('/') + 1)
            _this.$message.success('上传成功')
          }
        } catch (e) {
          // 捕获超时异常
          if (e.code === 'ConnectionTimeoutError') {
            console.log('Woops,超时啦!')
            // do ConnectionTimeoutError operation
          }
          console.log(e)
        }
      }

      multipartUpload()
    },
    onSubmit: Debounce(function(formName) {
      this.$refs[formName].validate((valid) => {
        this.baseForm.coverName = this.imgName
        this.baseForm.cover = this.coverImgUrl
        if (this.videopath) {
          this.baseForm.videopath = ali_oss_path + this.videopath
        } else {
          this.baseForm.videopath = ''
        }
        this.baseForm.videoName = this.videoName
        console.log(this.baseForm)
        if (valid) {
          // 请求新增接口
          this.$message.success('请求新增接口~')
          // 请求成功返回列表页面
          this.$router.push({ path: '/nursing_training/training_video/video_list' })
        } else {
          this.$message.error('表单填写不合法')
          return false
        }
      })
    }, 500),
    cancle() {
      this.$confirm('取消后将不保存该视频信息，是否取消?', '提示', {
        confirmButtonText: '取消',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        // client.delete(this.onLineImgPath).then(res=>{
        //   console.log(res)
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   })
        // this.$router.push({ path: '/nursing_training/training_video/video_list' })
        // })
        const deleteData = [this.onLineImgPath, this.videopath]
        if (this.onLineImgPath || this.videopath) {
          client.deleteMulti(deleteData, { quiet: true }).then(res => {
            if (res.res.statusCode == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            // this.$router.push({ path: '/nursing_training/training_video/video_list' })
            }
          })
        }
        this.$router.push({ path: '/nursing_training/training_video/video_list' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '再想想'
        })
      })
    }
  }

}

</script>
<style scoped  lang='scss'>
.gray_box{
  border:1px solid #dddddd;
  margin-bottom: 20px;
  background: #FFFFFF
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
// 封面上传样式
.coverImgBox{
  width:110px;
    height:100px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
