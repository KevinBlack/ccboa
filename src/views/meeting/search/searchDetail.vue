<!--
 * @Author: your name
 * @Date: 2020-07-31 13:44:42
 * @LastEditTime: 2020-09-22 16:51:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\search\searchDetail.vue
-->
/**
* create by zz on 2020/7/30 13:45
* 类注释：
* 备注：
*/

<template>
  <div class="searchDetail">
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
    <div class="detailHeader">
      <div class="title-text">中国建设银行行领导培训通知</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前处理人：
            <span>张三</span>
          </p>
        </div>
      </div>
      <el-form :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主办部门">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿人">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="联合单位">
              <el-row>
                <el-col :span="24">
                  <el-input :disabled="true"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="委托承办单位">
              <el-row>
                <el-col :span="24">
                  <el-input :disabled="true"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="editor_box">
        <label>便函内容</label>
        <editor :disabled="true"></editor>
      </div>

      <el-form label-width="120px" :model="formData">
        <el-form-item label="签发意见">
          <el-input type="textarea" :rows="4" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input type="textarea" :rows="4" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="传阅意见">
          <el-input type="textarea" :rows="4" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="反馈信息">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接受时间">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="次数">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import editor from '@/components/editor/editor.vue';
export default {
  name: "searchDetail",
  components: {
    // editor
  },
  data() {
    return {
      rules: {},
      formData: {},
      buttonList: [
        "关闭",
        "保存",
        "预定",
        "查看流程",
        "操作指南",
        "撤回",
        "维护",
        "流程调度"
      ]
    };
  },
  computed: {},
  methods: {},
  activated() {},
  mounted() {},
  created() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.searchDetail {
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
}
.detailHeader {
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

        span {
          color: #f9aa21;
        }
      }
    }
  }
  .editor_box {
    height: 500px;
    margin: 0 auto;
    display: flex;

    label {
      text-align: right;
      padding-right: 10px;
      width: 120px;
      color: #606266;
      font-size: 14px;
    }
  }
}
</style>




