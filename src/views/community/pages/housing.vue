<template>
  <div id="housing">
    <div class="housing_button">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        @click="add_housing"
      >新增</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="remove_housing"
      >
        删除</el-button>
    </div>
    <div class="housing_table">
      <el-table
        class="table_border"
        :data="housing_table"
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
          prop="name"
          align="center"
          label="小区名称"
          width="180"
        />
        <el-table-column
          prop="address"
          align="center"
          label="小区地址"
        />
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
  </div>
</template>

<script>
import { residentialArea, AreaRemove } from '@/api/community'
export default {
  name: 'Housing',
  data() {
    return {
      currentPage: 1,
      total: 200,
      multipleSelection: [],
      housing_table: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '100px',
      communityId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const community_Id = this.$route.query.id
      var data = {
        'data': {
          'numberPerPage': 10,
          'currentPage': this.currentPage,
          'filters': [
            {
              'key': 'CommunityId',
              'value': community_Id
            }
          ]
        },
        'correlationId': '7db7a6ea-aab9-45fa-9ac3-3c9d795ff956',
        'invokingUser': '8a08cd6e-ed48-43ef-8b6b-9a0eff43212a',
        'businessProcessName': 'CommunitySearchService'
      }
      residentialArea(data).then(res => {
        // console.log(res)
        this.housing_table = res.data
        this.total = res.pager.totalItems
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection[0])
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    // 删除小区
    remove_housing() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        var data = {
          id: this.multipleSelection[this.multipleSelection.length - 1].id
        }
        this.$confirm('确定要将该条删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          AreaRemove(data).then(res => {
          // console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$alert('请先选择一条数据，进行修改', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.getList()
    },
    add_housing() {
      this.$router.push({
        path: '/community/community_list/add_housing',
        query: {
          communityId: this.$route.query.id
        }
      })
    }
  }
}
</script>
<style scoped>
.housing_table{
  margin-top:20px;
}
.group_list{
  width: 93%;
  height: 300px;
  border:1px solid #EBEEF5;
  margin:0 auto;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 5px;
}
.group_list p{
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left:20px;
  border-bottom:1px solid #EBEEF5;
  cursor: pointer;
}
.group_list p:hover{
  color:#fff;
  background: #409EFF;
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

