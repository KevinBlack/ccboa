<template>
  <div class="optionalfield">
    <!-- <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo_ruleForm">
      <el-col class="bank_dispach_col" :span="8">
        <el-form-item label="拟稿日期">
          <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="bank_dispach_col" :span="6">
        <el-form-item label="发文字号">
          <el-input v-model="ruleForm.numberdispatch"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="bank_dispach_col" :span="6">
        <el-form-item label="发文字号">
          <el-input v-model="ruleForm.numberdispatch"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <button>搜索</button>
    <button>重置</button>
    <br />
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo_ruleForm">
          <el-col class="bank_dispach_col" :span="8">
            <el-form-item label="发文日期">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col class="bank_dispach_col" :span="16">
            <el-form-item label="主办部门" :span="16">
              <el-select v-model="ruleForm.straighthair" placeholder="请选择">
                <el-option label="主办部门" value="hangfawen" class="bank_dispach_option"></el-option>
                <el-option label="主办部门" value="hangfawen" class="bank_dispach_option"></el-option>
                <el-option label="主办部门" value="hangfawen" class="bank_dispach_option"></el-option>
                <el-option label="主办部门" value="hangfawen" class="bank_dispach_option"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <ul>
          <li>
            <p>公文状态：</p>
            <span>全部</span>
            <span>流转</span>
            <span>办结</span>
          </li>
          <li>
            <p>发文形式：</p>
            <span>全部</span>
            <span>电子</span>
            <span>实物</span>
          </li>
          <li>
            <p>发文类型：</p>
            <span>全部</span>
            <span>行发文</span>
            <span>部门发文</span>
            <span>党务发文</span>
            <span>会议纪要</span>
            <span>工作简报</span>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse> -->


    

  </div>
</template>

<script>
export default {
  data () {
    return {
      // activeNames: ["1"],
      // ruleForm: {
      //   draftday: "", // 正文标题
      //   numberdispatch: "",
      //   straighthair: "", // 附件标题
      //   pickerOptions: {
      //     shortcuts: [
      //       {
      //         text: "Last week",
      //         onClick(picker) {
      //           const end = new Date();
      //           const start = new Date();
      //           start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //           picker.$emit("pick", [start, end]);
      //         }
      //       },
      //       {
      //         text: "Last month",
      //         onClick(picker) {
      //           const end = new Date();
      //           const start = new Date();
      //           start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //           picker.$emit("pick", [start, end]);
      //         }
      //       },
      //       {
      //         text: "Last 3 months",
      //         onClick(picker) {
      //           const end = new Date();
      //           const start = new Date();
      //           start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //           picker.$emit("pick", [start, end]);
      //         }
      //       }
      //     ]
      //   },
      //   value1: "",
      //   value2: ""
      // }
    };
  },
  methods:{
      // handleChange(val){
      //     console.log(val)
      // }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
