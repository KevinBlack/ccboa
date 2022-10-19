/**
 * create by cx on 2022/3/29
 * 类注释：打印处理单
 * 备注：
 */

export default {
  data() {
    return {
      A4height:1123,
      marginTopHeight:90,//表头高度
      allPageHeight:0,//计算进行总高度
      pageCount:1,//分页次数
      theadHeight:0,//thead高度
      isSpceial:false,//是否特殊处理，如行领导秘书什么的需要设置为true
    }
  },
  methods: {
    /**
     * firstNotPage  第一页是否需要处理。默认需要
     * allNotPage 全部是否需要处理。默认需要
     */
    initPrintData(firstNotPage=true,allNotPage=true){
      if(allNotPage == false){}else{
        if(firstNotPage == false)this.pageCount=2;
        let tr = document.getElementsByTagName('tr');
        let allHeight = this.marginTopHeight+this.theadHeight*this.pageCount;
        let trNeedPage = 0;//需要分页的节点
        for(let i = 0; i < tr.length;i++){
          allHeight += tr[i].offsetHeight
          if(allHeight>this.A4height*this.pageCount){
            trNeedPage = i;
            let copyNode = tr[i].cloneNode(true);
            let lastNodeHeight = allHeight-tr[i].offsetHeight;//需要分页节点的前一个参数
            let tdNode = tr[i].children[1].children
            let copyAllNodeHeight = Number(JSON.stringify(JSON.parse(lastNodeHeight)));
            for(let j = 0;j<tdNode.length;j++){
              copyAllNodeHeight+=tdNode[j].offsetHeight;
              if(copyAllNodeHeight>this.A4height*this.pageCount){
                let lastNodeHeightTd = copyAllNodeHeight-this.A4height*this.pageCount-tdNode[j].offsetHeight;//需要分页节点的前一个参数td
                if((copyAllNodeHeight-lastNodeHeight<123)&&j==0){
                  let appendHeight = copyAllNodeHeight-this.A4height*this.pageCount-tdNode[j].offsetHeight + tr[i-1].offsetHeight
                  //tr[i-1].setAttribute('style',"height:"+100+'px !important')
                  this.pageCount++;
                  this.initPrintData();
                  break
                }else{
                  let needPageTd = j;
                  let newTrHeight = 0;
                  if((j-1)>=0){
                    for(let h = needPageTd;h<tdNode.length;h++){
                      tdNode[h].innerHTML='';
                    }
                  
                    for(let k = needPageTd-1;k>=0;k--){
                      copyNode.children[1].children[k].innerHTML='';
                    } 
                    
                  }else{
                    
                      for(let h = needPageTd+1;h<tdNode.length;h++){
                        tdNode[h].innerHTML='';
                      }
                      copyNode.children[1].children[0].innerHTML='';
                  }
                  //copyNode.children[0].innerHTML="";
                  tr[i].parentNode.insertBefore(copyNode,tr[i+1])
                }
                this.pageCount++;
                this.initPrintData();
                break
              }
            }
          }
        }
      }
    },
  
  
  },
  watch:{
    printShow:{
      handler(v){
        if(!v){
          console.log(2);
          
        }else{
          window.location.reload()
        }
      },
      immediate:false,
      deep:true,
    }
  },
  async mounted(){
    let tbody = document.getElementsByTagName('tbody');
    let rowHeigh = document.querySelectorAll('.el-row')
    
    let thead = document.createElement('thead');
    thead.innerHTML = `<thead style="border:none">
          <tr style="border:none">
            <td colspan="6" style="height:1px;border:none"></td>
          </tr>
        </thead>`;
    await tbody[0].parentNode.insertBefore(thead,tbody[0])
    this.theadHeight = tbody[0].offsetTop;
    this.marginTopHeight = rowHeigh[0].offsetHeight;
  }
}

