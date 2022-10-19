<template>
  <div>
    <el-dialog v-dialogDrag title="选择团队" :visible.sync="dialog" width="40%" :before-close="handleClose">
      <div>
        <span>选择团队</span>
        <el-select v-model="value" @change="checkchange" placeholder="请选择" style="margin-left:10px">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.teamName"
            :value="item.teamName"
            placeholder="请选择"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    // 'list'
    "tasklist"
  ],
  data() {
    return {
      paramas: {
        function: "findByUser"
      },
      //新增工作记录
      addTask: {
        function: "saveTeamWork",
        teamid: "",
        teamname: ""
      },
      dialog: true,
      options: [],
      value: ""
    };
  },
  mounted() {
    this.getTeam();
    console.log(this.tasklist);
  },
  methods: {
    getTeam() {
      this.$post
        .postData(
          "findByUser",
          JSON.stringify(this.paramas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (this.title == "新增任务") {
            this.options = res.data;
          } else {
            if (this.tasklist.length==0) {
              this.options = res.data;
            } else {
              this.arraySort(res.data,this.tasklist)
              this.options = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    arraySort(a,b){
       for(var i=0;i<b.length;i++){
         for(var j=0;j<a.length;j++){
           if(a[j].id == b[i].teamid){
             a.splice(j,1);
             j= j-1;
           }
         }
       }
       return a;
    },
    // 打开弹窗
    
    //关闭弹窗
    handleClose() {
      this.$emit('dialogClose')
    },

    submit() {
      console.log(this.value);
      sessionStorage.setItem("teamname", JSON.stringify(this.value));
      if (this.value == "") {
        this.$message.closeAll();
        this.$message({
          message: "请先选择团队",
          type: "warning",
          duration: 1500
          // offset:200
        });
      } else {
        if (this.title == "新增任务") {
          this.$emit('dialogClose')
          const routeData = this.$router.resolve({
            path: "/addTask",
            query:{
             flag: 'new'
            }
          });
          window.open(routeData.href, "_blank");
          // this.$router.push('/addTask')
        } else {
          this.addTask.teamid = JSON.parse(sessionStorage.getItem("teamId"));
          this.addTask.teamname = JSON.parse(
            sessionStorage.getItem("teamname")
          );
          // console.log(this.addTask)
          this.$post
            .postData(
              "saveTeamWork",
              JSON.stringify(this.addTask),
              this.$businessCode.rwgl
            )
            .then(res => {
              console.log(res);
              // this.options = res.data;
              this.$emit('dialogClose')
              this.$parent.getTeamList();
              this.value = "";
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    checkchange(val) {
      console.log(val);
      var obj = {};
      obj = this.options.find(item => {
        return item.teamName === val;
      });
      console.log(obj);
      sessionStorage.setItem("teamId", JSON.stringify(obj.id));
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  height: 300px;
}
</style>