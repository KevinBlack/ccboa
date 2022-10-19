<template>
  <div class="am_warp">
    <el-container>
      <el-aside>
        <div class="tree_box">
          <div class="tree_header">
            <el-button type="primary" size="mini" @click="dilalogTeam('add')">组建团队</el-button>
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
          <div class="left_btnWarp" v-if="isDelete == '0'">
            <el-button type="primary" size="mini" @click="addChildTeam('add')">新增子团队</el-button>
            <el-button type="primary" size="mini" @click="addMember(1)">添加成员</el-button>
            <el-button type="primary" size="mini" @click="batchDelet">批量删除成员</el-button>
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
            v-if="showTeamCommand"
            class="right_btn"
            type="primary" 
            size="mini"
            icon="el-icon-setting"
            @click="dilalogTeam('edit')"
          >维护团队</el-button>
          <!-- <el-button
            class="right_btn"
            type="primary"
            size="mini"
            icon="el-icon-s-comment"
            @click="teamNotice"
          >团队公告</el-button> -->
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          class="scroll"
          height="400"
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
                @click="handleEdit(scope.$index, scope.row)"
                v-show="isDelete=='0'"
              >设置</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                v-show="isDelete=='0'"
              >删除</el-button>
              <el-button
                type="text"
                :disabled="scope.$index==0?true:false"
                @click="colUp(scope.$index, scope.row)"
                v-show="isDelete=='0'"
              >上移</el-button>
              <el-button
                type="text"
                :disabled="scope.$index==tableData.length-1?true:false"
                @click="colDown(scope.$index, scope.row)"
                v-show="isDelete=='0'"
              >下移</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="table_parmas.page"
            :page-sizes="[2, 4, 10, 20]"
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
      :isDelete="isDelete"
      :teamidStr='teamidStr'
      @teamshowCompDialog="teamshowCompDialog"
      v-if="showDialogTeam"
    ></DialogTeam>
    <DialogChildteam
      :childTeamTitle="childTeamTitle"
      :checkId="checkId"
      :checkName="checkName"
      :childType="childType"
      :isDelete="isDelete"
      :teamidStr="teamidStr"
      v-if="showDialogChildteam"
      @childTeamDialog="childTeamDialog"
    ></DialogChildteam>
    <TreecheckboxUser
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
    <el-dialog title="消息" :visible.sync="infoVisible">
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
         v-loading="loading"
        :data="tableInfoData"
        border
        :show-header="false"
        tooltip-effect="dark"
        style="width: 100%;margin-top:10px"
        class="scroll"
        height="400"
      >
        <el-table-column prop="operatedUserName" label="成员名称"></el-table-column>
        <el-table-column prop="invitedText" label="岗位"></el-table-column>
        <el-table-column prop="teamName" label="成员名称"></el-table-column>
        <el-table-column prop="createTime" label="岗位"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-show="scope.row.dealDetailStatus=='4'"
              @click="InfoAgree(scope.$index, scope.row)"
            >同意</el-button>
            <el-button
              type="text"
              v-show="scope.row.dealDetailStatus=='4'"
              @click="InfoRefuse(scope.$index, scope.row)"
            >拒绝</el-button>
            <span
              style="margin-left:10px"
              v-show="scope.row.dealDetailStatus!='4'"
            >{{scope.row.dealText}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleInfoSizeChange"
          @current-change="handleInfoCurrentChange"
          :current-page="tableInfo_parmas.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="tableInfo_parmas.limit"
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
      showTeamCommand:true,
      btn_xiaoxi_s: false,
      loading:false,
      tree_parmas: {
        function: "getTeamTree"
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
        page: 1,
        limit: 10
      },
      userAccess_parmas: {
        function: "getUserAccess"
      },
      findByUserId_parmas: {
        function: "findByUserId"
      },
      delete_parmas: {
        function: "deleteById",
        ids: ""
      },
      teamMember_deleteById_parmas: {
        function: "teamMember_deleteById",
        ids: ""
      },
      findByCreateNameOrPerson_parmas: {
        function: "findByCreateNameOrPerson",
        id: "",
        teamId: "",
        userId: ""
      },
      setUserPost_parmas: {
        function: "setUserPost",
        id: "",
        posts: ""
      },
      findBydealStatusAndRenYuan_parmas: {
        function: "findBydealStatusAndRenYuan",
        page: 1,
        limit: 10,
        dealStatus: 1,
        renYuan: sessionStorage.getItem("role"),
        tuandui: "1"
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
      subtreeData: [],
      defaultProps: {
        label: "text",
        children: "children"
      },
      tableData: [],
      total: 0,
      flag: true,
      multipleSelection: [],
      showDialogTeam: false,
      checkId: "", //左侧树的id 表示有没有被选中
      checkName: "", //左侧树的 teamname  
      isDelete: "0", //团队是否被关闭
      type: "",     //组建团队   新增or详情
      treeType: Number,   //邀请人员or添加人员
      childType: "",   //子团队新增or详情
      outerAddTeamTitle: "",
      childTeamTitle: "新建子团队",
      isParent: false,  //点击树的节点 是否为第一级 （中国建设银行）
      showDialogChildteam: false,  
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "人员选择", // 弹框标题
      subcheckIds: [],
      showTreeCheckbox: false,  //邀请/添加成员 组件
      choosePostVisible: false,
      checkPost: [], //用户岗位
      showTeamNotice: false,
      teamNoticTitle: "团队公告",
      activeName: "wait",
      infoVisible: false,
      tableInfoData: [],
      total1: 0,
      buttonList: ["待处理", "已处理"],
      activeIndex: 0,  //消息切换index
      showTransFer: false,   //删除成员 如果有任务需要转换
      teamidArr:[],  //选中的团队 
      teamidStr:''   //选中的团队 
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
    this.initTable(); //表格初始化
    this.getUserAccess(); //获取角色信息
    this.findByUserId();
    this.getTableInfo(0);
    this.inAllTree(); //树初始化
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
      // if (res.flag) {
      //   this.flag = res.flag.flag;
      // }
      // this.tableData.sort((val1,val2) => {
      //   return val1.xuhao - val2.xuhao
      // })

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
      await this.initcloseTree();
    },
    async initTree() {
      let res = await this.$post.postData(
        "getTeamTree",
        JSON.stringify(this.tree_parmas),
        this.$businessCode.tdgl
      );
      // id不能为字母
      if (res.data.id == "root") {
        res.data.id = "99";
      }
      this.subtreeData.push(res.data);
    },
    async initcloseTree() {  //关闭的团队树
      let res = await this.$post.postData(
        "getTeamTreeClosed",
        JSON.stringify(this.closetree_parmas),
        this.$businessCode.tdgl
      );
      // id不能为字母
      if (res.data.id == "root") {
        res.data.id = "999";
      }
      this.subtreeData.push(res.data);
      console.log(res.data);
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
    handleInfoSizeChange(val) {   //消息分页
      this.tableInfo_parmas.limit = val;
      this.tableInfo_parmas.page = 1;
      this.getTableInfo(this.activeIndex);
    },
    handleInfoCurrentChange(val) {
      this.tableInfo_parmas.page = val;
      this.getTableInfo(this.activeIndex);
    },
    infoShow() {
      this.infoVisible = true;
      this.loading = true
      this.$post
        .postData(
          "findBydealStatusAndRenYuan",
          JSON.stringify(this.findBydealStatusAndRenYuan_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            if(res.data){
              this.tableInfoData = res.data.rows;
            this.total1 = res.data.total;
            // console.log(this.total1);
            //根据状态 修改消息状态
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
            }
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkTree(data) {  //点击左侧树  选中团队
      this.teamidArr = []
      console.log(data);
      if (data.id != "99" && data.id != "999") {
        this.checkId = data.id;
        this.checkName = data.text;
        this.isDelete = data.isdelete;
        this.isParent = data.parentId == "root" ? true : false;
        this.teamidArr.push(data.id)
        this.deep(data)
        this.teamidStr = this.teamidArr.join(',')
        console.log(this.teamidStr)
        this.getTableData();
      }
      if (data.id == "99") {
        this.isDelete = "0";
        this.checkId = "";
        this.tableData = [];
      } else if (data.id == "999") {
        this.isDelete = "1";
        this.checkId = "";
        this.tableData = [];
      }
      this.showTeamCommand = data.isdelete == '1'?false:true;
    },
    //选中团队 递归循环  获取团队名和下面的子团队名
    deep(val){
      if(val.children && val.children.length>0){
        val.children.forEach(item => {
          this.teamidArr.push(item.id)
          this.deep(item)
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    //上移下移
    colDown(index, row) {
      // console.log(this.tableData[index].xuhao)
      this.tableData[index].xuhao += 1;
      this.tableData[index + 1].xuhao -= 1;
      this.tableData[index] = this.tableData.splice(
        index + 1,
        1,
        this.tableData[index]
      )[0];
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
        if (this.checkId != "") {
          this.childType = "add";
        this.childTeamTitle = "新建子团队";
            this.showDialogChildteam = true;
          } else {
            this.$message({
              showClose: true,
              message: "请选择团队",
              type: "warning"
            });
          }
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
    teamshowCompDialog(type) {
      this.showDialogTeam = false;
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
    // 添加成员
    addMember(type) {
      if (this.checkId != "") {
        this.treeType = type;
        this.showTreeCheckbox = true;
        console.log(this.checkId);
      } else {
        this.$message({
          showClose: true,
          message: "请选择团队",
          type: "warning"
        });
      }
    },
    subshowCompDialog(type) {
      if (type) {
        console.log("更新表格");
        this.tableData = [];
        this.initTable();
      }
      this.showTreeCheckbox = false;
    },
    batchDelet() {
      //负责人、管理员 不能被删除
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
            // console.log(this.multipleSelection);
            // 处理当前选中的数据 
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
            this.isCanBatchDelet(parmas);  //判断能否删除
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
            this.confirm(parmas);  //弹框提示
          } else {
            let idArr = [];
            let row = { id: "" };
            res.data.forEach(item => {
              idArr.push(item.id);
            });
            row.id = idArr.join(",");
            this.toDelete(row);  //删除
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
    //单个删除
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
       this.$alert(
        row.userName +
          ",有流转中的任务未办结，无法删除",
        "提示",
        {
          confirmButtonText: "确定",
        }
      )
        .then(() => {
          // this.showTransFer = true;
          // this.TransFerId = row.id;
          // this.TransFerTeamId = row.teamId;
          // this.TransUserId = row.userId;
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
        "负责人": "1",
        "管理员": "2",
        "负责人,管理员": "1,2",
        "一般成员": "3"
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
      this.showTeamNotice = false;
    },
    teamNotice() {
      this.showTeamNotice = true;
      // if (this.checkId != "") {

      //   // console.log(this.form)
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: "请选择团队",
      //     type: "warning"
      //   });
      // }
    },
    btnClick(index) {
      this.tableInfoData = [];
      this.activeIndex = index;
      this.getTableInfo(index);
    },
    //消息
    getTableInfo(index) {
      this.loading = true
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
              if(res.data){
              this.tableInfoData = res.data.rows;
              this.total1 = res.data.total;
              if( index == 0  ){
                if( this.total1 > 0 ){
                  this.btn_xiaoxi_s = true;
                }else{
                  this.btn_xiaoxi_s = false;
                }
              }
              console.log(this.total1);
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
              }
              this.loading = false
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
            console.log(res);
            if (res.success) {
              if(res.data){
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
                }
              });
            }
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
.box_shadow{
  min-height: 700px;
  max-height: 1000px;
  overflow-y:auto;
}
.tree_box ::-webkit-scrollbar{
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
.span-ellipsis{
  font-size: 14px;
  color: #333;
  height: 18px;
  line-height: 18px;
}
.gray{
  color: rgb(128, 128, 128);
}
/deep/ .el-tree-node__children .span-ellipsis{
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