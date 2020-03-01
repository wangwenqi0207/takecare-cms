/**
培训视频列表
 */

<template>
  <div class="comment_box">
    <div v-if="isNative">
      <div class="search_bar" style="margin-bottom:20px;">
        <div class="search_bar_left">
          <span style="font-size:26px;font-weigth:700;margin-right:15px;">护理技能考核</span>
          <span>义乌怡乐新村养老院</span>
        </div>
        <div class="search_bar_right">
          <el-button type="primary" size="medium" @click="_addData">新增</el-button>
          <el-button type="primary" size="medium">发布</el-button>
          <el-button type="primary" size="medium">删除</el-button>
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
          <el-table-column label="批次" prop="name" />
          <el-table-column label="进度状态" prop="idCard" />
          <el-table-column label="开始时间" prop="idCard" />
          <el-table-column label="结束时间" prop="phoneNumber" />
          <el-table-column label="已报名人数/人数限制" prop="phoneNumber" />
          <el-table-column label="通过人数/考核人数" prop="phoneNumber" />
          <el-table-column label="发布状态" prop="phoneNumber" />
          <el-table-column
            prop="action"
            label="操作"
            min-width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row.id)"
              >查看</el-button>
              <el-button
                type="primary"
                size="small"
                @click="updateData(scope.row.id)"
              >修改</el-button>
              <el-button
                v-if="scope.row.type==1"
                type="primary"
                size="small"
                @click="_upshelf(scope.row.id)"
              >发布</el-button>
              <el-button
                v-if="scope.row.type==2"
                type="info"
                size="small"
                @click="_lowershelf(scope.row.id)"
              >下架</el-button>
              <el-button
                type="info"
                size="small"
                @click="removeData(scope.row.id)"
              >删除</el-button>
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
      <el-dialog
        id="billAccount"
        :title="title"
        :visible.sync="centerDialogVisible"
        width="600px"
      >
        <el-form ref="searchForm1" :inline="true" :model="searchForm1" :rules="rules" class="demo-form-inline" label-width="120">
          <el-form-item
            label="时间选择："
            style="width:100%"
            prop="date"
          >
            <el-date-picker
              v-model="searchForm1.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item
            label="人数限制："
            style="width:100%"
            prop="number"
          >
            <el-input-number v-model="searchForm1.number" :min="1" label="描述文字" @change="handleChange" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-else style="height:100%;">
      <router-view />
    </div>
  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
const tableData = [
  {
    id: '1',
    name: '张三',
    idCard: '11111111111111',
    status: 1,
    phoneNumber: 13666666666,
    result: 1,
    assessmentName: '李时',
    type: 1
  },
  {
    id: '2',
    name: '张三',
    idCard: '11111111111111',
    status: 1,
    phoneNumber: 13666666666,
    result: 3,
    assessmentName: '李时',
    type: 2
  }
]
export default {
  name: 'StudentList',
  components: {
  },
  data() {
    return {
      isNative: true,
      title: '新增排期',
      tableStyle:
        'width:100%;',
      listLoading: false,
      tableData,
      checkData: [],
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      totalItems: 0,
      centerDialogVisible: false,
      searchForm1: {
        date: '',
        number: 1
      },
      rules: {
        number: [
          { required: true, message: '请输入人数限制', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择课程日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (this.$route.path === '/nursing_training/assessment_mng/schedule_setting') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  methods: {
    handleChange(value) {
    //    console.log(value);
    },
    cancelDialog() {
      if (this.title == '新增排期') {
        this.$confirm('取消后将不保存该排期，是否取消?', '提示', {
          confirmButtonText: '取消',
          cancelButtonText: '再想想',
          type: 'warning'
        }).then(() => {
          this.centerDialogVisible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消取消'
          })
        })
      } else {
        this.centerDialogVisible = false
      }
    },
    submit() {
      console.log(this.searchForm1)
      this.$refs.searchForm1.validate((valid) => {
        if (valid) {
        //   if (this.searchForm1.excelFile && this.searchForm1.excelFile != '') {

        //     const formData = new FormData()
        //     formData.append('excelFile', this.searchForm1.excelFile)
        //     billUpload(formData).then(res => {
        //       console.log('66666', res)
        //       if (res.resultCode == '000000') {
        //         this.$message({
        //           message: '导入成功',
        //           type: 'success'
        //         })
        //         this.centerDialogVisible = false
        //         this.currentPage = 1
        //         this.getDataList()
        //       } else {
        //         this.$message({
        //           message: '导入失败' + res.resultMsg,
        //           type: 'warning'
        //         })
        //         this.centerDialogVisible = false
        //       }
        //     }).catch(err => {
        //       this.$message({
        //         message: '导入失败' + err,
        //         type: 'warning'
        //       })
        //       this.centerDialogVisible = false
        //     })
        //   } else {
        //     this.$message({
        //       message: '请选择要上传文件',
        //       type: 'warning'
        //     })
        //   }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _addData() {
      // this.title = '新增排期'
      // this.centerDialogVisible = true
      // this.$nextTick(() => {
      //   this.$refs.searchForm1.resetFields()
      // })
      this.$router.push({
        path: '/nursing_training/assessment_mng/schedule_setting/schedule_add'
      })
    },
    handleEdit(id) {
      this.$router.push({
        path: '/nursing_training/assessment_mng/schedule_setting/schedule_detail',
        query: {
          id: id
        }
      })
    },
    _upshelf() {
      this.$confirm('发布后用户将报名该学期课程，是否确认发布?', '提示', {
        confirmButtonText: '发布',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // orgDelete({ id: id }).then(res => {
        //     if (res) {
        //         this.currentPage = 1
        //         this.filterDataObj.currentPage = 1
        //         this.fetchData()
        //         this.$message({
        //         message: '删除成功',
        //         type: 'success'
        //         })
        //     } else {
        //         this.$message({
        //         message: '删除失败',
        //         type: 'warning'
        //         })
        //     }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    _lowershelf(id) {
      this.$confirm('下架后用户将无法报名该学期，是否下架此学期?', '提示', {
        confirmButtonText: '下架',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        // orgDelete({ id: id }).then(res => {
        //     if (res) {
        //         this.currentPage = 1
        //         this.filterDataObj.currentPage = 1
        //         this.fetchData()
        //         this.$message({
        //         message: '删除成功',
        //         type: 'success'
        //         })
        //     } else {
        //         this.$message({
        //         message: '删除失败',
        //         type: 'warning'
        //         })
        //     }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下架'
        })
      })
    },
    updateData(id) {
      this.title = '修改排期'
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.$refs.searchForm1.resetFields()
        // this.searchForm1.excelFile = ''
        // var test = document.getElementById('fileSelect')
        // test.value = ''
      })
    },
    removeData(id) {
      this.$confirm('删除后将无法恢复该学期，是否删除此学期?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        // orgDelete({ id: id }).then(res => {
        //     if (res) {
        //         this.currentPage = 1
        //         this.filterDataObj.currentPage = 1
        //         this.fetchData()
        //         this.$message({
        //         message: '删除成功',
        //         type: 'success'
        //         })
        //     } else {
        //         this.$message({
        //         message: '删除失败',
        //         type: 'warning'
        //         })
        //     }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    checkOut(val) {
      this.checkData = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
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
