<template>
  <div class="am_warp">
    <el-container>
      <el-aside>
        <div class="tree_box">
          <div class="tree_header">
            <el-button type="primary" size="mini" @click="joinTeam">搜索团队</el-button>
          </div>
          <el-tree
            class="box_shadow"
            :data="subtreeData"
            :check-strictly="true"
            ref="comptree"
            :highlight-current="true"
            @node-click="checkTree"
            node-key="id"
            :default-expand-all="true"
            :default-expanded-keys="[2, 3]"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :props="defaultProps"
          >
            <span class="span-ellipsis" slot-scope="{ node,data }">
              <span :class="data.isdelete == '1' || data.id =='999'?'gray':''" :title="node.label">{{node.label}}</span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-main style="width:65%">
        <div class="table_header">
          <div class="left_btnWarp" v-show="isDelete == '0'">
            <el-button
              type="primary"
              size="mini"
              @click="addChildTeam('add')"
              v-show="flag==1 && parentTree"
            >新增子团队</el-button>
            <el-button type="primary" size="mini" @click="addMember(1)" v-show="flag==1">添加成员</el-button>
            <el-button type="primary" size="mini" @click="addMember(2)" v-show="flag==2">邀请成员</el-button>
            <el-button type="primary" size="mini" @click="batchDelet" v-show="flag==1">批量删除成员</el-button>
          </div>
          <el-button
            class="right_btn btn_xiaoxi"
            type="primary"
            size="mini"
            icon="el-icon-s-opportunity"
            @click="infoShow"
          >消息
          <span class="btn_xiaoxi_s" v-if="btn_xiaoxi_s"></span>
          </el-button>
          <el-button
            class="right_btn"
            v-if="isDelete!=1"
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="dilalogTeam('edit')"
            v-show="flag==1"
          >维护团队</el-button>
          <el-button
            class="right_btn"
            type="primary"
            size="mini"
            icon="el-icon-s-comment"
            @click="teamNotice"
          >团队公告</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          class="scroll"
          height="700"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="userName" label="成员名称"></el-table-column>
          <el-table-column prop="types" label="岗位"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-show="flag==1 && isDelete==0"
                @click="handleEdit(scope.$index, scope.row)"
              >设置</el-button>
              <el-button
                type="text"
                v-show="flag==1 && isDelete==0"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <!-- <el-button
                type="text"
                :disabled="scope.$index==0?true:false"
                @click="colUp(scope.$index, scope.row)"
              >上移</el-button>
              <el-button
                type="text"
                :disabled="scope.$index==tableData.length-1?true:false"
                @click="colDown(scope.$index, scope.row)"
              >下移</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="table_parmas.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="table_parmas.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
    <DialogTeam
      :outerAddTeamTitle="outerAddTeamTitle"
      :checkId="checkId"
      :type="type"
      :teamidStr="teamidStr"
      v-if="showDialogTeam"
      @teamshowCompDialog="teamshowCompDialog"
    ></DialogTeam>
    <DialogChildteam v-dialogDrag
      :childTeamTitle="childTeamTitle"
      :checkId="checkId"
      :checkName="checkName"
      :childType="childType"
      :isDelete="isDelete"
      :teamidStr="teamidStr"
      v-if="showDialogChildteam"
      @childTeamDialog="childTeamDialog"
    ></DialogChildteam>
    <TreecheckboxUser  v-dialogDrag
      :subdialogTit="subdialogTit"
      :suboffenUse="suboffenUse"
      :subcheckIds="subcheckIds"
      :parentId="checkId"
      :subcanTab="subcanTab"
      :subsingelCheckF="subsingelCheckF"
      :treeType="treeType"
      @subshowCompDialog="subshowCompDialog"
      v-if="showTreeCheckbox"
    ></TreecheckboxUser>
    <TeamNotice :teamNoticTitle="teamNoticTitle" @teanNotice="teanNotice" v-if="showTeamNotice"></TeamNotice>
    <TransFer
      :TransFerId="TransFerId"
      :TransFerTeamId="TransFerTeamId"
      :TransUserId="TransUserId"
      :TransUserName="TransUserName"
      @showComTranfer="showComTranfer"
      v-if="showTransFer"
    ></TransFer>
    <el-dialog title="用户岗位" :visible.sync="choosePostVisible">
      <div>选择用户岗位</div>
      <el-checkbox-group v-model="checkPost" style="margin-top:10px">
        <el-checkbox label="1">负责人</el-checkbox>
        <el-checkbox label="2">管理员</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="choosePostVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPost">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag  title="加入团队" width="800px" :visible.sync="joinTeamVisible" @close="joinTeamClose">
      <div class="joinTeam">查找团队</div>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        class="searchInput"
      ></el-input>
      <el-button type="primary" plain style="margin-left:10px" @click="searchClick">搜索</el-button>
      <el-scrollbar style="height:300px">
        <div class="search_list" v-for="(item,index) in searchList" :key="index">
          <div class="list_left">
            <el-tooltip :content="item.teamName" placement="right" effect="light">
              <span>{{item.teamName}}</span>
            </el-tooltip>
          </div>

          <div class="list_mid">{{item.createTime}}</div>
          <div class="list_right" v-if="item.addStatus == '1'">
            <el-button @click="appJoin(item)" type="text">申请加入</el-button>
          </div>
          <div class="list_right" v-else-if="item.addStatus == '2'">待审核</div>
          <div class="list_right" v-else>已加入</div>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="joinTeamClose">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag title="消息" :visible.sync="infoVisible">
      <div class="btn_div">
        <button
          v-for="(item,index) in buttonList"
          :class="index==activeIndex?'activeClass':''"
          :key="index"
          @click="btnClick(index)"
        >{{item}}</button>
      </div>
      <el-table
        ref="tableInfoData"
        :data="tableInfoData"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-top:10px"
        class="scroll"
        height="400"
      >
        <el-table-column prop="operatedUserName" label="成员名称"></el-table-column>
        <el-table-column prop="invitedText" label="岗位"></el-table-column>
        <el-table-column prop="teamName" label="团队名称" show-overflow-tooltip width="150px"></el-table-column>
        <el-table-column prop="createTime" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-show="scope.row.dealDetailStatus=='4' && activeIndex!=2"
              @click="InfoAgree(scope.$index, scope.row)"
            >同意</el-button>
            <el-button
              type="text"
              v-show="scope.row.dealDetailStatus=='4' && activeIndex!=2"
              @click="InfoRefuse(scope.$index, scope.row)"
            >拒绝</el-button>
            <span v-show="activeIndex!=0" style="margin-left:10px">{{scope.row.dealText}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleInfoSizeChange"
          @current-change="handleInfoCurrentChange"
          :current-page="tableInfo_parmas.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="tableInfo_parmas.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoVisible = false">取 消</el-button>
        <!-- <el-button type="primary">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 我的团队业务代码和adminManagement.vue(管理员维护) 基本一致
import DialogTeam from "./components/dialog-team";
import DialogChildteam from "./components/dialog-childteam";
import TreecheckboxUser from "./components/treecheckbox-user";
import TeamNotice from "./components/team-notice";
import TransFer from "./components/transFer";
import { Message } from "element-ui";
export default {
  name: "AdminManagement",
  data() {
    return {
      btn_xiaoxi_s: false,
      loading: false,
      tree_parmas: {
        function: "getMyTeamTree",
        role: ""
      },
      closetree_parmas: {
        function: "getTeamTreeClosed"
      },
      table_parmas: {
        function: "findByTeamId",
        page: 1,
        limit: 10
      },
      tableInfo_parmas: {
        function: "findByTeamId",
        page: 1,
        limit: 10
      },
      userAccess_parmas: {
        function: "getUserAccess"
      },
      findByUserId_parmas: {
        function: "findByUserId"
      },
      teamMember_deleteById_parmas: {
        function: "teamMember_deleteById",
        ids: ""
      },
      setUserPost_parmas: {
        function: "setUserPost",
        id: "",
        posts: ""
      },
      getDetailById_parmas: {
        function: "getDetailById",
        id: ""
      },
      saveByXuHao_parmas: {
        function: "saveByXuHao",
        list: "",
        teamId: ""
      },
      findByTeamIdToArray_parmas: {
        function: "findByTeamIdToArray",
        teamId: ""
      },
      saveInvitation_parmas: {
        function: "saveInvitation",
        operatedTeamId: "",
        operatedTeamName: ""
      },
      findByTeamName_parmas: {
        function: "findByTeamName",
        teamName: ""
      },
      findBydealStatusAndRenYuan_parmas: {
        function: "findBydealStatusAndRenYuan",
        page: 1,
        limit: 10,
        dealStatus: 1,
        renYuan: sessionStorage.getItem("role"),
        tuandui: "2"
      },
      findWDSQList_parmas: {
        function: "findWDSQList",
        page: 1,
        limit: 10,
        renYuan: sessionStorage.getItem("role")
      },
      dealDetail_parmas: {
        function: "dealDetail",
        id: "",
        userName: "",
        dealDetailStatus: ""
      },
      findByCreateNameOrPerson_parmas: {
        function: "findByCreateNameOrPerson",
        id: "",
        teamId: "",
        userId: ""
      },
      searchList: [],  //查找团队列表
      subtreeData: [], //左侧树
      sendList: [], //添加成员树
      defaultProps: {
        label: "text",
        children: "children"
      },
      tableData: [],
      flag: 3, //是否显示操作
      total: 0,
      multipleSelection: [], //表格勾选集合
      checkId: "", //左侧树点击 团队id
      checkName: "", //左侧树点击 团队名称
      isDelete: "0", //是否关闭
      type: "", //新建or维护团队
      childType: "",
      outerAddTeamTitle: "",
      showDialogChildteam: false, //新建子团队
      childTeamTitle: "新建子团队",
      isParent: false,
      showDialogTeam: false, //新建、维护弹框
      dialogForm: {}, //新建、维护弹框表单
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "人员选择", // 弹框标题
      subcheckIds: [],
      showTreeCheckbox: false, // //添加成员树弹框
      treeType: Number, //添加成员/邀请成员
      choosePostVisible: false, //设置用户岗位弹框
      checkPost: [], //设置用户岗位集合
      teamNoticTitle: "团队公告",
      showTeamNotice: false, //公告弹框
      joinTeamVisible: false, //加入团队
      searchInput: "", //加入团队搜索值
      infoVisible: false, //信息弹框
      tableInfoData: [], //信息弹框表格数据
      total1: 0,
      buttonList: ["待处理", "已处理", "我的消息"], //信息弹框按钮
      activeIndex: 0, //信息弹框按钮当前点击
      showTransFer: false, //转交
      teamidArr:[],
      teamidStr:'',
      TransUserName:'',  //转交名字
      parentTree:false,
    };
  },
  components: {
    DialogTeam,
    DialogChildteam,
    TreecheckboxUser,
    TeamNotice,
    TransFer
  },
  async mounted() {
    document.title="柔性团队"
    this.initTable(); //表格初始化
    this.getUserAccess(); //获取角色信息
    this.findByUserId();
    this.getTableInfo(0)
    this.inAllTree();  //树初始化
  },
  methods: {
    async getUserAccess() {
      let res = await this.$post.postData(
        "getUserAccess",
        JSON.stringify(this.userAccess_parmas),
        this.$businessCode.tdgl
      );
      sessionStorage.setItem("role", res.data);
      console.log(res);
    },
    async findByUserId() {
      let res = await this.$post.postData(
        "findByUserId",
        JSON.stringify(this.findByUserId_parmas),
        this.$businessCode.tdgl
      );
    },
    initTable() {
      this.getTableData();
    },
    async getTableData() {
      this.table_parmas.teamId = this.checkId;
      let res = await this.$post.postData( 
        "findByTeamId",
        JSON.stringify(this.table_parmas),
        this.$businessCode.tdgl
      );
      console.log(res);
      if (res.data) {
        this.tableData = res.data.rows;
        this.total = res.data.total;
      }
      if (res.flag) {
        this.flag = res.flag.flag;
        console.log(this.flag,"this.flag") 
        localStorage.setItem("glyFlag",this.flag)
        
      }
       /**
       * flag 1  是负责人或管理员 可以添加成员 由操作权限
       * flag 2  是一般成员 可以邀请成员 没有操作权限
       * flag 3  当前登录人不在团队内 无任何操作权限
       */

      this.tableData.forEach(item => {
        if (item.types == 1) {
          item.types = "负责人";
        } else if (item.types == 2) {
          item.types = "管理员";
        } else if (item.types == "1,2") {
          item.types = "负责人,管理员";
        } else {
          item.types = "一般成员";
        }
      });
    },
    async inAllTree() {
      await this.initTree();
      // await this.initcloseTree();
    },
    async initTree() {
      let res = await this.$post.postData(
        "getMyTeamTree",
        JSON.stringify(this.tree_parmas),
        this.$businessCode.tdgl
      );
      console.log(res);
      if (res.data.id == "root") {
        res.data.id = "99";
      }
      this.subtreeData.push(res.data);
      this.$nextTick(() => {
        let treeNodeData = this.subtreeData[0].children;
      });
    },
    handleSizeChange(val) {
      this.table_parmas.limit = val;
      this.table_parmas.page = 1;
      this.initTable();
    },
    handleCurrentChange(val) {
      this.table_parmas.page = val;
      this.initTable();
    },
    handleInfoSizeChange(val) {
      this.tableInfo_parmas.limit = val;
      this.tableInfo_parmas.page = 1;
      this.getTableInfo(this.activeIndex);
    },
    handleInfoCurrentChange(val) {
      this.tableInfo_parmas.page = val;
      this.getTableInfo(this.activeIndex);
    },
    checkTree(data) {
      if(data.parentId == "root" || data.parentId == ""){
        this.parentTree = true;
      }else{
        this.parentTree = false;
      }
      if (data.id != "99") {
        this.checkId = data.id;
        this.checkName = data.text;
        this.isDelete = data.isdelete;
        this.isParent = data.parentId == "root" ? true : false;
        this.teamidArr.push(data.id);
        this.deep(data);
        this.teamidStr = this.teamidArr.join(",");
        this.getTableData();
      }
    },
    deep(val) {
      if (val.children && val.children.length > 0) {
        val.children.forEach(item => {
          this.teamidArr.push(item.id);
          this.deep(item);
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    colDown(index, row) {
      // console.log(this.tableData[index].xuhao)
      this.tableData[index].xuHao += 1;
      this.tableData[index + 1].xuHao -= 1;
      this.tableData[index] = this.tableData.splice(
        index + 1,
        1,
        this.tableData[index]
      )[0];
      let list_parmas = JSON.parse(JSON.stringify(this.tableData));
      list_parmas.forEach(item => {
        if (item.types == "负责人") {
          item.types = "1";
        } else if (item.types == "管理员") {
          item.types = "2";
        } else if (item.types == "负责人,管理员") {
          item.types = "1,2";
        } else {
          item.types = "3";
        }
      });
      this.saveByXuHao_parmas.list = JSON.stringify(list_parmas);
      this.saveByXuHao_parmas.teamId = this.checkId;
      this.$post
        .postData(
          "saveByXuHao",
          JSON.stringify(this.saveByXuHao_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.initTable()
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
    colUp(index, row) {
      this.tableData[index].xuhao -= 1;
      this.tableData[index - 1].xuhao += 1;
      this.tableData[index] = this.tableData.splice(
        index - 1,
        1,
        this.tableData[index]
      )[0];
    },
    // resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //     this.form = {}
    // },
    addChildTeam(s) {
      if (s == "add") {
        this.showDialogChildteam = true;
        this.childType = "add";
        this.childTeamTitle = "新建子团队";
      } else if (s == "edit") {
        this.$nextTick(() => {
          this.childType = "edit";
          this.childTeamTitle = "维护子团队";
          if (this.checkId != "") {
            this.showDialogChildteam = true;
          } else {
            this.$message({
              showClose: true,
              message: "请选择要维护的团队",
              type: "warning"
            });
          }
        });
      }
    },
    infoShow() {
      this.infoVisible = true;
      this.loading = true;
      this.activeIndex = 0;
      this.getTableInfo(0);
    },
    teamshowCompDialog(type) {
      this.showDialogTeam = false;
      console.log(this.dilalogTeamState);
      if (type) {
        this.subtreeData = [];
        this.inAllTree();
      }
    },
    childTeamDialog(type) {
      this.showDialogChildteam = false;
      if (type) {
        this.subtreeData = [];
        this.inAllTree();
      }
    },
    dilalogTeam(s) {
      if (s == "add") {
        this.showDialogTeam = true;
        this.type = "add";
        this.outerAddTeamTitle = "新建团队";
      } else if (s == "edit") {
        if (this.isParent) {
          this.$nextTick(() => {
            this.type = "edit";
            this.outerAddTeamTitle = "维护团队";
            if (this.checkId != "") {
              this.showDialogTeam = true;
            } else {
              this.$message({
                showClose: true,
                message: "请选择要维护的团队",
                type: "warning"
              });
            }
          });
        } else {
          this.addChildTeam("edit");
        }
      }
    },
    addMember(type) {
      if (this.checkId != "") {
        this.treeType = type;
        this.showTreeCheckbox = true;
        console.log(this.treeType);
      } else {
        this.$message({
          showClose: true,
          message: "请选择团队",
          type: "warning"
        });
      }
    },
    subshowCompDialog(type) {
      //嵌套弹层
      if (type) {
        console.log("更新表格");
        this.tableData = [];
        this.initTable();
      }
      this.showTreeCheckbox = false;
    },
    batchDelet() {
      // this.multipleSelection.forEach(item => {
      //   this.delArr.push(item.xuhao)
      // });
      let haveAdmin = this.multipleSelection.some(item => {
        return (
          item.types === "负责人" ||
          item.types === "管理员" ||
          item.types === "负责人,管理员"
        );
      });
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要删除的成员",
          type: "warning"
        });
      } else if (haveAdmin) {
        this.$message({
          showClose: true,
          message: "不能删除负责人或管理员",
          type: "warning"
        });
      } else {
        this.$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(this.multipleSelection);
            let idsArr = [];
            let userIds = [];
            let userName = [];
            this.multipleSelection.forEach(item => {
              idsArr.push(item.id);
              userIds.push(item.userId);
              userName.push(item.userName);
            });
            this.findByCreateNameOrPerson_parmas.id = idsArr.join(",");
            this.findByCreateNameOrPerson_parmas.teamId = this.multipleSelection[0].teamId;
            this.findByCreateNameOrPerson_parmas.userId = userIds.join(",");
            let parmas = Object.assign(
              {},
              this.findByCreateNameOrPerson_parmas
            );
            parmas.userName = userName;
            this.isCanBatchDelet(parmas);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    isCanBatchDelet(parmas) {
      this.$post
        .postData(
          "findByCreateNameOrPerson",
          JSON.stringify(this.findByCreateNameOrPerson_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.data.length == 0) {
            this.confirm(parmas);
          } else {
            let idArr = [];
            let row = { id: "" };
            res.data.forEach(item => {
              idArr.push(item.id);
            });
            row.id = idArr.join(",");
            this.toDelete(row);
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
    handleDelete(index, row) {
      if (this.tableData.length <= 1) {
        this.$message({
          showClose: true,
          message: "不能删除全部成员",
          type: "warning"
        });
      } else if (
        row.types == "负责人" ||
        row.types == "管理员" ||
        row.types == "负责人,管理员"
      ) {
        this.$message({
          showClose: true,
          message: "不能删除负责人或管理员",
          type: "warning"
        });
      } else {
        this.$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.isCanDelete(index, row);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    confirm(row) {
      this.$confirm(
        row.userName +
          ",有流转中的任务未办结，删除前需先将任务转交至他人，是否转交？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.showTransFer = true;
          this.TransFerId = row.id;
          this.TransFerTeamId = row.teamId;
          this.TransUserId = row.userId;
          this.TransUserName = row.userName
        })
        .catch(() => {});
    },
    showComTranfer() {
      console.log("刷新列表");
      this.showTransFer = false;
      this.initTable();
    },
    isCanDelete(index, row) {
      console.log(row);
      this.findByCreateNameOrPerson_parmas.id = row.id;
      this.findByCreateNameOrPerson_parmas.teamId = row.teamId;
      this.findByCreateNameOrPerson_parmas.userId = row.userId;
      this.$post
        .postData(
          "findByCreateNameOrPerson",
          JSON.stringify(this.findByCreateNameOrPerson_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.data.length == 0) {
            this.confirm(row);
          } else {
            this.toDelete(row);
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
    toDelete(row) {
      this.teamMember_deleteById_parmas.ids = row.id;
      this.$post
        .postData(
          "teamMember_deleteById",
          JSON.stringify(this.teamMember_deleteById_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.initTable();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
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
    handleEdit(index, row) {
      this.choosePostVisible = true;
      this.checkPost = row.types.toString().split(",");
      console.log(this.checkPost);
      let mapObj = {
        负责人: "1",
        管理员: "2",
        "负责人,管理员": "1,2",
        一般成员: "3"
      };
      let newArr = this.checkPost.map(item => {
        return mapObj[item];
      });
      this.checkPost = newArr;
      console.log(newArr);
      // if(row.types == '负责人'){
      //   this.checkPost.push('1')
      // }else if(row.types == '管理员'){
      //   this.checkPost.push('2')
      // }else{
      //   this.checkPost=[]
      // }
      this.setUserPost_parmas.id = row.id;
    },
    editPost() {
      this.checkPost.forEach((item, index) => {
        if (this.checkPost[index] == "3") {
          this.checkPost.splice(index, 1);
        }
      });
      this.setUserPost_parmas.posts = this.checkPost.join(",");
      this.$post
        .postData(
          "setUserPost",
          JSON.stringify(this.setUserPost_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.initTable();
            this.checkPost = [];
            this.$message({
              type: "success",
              message: "设置成功!"
            });
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
      this.choosePostVisible = false;
    },
    teanNotice() {
      // this.noticeTeamState = false;
      this.showTeamNotice = false;
    },
    teamNotice() {
      this.showTeamNotice = true;
      // if (this.checkId != "") {
      //   this.showTeamNotice = true;
      //   // this.noticeTeamState = true;
      //   // console.log(this.form)
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: "请选择要维护的团队",
      //     type: "warning"
      //   });
      // }
    },
    searchClick() {
      this.findByTeamName_parmas.teamName = this.searchInput;
      this.$post
        .postData(
          "findByTeamName",
          JSON.stringify(this.findByTeamName_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.searchList = res.data;
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
    joinTeam() {
      this.joinTeamVisible = true;
      this.findByTeamIdToArray_parmas.teamId = this.checkId;
      this.$post
        .postData(
          "findByTeamIdToArray",
          JSON.stringify(this.findByTeamIdToArray_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.searchList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    appJoin(item) {
      this.saveInvitation_parmas.operatedTeamId = item.id;
      this.saveInvitation_parmas.operatedTeamName = item.teamName;
      this.$post
        .postData(
          "saveInvitation",
          JSON.stringify(this.saveInvitation_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            if (this.checkId != "") {
              this.joinTeam();
            } else {
              this.searchClick();
            }
            this.$message({
              showClose: true,
              message: "已加入审核",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    joinTeamClose() {
      this.joinTeamVisible = false;
      this.searchInput = "";
      this.searchList = [];
    },
    btnClick(index) {
      this.activeIndex = index;
      this.getTableInfo(index);
    },
    getTableInfo(index) {
      // this.loading = true;
      if (index == 0 || index == 1) {
        this.findBydealStatusAndRenYuan_parmas.page = this.tableInfo_parmas.page;
        this.findBydealStatusAndRenYuan_parmas.limit = this.tableInfo_parmas.limit;
        this.findBydealStatusAndRenYuan_parmas.dealStatus = index + 1;
       
       this.$post
          .postData(
            "findBydealStatusAndRenYuan",
            JSON.stringify(this.findBydealStatusAndRenYuan_parmas),
            this.$businessCode.tdgl
          )
          .then(res => {
            console.log(res);
            if (res.success) {
              if (res.data) {
                this.tableInfoData = res.data.rows;
                this.total1 = res.data.total;
                if( index == 0 ){
                  if( this.total1 > 0 ){
                    this.btn_xiaoxi_s = true;
                  }else{
                    this.btn_xiaoxi_s = false;
                  }
                }
                
                this.tableInfoData.forEach(item => {
                  if (item.invitedApplicationStatus == "1") {
                    item.invitedText = "申请加入";
                  } else {
                    item.invitedText = "被邀请加入";
                  }
                  if (item.dealDetailStatus == "1") {
                    item.dealText = "已同意";
                  } else if (item.dealDetailStatus == "2") {
                    item.dealText = "已拒绝";
                  } else if (item.dealDetailStatus == "3") {
                    item.dealText = "已过期";
                  }
                });
              }else{
                this.tableInfoData="";
              }
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.findWDSQList_parmas.page = this.tableInfo_parmas.page;
        this.findWDSQList_parmas.limit = this.tableInfo_parmas.limit;
        this.$post
          .postData(
            "findWDSQList",
            JSON.stringify(this.findWDSQList_parmas),
            this.$businessCode.tdgl
          )
          .then(res => {
            if (res.success) {
              if (res.data) {
                this.tableInfoData = res.data.rows;
                this.total1 = res.data.total;
                this.tableInfoData.forEach(item => {
                  if (item.invitedApplicationStatus == "1") {
                    item.invitedText = "申请加入";
                  } else {
                    item.invitedText = "被邀请加入";
                  }
                  if (item.dealDetailStatus == "1") {
                    item.dealText = "已同意";
                  } else if (item.dealDetailStatus == "2") {
                    item.dealText = "已拒绝";
                  } else if (item.dealDetailStatus == "3") {
                    item.dealText = "已过期";
                  } else if (item.dealDetailStatus == "4") {
                    item.dealText = "待审核";
                  }
                });
              }else{
                  this.tableInfoData="";
              }
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    InfoAgree(index, item) {
      this.dealDetail_parmas.id = item.id;
      this.dealDetail_parmas.userName = item.userName;
      this.dealDetail_parmas.dealDetailStatus = 1;
      this.$post
        .postData(
          "dealDetail",
          JSON.stringify(this.dealDetail_parmas),
         this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            let index = this.activeIndex;
            this.getTableInfo(index);
            this.initTable();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    InfoRefuse(index, item) {
      this.dealDetail_parmas.id = item.id;
      this.dealDetail_parmas.userName = item.userName;
      this.dealDetail_parmas.dealDetailStatus = 2;
      this.$post
        .postData(
          "dealDetail",
          JSON.stringify(this.dealDetail_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            let index = this.activeIndex;
            this.getTableInfo(index);
          }
        })
        .catch(err => {
          console.log(err);
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
  height: 100%;
  border: 1px solid #90c8ed;
}
.box_shadow {
  min-height: 700px;
  max-height: 1000px;
  overflow-y: auto;
}
.tree_box ::-webkit-scrollbar {
  display: inline-block;
  width: 5px;
}
.tree_header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #e5f1f9;
}
.span-ellipsis {
  font-size: 14px;
  color: #333;
    height: 18px;
  line-height: 18px;
}
.gray {
  color: rgb(128, 128, 128);
}
/deep/ .el-tree-node__children .span-ellipsis {
  font-size: 14px;
  // color: rgb(128, 128, 128);
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.table_header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  // text-align: center;
  background-color: #e5f1f9;
  padding-left: 20px;
  padding-right: 20px;
  .left_btnWarp {
    float: left;
  }
  .right_btn {
    float: right;
    margin-top: 13px;
    margin-left: 10px;
  }
}
.addTeamFrom .el-input {
  width: 80%;
}
.joinTeam {
  padding: 20px;
  text-align: center;
  font-size: 18px;
}
.search_list_warp {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  overflow-y: scroll;
}
.search_list {
  width: 100%;
  height: 30px;
  line-height: 30px;
  .list_left {
    float: left;
    width: 40%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list_mid {
    float: left;
    width: 35%;
    padding-left: 20px;
  }
  .list_right {
    float: left;
    width: 10%;
  }
}
.searchInput.el-input {
  width: 70%;
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
/deep/ .search_list .el-button {
  padding: 0;
}

.btn_xiaoxi{
  position: relative;
}
.btn_xiaoxi_s{
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  background: #f00;
  right: -5px;
  top: -5px;
  border-radius: 50%;
}
</style>