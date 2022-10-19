<!--
 * @Author: wy
 * @Date: 2020-07-29 19:35:56
 * @LastEditTime: 2020-07-30 13:59:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\superviseEffic\requestItem\unloadNum\unloadDetail.vue
--> 
<template>
  <div class="unloadDetail">
    <div class="handleButton">
      <el-button type="primary">开始</el-button>
      <el-button type="primary">取消</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">自定义条件明细卸载</div>
      <div class="orgInfoTableBody">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="督办时间">
            <el-date-picker
              v-model="form.date0"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @input="$forceUpdate()"
              :style="{width:'81%'}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="办结时间">
            <el-date-picker
              v-model="form.date1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @input="$forceUpdate()"
              :style="{width:'81%'}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="收文时间">
            <el-date-picker
              v-model="form.date2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @input="$forceUpdate()"
              :style="{width:'81%'}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="发送协办时间">
            <el-date-picker
              v-model="form.date3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @input="$forceUpdate()"
              :style="{width:'81%'}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束协办时间">
            <el-date-picker
              v-model="form.date4"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @input="$forceUpdate()"
              :style="{width:'81%'}"
            ></el-date-picker>
          </el-form-item>
          <el-row>
            <el-col :span="20">
              <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <div class="tips">*注：多个关键字之间用空格符号间隔</div>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="50px">
                <el-radio-group v-model="form.andOr">
                  <el-radio label="0">与</el-radio>
                  <el-radio label="1">或</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="文号">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="50px">
                <el-button type="primary">添加</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="来文单位">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公文状态">
                <el-radio-group v-model="form.andOr">
                  <el-radio label="0">全部</el-radio>
                  <el-radio label="1">流转</el-radio>
                  <el-radio label="1">办结</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="承办部门">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="协办部门">
                <el-input v-model="form.title1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="explanation">
      <p>提示:此处涉及的督办时间、办结时间（归档时间）、收文时间、发送协办时间和结束协办时间均为自然时间</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'unloadDetail',
  data () {
    return {
      form: {}
    }
  }

}
</script>
<style lang="less">
.unloadDetail {
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
        margin-top: -14px;
        margin-bottom: 12px;
        font-size: 12px;
        color: #ff0502;
      }
    }
  }
  .explanation {
    margin-left: 160px;
    margin-top: 28px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>