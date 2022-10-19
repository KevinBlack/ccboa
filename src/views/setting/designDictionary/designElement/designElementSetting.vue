<!--
 * @Author: nwl
 * @Date: 2020-08-04 17:15:18
 * @LastEditTime: 2020-08-06 15:48:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\otherconfig\designElementSetting.vue
--><template>
  <div class="content">
    <p class="base-title">设计元素集合配置</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">保存</el-button>
    </div>
    <div class="box">
      <fd-form :data="formData" :columns="formCfg" @submit="btnEvent"></fd-form>
    </div>
    <div class="box1">
      <div class="infotable">
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
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" @click="btnAdd">添加</el-button>
        <el-button type="primary" @click="btnUpdate">更新</el-button>
        <el-button type="primary" @click="btnDel">删除</el-button>
        <el-button type="primary" @click="btnUpMove">上移</el-button>
        <el-button type="primary" @click="btnDownMove">下移</el-button>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "@/components/table/tTable";

export default {
  name: "designElementSetting",
  components: {
    FdForm,
    mTable,
  },
  data () {
    return {
      formData: {},
      formCfg: [
        { type: "input", label: "序号", prop: "1", span: 8, rule: "must" },
        { type: "input", label: "集合名称", prop: "2", span: 8, rule: "must" },
        { type: "input", label: "集合ID", prop: "3", span: 8, rule: "must" },
        { type: "input", label: "投稿部门", prop: "4", span: 24 },
        { type: "input", label: "中文名", prop: "5", span: 8 },
        { type: "input", label: "英文名", prop: "6", span: 8 },
        {
          type: "select",
          prop: "select",
          span: 8,
          options: { 可编辑: "可编辑", 计算: "计算" },
          label: "域类型",
        },
      ],

      tableCols: [
        { label: "设计元素中文名", prop: "designChName" },
        { label: "设计元素英文名", prop: "designEnName" },
        { label: "域类型", prop: "types" },
      ],
      tableData: [
        { designChName: "银行", designEnName: "Bank", types: "可编辑" },
        { designChName: "银行", designEnName: "Bank", types: "可编辑" },
        { designChName: "银行", designEnName: "Bank", types: "可编辑" },
        { designChName: "银行", designEnName: "Bank", types: "可编辑" },
        { designChName: "银行", designEnName: "Bank", types: "可编辑" },
      ],
      pagination: {
        pageNum: 1,
        total: 3,
      },
    };
  },

  methods: {
    closedata () {
      console.log("关闭");
      this.$router.push("/setting//sysConfig/database");
    },
    editordata () {
      console.log("编辑");
      this.$router.push("/setting/sysConfig/database/databaseEditor");
    },
    btnEvent (parmas) {
      console.log("------params------->", params);
    },
    loadData () { },
    getRowDatas (row) { },
    btnAdd (parmas) {
      console.log("------------添加按钮------------", this.formData);
      let routerJump = this.$router.resolve({
        path: "/setting/designDictionary/designElement/designElementAdd",
        query: {},
      });
      window.open(routerJump.href, "_blank");

      // var a=this.formData
      // this.tableData.push({ designChName: a[5], designEnName: a[6], types: a["select"] },)
    },
    btnUpdate () {
      console.log("------------更新按钮------------");
    },
    btnDel () {
      console.log("------------删除按钮------------");
    },
    btnUpMove () {
      console.log("------------上移按钮------------");
    },
    btnDownMove () {
      console.log("------------下移按钮------------");
    },
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
      flex: 1;
      //  border: 1px solid hotpink;
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-button {
        margin: 8px;
      }
    }
  }
}
</style>