/**
 * now just for two pages...
 * todo more...
 * author:cx
 */
export default {
    data() {
      return {
        pageNeedSplce:false,
        pageSplitTimes:[],   //分页数 序号
        pageSplitRemainHeight:[],//分页时的高度 原始高度
        pageNodeHeightReset:[],
        pageStartNodeHeight:'',//原始高度
        pageInsertHeight:0,
        prevInserHeight:0,//分页处高度
      }
    },
    methods: {
        getDeviceDpi() {
            // var arrDPI = new Array();
            // if ( window.screen.deviceXDPI != undefined ) {
            //     arrDPI[0] = window.screen.deviceXDPI;
            //     arrDPI[1] = window.screen.deviceYDPI;
            // }
            // else {
            //     var tmpNode = document.createElement( "DIV" );
            //     tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
            //     document.body.appendChild( tmpNode );
            //     arrDPI[0] = parseInt( tmpNode.offsetWidth );
            //     arrDPI[1] = parseInt( tmpNode.offsetHeight );
            //     tmpNode.parentNode.removeChild( tmpNode );
            // }
            // return arrDPI;
        },
        computedNodeHeight(){
            // var transfHeight = 1200|| parseInt(297*(this.getDeviceDpi()&&this.getDeviceDpi()[0]||96)/25.4);
            // var trNode = $("tr");
            // var trNumber = trNode.length;
            // var prevHeight = 0;
            // var nodHeight = 0;//tr元素累加高度 
            // var needForcePage = false;//强制分页处理
            // var needAddHeight = $(".needAddHeight").attr("class");//意见域补高度
            
            // for(var i=0;i<trNumber;i++){
            //     nodHeight = trNode.eq(i).offset().top-(transfHeight*this.pageSplitTimes.length);
            //     prevHeight = 2 + Math.abs(transfHeight-nodHeight);
            //     needForcePage = trNode.eq(i).attr("class") && trNode.eq(i).attr("class").indexOf("needForcePage")>-1;
            
            //     if(this.pageSplitTimes.length){
            //         trNode = $("tr");
            //         nodHeight = trNode.eq(i+1).height();
            //         if(trNode.eq(i).offset().top>0){
            //             if(trNode.eq(i).attr("class") == 'newConcatNode'||!trNode.eq(i).offset().top){//此处节点为新增 或移动后隐藏节点时
            //                 if(!trNode.eq(i).offset().top){
            //                     prevHeight = transfHeight*(1+this.pageSplitTimes.length)- trNode.eq(i+1).offset().top
            //                 }else{
            //                     prevHeight = transfHeight*(1+this.pageSplitTimes.length)- trNode.eq(i).offset().top;
            //                 }
            //             }else{
            //                 prevHeight = transfHeight*(1+this.pageSplitTimes.length)- trNode.eq(i).offset().top +60*this.pageSplitTimes.length;
            //             }
            //             if(nodHeight+trNode.eq(i+1).offset().top > transfHeight*(this.pageSplitTimes.length+1)){//向下一个tr顺延
            //                 this.nodeAppend(trNode,trNode.length,prevHeight,i,1);
            //             }
            //         }
            //     }else{
            //         if(nodHeight>transfHeight){//向上一个tr顺延
            //         this.nodeAppend(trNode,trNumber,prevHeight,i,0);
            //         }else{
            //             if(needForcePage){
            //                 //有切第一页时生效
            //                 this.nodeAppend(trNode,trNumber,prevHeight,i,1,needAddHeight);
            //             }else{
            //                 if((nodHeight + trNode.eq(i).height()) > transfHeight-30){
            //                     this.nodeAppend(trNode,trNumber,prevHeight,i,0);
            //                 }else if(nodHeight + trNode.eq(i).height() +(i+1<trNumber?trNode.eq(i+1).height():0) > transfHeight-30){//向下一个tr顺延
            //                     this.nodeAppend(trNode,trNumber,prevHeight,i,1,needAddHeight);
            //                 }
            //             }
            //         }
            //     }
            // }
        },
        nodeAppend(trNode,trNumber,prevHeight,number,compNumber,resolveHgt){
            // var breakHeight = 45;//默认分割处高度
            // var concatStrStart = "<tr class='newConcatNode' style='page-break-after: always;height:";
            // var concatStrEnd = "px!important;'></tr>";
            // var concatStr = "";
            // var forceSplitNode = trNode.eq(number+compNumber);//多条意见使用
            // var optionsLists = 1;//意见数目
            // var nodeLists = '';
            // this.pageNeedSplce = true;
            
            // if(number<trNumber-1+this.pageSplitTimes.length){
            //     this.pageNodeHeightReset.push(number-1+compNumber);
            //     if(trNode.eq(number-1+compNumber).find("td").eq(0).attr("rowspan")>1){//是否有合并单元格
            //         concatStr = concatStrStart +( prevHeight + 60)+ 　concatStrEnd;
            //         $(concatStr).insertAfter(trNode.eq(number-2+compNumber));
            //         this.prevInserHeight = trNode.eq(number-2+compNumber+1).offset().top;
            //     }else{
            //         var splitNodesHeight = 0;//切分高度
            //         var splitNodesDom =forceSplitNode.clone().addClass("newSplitConcat");
            //         var splitNodeCounts = 0; //移位元素个数
            //         var addNodeHeight = 0;   //补位高度
            //         breakHeight = prevHeight - trNode.eq(number).height()+60;
            //         if(forceSplitNode.find("td")&&forceSplitNode.find("td").length>1 &&forceSplitNode.find("td").eq(1).children().length>1){//多条意见域截取
            //             nodeLists = forceSplitNode.find("td").eq(1).children().filter(node=>{
            //                 return !$(nodeLists[node]).attr("class")||$(nodeLists[node]).attr("class")!='newSplit';
            //             });
            //             optionsLists = nodeLists.length;
            //             for(var i=0;i<optionsLists;i++){
            //                 if(prevHeight - trNode.eq(number).height() - splitNodesHeight- nodeLists.eq(i).height()>110){
            //                  splitNodesHeight +=  nodeLists.eq(i).height();
            //                  forceSplitNode.find("td").eq(1).children().eq(i).addClass("newSplit");
            //                  splitNodeCounts++;
            //                }
            //             }
            //             if(splitNodeCounts>0){
            //                 for(var d=optionsLists-1;d>splitNodeCounts-1;d--){
            //                     splitNodesDom.find("td").children(0).eq(d).remove();
            //                 }
            //             }
            //             if(splitNodeCounts && splitNodeCounts < optionsLists){
            //                 breakHeight = prevHeight - trNode.eq(number).height() - splitNodesHeight +60;
            //                 if(resolveHgt){
            //                     addNodeHeight = prevHeight - trNode.eq(number).height() -splitNodesHeight;
            //                     $(".needAddHeight").height(151+ addNodeHeight);
            //                 }
            //                 concatStr = concatStrStart + breakHeight + 　concatStrEnd;
            //                 splitNodesDom.insertAfter(trNode.eq(number-1+compNumber));
            //                 $(concatStr).insertAfter(splitNodesDom);
            //             }else if(!splitNodeCounts){
            //                 if(resolveHgt){
            //                     addNodeHeight = prevHeight - trNode.eq(number).height()-40;
            //                     $(".needAddHeight").height(151+ prevHeight - trNode.eq(number).height()+30);
            //                 }
            //                 concatStr = concatStrStart + (breakHeight -addNodeHeight+40*(this.pageSplitTimes +1)) + 　concatStrEnd;
            //                 $(concatStr).insertAfter(trNode.eq(number -1 +compNumber));
            //             }else if( splitNodeCounts < optionsLists ){
            //                 breakHeight = prevHeight - trNode.eq(number).height()+60;
            //                 concatStr = concatStrStart + breakHeight + 　concatStrEnd;
            //                 $(".newSplit").removeClass("newSplit");
            //                 $(concatStr).insertAfter(trNode.eq(number+compNumber));
            //             }
            //         }else{
            //             if(resolveHgt){
            //                 addNodeHeight = prevHeight - trNode.eq(number).height()-40;
            //                 $(".needAddHeight").height(151+ prevHeight - trNode.eq(number).height()+30);
            //             }
            //             concatStr = concatStrStart + (breakHeight -addNodeHeight+30) + 　concatStrEnd;
            //             $(concatStr).insertAfter(trNode.eq(number -1 +compNumber ));
                        
            //         }
            //         // trNode.eq(number+compNumber).attr("style","margin-top:50px");
            //         this.prevInserHeight = trNode.eq(number-1+compNumber+1).offset().top;
            //     }
            //     this.pageInsertHeight = breakHeight;
            //     this.pageSplitTimes.push(number+1);
            // }
        }
    },
    watch:{
        printShow: {
            handler(v) {
                if(!v){
                    // $(".tablePrint").css("width","auto");
                    // $(".el-scrollbar").css("overflow","visible");
                    // $(".app_Wrp").css("height","auto");
                }else{
                    // $(".tablePrint").css("width","900px");
                    // if(!this.pageStartNodeHeight){
                    //     this.pageStartNodeHeight =  $(".app_Wrp").css("height");
                    // }
                    // $(".app_Wrp").css("height",this.pageStartNodeHeight);
                    // $(".newSplit").removeClass("newSplit");
                    // $(".newSplitConcat").remove();
                    // $(".needAddHeight").height(151);
                }
                if(v && this.pageNeedSplce){
                    $(".newConcatNode").remove(); 
                    // for(let i=0;i<this.pageNodeHeightReset.length;i++){
                    //     for(let j =i+1;j<this.pageNodeHeightReset.length;j++){
                    //         if(this.pageNodeHeightReset[i] == this.pageNodeHeightReset[j]){
                    //             this.pageNodeHeightReset.splice(j,1);
                    //             j--
                    //         }
                    //     }
                    // }
                    // this.pageNodeHeightReset.map((n)=>{
                    //   $("tr").eq(n).attr("style","height:auto!important")
                    // })
                    this.pageNodeHeightReset = [];
                }else{
                    this.pageSplitTimes = [];
                    this.computedNodeHeight();
                }
            },
            immediate: true
        }
    }
}