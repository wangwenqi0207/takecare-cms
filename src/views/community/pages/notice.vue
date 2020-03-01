<template>
  <div id="notice">
    <div class="housing_button">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      >新增</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="deleteNotice"
      >
        删除</el-button>
    </div>

    <div class="housing_table">
      <el-table
        class="table_border"
        :data="tableData"
        border
        highlight-current-row
        style="width:100%"
        :header-cell-style="headerCellStyle"
        max-height="600"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          align="center"
        />
        <el-table-column
          prop="content"
          align="center"
          label="公告内容"
        />
        <el-table-column
          prop="assistantFullName"
          align="center"
          label="社区助理"
          width="180"
        />
        <el-table-column
          prop="createdUTC"
          align="center"
          label="新增时间"
          width="180"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</p>
            <p v-else>{{ scope.row.createdUTC }}</p>
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
      <el-dialog title="社区公告" :visible.sync="dialogFormVisible" width="500px">
        <el-form>
          <el-input
            v-model="textarea"
            type="textarea"
            placeholder="请输入内容"
            rows="6"
            resize="none"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNotice()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { annSearch, annAdd, annDelete } from '@/api/community'
import { offset } from '@/utils/offset'

export default {
  name: 'Notice',
  data() {
    return {
      offset: 8,
      listLoading: false,
      // 分页
      currentPage: 1,
      total: 200,
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      show_list_line: true,
      multipleSelection: [],
      dialogFormVisible: false,
      textarea: ''
    }
  },
  created() {
  },
  mounted() {
    this.getIofo()
    this.offset = offset()
  },
  methods: {
    // 获取页面信息
    getIofo() {
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
      annSearch(data).then(res => {
        console.log('公告信息', res.data)
        this.tableData = res.data
        this.total = res.pager.totalPages
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection[0])
    },
    // 查看个人资料  路由跳转 传参
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({
        path: '/community/community_list/look_community',
        params: {
          index,
          row
        }
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.getIofo()
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    // select 点击
    handleCommand(command) {
      this.community_state = command.label
    },
    // 增加
    addNotice() {
      this.dialogFormVisible = false
      // console.log(this.textarea)
      var data = {
        'data': {
          'communityId': this.$route.query.id,
          'content': this.textarea,
          'assistantUserId': 'b31d750a-fd1d-4862-bf19-38dff21ed6d6',
          'assistantUserName': '637041925627092178',
          'assistantFullName': '637041925627092190',
          'id': null
        },
        'correlationId': 'f92b63ab-e806-4652-9c23-b601ef3b5198',
        'invokingUser': 'e9b6e727-03b5-45c2-958e-a1ee1a3d9ba8',
        'businessProcessName': 'CommunityAnnouncementCreateService'
      }
      annAdd(data).then(res => {
        // console.log(res)
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.textarea = ''
        this.getIofo()
      })
    },
    // 删除
    deleteNotice() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        var data = {
          id: this.multipleSelection[this.multipleSelection.length - 1].id
        }
        annDelete(data).then(res => {
          console.log(res)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getIofo()
        })
      } else {
        this.$alert('请先选择一条数据，进行删除', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tableList{
  margin-top:20px;
}
.housing_table{
  margin-top:20px;
}
.dialog-footer{
  display:flex;
  justify-content: center;
}
.dialog-footer .el-button:nth-child(1){
  margin-right: 30px;
}
.table_border{
  border: 1px solid #ddd;
}
</style>
