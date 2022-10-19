/**
 * create by yinhk
 * 类注释：
 * 备注：便函
 */
export default {
    data() {
        return {
            uploadConfig: {
                formId: "bianhan",
                filesHas: [],
                isSpecial: 0,
                id: !!this.$route.query.id ? this.$route.query.id : ''
            },
        }
    },
    methods: {
        //获取机构树
        getOrgTree() {
            return this.$api.setting.organization
                .getTree({
                    unitClass: 1,
                    searchType: '',
                    unitCode: '1',
                    type: '',
                    queryType: '',
                    opType: '',
                    seletSelf: 0,
                })
        },
        //消息提醒
        messageWarn(userId, title, currentUser,pcUrl,formId) {
            this.$api.meeting.infoRemind({
                pcUrl:pcUrl,//待办列表下添加pcUrl[页面路径]，instId[表单id]字段
                instId:formId,
                userId: userId,//完成并发送选择的人员用户ID（humanID)
                productCode: 'bianH',//项目编号（对应字典（提醒项目分类））
                urgentType: '',//紧急程度（部分功能有）
                infoType: '便函',//类型（模块名称中文（例如 收文，发文））
                infoTitle: title,//业务标题
                infoUser: JSON.parse(localStorage.getItem('userInfo')).humanName//当前操作人名称
            }).then(res => {

            }).catch(err => {
            })
        },
        // 附件排序
        upRow(n) {
            let midObj;
            let attachSort = [];
            let sort1 = this.formdata.attchmentFileInfo[n].sort;
            let sort2 = this.formdata.attchmentFileInfo[n - 1].sort;
            console.log(sort2 + ',' + sort1);

            if (sort1 == sort2) {
                sort1 = Number(n) + 1;
                sort2 = n;
            }
            attachSort.push(
                {
                    id: this.formdata.attchmentFileInfo[n - 1].id,
                    sort: sort1
                },
                {
                    id: this.formdata.attchmentFileInfo[n].id,
                    sort: sort2
                }
            );
            midObj = this.formdata.attchmentFileInfo[n];
            this.formdata.attchmentFileInfo[n] = this.formdata.attchmentFileInfo[
                n - 1
            ];
            this.formdata.attchmentFileInfo[n - 1] = midObj;
            this.$forceUpdate();
            this.$api.setSysConfig
                .sortFile({ attachSort: PJF.util.json2str(attachSort) })
                .then(res => { });
        },
        // 附件排序
        downRow(n) {
            let midObj;
            let attachSort = [];
            let sort1 = this.formdata.attchmentFileInfo[n].sort;
            let sort2 = this.formdata.attchmentFileInfo[n + 1].sort;
            if (sort1 == sort2) {
                sort1 = Number(n) + 1;
                sort2 = Number(n) + 2;
            }
            attachSort.push(
                {
                    id: this.formdata.attchmentFileInfo[n + 1].id,
                    sort: sort1
                },
                {
                    id: this.formdata.attchmentFileInfo[n].id,
                    sort: sort2
                }
            );
            midObj = this.formdata.attchmentFileInfo[n];
            this.formdata.attchmentFileInfo[n] = this.formdata.attchmentFileInfo[
                n + 1
            ];
            this.formdata.attchmentFileInfo[n + 1] = midObj;
            this.$forceUpdate();
            this.$api.setSysConfig
                .sortFile({ attachSort: PJF.util.json2str(attachSort) })
                .then(res => { });
        },
        // 附件删除
        deleteRow(n, id) {
            this.$confirm("是否删除附件?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(res => {
                this.$api.setSysConfig.deleFile(
                    { id: id }
                )
                    .then(res => {
                        if (res) {
                            if (res && res.code == "SUCCESS") {
                                this.$message({
                                    type: "success",
                                    showClose: true,
                                    message: "删除成功"
                                });
                                this.formdata.attchmentFileInfo.splice(n, 1);
                                this.$forceUpdate();
                                this.uploadConfig.filesHas = this.formdata.attchmentFileInfo;
                            } else {
                                this.$message({
                                    type: "error",
                                    showClose: true,
                                    message: "删除失败"
                                });
                            }
                        }
                    });
            });
        },
        //判断是否已打开该页面
        hasOpened(id,params,params2){
        let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
        if(routeId.includes(id)){
           this.$message({
             type: "error",
             offset: 400,
             showClose: true,
             message: "已经打开了该页面!",
             duration: 1500,
           })
           return false;
         }
         this.$intent.goNewPage(this, params,params2);
       },
       //需连系统维护async
       async getNumYearListCommon() {
         let yearList=[];
         await this.$api.numYear.getNumYearList().then(res => {
                
            res?.data.forEach((item,index)=>{
                if(index != 0 && index !=1) {
                    yearList.push({label:item,value:item})
                }else if(index == 0){
                    yearList.push({label:'近两年',value:''})
                }
              })
          })
         return new Promise((resolve, reject) => {    
            resolve(yearList)
          });

      },
    }
}