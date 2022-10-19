//常规
import changGuiLabels from "./index";//常规
console.log(changGuiLabels,'aaa')
export default {
  data() {
    return {
      changGuiLabel:changGuiLabels.changGuiLabel, //常规
      bianhanLabelzf:changGuiLabels.bianhanLabelzf,//便函制发
      bianhanLabelcb:changGuiLabels.bianhanLabelcb,//便函承办
      shiwuLabel:changGuiLabels.shiwuLabel,//事务审批
    }
},
methods:{
  formTextChange(type){
     this.$api.sealManage
    .labelTian(type)
    .then(res => {
      console.log(res, "模块label数据");
      // this.yzscUnit = res.data.scUnit;
      console.log(JSON.stringify(res.returnVal),'JSON.stringify(res.returnVal)')
      if(JSON.stringify(res.returnVal)!='{}'){
        switch(type){
          case "yzgl_cgyy": //常规
              this.changGuiLabel = res.returnVal
              break;
              case "bhgl_zf": //便函制发
              this.bianhanLabelzf = res.returnVal
              break;
              case "bhgl_cb"://便函承办
              this.bianhanLabelcb = res.returnVal
              break;
              case "swgl_sp"://事务审批
              this.shiwuLabel = res.returnVal
              break;

        }
        
      }
    })
    .catch(e => {

    });
  }
}
}