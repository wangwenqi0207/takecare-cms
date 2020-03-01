<template>
  <div id="basic">
    <div class="basic_community_input">
      <el-form label-width="160px" disabled :model="ruleForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="社区编号" required>
              <el-input v-model="ruleForm.code" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="社区名称" required>
              <el-input v-model="ruleForm.communityName" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="社区地址" required>
              <el-input  v-model="ruleForm.communityName" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传头像">
              <el-upload
                class="avatar-uploader avatar-uploader2"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属城市" required>
              <el-input v-model="ruleForm.city" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="社区街道/镇" required>
              <el-select v-model="street" clearable class="basic_select" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row style="display:flex">
          <el-form-item label="社区群主" required>
            <el-select v-model="ruleForm.groupLeaderFullName" clearable class="community_select" />
          </el-form-item>
          <el-form-item label="社区助理" required>
            <el-select v-model="ruleForm.assistantFullName" clearable class="community_select" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态" required>
              <el-radio v-model="radio" label="1" style="margin-left:20px;">有效</el-radio>
              <el-radio v-model="radio" label="0">无效</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="community_submit" style="margin-left:100px;">
        <!-- <el-button class="community_submit_btn" @click="close_add_employee">返回</el-button> -->
        <el-button type="primary" class="community_submit_btn" @click="close_add_employee">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommunity } from '@/api/community'
export default {
  name: 'Basic',
  data() {
    return {
      imageUrl: '',
      radio: '',
      street: '',
      ruleForm: {
        code: '',
        communityName: '',
        groupLeaderFullName: '',
        assistantFullName: '',
        city: ''
      }
    }
  },
  mounted() {
    // 拉信息
    this.getIofo()
    // console.log(this.$route.query.id)
  },
  methods: {
    // 取消
    close_add_employee() {
      this.$router.push('/community/community_list/list')
    },
    // 请求信息
    getIofo() {
      var data = {
        'id': this.$route.query.id
      }
      getCommunity(data).then(res => {
        console.log('查看一个社区', res.profilePicture)
        if (res.isActived == true) {
          this.radio = '1'
        }
        if (res.isActived == false) {
          this.radio = '0'
        }
        this.ruleForm.code = res.code
        this.ruleForm.communityName = res.name
        this.ruleForm.groupLeaderFullName = res.groupLeaderFullName
        this.ruleForm.assistantFullName = res.assistantFullName
        this.imageUrl = res.profilePicture
        this.ruleForm.city = res.areaAddress
      })
    }
    // close_add_employee() {
    //   this.$router.push('/community/community_list/list')
    // }
  }
}
</script>
<style scoped lang="scss" >
.add_community_tit h4{
    width: 128px;
    color:#409EFF;
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.basic_community_input{
   padding-left: 67px;
   padding-top: 50px;
}
 //input
.el-input ,.basic_select{
   width: 800px;
 }

//upload
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
//
.delete_button{
    color: #409EFF;
    text-decoration: underline;
    border:none;
    background:#fff;
    cursor: pointer;
}
.community_select .el-input{
    width: 320px;
}
//submit
.community_submit_btn{
    width: 100px;
    font-size: 18px;
}
.community_submit{
    padding: 30px;
}
.community_submit .el-button+.el-button{
    margin-left: 80px;
}
</style>

