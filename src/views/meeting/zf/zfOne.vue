<!--
 * @Author: your name
 * @Date: 2020-08-13 11:14:50
 * @LastEditTime: 2020-12-30 14:01:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\zf\zfOne.vue
--> 
/**
* create by zx on 2020/7/29 11:07
* 类注释：制发选择部门
* 备注：
*/
<template>
  <div class="zfOne">
    <div class="formHeader">
      <div class="title-text">请选择类型及拟稿部门</div>
    </div>
    <el-form style="margin:0 10%" :data="formData1">
      <el-form-item label="会议类型" prop="type">
        <el-radio v-model="formData1.type" label="CN012">系统会议通知</el-radio>
        <el-radio v-model="formData1.type" label="CN013">本部会议通知</el-radio>
        <el-radio v-model="formData1.type" label="CN095">部门会议通知</el-radio>
        <el-radio v-model="formData1.type" label="CN015">培训会议通知</el-radio>
      </el-form-item>
      <el-form-item label="主办部门" v-if="this.deptList.length>1">
        <el-select v-model="selectDept" style="width:50%" @change="change(selectDept)">
          <el-option
            v-for="item in deptList"
            :key="item.currUnitId"
            :label="item.chatNum"
            :value="item.humanId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="itemClick('sure')">确定</el-button>
        <el-button type="primary" @click="itemClick('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <fd-form style="margin:0 10%" :data="formData1" @event="itemClick" :columns="formCfg"></fd-form> -->
    <!-- <el-select v-model="selectDept" style="width:100%">
      <el-option
        v-for="item in deptList"
        :key="item.currUnitId"
        :label="item.currUnitName"
        :value="item"
      ></el-option>
    </el-select>-->
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: "zfOne",
  components: {
    // FdForm
  },
  props: {},
  data () {
    return {
      selectDept: "",
      detail: '',
      deptList: [],
      formData1: {},
    }
  },
  computed: {},
  methods: {
    itemClick (params) {
      switch (params) {
        case 'sure':
          if (this.formData1.type) {
            this.$intent.go(this, { name: "zfTwo", query: this.formData1 })
          } else {
            this.$message({
              message: '请选择会议类型',
              type: 'warning'
            });
          }
          break
        case 'cancel':
          this.$intent.closeWindow(this)
          break
      }
    },
    // change (p) {
    //   this.deptList.forEach(item => {
    //     if (item.currUnitId == p) {
    //       this.formData1.maindept = item.currUnitName
    //     }
    //   })
    //   this.$forceUpdate()
    // },
    // addData () {
    //   this.$api.meeting.getDeptList({}).then(res => {
    //     this.deptList = res.result;
    //     this.formData1.maindept = this.deptList[0].currUnitName
    //     this.formData1.maindeptId = this.deptList[0].currUnitId
    //   })
    // },
    change (p) {
      console.log('pppp', p)
      let select = {}
      // this.selectDept = this.deptList[0].humanId
      this.deptList.forEach(item => {
        // this.selectDept = p
        if (item.humanId == p) {
          select = item
        }
      })
      this.formData1.deptDetail = JSON.stringify(select)
      console.log(9090909, this.formData1)
      this.$forceUpdate()
    },
    addData () {
      this.$api.meeting.getDeptList({}).then(res => {
        this.deptList = res.result;
        if (this.deptList.length == 1) {
          this.selectDept = JSON.stringify(this.deptList[0])
          this.formData1.deptDetail = JSON.stringify(this.deptList[0])
        } else {
          this.selectDept = this.deptList[0].humanId
          let select1 = {}
          this.deptList.forEach(item => {
            if (item.humanId == this.selectDept) {
              select1 = item
            }
          })
          this.formData1.deptDetail = JSON.stringify(select1)
        }
      })
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
    // this.formData1.maindeptId = '2312sssss4'
    this.addData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
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
</style>
