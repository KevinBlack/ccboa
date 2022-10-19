<template>
  <div class="content">
    <p class="base-title">落款部门过滤</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="editorData" v-else>编辑</el-button>

    </div>
    <div class="formdata">

      <p class="pay-tid">说明：以下部门在用户签署意见时，落款处不显示部门名称</p>
      <fd-form
        style="margin:0 1%"
        :data="applyformData  "
        :columns="applyformCfg"
        :config="serverconfig"
        @event="eventClick"
      ></fd-form>
    </div>
    <org-tree v-model="showOrgTree"
              :title="title"
              :isSingle="isSingle"
              :orgOrDept="orgOrDept"
              :orgOrDeptId="orgOrDeptId"
              @orgList="getOrgList">
    </org-tree>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    import orgTree from "components/tree/orgTree";
    export default {
        name: 'servereditor',
        components: {
            FdForm,
            orgTree
        },
        data () {
            return {
                id:'',
                optionList:[],
                title: "选择部门",
                showOrgTree: false,
                isSingle: false,
                orgOrDept: 1,
                orgOrDeptId: "0",
                isSave:true,
                applyformData: {},
                applyformCfg: [],
                serverconfig: {
                    labelWidth: '160px'
                }
            }
        },
        created() {
            if(this.$route.query.rowData&&this.$route.query.rowData.id){
                this.id=this.$route.query.rowData.id
                this.isSave=true
                this.applyformData=this.$route.query.rowData
            }else{
                this.isSave=false
            }
            this.initData()
        },
        methods: {
            initData(){
                this.applyformCfg= [
                    { type:'input', prop: 'curBank', label: '机构名称', span: 22, style: { width: '100%' } ,disabled:true},
                    {type: 'button-primary', prop: 'selectOrg', value: '选择', style: {'margin-left': '-58px'}, span: 1,disabled:this.isSave},
                    { type: 'input', prop: 'deptName', label: '对应部门', span: 22, style: { width: '100%' } ,disabled:true},
                    {type: 'button-primary', prop: 'selectDepar', value: '选择', style: {'margin-left': '-58px'}, span: 1,disabled:this.isSave},
                ]
            },
            selectOption(){
                this.$api.setSysConfig.selectData(
                    {},
                ).then(res => {
                    res.data.map(item=>{
                        this.optionList.push(item.mtTmpOne)
                    })
                    this.initData()
                })
            },

            loadData(){
                this.$api.setSysConfig.dealKeyWord(
                    {id:this.id},
                ).then(res => {
                    this.applyformData.curBank=res.data.curBank
                    this.applyformData.topicWord=res.data.topicWord
                    this.applyformData.deptName=res.data.deptName
                    this.initData()
                })
            },
            closedata() {
                this.$confirm("是否保存并退出当前页面?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.savedata();
                    })
                    .catch(() => {
                        this.$router.push('/setting/sysConfig/payfiflter')
                    });
            },
            savedata() {
                if(this.id){
                    this.$api.setSysConfig.alterPayFiflter(
                        this.applyformData
                    ).then(res => {
                        if(res.code=='SUCCESS'){
                            this.$message({
                                type:'success',
                                message:'修改成功'
                            })
                            this.$router.push('/setting/sysConfig/payfiflter')
                        }
                        // this.applyformData.curBank=res.data.curBank
                        // this.applyformData.deptName=res.data.deptName

                    })
                }else{
                    this.$api.setSysConfig.createPayFiflter(
                        this.applyformData
                    ).then(res => {
                        if(res.code=='SUCCESS'){
                            this.$message({
                                type:'success',
                                message:'保存成功'
                            })
                            this.$router.push('/setting/sysConfig/payfiflter')
                        }
                    })
                }


            },
            editorData(){
                this.isSave=false
                this.initData()
            },
            eventClick(params) {
                switch (params.prop) {
                    case "selectOrg":
                        this.title = "选择机构";
                        this.isSingle = true;
                        this.orgOrDept = 1;
                        this.orgOrDeptId = "0";
                        this.showOrgTree = true
                        break
                    case "selectDepar":
                        if (!this.applyformData.curBankId) {
                            this.$message({
                                message: '请先选择机构',
                                type: 'success'
                            });
                            return
                        }
                        this.title = "部门";
                        this.isSingle = false;
                        this.orgOrDept = 0;
                        this.orgOrDeptId = this.applyformData.curBankId;
                        this.showOrgTree = true
                        break
                }
            },
            getOrgList(org) {
                if (this.orgOrDeptId == "0") {
                    this.$set(this.applyformData, 'curBank', org.unitName)
                    this.$set(this.applyformData, 'curBankId', org.id)
                } else {
                    let deptId = [];
                    let deptName = [];
                    org.map(item => {
                        deptId.push(item.id)
                        deptName.push(item.unitName)
                    })
                    // this.applyformData.deptFrameId=deptId.join(",")
                    this.$set(this.applyformData, 'deptName', deptName.join(","))
                    this.$set(this.applyformData, 'deptFrameId', deptId.join(","))
                }
            },
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    .formdata {
      margin-top: 24px;
    }
    .base-title {
      width:100%;
      text-align:center;
      color: #3c86f0;
      font-size:30px;
    }
  }
  .pay-tid {
    width: 100%;
    text-align: center;
    margin: 20px 0px;
  }
</style>
