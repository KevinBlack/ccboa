<!--
 * @Author: wy
 * @Date: 2020-07-13 16:57:30
 * @LastEditTime: 2020-07-16 11:06:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\sublicense\components\user.vue
-->
<template>
  <div class="register">
    <div class="handleButton">
      <el-button type="primary" @click="close()">关闭</el-button>
      <el-button type="primary" @click="saveRegInfo()">保存</el-button>
      <el-button type="primary" v-if="saveDone" @click="send()">发送</el-button>
      <el-button type="primary" v-if="saveDone" @click="delRegister()">删除登记</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">中国建设银行转授权登记</div>
      <div class="orgInfoTableBody">
        <m-form
          :formCfg="formCfg"
          :formData="formData"
          :showButton="false"
          :isInline="false"
          labelWidth="220px"
        ></m-form>
        <span class="tips">引入附件名（包括压缩包中的文件名）不能包含以下半角符号：空格/\,":;*?&lt;&gt;|.</span>
        <div class="changeBtn">
          <el-button type="primary">引入</el-button>
          <el-button type="primary">删除</el-button>
          <el-button type="primary">排序</el-button>
        </div>
      </div>
    </div>
    <!-- 选择人员弹框 -->
    <el-dialog title="上级机构" :visible.sync="dialogSelectStaff" class="dialogSelectStaff" width="80%">
      <tree-transfer
        :title="title"
        :from_data="fromData"
        :to_data="toData"
        :defaultProps="{label:'label'}"
        @addBtn="add"
        @removeBtn="remove"
        filter
        openAll
      ></tree-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogSelectStaff = false">取 消</el-button>
        <el-button @click="sureSelectStaffTree()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import mForm from 'components/form/mForm'
// import treeTransfer from 'el-tree-transfer'
export default {
  name: 'register',
  components: {
    mForm,
    // treeTransfer
  },
  props: {},
  data () {
    return {
      //保存之后显示按钮（发送，删除登记）
      saveDone: false,
      formCfg: [
        {
          label: '授权模块',
          prop: 'uass',
          type: 'checkbox',
          width: '100%',
          isNeedAllSel: true,
          checkboxs: [
            {
              label: '发文管理',
              value: '1'
            },
            {
              label: '签报管理',
              value: '2'
            },
            {
              label: '会议培训',
              value: '3'
            },
            {
              label: '印章管理',
              value: '4'
            },
            {
              label: '信息报送',
              value: '5'
            },
            {
              label: '会议室预定',
              value: '6'
            },
            {
              label: '收文管理',
              value: '7'
            },
            {
              label: '便函管理',
              value: '8'
            },
            {
              label: '事务审批',
              value: '9'
            },
            {
              label: '移动办公web服务',
              value: '10'
            },
            {
              label: '行办参会',
              value: '11'
            },
            {
              label: '部门信息（信息刊物）',
              value: '12'
            }
          ]
        },
        {
          label: '登记人',
          prop: 'memberName',
          type: 'input'
        }, {
          label: '登记部门',
          prop: 'uassuass',
          type: 'input'
        }, {
          label: '授权人',
          prop: 'department',
          type: 'input'
        },
        {
          label: '授权部门',
          prop: 'memberName',
          type: 'input'
        }, {
          label: '被授权人',
          prop: 'roleName',
          type: 'input',
          showAdditionButton: true,
          additionButtonLabel: '选择人员',
          additionButtonhandel: () => {
            this.dialogSelectStaff = true
          }
        }, {
          label: '被授权人部门',
          prop: 'roleName',
          type: 'input'
        },
        {
          label: '登记日期',
          prop: 'memberName',
          type: 'input'
        }, {
          label: '转授权开始日期',
          prop: 'roleName1',
          type: 'dateTime'
        }, {
          label: '转授权结束日期',
          prop: 'roleName2',
          type: 'dateTime'
        }, {
          label: '转授权原因',
          prop: 'roleName',
          type: 'textarea'
        },
        {
          label: '转授权状态',
          prop: 'roleName',
          type: 'input'
        },
        {
          label: '备注',
          prop: 'roleName',
          type: 'textarea'
        },
        {
          label: '附件',
          prop: 'roleName',
          type: 'input',
          showAdditionButton: true,
          additionButtonLabel: '浏览',
          additionButtonhandel: () => {
            console.log('select')
          }
        }
      ],
      formData: {
        uass: []
      },
      // 选择人员弹框
      dialogSelectStaff: false,
      title: ['候选项', '已选项'],
      fromData: [
        {
          id: '1',
          pid: 0,
          label: '总行',
          children: [
            {
              id: '1-1',
              pid: '1',
              label: '董事长',
              children: []
            },
            {
              id: '1-2',
              pid: '1',
              label: '行领导',
              children: [
                {
                  id: '1-2-1',
                  pid: '1-2',
                  children: [],
                  label: '行领导1'
                },
                {
                  id: '1-2-2',
                  pid: '1-2',
                  children: [],
                  label: '行领导2'
                }
              ]
            }
          ]
        }
      ],
      toData: []
    }
  },
  computed: {},
  methods: {
    //关闭
    close () {
      this.$confirm('是否保存文档?', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }).catch(() => {

      });
    },
    //保存
    saveRegInfo () {
      this.saveDone = true
    },
    //发送
    send () {
      this.$message({
        type: 'success',
        message: `成功发送给admin`
      })
    },
    //删除登记
    delRegister () { },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      // 返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      // 返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 选择人员,确定
    sureSelectStaffTree () {
      console.log('hhhhhhhhhhhhhhhhhhhhhhh', this.toData)
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.register {
  .orgInfoTable {
    padding: 0px 70px;
    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 55px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
    .orgInfoTableBody {
      margin-left: 8%;
      .tips {
        padding-left: 20%;
        font-size: 12px;
        color: #f5150b;
      }
      .changeBtn {
        padding-left: 20%;
        margin-top: 30px;
      }
    }
  }
}
</style>
