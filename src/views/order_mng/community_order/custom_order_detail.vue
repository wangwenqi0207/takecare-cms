//社区标准订单详情
<template>
  <!-- <div class="app-container"> -->
  <div id="scrollBox" class="ss" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" style="margin-bottom:20px" :sticky-top="130">
      <div class="gray_box">
        <div class="herfTab">
          <div class="float_left tabItem tab_active" @click="returnToView('baseView1')">
            <span>订单信息</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView2')">
            <span>订单需求</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView3')">
            <span>报价信息</span>
          </div>
          <!-- <div class="float_left tabItem" @click="returnToView('baseView4')">
            <span>护理机构信息</span>
          </div> -->
          <div class="float_left tabItem" @click="returnToView('baseView4')">
            <span>服务人员信息</span>
          </div>
          <!-- <div class="float_right tabItem">
            <el-checkbox v-model="isOnline" />
            <span>立即上架</span>
          </div> -->
        </div>
      </div>
    </sticky>

    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="baseRules"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <!-- 订单信息 -->
      <div class="gray_box baseView baseView1">
        <div>
          <h2 class="item_title">订单信息</h2>
          <div class="item_form">
            <el-row>
              <div class="pd_left_20">
                <div class="info_item info_item_bold">
                  <label class="label_item label_item_bold">
                    <i class="el-icon-circle-check-outline" style="color:green" />订单状态:
                  </label>
                  <!-- <span v-if="goodsData.paymentStatus<2">待支付</span>
                  <span v-else>{{ orderStatusMap[goodsData.orderStatus] }}</span> -->
                  <span>{{ orderStatusMap[goodsData.orderStatus] }}</span>
                </div>
              </div>
              <el-col :span="18" :xs="24" :sm="24" :md="24" :lg="18">
                <el-row>
                  <el-col :span="24" :xs="24" :sm="24" :md="12">
                    <div class="pd_left_20">
                      <!-- <div class="info_item info_item_bold">
                        <label class="label_item label_item_bold"><i class="el-icon-circle-check-outline" style="color:green" />订单状态:</label>
                        <span>已完成</span>
                      </div>-->
                      <div class="info_item">
                        <label class="label_item">订单编号：</label>
                        <span>{{ goodsData.orderNumber }}</span>
                      </div>
                      <!-- <div v-if="goodsData.paymentStatus<2" class="info_item">
                        <label class="label_item">创建时间：</label>
                        <span>{{ $moment(goodsData.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </div>
                      <div v-else class="info_item">
                        <label class="label_item">支付时间：</label>
                        <span>{{ $moment(goodsData.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </div> -->
                      <div class="info_item">
                        <label class="label_item">创建时间：</label>
                        <span>{{ $moment(goodsData.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </div>
                      <div class="info_item">
                        <label class="label_item">交易时间：</label>
                        <span v-if="goodsData.paymentTime">{{ $moment(goodsData.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </div>
                      <div v-if="goodsData.paymentStatus<2" class="info_item">
                        <label class="label_item">交易号:</label>
                        <span>{{ goodsData.transactionNumber }}</span>
                      </div>
                      <div v-else class="info_item">
                        <label v-if="goodsData.paymentType==0" class="label_item">微信交易号:</label>
                        <label v-else class="label_item">支付宝交易号:</label>
                        <span>{{ goodsData.transactionNumber }}</span>
                      </div>
                      <div class="info_item">
                        <label class="label_item">社区群助手用户:</label>
                        <span>{{ goodsData.communityUser }}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" :xs="24" :sm="24" :md="12">
                    <div class="pd_left_20">
                      <div class="info_item">
                        <label class="label_item">订单类型:</label>
                        <span>社区定制订单</span>
                        <!-- <span v-if="isSale==1">(出售)</span>
                        <span v-else>(租赁)</span> -->
                      </div>
                      <div v-if="goodsData.paymentStatus<2" class="info_item">
                        <label class="label_item">支付方式:</label>
                      </div>
                      <div v-else class="info_item">
                        <label class="label_item">支付方式:</label>
                        <span v-if="goodsData.paymentType==0">微信</span>
                        <span v-else>支付宝</span>
                      </div>
                      <div class="info_item">
                        <label class="label_item">订单归属社区:</label>
                        <span>{{ goodsData.orderCommunity }}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <!-- 订单信息右侧 -->
              <el-col
                :span="6"
                :xs="24"
                :sm="24"
                :md="24"
                :lg="6"
                style="border-left:1px solid #ddd"
              >
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">用户确认：</label>
                    <!-- <span>{{ $moment('2019-08-15T07:38:42.46737').format('YYYY-MM-DD HH:mm:ss') }}</span>
                    <span>{{ $moment('2019-08-15T07:38:42.46737').format('YYYY-MM-DD HH:mm:ss') }}</span> -->
                    <span v-if="goodsData.userConfirmedTime">{{ $moment(goodsData.userConfirmedTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">已服务：</label>
                    <span v-if="goodsData.consumptionTime">{{ $moment(goodsData.consumptionTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}2019-07-10-14:50:50</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">平台已确认订单：</label>
                    <span v-if="goodsData.orderConfirmedTime">{{ $moment(goodsData.orderConfirmedTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                  </div>
                  <div class="info_item color_green">
                    <label class="label_item">订单交易时间：</label>
                    <span v-if="goodsData.paymentTime">{{ $moment(goodsData.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>

            <!-- </el-form> -->
          </div>
        </div>
      </div>
      <!-- 订单需求 -->
      <div class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">订单需求</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">服务需求：</label>
                    <span>{{ goodsData.serviceRequirement }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">参考价格：</label>
                    <span>￥{{ goodsData.referencePrice }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">报价截止时间：</label>
                    <span v-if="goodsData.expiration">{{ $moment(goodsData.expiration).format('YYYY-MM-DD HH:mm') }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">服务时间:</label>
                    <span v-if="goodsData.serviceDate">{{ $moment(goodsData.serviceDate).format('YYYY年MM月DD日 HH:mm') }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">被护理人姓名：</label>
                    <span>{{ goodsData.serviceUser }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">性别：</label>
                    <span v-if="goodsData.gender == true || goodsData.gender == 'M'">男</span>
                    <span v-else>女</span>
                  </div>
                  <!-- <div class="info_item">
                    <label class="label_item">收货人姓名:</label>
                    <span>陈阿发</span>
                  </div> -->
                  <div class="info_item">
                    <label class="label_item">服务地址:</label>
                    <span>{{ goodsData.address }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">联系人:</label>
                    <span>{{ goodsData.contactPerson }}</span>
                  </div>
                  <!-- <div class="info_item">
                    <label class="label_item">联系地址:</label>
                    <span>浙江省杭州市滨江区长河路和瑞科技广场S3栋6楼</span>
                  </div> -->
                  <div class="info_item">
                    <label class="label_item">联系方式:</label>
                    <span>{{ goodsData.phoneNumber }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">备注:</label>
                    <span>{{ goodsData.remark }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">购买用户:</label>
                    <span>{{ goodsData.customerId }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">用户姓名:</label>
                    <span>{{ goodsData.customerName }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">代付人用户:</label>
                    <span>{{ goodsData.otherPayer }}</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">代付人姓名:</label>
                    <span>{{ goodsData.otherPayerName }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 报价信息 -->
      <div class="gray_box baseView baseView3">
        <div>
          <h2 class="item_title">报价信息</h2>
          <div class="item_form">
            <!-- 报价信息---表格形式 -->
            <el-row>
              <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="12">
                <div class="pd_left_20">
                  <el-table
                    id="goods_info_table"
                    v-loading="tableLoading"
                    class="table_border"
                    :data="goods_table_data"
                    :header-cell-style="headerCellStyle"
                    :cell-style="cellStyle"
                    border
                    stripe
                    style="width: 100%;text-align:center"
                  >
                    <!-- <el-table-column prop="picture" label="商品图片" width="180">
                      <template slot-scope="scope">
                        <img
                          :src="scope.row.picture"
                          alt
                          max-width="30"
                          height="30"
                          style="max-width:30px;vertical-align:middle"
                        >
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="userName" label="用户名" width="180" />
                    <!-- <el-table-column prop="type" label="商品类型" /> -->
                    <el-table-column prop="quotedTime" label="报价时间">
                      <template slot-scope="scope">
                        <span v-if="scope.row.quotedTime">{{ $moment(scope.row.quotedTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="quotedPrice" label="报价">
                      <template slot-scope="scope">
                        <span>￥{{ scope.row.quotedPrice }}</span>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="sort" label="商品分类" /> -->
                    <!-- <el-table-column prop="count" label="数量" /> -->
                    <!-- <el-table-column prop="policy" label="活动/政策" /> -->
                  </el-table>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div class="pd_left_20">
                <div class="info_item">
                  <label class="label_item">成交用户：</label>
                  <span>{{ goodsData.dealUser }}</span>
                </div>
                <div class="info_item">
                  <label class="label_item">成交金额</label>
                  <span>￥{{ goodsData.dealPrice }}</span>
                </div>
                <div class="info_item">
                  <label class="label_item label_item_bold">实付金额：</label>
                  <span class="font_blue label_item_bold">￥{{ goodsData.actualTotalPrice }}</span>
                </div>
              </div>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 服务人员信息 -->
      <div class="gray_box baseView baseView4" style="height:240px">
        <div>
          <h2 class="item_title">服务人员信息</h2>
          <div class="item_form">
            <el-row>
              <div class="info_item">
                <label class="label_item">用户名：</label>
                <span>{{ goodsData.staffUserName }}</span>
              </div>
              <div class="info_item">
                <label class="label_item">姓名：</label>
                <span>{{ goodsData.staffName }}</span>
                <span style="width:50px;display:inline-block;text-align:center">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span v-if="goodsData.staffGender == 'F'">女</span>
                <span v-else-if="goodsData.staffGender=='M'">男</span>
                <span v-else>{{ goodsData.staffGender }}</span>
                <span style="width:50px;display:inline-block;text-align:center">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <img
                  :src="goodsData.staffPhoto"
                  alt="pic"
                  max-width="50"
                  height="50"
                  style="max-width:50px;vertical-align:middle"
                >
              </div>
              <div class="info_item">
                <label class="label_item">联系电话：</label>
                <span>{{ goodsData.staffPhoneNumber }}</span>
              </div>
              <div class="info_item">
                <label class="label_item">身份证：</label>
                <span>{{ goodsData.staffIDCard }}</span>
              </div>
            </el-row>
          </div>
        </div>
      </div>
      <div v-show="false" class="gray_box">
        <div>
          <h2 v-show="false" class="item_title">BAR</h2>
          <div class="item_form">
            <el-row>
              <el-form-item style="margin-bottom:0px">
                <el-button size="small">取消</el-button>
                <el-button size="small" type="primary" @click="onSubmit('baseForm')">确定</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import MinXin from '@/components/MiXins'
import { orderSearch, getOrderInfo, orderUpdate, orderDelete, orderPage, orderInfo, orderConfirmrefund, cancelOrder, adminConfirmOrder } from '@/api/order'
// import { orderSearch, getOrderInfo } from '@/api/orderBD'
import { offset } from '@/utils/offset'

const typeGoodsMap = {
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
  '2001': '单项服务',
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
  name: 'CustomOrderDetail',
  components: {
    Sticky
  },
  mixins: [MinXin],
  data() {
    return {
      offset: 8,
      isOnline: true,
      isSale: 1,
      baseForm: {
        name: '',
        region: 'hangzhou',
        organization: ''
      },
      tableLoading: false,
      orderStatusMap: {
        '0': '待支付',
        '1': '待派单',
        '2': '待派护理员',
        '3': '待用户确认',
        '4': '已完成',
        '5': '退单中',
        '6': '已退单',
        '7': '未通过'
      },
      typeMap: {
        '0': '生活照料',
        '1': '医疗护理',
        '2': '机构护理',
        '3': '护理器材出售',
        '4': '护理器材租赁',
        '5': '社区标准订单',
        '6': '社区个性订单',
        '7': '长护险订单'
      },
      'typeGoodsMap': typeGoodsMap,
      'categoryMap': categoryMap,
      goodsData: {},
      goods_table_data: [
      ],
      baseRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isSale = this.$route.query.type
  },
  mounted() {
    this.offset = offset()
    getOrderInfo({ id: this.$route.query.id }).then(res => {
      this.goodsData = res
      this.goods_table_data = res.quotationInfos
    })
    document.getElementById('scrollBox').addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  destroyed: function() {
    document.getElementById('scrollBox').removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    onSubmit(form) {},
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd; text-align:center;'
      } else {
        return 'text-align:center;'
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;verical-align:middle'
      }
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'
    }
  }
}
</script>
<style scoped lang='scss'>
#scrollBox {
  color: #828282;
}
.float_left {
  float: left;
}
.float_right {
  float: right;
  margin-right: 30px;
}
.app-container {
  background: #f2f2f2;
  margin: 0px;
}
.gray_box {
  border: 1px solid #dddddd;
  margin-bottom: 20px;
  background: #ffffff;
}
.herfTab {
  background: #ffffff;
  position: relative;
  overflow: hidden;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  .tabItem {
    width: 130px;
    line-height: 57px;
    border-top: 3px solid transparent;
  }
  .tab_active {
    border-color: #409eff;
    background: rgba(30, 144, 255, 0.2);
    color: #3e8dff;
  }
}
.item_title {
  color: #000000;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 55px;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  padding-left: 20px;
}
.item_form {
  padding: 20px;
}
.wid_320 {
  width: 320px;
}
.marg_20 {
  margin-left: 20px;
}
.wid_110 {
  width: 110px;
}
.pd_left_20 {
  padding-left: 20px;
}
.color_green{
  color: #399C39
}
.info_item {
  // height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.info_item_bold {
  height: 40px;
  font-size: 25px;
  line-height: 25px;
  font-weight: bolder;
}
.label_item {
  display: inline-block;
  width: 150px;
  font-weight: normal;
  text-align: left;
}
.label_item_bold {
  font-weight: bolder;
}
.font_blue {
  color: #41c5ff;
  font-size: 25px;
}
.table_border {
  border: 1px solid #ddd;
}
#goods_info_table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style lang="scss">
#goods_info_table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
//  图片上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>

