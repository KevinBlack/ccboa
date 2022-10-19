/**
 * create by wl on 2022/1/14
 * 类注释：判断是否有权限打开
 * 备注：
 */
export default {
	methods: {
		getIsNowUser(res,type='fcy',ym="fdb") {
      if(this.$route.query.from&&this.$route.query.from == 'home'){
        return
      }
      if(type == 'cy'){
        if(res.data.curUserCode != JSON.parse(localStorage.getItem("userInfo")).humanCode&&(res.data.secretType&&res.data.secretType!="")){
          let saveId = this.$route.query.id
          let routeOpenId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
          if(routeOpenId.includes(saveId)){
            routeOpenId.splice(routeOpenId.indexOf(saveId),1);
            localStorage.setItem('routeIdList', JSON.stringify(routeOpenId));
          }
          this.$message({
            message: '密级文件未流经本人，无权查看',
            type: "error"
          });
          setTimeout(()=>{
            let routeData = this.$router.resolve({
              path: "/home",
              query: {
              }
            })
            window.location.href=routeData.href
          },1000)
        }
      }else{
        if(ym == 'db'&&res.data.isToDo==false&&(res.data.secretType&&res.data.secretType!="")){
          let saveId = this.$route.query.id
          let routeOpenId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
          if(routeOpenId.includes(saveId)){
            routeOpenId.splice(routeOpenId.indexOf(saveId),1);
            localStorage.setItem('routeIdList', JSON.stringify(routeOpenId));
          }
          this.$message({
            message: '密级文件未流经本人，无权查看',
            type: "error"
          });
          setTimeout(()=>{
            let routeData = this.$router.resolve({ //
              path: "/home",
              query: {
              }
            })
            window.location.href=routeData.href
          },1000)
        }
        if(ym == 'fdb'&&res.data.isOpen==false&&(res.data.secretType&&res.data.secretType!="")){
          let saveId = this.$route.query.id
          let routeOpenId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
          if(routeOpenId.includes(saveId)){
            routeOpenId.splice(routeOpenId.indexOf(saveId),1);
            localStorage.setItem('routeIdList', JSON.stringify(routeOpenId));
          }
          this.$message({
            message: '密级文件未流经本人，无权查看',
            type: "error"
          });
          setTimeout(()=>{
            let routeData = this.$router.resolve({ //
              path: "/home",
              query: {
              }
            })
            window.location.href=routeData.href
          },1000)
        }
      }
      
    }
	},
}
