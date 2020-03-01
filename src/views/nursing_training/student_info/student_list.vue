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
                <span v-else>状态选择</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{flag:'1',label:'全部状态',value:''}">全部状态</el-dropdown-item>
                <el-dropdown-item v-for="(item,index) in typeOptions" :key="index" :command="{flag:'1',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item label="">
            <el-dropdown :hide-on-click="true" class="rela " @command="handleCommand">
              <span class="el-dropdown-link">
                <span v-if="flag2">{{ flag2 }}</span>
                <span v-else>结果筛选</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{flag:'2',label:'全部结果',value:''}">全部结果</el-dropdown-item>
                <el-dropdown-item v-for="(item,index) in statusOptions" :key="index" :command="{flag:'2',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item label class="searchFormItem">
            <el-input v-model="searchForm.keyWord" class="searchInput" placeholder="请输入内容" clearable>
              <el-select slot="prepend" v-model="searchForm.searchItem" placeholder="请选择" class="input-with-select" style="width:120px">
                <el-option label="姓名" value="1" />
                <el-option label="身份证号" value="2" />
                <el-option label="联系电话" value="3" />
                <el-option label="考评员" value="4" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click.prevent="_searchData('click')" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_bar_right">
        <el-button type="primary" size="medium" @click="_addData">批量导入</el-button>
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
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column label="姓名" width="180" prop="name" />
        <el-table-column label="身份证号" width="180" prop="idCard" />
        <el-table-column prop="status" label="报名状态">
          <template slot-scope="scope">
            <div>
              <p v-if="scope.row.status=='1'">已报名</p>
              <p v-else-if="scope.row.status=='2'">未报名</p>
              <p v-else>{{ scope.row.status }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" width="180" prop="phoneNumber" />
        <el-table-column prop="result" label="考核结果">
          <template slot-scope="scope">
            <div>
              <p v-if="scope.row.result=='1'">已通过</p>
              <p v-else-if="scope.row.result=='2'">未通过</p>
              <p v-else-if="scope.row.result=='3'">待考核</p>
              <p v-else>{{ scope.row.result }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="assessmentName" label="考评员">
          <template slot-scope="scope">
            <div>
              <p v-if="scope.row.result=='3'">/</p>
              <p v-else>{{ scope.row.assessmentName }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="action"
          label="操作"
          min-width="120"
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
              @click="_remove(scope.row.id)"
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
      title="导入账单"
      :visible.sync="centerDialogVisible"
      width="600px"
    >
      <el-form ref="searchForm1" :inline="true" :model="searchForm1" :rules="rules" class="demo-form-inline" label-width="120">
        <el-form-item
          label="批量导入："
          style="width:100%"
        >
          <input id="fileSelect" className="file" type="file" name="upload" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" placeholder="点击选择上传文件" @change="ProcessFile">
        </el-form-item>
        <el-form-item
          label="Excel模板："
          style="width:100%"
        >
          <p style="color:#66b1ff;cursor:pointer;" @click="dowmLoad"><u>点击下载</u></p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
const typeOptions = [
  {
    value: '1',
    label: '已报名'
  },
  {
    value: '2',
    label: '未报名'
  }
]
const statusOptions = [
  {
    value: '1',
    label: '已通过'
  },
  {
    value: '2',
    label: '未通过'
  },
  {
    value: '2',
    label: '待考核'
  }
]
const tableData = [
  {
    id: '1',
    name: '张三',
    idCard: '11111111111111',
    status: 1,
    phoneNumber: 13666666666,
    result: 1,
    assessmentName: '李时'
  },
  {
    id: '2',
    name: '张三',
    idCard: '11111111111111',
    status: 1,
    phoneNumber: 13666666666,
    result: 3,
    assessmentName: '李时'
  }
]
export default {
  name: 'StudentList',
  components: {
  },
  data() {
    return {
      tableStyle:
        'width:100%;',
      searchForm: {
        type: '0',
        searchItem: '1'
      },
      listLoading: false,
      flag1: '全部状态',
      flag2: '考核结果',
      flag1Val: '',
      flag2Val: '',
      statusOptions,
      typeOptions,
      tableData,
      checkData: [],
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      totalItems: 0,
      centerDialogVisible: false,
      searchForm1: {
        excelFile: ''
      },
      rules: {
      }
    }
  },
  created() {

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
    // 图片上传相关
    ProcessFile() {
      this.searchForm1.excelFile = document.getElementById('fileSelect').files[0]
    },
    submit() {
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
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.$refs.searchForm1.resetFields()
        this.searchForm1.excelFile = ''
        var test = document.getElementById('fileSelect')
        test.value = ''
      })
    },
    dowmLoad() {
      this.$message.success('下载成功')
    },
    handleEdit(id) {
      this.$router.push({
        path: '/nursing_training/student_info/student_detail',
        query: {
          id: id
        }
      })
    },
    _remove(id) {
      this.$confirm('删除后不可恢复，是否确认删除此学员信息?', '提示', {
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
