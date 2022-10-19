<!--
 * @Author: your name
 * @Date: 2020-10-04 23:58:27
 * @LastEditTime: 2020-10-09 14:54:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\editJournal\browsing\index.vue
--> 
<template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="right">
        <!-- <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}
        </el-button>-->
        <el-button type="primary" plain size="mini">关闭</el-button>
        <el-button type="primary" plain size="mini">保存</el-button>
        <el-button type="primary" plain size="mini">处理正文</el-button>
        <el-button type="primary" plain size="mini">入备选库</el-button>
        <el-button type="primary" plain size="mini">转换格式</el-button>
        <el-button type="primary" plain size="mini">打印处理单</el-button>
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">《每日动态》稿件处理单</div>
    </div>
    <div class="process_content">
      <div class="bank_dispach_content" id="bank_dispach_content">
        <div class="cur_box">
          <div class="cur_sess">
            <p>
              当前处理人：
              <span>测试总收文</span>
            </p>
            <p style="float:right">
              稿件状态：
              <span>未采用</span>
            </p>
          </div>
        </div>
        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿刊物">
                <el-select v-model="value" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投稿栏目">
                <el-input placeholder="副刊" v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="投稿单位">
                <el-input placeholder="中国建设银行" v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投稿部门" prop>
                <el-select v-model="value" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拟稿人">
                <el-input placeholder="测试用户03" v-model="formData.mainDepart" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="formData.contacTel" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="拟稿日期">
                <el-date-picker style="width:100%" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-select v-model="value" style="width:100%" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="最新评分">
                <el-input v-model="formData.think" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "editRentDetial",
  components: {

  },
  data () {
    return {
      formData: {},
      input: '',

      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }


  },
  computed: {},
  methods: {

  },
  activated () {
  },
  created () {

  }
  ,
  mounted () {

  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  height: 100vh;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-right: 130px;
      float: right;
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
    min-height: 460px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        padding-right: 40px;
        p {
          padding-right: 20px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 20px;
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

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.bank_dispach_content {
  width: 100%;
  height: auto;

  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;

    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active {
      background: #3b85ef;
      color: #fff;
    }
  }
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.height_90 {
  height: 200px;
  margin-top: -200px;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 16px;
}
</style>

