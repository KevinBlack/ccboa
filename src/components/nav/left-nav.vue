<style lang="less" scoped>
.sider {
  width: 200px !important;
  height: 100%;
  position: fixed;
  left: 0;
  top: 71px;
  overflow: visible;
  z-index: 1004;
  ul {
    height: 100%;
    overflow: scroll;
    padding-right: 10px;
  }
  .btn-collapse {
    position: fixed;
    bottom: 20px;
    left: 10px;
  }
}
.el-submenu .el-menu-item {
  text-align: left;
  width: auto !important;
  min-width: auto;
  padding: 0 20px;
}
.heigh_100 {
  height: 100% !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
  transition: all 0.3s ease-in-out;
  padding-top: 2em;
}
.el-menu-item {
  color: #409eff;
  width: 190px;
  height: 2em !important;
  line-height: 2em !important;
}
/deep/ .el-menu-item:hover,
.activeSub /deep/ .el-menu-item.el-col-6 {
  background: #409eff;
  color: #fff;
}
// .el-menu-item:focus {
// }
/deep/ .el-icon-arrow-left,
.selectSide /deep/ .el-icon-arrow-left {
  color: #fff;
  display: inline;
}
.selectN,
/deep/ .sublist-menu .el-menu-item:hover {
  color: #409eff;
  background: none;
}
/deep/ .el-icon-arrow-left,
/deep/ .el-icon-arrow-left {
  display: none;
  font-size: 12px;
  padding-left: 6px;
  padding-top: 2px;
}
/deep/ .el-menu-item:hover .el-icon-arrow-left,
/deep/ .el-menu-item:focus .el-icon-arrow-left,
/deep/ .el-menu-item .el-icon-arrow-left.selectIcon {
  display: inline;
}
/deep/ .el-menu {
  border: 0;
}
.f-12 {
  font-size: 12px;
}
/deep/ .sublist-menu .el-menu-item {
  color: #888;
}
.activeSub /deep/ .el-icon-arrow-left {
  right: 6px;
}
.collapseAside {
  margin-left: -200px;
}
.selectSide.el-menu-item {
  background: #409eff;
  color: #fff;
}
.el-scrollbar {
  height: 100%;
  background: #fff;
}
.pos_info {
  position: fixed;
  top: 108px;
  left: 9.5em;
  z-index: 2073;
  // height: 512px;
  height: calc(100% - 120px);
}
</style>
<template>
  <div class="heigh_100">
    <el-aside :class="['sider', { collapseAside: isCollapseFlag }]">
      <el-scrollbar ref="sideScroll">
        <el-menu
          class="el-menu-vertical-demo"
          router
          :collapse="isCollapseFlag"
        >
          <template v-show="sideTree.length > 0">
            <el-menu-item
              v-for="(item, key) in sideTree"
              @mouseenter.native="enterSide(key)"
              @mouseleave.native="outSide(key)"
              :class="{ selectSide: item.path == router }"
              :key="key"
              @click="handleClickEnode(item)"
            >
              <span slot="title">
                <i :class="item.meta.icon"></i>
                {{ item.meta.title }}
              </span>
              <i class="el-submenu__icon-arrow el-icon-arrow-left"></i>
            </el-menu-item>
          </template>
        </el-menu>
        <!-- v-if="nowSubtree&&nowSubtree.length>0" -->
        <div
          @mouseenter="enterPanel"
          @mouseleave="outPanel"
          v-show="openSubtree && nowSubtree.length"
          class="el-menu--vertical pos_info"
          x-placement="right-start"
        >
          <!-- :style="listTop" -->
          <ul
            role="menu"
            class="el-menu el-menu--popup el-menu--popup-right-start"
            :style="listHeight"
          >
            <!-- style="min-width:33em;height:36em;" -->
            <li
              v-for="(item, key) in nowSubtree"
              :key="key"
              role="menuitem"
              aria-haspopup="true"
              class="el-submenu is-active"
              style="position: relative"
              @click.stop="handleClickEnode(item)"
            >
              <div
                @mouseenter.native="enterSideOne(key)"
                @mouseleave.native="outSideOne(key)"
                :class="{ activeSub: item.meta.active }"
                style="display: flex"
              >
                <div class="el-menu-item" :style="{ width: secondLabelWd }">
                  <template class="f-12">
                    <span>{{ item.meta.title }}</span>
                    <i
                      class="el-submenu__icon-arrow el-icon-arrow-left"
                      :style="{ display: item.meta.active ? 'inline' : 'none' }"
                    ></i>
                  </template>
                </div>
                <div
                  class="el-menu--vertical sublist-menu"
                  x-placement="right-start"
                  style="flex: 1"
                >
                  <ul role="menu" class="el-menu">
                    <li
                      v-for="(sublist, index) in item.children"
                      @click.stop="handleClickEnode(sublist)"
                      :key="index"
                      role="menuitem"
                      tabindex="-1"
                      style="padding: 0 0 0 20px; float: left"
                      :class="[
                        'el-menu-item',
                        { selectN: sublist.meta.active },
                      ]"
                    >
                      {{ sublist.meta.title }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </el-aside>
  </div>
</template>
<script>
export default {
  props: ["collapseInfo", "sideTreeData", "currentNode"],
  data() {
    return {
      isCollapseFlag: false,
      nowSubtree: [], //当前子菜单数据
      openSubtree: false, //子菜单显示状态
      nowSideNum: "", //菜单列选中
      inPanel: false,
      sideTree: [],
      router: "",
      listTop: {
        top: "20px",
      },
      listHeight: {
        minWidth: "14em",
        minHeight: "32em",
        // height: ''
      },
      height: 0, //窗口高度
      secondLabelWd: "200px",
    };
  },
  mounted() {
    this.height = document.documentElement.clientHeight;
    this.listHeight.height = this.sideTree.length * 2.7 + "em";
  },
  methods: {
    handleClickEnode(item) {
      sessionStorage.removeItem("indextab");
      sessionStorage.removeItem("indexPage");
      sessionStorage.removeItem("indexSize");
      sessionStorage.removeItem("waitReadTab");
      sessionStorage.removeItem("waitReadPage");
      sessionStorage.removeItem("waitReadSize");
      sessionStorage.removeItem("ZXDB");
      sessionStorage.removeItem("ZXDBACTIVE");
      sessionStorage.removeItem("QBLIST");
      sessionStorage.removeItem("QBLISTtab");
      sessionStorage.removeItem("page_sw");
      sessionStorage.removeItem("tab_sw");
      sessionStorage.removeItem("FWLIST");
      sessionStorage.removeItem("FWLISTtab");
      sessionStorage.removeItem("searchDataIndex");
      if (item.meta) {
        //codeType  jkxtpz
        //dicCode    DAXT001
        if (item.meta.target == "_blank" || item.path == "/bigScreen") {
          if (item.path.indexOf("http") == 0) {
            window.open(item.path, "_blank");
          } else {
            let data = this.$router.resolve({
              path: item.path,
            });
            window.open(data.href, "_blank");
          }
        } else if (item.path == "/zhDa") {
          this.$api.setting.person
            .getPersonInfo({ codeType: "jkxtpz", dicCode: "DAXT001" })
            .then((res) => {
              window.open(res.data[0].codeName, "_blank");
            });
        } else if (item.path == "/smOA") {
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          let userType = userInfo.isProxier;
          let username;
          if (userInfo.oa_account) {
            username = userInfo.oa_account;
          } else {
            username = "";
          }
          var ws = new WebSocket("ws://localhost:4213");
          ws.addEventListener("error", () => {
            if (userType == 1) {
              window.location.href =
                "kylincloudclient://username=" +
                localStorage.getItem("LoginName") +
                "&passwd=" +
                localStorage.getItem("Voucher") +
                "&token=" +
                localStorage.getItem("ticket") +
                "&id=&url=";
            } else {
              window.location.href =
                "kylincloudclient://username=" +
                username +
                "&passwd=&token=&id=&url=";
            }
          });
          ws.onopen = (event) => {
            let OBJ;
            if (userType == 1) {
              OBJ = {
                username: localStorage.getItem("LoginName"),
                passwd: localStorage.getItem("Voucher"),
                token: localStorage.getItem("ticket"),
                id: "",
                url: "",
              };
            } else {
              OBJ = {
                username: username,
                passwd: "",
                token: "",
                id: "",
                url: "",
              };
            }
            ws.send(JSON.stringify(OBJ));
            ws.onmessage = (event) => {};
            ws.onclose = (event) => {};
            ws.onerror = () => {};
            ws.close();
          };
        } else if (item.meta.rowData && item.meta.target == "column") {
          // console.log(item.meta.rowData)
          this.$router.push({
            name: "linkTable",
            query: {
              zlSslm: item.meta.rowData.zlSslm,
            },
          });
        } else {
          this.openSubtree = false;
          this.$router.push(item.path);
          if (this.$route.path == item.path) {
            location.reload();
          }
        }
      }
    },
    enterSide(n) {
      let childNum = 0; //菜单个数
      let childHeight = 0; //菜单高度
      let labelNames = [];
      let setTop = 0; //设置定位高度
      let scrollTop = 0; //滚动条高度
      this.nowSideNum = n;
      this.sideTree[n].meta.active = true;
      this.openSubtree = true;

      this.sideTree.filter((item, index) => {
        if (n == index) {
          item.meta.active = true;
          childNum++;
        } else {
          item.meta.active = false;
        }
      });

      this.nowSubtree = this.sideTree[n].children;
      childNum = (this.nowSubtree && this.nowSubtree.length) || 0;
      if (childNum > this.sideTree.length) {
        this.listHeight.height = childNum * 2.7 + "em";
      } else {
        this.listHeight.height = n * 42 + 70 + "px";
      }
      //根据label长度 动态设置长度
      if (this.nowSubtree)
        this.nowSubtree.forEach((item) => {
          labelNames.push(item.meta.title.length);
        });
      if (labelNames.length) {
        this.secondLabelWd =
          labelNames.sort((a, b) => {
            return b - a;
          })[0] *
            24 +
          "px !important";
      }
      //包裹区域宽度调整
      // if(){

      // }

      //根据子菜单高度 和 视口高度 作接近底部的 判断
      scrollTop = this.$refs.sideScroll.$refs.wrap.scrollTop;

      childHeight = childNum * 60;
      this.listTop.top = n * 60 + 50;
      if (!scrollTop) {
        if (this.height - 30 <= childHeight + this.listTop.top) {
          setTop =
            this.height - 50 - childHeight <= 30
              ? 30
              : this.height - childHeight - 30;
        } else {
          setTop = n * 60 + 50;
        }
      } else {
        setTop = n * 60 - scrollTop;
      }
      this.listTop.top = setTop + "px";
    },
    outSide(n) {
      this.openSubtree = false;
      this.sideTree[this.nowSideNum].meta.active = false;
    },
    clickSide(n) {
      // this.openSubtree = true;
      // this.sideTree[n].meta.active = true;
      // this.nowSubtree = this.sideTree[n].children;
    },
    outPanel() {
      this.openSubtree = false;
      // this.nowSubtree = [];
      this.sideTree[this.nowSideNum].meta.active = false;
    },
    enterPanel() {
      this.sideTree[this.nowSideNum].meta.active = true;
      this.sideTree.filter((item, index) => {
        if (this.nowSideNum == index) {
          item.meta.active = true;
        } else {
          item.meta.active = false;
        }
      });
      this.openSubtree = true;
    },
    enterSideOne(n) {
      this.nowSubtree.filter((item, index) => {
        if (n == index) {
          item.meta.active = true;
        } else {
          item.meta.active = false;
        }
      });
      this.$forceUpdate();
    },
    outSideOne(n) {
      this.nowSubtree[n].meta.active = false;
    },
    clickSideTwo(n, m) {
      this.nowSubtree[n].subTwo[m].meta.active = true;
    },
  },
  computed: {},
  watch: {
    collapseInfo(newv, oldv) {
      this.isCollapseFlag = newv;
      this.openSubtree = false;
    },
    $route: {
      handler(newr) {
        let firRout = [
          "/index",
          "/fwgl",
          "/receive",
          "/qbgl",
          "/team",
          "/superviseHandle",
          "/fwManagement",
          "/approval",
          "/bianhan",
          "/secretary",
          "/sealManage",
          "/meeting",
          "/setting",
          "/dashboard",
          "/fwbz",
          "/publication",
        ];
        let nowRout = newr.matched[0].path;
        let routNum = firRout.indexOf(nowRout);
        this.router = nowRout;
        setTimeout(() => {
          if (routNum > -1) {
            let subList = false;
            this.sideTreeData.forEach((item) => {
              if (item.path === this.router) {
                if (item.children) {
                  this.sideTree = [].concat(item.children);
                  subList = true;
                }
              }
            });
            if (nowRout == "/setting") {
              this.$api.setting.organization
                .getTree({
                  unitClass: "1",
                  unitCode: "U010000",
                })
                .then((res) => {
                  let data = res.data.map((item) => ({
                    id: item.unitCode,
                  }));
                  // .filter((item) => !item.leaf);
                  data.push({ id: "U010000" });
                  let userId = data.map((item) => item.id);
                  if (
                    userId.includes(
                      JSON.parse(localStorage.getItem("userInfo")).unitId
                    ) == false
                  ) {
                    let flag = this.sideTree.findIndex((item) => {
                      return item.path == "/setting/sysConfig";
                    });
                    let flag1 = this.sideTree[flag].children.findIndex(
                      (item) => {
                      return item.path == "/setting/sysConfig/otherconfig";
                      }
                    );
                    let flag2 = this.sideTree[flag].children[
                      flag1
                    ].children.findIndex((item) => {
                      return (
                        item.path ==
                        "/setting/sysConfig/otherconfig/userLogMigration"
                      );
                    });
                    if(flag2 > -1){
                      this.sideTree[flag].children[flag1].children.splice(
                      flag2,
                      1
                    );
                    }
                  }
                });
            }
            if (!subList) {
              this.$emit("changeSideBtn");
            }
          } else {
            this.sideTree = this.sideTreeData[this.currentNode].children;
          }
        }, 5);
      },
      immediate: true,
    },
  },
};
</script>
