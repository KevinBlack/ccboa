<!--
 * @Author: wy
 * @Date: 2020-07-21 16:52:43
 * @LastEditTime: 2020-07-24 14:41:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\newApply\components\newUserApply.vue
--> 
<template>
  <div class="newUserApply">
    <div class="handleButton">
      <el-button type="primary">关闭</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="primary">添加人员</el-button>
      <el-button type="primary" v-show="isNeedDelBtn==='1'" @click="delApply()">删除申请</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">新增用户申请表</div>
      <div>
        <h3>
          当前处理人：
          <span :style="{color:'#ff0502'}">admin</span>
        </h3>
        <div class="orgInfoTableBody">
          <m-form
            :formCfg="indexformCfg"
            :formRules="indexformRules"
            :formData="indexformData"
            :showButton="false"
            :isInline="false"
            labelWidth="200px"
          ></m-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from 'components/form/mForm'
export default {
  name: 'newUserApply',
  components: {
    mForm
  },
  props: {
  },
  data () {
    return {
      //控制待办详情页删除按钮
      isNeedDelBtn: '',
      indexformCfg: [
        {
          label: '申请人中文名',
          prop: 'memberName',
          type: 'input',
          width: '65%'
        }, {
          label: '申请人注册名',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        }, {
          label: '创建日期',
          prop: 'uass',
          type: 'input',
          width: '65%'
        }, {
          label: '申请人部门',
          prop: 'department',
          type: 'input',
          width: '65%'
        },
        {
          label: '申请人行名',
          prop: 'memberName',
          type: 'input',
          width: '65%'
        },
        {
          label: '所属管理行',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        },
        {
          label: '用户登录名',
          prop: 'roleName1',
          type: 'input',
          width: '65%',
          additionButtonLabel: '提取用户',
          showAdditionButton: true,
          additionButtonhandel: () => {
            console.log('select')
          }
        },
        {
          label: '用户中文名',
          prop: 'roleName2',
          type: 'input',
          width: '65%'
        },
        {
          label: '所在部门',
          prop: 'roleName',
          type: 'input',
          width: '65%',
          additionButtonLabel: '提取用户',
          showAdditionButton: true,
          additionButtonhandel: () => {
            console.log('select')
          }
        },
        {
          label: '上级部门',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        },
        {
          label: '部门正职',
          prop: 'roleName10',
          type: 'checkbox',
          checkboxs: [
            {
              label: '是',
              value: 1
            }
          ]
        },
        {
          label: '部门副职',
          prop: 'roleName11',
          type: 'checkbox',
          checkboxs: [
            {
              label: '是',
              value: 1
            }
          ]
        },
        {
          label: '部门综合代表',
          prop: 'roleName12',
          type: 'checkbox',
          checkboxs: [
            {
              label: '是',
              value: 1
            }
          ]
        },
        {
          label: '行政岗位属性',
          prop: 'roleName13',
          type: 'checkbox',
          checkboxs: [
            {
              label: '是',
              value: 1
            }
          ]
        },
        {
          label: '部门岗位属性',
          prop: 'roleName14',
          type: 'checkbox',
          checkboxs: [
            {
              label: '是',
              value: 1
            }
          ]
        },
        {
          label: '特殊授权',
          prop: 'roleName15',
          type: 'checkbox',
          checkboxs: [
            {
              label: '直接返回',
              value: 1
            },
            {
              label: '审计部门',
              value: 2
            },
            {
              label: '标识直发',
              value: 3
            }
          ]
        },
        {
          label: '职务',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        }, {
          label: '人员序号',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        }, {
          label: '业务管理员审批',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        }, {
          label: '手机',
          prop: 'roleName',
          type: 'input',
          width: '65%'
        }, {
          label: '系统管理员审批',
          prop: 'roleName',
          type: 'textarea',
          width: '65%'
        }, {
          label: '备注',
          prop: 'roleName',
          type: 'textarea',
          width: '65%'
        },

      ],
      indexformRules: {
        roleName1: [{ required: true, message: '请输入用户登录名', trigger: 'blur' }],
        roleName2: [{ required: true, message: '请输入用户中文名', trigger: 'blur' }]
      },
      indexformData: {
        roleName10: [],
        roleName11: [],
        roleName12: [],
        roleName13: [],
        roleName14: [],
        roleName15: []
      }
    }
  },
  watch: {
  },

  computed: {},
  methods: {
    saveOrgInfo () {
      this.$router.push('/setting/orgDepartment/orgManage/orgManageViewDetail')
    },
    delApply () {
      this.$confirm('确定要删除申请吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '已删除',
          type: 'success'
        })
      }).catch()
    }
  },
  activated () {
  },
  mounted () {
    this.isNeedDelBtn = this.$route.query.isNeedDelBtn ? this.$route.query.isNeedDelBtn : ''
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.newUserApply {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
    }
    h3 {
      margin-left: 9%;
      font-size: 17px;
      line-height: 57px;
    }
    .orgInfoTableBody {
      margin-left: 9%;
    }
  }
}
</style>