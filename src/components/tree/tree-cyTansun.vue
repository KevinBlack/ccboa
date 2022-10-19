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
            <div class="rightwrap"  v-if="isShowOffenUse">
              <el-checkbox @change="getOffenUserInfo" v-model="offenUseConfig.set">常用发送对象</el-checkbox>
              <!-- <span class="setfont" @click="getOffenUserById">设置</span> -->
            </div>
          </div>
          <div class="tree_w box_shadow" :style="{ height: setTreeWHeight > 0 ? setTreeWHeight + 'px' : '' }">
            <el-scrollbar v-if="loadingState">
              <el-tree
                show-checkbox
                v-show="loadingTreeCopy&&tabTreeFlag&&!offenUserFlag"
                ref="comptreeLoadForcy"
                :check-on-click-node="true"
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
          <div class="box_shadow tree_w" :style="{ height: setTreeWHeight > 0 ? setTreeWHeight + 'px' : '' }">
            <el-scrollbar>
              <div v-for="(item,index) in nowCheckList" :key="index">
                <template>
                  <div class="command_wrap">
                    <span :title="item.name" class="name">{{item.name}}</span>
                    <div class="one_btn">
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

      <!-- 具名插槽，二次传阅需要写 传阅说明(非必填) 时使用， 20211116， 1217功能需求 -->
      <slot name="secondCirculation"></slot>
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
      type: String
	},
	isShowOffenUse:{//是否显示常用发送对象，false不显示
      default: true,
      type: Boolean
    },
    isEmpty: {
      //false组件未选人时点击确定清空数据条件之一
      default: true,
      type: Boolean,
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
    
    setTreeWHeight: { // 设置 tree_w 的高度，在style上增加了判断，只有当 setTreeWHeight > 0 时才会生效
      type: Number,
      default: 0
    }
  },
  data() {
    return {
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
        st: !!sessionStorage.getItem("st1")?sessionStorage.getItem("st1"):localStorage.getItem("st"),
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
      }
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
      console.log('二次传阅-----',obj)
      let backState = { state: false };
      let treeParams = "selectUserByUnitTree";
      if (!this.handleLoadFlag) {
        return false;
      }
      if (this.isCY == true) {
        this.treeForm.function = "selectUserByUnitTreeCY";
        this.treeForm.unitCode = (obj && obj.id) || "";
        this.isCY == false,
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
      
        if (this.scircularizeLevel == "1") {
          this.treeForm.function = "selectUserByUnitTree";
            this.treeForm.unitCode = (obj && obj.id) || "";
        } else {
          this.treeForm.function = "selectUserByCirculate";
          treeParams = "selectUserByCirculate";
          this.treeForm.flag = true;
          this.treeForm.level = "2";
          this.treeForm.unitCode = (obj && obj.id) || "";
          this.treeForm.curUserId = this.curUserId; //二次传阅添加参数
        }
        await this.$post
          .postData(
            treeParams,
            JSON.stringify(this.treeForm),
            this.treeTradeCode
          )
          .then(res => {
            console.log("-------------------组件获取传阅联系人");
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
                  try{
                    console.log('置为不可选',node,node.idStr,checkItem)
                  if (checkItem.split(" ").includes(node.idStr.toString())) {
                    node.disabled = true;
                    node.isLeaf=true;
                    this.$refs[this.getTreeName()].setCheckedKeys([nowNode.id]);
                  }}catch(e){
                    console.log(e)
                  }
                });
              });
            }
            if (this.loadingTree) {
              this.$nextTick(() => {
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
      console.log('--------勾选节点-------------',check.checkedNodes);
      
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
		 if (this.singelCheckF) {
          this.nowCheckList = [];
          this.$refs[this.getTreeName()].setCheckedKeys([nowNode.id]);
          this.nowCheckList= this.$refs[this.getTreeName()].getCheckedNodes()
          console.log('singelCheckF',this.nowCheckList)
        }else{
          nowCheckNode=check.checkedNodes;
          console.log('合并数据',nowCheckNode);
          this.nowCheckList=nowCheckNode;
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

        console.log('nowCheckList展示',[].concat(sendHuis, newHuis));
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
      } else {
        delete parms.setcontacts;
      }
     // this.nowCheckList = [];
     // this.checkedCities = [];
      let self = this;
      this.$api.dailyWork
        .getCyPersonNomal(parms)
        .then(res => {
          console.log("------传阅start----");
          console.log(res);
          try {
            var success = res.code;
            var message = res.msg;
          } catch (e) {
            var success = res.success;
            var message = res.message;
          }

          if (res && success) {
            self.treeDataCopy = [];
            self.setNewValue = true;
            self.tabTreeFlag = true;
            if (message == "Loading") {
              self.loadingTreeCopy = true;
              self.loadNode(self.node_has, self.resolve_has);
              self.$nextTick(() => {
                self.$refs.comptreeLoadForcy.emptyText = "";
                self.$refs.comptreeLoadForcy.root.childNodes = [];
              });
            } else {
              self.treeDataCopy = res.data;
              self.loadingTreeCopy = false;
              if (fileterParams) {
                self.offenUserFlag = true;
 		if(self.treeDataCopy.length){
                  self.treeDataCopy[0].disabled = true;
                }
                self.$refs[self.getTreeName()].setCheckedKeys([]);
              }
            }
          } else {
            self.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: message,
              duration: 1000
            });
          }
          self.$forceUpdate();
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
      if (!this.nowCheckList.length && this.dialogType == "dosend"&&this.isEmpty) {
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
      this.nowCheckList.filter((node)=>{
        node.name = node.name.split("/")&& node.name.split("/")[0];
        node.id = node.id && node.id.split("/")[0];//区分常用发送人相同人 不同群组
      })
      this.$emit(
        "showCompDialog",
        this.nowCheckList,
        true,
        this.dialogType,
        this.selectInfo,
        this.dialogTypeNow
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
    concatData(data) {
      data.map(node => {
        let childs = [].concat(node.children);
        let hasChild = childs.length;
        node.id = node.unitCode;
        if (node.jsonUser && node.jsonUser.length) {
          node.jsonUser.map(item => {
            item.id = item.unitCode;
          });
          node.children = [].concat(node.jsonUser, node.children);
        }
        if (hasChild) {
          this.concatData(childs);
        } else {
          node.jsonUser.map(item => {
            item.id = item.unitCode;
          });
          node.children = node.jsonUser;
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
                  this.checkData[n].hideType)
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
        newv[0].unitCode
      ) {
        newv = this.concatData(newv);
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
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
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
    height: 42px;
    line-height: 42px;
  }

  .select_obj {
    word-break: break-all;
    white-space: nowrap;
    height: 42px;
    line-height: 42px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.pad_20 {
  padding: 20px;
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

/deep/ .el-checkbox-group .el-checkbox {
  margin-bottom: 20px;
  display: block;
}

.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 280px;

  .one_btn {
    width: 80px;
    height: 42px;
    line-height: 42px;
  }

  .btns {
    width: 300px;
    height: 42px;
    line-height: 42px;
    white-space: nowrap;
    text-align: left;
  }

  .name {
    white-space: nowrap;
    height: 42px;
    line-height: 42px;
    display: inline-block;
    text-overflow: ellipsis;
    min-width: 200px;
    overflow: hidden;
  }
}
</style>