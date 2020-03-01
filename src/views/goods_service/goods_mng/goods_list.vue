// 商品管理
<template>
  <div id="goods_list" class="comment_box">
    <div class="search_bar">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="">
          <el-dropdown :hide-on-click="false" class="rela " @command="handleCommand">
            <span class="el-dropdown-link">
              <span v-if="flag1">{{ flag1 }}</span>
              <span v-else>选择城市</span>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{flag:'1',label:'全部城市',value:''}">全部城市</el-dropdown-item>
              <el-dropdown-item v-for="(item,index) in cityOptions" :key="index" :command="{flag:'1',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <!-- <el-form-item label>
          <el-dropdown trigger="click" class="rela" @command="handleCommand">
            <span class="el-dropdown-link">
              <span v-if="flag2">{{ flag2 }}</span>
              <span v-else>选择分类</span>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{flag:'2',label:'全部分类',value:'0'}">全部分类</el-dropdown-item>
              <el-dropdown-item v-for="(item,index) in searchClass1" :key="index" :command="{flag:'2',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item> -->

        <el-form-item label>
          <el-cascader
            v-model="selectedOptions"
            class="typeInput"
            :options="typeOptions"
            placeholder="请选择分类"
            size="small"
            clearable
            @change="handleChangeType"
          />
        </el-form-item>

        <el-form-item label>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <span v-if="flag3">{{ flag3 }}</span>
              <span v-else>选择状态</span>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{flag:'3',label:'全部状态',value:''}">全部状态</el-dropdown-item>
              <el-dropdown-item v-for="(item,index) in search_status" :key="index" :command="{flag:'3',label:item.label,value:item.value}">{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <!-- <el-form-item label>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <span v-if="flag4">{{ flag4 }}</span>
              <span v-else>选择政策补贴</span>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{flag:'4',label:'全部政策补贴',value:''}">全部政策补贴</el-dropdown-item>
              <el-dropdown-item v-for="(item,index) in searchPolicy" :key="index" :command="{flag:'4',label:item.name,value:item.id}">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item> -->
        <el-form-item id="lazy_box_select">
          <el-select
            v-model="flag4Val"
            v-el-select-loadmore="loadmore"
            placeholder="请选择政策补贴"
            filterable
            :loading="policyLoading"
            loading-text="加载中......"
            size="small"
            clearable
          >
            <!-- multiple
              v-el-select-loadmore="loadmore" -->
            <el-option
              v-for="item in searchPolicy"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>

        </el-form-item>

        <!-- <el-form-item label class="searchFormItem">
          <el-input v-model="searchForm.keyWord" class="searchInput" placeholder="请输入: 商品名称/商品编码" size="small" clearable>
            <el-select  slot="prepend" v-model="searchForm.type" placeholder="请选择" class="input-with-select" style="width:120px;">
              <el-option label="商品名称" value="name" />
              <el-option label="商品编号" value="code" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click.prevent="_searchData('click')" />
          </el-input>
        </el-form-item> -->
        <el-form-item label class="searchFormItem">
          <el-input v-model="searchForm.keyWord" class="searchInput" placeholder="请输入: 商品名称/商品编码" size="small" clearable>
            <el-button slot="append" icon="el-icon-search" @click.prevent="_searchData('click')" />
          </el-input>
        </el-form-item>

        <el-button v-if="resourcePermission['新增']" type="primary" size="medium" @click="addGoods">新增商品</el-button>
        <el-button v-if="resourcePermission['上架']" type="primary" size="medium" @click.prevent="_upGoods">上架</el-button>
        <el-button v-if="resourcePermission['下架']" type="primary" size="medium" @click.prevent="_downGoods">下架</el-button>
        <el-button v-if="resourcePermission['修改']" type="primary" size="medium" @click="updateData">修改</el-button>
        <el-button v-if="resourcePermission['删除']" type="primary" size="medium" @click="_deleteGoods">删除</el-button>
      </el-form>
    </div>
    <div class="tableList" style="height:83%">
      <el-table
        ref="goodsTable"
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
        <el-table-column prop="code" label="商品编号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p>商品编号: {{ scope.row.code }}</p>
              <div slot="reference" class="name-wrapper" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                {{ scope.row.code }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="picPrimaryInfo" label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.picPrimaryInfo.url" alt="加载失败" :title="scope.row.picPrimaryInfo.name" max-width="30" height="30" style="max-width:30px">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" width="150">
              <p>商品名称: {{ scope.row.name }}</p>
              <div slot="reference" class="name-wrapper" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                {{ scope.row.name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="typeId" label="商品类型" width="150" sortable>
          <template slot-scope="scope">
            <div>
              {{ typeMap[scope.row.typeId] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="categoryId" label="商品分类" width="150" sortable>
          <template slot-scope="scope">
            <div>
              {{ categoryMap[scope.row.categoryId] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="basePrice" label="价格(￥)" width="100" sortable>
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.categoryId===3001?true:false"><small>床位价格查看详情</small></span>
              <span v-else>{{ scope.row.basePrice }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="policySubsidyId" label="政策补贴" width="150" sortable /> -->
        <el-table-column prop="productSubsidySchemes" label="政策补贴" width="150" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.productSubsidySchemes&&scope.row.productSubsidySchemes.length">
              <div v-for="(item,i) in scope.row.productSubsidySchemes" :key="i">
                {{ item.subsidySchemeName }}
              </div>
            </div>
            <div v-else>暂无</div>

          </template>
        </el-table-column>
        <el-table-column prop="productAreas" label="服务城市" width="150" sortable>
          <template v-slot="scope">
            <!-- <div>
              {{ scope.row.areaCities}}
            </div> -->
            <div v-for="(item,i) in scope.row.productAreas" :key="i">
              {{ item.areaName }}&nbsp;
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" sortable>
          <template v-slot="scope">
            <div>
              {{ statusMap[scope.row.status] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createrTime" label="添加时间" width="170">
          <template v-slot="scope">
            <div>
              {{ $moment(scope.row.createdUTCTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="resourcePermission['查看']" prop="action" label="操作" min-width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page_nation" style="margin-top:26px;">
      <!-- <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
      <el-pagination
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="totalItems"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 选择类别弹出框 -->
    <el-dialog title="选择商品类目" :visible.sync="classDialogVisible" width="30%" left :before-close="cancleForm">
      <el-form
        ref="classForm"
        :model="classForm"
        :rules="classFormRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="商品类型"
          prop="type"
          required
        >
          <el-select v-model="classForm.type" placeholder="请选择" clearable @change="changeType">
            <el-option
              v-for="item in goods_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品分类"
          prop="classification"
          required
        >
          <el-select v-model="classForm.classification" placeholder="请选择" clearable>
            <el-option
              v-for="item in goods_category"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" @click="cancleForm('cancleForm')">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm('classForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import $axios from 'axios'
const cityOptions = [{ label: '杭州', value: '3301' }, { label: '义乌', value: '330782' }, { label: '上海', value: '31' }]
import { goodsList, searchData, upGoods, downGoods, deleteGoods, updateGoods } from '@/api/goods'
import { searchCity } from '@/api/city'
import { policySearch } from '@/api/subsidyschemes'
import { offset } from '@/utils/offset'
import permissionData from '@/utils/resPermission'
const typeOptions = [{
  value: '',
  label: '全部分类'
},
{
  value: '1',
  label: '生活照料',
  children: [{
    value: '1001',
    label: '单日套餐'
  }, {
    value: '1002',
    label: '包月套餐'
  }, {
    value: '1003',
    label: '单项服务'
  }]
}, {
  value: '2',
  label: '医疗护理',
  children: [{
    value: '2001',
    label: '单次服务'
  }]
}, {
  value: '3',
  label: '机构护理',
  children: [{
    value: '3001',
    label: '月床位费'
  }]
}, {
  value: '4',
  label: '护理器材',
  children: [{
    value: '4001',
    label: '自助餐具'
  },
  {
    value: '4002',
    label: '排泄设备'
  },
  {
    value: '4003',
    label: '起居设备'
  },
  {
    value: '4004',
    label: '洗浴用品'
  },
  {
    value: '4005',
    label: '移动设备'
  },
  {
    value: '4006',
    label: '智能硬件'
  }]
}, {
  value: '5',
  label: '长护险护理包',
  children: [{
    value: '5001',
    label: '包月套餐'
  }]
}, {
  value: '6',
  label: '保险服务',
  children: [{
    value: '6001',
    label: '健康险'
  }, {
    value: '6002',
    label: '意外责任险'
  }]
}

]
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
const statusMap = ['默认状态', '下架', '上架']
export default {
  'name': 'goodsList',
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
  data() {
    return {
      offset: 8,
      flag1: '',
      flag2: '',
      flag3: '',
      flag4: '',
      flag1Val: '',
      flag2Val: '',
      flag3Val: '',
      flag4Val: '',
      typeMap: typeMap,
      cityOptions: cityOptions,
      statusMap: statusMap,
      categoryMap: categoryMap,
      select: '',
      searchForm: {
        keyWord: '',
        type: ''
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      totalItems: 200,
      tableData: [],
      classDialogVisible: false, // 商品分类选择弹出框
      classForm: {// 商品分类表单
        type: '1',
        classification: '1001'
      },
      classFormRules: {
        type: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        classification: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ]
      },
      selectedOptions: [''],
      typeOptions: typeOptions,
      goods_type: [{
        value: '1',
        label: '生活照料'
      }, {
        value: '2',
        label: '医疗护理'
      }, {
        value: '3',
        label: '机构护理'
      }, {
        value: '4',
        label: '护理器材'
      }, {
        value: '5',
        label: '长护险护理包'
      },
      {
        value: '6',
        label: '保险服务'
      }
      // {
      //   value: '5',
      //   label: '长护险护理包'
      // }
      ],
      searchClass1: [{
        value: '1',
        label: '生活照料'
      }, {
        value: '2',
        label: '医疗护理'
      }, {
        value: '3',
        label: '机构护理'
      }, {
        value: '4',
        label: '护理器材'
      }, {
        value: '6',
        label: '保险服务'
      }],
      searchClass: [{
        value: '1001',
        label: '单日套餐'
      }, {
        value: '1002',
        label: '包月套餐'
      }, {
        value: '1003',
        label: '单项服务'
      }, {
        value: '2001',
        label: '单次服务'
      }, {
        value: '3001',
        label: '月床位费'
      }, {
        value: '4001',
        label: '自助餐具'
      },
      {
        value: '4002',
        label: '排泄设备'
      },
      {
        value: '4003',
        label: '起居设备'
      },
      {
        value: '4004',
        label: '洗浴用品'
      },
      {
        value: '4005',
        label: '移动设备'
      },
      {
        value: '4006',
        label: '智能硬件'
      }, {
        value: '6001',
        label: '健康险'
      },
      {
        value: '6002',
        label: '意外责任险'
      }, {
        value: '5001',
        label: '护理项目'
      }
      ],
      search_status: [{
        value: '1',
        label: '下架'
      }, {
        value: '2',
        label: '上架'
      }],
      // searchPolicy: [{
      //   value: '8f01820c-f068-4e29-abe8-f19948460651',
      //   label: '长护险'
      // }, {
      //   value: '2',
      //   label: '残联'
      // }, {
      //   value: '3',
      //   label: '民政'
      // }, {
      //   value: '4',
      //   label: '卫健委'
      // }
      // ],
      searchPolicy: [],
      goods_category: [{
        value: '1001',
        label: '单日套餐'
      }, {
        value: '1002',
        label: '包月套餐'
      }, {
        value: '1003',
        label: '单项服务'
      }],
      tableStyle:
        'width:100%;',
      checkData: [],
      policyLoading: false,
      policyInfo: {
        currentPage: 1,
        numberPerPage: 10
      },
      // 权限相关
      resourcePermission: []
    }
  },
  created() {
    // this._goodsList()
    // this._policySearch()
    // this._searchCity()
  },
  mounted() {
    this.resourcePermission = permissionData('商品管理')
    this.offset = offset()
    this._goodsList()
    this._policySearch()
    this._searchCity()
    // console.log(this.$route.params)
    const params = this.$route.params
    if (params && params.changeType) {
      const that = this
      setTimeout(() => {
        that.classDialogVisible = true
      }, 500)
      // console.log(this.classDialogVisible)
    }
  },
  methods: {
    loadmore() {
      // console.log('loadmore!')
      this.policyInfo.currentPage++
      // console.log('currentPage=' + this.policyInfo.currentPage)
      this._policySearch()
    },
    convertToTreeData(data, pid) {
      const result = []
      let temp = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid === pid) {
          const obj = { 'label': data[i].name, 'id': data[i].id }
          temp = this.convertToTreeData(data, data[i].id)
          if (temp.length > 0) {
            obj.children = temp
          }
          result.push(obj)
        }
      }
      return result
    },
    handleChangeType(val) {
      // console.log(val)
      this.selectedOptions = val
    },
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
      if (command.flag === '3') {
        this.flag3 = command.label
        this.flag3Val = command.value
      }
      if (command.flag === '4') {
        this.flag4 = command.label
        this.flag4Val = command.value
      }
      // this.$message.info(command)
    },
    _goodsList() {
      this.listLoading = true
      const data = {
        // 'data': {
        'numberPerPage': 10,
        'currentPage': this.currentPage,
        'areaCode': null,
        'categoryTreePath': null,
        'status': null,
        'policySubsidyId': null,
        'keyWord': null,
        'sortList': [{
          'columnName': 'Status',
          // 'columnName': 'createdUTCTime',
          'sortOrder': 1
        }]
        // }
        // 'correlationId': '369c0bde-350b-4870-b8f5-2a6a8faf789b',
        // 'invokingUser': '98a0762b-730a-4eac-b46c-51cdb523a15c',
        // 'businessProcessName': 'ProductSearchService'
      }
      goodsList(data).then(response => {
        const res = response
        this.dataList(res)
      })
    },
    dataList(res) {
      // console.log(res)
      this.totalItems = res.pager.totalItems
      this.currentPage = res.pager.currentPage
      const newArray = []
      var picPrimaryInfo = ''
      var arrayItem = {}
      // for (const index in res.data) {
      //   // console.log(res.data[index])
      //   arrayItem = res.data[index]
      //   if (res.data[index].productImages) {
      //     for (const index2 in res.data[index].productImages) {
      //       if (res.data[index].productImages[index2].isPrimary) {
      //         picPrimaryInfo = res.data[index].productImages[index2]
      //         //  newArray.push(picPrimaryInfo)
      //         arrayItem.picPrimaryInfo = picPrimaryInfo
      //         newArray.push(arrayItem)
      //         arrayItem = ''
      //         picPrimaryInfo = ''
      //       }
      //     }
      //   }
      // }
      let flag = true // 主图渲染标志位
      const bb = []// 主图信息错误数据
      const picInfo = {
        'id': 'null',
        'isPrimary': true,
        'name': '这是条错误数据',
        'url': ''
      }

      console.log(res.data)
      for (const item1 of res.data) {
        arrayItem = item1
        if (arrayItem.productAreas && arrayItem.productAreas.length) {
          const areaCity = JSON.parse(JSON.stringify(arrayItem.productAreas))
          const arrayCity = []

          areaCity.forEach((item, index) => {
            arrayCity.push(item.areaCode)
          })
          arrayItem.areaCities = arrayCity.toString()
        } else {
          arrayItem.areaCities = '暂无'
        }

        if (item1.productImages) {
          for (const item2 of item1.productImages) {
            if (item2.isPrimary) {
              picPrimaryInfo = item2
              //  newArray.push(picPrimaryInfo)
              arrayItem.picPrimaryInfo = picPrimaryInfo
              newArray.push(arrayItem)
              arrayItem = ''
              picPrimaryInfo = ''
              flag = true
              break
            } else {
              flag = false
            }
          }
          if (!flag) {
            arrayItem.picPrimaryInfo = picInfo
            bb.push('noPrimary')
            newArray.push(arrayItem)
            arrayItem = ''
          }
        }
      }
      // console.log(bb)
      // console.log(newArray)
      this.tableData = newArray
      this.listLoading = false
    },
    addGoods() {
      this.classDialogVisible = true
    },
    updateData() {
      const _this = this
      if (this.checkData.length !== 1) {
        this.$message.warning('请选择一条数据进行修改')
      } else {
        this.$message.success('进入修改！')
        const queryData = {
          'action': 2,
          'id': this.checkData[0].id,
          'type': this.checkData[0].typeId + '',
          'classification': this.checkData[0].categoryId + ''
        }
        this.$router.push({ path: `/goods_service/goods_mng/update_goods`, query: queryData })
      }
    },
    _searchData(action) {
      // console.log(action)
      this.listLoading = true
      if (action == 'click') { // 如果是点击搜索，则固定当前页是第一页
        this.currentPage = 1
      }
      const data = {
        'keyWord': this.searchForm.keyWord,
        'numberPerPage': 10,
        'currentPage': this.currentPage,
        'areaCode': this.flag1Val,
        'categoryTreePath': this.selectedOptions.join(','),
        'status': this.flag3Val == '' ? null : this.flag3Val,
        'subsidySchemeId': this.flag4Val,
        'sortList': [{
          'columnName': 'Status',
          'sortOrder': 1
        }]
      }
      searchData(data).then(response => {
        if (response.data && response.data.length == 0 && this.currentPage > 1) {
          this.currentPage--
          this._searchData()
        } else {
          this.dataList(response)
          this.listLoading = false
        }
      })
    },
    _upGoods() {
      const _this = this
      if (this.checkData.length != 1) {
        this.$message.warning('请选择一条数据进行上架操作')
      } else {
        this.$confirm('是否确认上架选中的商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$message.success('上架操作')
            // const data = {
            //   'data': {
            //     'id': this.checkData[0].id
            //   },
            //   'correlationId': '2485332b-0a63-4d83-b76a-a221af73773b',
            //   'invokingUser': '60e389e6-de15-4f69-8942-8da979c96ea8',
            //   'businessProcessName': 'ProductUpDownService'
            // }

            const data = {
              // 'data': {
              'id': this.checkData[0].id
              // }
            }
            upGoods(data).then(response => {
              this.$message.success('上架成功！')
              this._searchData()
            }).catch(err => {
              this.$message.error(err.response.data.error)
              this._searchData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消上架'
            })
          })
      }
    },
    _downGoods() {
      const _this = this
      if (this.checkData.length != 1) {
        this.$message.warning('请选择一条数据进行下架操作')
      } else {
        this.$confirm('是否确认下架选中的商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$message.success('下架操作')
            const data = {
              // 'data': {
              'id': this.checkData[0].id
              // }
              // 'correlationId': '2485332b-0a63-4d83-b76a-a221af73773b',
              // 'invokingUser': '60e389e6-de15-4f69-8942-8da979c96ea8',
              // 'businessProcessName': 'ProductUpDownService'
            }
            downGoods(data).then(response => {
              this.$message.success('下架成功！')
              // this._goodsList()
              this._searchData()
            }, error => {
              console.log(error)
              this._searchData()
            }).catch(err => {
              console.log('程序运行出错')
              this._searchData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下架'
            })
          })
      }
    },
    _deleteGoods() {
      const _this = this
      if (!this.checkData || this.checkData.length != 1) {
        this.$message.warning('请选择一条数据进行删除')
      } else {
        this.$confirm('是否确定删除选中数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            const data = this.checkData[0].id
            deleteGoods(data).then(response => {
              if (response) {
                this.$message.success('删除成功！')
                // this._goodsList()
                this._searchData()
              } else {
                this.$message.error('删除出错！')
                this._searchData()
              }
            }).catch(err => {
              this.$message.error(err.response.data.error)
              this._searchData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
            this._searchData()
          })
      }
    },
    checkOut(val) {
      this.checkData = val
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$message.success('进入详情！')
      const queryData = {
        'action': 3,
        'id': row.id,
        'type': row.typeId + '',
        'classification': row.categoryId + ''
      }
      this.$router.push({ path: `/goods_service/goods_mng/detail_goods`, query: queryData })
    },
    changeType(event) {
      const _this = this
      this.classForm.classification = ''
      this.$nextTick(() => {
        _this.$refs['classForm'].clearValidate()
      })
      switch (event) {
        case '1':
          this.goods_category = [{
            value: '1001',
            label: '单日套餐'
          }, {
            value: '1002',
            label: '包月套餐'
          }, {
            value: '1003',
            label: '单项服务'
          }]
          break
        case '2':
          this.goods_category = [{
            value: '2001',
            label: '单次服务'
          }]
          break
        case '3':
          this.goods_category = [{
            value: '3001',
            label: '月床位费'
          }]
          break
        case '4':
          this.goods_category = [{
            value: '4001',
            label: '自助餐具'
          },
          {
            value: '4002',
            label: '排泄设备'
          },
          {
            value: '4003',
            label: '起居设备'
          },
          {
            value: '4004',
            label: '洗浴用品'
          },
          {
            value: '4005',
            label: '移动设备'
          },
          {
            value: '4006',
            label: '智能硬件'
          }]
          break
        case '6':
          this.goods_category = [{
            value: '6001',
            label: '健康险'
          },
          {
            value: '6002',
            label: '意外责任险'
          }]
          break
        case '5':
          this.goods_category = [{
            value: '5001',
            label: '护理项目'
          }]
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$router.push({ path: `/goods_service/goods_mng/create_goods?action=1&type=${this.classForm.type}&classification=${this.classForm.classification}` })
          this.$router.push({ path: `/goods_service/goods_mng/create_goods`, query: { action: 1, type: this.classForm.type, classification: this.classForm.classification }})
        } else {
          this.$message({ type: 'error', message: '非法输入！' })
        }
      })
    },
    cancleForm(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.classDialogVisible = false
        })
        .catch(_ => {})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this._searchData()
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
    },
    _policySearch() {
      const data = {
        'numberPerPage': this.policyInfo.numberPerPage,
        'currentPage': this.policyInfo.currentPage,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 1
          }
        ]
      }
      policySearch(data).then(res => {
        // console.log(res.data)
        // let data=res.data.slice(0,10)
        this.searchPolicy = this.searchPolicy.concat(res.data)
        // console.log(this.searchPolicy)
      }).catch(error => {
        console.log(error)
        this.$message.error('远程获取政策列表失败！')
      })
    },
    _searchCity() {
      const data = {
        'filters': [
          {
            'filterLogic': 1,
            'key': 'CityLevel',
            'value': '1'
          },
          {
            'filterLogic': 1,
            'key': 'CityLevel',
            'value': '2'
          }
        ],
        'numberPerPage': 20,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 0
          }
        ]
      }
      searchCity(data).then(res => {
        if (res.data && res.data.length) {
          const array = res.data
          array.forEach((item, index) => {
            item.value = item.cityCode
            item.label = item.name
          })
          this.cityOptions = array
        }
      }).catch(error => {
        console.log(error)
      })
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
  top: 180px !important;
}
// .searchInput{
//   width: 80%;
// }
.searchFormItem{
  width: 400px;
  .el-form-item__content{
    width: 100%
  }
}
.table_border{
  border: 1px solid #ddd;
}
</style>
<style lang='scss'>
// 商品列表搜索字段input框居中样式
#goods_list .el-form-item__content .el-input-group {
    vertical-align: middle;
}
.el-select .el-input {
    width: 100%;
  }
.searchFormItem{
  .el-form-item__content{
    width: 100%!important
  }
}
.typeInput .el-input__inner{
  border: none;
  width: 100px
}
</style>

