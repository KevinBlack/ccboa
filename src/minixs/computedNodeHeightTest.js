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
    getTrNode(node){
      //offsetHeight
      let arrDPI = new Array();
      if ( window.screen.deviceXDPI != undefined ) {
          arrDPI[0] = window.screen.deviceXDPI;
          arrDPI[1] = window.screen.deviceYDPI;
      }
    },
  },
  watch:{
      printShow: {
          handler(v) {
              
          },
          immediate: true,
          deep:true,
      }
  }
}