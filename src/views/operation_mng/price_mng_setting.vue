
/**
价格管理
action
  设置价格
*/
<template>
  <!-- <div class="app-container"> -->
  <div id="scrollBox" class="ss" style="overflow:auto;height:100%;background:#f2f2f2;">
    <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="100px" class="demo-ruleForm">
      <div class="gray_box baseView baseView1 ">
        <div>
          <h2 class="item_title">商品信息</h2>
          <div class="item_form">
            <!-- <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="100px" class="demo-ruleForm"> -->
            <el-row>
              <el-col :span="12" :xs="24" :sm="10">
                <el-form-item label="商品类型" required>
                  <!-- <el-input v-model="baseForm.name" /> -->
                  <el-select v-model="baseForm.typeId" class="wid_320" placeholder="请选择" clearable size="normal" disabled>
                    <!-- <el-option
                      v-for="item in goods_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> -->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="14">
                <el-form-item label="商品分类" required>
                  <!-- <el-input v-model="baseForm.name" class="wid_320" /> -->
                  <el-select v-model="baseForm.categoryId" class="wid_320" placeholder="请选择" clearable size="normal" disabled>
                    <!-- <el-option
                      v-for="item in goods_category"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="18">
                <el-form-item label="商品名称" required>
                  <el-input v-model="baseForm.name" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="18">
                <el-form-item label="商品编号" required>
                  <el-input v-model="baseForm.code" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="18">
                <el-form-item label="服务城市" required>
                  <el-checkbox-group
                    v-model="baseForm.areaIds"
                    disabled
                  >
                    <el-checkbox v-for="(city,index) in cityOptions" :key="index" :label="city.value">{{ city.label }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 服务城市价格 -->
      <div class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">服务城市价格</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="0.8">
                &nbsp;&nbsp;
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="0px" prop="salePrice">
                  <el-checkbox v-model="baseForm.isCommonPrice" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一价格" prop="commonPrice">
                  <el-input-number v-model="baseForm.commonPrice" style="width:100%" controls-position="right" :min="0" />
                  <!-- <el-input v-model="baseForm.commonPrice" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单位" required>
                  <el-input v-model="baseForm.unit" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="(item,i) in baseForm.standardPriceList" :key="i">
              <el-col :span="0.8">
                &nbsp;&nbsp;
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="0">
                  <p style="font-size: 16px;color: #666666;"><span style="color: #F56C6C;">*&nbsp;&nbsp;</span>{{ item.cityName }}</p>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="价格">
                  <el-input-number v-model="item.normalPrice" style="width:100%" controls-position="right" :min="0" class="cityPrice" @input="changeInput($event)" />
                  <!-- <el-input v-model.number="item.normalPrice" type="number" placeholder="请输入价格" @input="changeInput($event)" class="cityPrice"/> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单位" required>
                  <el-input v-model="baseForm.unit" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="0.8">
                &nbsp;&nbsp;
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="0">
                  <p style="font-size: 16px;color: #666666;"><span style="color: #F56C6C;">*&nbsp;&nbsp;</span>义乌</p>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="价格">
                  <el-input v-model="baseForm.salePrice" class="cityPrice" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单位" prop="unit" required>
                  <el-input v-model="baseForm.unit" disabled />
                </el-form-item>
              </el-col>
            </el-row> -->
          </div>
        </div>
      </div>
      <!-- 活动/政策补贴价格 -->
      <div class="gray_box baseView baseView2">
        <div>
          <div class="item_title">活动/政策补贴价格 <el-button size="small" type="primary" style="margin-left:20px;" @click="addActivity">新增</el-button></div>
          <!-- <h2 ></h2> -->
          <div class="item_form">
            <div v-for="(item,i) in activityList" :key="i">
              <el-row>
                <el-col :span="4">
                  <el-form-item label="类型">
                    <el-select v-model="item.promotionType" placeholder="请选择" style="width:100%;" @change="(value)=>changeActivity(i,value)">
                      <el-option label="活动" :value="0" />
                      <el-option label="政策补贴" :value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="名称">
                    <el-select v-if="item.promotionType==0" v-model="item.subsidySchemeId" placeholder="请选择" style="width:100%;" @change="(value)=>changeActivity22(i,value)">
                      <el-option v-for="(item1,index) in allActivityList" :key="index" :label="item1.name" :value="item1.id" />
                      <!-- <el-option label="活动11" value="1" />
                      <el-option label="活动22" value="2" /> -->
                    </el-select>
                    <!-- <el-select
                      v-else
                      v-model="item.subsidySchemeId"
                      v-el-select-loadmore="loadmore"
                      placeholder="请选择"
                      style="width:100%;"
                      filterable
                      :loading="false"
                      loading-text="加载中......"
                      size="small"
                    >
                      <el-option v-for="(item2,index) in allPolicyList" :key="index" :label="item2.name" :value="item2.id" />
                    </el-select> -->
                    <el-select
                      v-else
                      v-model="item.subsidySchemeId"
                      placeholder="请选择"
                      style="width:100%;"
                      filterable
                      :loading="false"
                      size="small"
                      @change="(value)=>changePolicy(i,value)"
                    >
                      <el-option v-for="(item2,index) in allPolicyList" :key="index" :label="item2.name" :value="item2.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="适用城市">
                    <el-select v-model="item.cityCode" placeholder="请选择" style="width:100%;">
                      <el-option v-for="(item3,index) in cityOptions" :key="index" :label="item3.label" :value="item3.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="10">
                  <el-form-item label="价格">
                    <el-input-number v-model="item.preferentialPrice" style="width:100%" controls-position="right" :min="0" />
                    <!-- <el-input v-model="item.preferentialPrice" /> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="7">
                  <el-form-item label="单位">
                    <el-input v-model="baseForm.unit" disabled style="width:70%;" />
                    <el-button size="small" type="primary" @click="removeActivity(i)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <hr style="border:1px dashed #ddd;margin:20px 30px;" size="1">
            </div>
          </div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="gray_box baseView baseView2">
        <div>
          <div class="item_form">
            <el-row>
              <el-form-item style="margin-bottom:0px">
                <el-button size="medium" style="margin-right:170px;" @click="cancle">取消</el-button>
                <el-button size="medium" type="primary" @click="submit">确定</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
import { getpricebyproductids, searchforpriceData, createprice, updatePromotionprices, updateStandardprices, deletePromotionprices } from '@/api/goods'
import { policySearch } from '@/api/subsidyschemes.js'
import { searchCity } from '@/api/city'
import { Debounce } from '@/utils/public'

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
const baseUnitMap = {
  '1': '天',
  '2': '天/月',
  '3': '次',
  '4': '个',
  '5': '个/月',
  '6': '月'
}
const unitToBaseMap = {
  '天': '1',
  '天/月': '2',
  '次': '3',
  '个': '4',
  '个/月': '5',
  '月': '6'
}
export default {
  name: 'CreateGoods',
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
  components: {
  },
  data() {
    return {
      // // 新增负责城市
      // items: [{
      //   overallType: '3',
      //   regionProvince: '',
      //   regionCity: '',
      //   regionDistrict: '',
      //   regionStreet: '',
      //   province: '北京市',
      //   city: ['ziyuan', 'jiaohu'],
      //   district: '',
      //   street: ''
      // }, {
      //   overallType: '3',
      //   regionProvince: '',
      //   regionCity: '',
      //   regionDistrict: '',
      //   regionStreet: '',
      //   province: '北京市',
      //   city: ['ziyuan', 'sketch'],
      //   district: '',
      //   street: ''
      // }],
      // flage: 0,
      // modelType: 1, // 判断是新增还是修改;;;;1---新增 0---修改--2查看,
      // tab_pane_disabled: false, // tab选项卡是否禁用
      typeMap: typeMap,
      categoryMap: categoryMap,
      baseForm: {
        name: '',
        code: '',
        areaIds: [],
        categoryId: '',
        typeId: '',
        isCommonPrice: false,
        commonPrice: '',
        unit: '天',
        standardPriceList: [],
        promotionPriceList: []
      },
      baseRules: {

      },

      baseUnitMap: baseUnitMap,
      unitToBaseMap: unitToBaseMap,
      unitValue: '1',
      cityOptions: [],
      activityList: [],
      activityListYL: [],
      // 标准城市价格初始化数据
      standardPriceListYL: [],
      // 所有的政策补贴
      allPolicyList: [],
      allActivityList: [{ name: '活动一', id: '08d735ce-a08c-32cd-c4b0-f9b667237566' }, { name: '活动二', id: '08d735ce-a08c-32cd-c4b0-f9b667237599' }, { name: '活动三', id: '08d735ce-a08c-32cd-c4b0-f9b667237590' }],
      activityListCurrentPage: 1,
      policyListCurrentPage: 1
      // activityList: [{
      //   type: '1',
      //   name: '2',
      //   price: '11',
      //   unit: '天/月',
      //   id: '1'
      // }, {
      //   type: '1',
      //   name: '1',
      //   price: '6666',
      //   unit: '天/月',
      //   id: '2'
      // }],
      // activityListYL: [{
      //   type: '1',
      //   name: '2',
      //   price: '11',
      //   unit: '天/月',
      //   id: '1'
      // }, {
      //   type: '1',
      //   name: '1',
      //   price: '6666',
      //   unit: '天/月',
      //   id: '2'
      // }]

    }
  },
  computed: {

  },
  watch: {
    'baseForm.isCommonPrice': {
      handler(newVal, oldVal) {
        if (newVal) {
          // console.log($('.cityPrice').find('input').attr('class','disabled'))
          $('.cityPrice').find('input').css({ 'background-color': '#F5F7FA', 'border-color': '#E4E7ED', 'color': '#C0C4CC', 'cursor': 'not-allowed' })
          $('.cityPrice').find('input').attr('disabled', true)
          // console.log($('.cityPrice').find('input').css('background','gray'))
        } else {
          $('.cityPrice').find('input').css({ 'background-color': '#FFF', 'border-color': '#DCDFE6', 'color': '#606266', 'cursor': 'auto' })
          $('.cityPrice').find('input').attr('disabled', false)
        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    // console.log(this.$route)
  },
  created() {
  },
  mounted() {
    this.getProductInfo()
    this.getAllPolicyList()
    this.getCityData()
  },
  destroyed: function() {
    // if (document.getElementById('scrollBox')) {
    //   document.getElementById('scrollBox').removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    // }
  },
  methods: {
    changeInput(e) {
      this.$forceUpdate()
    },
    loadmore() {
      // console.log('loadmore!')
      this.policyListCurrentPage++
      // console.log('currentPage=' + this.policyInfo.currentPage)
      this.getAllPolicyList()
    },
    // 获取城市数据
    getCityData() {
      // searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
      //   if (res) {
      //     const map1 = res.data.map(item => {
      //       return {
      //         value: item.cityCode,
      //         label: item.name
      //       }
      //     })
      //     this.cityOptions = map1
      //   //   this.serve_cityAll = res.data
      //   }
      // })
    },
    getProductInfo() {
      getpricebyproductids({ input: [this.$route.query.id] }).then(res => {
        if (res) {
          this.baseForm = {
            name: res[0].name,
            code: res[0].code,
            areaIds: ['1'],
            categoryId: categoryMap[res[0].categoryId],
            typeId: typeMap[res[0].typeId],
            isCommonPrice: false,
            // commonPrice: ''
            unit: baseUnitMap[res[0].typeId],
            // standardPriceList: res[0].standardPriceList,
            promotionPriceList: res[0].promotionPriceList
          }
          // 两个数组要深拷贝，否者可能会互相影响
          this.activityList = JSON.parse(JSON.stringify(res[0].promotionPriceList))
          this.activityListYL = JSON.parse(JSON.stringify(res[0].promotionPriceList))
          searchforpriceData({ 'numberPerPage': 10, 'currentPage': 1, 'keyWord': res[0].code }).then(res1 => {
            if (res1) {
              var data = res1.data[0]
              this.baseForm.areaIds = data.productAreas.map(item => {
                return item.areaCode
              })
              this.cityOptions = data.productAreas.map(item => {
                return {
                  value: item.areaCode,
                  label: item.areaName
                }
              })
              // console.log('城市',data)
              // 服务城市价格列表展示服务城市
              var array2 = data.productAreas.map(item => {
                return {
                  'cityCode': item.areaCode,
                  'cityName': item.areaName,
                  'priceFlag': '',
                  'normalPrice': '',
                  'unit': res[0].typeId,
                  'remark': '',
                  'id': ''
                }
              })
              var array1 = res[0].standardPriceList
              // 如果以前对服务城市设置过价格，进行价格赋值
              for (var i = 0; i < array2.length; i++) {
                var obj = array2[i]
                var cityCode = obj.cityCode
                // var isExist = false
                for (var j = 0; j < array1.length; j++) {
                  var aj = array1[j]
                  var cityCodej = aj.cityCode
                  if (cityCodej == cityCode) {
                    array2[i].id = array1[j].id
                    array2[i].normalPrice = array1[j].normalPrice
                    array2[i].priceFlag = array1[j].priceFlag
                    array2[i].remark = array1[j].remark
                  }
                }
              }
              this.baseForm.standardPriceList = JSON.parse(JSON.stringify(array2))
              this.standardPriceListYL = JSON.parse(JSON.stringify(array2))
            } else {
              this.$message({
                message: '数据请求失败',
                type: 'warning'
              })
            }
          })
          // this.unitValue = res.typeId
        } else {
          this.$message({
            message: '数据请求失败',
            type: 'warning'
          })
        }
      })
    },
    getAllPolicyList() {
      policySearch({ 'numberPerPage': 100, 'currentPage': this.policyListCurrentPage }).then(res => {
        if (res) {
          this.allPolicyList = this.allPolicyList.concat(res.data)
        }
      })
    },
    // 拼接政策补贴的名称
    changePolicy(i, value) {
      this.allPolicyList.map(item => {
        if (item.id == value) {
          this.activityList[i].subsidySchemeName = item.name
        }
      })
    },
    // 拼接活动的名称
    changeActivity22(i, value) {
      this.allActivityList.map(item => {
        if (item.id == value) {
          this.activityList[i].subsidySchemeName = item.name
        }
      })
    },
    // 当活动或者政策补贴选项切换时，活动名称清空
    changeActivity(i, value) {
      console.log(i, value)
      if (value == 0) {
        this.activityList[i].subsidySchemeId = this.allActivityList[0].id
      } else {
        this.activityList[i].subsidySchemeId = this.allPolicyList[0].id
      }
    },
    cancle() {
      this.$router.push('/operation_mng/price_mng')
    },
    submit: Debounce(function() {
      var currentProductId = this.$route.query.id
      var newList = []
      var newOldList = []
      for (var item of this.activityList) {
        if (item.id == '') {
          newList.push(item)
        } else {
          newOldList.push(item)
        }
      }
      // 最后留下来的原来的数组与一开始的进行比较，得到留下来又有变化的数组
      // console.log('888888',this.arrayRepeat(newOldList, this.activityListYL))
      var data1 = this.arrayRepeat(newOldList, this.activityListYL)
      // console.log(newList,newOldList)
      // 全新的活动/政策补贴数组
      var TotalList = data1.concat(newList)

      // console.log(this.activityListYL, this.activityList)
      var data2List = TotalList.map(item => {
        return {
          'cityCode': item.cityCode,
          // 'cityName': item.cityName,
          'promotionType': item.promotionType,
          'subsidySchemeId': item.subsidySchemeId,
          'subsidySchemeName': item.subsidySchemeName,
          // 'priceFlag': item.priceFlag,
          // 'discount': 1,
          // 'reducedPromotionPrice': 0,
          'preferentialPrice': item.preferentialPrice,
          // 'unit': this.unitToBaseMap[this.baseForm.unit],
          // 'fromDateUTC': item.fromDateUTC,
          // 'toDateUTC': item.toDateUTC,
          // 'remark': item.remark,
          'id': item.id
        }
      })

      // 判断是否设置了统一价格，如果设置了统一价格，将价格列表的价格都改为统一设置的价格
      if (this.baseForm.isCommonPrice) {
        if (this.baseForm.commonPrice <= 0) {
          this.$message({
            message: '您选择了统一价格，请正确设置统一价格',
            type: 'warning'
          })
          return
        } else if (!this.baseForm.commonPrice) {
          this.$message({
            message: '您选择了统一价格，请正确设置统一价格',
            type: 'warning'
          })
          return
        } else {
          for (var item of this.baseForm.standardPriceList) {
            item.normalPrice = this.baseForm.commonPrice
          }
        }
      }
      //
      // console.log('标准价格初始化与后来对比',this.standardPriceListYL,this.baseForm.standardPriceList)

      // console.log(data2List,this.unitToBaseMap['天'])
      // 需要修改的城市价格
      var needUpdateStandardPrice = []
      // 需要重新创建的城市价格
      var needCreateStandardPrice = []
      this.baseForm.standardPriceList.map(item => {
        if (item.id != '') {
          item.productId = currentProductId
          needUpdateStandardPrice.push(item)
        } else {
          needCreateStandardPrice.push(item)
        }
      })
      // 修改城市价格
      if (needUpdateStandardPrice.length) {
        updateStandardprices({ input: needUpdateStandardPrice }).then(res => {
          if (res) {
            this.$message({
              message: '设置价格成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '设置价格失败',
              type: 'warning'
            })
          }
        })
      }
      // 需要修改的政策补贴价格
      var needUpdatePromotionPrice = []
      // 需要创建的政策补贴价格
      var needCreatePromotionPrice = []
      data2List.map(item => {
        if (item.id != '') {
          item.productId = currentProductId
          needUpdatePromotionPrice.push(item)
        } else {
          needCreatePromotionPrice.push(item)
        }
      })
      // 修改政策补贴价格
      if (needUpdatePromotionPrice.length) {
        updatePromotionprices({ input: needUpdatePromotionPrice }).then(res => {
          if (res) {
            this.$message({
              message: '设置价格成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '设置价格失败',
              type: 'warning'
            })
          }
        })
      }
      if (needCreateStandardPrice.length || needCreatePromotionPrice.length) {
        // 创建价格
        var objData = {
          productId: this.$route.query.id,
          standardPriceList: needCreateStandardPrice,
          promotionPriceList: needCreatePromotionPrice
        }
        createprice(objData).then(res => {
          if (res) {
            this.$message({
              message: '设置价格成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '设置价格失败',
              type: 'warning'
            })
          }
        })
      }
      // console.log(needUpdatePromotionPrice,needUpdateStandardPrice)
      this.$nextTick(function() {
        this.$router.push('/operation_mng/price_mng')
      })
    }, 500),
    // 两个数组对象取不同
    arrayRepeat(array1, array2) {
      var result = []
      for (var i = 0; i < array2.length; i++) {
        var obj = array2[i]
        var id = obj.id
        var preferentialPrice = obj.preferentialPrice
        var subsidySchemeId = obj.subsidySchemeId
        var cityCode = obj.cityCode
        // var isExist = false
        for (var j = 0; j < array1.length; j++) {
          var aj = array1[j]
          var idj = aj.id
          var preferentialPriceJ = aj.preferentialPrice
          var subsidySchemeIdJ = aj.subsidySchemeId
          var cityCodeJ = aj.cityCode
          if (idj == id && (preferentialPriceJ != preferentialPrice || subsidySchemeId != subsidySchemeIdJ || cityCodeJ != cityCode)) {
            // isExist = true
            // break
            result.push(aj)
          } else {
            // result.push(obj)
          }
        }
        // if (!isExist) {
        //   result.push(obj)
        // }
      }
      // console.log('11',result)
      return result
    },
    removeActivity(i) {
      // console.log(this.activityList[i])
      if (this.activityList[i].id) {
        deletePromotionprices({ id: this.activityList[i].id }).then(res => {
          if (res) {
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
      }
      // deletePromotionprices:
      this.activityList.splice(i, 1)
      // console.log(this.activityList)
    },
    // // 添加负责地区范围
    addActivity() {
      // this.activityList.push({
      //   'cityCode': '',
      //   'cityName': '',
      //   'promotionType': 1,
      //   'subsidySchemeId':  this.allActivityList[0].id,
      //   'subsidySchemeName':  this.allActivityList[0].name,
      //   'priceFlag': '',
      //   'discount': '',
      //   'reducedPromotionPrice': '',
      //   'preferentialPrice': '',
      //   'unit': this.baseForm.unit,
      //   'fromDateUTC': '',
      //   'toDateUTC': '',
      //   'remark': '',
      //   'id': ''
      // })
      this.activityList.push({
        'cityCode': '',
        'cityName': '',
        'promotionType': '',
        'subsidySchemeId': '',
        'subsidySchemeName': '',
        'priceFlag': '',
        'discount': '',
        'reducedPromotionPrice': '',
        'preferentialPrice': '',
        'unit': this.baseForm.unit,
        'fromDateUTC': '',
        'toDateUTC': '',
        'remark': '',
        'id': ''
      })
    }
    // // 删除所负责的区域
    // deleteActivity(val) {
    //   this.items.splice(val, 1)
    // },
  }

}

</script>
<style scoped lang='scss'>
.float_left{
  float: left;
}
.float_right{
  float: right;
  margin-right: 30px
}
.app-container{
background: #F2F2F2;
margin: 0px
}
.gray_box{
  border:1px solid #dddddd;
  margin-bottom: 20px;
  background: #FFFFFF
}
.herfTab{
  background: #FFFFFF;
  position: relative;
  overflow: hidden;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  .tabItem{
    width:130px;
    line-height: 57px;
    border-top: 3px solid transparent
  }
  .tab_active{
      border-color:#409eff;
      background: rgba(30,144,255,0.2);
      color :#3E8DFF
    }
}
.item_title{
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 55px;
  border-bottom: 1px solid #dddddd;
  background: #FFFFFF;
  padding-left: 20px;
}
.item_form{
  padding: 20px;
}
.wid_320{
  width: 320px
}
.marg_20{
  margin-left:20px
}
.wid_110{
  width: 110px
}
.uploader-box-div .avatar-uploader{
  float: left;
  margin-right:20px
}
// 图片上传
.uploader-box-div .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .uploader-box-div .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .uploader-box-div .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .uploader-box-div .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
//  .edit_container .ql-container{
//     height: 400px;
//   }
  .org_select{
    width: 100%
  }
  .listImgBox{
    width:110px;
    height:100px;
  }
</style>

<style lang="scss">
//  图片上传
.uploader-box-div .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.uploader-box-div  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.uploader-box-div  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .uploader-box-div .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .edit_container .ql-container{
    height: 400px;
  }
</style>

