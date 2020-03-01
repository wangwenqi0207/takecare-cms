/**
培训视频列表
 */

<template>
  <div class="comment_box">
    <div class="search_bar">
      <div class="search_bar_left">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label class="searchFormItem">
            <el-input v-model="searchForm.keyWord" class="searchInput" placeholder="请输入内容" clearable>
              <el-select slot="prepend" v-model="searchForm.searchItem" placeholder="请选择" class="input-with-select" style="width:120px">
                <el-option label="授课名称" value="1" />
                <el-option label="授课机构" value="2" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click.prevent="_searchData('click')" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_bar_right">
        <el-button type="primary" size="medium" @click="_addData">新增</el-button>
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
        <el-table-column label="课程名称" prop="name" />
        <el-table-column label="授课机构" prop="idCard" />
        <el-table-column label="授课地址" prop="idCard" />
        <el-table-column label="创建时间" prop="phoneNumber" />
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
              @click="_Scheduling(scope.row.id)"
            >排期</el-button>
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
      tableData,
      checkData: [],
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      totalItems: 0
    }
  },
  created() {

  },
  methods: {
    _searchData(action) {
      console.log(this.searchForm)
      // if (action === 'click') {

      // }
      this.$message.success('搜索数据')
    },
    _addData() {
      this.$router.push('/nursing_training/course_mng/add_course')
    },
    handleEdit(id) {
      this.$router.push({
        path: '/nursing_training/course_mng/look_course',
        query: {
          id: id
        }
      })
    },
    _Scheduling(id) {
      this.$router.push({
        path: '/nursing_training/course_mng/schedule_setting',
        query: {
          id: id
        }
      })
    },
    updateData(id) {
      this.$router.push({
        path: '/nursing_training/course_mng/update_course',
        query: {
          id: id
        }
      })
    },
    removeData(id) {
      this.$confirm('删除后不可恢复，是否确认删除此课程?', '提示', {
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
