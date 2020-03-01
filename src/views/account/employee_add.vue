<template>
  <div id="rolePermission" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" label-width="120px" :model="form" :rules="rules">
            <el-row id="zhqx1">
              <el-form-item label="基础信息" />
            </el-row>
            <el-row style="display:none;">
              <el-col :span="8">
                <el-form-item label="登录账号" required>
                  <el-input v-model="form.userName" style="width:100%;" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="" style="margin-bottom:2px;">
                  <el-row>
                    <el-col :span="7">
                      <div style="width:100%;background:#eee;height:30px;text-align:center;line-height:30px;">弱</div>
                    </el-col>
                    <el-col :span="0.5">
                      &nbsp;
                    </el-col>
                    <el-col :span="7">
                      <div style="width:100%;background:#eee;height:30px;text-align:center;line-height:30px;">中</div>
                    </el-col>
                    <el-col :span="0.5">
                      &nbsp;
                    </el-col>
                    <el-col :span="7">
                      <div style="width:100%;background:#eee;height:30px;text-align:center;line-height:30px;">强</div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="确认密码" prop="repassword">
                  <el-input v-model="form.repassword" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="员工类型" prop="type" required>
                  <el-radio v-if="type==1" v-model="form.type" :label="1">代理人</el-radio>
                  <el-radio v-if="type==0" v-model="form.type" :label="0">普通员工</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓" prop="lastName">
                  <el-input v-model="form.lastName" style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="名" prop="firstName">
                  <el-input v-model="form.firstName" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="6">
                <el-form-item label="姓名" required>
                  <el-input />
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="手机" prop="phoneNumber">
                  <el-input v-model.trim="form.phoneNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="部门" prop="departmentId">
                  <el-select
                    v-model="form.departmentId"
                    v-el-select-loadmore="loadmore"
                    placeholder="请选择所属部门"
                    filterable
                    :loading="false"
                    loading-text="加载中......"
                    size="small"
                    clearable
                  >
                    <!-- multiple
                    v-el-select-loadmore="loadmore" -->
                    <el-option
                      v-for="(item,index) in allDepartmentList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <!-- <el-select v-model="form.departmentId" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in allDepartmentList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位" prop="position">
                  <el-input v-model="form.position" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="6">
                <el-form-item label="代理人编号" prop="agentNumber">
                  <el-input v-model="form.agentNumber" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="12">
                <el-form-item label="保险公司" prop="insuranceCompanyId">
                  <el-select v-model="form.insuranceCompanyId" placeholder="请选择">
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option> -->
                    <el-option value="1" label="选项一" />
                    <el-option value="1" label="选项二" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type==1">
              <el-col :span="16">
                <el-form-item label="银行账号" required>
                  <el-row>
                    <el-col :span="2">
                      <span>开户行</span>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="openingBankId">
                        <el-select v-model="form.openingBankId" placeholder="请选择">
                          <!-- <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option> -->
                          <el-option value="1" label="选项一" />
                          <el-option value="1" label="选项二" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        &nbsp;
                    </el-col>
                    <el-col :span="3">
                      <span>银行卡号</span>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="bankCardNumber">
                        <el-input v-model.number="form.bankCardNumber" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="24"> -->
              <el-col :span="12">
                <el-form-item label="负责城市" required prop="cityCodes">
                  <!-- <child-page
                    v-for="(item,index) in items"
                    :key="index"
                    :index="index"
                    :items="items[index]"
                    :model-type="modelType"
                    :flage="flage"
                    :tab-pane-disabled="tab_pane_disabled"
                    @deleteIndexArea="deleteArea"
                  />
                  <el-button type="primary" size="medium" @click="addCity">新增负责城市</el-button> -->
                  <el-select v-model="form.cityCodes" multiple placeholder="请选择">
                    <el-option
                      v-for="(item1,index) in allCityList"
                      :key="index"
                      :label="item1.label"
                      :value="item1.value"
                    />
                  </el-select>
                  <!-- <div
                    v-for="(item,i) in form.cityList"
                    :key="i"
                    style="margin-bottom:10px;"
                  >
                    <el-form-item
                      :prop="'cityList.' + i + '.cityCodes'"
                      :rules="{
                        required: true, message: '负责城市不能为空', trigger: 'blur'
                      }"
                      style="margin-bottom:20px"
                    >
                      <el-select v-model="item.cityCodes" placeholder="请选择" @change="(value)=>handleCityChange(value,i)">
                        <el-option
                          v-for="(item1,index) in allCityList"
                          :key="index"
                          :label="item1.label"
                          :value="item1.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="(value)=>handleCheckAllChange(value,i)">全选</el-checkbox>
                    <div style="margin: 15px 0;" />
                    <el-checkbox-group v-model="item.checkedStreets" @change="(value)=>handleCheckedCitiesChange(value,i)">
                      <el-checkbox v-for="(streetItem,index) in item.streets" :key="index" :label="streetItem.code+'&'+streetItem.name">{{ streetItem.name }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <el-button type="primary" size="medium" @click="addCity">新增负责城市</el-button> -->
                </el-form-item>
              </el-col>
              <!-- <el-col :span="1">
                &nbsp;
              </el-col>
              <el-col :span="6">
                <el-button size="medium">新增负责城市</el-button>
              </el-col> -->
            </el-row>
            <!-- <el-row>
              <el-form-item label="">
                <el-row>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                  <el-col :span="3">
                    <el-checkbox>全部街道</el-checkbox>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-row> -->

            <el-row>
              <el-col :span="8">
                <el-form-item label="部门负责人" prop="isDepartmentAdmin">
                  <el-radio v-model="form.isDepartmentAdmin" :label="true">是</el-radio>
                  <el-radio v-model="form.isDepartmentAdmin" :label="false">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="Email" prop="email">
                  <el-input v-model="form.email" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="QQ" prop="qq">
                  <el-input v-model="form.qq" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="微信号" prop="weChat">
                  <el-input v-model="form.weChat" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="邮箱为登录账号" prop="useEmailAsUsername">
                  <el-radio v-model="form.useEmailAsUsername" :label="true">是</el-radio>
                  <el-radio v-model="form.useEmailAsUsername" :label="false">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="zhqx">
              <el-form-item label="权限设置">
                <span style="margin:22px 0px;display:block;">权限设置与角色关联，选择该账号的角色可完成权限设置</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="账号权限">
                <el-col :span="16">
                  <!-- 用for循环 -->
                  <el-row>
                    <el-checkbox-group v-model="userRoleList">
                      <el-checkbox
                        v-for="(item,i) in RolesList"
                        :key="i"
                        :label="item.id+'&&'+item.name"
                      >
                        {{ item.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-row>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="数据权限">
                  <el-radio v-model="dataPermissions" :label="1">全部部门</el-radio>
                  <el-radio v-model="dataPermissions" :label="2">自己</el-radio>
                  <el-radio v-model="dataPermissions" :label="3">指定部门</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="权限明细" />
              </el-col>
            </el-row>
            <el-row id="myRolePre">
              <el-col :span="16" style="margin-left:3%;">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%;"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    style="padding:0px"
                  >
                    <template slot-scope="scope">
                      <div style="display:inline-block;width:28%;float:left;padding:10px;">
                        <!-- <el-checkbox v-model="scope.row.checked" disabled>{{ scope.row.name }}</el-checkbox> -->
                        <p style="color:#C0C4CC;">{{ scope.row.name }}</p>
                      </div>
                      <div style="display:inline-block;width:70%;float:left;border-left:1px solid #EBEEF5;padding:10px">
                        <el-checkbox v-for="(item,i) in scope.row.resourcePermission" :key="i" v-model="item.checked" disabled>{{ item.name }}</el-checkbox>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="状态" prop="status">
                  <el-radio v-model="form.status" :label="0">有效</el-radio>
                  <el-radio v-model="form.status" :label="1">无效</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-form-item>
                <el-button size="medium" @click="cancel">取消</el-button>
                <el-button type="primary" size="medium" @click="onSubmit">提交</el-button>
              </el-form-item>
            </el-row>

          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// import childPage from './child.vue'
import { employeeAdd, userrolesCreate, rolesSearch, resourcesSearch } from '@/api/auth'
import { searchDepartment } from '@/api/department'
import { searchCity } from '@/api/city'
import { Debounce } from '@/utils/public'

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
  components: {
    // childPage
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空!'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      RolesList: [],
      dataPermissions: '',
      DepListCrrentPage: 1,
      loading: true,
      allStreetData: [],
      allCityList: [],
      // 新增负责城市
      items: [{
        overallType: '3',
        regionProvince: '',
        regionCity: '',
        regionDistrict: '',
        regionStreet: '',
        province: '',
        city: [],
        district: '',
        street: ''
      }, {
        overallType: '3',
        regionProvince: '',
        regionCity: '',
        regionDistrict: '',
        regionStreet: '',
        province: '',
        city: [],
        district: '',
        street: ''
      }],
      flage: 0,
      modelType: 1, // 判断是新增还是修改;;;;1---新增 0---修改--2查看,
      tab_pane_disabled: false, // tab选项卡是否禁用
      allDepartmentList: [],
      form: {
        userName: '',
        phoneNumber: '',
        password: '',
        repassword: '',
        type: '',
        lastName: '',
        firstName: '',
        departmentId: '',
        position: '',
        agentNumber: '',
        insuranceCompanyId: '',
        insuranceCompanyName: '',
        openingBankId: '',
        openingBank: '',
        bankCardNumber: '',
        isDepartmentAdmin: '',
        useEmailAsUsername: '',
        email: '',
        qq: '',
        status: '',
        weChat: '',
        cityCodes: [],
        cityList: [{
          cityCodes: [],
          streetCodes: [],
          checkAll: false,
          checkedStreets: [],
          streets: [],
          isIndeterminate: true
        }]
      },
      rules: {
        // userName: [{ required: true, message: '请输入登录账号', trigger: 'blur' },
        //   { pattern: /^[a-zA-Z]{1,}$|^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/, message: '账号支持纯英文或者英文和数字混合！' }
        // ],
        phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确格式的手机号' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码为字母+数字，长度为 6 - 20位' }
        ],
        repassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: '请输入名', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: '请输入姓', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        agentNumber: [
          { required: true, message: '请输入代理人编号', trigger: 'blur' }
        ],
        insuranceCompanyId: [
          { required: true, message: '请选择保险公司', trigger: 'blur' }
        ],
        openingBankId: [
          { required: true, message: '请选择开户行', trigger: 'change' }
        ],
        bankCardNumber: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        isDepartmentAdmin: [
          { required: true, message: '请选择是否为部门负责人', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择员工类型', trigger: 'change' }
        ],
        useEmailAsUsername: [
          { required: true, message: '请选择是否用邮箱作为登录账号', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        cityCodes: [
          { type: 'array', required: true, message: '请至少选择一个负责城市', trigger: 'change' }
        ]
      },
      // 权限明细展示
      tableData: [],
      checkList: [],
      userRoleList: [],
      // 员工账号type0 代理人账号type1
      type: 1,
      // 街道数据
      townData: []
    }
  },
  watch: {
    userRoleList: {
      handler(val, oldVal) {
        // console.log(val,oldVal)
        this.updateQXDetail(val)
      }
    }
  },
  created() {
    this.getDepartment()
    this.getCityData()
    this.type = this.$route.query.type
    this.form.type = this.$route.query.type
    // 在数组中找到符合条件的并返回
    // function(val){
    //   var obj = {};
    //   obj = arr.find(function(item){
    //     return item.whsCode === val
    //   });
    //   //obj 就是被选中的那个对象，
    //   console.log(obj.whsAddress)//label值
    // }
    // this.$axios.get('/pcas-code.json').then(res => {
    //   if (res.data) {
    //     console.log('11')
    //     this.allStreetData = res.data
    //     this.loading = false
    //   }
    // })
  },
  mounted() {
    this.getRolesList()
    this.getResourceData()
    // this._getTownJson()
  },
  methods: {
    // 权限明细相关
    updateQXDetail(val) {
      // console.log('666',val)
      // 每次权限勾选有变化时，权限明细勾选都置为空
      // for循环置空，可考虑深拷贝
      for (var j = 0; j < this.tableData.length; j++) {
        var currentTableItem = this.tableData[j]
        for (var g = 0; g < currentTableItem.resourcePermission.length; g++) {
          var currentPerItem = currentTableItem.resourcePermission[g]
          currentPerItem.checked = false
        }
      }
      // 权限明细展示选中的回填
      // 根据选中的角色权限id获取其有的userClaims
      if (val.length) {
        var userClaims = []
        var newUserClaims = []
        // 查询所有角色权限明细
        var filters = val.map(item => {
          return {
            'filterLogic': 1,
            'key': 'Id',
            'value': item.split('&&')[0]
          }
        })
        rolesSearch({
          'numberPerPage': 100,
          'currentPage': 1,
          'sortList': [
            {
              'columnName': 'CreatedUTC',
              'sortOrder': 1
            }
          ],
          'filters': filters
        }).then(res => {
          if (res) {
            // this.RolesList = res.data
            for (var i = 0; i < res.data.length; i++) {
              var currentItem = res.data[i]
              for (var j = 0; j < currentItem.roleClaims.length; j++) {
                var currentRoleClaims = currentItem.roleClaims[j]
                userClaims.push({
                  'claimType': currentRoleClaims.claimType,
                  'claimValue': currentRoleClaims.claimValue
                })
              }
            }
            // 如果选了不同的角色，权限明细可能会有重复，去重
            $.each(userClaims, function(i, v) {
              var flag = true
              if (newUserClaims.length > 0) {
                $.each(newUserClaims, function(n, m) {
                  if (newUserClaims[n].claimType == userClaims[i].claimType && newUserClaims[n].claimValue == userClaims[i].claimValue) { flag = false }
                })
              }
              if (flag) {
                newUserClaims.push(userClaims[i])
              }
            })
            // console.log(userClaims,newUserClaims)
            // 获取到userClaims之后，进行与全部的比较回填操作
            // this.roleClaims = res.roleClaims
            this.$nextTick(() => {
              for (var i = 0; i < newUserClaims.length; i++) {
                var currentClaims = newUserClaims[i]
                for (var j = 0; j < this.tableData.length; j++) {
                  var currentTableItem = this.tableData[j]
                  if (currentTableItem.name == currentClaims.claimType) {
                    for (var g = 0; g < currentTableItem.resourcePermission.length; g++) {
                      var currentPerItem = currentTableItem.resourcePermission[g]
                      if (currentPerItem.name == currentClaims.claimValue) {
                        currentPerItem.checked = true
                        currentPerItem.id = currentClaims.id
                      }
                    }
                  }
                }
              }
            })
          } else {
            // this.$message.warning('获取角色数据失败')
          }
        })
      }
    },
    // 权限明细展示
    forTree(treeList) {
      // 递归遍历树形结构
      for (var i = 0; i < treeList.length; i++) { // 循环遍历树
        treeList[i].checked = false
        if (treeList[i].resourcePermission) {
          // 如果遍历树结构还有下一级-做操作
          this.forTree(treeList[i].resourcePermission)
        } else {
          // 如果没有下一级做相应操作
          // return i.checked = false;
        }
      }
      return treeList
    },
    getResourceData() {
      resourcesSearch({
        'numberPerPage': 100,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 0
          }
        ]
      }).then(res => {
        if (res) {
          var treeList = res.data
          var data = this.forTree(treeList)
          // 深拷贝与浅拷贝问题，此处需要深拷贝
          //   console.log(data)
          this.tableData = data
        } else {
          this.$message({
            type: 'warning',
            message: '请求权限数据失败'
          })
        }
      })
    },
    // 获取街道
    _getTownJson() {
      // const data=require('@/assets/data/pca-code.json')
      this.$axios.get(`${process.env.BASE_URL}data/town.json`).then(res => {
        this.townData = res.data
      })
    },
    handleCityChange(val, i) {
      var val = val.split('&')[0]
      var province = val.substring(0, 2)
      var city = val.substring(2, 4)
      var area = val.substring(4, 6)
      // console.log(val,val.substring(0,2),val.substring(2,4),val.substring(4,6))
      var targetData = []
      this.townData.map((item, i) => {
        if (area) {
          if (item.province == province && item.city == city && item.area == area) {
            targetData.push(item)
          }
        } else {
          if (item.province == province && item.city == city) {
            targetData.push(item)
          }
        }
      })
      var currentCityData = this.form.cityList[i]
      currentCityData.streets = targetData
      // console.log('结果',this.form.cityList[i],targetData)
    },
    handleCheckAllChange(val, i) {
      this.form.cityList[i].checkedStreets = val ? this.form.cityList[i].streets.map(item => { return item.code + '&' + item.name }) : []
      this.form.cityList[i].isIndeterminate = false
    },
    handleCheckedCitiesChange(value, i) {
      const checkedCount = value.length
      this.form.cityList[i].checkAll = checkedCount === this.form.cityList[i].streets.length
      this.form.cityList[i].isIndeterminate = checkedCount > 0 && checkedCount < this.form.cityList[i].streets.length
    },
    getRolesList() {
      rolesSearch({
        'numberPerPage': 100,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'CreatedUTC',
            'sortOrder': 1
          }
        ]
      }).then(res => {
        if (res) {
          this.RolesList = res.data
        } else {
          this.$message.warning('获取角色数据失败')
        }
      })
    },
    loadmore() {
      // console.log('loadmore!')
      this.DepListCrrentPage++
      // console.log('currentPage=' + this.policyInfo.currentPage)
      this.getDepartment()
    },
    getCityData() {
      searchCity({ 'numberPerPage': 999999, 'currentPage': 1, 'filters': [{ 'filterLogic': 1, 'key': 'CityLevel', 'value': '1' }, { 'filterLogic': 1, 'key': 'CityLevel', 'value': '2' }] }).then(res => {
        if (res) {
          const map1 = res.data.map(item => {
            return {
              // value: item.cityCode + '&' + item.name,
              value: item.cityCode,
              label: item.name
            }
          })
          this.allCityList = map1
        //   this.serve_cityAll = res.data
        }
      })
    },
    getDepartment() {
      searchDepartment({ 'numberPerPage': 10, 'currentPage': this.DepListCrrentPage, 'sortList': [{ 'columnName': 'Id', 'sortOrder': 1 }] }).then(res => {
        if (res) {
          var dataList = res.data.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.$nextTick(function() {
            this.allDepartmentList = this.allDepartmentList.concat(dataList)
          })
        } else {
          this.$message.warning('获取部门数据失败')
        }
      })
    },
    // 添加负责地区范围
    addCity() {
      // this.items.push({
      //   overallType: '3',
      //   regionProvince: '',
      //   regionCity: '',
      //   regionDistrict: '',
      //   regionStreet: '',
      //   province: '北京市',
      //   city: [],
      //   district: '',
      //   street: ''
      // })
      this.form.cityList.push({
        cityCodes: [],
        streetCodes: [],
        checkAll: false,
        checkedStreets: [],
        streets: [],
        isIndeterminate: true
      })
    },
    // 删除所负责的区域
    deleteArea(val) {
      this.items.splice(val, 1)
    },

    onSubmit: Debounce(function() {
      console.log('666', this.items, this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          var obj = {
            'accountType': 0,
            'email': this.form.email,
            'password': this.form.password,
            'phoneNumber': this.form.phoneNumber,
            'departmentId': this.form.departmentId,
            // 'departmentId': '08d73bde-d3e5-e6a9-78ce-0d65a79ee01f',
            // 'departmentName': '无法删除测试部门',
            'isDepartmentAdmin': this.form.isDepartmentAdmin,
            'useEmailAsUsername': this.form.useEmailAsUsername,
            'userProfile': {
              'type': this.form.type,
              'firstName': this.form.firstName,
              'lastName': this.form.lastName,
              'position': this.form.position,
              'weChat': this.form.weChat,
              'qq': this.form.qq,
              'status': this.form.status,
              'agentNumber': this.form.agentNumber,
              'insuranceCompanyId': this.form.insuranceCompanyId,
              'insuranceCompanyName': this.form.insuranceCompanyName,
              'openingBankId': this.form.openingBankId,
              'openingBank': this.form.openingBank,
              'bankCardNumber': this.form.bankCardNumber,
              'level': '',
              'cityCodes': this.form.cityCodes,
              //   'cityCodes': this.form.cityCodes.map(item=>{
              //       return {
              //         cityCodes:item.split('&')[0],
              //         name:item.split('&')[1]
              //       }
              //   }),
              'id': ''
            },
            'id': ''
          }
          employeeAdd(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              // 添加成功之后获取返回来的userId，新增账号权限
              if (this.userRoleList.length) {
                // 账号权限相关修改
                // 账号权限添加相关
                var userId = res.id
                // console.log(userId)
                var userRoles = []
                var userClaims = []
                var newUserClaims = []
                userRoles = this.userRoleList.map(item => {
                  return {
                    userId: userId,
                    roleId: item.split('&&')[0]
                  }
                })
                // 查询所有角色权限明细
                var filters = this.userRoleList.map(item => {
                  return {
                    'filterLogic': 1,
                    'key': 'Id',
                    'value': item.split('&&')[0]
                  }
                })
                rolesSearch({
                  'numberPerPage': 100,
                  'currentPage': 1,
                  'sortList': [
                    {
                      'columnName': 'CreatedUTC',
                      'sortOrder': 1
                    }
                  ],
                  'filters': filters
                }).then(res => {
                  if (res) {
                    // this.RolesList = res.data
                    for (var i = 0; i < res.data.length; i++) {
                      var currentItem = res.data[i]
                      for (var j = 0; j < currentItem.roleClaims.length; j++) {
                        var currentRoleClaims = currentItem.roleClaims[j]
                        userClaims.push({
                          'userId': userId,
                          'claimType': currentRoleClaims.claimType,
                          'claimValue': currentRoleClaims.claimValue
                        })
                      }
                    }
                    // 如果选了不同的角色，权限明细可能会有重复，去重
                    $.each(userClaims, function(i, v) {
                      var flag = true
                      if (newUserClaims.length > 0) {
                        $.each(newUserClaims, function(n, m) {
                          if (newUserClaims[n].claimType == userClaims[i].claimType && newUserClaims[n].claimValue == userClaims[i].claimValue) { flag = false }
                        })
                      }
                      if (flag) {
                        newUserClaims.push(userClaims[i])
                      }
                    })
                    // console.log(userRoles,userClaims,newUserClaims)
                    var userRoleObj = {
                      'userId': userId,
                      'userRoles': userRoles,
                      'userClaims': newUserClaims
                    }
                    // console.log(userRoleObj)
                    // 账号权限修改
                    // setTimeout(()=>{
                    console.log(userRoleObj)
                    // 账号权限修改
                    userrolesCreate(userRoleObj).then(res => {
                      if (res) {
                        this.$message({
                          type: 'success',
                          message: '账号权限创建成功'
                        })
                        // this.$router.push({ path: `/account/staff_mng` })
                      } else {
                        this.$message.warning('账号权限创建失败')
                        // console.log('88888',res.response.data.error)
                      }
                    })
                    // },1000)
                  } else {
                    // this.$message.warning('获取角色数据失败')
                  }
                })
              }
              this.$router.push({ path: `/account/staff_mng` })
            } else {
              this.$message.warning('添加失败')
              // console.log('88888',res.response.data.error)
            }
          })
        } else {
          this.$message.warning('请正确填写表单')
          return false
        }
      })
    }, 500),
    cancel() {
      this.$router.push({ path: '/account/staff_mng', query: { tab: 'first' }})
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  font-size: 16px;
  color: #666666;
  font-weight: 400;
  font-style: normal;
}
</style>
<style lang="scss">
#staffMng #rolePermission .el-tabs__content{
  height: 96%;
}
#staffMng #rolePermission .el-select .el-input {
  width: 100%;
}
#staffMng #rolePermission .el-form-item__content .el-input__inner{
  width: 100%;
}
#staffMng #rolePermission .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#rolePermission .el-table__header-wrapper{
  display: none;
}
#rolePermission .el-select{
  width: 100%;
}
#rolePermission #zhqx .el-form-item__label,#zhqx1 .el-form-item__label{
  margin: 20px 0px;
  font-size: 20px;
  color:rgb(62, 141, 255);
}
#rolePermission #zhqx .el-form-item,#zhqx1 .el-form-item{
  margin-bottom: 0px;
}
#rolePermission #myRolePre{
  .el-table td, .el-table th{
    padding:0px;
  }
}
</style>
