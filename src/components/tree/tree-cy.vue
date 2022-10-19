<template>
  <div class="treeWrap">
    <!--懒加载和非懒加载切换示使用-->
    <el-dialog
      v-dialogDrag
      :title="dialogTit"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="cancelSetDialog"
      width="50%"
    >
      <el-row>
        <el-col :span="12">
          <div class="title">
            <span>{{titleWords}}</span>
            <div class="rightwrap">
              <el-checkbox @change="getOffenUserInfo" v-model="offenUseConfig.set">常用发送对象</el-checkbox>
              <!-- <span class="setfont" @click="getOffenUserById">设置</span> -->
            </div>
          </div>
          <div class="tree_w box_shadow">
            <el-scrollbar v-if="loadingState">
              <el-tree
                show-checkbox
                v-show="loadingTreeCopy&&tabTreeFlag&&!offenUserFlag"
                ref="comptreeLoadForcy"
                :check-on-click-node="true"
                :default-expanded-keys="openIds"
                :check-strictly="false"
                @check="checkTree"
                node-key="id"
                :load="loadNode"
                @node-click="handleNodeClick"
                lazy
                :props="defaultProps"
              >
                <span
                  :title="node.label"
                  :class="['custom-tree-node',{'userflag':data.TYPE == 'user'}]"
                  slot-scope="{ node,data }"
                >
                  <i
                    :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                  >{{node.label}}</i>
                </span>
              </el-tree>
              <template v-if="tabTreeFlag&&!offenUserFlag">
                <el-tree
                  :data="treeDataCopy"
                  v-show="!loadingTreeCopy"
                  show-checkbox
                  ref="comptreeForcy"
                  :check-on-click-node="true"
                  :check-strictly="false"
                  @check="checkTree"
                  node-key="id"
                  :default-expand-all="true"
                  :props="dialogType=='dosend'&&!offenUserFlag?senddefaultProps:defaultProps"
                >
                  <span :title="node.label" class="custom-tree-node" slot-scope="{ node,data }">
                    <i
                      :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                    >{{node.label}}</i>
                  </span>
                </el-tree>
              </template>
              <template>
                <el-tree
                  :data="treeDataCopy"
                  v-show="offenUserFlag"
                  show-checkbox
                  ref="comptreeOffenUser"
                  :check-on-click-node="true"
                  :check-strictly="false"
                  @check="checkTree"
                  node-key="id"
                  :default-expand-all="true"
                  :props="defaultProps"
                >
                  <span :title="node.label" class="custom-tree-node" slot-scope="{ node,data }">
                    <i
                      :class="data.TYPE == 'user'?'el-icon-s-custom':'el-icon-folder-opened'"
                    >{{node.label}}</i>
                  </span>
                </el-tree>
              </template>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck"
              style="float:right"
              size="mini"
              :disabled="nowCheckList.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow tree_w">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList" :key="index">
                <template>
                  <div class="command_wrap">
                    <span :title="item.name" class="name">{{item.name}}</span>
                    <div class="one_btn">
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="upRow(index)"
                        :disabled="index==0||item.disabled"
                        round
                      >上移</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click.native="downRow(index)"
                        :disabled="index==nowCheckList.length-1||item.disabled"
                        round
                      >下移</el-button>
                      <el-button
                        type="warning"
                        size="mini"
                        :disabled="item.disabled"
                        @click.native="deleteRow(index)"
                        round
                      >删除</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="isCyPage">
        <el-form ref="circulateExplainInfoForm" :model="circulateExplainInfo">
        <el-form-item label="传阅说明" style="text-align:left">
          <el-input maxlength="500" v-model="circulateExplainInfo.info" style="margin-right:20px" type="textarea" resize="none" autosize></el-input>
        </el-form-item>
      </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
    <treeChild
      :subdialogTit="subdialogTit"
      :suboffenUse="suboffenUse"
      :subcheckIds="subcheckIds"
      :subcanTab="subcanTab"
      :subsingelCheckF="subsingelCheckF"
      :subdialogState="subdialogState"
      :subLoadingTree="subLoadingTree"
      :subCheckdata="subCheckdata"
      @subshowCompDialog="subshowCompDialog"
    ></treeChild>
  </div>
</template>

<script>
import treeChild from "./tree-childcy";
export default {
  components: { treeChild },
  props: {

    treeTradeCode: {
      default: "A08462023",
      type: String,
    },
    checkOrg: {
      //全选设置，值为true时可全选
      default: false,
      type: Boolean
    },
    fromdata: {
      type: Object,
      default: () => {}
    },
    titleWords: {
      default: "选择部门",
      type: String
    },
    dialogTit: String,
    dialogState: Boolean,
    singelCheckF: {
      default: false,
      type: Boolean
    },
    checkIds: {
      default: () => {
        return [];
      },
      type: Array
    },
    checkData: {
      default: () => {
        return [];
      },
      type: Array
    },
    spicalTree: {
      default: false,
      type: Boolean
    },
    canTab: {
      default: false,
      type: Boolean
    },
    isCY: {
      default: false,
      type: Boolean
    },
    treeData: {
      default: () => {
        return [];
      },
      type: Array
    },
    seletOptionsData: {
      default: () => {
        return [];
      },
      type: Array
    },
    hasRadio: {
      default: false,
      type: Boolean
    },
    offenUse: {
      default: false,
      type: Boolean
    },
    dialogType: {
      default: "hui",
      type: String
    },
    dialogTypeNow: {
      default: "",
      type: String
    },
    isCyPage: {//传阅页面展示
      default: false,
      type: Boolean
    },
    loadingTree: {
      default: false,
      type: Boolean
    },
    loadTreeSelect: {
      pcsAvyId: {
        default: "",
        type: String
      },
      curTplNo: {
        default: "",
        type: String
      },
      curMultiTenancyId: {
        default: "",
        type: String
      }
    },
    orgId: {
      default: "", //请求当前制定部门 id
      type: String
    },
    handleLoadFlag: {
      default: true,
      type: Boolean
    },
    subOrgFlag: {
      default: true,
      type: Boolean
    },
    fixNoLoadingTree: {
      default: false, //树固定 为非懒加载模式
      type: Boolean
    },
    scircularizeLevel: {
      default: "1", //标识一次  二次传阅
      type: String
    },
    pId:String,
    offType:Boolean,
    sType:Boolean,
  },
  data() {
    return {
      openIds:[],
      circulateExplainInfo:{
        info:''
      },//传阅说明
      curNowUserId: "",
      loadingState: false, //处理切换加载不同状态
      setLabelwidth: "", //宽度设置
      setNewValue: true, //赋值 处理多次加载
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: true, // 单选true 多选为false
      subdialogTit: "常用发送对象设置", // 弹框标题
      subdialogState: false,
      subcheckIds: [], //常用联系id
      subCheckdata: [], //常用联系人全部数据
      subLoadingTree: true, //常用联系人加载
      selectInfo: {
        name: "",
        id: ""
      },
      treeForm: {
        function: "selectUserByUnitTree",
        unitCode: "",
        flag: this.subOrgFlag
      },
      bank_redheader: {
        function: "selectUserByUnitTree",
        unitId: 1
      },
      offenUseConfig: {
        options: [
          {
            name: "拟稿",
            id: "draft"
          },
          {
            name: "处审核",
            id: "draft1"
          },
          {
            name: "部门领导审核",
            id: "draft2"
          },
          {
            name: "综合处理",
            id: "draft3"
          },
          {
            name: "部门核稿",
            id: "draft4"
          },
          {
            name: "部门签发",
            id: "draft5"
          }
        ],
        nextNodeId: "",
        set: false
      },
      dialogVisible: false,
      checkedCities: [],
      panelNum: 0,
      nowCheckList: [],
      senddefaultProps: {
        children: "children",
        label: "unitShort",
        isLeaf: "leaf"
      },
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "isLeaf"
      },
      defaultHuiProps: {
        children: "content",
        label: "text"
      },
      //请求树结构
      bank_send: {
        function: "selectUserByCirculate",
        flag: true,
        level: this.scircularizeLevel
      },
      loadingTreeCopy: false,
      tabTreeFlag: true,
      offenUserFlag: false, //常用联系人标示
      treeDataCopy: [],
      treeResolve: "",
      bank_subSelectByUserId: {
        //查询常用联系人
        function: "selectByUserId"
      },
    };
  },
  mounted() {},
  methods: {
    //懒加载数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.node_has = node;
        this.resolve_has = resolve;
        let obj = {
          id: this.orgId,
          pcsAvyId: this.selectInfo.id,
          level: 0
        };
        this.handleLoadTree(obj, resolve);
      }
      if (node.level > 0) {
        let obj = {
          id: node.data.id
        };

        this.handleLoadTree(obj, resolve).then(back => {
          if (back.state && back.data.length && node.level > 1) {
            node.data.disabled = false;
          }
        });
      }
    },
    //获取保存的常用联系人
    getConfigUserInfo(flag) {
      // this.$post  //12.25号 之前的逻辑 先获取设置的常用联系人 再调用接口
      //   .postData("selectByUserId", JSON.stringify(this.bank_subSelectByUserId), this.$businessCode.ggywgn)
      //   .then(res => {
      //     if (res && res.success) {
      //       if(flag){
      //         this.getTreeInfo(true,res.data && res.data.contacts||'')
      //       }
      //       this.subCheckdata = res.data && res.data.contacts&&JSON.parse(res.data.contacts)||[];
      //       this.subCheckdata.map((node)=>{
      //         this.subcheckIds.push(node.id);
      //       })

      //     }else{
      //       this.$message({
      //         type: "warning",
      //         offset: 400,
      //         showClose: true,
      //         message: res.message,
      //         duration: 1000
      //       });
      //     }
      //   })
      //   .catch(erro => {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "后端返回常用联系人失败",
      //       duration: 1000
      //     });
      //   });
      this.getTreeInfo(true, true);
    },
    //常用联系人查询
    getOffenUserInfo() {
      if (this.offenUseConfig.set) {
        this.getConfigUserInfo(true, true); //请求后端 查询常用人
      } else {
        this.getTreeInfo();
      }
    },
    //回显常用人
    getOffenUserById() {
      this.subdialogState = true;
      this.getConfigUserInfo();
    },
    subshowCompDialog(data, type) {
      //嵌套弹层
      if (this.subdialogState && type) {
        this.subcheckIds = data[0] ? [].concat(data[0].id) : [];
      }
      this.subdialogState = !this.subdialogState;
    },
    // 组织树操作
    handleNodeClick(data) {
      this.handleLoadTree(data);
    },
    async handleLoadTree(obj, resolve) {
      let backState = { state: false };
      let treeParams = "selectUserByUnitTree";
      if (!this.handleLoadFlag) {
        return false;
      }
      if (this.isCY == true) {
        this.treeForm.function = "selectUserByUnitTreeCY";
        this.treeForm.unitCode = (obj && obj.id) || "";
        await this.$post
          .postData(
            "selectUserByUnitTreeCY",
            JSON.stringify(this.treeForm),
            this.treeTradeCode
          )
          .then(res => {
            backState.state = true;
            backState.data = res.data;
            resolve(res.data);
          });
      } else {
        this.treeForm.unitCode = (obj && obj.id) || "";
        if (this.scircularizeLevel == "1") {
                  if(this.sType){
                      this.treeForm.authUnitCode="";
                      this.treeForm.pId='';
                  }else{
                     this.treeForm.authUnitCode=(obj && obj.id) || "";
                      this.treeForm.pId=this.pId;
                      this.sType=true;
                      this.$emit("changeState",this.sType)
                  }
          this.treeForm.function = "selectUserByUnitTree";
        } else {
          this.treeForm.function = "selectUserByCirculate";
          treeParams = "selectUserByCirculate";
          this.treeForm.flag = true;
          this.treeForm.level = "2";
          // this.treeForm.unitCode = this.orgId;
          this.treeForm.curUserId = this.curUserId; //二次传阅添加参数
        }
        await this.$post
          .postData(
            treeParams,
            JSON.stringify(this.treeForm),
            this.treeTradeCode
          )
          .then(res => {
            let checkNowIds = []; //懒加载中需要被选中的id
            if (
              obj.level === 0 &&
              res.data &&
              res.data.length &&
              res.data[0].TYPE != "user"
            ) {
              res.data[0].disabled = true;
            }
            if (res.data && res.data.length) {
              res.data.map(node => {
                if (node.TYPE == "user") {
                  node.isLeaf = true;
                } else {
                  node.disabled = true;
                }
                //置为不可选
                this.checkIds.map(checkItem => {
                  if (node.id == checkItem) {
                    node.disabled = true;
                  }
                });
              });
            }
            if (this.loadingTree) {
              this.$nextTick(() => {
                // this.checkIds.map((checkItem)=>{
                //   res.data.map((treeItem)=>{
                //     if(treeItem.id == checkItem){
                //       checkNowIds.push(checkItem);
                //     }
                //   })

                // })
                if(obj.level == 0){
                  this.openIds = [res.data&&res.data[0]&&res.data[0].id];
                }
                this.nowCheckList.map(checkItem => {
                  checkNowIds.push(checkItem.id);
                });
                this.$refs[this.getTreeName()].setCheckedKeys(checkNowIds);
              });
            }
            backState.state = true;
            backState.data = res.data;
            resolve(res.data);
          });
      }
      return backState;
    },
    getTreeName() {
      let treeName = "";
      if (this.loadingTreeCopy) {
        treeName = "comptreeLoadForcy";
      } else {
        treeName = this.offenUserFlag ? "comptreeOffenUser" : "comptreeForcy";
      }
      return treeName;
    },
    //树形勾选
    checkTree(now, check, hascheck) {
      let nowNode = now;
      this.$nextTick(() => {
        let sendHuis = [];
        let newHuis = [];
        let orgChildNode = [];
        let nowCheckNode = [];
        let nowDisabNode = []; //当前禁用项
        let copyNowCheck = [].concat(this.nowCheckList);
        let byIds;
        let orgChildId;
        let sameUserNumb = 0;//相同人员

        if (this.singelCheckF) {
          this.nowCheckList = [];
          this.$refs[this.getTreeName()].setCheckedKeys([nowNode.id]);
        }
        orgChildNode = this.$refs[this.getTreeName()].getCheckedNodes();
        byIds = new Set(this.nowCheckList.map(d => d.id.split("/")[0]));
        orgChildId = new Set(orgChildNode.map(d => d.id.split("/")[0]));
        this.nowCheckList.map(d => {
          if (d.disabled) {
            nowDisabNode.push(d);
          }
        });
        //判断 是否同一机构下 和 不同机构
        // this.nowCheckList = [...this.nowCheckList.filter((d)=>{
        //   let resBack = false;
        //   if(d.disabled){
        //     nowDisabNode.push(d);
        //   }
        //   check.checkedKeys.map((node)=>{
        //     if(node == d.id){
        //       resBack = true;
        //     }
        //   })
        //   return resBack;
        // })];
        // if(nowDisabNode.length>this.nowCheckList.length && this.nowCheckList.length ==0){
        //   this.nowCheckList = copyNowCheck;
        // }
        //取消勾选时
        // if(check.checkedKeys.length<this.nowCheckList.length){
        //   this.nowCheckList.filter((uncheck)=>{
        //     return uncheck.id!=nowNode.id;
        //   })
        // }

        //此处要对已禁用的 作拦截
        nowCheckNode = this.$refs[this.getTreeName()]
          .getCheckedNodes()
          .filter(d => !byIds.has(d.id.split("/")[0]));
        if (!this.singelCheckF) {
          if (nowCheckNode.length == 0) {
            if (nowNode.TYPE) {
              this.nowCheckList = this.nowCheckList.filter(uncheck => {
                return uncheck.id != nowNode.id;
              });
            } else {
              this.nowCheckList = this.nowCheckList.filter(
                d => !orgChildId.has(d.id.split("/")[0])
              );
              this.nowCheckList = [
                ...this.$refs[this.getTreeName()]
                  .getCheckedNodes()
                  .filter(d => {
                    return !d.disabled;
                  }),
                ...nowDisabNode
              ];
            }
          } else {
            nowCheckNode = nowCheckNode.filter(d => {
              let resBack = true;
              nowDisabNode.map(node => {
                if (node == d.id) {
                  resBack = false;
                }
              });
              return resBack;
            });
          }
        }
        this.nowCheckList = [...this.nowCheckList, ...nowCheckNode];
        //过滤多个不同群组 相同人员
        if(orgChildNode.length>1){
          orgChildNode.map((childNode)=>{
            if(childNode.id.split("/")[0] == nowNode.id.split("/")[0]){
              sameUserNumb++;
              if(sameUserNumb>1){
                this.$refs[this.getTreeName()].setChecked(childNode,false);
              }
            }
          })
        }

        this.nowCheckList.map(node => {
          //全选处理 TYPE = user
          if (!node.TYPE || (node.TYPE && node.TYPE != "user")) {
            return;
          }
          if (node.unitShort) {
            node.name = node.unitShort;
          }
          if (node.disabled) {
            sendHuis.push(node);
          } else {
            newHuis.push(node);
          }
        });
        this.nowCheckList = [].concat(sendHuis, newHuis);
      });
    },
    resetCheck() {
      let ableDelet = true;
      let Ids = []; //不可操作id
      this.nowCheckList = this.nowCheckList.filter(item => {
        if (item.disabled) {
          ableDelet = false;
          Ids.push(item.id);
        }
        return item.disabled;
      });
      if (this.canTab) {
        this.checkedCities = [];
        this.nowCheckList.forEach((item, m) => {
          this.deleteTabRow(m, true);
        });
      } else {
        //发送会签 不可操作
        if (ableDelet) {
          this.$refs[this.getTreeName()].setCheckedKeys([]);
        } else {
          this.$refs[this.getTreeName()].setCheckedKeys(Ids);
        }
      }
    },
    getTreeInfo(flag, fileterParams) {
      // let obj = {};
      // obj = this.seletOptionsData.find(item => {
      //   return item.PCSAVYID === this.offenUseConfig.nextNodeId;
      // });
      /******
       * selectUserByCirculate 一次传阅不带常用联系人：{flag:true,level："1"}
      一次传阅带常用联系人：{flag:true,level："1",setcontacts:"" }
      二次传阅不带常用联系人:{flag:true,level："2",unitCode:"" }
      二次传阅不带常用联系人:{flag:true,level："2",unitCode:"",setcontacts:"" }
       */
      this.tabTreeFlag = false;
      this.setNewValue = false;
      this.offenUserFlag = false; //常用联系人标示
      // this.selectInfo.name = obj.AVYNODENM;
      // this.bank_send.pcsAvyId = this.selectInfo.id = obj.PCSAVYID;
      // this.bank_send.curTplNo = obj.PTPLNO;
      let parms = Object.assign(this.bank_send, this.fromdata);
      parms.level = this.scircularizeLevel;
      // parms.pcsAvyId = obj.PCSAVYID;
      if (fileterParams) {
        parms.setcontacts = fileterParams;
      }
      else {
        delete parms.setcontacts;
        // this.nowCheckList = [];
        // this.checkedCities = [];
      }
      this.$post
        .postData(
          "selectUserByCirculate",
          JSON.stringify(parms),
          this.treeTradeCode
        )
        .then(res => {
          if (res && res.success) {
            this.treeDataCopy = [];
            this.setNewValue = true;
            this.tabTreeFlag = true;
            if (res.message == "Loading") {
              this.loadingTreeCopy = true;
              this.loadNode(this.node_has, this.resolve_has);
              this.$nextTick(() => {
                this.$refs.comptreeLoadForcy.emptyText = "";
                this.$refs.comptreeLoadForcy.root.childNodes = [];
              });
            } else {
              this.treeDataCopy = res.data || [];
              this.loadingTreeCopy = false;
              if (fileterParams) {
                this.offenUserFlag = true;
                if (this.treeDataCopy.length) {
                  this.treeDataCopy[0].disabled = true;
                }
                // this.$refs[this.getTreeName()].setCheckedKeys([]);
              }
            }
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 1000
            });
          }
          this.$forceUpdate();
        })
        .catch(erro => {});
    },
    upRow(n) {
      let midObj;
      midObj = this.nowCheckList[n];
      if (this.nowCheckList[n - 1].disabled) {
        return;
      }
      this.nowCheckList[n] = this.nowCheckList[n - 1];
      this.nowCheckList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      midObj = this.nowCheckList[n];
      this.nowCheckList[n] = this.nowCheckList[n + 1];
      this.nowCheckList[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n) {
      this.$refs[this.getTreeName()].setChecked(this.nowCheckList[n], false);
      this.nowCheckList.splice(n, 1);
    },
    cancelSetDialog() {
      this.$emit("showCompDialog", this.copyCheckList);
    },
    saveSetDialog() {
      if (!this.nowCheckList.length && this.dialogType == "dosend") {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择人员",
          duration: 1000
        });
        return;
      }
      let checknum=0;
      this.nowCheckList.forEach(item => {
        if(!item.disabled){
          checknum++;
        }
      })
      if(checknum==0){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择人员",
          duration: 1000
        });
        return;
      }
      //过滤人员名
      this.nowCheckList.filter(node => {
        node.name = node.name.split("/") && node.name.split("/")[0];
        node.id = node.id && node.id.split("/")[0]; //区分常用发送人相同人 不同群组
      });
      this.$emit(
        "showCompDialog",
        this.nowCheckList,
        true,
        this.dialogType,
        this.selectInfo,
        this.dialogTypeNow,
        this.circulateExplainInfo.info
      );
    },
    getCompData() {
      // 请求数据
      this.$nextTick(() => {
        this.backDialogData(this.dialogType);
      });
    },
    //数据回显勾选
    backDialogData(type) {
      let that = this;
      let deleId = [];
      let nowCheckIds = [];
      this.nowCheckList = this.checkData;
      switch (type) {
        case "zhusong":
          this.checkedCities = this.checkIds || [];
          break;
        case "chao":
          this.checkedCities = this.checkIds || [];
          break;
        case "hui":
          this.checkData.map(item => {
            if (item.disabled && item.hideType) {
              deleId.push(item.id);
            }
          });
          this.nowCheckIds = this.checkIds.filter(item => {
            let hasId = true;
            deleId.map(node => {
              if (node == item) {
                hasId = false;
              }
            });
            return hasId;
          });
          this.$refs[this.getTreeName()].setCheckedKeys(this.nowCheckIds || []); //选中
          break;
        case "cy":
          this.checkData.map(item => {
            if (item.disabled && item.hideType) {
              deleId.push(item.id);
            }
          });
          this.nowCheckIds = this.checkIds.filter(item => {
            let hasId = true;
            deleId.map(node => {
              if (node == item) {
                hasId = false;
              }
            });
            return hasId;
          });
          this.$refs[this.getTreeName()].setCheckedKeys(this.nowCheckIds || []); //选中
          break;
        case "ben":
          that.checkedCities = that.checkIds || [];
          break;
        case "dosend":
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        case "gonggao":
          this.$refs[this.getTreeName()].setCheckedKeys(this.checkIds || []); //选中
          break;
        default:
          this.checkedCities = this.checkIds || [];
          break;
      }
      this.nowCheckList = this.checkData.filter(item => {
        item.TYPE = "user";
        if (!item.hideType && this.dialogTypeNow != "zengfa") {
          item.disabled = false;
        }
        return !item.hideType; //为true 时 不显示
      });
    },
    deleteTabRow(n, flag) {
      let id = this.nowCheckList[n].id;
      if (!flag) {
        this.nowCheckList.splice(n, 1);
      }
      //根据当前切换栏操作相应元素
      this.checkedCities = this.checkedCities.filter(item => {
        return item != id;
      });
      this.treeData.forEach((item, m) => {
        item.content.forEach(list => {
          list.id === id ? (this.treeData[m].isIndeterminate = false) : "";
        });
      });
    },
    concatData(data,nodeProp,self) {
      data.map(node => {
        let childs = node.children && node.children.length && [].concat(node.children);
        let hasChild = childs && childs.length || 0;
        let deepChild = false;
        node.id = node.unitCode || node.id;
        if (node[nodeProp] && node[nodeProp].length) {
          node[nodeProp].map(item => {
            deepChild = item.children && item.children.length;
            item.id = item.unitCode || item.id;
            this.checkIds.map((checknode, n) => {
            if(checknode == item.id.split("/")[0] &&
                  self.checkData[n] &&
                  self.checkData[n].disabled){
                    item.disabled = true;
                  }
            })
          });
          if(nodeProp != 'children' ){
            node.children = [].concat(node[nodeProp], node.children);
          }
        }
        if (hasChild && deepChild) {
          this.concatData(childs,nodeProp,self);
        } else {
          node[nodeProp].map(item => {
            item.id = item.unitCode|| item.id;
            this.checkIds.map((checknode, n) => {
            if(checknode == item.id.split("/")[0] &&
                  self.checkData[n] &&
                  self.checkData[n].disabled){
                    item.disabled = true;
                  }
            })
          });
           if(nodeProp != 'children' ){
             node.children = node[nodeProp];
           }
        }
      });
      return data;
    },
    transformData(newv, canDo) {
      if (!canDo) {
        return;
      }
      if (
        (this.checkData.length && this.checkData[0].disabled) ||
        (this.checkData[0] && !this.checkData[0].hideType)
      ) {
        if (newv[0] && newv[0].children) {
          newv[0].children.map(item => {
            this.checkIds.map((node, n) => {
              if (
                (node == item.id && this.dialogTypeNow == "zengfa") ||
                (node == item.id &&
                  this.checkData[n] &&
                  this.checkData[n].hideType)|| (node == item.id.split("/")[0] &&
                  this.checkData[n] &&
                  this.checkData[n].disabled)
              ) {
                item.disabled = true;
              }
            });
          });
        }
      }
      if (
        this.dialogType == "dosend" &&
        !this.loadingTreeCopy &&
        newv &&
        newv[0] &&
        (newv[0].unitCode|| newv[0].id == 'root')
      ) {
        newv = this.concatData(newv,newv[0].id == 'root'?'children':'jsonUser',this);
      }
      if (newv.length || (newv.children && newv.children.length)) {
        this.treeDataCopy = newv;
        this.setNewValue = false;
        return;
      }
    }
  },
  created() {
    this.loadingTreeCopy = this.loadingTree;
    setTimeout(() => {
      this.loadingState = true;
    });
  },
  watch: {
    dialogState(newv, oldv) {
      this.offenUseConfig.set = false;
      this.subdialogState = false;
      this.offenUserFlag = false;
      if (newv) {
        this.copyCheckList = this.checkIds;
        this.nowCheckList = [];
        this.checkedCities = [];
        this.circulateExplainInfo.info = "";
        this.getCompData();
      } else {
        this.getOffenUserInfo();
      }
      this.dialogVisible = newv;
    },
    seletOptionsData: {
      handler(newv) {
        this.offenUseConfig.nextNodeId =
          this.seletOptionsData.length > 0
            ? this.seletOptionsData[0].PCSAVYID
            : "";
        this.selectInfo.id = this.offenUseConfig.nextNodeId;
        this.selectInfo.name =
          this.seletOptionsData.length > 0
            ? this.seletOptionsData[0].AVYNODENM
            : "";
      },
      deep: true
    },
    loadingTree: {
      handler(newv) {
        this.loadingTreeCopy = newv;
      }
    },
    treeDataCopy: {
      handler(newv) {
        if (!this.loadingTreeCopy) {
          this.transformData(newv, this.setNewValue);
        }
      }
    },
    treeData: {
      handler(newv) {
        this.setNewValue = true;
        this.loadingTreeCopy = this.loadingTree;
        if (newv.length && !this.loadingTreeCopy) {
          this.transformData(newv, this.setNewValue);
          // if(this.loadingTreeCopy){
          //   this.$refs.comptreeLoad.root.childNodes = newv;
          // }
        }else{
          this.openIds = [newv&&newv[0]&&newv[0].id];
          this.openIds.push(newv[0].id)
        }
      }
    }
  }
};
</script>
<style  lang="less" scoped>
.treeWrap .el-col-12 {
  padding-right: 20px;
}
.box_shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 10px;
  overflow: hidden;
  height: 28px;
}
.tree_w {
  max-width: 440px;
  height: 400px;
  padding-left: 20px;
}
.tree_tab {
  height: 400px;
  padding-left: 20px;
}
.tree_canTab {
  max-width: 240px;
  height: 400px;
}
/deep/ .el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
/*/deep/ .el-tree-node__content .el-checkbox{*/
/*  display: none;*/
/*}*/
/deep/ .custom-tree-node.userflag ~ .el-checkbox {
  display: none;
}
.el-scrollbar {
  height: 100%;
}
.el-icon-s-custom:before {
  color: #409eff;
}
.comp_wrap {
  height: 400px;
  padding: 14px;
  overflow-y: scroll;
  .comp_list {
    height: 30px;
    line-height: 30px;
  }
  .select_obj {
    word-break: break-all;
    white-space: nowrap;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.pad_20 {
  padding: 20px;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 2px 8px;
}
.selectlist {
  width: 100%;
  padding: 20px 0;
}
.el-select-dropdown {
  .el-select-dropdown__wrap {
    max-height: auto;
  }
  .el-scrollbar__bar.is-vertical {
    display: none;
  }
}

.rightwrap {
  float: right;
  .setfont {
    font-size: 14px;
    color: #409eff;
    padding-left: 20px;
    cursor: pointer;
  }
}
/deep/ .el-tabs__nav-scroll {
  height: 400px;
  overflow-y: scroll;
}

/deep/ .el-tabs--left {
  height: 400px;
}
/deep/ .el-form-item__content{
  margin-right: 20px;
}
/deep/ .el-checkbox-group .el-checkbox {
  margin-bottom: 20px;
  display: block;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 280px;
  .one_btn {
    width: 300px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    text-align: left;
  }
  .btns {
    width: 300px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    text-align: left;
  }
  .name {
    white-space: nowrap;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-overflow: ellipsis;
    min-width: 200px;
    overflow: hidden;
  }
}
/deep/ .el-scrollbar__bar.is-vertical {
  width: 10px;
}
</style>
