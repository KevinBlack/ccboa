<!--
 * @Author: wy
 * @Date: 2020-07-17 16:47:38
 * @LastEditTime: 2021-02-26 18:10:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\vDWorkCommFormSave.vue
-->
<template>
  <div class="vDWorkCommFormSave">
    <div class="handleButton">
      <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
      <el-button type="primary" @click="saveRegInfo()">保存</el-button>
      <el-button type="primary" @click="send()">发送</el-button>
      <el-button type="primary" @click="cancellation()">作废</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">工作交流单</div>
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
    <!-- 发送（选择下一处理人）弹框 -->
    <el-dialog
      title="选择下一处理人"
      :visible.sync="dialogSelectStaff"
      class="dialogSelectStaff"
      width="80%"
    >
      <el-card class="box-card" header="选择部门">
        <el-select v-model="value" placeholder="请选择" :style="{width:'80%',marginRight:'10px'}">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary">引用常用发送对象</el-button>
      </el-card>
      <el-card class="box-card" header="选择处理人">
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
      </el-card>

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
  name: 'vDWorkCommFormSave',
  components: {
    mForm,
    // treeTransfer
  },
  props: {},
  data () {
    return {
      formCfg: [
        {
          label: '主题',
          prop: 'memberName',
          type: 'input',
          width: '100%'
        },
        {
          label: '内容',
          prop: 'memberName',
          type: 'textarea',
          width: '100%'
        }, {
          label: '回复信息',
          prop: 'roleName',
          type: 'input',
          width: '100%'
        },
        {
          label: '附件',
          prop: 'roleName',
          type: 'input',
          width: '91%',
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
      //发送弹窗选择部门
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
      }],
      value: '',
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
    //保存
    saveRegInfo () {
      this.$router.push(
        { path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommFormLastSave' }
      )
    },
    //发送
    send () {
      this.dialogSelectStaff = true

    },
    //作废
    cancellation () {
      this.$message({
        message: '文档删除成功！',
        type: 'success'
      })
    },
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
      this.$confirm(`是否发送给处理？`, {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `成功发送给admin`
        })
      }).catch()

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
.vDWorkCommFormSave {
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
      padding: 0 4%;
      margin-left: -4%;
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
  .box-card {
    margin-bottom: 10px;
  }
}
</style>
