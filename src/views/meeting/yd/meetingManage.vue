<!--
 * @Author: your name
 * @Date: 2020-07-31 15:53:34
 * @LastEditTime: 2020-08-11 14:22:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\query.vue
-->
/**
* create by lxx on 2020/01/18 16:00
* 类注释：
* 备注：会议预订/会议室管理
*/
<template>
  <div class="meetingManage">
    <div class="process_content">
      <div class="contentHeader">
        <el-button type="primary"  size="small"  @click="add">新增会议室</el-button>
      </div>
      <m-table
        @handleCurrentChange="search"
        @handleSizeChange="search"
        @cellClick="option_view"
        size="medium"
        :isIndex="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
    </div>
    <el-dialog v-dialogDrag title="会议室预约信息" :visible.sync="ydDialogVisible" width="90%">
      <div>
        <tTable
          :isBorder="true"
          :isIndex="true"
          :indexWidth="50"
          :isPagination="true"
          :pagination="dialogPagination"
          :pageSizeList=[20,30,50,100,200]
          :sortable="false"
          :tableData="tableData_yd"
          :tableCols="tableCols_yd"
          @refresh="view(ydDialogForm)"
        ></tTable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ydDialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/mTable";
import tTable from "@/components/table/tTable";
export default {
  name: "meetingManage",
  components: {
    mTable,tTable
  },
  data() {
    return {
      ydDialogVisible:false,//会议室预约列表弹窗
      // 分页数据
      pagination: {
        limit: 20,
        page: 1,
        total: 1
      },
      tableCols: [
        { prop: "roomName", label: "会议室名称",align:'center',width:300 },
        /*{ prop: "roomType", label: "会议室类型",align:'center',formatter:(row, column, cellValue, index)=>{
          let val='';
          this.meetingRoomTypeList.map(item=>{
            if(item.value==row.roomType){
              val=item.label
            }
          })
          return val
        } },*/
        { prop: "roomSeat", label: "座位数",align:'center'},
        { prop: "maxRong", label: "最大容纳人数",align:'center'},
        { prop: "address", label: "位置" ,align:'center'},
        { prop: "roomState", label: "状态",align:'center',formatter:function(item){
          if(item.roomState=='0'){
            return '已启用'
          }else{
            return '已禁用'
          }

        } },
        { prop: "advanceTime", label: "提前预订(天)",align:'center' },
        { prop: "approvalTime", label: "审批时限(天)",align:'center'},
        { prop: "roomAdmin", label: "联系人",align:'center' },
        { prop: "roomPhone", label: "联系电话",align:'center' },
        {
          label: "操作",
          align: "center",
          type: "Button",
          width: "200",
          btnList: [
            {
              type: "text",
              label: "编辑",
              handle: this.edit
            },
            {
              type: "text",
              label: "禁用",
              handle: this.stopBtn,
              isShow:item=>{
                if(item.roomState=='0'){
                  return true;
                }else{
                  return false;
                }
              }
            },
            {
              type: "text",
              label: "启用",
              handle: this.stopBtn,
              isShow:item=>{
                if(item.roomState=='0'){
                  return false;
                }else{
                  return true;
                }
              }
            },
            {
              type: "text",
              label: "删除",
              handle: this.del
            },
            {
              type: "text",
              label: "查看预约",
              handle: this.view
            }
          ]
        }
      ],
      tableData: [],
      tableCols_yd:[
        { prop: "meetingName", label: "会议名称" },
        { prop: "roomName", label: "会议室名称" },
        { prop: "meetType", label: "会议类型",width:120 },
        { prop: "useTime", label: "使用时间",width:200 },
        { prop: "cteatTime", label: "申请日期",width:150 },
        { prop: "orderUserName", label: "申请人" },
        { prop: "orderUserPhon", label: "申请人联系方式" },
        { prop: "hostDepartment", label: "主办部门" },
        { prop: "orderStatus", label: "当前状态" },
      ],
      tableData_yd: [],
      dialogPagination: {
        pageNum: 1,
        pageSize: 20,
        total: 1
      },
      ydDialogForm:{
        roomId:''
      },
      meetingRoomTypeList: [
        { label: "小会议室", value: "1" },
        { label: "中会议室", value: "2" },
        { label: "大会议室", value: "3" },
        { label: "VIP会议室", value: "4" }
      ],
    };
  },
  computed: {},
  methods: {
    search() {
      let httpData = {
        function: "hys",
        operationType:'4',
        roomName:'',
        roomType:'',
        ...this.pagination
      };
      sessionStorage.setItem('page_sw',JSON.stringify(this.pagination));
      this.$post
        .postData(
          "hys",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.totalCount;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(erro => {
          this.$message.error("请求失败");
        });
    },
    options(row,type){
      var obj=null;
      switch(type){
        case '1'://编辑
          let pageData = {
            status: "1", //1编辑；2只读
          };
          obj = Object.assign(pageData, row);
          this.goNewPage('/meeting/yd/meetingRoom',obj);
          break
        case '2'://禁用启用
          let httpData = {
            operationType:'10',
            function: "hys",
            roomId:row.roomId,
            roomName:row.roomName,
            roomState:row.roomState=='0'?'1':'0'
          };
          this.$post
            .postData(
              "hys",
              JSON.stringify(httpData),
              this.$businessCode.hysyd
            )
            .then(res => {
              if (res && res.success) {
                this.$message.success("操作成功！");
                this.search();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(erro => {
              this.$message.error("请求失败");
            });
          break
        case '3'://删除
          this.$post
            .postData(
              "hys",
              JSON.stringify({
                operationType: "3",
                function: "hys",
                roomId: row.roomId
              }),
              this.$businessCode.hysyd
            )
            .then(res => {
              if (res && res.success) {
                this.delDialogVisible=false;
                this.$message.success("删除成功！");
                this.search();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(erro => {
              this.$message.error("请求失败");
            });
          break
        case '4'://查看预约
          let fun={
                function: "getOrderlist",
                roomId: row.roomId,
                page:this.dialogPagination.pageNum,
                limit:this.dialogPagination.pageSize,
                total:this.dialogPagination.total,
              };
          this.$post
            .postData(
              "getOrderlist",
              JSON.stringify(fun),
              this.$businessCode.hysyd
            )
            .then(res => {
              if (res && res.data) {
                this.stopDialogVisible=false;
                this.tableData_yd=res.data.rows || [];
                this.dialogPagination.total=res.data.total;
              }
            })
            .catch(erro => {
              this.$message.error("请求失败");
            });
          break
      }
    },
    option_view(row){
      let pageData= {
            status: "2", //1编辑；2只读
          };
      let obj = Object.assign(pageData, row);
      this.goNewPage('/meeting/yd/meetingRoom',obj);
    },
    edit(row) {
      this.options(row,'1');
    },
    stopBtn(row) {
      if(row.roomState=='0'){
        this.$confirm("是否禁用该会议室？禁用后所有该会议室的预约会议将被取消", "提示", {
          confirmButtonText: "禁用",
          cancelButtonText: '取消',
          callback: action => {
            if(action=='confirm'){
              this.options(row,'2');
            }
          }
        });
      }else{
        this.options(row,'2');
      }
    },
    del(row) {
      this.$confirm("是否删除会议室？删除后所有该会议室的预约会议将被取消", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "删除",
          cancelButtonText: '取消',
          callback: action => {
            if(action=='confirm'){
              this.options(row,'3');
            }
          }
        });
    },
    view(row) {
      this.ydDialogVisible=true;
      this.ydDialogForm=row;
      this.options(row,'4');
    },
    add() {
      let pageData = {
        status: "1" //1编辑；2只读
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
  },
  activated() {},
  mounted() {},
  created() {
    if(sessionStorage.getItem('page_sw')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('page_sw')));
    };
    this.search();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.meetingManage {
  margin: 0 auto;
  .meetingManageHeader {
    padding: 8px 70px;
    margin-top: 50px;
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
    width: 100%;
    min-height: 920px;
    padding: 0px 16px;
    margin: 0 auto;
    .contentHeader {
      margin-bottom: 10px;
    }
    /deep/.el-table{
      overflow: scroll;
      ::-webkit-scrollbar:horizontal {
        display: block;
        width: 10px !important;
        height: 10px !important;
        background: #cfcfcf;
      }
    }
  }
}
</style>
<style>
  .meetingManage .el-dialog {
    width: 90% !important;
    max-width: none;
  }
</style>
