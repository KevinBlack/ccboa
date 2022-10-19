/**
 * create by zx on 2020/1/4 12:52
 * 类注释：页面跳转
 * 备注：
 */
import {Message}  from  'element-ui'
export default {
  /**
   * 页面替换
   * @param vue
   * @param location
   */
  replace(vue, location) {
    vue.$router.replace(location)
  },
  /**
   * 页面跳转
   * @param vue
   * @param location
   */
  go(vue, location) {
    vue.$router.push(location)
  },
  /**
   * 打開新也签
   * @param vue
   * @param location
   */
  goNewPage(vue, location) {
    // console.log(location,'location')
    // let openFlag = JSON.parse(localStorage.getItem("openFlag")) 
    // console.log(openFlag,'openflag')
    //   if(openFlag&&openFlag.includes(location.query.id)){
    //     Message({
    //         type: "error",
    //         showClose: true,
    //         message: "已经打开了该页面!",
    //         duration: 1500,
    //     });
    //     return;
    //   }else{
        
    //     let newPage = vue.$router.resolve(location);
    //     window.open(newPage.href, '_blank')
    //   }
    // return
    if(location.query.model=='Ck'){//判断管理员查看
      if (process.env.NODE_ENV != 'development') {
        let openFlagCk = JSON.parse(localStorage.getItem("openFlagCk")) 
        if(openFlagCk&&openFlagCk.includes(location.query.id)){
          Message({
              type: "error",
              showClose: true,
              message: "已经打开了该页面!",
              duration: 1500,
          });
          return;
        }else{
          
          let newPage = vue.$router.resolve(location);
          window.open(newPage.href, '_blank')
        }
       } else {
         vue.$router.push(location)
       }
    }else{
      if (process.env.NODE_ENV != 'development') {
        let openFlag = JSON.parse(localStorage.getItem("openFlag")) 
        if(openFlag&&openFlag.includes(location.query.id)&&location.query.flag!='cld'){
          Message({
              type: "error",
              showClose: true,
              message: "已经打开了该页面!",
              duration: 1500,
          });
          return;
        }else{
          
          let newPage = vue.$router.resolve(location);
          window.open(newPage.href, '_blank')
        }
       } else {
         vue.$router.push(location)
       }
    }
     

  },
  /**
   * 关闭页签
   * @param vue
   */
  closeWindow(vue) {
    console.log(vue,'vue')

    // setTimeout(()=>{
    //   let openFlag = JSON.parse(localStorage.getItem("openFlag")) 
    //   if(openFlag.includes(vue.form.id)){
    //     let arr = []
    //     openFlag.map((item)=>{
    //       if(vue.form.id!=item){
    //         arr.push(item)
    //       }
    //     })
    //     console.log(arr,'arr')
    //     localStorage.setItem('openFlag',JSON.stringify(arr))
    //   }
    //    window.location.href = "about:blank";
    //    window.opener.location.reload()
    //    window.close();
    //  },1000)
    // return
    if(vue.watchCk=='guanLiCk '){//有值为管理员查看关闭
      console.log('999')
      if (process.env.NODE_ENV != 'development') {
        setTimeout(()=>{
         let openFlagCk = JSON.parse(localStorage.getItem("openFlagCk")) 
                //小米辦公跳轉關閉問題
       if (localStorage.getItem("st").indexOf("smarto") > -1) {
        if(navigator.userAgent.indexOf('Firefox')!=-1||navigator.userAgent.indexOf("Chrome")!=-1){
          window.location.href="about:blank";
          window.close();
        }else{
          window.opener=null;
          window.open("","_self");
          window.close();
        }
      }else{
        if((vue.form&&vue.form.id)&&openFlagCk!=undefined&&openFlagCk!=null&&openFlagCk.lengt>0){
          if(openFlagCk.includes(vue.form.id)){
            let arr = []
            openFlagCk.map((item)=>{
              if(vue.form.id!=item){
                arr.push(item)
              }
            })
            console.log(arr,'arr')
            localStorage.setItem('openFlagCk',JSON.stringify(arr))
            window.location.href = "about:blank";
            window.opener.location.reload()
            window.close();
          }
        }else{
          window.location.href = "about:blank";
          window.opener.location.reload()
          window.close();
        }
      }          
        },1000)
      } else {
          vue.$router.back()
      }
    }else{
      console.log('ss')
     
      if (process.env.NODE_ENV != 'development') {
        setTimeout(()=>{
         let openFlag = JSON.parse(localStorage.getItem("openFlag")) 
                         //小米辦公跳轉關閉問題
       if (localStorage.getItem("st").indexOf("smarto") > -1) {
        if(navigator.userAgent.indexOf('Firefox')!=-1||navigator.userAgent.indexOf("Chrome")!=-1){
          window.location.href="about:blank";
          window.close();
        }else{
          window.opener=null;
          window.open("","_self");
          window.close();
        }
      }else{
        if((vue.form&&vue.form.id)&&openFlag!=undefined&&openFlag!=null&&openFlag.lengt>0){
          if(openFlag.includes(vue.form.id)){
            let arr = []
            openFlag.map((item)=>{
              if(vue.form.id!=item){
                arr.push(item)
              }
            })
            console.log(arr,'arr')
            localStorage.setItem('openFlag',JSON.stringify(arr))
            window.location.href = "about:blank";
            window.opener.location.reload()
            window.close();
          }
        }else{
          console.log('678')
          window.location.href = "about:blank";
          window.opener.location.reload()
          window.close();
        }
      }         
        },1000)
      } else {
        vue.$router.back()
      }
    }
     
  },
  /**
   * 关闭也签不刷新
   */
  closeWindowImpo(vue) {
    setTimeout(() => {
      window.location.href = "about:blank";
      window.close();
    }, 1000)
  },
  /**
   * 关闭页面标示，数组去重
   */
  arrUniq(arr){
    var temp = [];
    arr.forEach(function(e,i,arr){
       if(arr.indexOf(e) === i){
        temp.push(e)
       }
    });
    return temp
  },
  //正常用印表单关闭浏览器
  clonsWindow(id){
    let openFlag = JSON.parse(localStorage.getItem("openFlag")) 
        if(openFlag.includes(id)){
          let arr = []
          openFlag.map((item)=>{
            if(id!=item){
              arr.push(item)
            }
          })
          console.log(arr,'arr')
          localStorage.setItem('openFlag',JSON.stringify(arr))
        
        }
  },
  //管理员查看关闭浏览器
  clonsWindowCk(id){
    let openFlag = JSON.parse(localStorage.getItem("openFlagCk")) 
        if(openFlag.includes(id)){
          let arr = []
          openFlag.map((item)=>{
            if(id!=item){
              arr.push(item)
            }
          })
          console.log(arr,'arr')
          localStorage.setItem('openFlagCk',JSON.stringify(arr))
        
        }
  }
}