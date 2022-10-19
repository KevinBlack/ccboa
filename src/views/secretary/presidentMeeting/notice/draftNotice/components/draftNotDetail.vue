<!--
 * @Author: wy
 * @Date: 2020-07-29 15:42:31
 * @LastEditTime: 2020-07-29 19:27:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\secretary\presidentMeeting\notice\draftNotice\components\draftNotDetail.vue
--> 
<template>
  <div class="draftNotDetail">
    <div class="handleButton">
      <el-button
        type="primary"
        v-for="item in buttonList"
        :key="item"
        @click="clickEvent(item)"
      >{{item}}</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">中国建设银行行长办公会议通知</div>
      <div class="explain">
        <span>当前环节:</span>
        <span class="content">起草会议通知</span>
        <span>当前处理人:</span>
        <span class="content">admin</span>
      </div>
      <div class="orgInfoTableBody">
        <el-form ref="draftForm" :model="draftForm" label-width="140px" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="拟稿人">
                <el-input v-model="draftForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="draftForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拟稿日期">
                <el-input v-model="draftForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="会议名称">
            <el-input v-model="draftForm.name"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="会议时间">
                <el-date-picker
                  v-model="draftForm.time"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="09:00:00"
                  :style="{width:'100%'}"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会议地点">
                <el-select v-model="draftForm.place" placeholder="请选择会议地点" :style="{width:'100%'}">
                  <el-option
                    v-for="item in options.option1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="会议候场地点">
            <el-input v-model="draftForm.name"></el-input>
          </el-form-item>
          <el-form-item label="主持人">
            <el-select v-model="draftForm.place" placeholder="请选择主持人" :style="{width:'100%'}">
              <el-option
                v-for="item in options.option1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <h4>出席</h4>
          <el-form-item label="行领导">
            <el-select v-model="draftForm.place" placeholder="请选择行领导" :style="{width:'100%'}">
              <el-option
                v-for="item in options.option1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="高管">
            <el-select v-model="draftForm.place" placeholder="请选择高管" :style="{width:'100%'}">
              <el-option
                v-for="item in options.option1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <h4>缺席</h4>
          <el-form-item label="行领导">
            <el-input v-model="draftForm.name"></el-input>
          </el-form-item>
          <el-form-item label="高管">
            <el-input v-model="draftForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'draftNotDetail',
  components: {
  },
  props: {},
  data () {
    return {
      //按钮
      buttonList: ['关闭', '保存', '完成并发送', '发送预通知', '发送正式通知', '收回预通知', '查看流程', '打印处理单', '流程调整'],
      draftForm: {},
      options: {
        option1: [{
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
      },
    }
  },
  computed: {},
  methods: {
    //按钮事件
    clickEvent (buttonItem) {
      switch (buttonItem) {
        //关闭
        case '关闭':
          this.$confirm('是否保存文档?', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
          }).catch(() => {

          });
          break;
        //保存
        case '保存':
          this.$message({
            type: 'success',
            message: '保存成功！'
          })
          break;

      }
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.draftNotDetail {
  min-height: 100vh;
  .handleButton {
    margin-bottom: 30px;
  }
  .orgInfoTable {
    padding: 0px 70px;
    .orgInfoTitle {
      margin-bottom: 30px;
      font-size: 30px;
      line-height: 55px;
      color: #3b85f0;
      font-weight: 600;
      text-align: center;
    }
    .explain {
      margin-bottom: 10px;
      line-height: 48px;
      .content {
        margin-right: 20px;
        color: #ff0502;
      }
    }
    .orgInfoTableBody {
      margin-left: 3%;
      h4 {
        font-size: 17px;
        line-height: 57px;
        color: #3b85f0;
      }
    }
  }
}
</style>
