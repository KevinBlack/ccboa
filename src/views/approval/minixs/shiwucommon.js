export default {
  data() {
    return {}
  },
  methods: {
    //引入跳转依据
    YRJump(item) {
      console.log("--------->item", item);
      let that = this;
      let currentCheck = {};
      this.YRcheck &&
        this.YRcheck.map(item => {
          if (item.orderNo == that.YRcurrentBtn) {
            currentCheck = item;
          }
        });
      switch (item.dataType) {
        case "4":
          console.log("跳转便函", item);
          // this.$intent.goNewPage(this, {
          //   name: "yrBianhan",
          //   query: { id: item.dataId }
          // });
          this.$intent.goNewPage(this, { name: 'proceHas', query: { type: 2, id: item.dataId } })
          break;
        case "2":
          console.log("跳转发文", currentCheck);
          this.$api.setSysConfig
            .getTextemList({
              id: item.dataId
            })
            .then(res => {
              this.$nextTick(() => {
                this.$set(item, "file", res.data);
              });
            });
          this.isdialogYRDeal = true;
          this.YRDeal = item;
          break;
        case "1":
          console.log("跳转收文", currentCheck);
          this.$api.setSysConfig
            .getTextemList({
              id: item.dataId
            })
            .then(res => {
              this.$nextTick(() => {
                this.$set(item, "file", res.data);
              });
            });
          this.isdialogYRDeal = true;
          this.YRDeal = item;
          break;
        case "3":
          console.log("跳转签报");
          if (!!item.zrType) {
            if (item.zrType == "非跨行") {
              this.handleOpenPage("/signquoteOverFkhDispatch", item.dataId, "", item.draftDepartmentId);
            } else if (item.zrType == "跨行请示") {
              this.handleOpenPage("/signquoteOverKhQshDispatch", item.dataId, "", item.draftDepartmentId);
            } else if (item.zrType == "跨行审批") {
              this.handleOpenPage("/signquoteOverKhSphDispatch", item.dataId, "", item.draftDepartmentId);
            } else if (item.zrType == "实物") {
              this.handleOpenPage("/signquoteOverEntityDispatch", item.dataId, "", item.draftDepartmentId);
            }
          } else {
            this.$api.setSysConfig
              .getTextemList({
                id: item.dataId
              })
              .then(res => {
                this.$nextTick(() => {
                  this.$set(item, "file", res.data);
                });
              });
            this.isdialogYRDeal = true;
            this.YRDeal = item;
          }
          // this.$intent.goNewPage(this, {
          //   name: "yrQianbao",
          //   query: { id: item.dataId, readFlag: 0 }
          // });
          // let that = this;
          // let obj = {
          //   function: "importBasis",
          //   multiTenancyId: "CN002",
          //   documentCode:  item.orderNo
          // };
          // this.$post
          //   .postData("importBasis", JSON.stringify(obj), "A0846C005")
          //   .then(res => {
          //     console.log("res", res);
          //     if (!res.data) {
          //       this.$message({
          //         type: "warning",
          //         message: "没有找到相应文档"
          //       });
          //     } else {
          //       if (res.data.orderType == "非跨行") {
          //         this.handleOpenPage("/signquoteOverFkhDispatch", res.data.id,"",res.data.draftDepartmentId);
          //       } else if (res.data.orderType == "跨行请示") {
          //         this.handleOpenPage("/signquoteOverKhQshDispatch", res.data.id,"",res.data.draftDepartmentId);
          //       } else if (res.data.orderType == "跨行审批") {
          //         this.handleOpenPage("/signquoteOverKhSphDispatch", res.data.id,"",res.data.draftDepartmentId);
          //       } else if (res.data.orderType == "实物") {
          //         this.handleOpenPage("/signquoteOverEntityDispatch", res.data.id,"",res.data.draftDepartmentId);
          //       }
          //     }
          //   });

          break;
      }
    },
    handleOpenPage(path, id, readType, draftDepartmentId) {
      let a = this.bankImport == '4' ? 'type' : 'readFlag'
      
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          a: readType,
          draftDepartmentId: draftDepartmentId,
          From: "Import"
        }
      });
      window.open(routeData.href, "_blank");
    },
    //判断是否已打开该页面
    hasOpened(id,params){
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
               this.$intent.goNewPage(this, params);
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
