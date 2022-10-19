<!--
 * @Author: wy
 * @Date: 2020-07-30 14:03:20
 * @LastEditTime: 2020-07-31 10:21:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\signOff\sOffLoading\sOffBatchLoad.vue
--> 
<template>
  <div class="sOffBatchLoad">
    <div class="handleButton">
      <el-button type="primary">开始加载</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">会签行签报数据批量加载</div>
      <div class="orgInfoTableBody">
        <el-form ref="form" :model="form" label-width="150px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="选择文件">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <div class="tips">数据加载将会需要一定时间；请耐心等待！</div>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" :style="{marginLeft:'20px'}">浏览</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="explanation">
      <p>提示：</p>
      <p>数据批量加载步骤</p>
      <p>1.请勿修改模板格式</p>
      <p>2.根据模板中提供的信息格式修改数据</p>
      <p>3.确保“部门信息配置”、“工作时段配置”及“节假日信息”配置正确</p>
      <p>4.点击【浏览】，选择您已经准备好的模板Excel文件，再点击【开始加载】</p>
      <p>5.数据加载完成，会弹出数据成功的提示框</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sOffBatchLoad',
  data () {
    return {
      form: {}
    }
  }

}
</script>
<style lang="less">
.sOffBatchLoad {
  min-height: 100vh;
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }

    .orgInfoTableBody {
      margin-left: 3%;
      .tips {
        padding-left: 160px;
        margin-top: -10px;
        margin-bottom: 12px;
        font-size: 12px;
        color: #ff0502;
      }
    }
  }
  .explanation {
    margin-left: 200px;
    margin-top: 28px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>