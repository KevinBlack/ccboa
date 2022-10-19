<template>
  <div class="transer">
    <el-dialog title="转交" :visible.sync="transferVisible" @close="cancelTransfer">
      <div class="tip" v-if="showTip">提示：“{{TransUserName}}”有未办结的派发任务，请办结派发任务后，再进行人员删除操作！</div>
      <div>
        
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          class="scroll"
          height="400"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" fixed label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="taskname" label="任务名称"></el-table-column>
          <el-table-column prop="createname" label="派发人"></el-table-column>
          <el-table-column prop="person" label="责任人"></el-table-column>
          <el-table-column label="转交">
            <template slot-scope="scope">
              <el-button
                :disabled="showTip"
                type="text"
                @click="transShowTree(scope.$index, scope.row)"
              >{{scope.row.btn}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="table_parmas.page"
            :page-sizes="[2, 4, 10, 20]"
            :page-size="table_parmas.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          ></el-pagination>
        </div>-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit" v-if="!showTip">确定</el-button>
        <el-button type="primary" @click="cancelTransfer">取消</el-button>
      </div>
    </el-dialog>
    <TreeTrans
      :subdialogTit="subdialogTit"
      :teampersonId="teampersonId"
      :subsingelCheckF="subsingelCheckF"
      :TransFerTeamId="TransFerTeamId"
      @subshowCompDialog="subshowCompDialog"
      v-if="showTreeTrans"
    ></TreeTrans>
  </div>
</template>

<script>
import TreeTrans from "./tree-trans";
export default {
  props: ["TransFerId", "TransFerTeamId","TransUserId","TransUserName"],
  data() {
    return {
      findByCreateNameOrPersonToTable_parmas: {
        function: "findByCreateNameOrPersonToTable",
        id: "",
        teamId: "",
        userId:''
      },
      returnTransferOrder_parmas: {
        function: "returnTransferOrder",
        taskOrderId: "",
        transfercause: "删除人员时，该人员有任务为处理 ",
        personid: "",
        person: ""
      },
      teamMember_deleteById_parmas: {
        function: "teamMember_deleteById",
        ids: ""
      },
      tableData: [],
      transferVisible: true,
      subsingelCheckF: true, // 单选true 多选为false
      subdialogTit: "任务负责人", // 弹框标题
      showTreeTrans: false,
      chooseObj: {},
      multipleTable: [],
      chooseIndex: "", //当前选择转交的 index
      teampersonId:'',
      showTip:false
    };
  },
  components: {
    TreeTrans
  },
  created() {
    this.findByCreateNameOrPersonToTable_parmas.id = this.TransFerId;
    this.findByCreateNameOrPersonToTable_parmas.teamId = this.TransFerTeamId;
    this.findByCreateNameOrPersonToTable_parmas.userId = this.TransUserId;
    console.log(this.findByCreateNameOrPersonToTable_parmas);
    this.getTabelData();
  },
  methods: {
    getTabelData() {
      this.$post
        .postData(
          "findByCreateNameOrPersonToTable",
          JSON.stringify(this.findByCreateNameOrPersonToTable_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.tableData.forEach((item, index) => {
            this.$set(this.tableData[index], "btn", "转交");
            this.$set(this.tableData[index], "id", "");
          });
         this.showTip = this.tableData.some(item => {
            return item.createUserId == this.TransUserId
          })
          // console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
      console.log(this.multipleTable);
    },
    cancelTransfer() {
      this.$emit("showComTranfer");
    },
    transShowTree(index, row) {
      console.log(row)
      this.teampersonId = row.teamid+","+row.personid
      console.log(this.teampersonId)
      this.showTreeTrans = true;
      this.chooseIndex = index;
    },
    subshowCompDialog(data, type) {
      if (type) {
        this.chooseObj = data[0];
        console.log(this.chooseObj);
        this.showTransuser();
      }
      this.showTreeTrans = false;
    },
    showTransuser() {
      if (this.multipleTable.length == 0) {
        console.log(this.tableData[this.chooseIndex].btn, this.chooseObj.text);
        // this.tableData[this.chooseIndex].btn = this.chooseObj.text
        this.$set(this.tableData[this.chooseIndex], "btn", this.chooseObj.text);
        this.$set(this.tableData[this.chooseIndex], "id", this.chooseObj.id);
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          for (let j = 0; j < this.multipleTable.length; j++) {
            if (
              this.tableData[i].taskOderId == this.multipleTable[j].taskOderId
            ) {
              this.$set(this.tableData[i], "btn", this.chooseObj.text);
              this.$set(this.tableData[i], "id", this.chooseObj.id);
            }
          }
        }
      }
    },
    submit() {
      let haveZ = this.tableData.some(item => {
        if (item.btn == "转交") {
          return true;
        }
      });
      if (haveZ) {
        this.$message({
          showClose: true,
          message: "还有未转交的流转中的任务，请转交",
          type: "warning"
        });
      } else {
        var count=0;
        for (let i = 0; i < this.tableData.length; i++) {
          let Transfer_parmas = {}
          Transfer_parmas.taskOrderId = this.tableData[i].taskOderId;
          Transfer_parmas.personid = this.tableData[i].id;
          Transfer_parmas.person = this.tableData[i].btn;
          this.returnTransferOrder_parmas.taskOrderId = Transfer_parmas.taskOrderId
          this.returnTransferOrder_parmas.personid = Transfer_parmas.personid
          this.returnTransferOrder_parmas.person = Transfer_parmas.person
            console.log(this.returnTransferOrder_parmas);
            this.$post.postData(
            "returnTransferOrder",
            JSON.stringify(this.returnTransferOrder_parmas),
            this.$businessCode.rwgl
          )
          .then(res => {
            if(res.success){
              count++
            }
            console.log(count)
            if(count==this.tableData.length){
              console.log('删除')
              this.toDelete()
            }
          })
          .catch(err => {
            console.log(err);
            this.$message({
              showClose: true,
              message: err,
              type: "warning"
            });
          });
        }

        // taskOrderId:'',
        // transfercause: '删除人员时，该人员有任务为处理 ',
        // personid:'',
        // person: ''
      }
    },
    toDelete() {
      this.teamMember_deleteById_parmas.ids = this.TransFerId;
      this.$post
        .postData(
          "teamMember_deleteById",
          JSON.stringify(this.teamMember_deleteById_parmas),
          this.$businessCode.tdgl
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$emit("showComTranfer")
            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped>
.transer ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  display: inline-block;
}
.tip{
  margin-bottom: 15px;
  margin-top: -15px;
  color: #f00;
}
</style>