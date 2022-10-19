<!--
 * @Author: nwl
 * @Date: 2020-08-04 17:15:18
 * @LastEditTime: 2020-10-27 16:14:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\otherconfig\designElementSetting.vue
-->
<template>
  <div class="content">
    <p class="base-title">业务分类配置</p>
    <!-- 顶部按钮 -->
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">保存</el-button>
    </div>
    <!-- 第一行的输入表单 -->
    <div class="box">
      <fd-form :data="formData" :columns="formConfig" @event="btnEvent"></fd-form>
    </div>
    <!-- 第一行下边的输入表单 -->
    <div class="box1">
      <div class="infotable">
        <fd-form :data="formData1" :columns="formCfg1" ref="ctrlForm" @event="form1Event"></fd-form>
        <!-- table表格  -->
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @cellClick="cellClick"
          @select="select"
        ></m-table>
      </div>
      <!-- 右边按钮  -->
      <div class="btn-aside">
        <div class="top">
          <el-button type="primary" plain @click="dialogFormVisible=true">选择</el-button>
        </div>
        <div class="bottom">
          <el-button type="primary" plain @click="btnAdd" id="thetopbtn" :disabled="onOff">添加</el-button>
          <el-button type="primary" plain @click="btnUpdate">更新</el-button>
          <el-button type="primary" plain @click="btnDel">删除</el-button>
          <el-button type="primary" plain @click="btnUpMove">上移</el-button>
          <el-button type="primary" plain @click="btnDownMove">下移</el-button>
        </div>
      </div>
      <div></div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="设计元素集合设置" :visible.sync="dialogFormVisible" center>
      <div class="choRadios">
        <span id="formDia">
          <fd-form :data="formDataDia" :columns="formConfigDia" @event="choose"></fd-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmDia">确定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "@/components/table/tTable";

export default {
  name: "businessClassifySet",
  components: {
    FdForm,
    mTable,
  },
  data () {
    return {
      hDesignSetId: [],
      totalData: [],
      testId: [],
      id: "",
      it: "",
      appElementSets: "",
      checkConfig: { labelWidth: "0px" },
      testArr: [],
      onOff: false,
      idx: "",
      rows: [],
      selected: "",
      formData: {},
      formConfig: [],
      dialogFormVisible: false,
      totalArr: [],
      getArr: [],
      formDataDia: {},
      formConfigDia: [],
      formData1: {},
      formCfg1: [
        {
          type: "input",
          label: "设计元素集合",
          prop: "appElementSets",
          span: 24,
          disabled: true,
        },
        {
          type: "select",
          prop: "hDesignSetText",
          span: 6,
          options: {},
          label: "设计元素集合",
        },
        { type: "input", label: "业务名称", prop: "hAppName", span: 6 },
        { type: "input", label: "业务ID", prop: "hAppId", span: 6 },
        {
          type: "select",
          prop: "hLevel",
          span: 6,
          options: { 一级: "一级", 二级: "二级", 分支: "分支" },
          label: "业务级别",
        },
      ],

      tableCols: [
        { label: "业务名称", prop: "hAppName" },
        { label: "业务ID", prop: "hAppId" },
        { label: "业务级别", prop: "hLevel" },
        { label: "设计元素集合", prop: "hDesignSetText" },
      ],
      tableData: [],
      pagination: {
        pageNum: 1,
        total: 3,
      },
    };
  },

  methods: {
    makeUpMove (selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == 0) {

          this.$message({
            type: "warning",
            message: "第一条数据不可以上移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "上移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据",
        });
        return;
      }
    },
    makeDownMove (selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == DataName.length - 1) {
          this.$message({
            type: "warning",
            message: "最后一条数据不可以下移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index + 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "下移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据",
        });
        return;
      }
    },
    select (rows) {
      this.rows = rows;
    },
    form1Event (params) {
      if (params.prop == 'hDesignSetText') {
        this.formData1.hAppName = params.value
        for (var j = 0; j < this.totalData.length; j++) {
          if (params.value == this.totalData[j].designSetName) {
            this.formData1.hAppId = this.totalData[j].designSetId
            break;
          }
        }
      }
    },
    cellClick (row) {
      debugger
      this.onOff = true;
      this.idx = row.index;
      this.formData1 = {
        hAppId: row.hAppId,
        hAppName: row.hAppName,
        hDesignSetText: row.hDesignSetText,
        hLevel: row.hLevel,
        appElementSets: this.selected || this.appElementSets,
      };
    },
    confirmDia () {
      this.dialogFormVisible = false;
      this.formData1 = {
        appElementSets: this.selected || this.appElementSets,
        hAppName: "",
        hAppId: "",
        hLevel: "",
        hDesignSetText: "",
      };
      this.initData1();
    },
    choose (e) {
      this.selected = e.row.checkBoxs1.join(",");
      // console.log(this.selected);
    },
    initData1 () {//配置设计元素集合下拉菜单
      this.formCfg1 = [
        {
          type: "input",
          label: "设计元素集合",
          prop: "appElementSets",
          span: 24,
          disabled: true,
        }, {
          type: "select",
          prop: "hDesignSetText",
          span: 6,
          options: this.selected || this.appElementSets,
          label: "设计元素集合",

        },
        { type: "input", label: "业务名称", prop: "hAppName", span: 6, disabled: true, },
        { type: "input", label: "业务ID", prop: "hAppId", span: 6, disabled: true, },
        {
          type: "select",
          prop: "hLevel",
          span: 6,
          options: { 一级: "一级", 二级: "二级", 分支: "分支" },
          label: "业务级别",
        },

      ];
    },
    initData () {//配置模块名称下拉菜单
      this.formConfig = [
        {
          type: "select",
          prop: "moduleName",
          span: 5,
          options: this.getArr.join(','),
          label: "模块名称",
        },
        {
          type: "input",
          label: "模块关键字",
          prop: "moduleId",
          span: 5,
          disabled: true,
        },
        {
          type: "input",
          prop: "appCat",
          span: 5,
          label: "业务名称",
        },
        {
          type: "input",
          prop: "appCatShortName",
          span: 5,
          label: "业务标识",
        },

        {
          type: "radios",
          prop: "isAvailable",
          options: { 1: "是", 0: "否" },
          span: 4,
          label: "是否启用",
        },
      ];
    },

    initDataDia () {//给弹窗添加字段
      this.formConfigDia = [
        {
          type: "check-boxs",
          prop: "checkBoxs1",
          options: this.testArr.join(","),
        },
      ];
    },
    closedata () {
      this.$router.go(-1);
    },
    editordata () {
      if (!this.formData.moduleName) {
        this.$alert("模块名称不能为空！请选择", "警告", {
          confirmButtonText: "确定",
          callback: () => {

          },
        });
        return
      }
      if (!this.formData.appCat) {
        this.$alert("业务名称不能为空！请选择", "警告", {
          confirmButtonText: "确定",
          callback: () => {

          },

        });
        return
      } else if (!this.formData.appCatShortName) {
        this.$alert("业务标识不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {

          },
        });
        return
      } else if (!this.formData.isAvailable) {
        this.$alert("请选择是否启用", "警告", {
          confirmButtonText: "确定",
          callback: () => {

          },
        });
        return
      } else if (!this.formData1.appElementSets) {
        this.$alert("请选择设计元素集合", "警告", {
          confirmButtonText: "确定",
          callback: () => {

          },
        });
        return;
      }
      var appElementSets = this.formData1.appElementSets;
      var hAppName = this.tableData.map((item) => item.hAppName);
      var hAppId = this.tableData.map((item) => item.hAppId);
      var hLevel = this.tableData.map((item) => item.hLevel);
      var hDesignSetText = this.tableData.map((item) => item.hDesignSetText);
      var qqqhDesignSetText = this.tableData.map((item) => item.hDesignSetText);
      for (var i = 0; i < hDesignSetText.length; i++) {
        for (var j = 0; j < this.totalData.length; j++) {
          if (hDesignSetText[i] == this.totalData[j].designSetName) {
            this.hDesignSetId.push(this.totalData[j].designSetId);
            break;
          }
        }
      }
      console.log(this.hDesignSetId)
      if (this.id) {
        this.$api.designDictionary
          .businessClassifyAdd({
            id: this.id,
            appCat: this.formData.appCat,
            appCatShortName: this.formData.appCatShortName,
            isAvailable: this.formData.isAvailable,
            appElementSets: appElementSets,
            hAppName: hAppName.join(","),
            hAppId: hAppId.join(","),
            hLevel: hLevel.join(","),
            hDesignSetText: qqqhDesignSetText.join(","),
            hDesignSetId: this.hDesignSetId.join(","),
            moduleName: this.formData.moduleName,
            moduleId: this.formData.moduleId
          })
          .then((res) => {
            if (res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "更新成功",
              });
              this.$router.go(-1);
            }
          });
      } else {
        this.$api.designDictionary
          .businessClassifyAdd({
            appCat: this.formData.appCat,
            appCatShortName: this.formData.appCatShortName,
            isAvailable: this.formData.isAvailable,
            appElementSets: appElementSets,
            hAppName: hAppName.join(","),
            hAppId: hAppId.join(","),
            hLevel: hLevel.join(","),
            hDesignSetText: qqqhDesignSetText.join(","),
            hDesignSetId: this.hDesignSetId.join(","),
            moduleName: this.formData.moduleName,
            moduleId: this.formData.moduleId
          })
          .then((res) => {
            if (res.code == "SUCCESS") {
              this.$message({
                type: "success",
                message: "保存成功",
              });
              this.$router.go(-1);
            }
          });
      }
    },
    btnEvent (e) {//给模块关键字赋值且他不可以被编辑
      /* if (e.prop == "appCat") {
           let selected = e.row.appCat;
           this.formData.appCatShortName = this.totalArr[
               this.getArr.indexOf(selected)
               ].moduleKeyWord;
           this.initData();
       }*/
      if (e.prop == "moduleName") {
        let moduleId = ""
        this.totalArr.forEach(item => {
          if (item.moduleName == e.row.moduleName) {
            moduleId = item.moduleKeyWord
          }
        })
        this.$set(this.formData, "moduleId", moduleId)
        this.initData();
      }

    },
    loadData () {
    },
    getRowDatas (row) {
    },
    btnAdd () {//添加事件
      // console.log(this.formData1);
      if (!this.formData1.appElementSets) {
        this.$alert("设计元素集合不能为空！请选择", "警告", {
          confirmButtonText: "确定",
          callback: () => {
          },
        });
      } else if (!this.formData1.hAppName) {
        this.$alert("业务名称不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {
          },
        });
      } else if (!this.formData1.hAppId) {
        this.$alert("业务ID不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {
          },
        });
      } else if (!this.formData1.hLevel) {
        this.$alert("业务级别不能为空！请输入", "警告", {
          confirmButtonText: "确定",
          callback: () => {
          },
        });
      } else if (!this.formData1.hDesignSetText) {
        this.$alert("请选择设计元素集合", "警告", {
          confirmButtonText: "确定",
          callback: () => {
          },
        });
      } else {//判断不可重复
        var hAppNameRepeat = this.tableData.some((item) => {
          return item.hAppName == this.formData1.hAppName;
        });
        var hAppIdRepeat = this.tableData.some((item) => {
          return item.hAppId == this.formData1.hAppId;
        });
        if (hAppNameRepeat) {
          this.$message({
            message: "添加失败，业务名称已经存在",
            type: "error",
          });
          return;
        }
        if (hAppIdRepeat) {
          this.$message({
            message: "添加失败，业务ID已经存在",
            type: "error",
          });
          return;
        }
        this.tableData.push(JSON.parse(JSON.stringify(this.formData1)));//新增数据push到表格数组
        this.$message({
          title: "成功",
          message: "添加成功",
          type: "success",
        });
        this.$refs.ctrlForm.reset();//置空输入框
        this.formData1 = {
          hAppId: "",
          hAppName: "",
          hDesignSetText: "",
          hLevel: "",
          appElementSets: this.selected || this.appElementSets,
        };
        this.initDataDia();
      }
    },
    btnChoose () {
    },
    btnUpdate () {//更新事件
      if (this.idx !== "") {
        let startIndex = this.idx;
        this.tableData.splice(
          startIndex,
          1,
          JSON.parse(JSON.stringify(this.formData1))
        );
        this.$message({
          type: "success",
          message: "更新成功",
        });
        this.$refs.ctrlForm.reset();
        this.formData1 = {
          hAppId: "",
          hAppName: "",
          hDesignSetText: "",
          hLevel: "",
          appElementSets: this.selected || this.appElementSets,
        };
        this.idx = "";
        this.onOff = false;
      } else {
        this.$message({
          type: "warning",
          message: "请单击需要更新的数据",
        });
      }
    },
    btnDel () {//删除事件
      let theLength = this.rows.length;
      if (theLength) {
        let rows = this.rows

        function compare (prop) {
          return function (a, b) {
            let value1 = a[prop]
            let value2 = b[prop]
            return value2 - value1
          }
        }

        rows.sort(compare('index'))
        rows.map(item => {
          this.tableData.splice(item.index, 1)
        })
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.rows = [];
        this.idx = "";
      } else {
        this.$message({
          type: "warning",
          message: "请至少选中一条数据",
        });
      }
    },
    btnUpMove () {//上移
      this.makeUpMove(this.rows, this.tableData);
    },
    btnDownMove () {//下移
      this.makeDownMove(this.rows, this.tableData);
    },
    getData () {//通过接口获取模块名称
      this.$api.designDictionary
        .moduleSettingList2({ moduleConfig: {} })
        .then((res) => {
          this.totalArr = res.data;
          this.getArr = res.data.map((item) => item.moduleName);
          this.initData();
        });
    },
  },
  mounted () {
  },
  created () {
    this.it = this.$route.query.it;
    this.getData();
    this.$api.designDictionary//给弹窗里边的多选框赋值
      .designElementList({ designConfigOrderVo: {} })
      .then((res) => {
        this.testArr = res.data.map((item) => item.designSetName);
        this.totalData = res.data;
        // console.log(this.testId)
        this.initDataDia();
      });
    if (this.it) {
      this.$api.designDictionary
        .businessClassifyDetail({ appCatShortName: this.it })
        .then((res) => {
          this.tableData = res.data.hAppList;
          this.formData = res.data;
          this.formData1 = {
            hAppId: "",
            hAppName: "",
            hDesignSetText: "",
            hLevel: "",
            appElementSets: res.data.appElementSets,
          };
          this.id = res.data.id;
          // hDesignSetList
          this.appElementSets = res.data.appElementSets;
          this.initData1();
          // console.log(res.data.appElementSets)
          this.formDataDia.checkBoxs1 = res.data.appElementSets;
          this.initDataDia();
        });
    }
  },
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  line-height: 36px;

  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }

  .btn-list {
    margin-bottom: 20px;
  }

  .box {
    margin: 0 auto;
  }

  .box1 {
    width: 100%;
    height: 100%;
    display: flex;

    .infotable {
      width: 92%;
    }

    .btn-aside {
      display: flex;
      flex-direction: column;

      .top {
        height: 58px;
        display: flex;
        justify-content: center;

        .el-button {
          height: 36px;
        }
      }

      .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        #thetopbtn {
          margin-top: 0;
        }

        .el-button {
          margin: 8px;
        }
      }
    }
  }

  /deep/ #formDia .el-form-item__content {
    margin-left: 0 !important;

    .el-checkbox {
      width: 20%;

      .el-checkbox__label {
        width: 100%;
        white-space: pre-wrap;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
