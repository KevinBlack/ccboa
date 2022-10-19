<!--
 * @Author: your name
 * @Date: 2020-08-06 10:12:19
 * @LastEditTime: 2020-08-06 10:31:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\approval\admin\2018Detail.vue
--> 
<template>
 <div class="bjDetail">
     <div class="headerClick">
      <div class="right">
        <el-button v-for="(item,index) in buttonList" @click="buttonClick(item)" :key="index" size="mini" plain>{{item}}
        </el-button>
      </div>
    </div>
    <div class="bjHeader">
      <div class="title-text">中国建设银行建测1审批处理单</div>
    </div>

    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>当前环节：<span>填写审批单</span></p>
          <p>当前处理人：<span>十七</span></p>
          <p>是否跨行：<span>否</span></p>
          <el-button type="primary" style="float:right;margin-right:50px;height:26px;font-size:12px;margin-top:1px">查看审批说明</el-button>
        </div>
      </div>
      <el-form :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label='申请项目'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='主管部门'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label='审批编号'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='申请日期'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label='申请部门'>
              <el-row>
                <el-col :span="24">
                  <!-- <el-select style="width:100%" v-model="select">
                    <el-option
                      v-for="item in 3"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select> -->
                  <el-input></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='联系人'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label='联系电话'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label='标题'>
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item label="依据">
                <!-- <el-button type="primary">引入</el-button>
                <el-button type="primary">删除  </el-button> -->
                <el-input></el-input>
            </el-form-item>
        </el-row>

        
        
        
        <el-form-item label="事由提要">
          <el-input type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input type="textarea" :rows="3" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请单位意见">
          <el-input type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="办理情况">
          <el-input type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="传阅意见">
          <el-input type="textarea" :rows="3" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3"></el-input>
        </el-form-item>
        <div class="bottom-span">
          <span>引入附件文件名（包括压缩包的文件名）不能包含以下半角符号：空格/\,:;""?&lt;&gt;|、%.-</span>
        </div>
        <!-- <el-row>
          <el-col :span="16">
            <el-form-item label='附件：'>
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
        </el-row> -->
      
      </el-form>

      


    </div>

 </div>
</template>

<script type="text/ecmascript-6">
 export default {
    name:"bjDetail",
    components: {

    },
    data () {
      return {
        value1: new Date(2016, 9, 10, 18, 40),
        value2: new Date(2016, 9, 10, 18, 40),
        value3: new Date(2016, 9, 10, 18, 40),
        checkType:[],
        select: "",
        radio: "",
        rules: {},
        formData: {},
        buttonList: ['关闭', '保存', '完成并发送', '处理申请', '查看流程', '打印处理单', '删除此文', '收藏', '操作指南', '维护', '流程调度'],
      }
    },
    computed: {},
    methods: {
      buttonClick(params) {
                switch (params) {

                }
            },
    },
    activated() {
    },
    mounted() {
    },
    created() {
    }
 }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .bjDetail{
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
  
    .bjHeader {
        padding: 8px 70px;

        .title-text {
        margin-bottom: 15px;
        font-size: 30px;
        line-height: 75px;
        color: #409EFF;
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
      .bottom-span{
        span{
          display: block;
          margin-left:10%;
          font-size:14px;
          color: red;
          line-height: 20px;
        }
      }
      
    }
  }
</style>

