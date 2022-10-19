<template>
  <div class="useSealForm">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>用印管理</span>
      </div>
      <div class="right">
        <el-button
          v-for="(item, index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
          >{{ item }}</el-button
        >
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行用印审批单</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>立项登记</span>
          </p>
          <p>
            当前处理人：
            <span>测试</span>
          </p>
        </div>
        <div class="feed_back">
          <p>
            是否跨行：
            <span>是</span>
          </p>
        </div>
      </div>

      <fd-form
        ref="fdForm"
        style="margin: 30px 0 10px 0"
        :data="formdata"
        :columns="formCfg"
        :config="{ labelWidth: '166px' }"
      ></fd-form>
      <!-- 用印事由 -->
      <div class="useSealReason">
        <div class="useSealReasonTop">
          <div class="uSRLabel">
            <span>用印材料信息</span>
          </div>
          <div class="reasonTable">
            <div class="handelButton">
              <el-button type="primary" @click="addUSRTableInfo()"
                >增加</el-button
              >
              <el-button type="primary">导入合同材料</el-button>
              <el-button type="primary">查看合同</el-button>
              <el-button type="primary">删除</el-button>
            </div>
          </div>
        </div>
        <div style="paddingleft: 166px; margin: -25px 0 19px 0">
          <el-table
            border
            :data="tableData"
            :style="{ width: '100%' }"
            :header-row-style="{ textAlign: 'center' }"
          >
            <el-table-column type="selection" width="50px"></el-table-column>
            <el-table-column
              type="index"
              width="60"
              label="序号"
            ></el-table-column>
            <el-table-column label="用印材料标题">
              <template slot-scope="scope">
                <el-input v-model="scope.row.title"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="用印性质">
              <template slot-scope="scope">
                <el-input v-model="scope.row.title1"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="份数">
              <template slot-scope="scope">
                <el-input v-model="scope.row.title2"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="每份材料用印名称及个数">
              <template>
                <el-button type="primary">用印选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <fd-form
        ref="fdForm1"
        style="margin: 0 0 10px 0"
        :data="formdata"
        :columns="formCfg1"
        :config="{ labelWidth: '166px' }"
      ></fd-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: 'useSealForm',
  components: {
    FdForm
  },
  data () {
    return {
      buttonList: ['关闭', '保存', '完成并发送', '收藏', '查看流程', '打印处理单', '查看合同', '操作指南'],
      formdata: {},

      formCfg: [
        { type: 'input', prop: 'title', label: '申请时间', span: 8, disabled: true },
        { type: 'input', prop: 'documentNo', label: '用印时间', span: 8, disabled: true },
        { type: 'radios', prop: 'draftTime', label: '用印材料是否密料', config: { labelWidth: '75px' }, options: '是,否', span: 8, labelWidth: '300px' },
        { type: 'input', prop: 'title', label: '用印部门', span: 8 },
        { type: 'input', prop: 'documentNo', label: '经办人', span: 8 },
        { type: 'input', prop: 'draftTime', label: '联系电话', span: 8 },
        [
          { type: 'select', prop: 'draftTime', span: 24, style: { width: '61%' } },
          { type: 'span', value: '[2020]编号', style: { marginLeft: '12px' } },
          { type: 'formitem', label: '编号' }
        ],
        { type: 'input', prop: 'draftTime', label: '标题', span: 24 },
        { type: 'input-area', prop: 'draftTime', label: '用印事由', span: 24, config: { rows: 5 } },
        { type: 'radios', options: '系统内,系统外', prop: 'draftTime', label: '发往单位类型', span: 24 },
        { type: 'input', prop: 'draftTime', label: '发往单位', span: 24 },
        [
          { type: 'button-primary', value: '引入', span: 24 },
          { type: 'button-primary', value: '删除', style: { marginLeft: '12px' } },
          { type: 'formitem', label: '法律审查单编号' }
        ]
      ],
      formCfg1: [
        { type: 'input', prop: 'draftDepartment', label: '用印方式', span: 24, disabled: true },
        { type: 'input', prop: 'draftTime', label: '用印单位负责人审核意见', span: 24, disabled: true },
        { type: 'input', prop: 'draftUser', label: '法律审查意见', span: 24, disabled: true },
        { type: 'input', prop: 'phone', label: '有权审批人审批', span: 24, disabled: true },
        { type: 'input', prop: 'phone', label: '监印人审核', span: 24, disabled: true },
        [
          { type: 'checkbox', prop: 'phone', label: '本人承诺本申请单附件与用印纸质材料内容保持一致', span: 24 },
          { type: 'formitem', label: '经办人承诺' }
        ],
        [
          { type: 'input-area', prop: 'phone' },
          { type: 'span', value: '引入附件文件名（包括压缩包的文件名）不能包含以下半角符号：空格\\/,“：；”？<>|.%\'-', style: { color: '#ff0502' } },
          { type: 'formitem', label: '备注' }
        ],
        [
          { type: 'input', prop: 'phone', span: 24, style: { width: '85%', margin: '0 12px 10px 0' } },
          { type: 'button-primary', value: '浏览', style: { marginRight: '12px' } },
          { type: 'button-primary', value: '引入', style: { marginLeft: '0px' } },
          { type: 'button-primary', value: '删除' },
          { type: 'button-primary', value: '排序' },
          { type: 'formitem', label: '附件上传' }
        ]

      ],

      //用印材料信息表
      tableData: [{
        title: 'MsWang',
        title1: 'web',
        title2: ''
      }]

    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    //用印材料信息->增加
    addUSRTableInfo () {
      this.tableData.push({
        title: '',
        title1: '',
        title2: ''
      })
    }
  }


}
</script>
<style lang="less">
.useSealForm {
  background: white;
  min-height: 1000px;
  margin: 0 auto;

  .el-form-item {
    margin-bottom: 19px;
  }
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      cursor: pointer;
      margin-left: 20px;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 5px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      padding-right: 10px;
      width: 97%;
      margin-left: 3%;
      height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .el-radio-group {
        margin-top: 9px !important;
        margin-right: 12px !important;
      }

      .el-radio {
        margin-right: 0 !important;
        margin-left: 16px !important;
      }

      .cur_sess {
        float: left;
        display: flex;
        margin-top: 12px;

        p {
          line-height: 6px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;

          span {
            color: #f9aa21;
          }
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        line-height: 30px;
        line-height: 6px;
        color: #0f100e;
        margin-top: 12px;
        span {
          color: #f9aa21;
        }
      }
    }
    .form_taxt {
      width: 90%;
      height: 100%;
      margin: 0 auto;

      .el-form-item__label {
        text-align: left !important;
      }

      .annex_btn_list {
        width: 86%;
        margin: 0 auto;
        margin-top: 16px;
        display: flex;

        div {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #0562c7;
          color: #fff;
          border-radius: 5px;
          margin-left: 16px;
          cursor: pointer;
        }

        div:nth-child(4) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }

        div:nth-child(5) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }
      }
    }

    .editor_box {
      height: 450px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
    }

    .useSealReasonTop {
      margin-bottom: 25px;
      display: flex;

      .uSRLabel {
        padding-right: 12px;
        text-align: right;
        width: 166px;
        font-size: 14px;
        line-height: 36px;
        color: #606266;
      }
      .reasonTable {
        flex: 1;
        .handelButton {
          float: right;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
