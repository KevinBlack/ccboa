<template>
  <div class="useSealRegister">
    <div>
      <el-button type="primary" @click="savedata">保存</el-button>
      <el-button type="primary" @click="closedata">关闭</el-button>
    </div>
    <p class="depart_title">中国建设银行用印机设备登记单</p>
    <div class="content">
      <fd-form :data="formData" :columns="formCfg" @event="btnevent" ref='refUseSealRegister' ></fd-form>
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

<script type="text/ecmascript-6">
import rules from '../../../components/plug/utils/rule.js'
import orgTree from "components/tree/orgTree";
import FdForm from 'vue-elementui-freedomen/components/form'
export default {
  name: 'register',
  components: {
    FdForm,
    orgTree
  },
  data () {
    return {
      type: '',
      title: "选择机构",
      showOrgTree: false,
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: "0",
      isEdit: Boolean,
      formCfg: [],
      serverconfig: {
          labelWidth: '160px'
      },
      formData: {
      },
      
      formCfg: [
        { type: 'input', prop: 'title', label: '设备名称', span: 7, rule: ['must'] },
        { type: 'input', prop: 'deviceType', label: '设备型号', span: 7, rule: ['must'] },
        { type: 'input', prop: 'deviceNumber', label: '设备编号', span: 7, rule: ['must'] },
        { type: 'radios', prop: 'machineType', label: '设备类型', span: 8, rule: ['must'],
        options: [{label:'有存储',value:'stocked'},{label:'无存储',value:'unstocked'}] },
        { type: 'input', prop: 'machineServerIp', label: '服务器地址', span: 13, rule: ['must'] },
        
        { type: 'input', label: '机器编号',  prop: 'machineId', span: 8, rule: ['must'] },
        { type: 'button-primary', prop: '$huoqu', value: '获取机器编号', span: 13, style: { marginLeft: '-40px' }  },
      
        { type: 'input', label: '机器注册码', prop: 'machineRegNum', span: 8, rule: ['must'] },
        { type: 'button-primary', prop: '$huoqu', value: '获取机器注册码', span: 13, style: { marginLeft: '-40px' } },
      
        { type: 'input', label: '使用机构', disabled: true, prop: 'useJg', span: 8, rule: ['must'] },
        { type: 'button-primary', prop: 'jg', value: '选择机构', span: 13, style: { marginLeft: '-40px' }  },
        
        { type: 'input', disabled: true, prop: 'useJg1', label: '上级行机构', span: 21, rule: ['must'] },
        { type: 'input', prop: 'sealNum', label: '印章数量', span: 21, rule: ['intp']},
        { type: 'input', prop: 'allSealName', label: '印章名称', span: 21, },
        { type: 'radios', prop: 'deviceStatus', label: '设备状态', span: 14,
          options: [{label:'启用',value:'using'},{label:'禁用',value:'forbidden'}] },
        { type: 'date', prop: 'useDate', label: '启用日期', span: 7,  },
        { type: 'input-area', prop: 'remark', label: '备注', span: 21, rule: ['textLong200']},
      ]
    }
  },
  methods: {
    getOrgList(org) {
      console.log(org, '22222222')
      this.$set(this.formData, 'useJg', org.unitName)
      this.$set(this.formData, 'jigouId', org.id)
      console.log(this.formData)
      this.$api.adminConfig.getUpperBank({type:'highUnitName', jigouId:org.id}).then(res =>{
        console.log(res,'getUpperBank')
        this.$set(this.formData, 'useJg1', res.data.useJg1)
      })
    },
    loadData () {
      this.$api.adminConfig.viewColumnConfig(
        this.userID,
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: 10
        }).then(res => {

          this.pagination.total = res.total;
          this.tableData = res.data.list;

          let bankOptions = []
          let b = 0
          res.data.bank.map(function (value, index) {
            bankOptions.push(value.bankName)
          })
          this.formCfg = [
            {
              type: 'select', prop: 'bankName', span: 10,
              options: bankOptions.join(",")
            }
          ]
        })
    },
    btnevent (params) {
      console.log(params, '111111111', this.formData)
      if(params.prop == 'jg'){
        this.showOrgTree = true
      }
    },
    
    savedata () {
        if(this.$refs.refUseSealRegister.valid()){
            this.$set(this.formData, 'type', this.type)
            console.log(this.formData,'1111')
            this.$api.sealManage.useSealDevice.addRegister(this.formData).then((res) => {
              this.$message({
                  type: "success",
                  message: "保存成功"
              })
              console.log(res)
              this.$router.push({
                path: "/sealManage/facilityManage/facilityList"
                      
              });
            })
            .catch(() => {
              this.$message({
                  type: "success",
                  message: "保存失败"
              })

                    });
          
        }; 
    },
    closedata () {
      this.$confirm("是否退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {  
          this.$router.push("/sealManage/facilityManage/facilityList");   
        })
        .catch(() => {
        });
      
      
    }
  },
  mounted () {

  },
  created () {
    console.log(this.$route.query)
    this.$api.sealManage.useSealDevice
    .registerDetail(this.$route.query.id).then(res => {
      console.log(res)
      this.$set(this.formData, 'title', res.data.title)
      this.$set(this.formData, 'deviceType',  res.data.deviceType)
      this.$set(this.formData, 'deviceNumber',  res.data.deviceNumber)
      this.$set(this.formData, 'machineType',  res.data.machineType)
      this.$set(this.formData, 'machineServerIp',  res.data.machineServerIp)
      this.$set(this.formData, 'machineId',  res.data.machineId)
      this.$set(this.formData, 'machineRegNum',  res.data.machineRegNum)
      this.$set(this.formData, 'useJg',  res.data.useJg)
      this.$set(this.formData, 'useJg1',  res.data.useJg1)
      this.$set(this.formData, 'sealNum',  res.data.sealNum)
      this.$set(this.formData, 'allSealName',  res.data.allSealName)
      this.$set(this.formData, 'deviceStatus',  res.data.deviceStatus)
      this.$set(this.formData, 'useDate',  res.data.useDate)
      this.$set(this.formData, 'remark',  res.data.remark)
    })
    // this.loadData()
    console.log("0000000", this.$route.query)
  }

}
</script>
<style lang="less">
.useSealRegister {
  .depart_title {
    border-bottom: 2px solid red;
    margin-bottom: 40px;
    font-size: 30px;
    line-height: 75px;
    color: red;
    font-weight: 600;
    text-align: center;
  }
  .content {
    margin-top: 20px;
  }
}
</style>
