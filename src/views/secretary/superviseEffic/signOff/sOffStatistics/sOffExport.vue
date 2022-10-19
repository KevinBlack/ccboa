<!--
 * @Author: wy
 * @Date: 2020-07-30 14:43:08
 * @LastEditTime: 2020-07-31 10:29:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\signOff\sOffStatistics\sOffExport.vue
--> 
<template>
  <div class="sOffExport">
    <div class="handleButton">
      <el-button type="primary">开始导出</el-button>
      <el-button type="primary">取消</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">会签行签报条目统计结果</div>
      <div>
        <div class="orgInfoTableBody">
          <m-form
            :formCfg="indexformCfg"
            :formData="indexformData"
            :showButton="false"
            :isInline="false"
            labelWidth="260px"
          ></m-form>
          <div class="tips">提示：此处涉及的督办时间为统计口径</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mForm from 'components/form/mForm'
export default {
  name: 'sOffExport',
  components: {
    mForm
  },
  props: {},
  data () {
    return {
      // 机构索引信息
      indexformCfg: [
        {
          label: '导出类型',
          prop: 'memberName',
          type: 'radio',
          radios: [
            {
              label: '按拟稿部门',
              value: '0'
            },
            {
              label: '按会签部门',
              value: '1'
            }
          ]
        },
        {
          label: '签报类型',
          prop: 'memberName',
          type: 'radio',
          radios: [
            {
              label: '全部',
              value: '0'
            },
            {
              label: '请示',
              value: '1'
            },
            {
              label: '报告',
              value: '2'
            }
          ]
        },
        {
          label: '发送会签时间',
          prop: 'memberName',
          type: 'datetimerange',
          width: '430px'
        }
      ],
      indexformData: {}
    }
  },
  computed: {},
  methods: {

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
.sOffExport {
  min-height: 100vh;
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
    .orgInfoTableBody {
      margin-left: 9%;
      .tips {
        padding-left: 26%;
        margin-top: -7px;
        margin-bottom: 12px;
        font-size: 12px;
        color: #ff0502;
      }
    }
  }
}
</style>