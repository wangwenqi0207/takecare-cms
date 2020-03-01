<template>
  <div id="settingComponent" class="comment_box">
    <div>
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column label="Date" prop="date"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>-->
        <el-table-column label="视频类型" prop="name">
          <!-- <template  slot-scope="scope">
              <P>{{typeMap[scope.row.type]}}</P>
          </template>-->
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
            <p v-show="false">{{ scope.row }}</p>
            <el-button type="primary" size="mini" @click="addType">新增</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增类型" :visible.sync="createDialogVisible" width="30%" left>
      <el-form
        ref="createForm"
        :model="createForm"
        status-icon
        :rules="createFormRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="createForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="createDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit1('createForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改类型" :visible.sync="updateDialogVisible" width="30%" left>
      <el-form
        ref="updateForm"
        :model="updateForm"
        status-icon
        :rules="updateFormRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="updateForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit2('updateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Debounce } from '@/utils/public'
const typeMap = {
  '1': '生活照料',
  '2': '医疗护理'
}
export default {
  name: 'VideoSetting',
  data() {
    return {
      typeMap,
      createDialogVisible: false,
      updateDialogVisible: false,
      createForm: {
        name: ''
      },
      createFormRules: {
        name: [
          {
            required: true,
            message: '请输入类型名称',
            trigger: ['blur', 'change']
          }
        ]
      },
      updateForm: {
        name: 'ss'
      },
      updateFormRules: {
        name: [
          {
            required: true,
            message: '请输入类型名称',
            trigger: ['blur', 'change']
          }
        ]
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '生活照料',
          address: '上海市普陀区金沙江路 1518 弄',
          type: 1
        },
        {
          date: '2016-05-04',
          name: '医疗护理',
          address: '上海市普陀区金沙江路 1517 弄',
          type: 2
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          type: 1
        },
        {
          date: '2016-05-03',
          name: '王小二',
          address: '上海市普陀区金沙江路 1516 弄',
          type: 2
        }
      ],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.updateDialogVisible = true
      this.updateForm.name = row.name
    },
    handleDelete: Debounce(function(index, row) {
      console.log(index, row)
      //   删除前先通过该类型查询视频列表，如果列表不为空，提示:当前已有视频归为此类型，无法删除
      const isNull = true
      if (!isNull) {
        this.$alert('当前已有视频归为此类型，无法删除', '提示', {
          confirmButtonText: 'OK',
          center: false,
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            })
          }
        })
      } else {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '再想想',
          type: 'warning'
        }).then(() => {
          this.$message.info('请求删除接口')
        }).catch(() => {

        })
      }
    }, 500),
    addType() {
      this.createDialogVisible = true
      this.createForm.name = ''
      this.$nextTick(() => {
        this.clearFormValidate('createForm')
      })
    },
    submit1: Debounce(function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.createForm)
          this.$message.success('请求新增接口~')
          const data = JSON.parse(JSON.stringify(this.createForm))
          this.tableData.push(data)
          this.createDialogVisible = false
        } else {
          this.$message.warning('表单验证~')
          return false
        }
      })
    }, 500),
    submit2: Debounce(function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.createForm)
          this.$message.success('请求修改接口~')
        } else {
          this.$message.warning('表单验证~')
          return false
        }
      })
    }, 500),
    clearFormValidate(formName) {
      this.$message.info('clearFormValidate!')
      this.$refs[formName].clearValidate()
    }
  }
}
</script>
<style scoped  lang='scss'>
</style>
<style lang='scss'>
#settingComponent .el-dialog__footer {
  text-align: center;
}
</style>
