<template>
  <div class="superRemind">
    <P class="superRemind_title">超时提醒设置</P>
    <el-button type="primary" @click="close">关闭</el-button>
    <el-button type="primary" @click="saveFom()">保存</el-button>
    <!-- <div style="width:100%;height:16px;color: black;"></div> -->
    <el-divider class="fengex"></el-divider>
    <!-- 表单 -->
    <div class="superRemind_min">
      <el-form :rules="rules" ref="form" :model="form" label-width="120px">
        <el-form-item label="提醒事项类型">
          <el-col :span="10">
            <el-checkbox-group v-model="form.type">
              <el-checkbox
                v-for="item in dutyTypeList"
                :label="item.dicCode"
                :key="item.dicCode"
              >{{item.codeName}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
        <el-form-item label="提醒方式" prop="typeFuntion">
          <el-checkbox-group v-model="form.typeFuntion">
            <el-checkbox label="1" name="typeFuntion">微信</el-checkbox>
            <el-checkbox label="2" name="typeFuntion">邮件</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="停留工作时长" prop="stopTime">
          <el-select v-model="form.stopTime" placeholder="请选择时间">
            <el-option label="半天" value="0.5"></el-option>
            <el-option label="一天" value="1"></el-option>
            <el-option label="两天" value="2"></el-option>
            <el-option label="两天半" value="2.5"></el-option>
            <el-option label="三天" value="3"></el-option>
            <!-- <el-option v-for="item in timeStr" :label="item.timeName" :key="item.id">{{item.timeName}}</el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <p class="super_wenzi">注：对应催办事项在当前处理人停留工作时长所配置的“停留工作时长”，则在催办时间发送催办提醒</p>
    <p class="super_wenzi">计算停留工作时长时须去除休息时间及节假日，即按每个机构配置的工作时长计算</p>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否保存修改的信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
export default {
  name: "superRemind",
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false, //弹出框
      //   表单数据
      form: {
        type: [],
        stopTime: "",
        typeFuntion: [],
        id: ""
      },
      formData: {}, //预留数据 与 页面数据做对比
      dutyTypeList: [
        { dutyTypeId: "0", dutyTypeName: "工作日值班" },
        { dutyTypeId: "1", dutyTypeName: "周末值班" },
        { dutyTypeId: "2", dutyTypeName: "节假日值班" },
        { dutyTypeId: "3", dutyTypeName: "春节值班" }
      ],

      //  表单验证
      rules: {
        typeFuntion: [
          { required: true, message: "请选择提醒方式", trigger: "change" }
        ],
        stopTime: [
          { required: true, message: "请选择停留时间", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    // 提醒事项类型
    Remind() {
      this.$api.dailyWork.remindLis().then(res => {
        if (res && res.code == "SUCCESS") {
          this.dutyTypeList = res.data;
        }
      });
    },
    // 保存4 44
    saveFom() {
      var ids = this.form.id ? this.form.id : "";
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 填写信息
          this.$api.dailyWork
            .saveLis({
              id: ids,
              lengthOfStay: this.form.stopTime,
              reminderMethod: this.form.typeFuntion.join(),
              reminderType: this.form.type.join()
            })
            .then(res => {
              if (res && res.code == "SUCCESS") {
                this.dialogVisible = false;
                // 保存完查询页面
                this.loading();
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.$router.push("/dashboard/personalOffice/sysConfig")
              }
            });
        } else {
          // 未填写数据
          return false;
        }
      });
    },
    //  关闭
    close() {
      // 关闭之前对比页面数据与获取到的数据是否一样
      // const flg =
      //   this.form.stopTime == this.formData.lengthOfStay &&
      //   this.form.type.join() == this.formData.reminderType &&
      //   this.form.typeFuntion.join() == this.formData.reminderMethod
      //     ? true
      //     : false;
      // if (flg) {
      //   this.dialogVisible = false;
      // } else {
      //   this.dialogVisible = true;
      // }
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.saveFom();
            // this.$intent.closeWindow(this);
            
          } else if (action === "cancel") {
            //点否
            // this.$intent.closeWindow(this);
            this.$router.push("/dashboard/personalOffice/sysConfig")
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    // 初始页面 查询接口
    loading() {
      this.$api.dailyWork.suprRemidLis().then(res => {
        console.log(typeof res.data.lengthOfStay, "ceshi");
        this.formData = res.data; //预留数据
        (this.form.id = res.data.id),
          (this.form.stopTime = res.data.lengthOfStay),
          (this.form.type = res.data.reminderType.split(","));
        this.form.typeFuntion = res.data.reminderMethod.split(",");
      });
    }
  },
  activated() {},
  mounted() {
    this.loading();
    this.Remind();
  },
  created() {}
};
</script>

<style >
.superRemind_title {
  width: 100%;
  text-align: center;
  color: #0eb6e9;
  font-size: 36px;
  font-weight: 800;
  margin: 10px 0;
}

.superRemind_min {
  margin-left: 35%;
  /* margin: 0 auto; */
  /* text-align: center; */
}
.fengex {
  color: #0eb6e9;
}
.super_wenzi {
  color: #c40a13;
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
  line-height: 8px;
  /* margin: 0 auto; */
  /* width: 200px; */
}
</style>
