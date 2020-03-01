// 订单详情页面
<template>
  <!-- <div class="app-container"> -->
  <div id="scrollBox" class="ss" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" style="margin-bottom:20px" :sticky-top="130">
      <div class="gray_box">
        <div class="herfTab">
          <div class="float_left tabItem tab_active" @click="returnToView('baseView1')">
            <span>基础信息</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView2')">
            <span>学习进度</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView3')">
            <span>其他信息</span>
          </div>
        </div>
      </div>
    </sticky>
    <el-form
      ref="baseForm"
      :model="baseForm"
      :rules="baseRules"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <!-- 订单信息 -->
      <div class="gray_box baseView baseView1">
        <div>
          <h2 class="item_title">基础信息</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">姓名:</label>
                    <span>2019年7月10日 09:15</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">手机号：</label>
                    <span>陈阿发</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">性别:</label>
                    <span>yhl980108</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">身份证号:</label>
                    <span>张燕</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">学习进度</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="24" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">报名状态:</label>
                    <span>2019年7月10日 09:15</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">大课进度：</label>
                    <span>陈阿发</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">视频进度：</label>
                    <span>男</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">实践进度:</label>
                    <span>浙江省杭州市滨江区长河路和瑞科技广场S3栋6楼</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">考核状态:</label>
                    <span>陈大发</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">考试时间:</label>
                    <span>浙江省杭州市滨江区长河路和瑞科技广场S3栋6楼</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">报名时间:</label>
                    <span>yhl980108</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item" />
                    <span />
                  </div>
                  <div class="info_item">
                    <label class="label_item" />
                    <span />
                  </div>
                  <div class="info_item">
                    <label class="label_item" />
                    <span />
                  </div>
                  <div class="info_item">
                    <label class="label_item">考评员:</label>
                    <span>张燕</span>
                  </div>
                  <div class="info_item">
                    <label class="label_item">历史考核:</label>
                    <span style="color:#66b1ff;cursor:pointer;"><u>查看详情</u></span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="gray_box baseView baseView3">
        <div>
          <h2 class="item_title">其他信息</h2>
          <div class="item_form">
            <el-row>
              <!-- 商品信息左侧 -->
              <el-col :span="6" :xs="24" :sm="24" :md="24" :lg="8">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">用户ID：</label>
                    <span>￥350</span>
                  </div>
                </div>
              </el-col>
              <!-- 右侧商品信息---表格形式 -->
              <el-col :span="18" :xs="24" :sm="24" :md="24" :lg="16">
                <div class="pd_left_20">
                  <div class="info_item">
                    <label class="label_item">创建时间：</label>
                    <span>￥350</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="gray_box">
        <div>
          <h2 v-show="false" class="item_title">BAR</h2>
          <div class="item_form">
            <el-row>
              <el-form-item style="margin-bottom:0px">
                <!-- <el-button size="medium" @click="onSubmit('baseForm')">返回</el-button> -->
                <el-button size="medium" type="primary" @click="onSubmit('baseForm')">返回</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
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
      baseForm: {
      },
      baseRules: {
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$router.push('/nursing_training/student_info/student_list')
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#EEF1FA;border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;'
      } else {
        return ''
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd;text-align:center;verical-align:middle'
      }
      return 'border-right:1px solid #ddd;border-bottom:1px solid #ddd; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align:center;'
    }
  }
}
</script>
<style scoped lang='scss'>
#scrollBox {
  color: #828282;
}
.float_left {
  float: left;
}
.float_right {
  float: right;
  margin-right: 30px;
}
.app-container {
  background: #f2f2f2;
  margin: 0px;
}
.gray_box {
  border: 1px solid #dddddd;
  margin-bottom: 20px;
  background: #ffffff;
}
.herfTab {
  background: #ffffff;
  position: relative;
  overflow: hidden;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  .tabItem {
    width: 130px;
    line-height: 57px;
    border-top: 3px solid transparent;
  }
  .tab_active {
    border-color: #409eff;
    background: rgba(30, 144, 255, 0.2);
    color: #3e8dff;
  }
}
.item_title {
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 55px;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  padding-left: 20px;
}
.item_form {
  padding: 20px;
}
.wid_320 {
  width: 320px;
}
.marg_20 {
  margin-left: 20px;
}
.wid_110 {
  width: 110px;
}
.pd_left_20 {
  padding-left: 20px;
}
.color_green{
  color: #399C39
}
.info_item {
  // height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.info_item_bold {
  height: 40px;
  font-size: 25px;
  line-height: 25px;
  font-weight: bolder;
}
.label_item {
  display: inline-block;
  width: 150px;
  font-weight: normal;
  text-align: left;
}
.label_item_bold {
  font-weight: bolder;
}
.font_blue {
  color: #41c5ff;
  font-size: 25px;
}
.table_border {
  border: 1px solid #ddd;
}
#goods_info_table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style lang="scss">
#goods_info_table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
//  图片上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>

