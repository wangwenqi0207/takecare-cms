// 机构管理
<template>
  <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
    <div class="search_bar">
      <div class="search_bar_left">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ all_city }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown" align="center">
                <el-dropdown-item
                  v-for="(item,index) in all_city_list"
                  :key="index"
                  :command="{value:item.value,label:item.label,flag:1}"
                > {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>

          <!-- <el-form-item label>
            <el-dropdown
              trigger="click"
              class="dropdown"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                {{ all_type_org }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu
                slot="dropdown"
                align="center"
                class="org_select_menu_two"
              >
                <el-dropdown-item
                  v-for="item in all_type_org_list"
                  :key="item.value"
                  :command="{value:item.value,label:item.label,flag:2}"
                > {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>

          <el-form-item label>
            <el-dropdown
              trigger="click"
              class="dropdown"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                {{ all_service }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="org_select_menu_three"
                align="center"
              >
                <el-dropdown-item
                  v-for="item in all_service_list"
                  :key="item.value"
                  :command="{value:item.value,label:item.label,flag:3}"
                > {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>

          <el-form-item label>
            <el-dropdown
              trigger="click"
              class="dropdown"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                {{ all_fixed }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="org_select_menu_four"
                align="center"
              >
                <el-dropdown-item
                  v-for="item in all_fixed_list"
                  :key="item.value"
                  :command="{value:item.value,label:item.label,flag:4}"
                > {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item> -->

          <el-form-item label>
            <el-dropdown
              trigger="click"
              class="dropdown-end"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                {{ all_state }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="org_select_menu_five"
                align="center"
              >
                <el-dropdown-item
                  v-for="item in all_state_list"
                  :key="item.value"
                  :command="{value:item.value,label:item.label,flag:5}"
                > {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>

          <el-form-item
            label
            class="searchFormItem"
          >
            <el-input v-model="org_name" placeholder="请输入内容" class="input-with-select" style="width:350px;" clearable>
              <el-select slot="prepend" v-model="org_nameType" placeholder="请选择" style="width:120px;">
                <el-option label="机构名称" value="1" />
                <el-option label="机构编号" value="2" />
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchData" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_bar_right">
        <el-button
          v-if="resourcePermission['新增']"
          type="primary"
          size="medium"
          @click="add_org"
        >新增机构</el-button>
        <el-button
          v-if="resourcePermission['修改']"
          type="primary"
          size="medium"
          @click="write_org"
        >修改</el-button>
        <el-button
          v-if="resourcePermission['删除']"
          type="primary"
          size="medium"
          @click="delete_org"
        >删除</el-button>
      </div>
    </div>
    <div class="tableList" style="height:83%">
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
          align="center"
        />
        <el-table-column
          prop="organizationCode"
          label="机构编号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="name"
          label="机构名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="city"
          label="服务城市"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <p v-if="scope.row.servingTheCity=='1'">杭州</p>
            <p v-else-if="scope.row.servingTheCity=='2'">义乌</p>
            <p v-else>{{ scope.row.servingTheCity }}</p> -->
            {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="机构地址"
          width="200"
          align="center"
        />
        <el-table-column
          prop="manager"
          label="法定代表人"
          width="150"
          align="center"
        />
        <el-table-column
          prop="managerPhoneNumber"
          label="法人联系电话"
          width="170"
          align="center"
        />
        <el-table-column
          prop="manager"
          label="专管员"
          width="150"
          align="center"
        />
        <el-table-column
          prop="managerPhoneNumber"
          label="专管员电话"
          width="170"
          align="center"
        />
        <el-table-column
          prop="organizationStatus"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.organizationStatus=='1'">有效</p>
            <p v-else-if="scope.row.organizationStatus=='0'">无效</p>
            <p v-else>{{ scope.row.organizationStatus }}</p>
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
              @click="handleEdit(scope.row.id)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_nation" style="margin-top:26px;">
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
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { orgSearch, orgDelete } from '@/api/organization'
import { searchCity } from '@/api/city'
import permissionData from '@/utils/resPermission'

export default {
  data() {
    return {
      filterDataObj: {
        'numberPerPage': 10,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 1
          }
        ],
        'filters': [
        ]
      },
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      filterData: {},
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 200,
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      org_nameType: '1',
      all_cityValue: '',
      all_type_orgValue: '',
      all_serviceValue: '',
      all_fixedValue: '',
      all_stateValue: '',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      all_city: '全部城市',
      all_city_list: [],
      all_type_org: '全部机构类型',
      all_type_org_list: [{
        value: '',
        label: '全部机构类型'
      }, {
        value: '0',
        label: '敬老院'
      }, {
        value: '1',
        label: '福利院'
      }, {
        value: '2',
        label: '养老院'
      }, {
        value: '3',
        label: '老年公寓'
      }, {
        value: '4',
        label: '护理院'
      }, {
        value: '5',
        label: '医院'
      }, {
        value: '6',
        label: '社区卫生服务中心'
      }, {
        value: '7',
        label: '私营公司'
      }],
      all_service: '全部服务类型',
      all_service_list: [{
        value: '',
        label: '全部服务类型'
      }, {
        value: '0',
        label: '居家生活照料'
      }, {
        value: '1',
        label: '居家医疗护理'
      }, {
        value: '2',
        label: '机构生活照料'
      }, {
        value: '3',
        label: '机构医疗护理'
      }],
      all_fixed: '全部定点',
      all_fixed_list: [
        {
          value: '',
          label: '全部定点'
        }, {
          value: '0',
          label: '医保定点'
        }, {
          value: '1',
          label: '长护定点'
        }, {
          value: '2',
          label: '民政定点'
        }, {
          value: '3',
          label: '残联定点'
        }, {
          value: '4',
          label: '卫健委定点'
        }],
      all_state: '全部状态',
      all_state_list: [{
        value: '',
        label: '全部状态'
      }, {
        value: '1',
        label: '有效'
      }, {
        value: '0',
        label: '无效'
      }],
      // 权限相关
      resourcePermission: []
    }
  },
  created() {
    this.fetchData()
    this.getCityData()
  },
  mounted() {
    this.resourcePermission = permissionData('培训机构')
  },
  methods: {
    getCityData() {
      searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
        if (res) {
          const map1 = res.data.map(item => {
            return {
              value: item.name,
              label: item.name
            }
          })
          var data2 = [{ value: '', label: '全部城市' }]
          this.all_city_list = data2.concat(map1)
          // searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'key': 'CityLevel', 'value': '2' }] }).then(res => {
          //   if (res) {
          //     const map2 = res.data.map(item => {
          //       return {
          //         value: item.name,
          //         label: item.name
          //       }
          //     })
          //     // var data3 = [{ value: '', label: '全部城市' }]
          //     this.all_city_list = this.all_city_list.concat(map2)
          //   }
          // })
        }
      })
    },
    searchData() {
      this.filterDataObj.filters = []
      var filterData = []
      // console.log(this.org_name,this.org_nameType,this.all_cityValue,this.all_type_orgValue,this.all_serviceValue,this.all_fixedValue,this.all_stateValue)
      if (this.org_name) {
        if (this.org_nameType == 1) {
          var obj1 = {
            'key': 'Name',
            'value': this.org_name,
            'filterType': 5
          }
          filterData.push(obj1)
        } else {
          var obj1 = {
            'key': 'OrganizationCode',
            'value': this.org_name,
            'filterType': 5
          }
          filterData.push(obj1)
        }
      }
      // 服务城市
      if (this.all_cityValue) {
        var obj1 = {
          'key': 'City',
          'value': this.all_cityValue
        }
        filterData.push(obj1)
        // this.filterData.servingTheCity = this.all_cityValue
      }
      // 机构类型
      if (this.all_type_orgValue) {
        var obj1 = {
          'key': 'OrganizationType',
          'value': this.all_type_orgValue
        }
        filterData.push(obj1)
        // this.filterData.orgNature = this.all_type_orgValue
      }
      // 服务类型
      if (this.all_serviceValue) {
        var obj1 = {
          'key': 'ServiceType',
          'value': this.all_serviceValue
        }
        filterData.push(obj1)
        // this.filterData.orgClass = this.all_serviceValue
      }
      // 定点
      if (this.all_fixedValue) {
        var obj1 = {
          'key': 'DesignatedAgencie',
          'value': this.all_fixedValue
        }
        filterData.push(obj1)
        // this.filterData.fixedPointMechanism = this.all_fixedValue
      }
      // 状态
      if (this.all_stateValue) {
        var obj1 = {
          'key': 'OrganizationStatus',
          'value': this.all_stateValue
        }
        filterData.push(obj1)
        // this.filterData.status = this.all_stateValue
      }
      console.log(filterData)
      this.currentPage = 1
      this.filterDataObj.currentPage = 1
      this.filterDataObj.filters = filterData
      this.fetchData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 修改按钮点击
    write_org() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        var org_id = this.multipleSelection[0].id
        // console.log(org_id)
        this.$router.push({
          path: '/nursing_training/training_org/write_org',
          query: {
            id: org_id
          }
        })
      } else {
        this.$message({
          message: '请选择一条数据进行修改',
          type: 'warning'
        })
      }
    },
    delete_org() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$confirm('删除后不可恢复，是否确认删除此机构?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '再想想',
          type: 'warning'
        }).then(() => {
          var org_id = this.multipleSelection[0].id
          orgDelete({ id: org_id }).then(res => {
            if (res) {
              this.currentPage = 1
              this.filterDataObj.currentPage = 1
              this.fetchData()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '删除失败',
                type: 'warning'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '请选择一条数据进行删除',
          type: 'warning'
        })
      }
    },
    // 新增机构
    add_org() {
      this.$router.push('/nursing_training/training_org/add_org')
    },
    // 查看个人资料  路由跳转 传参
    handleEdit(id) {
      this.$router.push({
        path: '/nursing_training/training_org/look_org',
        query: {
          id: id
        }
      })
    },
    fetchData() {
      this.listLoading = true

      // var data = {
      //   'current': this.currentPage,
      //   'data': this.filterData,
      //   'size': 10
      // }

      // // orgNursingList(data).then(res => {
      // //   if (res.resultCode == '000000') {
      // //     this.tableData = res.data.records
      // //     this.total = res.data.total
      // //   } else {
      // //     this.$message({
      // //       message: res.resultMsg,
      // //       type: 'warning'
      // //     })
      // //   }
      // // })
      orgSearch(this.filterDataObj).then(res => {
        if (res.pager.totalItems > 0) {
          this.tableData = res.data
          this.total = res.pager.totalItems
        } else {
          this.tableData = []
          this.total = 0
        }
      })
      this.listLoading = false
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.filterDataObj.currentPage = val
      this.fetchData()
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
    },

    // select 点击
    handleCommand(command) {
      switch (command.flag) {
        case 1:
          this.all_city = command.label
          this.all_cityValue = command.value
          break
        case 2:
          this.all_type_org = command.label
          this.all_type_orgValue = command.value
          break
        case 3:
          this.all_service = command.label
          this.all_serviceValue = command.value
          break
        case 4:
          this.all_fixed = command.label
          this.all_fixedValue = command.value
          break
        case 5:
          this.all_state = command.label
          this.all_stateValue = command.value
          break
        default:
          return
      }
    }
  }
}
</script>
<style scoped  lang="scss">
.el-icon-search {
  font-size: 20px;
}
.rela{
  position: relative;
}
.el-dropdown-menu{
  top: 190px !important;
}
// .searchInput{
//   width: 80%;
// }
.search_bar{
  display: flex;
  justify-content: space-between;
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
</style>
<style lang='scss'>
.searchFormItem{
  .el-form-item__content{
    width: 100%!important
  }
}
</style>

