<template>
  <div style="height:100%;box-sizing:border-box;">
    <div style="height:100%;padding:20px;padding-top:0px;padding-bottom:0px;">
      <el-table
        v-loading="listLoading"
        class="table_border"
        :data="list"
        border
        highlight-current-row
        height="90%"
        :style="tableStyle"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="mini"
      >
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column prop="addressee" label="收件人" />
        <el-table-column prop="addresseePhoneNumber" label="手机号" />
        <el-table-column prop="type" label="省市区">
          <template slot-scope="scope">
            <p>{{ scope.row.province+scope.row.city+scope.row.district }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="addressDetails" label="详细地址" />
        <el-table-column prop="isDefault" label="默认地址">
          <template slot-scope="scope">
            <p v-if="scope.row.isDefault">是</p>
            <p v-else>否</p>
          </template>
        </el-table-column>
        <el-table-column prop="createdUTC" label="添加时间">
          <template slot-scope="scope">
            <p v-if="scope.row.createdUTC">{{ $moment(scope.row.createdUTC+'Z').utcOffset(offset).format('YYYY-MM-DD HH:mm') }}</p>
            <p v-else>{{ scope.row.createdUTC }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="detail(scope.row)">编辑</el-button>
            <el-button type="primary" size="medium" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="地址详情" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="收件人" :label-width="formLabelWidth" prop="addressee">
          <el-input v-model="form.addressee" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="addresseePhoneNumber">
          <el-input v-model="form.addresseePhoneNumber" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="省市区" :label-width="formLabelWidth" prop="locationId">
          <el-cascader
            v-model="form.locationId"
            :options="szdOptions"
            :props="optionProps"
            separator="—"
            style="width:80%"
            @change="szdHandleChange"
          />
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" prop="addressDetails">
          <el-input v-model="form.addressDetails" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="默认地址" :label-width="formLabelWidth" prop="isDefault">
          <el-radio v-model="form.isDefault" :label="true">是</el-radio>
          <el-radio v-model="form.isDefault" :label="false">否</el-radio>
        </el-form-item>
        <!-- <el-form-item label="添加时间" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:80%;" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addressSearch, addressAdd, addressInfo, addressUpdate, addressDelete } from '@/api/auth'
import { offset } from '@/utils/offset'
export default {
  data() {
    return {
      isNative: true,
      activeName: 'first',
      list: [],
      listLoading: true,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 200,
      value: '',
      searchForm: {
        goodsName: ''
      },
      searchClass: [{
        value: '1',
        label: '单日套餐'
      }, {
        value: '2',
        label: '包月套餐'
      }, {
        value: '3',
        label: '单项服务'
      }, {
        value: '4',
        label: '月床位费'
      }, {
        value: '5',
        label: '自助餐具'
      }, {
        value: '6',
        label: '排泄设备用品'
      }, {
        value: '7',
        label: '起居（床）设备用品'
      }, {
        value: '8',
        label: '洗浴用品'
      }, {
        value: '9',
        label: '移动设备器具'
      }, {
        value: '10',
        label: '智能硬件'
      }
      ],
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
        label: '保险服务'
      }
      ],
      input3: '',
      select: '1',
      checked: true,
      multipleSelection: [],
      tableStyle: 'width:100%;',
      dialogFormVisible: false,
      form: {
        addressee: '',
        addresseePhoneNumber: '',
        addressDetails: '',
        isDefault: '',
        locationId: [],
        location: '',
        userId: '',
        id: ''
      },
      rules: {
        addressee: [
          { required: true, message: '请输入收件人', trigger: 'blur' }
        ],
        addresseePhoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确格式的手机号' }
        ],
        addressDetails: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        isDefault: [
          { required: true, message: '请选择是否为默认地址', trigger: 'change' }
        ],
        locationId: [
          { type: 'array', required: true, message: '请选择联系地址', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      filterData: {
        'numberPerPage': 10,
        'currentPage': 1,
        'filters': []
      },
      // 所在地
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'children'
      },
      szdOptions: [],
      // 时间相关
      offset: 8
    }
  },
  created() {
    this.fetchData()
    var obj = {
      'key': 'UserId',
      'value': this.$route.query.id
    }
    this.filterData.filters.push(obj)
    this._getAreaJson()
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    _getAreaJson() {
      // const data=require('@/assets/data/pca-code.json')
      this.$axios.get(`${process.env.BASE_URL}data/pca-code.json`).then(res => {
        // console.log(res)
        this.szdOptions = res.data
      })
    },
    // 获取级联选择器的label值
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.code == value) { opt = itm.children; return itm }
        }
        return null
      })
    },
    // 省市区选择
    szdHandleChange(value) {
      this.form.location = this.getCascaderObj(value, this.szdOptions)

    //   console.log(value,this.ruleForm.areaName)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = JSON.parse(JSON.stringify(this.form))
          var areaList = obj.location
          obj.provinceCode = areaList[0].code
          obj.province = areaList[0].name
          obj.cityCode = areaList[1].code
          obj.city = areaList[1].name
          obj.districtCode = areaList[2].code
          obj.district = areaList[2].name
          delete obj.location
          delete obj.locationId
          addressUpdate(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改地址成功'
              })
              this.dialogFormVisible = false
              this.fetchData()
            } else {
              this.$message({
                type: 'warning',
                message: '修改地址失败!'
              })
              this.dialogFormVisible = false
            }
          })
        } else {
          this.$message.warning('请正确填写表单')
          return false
        }
      })
    },
    addUser() {
      this.$router.push('/account/user_mng/create')
    },
    updateEmployee() {
      console.log(this.multipleSelection)
      // console.log($("input:checkbox:checked"))
      // $("input:checkbox[name=所有的checkboxname同名]:checked").each(function(){
      // 		//操作
      // 	});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.listLoading = true
      addressSearch(this.filterData).then(res => {
        if (res) {
          this.list = res.data
          this.total = res.pager.totalItems
        } else {
          this.$message({
            type: 'info',
            message: '获取数据失败'
          })
        }
      })
      this.listLoading = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.filterData.currentPage = val
      this.fetchData()
      // $('.el-pagination__total').html(`当前显示&nbsp;${(this.currentPage - 1) * 10 + 1}&nbsp;到&nbsp;${this.currentPage * 10}&nbsp;条，共&nbsp;${this.total}&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)
    },
    detail(row) {
      this.userId = row.userId
      this.currentId = row.id
      this.dialogFormVisible = true
      this.$nextTick(function() {
        var obj1 = [
          {
            code: row.provinceCode,
            name: row.province
          },
          {
            code: row.cityCode,
            name: row.city
          },
          {
            code: row.districtCode,
            name: row.district
          }
        ]
        this.form = {
          addressee: row.addressee,
          addresseePhoneNumber: row.addresseePhoneNumber,
          addressDetails: row.addressDetails,
          isDefault: row.isDefault,
          locationId: [row.provinceCode, row.cityCode, row.districtCode],
          location: obj1,
          userId: row.userId,
          id: row.id
        }
      })
    },
    remove(id) {
      this.$confirm('确定要删除该地址吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addressDelete({ id: id }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '地址删除成功!'
            })
            this.currentPage = 1
            this.filterData.currentPage = 1
            this.fetchData()
          } else {
            this.$message({
              type: 'warning',
              message: '地址删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除!'
        })
      })
    },
    // 表格连续排序
    indexMethod(index) {
      return (this.currentPage - 1) * 6 + index + 1
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;'
    }
  }
}
</script>
<style lang="scss">
#agentAccount .el-tabs__content{
  height: 96%;
}
</style>
<style lang="scss" scoped>
.el-icon-search {
  font-size: 20px;
}
.rela{
  position: relative;
}
// .el-dropdown-menu{
//   top: 190px !important;
// }
// .searchInput{
//   width: 80%;
// }
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
</style>
