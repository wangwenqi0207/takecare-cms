//城市管理
<template>
  <div id="citytMng" style="height:100%;box-sizing:border-box;">
    <div style="height:100%">
      <el-button v-if="resourcePermission['新增']" type="primary" style="float:right;" size="medium" @click="addProvince">新增省份/直辖市</el-button>
      <el-scrollbar style="height:100%;width:50%">
        <div class="custom-tree-container">
          <el-tree
            icon-class="iconfont icon-folder-add"
            :data="treeData2"
            :props="treeProps"
            node-key="id"
            :expand-on-click-node="false"
            :default-expand-all="true"
            accordion
            draggable
            :highlight-current="true"
            @node-click="_nodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <span v-if="data.cityLevel!==2">
                  <el-button
                    type="text"
                    size="medium"
                    icon="el-icon-plus"
                    @click="() => addNextCity(node, data)"
                  >新增下级城市</el-button>
                </span>
                <span v-if="!data.children">
                  <el-button
                    type="text"
                    size="medium"
                    icon="el-icon-delete"
                    @click="() => removeCity(node, data)"
                  >删除</el-button>
                </span>
              </span>
            </span>
          </el-tree>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px" :before-close="handleClose">
      <el-form ref="areaForm" :model="areaForm" :rules="rules">
        <el-row>
          <div class="audit_item">
            <el-form-item prop="region1">
              <div>
                <el-select
                  v-model="areaForm.region1"
                  placeholder="省"
                  style="width:80%;"
                  size="small"
                  clearable
                  :disabled="disabledProvince"
                  @change="changeProvince"
                  @clear="clearProvince"
                >
                  <el-option
                    v-for="(item,index) in provinces"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
                <span>省</span>
              </div>
            </el-form-item>
          </div>
          <div v-if="(areaForm.cityLevel===0||areaForm.cityLevel===1)" class="audit_item">
            <el-form-item prop="region2">
              <div>
                <el-select
                  v-model="areaForm.region2"
                  placeholder="市"
                  style="width:80%;"
                  size="small"
                  clearable
                  :disabled="disabledCity"
                  @change="changeCity"
                  @clear="clearCity"
                >
                  <el-option
                    v-for="(item,index) in cities"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
                <span>市</span>
              </div>
            </el-form-item>
          </div>
          <div v-if="areaForm.cityLevel===1" class="audit_item">
            <el-form-item prop="region3">
              <div>
                <el-select
                  v-model="areaForm.region3"
                  placeholder="县市/区"
                  style="width:70%;"
                  size="small"
                  clearable
                  :disabled="disabledDistrict"
                  @change="changeDistrict"
                >
                  <el-option
                    v-for="(item,index) in district"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
                <span>县市/区</span>
              </div>
            </el-form-item>
          </div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="cancle('areaForm')">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addCity, searchCity, deleteCity } from '@/api/city'
import { Debounce } from '@/utils/public'
import permissionData from '@/utils/resPermission'
var data1 = [
  { id: 1, cityCode: 1, name: '广东', cityLevel: 0, parentCode: 0 },
  { id: 2, cityCode: 2, name: '广州', cityLevel: 1, parentCode: 1 },
  { id: 3, cityCode: 3, name: '天河', cityLevel: 2, parentCode: 2 },
  { id: 4, cityCode: 4, name: '白云', cityLevel: 2, parentCode: 2 },
  { id: 5, cityCode: 5, name: '广西', cityLevel: 0, parentCode: 0 },
  { id: 6, cityCode: 6, name: '玉林', cityLevel: 1, parentCode: 5 },
  { id: 7, cityCode: 7, name: '北流', cityLevel: 2, parentCode: 6 },
  { id: 8, cityCode: 8, name: '深圳', cityLevel: 1, parentCode: 1 },
  { id: 9, cityCode: 9, name: '东莞', cityLevel: 1, parentCode: 1 },
  { id: 10, cityCode: 10, name: '松山湖', cityLevel: 2, parentCode: 9 }
]
const id = 1000
export default {
  'name': 'cityMng',
  data() {
    var areaValidatorLevel0 = (rule, value, callback) => {
      if (this.areaForm.cityLevel === 0) {
        callback()
      } else {
        return callback(new Error('请选择'))
      }
    }
    return {
      dialogTitle: '新增城市',
      provinces: [],
      cities: [],
      district: [],
      disabledProvince: false,
      disabledCity: false,
      disabledDistrict: false,
      treeProps: {
        label: 'label',
        children: 'children'
      },
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      dataList: data1,
      dialogFormVisible: false,
      areaForm: {
        cityLevel: '',
        region1: '',
        region2: '',
        region3: ''
      },
      areaText: {
        provinceName: '',
        cityName: '',
        districtName: ''
      },
      rules: {
        region1: [{ required: true, message: '请选择省', trigger: 'change' }],
        region2: [{ required: true, message: '请选择市', trigger: 'change' }],
        region3: [{ required: true, message: '请选择县/区', trigger: 'change' }]
      },
      formLabelWidth: '120px',
      publicPath: process.env.BASE_URL,
      // 权限相关
      resourcePermission: []
    }
  },
  computed: {
    treeData2() {
      return this.convertToTreeData(this.dataList, null)
    }
  },
  watch: {
    'areaForm.region1': function(val, oldVal) {
      if (val) {
        this.changeProvince(val, 1)
      }
    },
    'areaForm.region2': function(val, oldVal) {
      if (val) {
        this.changeCity(val)
      }
    }
  },
  created() {
    this._getAreaJson()
    var data1 = [
      { id: 1, cityCode: 1, name: '广东', cityLevel: 0, parentCode: 0 },
      { id: 2, cityCode: 2, name: '广州', cityLevel: 1, parentCode: 1 },
      { id: 3, cityCode: 3, name: '天河', cityLevel: 2, parentCode: 2 },
      { id: 4, cityCode: 4, name: '白云', cityLevel: 2, parentCode: 2 },
      { id: 5, cityCode: 5, name: '广西', cityLevel: 0, parentCode: 0 },
      { id: 6, cityCode: 6, name: '玉林', cityLevel: 1, parentCode: 5 },
      { id: 7, cityCode: 7, name: '北流', cityLevel: 2, parentCode: 6 },
      { id: 8, cityCode: 8, name: '深圳', cityLevel: 1, parentCode: 1 },
      { id: 9, cityCode: 9, name: '东莞', cityLevel: 1, parentCode: 1 },
      { id: 10, cityCode: 10, name: '松山湖', cityLevel: 2, parentCode: 9 }
    ]
    var data = [
      { id: 11, cityCode: 11, name: '北京', cityLevel: 0, parentCode: 0 },
      { id: 1101, cityCode: 1101, name: '北京-市辖区', cityLevel: 1, parentCode: 11 },
      { id: 110101, cityCode: 110101, name: '东城区', cityLevel: 2, parentCode: 1101 },
      { id: 110102, cityCode: 110102, name: '西城区', cityLevel: 2, parentCode: 1101 },
      { id: 110105, cityCode: 110105, name: '朝阳区', cityLevel: 2, parentCode: 1101 }
    ]
    this.treeData = this.convertToTreeData(data, 0)
    this._searchCity()
  },
  mounted() {
    this.resourcePermission = permissionData('城市管理')
  },
  methods: {
    _searchCity() {
      var data = {
        'numberPerPage': 100,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 1
          }
        ]
      }
      searchCity(data).then(res => {
        this.dataList = res.data
      })
    },
    _addCity(data) {
      addCity(data).then(res => {
        console.log(res)
        this._searchCity()
        this.dialogFormVisible = false
        this.$message.success(`新增成功---${res.name}`)
      }).catch(error => {
        // this.$message.error(error.response.data.error)
        if (error.response.data.error == "the CityCode's value input has existed in the database.") {
          this.$message.error('城市已存在~')
        } else {
          this.$message.error('提交出错了哦~')
        }
      })
    },
    _deleteCity(id, label) {
      deleteCity(id).then(res => {
        console.log(res)
        if (res === true) {
          this._searchCity()
          this.$message.success(`删除成功---${label}`)
        }
      }).catch(error => {
        console.log(error)
        this.$message.error(error.response.data.error)
      })
    },
    _getAreaJson() {
      // const data=require('@/assets/data/pca-code.json')
      this.$axios.get(`${process.env.BASE_URL}data/pca-code.json`).then(res => {
        // console.log(res)
        this.provinces = res.data
      })
    },
    convertToTreeData(data, parentCode) {
      const result = []
      let temp = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].parentCode === parentCode) {
          const obj = { 'label': data[i].name, 'cityCode': data[i].cityCode, 'id': data[i].id, 'parentCode': data[i].parentCode, 'cityLevel': data[i].cityLevel }
          temp = this.convertToTreeData(data, data[i].cityCode)
          if (temp.length > 0) {
            obj.children = temp
          }
          result.push(obj)
        }
      }
      return result
    },
    addProvince() {
      const that = this
      this.dialogTitle = '新增省份/直辖市'
      this.areaForm.cityLevel = ''
      this.areaForm.region1 = ''
      this.areaForm.region2 = ''
      this.areaForm.region3 = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        that.clearFormValidate('areaForm')
      })
    },
    addNextCity(node, data) {
      const that = this
      this.dialogTitle = '新增城市'
      console.log(data)
      this.areaForm.cityLevel = data.cityLevel
      if (this.areaForm.cityLevel !== 2) {
        if (this.areaForm.cityLevel === 1) {
          this.areaForm.region1 = data.parentCode
          this.areaForm.region2 = data.cityCode
          this.areaForm.region3 = ''
          this.disabledProvince = true
          this.disabledCity = true
          this.disabledDistrict = false
        }
        if (this.areaForm.cityLevel === 0) {
          this.areaForm.region1 = data.cityCode
          this.areaForm.region2 = ''
          this.areaForm.region3 = ''
          this.disabledProvince = true
          this.disabledCity = false
          this.disabledDistrict = false
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          that.clearFormValidate('areaForm')
        })
      } else {
        this.$message.warning('县区下不支持新增！')
      }
    },
    removeCity(node, data) {
      this.$confirm(`是否要删除---${data.label}---数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this._deleteCity(data.id, data.label)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    onSubmit: Debounce(function() {
      this.$refs.areaForm.validate(valid => {
        if (valid) {
          const codeObj = this.areaForm
          let data
          if (codeObj.cityLevel === '') {
            data = {
              cityLevel: 0,
              parentCode: null,
              name: this.areaText.provinceName,
              cityCode: codeObj.region1
            }
          }
          if (codeObj.cityLevel === 0) {
            data = {
              cityLevel: 1,
              parentCode: codeObj.region1,
              name: this.areaText.cityName,
              cityCode: codeObj.region2
            }
          }
          if (codeObj.cityLevel === 1) {
            data = {
              cityLevel: 2,
              parentCode: codeObj.region2,
              name: this.areaText.districtName,
              cityCode: codeObj.region3
            }
          }
          this._addCity(data)
        } else {
          this.$message.error('error submit')
          return false
        }
      })
    }, 500),
    _nodeClick(data, node, self) {
      this.areaForm.cityLevel = data.cityLevel
    },
    changeProvince(val, action) {
      if (action === 1) {
        // console.log('11')
      } else {
        this.areaForm.region2 = ''
        this.areaForm.region3 = ''
        this.cities = []
        this.district = []
      }
      if (val) {
        for (const item of this.provinces) {
          if (item.code === val && item.children) {
            this.cities = item.children
            break
          }
        }
        this.areaText.provinceName = this.getAreaTextName(val, this.provinces)
      }
    },
    changeCity(val) {
      this.areaForm.region3 = ''
      this.district = []
      if (val) {
        for (const item of this.cities) {
          if (item.code === val && item.children) {
            this.district = item.children
          }
        }
        this.areaText.cityName = this.getAreaTextName(val, this.cities)
      }
    },
    changeDistrict(val) {
      if (val) {
        this.areaText.districtName = this.getAreaTextName(val, this.district)
      }
    },
    clearProvince() {
      this.areaForm.region2 = null
      this.areaForm.region3 = null
      this.cities = []
      this.district = []
    },
    clearCity() {
      this.areaForm.region3 = null
      this.district = []
    },
    getAreaTextName(val, array) {
      let obj = {}
      obj = array.find((item) => {
        return item.code === val
      })
      console.log(obj.name)
      return obj.name
    },
    cancle(formName) {
      this.clearFormValidate(formName)
      this.dialogFormVisible = false
    },
    clearFormValidate(formName) {
      this.$refs[formName].clearValidate()
    },
    handleClose() {
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .audit_item{
    width: 33%;
    float: left;
  }
</style>
<style lang="scss">
#citytMng .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 20px;
  button {
    margin-right: 13px;
  }
  .el-button--medium {
    font-size: 16px;
  }
}
#staffMng #departmentMng .el-form-item__content .el-input__inner {
  width: 100%;
}
#staffMng #departmentMng .el-select .el-input {
  width: 100%;
}
</style>

