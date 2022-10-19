<template>
  <div class="check">
    <el-row>
      <!-- <el-button type="primary" @click="chose">
            起草
      </el-button>-->
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane  name="tabs-look">
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
        <div class="qicao" style="margin:10px 0 20px">
          <el-button type="primary" @click="chose">起草</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已办" name="tabs-sleep">
      </el-tab-pane>
      <el-tab-pane label="办结" name="tabs-file">
        <!-- <div class="qicao" style="margin:10px 0 20px">
          <el-button type="primary" @click="returned">退回</el-button>
        </div>-->
      </el-tab-pane>
    </el-tabs>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      :isSelection="true"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :searchData="searchData"
      :tableRowClassNames="tableRowClassName"
    ></m-table>
    <el-dialog title="选择拟稿部门" :visible.sync="dialogVisible" v-dialogDrag>
      <choseDepart ref="choseDepart" @closeDialog="closeDialog"/>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import choseDepart from "./choseDepart.vue";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
// import searchForm from "components/form/searchForm";
export default {
  name: "departInfoindex",
  components: {
    mTable,
    choseDepart
    // searchForm,
  },
  props: {},
  mixins: [bianhanPublic],
  data() {
    return {
      curUserCode: JSON.parse(localStorage.getItem('userInfo')).humanCode,
      needTodoNum:'',//代办条数
      dialogVisible:false,
      activeName: "tabs-look",
      formData: {},
      searchData: {},
      type: "todo",
      tableData: [],
      tableCols: [
        { label: "拟稿日期", prop: "drafTime" },
        { label: "标题", prop: "title" },
        { label: "简报编号", prop: "jbNo" },
        { label: "拟稿部门", prop: "drafDepNm" },
        { label: "当前环节", prop: "curNodeName" },
        { label: "操作人", prop: "curUsernm" }
      ],
      tableCols0: [
        { label: "拟稿日期", prop: "drafTime" },
        { label: "标题", prop: "title" },
        { label: "简报编号", prop: "jbNo" },
        { label: "拟稿部门", prop: "drafDepNm" },
        { label: "当前环节", prop: "curNodeName" },
        { label: "操作人", prop: "curUsernm" }
      ],
      tableCols1: [
        { label: "拟稿日期", prop: "drafTime" },
        { label: "标题", prop: "title" },
        { label: "简报编号", prop: "jbNo" },
        { label: "拟稿部门", prop: "drafDepNm" },
        { label: "当前环节", prop: "curNodeName" },
        { label: "操作人", prop: "curUsernm" }
      ],
      tableCols2: [
        { label: "发布日期", prop: "pubTime", width:'200px'},
        { label: "简报编号", prop: "jbNo" },
        { label: "标题", prop: "title" }
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
      options: [],
      value: "",
      deleteArry: "",
      chedata:[]//撤回数据结合
    };
  },
  computed: {},
  methods: {
    tableRowClassName(row) {
      console.log(this.type)
      if (row.haveRead !== '1' && row.curUserid == this.curUserCode && this.type == 'todo') {
        return 'warning-row'
      }
    },
    chose() {
      this.dialogVisible = true
    },
    closeDialog(){
      this.dialogVisible=false
    },
    //点击导航条切换
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.type = "todo";
        this.pagination.pageNum = 1;
        this.loadData(this.type);
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols1);
        this.type = "";
        this.pagination.pageNum = 1;
        this.loadData(this.type);
      } else {
        this.tableCols = deepClone(this.tableCols2);
        this.type = "finish";
        this.pagination.pageNum = 1;
        this.loadData(this.type);
      }
    },
    loadData() {
      this.searchData.type = this.type;
      this.$api.pubInfo
        .getJbList(
          { ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.data.total;
          this.tableData = res.data.page;
          if(this.activeName=="tabs-look"){
            this.needTodoNum = res.data.total
          }
        });
    },
    cellClick(row) {
      if(this.activeName=="tabs-look"){
        this.hasOpened(row.depInfoPubId,{
            'path':'/publication/departInfo/depart',
            'query': { depInfoPubId: row.depInfoPubId,id:row.depInfoPubId }
          })
        // this.$intent.goNewPage(this, {path:'/publication/departInfo/depart',query:{depInfoPubId: row.depInfoPubId}});
      }else if(this.activeName=="tabs-sleep"){
        this.$intent.goNewPage(this, {path:'/publication/departInfo/departfinish',query:{depInfoPubId: row.depInfoPubId,type:'01'}});
      }else if(this.activeName=="tabs-file"){
        this.$intent.goNewPage(this, {path:'/publication/departInfo/departfinish',query:{depInfoPubId: row.depInfoPubId,type:'02'}});
      }
    },
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




