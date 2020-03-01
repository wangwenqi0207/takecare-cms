<template>
  <div id="rolePermission" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" label-width="120px" :model="form" :rules="rules">
            <el-row id="zhqx1">
              <el-form-item label="角色信息" />
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model.trim="form.name" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" type="textarea" style="width:100%;" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="jsqx">
              <el-form-item label="角色权限明细" />
            </el-row>
            <el-row id="myRolePre">
              <el-col :span="16" style="margin-left:3%;">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    prop="date"
                    label="日期"
                    style="padding:0px"
                  >
                    <template slot-scope="scope">
                      <div style="display:inline-block;width:28%;float:left;padding:10px;">
                        <!-- <el-checkbox v-model="scope.row.checked">{{ scope.row.name }}</el-checkbox> -->
                        <p>{{ scope.row.name }}</p>
                      </div>
                      <div style="display:inline-block;width:70%;float:left;border-left:1px solid #EBEEF5;padding:10px">
                        <el-checkbox v-for="(item,i) in scope.row.resourcePermission" :key="i" v-model="item.checked">{{ item.name }}</el-checkbox>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
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
import { rolesUpdate, rolesInfo, resourcesSearch } from '@/api/auth'
import { Debounce } from '@/utils/public'

export default {
  data() {
    return {
      form: {
        name: '',
        remark: '',
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      value: '1',
      roleClaims: [],
      tableData: [],
      checkList: []
    }
  },
  created() {
    this.getRolesInfo()
  },
  methods: {
    forTree(treeList) {
      // 递归遍历树形结构
      for (var i = 0; i < treeList.length; i++) { // 循环遍历树
        treeList[i].checked = false
        treeList[i].id = ''
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
    getRolesInfo() {
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
          //   console.log(data)
          this.tableData = data
          rolesInfo({ id: this.$route.query.id }).then(res => {
            if (res) {
              this.form = {
                name: res.name,
                remark: res.remark,
                id: res.id
              }
              this.roleClaims = res.roleClaims
              // 修改时回填操作
              this.$nextTick(() => {
                this.$refs.form.clearValidate()
                // // console.log(this.roleClaims, this.tableData)
                // // 获取当前角色所拥有的权限
                // var allCurrentList = []
                // var allCheckedList = []
                // allCheckedList = this.roleClaims.map(item=>{
                //   return item.claimType
                // })
                // // es6数组去重
                // allCheckedList = [...new Set(allCheckedList)]
                // for(var item of this.tableData){
                //   if(allCheckedList.indexOf(item.name)!=-1){
                //     allCurrentList.push(item)
                //   }
                // }
                // this.tableData = allCurrentList
                // // console.log(allCheckedList,allCurrentList)
                // 所有角色权限列表
                for (var i = 0; i < this.roleClaims.length; i++) {
                  var currentClaims = this.roleClaims[i]
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
                // console.log(this.roleClaims,this.tableData) // 输出：修改后的值
              })
            } else {
              // this.$message({
              //   message: '数据信息请求失败',
              //   type: 'warning'
              // })
            }
            // this.$nextTick(function() {
            //   this.$refs.form.clearValidate()
            // })
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请求权限数据失败'
          })
        }
      })
    },
    onSubmit: Debounce(function() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 将选择的操作权限包装成后端需要的数据格式
          // console.log(this.tableData)
          var roleClaims = []
          for (var i = 0; i < this.tableData.length; i++) {
            var currentTabItem = this.tableData[i]
            for (var j = 0; j < currentTabItem.resourcePermission.length; j++) {
              var currentResItem = currentTabItem.resourcePermission[j]
              if (currentResItem.checked) {
                if (currentResItem.id) {
                  roleClaims.push({
                    'claimType': currentTabItem.name,
                    'claimValue': currentResItem.name,
                    'id': currentResItem.id
                  })
                } else {
                  roleClaims.push({
                    'claimType': currentTabItem.name,
                    'claimValue': currentResItem.name
                  })
                }
              }
            }
          }
          var obj = {
            'roleClaims': roleClaims,
            'name': this.form.name,
            'remark': this.form.remark,
            'id': this.form.id
          }
          rolesUpdate(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.$router.push({ path: `/account/staff_mng`, query: { tab: 'fourth' }})
            } else {
              this.$message.warning('修改失败')
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
      this.$router.push({ path: '/account/staff_mng', query: { tab: 'fourth' }})
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
#rolePermission #jsqx .el-form-item__label{
  margin: 20px 0px;
  font-size: 20px;
  color:rgb(62, 141, 255);
  width: 164px!important;
}
#rolePermission #jsqx .el-form-item{
  margin-bottom: 0px;
}
#rolePermission #myRolePre{
  .el-table td, .el-table th{
    padding:0px;
  }
}
</style>
