<!--
 * @Author: your name
 * @Date: 2020-08-06 09:46:47
 * @LastEditTime: 2021-01-14 09:39:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\dutySchedule.周期值班表
-->

<template>
  <div class="dutySchedule">
    <div class="btn_list">
      <el-button type="primary" @click="prev()">返回</el-button>
      <el-button type="primary" @click="save">开始排班</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">值班安排表</div>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <div
        style="font-size:13px;margin:0 0 16px 22px;color: #ff464f;"
      >提示：请优先排春节值班、节假日值班、周末值班再排工作日值班。</div>
      <el-form-item label="排班周期" prop="DateStr">
        <el-col :span="8">
          <el-date-picker
            style="width:100%"
            v-model="form.DateStr"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <!-- <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.startDateStr"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.endDateStr"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>-->
      </el-form-item>

      <!--      <el-form-item label="排班周期">-->
      <!--        <el-col :span="11">-->
      <!--          <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" -->
      <!--                          style="width: 100%;"></el-date-picker>-->
      <!--        </el-col>-->
      <!--        <el-col class="line" :span="2">至</el-col>-->
      <!--        <el-col :span="11">-->
      <!--          <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate"-->
      <!--                          style="width: 100%;"></el-date-picker>-->
      <!--        </el-col>-->
      <!--      </el-form-item>-->
      <el-form-item label="排班类型" prop="dutyType">
        <el-select v-model="form.dutyType" placeholder style="width:46%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label" 
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条件">
        <el-input @input="phoneChange" v-model="form.specialDays" class="name"></el-input>天
        <div>注：在已排好的节假日及周末值班前后n天内，不为同一人排工作日夜班</div>
      </el-form-item>
      <el-col :span="12">
        <el-form-item label="排班联系人">
          <el-input v-model="form.dutyPlanHumanName" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12"> 
        <el-form-item label="联系电话">
          <el-input v-model="form.telNum"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script >
export default {
  name: "dutySchedule",
  components: {},
  props: {},

  data() {
    return {
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime();
          if (maxDate) {
            this.pickerMinDate = "";
          }
        },
        disabledDate: (time) => {
          if (this.pickerMinDate !== "") {
            const one = 30 * 24 * 3600 * 1000;
            const minTime = this.pickerMinDate - one;
            const maxTime = this.pickerMinDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime;
          }
        },
      },

      options: [
        {
          value: "0",
          label: "工作日值班",
        },
        {
          value: "1",
          label: "周末值班",
        },
        {
          value: "2",
          label: "节假日值班",
        },
        {
          value: "3",
          label: "春节值班",
        },
      ],
      form: {
        telNum:JSON.parse(localStorage.getItem('userInfo')).telMobile,
        dutyPlanHumanName:JSON.parse(localStorage.getItem('userInfo')).humanName
      },
      rules: {
        dutyType: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
        DateStr: [{ required: true, message: "请选择日期", trigger: "change" }],
      },
    };
  },
  computed: {},
  methods: {
    //天数
    phoneChange() {
      console.log(this.form.specialDays,"gengai")
      let reg = /[^\-\,\d\*\ ]/g;
      this.form.specialDays = this.form.specialDays.replace(reg, "");
      console.log(this.form.specialDays,"genga222i")
      // console.log(reg.test(this.formData.tel));
      this.$forceUpdate();
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.specialDays = this.form.specialDays
            ? parseInt(this.form.specialDays)
            : "";
          this.form.startDateStr = this.form.DateStr[0];
          this.form.endDateStr = this.form.DateStr[1];
          this.$api.secreatary.linkMan.saveDyty(this.form).then((res) => {
            if (res && res.code=='SUCCESS') {
              this.$message({
                type: "success",
                message: "保存成功",
              });
              this.$router.push("/secretary/adminDuty/adminView/periodictotaltable")
             }
          });
        }
      });
    },
    prev() {
      this.$router.back();
    },
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}

.btn_list {
  text-align: left;
  padding: 10px;
}

.el-form {
  border: 1px solid #ccc;
  width: 80%;
  padding: 5% 2%;
  margin: auto;
}

.line {
  text-align: center;
}

.name {
  width: 40%;
  margin-right: 2%;
}
</style>
