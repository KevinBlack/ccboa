<!--
 * @Author: your name
 * @Date: 2020-07-31 15:50:38
 * @LastEditTime: 2020-08-01 15:54:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\meetingYd.vue
-->
/**
* create by zz on 2020/7/31 16:00
* 类注释：
* 备注：
*/
<template>
  <div class="meetingYd">
    <div class="flex-row linehead">
      <el-button class="btn-style" @click="buttonClick('today')">今日: {{ dateText }}</el-button>
      <div class="flex-row">
        <div class="flex-row typebox">
          <div class="typecell">
            <span class="box upDateState1"></span>可用
          </div>
          <div class="typecell">
            <span class="box upDateState2"></span>审批中
          </div>
          <div class="typecell">
            <span class="box upDateState3"></span>被占用
          </div>
          <div class="typecell">
            <span class="box upDateState4"></span>不可预订
          </div>
        </div>
        <el-button
          type="primary"
          :disabled="currentIndex==0"
          @click="buttonClick('up')"
          size="mini"
        >上一周
        </el-button>
        <el-button
          type="primary"
          @click="buttonClick('next')"
          size="mini"
        >下一周
        </el-button>
      </div>
    </div>

    <div style="margin-top: 10px;">
      <el-table
        border
        :data="meetHomeList"
        class="table-meeting"
        max-height="800"
        header-row-class-name="thead-meeting"
        row-class-name="tbody-row"
        :cell-style="{padding:0}"
      >
        <el-table-column align="center" label="一周会议室安排情况">
          <el-table-column
            fixed
            label="会议室名称"
            align="center"
            min-width="335"
            resizable
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div
                @click.stop="meetingRoomDetail(scope.row.roomId)"
              >{{scope.row.roomName}}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            v-for="index in 7" :key="index"
            >
            <template slot="header" slot-scope="scope">
              <p>{{weekDayList[index-1].weekText}}</p>
              <p>{{'('+weekDayList[index-1].day+')'}}</p>
            </template>
            <el-table-column
              :index="index-1"
              align="center"
              min-width="50"
              label="上午">
              <template slot-scope="scope">
                <el-tooltip popper-class="cell-tooltip" placement="top-end" effect="light" v-if="scope.row.children[weekDayList[index-1].day].am.details">
                  <div slot="content" v-if="isMeetManager || (!isMeetManager && scope.row.children[weekDayList[index-1].day].am.details.isFlow)">
                    <el-row>
                      <el-col :span="4" class="tl">会议时间: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.meetTime}}</el-col>
                      <el-col :span="4" class="tl">会议类型: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.meetType}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">会议名称: </el-col>
                      <el-col :span="20" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.meetingName}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">申请部门: </el-col>
                      <el-col :span="20" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.hostDepartment}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">联 系 人: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.orderUserName}}</el-col>
                      <el-col :span="4" class="tl">联系电话: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.orderUserPhon}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">参会领导: </el-col>
                      <el-col :span="20" class="tr">{{scope.row.children[weekDayList[index-1].day].am.details.attendUsers}}</el-col>
                    </el-row>
                  </div>
                  <div slot="content" v-else>
                    <p>已被 {{scope.row.children[weekDayList[index-1].day].am.details.hostDepartment}} 占用,联系人:{{scope.row.children[weekDayList[index-1].day].am.details.orderUserName}},联系电话：{{scope.row.children[weekDayList[index-1].day].am.details.orderUserPhon}}</p>
                  </div>
                  <div
                    :class="{upDateState1:scope.row.children[weekDayList[index-1].day].am.state=='2', upDateState2:scope.row.children[weekDayList[index-1].day].am.state=='0',
                upDateState3:scope.row.children[weekDayList[index-1].day].am.state=='1',upDateState4:scope.row.children[weekDayList[index-1].day].am.state=='4',}"
                    @click.stop="opendialog(scope.row,scope.row.children[weekDayList[index-1].day].am,'am',weekDayList[index-1].day)"
                  ></div>
                </el-tooltip>
                <div
                  v-else
                  :class="{upDateState1:scope.row.children[weekDayList[index-1].day].am.state=='2', upDateState2:scope.row.children[weekDayList[index-1].day].am.state=='0',
                upDateState3:scope.row.children[weekDayList[index-1].day].am.state=='1',upDateState4:scope.row.children[weekDayList[index-1].day].am.state=='4',}"
                  @click.stop="opendialog(scope.row,scope.row.children[weekDayList[index-1].day].am,'am',weekDayList[index-1].day)"
                ></div>
              </template>
            </el-table-column>
            <el-table-column
              :index="index-1"
              align="center"
              min-width="50"
              label="下午">
              <template slot-scope="scope">
                <el-tooltip popper-class="cell-tooltip" placement="top-end" effect="light" v-if="scope.row.children[weekDayList[index-1].day].pm.details">
                  <div slot="content" v-if="isMeetManager || (!isMeetManager && scope.row.children[weekDayList[index-1].day].pm.details.isFlow)">
                    <el-row>
                      <el-col :span="4" class="tl">会议时间: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.meetTime}}</el-col>
                      <el-col :span="4" class="tl">会议类型: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.meetType}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">会议名称: </el-col>
                      <el-col :span="20" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.meetingName}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">申请部门: </el-col>
                      <el-col :span="20" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.hostDepartment}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">联 系 人: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.orderUserName}}</el-col>
                      <el-col :span="4" class="tl">联系电话: </el-col>
                      <el-col :span="8" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.orderUserPhon}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4" class="tl">参会领导: </el-col>
                      <el-col :span="20" class="tr">{{scope.row.children[weekDayList[index-1].day].pm.details.attendUsers}}</el-col>
                    </el-row>
                  </div>
                  <div slot="content" v-else>
                    <p>已被 {{scope.row.children[weekDayList[index-1].day].pm.details.hostDepartment}} 占用,联系人:{{scope.row.children[weekDayList[index-1].day].pm.details.orderUserName}},联系电话：{{scope.row.children[weekDayList[index-1].day].pm.details.orderUserPhon}}</p>
                  </div>
                  <div
                    :class="{upDateState1:scope.row.children[weekDayList[index-1].day].pm.state=='2', upDateState2:scope.row.children[weekDayList[index-1].day].pm.state=='0',
                upDateState3:scope.row.children[weekDayList[index-1].day].pm.state=='1',upDateState4:scope.row.children[weekDayList[index-1].day].pm.state=='4',}"
                    @click.stop="opendialog(scope.row,scope.row.children[weekDayList[index-1].day].pm,'pm',weekDayList[index-1].day)"
                  ></div>
                </el-tooltip>
                <div
                  v-else
                  :class="{upDateState1:scope.row.children[weekDayList[index-1].day].pm.state=='2', upDateState2:scope.row.children[weekDayList[index-1].day].pm.state=='0',
                upDateState3:scope.row.children[weekDayList[index-1].day].pm.state=='1',upDateState4:scope.row.children[weekDayList[index-1].day].pm.state=='4',}"
                  @click.stop="opendialog(scope.row,scope.row.children[weekDayList[index-1].day].pm,'pm',weekDayList[index-1].day)"
                ></div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="ces-pagination">
      <el-pagination
        background
        layout="total,prev, pager, next,sizes,jumper"
        :current-page.sync="pagination.pageNum"
        @current-change="getMeetRooms"
        :page-size.sync="pagination.pageSize"
        :total="pagination.total"
        @size-change="getMeetRooms"
        :page-sizes="[10,15,20,25,30]"
      ></el-pagination>
    </div>
    <el-dialog v-dialogDrag title="提示" :visible.sync="dialog1Visible" width="30%">
      <div style="text-align:center;">{{ tishi }}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog1Visible=false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag title="会议室预订申请信息" :visible.sync="dialog2Visible" width="60%">
      <div>
        <tTable
          :isBorder="true"
          :isIndex="true"
          :isPagination="false"
          :pagination="dialogPagination"
          :sortable="false"
          :tableData="tableData"
          :tableCols="tableCols"
          @refresh="getYdList"
        ></tTable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog2Visible=false">确 定</el-button>
      </div>
    </el-dialog>
    <!--选择部门-->
    <el-dialog
      v-dialogDrag
      :visible.sync="showChosDept"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="选择部门"
    >
      <el-form>
        <el-form-item>
          <el-select v-model="bank_chosDept.deptName" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in deptArr"
              :key="item.humanId"
              :label="item.currUnitName"
              :value="item.currUnitName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showChosDept = false">取 消</el-button>
        <el-button type="primary" @click="selectBumen(bank_chosDept.deptName)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tTable from "@/components/table/tTable";
import $intent from "@/util/intent";

export default {
  name: "meetingYd",
  components: {
    tTable
  },
  data() {
    return {
      activeDay: "",
      searchWeek:[],
      times: [],
      meetHomeList: [],
      weekDayText: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      currentIndex: 0,
      weekDayList: [],
      deptArr: [], //部门下拉列表
      dateText: "",
      // 分页数据
      pagination: {
        pageSize: 20,
        pageNum: 1,
        total: 1
      },
      dialogSearch: {
        function: "getOrderlist",
        roomId: "",
        roomName: "",
        cteateDate: "",
        meetStartTime: "",
        meetEndTime: "",
        page: 1,
        total: 0,
        limit: 20
      },
      dialogPagination: {
        pageSize: 10,
        pageNum: 1,
        total: 1
      },
      tishi: "已过时间，请选择其他时间！",
      dialog1Visible: false,
      dialog2Visible: false,
      showChosDept: false,
      tableCols: [
        {prop: "hostDepartment", label: "申请部门"},
        {prop: "orderUserName", label: "联系人"},
        {prop: "orderUserPhon", label: "联系电话"},
        {prop: "useTime", label: "使用时间/h", width: '180px'},
        {prop: "crrentLink", label: "当前环节"},
        {prop: "orderStatus", label: "申请状态"} //2可用   0审批中   1被占用   4不可预订
      ],
      tableData: [],
      bank_chosDept: {
        deptName: "", //主办部门
        roomName: "", //会议室名称
        address: "", //会议室位置
        meetStartTime: "" ,//会议室预约开始时间
        meetUseDate: "" ,//会议室使用时间
      },
      isMeetManager:false,//是否会议室管理员岗位
    };
  },
  computed: {},
  methods: {
    getWeekDay(type) {
      if (type == "next") {
        this.currentIndex = this.currentIndex + 7;
      } else if (type == "up") {
        this.currentIndex = this.currentIndex - 7;
      }else if(type == "today"){
        this.currentIndex =0;
      }
      this.weekDayList = [];
      this.searchWeek = [];
      for (let i = this.currentIndex; i < this.currentIndex + 7; i++) {
        let data = this.getTime(i);
        this.weekDayList.push(data);
        this.searchWeek.push(data.day);
      }
    },
    getTime(n) {
      let now = new Date();
      let day = now.getDay(); //返回星期几的某一天;
      n = day == 0 ? 6 - n : day -1- n;
      now.setDate(now.getDate() - n);
      let year = now.getFullYear();
      let date = now.getDate();
      let month = now.getMonth() + 1;
      let daytext =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (date < 10 ? "0" + date : date);
      return {weekText:this.weekDayText[now.getDay()],day:daytext};
    },
    buttonClick(params) {
      switch (params) {
        case "up":
          this.getWeekDay("up");
          break;
        case "next":
          this.getWeekDay("next");
          break;
        case "today":
          this.getWeekDay("today");
          break;
      }
      this.pagination = {
        pageSize: 20,
        pageNum: 1,
        total: 1
      };
      this.getMeetRooms();
    },
    opendialog(roomInfo,obj,time,useday) {
      let pageData;
      let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
      if(obj.state != "2"){
        if(obj.details.id && routeId.includes(obj.details.id)){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 1500,
          })
          return;
        }  
      }
        

      //2可用   0审批中   1被占用   4不可预订
      if (obj.state == "4") {
        this.dialog1Visible = true;
        this.tishi = obj.message;
      } else if (obj.state == "1" || obj.state == "0") {
        /*this.dialog2Visible = true;
        this.dialogSearch = {
          function: "getOrderlist",
          roomId: roomInfo.roomId,
          roomName: roomInfo.roomName,
          cteateDate: useday,
          meetStartTime: time=='am'?'00:00':'12:00',
          meetEndTime: time=='am'?'12:00':'24:00',
          page: this.dialogPagination.pageNum,
          total: this.dialogPagination.total,
          limit: this.dialogPagination.pageSize
        };
        this.getYdList();*/
        if(this.isMeetManager){
          if(obj.state == "1"){
            pageData={
              id:obj.details.id,
              orderStatu:'3',
              roomId:obj.details.roomId
            };
            this.goNewPage("/meeting/yd/blueDetail1", pageData);
          }else if(obj.state == "0" && !obj.details.isPcsProcessor){
            pageData={
              id:obj.details.id,
              orderStatu:'2',
              roomId:obj.details.roomId
            };
            this.goNewPage("/meeting/yd/blueDetail1", pageData);
          }else{
            pageData={
              id:obj.details.id,
              readFlag:obj.details.readFlag,
              roomId:obj.details.roomId
            };
            this.goNewPage("/meeting/yd/blueDetail", pageData);
          }
        }else{
          if(obj.details.isFlow){
            if(obj.state == "1"){
              pageData={
                id:obj.details.id,
                orderStatu:'3',
                roomId:obj.details.roomId
              };
              this.goNewPage("/meeting/yd/blueDetail1", pageData);
            }else if(obj.state == "0" && !obj.details.isPcsProcessor){
              pageData={
                id:obj.details.id,
                orderStatu:'2',
                roomId:obj.details.roomId
              };
              this.goNewPage("/meeting/yd/blueDetail1", pageData);
            }else{
              pageData={
                id:obj.details.id,
                readFlag:obj.details.readFlag,
                roomId:obj.details.roomId
              };
              this.goNewPage("/meeting/yd/blueDetail", pageData);
            }
          }
        }
      } else {
        if (this.deptArr.length == 1) {
          let pageData = {
            meetUseDate: useday,
            roomName: roomInfo.roomName,
            roomId: roomInfo.roomId,
            address: roomInfo.address,
            meetStartTime: time=='am'?'00:00':'12:00'
          };
          this.goNewPage("/meeting/yd/blueDetail", pageData);
        } else {
          this.bank_chosDept.roomName = roomInfo.roomName;
          this.bank_chosDept.roomId = roomInfo.roomId;
          this.bank_chosDept.address = roomInfo.address;
          this.bank_chosDept.meetStartTime = time=='am'?'00:00':'12:00';
          this.bank_chosDept.meetUseDate=useday;
          this.showChosDept = true;
        }
      }
    },
    //查询会议室预订信息列表
    getYdList() {
      this.tableData = [];
      this.$post
        .postData(
          "getOrderlist",
          JSON.stringify(this.dialogSearch),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.data) {
            this.tableData = res.data.rows;
            this.dialogPagination.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    meetingRoomDetail(roomId) {
      let pageData = {
        status: "2",
        roomId: roomId
      };
      this.goNewPage("/meeting/yd/meetingRoom", pageData);
    },
    goNewPage(path, pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
    initBumen() {
      let transArr =
        (localStorage.getItem("unitInfo") &&
          JSON.parse(localStorage.getItem("unitInfo"))) ||
        [];
      if (transArr.length > 0) {
        transArr.forEach(element => {
          if (element.firstUnitName != element.currUnitName) {
            element.currUnitName =
              element.firstUnitName + "/" + element.currUnitName;
          }
        });
      }
      let userInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      this.curhumanId = userInfo.humanId;
      if (transArr.length > 0) {
        transArr.forEach(element => {
          if (element.unitId == userInfo.unitId) {
            this.deptArr.push(element);
          }
        });
        let curDept = JSON.parse(localStorage.getItem("userInfo")).humanId;
        if (this.deptArr.length > 1) {
          this.deptArr.forEach(element => {
            if (element.humanId == curDept) {
              this.bank_chosDept.deptName = element.currUnitName;
            }
          });
        }
      }
    },
    selectBumen() {
      this.deptArr.forEach(element => {
        if (element.currUnitName == this.bank_chosDept.deptName) {
          this.bank_chosDept.humanId = element.humanId;
        }
      });
      this.$post
        .postData(
          "switchUserInfo",
          JSON.stringify({
            function: "switchUserInfo",
            human_Id: this.bank_chosDept.humanId
          }),
          this.$businessCode.hysyd
        ).then(res => {
        if (res && res.success) {
          this.showChosDept = false;
          let pageData = {
            meetUseDate: this.bank_chosDept.meetUseDate,
            roomName: this.bank_chosDept.roomName,
            roomId: this.bank_chosDept.roomId,
            address: this.bank_chosDept.address,
            meetStartTime: this.bank_chosDept.meetStartTime
          };
          this.goNewPage("/meeting/yd/blueDetail", pageData);
        }
      })
    },
    getMeetRooms() {
      var obj = {
        function: "hys",
        operationType: "9",
        date: JSON.stringify(this.searchWeek).replace(/\[|\]|\"/g,''),
        page: this.pagination.pageNum,
        limit: this.pagination.pageSize
      };
      this.$post
        .postData("hys", JSON.stringify(obj), this.$businessCode.hysyd)
        .then(res => {
          if (res && res.data) {
            this.meetHomeList = res.data.data.rows;
            this.pagination.total = res.data.data.total;
          }
        });
    }
  },
  activated() {
  },
  mounted() {
  },
  created() {
    this.getWeekDay("today");
    let day = new Date().getDay(); //返回星期几的某一天;
    let n = day == 0 ? 6 - day : day - 1;
    this.dateText =
      this.weekDayList[n].day + " " + this.weekDayList[n].weekText;
    let roles = JSON.parse(localStorage.getItem("tcHumanRole"));
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].dicCode == "hysglG") {
        this.isMeetManager = true;
        break;
      }
    }
    this.initBumen();
    this.getMeetRooms();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.meetingYd {
  /deep/.el-table.table-meeting {
    th{
      padding: 0;
      font-size: 15px;
      font-weight: 800;
      background: #c4d9e6;
    }
    .tbody-row {
      td {
        z-index: 1;
        min-height: 48px;
        .cell {
          height: 24px;
          padding: 0!important;
          div {
            min-height: 100%;
            width: 100%;
          }
        }
      }
      td:first-child {
        color: #000;
        font-size: 14px;
        background: #c4d9e6;
      }
      td:hover {
        z-index: 1000;
        box-shadow: 1px 1px 7px 1px #409eff;
      }
    }
    .tbody-row:last-child td {
    }
    .tbody-row:hover td {
      cursor: pointer;
    }
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td,
    .el-table__body tr.hover-row > td,
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #fff !important;
    }
  }
.btn-style{
  color:#000;
}
  .linehead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .box {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #c1c1c1;
      margin-right: 10px;
    }

    .flex-row {
      display: flex;
      flex-direction: row;
    }

    .typebox {
      align-items: center;
      margin-right: 100px;

      .typecell {
        display: flex;
        align-items: center;
        width: 100px;
      }
    }
  }

  .ces-pagination {
    display:block;
    margin-top: 20px;
    text-align: right;
  }
  ::-webkit-scrollbar:horizontal {
    display: block;
    width: 10px !important;
    height: 10px !important;
    background: #cfcfcf;
  }
  ::-webkit-scrollbar-thumb:horizontal{
    background: #409eff;
  }
}

.weekbutton .active {
  background: orange;
  border: 1px solid orange;
}

.upDateState1 {
  background: #fff;
  height: 100%;
}

.upDateState2 {
  background: #ffff00;
  height: 100%;
}

.upDateState3 {
  background: red;
  height: 100%;
}

.upDateState4 {
  background: #c0c0c0;
  height: 100%;
}

td {
  padding: 0;
}
</style>
<style lang="less" rel="stylesheet/less">
.meetingYd {
}

.el-menu-item {
  z-index: 1000;
}

.el-aside {
  z-index: 1002;
}
.cell-tooltip{
  width: 450px;
  .el-row{
    line-height: 1.2;
    font-size: 14px;
    .tl{
      text-align: right;
    }
    .tr{
      text-align: left;
      padding-left: 10px;
    }
  }

}
</style>
