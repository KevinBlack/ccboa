<template>
  <div>
    <el-button @click="backDarft" style="margin: 30px 100px;">关闭</el-button>

    <div id="Fl" class="tablePrint">
      <el-row>
        <h1 style class="shiwuTitle">法律性文件处理单</h1>
      </el-row>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="200px" class="first-form">
        <el-row class="box">
          <el-col :span="10">
            <el-form-item label="文件编号:">
              <el-input v-model="form.dicCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="法律性文件名称:">
              <el-input v-model="form.legaDicName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="标的币种:">
              <el-input v-model="form.currenctes" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="金额（万元）">
              <el-input v-model="form.account" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="归属机构">
              <el-input v-model="form.belongOrgName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="送审部门名称:">
              <el-input v-model="form.submitOrgName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="拟稿人:">
              <el-input v-model="form.trustees" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="拟稿人电话:">
              <el-input v-model="form.trusteesTel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="10">
            <el-form-item label="紧急程度:">
              <el-input v-model="form.urgentLevel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="紧急/特急原因:">
              <el-input v-model="form.urgentReasion" :disabled="true"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="10">
            <el-form-item label="对方当事人名称:">
              <el-input v-model="form.partyName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="法律性文件类别">
              <el-input v-model="form.lagelDicType" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="会签部门">
              <el-input v-model="form.hqdeptOpinion" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="送审时间">
              <el-input v-model="form.submitTime" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="背景情况附件">
              <el-input v-model="form.backgroundAttach" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="法审承办人">
              <el-input v-model="form.lawJudge" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="审查机构">
              <el-input v-model="form.scOrg" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="送审文件份数">
              <el-input v-model="form.submitFileNum" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="送审文件">
              <el-input v-model="form.submitFile" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="法审承办人电话">
              <el-input v-model="form.lawJudgeTel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="关联交易识别">
              <el-input v-model="form.relevDealaddr" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="业务性审查意见">
              <el-input v-model="form.salesScidea" type="textarea" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="其他业务性审查意见">
              <!-- <el-input v-model="form.otherCheckingOpinion" :disabled="true"></el-input> -->
              <el-input :disabled="true" v-if="!form.content.otherSalesIdea"></el-input>
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in form.content.otherSalesIdea"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div style="min-height: 80px">{{item.content}}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{item.reviewer}} {{item.auditDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="拟稿部门审核意见">
              <el-input :disabled="true" v-if="!form.content.content1">无数据</el-input>
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in form.content.content1"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div style="min-height: 80px">{{item.content}}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{item.reviewer}} {{item.auditDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="业务主管部门审核意见">
              <el-input :disabled="true" v-if="!form.content.content2">无数据</el-input>
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in form.content.content2"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div style="min-height: 80px">{{item.content}}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{item.reviewer}} {{item.auditDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="行领导批示意见">
              <el-input :disabled="true" v-if="!form.content.content3">无数据</el-input>

              <!-- <el-input v-model="form.content3" :disabled="true"></el-input> -->
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in form.content.content3"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div style="min-height: 80px">{{item.content}}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{item.reviewer}} {{item.auditDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="会签部门意见">
              <el-input :disabled="true" v-if="!form.content.contentHq3">无数据</el-input>

              <!-- <el-input v-model="form.contentHq3" :disabled="true"></el-input> -->
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in form.content.contentHq3"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div style="min-height: 80px">{{item.content}}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{item.reviewer}} {{item.auditDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="法律部门审查意见">
              <el-input :disabled="true" v-if="!form.content.content5">无数据</el-input>
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in form.content.content5"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div style="min-height: 80px">{{item.content}}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{item.reviewer}} {{item.auditDate}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="法律部门审查意见附件">
              <el-input v-model="form.lawdeptScidea" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Fl",
  data() {
    return {
      form: {},
      content5: [],
      content1: [],
      contentHq3: [],
      content2: [],
      content3: [],
      otherCheckingOpinion: []
    };
  },
  methods: {
    backDarft() {
      this.$intent.closeWindowImpo(this);
    }
  },
  created() {
    this.form = JSON.parse(this.$route.query.data);
    console.log(this.form);
    // delete this.from.content.content5[1]
    if (!!this.form.content?.content1) {
      this.form.content.content1 = this.form.content.content1.reverse();
    }
    if (!!this.form.content?.content2) {
      this.form.content.content2 = this.form.content.content2.reverse();
    }
    if (!!this.form.content?.content3) {
      this.form.content.content3 = this.form.content.content3.reverse();
    }
    if (!!this.form.content?.content5) {
      this.form.content.content5 = this.form.content.content5.filter(item => item).reverse();
    }
    if (!!this.form.content?.contentHq3) {
      this.form.content.contentHq3 = this.form.content.contentHq3.reverse();
    }
    if (!!this.form.content?.otherCheckingOpinion) {
      this.form.content.otherCheckingOpinion = this.form.content.otherCheckingOpinion.reverse();
    }
    if(!this.form.content){
       this.$set(this.form, "content", {
         content1:[],
         content2:[],
         content3:[],
         content5:[],
         contentHq3:[],
         otherCheckingOpinion:[],
         otherSalesIdea:[]
       });
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
body {
  background-color: white;
}
.tablePrint {
  width: 900px;
  margin: 0 auto;
}
.title-h1 {
  font-family: 宋体;
  font-size: 35px;
  text-align: center;
  line-height: 100px;
}
.content {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #cccccc;
  background-color: white;
  padding: 20px;
}
</style>
