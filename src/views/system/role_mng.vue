<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;box-sizing:border-box;">
    <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;box-sizing:border-box;">
      <div class="search_bar" style="margin-bottom:20px;">
        <div
          el-col
          span="24"
          class="top"
        >
          <el-input
            v-model.trim="searchValue"
            placeholder="请输入角色名称"
            style="width: auto"
            size="medium"
            clearable
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            size="medium"
            @click="search"
          >搜索</el-button>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click.native="add"
          >新增</el-button>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-edit"
            @click.native="update"
          >修改</el-button>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-delete"
            @click.native="remove"
          >删除</el-button>
          <div class="grid-content bg-purple-dark" />
        </div>
      </div>
      <div class="tableList" style="height:83.5%">
        <el-table
          :data="datalists"
          border
          stripe
          style="width: 100%;text-align:left;overflow:auto;"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <!-- <el-table-column
            type="index"
            :index="indexMethod"
            width="50"
          /> -->
          <el-table-column
            prop="roleId"
            label="角色ID"
            width="100"
          />
          <el-table-column
            prop="name"
            label="角色名称"
            width="300"
          />
          <el-table-column
            prop="orgName"
            label="所属公司"
            width="300"
          />
          <el-table-column
            prop="status"
            label="角色状态"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">
                有效
              </span>
              <span v-else-if="scope.row.status==0">
                无效
              </span>
              <span v-else>
                {{ scope.row.status }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="180"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
          />

        </el-table>
      </div>
      <div class="pageNation" style="margin-top:20px;">
        <!-- <el-pagination
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
        <el-pagination
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 模态框 -->

      <el-dialog
        id="add"
        title="新增角色"
        :visible.sync="dialogVisible"
        width="700px"
        :before-close="handleClose"
        class="model"
      >
        <div style="height:600px;overflow:auto">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="编辑内容"
              style="margin-bottom:0px;line-height:14px"
            />
            <hr>
            <el-form-item
              label="id"
              prop="id"
              hidden="true"
            >
              <el-input v-model="ruleForm.id" />
            </el-form-item>
            <el-form-item
              label="角色名称"
              prop="name"
            >
              <el-input v-model="ruleForm.name" />
            </el-form-item>

            <el-form-item
              label="所属公司"
              prop="company"
            >
              <el-select
                v-model="ruleForm.company"
                placeholder="请选择角色所属公司"
                style="width:100%;"
              >
                <el-option
                  v-for="(item,index) in orgNameList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                >
                  {{ item.orgName }}
                  <!-- <span hidden >{{item.orgId}}</span> -->
                </el-option>
                <!-- <el-option value="总公司">总公司</el-option>
              <el-option value="分公司">分公司</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item
              label="状态"
              prop="state"
            >
              <el-radio-group v-model="radio2">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">无效（相当于逻辑删除）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="备注"
              prop="notice"
            >
              <el-input v-model="ruleForm.notice" />
            </el-form-item>
            <el-form-item
              label="编辑权限"
              style="margin-bottom:0px"
            />
            <hr>
            <div style="position:relative;height:300px;overflow:hidden;">
              <div style="width:45%;float:left;border:1px solid #dcdfe6;height:95%;overflow:auto;">
                <el-tree
                  id="qxtree"
                  ref="tree1"
                  :data="treeData"
                  show-checkbox
                  node-key="menuId"
                  :props="defaultProps"
                  :default-checked-keys="menuIdList"
                  @check-change="getChecked"
                />
              </div>
              <div
                style="width:53%;float:right;border:1px solid #dcdfe6;height:95%;overflow:auto;text-align:left;"
                class="qxMng"
              />
            </div>
            <el-form-item>
              <el-button
                type="primary"
                size="medium"
                @click="submitForm('ruleForm')"
              >提交</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
            hidden
          >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogVisible = false"
            >确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import base from "../../base/base.js";
import { roleEdit, corpList, rolePage, roleMenuOpts, roleIsExist, roleRemove, loadAllExtraNames } from '@/api/menu_role'
import Vue from 'vue'
export default {
  // mixins: [base],
  // inject: ["reload"],
  data() {
    // 行内自定义校验
    var validatePass = (rule, value, callback) => {
      // console.log('11',this.ruleForm.name)
      value = value.trim()
      if (this.oldName && value == this.oldName) {
        callback()
      } else if (value == null || value == '') {
        callback(new Error('角色名称必填！'))
      } else {
        const data = {
          'name': value
        }
        roleIsExist(data).then(res => {
          if (res.data) {
            callback(new Error('该角色名称已经存在，请更换角色名称！'))
          } else {
            callback()
          }
        })
        // this.$axios({
        //   method: 'get',
        //   url: `${this.$store.state.globalRouter}/auth/system/role/isExist`,
        //   headers: {
        //     'Content-type': 'application/json;charset=UTF-8'
        //   },
        //   params: data
        // }).then(res => {
        //   if (res.data.data) {
        //     callback()
        //   } else {
        //     callback(new Error('该角色名称已经存在，请更换角色名称！'))
        //   }
        // })
      }
    }
    return {
      // 分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      // 表单相关
      dialogVisible: false,
      ruleForm: {
        name: '',
        company: '',
        state: '',
        notice: '',
        id: 0
      },
      oldName: null,
      rules: {
        // name   : [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        name: [{ required: true, validator: validatePass, trigger: 'blur' }],
        company: [
          { required: true, message: '请选择角色所属公司', trigger: 'change' }
        ]
        // state: [
        //   { required: true, message: "请选择角色当前状态", trigger: "change" }
        // ]
      },
      // 列表相关
      datalists: [],

      // 树相关
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      addqx: [],
      updateqx: [],
      delqx: [],
      shenheqx: [],
      // 修改表单填的数据
      updateData2: [],
      radio2: '',
      dataQx: null,
      dataQx1: null,
      data2: null,

      // 修改或者添加时的所属公司
      orgNameList: [],
      menuIdList: [],
      menuIdList1: [],
      count: 0,

      qxMenuList: [],

      // 搜索
      searchValue: '',

      //   扩展权限
      extraList: [],
      menuExtraMaps: {},
      extraQx: [],
      extraMenuID: []

    }
  },
  mounted() {
    // this.$axios({
    //   url: `${this.$store.state.globalRouter}/auth/system/role/pagination`,
    //   method: 'post',
    //   data: {
    //     name: '',
    //     pageSize: this.pageSize[0],
    //     pageNo: this.currentPage
    //   }
    // }).then(res => {
    //   if (res.data.resultCode == '100005') {
    //     this.$router.push({ path: '/' })
    //   } else {
    //     this.total = res.data.totalCount
    //     this.currentPage = res.data.curPage
    //     this.dataList(res.data.resultList)
    //   }
    // })

    // // //获取添加时的所有权限列表（树形）
    // // this.treeData = this.$store.state.getRouter;

    this.getData()
    corpList({ orgLevel: 1 }).then(res => {
      if (res.data) {
        for (var item of res.data) {
          this.orgNameList.push(item)
        }
      }
    })
    corpList({ orgLevel: 2 }).then(res => {
      if (res.data) {
        for (var item of res.data) {
          this.orgNameList.push(item)
        }
      }
    })
    corpList({ orgLevel: 3 }).then(res => {
      if (res.data) {
        for (var item of res.data) {
          this.orgNameList.push(item)
        }
      }
    })
    corpList({ orgLevel: 4 }).then(res => {
      if (res.data) {
        for (var item of res.data) {
          this.orgNameList.push(item)
        }
      }
    })
    // // 添加或者修改时所属公司选项
    // this.$axios({
    //   url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=1`,
    //   method: 'get'
    // }).then(res => {
    //   if (res.data.data) {
    //     for (var item of res.data.data) {
    //       this.orgNameList.push(item)
    //     }
    //   }
    // })
    // this.$axios({
    //   url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=2`,
    //   method: 'get'
    // }).then(res => {
    //   if (res.data.data) {
    //     for (var item of res.data.data) {
    //       this.orgNameList.push(item)
    //     }
    //   }
    // })
    // this.$axios({
    //   url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=3`,
    //   method: 'get'
    // }).then(res => {
    //   if (res.data.data) {
    //     for (var item of res.data.data) {
    //       this.orgNameList.push(item)
    //     }
    //   }
    // })
    // this.$axios({
    //   url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=4`,
    //   method: 'get'
    // }).then(res => {
    //   for (var item of res.data.data) {
    //     this.orgNameList.push(item)
    //   }
    // })
    loadAllExtraNames().then(res => {
      if (res.data) {
        this.extraList = res.data
        var extraList = res.data
        if (extraList != null && extraList) {
          for (var op = 0; op < extraList.length; op++) {
            var extraObj = extraList[op]
            this.extraMenuID.push(extraObj.menuId)
            if (extraObj != null) {
              this.menuExtraMaps[extraObj.menuId] = []
              for (var pj = 1; pj <= 6; pj++) {
                var actionName = extraObj['extra' + pj + 'Name']
                if (actionName) {
                  this.menuExtraMaps[extraObj.menuId][pj - 1] = actionName
                } else {
                  break
                }
              }
            }
          }
        }
      }
    })
    // // 查询所有扩展权限
    // this.$axios({
    //   url: `${
    //     this.$store.state.globalRouter
    //   }/auth/system/role/loadAllExtraNames`,
    //   method: 'get'
    // }).then(res => {
    //   this.extraList = res.data.data
    //   var extraList = res.data.data
    //   if (extraList != null && extraList) {
    //     for (var op = 0; op < extraList.length; op++) {
    //       var extraObj = extraList[op]
    //       this.extraMenuID.push(extraObj.menuId)
    //       if (extraObj != null) {
    //         this.menuExtraMaps[extraObj.menuId] = []
    //         for (var pj = 1; pj <= 6; pj++) {
    //           var actionName = extraObj['extra' + pj + 'Name']
    //           if (actionName) {
    //             this.menuExtraMaps[extraObj.menuId][pj - 1] = actionName
    //           } else {
    //             break
    //           }
    //         }
    //       }
    //     }
    //   }
    // })
  },
  methods: {
    getData() {
      rolePage({ pageNo: this.currentPage }).then(res => {
        if (res.resultCode == '100005') {
          this.$router.push({ path: '/' })
        } else {
          this.total = res.totalCount
          this.currentPage = res.curPage
          this.dataList(res.resultList ? res.resultList : [])
        }
      })
    },
    search() {
      rolePage({ name: this.searchValue, pageNo: 1 }).then(res => {
        if (res.resultList) {
          this.total = res.totalCount
          this.currentPage = res.curPage
          const resultArray = res.resultList
          // console.log(resultArray);
          this.dataList(resultArray)
        } else if (res.resultList == null) {
          this.total = 0
          this.currentPage = 1
          this.dataList([])
        } else {
          this.$message({ type: 'warning', message: '服务出错！' })
        }
      })
      // if (this.searchValue != null && this.searchValue.length >= 1) {
      //   this.$axios({
      //     url: `${this.$store.state.globalRouter}/auth/system/role/pagination`,
      //     method: 'post',
      //     data: {
      //       pageNo: 1,
      //       pageSize: this.changePageSize,
      //       name: this.searchValue
      //     }
      //   }).then(res => {
      //     this.total = res.data.totalCount
      //     this.currentPage = res.data.curPage
      //     this.dataList(res.data.resultList)
      //   })
      // } else {
      //   this.$axios({
      //     url: `${this.$store.state.globalRouter}/auth/system/role/pagination`,
      //     method: 'post',
      //     data: {
      //       pageNo: this.currentPage,
      //       pageSize: this.changePageSize
      //     }
      //   }).then(res => {
      //     this.total = res.data.totalCount
      //     this.currentPage = res.data.curPage
      //     this.dataList(res.data.resultList)
      //   })
      // }
    },
    add() {
      this.qxdel = []
      this.qxshenhe = []
      this.qxdel = []
      this.qxadd = []
      this.dataQx1 = null
      $('.model')
        .find('.el-dialog__title')
        .html('新增角色信息')
      this.dialogVisible = true
      $('.qxMng').html('权限分配')

      var that = this
      setTimeout(function() {
        that.radio2 = 1
        that.oldName = null
        that.resetForm('ruleForm')
        that.$refs.tree1.setCheckedKeys([])
        var treeData = JSON.parse(localStorage.getItem('testRouter'))
        if (treeData && treeData.length > 0) {
          for (var i = 0; i < treeData.length; i++) {
            if (treeData[i].children) {
              var data1 = treeData[i].children
              for (var j = 0; j < treeData[i].children.length; j++) {
                if (treeData[i].children[j].children) {
                  treeData[i].children[j].children = []
                }
              }
            }
          }
        }
        that.treeData = treeData
        // console.log($("#qxtree"));
        // $('#qxtree').attr('default-checked-keys',[]);
      }, 200)
    },
    update() {
      if (this.updateData2.length != 1) {
        alert('请选择一条记录')
      } else {
        roleMenuOpts({ roleId: encodeURI(this.updateData2[0].roleId) }).then(res => {
          // 每次请求时置为空
          this.menuIdList = []
          this.menuIdList1 = []

          // 每次请求的时候把增删改查等权限列表也置为空
          this.addqx = []
          this.shenheqx = []
          this.delqx = []
          this.updateqx = []

          // this.$nextTick(function(){
          //   this.$refs.tree1.setCheckedKeys([]);
          // });

          this.qxMenuList = res.data
          if (this.qxMenuList && this.qxMenuList.length > 0) {
            for (var item of this.qxMenuList) {
              this.menuIdList.push(item.menuId)
            }
          }
          // for (var item of this.qxMenuList) {
          //   this.menuIdList.push(item.menuId)
          // }
          $('.model')
            .find('.el-dialog__title')
            .html('修改角色信息')
          this.dialogVisible = true
          var that = this
          this.$nextTick(function() {
            that.ruleForm.name = that.updateData2[0].name
            that.oldName = that.updateData2[0].name
            if (that.updateData2[0].orgName) {
              that.ruleForm.company = that.updateData2[0].orgName
            }
            if (that.updateData2[0].status == 1) {
              that.ruleForm.state = 1
              that.radio2 = 1
            } else {
              that.radio2 = 0
              that.ruleForm.state = 0
            }
            // that.ruleForm.company = that.updateData2[0].company;
            // that.ruleForm.state   = that.updateData2[0].state;
            that.ruleForm.notice = that.updateData2[0].notice
            // 判断是add还是修改
            that.ruleForm.id = 1
            // 树的数据
            // console.log('11111',that.$store.state.getRouter)
            var treeData = JSON.parse(localStorage.getItem('testRouter'))
            if (treeData && treeData.length > 0) {
              for (var i = 0; i < treeData.length; i++) {
                if (treeData[i].children) {
                  var data1 = treeData[i].children
                  for (var j = 0; j < treeData[i].children.length; j++) {
                    if (treeData[i].children[j].children) {
                      treeData[i].children[j].children = []
                    }
                  }
                }
              }
            }
            that.treeData = treeData

            that.ruleForm.company = that.updateData2[0].orgId

            that.count = 1

            $('#qxtree').attr('default-checked-keys', that.menuIdList)

            // 获取修改时加载权限列表（与权限树相对应）
            that.getChecked()
          })
        })
        // this.$axios({
        //   url:
        //     this.$store.state.globalRouter +
        //     '/auth/system/role/getRoleMenuOpts?roleId=' +
        //     encodeURI(this.updateData2[0].roleId),
        //   method: 'get'
        // }).then(res => {
        //   // 每次请求时置为空
        //   this.menuIdList = []
        //   this.menuIdList1 = []

        //   // 每次请求的时候把增删改查等权限列表也置为空
        //   this.addqx = []
        //   this.shenheqx = []
        //   this.delqx = []
        //   this.updateqx = []

        //   // this.$nextTick(function(){
        //   //   this.$refs.tree1.setCheckedKeys([]);
        //   // });

        //   this.qxMenuList = res.data.data
        //   for (var item of this.qxMenuList) {
        //     this.menuIdList.push(item.menuId)
        //   }
        //   $('.model')
        //     .find('.el-dialog__title')
        //     .html('修改角色信息')
        //   this.dialogVisible = true
        //   var that = this
        //   this.$nextTick(function() {
        //     that.ruleForm.name = that.updateData2[0].name
        //     that.oldName = that.updateData2[0].name
        //     if (that.updateData2[0].orgName) {
        //       that.ruleForm.company = that.updateData2[0].orgName
        //     }
        //     if (that.updateData2[0].status == 1) {
        //       that.ruleForm.state = 1
        //       that.radio2 = 1
        //     } else {
        //       that.radio2 = 0
        //       that.ruleForm.state = 0
        //     }
        //     // that.ruleForm.company = that.updateData2[0].company;
        //     // that.ruleForm.state   = that.updateData2[0].state;
        //     that.ruleForm.notice = that.updateData2[0].notice
        //     // 判断是add还是修改
        //     that.ruleForm.id = 1
        //     // 树的数据
        //     // console.log('11111',that.$store.state.getRouter)
        //     var treeData = JSON.parse(localStorage.getItem('testRouter'))
        //     if (treeData && treeData.length > 0) {
        //       for (var i = 0; i < treeData.length; i++) {
        //         if (treeData[i].children) {
        //           var data1 = treeData[i].children
        //           for (var j = 0; j < treeData[i].children.length; j++) {
        //             if (treeData[i].children[j].children) {
        //               treeData[i].children[j].children = []
        //             }
        //           }
        //         }
        //       }
        //     }
        //     that.treeData = treeData

        //     that.ruleForm.company = that.updateData2[0].orgId

        //     that.count = 1

        //     $('#qxtree').attr('default-checked-keys', that.menuIdList)

        //     // 获取修改时加载权限列表（与权限树相对应）
        //     that.getChecked()
        //   })
        // })
      }
    },
    remove() {
      if (this.updateData2.length != 1) {
        alert('请选择一条记录')
      } else {
        this.$confirm('是否要删除当前数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            roleRemove({ id: encodeURI(this.updateData2[0].roleId) }).then(res => {
              if (res.resultCode == '000000') {
                this.$message({ type: 'success', message: '删除成功' })
                this.currentPage = 1
                this.getData()
              } else {
                this.$message.warning(res.data.resultMsg)
              }
            })
            // var that = this
            // setTimeout(() => {
            //   that
            //     .$axios({
            //       url:
            //         that.$store.state.globalRouter +
            //         '/auth/system/role/remove?id=' +
            //         encodeURI(that.updateData2[0].roleId),
            //       method: 'get'
            //     })
            //     .then(res => {
            //       if (res.data.resultCode == '000000') {
            //         that.$message({
            //           type: 'success',
            //           message: '删除成功'
            //         })
            //         that.$options.methods.getReloadData(that)
            //       } else {
            //         this.$message.warning(res.data.resultMsg)
            //       }
            //     })
            // }, 500)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消删除'
            })
          })
      }
    },

    dataList(tableData) {
      var newdata = []
      var dataArray = tableData

      dataArray.forEach(el => {
        if (el.createTime) {
          newdata.push(
            this.$moment(el.createTime).format('YYYY-MM-DD HH:mm:ss')
          )
        }
      })

      this.transform(dataArray, newdata)
      this.datalists = dataArray
    },
    transform(old, insert) {
      old.forEach((el, index) => {
        el.createTime = insert[index]
      })
    },
    // 分页methods
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val
      // this.$options.methods.getReloadData(this)
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    // 解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.changePageSize + index + 1
    },
    handleSelectionChange(val) {
      this.updateData2 = val
      // console.log(this.updateData2);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.reload()
        })
        .catch(_ => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var checkData = this.$refs.tree1.getCheckedNodes()
          var checkData1 = this.$refs.tree1.getHalfCheckedNodes()
          // console.log(checkData1)
          // console.log("checkData", checkData);
          var checkMenuIds = []
          var crudMenuId = []

          for (var item of checkData) {
            checkMenuIds.push(item.menuId)
            if (item.parentId != 1) {
              crudMenuId.push(item.menuId)
            }
          }

          if (checkData1 && checkData1.length >= 1) {
            for (var item of checkData1) {
              checkMenuIds.push(item.menuId)
            }
          }
          // console.log(checkMenuIds)
          if (this.ruleForm.id == 1) {
            if (crudMenuId && crudMenuId.length >= 1) {
              var menuList = []
              for (let i = 0; i < crudMenuId.length; i++) {
                menuList.push({
                  id: 0,
                  orderStr: '',
                  lang: '',
                  userId: 0,
                  loginName: '',
                  requestIp: '',
                  menuId: crudMenuId[i],
                  name: '',
                  url: '',
                  parentId: 0,
                  position: 0,
                  status: 0,
                  createTime: '',
                  systemMenu: 0,
                  menuCode: '',
                  dataQuery: 1,
                  dataAdd: this.addqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataUpdate:
          this.updateqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataDelete:
          this.delqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataAudit:
          this.shenheqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataExtra1:
                    this.extraQx.indexOf('ext_1_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra2:
                    this.extraQx.indexOf('ext_2_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra3:
                    this.extraQx.indexOf('ext_3_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra4:
                    this.extraQx.indexOf('ext_4_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra5:
                    this.extraQx.indexOf('ext_5_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra6:
                    this.extraQx.indexOf('ext_6_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  subMenus: []
                })
              }
            }

            var obj = {
              checkMenuIds: checkMenuIds,
              crudMenuId: crudMenuId,
              roleId: this.updateData2[0].roleId,
              name: this.ruleForm.name,
              status: this.radio2,
              remark: this.ruleForm.notice,
              createTime: '',
              createUserId: 0,
              menus: menuList,
              menuIds: crudMenuId,
              orgName: '',
              orgId: this.ruleForm.company,
              orgLinks: ''
            }
            if (this.radio2 == '' && this.radio2 != 0) {
              this.$message({ type: 'warning', message: '状态为必选' })
              return false
            }
            if (checkMenuIds.length >= 1 && crudMenuId.length >= 1) {
            //   console.log('11')
            } else {
              this.$message({ type: 'warning', message: '角色权限必选！' })
              return false
            }
            roleEdit(obj).then(res => {
              if (res.resultCode == '000000') {
                this.$message({ type: 'success', message: '修改成功' })
                this.dialogVisible = false
                this.getData()
                // that.total = res.data.totalCount
                // that.currentPage = res.data.curPage
                // that.dataList(res.data.resultList)
              } else {
                this.$message({ type: 'error', message: '修改失败' })
                this.dialogVisible = false
                this.getData()
              }
              if (res.resultCode == '900500') {
                this.$message.error(res.resultMsg)
              }
            })
            // this.$axios({
            //   url: `${
            //     this.$store.state.globalRouter
            //   }/auth/system/role/saveOrUpdate`,
            //   method: 'post',
            //   data: obj
            // }).then(res => {
            //   if (res.data.resultCode == '000000') {
            //     this.dialogVisible = false
            //     // this.$options.methods.getReloadData(this)
            //     this.getData()
            //     alert('修改成功')
            //   }
            // })
          } else {
            if (crudMenuId && crudMenuId.length >= 1) {
              var menuList = []
              for (let i = 0; i < crudMenuId.length; i++) {
                if (this.addqx.indexOf(crudMenuId[i] + '') != -1) {
                  var add = 1
                }
                menuList.push({
                  id: 0,
                  orderStr: '',
                  lang: '',
                  userId: 0,
                  loginName: '',
                  requestIp: '',
                  menuId: crudMenuId[i],
                  name: '',
                  url: '',
                  parentId: 0,
                  position: 0,
                  status: 0,
                  createTime: '',
                  systemMenu: 0,
                  menuCode: '',
                  dataQuery: 1,
                  dataAdd: this.addqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataUpdate:
                    this.updateqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataDelete:
                    this.delqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataAudit:
                    this.shenheqx.indexOf(crudMenuId[i] + '') != -1 ? 1 : 0,
                  dataExtra1:
                    this.extraQx.indexOf('ext_1_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra2:
                    this.extraQx.indexOf('ext_2_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra3:
                    this.extraQx.indexOf('ext_3_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra4:
                    this.extraQx.indexOf('ext_4_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra5:
                    this.extraQx.indexOf('ext_5_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  dataExtra6:
                    this.extraQx.indexOf('ext_6_' + crudMenuId[i]) != -1
                      ? 1
                      : 0,
                  subMenus: []
                })
              }
            }

            // 添加时的roleId一定要为null，不能为0
            var obj = {
              checkMenuIds: checkMenuIds,
              crudMenuId: crudMenuId,
              roleId: null,
              name: this.ruleForm.name,
              status: this.radio2,
              remark: this.ruleForm.notice,
              createTime: '',
              createUserId: 0,
              menus: menuList,
              menuIds: crudMenuId,
              orgName: '',
              orgId: this.ruleForm.company,
              orgLinks: ''
            }
            if (this.radio2 == '' && this.radio2 != 0) {
              this.$message({ type: 'warning', message: '状态为必选' })
              return false
            }
            if (checkMenuIds.length >= 1 && crudMenuId.length >= 1) {
            //   console.log('11')
            } else {
              this.$message({ type: 'warning', message: '角色权限必选！' })
              return false
            }
            roleEdit(obj).then(res => {
              if (res.resultCode == '000000') {
                this.$message({ type: 'success', message: '新增成功' })
                this.dialogVisible = false
                this.getData()
                // that.total = res.data.totalCount
                // that.currentPage = res.data.curPage
                // that.dataList(res.data.resultList)
              } else {
                this.$message({ type: 'error', message: '新增失败' })
                this.dialogVisible = false
                this.getData()
              }
              if (res.resultCode == '900500') {
                this.$message.error(res.resultMsg)
              }
            })
            // this.$axios({
            //   url: `${
            //     this.$store.state.globalRouter
            //   }/auth/system/role/saveOrUpdate`,
            //   method: 'post',
            //   data: obj
            // }).then(res => {
            //   if (res.data.resultCode == '000000') {
            //     this.dialogVisible = false
            //     this.$options.methods.getReloadData(this)
            //     alert('添加成功')
            //   }
            // })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getChecked() {
      var checkData = []
      checkData = this.$refs.tree1.getCheckedNodes()

      //
      //   console.log(this.menuIdList,this.$refs.tree1.getCheckedNodes());
      var newData = []
      if (checkData.length >= 1) {
        for (var item of checkData) {
          if (item.parentId == 1) {
            //   console.log('11')
          } else {
            newData.push(item)
          }
        }
      }
      var that = this
      var data6 = ''
      //   console.log('初始时的权限列表',that.qxMenuList)

      // that.qxMenuList被选中的树形菜单
      if (that.qxMenuList.length >= 1) {
        console.log(that.qxMenuList)
        for (var item of that.qxMenuList) {
          //   添加初始化的权限
          if (item.dataAdd == 1) {
            that.addqx.push(item.menuId + '')
          }
          if (item.dataUpdate == 1) {
            that.updateqx.push(item.menuId + '')
          }
          if (item.dataDelete == 1) {
            that.delqx.push(item.menuId + '')
          }
          if (item.dataAudit == 1) {
            that.shenheqx.push(item.menuId + '')
          }

          if (item.dataExtra1 == 1) {
            that.extraQx.push('ext_1_' + item.menuId)
          }
          if (item.dataExtra2 == 1) {
            that.extraQx.push('ext_2_' + item.menuId)
          }
          if (item.dataExtra3 == 1) {
            that.extraQx.push('ext_3_' + item.menuId)
          }
          if (item.dataExtra4 == 1) {
            that.extraQx.push('ext_4_' + item.menuId)
          }
          if (item.dataExtra5 == 1) {
            that.extraQx.push('ext_5_' + item.menuId)
          }
          if (item.dataExtra6 == 1) {
            that.extraQx.push('ext_6_' + item.menuId)
          }
        }
        if (this.count == 1) {
          data6 = ``
          data6 += `<table style="width: 100%;background:#fafafa " id="menuUrlCURDTable">
                   <thead><tr><th>名称</th><th>权限<input type="checkbox" @click="checkAll(2)" id='addN'>增<input type="checkbox" @click="checkAll(3)" id='updateN'>改<input type="checkbox" @click="checkAll(4)" id='deleteN'>删<input type="checkbox" @click="checkAll(5)" id='auditN'>审 操作</th></tr></thead>`
          //    console.log(that.qxMenuList)
          for (var item of that.qxMenuList) {
            // //   添加初始化的权限
            //   if(item.dataAdd==1){
            //       that.addqx.push(item.menuId)
            //   }
            //   if(item.dataUpdate==1){
            //       that.updateqx.push(item.menuId)
            //   }
            //   if(item.dataDelete==1){
            //       that.delqx.push(item.menuId)
            //   }
            //   if(item.dataAudit==1){
            //       that.shenheqx.push(item.menuId)
            //   }

            data6 += `<tr id="curd_${
              item.menuId
            }"><td style='vertical-align:top!important;
    text-align:left!important;width:145px;' ref='qxname'>${
  item.menuName
}</td><td style='vertical-align:top!important;
    text-align:left!important;'>`
            if (item.dataQuery == 1) {
              data6 += `<input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="1" checked="checked" name="que_${
                item.menuId
              }" disabled="disabled">查`
            } else {
              data6 += `<input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="0" name="que_${
                item.menuId
              }" disabled="disabled">查`
            }
            if (item.dataAdd == 1) {
              data6 += `<input type="checkbox" value="1" name='add_${
                item.menuId
              }' class='qxadd' checked="checked" @click='qxadd'>增`
            } else {
              data6 += `<input type="checkbox" value="0" name='add_${
                item.menuId
              }' class='qxadd' @click='qxadd'>增`
            }

            if (item.dataUpdate == 1) {
              data6 += `<input type="checkbox" value="1" name="upd_${
                item.menuId
              }" class='qxupdate' checked="checked" @click='qxupdate'>改`
            } else {
              data6 += `<input type="checkbox" value="0" name="upd_${
                item.menuId
              }" class='qxupdate' @click='qxupdate'>改`
            }
            if (item.dataDelete == 1) {
              data6 += `<input type="checkbox" value="1" name="del_${
                item.menuId
              }" class='qxdel' checked="checked" @click='qxdel'>删`
            } else {
              data6 += `<input type="checkbox" value="0" name="del_${
                item.menuId
              }" class='qxdel' @click='qxdel'>删`
            }

            if (item.dataAudit == 1) {
              data6 += `<input type="checkbox" value="1" name="aud_${
                item.menuId
              }" class='qxshenhe' checked="checked" @click='qxshenhe'>审`
            } else {
              data6 += `<input type="checkbox" value="0" name="aud_${
                item.menuId
              }" class='qxshenhe' @click='qxshenhe'>审`
            }
            data6 += '<br/>'

            // 扩展权限动态判断
            if ($.inArray(item.menuId, that.extraMenuID) != -1) {
              var currentObj = null
              for (var i = 0; i < that.extraList.length; i++) {
                var itemObj = that.extraList[i]
                if (item.menuId == itemObj.menuId) {
                  currentObj = itemObj
                }
              }
              if (item.dataExtra1 == 1) {
                data6 += `<input type="checkbox" value="1" name="ext_1_${
                  item.menuId
                }" class='extra1' checked="checked" @click='extra'>${currentObj.extra1Name}`
              } else {
                if (currentObj.extra1Name) {
                  data6 += `<input type="checkbox" value="0" name="ext_1_${
                    item.menuId
                  }" class='extra1'  @click='extra'>${currentObj.extra1Name}`
                }
              }
              if (item.dataExtra2 == 1) {
                data6 += `<input type="checkbox" value="1" name="ext_2_${
                  item.menuId
                }" class='extra2' checked="checked" @click='extra'>${currentObj.extra2Name}`
              } else {
                if (currentObj.extra2Name) {
                  data6 += `<input type="checkbox" value="0" name="ext_2_${
                    item.menuId
                  }" class='extra2'  @click='extra'>${currentObj.extra2Name}`
                }
              }
              if (item.dataExtra3 == 1) {
                data6 += `<input type="checkbox" value="1" name="ext_3_${
                  item.menuId
                }" class='extra3' checked="checked" @click='extra'>${currentObj.extra3Name}`
              } else {
                if (currentObj.extra3Name) {
                  data6 += `<input type="checkbox" value="0" name="ext_3_${
                    item.menuId
                  }" class='extra3'  @click='extra'>${currentObj.extra3Name}`
                }
              }
              if (item.dataExtra4 == 1) {
                data6 += `<input type="checkbox" value="1" name="ext_4_${
                  item.menuId
                }" class='extra4' checked="checked" @click='extra'>${currentObj.extra4Name}`
              } else {
                if (currentObj.extra4Name) {
                  data6 += `<input type="checkbox" value="0" name="ext_4_${
                    item.menuId
                  }" class='extra4'  @click='extra'>${currentObj.extra4Name}`
                }
              }
              if (item.dataExtra5 == 1) {
                data6 += `<input type="checkbox" value="1" name="ext_5_${
                  item.menuId
                }" class='extra5' checked="checked" @click='extra'>${currentObj.extra5Name}`
              } else {
                if (currentObj.extra5Name) {
                  data6 += `<input type="checkbox" value="0" name="ext_5_${
                    item.menuId
                  }" class='extra5'  @click='extra'>${currentObj.extra5Name}`
                }
              }
              if (item.dataExtra6 == 1) {
                data6 += `<input type="checkbox" value="1" name="ext_6_${
                  item.menuId
                }" class='extra6' checked="checked" @click='extra'>${currentObj.extra6Name}`
              } else {
                if (currentObj.extra6Name) {
                  data6 += `<input type="checkbox" value="0" name="ext_6_${
                    item.menuId
                  }" class='extra6'  @click='extra'>${currentObj.extra6Name}`
                }
              }
            }
            data6 += '</td>'
          }
          data6 += `</tr></tbody></table>`
          this.count = 2
        } else {
          // 每次重新点击树时，选中的列表
          that.addqx = []
          that.delqx = []
          that.updateqx = []
          that.shenheqx = []
          that.extraQx = []

          data6 = ``
          data6 += `<table style="width: 100%;background:#fafafa " id="menuUrlCURDTable">
                   <thead><tr><th>名称</th><th>权限<input type="checkbox" @click="checkAll(2)" id='addN'>增<input type="checkbox" @click="checkAll(3)" id='updateN'>改<input type="checkbox" @click="checkAll(4)" id='deleteN'>删<input type="checkbox" @click="checkAll(5)" id='auditN'>审 操作</th></tr></thead>`
          if (newData.length >= 1) {
            for (var item of newData) {
              data6 += `<tr id="curd_${
                item.menuId
              }"><td style='vertical-align:top!important;
    text-align:left!important;width:145px;' ref='qxname'>${
  item.name
}</td><td style='vertical-align:top!important;
    text-align:left!important;'><input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="1" checked="checked" name="que_${
  item.menuId
}" disabled="disabled">查<input type="checkbox" value="0" name='add_${
  item.menuId
}' class='qxadd' @click='qxadd'>增<input type="checkbox" value="0" name="upd_${
  item.menuId
}" class='qxupdate' @click='qxupdate'>改<input type="checkbox" value="0" name="del_${
  item.menuId
}" class='qxdel' @click='qxdel'>删`
              data6 += `<input type="checkbox" value="0" name="aud_${
                item.menuId
              }" class='qxshenhe' @click='qxshenhe'>审`
              // 权限动态设置
              if ($.inArray(item.menuId, that.extraMenuID) != -1) {
                for (var i = 0; i < that.extraList.length; i++) {
                  var itemObj = that.extraList[i]
                  if (item.menuId == itemObj.menuId) {
                    if (itemObj.extra1Name) {
                      data6 += `<input type="checkbox" value="0" name="ext_1_${
                        item.menuId
                      }" class='extra1' @click='extra'>${itemObj.extra1Name}`
                    }
                    if (itemObj.extra2Name) {
                      data6 += `<input type="checkbox" value="0" name="ext_2_${
                        item.menuId
                      }" class='extra2' @click='extra'>${itemObj.extra2Name}`
                    }
                    if (itemObj.extra3Name) {
                      data6 += `<input type="checkbox" value="0" name="ext_3_${
                        item.menuId
                      }" class='extra3' @click='extra'>${itemObj.extra3Name}`
                    }
                    if (itemObj.extra4Name) {
                      data6 += `<input type="checkbox" value="0" name="ext_4_${
                        item.menuId
                      }" class='extra4' @click='extra'>${itemObj.extra4Name}`
                    }
                    if (itemObj.extra5Name) {
                      data6 += `<input type="checkbox" value="0" name="ext_5_${
                        item.menuId
                      }" class='extra5' @click='extra'>${itemObj.extra5Name}`
                    }
                    if (itemObj.extra6Name) {
                      data6 += `<input type="checkbox" value="0" name="ext_6_${
                        item.menuId
                      }" class='extra6' @click='extra'>${itemObj.extra6Name}`
                    }
                  }
                }
              }
              data6 += '</td>'
            }
            data6 += `</tr></tbody></table>`
          } else {
            data6 = `<p>权限分配</p>`
          }
        }
      } else {
        // 每次重新点击树时，选中的列表
        that.addqx = []
        that.delqx = []
        that.updateqx = []
        that.shenheqx = []
        that.extraQx = []

        data6 = ``
        data6 += `<table style="width: 100%;background:#fafafa " id="menuUrlCURDTable">
                   <thead><tr><th>名称</th><th>权限<input type="checkbox" @click="checkAll(2)" id='addN'>增<input type="checkbox" @click="checkAll(3)" id='updateN'>改<input type="checkbox" @click="checkAll(4)" id='deleteN'>删<input type="checkbox" @click="checkAll(5)" id='auditN'>审 操作</th></tr></thead>`
        if (newData.length >= 1) {
          for (var item of newData) {
            data6 += `<tr id="curd_${
              item.menuId
            }"><td style='vertical-align:top!important;
    text-align:left!important;width:145px;' ref='qxname'>${
  item.name
}</td><td style='vertical-align:top!important;
    text-align:left!important;'><input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="1" checked="checked" name="que_${
  item.menuId
}" disabled="disabled">查<input type="checkbox" value="0" name='add_${
  item.menuId
}' class='qxadd' @click='qxadd'>增<input type="checkbox" value="0" name="upd_${
  item.menuId
}" class='qxupdate' @click='qxupdate'>改<input type="checkbox" value="0" name="del_${
  item.menuId
}" class='qxdel' @click='qxdel'>删`
            data6 += `<input type="checkbox" value="0" name="aud_${
              item.menuId
            }" class='qxshenhe' @click='qxshenhe'>审`
            // 权限动态设置
            if ($.inArray(item.menuId, that.extraMenuID) != -1) {
              for (var i = 0; i < that.extraList.length; i++) {
                var itemObj = that.extraList[i]
                if (item.menuId == itemObj.menuId) {
                  if (itemObj.extra1Name) {
                    data6 += `<input type="checkbox" value="0" name="ext_1_${
                      item.menuId
                    }" class='extra1' @click='extra'>${itemObj.extra1Name}`
                  }
                  if (itemObj.extra2Name) {
                    data6 += `<input type="checkbox" value="0" name="ext_2_${
                      item.menuId
                    }" class='extra2' @click='extra'>${itemObj.extra2Name}`
                  }
                  if (itemObj.extra3Name) {
                    data6 += `<input type="checkbox" value="0" name="ext_3_${
                      item.menuId
                    }" class='extra3' @click='extra'>${itemObj.extra3Name}`
                  }
                  if (itemObj.extra4Name) {
                    data6 += `<input type="checkbox" value="0" name="ext_4_${
                      item.menuId
                    }" class='extra4' @click='extra'>${itemObj.extra4Name}`
                  }
                  if (itemObj.extra5Name) {
                    data6 += `<input type="checkbox" value="0" name="ext_5_${
                      item.menuId
                    }" class='extra5' @click='extra'>${itemObj.extra5Name}`
                  }
                  if (itemObj.extra6Name) {
                    data6 += `<input type="checkbox" value="0" name="ext_6_${
                      item.menuId
                    }" class='extra6' @click='extra'>${itemObj.extra6Name}`
                  }
                }
              }
            }
            data6 += '</td>'
          }
          data6 += `</tr></tbody></table>`
        } else {
          data6 = `<p>权限分配</p>`
        }
      }
      var MyComponent = Vue.extend({
        data() {
          return {
          }
        },
        methods: {
          checkAll(type) {
            // console.log(type)
            // that.addqx    = [];
            // that.delqx    = [];
            // that.updateqx = [];
            // that.shenheqx = [];
            // that.extraQx  = [];
            // e.target.getAttribute("value") == 0
            if (type == 2) {
              if ($("input[id='addN']").is(':checked')) {
                that.addqx = []
                $('.qxadd').each(function() {
                  that.addqx.push($(this).prop('name').split('_')[1])
                })
                $('.qxadd').prop('checked', true)
                $('.qxadd').prop('value', 1)
              } else {
                that.addqx = []
                $('.qxadd').prop('checked', false)
                $('.qxadd').prop('value', 0)
              }
            } else if (type == 3) {
              if ($("input[id='updateN']").is(':checked')) {
                that.updateqx = []
                $('.qxupdate').each(function() {
                  that.updateqx.push($(this).prop('name').split('_')[1])
                })
                $('.qxupdate').prop('checked', true)
                $('.qxupdate').prop('value', 1)
              } else {
                that.updateqx = []
                $('.qxupdate').prop('checked', false)
                $('.qxupdate').prop('value', 0)
              }
            } else if (type == 4) {
              if ($("input[id='deleteN']").is(':checked')) {
                that.delqx = []
                $('.qxdel').each(function() {
                  that.delqx.push($(this).prop('name').split('_')[1])
                })
                $('.qxdel').prop('checked', true)
                $('.qxdel').prop('value', 1)
              } else {
                that.delqx = []
                $('.qxdel').prop('checked', false)
                $('.qxdel').prop('value', 0)
              }
            } else if (type == 5) {
              if ($("input[id='auditN']").is(':checked')) {
                that.shenheqx = []
                $('.qxshenhe').each(function() {
                  that.shenheqx.push($(this).prop('name').split('_')[1])
                })
                $('.qxshenhe').prop('checked', true)
                $('.qxshenhe').prop('value', 1)
              } else {
                that.shenheqx = []
                $('.qxshenhe').prop('checked', false)
                $('.qxshenhe').prop('value', 0)
              }
            }
          },
          extra(e) {
            if (e.target.getAttribute('value') == 0) {
              e.target.setAttribute('value', 1)
              e.target.setAttribute('checked', true)
              var curId = e.target.getAttribute('name')
              if (that.extraQx.indexOf(curId) == -1) {
                that.extraQx.push(curId)
              }
            } else {
              e.target.setAttribute('value', 0)
              e.target.setAttribute('checked', false)
              var curId = e.target.getAttribute('name')
              if (that.extraQx.indexOf(curId) != -1) {
                that.extraQx.splice(that.extraQx.indexOf(curId), 1)
              }
            }
          },
          qxadd(e) {
            if (e.target.getAttribute('value') == 0) {
              e.target.setAttribute('value', 1)
              e.target.setAttribute('checked', true)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.addqx.indexOf(curId) == -1) {
                that.addqx.push(curId)
              }
            } else {
              e.target.setAttribute('value', 0)
              e.target.setAttribute('checked', false)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.addqx.indexOf(curId) != -1) {
                that.addqx.splice(that.addqx.indexOf(curId), 1)
              }
            }
            // this.getAllAdd();
          },
          qxupdate(e) {
            if (e.target.getAttribute('value') == 0) {
              e.target.setAttribute('value', 1)
              e.target.setAttribute('checked', true)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.updateqx.indexOf(curId) == -1) {
                that.updateqx.push(curId)
              }
            } else {
              e.target.setAttribute('value', 0)
              e.target.setAttribute('checked', false)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.updateqx.indexOf(curId) != -1) {
                that.updateqx.splice(that.updateqx.indexOf(curId), 1)
              }
            }
            // this.getAllUpdate();
          },
          qxdel(e) {
            if (e.target.getAttribute('value') == 0) {
              e.target.setAttribute('value', 1)
              e.target.setAttribute('checked', true)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.delqx.indexOf(curId) == -1) {
                that.delqx.push(curId)
              }
            } else {
              e.target.setAttribute('value', 0)
              e.target.setAttribute('checked', false)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.delqx.indexOf(curId) != -1) {
                that.delqx.splice(that.delqx.indexOf(curId), 1)
              }
            }
            // this.getAllDel();
          },
          qxshenhe(e) {
            if (e.target.getAttribute('value') == 0) {
              e.target.setAttribute('value', 1)
              e.target.setAttribute('checked', true)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.shenheqx.indexOf(curId) == -1) {
                that.shenheqx.push(curId)
              }
            } else {
              e.target.setAttribute('value', 0)
              e.target.setAttribute('checked', false)
              var curId = e.target.getAttribute('name').split('_')[1]
              if (that.shenheqx.indexOf(curId) != -1) {
                that.shenheqx.splice(that.shenheqx.indexOf(curId), 1)
              }
            }
            // this.getAllShenhe();
          },
          getAllAdd() {
            that.addqx = []
            for (let i = 0; i < $('.qxadd').length; i++) {
              if ($('.qxadd')[i].getAttribute('value') == 1) {
                var id = $('.qxadd')[i].getAttribute('name').split('_')[1]
                that.addqx.push(id)
              }
            }
            // console.log(that.addqx);
          },
          getAllUpdate() {
            that.updateqx = []
            for (let i = 0; i < $('.qxupdate').length; i++) {
              if ($('.qxupdate')[i].getAttribute('value') == 1) {
                var id = $('.qxupdate')[i].getAttribute('name').split('_')[1]
                that.updateqx.push(id)
              }
            }
          },
          getAllDel() {
            that.delqx = []
            for (let i = 0; i < $('.qxdel').length; i++) {
              if ($('.qxdel')[i].getAttribute('value') == 1) {
                var id = $('.qxdel')[i].getAttribute('name').split('_')[1]
                that.delqx.push(id)
              }
            }
          },
          getAllShenhe() {
            that.shenheqx = []
            for (let i = 0; i < $('.qxshenhe').length; i++) {
              if ($('.qxshenhe')[i].getAttribute('value') == 1) {
                var id = $('.qxshenhe')[i].getAttribute('name').split('_')[1]
                that.shenheqx.push(id)
              }
            }
          },

          // 扩展权限动态判断
          extra1() {

          },
          extra2() {

          },
          extra3() {

          },
          extra4() {

          },
          extra5() {

          },
          extra6() {

          }
        },
        template: data6
      })
      var component = new MyComponent().$mount()
      $('.qxMng').html(component.$el)
      // $('.qxMng').html(data6)
    }
  }
}
</script>

<style scoped>
.top {
  text-align: left;
}
.el-pagination {
  text-align: left;
}
hr {
  margin-top   : 3px;
  margin-bottom: 6px;
}
td,
th {
  padding       : 0;
  vertical-align: top !important;
  text-align    : left !important;
}
</style>
