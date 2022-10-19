
<template>
  <!-- 传阅打印单改版 -->
  <div class="print_list">
    <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>返回</el-button>
        </el-col>
      </el-row>
    <h1>{{formdata.deptTableHead||formdata.deptTableHeader}}</h1>
    <hr class="line" />
    <p style="font-family:'楷体';">
      <span style="{'font-size':'18px'}">{{formdata.documentNo}}</span>
      <span>签发人：{{senderName}}</span>
    </p>
    <p style="{font-size':'18px';font-family: '宋体';justify-content: left;display:block;}"><span style="white-space: nowrap;font-family:'黑体';float:left;">标题：</span>{{formdata.title}}</p>
    <p style="{'font-size':'18px';font-family: '宋体';justify-content: left;}"><span style="font-family:'黑体';white-space: nowrap;">主送：</span>{{formdata.main}}</p>
    <p style="{'font-size':'18px';font-family: '宋体';justify-content: left;}" v-if="!!formdata.copy"><span style="font-family:'黑体';white-space: nowrap;">抄送：</span>{{formdata.copy}}</p>
     <div v-html="formdata.content" id="content" v-bind:style="{'font-family':fontFamily,
      'font-size':fontSize,'line-height':'1.75'}">正文内容</div>
    <hr class="line" id="bottomLine"/>
    <p class="PageNext" id="draftUser_p"><span>拟稿人：{{formdata.draftUser}}</span><span>联系电话：{{formdata.phone}}</span></p>
  
    <table class="table breakBefore print-margin table" id="sortTable">
      <tbody>
        <tr style="min-height: 140px;">
          <td style="width:20%;text-align:center;vertical-align:middle">签发意见</td>
          <td colspan="4">
            <div class="qianF" v-for="item in formdata.sendList" :key="item.id">
              <div class="p1">{{item.content}}</div>
              <div class="p2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 140px;" v-if="formdata.cyType=='cb'">
          <td style="width:20%;text-align:center;vertical-align:middle">最终意见</td>
          <td
            style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
            colspan="4"
          >
              <div class="piece" v-for="item in formdata.zzOpinion" :key="item.id">
              <div class="text1">{{item.content}}</div>
              <div class="text2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 280px;" v-if="formdata.cyType=='cb'">
          <td style="width:20%;text-align:center;vertical-align:middle">过程意见</td>
          <td colspan="4">
            <div class="piece" v-for="item in formdata.processList" :key="item.id">
              <div class="text1">{{item.content}}</div>
              <div class="text2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 280px;" v-if="formdata.cyType=='zf'">
          <td style="width:20%;text-align:center;vertical-align:middle">审核意见</td>
          <td colspan="4">
            <div class="piece" v-for="item in formdata.checkList" :key="item.id">
              <div class="text1">{{item.content}}</div>
              <div class="text2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 280px;">
          <td style="width:20%;text-align:center;vertical-align:middle">一次传阅意见</td>
          <td colspan="4">
            <div class="chuanYue" v-for="item in formdata.cyList" :key="item.id">
              <div class="chuanYue1">{{item.content}}</div>
              <div v-for="file in item.attachmentPos" :key="file.id">
                <a class="name down" style="cursor:pointer">{{file.fileName}}</a>
              </div>
              <div class="chuanYue2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 280px;">
          <td style="width:20%;text-align:center;vertical-align:middle">二次传阅意见</td>
          <td colspan="4">
            <div class="chuanYue" v-for="item in formdata.twocyList" :key="item.id">
              <div class="chuanYue1">{{item.content}}</div>
              <div v-for="file in item.attachmentPos" :key="file.id">
                <a class="name down" style="cursor:pointer">{{file.fileName}}</a>
              </div>
              <div class="chuanYue2">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
                <div>{{item.createTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="min-height: 140px;">
          <td style="width:20%;text-align:center;vertical-align:middle">传阅说明</td>
          <!-- <td
            style="width:80%;padding-left: 10px;text-align:left;vertical-align:middle"
            colspan="4"
          >{{formdata.cyExplain}}</td> -->
            <td colspan="4">
             <div class="qianF" v-for="item in formdata.cyExplain" :key="item.id">
              <div class="p1">{{item.cyExplain}}</div>
              <div class="p2">
                <span>
                  {{item.sendPersonDep}}&nbsp;
                  {{item.sendPersonEn}}
                </span>
                <div class="date">{{item.sendTime}}</div>
              </div>
            </div>
          </td>
        </tr>
        <tr style="height: 32px;">
          <td style="width:20%;text-align:center;vertical-align:middle">备注</td>
          <td colspan="4">
            <div class="beiZh" v-for="item in formdata.commentsList" :key="item.id">
              <div class="content">{{item.content}}</div>
              <div class="name">
                <span>
                  {{item.departmentName}}&nbsp;
                  {{item.userName}}
                </span>
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
          <td
            style="width:30%;text-align:left;vertical-align:middle"
          >{{formdata.feedTime}}</td>
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
import '../../assets/css/print_list.less'
export default {
  data() {
    return {
      formdata: {
        checkList:''
      },
      attchmentFileInfo: [],
      zf: false,
      cb: false,
      senderName:'',
      fontFamily:'彩虹粗仿宋',
      fontSize:'18px',
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
        //  console.log('node:',item,'当前节点高度：',item.offsetTop + item.offsetHeight,'高度',item.offsetTop + item.offsetHeight-split_t,page_content_height,'----')
           //高度相等则在该元素后添加添加分页符
          if (item.offsetTop + item.offsetHeight-split_t == page_content_height) {
            //含有下一子节点且子节点不是table元素
            if(!!children_node[index + 1]&&(!children_node.offsetParent||children_node.offsetParent.nodeName!='TABLE')){
              if(children_node[index + 1].nodeName.toLocaleLowerCase()==='span'||children_node[index + 1].nodeName.toLocaleLowerCase()==='i'){
                 $(children_node[index+1]).after(`<p class="breakBefore print-padding splitnode equal" style="height:1px"></p>`);                   
              }else{
                children_node[index + 1].className = "breakBefore print-padding splitnode";
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
           
            if(children_node[index].nodeName.toLocaleLowerCase()==='table'){
             children_node[index].className="breakBefore print-margin splitnode table"
            }else if(item.childElementCount===1&&item.innerText.length===item.children[0].innerText.length){
              //console.log('***************1*******************')
               // this.splitContent(item.children[0]);
               this.splitContent(item);
            }else if(item.childElementCount>0){
               // console.log('***************2*******************')        
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
            }else if(item.innerHTML.match(/\&nbsp;/g)){
              //特殊字符不进行分割,直接添加分页标识符
               $(item).after(`<p class="breakBefore print-padding splitnode equal" style="height:1px"></p>`);    
            }else{
                // console.log('***************3*******************')
                let str = item.innerHTML;
                for(let i = 1;i<str.length;i++){
                  let len = str.length - i;
                  let pFirstStr = str.slice(0,len);
                 
                  let pSeconedStr = str.slice(len,str.length);
                  children_node[index].innerHTML = pFirstStr;
                  // console.log(pFirstStr,'pFirstStr','高度是',children_node[index].offsetHeight,children_node[index].clientHeight)
                  //分页时会产生1.5个中文字符误差，因此插入文字为中文时长度减2个中文字符，其余情况减3个字符
                   //判断将要插入的文字后3个字符是否包含中文字符
                  if(children_node[index].offsetTop + children_node[index].offsetHeight -split_t < page_content_height
                  &&!!pFirstStr.substr(-2).match(/[\u4E00-\u9fA5]/g)){ 
                   // console.log(children_node[index].offsetTop + children_node[index].offsetHeight -split_t,page_content_height,'分页高度')
                      len = str.length - i-2;
                      pFirstStr = str.slice(0,len);
                       pSeconedStr = str.slice(len,str.length);
                       children_node[index].innerHTML = pFirstStr;
                    $(children_node[index]).after(`<p style="text-indent: 0;height:1px" class="breakBefore print-padding splitnode last"></p>${pSeconedStr}`);
                   
                    return false;
                  }else if(children_node[index].offsetTop + children_node[index].offsetHeight -split_t < page_content_height){
                    len = str.length - i-3
                    pFirstStr = str.slice(0,len);
                    pSeconedStr = str.slice(len,str.length);
                    children_node[index].innerHTML = pFirstStr;
                    $(children_node[index]).after(`<p style="text-indent: 0;height:1px;" class="breakBefore print-padding splitnode last"></p>${pSeconedStr}`);
                   
                    return false;
                  }
                }

              //若出现文字无法分割情况，则直接在当前节点前添加分页标识符
              $(item).before(`<p class="breakBefore print-padding splitnode equal" style="height:1px"></p>`);    
     
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
        .getTextemList({ id: this.$route.query.fileid,numYear:this.numyear})
        .then(res => {
          this.attchmentFileInfo = res.data;
        });
      console.log(this.formdata);
    },
    loadData() {
      this.$api.bianhan
        .chuanyueDetail({
          id: this.$route.query.id,numYear:this.numyear
        })
        .then(res => {
          //   this.formdata = res.bHMainOrderDo;
          //   this.formdata.sendList = res.sendList;
         
          this.formdata = res.data;
          this.formdata.cyExplain = res.exPlainList;
          this.formdata.checkList = res.checkList;
          this.formdata.cyry = res.cyry;
          try{
            this.fontFamily=res.data.content.match(/彩虹粗仿宋|彩虹楷体|彩虹黑体|彩虹小标宋/ig)[0];
          }catch(e){
            this.fontFamily='彩虹粗仿宋';
          }
           this.fontSize = "21px";
          
          this.formdata.twocyry = res.twocyry;
          this.formdata.commentsList = res.commentsList;
          try {
            this.formdata.cyList = res.cyList.filter(item => {
              this.$api.setSysConfig
                .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear })
                .then(res => {
                  this.$set(item, "attachmentPos", res.data);
                  this.$forceUpdate();
                });
              return item;
            });
          } catch (e) {
            this.formdata.cyList = res.cyList;
          }
          this.formdata.processList = res.processList;
          this.formdata.sendList = res.sendList;
           if(res.sendList.length>0){
            this.senderName=res.sendList[0].userName;
          }
          try {
            this.formdata.twocyList = res.twocyList.filter(item => {
              this.$api.setSysConfig
                .getTextemList({ id: item.dataId, fileType: "10010",numYear:this.numyear })
                .then(res => {
                  this.$set(item, "attachmentPos", res.data);
                  this.$forceUpdate();
                });
              return item;
            });
          } catch (e) {
            this.formdata.twocyList = res.twocyList;
          }
          this.formdata.zzOpinion = res.zzOpinion;
        });
    }
  },
  created() {
    this.loadData();
    if (!!this.$route.query.fileid) {
      this.getFileList();
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
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
}
.piece .text1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.piece .text2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.beiZh {
  overflow: hidden;
}
.beiZh .content {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.beiZh .name {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
}

.chuanYue {
  overflow: hidden;
}
.chuanYue .chuanYue1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.chuanYue .chuanYue2 {
  float: right;
  margin-right: 25px;
  margin-bottom: 8px;
  text-align: right;
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
