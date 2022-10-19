/**
* create by zx on 2020-6-29 13:01
* 类注释：编辑人员详细信息
* 备注：
*/
<template>
  <div class="editPerson">
    <div class="organizationConfig">
      <div class="handleButton">
        <el-button type="primary" @click="toEdit()" v-if="!isAdd">编辑</el-button>
        <el-button type="primary" @click="saveOrgInfo()" v-if="isAdd">保存</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        <el-button type="danger" @click="toDelete">注销</el-button>
      </div>

      <div class="orgInfoTable">
        <div class="orgInfoTitle">用户基本信息表</div>
        <div class="orgInfoTableBody">
          <fd-form style="margin:0 1%" ref="fdFrom" :data="indexformData" :columns="indexformCfg"></fd-form>
          <fd-form v-if="showSecretary" style="margin:0 1%" ref="fdFrom" :data="indexformData" :columns="indexformCfg1" @event="eventClick"></fd-form>
        </div>
      </div>
    </div>
    <select-person :canTab="false" :loadingTree="true" :hasRadio="hasRadio" :offenUse="offenUse" :treeData="treeData" :dialogType="dialogType" :seletOptionsData="seletOptionsData" :dialogTypeNow="dialogTypeNow" dialogTit="选择人员" :checkIds="checkIds" :checkData="checkData" :subOrgFlag="false" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog"></select-person>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'
import selectPerson from 'components/tree/tree-fawen'

export default {
  name: 'editPerson',
  components: {
    FdForm,
    selectPerson,
  },
  props: {},
  data() {
    return {
      b: [],
      canInput: true,
      isAdd: JSON.parse(this.$route.query.isAdd),
      indexformCfg: [],
      indexformData: {},
      indexformCfg1: [
        {
          label: '秘书',
          prop: 'secretaryName',
          type: 'input',
          span: 12,
          disabled: true,
        },
        {
          type: 'button-primary',
          value: '选择',
          prop: 'departmentBtn',
          span: 2,
          style: { 'margin-left': '-50px' },
          disabled: this.canInput,
        },
      ],
      checkboxs: {},
      radios: {},

      treeData: [], //人员树
      dialogType: 'next',
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: 'next',
      seletOptionsData: [],
      offenUse: false,
    }
  },
  computed: {
    showSecretary() {
      return this.indexformData.humanPost && this.indexformData.humanPost.indexOf('337') != -1
    },
  },
  methods: {
      toDelete(){
          this.$confirm("是否确定注销当前数据?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
          })
              .then(() => {
                  this.$api.setting.person.sendPerson({humanId:this.indexformData.humanId,validFlag:0})
                      .then((res) => {
                          this.$message({
                              type:'success',
                              message:'注销成功'
                          })
                          this.$router.back();
                      });
              })
              .catch(() => {
                  this.$message({
                      type:'info',
                      message:'取消注销'
                  })
              });

      },
    eventClick(params) {
      if (params.prop == 'departmentBtn') {
        this.dialogState = true
      }
    },
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false
      let person = []
      let names = []
      data.map((item) => {
        person.push(item.id)
        names.push(item.name)
      })
      this.$set(this.indexformData, 'secretaryName', names.join(','))
      this.$set(this.indexformData, 'secretaryId', person.join(','))
    },
    saveOrgInfo() {
      this.indexformData.humanPost = this.indexformData.humanPost.join(',')
      this.indexformData.humanSpe = this.indexformData.humanSpe.join(',')
      this.indexformData.telMobile =
        this.indexformData.telMobile0 + ',' + this.indexformData.telMobile0
      this.$api.setting.person.sendPerson(this.indexformData).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功',
        })
          this.$router.go(-1)
        // this.isAdd = !this.isAdd
      })
    },
    toEdit() {
      ;(this.canInput = false), (this.isAdd = !this.isAdd), this.init()
    },
    loadData() {
      this.$api.setting.person.getPersonInfo({ codeType: 'role_type' }).then((res) => {
        let obj = {}
        res.data.forEach((item) => {
          obj[item.dicId] = item.codeName
        })
        this.checkboxs = obj
        this.$api.setting.person.getPersonInfo({ codeType: 'human_speAuth' }).then((res) => {
          let radio = {}
          res.data.forEach((item) => {
            radio[item.dicId] = item.codeName
          })
          this.radios = radio
          this.loadPersonDetail()
        })
      })
    },
    loadPersonDetail() {
      this.$api.setting.organization
        .getPersonDetail({ humanId: JSON.parse(this.$route.query.detail).humanId })
        .then((res) => {
          let tel = res.data.telMobile.split(',')
          res.data.telMobile1 = tel[1]
          res.data.telMobile0 = tel[0]
          this.indexformData = res.data
          this.init()
        })
    },
    init() {
      this.indexformCfg = [
        {
          type: 'input',
          prop: 'humanName',
          label: '姓名',
          span: 12,
          disabled: true,
        },

        {
          type: 'input',
          prop: 'humanName',
          label: '用户全称',
          span: 12,
          disabled: true,
        },
        {
          type: 'input',
          prop: 'account',
          label: '绑定UASS账号',
          span: 12,
            rule: "must",
          disabled: this.canInput,
        },
        {
          label: '用户类型',
          prop: 'humanType',
          type: 'radios',
          disabled: true,
          span: 12,
          options: { 1: '个人用户', 2: '公用用户' },
        },
          {
              label: '所属行名',
              prop: 'humanOrgName',
              type: 'input',
              span: 12,
              disabled: true,
          },
        {
          label: '所属部门',
          prop: 'humanDeptName',
          type: 'input',
          span: 12,
          disabled: true,
        },

        {
          label: '上级部门名称',
          prop: 'highDeptName',
          type: 'input',
          span: 12,
          disabled: true,
        },
        {
          label: '所属管理行名',
          prop: 'manageOrgName',
          type: 'input',
          span: 12,
          disabled: true,
        },
        {
          label: '所属岗位',
          prop: 'humanPost',
          type: 'check-boxs',
          span: 24,
          disabled: this.canInput,
          options: this.checkboxs,
        },
        {
          label: '特殊授权',
          prop: 'humanSpe',
          type: 'check-boxs',
          span: 24,
          disabled: this.canInput,
          options: this.radios,
        },
        {
          label: 'VIP用户',
          prop: 'ifVip',
          type: 'radios',
          disabled: this.canInput,
          options: { 0: '否', 1: 'vip' },
        },
        {
          label: '职务',
          prop: 'humanJob',
          span: 12,
          disabled: this.canInput,
          type: 'input',
        },
        {
          label: '微信号',
          prop: 'chatNum',
          type: 'input',
          span: 12,
          disabled: this.canInput,
        },
        {
          label: '手机',
          prop: 'telMobile1',
          type: 'input',
          span: 12,
          disabled: this.canInput,
        },
        {
          label: '办公室电话',
          prop: 'telMobile0',
          type: 'input',
          span: 12,
          disabled: this.canInput,
        },
      ]
    },
  },
  activated() {},
  mounted() {},
  created() {
    getUserIP((ip) => {
      console.log(ip)
    })
    // getUserIP(function(ip){
    //     console.log("Got IP! :" + ip);
    // });
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.additionStyle[data-v-4743acd6] {
  margin-left: 0px;
}

.el-input--medium {
  font-size: 11px;
}

.organizationConfig {
  .orgInfoTable {
    padding: 21px 70px;

    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 84px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }

    h3 {
      margin-left: 113px;
      font-size: 17px;
      line-height: 57px;
      color: #3b85f0;
    }

    //   .orgInfoTableBody {
    //     margin-left: 10%;
    //   }

    .explanation {
      margin-left: 260px;
      margin-top: 28px;
      font-size: 14px;
      line-height: 22px;
      color: #ff3b4d;
    }
  }
}
</style>
