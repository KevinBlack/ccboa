<template>
  <!-- 制发打印单改版 -->
  <div class="print_list">
    <el-row>
      <el-col>
        <el-button @click="printThis()" type="info" plain>打印</el-button>
        <el-button @click="closeThis" type="info" plain>返回</el-button>
      </el-col>
    </el-row>
    <h1>{{formdata.deptTableHead}}</h1>
    <hr class="line" />
    <p style="font-family:'楷体';">
      <span style="{font-size':'18px'}">{{formdata.documentNo}}</span>
      <span>签发人：{{senderName}}</span>
    </p>
    <p style="{font-size':'18px';font-family: '宋体';justify-content: left;display:block;}"><span style="white-space: nowrap;font-family:'黑体';float:left;">标题：</span>{{formdata.title}}</p>
    <p style="{'font-size':'18px';font-family: '宋体';justify-content: left;}"><span style="font-family:'黑体';white-space: nowrap;">主送：</span>{{formdata.main}}</p>
    <p style="{'font-size':'18px';font-family: '宋体';justify-content: left;}" v-if="!!formdata.copy"><span style="font-family:'黑体';white-space: nowrap;">抄送：</span>{{formdata.copy}}</p>
    <div
      v-html="formdata.content"
      id="content"
      v-bind:style="{'font-family':fontFamily,'font-size':fontSize,'line-height':'1.75'}"
    >正文内容</div>
    <hr class="line" id="bottomLine" />
    <p class="PageNext" id="draftUser_p">
      <span>拟稿人：{{formdata.draftUser}}</span>
      <span>联系电话：{{formdata.phone}}</span>
    </p>

    <table class="table breakBefore print-margin table" id="sortTable">
      <tbody>
        <tr style="min-height: 140px;">
          <td style="width:20%;text-align:center;vertical-align:middle">签发意见</td>
          <td colspan="4">
            <div class="qianF" v-for="item in formdata.sendList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>{{item.departmentName}}&nbsp;{{item.userName}}</span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 280px;">
          <td style="width:20%;text-align:center;vertical-align:middle">审核意见</td>
          <td colspan="4">
            <div class="piece" v-for="item in formdata.checkList" :key="item.id">
              <div class="text1">{{item.content}}</div>
              <div class="text2">
                <span>{{item.departmentName}}&nbsp;{{item.userName}}</span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>

        <tr style="min-height: 280px;">
          <td style="width:20%;text-align:center;vertical-align:middle">传阅意见</td>
          <td colspan="4">
            <div class="chuanYue" v-for="item in formdata.cyList" :key="item.id">
              <div class="chuanYue1" style="height:32px;">{{item.content}}</div>
              <div v-for="file in item.attachmentPos" :key="file.id">
                <a class="name down" style="cursor:pointer">{{file.fileName}}</a>
              </div>
              <div class="chuanYue2">
                <span>{{item.departmentName}}&nbsp;{{item.userName}}</span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 32px;">
          <td style="width:20%;text-align:center;vertical-align:middle">备注</td>
          <td colspan="4">
            <div class="piece" v-for="item in formdata.commentsList" :key="item.id">
              <div class="content">{{item.content}}</div>
              <div class="name" style="text-align: right;">
                <span>{{item.departmentName}}&nbsp;{{item.userName}}</span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 32px;">
          <td style="width:20%;text-align:center;vertical-align:middle;">拟稿日期</td>
          <td
            style="width:40%;text-align:left;vertical-align:middle;"
            colspan="2"
          >{{formdata.draftTime}}</td>
          <td style="width:20%;text-align:center;vertical-align:middle">反馈截止日期</td>
          <td style="width:30%;text-align:left;vertical-align:middle">{{formdata.feedTime}}</td>
        </tr>
        <tr style="height: 32px;">
          <td style="width:20%;text-align:center;vertical-align:middle">反馈方式</td>
          <td
            style="width:80%;text-align:left;vertical-align:middle"
            colspan="7"
          >{{formdata.feedbackMode=='0'?'无需反馈':(formdata.feedbackMode=='1'?'反馈意见':'反馈意见及附件')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
//便函打印处理单
import "../../assets/css/print_list.less";
export default {
  data() {
    return {
      // numIndex:0,//确定是第一段的内容 1 代表是第一段
      formdata: {},
      attchmentFileInfo: [],
      senderName: "",
      fontFamily: "彩虹粗仿宋",
      fontSize: "18px",
      numyear:this.$route.query.numyear||this.$route.query.numYear?this.$route.query.numyear||this.$route.query.numYear:'',
      // id:JSON.parse(this.$route.query.id),
    };
  },
  methods: {
    printThis() {
      const con = document.getElementById("content");
      this.tableSort();
      if(document.getElementsByClassName('hasSplitContent')==0){
        document.execCommand("print");
      }else{
        document.getElementById("content").className='hasSplitContent';
        // this.numIndex = 0;
        this.splitContent(con, 1);
        document.execCommand("print");
      }

    },
    /**
     * 重新处理签批意见表格
     */
    tableSort(){
      const A4_H = 1010; //设置为a4纸一页高度 原来是900
      const PAGE_B=84;//打印纸底部留白高度
      const trArr = [];//存放每条审核意见的高度
      let str='';
      const trNum = document.getElementById('sortTable').children[0].children;

      if(trNum[0].offsetHeight + trNum[1].offsetHeight > A4_H-PAGE_B*2){
        let ideaNum = trNum[1].children[1].children;//意见元素
        let ideaIndex = -1;
        for(var i = 0;i<ideaNum.length;i++){
          trArr.push(ideaNum[i].offsetHeight);
        }
        trArr.reduce(function(total,num){
          if(total + trNum[0].offsetHeight > A4_H-PAGE_B*2){
              return false;
          }else{
              ideaIndex++;
          }
          return total + num;
      },0)
      for(let n = ideaIndex - 1;n<ideaNum.length;n++){
           str +=`<div class="piece">
                    ${ideaNum[n].innerHTML}
                  </div>
                 `;
         }
      for(let m=0;m<ideaIndex;m++){
          trNum[1].children[1].removeChild(ideaNum[ideaNum.length-1]);
      }
      const trHeight = A4_H - (trNum[0].offsetHeight + trNum[1].offsetHeight) + PAGE_B*2;
       $(trNum[1]).after(`
              <tr style="height: ${trHeight}px;"></tr>
              <tr style="min-height: 90px;margin-top:31px;">
                <td style="width:20%;text-align:center;vertical-align:middle;border: solid #000 1px;"></td>
                <td colspan="4" style="border: solid #000 1px;">
                    ${str}
                </td>
              </tr>
        `);
      //  $(trNum[1]).after(`
      //         <tr style="height: 180px;"></tr>
      //         <tr style="min-height: 90px;margin-top:31px;">
      //           <td style="width:20%;text-align:center;vertical-align:middle;border: solid #000 1px;"></td>
      //           <td colspan="4" style="border: solid #000 1px;">
      //             <div class="piece">
      //               ${trNum[1].children[1].children[2].innerHTML}
      //             </div>
      //           </td>
      //         </tr>
      //   `);
          //trNum[1].children[1].children.innerHTML = trNum[1].children[1].children[0].innerHTML + trNum[1].children[1].children[1].innerHTML;
        //trNum[1].children[1].removeChild(trNum[1].children[1].children[2]);
      }



    },
    /**
     * @param con[object],页面元素
     * @param page[number]，分页当前页
     */
    splitContent(con, page) {
      const con_t = con.offsetTop;
      const con_h = con.offsetHeight;
      const A4_H = 1010; //设置为a4纸一页高度 原来是900
      const PAGE_B=84;//打印纸底部留白高度
      let page_content_height=A4_H-PAGE_B*2;//一页a4纸可填充内容高度
      //判断是否需要进入分页操作
      if (con_t + con_h > page_content_height) {
        //进入分页操作
        let children_node = con.children;
       // let pageNum = page; //分页页数

        Array.from(children_node).filter((item, index) => {
          // this.numIndex++;
          // //高度相等则在该元素后添加添加分页符
          // if (item.offsetTop + item.offsetHeight == A4_H * pageNum-PAGE_B*pageNum*2) {
          //   //含有下一子节点且子节点不是table元素
          //   if(!!children_node[index + 1]&&(!children_node.offsetParent||children_node.offsetParent.nodeName!='TABLE')){
          //     children_node[index + 1].className = "breakBefore print-padding splitnode";
          //     pageNum += 1;
          //   }else if(children_node.offsetParent.nodeName==='TABLE'){
          //     children_node.offsetParent.className="breakBefore print-padding splitnode"
          //   }
          //   //高度大于a4分页高度且子节点数量大于1则遍历子元素，小于则继续遍历
          // } else if (
          //   item.offsetTop + item.offsetHeight > (A4_H * pageNum-PAGE_B*pageNum*2) &&
          //   item.children.length > 1
          // ) {
          //   this.splitContent(item, pageNum);
          // } else if (item.offsetTop + item.offsetHeight > A4_H * pageNum-PAGE_B*pageNum*2) {
          //   children_node[index].className = "breakBefore";
          //   if(!!children_node[index + 1]){
          //     children_node[index + 1].className = "print-padding splitnode";
          //   }
          //   pageNum += 1;
          // }

          //获取最新分页标致符offsetTop和offsetTop
          let split_t=0;
          let split_h=0;
          if(document.getElementsByClassName('splitnode').length!=0){
            let child_length=document.getElementsByClassName('splitnode').length;
            split_t=document.getElementsByClassName('splitnode')[child_length-1].offsetTop;
            split_h=document.getElementsByClassName('splitnode')[child_length-1].offsetHeight;
           // console.log(document.getElementsByClassName('splitnode'),'splitnode')
           page_content_height=A4_H-PAGE_B*2;
          }else{
            page_content_height=A4_H-PAGE_B;//第一页可填充内容高度特殊处理
          }
          console.log('node:',item,'当前节点高度：',item.offsetTop + item.offsetHeight,'高度',item.offsetTop + item.offsetHeight-split_t,page_content_height,'----')
           //高度相等则在该元素后添加添加分页符
          if (item.offsetTop + item.offsetHeight-split_t == page_content_height) {
            //含有下一子节点且子节点不是table元素
            if(!!item.nextSibling&&(!children_node.offsetParent||children_node.offsetParent.nodeName!='TABLE')){
              if(item.nextSibling.nodeName.toLocaleLowerCase()==='span'||item.nextSibling.nodeName.toLocaleLowerCase()==='i'){
                 $(item.nextSibling).after(`<p class="breakBefore print-padding splitnode equal" style="height:1px"></p>`);                   
              }else{
                item.nextSibling.className = "breakBefore print-padding splitnode";
              }
            }else if(children_node.offsetParent.nodeName==='TABLE'){
              children_node.offsetParent.className="breakBefore print-margin splitnode"
            }
            //高度大于a4分页高度且子节点数量大于1则遍历子元素，小于则继续遍历
          } else if (
            item.offsetTop + item.offsetHeight -split_t>page_content_height &&
            item.childElementCount >1
          ) {
           // console.log('***************1*******************')
            
            this.splitContent(item);
          } else if (item.offsetTop + item.offsetHeight-split_t > page_content_height) {
           // console.log('***************2*******************')
            //行内元素另行处理
            // console.log(children_node[index].nodeName,'***********')
            // if(children_node[index].nodeName.toLocaleLowerCase()==='span'){
            //   console.log('***************3*******************')
            //   $(children_node[index]).after(`<p class="breakBefore print-padding splitnode last" style="height:1px"></p>`);                   
            //  return false;
              //  children_node[index].className='printHiddeen';
              //  创建新节点
              //  const p=document.createElement('p');
              //  const html_t=children_node[index];
              //  p.className='splitNode breakBefore print-padding splitnode';
              //  p.appendChild(html_t);
              //  在原节点前添加新节点
              // try{
              //    children_node[index].append(p);
              // }catch(e){
              //  console.log(e,'--------------+++++++++++=')
              // }
            // }else 
            if(item.nodeName.toLocaleLowerCase()==='table'){
             item.className="breakBefore print-margin splitnode table"
            }else if(item.childElementCount===1&&item.innerText.length===item.children[0].innerText.length){
              console.log('***************1*******************')
               // this.splitContent(item.children[0]);
               this.splitContent(item);
            }else if(item.childElementCount>0){
                console.log('***************2*******************')
                // //提取纯文本部分
                // let textContent=item.innerText.replace(item.children[0].innerText,'');
                // //为纯文本部分添加标签，并重新给节点赋值
                // item.innerHTML=item.children[0].outerHTML+`<span>${textContent}</span>`;
                // this.splitContent(item);
                //将纯文本改为带标签文本
                for(let i in item.childNodes){
                  //文本节点改写为非文本节点
                  if(item.childNodes[i].nodeName=='#text'){
                    let textContent=item.childNodes[i].data;
                    //创建节点，并写入文本内容
                    let newNode=document.createElement('span');
                    newNode.innerText=textContent;
                    //当前节点插入新节点
                    item.insertBefore(newNode,item.childNodes[i])
                   // item.appendChild(newNode);//insertBefore
                    //删除旧文本节点
                    item.removeChild(item.childNodes[Number(i)+1])
                  }
                }
               // console.log(item,item.childNodes)
                this.splitContent(item);
            //match(/[^(?!&nbsp;)].*/g)
           // }else if(item.innerHTML.match(/\&nbsp;/g)){
              //特殊字符&nbsp;(&nbsp;位于文本首尾情况除外)不进行分割,直接添加分页标识符
             //  $(item).after(`<p class="breakBefore print-padding splitnode equal" style="height:1px"></p>`);    
            }else{
                 console.log('***************3*******************')
                 let dosplit=false;//判断之后的分割代码是否对代码进行了分割
                //  item.offsetTop + item.offsetHeight -split_t>page_content_height
                let str = item.innerHTML;
                for(let i = 1;i<str.length;){
                  //特殊占位字符整体切割
                  if(str[i]==='&'&str.slice(i,i+6)=='&nbsp;'){
                    i+=6;
                    continue;
                  }else{
                    i++;
                    let len = str.length - i;
                    let pFirstStr = str.slice(0,len);             
                    let pSeconedStr = str.slice(len,str.length);
                     item.innerHTML = pFirstStr;
                  if(item.offsetTop +item.offsetHeight -split_t < page_content_height){
                    dosplit=true;
                    $(item).after(`<p style="text-indent: 0;height:1px" class="breakBefore print-padding splitnode last"></p>${pSeconedStr}`);
                    return false;   
                  }
                  //分页时会产生1.5个中文字符误差，因此插入文字为中文时长度减2个中文字符，其余情况减3个字符
                   //判断将要插入的文字后3个字符是否包含中文字符
                  // if(item.offsetTop +item.offsetHeight -split_t < page_content_height
                  // &&!!pFirstStr.substr(-2).match(/[\u4E00-\u9fA5]/g)){ 
                  //  // console.log(children_node[index].offsetTop + children_node[index].offsetHeight -split_t,page_content_height,'分页高度')
                  //     dosplit=true;
                  //      len = str.length - i;
                  //     //len = str.length - i-2;
                  //     pFirstStr = str.slice(0,len);
                  //      pSeconedStr = str.slice(len,str.length);
                  //      item.innerHTML = pFirstStr;
                  //   $(item).after(`<p style="text-indent: 0;height:1px" class="breakBefore print-padding splitnode last"></p>${pSeconedStr}`);
                  //   return false;                  
                  // }else if(item.offsetTop + item.offsetHeight -split_t < page_content_height){
                  //   dosplit=true;
                  //    len = str.length - i;
                  //  // len = str.length - i-3
                  //   pFirstStr = str.slice(0,len);
                  //   pSeconedStr = str.slice(len,str.length);
                  //   item.innerHTML = pFirstStr;
                  //   $(item).after(`<p style="text-indent: 0;height:1px;" class="breakBefore print-padding splitnode last"></p>${pSeconedStr}`);
                  //   return false;
                  // }

                  }
                  
                }
               
              if(!dosplit){
              //若出现文字无法分割情况，则直接在当前节点前添加分页标识符
              item.innerHTML=str;
              $(item).before(`<p class="breakBefore print-padding splitnode equal" style="height:1px"></p>`);                 
              }
             // if(index == 0 && this.numIndex == 1){
                // //一行的高度 
                // let h = window.getComputedStyle(item.parentNode).lineHeight;
                // let rowHeight = parseFloat(h.slice(0,h.indexOf('p')));
                // let num = 0;
                // while(item.offsetTop + rowHeight*num -split_t < A4_H -PAGE_B*2){
                //   num++;
                // }
                // //一行可以放多少个字符
                // let charNum = parseInt(item.offsetWidth/parseFloat(window.getComputedStyle(item.parentNode).fontSize.slice(0,window.getComputedStyle(item.parentNode).fontSize.indexOf('p'))));
                // //截取的位置
                // let sliceP = num*charNum;
                // let pFirstStr = item.innerHTML.slice(0,sliceP);
                // let pSeconedStr = item.innerHTML.slice(sliceP,item.innerHTML.length);
                // children_node[index].innerHTML = pFirstStr;
                //  $(children_node[index]).after(`<p class="breakBefore print-padding splitnode last">${pSeconedStr}</p>`);
                
                // children_node[index].className="splitnode last"
                
              //}
              //else{
                // if(children_node[index].localName == 'p'){ 
                //   children_node[index].className="breakBefore print-padding splitnode last"
                // }else{
                //   $(children_node[index]).parents('p').addClass('breakBefore print-padding splitnode last');
                // }
                
              //}
            }
          }
        });
      }
    },

    closeThis() {
      this.$intent.closeWindow(this);
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.$route.query.id,numYear:this.numyear })
        .then(res => {
          this.attchmentFileInfo = res.data;
        });
    },
    loadData() {
      this.$api.bianhan.distriDeal({ id: this.$route.query.id,numYear:this.numyear }).then(res => {
        this.formdata = res.bHMainOrderDo;

        //设置字体及字号
        try {
          this.fontFamily = res.bHMainOrderDo.content.match(
            /彩虹粗仿宋|彩虹楷体|彩虹黑体|彩虹小标宋/gi
          )[0];
        } catch (e) {
          this.fontFamily = "彩虹粗仿宋";
        }
        // try {
        //   let fontSizeArray = Array.from(
        //     new Set(
        //       res.bHMainOrderDo.content.match(/(font-size: )\w\w(px)/gi).sort()
        //     )
        //   );
        //   this.fontSize =
        //     fontSizeArray[0].split(": ")[1] < "21px"
        //       ? "21px"
        //       : fontSizeArray[0].split(": ")[1];
        // } catch (e) {
        // this.fontSize = "21px";
        // }
         this.fontSize = "21px";
        this.formdata.sendList = res.sendList;
        if (res.sendList.length > 0) {
          this.senderName = res.sendList[0].userName;
        }
        this.formdata.commentsList = res.commentsList;
        try {
          this.formdata.cyList = res.cyList.filter(item => {
            this.$api.setSysConfig
              .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear  })
              .then(res => {
                this.$set(item, "attachmentPos", res.data);
                this.$forceUpdate();
              });
            return item;
          });
        } catch (e) {
          this.formdata.cyList = res.cyList;
        }
        this.formdata.checkList = res.checkList;
        this.formdata.cbList = res.cbList;
      });
    }
  },
  created() {
// this.formdata={
// attach: "415938e05f164cca9883e8b057cb0525",
// bhCbDept: "",
// bnbh: "0",
// //content:'<p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">近期，在OA系统转储档案系统并进行归档过程中，部分分行反映了档案归档过程中出现的问题。针对反映比较集中的问题，经与OA项目组沟通，现就有关解决情况通知如下：</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">一、NOA系统文件归档问题：</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（一）在档案系统中未见NOA归档文件，即NOA系统中文件完全没有转储至档案系统的，各机构需要立即联系总行NOA项目组联系人报备解决。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\"><span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。<br/> </span>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">二、OA3.6系统文件归档问题</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（一）二级分行及以下机构的档案是在2018年左右上收综合档案系统集中管理，此前的档案保存在OA3.6系统档案管理模块。在这部分档案中，只有变成“档案”的才会转给综合档案系统，仍是“文件”状态的不会进行转储。2018年以后办结的文件，会直接由办结库自动转储至综合档案系统。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（二）无论哪一种情况，在综合档案系统中缺少的OA3.6系统文件，都可联系总行运维支持人员，同时提供明确的文件信息（机构、代字、文号、年度、时段等），申请帮助再次转储至综合档案系统。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（三）OA3.6系统预计在2022年年底下线，届时，系统内所有数据均不再保存。因此请各分行重视OA系统归档工作，抓紧时间，进行文件归档工作。如在归档、转储过程中，有任何问题，要及时联系总行OA项目组。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">总行OA项目组邮箱：</span><a href=\"mailto:zh_oa.zh@ccb.com\" style=\"font-family: 彩虹粗仿宋; font-size: 21px; text-decoration: underline;\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">zh_oa.zh@ccb.com</span></a><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">，联系电话：67598092/67598098/67598099</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">办公室</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">2022年8月9日</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">近期，在OA系统转储档案系统并进行归档过程中，部分分行反映了档案归档过程中出现的问题。针对反映比较集中的问题，经与OA项目组沟通，现就有关解决情况通知如下：</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">一、NOA系统文件归档问题：</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（一）在档案系统中未见NOA归档文件，即NOA系统中文件完全没有转储至档案系统的，各机构需要立即联系总行NOA项目组联系人报备解决。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\"><span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。<br/> </span>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">二、OA3.6系统文件归档问题</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（一）二级分行及以下机构的档案是在2018年左右上收综合档案系统集中管理，此前的档案保存在OA3.6系统档案管理模块。在这部分档案中，只有变成“档案”的才会转给综合档案系统，仍是“文件”状态的不会进行转储。2018年以后办结的文件，会直接由办结库自动转储至综合档案系统。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（二）无论哪一种情况，在综合档案系统中缺少的OA3.6系统文件，都可联系总行运维支持人员，同时提供明确的文件信息（机构、代字、文号、年度、时段等），申请帮助再次转储至综合档案系统。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（三）OA3.6系统预计在2022年年底下线，届时，系统内所有数据均不再保存。因此请各分行重视OA系统归档工作，抓紧时间，进行文件归档工作。如在归档、转储过程中，有任何问题，要及时联系总行OA项目组。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">总行OA项目组邮箱：</span><a href=\"mailto:zh_oa.zh@ccb.com\" style=\"font-family: 彩虹粗仿宋; font-size: 21px; text-decoration: underline;\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">&lt;span s</span></a></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">近期，在OA系统转储档案系统并进行归档过程中，部分分行反映了档案归档过程中出现的问题。针对反映比较集中的问题，经与OA项目组沟通，现就有关解决情况通知如下：</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">一、NOA系统文件归档问题：</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（一）在档案系统中未见NOA归档文件，即NOA系统中文件完全没有转储至档案系统的，各机构需要立即联系总行NOA项目组联系人报备解决。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\"><span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。<br/> </span>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">二、OA3.6系统文件归档问题</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（一）二级分行及以下机构的档案是在2018年左右上收综合档案系统集中管理，此前的档案保存在OA3.6系统档案管理模块。在这部分档案中，只有变成“档案”的才会转给综合档案系统，仍是“文件”状态的不会进行转储。2018年以后办结的文件，会直接由办结库自动转储至综合档案系统。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（二）无论哪一种情况，在综合档案系统中缺少的OA3.6系统文件，都可联系总行运维支持人员，同时提供明确的文件信息（机构、代字、文号、年度、时段等），申请帮助再次转储至综合档案系统。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">（三）OA3.6系统预计在2022年年底下线，届时，系统内所有数据均不再保存。因此请各分行重视OA系统归档工作，抓紧时间，进行文件归档工作。如在归档、转储过程中，有任何问题，要及时联系总行OA项目组。</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">总行OA项目组邮箱：</span><a href=\"mailto:zh_oa.zh@ccb.com\" style=\"font-family: 彩虹粗仿宋; font-size: 21px; text-decoration: underline;\"><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">zh_oa.zh@ccb.com</span></a><span style=\"font-family: 彩虹粗仿宋; font-size: 21px;\">，联系电话：67598092/67598098/67598099</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;</span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">办公室</span></span></p><p style=\"margin-top:5px;margin-right:0;margin-bottom:5px;margin-left: 0;text-indent:43px;line-height:32px\"><span style=\"font-size: 21px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-size: 21px; font-family: 彩虹粗仿宋;\">2022年8月9日（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，'+
// //'应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。（二）在档案系统缺失部分NOA文件，即NOA系统中文件转储时丢失或遗漏的，应及时通知本机构OA管理员（建议档案人员按文件代字、代号梳理缺失文件并提供OA管理员），由本机构OA管理员在NOA系统中，在各个模块左导航打开“管理员维护”入口，查询到具体缺少的文件，点击“区块链归档”按钮，进行再转储至档案系统。档案系统在第二日会接收到该文件。</span></span></p><p><span style=\"font-size: 21px;\">&nbsp;</span></p><p><br/></p>"',
// //content:'<p>根据年度工作安排，今年年初总行启动了三年一届的“最美建行人”评选宣传活动，并作为全行党史学习教育开展典型教育引领的一项重要工作来统筹推进。经各分行、子公司党委严格遴选、总分行初审小组初选、总行精神文明建设领导小组成员部门复评、合规性审查、全行公示等程序， 20位候选对象脱颖而出。按照活动进程安排，目前已进入20进10环节。总行将综合广大员工投票、机构投票及行内专家组评审情况，最终评选出第三届十大“最美建行人”。现将20进10投票及活动学习宣传的相关事宜通知如下：</p><p>一、投票说明</p><p>（一）微信投票说明</p><p>1.投票时间：2021年11月17日0时0分至11月19日24时0分。</p><p>2.投票方式：为保证评选过程的公平性和科学性，扩大参与评选的覆盖面，本次评选将通过中国建设银行企业微信暨微信企业号进行投票。</p><p>3.投票规则：本次享有投票权利的对象为中国建设银行员工，每个员工有一次投票权，须一次性选出10个候选对象。&nbsp;</p><p>4.投票入口：</p><p>入口一：通过中国建设银行企业微信首页“员工活动”板块直接进入投票页面。</p><p>入口二：总行企业信息门户网站，在滚动框或飘窗点击“2021年第三届最美建行人候选人典型事迹展示”，进入相关页面后，用手机扫描页面上的二维码即可投票。</p><p>入口三：通过“文化建行”微信公众号第三届“最美建行人”投票宣传文章，点击投票二维码扫码进入即可。</p><p>（二）机构投票说明</p><p>各一级分行、总行各部门、信用卡中心、建行大学东北学院、华东学院、远程智能银行中心、海外机构、境内子公司分别填写一张《十大“最美建行人”选票》（见附件2），从20个候选对象中选出10个“最美建行人”入围对象，并于11月19日下班前将填写好的选票，加盖单位印章扫描后，通过邮件发给总行公关部（gongguanbu.zh@ccb.com）。</p><p>二、相关要求</p><p>（一）各单位要积极组织发动广大员工参与到活动中来</p><p>“最美建行人”宣传教育活动是全行党史学习教育开展典型教育引领的一项重要内容，各单位要把此次活动作为传导总行党委新金融理念，展示一线员工火热生活，加强员工思想教育引导的重要载体，高度重视、认真部署评选投票工作，广泛发动引导员工特别是青年员工积极参与到此项活动中来。</p><p>近期，总行已通过“文化建行”微信公众号和中国建设银行企业微信“员工活动”栏目分期展示20个“最美建行人”候选对象典型事迹，并将在总行企业信息门户网站搭建专栏进行宣传。请各单位利用企业网、辖内微信公众号等多种方式发布投票相关信息，转发宣传20个候选对象的典型事迹，引导广大员工及时了解并积极参与此次评选活动，学习先进事迹，积极投身新金融行动。&nbsp;</p><p>（二）做好结合联动，持续开展学习宣传工作</p><p>各单位要精心做好组织实施，结合本单位实际，把“最美建行人”评选活动与全行党史学习教育、纵深推进新金融行动再动员有机结合，将内部宣传与外部报道、集中宣传与各级报道结合起来，扩大覆盖面，营造争先创优、拼搏奋斗的浓厚氛围。要大力弘扬“只要奋斗，你就是最美建行人”的价值导向，引导广大员工“学党史建功新金融，争做最美建行人”，持续开展建行人的“最美瞬间”征集活动，鼓励员工通过照片拍摄或短视频制作等方式，捕捉建行人的最美日常，由各单位党委宣传部择优遴选后统一向总行报送，总行将利用多媒体平台做好宣传，优秀作品有机会在表彰展示舞台上呈现。</p><p>总行联系人：</p><p>段漪琳，010-67597532, duanyilin/zh/ccb</p><p>宋虎平，010-67597178，songhuping/zh/ccb</p><p>&nbsp;</p><p>附件：</p><p>1．最美建行人投票二维码</p><p>2.十大“最美建行人”选票</p><p>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 公共关系与企业文化部</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2021年11月12日</p><p><br/></p>',
// //content:'<p><span style=\"font-size: 21px;\">（一）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（二）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（三）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（四）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（五）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（六）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（七）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（八）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（九）在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）1在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）2在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）3在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）4在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）5在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）6在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）7在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）8在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）9在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）10在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）11在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）12在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）13在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）14在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）15在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）16在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）17在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）18在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）19在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）20在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）21在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）22在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）23在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）24在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）25在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）26在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）27在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）28在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）29在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）30在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）31在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）32在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）33在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）34在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）35在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）36在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）37在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）38在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）39在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）40在档案系统中未见NOA归档文件，</span></p><p><span style=\"font-size: 21px;\">（一）41在档案系统中未见NOA归档文件，</span></p>',
// //content:'<p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">近期，中央办公厅法规局向各单位发出提醒函，指出了党建制度文件制发和报备工作中的一些共性问题，结合我行工作实际，现就有关事项提示如下。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;"><strong>一、规范使用发文代字。</strong>印发党建制度文件应使用正确的党务文件发文代字。以总行党委名义对全行党内系统印发重要党建规章应使用“建党发”字，转发上级有关部门党建制度文件应使用“建党函”字。以党委职能部门名义印发或转发党建制度文件，应使用相应的部门党务发文代字。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;"><strong>二、严格履行办文程序。</strong>以总行党委名义印发的党建制度文件必须经党委会议审议通过后拟文。“建党发”字文件应由党委书记签发。总行党委会同驻行纪检监察组联合印发的“建党发”字党建制度文件，应经党委会议审议通过后由党委书记、驻行纪检监察组组长分别签发。办公室将对“建党发”文号文件重点审核，对不符合签发要求的情况进行提示提醒。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;"><strong>三、规范文字表述。</strong>党建制度文件是党组织制定的规范党的领导和党的建设活动、依靠党的纪律保证实施的重要规章制度。文件起草和发布部门要切实提高政治站位，注重文字表述的规范性。根据中央办公厅法规局最新要求，企业党委文件中不使用“处级”“处长”等表述，不使用“非领导职务”表述。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;"><strong>四、依法依规定密。</strong>《保守国家秘密法》第13条规定，“机关、单位执行上级确定的国家秘密事项，需要定密的，根据所执行的国家秘密事项的密级确定”。如上位文件为秘密级，其配套文件也应定为秘密级。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;"><strong>五、明确报备范围。</strong>以总行党委名义制发、发文代字为“建党发”的规则、规定、办法、细则、规划、意见等具有普遍约束力、在一定时期内可以反复适用的党建制度文件，需报送中央办公厅备案审查。印发领导讲话、年度工作要点、工作总结、人事调整、表彰奖励、处分处理以及机关内部日常管理事项、请示、报告、会议活动通知、会议纪要、情况通报等文件无需报备。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;"><strong>六、细化报备流程。</strong>对于应报送中央办公厅备案审查的党建制度文件，牵头起草部门应及时主动向党委办公室报备，并于发文之日起5个工作日内，将发文处理单、正文、附件及备案说明发送党委办公室联系人。备案说明应当写明制定背景、政策创新及其依据、重要数据指标来源、征求意见、审议签批等情况（详见附件）。各党委职能部门应于每年12月20日前将本年度牵头起草的党建制度文件制发情况及下年度制定计划发送党委办公室联系人。</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">&nbsp;</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">联系人：</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">田翔宇 010-67599038 tianxiangyu.zh@ccb.com；</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">高嘉禾 010-67598053 gaojiahe.zh@ccb.com</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">&nbsp;</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">附件：</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">1.党建制度文件备案说明模板</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">2.党建制度文件备案说明字体</span></p><p style="margin-bottom: 0px; white-space: normal; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">&nbsp;</span></p><p style="margin-bottom: 0px; white-space: normal; text-align: right; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">党委办公室</span></p><p style="margin-bottom: 0px; white-space: normal; text-align: right; text-indent: 43px; line-height: 39px;"><span style="font-size: 21px;">2022年7月19日</span></p><p><br/></p>',
// //content: "<p style=\"margin-top:4px;margin-right:0;margin-bottom:4px;margin-left:0;text-indent:37px;line-height:150%\"><span style=\"font-size:19px;line-height:150%;font-family: 宋体\">点击【发送承办人】按钮，选择下一环节，若当选择的环节在系统维护</span><span style=\"font-size:19px;line-height:150%\">-</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">流程配置</span><span style=\"font-size:19px;line-height:150%\">-</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">子流程配置</span><span style=\"font-size:19px;line-height:150%\">-</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">环节配置的<span style=\"text-decoration:underline;\">处理模式</span>为“多人模式”时，则承办部门综合可以根据实际情况将此承办单发给单人或者多人，<span style=\"color:red\">系统根据承办部门综合对承办人员数量的选择，自动识别承办方式，当用户选择单人时，承办单为单人方式，当用户选择多人时，承办单为多人方式。</span></span></p><p style=\"margin-top:4px;margin-right:0;margin-bottom:4px;margin-left:0;text-indent:37px;line-height:150%\"><span style=\"font-size:19px;line-height:150%;font-family: 宋体\">若当选择的环节在系统维护</span><span style=\"font-size:19px;line-height:150%\">-</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">流程配置</span><span style=\"font-size:19px;line-height:150%\">-</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">子流程配置</span><span style=\"font-size:19px;line-height:150%\">-</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">环节配置的<span style=\"text-decoration:underline;\">处理模式</span>为“单人模式”时，则承办人不可多选，默认为单人承办模式。</span></p><p style=\"margin-top:4px;margin-right:0;margin-bottom:4px;margin-left:0;text-indent:37px;line-height:150%\"><span style=\"font-size:19px;line-height:150%;font-family: 宋体\">多人模式下，承办部门综合可以根据实际情况发送单人承办，或者多人承办。</span></p><p><span style=\"font-size:19px;font-family:宋体\">（</span><span style=\"font-size:19px\">1</span><span style=\"font-size:19px;font-family:宋体\">）当选择一名处理人，触发单人承办方式，当前处理人仅为单人时，可直接在“过程意见”中填写意见，并通过【发送承办人】按钮，选择下一环节和处理人，如此流转，<span style=\"color:black\">直至【部门领导阅示】环节的部门领导用户提交最终意见后，反馈制发单位从而办结承办单。</span></span></p><p><span style=\"font-size:19px;font-family:宋体\">（</span><span style=\"font-size:19px\">2</span><span style=\"font-size:19px;font-family:宋体\">）当选择多名处理人，触发多人承办方式，表单表头中“当前处理人”字段显示当前环节进行承办的所有人，承办表单所有字段均为只读不可编辑，每个当前处理人可通过【反馈意见】按钮，填写承办的“过程意见”，将过程意见反馈给部门综合。</span></p><p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">用户在输入反馈意见时，此时此处理单被上一人收回，则在点击【反馈意见】按钮时，弹出提示：“提交失败，承办单已被收回。”，点击确定后，关闭处理单页面。</span></p><p style=\"text-indent:37px\"><span style=\"font-size:19px;font-family:宋体\">用户在打开处理单时，此时此处理单被上一人收回，此时当文件触发“保存”操作时，弹出提示“保存失败，承办单已被收回。”，点击确定后，关闭处理单页面。</span></p><p><span style=\"font-size:19px;font-family:宋体\">（注：（</span><span style=\"font-size:19px;font-family:&#39;Calibri&#39;,&#39;sans-serif&#39;\">1</span><span style=\"font-size:19px;font-family:宋体\">）多人承办时，不调用缺省人功能；（</span><span style=\"font-size:19px;font-family:&#39;Calibri&#39;,&#39;sans-serif&#39;\">2</span><span style=\"font-size:19px;font-family:宋体\">）多人承办时，主表单中的【查看承办部门流程】当前处理人也显示为多人。（</span><span style=\"font-size:19px;font-family:&#39;Calibri&#39;,&#39;sans-serif&#39;\">3</span><span style=\"font-size:19px;font-family:宋体\">）多人会签时，不调用直接返回权限功能）</span></p><p><span style=\"font-size:19px;font-family:宋体\">（</span><span style=\"font-size:19px\">3</span><span style=\"font-size:19px;font-family:宋体\">）多人接收到部门综合发送的承办单后，每个人可通过点击【发送承办人】按钮，在弹窗中再次选择一个人（仅可选一次）参与承办，再次选择的参与承办人不可以选择前一环节的综合用户和承办表单的当前处理人用户（</span><span style=\"font-size:19px\">human code</span><span style=\"font-size: 19px;font-family:宋体\">相同的用户）。</span></p><p><span style=\"font-size:19px;font-family:宋体\">（</span><span style=\"font-size:19px\">5</span><span style=\"font-size:19px;font-family:宋体\">）在相同一级部门内的所有承办人员，可以互相看到实时反馈的承办“过程意见”。</span></p><p style=\"margin-top:8px\"><span style=\"font-size:19px;font-family:宋体\">（</span><span style=\"font-size:19px\">6</span><span style=\"font-size:19px;font-family: 宋体\">）多人处理结束后，当前处理环节变回发送多人会签的环节“部门综合处理”。由综合再发送给部门领导填写承办“最终意见”。</span></p><h4><span style=\";font-weight: normal\">1.1.1.1<span style=\"font:9px &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style=\"font-family:宋体\">多人处理单状态说明</span></h4><p style=\"margin-left:28px\"><span style=\"font-size:19px;font-family:Wingdings\">Ø<span style=\"font:9px &#39;Times New Roman&#39;\">&nbsp; </span></span><strong><span style=\"font-size:19px;font-family: 宋体\">部门综合：</span></strong></p><p style=\"margin-top:4px;margin-right:0;margin-bottom:4px;margin-left:0;text-indent:37px;line-height:150%\"><span style=\"font-size:19px;line-height:150%;font-family: 宋体\">部门综合在选择多个承办人发送成功后，承办单变为“已办”状态。<span style=\"color:black\">当所有的承办人全部反馈意见后，承办单变为</span></span><span style=\"font-size:19px;line-height:150%;color:black\">“</span><span style=\"font-size:19px;line-height:150%;font-family:宋体;color:black\">待办</span><span style=\"font-size:19px;line-height:150%;color:black\">”</span><span style=\"font-size:19px;line-height:150%;font-family:宋体;color:black\">状态</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">。另外，当部门综合收回所有的承办单，则承办单变为</span><span style=\"font-size:19px;line-height:150%\">“</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">待办</span><span style=\"font-size:19px;line-height:150%\">”</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">状态。当承办单变为“待办”状态时，在模块中的待办和首页待办均为红色显示。</span></p><p style=\"margin-left:28px\"><span style=\"font-size:19px;font-family:Wingdings\">Ø<span style=\"font:9px &#39;Times New Roman&#39;\">&nbsp; </span></span><strong><span style=\"font-size:19px;font-family: 宋体\">承办人：</span></strong></p><p style=\"margin-top:4px;margin-right:0;margin-bottom:4px;margin-left:0;text-indent:37px;line-height:150%\"><span style=\"font-size:19px;line-height:150%;font-family: 宋体\">承办人反馈意见后，承办单变为</span><span style=\"font-size:19px;line-height:150%\">“</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">已办</span><span style=\"font-size:19px;line-height:150%\">”</span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">状态。</span></p><h4><span style=\";font-weight: normal\">1.1.1.2<span style=\"font:9px &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style=\"font-family:宋体\">按钮说明</span></h4><p style=\"margin-left:60px;line-height:150%\"><span style=\"font-size:19px;line-height:150%\">1.<span style=\"font:9px &#39;Times New Roman&#39;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style=\"font-size:19px;line-height:150%;font-family:宋体\">承办单——部门综合处理环节</span></p><p><br/></p>",
// currentNode: "起草",
// currentNodeId: "7523ac18-6234-41b1-a990-0c6e2da3ffef",
// currentNowName: "办公室 周建元",
// currentUser: "周建元",
// currentUserDept: "办公室",
// currentUserDeptId: "010000100019",
// currentUserId: "130105166381",
// currentUserOneDept: "办公室",
// currentUserOneDeptId: "010000100019",
// deptTableHead: "中国建设银行办公室便函",
// documentNo: "办公室〔2022〕 号",
// draftDepartment: "办公室",
// draftDepartmentId: "010000100019",
// draftDepartmentOne: "办公室",
// draftDepartmentOneId: "010000100019",
// draftOrgan: "总行",
// draftOrganId: "U010000",
// draftTime: "2022-07-26",
// draftUser: "周建元",
// draftUserId: "130105166381",
// feedBack: "true",
// finishTime: "",
// hasDocumentNo: "false",
// humanCode: "01000013732",
// hwCbDept: "",
// id: "BH2022072609303224900000000000881",
// isCanDelete: "0",
// isNumber: "办公室〔2022〕 号",
// isReadFlag: "1",
// isUndertakeOver: "0",
// main: "驻建行纪检监察组,党委组织部,巡视工作办公室,党委宣传部,党务工作部,党校（高级研修院）",
// multiID: "CN004",
// num: 0,
// ormOption: "MY_BATIS",
// pcsAvyId: "A2007690cd83341c9b247a28b2cbec84f155138",
// phone: "010-619794311011 1311161590111",
// showApp: "0",
// title: "0726",
// tplNo: "T006a11683e85c64f6ca300f54c3a4191a6",
// undertakeDepartment: "",
// workflowId: "P92156697858ae3de24055bda6345275c6facb",
// wyPle: "",
// cyList:[],
// sendList:[],
// commentsList:[],
// checkList:[],
// cbList:[]
//     }
//       try {
//           this.fontFamily = this.formdata.content.match(
//             /彩虹粗仿宋|彩虹楷体|彩虹黑体|彩虹小标宋/gi
//           )[0];
//         } catch (e) {
//           this.fontFamily = "彩虹粗仿宋";
//         }
//         try {
//           let fontSizeArray = Array.from(
//             new Set(
//               this.formdata.content.match(/(font-size: )\w\w(px)/gi).sort()
//             )
//           );
//           this.fontSize =
//             fontSizeArray[0].split(": ")[1] < "21px"
//               ? "21px"
//               : fontSizeArray[0].split(": ")[1];
//         } catch (e) {
//           this.fontSize = "21px";
//         }
   this.loadData();
   this.getFileList();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-top: 10px;
    width: 100%;
  }
  .p2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
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

.beiZh {
  overflow: hidden;
  .content {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .name {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
}

.chuanYue {
  overflow: hidden;
  .chuanYue1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .chuanYue2 {
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
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
td {
  border: solid #000 1px;
  padding: 7px 0;
}

.printButton {
  position: absolute;
  top: 55%;
  right: 3%;
}
</style>
