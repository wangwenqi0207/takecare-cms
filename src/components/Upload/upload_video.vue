/** 视频文件命名规则
  文件名_时间戳.格式
 */
<template>
  <div :class="{uploadBox:!showFlage}">
    <el-upload
      v-if="showFlage"
      class="upload-demo video_upload"
      drag
      action="#"
      :before-upload="beforeVideoUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :http-request="videoUpload"
      :show-file-list="false"
      :limit="limit"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
        <slot name="Tip" />
      </div>
      <!-- <div class="el-upload__tip" slot="tip">只能上传.mp4文件，且不超过10M</div> -->
    </el-upload>
    <div v-if="!showFlage">
      <div v-if="fileName">{{ fileName }}</div>
      <!-- <el-progress v-if="!showFlage" :percentage="videoUploadPercent" :status="progressStatus" :color="customColor" :format="progressFormat"></el-progress> -->
      <div style="text-align:right;height:20px;" v-html="finish" />
      <el-progress v-if="!showFlage" :show-text="false" :percentage="videoUploadPercent" :color="customColor" :format="progressFormat" />
    </div>
  </div>
</template>

<script>
import client from '@/utils/ali-oss.js'
export default {
  'name': 'uploadVideo',
  props: {
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      videoUploadPercent: 0,
      customColor: '#67C23A',
      progressStatus: 'warning',
      fileName: '',
      showFlage: true,
      sss: 55,
      finish: ''
    }
  },
  methods: {
    beforeVideoUpload(file, fileList) {
      let extension = false
      //  console.log(file.name.substr(file.name.lastIndexOf('.')))
      const point = file.name.lastIndexOf('.')
      const suffix = file.name.substr(point) //    后缀
      const type = file.name.substr(point + 1) // 类型
      const fileName = file.name.substr(0, point)
      const size = file.size / 1024 / 1024 // 文件大小：单位MB

      this.options.format.map(n => {
        if (type === n) {
          extension = true
        }
      })
      if (!extension) {
        this.$message.warning('上传文件只能是' + this.options.format + '格式!')
      }

      return extension
    },
    videoUpload(file) {
      // console.log(file)
      const files = file.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const type = files.name.substr(point + 1)
      const fileName = files.name.substr(0, point)
      const size = files.size / 1024 / 1024 // 文件大小：单位MB

      this.fileName = files.name // 结构里显示文件名
      this.showFlage = false

      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      // const savePath=`Videos/training_video/${this.$moment(new Date()).format('YYYY-MM-DD')}/${name}`
      const savePath = `Videos/training_video/${this.$moment(new Date()).format('YYYY-MM-DD')}/${fileName}${suffix}` // 测试存储文件

      client.multipartUpload(savePath, file.file, {
        progress: function(p) {
          const e = {}
          e.percent = Math.floor(p * 100)
          file.onProgress(e)
          // console.log(e.percent)
        }
      }).then(response => {
        if (response.res.status === 200) {
          // console.log(response)
          file.onSuccess(response, file)
          this.$message.success(`${files.name} 文件上传成功`)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleProgress(event, file, fileList) {
      this.videoUploadPercent = Number(event.percent.toFixed(0))
      if (event.percent === 100) {
        this.finish = '<div><i class="el-icon-success" style="color:#67C23A"></i>已完成</div>'
      }
    },
    handleSuccess(response, file, fileList) {
      // this.progressStatus = 'success'
      this.$emit('isFinished', response, file)
    },
    handleError(err, file, fileList) {

    },
    handleExceed(files, fileList) {
      this.$message.error('只能上上传一个视频！')
    },
    //  cancleUpload(){
    //    this.$message.warning('取消上传视频')
    //    this.$router.push({path:'/nursing_training/training_video/video_list'})
    //  },
    cancle() {
      this.$confirm('取消后将不保存该视频信息，是否取消?', '提示', {
        confirmButtonText: '取消',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '再想想'
        })
      })
    },
    progressFormat(percentage) {
      //  if(percentage===100){
      //   this.finish='<div><i class="el-icon-success" style="color:#67C23A"></i>已完成</div>'
      //  }
      return percentage === 100 ? '完成' : `${percentage}%`
    }
  }

}

</script>
<style scoped  lang='scss'>
.uploadBox{
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 10px
}
</style>
