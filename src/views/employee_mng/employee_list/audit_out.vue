// 商品管理
<template>
  <div
    class="comment_box"
    style="padding:0px;margin-top:0px;margin-left:0px;"
  >
    <div class="search_bar" style="padding:0px;margin:0px;">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >

        <el-form-item label>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ all_type }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" align="center">
              <el-dropdown-item
                v-for="item in all_type_list"
                :key="item.value"
                :command="{value:item.value,label:item.label,flag:1}"
              > {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label>
          <!-- <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ all_org }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" align="center">
              <el-dropdown-item
                v-for="item in all_org_list"
                :key="item.value"
                :command="{value:item.value,label:item.label,flag:2}"
              > {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-select
            v-model="all_orgValue"
            v-el-select-loadmore="loadmore"
            placeholder="请选择所属机构"
            filterable
            :loading="false"
            loading-text="加载中......"
            size="small"
            clearable
          >
            <!-- multiple
              v-el-select-loadmore="loadmore" -->
            <el-option
              v-for="(item,index) in all_org_list"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ all_status }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" align="center">
              <el-dropdown-item
                v-for="item in all_status_list"
                :key="item.value"
                :command="{value:item.value,label:item.label,flag:3}"
              > {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item> -->

        <el-form-item
          label
          class="searchFormItem"
        >
          <el-input
            v-model="org_name"
            class="input"
            placeholder="请输入：人员编号/登录账号/姓名"
            clearable
            style="width:500px"
          >
            <el-select slot="prepend" v-model="org_nameType" placeholder="请选择" style="width:120px;">
              <el-option label="人员编号" value="1" />
              <el-option label="登录账号" value="2" />
              <el-option label="姓名" value="3" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchData" />
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="tableList"
      style="height:83%"
    >
      <el-table
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="code"
          label="人员编号"
          width="220"
        />
        <el-table-column
          prop="userName"
          label="登录账号"
          width="150"
        />
        <el-table-column
          prop="firstName"
          label="姓名"
          width="150"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.lastName+ scope.row.firstName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.sex==1">女</p>
            <p v-else>男</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="identityCard"
          label="身份证"
          width="180"
        />
        <el-table-column
          prop="identityCardCertificationStatus"
          label="公安实名认证"
          width="170"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.identityCardCertificationStatus==1">通过</p>
            <p v-else>未通过</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="socialSecurityStatus"
          label="社保状态"
          width="150"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.socialSecurityStatus==0">停缴</p>
            <p v-else-if="scope.row.socialSecurityStatus==1">未缴</p>
            <p v-else-if="scope.row.socialSecurityStatus==2">在缴</p>
            <p v-else>{{ scope.row.socialSecurityStatus }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="人员分类"
          width="150"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.type==0">护工</p>
            <p v-else-if="scope.row.type==1">护士</p>
            <p v-else-if="scope.row.type==2">医生</p>
            <p v-else>{{ scope.row.type }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="qualificationCertificateType"
          label="人员资质"
          width="170"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.qualificationCertificateType==0">护理资格证</p>
            <p v-else>{{ scope.row.qualificationCertificateType }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationName"
          label="所属机构"
          width="150"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="150"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.status==0">待审核</p>
            <p v-else-if="scope.row.status==1">审核通过</p>
            <p v-else-if="scope.row.status==2">审核不通过</p>
            <p v-else>{{ scope.row.status }}</p>
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
              size="medium"
              @click="handleEdit(scope.row.id)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="page_nation"
      style="margin-top:15px;"
    >
      <!-- <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
      <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="totalItems1"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { staffSearch } from '@/api/nursingStaff'
import { orgSearch } from '@/api/organization'

export default {
  directives: {
    'el-select-loadmore': {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
          if (condition) {
            binding.value()
          }
        })
      }
    }
  },
  props: { 'tableData': {
    type: Array,
    default: null
  }, 'tabId': {
    type: String,
    default: 'first'
  }, 'totalItems1': {
    type: Number,
    default: 0
  }},
  data() {
    return {
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      tableData1: [],
      tableStyle: 'width:100%;',
      org_name: '',
      org_nameType: '1',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      checked: 0,
      // 搜索相关
      all_type_list: [{
        value: '',
        label: '全部人员'
      }, {
        value: '0',
        label: '护工'
      }, {
        value: '1',
        label: '护士'
      }, {
        value: '2',
        label: '医生'
      }
      ],
      all_type: '全部人员',
      all_typeValue: '',
      all_org_list: [],
      orgListCrrentPage: 1,
      all_org: '全部机构',
      all_orgValue: '',
      all_status_list: [{
        value: '',
        label: '全部状态'
      }, {
        value: '0',
        label: '待审核'
      }, {
        value: '1',
        label: '审核通过'
      }, {
        value: '2',
        label: '审核未通过'
      }
      ],
      all_status: '全部状态',
      all_statusValue: '',
      sortList: [
        {
          'columnName': 'CreatedUTC',
          'sortOrder': 1
        }
      ],
      filterData: []
    }
  },
  created() {
    this.getOrgList()
  },
  mounted() {},
  methods: {
    loadmore() {
      // console.log('loadmore!')
      this.orgListCrrentPage++
      // console.log('currentPage=' + this.policyInfo.currentPage)
      this.getOrgList()
    },
    getOrgList() {
      orgSearch({ 'numberPerPage': 10, 'currentPage': this.orgListCrrentPage, 'sortList': [{ 'columnName': 'Id', 'sortOrder': 1 }] }).then(res => {
        if (res) {
          var newList = res.data.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          console.log(newList)
          this.$nextTick(function() {
            this.all_org_list = this.all_org_list.concat(newList)
          })
        }
      })
    },
    handleCommand(command) {
      switch (command.flag) {
        case 1:
          this.all_type = command.label
          this.all_typeValue = command.value
          break
        case 3:
          this.all_status = command.label
          this.all_statusValue = command.value
          break
        default:
          return
      }
    },
    searchData() {
      this.filterData = []
      var filterData = []
      if (this.org_name) {
        if (this.org_nameType == 1) {
          var obj1 = {
            'key': 'Code',
            'value': this.org_name,
            'filterType': 5
          }
          filterData.push(obj1)
        } else if (this.org_nameType == 2) {
          var obj1 = {
            'key': 'UserName',
            'value': this.org_name,
            'filterType': 5
          }
          filterData.push(obj1)
        } else if (this.org_nameType == 3) {
          var obj1 = {
            'key': 'FullName',
            'value': this.org_name,
            'filterType': 5
          }
          filterData.push(obj1)
        }
      }
      if (this.all_typeValue) {
        var obj1 = {
          'key': 'Type',
          'value': this.all_typeValue
        }
        filterData.push(obj1)
        // this.filterData.servingTheCity = this.all_cityValue
      }
      if (this.all_orgValue) {
        var obj1 = {
          'key': 'OrganizationId',
          'value': this.all_orgValue
        }
        filterData.push(obj1)
        // this.filterData.servingTheCity = this.all_cityValue
      }

      var obj1 = {
        'key': 'Status',
        'value': 2
      }
      filterData.push(obj1)
      // this.filterData.servingTheCity = this.all_cityValue

      this.filterData = filterData
      var data = {
        'currentPage': 1,
        'filters': this.filterData,
        'numberPerPage': 10,
        'sortList': this.sortList
      }
      staffSearch(data).then(res => {
        if (res) {
          var obj = {}
          obj.data = res.data
          obj.id = 'fourth'
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查看个人资料  路由跳转 传参
    handleEdit(id) {
      // console.log(index, row);
      this.$router.push({
        path: '/employee_mng/care_employee/look_employee',
        query: { id: id }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      staffSearch({ 'currentPage': val, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': this.filterData }).then(res => {
        if (res) {
          // this.tab1 = res.data
          // this.currentPage1 = 1
          // this.totalItems1 = res.pager.totalItems
          var obj = {}
          obj.data = res.data
          obj.id = 'fourth'
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        }
      })
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;'
    }
  }
}
</script>
<style scoped  lang="scss">
.el-icon-search {
  font-size: 20px;
}
.rela {
  position: relative;
}
.el-dropdown-menu {
  top: 230px !important;
}
// .searchInput{
//   width: 80%;
// }
.searchFormItem {
  width: 300px;
  .el-form-item__content {
    width: 100%;
  }
}
.table_border {
  border: 1px solid #ddd;
}
</style>
<style lang='scss'>
.searchFormItem {
  .el-form-item__content {
    width: 100% !important;
  }
}
</style>

