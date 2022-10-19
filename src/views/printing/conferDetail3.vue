<!--
 * @Author: your name
 * @Date: 2020-12-23 19:21:48
 * @LastEditTime: 2021-01-12 18:30:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1230OA\src\views\printing\conferDetail3.vue
--> 
<!--
 * @Author: your name
 * @Date: 2020-12-23 19:17:13
 * @LastEditTime: 2020-12-23 19:17:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \1230OA\src\views\printing\conferDetail2.vue
--> 
<template>
  <div class="print_list">
    <el-row>
        <el-col>
          <el-button @click="printThis()" type="info" plain>打印</el-button>
          <el-button @click="closeThis" type="info" plain>返回</el-button>
        </el-col>
      </el-row>
    <h1>2018年第XX次行长办公会议会议单</h1>
    <table>
      <tbody>
        <tr style="border-bottom: solid #000 1px;">
          <td>时间：{{formData.hyTimeStr}}</td>
          <td>地点：{{formData.hyAdress}}</td>
        </tr>
        <div class="line"></div>
        <tr>
          <td>
            主持：{{formData.zcName}}
          </td>
        </tr>
        <tr>
          <td>
            出席：行领导：{{leaders}}
          </td>
        </tr>
        <tr>
          <td>
            高管：{{mange}}
          </td>
        </tr>
        <tr>
          <td>
            缺席：行领导： {{formData.qxLd}}
          </td>
          <td>
            缺席原因 {{formData.qxLdQxreason}}
          </td>
        </tr>
        <tr>
          <td>
            高管：{{formData.qxGg}}
          </td>
          <td>
            缺席原因 {{formData.qxLdQxreason}}
          </td>
        </tr>
        <tr>
          <td>
            列席：董事：{{formData.lxDs}}
          </td>
        </tr>
        <tr style="border-bottom: solid #000 1px;">
          <td>
            监事：{{formData.lxJs}}
          </td>
        </tr>
        <tr>
          <td>
            议题：{{hyData.ytMc}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import '../../assets/css/print_list.less'
export default {
  data() {
    return {
      formData: {},
      hyData:{},
      leaders:'',
      mange:'',
    };
  },
  methods: {
    printThis() {
      document.execCommand("print");
    },
    closeThis() {
      this.$intent.closeWindow(this);
    },
    // 获取会议内容
    getHyTable() {
      this.$api.secreatary.meeting
        .hyTable(
          {
            tzId: this.id,
          }
        )
        .then((res) => {
          this.hyData = res.data;
          console.log('---------------',this.hyData);
        });
    },
    //出席列表
    attendance(){
      this.$api.secreatary.meeting
        .AttendanceList({
          tzId: this.id,
          managerFlag: 0,
        })
        .then((res) => {
          console.log(res);
          res.data.map(item=>{
            this.leaders = item.ldName
          })
        });
        this.$api.secreatary.meeting
        .AttendanceList({
          tzId: this.id,
          managerFlag: 1,
        })
        .then((res) => {
          console.log(res);
          res.data.map(item=>{
            this.mange = item.ldName
          })
        });
    },
    loadData() {
      this.$api.secreatary.meeting
        .getMainDetail({
          id: this.id,
        })
        .then((res) => {
          // console.log("---------------------------------------------", res);
            this.formData = res.data;
            // console.log(this.formData);
          this.formData.draftDate = formatData(
            res.data.draftDate,
            "YYYY-MM-DD HH:mm:ss"
          );
         this.formData.hyTimeStr = formatData(res.data.hyTime, "YYYY-MM-DD hh:mm:ss");
          // console.log("000000", this.formData.hyTimeStr);
        });
    }
  },
  created() {
    this.id = this.$route.query.id 
    console.log(this.id);
    this.loadData();
    this.getHyTable();
    this.attendance();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
td {
  line-height: 40px;
}
</style>
