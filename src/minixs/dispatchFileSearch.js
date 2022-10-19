export default {
  data () {
    return {
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      treeParams: {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      },
      treeData: [],
      dialogState:false,

      tableData: [],
      rangeTime: '',
      params:{
        function: this.compName,
        dateStart:"",
        dateEnd:"",
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10
      },
      excelTime:""
    }
  },
  methods: {
    // 选择机构
    // selectOrg(org) {
    //   this.unitName = org.unitName;
    //   this.unitId = org.id;
    //   console.log(org, this.unitName , this.unitId);
    // },
    // 判断登陆人是否业务管理员或系统管理员
    // addDrafOrgNm() {
    //   let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
    //   this.draforgnmPeople = manger.filter(item => {
    //     return (
    //       item.codeType === "manager_type" && item.dicCode === "sys_manager"
    //     );
    //   });
    //   if (this.draforgnmPeople.length !== 0) {
    //     this.unitName = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).shortUnitName;
    //     this.unitId = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).unitId;
    //     this.addDis = false;
    //     this.identity = true;
    //   } else {
    //     this.unitName = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).shortUnitName;
    //     this.unitId = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).unitId;
    //     this.addDis = true;
    //     this.identity = false;
    //   }
    //   console.log(this.unitName,this.unitId)
    // },
    summation(param){
      let {columns,data} = param;
      let sums =[];
      columns.forEach((column,index)=>{
        if(index==0){
          sums[index]='合计'
        }else if(index==1){
          sums[index]=''
        }else if(index<4){
          sums[index] = 0;
          const values = data.map(item=>{
            let num = Number(item[column.property]);
            if(!isNaN(num)){
              return num
            }else{
              return 0
            }
          });
          values.map(item=>{
            sums[index] += item;
          })
        }
      })
      let decimals = sums[3]/(sums[2]?sums[2]:100);
      if(!isNaN(decimals)){
        sums[4]= (decimals*100).toFixed(2) +"%"
      }else{
        sums[4] ="0%"
      }
      return sums

    },
    //主办部门选择按钮
    selectDepartment() {
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
      this.treeParams.wfeUnitId = userInfo.unitId
      this.$refs.dialog.openDialog();
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.treeParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          this.treeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset(){
      // this.$api.setting.organization
      // .getTree({
      //   unitClass:1,
      //   unitCode: "1",
      // })
      // .then((res) => {
      //   this.unitName = res.data[0].unitName||'';
      //   this.unitId = res.data[0].unitCode||'';
      // })
      this.pagination = Object.assign({},{
        pagNum: 1,
        total: 0,
        limit:10
      });
      this.rangeTime = "";
      this.params = Object.assign({},{
        dateStart:"",
        dateEnd:"",
        unitId:JSON.parse(localStorage.getItem("userInfo")).unitId
      })
    },
    getExcelTime(){
      let start = this.params.dateStart.replace("-","年")+"月";
      let end = this.params.dateEnd.replace("-","年")+"月";
      let excelTime = start+"-"+end;
      return excelTime;
    },
    handlerSearch () {
      if(!this.params.dateStart){
        this.$message({
          message:"请先选择统计日期",
          type:"warning",
          duration:2*1000
        })
        return false;
      }
      this.params.unitName = this.unitName
      this.params.unitId = this.unitId
      this.excelTime = this.getExcelTime();
      this.$post.postData(this.compName, JSON.stringify(this.params),this.$businessCode.fawgl).then((res) => {
        if(res.success){
          this.tableData = res.data;
        }else{
          this.$message.closeAll();
          this.$message({
            message:"请求出错了",
            duration:2000,
            type:"error"
          })
        }
      }).catch(err=>{
        this.$message.closeAll();
        this.$message({
          message:"请求出错了",
          duration:2000,
          type:"error"
        })
      })
    },
    timeChange(rangeTime) {
      if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
        this.params.dateStart = "";
        this.params.dateEnd = "";
        return false;
      }
      this.params.dateStart = rangeTime[0]; 
      this.params.dateEnd = rangeTime[1];
    },
    handleOnSizeChange (val) {
      this.pagination.pagNum = 1;
      this.pagination.limit = val;
      this.pagination.total = 0;
      this.handlerSearch();
    },
    handleOnCurrentChange (val) {
      this.pagination.pagNum = val;
      this.pagination.total = 0;
      this.handlerSearch();
    },
    exportExc(){
      exportTable.exportExcel("办结发文数量统计表（按类型统计）",".el-table");
    }
  },
  created(){
    // this.$api.setting.organization
    // .getTree({
    //   unitClass:1,
    //   unitCode: "1",
    // })
    // .then((res) => {
    //   this.unitName = res.data[0].unitName||'';
    //   this.unitId = res.data[0].unitCode||'';
    // })
  }
}