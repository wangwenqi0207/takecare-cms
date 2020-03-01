<template>
  <div id="add_employee" style="margin-bottom:100px;">
    <div class="out_reason">
      审核未通过原因：这里是一条审核未通过的说明；
    </div>
    <div class="add_employee_tit">
      <h4>
        人员信息
      </h4>
    </div>
    <div class="add_employee_input">
      <div class="base_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="上传头像">
            <el-upload
              class="avatar-uploader avatar-uploader2"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="人员编码" required>
            <el-input v-model="city" />
          </el-form-item>
          <el-form-item label="登录账号" required>
            <el-input v-model="city" />
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="姓名" required>
            <el-input v-model="name" />
          </el-form-item>
          <el-form-item label="性别" required>
            <el-radio v-model="radio" label="1" style="margin-left:20px;">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="身份证" required>
            <el-input v-model="id" />
          </el-form-item>
          <el-form-item label="公安实名认证" required label-width="110px">
            <el-input v-model="name" />
          </el-form-item>
        </el-form>
      </div>
      <div class="base_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="身份证正面照片">
            <el-upload
              class="avatar-uploader avatar-uploader2"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证背面照片" style="margin-left:287px">
            <el-upload
              class="avatar-uploader avatar-uploader2"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="社保状态" required>
            <el-input />
          </el-form-item>
          <el-form-item label="人员分类" required>
            <el-select v-model="value" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="资质证书类型" required>
            <el-select v-model="value" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="人员资质照片上传">
            <el-upload
              class="avatar-uploader avatar-uploader2"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="所属机构" required>
            <el-select v-model="value" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input />
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="联系地址" required>
            <span>城市</span>
            <el-cascader :options="citys" clearable />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input />
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="银行户名">
            <el-input />
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input />
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="开户银行">
            <el-input />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input />
          </el-form-item>
        </el-form>
      </div>
      <div class="add_info_main_one">
        <el-form :label-position="labelPosition" label-width="80px" style="display:flex">
          <el-form-item label="状态">
            <el-input v-model="status" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="employee_history">
      <div class="add_employee_tit">
        <h4>
          操作历史
        </h4>
      </div>
      <div class="employee_history_table">
        <el-table
          class="employee_table"
          :data="employee_history_table"
          element-loading-text="Loading"
          :header-cell-style="{background:'#EEF1FA'}"
          height="250"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            align="center"
            label="序号"
          />
          <el-table-column
            prop="name"
            align="center"
            label="操作人"
            width="180"
          />
          <el-table-column
            prop="id"
            align="center"
            label="操作动作"
          />
          <el-table-column
            prop="address"
            align="center"
            label="操作时间"
          />
          <el-table-column
            prop="name"
            align="center"
            label="状态"
          />
        </el-table>
      </div>
    </div>
    <div class="employee_submit">
      <el-button class="org_submit_btn" @click="close_look_employee">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutEmployee',
  data() {
    return {
      labelPosition: 'right',
      imageUrl: '',
      radio: '1',
      status: '审核未通过',
      name: '',
      city: '',
      id: '',
      city2: '111',
      submit: false,
      employee_history_table: [{
        id: ' 1',
        name: '张学友',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '2',
        name: '刘德华',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '3',
        name: '郭富城',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '4',
        name: '黎明',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: '',
      citys: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }]
      }]
    }
  },
  mounted() {

  },
  created() {
    this.getRouterData()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 接收路由参数
    getRouterData() {
      // this.index = this.$route.params.index
      // this.row = this.$route.params.row
      // console.log(this.$route.params.row.city)
      // // console.log('index', this.index)
      // // console.log('row', this.row)
      // this.city = this.$route.params.row.city
      // this.name = this.$route.params.row.name
      // this.id = this.$route.params.row.id
    },
    close_look_employee() {
      this.$router.push('/employee_mng/care_employee/all_employee')
    }
  }
}
</script>

<style lang="scss" scoped>
#add_employee{
    background-color: #fff;
    padding-top: 25px;
}
.out_reason{
    width: 80%;
    height: 30px;
    background-color: #f2f2f2;
    margin:auto;
    border-radius: 5px;
    border:1px solid #ccc;
    font-size: 14px;
    line-height: 30px;
    text-indent:30px;
    color: #b90000;
}
.add_employee_tit h4{
    width: 128px;
    color:#409EFF;
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
/*add_employee_input*/
.add_employee_input{
   padding-left: 67px;
   border-top:none;
 }
 .add_info_main_one{
   margin-top:27px;
   display: flex;
 }
.add_employee_input .add_info_main_one .el-input{
   width: 300px;
   margin-left:16px;
   margin-right:116px;
 }
 .el-select-dropdown{
    min-width: 300px !important;
 }
  /*upload*/
.avatar-uploader2{
    margin-left: 20px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader2 .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 1px dashed #d9d9d9 !important;
  }
 .avatar-uploader2 .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
   .el-upload{
    border: 1px dashed #d9d9d9 !important;
  }

//  .el-input__suffix{
//      right: -16px;
//  }
//city
.el-cascader__label{
    margin-left: 20px !important;
}
.org_submit_btn{
    width: 100px;
    margin-top:20px;
    font-size: 18px;
  }
.employee_submit{
    padding-bottom: 30px;
}
.employee_submit .el-button{
    margin-left: 50px;
}

//table
.employee_history_table{
    padding-left: 50px;
    padding-right: 50px;
}
</style>

