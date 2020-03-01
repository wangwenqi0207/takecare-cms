
/**
新增商品
action
  1 新增
  2修改
  3  查看
*/
<template>
  <!-- <div class="app-container"> -->
  <div id="scrollBox" class="ss" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" style="margin-bottom:20px" :sticky-top="130">
      <div class="gray_box">
        <div class="herfTab">
          <div class="float_left tabItem tab_active" @click="returnToView('baseView1',$event)">
            <span>批次新增</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView3',$event)">
            <span>立即发布</span>
          </div>
        </div>
      </div>
    </sticky>
    <el-form ref="baseForm" :model="baseForm" label-width="200px" class="demo-ruleForm">
      <div class="gray_box baseView baseView1 ">
        <div>
          <h2 class="item_title">批次新增</h2>
          <div v-for="(item,i) in baseForm.tableData" :key="i" class="item_form">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="考核开始时间"
                  :prop="'tableData.' + i + '.startTime'"
                  required
                  :rules="{
                    required: true, message: '开始时间不能为空', trigger: 'change'
                  }"
                >
                  <el-time-select
                    v-model="item.startTime"
                    placeholder="起始时间"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      maxTime: item.endTime
                    }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                &nbsp;
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="考核结束时间"
                  :prop="'tableData.' + i + '.endTime'"
                  required
                  :rules="{
                    required: true, message: '结束时间不能为空', trigger: 'change'
                  }"
                >
                  <el-time-select
                    v-model="item.endTime"
                    placeholder="结束时间"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      minTime: item.startTime
                    }"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="人数限制"
                  :prop="'tableData.' + i + '.number'"
                  required
                  :rules="{
                    required: true, message: '人数限制不能为空', trigger: 'change'
                  }"
                >
                  <el-input-number v-model="item.number" controls-position="right" :min="1" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="item_form">
            <el-row>
              <el-col :span="8">
                <el-button type="text" icon="el-icon-circle-plus-outline" style="margin-left:180px;font-size:18px;" @click="addItem">添加考核时间</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="新增方式" prop="type" required>
                  <el-radio v-model="baseForm.type" :label="1">单日新增</el-radio>
                  <el-radio v-model="baseForm.type" :label="2">多日新增</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="考核日期"
                  prop="date"
                  :rules="[
                    { required: true, message: '考核日期不能为空', trigger: 'change' }
                  ]"
                >
                  <el-date-picker
                    v-model="baseForm.date"
                    style="width:100%"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="gray_box baseView baseView3">
        <div>
          <h2 class="item_title">
            <el-checkbox v-model="checked">立即发布</el-checkbox>
          </h2>
        </div>
      </div>
      <div class="gray_box">
        <div>
          <h2 v-show="false" class="item_title">BAR</h2>
          <div class="item_form">
            <el-row>
              <el-form-item style="margin-bottom:0px">
                <el-button size="medium" @click="cancel">取消</el-button>
                <el-button size="medium" type="primary" @click="submit('baseForm')">确认</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import 'babel-polyfill' // es6 shim
import Sticky from '@/components/Sticky'
import MinXin from '@/components/MiXins'
export default {
  name: 'CreateGoods',
  components: {
    Sticky
  },
  mixins: [MinXin],
  data() {
    return {
      checked: true,
      baseForm: {
        date: '',
        type: 1,
        tableData: [{ startTime: '', endTime: '', number: '' }, { startTime: '', endTime: '', number: '' }]
      }
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  watch: {

  },
  beforeCreate() {
    // console.log(this.$route)
  },
  created() {
  },
  mounted() {
    // console.log(this.$route)
    // console.log(this.productImages)
    if (document.getElementById('scrollBox')) {
      document.getElementById('scrollBox').addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    }
    // ----------------------------
  },
  destroyed: function() {
    if (document.getElementById('scrollBox')) {
      document.getElementById('scrollBox').removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    }
  },
  methods: {
    addItem() {
      this.baseForm.tableData.push({
        startTime: '',
        endTime: '',
        number: ''
      })
    },
    cancel() {
      this.$router.push('/nursing_training/assessment_mng/schedule_setting')
    },
    submit(formName) {
      console.log(this.baseForm.tableData)
      // alert('提交成功')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
  li {
    list-style:none
    }
.float_left{
  float: left;
}
.float_right{
  float: right;
  margin-right: 30px
}
.app-container{
background: #F2F2F2;
margin: 0px
}
.gray_box{
  border:1px solid #dddddd;
  margin-bottom: 20px;
  background: #FFFFFF
}
.herfTab{
  background: #FFFFFF;
  position: relative;
  overflow: hidden;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  .tabItem{
    width:130px;
    line-height: 57px;
    border-top: 3px solid transparent
  }
  .tab_active{
      border-color:#409eff;
      background: rgba(30,144,255,0.2);
      color :#3E8DFF
    }
}
.item_title{
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 55px;
  border-bottom: 1px solid #dddddd;
  background: #FFFFFF;
  padding-left: 20px;
}
.item_form{
  padding: 20px;
}
.wid_320{
  width: 320px
}
.marg_20{
  margin-left:20px
}
.wid_110{
  width: 110px
}
.uploader-box-div .avatar-uploader{
  float: left;
  margin-right:20px
}
// 图片上传
.uploader-box-div .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .uploader-box-div .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
 .uploader-box-div .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .uploader-box-div .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
//  .edit_container .ql-container{
//     height: 400px;
//   }
  .org_select{
    width: 100%
  }
  .listImgBox{
    width:110px;
    height:100px;
  }
</style>

<style lang="scss">
//  图片上传
.uploader-box-div .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.uploader-box-div  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.uploader-box-div  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .uploader-box-div .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .edit_container .ql-container{
    height: 400px;
  }
</style>

