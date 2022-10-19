<!--
 * @Author: wy
 * @Date: 2020-07-24 16:26:10
 * @LastEditTime: 2020-08-01 15:52:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\publishInfo\selfBankInfo\components\newPro.vue
--> 
<template>
  <div class="newPro">
    <div class="handleButton">
      <el-button type="primary" @click="sure()">确定</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">选择拟稿部门</div>
      <div>
        <div class="orgInfoTableBody">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="部门">
              <el-select v-model="form.region" placeholder="请选择活动区域" :style="{width:'80%'}">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'newPro',
  components: {
  },
  props: {
  },
  data () {
    return {
      form: {},
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
      }]
    }
  },
  watch: {
  },

  computed: {},
  methods: {
    sure () {
      this.$router.push('/dashboard/personalOffice/publishInfo/selfBankInfoPub')
    }
  },
  activated () {
  },
  mounted () { },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.newPro {
  min-height: 100vh;
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
    }
    .orgInfoTableBody {
      margin-left: 9%;
    }
  }
}
</style>
