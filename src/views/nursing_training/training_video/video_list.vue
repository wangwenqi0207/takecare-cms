/**
培训视频列表
 */

<template>
  <div class="comment_box">
    <div class="search_bar">
      <div class="search_bar_left">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="">
            <el-dropdown :hide-on-click="true" class="rela " @command="handleCommand">
              <span class="el-dropdown-link">
                <span v-if="flag1">{{ flag1 }}</span>
                <span v-else>类型选择</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{flag:'1',label:'全部类型',value:''}">全部类型</el-dropdown-item>
                <el-dropdown-item v-for="(item,index) in typeOptions" :key="index" :command="{flag:'1',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item label="">
            <el-dropdown :hide-on-click="true" class="rela " @command="handleCommand">
              <span class="el-dropdown-link">
                <span v-if="flag2">{{ flag2 }}</span>
                <span v-else>状态筛选</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{flag:'2',label:'全部状态',value:''}">全部状态</el-dropdown-item>
                <el-dropdown-item v-for="(item,index) in statusOptions" :key="index" :command="{flag:'2',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item label class="searchFormItem">
            <el-input v-model="searchForm.keyWord" class="searchInput" placeholder="请输入内容" clearable>
              <el-select slot="prepend" v-model="searchForm.searchItem" placeholder="请选择" class="input-with-select" style="width:120px">
                <el-option label="视频标题" value="title" />
                <el-option label="视频编号" value="code" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click.prevent="_searchData('click')" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_bar_right">
        <el-button type="primary" size="medium" icon="el-icon-setting" plain @click.prevent="_setting">设置</el-button>
        <el-button type="primary" size="medium" @click="_addData">上传视频</el-button>
        <!-- <el-button v-if="resourcePermission['新增']" type="primary" size="medium" @click="_addData">上传视频</el-button> -->
        <el-button v-if="resourcePermission['修改']" type="primary" size="medium" @click="_updateData">修改</el-button>
        <el-button v-if="resourcePermission['删除']" type="primary" size="medium" @click="_deleteData">删除</el-button>
      </div>
    </div>
    <div class="tableList" style="height:83%">
      <el-table
        ref="vedioesTable"
        v-loading="listLoading"
        class="table_border"
        :data="tableData"
        border
        highlight-current-row
        height="100%"
        :style="tableStyle"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="mini"
        max-height="600"
        @selection-change="checkOut"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="视频封面" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.picPrimaryInfo.url" alt="图片加载失败" :title="scope.row.picPrimaryInfo.name" max-width="30" height="30" style="max-width:30px">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="视频标题" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>标题: {{ scope.row.title }}</p>
              <div slot="reference" class="name-wrapper" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                {{ scope.row.title }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="视频类型" sortable>
          <template slot-scope="scope">
            <div>
              <!-- <p v-if="scope.row.type==='1'">生活照料</p>
              <p v-else-if="scope.row.type==='2'">医疗护理</p>
              <p v-else>{{ scope.row.type }}</p> -->
              <P>{{ typeMap[scope.row.type] }}</P>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="视频编码" sortable>
          <template slot-scope="scope">
            <div>
              {{ scope.row.code }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="upTime" label="上传时间" sortable />
        <el-table-column prop="time" label="视频时长" sortable />
        <el-table-column prop="paly_num" label="播放量(次)" sortable />
        <el-table-column prop="status" label="状态" sortable>
          <template slot-scope="scope">
            <p v-if="scope.row.status==='1'">已发布</p>
            <p v-else-if="scope.row.status==='0'">未发布</p>
            <p v-else>{{ scope.row.status }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="操作"
          min-width="120"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="medium"
              @click="look_up(scope.row.id)"
            >播放</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_nation" style="margin-top:26px;">
      <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="totalItems"
        @current-change="handleCurrentChange"
      />
    </div>
    <my-upload v-model="show" field="img" :width="220" :height="200" img-format="png" :size="sizeScale" @src-file-set="srcFileSet" @crop-success="cropSuccess" />
  </div>
</template>

<script>
// import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
import permissionData from '@/utils/resPermission'

const typeOptions = [
  {
    value: '1',
    label: '生活照料'
  },
  {
    value: '2',
    label: '医疗护理'
  }
]
const typeMap = {
  '1': '生活照料',
  '2': '医疗护理'
}
const statusOptions = [
  {
    value: '1',
    label: '已发布'
  },
  {
    value: '2',
    label: '未发布'
  }
]
const tableData = [
  {
    picPrimaryInfo: {
      url: 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/nursing_training/test/mao1_1569204539000.jpg',
      name: '视频1'
    },
    id: '1',
    title: '视频1--标题',
    type: '1',
    code: '8877452W-sfjos',
    upTime: '2019/09/19 14:39',
    time: '60',
    paly_num: '111',
    status: '1'
  },
  {
    picPrimaryInfo: {
      url: 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/nursing_training/test/mao1_1569204539000.jpg',
      name: '视频2'
    },
    id: '2',
    title: '视频2--标题',
    type: '2',
    code: '8877452W-sfjos',
    upTime: '2019/09/19 14:39',
    time: '10',
    paly_num: '100',
    status: '0'
  }
]
export default {
  name: 'VideoList',
  components: {
    'my-upload': myUpload
  },
  data() {
    return {
      tableStyle:
        'width:100%;',
      searchForm: {
        type: '0',
        searchItem: 'title'
      },
      listLoading: false,
      flag1: '全部类型',
      flag2: '全部状态',
      flag1Val: '',
      flag2Val: '',
      statusOptions,
      typeOptions,
      typeMap,
      tableData,
      checkData: [],
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      totalItems: 200,
      show: false,
      sizeScale: 1.1,
      // 权限相关
      resourcePermission: []
    }
  },
  created() {
  },
  mounted() {
    this.resourcePermission = permissionData('培训视频')
  },
  methods: {
    handleCommand(command) {
      // console.log(command)
      if (command.flag === '1') {
        this.flag1 = command.label
        this.flag1Val = command.value
      }
      if (command.flag === '2') {
        this.flag2 = command.label
        this.flag2Val = command.value
      }
      // this.$message.info(command)
    },
    _searchData(action) {
      this.listLoading = true
      console.log(this.searchForm)
      //  flag1: '全部类型',
      // flag2: '全部状态',
      // flag1Val: '',
      // flag2Val: '',
      console.log(this.flag1)
      console.log(this.flag1Val)
      console.log(this.flag2)
      console.log(this.flag2Val)
      // if (action === 'click') {

      // }
      this.$message.success('搜索数据')
    },
    _addData() {
      this.$message.success('上传视频')
      // this.show=true
      this.$router.push({ path: `/nursing_training/training_video/add_video` })
    },
    _updateData() {
      if (this.checkData.length !== 1) {
        this.$message.warning('请选择一条数据进行修改')
      } else {
        this.$message.success('进入修改~')
        const queryData = {
          'id': this.checkData[0].id
        }
        this.$router.push({ path: `/nursing_training/training_video/update_video`, query: queryData })
      }
    },
    _deleteData() {
      if (this.checkData.length !== 1) {
        this.$message.warning('请选择一条数据进行删除')
      } else {
        this.$message.success('删除数据')
      }
    },
    _setting() {
      this.$message.success('设置')

      this.$router.push({ path: `/nursing_training/training_video/setting_video` })
    },
    look_up(id) {
      this.$message.success(id)
    },
    checkOut(val) {
      this.checkData = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    // 缩略图部分
    srcFileSet(file) {
      console.log(file)
    },
    cropSuccess(imgDataUrl) {
      console.log(imgDataUrl)
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
      // client.multipartUpload('product/test/base64.jpg', bdata, {
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
      // }).then((val) => {
      //   console.info('66', val)
      //   if (val.res.statusCode === 200) {
      //     // this.videoFlag = false
      //     // this.videoUploadPercent = 0
      //     // // this.videoForm.videoUploadId = res.data.uploadId
      //     // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
      //     // option.onSuccess(val)
      //     return val
      //   } else {
      //     // option.onError('上传失败')
      //   }
      // }, err => {
      //   // option.onError('上传失败')
      //   reject(err)
      // })
      // console.log(bdata)
      // console.log(new Blob([u8arr], { type: mime })) ;//这里打印base64转成blob的资源，根据自己的项目需求去转吧
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 3) {
        return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;'
      }
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center'
    }
  }

}

</script>
<style scoped lang="scss" >
.search_bar{
  display: flex;
  justify-content: space-between;
}
.table_border{
  border: 1px solid #ddd;
}
</style>
