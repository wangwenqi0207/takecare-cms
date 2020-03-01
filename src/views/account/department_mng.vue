//部门设置
<template>
  <div id="departmentMng" class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;">
    <div style="height:100%">
      <el-button v-if="resourcePermission['新增']" type="primary" style="float:right;margin-right:50px" size="medium" @click="addDepartment">新增部门</el-button>
      <el-scrollbar style="height:100%;width:50%">
        <div class="custom-tree-container">
          <el-tree
            icon-class="iconfont icon-folder-add"
            type="primary"
            :data="treeData2"
            node-key="id"
            :expand-on-click-node="false"
            :default-expand-all="false"
            accordion
            @node-click="_nodeClick"
          >
            <span slot-scope="{ node, data }" :class="[{isAtTop:data.isAtTop},custom_tree_node]">
              <span>{{ node.label }}</span>
              <span>
                <!-- <el-button
                  v-if="node.level!=2"
                  type="text"
                  size="medium"
                  icon="el-icon-plus"
                  style="color:gray;"
                  disabled
                >
                  新增子部门
                </el-button>
                <el-button
                  v-else
                  type="text"
                  size="medium"
                  icon="el-icon-plus"
                  @click="() => addChildDepartment(data)"
                >
                  新增子部门
                </el-button> -->
                <el-button
                  type="text"
                  size="medium"
                  icon="el-icon-plus"
                  @click="() => addChildDepartment(data)"
                >
                  新增子部门
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  icon="el-icon-edit-outline"
                  @click="() => updateDepart(data)"
                >
                  修改
                </el-button>
                <el-button
                  v-if="!data.isAtTop"
                  type="text"
                  size="medium"
                  icon="el-icon-top"
                  @click="() => topDepart(node,data)"
                >
                  置顶
                </el-button>
                <el-button
                  v-if="data.isAtTop"
                  type="text"
                  size="medium"
                  icon="el-icon-arrow-down"
                  @click="() => cancleTopDepart(node,data)"
                >
                  取消置顶
                </el-button>
                <el-button
                  v-if="(node.level==1 && data.children && data.children.length>0)|| (node.level==2 && data.children && data.children.length>0)"
                  disabled
                  type="text"
                  size="medium"
                  icon="el-icon-delete"
                  style="color:gray;"
                >
                  删除
                </el-button>
                <el-button
                  v-else
                  type="text"
                  size="medium"
                  icon="el-icon-delete"
                  @click="() => removeDepart(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-scrollbar>
      <!-- </div> -->
    </div>

    <el-dialog title="新增部门" :visible.sync="dialogFormVisible" width="600px" :before-close="(done)=>dialogClose(0,done)">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="form.name" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <!-- <el-form-item label="上级部门" :label-width="formLabelWidth" required>
          <el-select v-model="form.region" style="width:80%;" disabled>
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增子部门" :visible.sync="dialogFormVisible1" width="600px" :before-close="(done)=>dialogClose(1,done)">
      <el-form ref="form1" :model="form1" :rules="rules1">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="form1.name" autocomplete="off" style="width:80%;" />
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth" required>
          <el-input v-model.trim="form1.parentName" autocomplete="off" style="width:80%;" disabled />
          <el-input v-model.trim="form1.parentId" autocomplete="off" style="width:80%;display:none;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit1">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改部门名称" :visible.sync="dialogFormVisible2" width="600px" :before-close="(done)=>dialogClose(2,done)">
      <el-form ref="form2" :model="form2" :rules="rules2">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name2">
          <el-input v-model.trim="form2.name2" autocomplete="off" style="width:80%;" />
          <el-input v-model.trim="form2.nameId" autocomplete="off" style="width:80%;display:none;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button size="medium" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="onSubmit2">提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { addDepartment, updateDepartment, searchDepartment, oneDepartment, deleteDepartment, departmentToTop, departmentCancleTop } from '@/api/department.js'
import { Debounce } from '@/utils/public'
import permissionData from '@/utils/resPermission'
const id = 1000
var data1 = [
  { id: 1, cityCode: 1, name: '广东', level: 0, parentId: 0, isAtTop: true },
  { id: 2, cityCode: 2, name: '广州', level: 1, parentId: 1, isAtTop: false },
  { id: 3, cityCode: 3, name: '天河', level: 2, parentId: 2, isAtTop: false },
  { id: 4, cityCode: 4, name: '白云', level: 2, parentId: 2, isAtTop: false },
  { id: 5, cityCode: 5, name: '广西', level: 0, parentId: 0, isAtTop: false },
  { id: 6, cityCode: 6, name: '玉林', level: 1, parentId: 5, isAtTop: false },
  { id: 7, cityCode: 7, name: '北流', level: 2, parentId: 6, isAtTop: false },
  { id: 8, cityCode: 8, name: '深圳', level: 1, parentId: 1, isAtTop: false },
  { id: 9, cityCode: 9, name: '东莞', level: 1, parentId: 1, isAtTop: false },
  { id: 10, cityCode: 10, name: '松山湖', level: 2, parentId: 9, isAtTop: false }
]
export default {
  data() {
    return {
      // dataList: data1,
      custom_tree_node: 'custom-tree-node',
      dataList: [],
      searchData: {
        'numberPerPage': 20,
        'currentPage': 1,
        'sortList': [
          {
            'columnName': 'Id',
            'sortOrder': 0
          }
        ],
        'filters': [
          // {
          //   "filterLogic": 0,
          //   "key": "Id",
          //   "filterType": 0,
          //   "value": "5a964c49-1bb9-4713-a073-3be3d0cc37fe"
          // }
        ]
      },
      // data1: [{
      //   id: 1,
      //   label: '一级 1',
      //   children: [{
      //     id: 4,
      //     label: '二级 1-1',
      //     children: [{
      //       id: 9,
      //       label: '三级 1-1-1'
      //     }, {
      //       id: 10,
      //       label: '三级 1-1-2'
      //     }]
      //   }]
      // }, {
      //   id: 2,
      //   label: '一级 2',
      //   children: [{
      //     id: 5,
      //     label: '二级 2-1'
      //   }, {
      //     id: 6,
      //     label: '二级 2-2'
      //   }]
      // }, {
      //   id: 3,
      //   label: '一级 3',
      //   children: [{
      //     id: 7,
      //     label: '二级 3-1'
      //   }, {
      //     id: 8,
      //     label: '二级 3-2'
      //   }]
      // }],
      dialogFormVisible: false,
      form: {
        name: '',
        region: ''
      },
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
        // region: [{ required: true, message: '请选择上级部门', trigger: 'change' }
        // ]
      },
      formLabelWidth: '120px',
      // 新增子部门
      dialogFormVisible1: false,
      form1: {
        name: '',
        parentName: '',
        parentId: ''
      },
      rules1: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
        // region: [{ required: true, message: '请选择上级部门', trigger: 'change' }
        // ]
      },
      // 修改部门名称
      dialogFormVisible2: false,
      form2: {
        name2: '',
        nameId: ''
      },
      rules2: {
        name2: [{ required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
        // region: [{ required: true, message: '请选择上级部门', trigger: 'change' }
        // ]
      },
      // 权限相关
      resourcePermission: []
    }
  },
  computed: {
    treeData2() {
      // let data=this.convertToTreeData(data1,null)
      const data = this.convertToTreeData(this.dataList, null)
      // console.log(data)
      // console.log(this.toTOPMethod(JSON.parse(JSON.stringify(data))))
      return this.toTOPMethod(JSON.parse(JSON.stringify(data)))
    }
  },
  created() {
    this._searchDepartment()
  },
  mounted() {
    this.resourcePermission = permissionData('部门设置')
  },
  methods: {
    convertToTreeData(data, parentId) {
      const result = []
      let temp = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === parentId) {
          const obj = { 'label': data[i].name, 'id': data[i].id, 'parentId': data[i].parentId, 'level': data[i].level, 'isAtTop': data[i].isAtTop }
          temp = this.convertToTreeData(data, data[i].id)
          if (temp.length > 0) {
            obj.children = temp
          }
          result.push(obj)
        }
      }
      return result
    },
    toTOPMethod(data) {
      let temp = []
      const result = []
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].isAtTop) {
          result.unshift(data[i])
        } else {
          result.push(data[i])
        }
        if (data[i].children) {
          temp = this.toTOPMethod(data[i].children)
          data[i].children = temp
        }
      }
      return result
    },
    //  toTOPMethod1(data) {
    //   // console.log(data)
    //   let temp = []
    //   for (var i = 0, len = data.length; i < len; i++) {
    //     if (data[i].isAtTop) {
    //       temp = data[0]
    //       data[0] = data[i]
    //       data[i] = temp
    //     }
    //     if (data[i].children) {
    //       this.toTOPMethod1(data[i].children)
    //     }
    //   }
    //   return data
    // },
    addDepartment() {
      this.dialogFormVisible = true
      this.form.name = ''
      this.$nextTick(() => {
        this.clearFormValidate('form')
      })
    },
    addChildDepartment(data) {
      this.dialogFormVisible1 = true
      this.form1.name = ''
      this.form1.parentName = data.label
      this.form1.parentId = data.id
      this.form1.level = data.level
      this.$nextTick(() => {
        this.clearFormValidate('form1')
      })
    },
    updateDepart(data) {
      this.dialogFormVisible2 = true
      this.form2.name2 = data.label
      this.form2.nameId = data.id
    },
    topDepart(node, data) {
      this.$message({
        message: '置顶成功',
        type: 'success'
      })
      const obj = {}
      obj.name = data.label
      obj.id = data.id
      obj.isAtTop = true
      departmentToTop(data.id).then(res => {
        if (res) {
          this._searchDepartment()
        }
      })
    },
    cancleTopDepart(node, data) {
      this.$message({
        message: '取消置顶成功',
        type: 'success'
      })
      const obj = {}
      obj.name = data.label
      obj.id = data.id
      obj.isAtTop = true

      const obj2 = {}
      obj2.input = []
      obj2.input.push(data.id)
      departmentCancleTop(obj2).then(res => {
        if (res) {
          this._searchDepartment()
        }
      })
    },
    removeDepart(node, data) {
      this.$confirm(`是否要删除----${data.label}-----数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteDepartment(data.id, data.label)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onSubmit: Debounce(function() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$message.success('提交~')
          const obj = {}
          obj.name = this.form.name
          obj.parentId = null
          obj.level = '0'
          addDepartment(obj).then(res => {
            this._searchDepartment()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, 500),
    onSubmit1: Debounce(function() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.dialogFormVisible1 = false
          const obj = {}
          obj.name = this.form1.name
          obj.level = Number(this.form1.level) + 1
          obj.parentId = this.form1.parentId
          addDepartment(obj).then(res => {
            this._searchDepartment()
            this.$message.success(`新增---${obj.name}`)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, 500),
    onSubmit2: Debounce(function() {
      this.$refs.form2.validate((valid) => {
        if (valid) {
          this.dialogFormVisible2 = false
          this.$message.success(`修改---${this.form2.name2}`)
          const obj = {}
          obj.name = this.form2.name2
          obj.id = this.form2.nameId
          updateDepartment(obj).then(res => {
            if (res) {
              this._searchDepartment()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, 500),
    _searchDepartment() {
      searchDepartment(this.searchData).then(res => {
        this.dataList = res.data
      })
    },
    _deleteDepartment(id, label) {
      deleteDepartment(id).then(res => {
        if (res === true) {
          this.$message.success(`删除成功---${label}`)
          this._searchDepartment()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    _nodeClick(data, node, self) {
      // console.log(data)
      // console.log(node)
      // console.log(self)
      // console.log(event)
    },
    dialogClose(val, region) {
      switch (val) {
        case 0:
          this.dialogFormVisible = false
          break
        case 1:
          this.dialogFormVisible1 = false
          break
        case 2:
          this.dialogFormVisible2 = false
          break
      }
    },
    clearFormValidate(formName) {
      // this.$message.info('clearFormValidate!')
      this.$refs[formName].clearValidate()
    }
  }
}
</script>
<style scoped lang="scss">
  .isAtTop{
    background:rgba($color: #000000, $alpha: 0.2)
  }
</style>
<style lang="scss">
#departmentMng .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px!important;
  padding-right: 20px;
  button {
    margin-right: 13px;
  }
  .el-button--medium {
    font-size: 16px;
  }
}
#departmentMng .iconfont {
  font-size: 20px;
}
#departmentMng .el-form-item__content .el-input__inner {
  width: 100%;
}
#departmentMng .el-select .el-input{
  width: 100%;
}
#departmentMng .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
#departmentMng .el-tree-node{
  // height: 40px
  .el-button{
    padding: 0
  }
}
</style>

