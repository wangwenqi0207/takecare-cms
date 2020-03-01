<template>
  <div id="policyadd" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" label-width="140px" :model="form" :rules="rules">
            <el-row id="zhqx1">
              <el-form-item label="新增政策补贴" />
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="政策名称" prop="name">
                  <el-input v-model="form.name" style="width:100%;" size="mini" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row id="cbzt">
              <el-col :span="18">
                <el-form-item label="用户" required>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item prop="userParticipationTypeId">
                        <el-row>
                          <el-col :span="24">
                            <el-radio v-model="form.userParticipationTypeId" label="1">长护参保状态</el-radio>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <el-radio v-model="form.userParticipationTypeId" label="2">民政参保状态</el-radio>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <el-radio v-model="form.userParticipationTypeId" label="3">残联参保状态</el-radio>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24">
                            <el-radio v-model="form.userParticipationTypeId" label="4">健委参保状态</el-radio>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="userParticipationTypeId1">
                            <el-select v-model="form.userParticipationTypeId1" placeholder="请选择" size="mini">
                              <el-option value="义乌参保：重度失能1" label="义乌参保：重度失能1" />
                              <el-option value="义乌参保：重度失能2" label="义乌参保：重度失能2" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="userParticipationTypeId2">
                            <el-select v-model="form.userParticipationTypeId2" placeholder="请选择" size="mini">
                              <el-option value="义乌参保：重度失能3" label="义乌参保：重度失能3" />
                              <el-option value="义乌参保：重度失能4" label="义乌参保：重度失能4" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="userParticipationTypeId3">
                            <el-select v-model="form.userParticipationTypeId3" placeholder="请选择" size="mini">
                              <el-option value="义乌参保：重度失能5" label="义乌参保：重度失能5" />
                              <el-option value="义乌参保：重度失能6" label="义乌参保：重度失能6" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="userParticipationTypeId4">
                            <el-select v-model="form.userParticipationTypeId4" placeholder="请选择" size="mini">
                              <el-option value="义乌参保：重度失能7" label="义乌参保：重度失能7" />
                              <el-option value="义乌参保：重度失能8" label="义乌参保：重度失能8" />
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="商品类型" prop="subsidySchemeProductTypes">
                <el-checkbox-group v-model="form.subsidySchemeProductTypes">
                  <el-row>
                    <el-col :span="3">
                      <el-checkbox label="1">生活照料</el-checkbox>
                    </el-col>
                    <el-col :span="3">
                      <el-checkbox label="2">医疗护理</el-checkbox>
                    </el-col>
                    <el-col :span="3">
                      <el-checkbox label="3">机构护理</el-checkbox>
                    </el-col>
                    <el-col :span="3">
                      <el-checkbox label="4">护理器材</el-checkbox>
                    </el-col>
                    <el-col :span="3">
                      <el-checkbox label="7">长护险护理包</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="使用时间" prop="timeIsCustom">
                  <el-row>
                    <el-col :span="3">
                      <el-radio v-model="form.timeIsCustom" :label="false">不限</el-radio>
                    </el-col>
                    <el-col :span="4">
                      <el-radio v-model="form.timeIsCustom" :label="true">有效时间</el-radio>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="time">
                        <el-date-picker
                          v-model="form.time"
                          size="mini"
                          style="width:100%"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="18">
                <el-form-item label="补贴费用/比例" prop="btfybl">
                  <el-row>
                    <el-col :span="4">
                      <el-radio v-model="form.btfybl" label="1">补贴费用</el-radio>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item prop="btfy">
                        <el-input v-model="form.btfy" style="width:80%;" size="mini" />元
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="4">
                      <el-radio v-model="form.btfybl" label="2">补贴比例</el-radio>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item prop="btbl">
                        <el-input v-model="form.btbl" style="width:80%;" size="mini" />%
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="状态" prop="isActived">
                  <el-radio-group v-model="form.isActived">
                    <el-radio :label="true">有效</el-radio>
                    <el-radio :label="false">无效</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-form-item>
                <el-button size="medium" @click="reback">取消</el-button>
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
import { policyAdd } from '@/api/subsidyschemes.js'
import { Debounce } from '@/utils/public'

export default {
  data() {
    var validate1 = (rule, value, callback) => {
      if (this.form.userParticipationTypeId === '1' || this.form.userParticipationTypeId === 1) {
        if (value === '') {
          callback(new Error('请选择长护参保状态'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
      if (this.form.userParticipationTypeId === '2' || this.form.userParticipationTypeId === 2) {
        if (value === '') {
          callback(new Error('请选择民政参保状态'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validate3 = (rule, value, callback) => {
      if (this.form.userParticipationTypeId === '3' || this.form.userParticipationTypeId === 3) {
        if (value === '') {
          callback(new Error('请选择残联参保状态'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validate4 = (rule, value, callback) => {
      if (this.form.userParticipationTypeId === '4' || this.form.userParticipationTypeId === 4) {
        if (value === '') {
          callback(new Error('请选择健委参保状态'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validateTime = (rule, value, callback) => {
      if (this.form.timeIsCustom === 'true' || this.form.timeIsCustom === true) {
        if (value === '' || value === null) {
          callback(new Error('请选择使用时间'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // var validateBtfy = (rule, value, callback) => {
    //   if (this.form.btfybl === '1' || this.form.btfybl === 1) {
    //     if (value === '' || value === null) {
    //       callback(new Error('请填写补贴费用'))
    //     } else {
    //       callback()
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    // var validateBtbl = (rule, value, callback) => {
    //   if (this.form.btfybl === '2' || this.form.btfybl === 2) {
    //     if (value === '' || value === null) {
    //       callback(new Error('请填写补贴比例'))
    //     } else {
    //       callback()
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    return {
      form: {
        name: '',
        time: '',
        userParticipationTypeId1: '',
        userParticipationTypeId2: '',
        userParticipationTypeId3: '',
        userParticipationTypeId4: '',
        subsidySchemeProductTypes: [],
        isActived: '',
        userParticipationTypeId: '',
        timeIsCustom: ''
        // btfybl: '',
        // btfy: '',
        // btbl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入政策名称', trigger: 'blur' }
        ],
        subsidySchemeProductTypes: [
          { type: 'array', required: true, message: '请至少选择一个商品类型', trigger: 'change' }
        ],
        isActived: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        timeIsCustom: [
          { required: true, message: '请选择使用时间', trigger: 'change' }
        ],
        // btfybl: [
        //   { required: true, message: '请选择补贴费用/比例', trigger: 'change' }
        // ],
        // btfy: [
        //   { validator: validateBtfy, trigger: 'blur' }
        // ],
        // btbl: [
        //   { validator: validateBtbl, trigger: 'blur' }
        // ],
        time: [
          { validator: validateTime, trigger: 'change' }
        ],
        userParticipationTypeId: [
          { required: true, message: '请选择参保类型', trigger: 'change' }
        ],
        userParticipationTypeId1: [
          { validator: validate1, trigger: 'change' }
        ],
        userParticipationTypeId2: [
          { validator: validate2, trigger: 'change' }
        ],
        userParticipationTypeId3: [
          { validator: validate3, trigger: 'change' }
        ],
        userParticipationTypeId4: [
          { validator: validate4, trigger: 'change' }
        ]
      }

    }
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    reback() {
      this.$router.push({ path: '/operation_mng/policy_subsidies' })
    },
    onSubmit: Debounce(function() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!')
          var userParticipationTypeValue
          switch (this.form.userParticipationTypeId) {
            case '1':
              userParticipationTypeValue = this.form.userParticipationTypeId1
              break
            case '2':
              userParticipationTypeValue = this.form.userParticipationTypeId2
              break
            case '3':
              userParticipationTypeValue = this.form.userParticipationTypeId3
              break
            case '4':
              userParticipationTypeValue = this.form.userParticipationTypeId4
              break
            default:
              userParticipationTypeValue = ''
              break
          }
          var newArr = this.form.subsidySchemeProductTypes.map(function(item, index) {
            return {
              'typeId': item,
              'id': null
            } // 操作更新数组
          })
          // 用户参保状态ID：userParticipationStatusId不知道
          var data = {
            'name': this.form.name,
            'userParticipationTypeId': this.form.userParticipationTypeId,
            'userParticipationStatusId': 'd5634246-db22-43da-8e75-df48677e8252',
            // "userParticipationStatusId": null,
            'userParticipationStatusValue': userParticipationTypeValue,
            'timeIsCustom': this.form.timeIsCustom,
            'startTime': this.form.timeIsCustom && this.form.time ? this.form.time[0] : null,
            'endTime': this.form.timeIsCustom && this.form.time ? this.form.time[1] : null,
            'isSubsidyRatio': true,
            'subsidyRatio': 30,
            'subsidyFee': null,
            'isActived': this.form.isActived,
            'subsidySchemeProductTypes': newArr,
            'id': null
          }
          policyAdd(data).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push({ path: `/operation_mng/policy_subsidies` })
            } else {
              // this.$message.warning('添加失败')
              // console.log('88888',res.response.data.error)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }, 500)
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
#staffMng #policyadd .el-tabs__content{
  height: 96%;
}
#staffMng #policyadd .el-select .el-input {
  width: 100%;
}
#staffMng #policyadd .el-form-item__content .el-input__inner{
  width: 100%;
}
#staffMng #policyadd .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#policyadd .el-table__header-wrapper{
  display: none;
}
#policyadd .el-select{
  width: 100%;
}
#policyadd #zhqx .el-form-item__label,#zhqx1 .el-form-item__label{
  margin: 20px 0px;
  font-size: 20px;
  color:rgb(62, 141, 255);
}
#policyadd #zhqx .el-form-item,#zhqx1 .el-form-item{
  margin-bottom: 0px;
}
#policyadd .el-date-editor .el-range-separator{
  width: 10%;
}
#policyadd #cbzt .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: relative;
    top: 100%;
    left: 0;
    /* float: left; */
}
</style>
