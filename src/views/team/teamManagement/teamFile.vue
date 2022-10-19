<template>
  <div class="am_warp">
    <el-container>
      <el-aside>
        <div class="tree_box">
          <!-- <div class="tree_header">
            <el-button type="primary" size="mini" @click="dilalogTeam('add')">组建团队</el-button>
            <el-button type="primary" size="mini" @click="joinTeam">加入团队</el-button>
          </div>-->
          <!-- <el-scrollbar style="height:100%"> -->
          <el-tree
            class="box_shadow"
            :data="subtreeData"
            :check-strictly="true"
            ref="comptree"
            :highlight-current="true"
            @check-change="checkTree"
            node-key="id"
            :default-expand-all="true"
            :default-expanded-keys="[2, 3]"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :props="defaultProps"
          >
            <span class="span-ellipsis" slot-scope="{ node}">
              <span :title="node.label">{{node.label}}</span>
            </span>
          </el-tree>
          <!-- </el-scrollbar> -->
        </div>
      </el-aside>
      <el-main style="width:65%">
        <div class="table_header">
          <div class="btn_div">
            <button
              v-for="(item,index) in buttonList"
              :class="index==activeIndex?'activeClass':''"
              :key="index"
              @click="btnClick(index)"
            >{{item}}</button>
          </div>
        </div>
        <div v-show="activeIndex==4">
          <!-- <el-row>

          <el-row>-->
          <div class="work_record">
            <div class="search">
              <span>页面</span>
              <el-input v-model="input" style="margin-left:10px;margin-right:10px"></el-input>
              <el-button type="primary" @click="recordSearch">搜索</el-button>
            </div>
            <div class="record_title">
              <span>标题:</span>&nbsp;&nbsp;
              <span>{{fileTitle}}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="float:right">
                <span>创建人:</span>&nbsp;&nbsp;
                <span style="margin-right:50px">{{contentDetail.createName}}</span>
                <span>创建时间:</span>&nbsp;&nbsp;
                <span style="margin-right:70px">{{contentDetail.createTime}}</span>
              </span>
            </div>
            <div class="content">
              <div class="edit">{{contentDetail.content}}</div>
              <div class="list_ul">
                <el-scrollbar style="padding:5px;">
                  <div class="item" v-for="(item,index) in dataList" :key="index">
                    <el-tooltip effect="dark" :content="item.title" placement="left-start">
                      <div class="item" @click="getContentData(item.id,item.title)">{{item.title}}</div>
                    </el-tooltip>
                  </div>
                </el-scrollbar>
              </div>
            </div>
            <div class="info_w">
              <div class="info">消息交流</div>
              <div class="info_text"></div>
            </div>
          </div>
        </div>
        <div v-show="activeIndex!=4">
          <div class="search_warp">
            <span>创建人</span>
            <el-input placeholder="请输入内容" clearable v-model="searchInput" class="searchInput"></el-input>
            <el-button type="primary" style="margin-left:10px" @click="searchClick">搜索</el-button>
            <el-button type="primary" style="float:right" @click="exportData">导出</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            id="table"
            tooltip-effect="dark"
            style="width: 100%"
            class="scroll"
            height="400"
            @cell-click="gotoDetail"
          >
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <!-- <el-table-column label="创建人">
              <template slot-scope="scope">
                <span style="cursor:pointer" @click="gotoDetail(scope.row.id)">{{scope.row.createUserName}}</span>
              </template>
            </el-table-column>-->
            <el-table-column prop="createUserName" label="创建人"></el-table-column>
            <el-table-column prop="createTime" label="发布日期"></el-table-column>
          </el-table>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TreeUser from "./components/tree-user";
// import word from "../../iweboffice2015/word";
import exportTable from '../../../minixs/exportTable'
import { Message } from "element-ui";
export default {
  name: "AdminManagement",
  data() {
    return {
      getMyTeamAllTreeByIsDelete_parmas: {
        function: "getMyTeamAllTreeByIsDelete"
      },
      initgetListTeam_parmas: {
        function: "getListTeam",
        page: 1,
        limit: 10,
        status: 1,
        createUserName: "",
        teamStatus: 1,
        teamid:""
      },
      getListTeam_parmas: {
        function: "getListTeam",
        page: 1,
        limit: 10,
        status: 1,
        createUserName: "",
        teamid: "",
        teamStatus: 1
      },
      getTitleListTeam_parmas: {
        function: "getTitleListTeam",
        teamid: ""
      },
      getDetails_parmas: {
        function: "TaskWordRecord_getDetails",
        taskWorkRecordid: ""
      },
      findListAll_parmas: {
        function: "findListAll",
        title: "",
        state: 1,
        teamid: ""
      },
      subtreeData: [],
      searchInput: "",
      radio1: "日报",
      defaultProps: {
        label: "text",
        children: "children"
      },
      tableData: [
      ],
      currentPage: 1,
      pageSize: 10,
      checkId: "",  //点击左侧树  选择团队
      buttonList: ["日报", "周报", "月报", "会议纪要", "工作记录"],
      activeIndex: 0,  //button index
      input: "", 
      firstTeamId: "",  //初始化 默认第一个团队
      dataList: [],     //工作记录 右侧列表
      contentDetail: {},  //工作记录 内容
      fileTitle: ""    //标题
    };
  },
  components: {},
  mounted() {
    this.initTreeData();
  },
  methods: {
    initTreeData() {
      this.$post
        .postData(
          "getMyTeamAllTreeByIsDelete",
          JSON.stringify(this.getMyTeamAllTreeByIsDelete_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          // if (res.data.id == "root") {
          //   res.data.id = "99";
          // }
          this.subtreeData.push(res.data);
          if (this.subtreeData[0].children.length != 0) {
            this.firstTeamId = this.subtreeData[0].children[0].id;
            console.log(this.firstTeamId);
            this.$nextTick(() => {
              this.$refs.comptree.setCurrentKey(
               this.firstTeamId
              );
            });
            this.initTable();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    initTable() {
      this.initgetListTeam_parmas.page = this.currentPage;
      this.initgetListTeam_parmas.limit = this.pageSize;
      this.initgetListTeam_parmas.teamid = this.firstTeamId;
      this.$post
        .postData(
          "getListTeam",
          JSON.stringify(this.initgetListTeam_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    btnClick(index) {
      let curIndex = this.activeIndex
      this.activeIndex = index;
      console.log(curIndex,this.activeIndex)
      if(curIndex!=this.activeIndex){
        this.searchInput=""
        this.input = ''
        console.log('情况')
      }
      this.changTable(index, false);
    },
    // 日 周 月 会议纪要 点击切换
    changTable(index, isSearch) {
      if (index != 4) {
        // 日 周 月 会议纪要
        if (isSearch) {
          // 是否搜索
          this.getListTeam_parmas.createUserName = this.searchInput;
        }else{
          this.getListTeam_parmas.createUserName = ''
        }
        this.getListTeam_parmas.page = this.currentPage;
        this.getListTeam_parmas.limit = this.pageSize;
        this.getListTeam_parmas.teamid = this.checkId=='' || this.checkId=='99'?this.firstTeamId:this.checkId;
        this.getListTeam_parmas.status = index + 1;
        this.$post
          .postData(
            "getListTeam",
            JSON.stringify(this.getListTeam_parmas),
            this.$businessCode.rwgl
          )
          .then(res => {
            console.log(res);
            this.tableData = res.data.rows;
          })
          .catch(err => {
            console.log(err);
            this.$message({
              showClose: true,
              message: err,
              type: "warning"
            });
          });
      } else {
        //工作记录
        // 没有选中团队 默认第一个团队 
        if (this.checkId == "99" || this.checkId == "") {
          this.getTitleListTeam_parmas.teamid = this.firstTeamId;
          this.getWorkListTeamData();
        } else {
          this.getTitleListTeam_parmas.teamid = this.checkId;
          this.getWorkListTeamData();
        }
      }
    },
    getWorkListTeamData() {
      this.$post
        .postData(
          "getTitleListTeam",
          JSON.stringify(this.getTitleListTeam_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.dataList = res.data;
          if (this.dataList.length != 0) {
            this.fileTitle = this.dataList[0].title;
          }else{
            this.fileTitle=""
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    getContentData(id,title) {
      this.fileTitle = title
      this.getDetails_parmas.taskWorkRecordid = id;
      this.$post
        .postData(
          "TaskWordRecord_getDetails",
          JSON.stringify(this.getDetails_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.contentDetail = res.data.taskWorkRecord;
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.changTable(this.activeIndex, false);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changTable(this.activeIndex, false);
    },
    checkTree(data, check, hascheck) {
      if (data.id != "99") {
        this.checkId = data.id;
        this.getListTeam_parmas.teamStatus = "";
        this.changTable(this.activeIndex,false)
      } else {
        this.getListTeam_parmas.teamStatus = 1;
        this.teamid = "";
      }
    },
    gotoDetail(row) {
      let id = row.id;
      if (this.activeIndex == 0) {
         const routeData = this.$router.resolve({
          path: "/teamdayLog",
          query: { id: id}
        });
        window.open(routeData.href, "_blank");
      } else if (this.activeIndex == 1) {
         const routeData = this.$router.resolve({
          path: "/teamweekLog",
          query: { id: id}
        });
        window.open(routeData.href, "_blank");
      } else if (this.activeIndex == 2) {
         const routeData = this.$router.resolve({
          path: "/teammonLog",
          query: { id: id}
        });
        window.open(routeData.href, "_blank");
      } else {
         const routeData = this.$router.resolve({
          path: "/teammeetLog",
          query: { id: id}
        });
        window.open(routeData.href, "_blank");
      }
    },
    searchClick() {
      this.changTable(this.activeIndex, true);
    },
    //导出
    exportData() {
      let exportName = '';
      if( this.activeIndex == '0' ){
        exportName = '日报';
      }else if( this.activeIndex == '1' ){
        exportName = '周报';
      }else if( this.activeIndex == '2' ){
        exportName = '月报';
      }else if( this.activeIndex == '3' ){
        exportName = '会议纪要';
      }
      exportTable.exportExcel(exportName);
    },
    recordSearch() {
      if (this.checkId == "99" || this.checkId == "") {
          this.findListAll_parmas.teamid = this.firstTeamId;
        } else {
          this.findListAll_parmas.teamid = this.checkId;
        }
      this.findListAll_parmas.title = this.input;
      this.$post
        .postData(
          "findListAll",
          JSON.stringify(this.findListAll_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res);
          this.dataList = res.data;
          if (res.data.length != 0) {
            this.getContentData(this.dataList[0].id,this.dataList[0].title);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.am_warp .el-main {
  padding: 0 20px;
}
.tree_box {
  border: 1px solid #90c8ed;
}
.box_shadow{
  min-height: 700px;
  max-height: 1000px;
  overflow-y:auto;
}
.tree_box ::-webkit-scrollbar{
  display: inline-block;
  width: 5px;
}
// /deep/ .el-scrollbar .el-scrollbar_wrap{
//   overflow-x: scroll;
// }
// /deep/ .el-tree>.el-tree-node{
//   height: 500px;
//   min-width: 100%;
//   display: inline-block;
// }
.tree_header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #e5f1f9;
}
.table_header {
  width: 100%;
  // height: 50px;
  line-height: 50px;
  // text-align: center;
  padding-left: 20px;
  padding-right: 20px;
}
.span-ellipsis{
  font-size: 14px;
  color: #333;
    height: 18px;
  line-height: 18px;
}
/deep/ .el-tree-node__children .span-ellipsis{
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.search_warp {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 50px;
}
.searchInput {
  margin-left: 10px;
}
.searchInput.el-input {
  width: 280px;
}
.work_record {
  height: 500px;
  // overflow: scroll;
  padding: 20px 20px;
  position: relative;
  .search {
    font-size: 18px;
    font-weight: bold;
  }
  .el-input {
    width: 280px;
  }
  .record_title {
    margin-top: 15px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  .content {
    width: 100%;
    margin-top: 30px;
  }
  .edit {
    width: 82%;
    height: 600px;
    float: left;
    border: 1px solid #dcdfe6;
  }
  .list_ul {
    width: 15%;
    height: 600px;
    border: 1px solid #dcdfe6;
    overflow-y: scroll;
    float: right;
    .item {
      height: 40px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      // margin-top: 15px;
      // border: 1px solid #0457b3;
      // border-radius: 8px;
    }
    .item:hover {
      color: #0457b3;
    }
  }
}
.update {
  display: flex;
  margin-top: 20px;
  /deep/ .el-upload__tip {
    margin-top: 0;
  }
}
/deep/.el-upload-list {
  height: 100px;
  border: 1px solid #eee;
  background: #fff;
  margin-top: 10px;
  overflow-y: scroll;
}
.info_w {
  margin-top: 20px;
  height: 80px;
  line-height: 80px;
  .info {
    // width: 20px;
    float: left;
  }
  .info_text {
    width: 90%;
    height: 80px;
    overflow-y: scroll;
    float: right;
    background-color: #eee;
  }
}
/deep/ .el-scrollbar__bar.is-horizontal {
  display: none;
}
/deep/ .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/deep/ .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  content: "\e722";
  font-size: 17px;
  color: #409eff;
}
/deep/ .el-tree-node__expand-icon.el-icon-caret-right:before {
  content: "\e723";
  font-size: 17px;
  color: #409eff;
}
/deep/ .el-tree-node__expand-icon.is-leaf {
  visibility: hidden;
}
.btn_div button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 10px;
}
.btn_div button:hover {
  color: #409eff;
  border: 1px solid #409eff;
}
.btn_div button.activeClass {
  background-color: #409eff;
  color: #fff;
}
</style>