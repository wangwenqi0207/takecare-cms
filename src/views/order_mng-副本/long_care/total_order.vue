<template>
  <div style="height:100%;">
    <!-- {{ tabId }} -->
    <div class="search_bar">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <!-- <el-form-item label>
          <el-dropdown trigger="click" class="rela" @command="handleCommandType">
            <span class="el-dropdown-link">
              {{ orderType }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="&全部订单类型">全部订单类型</el-dropdown-item>
              <el-dropdown-item command="0&生活照料">生活照料</el-dropdown-item>
              <el-dropdown-item command="1&医疗护理">医疗护理</el-dropdown-item>
              <el-dropdown-item command="2&机构护理">机构护理</el-dropdown-item>
              <el-dropdown-item command="3&护理器材出售">护理器材出售</el-dropdown-item>
              <el-dropdown-item command="4&护理器材租赁">护理器材租赁</el-dropdown-item>
              <el-dropdown-item command="5&社区标准订单">社区标准订单</el-dropdown-item>
              <el-dropdown-item command="6&社区个性订单">社区个性订单</el-dropdown-item>
              <el-dropdown-item command="7&保险服务">保险服务</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item> -->
        <el-form-item v-if="tabId == 'first'">
          <el-dropdown trigger="click" class="rela" @command="handleCommandStatus">
            <span class="el-dropdown-link">
              {{ orderStatus }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="&全部状态">全部状态</el-dropdown-item>
              <el-dropdown-item command="0&待确认">待确认</el-dropdown-item>
              <el-dropdown-item command="1&待派单">待派单</el-dropdown-item>
              <el-dropdown-item command="2&待派护理员">待派护理员</el-dropdown-item>
              <el-dropdown-item command="2&待发货">待发货</el-dropdown-item>
              <el-dropdown-item command="2&待入住">待入住</el-dropdown-item>
              <el-dropdown-item command="2&待服务">待服务</el-dropdown-item>
              <el-dropdown-item command="3&待用户确认">待用户确认</el-dropdown-item>
              <el-dropdown-item command="4&已完成">已完成</el-dropdown-item>
              <el-dropdown-item command="5&退单中">退单中</el-dropdown-item>
              <el-dropdown-item command="6&已退单">已退单</el-dropdown-item>
              <el-dropdown-item command="7&未通过">未通过</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="searchForm.order_no" class="searchInput_300" placeholder="请输入订单编码/购买用户" clearable>
            <el-select slot="prepend" v-model="searchForm.type" placeholder="请选择" class="input-with-select" style="width:120px">
              <el-option label="订单编码" value="1" />
              <el-option label="购买用户" value="2" />
            </el-select>
            <!-- <el-button slot="append" icon="el-icon-search" @click.prevent="searchData" /> -->
          </el-input>
          <!-- <el-input
            v-model="searchForm.order_no"
            class="searchInput_300"
            placeholder="请输入订单编码/购买用户"
            clearable
            size="small"
          /> -->
        </el-form-item>
        <el-form-item label="支付日期">
          <el-date-picker
            v-model="searchForm.pay_date"
            class="searchInput_400"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchData">查询</el-button>
          <!-- <el-button v-if="tabId=='first'||tabId=='second'||tabId=='third'" type="primary" size="small" @click="checkIDs">取消订单</el-button> -->
          <el-button v-if="resourcePermission['取消订单']&&(tabId!='six'&&tabId!='seven'&&tabId!='eight')" type="primary" size="small" @click="checkIDs">取消订单</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :id="tabId" class="tableList" style="height: 80%;overflow: auto;">
      <table border="1" cellpadding="0" cellspacing="0" border-collapse="collapse" class="table">
        <thead class="table_head">
          <tr style="border-color:rgb(221,221,221)">
            <th style="border-left:1px solid rgb(221, 221, 221)" width="10%">
              <!-- <el-checkbox v-model="all_check" /> -->
              <span>订单类型</span>
            </th>
            <th width="20%">商品名称</th>
            <th width="8%">价格</th>
            <th width="10%">商品类型</th>
            <th width="10%">商品分类</th>
            <th>实付金额</th>
            <th>订单状态</th>
            <th width="20%">操作</th>
          </tr>
        </thead>
        <tbody v-for="item in tableData" :key="item.id">
          <tr style="height:20px;border:none" />
          <tr class="tr_item">
            <td colspan="7">
              <div class="fl_box" style="width:100%">
                <div class="flt mar_right_40 mar_left_20">
                  <el-checkbox :name="item.id+'&&'+item.actualTotalPrice" />
                </div>
                <!-- <div v-if="item.paymentStatus>=2" class="flt mar_right_40">
                  <span>支付时间：</span>
                  <span v-if="item.paymentTime">{{ $moment(item.paymentTime+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </div> -->
                <div class="flt mar_right_40">
                  <span>创建时间：</span>
                  <span v-if="item.createdUTC">{{ $moment(item.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </div>
                <div class="flt mar_right_40">
                  <span>订单编号：</span>
                  <span>{{ item.orderNumber }}</span>
                </div>
                <div class="flt mar_right_40">
                  <span>购买用户：</span>
                  <span>{{ item.customerName }}</span>
                </div>
                <div v-if="item.type==0||item.type==1||item.type==2" class="flt mar_right_40">
                  <span>护理机构：</span>
                  <span>{{ item.organizationName }}</span>
                </div>
                <div v-else-if="item.type==8" class="flt">
                  <div class="flt mar_right_40">
                    <span>参保人姓名：</span>
                    <span>{{ item.organizationName }}</span>
                  </div>
                  <div class="flt mar_right_40">
                    <span>护理所属月份：</span>
                    <span>{{ item.organizationName }}</span>
                  </div>
                </div>
                <div v-else class="flt mar_right_40">
                  <span>商户：</span>
                  <span>{{ item.organizationName }}</span>
                </div>
              </div>
            </td>
            <td>
              <div style="text-align:center">
                <el-button type="text" @click.prevent="checkDetail(item.type,item.id)">查看详情</el-button>
              </div>
            </td>
          </tr>
          <tr v-for="(orderItem,index) in item.orderItems" :key="index">
            <td v-if="index==0">{{ typeMap[item.type] }}</td>
            <td v-if="index==0" class="font_bold">{{ orderItem.name }}</td>
            <td v-if="index==0">
              <div v-if="orderItem.subDisCount">
                <s class="text-del">￥{{ orderItem.subDisCount }}</s>
              </div>
              <div>
                <span>￥{{ orderItem.price }}</span>
              </div>
            </td>
            <td v-if="index==0" :rowspan="item.orderItems.length">{{ typeGoodsMap[orderItem.type] }}</td>
            <td v-if="index==0" :rowspan="item.orderItems.length">{{ categoryMap[orderItem.category] }}</td>
            <td v-if="index==0" :rowspan="item.orderItems.length">￥{{ item.actualTotalPrice }}</td>
            <td v-if="index==0" :rowspan="item.orderItems.length">
              <div v-if="item.paymentStatus<2">
                待支付
              </div>
              <div v-else-if="item.orderStatus!=2">
                {{ orderStatusMap[item.orderStatus] }}
              </div>
              <div v-else>
                <div v-if="item.type==0||item.type==1||item.type==5||item.type==6 ">
                  待派护理员
                </div>
                <div v-else-if="item.type==2 ">
                  待入住
                </div>
                <div v-else-if="item.type==3||item.type==4 ">
                  待发货
                </div>
                <div v-else-if="item.type==7">
                  待服务
                </div>
              </div>
            </td>
            <td v-if="index==0" :rowspan="item.orderItems.length">
              <el-button v-if="resourcePermission['确认订单']&&item.paymentStatus>=2&&item.orderStatus=='0'" type="primary" size="mini" @click="QRAction(item.id)">确认订单</el-button>
              <el-button v-else-if="resourcePermission['派单']&&item.orderStatus=='1'" type="primary" size="mini" @click="PDAction(item.id)">派单</el-button>
              <el-button v-else-if="resourcePermission['确认退单']&&item.orderStatus=='5'" type="primary" size="mini" @click="TDAction(item.id,item)">确认退单</el-button>
              <el-button v-else-if="resourcePermission['派护理员']&&item.orderStatus=='2'&&(item.type==0||item.type==1||item.type==5||item.type==6)" type="primary" size="mini" @click="HLYAction(item.id)">派护理员</el-button>
              <el-button v-else-if="resourcePermission['入住']&&item.orderStatus=='2'&&item.type==2" type="primary" size="mini" @click="RZAction(item.id)">入住</el-button>
              <el-button v-else-if="resourcePermission['发货物流']&&item.orderStatus=='2'&&(item.type==3||item.type==4)" type="primary" size="mini" @click="FHAction(item.id)">发货物流</el-button>
              <!-- <el-button type="primary" size="mini" @click="dialogFormVisibleTD = true">待服务</el-button> -->
            </td>
            <td v-if="index!=0">{{ typeMap[item.type] }}</td>
            <td v-if="index!=0" class="font_bold">{{ orderItem.name }}</td>
            <td v-if="index!=0">
              <div v-if="orderItem.subDisCount">
                <s class="text-del">￥{{ orderItem.subDisCount }}</s>
              </div>
              <div>
                <span>￥{{ orderItem.price }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page_nation">
      <el-pagination
        style="margin-top:30px;"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="totalItems1"
        @current-change="handleCurrentChange"
      />
      <!-- <el-pagination
        v-else
        style="margin-top:30px;"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      /> -->
    </div>
    <!-- 确认订单 -->
    <el-dialog title="确认订单" :visible.sync="dialogFormVisibleQR" width="600px">
      <el-form ref="formQR" :model="formQR" :rules="rulesQR">
        <el-form-item label="确认订单：" :label-width="formLabelWidth" prop="isPassed">
          <el-select v-model="formQR.isPassed" style="width:80%;">
            <el-option label="通过" :value="true" />
            <el-option label="未通过" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="IsShowQR" label="未通过原因：" :label-width="formLabelWidth" prop="reason">
          <!-- <el-select v-model="formQR.name" style="width:80%;" >
            <el-option label="通过" value="shanghai" />
            <el-option label="未通过" value="beijing" />
          </el-select> -->
          <el-input v-model.trim="formQR.reason" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisibleQR = false">取 消</el-button>
        <!-- <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button> -->
        <el-button type="primary" size="medium" @click="onSubmitQR">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 派单 -->
    <el-dialog title="派单" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="派单给：" :label-width="formLabelWidth" prop="organizationId">
          <el-select v-model="form.organizationId" style="width:80%;">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 派护理员 -->
    <el-dialog title="派护理员" :visible.sync="dialogFormVisibleHLY" width="600px">
      <el-form ref="formHLY" :model="formHLY" :rules="rulesHLY">
        <el-form-item label="护理员：" :label-width="formLabelWidth" prop="StaffId">
          <el-select v-model="formHLY.StaffId" style="width:80%;">
            <el-option label="护理员1号" value="shanghai" />
            <el-option label="护理员2号" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisibleHLY = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmitHLY">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 发货 -->
    <el-dialog title="发货物流" :visible.sync="dialogFormVisibleFH" width="600px">
      <el-form ref="formFH" :model="formFH" :rules="rulesFH">
        <el-form-item label="物流公司：" :label-width="formLabelWidth" prop="expressCompanyName">
          <el-select v-model="formFH.expressCompanyName" placeholder="请选择物流公司" style="width:80%;">
            <el-option label="顺丰快递" value="顺丰快递" />
            <el-option label="中通快递" value="中通快递" />
            <el-option label="韵达快递" value="韵达快递" />
            <el-option label="圆通快递" value="圆通快递" />
            <el-option label="汇通快递" value="汇通快递" />
            <el-option label="EMS物流" value="EMS物流" />
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号：" :label-width="formLabelWidth" prop="trackingNumber">
          <!-- <el-select v-model="formQR.name" style="width:80%;" >
            <el-option label="通过" value="shanghai" />
            <el-option label="未通过" value="beijing" />
          </el-select> -->
          <el-input v-model.trim="formFH.trackingNumber" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisibleFH = false">取 消</el-button>
        <!-- <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button> -->
        <el-button type="primary" size="medium" @click="onSubmitFH">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 入住 -->
    <el-dialog title="入住" :visible.sync="dialogFormVisibleRZ" width="600px">
      <el-form ref="formRZ" :model="formRZ" :rules="rulesRZ">
        <el-form-item label="入住楼号：" :label-width="formLabelWidth" prop="livingBuild">
          <el-input v-model.trim="formRZ.livingBuild" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="房间床位号：" :label-width="formLabelWidth" prop="livingRoom">
          <!-- <el-select v-model="formQR.name" style="width:80%;" >
            <el-option label="通过" value="shanghai" />
            <el-option label="未通过" value="beijing" />
          </el-select> -->
          <el-input v-model.trim="formRZ.livingRoom" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisibleRZ = false">取 消</el-button>
        <!-- <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button> -->
        <el-button type="primary" size="medium" @click="onSubmitRZ">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 确认退单 -->
    <el-dialog title="确认退单" :visible.sync="dialogFormVisibleTD" width="500px">
      <el-form ref="formTD" :model="formTD" :rules="rulesTD">
        <el-form-item label="请审核：" :label-width="formLabelWidth" prop="isPassed">
          <el-radio-group v-model="formTD.isPassed">
            <el-radio :label="true">通过</el-radio>
            <el-radio :label="false">未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="IsShowTD" label="未通过原因：" :label-width="formLabelWidth" prop="reason">
          <!-- <el-select v-model="formQR.name" style="width:80%;" >
            <el-option label="通过" value="shanghai" />
            <el-option label="未通过" value="beijing" />
          </el-select> -->
          <el-input v-model.trim="formTD.reason" autocomplete="off" style="width:80%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisibleTD = false">取 消</el-button>
        <!-- <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button> -->
        <el-button type="primary" size="medium" @click="onSubmitTD">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 取消订单 -->
    <el-dialog title="取消订单" :visible.sync="dialogFormVisibleQXDD" width="600px">
      <el-form ref="formQXDD" :model="formQXDD" :rules="rulesQXDD">
        <el-form-item label="取消原因：" label-width="180px" prop="reason">
          <el-input v-model.trim="formQXDD.reason" autocomplete="off" placeholder="填写取消原因" style="width:80%;" />
        </el-form-item>
        <el-form-item label="申请退款金额：" label-width="180px" prop="money">
          <el-input-number v-model="formQXDD.money" controls-position="right" :min="0.01" :max="maxMoney" />
          <!-- <el-input oninput = "value=value.replace(/[^\d.]/g,'')" v-model="formQXDD.money" placeholder="输入退款金额" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisibleQXDD = false">取 消</el-button>
        <!-- <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button> -->
        <el-button type="primary" size="medium" @click="onSubmitQXDD">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 'currentPage1': {
//     type: Number,
//     default: 1
//   },
import { Debounce, Throttle } from '@/utils/public'
import { orderSearch, getOrderInfo, orderUpdate, orderDelete, adminConfirmOrder6002, assignStaff6002, fillInLogisticsInfo6002, cancelOrder6002, conformRefund6002, AlipayRefund, fillCheckInInfo6002, assignOrgToService6002, orderPage, orderInfo, orderConfirmrefund, cancelOrder, adminConfirmOrder } from '@/api/order'
// import { orderSearch, getOrderInfo } from '@/api/orderBD'
import permissionData from '@/utils/resPermission'
import { offset } from '@/utils/offset'

export default {
  name: 'TotalOrder',
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
    var validateReason = (rule, value, callback) => {
      if (this.formQR.isPassed === false) {
        if (value === '') {
          callback(new Error('请输入不通过原因!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validateTdReason = (rule, value, callback) => {
      console.log(this.formTD.isPassed)
      if (this.formTD.isPassed === false) {
        if (value === '') {
          callback(new Error('请输入不通过原因!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      offset: 8,
      currentItem: '',
      sortList: [
        {
          'columnName': 'CreatedUTC',
          'sortOrder': 1
        }
        // {
        //   'columnName': 'PaymentTime',
        //   'sortOrder': 1
        // }
      ],
      tableIdNew: '',
      searchForm: {
        order_no: '',
        type: '1',
        pay_date: []
      },
      user: {
        name: 'mike',
        age: '18',
        sex: '男'
      },
      all_check: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 200,
      // tableData: '',
      typeMap: {
        '0': '生活照料',
        '1': '医疗护理',
        '2': '机构护理',
        '3': '护理器材出售',
        '4': '护理器材租赁',
        '5': '社区标准订单',
        '6': '社区个性订单',
        '7': '长护险服务'
      },
      typeGoodsMap: {
        '1': '生活照料',
        '2': '医疗护理',
        '3': '机构护理',
        '4': '护理器材',
        '5': '长护险护理包',
        '6': '保险服务'
      },
      categoryMap: {
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
      },
      orderStatusMap: {
        '0': '待确认',
        '1': '待派单',
        '2': '待派护理员|待发货|待入住|待服务',
        '3': '待用户确认',
        '4': '已完成',
        '5': '退单中',
        '6': '已退单',
        '7': '未通过'
      },
      // 操作弹出框相关
      formLabelWidth: '120px',
      // 是否显示未通过原因一栏
      IsShowQR: false,
      IsShowTD: false,
      // 确认订单
      dialogFormVisibleQR: false,
      formQR: {
        isPassed: true,
        reason: ''
      },
      rulesQR: {
        isPassed: [{ required: true, message: '请选择', trigger: 'change' }
        ],
        reason: [{ required: true, validator: validateReason, trigger: 'blur' }]
      },
      // 派单操作
      dialogFormVisible: false,
      form: {
        organizationId: ''
      },
      rules: {
        organizationId: [{ required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      // 发货
      dialogFormVisibleFH: false,
      formFH: {
        expressCompanyName: '',
        trackingNumber: ''
      },
      rulesFH: {
        expressCompanyName: [{ required: true, message: '请选择快递公司', trigger: 'change' }
        ],
        trackingNumber: [{ required: true, message: '请填写单号', trigger: 'blur' }
        ]
      },
      // 派护理员
      dialogFormVisibleHLY: false,
      formHLY: {
        StaffId: ''
      },
      rulesHLY: {
        StaffId: [{ required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      // 入住
      dialogFormVisibleRZ: false,
      formRZ: {
        livingBuild: '',
        livingRoom: ''
      },
      rulesRZ: {
        livingBuild: [{ required: true, message: '请填写入住楼号', trigger: 'blur' }
        ],
        livingRoom: [{ required: true, message: '请填写入住房间号', trigger: 'blur' }
        ]
      },
      // 确认退单
      dialogFormVisibleTD: false,
      formTD: {
        isPassed: true,
        reason: ''
      },
      rulesTD: {
        isPassed: [{ required: true, message: '请选择', trigger: 'change' }
        ],
        reason: [{ required: true, validator: validateTdReason, trigger: 'blur' }]
      },
      // 取消订单
      dialogFormVisibleQXDD: false,
      formQXDD: {
        reason: '',
        money: ''
      },
      rulesQXDD: {
        money: [{ required: true, message: '请输入退款金额', trigger: 'blur' }],
        reason: [{ required: true, message: '请输入取消原因', trigger: '' }]
      },
      // 当前操作的订单ID
      currentOrderId: '',
      // search
      orderType: '全部订单类型',
      orderTypeValue: '',
      orderStatus: '全部状态',
      orderStatusValue: '',

      // 搜索数据
      filterData: [{
        'key': 'Type',
        'value': '7'
      }],
      fromDate: '',
      endDate: '',

      // 取消订单最大取消金额
      maxMoney: 0,
      // 权限相关
      resourcePermission: []

    }
  },
  watch: {
    'formQR.isPassed': function(val, oldval) {
      // console.log('1111')
      this.IsShowQR = !val
    },
    'formTD.isPassed': function(val, oldval) {
      this.IsShowTD = !val
    }
  },
  mounted() {
    this.resourcePermission = permissionData('长护险订单')
    this.offset = offset()
  },
  methods: {

    // 搜索赋值
    handleCommandType(command) {
      // this.$message('click on item ' + command)
      this.orderType = command.split('&')[1]
      this.orderTypeValue = command.split('&')[0]
    },
    handleCommandStatus(command) {
      // this.$message('click on item ' + command)
      this.orderStatus = command.split('&')[1]
      this.orderStatusValue = command.split('&')[0]
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`, this.tabId)
      this.currentPage = val
      var obj = {}
      var data = {
        'currentPage': val,
        'filters': this.filterData,
        'numberPerPage': 10,
        'fromDate': this.fromDate,
        'toDate': this.endDate
      }

      if (this.tabId === 'first') {
        orderSearch(data).then(res => {
          // this.tab1 = res.data
          // this.currentPage1 = 1
          // this.totalItems1 = res.pager.totalItems
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      } else if (this.tabId === 'second') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '0'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
        // obj.data = tableData1
        // obj.id = this.tabId
        // this.$emit('handleCurrentChange', obj)
      } else if (this.tabId === 'third') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '1'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      } else if (this.tabId === 'fourth') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '2'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      } else if (this.tabId === 'five') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '3'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      } else if (this.tabId === 'six') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '4'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      } else if (this.tabId === 'seven') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '5'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      } else if (this.tabId === 'eight') {
        if (this.filterData.length == 1) {
          this.filterData.push({
            'key': 'OrderStatus',
            'value': '6'
          })
        }
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          obj.totalItems = res.pager.totalItems
          this.$emit('handleCurrentChange', obj)
        })
      }

      //   this.list = this.mockData.slice(val * 10 - 10, val * 10);
      //   $(".el-pagination__total").html(
      //     `当前显示&nbsp;${(this.currentPage - 1) * 10 + 1}&nbsp;到&nbsp;${this
      //       .currentPage * 10}&nbsp;条，共&nbsp;${
      //       this.total
      //     }&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
      //   );
    },
    searchData() {
      var startDate = ''
      var endDate = ''
      this.fromDate = ''
      this.endDate = ''
      if (this.searchForm.pay_date && this.searchForm.pay_date.length > 0) {
        // startDate = this.$moment(this.searchForm.pay_date[0]).format('YYYY-MM-DD')
        // endDate = this.$moment(this.searchForm.pay_date[1]).format('YYYY-MM-DD')
        // startDate = new Date(this.$moment(this.searchForm.pay_date[0]).format('YYYY-MM-DD HH:mm:ss')).toISOString()
        // endDate = new Date(this.$moment(this.searchForm.pay_date[1]).format('YYYY-MM-DD HH:mm:ss')).toISOString()
        startDate = this.searchForm.pay_date[0]
        endDate = this.$moment(this.searchForm.pay_date[1]).add(1, 'days')
        this.fromDate = startDate
        this.endDate = endDate
      }
      this.filterData = [{
        'key': 'Type',
        'value': '7'
      }]
      if (this.searchForm.type && this.searchForm.order_no) {
        if (this.searchForm.type == 1) {
          var objFilter = {
            'key': 'OrderNumber',
            'value': this.searchForm.order_no
          }
          this.filterData.push(objFilter)
        } else if (this.searchForm.type == 2) {
          var objFilter = {
            'key': 'CustomerName',
            'value': this.searchForm.order_no
          }
          this.filterData.push(objFilter)
        }
      }

      // var objFilter = {
      //   'key': 'Type',
      //   'value': '0'
      // }
      // this.filterData.push(objFilter)

      // if (this.orderStatusValue) {
      //   var objFilter = {
      //     'key': 'OrderStatus',
      //     'value': this.orderStatusValue
      //   }
      //   this.filterData.push(objFilter)
      // }

      console.log('66', this.filterData)
      console.log('搜索数据', this.searchForm.type, this.searchForm.order_no, startDate, endDate, this.orderTypeValue, this.orderStatusValue)

      var data = {
        'currentPage': 1,
        'filters': this.filterData,
        'numberPerPage': 10,
        'fromDate': this.fromDate,
        'toDate': this.endDate
      }

      var obj = {}
      if (this.tabId === 'first') {
        if (this.orderStatusValue) {
          var objFilter = {
            'key': 'OrderStatus',
            'value': this.orderStatusValue
          }
          this.filterData.push(objFilter)
        }
        // obj.data = tableData
        // obj.id = this.tabId
        // this.$emit('updateData', obj)
        // this.currentPage = 1
        // this.total = tableData.length
        orderSearch(data).then(res => {
          // this.tab1 = res.data
          // this.currentPage1 = 1
          // this.totalItems1 = res.pager.totalItems
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      } else if (this.tabId === 'second') {
        // obj.data = tableData2
        // obj.id = this.tabId
        // this.$emit('updateData', obj)
        // this.currentPage = 1
        // this.total = tableData2.length
        var objFilter = {
          'key': 'OrderStatus',
          'value': '0'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      } else if (this.tabId === 'third') {
        var objFilter = {
          'key': 'OrderStatus',
          'value': '1'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
        // obj.data = tableData2
        // obj.id = this.tabId
        // this.$emit('updateData', obj)
        // this.currentPage = 1
        // this.total = tableData2.length
      } else if (this.tabId === 'fourth') {
        var objFilter = {
          'key': 'OrderStatus',
          'value': '2'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      } else if (this.tabId === 'five') {
        var objFilter = {
          'key': 'OrderStatus',
          'value': '3'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      } else if (this.tabId === 'six') {
        var objFilter = {
          'key': 'OrderStatus',
          'value': '4'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      } else if (this.tabId === 'seven') {
        var objFilter = {
          'key': 'OrderStatus',
          'value': '5'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      } else if (this.tabId === 'eight') {
        var objFilter = {
          'key': 'OrderStatus',
          'value': '6'
        }
        this.filterData.push(objFilter)
        orderSearch(data).then(res => {
          obj.data = res.data
          obj.id = this.tabId
          this.currentPage = 1
          obj.totalItems = res.pager.totalItems
          this.$emit('updateData', obj)
        })
      }
    },
    checkDetail(type, id) {
      console.log(type, id)
      // 生活照料0 order_mng/daily_care/order_detail
      // 医疗护理1 order_mng/medical_care/order_detail
      // 机构护理2 order_mng/organization_care/order_detail
      // 护理器材出售3 order_mng/care_equipment/order_detail?type=1
      // 护理器材租赁4 order_mng/care_equipment/order_detail?type=2
      // 社区标准订单5 order_mng/community_order/order_detail?type=1
      // 社区个性订单6 order_mng/community_order/custom_order_detail?type=2
      // 保险服务 order_mng/medical_care/order_detail
      // 长护险订单7 order_mng/long_care/order_detail
      // if (type === 0) {
      //   this.$router.push({ path: `/order_mng/daily_care/order_detail`, query: { orderNumber: orderNumber }})
      // } else if (type === 1) {
      //   this.$router.push({ path: `/order_mng/medical_care/order_detail`, query: { orderNumber: orderNumber }})
      // } else if (type === 2) {
      //   this.$router.push({ path: `/order_mng/organization_care/order_detail`, query: { orderNumber: orderNumber }})
      // } else if (type === 3) {
      //   this.$router.push({ path: `/order_mng/care_equipment/order_detail`, query: { orderNumber: orderNumber, type: 1 }})
      // } else if (type === 4) {
      //   this.$router.push({ path: `/order_mng/care_equipment/order_detail`, query: { orderNumber: orderNumber, type: 2 }})
      // } else if (type === 5) {
      //   this.$router.push({ path: `/order_mng/community_order/order_detail`, query: { orderNumber: orderNumber, type: 1 }})
      // } else if (type === 6) {
      //   this.$router.push({ path: `/order_mng/community_order/custom_order_detail`, query: { orderNumber: orderNumber, type: 2 }})
      // } else if (type === 7) {
      //   this.$router.push({ path: `/order_mng/long_care/order_detail`, query: { orderNumber: orderNumber }})
      // }
      this.$router.push({ path: `/order_mng/long_care/order_detail`, query: { id: id }})
      // this.$message.success(val)
      // this.$router.push({ path: '/order_mng/all_order/order_detail' })
    },
    // 刷新全部订单的页面
    // 每次操作之后需要调用全部页面搜索刷新，自身页面搜索刷新，以及操作后变化的页面刷新
    getAllOrder(filtersData, id) {
      orderSearch({ 'currentPage': 1, 'numberPerPage': 10, 'sortList': this.sortList, 'filters': filtersData }).then(res => {
        var obj = {}
        obj.data = res.data
        obj.id = id
        obj.totalItems = res.pager.totalItems
        this.$emit('updateData', obj)
      })
    },
    // 取消订单
    onSubmitQXDD() {
      console.log(this.formQXDD)
      this.$refs.formQXDD.validate((valid) => {
        if (valid) {
          var id = $('#' + this.tabId + ' :input:checkbox:checked')[0].name.split('&&')[0]
          var obj = {
            'orderId': id,
            'cancelReasonId': '',
            'cancelReason': this.formQXDD.reason,
            'refundAmount': this.formQXDD.money,
            'isManagerCanceled': true
          }
          cancelOrder6002(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '取消成功!'
              })
              this.dialogFormVisibleQXDD = false
              this.searchData()
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '0' }], 'second')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '1' }], 'third')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '5' }], 'seven')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '6' }], 'eight')
            } else {
              this.$message({
                type: 'warning',
                message: '取消失败!'
              })
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: '请正确填写表单'
          })
          return false
        }
      })
    },
    // 取消订单
    checkIDs() {
      if ($('#' + this.tabId + ' :input:checkbox:checked').length === 1) {
        this.$confirm('是否确定取消订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '再想想',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisibleQXDD = true
          this.$nextTick(function() {
            this.$refs['formQXDD'].resetFields()
            var maxMoney = $('#' + this.tabId + ' :input:checkbox:checked')[0].name.split('&&')[1]
            this.maxMoney = Number(maxMoney)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消取消'
          })
        })
      } else {
        this.$message({
          message: '请选择一条记录进行操作!',
          type: 'warning'
        })
      }
    },
    // 弹出框事件相关
    QRAction(val) {
      this.dialogFormVisibleQR = true
      this.currentOrderId = val
      console.log(this.currentOrderId)
      this.$nextTick(function() {
        this.$refs['formQR'].resetFields()
      })
    },
    PDAction(val) {
      this.dialogFormVisible = true
      this.currentOrderId = val
      console.log(this.currentOrderId)
      this.$nextTick(function() {
        this.$refs['form'].resetFields()
      })
    },
    TDAction(val, item) {
      this.dialogFormVisibleTD = true
      this.currentOrderId = val
      this.currentItem = item
      console.log(this.currentOrderId)
      this.$nextTick(function() {
        this.$refs['formTD'].resetFields()
      })
    },
    HLYAction(val) {
      this.formHLY.staffName = ''
      this.dialogFormVisibleHLY = true
      this.currentOrderId = val
      console.log(this.currentOrderId)
      const data = {
        'current': 1,
        'size': this.formHLY.staffName ? 1000 : 15,
        // 'account': this.searchForm.account,
        'fullname': this.formHLY.staffName
        // 'idNo': this.searchForm.idNo,
        // 'empno': this.searchForm.empno,
        // 'orgId': this.searchForm.orgId
      }
      // employeeList(data).then(res => {
      //   console.log(res.data.records)
      //   if (res.resultCode == '000000') {
      //     this.$emit('updateHLYData', { data: res.data.records, flag: 1 })
      //     this.formHLY.StaffId = ''
      //   } else {
      //     this.$message({
      //       message: res.resultMsg,
      //       type: 'warning'
      //     })
      //   }
      // })
      this.$nextTick(function() {
        this.$refs['formHLY'].resetFields()
      })
    },
    RZAction(val) {
      this.dialogFormVisibleRZ = true
      this.currentOrderId = val
      console.log(this.currentOrderId)
      this.$nextTick(function() {
        this.$refs['formRZ'].resetFields()
      })
    },
    FHAction(val) {
      this.dialogFormVisibleFH = true
      this.currentOrderId = val
      console.log(this.currentOrderId)
      this.$nextTick(function() {
        this.$refs['formFH'].resetFields()
      })
    },

    // 派单给机构
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form.organizationId)
          var data = {
            'organizationId': this.form.organizationId
            // 'organizationName': '义务市怡乐新村养老中心',
            // 'organizationAddress': '义乌市宾王路C77号',
            // 'organizationPhoneNumber': '0579-89926195'
          }
          for (var item of this.orgList) {
            if (item.organizationCode == this.form.organizationId) {
              data.organizationName = item.name
              data.organizationAddress = item.address
              data.organizationPhoneNumber = item.managerPhoneNumber
            }
          }
          // assignOrgToService6002
          var dataObj = {
            'id': this.currentOrderId,
            'data': data
          }
          // console.log(dataObj)
          assignOrgToService6002(dataObj).then(res => {
            this.dialogFormVisible = false
            // this.handleCurrentChange(this.currentPage)
            this.searchData()
            // alert('submit!')
            this.$message({
              message: '派单成功',
              type: 'success'
            })
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '2' }], 'fourth')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '1' }], 'third')
            // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'OrderStatus', 'value': '2' }] }}).then(res => {
            //   var obj = {}
            //   obj.data = res.data
            //   obj.id = 'fourth'
            //   obj.totalItems = res.pager.totalItems
            //   this.$emit('updateData', obj)
            // })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmitQR() {
      this.$refs.formQR.validate((valid) => {
        if (valid) {
          console.log(this.formQR.isPassed, this.formQR.reason)
          var dataObj = {
            'id': this.currentOrderId,
            'data': {
              isPassed: this.formQR.isPassed,
              reason: this.formQR.reason
            }
          }
          adminConfirmOrder6002(dataObj).then(res => {
            // adminConfirmOrder6002
            this.dialogFormVisibleQR = false
            // this.handleCurrentChange(this.currentPage)
            this.searchData()
            this.$message({
              message: '确认成功',
              type: 'success'
            })
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '1' }], 'third')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '0' }], 'second')
            // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'OrderStatus', 'value': '1' }] }}).then(res => {
            //   var obj = {}
            //   obj.data = res.data
            //   obj.id = 'third'
            //   obj.totalItems = res.pager.totalItems
            //   this.$emit('updateData', obj)
            // })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmitHLY() {
      this.$refs.formHLY.validate((valid) => {
        if (valid) {
          // assignStaff6002
          var data = {
            'staffId': this.formHLY.StaffId
          }
          for (var item of this.nursingAllList) {
            if (item.userId == this.formHLY.StaffId) {
              data.staffName = item.fullname
              data.staffGender = item.gender
              // data.staffPhoto = 'https://images.pexels.com/photos/1061588/pexels-photo-1061588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
              data.staffPhoneNumber = item.workPhone
              data.staffIDCard = item.idNo
              data.staffType = item.userClass
              data.staffCertificate = item.proTitle
            }
          }
          // assignOrgToService6002
          var dataObj = {
            'id': this.currentOrderId,
            'data': data
          }
          console.log(dataObj)
          // var dataObj = {
          //   'id': this.currentOrderId,
          //   'data': {
          //     'staffId': 'jandjf-01',
          //     'staffName': '张玉',
          //     'staffGender': '女',
          //     'staffPhoto': 'https://images.pexels.com/photos/1061588/pexels-photo-1061588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          //     'staffIDCard': '220422454566525447',
          //     'staffType': 1,
          //     'staffCertificate': '护工资格证'
          //   }
          // }
          assignStaff6002(dataObj).then(res => {
            this.dialogFormVisibleHLY = false
            // this.handleCurrentChange(this.currentPage)
            this.searchData()
            this.$message({
              message: '派单给护理员成功',
              type: 'success'
            })
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '3' }], 'five')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '2' }], 'fourth')
            // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'OrderStatus', 'value': '3' }] }}).then(res => {
            //   var obj = {}
            //   obj.data = res.data
            //   obj.id = 'five'
            //   obj.totalItems = res.pager.totalItems
            //   this.$emit('updateData', obj)
            // })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmitFH() {
      this.$refs.formFH.validate((valid) => {
        if (valid) {
          // fillInLogisticsInfo6002
          var dataObj = {
            'id': this.currentOrderId,
            'data': {
              'expressCompanyName': this.formFH.expressCompanyName,
              'trackingNumber': this.formFH.trackingNumber
            }
          }
          fillInLogisticsInfo6002(dataObj).then(res => {
            this.dialogFormVisibleFH = false
            // this.handleCurrentChange(this.currentPage)
            this.searchData()
            this.$message({
              message: '发货信息填写完成',
              type: 'success'
            })
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '3' }], 'five')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '2' }], 'fourth')
            // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'OrderStatus', 'value': '3' }] }}).then(res => {
            //   var obj = {}
            //   obj.data = res.data
            //   obj.id = 'five'
            //   obj.totalItems = res.pager.totalItems
            //   this.$emit('updateData', obj)
            // })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmitRZ() {
      this.$refs.formRZ.validate((valid) => {
        if (valid) {
          // fillCheckInInfo6002
          var dataObj = {
            'id': this.currentOrderId,
            'data': {
              'buildingNumber': this.formRZ.livingBuild,
              'bedNumber': this.formRZ.livingRoom
            }
          }
          fillCheckInInfo6002(dataObj).then(res => {
            this.dialogFormVisibleRZ = false
            // this.handleCurrentChange(this.currentPage)
            this.searchData()
            this.$message({
              message: '入住信息填写完成',
              type: 'success'
            })
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '3' }], 'five')
            this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '2' }], 'fourth')
            // orderSearch({ 'data': { 'currentPage': 1, 'numberPerPage': 10, 'filters': [{ 'key': 'OrderStatus', 'value': '3' }] }}).then(res => {
            //   var obj = {}
            //   obj.data = res.data
            //   obj.id = 'five'
            //   obj.totalItems = res.pager.totalItems
            //   this.$emit('updateData', obj)
            // })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmitTD() {
      this.$refs.formTD.validate((valid) => {
        if (valid) {
          // conformRefund6002
          var dataObj = {
            'id': this.currentOrderId,
            'data': {
              'isPassed': this.formTD.isPassed,
              'reason': this.formTD.reason
            }
          }
          conformRefund6002(dataObj).then(res => {
            if (res) {
              this.dialogFormVisibleTD = false
              if (this.formTD.isPassed) {
                AlipayRefund({
                  // 'tradeNo': this.currentItem.transactionNumber, // 支付宝交易号
                  'outTradeNo': this.currentItem.transactionNumber, // 支付时的商户订单号
                  'refundAmount': this.currentItem.refundAmount, // 退款金额
                  'outRequestNo': this.currentItem.transactionNumber, // 标识退款，一个订单多次退款时需要唯一标识
                  'refundReason': this.currentItem.cancelReason// 退款原因说明
                }).then(res => {
                  if (res.status == 0) {
                    this.$message({
                      message: '退款成功',
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: '退款失败:' + res.response.sub_msg,
                      type: 'warning'
                    })
                  }
                })
              }
              // this.handleCurrentChange(this.currentPage)
              this.searchData()
              // this.handleCurrentChange(30)
              this.$message({
                message: '确认退单操作完成',
                type: 'success'
              })
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }], 'first')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '5' }], 'seven')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '6' }], 'eight')
              this.getAllOrder([{ 'key': 'Type', 'value': '7' }, { 'key': 'OrderStatus', 'value': '3' }], 'five')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.el-dropdown-menu {
  top: 220px !important;
}
.searchInput_300 {
  width: 350px;
}
.searchInput_400 {
  width: 400px;
}
.fl_box {
  overflow: hidden;
}
.flt {
  float: left;
}
.flr {
  float: right;
}
.mar_left_20 {
  margin-left: 20px;
}
.mar_right_40 {
  margin-right: 40px;
}
.font_bold {
  font-weight: bold;
}
.text-del {
  color: #aaaaaa;
}
</style>
<style scoped lang='scss'>
.table {
  width: 100%;
  border: 1px solid transparent;
  border-collapse: collapse;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  tr {
    text-align: center;
    border: 1px solid #e2f1fc;
    height: 40px;
  }
  td {
    height: 60px;
    border-right: 1px solid #e2f1fc;
  }
  .tr_item {
    text-align: left;
    vertical-align: middle;
    line-height: 40px;
    border: 1px solid #e2f1fc;
    background: #e5f4ff;
    font-size: 14px;
  }
}
.table_head {
  font-weight: 400;
  th {
    font-weight: normal;
    height: 50px;
    background: rgb(238, 241, 250);
    border-right: 1px solid rgb(221, 221, 221);
    border-left: none;
    border-top: 1px solid rgb(221, 221, 221);
  }
}
</style>

