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
            this.$intent.goNewPage(this, {name: 'proceHas', query: {type:2, id: item.id}}) 
            break;
          case "2":
            console.log("跳转发文", currentCheck);
            this.$api.setSysConfig
              .getTextemList({
                id: item.id
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
                id: item.id
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
            console.log("跳转签报",item)
            console.log("跳转签报");
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
                  if (item.orderType == "非跨行") {
                    this.handleOpenPage("/signquoteOverFkhDispatch", item.id,"",item.draftDepartmentId);
                  } else if (item.orderType == "跨行请示") {
                    this.handleOpenPage("/signquoteOverKhQshDispatch", item.id,"",item.draftDepartmentId);
                  } else if (item.orderType == "跨行审批") {
                    this.handleOpenPage("/signquoteOverKhSphDispatch", item.id,"",item.draftDepartmentId);
                  } else if (item.orderType == "实物") {
                    this.handleOpenPage("/signquoteOverEntityDispatch", item.id,"",item.draftDepartmentId);
                  }
              //   }
              // });

            break;
        }
      },
      handleOpenPage(path, id, readType,draftDepartmentId) {
        let a = this.bankImport == '4' ? 'type' : 'readFlag'
        const routeData = this.$router.resolve({
          path: path,
          query: {
            id: id,
            a : readType,
            draftDepartmentId:draftDepartmentId,
            From: "Import"
          }
        });
        window.open(routeData.href, "_blank");
      },
    }
  }
  