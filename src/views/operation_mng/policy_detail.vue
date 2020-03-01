<template>
  <div id="policyadd" style="height:100%;">
    <div style="height: 100%;background: #fff;overflow:auto;min-width:1200px;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" label-width="140px" :model="form" :rules="rules" disabled>
            <el-row id="zhqx1">
              <el-form-item label="政策补贴详情" />
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="政策名称" prop="name" required>
                  <el-input v-model.trim="form.name" style="width:100%;" size="mini" />
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
                <el-form-item label="补贴费用/比例" required>
                  <el-row>
                    <el-col :span="4">
                      <el-radio label="1">补贴费用</el-radio>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="form.name" style="width:80%;" size="mini" />元
                    </el-col>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="4">
                      <el-radio label="1">补贴比例</el-radio>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="form.name" style="width:80%;" size="mini" />%
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
            <!-- <el-row style="margin-top:20px;">
              <el-form-item>
                <el-button size="medium" @click="reback">取消</el-button>
              </el-form-item>
            </el-row> -->

          </el-form>
          <el-button size="medium" type="primary" style="margin-left:100px;" @click="reback">返回</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getPolicyInfo } from '@/api/subsidyschemes.js'
import { offset } from '@/utils/offset'
export default {
  data() {
    return {
      offset: 8,
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
      },
      rules: {

      },
      checkList: []
    }
  },
  created() {
    getPolicyInfo({ id: this.$route.query.id ? this.$route.query.id : '' }).then(res => {
      if (res) {
        var typesData = []
        if (res.subsidySchemeProductTypes.length != 0) {
          for (var item of res.subsidySchemeProductTypes) {
            typesData.push(item.typeId + '')
          }
        }
        this.form = {
          name: res.name,
          time: res.startTime ? [this.$moment(res.startTime + 'Z').utcOffset(this.offset), this.$moment(res.endTime + 'Z').utcOffset(this.offset)] : '',
          userParticipationTypeId1: res.userParticipationTypeId == 1 ? res.userParticipationStatusValue : '',
          userParticipationTypeId2: res.userParticipationTypeId == 2 ? res.userParticipationStatusValue : '',
          userParticipationTypeId3: res.userParticipationTypeId == 3 ? res.userParticipationStatusValue : '',
          userParticipationTypeId4: res.userParticipationTypeId == 4 ? res.userParticipationStatusValue : '',
          subsidySchemeProductTypes: typesData,
          isActived: res.isActived,
          userParticipationTypeId: res.userParticipationTypeId + '',
          timeIsCustom: res.timeIsCustom
        }
      }
    })
  },
  mounted() {
    this.offset = offset()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    reback() {
      this.$router.push({ path: '/operation_mng/policy_subsidies' })
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
</style>
