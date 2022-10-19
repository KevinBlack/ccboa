<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="$router.back()">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <p class="base-title">值班人员信息</p>
    <div class="formdata">
      <fd-form
        style="margin:0 1%"
        @event="eventClick"
        :data="applyformData"
        :columns="applyformCfg"
      ></fd-form>

    </div>
    <org-tree
      v-model="showOrgTree"
      title="选择机构"
      :isSingle="false"
      :orgOrDept="orgOrDept"

      @orgList="getOrgList"
    ></org-tree>

    <tree-person
        v-model="showOrgPer"
        :isSingle="isSingles"
        :humanType="humanType"
        :unitCode="unitCode"
        :unitClass="unitClass"
        @orgList="getperList"
        :selectDept="selectDept"
        :isNeedChild="isNeedChild"
    ></tree-person>

    <!-- <select-person
      :canTab="false"
      :loadingTree="true"
      :hasRadio="hasRadio"
      :offenUse="offenUse"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择人员"
      :subOrgFlag="false"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person> -->
  </div>
</template>

<script>
    import FdForm from "vue-elementui-freedomen/components/form";
    import orgTree from "components/tree/orgTree";
    import treePerson from "components/tree/sysTreePerson";

    export default {
        name: "servereditor",
        components: {
            FdForm,
            orgTree,
            treePerson
        },
        data() {
            return {
                unitClass: 0,
                unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
                humanType: 3,
                isSingles: false,
                showOrgPer: false,
                selectDept:[],
                isNeedChild:"yes",
                orgOrDept:1,

                showOrgTree: false,
                applyformData: {},
                selectOptions: {},
                applyformCfg: [],

                canInput: true,
                canInput2: false,

                checkBox: [], //多选

                // isAdd: JSON.parse(this.$route.query.isAdd),
                treeData: [], //人员树
                dialogType: "next",
                checkIds: [], //选中id列表
                checkData: [], //选中数据
                dialogState: false, //显示隐藏
                singelCheckF: true, // 单选true 多选为false
                hasRadio: false, //是否單選
                dialogTypeNow: "next",
                seletOptionsData: [],
                offenUse: false,
            };
        },
        methods: {
            getOrgList(org) {
                let ids = [];
                let names = [];
                org.map((item) => {
                    ids.push(item.id);
                    names.push(item.unitName);
                });
                // this.$set(this.applyformData, "managerUnitName", names.join(","));
                // this.$set(this.applyformData, "managerUnitId", ids.join(","));
            },

            eventClick(params) {
                switch (params.prop) {
                    case "choiceOrg":
                        this.showOrgTree = true;
                        break;
                    case "choicePer":
                        // 数据返显
                        this.selectDept = [];
                        let tempArr = [];
                        let humanName = [];
                        let humanId = [];
                        if (
                            this.applyformData.humanName &&
                            this.applyformData.humanName.length > 0
                        ) {
                            humanName = this.applyformData.humanName ? this.applyformData.humanName.split(","):[];
                            humanId = this.applyformData.humanId?this.applyformData.humanId.split(","):[];

                            humanId.forEach((item, index) => {
                            let obj = {};
                            obj.deptHumanId = item; 
                            obj.perName = humanName[index];
                            obj.disabled = true;
                            tempArr.push(obj);
                            });
                            this.selectDept = tempArr;
                        }
                        this.showOrgPer = true;
                        break;
                    case "roleId":
                        this.initConfig();
                        break;
                }
            },
            getperList(data) {
            console.log(data,'data');
            // 返现数据
            let humanId = [];
            let humanName = [];
            data &&
                data.map((item) => {
                humanId.push(item.deptHumanId);
                humanName.push(item.perName);
                });
            if (humanId.length > 0) {
                this.$set(this.applyformData, 'humanName', humanName.join(","))
                this.$set(this.applyformData, 'humanId',humanId.join(","))
                return;
            }
            console.log(this.applyformData,"this.applyformData")
            this.applyformData.humanName  = "";
            this.applyformData.humanId = "";
            },
            showCompDialog(data, status, type, params, dtype) {
                console.log("--------->", data);
                this.dialogState = false;
                this.$set(this.applyformData, "humanName", data[0].name);
                this.$set(this.applyformData, "humanId", data[0].idStr + "");
                this.$set(this.applyformData, "telNum", data[0].telMobile + "");
            },
            loadData() {
                this.initConfig();
            },
            savedata() {
                var arr = this.applyformData.dutyStatus;
                arr.indexOf("0") == -1
                    ? (this.applyformData.dutyStatus = "1")
                    : (this.applyformData.dutyStatus = "0");
                this.applyformData.dutyType= this.applyformData.dutyType.join(',')
                if(this.applyformData.dutyType==null||this.applyformData.dutyType==""){
                    this.$message({
                                  type: "error",
                                  message: "请选择排班类别",
                              });
                    return  
                }
                if(this.$route.query.detail){
                    this.$api.secreatary.dutyWork.updateDutyMan(this.applyformData).then(res => {
                        console.log("--------->", res);
                        if (res && res.code=='SUCCESS') {
                              this.$message({
                                  type: "success",
                                  message: res.msg,
                              });
                              this.$router.back()
                        }else{
                            this.$message({
                                type: "failed",
                                message: res.msg,
                            });
                        }
                    })
                }else{
                    this.$api.secreatary.dutyWork.addDutyMan(this.applyformData).then(res => {
                        if (res && res.code=='SUCCESS') {
                            this.$message({
                                type: "success",
                                message: res.msg,
                            });
                            this.$router.back()
                        }else{
                            this.$message({
                                type: "failed",
                                message: res.msg,
                            });
                        }
                    })

                }
               
            },
            initConfig() {
                this.applyformCfg = [
                    {
                        type: "input",
                        prop: "humanName",
                        label: "姓名",
                        span: 11,
                        rule:'must',
                        trigger: ["blur", "change"],
                        message: "请选择人员",
                        disabled: this.canInput,
                    },
                    {
                        type: "button-primary",
                        value: "选择",
                        span: 2,
                        prop: "choicePer",
                        style: { "margin-left": "-58px" },
                        disabled: this.canInput2,
                    },
                    {
                        label: "值班状态",
                        prop: "dutyStatus",
                        type: "check-boxs",
                        span: 11,
                        options: {'0':'暂不排班'}
                    },
                    {
                        label: "电话",
                        prop: "dutyTel",
                        type: "input",
                        span: 11
                    }, 
                    {
                        label: "排班类型",
                        prop: "dutyType",
                        rule:'must',
                        type: "check-boxs",
                        options: {'0':'工作日值班','1':'周末值班','2':'节假日值班','3':'春节值班'},
                        span: 13
                    },
                    {
                        label: "性别",
                        prop: "memberGender",
                        rule:'must',
                        type: "radios",
                        options: {'0':'女','1':'男'},
                        span: 13
                    },
                    {
                        label: "备注",
                        type:"input-area",
                        // autosize: true,
                        prop: "remark",
                        span: 22,
                        style: {width: '100%'},
                        config: {rows: 3}
                    },
                ];
            },
        },
        created() {
            if(this.$route.query.detail){
                this.canInput2=true
            }
            this.loadData()
            console.log(this.$route.query.detail)
            if(this.$route.query.detail){
                this.applyformData= JSON.parse(this.$route.query.detail)
            }
        },
    };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }

  .formdata {
    margin-top: 24px;
  }

  .base-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    color: #3c86f0;
  }
</style>

