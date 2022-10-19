
 <template>
  <div style="height:100%" class="print_list" >
    <div style="padding: 40px;width: 790px;margin: 0 auto;background: #FFF;">
      <el-row style="position: absolute;">
        <el-button class="printButton" @click="printThis()" type="info" v-show="printShow" plain>打印</el-button>
      </el-row>
      <h1 style="margin-top: 0!important;" class="title-h1">{{dataForm.draftOrgan}}{{title}}</h1>
      <table
        cellspacing="0"
        cellpadding="0"
        class="printTable"
        style="font-family: 'SimSun', '宋体';font-size: 14pt;"
        id="print-table"
      >
        <tbody>
          <tr>
            <!-- <td style="text-align: center">编号</td>
          
          <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.documentNo}}</td>
          <td style="text-align: center">日期</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.createDate}}</td>-->
            <td colspan="16" style="border: 0px;">
              <span style="text-align: center;float:left">编号:{{dataForm.documentNo}}</span>
              <span style="text-align: center;float:right">日期:{{dataForm.createDate}}</span>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">来文单位</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.fromDept}}</td>
            <td style="text-align: center">文号</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.fileCode}}</td>
          </tr>
          <tr>
            <td style="text-align: center">文件标题</td>
            <td id="title" colspan="5" style="padding-left: 10px;">{{dataForm.title}}</td>
          </tr>
          <!-- <tr>
          <td style="text-align: center">办理部门</td>
          <td id="title" colspan="5" style="padding-left: 10px;">{{dataForm.hqDept}}</td>
          </tr>-->
          <!-- <tr>
          <td style="text-align: center">领导批示</td>
          <td id="title" colspan="5" style="padding-left: 10px; height: auto;">
            <ul>
              <li v-for="(item, indx) in dataForm.leaderIdeaList">
                <span style="font-weight: bolder; margin-right: 10px;">{{item.content}}</span>
                <span>{{dataForm.draftDepartment}}</span>
                <span style="display: inline-block; width: 68px; height: auto;">{{item.leaderName}}</span>
                <span>{{item.createTime}}</span>
              </li>
            </ul>
          </td>
          </tr>-->
          <tr
            style="height: 100px;"
            v-for="(item, index) in dataForm.leaderIdeaList"
            :key="item.id"
          >
            <td
              v-if="!index"
              :rowspan="dataForm.leaderIdeaList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >领导批示</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.leaderIdeaList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.leaderName}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            style="height: 100px;"
            v-if="!(dataForm.leaderIdeaList && dataForm.leaderIdeaList.length > 0)"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">领导批示</td>
            <td colspan="4"></td>
          </tr>

          <tr
            style="height: 100px;"
            v-for="(item, index) in dataForm.receiveIdeaList"
            :key="item.id"
          >
            <td
              v-if="!index"
              :rowspan="dataForm.receiveIdeaList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >
              收文部门
              <br />拟办意见
            </td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.receiveIdeaList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.leaderName}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            style="height: 100px;"
            v-if="!(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length > 0)"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">
              收文部门
              <br />拟办意见
            </td>
            <td colspan="4"></td>
          </tr>

          <tr style="height: 50px;" v-for="(item, index) in dataForm.remarkList" :key="item.id">
            <td
              v-if="!index"
              :rowspan="dataForm.remarkList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >备注</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.remarkList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.leaderName}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="height: 50px;" v-if="!(dataForm.remarkList && dataForm.remarkList.length > 0)">
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="4"></td>
          </tr>

          <tr
            style="height: 100px;"
            v-for="(item, index) in dataForm.callContentList"
            :key="item.id"
          >
            <td
              v-if="!index"
              :rowspan="dataForm.callContentList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >最终意见</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.callContentList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.leaderName}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            style="height: 100px;"
            v-if="!(dataForm.callContentList && dataForm.callContentList.length > 0)"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">最终意见</td>
            <td colspan="4"></td>
          </tr>

          <tr
            style="height: 100px;"
            v-for="(item, index) in dataForm.processIdeaList"
            :key="item.id"
          >
            <td
              v-if="!index"
              :rowspan="dataForm.processIdeaList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >过程意见</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.processIdeaList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF">
                <div class="p1">{{item.content}}</div>
                <div class="p2">
                  <span>
                    {{item.deptName}}&nbsp;
                    {{item.leaderName}}
                  </span>
                  <div class="date">{{item.createTime}}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            style="height: 100px;"
            v-if="!(dataForm.processIdeaList && dataForm.processIdeaList.length > 0)"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">过程意见</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  <script>
import apis from "@/httpTansun/api/secreatary/fileHandle.js";

export default {
  data() {
    return {
      numyear:this.$route.query.numyear||this.$route.query.numYear?this.$route.query.numyear||this.$route.query.numYear:'',
      vhClass: "width:790px;background:#fff;margin: 0 auto;height:100vh",
      printShow: true,
      id: "",
      title: "",
      dataForm: {
        remarkList: {},
        callContentList: {},
        processIdeaList: {},
        receiveIdeaList: {},
        leaderIdeaList: {}
      },
      data: {}
    };
  },
  created() {
    const query = this.$route.query;
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.addNewSug = query.addNewSug ? JSON.parse(query.addNewSug) : false;
    console.log(this.addNewSug);

    this.title = this.$route.query.title;
    this.getDetailIfo();
  },
  computed: {
    suggessionArea(val) {
      return function(val) {};
    }
  },
  methods: {
    getDetailIfo() {
      const _this = this;
      const data = {
        id: _this.id,
        numYear:this.numyear
      };
      console.log(this.type, "获取type");
      if (_this.type == "1") {
        console.log(this.type, "获取type1");
        apis.fileDetail(data).then(res => {
          if (res.code === "SUCCESS") {
            console.log(res);
            _this.$nextTick(() => {
              const arr = [
                "remarkList",
                "receiveIdeaList",
                "processIdeaList",
                "callContentList",
                "leaderIdeaList"
              ];
              res.entity.remarkList = res.remarkDeal;
              res.entity.receiveIdeaList = res.receiveIdea;
              res.entity.processIdeaList = res.processIdea;
              res.entity.callContentList = res.deptIdea;
              res.entity.leaderIdeaList = res.leaderIdea;
              _this.dataForm = res.entity;
              if (_this.addNewSug) {
                for (let i = 0; i < 5; i++) {
                  let newSug = {
                    content: "",
                    deptName: "",
                    leaderName: "",
                    createTime: res.entity.updateTime
                  };
                  switch (arr[i]) {
                    case "remarkList":
                      newSug.content = res.entity.remark
                        ? res.entity.remark
                        : "";
                      if (newSug.content) {
                        _this.dataForm.remarkList.push(newSug);
                      }
                      break;
                    case "leaderIdeaList":
                      newSug.content = res.entity.remarkDeal
                        ? res.entity.remarkDeal
                        : "";
                      if (newSug.content) {
                        _this.dataForm.leaderIdeaList.push(newSug);
                      }
                      break;
                    case "receiveIdeaList":
                      newSug.content = res.entity.proIdea
                        ? res.entity.proIdea
                        : "";
                      if (newSug.content) {
                        _this.dataForm.receiveIdeaList.push(newSug);
                      }
                      break;
                    case "processIdeaList":
                      newSug.content = res.entity.processIdea
                        ? res.entity.processIdea
                        : "";
                      if (newSug.content) {
                        _this.dataForm.processIdeaList.push(newSug);
                      }
                      break;
                    case "callContentList":
                      newSug.content = res.entity.finalIdea
                        ? res.entity.finalIdea
                        : "";
                      if (newSug.content) {
                        _this.dataForm.callContentList.push(newSug);
                      }
                      break;
                  }
                }
              }
              console.log("---打印详情---", _this.dataForm);
            });
          }
        });
      } else {
        apis.docHandlingDetail(data).then(res => {
          if (res.code === "SUCCESS") {
            console.log(res.data);

            // _this.$nextTick(()=>{

            const arr = [
              "remarkList",
              "receiveIdeaList",
              "processIdeaList",
              "callContentList",
              "leaderIdeaList"
            ];
            res.data.remarkList = res.remarkDeal;
            res.data.receiveIdeaList = res.receiveIdea;
            res.data.processIdeaList = res.processIdea;
            res.data.callContentList = res.deptIdea;
            res.data.leaderIdeaList = res.leaderIdea;

            _this.dataForm = res.data;
            console.log(_this.addNewSug, "_this.addNewSug");

            if (_this.addNewSug) {
              for (let i = 0; i < 5; i++) {
                let newSug = {
                  content: "",
                  deptName: "",
                  leaderName: "",
                  createTime: res.data.updateTime
                };
                switch (arr[i]) {
                  case "remarkList":
                    newSug.content = res.data.remark ? res.data.remark : "";
                    if (newSug.content) {
                      _this.dataForm.remarkList.push(newSug);
                    }
                    break;
                  case "leaderIdeaList":
                    newSug.content = res.data.remarkDeal
                      ? res.data.remarkDeal
                      : "";
                    if (newSug.content) {
                      _this.dataForm.leaderIdeaList.push(newSug);
                    }
                    break;
                  case "receiveIdeaList":
                    newSug.content = res.data.proIdea ? res.data.proIdea : "";
                    if (newSug.content) {
                      _this.dataForm.receiveIdeaList.push(newSug);
                    }
                    break;
                  case "processIdeaList":
                    newSug.content = res.data.processIdea
                      ? res.data.processIdea
                      : "";
                    if (newSug.content) {
                      _this.dataForm.processIdeaList.push(newSug);
                    }
                    break;
                  case "callContentList":
                    newSug.content = res.data.finalIdea
                      ? res.data.finalIdea
                      : "";
                    if (newSug.content) {
                      _this.dataForm.callContentList.push(newSug);
                    }
                    break;
                }
              }
            }
          }
          console.log("---打印详情---", _this.dataForm);
        });
      }
    },
    printThis() {
      const con = document.getElementById("print-table");
      this.splitContent(con, 1);
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    splitContent(con, page) {
      const con_t = con.offsetTop;
      const con_h = con.offsetHeight;
      const a4_h = 1010; //设置为a4纸一页高度 原来是900
      const page_b = 31; //打印纸底部留白高度

      let children_node = con.getElementsByTagName("tr");
      let rowspanEle = null;
      let rowspanNum = 0;

      // 判断不需要分页，直接结束
      if (con_t + con_h < a4_h - page_b * 2) {
        const divHeight = a4_h - page_b * 2 - (con_t + con_h);
        $(children_node[children_node.length - 1])
          .find("td:last")
          .append(
            $(
              '<div style="height: ' +
                (divHeight > 0 ? divHeight : 0) +
                'px;"></div>'
            )
          );
        return;
      }

      Array.from(children_node).forEach((item, index) => {
        let split_top = 0;
        let split_height = 0;

        const splitNode = document.getElementsByClassName("splitnode");
        const tdLength = item.getElementsByTagName("td").length;
        if (splitNode.length != 0) {
          split_top = splitNode[splitNode.length - 1].offsetTop;
          split_height = splitNode[splitNode.length - 1].offsetHeight;
        }

        if (
          item.offsetTop + item.offsetHeight - split_top ===
          a4_h - page_b * 2
        ) {
          children_node[index + 1].className =
            "breakBefore print-margin splitnode";
          if (tdLength === 1) {
            this.setRowspan(children_node, children_node[index], index);
            rowspanEle = children_node[index + 1];
          }
        } else if (
          item.offsetTop + item.offsetHeight - split_top >
          a4_h - page_b * 2
        ) {
          item.className = "breakBefore print-margin splitnode";
          const divHeight = a4_h - page_b * 2 - (item.offsetTop - split_top);
          $(children_node[index - 1])
            .find("td:last")
            .append(
              $(
                '<div style="height: ' +
                  (divHeight > 0 ? divHeight - 20 : 0) +
                  'px;"></div>'
              )
            );
          if (tdLength === 1) {
            this.setRowspan(children_node, children_node[index - 1], index - 1);
            rowspanEle = item;
          }
        } else {
          item.style.breakBefore = "avoid-page";
        }

        // 获取当前 tr 的第一个 td 的 rowspan
        const lastTrFirstTdRowspan = $(item)
          .find("td:first")
          .attr("rowspan");
        // 判断 rowspanEle 有值，并且为最后一个 tr， 并且不能 lastTrFirstTdRowspan 不能有值
        const isLastTr =
          rowspanEle &&
          index === children_node.length - 1 &&
          !lastTrFirstTdRowspan;

        // 判断 rowspanEle 有值并且，当前 tr中的 td 数量大于1 或者 isLastTr 为 true
        if ((rowspanEle && tdLength > 1) || isLastTr) {
          $(rowspanEle)
            .find("td")
            .css("border-top", "1px solid #000");
          $(rowspanEle).prepend(
            $(
              '<td style="border: 1px solid #000;" rowspan="' +
                (rowspanNum + (isLastTr ? 1 : 0)) +
                '"></td>'
            )
          );
          rowspanEle = null;
          rowspanNum = 0;
        } else if (rowspanEle) {
          rowspanNum += 1;
        }

        // 判断是否为 数组的最后一个并且 分页
        if (index === children_node.length - 1 && splitNode.length > 0) {
          split_top = splitNode[splitNode.length - 1].offsetTop;
          split_height = splitNode[splitNode.length - 1].offsetHeight;
          const divHeight =
            a4_h -
            page_b * 2 -
            (item.offsetTop + item.offsetHeight - split_top);
          $(item)
            .find("td:last")
            .append(
              $(
                '<div style="height: ' +
                  (divHeight > 0 ? divHeight - 20 : 0) +
                  'px;"></div>'
              )
            );
          if (splitNode.length == 1) {
            this.vhClass =
              "width:790px;background:#fff;margin: 0 auto;height:100vh";
          } else {
            this.vhClass =
              "width:790px;background:#fff;margin: 0 auto;" +
              "height:" +
              splitNode.length * 100 +
              "vh";
          }
        }
      });
    },
    // 上一页的底部封口和跨行修改
    setRowspan(con, item, index) {
      // 上一页的底部封口
      $(item)
        .find("td:last")
        .css("border-bottom", "1px solid #000");
      const itemOffsetTop = item.offsetTop;
      const itemOffsetHeight = item.offsetHeight;

      // 数字减循环，确认上一页的最后一个 意见域 的第一个 tr 所在的位置
      for (let i = index; i >= 0; i--) {
        const rowspan = $(con[i])
          .find("td:first")
          .attr("rowspan");
        const className = $(con[i]).attr("class");
        if (rowspan) {
          $(con[i])
            .find("td:first")
            .attr("rowspan", index - i + 1);
          break;
        } else if (className && className.indexOf("splitnode") > -1) {
          $(con[i]).prepend($('<td rowspan="' + (index - i + 1) + '"></td>'));
          break;
        }
      }
    }
  }
};
</script>

  <style lang="less" scoped>
.print_list {
  // width: 900px;
  // margin: 0 auto;
  // padding: 3.3cm 2.7cm;
  // background-color: white;
}
.printButton {
  position: absolute;
  right: 28%;
  z-index: 10;
  top: 6%;
}
.title-h1 {
  font-family: "KaiTi", "楷体";
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}
.printButton {
  position: absolute;
  right: 28%;
  z-index: 10;
  top: 6%;
}
.printTable {
  margin: 0 auto;
  width: 684px;
  // text-align: center;2021-5-22
}
tr {
  height: 32px;
}
td {
  width: 12%;
  border: solid #000 1px;
  vertical-align: middle;
}
.qianF {
  overflow: hidden;
  margin-bottom: 24px;
  &:first-child {
    margin-top: 24px;
  }
  .p1 {
    line-height: 24px;
    margin-bottom: 24px;
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
    word-break: break-all;
    white-space: pre-line;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}
@page {
  margin-top: 2cm;
  margin-bottom: 0;
  border: none;
}
@media print {
  .print_list {
    height: 100vh !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  tr {
    break-inside: avoid;
  }
  .breakBefore {
    break-before: always;
    td {
      border-top: 1px solid #000;
    }
  }
  .print-margin {
    // margin-top: 3.3cm;
  }
  .el-button--info.is-plain {
    display: none;
  }
}
</style>