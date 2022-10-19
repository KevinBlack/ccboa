import dateFormate from "@/util/filters.js";
export default {
  data() {
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
        wfeUnitId: '',
        unitCodes: ""
      },
      treeData: [],
      dialogState:false,
      
      draftDepartmentName:"",
      bankOptions:[],
      down:false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      draftRangeTime:[],
      sendRangeTime:[],
      yearList: [],
      tableLoading:false,
      sortDate:[{ prot: 'date', order: 'descnding'}],
      tableData: [],
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10,
      },
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      }
    };
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
    // 分级维护初始化
    // handleScaleMaintain() {
      // this.$api.setting.organization
      // .getTree({
      //   unitClass:1,
      //   unitCode: "1",
      // })
      // .then((res) => {
      //   this.unitName = res.data[0].unitName||'';
      //   this.unitId = res.data[0].unitCode||'';
      //   this.getTableList();
      // })
    // },
    
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
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = this.ruleForm.draftDepartmentId = result.id;
    },
    handleCurrentChange(val) {
      this.bank_select.page = this.pagination.page = val;
      this.tableData = [];
      this.getTableList();
    },
    handleSizeChange(val) {
      this.bank_select.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_select.page = 1;
      this.tableData = [];
      this.getTableList();
    },
    //搜索条件展开/折叠
    arrow(){
      this.down = !this.down;
    },
    draftRangeTimeChange(){
      if(!this.draftRangeTime||this.draftRangeTime=="null"||this.draftRangeTime=="undefined"){
        this.ruleForm.draftTimeStart = "";
        this.ruleForm.draftTimeEnd = "";
        return false;
      }
      this.ruleForm.draftTimeStart = dateFormate.date(Date.parse(new Date(this.draftRangeTime[0]))); 
      this.ruleForm.draftTimeEnd = dateFormate.date(Date.parse(new Date(this.draftRangeTime[1]))); 
    },
    sendRangeTimeChange(){
      if(!this.sendRangeTime||this.sendRangeTime=="null"||this.sendRangeTime=="undefined"){
        this.ruleForm.sendTimeStart = "";
        this.ruleForm.sendTimeEnd = "";
        return false;
      }
      this.ruleForm.sendTimeStart = dateFormate.date(Date.parse(new Date(this.sendRangeTime[0]))); 
      this.ruleForm.sendTimeEnd = dateFormate.date(Date.parse(new Date(this.sendRangeTime[1])));
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      this.$router.push({
        query: {
          choseYear: val
        }
      })
      if (val=="") {
        this.defaultYear();
      } else {
        this.ruleForm.documentNo = '〔'+ val +'〕'
      }
    },
    collectDown(val,id, unitId) {
      this.$post
        .postData(
          "collectionForHtml",
          JSON.stringify({
            function: "collectionForHtml",
            id: id,
            flag: val,
            unitId
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.success) {
            this.downFile(res.data)
          } else {
            this.$message({
              type: "error",
              offset: 100,
              showClose: true,
              message: res.message,
              duation: 1500
            });
            return;
          }
        })
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
               downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 1500
              });
            }
          }
        });
    }
  },
  created() {
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    // this.handleScaleMaintain();
    this.bankOptions = JSON.parse(localStorage.getItem("unitInfo"))||[];
  }
}