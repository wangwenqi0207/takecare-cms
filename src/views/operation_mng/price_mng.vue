
<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;min-width:1200px;">
    <div v-if="isNative" style="height:100%;">
      <div class="comment_box" style="padding:10px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
        <div class="search_bar">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-dropdown trigger="click" class="rela" @command="handleCommandType">
                <span class="el-dropdown-link">
                  <span v-if="flag1">{{ flag1 }}</span>
                  <span v-else>全部城市</span>
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{flag:'1',label:'全部城市',value:''}">全部城市</el-dropdown-item>
                  <el-dropdown-item v-for="(item,index) in serviceCity" :key="index" :command="{flag:'1',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <el-dropdown trigger="click" class="rela" @command="handleCommandType">
                <span class="el-dropdown-link">
                  <span v-if="flag2">{{ flag2 }}</span>
                  <span v-else>全部分类</span>
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{flag:'2',label:'全部分类',value:''}">全部分类</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'2',label:'生活照料',value:'1'}">生活照料</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'2',label:'医疗护理',value:'2'}">医疗护理</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'2',label:'机构护理',value:'3'}">机构护理</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'2',label:'护理器材',value:'4'}">护理器材</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'2',label:'智能硬件',value:'5'}">智能硬件</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'2',label:'保险服务',value:'6'}">保险服务</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item>
              <el-dropdown trigger="click" class="rela" @command="handleCommandType">
                <span class="el-dropdown-link">
                  <span v-if="flag3">{{ flag3 }}</span>
                  <span v-else>全部状态</span>
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{flag:'3',label:'全部状态',value:''}">全部状态</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'3',label:'已设置',value:true}">已设置</el-dropdown-item>
                  <el-dropdown-item :command="{flag:'3',label:'未设置',value:false}">未设置</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item
              label
              class="searchFormItem"
            >
              <el-input
                v-model="org_name"
                class="input"
                placeholder="请输入：商品名称/商品编码"
                style="width:420px"
                clearable
              >
                <el-select slot="prepend" v-model="type" placeholder="请选择" class="input-with-select" style="width:120px">
                  <el-option label="商品名称" value="1" />
                  <el-option label="商品编码" value="2" />
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchData"
                />
              </el-input>
            </el-form-item>
            <el-button
              type="primary"
              size="medium"
              style="float:right;margin-right:30px;"
              @click="setPrice"
            >设置价格</el-button>
          </el-form>
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
            />
            <el-table-column
              prop="code"
              label="商品编号"
              width="220"
            />
            <el-table-column
              prop="name"
              label="商品名称"
              width="300"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top"
                  title="商品名称"
                  width="300"
                  trigger="hover"
                  :content="scope.row.name"
                >
                  <p v-if="scope.row.name" slot="reference">{{ scope.row.name.length>18?scope.row.name.substring(0,18)+'...':scope.row.name }}</p>
                  <p v-else slot="reference">{{ scope.row.name }}</p>
                </el-popover>
                <!-- <el-popover trigger="hover" placement="top">
                  <p>商品名称: {{ scope.row.name }}</p>
                  <div slot="reference" class="name-wrapper" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    {{ scope.row.name }}
                  </div>
                </el-popover> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="typeId"
              label="商品类型"
              width="200"
            >
              <template slot-scope="scope">
                <div>
                  {{ typeMap[scope.row.typeId] }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="categoryId"
              label="商品分类"
              width="200"
            >
              <template slot-scope="scope">
                <div>
                  {{ categoryMap[scope.row.categoryId] }}
                </div>
              </template>
            </el-table-column>
            <!-- 自定义列的遍历-->
            <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
            <!-- <el-table-column v-for="(item, index) in colunmName" :key="index+(new Date()).valueOf()" :label="item">
              <template slot-scope="scope">
                <span>{{ scope.row.status[index].label }}</span>
              </template>
            </el-table-column> -->

            <!-- <el-table-column
              prop="price"
              label="杭州价格"
              width="150"
            />
            <el-table-column
              prop="policy"
              label="义乌价格"
              width="150"
            /> -->
            <el-table-column
              prop="city"
              label="城市价格"
              width="200"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.standardPriceList.length">
                  <p v-for="(item,i) in scope.row.standardPriceList" :key="i">{{ item.cityName+'：￥'+item.normalPrice }}</p>
                </div>
                <div v-else>暂无</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              label="活动/政策价格"
              width="160"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.promotionPriceList.length">已设置</span>
                <span v-else>未设置</span>
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
                  @click="handleEdit(scope.row.productId)"
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
    </div>
    <div v-else style="height:100%;">
      <router-view />
    </div>
  </div>
</template>

<script>
import { searchforpriceData, getpricebyproductids } from '@/api/goods'
import { searchCity } from '@/api/city'
import permissionData from '@/utils/resPermission'
const typeMap = {
  '1': '生活照料',
  '2': '医疗护理',
  '3': '机构护理',
  '4': '护理器材',
  '5': '长护险护理包',
  '6': '保险服务'
}
const categoryMap = {
  '1001': '单日套餐',
  '1002': '包月套餐',
  '1003': '单项服务',
  '2001': '单次服务',
  '3001': '月床位费',
  '4001': '自助餐具',
  '4002': '排泄设备',
  '4003': '起居设备',
  '4004': '洗浴用品',
  '4005': '移动设备',
  '4006': '智能硬件',
  '5001': '长护险月套餐',
  '6001': '健康险',
  '6002': '意外责任险'
}
export default {

  data() {
    return {
      filterData: {
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
      filterDataObj: {
        'numberPerPage': 10,
        'currentPage': 1,
        'areaCode': null,
        'categoryTreePath': null,
        'hasSetSubsidySchemePrice': null,
        'keyWord': null,
        'sortList': [{
          'columnName': 'Status',
          'sortOrder': 1
        }]
      },
      typeMap: typeMap,
      categoryMap: categoryMap,
      isNative: true,
      searchForm: {
        goodsName: ''
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      colunmName: ['杭州价格', '义乌价格'],
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      type: '1',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      value1: '全部类型',
      serviceCity: [],
      // search
      flag1: '',
      flag1Val: '',
      flag2: '',
      flag2Val: '',
      flag3: '',
      flag3Val: '',
      // 权限相关
      resourcePermission: []
    }
  },
  created() {
    if (this.$route.path === '/operation_mng/price_mng') {
      this.isNative = true
      this.fetchData()
      this.getCityData()
    } else {
      this.isNative = false
    }
  },
  mounted() {
    this.resourcePermission = permissionData('价格管理')
  },
  methods: {
    getCityData() {
      searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
        if (res) {
          const map1 = res.data.map(item => {
            return {
              value: item.cityCode,
              label: item.name
            }
          })
          // var data2 = [{ value: '', label: '全部城市' }]
          this.serviceCity = map1
          // searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'key': 'CityLevel', 'value': '2' }] }).then(res => {
          //   if (res) {
          //     const map2 = res.data.map(item => {
          //       return {
          //         value: item.cityCode,
          //         label: item.name
          //       }
          //     })
          //     // var data3 = [{ value: '', label: '全部城市' }]
          //     this.serviceCity = this.serviceCity.concat(map2)
          //   }
          // })
        }
      })
    },
    // 搜索赋值
    handleCommandType(command) {
      if (command.flag === '1') {
        this.flag1 = command.label
        this.flag1Val = command.value
      }
      if (command.flag === '2') {
        this.flag2 = command.label
        this.flag2Val = command.value
      }
      if (command.flag === '3') {
        this.flag3 = command.label
        this.flag3Val = command.value
      }

      // this.$message.info(command)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    searchData() {
      // this.filterData.filters = []
      // var filterData = []
      // // console.log(this.org_name,this.org_nameType,this.all_cityValue,this.all_type_orgValue,this.all_serviceValue,this.all_fixedValue,this.all_stateValue)
      // if (this.org_name) {
      //   if (this.type == 1) {
      //     var obj1 = {
      //       'key': 'Name',
      //       'value': this.org_name,
      //       'filterType': 5
      //     }
      //     filterData.push(obj1)
      //   } else {
      //     var obj1 = {
      //       'key': 'Code',
      //       'value': this.org_name,
      //       'filterType': 5
      //     }
      //     filterData.push(obj1)
      //   }
      // }
      // // 服务城市
      // if (this.all_cityValue) {
      //   var obj1 = {
      //     'key': 'City',
      //     'value': this.all_cityValue
      //   }
      //   filterData.push(obj1)
      //   // this.filterData.servingTheCity = this.all_cityValue
      // }
      // // 机构类型
      // if (this.all_type_orgValue) {
      //   var obj1 = {
      //     'key': 'OrganizationType',
      //     'value': this.all_type_orgValue
      //   }
      //   filterData.push(obj1)
      //   // this.filterData.orgNature = this.all_type_orgValue
      // }
      // // 城市搜索
      // if (this.flag1) {
      //   var obj1 = {
      //     'key': 'AreaCodes',
      //     'value': this.flag1Val
      //   }
      //   filterData.push(obj1)
      //   // this.filterData.orgClass = this.all_serviceValue
      // }
      // // 分类
      // if (this.flag2) {
      //   var obj1 = {
      //     'key': 'TypeId',
      //     'value': this.flag2Val
      //   }
      //   filterData.push(obj1)
      //   // this.filterData.fixedPointMechanism = this.all_fixedValue
      // }
      // // 状态
      // if (this.flag3) {
      //   var obj1 = {
      //     'key': 'Status',
      //     'value': this.flag3Val
      //   }
      //   filterData.push(obj1)
      //   // this.filterData.status = this.all_stateValue
      // }
      // console.log(filterData)
      // this.currentPage = 1
      // this.filterData.currentPage = 1
      // this.filterData.filters = filterData
      // this.fetchData()
      // console.log(this.type, this.org_name, this.flag1, this.flag1Val, this.flag2, this.flag2Val, this.flag3, this.flag3Val)
      this.filterDataObj.currentPage = 1
      this.filterDataObj.keyWord = this.org_name ? this.org_name : null
      this.filterDataObj.areaCode = this.flag1Val ? this.flag1Val : null
      this.filterDataObj.hasSetSubsidySchemePrice = this.flag3Val ? this.flag3Val : null
      this.filterDataObj.categoryTreePath = this.flag2Val ? this.flag2Val + ',' : null
      // 'numberPerPage': 10,
      //   'currentPage': this.currentPage,
      //   'areaCode': null,
      //   'categoryTreePath': null,
      //   'status': null,
      this.fetchData()
    },
    // 修改按钮点击
    setPrice() {
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        this.$router.push({ path: '/operation_mng/price_mng/setting_prices', query: { id: this.multipleSelection[0].productId }})
      } else {
        this.$message({
          message: '请选择一条数据进行价格设置',
          type: 'warning'
        })
      }
    },
    // 查看个人资料  路由跳转 传参
    handleEdit(id) {
      this.$router.push({ path: '/operation_mng/price_mng/detail', query: { id: id }})
    },
    fetchData() {
      this.listLoading = true
      searchforpriceData(this.filterDataObj).then(res => {
        if (res) {
          var productIds = res.data.map(item => {
            return item.id
          })
          if (productIds.length) {
            getpricebyproductids({ input: productIds }).then(res1 => {
              if (res1) {
                // console.log(productIds)
                this.tableData = res1
                this.total = res.pager.totalItems
              } else {
                this.$message({
                  message: '数据请求失败',
                  type: 'warning'
                })
              }
            })
          } else {
            this.tableData = []
            this.total = 0
          }
        } else {
          this.$message({
            message: '数据请求失败',
            type: 'warning'
          })
        }

        // this.tableData = response.data.items.slice(1, 11)
        // this.tableData = [{ city: '沧州市11',
        //   classification: '单项服务',
        //   create_time: '2014-05-29 04:34:01',
        //   id: '110000198807201770',
        //   name: 'Timothy Lopez',
        //   picture: 'http://dummyimage.com/120x240',
        //   policy: '残联',
        //   price: 275,
        //   status: [{
        //     label: '100'
        //   }, {
        //     label: '110'
        //   }],
        //   type: '生活照料' }, { city: '沧州市',
        //   classification: '单项服务',
        //   create_time: '2014-05-29 04:34:01',
        //   id: '110000198807201770',
        //   name: 'Timothy Lopez',
        //   picture: 'http://dummyimage.com/120x240',
        //   policy: '残联',
        //   price: 275,
        //   status: [{
        //     label: '120'
        //   }, {
        //     label: '130'
        //   }],
        //   type: '生活照料' }]
        // console.log('11', this.tableData)
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
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
    handleCommand(command) {
      this.$message('click on item ' + command)
      this.value1 = command.split('&')[1]
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

