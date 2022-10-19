<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>会议主办单</span>
      </div>
      <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          v-show="buttonList[index].show"
          :key="index"
          size="mini"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行行长办公会议主办单</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <el-form ref="elForm" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人" prop="draftUser">
              <el-input v-model="formData.draftUser" :disabled="isQc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model.number="formData.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期" prop="draftDate">
              <el-input v-model="formData.draftDate" :disabled="isQc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会议时间" prop="hyTimeStr">
                <!-- <el-date-picker
              v-model="formData.hyTimeStr"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                default-time="09:00:00"
                :style="{width:'100%'}"
                @change="$forceUpdate()" 
              ></el-date-picker> -->
               <el-date-picker
            v-model="formData.hyTimeStr"
            type="datetime"
            @input="datetimeChange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
    </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 选择会议地点 -->
          <el-col :span="12">
            <el-form-item label="会议地点" prop="hyAdress">
              <el-input
                v-model="formData.hyAdress"
                placeholder="请选择"
                @focus="dialogMeeting = true"
              />
              <el-dialog title="会议室" :visible.sync="dialogMeeting">
                <el-table
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}"
                  :data="gridDatadd"
                  @selection-change="handleSelectionChange"
                  ref="hYmultipleTable"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column property="meetingRoom" label="会议室名称" width="150"></el-table-column>
                  <el-table-column property="equipment" label="会议室设备" width="200"></el-table-column>
                  <el-table-column property="seatNum" label="座位数" width="200"></el-table-column>
                  <el-table-column property="linkman" label="会议室联系人" width="200"></el-table-column>
                  <el-table-column property="tel" label="会议室联系电话"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogMeeting = false">取 消</el-button>
                  <el-button type="primary" @click="getSelected()">确 定</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议候场地点" prop="hyHcdd">
          <el-input v-model="formData.hyHcdd"></el-input>
        </el-form-item>
        <el-form-item label="主持人" prop>
          <el-input class="left" v-model="formData.zcName" style="width:91%"></el-input>
          <el-button class="right" @click="selectZcPerson" type="primary" size="large">选择</el-button>
        </el-form-item>
        <!-- 出席 -->
        <el-form-item label="出席">
          <el-row :span="24" style="margin-bottom:20px">
            <el-col :span="2">
              <div class="tooltip">
                <span>行领导</span>
              </div>
            </el-col>
            <el-col :span="22">
              <div class="leaders">
                <el-input class="left" v-model="leaders" style="width:90%"></el-input>
                <el-button
                  class="right"
                  @click="selectPerson('行领导')"
                  type="primary"
                  size="medium"
                >选择</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="2">
              <div class="tooltip">
                <span>行高管</span>
              </div>
            </el-col>
            <el-col :span="22">
              <div class="leaders">
                <el-input class="left" v-model="manage" style="width:90%"></el-input>
                <el-button
                  class="right"
                  @click="selectPerson('行高管')"
                  type="primary"
                  size="medium"
                >选择</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row :span="24" style="margin-bottom:20px">
          <div style="float:right;">
            <el-button
              class="right"
              @click="addBank"
              type="primary"
              size="medium"
              style="margin-left:10px"
            >添加</el-button>
            <el-button class="right" type="primary" size="medium">删除</el-button>
          </div>
        </el-row>
        <el-form-item label="缺席">
          <!-- 行领导 -->
          <div class="bankLeaders" v-for="(item,index) in bankList" :key="index">
            <el-row :span="24" style="margin-bottom:20px">
              <el-col :span="2">
                <div class="tooltip">
                  <span>行领导</span>
                </div>
              </el-col>
              <el-col :span="22">
                <el-row :span="24" type="flex" justify="space-between">
                  <el-col :span="10">
                    <el-row type="flex" justify="space-around">
                      <el-col :span="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                      </el-col>
                      <el-col :span="2">
                        <div class="tooltip">
                          <span>领导</span>
                        </div>
                      </el-col>
                      <el-col :span="19">
                        <el-input v-model="leaders1" class="input-with-select">
                          <el-button slot="append" icon="el-icon-arrow-down"></el-button>
                        </el-input>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="13">
                    <el-row type="flex" justify="space-around">
                      <el-col :span="3">
                        <div class="tooltip">
                          <span>缺席原因</span>
                        </div>
                      </el-col>
                      <el-col :span="20">
                        <el-input class="left" v-model="formData.qxReason" style="width:100%"></el-input>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <!-- 行高管 -->
          <el-row :span="24" style="margin-bottom:20px">
            <el-col :span="2">
              <div class="tooltip">
                <span>行高管</span>
              </div>
            </el-col>
            <el-col :span="22">
              <el-row :span="24" type="flex" justify="space-between">
                <el-col :span="10">
                  <el-row type="flex" justify="space-around">
                    <el-col :span="1">
                      <el-checkbox v-model="checked"></el-checkbox>
                    </el-col>
                    <el-col :span="2">
                      <div class="tooltip">
                        <span>高管</span>
                      </div>
                    </el-col>
                    <el-col :span="19">
                      <el-input v-model="mange1" class="input-with-select">
                        <el-button slot="append" icon="el-icon-arrow-down"></el-button>
                      </el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="13">
                  <el-row type="flex" justify="space-around">
                    <el-col :span="3">
                      <div class="tooltip">
                        <span>缺席原因</span>
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <el-input class="left" v-model="qxReason" style="width:100%"></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <div class="right">
            <el-button type="primary" size="mini" plain @click="create_new">新增议题</el-button>
            <el-button type="primary" size="mini" plain @click="adviseUpMove">上移</el-button>
            <el-button type="primary" size="mini" plain @click="adviseDownMove">下移</el-button>
            <el-button type="primary" size="mini" plain @click="adviseDel">删除</el-button>
            <el-button type="primary" size="mini" plain @click="adviseDel">查看参会部门流程</el-button>
            <el-button type="primary" size="mini" plain @click="back">退回</el-button>
            <el-button type="primary" size="mini" plain @click="lookBack">查看退回情况</el-button>
          </div>
        </el-form-item>
        <!-- 会议内容 -->
        <el-form-item label="会议内容">
          <el-table
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :data="opinionFldData"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
            @select="adviseSelect"
            ref="hynRmultipleTable"
            border
            style="width: 100%"
          >
            <!-- :data="bmTableData"
            @row-click="getDetails"
            @select="handleSelectionChange1"
            border
            ref="multipleTable"-->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="议题序号" width="100"></el-table-column>
            <el-table-column prop="ytMc" label="议题名称" width="150"></el-table-column>
            <el-table-column prop="deptName" label="主汇报部门" width="150"></el-table-column>
            <el-table-column prop="strZhbr" label="主汇报人" width="150"></el-table-column>
            <el-table-column prop="attach" label="会议材料" width="150">
              <!-- <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  align="center"
                  @click="handleEdit(scope.$index, scope.row)"
                >上传</el-button>
              </template>-->
              <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
            </el-table-column>
            <el-table-column prop="strLxName" label="列席部门">
              <!-- <template slot-scope="scope">
                 <el-input v-model="scope.row.strLxName"></el-input>
                <el-button0
                  size="mini"
                   type="text"
                  @click="handleEdit(scope.$index, scope.row)">上传</el-button0>
              </template>-->
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.strLxName"
                  @focus="handleEdit(scope.$index, scope.row)"
                  @blur="onExchangeChange(scope.$index)"
                  :data-price="scope.row.price"
                  @input="change(scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 报名信息 -->
        <el-form-item label="报名信息">
          <div style="height:40px">
            <div class="right">
              <el-button size="mini" type="primary" @click="saveBm">保存</el-button>
              <el-button size="mini" type="primary" @click="editBm">编辑</el-button>
              <el-button type="primary" size="mini">生成请假单</el-button>
               <el-button size="mini" type="primary">生成联系单</el-button> 
            </div>
          </div>
          <!-- <div> -->
          <el-row style="margin-bottom:15px">
            <el-col :span="1">
              <span class="dou">董事</span>
            </el-col>
            <el-col :span="23">
              <el-input v-model="formData.lxDs" placeholder="请输入董事姓名" />
            </el-col>
          </el-row>
          <el-row style="margin-bottom:17px">
            <el-col :span="1">
              <span class="dou">监事</span>
            </el-col>
            <el-col :span="23">
              <el-input v-model="formData.lxJs" placeholder="请输入董事姓名" />
            </el-col>
          </el-row>
          <!-- </div> -->
          <!-- 报名信息表格 -->
          <el-table
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :data="bmTableData"
            @row-click="getDetails"
            @select="handleSelectionChange1"
            border
            ref="multipleTable"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" prop="ytOrderNum" label="序号" width="100"></el-table-column>
            <el-table-column prop="ytName" label="议题名称" width="130"></el-table-column>
            <el-table-column prop="lxDeptName" label="部门" width="130"></el-table-column>
            <el-table-column prop="chName" label="姓名" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.chName" placeholder="姓名" :disabled="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="isPersonInCharge" label="是否为本部门主要负责人" width="180"  align='center'>
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isPersonInCharge" size="mini">
                  <el-radio-button :disabled="scope.row.type" :label="1">是</el-radio-button>
                  <el-radio-button :disabled="scope.row.type" :label="2">否</el-radio-button>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="leaveReason" label="部门主要负责人请假理由" width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.leaveReason" :disabled="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="chCellphone" label="手机号码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.chCellphone" :disabled="scope.row.type"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <!-- 选择人员树-->
      <select-person
        :treeData="treeData"
        :loadingTree="true"
        :seletOptionsData="seletOptionsData"
        :offenUse="offenUse"
        :dialogType="dialogType"
        :dialogTypeNow="dialogTypeNow"
        dialogTit="选择"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        @showCompDialog="showCompDialog"
      />
      <!-- 选择议题表格 -->
      <el-dialog title="选择议题" :visible.sync="selectYitiVisible">
        <div style="margin: 15px 0">
          <el-row :span="24">
            <!-- 按日期 -->
            <el-col :span="10">
              <!-- <el-date-picker v-model="value1" type="year" @change="changeYear" placeholder="2020"></el-date-picker>
              <el-date-picker
                    v-model="beginTime"
                    :type="dateType"
                    :picker-options="pickerOptionsBegin"
                    placeholder="开始日期">
                    </el-date-picker>
                    <el-date-picker
                    v-model="endTime"
                    :type="dateType"
                    :picker-options="pickerOptionsBegin"
                    placeholder="结束日期">
              </el-date-picker> -->
              <el-date-picker
                v-model="formData.yTvalue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              {{yTvalue}}
            </el-col>
            <!-- 按主汇报部门 -->
            <el-col :span="10" style="padding-left:15px">
              <el-select v-model="formData.deptName" placeholder="请选择">
                <el-option
                  v-for="item in mainOptions"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
          <!-- @refresh="loadData()" -->
        <m-table
          @select="chooseYt"
          size="medium"
          :tableData="choosetableData"
          :tableCols="choosetableCols"
          :pagination="pagination"
          :isSelection="true"
          :searchData="searchData"
        ></m-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectYitiVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 发送预通知对话框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form :model="preForm">
          <el-form-item label="发送对象" :label-width="formLabelWidth">
            <el-radio v-model="preForm.isMainReport" label="11">议题报送人</el-radio>
            <el-radio v-model="preForm.isMainReport" label="10">部门综合</el-radio>
          </el-form-item>
          <el-form-item label="反馈截止时间" :label-width="formLabelWidth">
            <el-date-picker v-model="preForm.deadLine" type="datetime" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendPre">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 退回预通知弹框 -->
      <el-dialog title="提示" :visible.sync="dialogVisibleBack" width="30%">
        <el-form :model="preForm">
          <el-form-item label="审核意见" :label-width="formLabelWidth">
            <el-input v-model="preForm.isMainReport" label="1">议题报送人</el-input>
          </el-form-item>
          <el-form-item label="反馈截止时间" :label-width="formLabelWidth">
            <el-date-picker v-model="preForm.deadLine" type="datetime" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleBack = false">取 消</el-button>
          <el-button type="primary" @click="back()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectPerson from "components/tree/tree-fawen";
import orgTree from "components/tree/orgTree";
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "conferDetail",
  components: {
    selectPerson,
    mTable,
    orgTree,
    uploadFileTs,
  },
  props: {},
  ///////////////////////////////////////
  data() {
    return {
      yTvalue:[],
      opinionData: [],
      currentTableOrg: {},
      id: "", //主办单id
      //正文模板附件
      uploadConfig: {
        // formId: 'shiwuText',
        // hiddenJson: 'hiddenText',
        // filesHas: [],
        //   textFileHas:[],
        // isSpecial: 6,
      },
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      leaders: "",
      mange: "",
      mange1: "",
      leaders1: "",
      qxReason: "",
      bankList: [{ ldName: "111", qxReason: "222" }],
      isQc: false,
      checked: true,
      editArray: [],
      lxJs: "",
      lxDs: "",
      isPersonInCharge: "1",
      bmTableData: [],
      //  label:"1",
      preForm: {
        deadLine: "",
        isMainReport: "11",
      },
      formLabelWidth: "220px",
      dialogVisible: false,
      dialogVisibleBack: false,
      searchData: {},
      mainOptions: [],
      value: "",
      // gridData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      // ],
      isSubmit: "0",
      submited: "",
      choosetableCols: [
        { label: "序号", prop: "orderNum" },
        { label: "主汇报部门", prop: "deptName" },
        { label: "上报时间", prop: "sbSj" },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName" },
        { label: "联系电话", prop: "tel" },
      ],
      choosetableData: [
        // {deptName:'1',sbSj:'3',ytMc:'4',cur/userChinaName:'5',tel:'6'}
      ],
      selectYitiVisible: false,
      adviseIdx: "", //单击数据行获取到的索引
      opinionFldData: [
        // {ytMc:'议题名称a',deptName:'主汇报部门a',strZhbr:'主汇报人a',strLxName:''}
      ],
      deleteArry: "",
      leader: "",
      manage: "",
      treeData: [],
      seletOptionsData: [],
      offenUse: false,
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: false, // 单选true 多选为false
      dialogState: false, // 默认隐藏选择人员树结构
      dialogType: "",
      dialogTypeNow: "",
      inputValue: "",
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      value1: "",
      hyAdress: "",
      gridDatadd: [ ],//会议室
      dialogMeeting: false,
      dialogFormVisible: false,
      tableData: [],
      search: "",
      firstData: {},
      option1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      buttonList: [
        { name: "关闭", show: true },
        { name: "保存", show: true },
        { name: "发送预通知", show: true },
        { name: "收回预通知", show: true },
        { name: "发送报名通知", show: true },
        { name: "收回报名通知", show: true },
        { name: "发送正式通知", show: true },
        { name: "收回正式通知", show: true },
        // { name: "生成会议单", show: true },
        { name: "删除此文", show: true },
        { name: "操作指南", show: true },
      ],
      formData: {
        hyAdress: "",
      },
      rowData: {},
      jbNm: "",
      sendArry: [],
      addArry: [],
      multipleSelection: [],
      multipleSelection1: [],
      multipleSelection2: [],
      rules: {
        tel: [
          {
            type: "number",
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
        ],
        title: [{ required: true, message: "请输入会议名称", trigger: "blur" }],
        // hyTimeStr: [
        //   { required: true, message: "请填写会议时间", trigger: "blur" },
        // ],
        hyAdress: [
          { required: true, message: "请选择会议地点", trigger: "change" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    datetimeChange(e){
    console.log(e)
    let _this =this
    _this.formData.hyTimeStr = e
    _this.$forceUpdate();
},
    hYplace(){  
         this.$api.secreatary.meeting
          .meetPlace()
          .then((res) => {
            console.log("meetPlace", res);
            this.gridDatadd=res.data
            // this.$message({
            //   type: "success",
            //   message: "发送成功",
            // });
          });
    },
    lookBack() {},
    // 会议内容
    onExchangeChange(index) {
      let tmpObj = this.opinionData[index];
      this.$set(this.opinionFldData, index, tmpObj);
    },
    change(index) {
      console.log("exchange price change");
      // 重新赋值
      // let tmpObj = this.opinionFldData[index];
      let tmpObj = this.opinionFldData[index];
      this.$set(this.opinionFldData, index, tmpObj);
    },
    handleEdit(index, row) {
      console.log(
        "index-----------------------",
        index,
        "row-------------------------",
        row
      );
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "0";
      this.showOrgTree = true;
    },
    // / 选择机构按钮方法
    getOrgList(org) {
      console.log(org);
      console.log(org.unitName);

      // this.$set(this.multipleSelection2, "strLxName", org.unitName);
      // this.$set(this.multipleSelection2, "strLxId", org.id);
    },

    //附件块
    fileList(files) {
      console.log("files", files);
      // if (this.mformData.attchmentFileInfo) {
      //     this.mformData.attchmentFileInfo.push(files)
      // } else {
      //     this.mformData.attchmentFileInfo = files
      // }
      //   if (files[0].shuwuformId == 'shiwuSystem') {
      //       this.sysFlag=false
      //       this.mformData.SysattchmentFileInfo = []
      //       this.mformData.manageSystemName = files[0].fileName
      //       this.mformData.manageSystemPath = files[0].filePath
      //       this.mformData.manageSystemId = files[0].id
      //       this.mformData.SysattchmentFileInfo.push({
      //           fileName: files[0].fileName,
      //           filePath: files[0].filePath,
      //           id: files[0].id,
      //       })
      //       this.GLuploadConfig.sysFileHas=this.mformData.SysattchmentFileInfo

      // } else if (files[0].shuwuformId == 'shiwuText') {
      //     this.textFlag=false
      //   this.mformData.attchmentFileInfo = []
      //   this.mformData.textMoudleName = files[0].fileName
      //   this.mformData.textMoudlePath = files[0].filePath
      //   this.mformData.textMoudleId = files[0].id
      //   this.mformData.attchmentFileInfo.push({
      //     fileName: files[0].fileName,
      //     filePath: files[0].filePath,
      //     id: files[0].id,
      //   })
      //     this.uploadConfig.textFileHas=this.mformData.attchmentFileInfo
      // }
      // this.$forceUpdate()
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "保存":
          this.save_btn();
          break;
        case "发送预通知":
          this.send_btn();
          break;
        case "收回预通知":
          this.back_btn();
          break;
        case "发送报名通知":
          this.sendBm_btn();
          break;
        case "收回报名通知":
          this.backBm_btn();
          break;
        case "发送正式通知":
          this.sendZsBm_btn();
          break;
        case "收回正式通知":
          this.backZs_btn();
          break;
        case "生成会议单":
          this.send();
          break;
        case "删除此文":
          this.del_btn();
          break;
        case "操作指南":
          this.send();
          break;
      }
    },

    //  报名信息
    addBank() {
      this.bankList.push({ ldName: "", qxReason: "" });
    },
    // 发送报名通知
    sendBm_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meeting
          .sendBmNotice({ id: this.id, ytIds: ytIds })
          .then((res) => {
            // console.log("sendBm_btn", res);
            this.$message({
              type: "success",
              message: "发送成功",
            });
          });
      }
    },
    // 收回报名通知
    backBm_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meeting
          .backBmNotice({ id: this.id, ytIds: ytIds })
          .then((res) => {
            this.$message({
              type: "success",
              message: "收回成功",
            });
          });
      }
    },
    // 发送正式通知
    sendZsBm_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meeting
          .sendZsNotice({ id: this.id, ytIds: ytIds })
          .then((res) => {
            this.$message({
              type: "success",
              message: "发送成功",
            });
          });
      }
    },
    // 收回正式通知
    backZs_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meeting
          .backZsNotice({ id: this.id, ytIds: ytIds })
          .then((res) => {
            this.$message({
              type: "success",
              message: "收回成功",
            });
          });
      }
    },
    // 保存报名通知
    saveBm() {
      this.$api.secreatary.meeting
        .updateBm(this.multipleSelection1)
        .then((res) => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.multipleSelection1.type = true;
        });
    },
    // handleSelectionChange2(rows, row){
    //  let dataArry = [];
    //   row.map(function (value, index) {
    //     dataArry.push(value.id);
    //   });
    //   this.addArry = dataArry.join(",");
    //   console.log('---------------------------------chooseYt', this.addArry);
    //    this.$refs.hynRmultipleTable.clearSelection();
    //   this.$refs.hynRmultipleTable.toggleRowSelection(row);
    //   this.multipleSelection2 = row;
    //   console.log( ' this.multipleSelection2',this.multipleSelection2);
    // },

    handleSelectionChange1(rows, row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
      this.multipleSelection1 = row;
      this.bmTableData.forEach((item) => {
        item.type = true;
      });
    },
    getDetails(row) {
      console.log("getDetails", row); //此时就能拿到整行的信息
    },
    // 编辑报名信息
    editBm() {
      let id = this.multipleSelection1.id;
      console.log("ytIds", id);
      this.bmTableData.forEach((item) => {
        // 当前选中的id
        if (item.id == id) {
          item.type = false;
        } else {
          item.type = true;
        }
      });
    },
    //主汇报部门筛选
    mainSelect() {
      this.$api.secreatary.meeting.mainDepartSelect().then((res) => {
        this.mainOptions = res.data;
        // console.log("-----------------", this.mainOptions);
      });
    },
    // 会议内容
    // 新增议题
    create_new() {
      this.selectYitiVisible = true;
      this.mainSelect();
      this.load();
    },
    // 退回
    back() {
      console.log(
        "this.$refs.hynRmultipleTable.selection.length",
        this.$refs.hynRmultipleTable.selection.length
      );

      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else if (ytLength > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条议题",
        });
      } else {
        let ytId = this.$refs.hynRmultipleTable.selection[0].id;
        let feedback = this.$refs.hynRmultipleTable.selection[0].isTicked;
        if (feedback == 1) {
          this.dialogVisibleBack = true;
          this.$api.secreatary.meeting
            .backYiti({ ytId: ytId })
            .then((res) => {});
        } else {
          this.$message({
            type: "warning",
            message: "请选择已反馈的议题",
          });
        }
      }
    },
    load() {
  
      
      this.$api.secreatary.meeting
        .getTopicList(
          { isSubmit: this.isSubmit, ytStatus: "1",startTime:this.formData.yTvalue[0],endTime:this.formData.yTvalue[1]},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total;
          res.data &&
            res.data.map((item) => {
              item.sbSj = formatData(item.sbSj, "YYYY-MM-DD");
              // this.selectArray.push(item.deptName)
            });
          this.choosetableData = res.data;
        });
    },
    chooseYt(row) {
      let dataArry = [];
      row.map(function (value, index) {
        dataArry.push(value.id);
      });
      this.addArry = dataArry.join(",");
      console.log("---------------------------------chooseYt", this.addArry);
    },
    chooseYts(row) {
      let dataArry = [];
      row.map(function (value, index) {
        dataArry.push(value.id);
      });
      this.addArry = dataArry.join(",");
      console.log("---------------------------------chooseYt", this.addArry);
    },
    submit() {
      this.$api.secreatary.meeting
        .newYiti({
          id: this.id, //主办添加议题
          ytIds: this.addArry,
          isAdded: "0",

        },
         {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          console.log(res);
          this.getTable();//
        });
      this.selectYitiVisible = false;
    },
       
    changeYear() {
      //  if(this.formData.hyTime){
      //               this.formData.startDate=this.formData.hyTime[0]
      //               this.formData.endDate=this.formData.hyTime[1]
      //           }
      // console.log(this.value1);
      // let year = this.value1.getFullYear().toString();
      this.$api.secreatary.meeting
        .yearSelect(
          { curYear: year },

          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          console.log("changeYear", res);
          // this.pagination.total = res.total
          // //   res.data&&res.data.map(item=>{
          // //     item.sbSj=formatData(item.sbSj,'YYYY-MM-DD')
          // // })
          // this.choosetableData = res.data
        });
    },
    // 上移下移
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    adviseSelect(rows) {
      //意见域选中行
      this.rows = rows;
      let dataArry = [];
      rows.map(function (value, index) {
        dataArry.push(value.id);
      });
      this.sendArry = dataArry.join(",");
    },
    adviseUpMove() {
      this.makeUpMove(this.rows, this.opinionFldData);
    },
    adviseDownMove() {
      this.makeDownMove(this.rows, this.opinionFldData);
    },
    makeUpMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == 0) {
          this.$message({
            type: "warning",
            message: "第一条数据不可以上移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "上移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据",
        });
        return;
      }
    },
    makeDownMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据",
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == DataName.length - 1) {
          this.$message({
            type: "warning",
            message: "最后一条数据不可以下移！",
          });
          return;
        }
        DataName[index] = DataName.splice(index + 1, 1, DataName[index])[0];
        this.$message({
          title: "成功",
          message: "下移成功",
          type: "success",
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据",
        });
        return;
      }
    },
    // 删除
    adviseDel() {
      let theLength = this.rows.length;
      if (theLength) {
        let startIndex = this.rows[0].index;
        this.opinionFldData.splice(startIndex, theLength);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.rows = [];
      } else {
        this.$message({
          type: "warning",
          message: "请至少选中一条数据",
        });
      }
    },

    onRowClick(row, event, column) {},
    select(row) {
      let dataArry = [];
      row.map(function (value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    // 选人
    selectZcPerson() {
      this.dialogState = true;
      this.singelCheckF = true;
    },
    selectPerson(data) {
      this.dialogState = true; // 显示选择人树结构
      console.log(data);
      switch (data) {
        case "行领导":
          this.lei = 0;
          break;
        case "行高管":
          this.lei = 1;
          break;
      }
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      let receivePersonId = [];
      let selectDataName = [];
      data &&
        data.map((item) => {
          receivePersonId.push(item.id + "_" + item.name + "_" + item.deptId);
          selectDataName.push(item.name);
        });
      //
      if (this.singelCheckF) {
        this.formData.zcName = selectDataName.join(",");
        this.formData.zcNameId = receivePersonId.join(",");
      }
    },
    // 选择会议室
    // 保存选中结果
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.hYmultipleTable.clearSelection();
        this.$refs.hYmultipleTable.toggleRowSelection(val.pop());
      } else {
        this.multipleSelection = val;
      }
    },
    //  获取选中结果
    getSelected() {
      this.$set(this.formData, "hyAdress", this.multipleSelection[0].meetingRoom);
      // this.formData.hyAdress = this.multipleSelection[0].name;
      this.dialogMeeting = false;
      // this.resetForm('elForm')
    },
    //  resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   },
    btnEvent() {},
    //  关闭
    close_btn() {
      this.$confirm("确认关闭？").then(() => {
        this.$router.back();
      });
    },
    // 保存
    save_btn() {
      this.bmTableData.map((item) => {
        item.type = false;
      });
      this.$refs["elForm"].validate((valid) => {
        // this.formData.hyTime= this.formData.hyTime.getTime().toString()
        console.log(this.formData.hyTimeStr);
        if (valid) {
          // this.formData.hyTime = this.formData.hyTime.getTime()
          this.$api.secreatary.meeting
            .saveMain({ ...this.formData })
            .then((res) => {
            this.$message({
            message: "保存成功",
            type: "success",
          });
            });
        }
      });
    },
    sendPre() {
      
      let ytzJzTime = formatData(
        this.preForm.deadLine.getTime(),
        "YYYY-MM-DD HH:mm:ss"
      );
      // draftTime: formatData(new Date().getTime(), "YYYY-MM-DD"),
      this.$api.secreatary.meeting
        .sendPreNotice({
          id: this.id,
          ytIds: this.sendArry,
          isMainReport: this.preForm.isMainReport,
          ytzJzTime: ytzJzTime,
        })
        .then((res) => {
          this.getTable();
          this.$message({
            message: "发送成功",
            type: "success",
          });
         this.dialogVisible = false
        });
    },
    // 发送预通知
    send_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else {
        this.dialogVisible = true;
      }
    },
    // 收回预通知
    back_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题",
        });
      } else {
        this.$api.secreatary.meeting
          .backPreNotice({
            id: this.id,
            ytIds: this.sendArry,
          })
          .then((res) => {
            // this.getTable(); 
            this.$message({
              message: "收回成功",
              type: "success",
            });
          });
      }
    },
    // 删除此文
    del_btn() {
      this.$confirm("是否确定删除当前选中数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api.secreatary.meeting.del({ id: this.id }).then((res) => {
          if (res.code == "SUCCESS") {
            // this.deleteArry = ''
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
          this.$router.back();
          // this.loadData()
        });
      });
    },
    // },

    //设置控制域
    setConfig() {},
    // 加载
    loadData() {
      this.$api.secreatary.meeting.startMainList({}).then((res) => {
        this.id = res.data.id;
        console.log("---------------------------------------------", res);
        console.log("---------------------------res.data.draftDate------------------", res.data.draftDate);
       
        //  res.data &&
        //     res.data.map((item) => {
        //       item.draftDate = formatData(item.draftDate, "YYYY-MM-DD hh:mm:ss");
        //       item.hyTimeStr=formatData(item.hyTime, "YYYY-MM-DD hh:mm:ss");
        //       // this.selectArray.push(item.deptName)
        //     });
        //  this.formData.hyTimeStr = formatData(res.data.hyTime, "YYYY-MM-DD hh:mm:ss");
        //  this.formData.draftDate = formatData(res.data.draftDate, "YYYY-MM-DD HH:mm:ss");
         console.log("---------------------------res.data.draftDate------------------",  parseInt(this.formData.draftDate) );
        this.isQc = true;
      });
    },
    // 获取详情
    getDetail() {
      this.$api.secreatary.meeting
        .getMainDetail({
          id: this.id,
        })
        .then((res) => {
          console.log("---------------------------------------------", res);
          // res.data &&
          // res.data.map((item) => {
          //   item.draftDate = formatData(item.draftDate, "YYYY-MM-DD hh:mm:ss");
          //   item.hyTimeStr=formatData(item.hyTime, "YYYY-MM-DD hh:mm:ss");
          //   // this.selectArray.push(item.deptName)
          // });
          //    this.formData.hyTimeStr = formatData(res.data.hyTime, "YYYY-MM-DD hh:mm:ss");
          //    console.log("***" +  this.formData.hyTimeStr);
           this.formData.draftDate = formatData(res.data.draftDate, "YYYY-MM-DD HH:mm:ss");
          this.formData = res.data;
          console.log("000000", this.formData.hyTimeStr);
        });
    },
    // 获取会议内容
    getTable() {
      this.$api.secreatary.meeting
        .getHyTable(
          {
            tzId: this.id,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.submited = res.data.isSubmit;
          this.opinionFldData = res.data;
          console.log(this.opinionFldData);

          //  this.opinionFldData.map(
          //    function(item,index){
          //       this.opinionData.push(item.strLxName)

          //    }
          // );
          // console.log( this.opinionData);
        });
    },

    // 获取报名信息
    bmTable() {
      this.$api.secreatary.meeting
        .getBmTable({
          tzId: this.id,
        })
        .then((res) => {
          res.data &&
            res.data.map((item) => {
              item.type = true;
            });
          this.submited = res.data.isSubmit;
          this.bmTableData = res.data;
        });
    },
  },
  activated() {},
  mounted() {
    this.hYplace()
  },
  updated() {},
  created() {
    let rowData = JSON.parse(this.$route.query.rowData);
    let type = rowData.type;
    // this.getTable();
    // this.bmTable();

    switch (type) {
      // 起草进入的
      case 0:
        this.loadData();

        break;
      //列表项进入的
      case 1:
        this.id = rowData.id;
        this.getDetail();
        this.getTable();
         this.bmTable();
        break;
    }
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.tooltip {
  color: #606266;
}
.dou {
  font-size: 14px;
  color: #606266;
}
.meetingYd {
  margin: 20px 10%;
}
.header-title {
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
  //   display: flex;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.header {
  font-size: 12px;
  display: flex;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.message {
  line-height: 30px;

  .row {
    display: flex;

    .col-null {
      width: 100px;
      text-align: center;
      border-left: 1px solid #eee;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
    }

    .col {
      flex: 1;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      white-space: nowrap;
    }
    .col:hover {
      background: skyblue;
    }
  }
}
.box {
  display: flex;
  border: 1px solid #dcdfe6;
  padding-bottom: 10px;
  border-radius: 4px;
  .right {
    padding: 10px 10px 0 0;
    flex: 1;
  }
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfTwo {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;

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
    width: 80%;
    // min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          display: inline-block;
          span {
            color: #f9aa21;
          }
        }
      }
    } 
  }
}
.bank_dispach_side_nav {
  width: 45px;
  height: auto;
  position: fixed;
  bottom: 8px;
  left: 10%;
  margin-left: -43px;
  text-align: center;

  a {
    width: 45px;
    height: 70px;
    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    width: 45px;
    height: 70px;
    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    background: #3b85ef;
    color: #fff;
  }
}
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}


</style>
