/**
* create by zx on 2020-7-8 17:42
* 类注释：
* 备注：
*/
<template>
  <div class="settingSafeLogs">
    <div class="formHeader">
      <div class="title-text">日志安全设置</div>
      <fd-form
        :config="{labelWidth: '200px'}"
        @event="eventClick"
        :data="formData"
        :columns="formCfg"
      ></fd-form>

      <div class="btn">
        <el-button type="primary" @click="canEdit" v-show="this.canInput">编辑</el-button>
        <el-button type="primary" @click="saveDate" v-show="!this.canInput">保存</el-button>
        <el-button type="primary" @click="$router.go(-1)" v-show="!this.canInput">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import Freedomen from "vue-elementui-freedomen";
export default {
  name: "settingSafeLogs",
  components: {
    FdForm,
  },

  props: {},
  data() {
    return {
      canInput: true,
      formCfg: [],
      formData: {},
    };
  },
  computed: {},
  methods: {
    init() {
      this.formCfg = [
        {
          type: "input",
          prop: "cfgShezr",
          label: "设置人",
          span: 24,
          disabled: true,
        },
        {
          type: "date",
          prop: "cfgShezRq",
          label: "日期",
          span: 24,
          disabled: true,
          style: { width: "100%" },
        },

        [
          {
            type: "input",
            prop: "cfgYonghYxzq",
            style: { width: "50%", "margin-right": "15px" },
            disabled: this.canInput,
          },
          { type: "span", value: "天" },
          { type: "formitem", label: "用户有效周期" },
        ],
        [
          {
            type: "input",
            prop: "cfgDongjieTxts",
            style: { width: "50%", "margin-right": "15px" },
            disabled: this.canInput,
          },
          { type: "span", value: "天" },
          { type: "formitem", label: "冻结提醒天数" },
        ],

        {
          type: "check-boxs",
          prop: "cfgTixingFs",
          label: "用户有效提醒方式",
          disabled: this.canInput,
          span: 24,
          options: { 1: "邮件" },
        },
        /* {type: 'radios', prop: '8', label: '登陆日志设置', span: 24, options: {1: '生成', 2: '不生成'}},
          {
            type: 'check-boxs',
            prop: '9',
            label: '用户操作日志启动模块',
            options: '便函管理,通讯录管理,杰弗里斯大,发动机分类架,sad开发了就是啥地方是打发,便函发送管理,通讯录富士达管理,杰弗发里斯大,发动机分类框架,sad开发了就是打发'
          },
          {
            type: 'check-boxs',
            prop: '10',
            label: '用户操作日志启动模块',
            options: '便函管理,通讯录管理,杰弗里斯大,发动机分类框架,sad开发了就是，通讯录富士达管理,杰弗发里斯大就是打发'
          },
          {type: 'input', prop: '11', label: '日志信息过滤字符', span: 24,},
          {type: 'input-area', prop: '12', label: '用户简要密码表', config: {rows: 7}},
          [
            {type: 'input', prop: '13', style: {width: '50%', 'margin-right': '15px'}},
            {type: 'span', value: '天'},
            {type: 'formitem', label: '强制修改密码周期'}
          ],

          [
            {type: 'input', prop: '15', style: {width: '50%', 'margin-right': '15px'}},
            {type: 'button-primary', value: '选择', prop: 'choice'},
            {type: 'formitem', label: '强制修改密码人员岗位', style: {'margin-bottom': '2px'}}
          ],
          {type: 'span', value: '注意：输入的建议密码和日志信息过滤字符分号(;)隔开；设置密码时不要使用分号及空格', style: {'color': 'red',}},*/
        // {
        //   type: "button-primary",
        //   value: "保存",
        //   prop: "toSave",
        //   span: 2,
        //   disabled: this.canInput,
        // },
        // { type: "button-primary", value: "编辑", prop: "toEdit", span: 2 },
      ];
    },
    loadData() {
      this.$api.setting.logs.getJournalList({}).then((res) => {
        if (res.data && res.data.length > 0) {
          this.formData.cfgShezr = res.data[0].cfgShezr;
          this.formData.cfgShezRq = res.data[0].cfgShezRq;
          this.formData.cfgYonghYxzq = res.data[0].cfgYonghYxzq;
          this.formData.cfgDongjieTxts = res.data[0].cfgDongjieTxts;
          this.formData.cfgTixingFs = res.data[0].cfgTixingFs;
          this.formData.id = res.data[0].id;
        }
        this.init();
      });
    },
    canEdit() {
      this.canInput = false;
      this.init();
    },
    eventClick(params) {
      switch (params.prop) {
        case "toSave":
          this.saveDate();
          break;
        case "toEdit":
          this.canEdit();

          break;
      }
    },
    //编辑保存
    saveDate() {
      var arr = this.formData.cfgTixingFs;

      arr.indexOf("1") == -1
        ? (this.formData.cfgTixingFs = "0")
        : (this.formData.cfgTixingFs = "1");

      this.$api.setting.logs.saveJournalList(this.formData).then((res) => {
        this.loadData();
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.canInput = true;
        this.init();
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.btn {
  margin-left: 198px;
}
</style>
