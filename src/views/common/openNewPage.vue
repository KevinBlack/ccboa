<template>
    <div>
        
    </div>
</template>

<script>
import http from '@/http/http.js'
import Des from '@/assets/js/des'
import { skipPath, typeNameFormat, allCircle } from '@/util/skipPath.js'
import paraMeter from '@/httpTansun/api/publication/paraMeter.js'
export default {
	name:'openNewPage',
	data(){
		return{
			id:"",
			token:"",
			table_id:"",
			UPDATE_FLAG:"",
			DATA_TYPE:"",
			DOCUMENT_TYPE:"",
			userName:"",
			loginForm: {
				function: 'checkUassLogin',
				LoginName: '',
				Voucher: '',
			},
		}
  },
	methods:{
		async notiUpdata() {
      let param = {
        function: 'updateTotodorecordById', 
        todoRecordId: this.table_id,
        readFlag: '1',
        todoFlag: '1',
      }
      this.$post
        .postData('updateTotodorecordById', JSON.stringify(param), this.$businessCode.dbgl)
        .then((res) => {})
		},
		async nextPage(val) { 
      let row ={
        DATA_TYPE:this.DATA_TYPE||'',
        UPDATE_FLAG:this.UPDATE_FLAG||'',
        DOCUMENT_TYPE:this.DOCUMENT_TYPE||'',
        table_id:this.table_id||'',
        ID:this.id||'',
      }
      if (!(val&&val=="xiaomin")) {
        this.getLoginPage();
      }
      if (this.DATA_TYPE == 'FW_QZSH') {
        await this.notiUpdata()
        window.close();
        return
      }else if(this.DATA_TYPE == 'TDGG' || this.dataType == 'TDGG') {
        //dakai tanchuang
        await this.notiUpdata()
        window.close();
        return
      }else if(this.DATA_TYPE == 'homeIndex'||(val=="xiaomin"&&this.DATA_TYPE == "")) {
        const routeData = this.$router.resolve({
        path: "/index",
       
        });
        window.location.href = routeData.href
        return
      } else if (this.DATA_TYPE == 'D_BHZF' 
        || this.DATA_TYPE == 'D_BHCB'
        || this.DATA_TYPE == 'D_SWSPWH'
        || this.DATA_TYPE == 'SW_KHSWSP'
        || this.DATA_TYPE == 'HY_XTHYTZZF'
        || this.DATA_TYPE == 'HYGL_BBHYTZZF'
        || this.DATA_TYPE == 'HYGL_BMHYTZZF'
        || this.DATA_TYPE == 'D_PXTZZF'
        || this.DATA_TYPE == 'HY_XTHYTZCH'
        || this.DATA_TYPE == 'HYGL_BBHYTZCH'
        || this.DATA_TYPE == 'HYGL_BMHYTZCH'
        || this.DATA_TYPE == 'D_PXTZCX'
        || this.DATA_TYPE == 'HY_XTHYTZCB'
        || this.DATA_TYPE == 'D_PXTZCXWH') {
          let skipPathObj = skipPath(row)
          let todoPath
          if (row.UPDATE_FLAG == '2') {
             await this.notiUpdata()
          }
          todoPath = skipPathObj.todoDetailRouter
          let routeData = this.$router.resolve(todoPath)
          localStorage.setItem("ngPath",routeData.location.path);
          window.location.href = routeData.href
        }else {
          let skipPathObj = skipPath(row)
          let todoPath
          if (this.UPDATE_FLAG == '2') {
            todoPath = skipPathObj.completeRouter
            await this.notiUpdata()
          } else {
            if(this.DATA_TYPE == 'D_LDPS'){
              //row['id'] = row.ID
            } 
            let skipPathObj = skipPath(row)
            let todoPath
            if (this.UPDATE_FLAG == '2') {
              todoPath = skipPathObj.completeRouter
            } else {
              todoPath = skipPathObj.todoDetailRouter
            }
            let routeData = this.$router.resolve(todoPath)
            if (this.UPDATE_FLAG == '1' || this.UPDATE_FLAG == '2') {
              //当前数据仅为通知时更新通知状态；
              await this.notiUpdata() 
            }
            localStorage.setItem("ngPath",routeData.location.path);
            window.location.href = routeData.href
        }   
      }
    },
		getLoginPage(){
			this.loginForm.ip=localStorage.getItem("ip")||'127.0.0.1';
			localStorage.setItem("ip",this.loginForm.ip);
      localStorage.setItem("st",this.$route.query.st);
      let transForm = {
        function: 'getUserInfoBySt',
        st: this.$route.query.st,
        ip:this.loginForm.ip
      };
      this.$post.postData('getUserInfoBySt', JSON.stringify(transForm), this.$businessCode.xtdl).then((res) => {
            if (res.success) {
                localStorage.setItem('st', res.st)
                localStorage.setItem('st_token', res.st_token)
                localStorage.setItem('ticket', res.ticket);
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
                localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
                localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
                localStorage.setItem('LoginName', '')
                this.nextPage();
              }
          }).catch(err => {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400, 
              message: err.message,
              duration: 1500,
            });
          })
    },
    xiaominLoginPage() {
      this.loginForm.ip=localStorage.getItem("ip")||'127.0.0.1';
			localStorage.setItem("ip",this.loginForm.ip);
      localStorage.setItem("st",this.$route.query.st);
      this.$post.postData('xiaominPCLogin', JSON.stringify({
          function: "xiaominPCLogin",
          ticket: this.ticketXiaoMin
        }), "A0846C055").then((res) => {
          if (res.success) {
            console.log("0507lalala");
            localStorage.setItem('st', res.st||"")
            localStorage.setItem('st_token', res.st_token||"")
            localStorage.setItem('ticket', res.ticket);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
            localStorage.setItem('unitInfo', JSON.stringify(res.unitInfo))
            localStorage.setItem('tcHumanRole', JSON.stringify(res.tcHumanRole))
            localStorage.setItem('routerList', JSON.stringify(res.tcRightTree))
            localStorage.setItem('LoginName', '')
            this.nextPage("xiaomin");
          } else {
            location.href = '#/login';
            //location.reload();
          }
        })
    }
	},
	created(){
		this.id = this.$route.query.ID ? this.$route.query.ID : "";
 		this.table_id = this.$route.query.table_id ? this.$route.query.table_id : "";
		this.UPDATE_FLAG = this.$route.query.UPDATE_FLAG ? this.$route.query.UPDATE_FLAG : "";
		this.DATA_TYPE = this.$route.query.DATA_TYPE ? this.$route.query.DATA_TYPE : "";
		this.DOCUMENT_TYPE = this.$route.query.DOCUMENT_TYPE ? this.$route.query.DOCUMENT_TYPE : "";
		this.userName = this.$route.query.userName ? this.$route.query.userName : "";
    this.token = this.$route.query.st ? this.$route.query.st : "";
    this.ticketXiaoMin = this.$route.query.ticket ? this.$route.query.ticket : "";
    if (this.ticketXiaoMin) {
      this.xiaominLoginPage();
    } else {
      this.getLoginPage();
    }
	},
}
</script>  

<style>

</style>