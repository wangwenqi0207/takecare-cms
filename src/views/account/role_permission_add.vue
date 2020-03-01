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
import { rolesAdd, permissionsSearch, resourcesSearch } from '@/api/auth'
import { Debounce } from '@/utils/public'

export default {
  data() {
    return {
      form: {
        name: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  mounted() {
    this.getResourceData()
  },
  methods: {
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
                roleClaims.push({
                  'claimType': currentTabItem.name,
                  'claimValue': currentResItem.name
                })
              }
            }
          }
          // console.log(roleClaims)
          var obj = {
            'roleClaims': roleClaims,
            'name': this.form.name,
            'remark': this.form.remark,
            'id': null
          }
          rolesAdd(obj).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push({ path: `/account/staff_mng`, query: { tab: 'fourth' }})
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
