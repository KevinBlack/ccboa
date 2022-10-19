/**
 * 字符串国际化
 * @param moudleType 所属模块
 * @param pageType page:表单页 print:打印处理单页  page页使用ref匹配 print使用id匹配 因为print页面是table布局，使用ref获取替换会打乱静态标签
 * @param isOpen 开关是否开启
 * @param moreType 后续可添加逻辑 如 表格 artile
 */
export default {
  data() {
    return {
      
    }
  },
  methods: {
    textChange (moudleType,pageType,isOpen=true,moreType1,moreType2,moreType3,moreType4) {
      let textList = JSON.parse(localStorage.getItem('textList'))
      if(!textList){
        //再次请求
          let params = {
            function: 'unitDifferenceConfig',
            modular: '',
          }
          this.$post
          .postData('unitDifferenceConfig', JSON.stringify(params), this.$businessCode.dbgl)
          .then((res) => {
            localStorage.setItem('textList', JSON.stringify(res.data))
            let textList = JSON.parse(localStorage.getItem('textList'))
            //send发文  sign签报
            if(isOpen&&textList){
              let data = [];
              for(let i = 0;i<textList.length;i++){
                if(textList[i].modular == moudleType){
                  data = textList[i]
                }
              }
              delete data.modular
              if(pageType == 'page'){
                for(let pagekey in data){
                  this.$refs[pagekey].label = data[pagekey]
                }
              }
              if(pageType == 'print'){
                for(let printkey in data){
                  console.log(printkey)
                  document.getElementById(printkey).innerText = data[printkey]
                }
              }
            }
          })
      }else{
        let textList = JSON.parse(localStorage.getItem('textList'))
        //send发文  sign签报
        if(isOpen&&textList){
          let data = [];
          for(let i = 0;i<textList.length;i++){
            if(textList[i].modular == moudleType){
              data = textList[i]
            }
          }
          delete data.modular
          if(pageType == 'page'){
            for(let pagekey in data){
              this.$refs[pagekey].label = data[pagekey]
            }
          }
          if(pageType == 'print'){
            for(let printkey in data){
              console.log(printkey)
              document.getElementById(printkey).innerText = data[printkey]
            }
          }
        }
      }
      
    }
   
    
  }
}