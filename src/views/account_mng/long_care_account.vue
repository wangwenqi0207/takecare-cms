
<template>
  <div class="page_container" style="overflow:auto;height:100%;background: #ffffff;padding: 10px;min-width:1200px;">
    <div v-if="isNative" style="height:100%;">
      <div class="comment_box" style="padding:0px;margin-top:0px;margin-left:0px;padding-bottom:10px;padding-top:15px;">
        <div class="search_bar">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item
              label="参保人身份证号："
            >
              <el-input
                v-model="searchForm.userIdcard"
                class="input"
                placeholder="请输入参保人身份证号"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="对账月份："
            >
              <el-date-picker
                v-model="searchForm.billDate"
                type="month"
                placeholder="选择账单月份"
                :picker-options="pickerOptions"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item>
            <!-- <el-button
              type="primary"
              size="small"
              class="el-icon-search"
              @click="searchData"
            >搜索</el-button> -->
            <el-form-item>
              <el-button
                type="primary"
                size="medium"
                class="el-icon-top"
                @click="importAccount"
              >导入Excel</el-button>
            </el-form-item>
            <!-- <el-form-item
              label
              class="searchFormItem"
            >
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="getImageSuccess1"
                :before-upload="beforeAvatarUpload1"
                :http-request="fnUploadRequest1"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item> -->
            <!-- <input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/> -->

            <!-- <el-button
              type="primary"
              size="medium"
              style="float:right;margin-left:10px;"
              class="el-icon-delete"
              @click="deletePolicy"
            >删除</el-button>
            <el-button
              type="primary"
              size="medium"
              style="float:right;"
              class="el-icon-edit-outline"
              @click="updatePolicy"
            >修改</el-button>
            <el-button type="primary" size="medium" style="float:right;" class="el-icon-plus" @click="addPolicy">新增</el-button> -->
          </el-form>
        </div>
        <div class="tableList" style="height:83%">
          <el-table
            v-loading="listLoading"
            class="table_border"
            :data="tableData"
            border
            highlight-current-row
            height="100%"
            :style="tableStyle"
            :header-cell-style="headerCellStyle"
            :cell-style="cellStyle"
            size="mini"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column
              type="selection"
              width="55"
            /> -->
            <el-table-column
              prop="code"
              label="对账编号"
              width="180"
            />
            <el-table-column
              prop="userName"
              label="参保人姓名"
              width="100"
            />
            <el-table-column
              prop="userIdcard"
              label="参保人身份证"
              sortable
              width="180"
            />
            <el-table-column
              prop="nursingName"
              label="护理人姓名"
              sortable
              width="120"
            />
            <el-table-column
              prop="nursingIdcard"
              label="护理人身份证"
              sortable
              width="180"
            />
            <el-table-column
              prop="billDate"
              label="账单月份"
              sortable
              width="130"
            />
            <el-table-column
              prop="bankAccount"
              label="银行卡号"
              sortable
              width="180"
            />
            <el-table-column
              prop="bankName"
              label="开户行名称"
              sortable
              width="260"
            />
            <el-table-column
              prop="amount"
              label="账单金额"
              sortable
              width="120"
            >
              <template slot-scope="scope">
                <p>￥{{ scope.row.amount }}元</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              width="180"
            >
              <template slot-scope="scope">
                <p>{{ $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="action"
              label="操作"
              min-width="120"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="medium"
                  @click="handleEdit(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div class="page_nation" style="margin-top:26px;">
          <!-- <el-pagination
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
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
      </div>
      <el-dialog
        id="billAccount"
        title="导入账单"
        :visible.sync="centerDialogVisible"
        width="600px"
        center
      >
        <el-form ref="searchForm1" :inline="true" :model="searchForm1" :rules="rules" class="demo-form-inline" label-width="120">
          <el-form-item
            label="账单月份："
            style="width:100%"
            prop="billDate"
          >
            <el-date-picker
              v-model="searchForm1.billDate"
              type="month"
              placeholder="选择账单月份"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <!-- <el-button
              type="primary"
              size="medium"
              class="el-icon-top"
              @click="importAccount"
            >导入</el-button> -->
          <el-form-item
            label="选择Excel文件："
            style="width:100%"
            :required="true"
          >
            <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="getImageSuccess1"
                :before-upload="beforeAvatarUpload1"
                :http-request="fnUploadRequest1"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload> -->
            <!-- <input id="fileSelect" className="file" type="file" name="upload" onChange={self.submitFile.bind(self, type)} accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /> -->
            <input id="fileSelect" className="file" type="file" name="upload" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="ProcessFile">
          </el-form-item>
          <!-- <input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/> -->

          <!-- <el-button
              type="primary"
              size="medium"
              style="float:right;margin-left:10px;"
              class="el-icon-delete"
              @click="deletePolicy"
            >删除</el-button>
            <el-button
              type="primary"
              size="medium"
              style="float:right;"
              class="el-icon-edit-outline"
              @click="updatePolicy"
            >修改</el-button>
            <el-button type="primary" size="medium" style="float:right;" class="el-icon-plus" @click="addPolicy">新增</el-button> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>

    </div>
    <div v-else style="height:100%;">
      <router-view />
    </div>
  </div>
</template>

<script>
import { billList, billUpload } from '@/api/bill'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          // let _now = Date.now();
          // return time.getTime() > _now ;
          const data = new Date()
          data.setDate(1)
          data.setHours(0)
          data.setSeconds(0)
          data.setMinutes(0)
          return time.getTime() > (data.getTime() - 3600 * 1000 * 24)
        }
      },
      centerDialogVisible: false,
      isNative: true,
      searchForm: {
        userIdcard: '',
        billDate: ''
      },
      // 搜索过滤数据
      longNursingBill: {},
      searchForm1: {
        excelFile: '',
        billDate: ''
      },
      rules: {
        billDate: [
          { type: 'date', required: true, message: '请选择账单月份', trigger: 'change' }
        ]
      },
      listLoading: false,
      // 分页
      currentPage: 1,
      pageSizes: [10, 20, 30, 40],
      total: 0,
      tableData: [],
      tableStyle: 'width:100%;',
      org_name: '',
      flag: false,
      show_list_line: true,
      multipleSelection: [],
      value1: '全部类型',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  created() {
    // this.fetchData()
    if (this.$route.path === '/account_mng/long_care_account') {
      this.isNative = true
    } else {
      this.isNative = false
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      billList({ currentPage: this.currentPage, data: this.longNursingBill }).then(res => {
        if (res.resultCode == '000000') {
          if (res.data) {
            this.total = res.data.total
            this.tableData = res.data.records
          }
        } else {
          this.$message({
            message: '请求失败' + res.resultMsg,
            type: 'warning'
          })
        }
      })
    },
    searchData() {
      // searchForm: {
      //   userIdcard:'',
      //   billDate: ''
      // },
      this.longNursingBill = {}
      if (this.searchForm.userIdcard) {
        this.longNursingBill.userIdcard = this.searchForm.userIdcard
      }
      if (this.searchForm.billDate) {
        this.longNursingBill.billDate = this.$moment(this.searchForm.billDate).format('YYYY-MM')
      }
      this.currentPage = 1
      this.getDataList()
    },
    // 图片上传相关
    ProcessFile() {
      // alert("66");
      this.searchForm1.excelFile = document.getElementById('fileSelect').files[0]
      // const formData = new FormData();
      // formData.append("fileSelect", file);
      // formData.append("fileDir", "assess/");
      // console.log(formData,file)
      // this.$axios({
      //   url: `${this.$store.state.globalRouter}/core/upload_file`,
      //   // url   : `http://192.168.1.187:4280/insurance-intact-web/upload_paper_img`,
      //   method: "post",
      //   data  : formData
      // })
      //   .then(res => {
      //     // alert($('#imgShow'))
      //     // $('#imgShow').prepend(`<img src='https://img-blog.csdn.net/20180114000819862?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbTBfMzgwMjIwMjk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' />`)
      //     // var data=res.data.file.split[]
      //     var code = res.data.file.split(".")[0].split("/")[3];

      //     var data = `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
      //       res.data.file
      //     }'><img  style='width:100%;height:100%;cursor:pointer;' src='${
      //       this.$store.state.globalIMGRouter
      //     }/${
      //       res.data.file
      //     }' /><i class="el-icon-delete" @click='delete11' style='position:absolute;right:10px;bottom:10px;font-size:20px;font-weight:700;' value='${code}'></i></li>`;

      //     var MyComponent = Vue.extend({
      //       template: data,
      //       data() {
      //         return {};
      //       },
      //       methods: {
      //         delete11(event) {
      //           // alert("33");
      //           var goal = event.target.getAttribute("value");
      //           $("#" + goal).remove();
      //         }
      //       }
      //     });
      //     var component = new MyComponent().$mount();
      //     // $("#data-table").append(component.$el);
      //     $("#result").append(component.$el);

      //     //  var a = 666;
      //     //  this.$options.methods.handleSuccess();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // excel导入
    // 营业执照图片
    fnUploadRequest1(option) {
      console.log('33')
      //       console.log(file,'文件');
      var file = option.file
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5// /(校验上传文件的大小)
      if (!extension && !extension2) {
        this.$message.warning('上传文档只能是 xls、xlsx格式!')
        return
      }
      if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过 5MB!')
        return
      }
      // console.log(file.name);
      // this.fileName = file.name;
      // return false // 返回false不会自动上传

      // 旧的
      // var file = option.file
      // const that = this
      // const isJPG = file.type === 'image/jpeg'
      // const isPng = file.type === 'image/png'
      // if (!isJPG && !isPng) {
      //   this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      //   return
      // }
      // const isLt3M = file.size / 1024 / 1024 < 3
      // if (!isLt3M) {
      //   this.$message.error('上传头像图片大小不能超过 3MB!')
      //   return
      // }

      console.log('888888', file)
      // var OSS = require('ali-oss')
      // var client = new OSS({
      //   region: 'oss-cn-hangzhou',
      //   accessKeyId: 'LTAIbqxBSqfHEmbk',
      //   accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
      //   bucket: 'ecare-test' }
      // )
      // const files = option.file
      // const point = files.name.lastIndexOf('.')
      // const suffix = files.name.substr(point)
      // const fileName = files.name.substr(0, point)
      // const date = Date.parse(new Date())
      // const name = `${fileName}_${date}${suffix}`
      // const fileNames = `org/${this.$moment().format('YYYYMMDD')}/${fileName}_${date}${suffix}`
      // client.multipartUpload(fileNames, option.file, {
      //   progress: function(p) {
      //     const e = {}
      //     e.percent = Math.floor(p * 100)
      //     // console.log('Progress: ' + p)
      //     option.onProgress(e)
      //     // console.log(e.percent)
      //     // 显示上传进度条
      //     // this.videoFlag = true
      //     // this.videoUploadPercent = e.percent
      //   }
      // }).then((val) => {
      //   // console.info('66', val)
      //   // if (val.res.statusCode === 200) {
      //   //   // this.videoFlag = false
      //   //   // this.videoUploadPercent = 0
      //   //   // // this.videoForm.videoUploadId = res.data.uploadId
      //   //   // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
      //   //   // option.onSuccess(val)
      //   //   this.ruleForm.businessLicense = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + val.name
      //   //   console.log('11', val)
      //   //   return val
      //   // } else {
      //   //   option.onError('上传失败')
      //   // }
      // }, err => {
      //   option.onError('上传失败')
      //   reject(err)
      // })
    },
    getImageSuccess1: function(res, file) {
      // this.$message({
      //   message: '上传成功！',
      //   type: 'success'
      // })
      // // console.log(file)
      // console.log('66')
      // // this.ruleForm.businessLicense = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload1(file) {
      // const that = this
      // const isJPG = file.type === 'image/jpeg'
      // const isPng = file.type === 'image/png'
      // if (!isJPG && !isPng) {
      //   this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      // }
      // const isLt3M = file.size / 1024 / 1024 < 3
      // if (!isLt3M) {
      //   this.$message.error('上传头像图片大小不能超过 3MB!')
      // }
      // return isLt3M
      // console.log('11')
      // return true

    },
    submit() {
      this.$refs.searchForm1.validate((valid) => {
        if (valid) {
          if (this.searchForm1.excelFile && this.searchForm1.excelFile != '') {
            var billDate = this.$moment(this.searchForm1.billDate).format('YYYY-MM')
            const formData = new FormData()
            formData.append('billDate', billDate)
            formData.append('excelFile', this.searchForm1.excelFile)
            billUpload(formData).then(res => {
              console.log('66666', res)
              if (res.resultCode == '000000') {
                this.$message({
                  message: '导入成功',
                  type: 'success'
                })
                this.centerDialogVisible = false
                this.currentPage = 1
                this.getDataList()
              } else {
                this.$message({
                  message: '导入失败' + res.resultMsg,
                  type: 'warning'
                })
                this.centerDialogVisible = false
              }
            }).catch(err => {
              this.$message({
                message: '导入失败' + err,
                type: 'warning'
              })
              this.centerDialogVisible = false
            })
          } else {
            this.$message({
              message: '请选择要上传文件',
              type: 'warning'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // // 修改按钮点击
    // updatePolicy() {
    //   if (this.multipleSelection && this.multipleSelection.length === 1) {
    //     this.$router.push('/operation_mng/policy_subsidies/update')
    //   } else {
    //     this.$message({
    //       message: '请选择一条数据进行修改',
    //       type: 'warning'
    //     })
    //   }
    // },
    // // 新增机构
    // addPolicy() {
    //   this.$router.push('/operation_mng/policy_subsidies/add')
    // },
    // deletePolicy() {
    //   if (this.multipleSelection && this.multipleSelection.length === 1) {
    //     this.$confirm('是否要删除该条数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   } else {
    //     this.$message({
    //       message: '请选择一条数据进行删除',
    //       type: 'warning'
    //     })
    //   }
    // },
    importAccount() {
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.$refs.searchForm1.resetFields()
        this.searchForm1.excelFile = ''
        var test = document.getElementById('fileSelect')
        test.value = ''
      })
    },
    // 查看个人资料  路由跳转 传参
    handleEdit(index, row) {
      this.$router.push('/operation_mng/policy_subsidies/detail')
      //   this.$router.push({
      //     name: 'look_org',
      //     params: {
      //       index,
      //       row
      //     }
      //   })
    },
    // fetchData() {
    //   this.listLoading = true
    //   goodsList({ size: 10 }).then(response => {
    //     this.tableData = response.data.items.slice(1, 11)
    //     this.listLoading = false
    //   })
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getDataList()
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;'
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
      this.value1 = command.split('&')[1]
    }
  }
}
</script>
<style scoped  lang="scss">
.el-icon-search {
  font-size: 20px;
}
.rela{
  position: relative;
}
.el-dropdown-menu{
  top: 190px !important;
}
// .searchInput{
//   width: 80%;
// }
.searchFormItem{
  width: 300px;
  .el-form-item__content{
    width: 100%
  }
}
.table_border{
  border: 1px solid #ddd;
}
</style>
<style lang='scss'>
.searchFormItem{
  .el-form-item__content{
    width: 100%!important
  }
}
#billAccount .el-form-item__content{
  width:70%!important;
  .el-input{
    width:100%;
  }
}
#billAccount .el-form-item__label {
    text-align: left;
    width: 150px;
}
</style>

