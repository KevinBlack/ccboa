<template>
  <el-container id="IndexFlag">
    <el-header class="header">
      <el-row>
        <el-col :span="3" style="padding-top: 30px;">
          <img style="width:100%;max-width:300px" src="../../assets/images/logo.png" />
          <i v-if="false" class="el-icon-s-operation collapseIcon"></i>
        </el-col>
        <el-col :offset="1" :span="16" style="padding-top: 10px;">
          <el-menu
            :default-active="currentNode"
            class="el-menu-demo"
            mode="horizontal"
            hidden-md-only
          >
            <template v-for="(item, index) in routeTop">
              <el-menu-item
                v-if="index<NowShowNum-1&&!item.hidden"
                :key="index"
                :index="index.toString()"
                @click="handleSelectMenu(item, index)"
              >{{item.meta.title}}</el-menu-item>
            </template>
            <el-submenu index="2" v-if="!(NowShowNum>routeTop.length)">
              <template v-for="(item, num) in routeTop">
                <el-menu-item
                  :key="num"
                  :index="num.toString()"
                  @click="handleSelectMenu(item, num)"
                  v-if="num>NowShowNum-2"
                >{{item.meta.title}}</el-menu-item>
              </template>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="4" style="padding-top: 15px;">
          <el-row>
            <el-col :span="20">
              <el-menu class="el-menu-demo mt_10" mode="horizontal" text-color="#000">
                <el-submenu
                  index="1"
                  style="width: 100%;text-align:right;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"
                  placement="bottom-end"
                >
                  <template slot="title">
                    <span :title="ccboaLoginUserName" style="display:inline-block;width:100%;color:#fff;text-align:right;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{ ccboaLoginUserName }}</span>
                  </template>
                  <el-submenu index="1-1" v-show="haveOrg">
                    <template slot="title" style="color: #000;margin-left:50px;">切换机构</template>
                    <div style="height:300px;overflow:scroll;" class="scollOut">
                      <el-scrollbar>
                        <el-menu-item style="color: #000;" v-for="(item, id) in orgList" :key="id">
                          <el-button
                            type="text"
                            style="width: 100%;text-align: left;"
                            @click="handleChangeOrg(item)"
                          >{{item.unitName}}</el-button>
                        </el-menu-item>
                      </el-scrollbar>
                    </div>
                  </el-submenu>
                  <el-submenu index="1-2" v-show="haveAgent">
                    <template slot="title" style="color: #000;margin-left:50px;">切换代理</template>
                    <div style="height:300px;overflow:scroll;" class="scollOut">
                      <el-scrollbar>
                        <el-menu-item
                          style="color: #000;"
                          v-for="(item, id) in proxyUserInfo"
                          :key="id"
                        >
                          <el-button
                            type="text"
                            style="width: 100%;text-align: left;"
                            @click="handleChangeAgent(item)"
                          >{{item.humanName}}</el-button>
                        </el-menu-item>
                      </el-scrollbar>
                    </div>
                  </el-submenu>
                  <el-menu-item index="1-3" style="color: #000;" @click="handleLoginout">退出登录</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
            <el-col :span="4" style="padding-top: 6px;text-align: right;">
              <el-button class="btn_globalsearch" @click="handleShowSearch"></el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- <treeCofig  :dialogTit="dialogTit" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog"></treeCofig> -->
      <!-- 侧边栏aside，children里的值 -->
      <LeftNav
        @changeSideBtn="getCollapse"
        :currentNode="currentNode"
        :collapseInfo="isCollapse"
        :sideTreeData="routeTop"
      ></LeftNav>
      <!-- 主体main -->
      <el-main class="content" :class="{'content-expand': isCollapse}">
        <div class="cont-topline">
          <div class="btn-collapse" @click="handleIsCollapse">
            <svg
              v-if="btnCollapse"
              :class="{'is-active':isCollapse}"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#409EFF"
            >
              <path
                d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
              />
            </svg>
          </div>
          <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path">
              <router-link :to="item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card>
          <!-- <el-button @click.native="showCompDialog">树弹框</el-button> -->
          <slot></slot>
        </el-card>
      </el-main>
      <el-card  class="box-card tsxx-card" v-show="TSXXDialog">
      <div slot="header" style="text-align:center;background: #409eff;color: #fff;font-size:16px;" class="clearfix">
        <span>咨询电话</span>
        <el-button type="text" icon="el-icon-arrow-left" size="medium"
        style="margin-left:90px;color:#fff"
        @click="deleteTSXX()"></el-button>
      </div>
      <div style="height:150px;overflow: scroll;" id="phoneDiv">
      <el-scrollbar>
      <div v-for="item in TSXXData" :key="item" class="text item" style="padding:10px;">
        <span style="line-height:20px;font-size:12px;">{{item}}</span>
      </div>
      </el-scrollbar>
      </div>
    </el-card>
    <el-tooltip class="item" effect="dark" content="咨询电话" placement="right">
      <el-button type="primary" v-show="!TSXXDialog" icon="el-icon-arrow-right" size="medium" class="tsxx-card-btn" circle @click="deleteTSXX()"></el-button>
    </el-tooltip>
    <el-card v-dialogDrag class="box-card tsxx-card1" v-show="TSXXDialog1">
      <div slot="header" style="text-align:center;background: #409eff;color: #fff;" class="clearfix">
        <span>初始化程序</span>
        <el-button type="text" icon="el-icon-arrow-left" size="medium"
        style="margin-left:70px;color:#fff"
        @click="deleteTSXX1()"></el-button>
      </div>
      <el-button id="downFileTSXX" @click="downFileTSXX" style="width: 50%;margin-left: 25%;" type="primary" size="small">下载</el-button>
    </el-card>
    <el-tooltip class="item" effect="dark" content="初始化程序" placement="right">
      <el-button type="primary" v-show="!TSXXDialog1" icon="el-icon-arrow-right" size="medium" class="tsxx-card-btn1" circle @click="deleteTSXX1()"></el-button>
    </el-tooltip>
    </el-container>
  </el-container>
</template>

<script>
import LeftNav from "@/components/nav/left-nav";
import minixs from "@/minixs/index";
// import mcRuteList from "../../../mock/mock-routerList";
export default {
  components: {
    LeftNav
    // mcRuteList
  },
   mixins: [minixs],
  data() {
    return {
      TSXXData: ['1','2','3','4','5','6','1','2','3','4','5','6'],
      TSXXDialog: false,
      TSXXDialog1: false,
      routerList: [],
      drawer: false,
      inputVal: "",
      ccboaLoginUserName: "",
      isCollapse: false,
      btnCollapse: true,
      singelCheckF: false, // 单选true 多选为false
      dialogTit: "sdf", // 弹框标题
      dialogState: false,
      routeTop: [],
      routeSnd: [],
      currentNode: "0",
      levelList: null,
      haveAgent: false,
      haveOrg: false,
      agentName: [],
      agency: [],
      changeOrgInfo: {
        function: "checkswitchCurrentUser",
        humanId: "",
        proxy_HumanId: "",
        isProxier: "",
        proxy_HumanCode: "",
        flag: "1"
      },
      changeAgentInfo: {
        function: "checkswitchCurrentUser",
        humanId: "",
        proxy_HumanId: "",
        isProxier: "",
        proxy_HumanCode: "",
        flag: "0"
      },
      transInfo: "",
      screenWidth: document.documentElement.clientWidth,
      NowWidth: 0, //视野宽度的一半
      NowShowNum: 10, //展示数量

      // 机构
      orgList: [],
      // 人员
      proxyUserInfo: [],
      userInfo: ""
    };
  },
  methods: {
    deleteTSXX(){
      this.TSXXDialog = !this.TSXXDialog;
      localStorage.setItem('tsxx1', this.TSXXDialog == true? '1':'2')
    },
    deleteTSXX1(){
      this.TSXXDialog1 = !this.TSXXDialog1;
      localStorage.setItem('tsxx2', this.TSXXDialog1 == true? '1':'2')
    },
    downFileTSXX(file){
      let bank_doDownloadFile = {
        function: "doDownloadFile",
        filePath: "/home/ap/nas/log/file/p8Files/chushihuachengxu.zip",
        fileName:"chushihuachengxu.zip"
      };
       this.$post
        .postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), this.$businessCode.swglfj)
        .then(res => {
          if (res) {
              if (res && res.success) {
               downLoadFileReName(
                (this.$post.getEnvState()?location.origin:"http://localhost:8080")+"/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +res.fileName,
                "初始化程序.zip");
              }else{
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500,
                });
              }
          }
        });
    },
    showCompDialog() {
      this.dialogState = !this.dialogState;
    },
    handleOpen() {},
    handleClose() {},
    handleSelectMenu(item, index) {
      sessionStorage.removeItem('indextab');
      sessionStorage.removeItem('indexPage');
      sessionStorage.removeItem('indexSize');
      sessionStorage.removeItem('waitReadTab');
      sessionStorage.removeItem('waitReadPage');
      sessionStorage.removeItem('waitReadSize');
      sessionStorage.removeItem('ZXDB');
      sessionStorage.removeItem('ZXDBACTIVE');
      sessionStorage.removeItem('QBLIST');
      sessionStorage.removeItem('QBLISTtab');
      sessionStorage.removeItem('FWLIST');
      sessionStorage.removeItem('FWLISTtab');
      sessionStorage.removeItem('page_sw');
      sessionStorage.removeItem('tab_sw');
      sessionStorage.removeItem('searchDataIndex');
      sessionStorage.removeItem('MBLIST');
      sessionStorage.removeItem('MBLISTtab');
      // const removeArray=['indextab','indexPage','indexSize','waitReadTab','waitReadPage'
      // 'waitReadSize','ZXDB','ZXDBACTIVE','QBLIST','QBLISTtab','FWLIST',
      // 'FWLISTtab','page_sw','tab_sw','searchDataIndex']
      // removeArray.forEach(element => {
      //   sessionStorage.removeItem(element)
      // });
      if (index == this.currentNode) {
        this.$router.push({ path: item.path, query: { level: "root" } }).then(()=>{
          location.reload();
        })
      }else{
        this.$router.push({ path: item.path, query: { level: "root" } });
      }
      sessionStorage.setItem("currentNode", index);
      this.currentNode = index.toString();
    },
    handleAgentName(val) {
      this.agentName = [];
      this.agentName = val;
      // console.log(this.agentName)
    },
    handleChangeAgent(val) {
      let urlParams = {}; //跳转参数
      let urlPath = location.hash;
      let urlRout = "";
      let queryInfo = {
        path: "",
        query: {}
      }; //跳转配置
      this.changeAgentInfo.proxy_HumanId = val.humanId;
      this.changeAgentInfo.proxy_HumanCode = val.humanCode;
      this.changeAgentInfo.isProxier = val.isProxier;
      this.changeAgentInfo.humanId = this.userInfo.humanId;
      this.$post
        .postData(
          "checkswitchCurrentUser",
          JSON.stringify(this.changeAgentInfo),
          this.$businessCode.xtdl
        )
        .then(res => {
          if (res && res.success) {
            if(res.status == 1) {
              this.$confirm(res.message, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                this.$post
                  .postData(
                    "checkswitchCurrentUser",
                    JSON.stringify(Object.assign(this.changeAgentInfo, {status: 1})),
                    this.$businessCode.xtdl
                  )
                  .then(res => {
                    if (res && res.success) {
                      this.handleDeleteItem();
                      localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
                      localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
                      localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
                      localStorage.setItem(
                        "tcHumanRole",
                        JSON.stringify(res.tcHumanRole)
                      );
                      localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
                      localStorage.setItem("stayPages", "ufo");
                      sessionStorage.clear();
                      sessionStorage.setItem("stayPages", "ufo");
                      this.handleAdjust();
                      urlPath.split("?").map((url, n) => {
                        let urlJson = url.split("=");
                        if (n > 0) {
                          queryInfo.query[urlJson[0]] = urlJson[1];
                        } else {
                          queryInfo.query["staycopy"] = localStorage.getItem("st");
                        }
                      });
                      urlParams["staycopy"] = localStorage.getItem("st");
                      localStorage.setItem("st", "");
                      urlRout = urlPath.split("?")[0].split("#")[1];
                      queryInfo.path = urlRout;
                      this.$router.replace(queryInfo);
                      setTimeout(() => {
                        location.href = "#/home?level=root"
                        window.location.reload();
                      }, 1000);
                    }
                  })
              })
              .catch(() => {
                return;
              });
            } else {
              this.handleDeleteItem();
              localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
              localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
              localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
              localStorage.setItem(
                "tcHumanRole",
                JSON.stringify(res.tcHumanRole)
              );
              localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
              localStorage.setItem("stayPages", "ufo");
              sessionStorage.setItem("stayPages", "ufo");
              this.handleAdjust();
              urlPath.split("?").map((url, n) => {
                let urlJson = url.split("=");
                if (n > 0) {
                  queryInfo.query[urlJson[0]] = urlJson[1];
                } else {
                  queryInfo.query["staycopy"] = localStorage.getItem("st");
                }
              });
              urlParams["staycopy"] = localStorage.getItem("st");
              localStorage.setItem("st", "");
              urlRout = urlPath.split("?")[0].split("#")[1];
              queryInfo.path = urlRout;
              this.$router.replace(queryInfo);
              setTimeout(() => {
                location.href = "#/home?level=root"
                window.location.reload();
              }, 1000);
            }
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500,
            });
            return;
          }
        });
    },
    handleChangeOrg(val) {
      let urlParams = {}; //跳转参数
      let urlPath = location.hash;
      let urlRout = "";
      let queryInfo = {
        path: "",
        query: {}
      }; //跳转配置
      this.changeOrgInfo.proxy_HumanId = val.humanId;
      this.changeOrgInfo.proxy_HumanCode = val.humanCode;
      this.changeOrgInfo.isProxier = val.isProxier;
      this.changeOrgInfo.humanId = this.userInfo.humanId;
      this.$post
        .postData(
          "checkswitchCurrentUser",
          JSON.stringify(this.changeOrgInfo),
          this.$businessCode.xtdl
        )
        .then(res => {
          if (res && res.success) {
            if(res.status == 1) {
              this.$confirm(res.message, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
              .then(() => {
                this.$post
                .postData(
                  "checkswitchCurrentUser",
                  JSON.stringify(Object.assign(this.changeOrgInfo, {status: 1})),
                  this.$businessCode.xtdl
                )
                .then(res => {
                  if (res && res.success) {
                    this.handleDeleteItem();
                    localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
                    localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
                    localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
                    localStorage.setItem(
                      "tcHumanRole",
                      JSON.stringify(res.tcHumanRole)
                    );
                    localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
                    this.userInfo =
                      (localStorage.getItem("userInfo") &&
                        JSON.parse(localStorage.getItem("userInfo"))) ||
                      "";
                    localStorage.setItem("stayPages", "ufo");
                    sessionStorage.setItem("stayPages", "ufo");
                    this.handleAdjust();
                    urlPath.split("?").map((url, n) => {
                      let urlJson = url.split("=");
                      if (n > 0) {
                        queryInfo.query[urlJson[0]] = urlJson[1];
                      } else {
                        queryInfo.query["staycopy"] = localStorage.getItem("st");
                      }
                    });
                    localStorage.setItem("st", "");
                    urlRout = urlPath.split("?")[0].split("#")[1];
                    queryInfo.path = urlRout;
                    this.$router.replace(queryInfo);
                    setTimeout(() => {
                     location.href = "#/home?level=root"
                     window.location.reload();
                    }, 1000);
                  }
                })
              })
              .catch(() => {
                return;
              });
            } else {
              this.handleDeleteItem();
              localStorage.setItem("routerList", JSON.stringify(res.tcRightTree));
              localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
              localStorage.setItem("unitInfo", JSON.stringify(res.unitInfo));
              localStorage.setItem(
                "tcHumanRole",
                JSON.stringify(res.tcHumanRole)
              );
              localStorage.setItem("proxyUser", JSON.stringify(res.proxyUser));
              this.userInfo =
                (localStorage.getItem("userInfo") &&
                  JSON.parse(localStorage.getItem("userInfo"))) ||
                "";
              localStorage.setItem("stayPages", "ufo");
              sessionStorage.setItem("stayPages", "ufo");
              this.handleAdjust();
              urlPath.split("?").map((url, n) => {
                let urlJson = url.split("=");
                if (n > 0) {
                  queryInfo.query[urlJson[0]] = urlJson[1];
                } else {
                  queryInfo.query["staycopy"] = localStorage.getItem("st");
                }
              });
              localStorage.setItem("st", "");
              urlRout = urlPath.split("?")[0].split("#")[1];
              queryInfo.path = urlRout;
              this.$router.replace(queryInfo);
              setTimeout(() => {
                location.href = "#/home?level=root"
                window.location.reload();
              }, 1000);
            }
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: res.message,
              duration: 500,
            });
            return;
          }
        });
      this.$forceUpdate();
    },
    handleLoginout() {
      let ip = localStorage.getItem("ip")
      let transLoginName = localStorage.getItem("LoginName")
      this.$post.postData('logout', JSON.stringify({function:'logout'}), this.$businessCode.xtdl).then(res => {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem("ip", ip)
        localStorage.setItem("LoginName", transLoginName)
        this.$router.push("/login");
      })
    },
    getCollapse() {
      this.isCollapse = true;
      this.btnCollapse = false;
    },
    handleIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getBread() {
      let matched = this.$route.matched.filter(item => item.meta.title);
      let first = matched[0];
      if (first.name != "Index") {
        matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    },
    handleShowSearch() {
      this.$router.push("/globalsearch");
    },
    // 机构/代理调整
    handleAdjust() {
      this.userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.proxyUserInfo =
        (localStorage.getItem("proxyUser") &&
          JSON.parse(localStorage.getItem("proxyUser"))) ||
        [];
      let aa = [];
      aa =
        (localStorage.getItem("unitInfo") &&
          JSON.parse(localStorage.getItem("unitInfo"))) ||
        [];
      let bb = this.userInfo.unitId;
      console.log(aa, bb);
      // for (let i = 0; i < aa.length; i++) {
      //   if(bb.unitId != aa[i].unitId) {
      //     this.orgList.push(aa[i])
      //   }
      // }
      let cc = aa.filter((item, index, aa) => {
        console.log(item.unitId);
        return item.unitId != bb;
      });
      console.log(cc);
      if (this.orgList.length != 0) {
        this.orgList.forEach(element => {
          if (element.currUnitName === this.userInfo.currUnitName) {
            this.orgList.splice(this.orgList.indexOf(element), 1);
          }
        });
      }
      let transObj = {};
      cc.map((item, index) => {
        if (!transObj[item.unitId]) {
          this.orgList.push(item);
          transObj[item.unitId] = true;
        }
      });
      console.log(this.orgList);
      this.haveOrg = this.orgList.length > 0 ? true : false;
      this.haveAgent = this.proxyUserInfo.length >= 1 ? true : false;
    },
    // 删除信息
    handleDeleteItem() {
      localStorage.removeItem("routerList");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("unitInfo");
      localStorage.removeItem("tcHumanRole");
      localStorage.removeItem("proxyUser");
    },
    // 个人办公 添加专栏 和 连接
    async addColumns(f) {
      // console.log('添加专栏11')
      let columnPath = "/dashboard/personalOffice/admin/coluFir"
      let columnRouter = {
        path: columnPath,
        name: "createColumn",
        meta: { title: "专栏", target: "self" },
        redirect: "/yqlj",
        children: []
      };
      if(!f){
        return;
      }
      this.routeTop[0].children.push(columnRouter);
      // let d = await this.$api.meeting.perOfficeCol({aa: 11}).then(res => res.data);
      let d = await this.$api.adminConfig.createColumn({}).then(res => res.data).catch(error => ([])) // 增加catch 为了在接口报错的时候给 d 返回一个 空数组
      // if (!d.length) return;
      // keys  1 => 公共 => 上  0 => 个人 => 下
      if (d && d.length > 0) {
        d.forEach(v => {
          columnRouter.children.push({
            path: "/dashboard/personalOffice/admin/coluFir",
            name: "list",
            meta: {
              title: v.zlSslm,
              needLogin: false,
              target: "column",
              rowData: v,

            },
            query: {
              title: v.zlSslm
            }
          });
        });
      }
      // 判断是否为总行， 只有总行增加‘问责公示’，其他不增加
      const isZH = JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000";
      if (isZH) {
        columnRouter.children.push({
          path: 'http://eip.ccb.com/ccbeip/2c77c2ecbd88431ba54d64b4f9671399/cbe33797e5b54aa8a468de7118c4c1dd/wzxxgsl/index.shtml',
          name: "list",
          meta: {
            title: '问责公示',
            needLogin: false,
            target: "_blank",
            rowData: '',
          },
          query: {
            title: '问责公示'
          }
        })
      }
    },
    async addLinks(f) {
      let linkRouter = {
        path: '/dashboard/personalOffice/sysConfig/viewLinkConfig',
        name: "yqlj",
        meta: { title: "友情链接", target: "self" },
        component: resolve =>
          require(["views/friendshipLink/list.vue"], resolve),
        redirect: '/dashboard/personalOffice/sysConfig/viewLinkConfig',
        children: []
      };
      if(!f){
        return;
      }
      this.routeTop[0].children.push(linkRouter);
      if(localStorage.getItem("isHome") == '1'){
        let d = await this.$api.meeting.perOfficeLink({}).then(res => res.data);
        // if (d.length == 0) return;
        // keys  1 => 公共 => 上  0 => 个人 => 下
        let commonArr = [], personArr = []
        d.forEach(v => {
          if (v.keys == 1) {
            commonArr.push({
              path: v.hyAddress,
              name: "list",
              id: v.id,
              meta: {
                title: v.hyName,
                needLogin: false,
                target: "_blank"
              }
            });
          } else {
            personArr.push({
              path: v.hyAddress,
              name: "list",
              id: v.id,
              meta: {
                title: v.hyName,
                needLogin: false,
                target: "_blank"
              }
            });
          }
        });
        linkRouter.children = [...commonArr, ...personArr]
        // console.log(linkRouter, 'linkRouter')
        }

    },
    configNavLists(f) {
      this.addLinks(f);
      this.addColumns(f);
      let firRout = [];
      this.routeTop.forEach(item => {
        if (item.parentId == 0) {
          firRout.push(item.path);
        }
      });
      let nowRout = this.$route.matched[0].path;
      let routNum = firRout.indexOf(nowRout);
      this.activeName = this.$route.path;
      this.currentNode = routNum.toString();
      // this.routeTop = mcRuteList;
      //顶部菜单微调
      this.NowWidth = document.documentElement.clientWidth / 2;
      this.NowShowNum = Math.ceil(document.documentElement.clientWidth / 115);
    },
    getPhone(){
      this.$post.postData("getConsultingTel",JSON.stringify({function:"getConsultingTel"}), this.$businessCode.dbgl).then(res => {
         if(res.success){
           this.TSXXData = res.data
         }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route: {
      handler(newRoute) {
        this.getBread();
      }
    },
    screenWidth: {
      immediate: true,
      handler(newv) {
        this.NowShowNum = Math.ceil(newv / 115);
      }
    }
  },
  created() {
    let neewRequire = false;
    if(localStorage.getItem('tsxx2')){
      if(localStorage.getItem('tsxx2') == '1'){
        this.TSXXDialog1 = true;
      }else{
        this.TSXXDialog1 = false;
      }
    }
    if(localStorage.getItem('tsxx1')){
      if(localStorage.getItem('tsxx1') == '1'){
        this.TSXXDialog = true;
      }else{
        this.TSXXDialog = false;
      }
    }
    this.getPhone();
    this.userInfo =
      (localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo"))) ||
      "";
    this.proxyUserInfo =
      (localStorage.getItem("proxyUser") &&
        JSON.parse(localStorage.getItem("proxyUser"))) ||
      [];
    this.haveAgent = this.proxyUserInfo.length > 1 ? true : false;
    this.ccboaLoginUserName =
      (this.userInfo &&
        this.userInfo.shortUnitName + "/" + this.userInfo.humanName) ||
      "";
    this.handleAdjust();
    // let firRout = ["/index", "/fwgl", "/receive","/qbgl", "/team","/fwManagement","/personalOffice","/approval","/bianhan","/sealManage","/meeting","/setting","/dashboard","/fwbz",'/publication'];
    this.routeTop = JSON.parse(localStorage.getItem("routerList"));
    if(location.href.indexOf("#/home")>-1
    ||location.href.indexOf("#/todolist")>-1
    ||location.href.indexOf("#/fileRead")>-1
    ||location.href.indexOf("#/nationSecret")>-1
    ||location.href.indexOf("#/problem")>-1
    ||location.href.indexOf("#/handbook")>-1
    ||location.href.indexOf("#/myquestions")>-1
    ||location.href.indexOf("#/answers")>-1
    ||location.href.indexOf("#/qryPageByBumen")>-1
    ||location.href.indexOf("#/secretOperate")>-1
    ||location.href.indexOf("#/remindSecret")>-1
    ||location.href.indexOf("#/chaxun")>-1
    ||location.href.indexOf("#/TongJi")>-1
    ){
      neewRequire = true;
    }
    this.configNavLists(neewRequire);
    // let firRout = [];
    // this.routeTop.forEach(item => {
    //   if (item.parentId == 0) {
    //     firRout.push(item.path);
    //   }
    // });
    // let nowRout = this.$route.matched[0].path;
    // let routNum = firRout.indexOf(nowRout);
    // this.activeName = this.$route.path;
    // this.currentNode = routNum.toString();
    // // this.routeTop = mcRuteList;
    // //顶部菜单微调
    // this.NowWidth = document.documentElement.clientWidth / 2;
    // this.NowShowNum = Math.ceil(document.documentElement.clientWidth / 115);
    window.onresize = () => {
      this.screenWidth = document.documentElement.clientWidth;
    };
    this.getBread();
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 70px !important;
  position: fixed;
  background-color: #409eff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  top: 0;
  left: 0;
  z-index: 9;
  .el-avatar {
    font-size: 12px;
    background-color: #409eff;
    color: #fff;
  }
  .el-avatar:hover {
    cursor: pointer;
  }
  .mt_10 {
    margin-top: -8px !important;
  }
  .el-menu-demo {
    background-color: transparent !important;
    border: none !important;
    .el-menu-item {
      color: #fff !important;
      padding: 0 7px !important;
    }
    .el-menu-item:hover {
      background-color: transparent !important;
    }
    .is-active {
      border-bottom: 2px solid #fff;
      background: none;
    }
  }
  .el-avatar {
    background-color: #fff !important;
    color: #409eff;
  }
  .btn_globalsearch {
    width: 30px;
    height: 30px;
    background-image: url("../../assets/images/icon_serch.png");
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: none;
  }
}
/deep/ .scollOut {
  .el-scrollbar{
    height: 100% !important;
  }
}
.content {
  width: 100%;
  margin-left: 200px;
  margin-top: 70px;
  padding: 16px;
  transition: all 0.3s ease-in-out;
  .cont-topline {
    position: relative;
    .btn-collapse {
      display: inline-block;
      position: absolute;
      top: -2px;
      z-index: 2;
      cursor: pointer;
      .is-active {
        transform: rotate(180deg);
      }
    }
    .breadcrumb {
      margin-bottom: 16px;
      margin-left: 40px;
      display: inline-block;
    }
  }
}
.content-expand {
  margin-left: 0px;
}
.collapseIcon {
  color: #409eff;
  margin: 8px 10px 0 0;
  float: left;
  font-size: 18px;
  cursor: pointer;
}
/deep/ .el-menu--horizontal .el-submenu__icon-arrow {
  transform: rotateZ(90deg);
  color: #fff;
}
/deep/ .el-submenu.is-opened > .el-submenu_title .el-submenu__icon-arrow {
  transform: rotateZ(180deg);
}
/deep/ .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: #409eff;
}
.el-menu--horizontal .el-menu .el-menu-item:not(.is-disabled):hover {
  color: #409eff;
}
// /deep/ .el-menu--popup {
//   margin-left: 50px !important;
//   height: 300px;
//   overflow: hidden;
//   overflow-y: auto;
// }
/deep/ .el-card__header{
  padding: 0;
}
.tsxx-card{
  position: fixed;
  left: 0;
  bottom: 120px;
  z-index: 1005;
  width: 200px;
}
.tsxx-card-btn{
  position: fixed;
  left: -15px;
  bottom: 125px;
  z-index: 1006;
}
.tsxx-card1{
  position: fixed;
  left: 0;
  bottom: 40px;
  z-index: 1005;
  width: 200px;
}
.tsxx-card-btn1{
  position: fixed;
  left: -15px;
  bottom: 70px;
  z-index: 1006;
}
/deep/ .el-card__body{
  padding: 5px;
}
#phoneDiv{
  overflow-x: hidden !important;
  //margin-bottom: -10px;
  /deep/ ::-webkit-scrollbar {
			display: flex;
			width: 0px;
			height: 0px;
			color: transparent;
			background-color: transparent;
			scrollbar-face-color: transparent;
			}
  /deep/ ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  /deep/ ::-webkit-scrollbar {
    color: transparent;
    background-color: transparent;
    scrollbar-face-color: transparent;
    }
  /deep/ ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  /deep/ ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  /deep/ ::-webkit-scrollbar-corner {
    background-color:transparent;
    }
}
</style>
