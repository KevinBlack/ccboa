<template>
  <!-- 制发打印单改版 -->
  <div style="height:100%" class="print_list">
    <div style="padding: 40px;width: 790px;margin: 0 auto;background: #FFF;">
      <el-row style="position: absolute;">
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>返回</el-button>
        </el-col>
      </el-row>
      <h1 id="print_title">{{dataForm.draftOrgan}}{{title}}</h1>
      <table id="sortTable" style="font-family: 'SimSun', '宋体';font-size: 14pt;">
        <tbody>
          <tr>
            <td colspan="16" style="border: 0px;">
              <span style="text-align: center;float:left">编号:{{dataForm.documentNo}}</span>
              <span style="text-align: center;float:right">日期:{{dataForm.createDate}}</span>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">开始时间</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.startTime}}</td>
            <td style="text-align: center">结束时间</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.endTime}}</td>
          </tr>
          <tr>
            <td style="text-align: center">通话单位</td>
            <td id="title" colspan="5" style="padding-left: 10px;">{{dataForm.title}}</td>
          </tr>
          <tr style="height: 50px;">
            <td style="text-align: center">来电人员</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.callPle}}</td>
            <td style="text-align: center">来电人员电话</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.callTel}}</td>
          </tr>
          <tr style="height: 50px;">
            <td style="text-align: center">记录人员</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.creator}}</td>
            <td style="text-align: center">记录人员电话</td>
            <td id="type" style="width: 28%; padding-left: 10px;">{{dataForm.tel}}</td>
          </tr>

          <tr
            :style="{height: dataForm.leaderIdeaList.length === 1 ? '180px' : null}"
            v-for="(item, index) in dataForm.leaderIdeaList"
            :key="index"
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
              <div class="qianF" :style="{marginTop: index ? '0' : '24px'}">
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
            v-if="!dataForm.leaderIdeaList || dataForm.leaderIdeaList.length <= 0"
            style="height: 180px;"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">领导批示</td>
            <td colspan="4"></td>
          </tr>

          <tr
            :style="{height: dataForm.receiveIdeaList.length === 1 ? '180px' : null}"
            v-for="(item, index) in dataForm.receiveIdeaList"
            :key="index"
          >
            <td
              v-if="!index"
              :rowspan="dataForm.receiveIdeaList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >处理意见</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.receiveIdeaList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF" :style="{marginTop: index ? '0' : '24px'}">
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
            style="height: 180px;"
            v-if="!dataForm.receiveIdeaList || dataForm.receiveIdeaList.length <= 0"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">处理意见</td>
            <td colspan="4"></td>
          </tr>

          <tr style="height: 50px;" id="phoneClass">
            <td rowspan="1" style="text-align: center">通话内容</td>
            <td id="title" colspan="5">
              <div class="qianF">
                <div class="p3" style="margin: 0;">{{dataForm.callContent}}</div>
              </div>
            </td>
          </tr>
          <tr style="height: 70px;" v-for="(item, index) in dataForm.callContentList" :key="index">
            <td
              v-if="!index"
              :rowspan="dataForm.callContentList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >部门办理情况</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.callContentList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF" :style="{marginTop: index ? '0' : '24px'}">
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
            style="height: 70px;"
            v-if="!dataForm.callContentList || dataForm.callContentList.length <= 0"
          >
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">部门办理情况</td>
            <td colspan="4"></td>
          </tr>

          <tr style="height: 70px;" v-for="(item, index) in dataForm.remarkList" :key="item.id">
            <td
              v-if="!index"
              :rowspan="dataForm.remarkList.length"
              style="width：20%;text-align:center;vertical-align:middle"
            >备注</td>
            <td
              colspan="4"
              :style="{borderBottom: index == dataForm.remarkList.length - 1 ? null : '0px',borderTop: index == 0 ? null : '0px'}"
            >
              <div class="qianF" :style="{marginTop: index ? '0' : '24px'}">
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
          <tr style="height: 70px;" v-if="!dataForm.remarkList || dataForm.remarkList.length <= 0">
            <td rowspan="1" style="width：20%;text-align:center;vertical-align:middle">备注</td>
            <td colspan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
//便函打印处理单
import apis from "@/httpTansun/api/secreatary/phonenote.js";
// import "@/assets/css/print_list.less";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      vhClass:"width:790px;background:#fff;margin: 0 auto;height:200vh",
      dataForm: {},
      attchmentFileInfo: [],
      senderName: "",
      fontFamily: "彩虹粗仿宋",
      fontSize: "18px",
      // id:JSON.parse(this.$route.query.id),
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
      isPrint: true,
    };
  },
  methods: {
    printThis() {
      const con = document.getElementById("sortTable");
      if (this.isPrint) {
        this.isPrint = true;
        // this.tableSort();
        this.splitContent(con, 1);
      }
      this.printShow = false;
      setTimeout(() => {
        document.execCommand("print");
      }, 100);
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    /**
     * 重新处理签批意见表格
     */
    tableSort() {

      const a4_h_1 = 1120;
      const a4_h_2 = 1300;

      const page_bottom = 30; // 打印纸底部留白高度
      const page_top = 50; // 顶部留白高度
      const trArr = []; // 存放每条审核意见的高度
      let str = "";

      document.getElementsByTagName('body')[0].style.zoom = 1
      const trNum = document.getElementById("sortTable").querySelectorAll('tr');
      const print_titleEle = document.getElementById("print_title");

      const title_height = print_titleEle.offsetHeight + 60;
      const title_top = print_titleEle.offsetTop;
      const view_height =
        trNum[0].offsetHeight +
        trNum[1].offsetHeight +
        trNum[2].offsetHeight +
        trNum[3].offsetHeight +
        trNum[4].offsetHeight;


      let rowspanEle = null;
      let interruptNum = 0;
      let currentPageHeight = title_height + view_height + title_top; // 当前页面的的高度,此处的 123 不可修改

      // 计算 打印时a4_h 的高度，
      let A4_h = currentPageHeight;
      for (let j = 5; j < trNum.length; j++) {
        if (A4_h + trNum[j].offsetHeight + page_bottom > 1150) {
          A4_h += (1150 * (Math.ceil(A4_h / 1150)) - A4_h) + page_bottom + page_top
        }
        A4_h += trNum[j].offsetHeight
      }

      const numberOfPages = Math.ceil(A4_h / 2 / 1150)

      const a4_h =  [1, 2, 4, 5, 6, 7, 8, 9].includes(numberOfPages) ? a4_h_1 : a4_h_2; //设置为a4纸一页高度 原来是900u
      let total = a4_h;

      let residueEle = null; // 上一页断开的意见
      let residueNum = 0;

        // 底部留白 和 下一页的顶部留白
        // const trNullEle = '<tr isskip="true"><td style="height: '+ page_bottom +'px;border: 0;"></td></tr><tr isSkip="true"><td style="height: '+ page_top +'px;border: 0;"></td></tr>'
        const trNullEle = '<div style="height: '+ page_bottom +'px;border: 0;"></div><div style="height: '+ page_top +'px;border: 0;"></div>'

        for (let i = 5; i < trNum.length; i++) {

          const firstTd = $(trNum[i]).find("td")[0]
          const rowspanNum = $(firstTd).attr('rowspan');

          const currentItemHeight = trNum[i].offsetHeight; // 当前元素高度
          // 判断 当前已有高度 + 需要要录入的高度 + 底部留白高度 是否大于 所有页面总的高度
          // 如果判断成立， 说明当前页放不下 要加的元素，放到下一页
          if (currentPageHeight + currentItemHeight + page_bottom > total) {

            // 剩余高度 = 总高度 - 使用高度 - 当前页的底部留白高度
            const residueHeight = total - currentPageHeight - page_bottom;
            // 在当前意见数据之前增加 剩余留白、底部留白、下一页的顶部留白
            rowspanEle.getElementsByTagName('td')[0].setAttribute('rowspan', interruptNum) // 重置当前意见的横跨行数
            $(trNum[i - 1]).find('td:last')[0].style.borderBottom = '1px solid #000'
            $(trNum[i - 1]).find('td:last').append($('<div style="height: '+ residueHeight +'px;border: 0;"></div>'))
            $(trNum[i]).before($(trNullEle))
            // 当前高度 + 剩余高度 + 底部留白高度 + 下一页的顶部高度
            currentPageHeight += residueHeight + page_bottom + page_top;
            total += a4_h; // 增加总的页面高度
            if (residueEle) {
              $($(residueEle).find("td")[0]).before($('<td rowspan="'+ residueNum +'" style="width：20%;text-align:center;vertical-align:middle;border: 1px solid #000;"></td>'))
            }

            // 翻页之后 rowspanEle、interruptNum 必须重新设置为 null 和 0
            rowspanEle = null;
            interruptNum = 0;

            // 不是一个意见开始而是中断的时候，则 获取当前的 element 存入 residueEle，并且 residueNum 赋值 1，为下一页开始做准备
            if (!rowspanNum) {
              residueEle = trNum[i];
              residueNum = 1;
            }
          } else if ((rowspanNum && residueEle) || (i === trNum.length - 1 && residueEle && !rowspanNum)) {
            $(residueEle).find("td")[0].style.borderTop = '1px solid #000'
            $($(residueEle).find("td")[0]).before($('<td rowspan="'+ (residueNum + (i === trNum.length - 1 && residueEle && !rowspanNum ? 1 : 0)) +'" style="width：20%;text-align:center;vertical-align:middle;border: 1px solid #000;"></td>'));
            residueEle = null;
            residueNum = 0
          } else {
            if (residueEle && residueNum > 0) residueNum += 1;
            if (rowspanEle && interruptNum > 0) {interruptNum += 1;}
          }

          if (rowspanNum) {
            rowspanEle = trNum[i];
            interruptNum = 1;
          }

          currentPageHeight += currentItemHeight;
        }
        $(trNum[trNum.length - 1]).find('td:last').append($('<div style="height: '+ (total - currentPageHeight - page_bottom - ( numberOfPages > 2 ? 100 : 0 )) +'px;"></div>'))

      // console.log(view_height + title_height)

      // if ( trNum[5].offsetHeight + trNum[6].offsetHeight >
      //   a4_h - (page_b * 2 + title_height + view_height)
      // ) {
      //   let ideaNum = trNum[6].children[1].children; //意见元素
      //   let ideaIndex = -1;
      //   for (var i = 0; i < ideaNum.length; i++) {
      //     trArr.push(ideaNum[i].offsetHeight);
      //   }
      //   console.log(trArr, "trArr");

      //   trArr.reduce(function(total, num) {
      //     if (total + title_height + view_height > a4_h - page_b * 2) {
      //       return false;
      //     } else {
      //       ideaIndex++;
      //     }
      //     return total + num;
      //   }, 0);
      //   for (let n = ideaIndex - 1; n < ideaNum.length; n++) {
      //     str += `<div class="piece">
      //               ${ideaNum[n].innerHTML}
      //             </div>
      //            `;
      //   }
      //   for (let m = 0; m < ideaIndex; m++) {
      //     trNum[6].children[1].removeChild(ideaNum[ideaNum.length - 1]);
      //   }
      //   const trHeight = a4_h - (title_height + view_height) + page_b * 2;
      //   $(trNum[6]).after(`
      //         <tr style="height: ${trHeight}px;"></tr>
      //         <tr style="min-height: 90px;margin-top:31px;">
      //           <td style="width:20%;text-align:center;vertical-align:middle;border: solid #000 1px;"></td>
      //           <td colspan="4" style="border: solid #000 1px;">
      //               ${str}
      //           </td>
      //         </tr>
      //   `);
      // }
    },
    /**
     * @param con[object],页面元素
     * @param page[number]，分页当前页
     */
    splitContent(con, page) {
      const con_t = con.offsetTop;
      const con_h = con.offsetHeight;
      const a4_h = 1010; //设置为a4纸一页高度 原来是900
      const page_b = 31; //打印纸底部留白高度

      let children_node = con.getElementsByTagName('tr');
      let rowspanEle = null;
      let rowspanNum = 0;

      // 判断不需要分页，直接结束
      if (con_t + con_h < a4_h - page_b * 2) {
        const divHeight = a4_h - page_b * 2 - (con_t + con_h);
        $(children_node[children_node.length -1]).find('td:last').append($('<div style="height: '+ (divHeight > 0 ? divHeight : 0) +'px;"></div>'))
        return;
      }

      Array.from(children_node).forEach((item, index) => {

        let split_top = 0;
        let split_height = 0;

        const splitNode = document.getElementsByClassName('splitnode');
        const tdLength = item.getElementsByTagName('td').length;
        if (splitNode.length != 0) {
          split_top    = splitNode[splitNode.length - 1].offsetTop;
          split_height = splitNode[splitNode.length - 1].offsetHeight;
        }

        if (item.offsetTop + item.offsetHeight - split_top === a4_h - page_b * 2) {
          children_node[index + 1].className = 'breakBefore print-margin splitnode';
          if (tdLength === 1) {
            this.setRowspan(children_node, children_node[index], index);
            rowspanEle = children_node[index + 1];
          }
        } else if (item.offsetTop + item.offsetHeight - split_top > a4_h - page_b * 2) {
          item.className = 'breakBefore print-margin splitnode';
          const divHeight = a4_h - page_b * 2 - (item.offsetTop - split_top)
          $(children_node[index - 1]).find('td:last').append($('<div style="height: '+ (divHeight > 0 ? divHeight - 20 : 0) +'px;"></div>'))
          if (tdLength === 1) {
            this.setRowspan(children_node, children_node[index - 1], index - 1);
            rowspanEle = item;
          }
        } else {
          item.style.breakBefore = 'avoid-page'
        }

        // 获取当前 tr 的第一个 td 的 rowspan
        const lastTrFirstTdRowspan = $(item).find('td:first').attr('rowspan');
        // 判断 rowspanEle 有值，并且为最后一个 tr， 并且不能 lastTrFirstTdRowspan 不能有值
        const isLastTr = rowspanEle && index === children_node.length - 1 && !lastTrFirstTdRowspan;

        // 判断 rowspanEle 有值并且，当前 tr中的 td 数量大于1 或者 isLastTr 为 true
        if ((rowspanEle && tdLength > 1) || isLastTr) {
          $(rowspanEle).find('td').css('border-top', '1px solid #000')
          $(rowspanEle).prepend($('<td style="border: 1px solid #000;" rowspan="'+ (rowspanNum + (isLastTr ? 1 : 0)) +'"></td>'))
          rowspanEle = null;
          rowspanNum = 0;
        } else if (rowspanEle) {
          rowspanNum += 1;
        }

        // 判断是否为 数组的最后一个并且 分页
        if (index === children_node.length - 1 && splitNode.length > 0) {
          console.log('item',item)
          console.log('splitNode',splitNode)
          // console.log('132344')
          split_top    = splitNode[splitNode.length - 1].offsetTop;
          split_height = splitNode[splitNode.length - 1].offsetHeight;
          const divHeight = a4_h - page_b * 2 - (item.offsetTop + item.offsetHeight - split_top);
          // $(item).find('td:last').append($('<div style="height: '+ (divHeight > 0 ? divHeight - 20 : 0) +'px;"></div>'))
          document.getElementById('phoneClass').className = 'breakBefore print-margin splitnode';
          // $(children_node[children_node.length-3]).find('td:last').css({
          //   height: $(children_node[children_node.length-2]).find('td:last').height() + $(children_node[children_node.length-3]).find('td:last').height() + 50 + 'px'
          // })
          let  height7 = 0
          // children_node.forEach((item1,index1)=>{
          //   if(index1<7){
          //     height7 += $(item1).find('td:first').height()
          //   }
          // })
          console.log('height7',height7)
          let phoneTop = document.getElementById('phoneClass').offsetTop
          console.log(phoneTop)
          document.getElementById('phoneClass').style.height = a4_h - phoneTop -100+ 'px'
          // $(children_node[children_node.length-3]).find('td:last').css({
          //   height: a4_h - height7  -$(children_node[children_node.length-2]).find('td:last').height() +'px'
          // })

        }
        console.log(splitNode,'splitNode.length')
        // if(splitNode.length == 1) {
        //   this.vhClass = "width:790px;background:#fff;margin: 0 auto;height:100vh"
        // }else {
        //   this.vhClass = "width:790px;background:#fff;margin: 0 auto;"+"height:" + splitNode.length*100 + "vh"
        // }
        console.log(this.vhClass,"this.vhClass")
      })

    },
    // 上一页的底部封口和跨行修改
    setRowspan (con, item, index) {

      // 上一页的底部封口
      $(item).find('td:last').css('border-bottom', '1px solid #000')
      const itemOffsetTop = item.offsetTop;
      const itemOffsetHeight = item.offsetHeight;

      // 数字减循环，确认上一页的最后一个 意见域 的第一个 tr 所在的位置字减循环，确认上一页的最后一个 意见域 的第一个 tr 所在的位置
      for (let i = index; i >= 0; i--) {

        const rowspan = $(con[i]).find('td:first').attr('rowspan');
        const className = $(con[i]).attr('class')
        if (rowspan) {
          $(con[i]).find('td:first').attr('rowspan', index - i + 1);
          break;
        } else if (className && className.indexOf('splitnode') > -1) {
          $(con[i]).prepend($('<td rowspan="'+ (index - i + 1) +'"></td>'))
          break;
        }
      }
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    getDetailIfo() {
      const _this = this;
      const data = {
        id: _this.id,
        numYear: this.$route.query.numYear || ''
      };
      if (_this.type === "2") {
        console.log(data);
        apis.phoneHandleDetail(data).then(res => {
          if (res.code === "SUCCESS") {
            console.log(res.data);
            _this.$nextTick(() => {
              const arr = [
                "remarkList",
                "receiveIdeaList",
                "processIdeaList",
                "callContentList",
                "leaderIdeaList"
              ];
              res.data.remarkList = res.remark;
              res.data.receiveIdeaList = res.proIdea;
              res.data.processIdeaList = res.processIdea;
              res.data.callContentList = res.deptIdea;
              res.data.leaderIdeaList = res.leaderIdea;
              if (_this.addNewSug) {
                for (let i = 0; i < 5; i++) {
                  let newSug = {
                    content: "",
                    deptName: "",
                    leaderName: "",
                    createTime: res.data.createTime
                  };
                  switch (arr[i]) {
                    case "remarkList":
                      newSug.content = res.data.remark
                        ? res.data.remark
                        : ""
                        ? res.data.remarkList.push(newSug)
                        : (newSug = {});
                      break;
                    case "leaderIdeaList":
                      newSug.content = res.data.remarkDeal
                        ? res.data.remarkDeal
                        : ""
                        ? res.data.leaderIdeaList.push(newSug)
                        : (newSug = {});
                      break;
                    case "receiveIdeaList":
                      newSug.content = res.data.proIdea
                        ? res.data.proIdea
                        : ""
                        ? res.data.receiveIdeaList.push(newSug)
                        : (newSug = {});
                      break;
                    case "processIdeaList":
                      newSug.content = res.data.processIdea
                        ? res.data.processIdea
                        : ""
                        ? res.data.processIdeaList.push(newSug)
                        : (newSug = {});
                      break;
                    case "callContentList":
                      newSug.content = res.data.finalIdea
                        ? res.data.finalIdea
                        : ""
                        ? res.data.callContentList.push(newSug)
                        : (newSug = {});
                      break;
                  }
                }
              }
              _this.dataForm = res.data;
            });
          }
        });
      } else {
        apis.phoneDetail(data).then(res => {
          if (res.code === "SUCCESS") {
            res.entity.remarkList = res.remark;
            res.entity.receiveIdeaList = res.receiveIdea;
            res.entity.processIdeaList = res.processIdea;
            res.entity.callContentList = res.deptIdea;
            res.entity.leaderIdeaList = res.leaderIdea;
            const arr = [
              "remarkList",
              "receiveIdeaList",
              "processIdeaList",
              "callContentList",
              "leaderIdeaList"
            ];

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
                    newSug.content = res.entity.remark ? res.entity.remark : "";
                    if (newSug.content) {
                      _this.dataForm.remarkList.push(newSug);
                    }
                    break;
                  case "leaderIdeaList":
                    newSug.content = res.entity.leaderIdea
                      ? res.entity.leaderIdea
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
                console.log("---打印详情---", _this.dataForm);
              }
            }
          }
        });
      }

    }
  },
  created() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.addNewSug = JSON.parse(this.$route.query.addNewSug);
    this.title = this.$route.query.title;
    this.getDetailIfo();

  },
  mounted() {

  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.qianF {
  overflow: hidden;
  margin-bottom: 24px;
  &:first-child {
    margin-top: 24px;
  }
  .p1 {
    line-height: 24px;
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
    word-break: break-all;
    white-space: pre-line;
    margin-bottom: 24px;
  }
  .p3 {
    float: left;
    padding-left: 8px;
    margin-top: 10px;
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap;
    line-height: 24px;
    margin-bottom: 24px;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
    line-height: 24px;
  }
}

.piece {
  overflow: hidden;
  .text1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .text2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
}
tr {
  height: 32px;
}
td {
  // border: solid #000 1px;
  // padding: 7px 0;
  width: 15%;
  border: solid #000 1px;
  vertical-align: middle;
}

.printButton {
  position: absolute;
  top: 55%;
  right: 3%;
}
#print_title {
  font-family: "KaiTi", "楷体";
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}
@page {
  margin-top: 2cm;
  margin-bottom: 0;
  border: none;
}
@media print {
  @page {
    // margin-bottom:0;
    // margin-top:0;
  }
  body,
  .print_list,
  html {
    background: #fff !important;
    // height:300vh!important;
  }
  table {
    background: #fff !important;
  }
  tr {
    background: #fff !important;
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
