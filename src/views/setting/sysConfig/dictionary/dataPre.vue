<template>
  <div class="content">
    <p class="base-title">数据维护</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata" v-if="!isSave">保存</el-button>
      <el-button type="primary" @click="editordata" v-else>编辑</el-button>
    </div>
    <div class="formdata">
      <fd-form
        ref="fdForm"
        style="margin:0 1%"
        :data="formData"
        :columns="formCfg"
        :config="serverconfig"
        @event="btnevent"
      ></fd-form>
    </div>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'

    export default {
        name: 'servereditor',
        components: {
            FdForm
        },
        data() {
            return {
                isSave: true,
                idEdit:false,
                rowData: {},
                resData:[],
                optionsData: [],
                formData: {},
                formCfg: [],
                serverconfig: {
                    labelWidth: '160px'
                },
                levelOption:[],
                isCodeNameData:'',
            }
        },
        methods: {
            initData() {
                this.formCfg = [
                    
                    {
                        type: this.isSave||this.idEdit? 'input' : 'select',
                        prop: 'isCodeName',
                        rule: "must",
                        label: '类别名称',
                        span: 22,
                        options: this.optionsData.join(","),
                        disabled: this.idEdit?true:false,
                        style: {width: '100%'}
                    },
                    // {
                    //     type:this.isSave?'input':'select',prop:' unitLevelName',label:'机构类型级别',
                    //     rule: "must",
                    //     disabled:this.isSave,span: 22,style:{width:'100%'},
                    //     options:this.levelOption.join(","),
                    // },
                    {type: 'input', prop: 'dicCode', rule: "must", label: '类别编码', disabled: this.idEdit?true:false,span: 22},
                    {type: 'input', prop: 'codeName', label: '字典名称', disabled: this.isSave, rule: "must",span: 22},
                    {type: 'input', prop: 'operator', label: '创建人', disabled: true},
                    {type: 'input', prop: 'dicStartTime', label: '创建时间', disabled: true},
                    {type: 'input', prop: 'dicEndTime', label: '最后创建时间', disabled: true},
                    {type: 'input-area', prop: 'remark', label: '备注', disabled: this.isSave, config: {rows: 4}},
                ]
            },
            initDataS() {
                this.formCfg = [
                    {
                        type:this.isSave?'input':'select',prop:'unitTypeName',label:'机构类型级别',
                        rule: "must",
                        disabled:this.isSave,span: 22,style:{width:'100%'},
                        options:this.levelOption.join(","),
                    },
                    {
                        type: this.isSave||this.idEdit? 'input' : 'select',
                        prop: 'isCodeName',
                        rule: "must",
                        label: '类别名称',
                        span: 22,
                        options: this.optionsData.join(","),
                        disabled: this.idEdit?true:false,
                        style: {width: '100%'}
                    },
                    {type: 'input', prop: 'dicCode', rule:'must', label: '类别编码', disabled: this.idEdit?true:false,span: 22},
                    {type: 'input', prop: 'codeName',  rule:'must',label: '字典名称', disabled: this.isSave,span: 22},
                    {type: 'input', prop: 'operator', label: '创建人', disabled: true},
                    {type: 'input', prop: 'dicStartTime', label: '创建时间', disabled: true},
                    {type: 'input', prop: 'dicEndTime', label: '最后创建时间', disabled: true},
                    {type: 'input-area', prop: 'remark', label: '备注', disabled: this.isSave, config: {rows: 4}},
                ]
            },
            loadData() {
                this.$api.setSysConfig.dictDataCreate(
                    {}
                ).then(res => {
                    this.formData = res.data.two
                    res.data.one && res.data.one.map((item) => {
                        if (item) {
                            this.optionsData.push(item.isCodeName)
                        }
                    })
                    if(this.isCodeNameData=='部门机构类型字典分类'){
                        this.initDataS()
                    }else{
                        this.initData()
                    }
                })
            },
            closedata() {
                this.$router.go(-1)
            },
            savedata() {
                this.resData&&this.resData.map(item=>{
                    if(item.unitTypeName ==this.formData.unitTypeName){
                        this.formData.LevelId=item.unitLevelName
                        console.log("this.formData.LevelId",this.formData.LevelId)
                    }
                })
                if (this.rowData && this.rowData.dicId) {
                    this.$api.setSysConfig.dictDataAlter(
                        this.formData
                    ).then(res => {
                        if (res.code == "SUCCESS") {
                            this.$router.push('/setting/sysConfig/dictionaryPre')
                        }
                    })
                } else {
                    this.$refs.fdForm.submit().then(data => {
                        this.$api.setSysConfig.dictDataCreate(
                            this.formData
                        ).then(res => {
                            if (res.code == "SUCCESS") {
                                this.$router.push('/setting/sysConfig/dictionaryPre')
                            }
                        })
                    })
                }
            },
            editordata() {
               
                this.isSave = false
                if(this.formData.isCodeName=='部门机构类型字典分类'){
                    this.initDataS()
                    this.queryLevel()
                }else{
                    this.initData()
                }
            },
            btnevent(params) {
                 switch (params.prop){
                case "isCodeName":
                if(this.formData.isCodeName=="部门机构类型字典分类"){
                            this.queryLevel()
                            this.initDataS()
                        }else{
                            this.initData()
                        }
                break;
                }
            },
            //机构级别
            queryLevel(){
                this.$api.setSysConfig.queryLevelOrg(
                    {}
                ).then(res=>{
                    this.resData=deepClone(res.data)
                    let that=this
                    this.resData&&this.resData.map(item=>{
                        that.levelOption.push(item.unitTypeName)
                    })
                    this.initDataS()
                })
            }
        },
        created() {

            if (this.$route.query.rowData&&this.$route.query.rowData.dicId) {
                this.isSave = true
                this.idEdit=true
                this.rowData = this.$route.query.rowData
                this.formData = this.rowData
                if(this.$route.query.rowData.isCodeName=='部门机构类型字典分类'){
                    this.initDataS()
                }else{
                    this.initData()
                }

            } else {
                this.isCodeNameData=this.$route.query.seleData.isCodeName
                this.loadData()
                this.idEdit=false
                this.isSave = false
                if(this.isCodeNameData=="部门机构类型字典分类"){
                    console.log("00000000",this.$route.query.seleData.isCodeName)
                    this.queryLevel()
                    this.initDataS()
                }else{
                    this.initData()
                }
            }
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
      width: 100%;
      text-align: center;
      font-size: 32px;
      color: #3c86f0;
    }
  }
</style>
