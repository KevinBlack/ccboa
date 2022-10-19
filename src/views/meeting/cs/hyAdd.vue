<!--
 * @Author: your name
 * @Date: 2020-08-25 16:35:54
 * @LastEditTime: 2020-10-29 16:15:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\cs\hyAdd.vue
--> 
/**
* 类注释：
* 备注：参数维护/会议系统配置/新建
*/
<template>
  <div class="hyAdd">
    <div class="headerClick">
      <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}</el-button>
      </div>
    </div>
    <div class="hyHeader">
      <div class="title-text">会议系统配置</div>
    </div>
    <el-form :model="formData" label-width="120px" style="padding:0 20%">
      <el-row>
        <el-col>
          <el-form-item label="机构名称">
            <!-- <el-select v-model="formData.scUnit">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>-->
            <select-org-or-dept @select="selectOrg" :orgOrDept="1" :orgOrDeptId="'0'">
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择"
                v-model="formData.scUnit"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="可填写签发意见的岗位">
            <el-input v-model="formData.mainSend" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="choose" type="primary" style="float:right">选择</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 可填写签发意见的岗位 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择可填写签发意见的岗位"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept"
import cyPersonList from "../../bianhan/components/cyPersonList";
export default {
  name: "hyAdd",
  components: {
    cyPersonList,
    selectOrgOrDept
  },
  data () {
    return {
      // 选机构
      showTree: false,
      buttonList: ["关闭", "保存"],
      formData: {
        scUnit: '',
        scUnitId: '',
        mainSend: '',
        mainSendId: '',
      },
      options: [
        {
          label: '总行',
          key: 's'
        }
      ],
      gArr: [],
      gObj: {},
      // 可填写签发意见的岗位
      showCyPerson: false,
      cyData: [],
    };
  },
  computed: {},
  methods: {
    // 选机构
    selectOrg (org) {
      console.log(org)
      this.$set(this.formData, "scUnit", org.unitName)
      this.formData.scUnitId = org.id
      // console.log('主办部门：', this.formData)
    },
    // 可填写签发意见的岗位
    choose () {
      this.toNext();
    },
    toNext () {
      this.gArr = []
      let st = localStorage.getItem('st')
      this.$api.setting.workFlow.getPostList({ st }).then(res => {
        let newArr = res.data
        newArr.forEach((item, index) => {
          this.gObj = {}
          this.gObj.name = item.codeName
          this.gObj.id = item.dicId
          this.gArr.push(this.gObj)
        })
        this.cyData = this.gArr;
        this.showCyPerson = true;
      })
    },
    cyPersonList (data) {
      console.log(8888, data)
      let ids = [];
      let names = []
      data.map(item => {
        ids.push(item.id)
        names.push(item.name)
      })
      this.formData.mainSend = names.join(',')
      this.formData.mainSendId = ids.join(',')
    },
    buttonClick (params) {
      switch (params) {
        case "保存":
          if (this.formData.scUnit && this.formData.mainSend) {
            this.$api.meeting.setAddData(this.formData)
              .then(res => {
                this.$router.push('/meeting/cs/hy')
              })
          } else {
            this.$message({
              message: '机构名称、可填写签发意见的岗位不能为空',
              type: 'warning'
            });
          }
          break;
        case "关闭":
          this.$router.push('/meeting/cs/hy');
          break;
      }
    },
  },
  activated () { },
  mounted () { },
  created () {
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.hyAdd {
  background: white;
  margin: 0 auto;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-left: 20px;
      float: left;
    }
  }
  .hyHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>