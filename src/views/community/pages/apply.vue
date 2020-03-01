<template>
  <div id="apply">
    <div class="tableList" style="height:100%">
      <el-table
        v-loading="listLoading"
        class="table_border"
        :data="tableData"
        border
        highlight-current-row
        :style="tableStyle"
        :header-cell-style="headerCellStyle"
        max-height="600"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="userName"
          label="用户名"
          width="200"
          align="center"
          sortable
        />
        <el-table-column
          prop="fullName"
          label="姓名"
          width="150"
          align="center"
          sortable
        />
        <el-table-column
          prop="gender"
          label="性别"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="mobileNumber"
          label="手机号"
          width="200"
          sortable
          align="center"
        />
        <el-table-column
          prop="idNumber"
          label="身份证"
          width="180"
          sortable
          align="center"
        />
        <el-table-column
          prop="createdUTC"
          label="申请时间"
          width="180"
          sortable
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</p>
            <p v-else>{{ scope.row.createdUTC }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          width="130"
          sortable
          align="center"
        />
        <el-table-column
          prop="denialReason"
          label="拒绝原因"
          sortable
          width="200"
          align="center"
        />
        <el-table-column
          prop="customerName"
          label="操作"
          align="center"
          fixed="right"
          min-width="200px"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status=='待审批'"
              type="primary"
              size="medium"
              @click="agree_apply(scope.$index, scope.row)"
            >同意</el-button>
            <el-button
              v-if="scope.row.status=='待审批'"
              type="primary"
              size="medium"
              @click="refuse_apply(scope.$index, scope.row);dialogFormVisible = true"
            >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_nation" style="margin-top:26px;">
      <el-pagination
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <div>
      <el-dialog title="请填写拒绝原因" :visible.sync="dialogFormVisible" width="500px">
        <el-form>
          <el-input
            v-model="textarea"
            type="textarea"
            placeholder="请输入拒绝原因"
            rows="4"
            resize="none"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="refuse_apply2">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { applSearch, agreeApply, refuseApply } from '@/api/community'
import { offset } from '@/utils/offset'

export default {
  name: 'Apply',
  data() {
    return {
      offset: 8,
      listLoading: false,
      // 分页
      currentPage: 1,
      total: 200,
      tableData: [],
      tableStyle: 'width:100%;',
      show_list_line: true,
      multipleSelection: [],
      dialogFormVisible: false,
      textarea: '',
      id: ''
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 同意
    agree_apply(index, row) {
      console.log(row.id)
      var data = {
        id: row.id
      }
      this.$confirm('确定同意该成员加入吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        agreeApply(data).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 拒绝
    refuse_apply(index, row) {
      // console.log(row.id);
      this.id = row.id
    },
    refuse_apply2() {
      // console.log(this.id)
      this.dialogFormVisible = false
      var data = {
        'data': {
          'id': this.id,
          'status': 0,
          'denialReason': this.textarea
        }
      }
      refuseApply(data).then(res => {
        console.log(res)
        this.fetchData()
        this.$message({
          type: 'success',
          message: '已拒绝'
        })
      })
    },
    // 获取所有申请信息
    fetchData() {
      const community_Id = this.$route.query.id
      var data = {
        'data': {
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ],
          'filters': [
            {
              'key': 'CommunityId',
              'value': community_Id
            }
          ]
        }
      }
      applSearch(data).then(res => {
        console.log('申请', res)
        const Data = JSON.parse(JSON.stringify(res.data))
        Data.forEach((item, index) => {
          if (item.gender == 0) {
            item.gender = '男'
          }
          if (item.gender == 1) {
            item.gender = '女'
          }
          if (item.status == 0) {
            item.status = '待审批'
            this.show = true
          }
          if (item.status == 1) {
            item.status = '同意'
          }
          if (item.status == 2) {
            item.status = '拒绝'
          }
        })
        this.listLoading = false
        this.tableData = Data
        this.total = res.pager.totalItems
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.fetchData()
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
.rela{
  position: relative;
}
.el-dropdown-menu{
  top: 250px !important;
}
.search_bar{
  display: flex;
  justify-content: space-between;
}
.search_bar_right{
  margin-right:30px;
}
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
.table_border{
  border: 1px solid #ddd;
}
.search_bar_left{
  display: flex;
}
.demonstration{
  margin-left: 20px;
  margin-right: 10px;
}
</style>

<style lang='scss'>
.searchFormItem{
  .el-form-item__content{
    width: 100%!important
  }
}
</style>

