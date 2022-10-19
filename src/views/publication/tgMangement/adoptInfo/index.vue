<!--
 * @Author: your name
 * @Date: 2020-09-29 16:23:08
 * @LastEditTime: 2021-03-18 15:52:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\tgMangement\adoptInfo\index.vue
--> 

<template>
  <div class="adopt-info" style="background:white">
    <div class="adoptHeader">
      <div class="adopt-btn">
        <el-button class="right" type="primary" plain size="mini" @click="closeBtn">关闭</el-button>
        <!-- <el-button class="right" type="primary" plain size="mini" @click="tiaozuan">跳转</el-button> -->
      </div>
      <div class="adopt-title">稿件采用反馈信息</div>
    </div>
    <div class="adoptMain">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="刊物名称">
          <el-input :disabled="true" v-model="formLabelAlign.pubNm"></el-input>
        </el-form-item>
        <el-form-item label="期号">
          <el-input :disabled="true" v-model="formLabelAlign.issue"></el-input>
        </el-form-item>
        <el-form-item label="总期号">
          <el-input :disabled="true" v-model="formLabelAlign.totalIssue"></el-input>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-input :disabled="true" v-model="formLabelAlign.pubTime"></el-input>
        </el-form-item>
        <el-form-item label="采用单位">
          <el-input :disabled="true" v-model="formLabelAlign.drafOrgNm"></el-input>
        </el-form-item>
        <el-form-item label="稿件标题">
          <el-input :disabled="true" v-model="formLabelAlign.title"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import dateFormate from '@/util/filters.js'
// dateFormate.date(Date.parse(new Date(formLabelAlign.tougaoTime)))
export default {
  name: 'index.vue',
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        pubNm: '', //刊物名称
        title: '', //稿件标题
        drafOrgNm: '', //采用单位
        pubTime: '', //投稿日期
        pubIssue: '', //七号
        pubTotalIssue: '', //总期号
      },
    }
  },
  methods: {
    time(e) {
      let date = new Date(e)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = this.change(date.getDate()) + '  '
      let h = this.change(date.getHours()) + ':'
      let m = this.change(date.getMinutes()) + ':'
      let s = this.change(date.getSeconds())
      return Y + M + D 
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    closeBtn() {
      this.$router.go(-1)
    },
    tiaozuan() {
      this.$router.push({
        path: '/publication/tgMangement/adoptInfo/caiYliet',
      })
    },
  },
  created() {
    // 判断是否为详情条转
    if (this.$route.query.rowData) {
      let arry = JSON.parse(this.$route.query.rowData)
      this.formLabelAlign = arry
      this.formLabelAlign.pubTime = this.time(arry.pubTime)
    }
  },
}
</script>
<style scoped lang="less">
.adopt-info {
  .adoptHeader {
    .adopt-btn {
      width: 100%;
      background: #409eff;
      color: white;
      height: 50px;
      line-height: 50px;
      .right {
        margin: 12px 80px 0 0;
        float: right;
      }
    }
    .adopt-title {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
}
.adoptMain {
  width: 85%;
  min-height: 280px;
  padding: 30px 25px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
