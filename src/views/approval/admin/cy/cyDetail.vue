<template>
  <div class="qcDetail">
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
    <div class="qcHeader">
      <div class="title-text">中国建设银行总行跨行申请项目传阅单</div>
    </div>

    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{this.formData.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{this.formData.currentUser}}</span>
          </p>
          <p>
            是否跨行：
            <span>{{this.formData.isKh}}</span>
          </p>
          <el-button
            type="primary"
            style="float:right;margin-right:50px;height:26px;font-size:12px;margin-top:1px"
          >查看审批说明</el-button>
        </div>
      </div>
      <el-form :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请项目">
              <el-input v-model="formData.applyProjectName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主管部门">
              <el-input v-model="formData.mainDepart"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审批编号">
              <el-input v-model="formData.approveNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期">
              <el-input v-model="formData.approveTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请部门">
              <el-row>
                <el-col :span="24">
                  <el-select style="width:100%" v-model="select">
                    <el-option v-model="formData.approveDepart" v-for="item in 3" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人">
              <el-input v-model="formData.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="formData.contacTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input  v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="依据">
            <el-button type="primary">引入</el-button>
            <el-button type="primary">删除</el-button>
          </el-form-item>
        </el-row>

        <el-form-item label="事由提要">
          <el-input type="textarea" :rows="3" v-model="formData.reason"></el-input>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input type="textarea" :rows="3" :disabled="true" v-model="formData.examineIdea"></el-input>
        </el-form-item>
        <el-form-item label="申请单位意见">
          <el-input type="textarea" :rows="3" v-model="formData.exaunitIdea"></el-input>
        </el-form-item>
        <el-form-item label="办理情况">
          <el-input type="textarea" :rows="3" v-model="formData.blIdea"></el-input>
        </el-form-item>
        <el-form-item label="一次传阅意见">
          <el-input type="textarea" :rows="3" :disabled="true" v-model="formData.firsrCyidea"></el-input>
        </el-form-item>
        <el-form-item label="二次传阅意见">
          <el-input type="textarea" :rows="3" :disabled="true" v-model="formData.firstCyPerson"></el-input>
        </el-form-item>
        <el-form-item label="传阅说明">
          <el-input type="textarea" :rows="3" :disabled="true" v-model="formData.cyExplain"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="formData.mark"></el-input>
        </el-form-item>
        <div class="bottom-span">
          <span>引入附件文件名（包括压缩包的文件名）不能包含以下半角符号：空格/\,:;""?&lt;&gt;|、%.-</span>
        </div>
        <el-row>
          <el-col :span="16">
            <el-form-item label="附件：">
              <el-input type="textarea" :rows="2" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" style="margin-left:20px;">浏览</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-button type="primary" style="margin-left:20px;">引入</el-button>
            <el-button type="primary" style="margin-left:20px;">删除</el-button>
            <el-button type="primary" style="margin-left:20px;">排序</el-button>
          </el-col>
        </el-row>
        <el-row v-show="!fromType">
          <el-col :span="24">
            <el-form-item label="传阅人员" style="margin-top:20px">
              <el-row>
                <el-col>
                  <el-form-item label="未阅">
                    <el-input v-model="formData.secondUnreadPersion"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="已阅">
                    <el-input v-model="formData.secondReadPersion"></el-input>
                  </el-form-item>
                  
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "qcDetail",
        components: {},
        data() {
            return {
                fromType: "",
                checkType: [],
                select: "",
                radio: "",
                rules: {},
                formData: {},
                khType:'',
                buttonList: [
                    "关闭",
                    "保存",
                    "完成并发送",
                    "处理申请",
                    "查看流程",
                    "打印处理单",
                    "删除此文",
                    "收藏",
                    "操作指南",
                    "维护",
                    "流程调度",
                ],
                id:''
            };
        },
        computed: {},
        methods: {
            buttonClick(params) {
                switch (params) {
                    case '保存':
                        this.saveData();
                        break
                }
            },
            saveData(){
                if(this.id){
                    this.$api.checkLz.checkCYAlter(
                        this.formData
                    ).then(res => {
                        if(res.code=="SUCCESS"){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                    })
                }else{
                    this.formData.khType=this.khType
                    this.formData.id=this.id
                    this.$api.checkLz.checkCYCreate(
                        this.formData
                    ).then(res => {
                        if(res.code=="SUCCESS"){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                    })
                }

            },
            queryDeal(){
                this.$api.checkLz.checkCYDeal(
                    {
                        id:this.id,
                    }
                ).then(res => {
                    this.formData=res.data
                    if(this.formData.isKh=='0'){
                        this.formData.isKh='否'
                    }else{
                        this.formData.isKh='是'
                    }
                })
            }
        },
        activated() {},
        mounted() {},
        created() {
            if(this.$route.query.type){
                this.fromType = this.$route.query.type;
                let rowData=JSON.parse(this.$route.query.data)
                this.id=rowData.id
                this.khType=rowData.isKh
                this.queryDeal()
            }
        },
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .qcDetail {
    // background: white;
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

    .qcHeader {
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
    .process_content {
      width: 80%;
      min-height: 920px;
      padding: 20px 16px;
      margin: 0 auto;
      border: 1px solid #ccc;

      .cur_box {
        width: 95%;
        margin-left: 5%;
        height: 30px;
        margin-bottom: 20px;
        line-height: 30px;
        border: 1px solid #f9aa21;
        background: #fef7e7;

        .cur_sess {
          p {
            font-size: 14px;
            color: #0f100e;
            margin-left: 16px;
            float: left;
            span {
              color: #f9aa21;
            }
          }
        }
      }
      .bottom-span {
        span {
          display: block;
          margin-left: 10%;
          font-size: 14px;
          color: red;
          line-height: 20px;
        }
      }
    }
  }
</style>
