/**
* create by zx on 2020/9/7 15:10
* 类注释：
* 备注：
*/
<template>
  <div class="detail">
    <div class="orgInfoTable">
      <div class="orgInfoTitle">合署信息办公表</div>
    </div>
    <el-button @click="$router.back()" style="margin: 0 0 20px 100px" type="primary">返回</el-button>
    <el-button @click="save" type="primary">{{isSave?"保存":"编辑"}}</el-button>
    <fd-form
      style="margin:0 1%"
      ref="fdFrom"
      @event="eventClick"
      :data="applyformData"
      :columns="applyformCfg"
    ></fd-form>

    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'
import orgTree from "components/tree/orgTree";

export default {
  name: "detail",
  components: {
    FdForm,
    orgTree
  },
  props: {},
  data () {
    return {
      title: "选择部门",
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      isSave: false,
      oldDept: "",
      applyformData: {},
      applyformCfg: [],
      showOrgTree: false,
    }
  },
  computed: {},
  methods: {
    save () {
      if (!this.isSave) {
        this.isSave = true
        this.setConfig()
        return
      }
      this.$refs.fdFrom.submit().then(data => {
        debugger
        this.applyformData.id = this.applyformData.id + ""
        if (this.$route.query.detail)
          this.applyformData.oldDept = this.oldDept
        this.$api.setting.organization.belongWorkAdd(this.applyformData, this.$route.query.detail ? 'ADICS2022' : "ADICS2021").then(res => {
          this.$router.back()
        })
      })

    },
    eventClick (params) {
      switch (params.prop) {
        case "selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true
          break
        case "selectDept":
          if (!this.applyformData.orgCode) {
            this.$message({
              message: '请先选择机构',
              type: 'success'
            });
            return
          }
          this.title = "部门";
          this.isSingle = false;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.applyformData.orgCode;
          this.showOrgTree = true
          break
      }
    },
    getOrgList (org) {
        console.log(org)
        debugger
      if (this.orgOrDeptId == "1") {
        this.$set(this.applyformData, 'orgName', org.unitName)
        this.$set(this.applyformData, 'orgCode', org.id)
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id)
          deptName.push(item.unitName)
        })
        this.$set(this.applyformData, 'deptName', deptName.join(","))
        this.$set(this.applyformData, 'deptCode', deptId.join(","))
      }
    },
    setConfig () {
      this.applyformCfg = [
        {
          type: 'input',
          prop: 'id',
          label: '序号',
          span: 24,
          disabled: true,
        },
        {
          type: 'input',
          prop: 'orgName',
          label: '机构名称',
          span: 23,
          disabled: true,
          rule: "must"
        },
        { type: 'button-primary', prop: 'selectOrg', value: '选择', style: { 'margin-left': '-58px' }, span: 1, disabled: !this.isSave, },
        {
          type: 'input',
          prop: 'familyCode',
          label: '合署部门名称',
          config: { maxlength: '50' },
          span: 24,
          disabled: !this.isSave,
          rule: "must"
        },
        {
          type: 'input-area',
          prop: 'deptName',
          label: '合署部门',
          span: 23,
          disabled: true,
          rule: "must",
          config: { rows: 3 }
        },
        { type: 'button-primary', prop: 'selectDept', value: '选择', style: { 'margin-left': '-58px' }, span: 1, disabled: !this.isSave, },
        {
          type: 'input-area',
          prop: 'remark',
          label: '备注',
          span: 24,
          disabled: !this.isSave,
          placeholder: "最多可以输入500字",
          config: { rows: 3, maxlength: '500' }
        },
      ]
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
    if (this.$route.query.detail) {
      this.applyformData = JSON.parse(this.$route.query.detail)
      this.oldDept = deepClone(this.applyformData.deptCode)
      this.setConfig()
    } else {
      this.isSave = true
      this.$api.setting.organization.belongWorkAdd({}, 'ADICS2021').then(res => {
        this.$set(this.applyformData, 'id', res.data.id)
        this.setConfig()
      })
    }

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.orgInfoTitle {
  margin-bottom: 40px;
  font-size: 30px;

  line-height: 75px;
  color: #409eff;
  font-weight: 600;
  text-align: center;
}

.orgInfoTableBody {
  margin-left: 8%;
}
</style>
