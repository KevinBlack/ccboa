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
      }
    },
    methods: {
      // 选择机构
      selectOrg(org) {
        this.unitName = org.unitName;
        this.uploadConfig.unitId= this.unitId = org.id;
        console.log(org, this.unitName , this.unitId);
      },
      // 判断登陆人是否业务管理员或系统管理员
      addDrafOrgNm() {
        let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
        this.draforgnmPeople = manger.filter(item => {
          return (
            item.codeType === "manager_type" && item.dicCode === "sys_manager"
          );
        });
        if (this.draforgnmPeople.length !== 0) {
          this.unitName = JSON.parse(
            localStorage.getItem("userInfo")
          ).shortUnitName;
          this.unitId = JSON.parse(
            localStorage.getItem("userInfo")
          ).unitId;
          this.addDis = false;
          this.identity = true;
        } else {
          this.unitName = JSON.parse(
            localStorage.getItem("userInfo")
          ).shortUnitName;
          this.unitId = JSON.parse(
            localStorage.getItem("userInfo")
          ).unitId;
          this.addDis = true;
          this.identity = false;
        }
        console.log(this.unitName,this.unitId)
      }
    }
  }