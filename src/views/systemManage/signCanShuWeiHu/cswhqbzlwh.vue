<template>
  <!-- 参数维护签报种类配置 -->
  <div v-cloak>
    <div class="dispatchcswhqbzlwhpage">
      <el-form label-width="120px" class="mt20">
        <el-row style="margin-bottom: 5px;">
          <el-col :span="8" style="margin-left: 20px;">
            <el-form-item label="机构名称">
              <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="unitName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
          <el-col :span="10" style="margin-left: 20px;">
            <el-button type="primary" size="small" @click="handleLoadData('str')">查询</el-button>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button type="primary" size="small" @click="handleAddData">新建</el-button>
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-col style="margin: 10px 0;">
      <m-table
        size="medium"
        :isSelection="true"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleSelectionChange="handleSelectionChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @cellClick="cellClick"
        v-loading="tableLoading"
        :default-sort="sortDate"
      ></m-table>
      </el-col>
      <el-dialog
        v-dialogDrag
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        title="签报种类配置"
      >
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称" prop="orgName" ref="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字号种类" prop="wordNo" ref="wordNo">
              <el-input v-model="ruleForm.wordNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="文件字头" prop="fileHead" ref="fileHead">
              <el-input v-model="ruleForm.fileHead"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字数限制（字）">
              <el-input
                v-model="ruleForm.fontLimit"
                oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="代字/(红头)" prop="redHead" ref="redHead">
              <el-input v-model="ruleForm.redHead"></el-input>
            </el-form-item>
          </el-col>-->
          <!-- <el-col>
            <el-form-item label="发文单位署名">
              <el-input v-model="ruleForm.orderDeptName"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col>
            <el-form-item label="排序">
              <el-input v-model="ruleForm.sort" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <!-- <el-form-item label="拟稿部门" prop="draftDept" ref="draftDept">
              <el-input v-model="ruleForm.draftDept" disabled>
                <el-button slot="append" @click="getTreeData('draft')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
            <div
              :class="['el-form-item is-required el-form-item--small',{'is-error':!ruleForm.draftDept&& draftDeptCheck}]"
            >
              <label for="draftDept" class="el-form-item__label" style="width: 130px;">联系电话</label>
              <div class="el-form-item__content" style="margin-left: 130px;">
                <div data-v-5283a677 class="el-input el-input--small">
                  <input
                    ref="draftDeptError"
                    @blur="draftDeptChange"
                    type="text"
                    autocomplete="off"
                    v-model="ruleForm.draftDept"
                    class="el-input__inner"
                  />
                </div>
                <div
                  v-if="!ruleForm.draftDept && draftDeptCheck"
                  :class="{'el-form-item__error':!ruleForm.draftDept}"
                >请输入拟稿部门</div>
              </div>
            </div>-->

            <div
              :class="['el-form-item is-required el-form-item--small',{'is-error':!ruleForm.draftDept&& draftDeptCheck}]"
            >
              <label for="draftDept" class="el-form-item__label" style="width: 130px;">拟稿部门</label>
              <div class="el-form-item__content" style="margin-left: 130px;">
                <div
                  class="el-input el-input--small is-disabled el-input-group el-input-group--append"
                >
                  <input
                    type="text"
                    ref="draftDeptError"
                    v-model="ruleForm.draftDept"
                    disabled="disabled"
                    autocomplete="off"
                    class="el-input__inner"
                  />
                  <div class="el-input-group__append">
                    <button
                      type="button"
                      @click="getTreeData('draft')"
                      class="el-button el-button--default el-button--small"
                    >
                      <i class="el-icon-plus"></i>
                    </button>
                  </div>
                </div>
                <div
                  v-if="!ruleForm.draftDept && draftDeptCheck"
                  :class="{'el-form-item__error':!ruleForm.draftDept}"
                >请输入拟稿部门</div>
              </div>
            </div>
          </el-col>
          <el-col>
            <el-form-item label="备注">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="windows模板">
              <div>
                <el-row>
                  <template>
                    <uploadFiles
                      ref="uploadComponent"
                      @preserve="handleSave"
                      :uploadConfig="uploadConfig"
                      v-if="ruleForm.templateFileInfo.length==0"
                    ></uploadFiles>
                  </template>
                  <el-col>
                    <div
                      class="tree_w"
                      v-if="ruleForm.templateFileInfo&&ruleForm.templateFileInfo.length"
                    >
                      <el-scrollbar>
                        <div
                          v-for="(item,index) in  ruleForm.templateFileInfo"
                          :key="item.id"
                          class="comp_list"
                        >
                          <template>
                            <div class="command_file">
                              <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
                                <el-button
                                  type="warning"
                                  size="mini"
                                  @click.native="deleteRow(index,item.id)"
                                  :disabled="item.disabled"
                                  round
                                >删除</el-button>
                                <el-button
                                  type="primary"
                                  size="mini"
                                  @click.native="downFile(item)"
                                  round
                                >下载</el-button>
                              </div>
                            </div>
                          </template>
                        </div>
                      </el-scrollbar>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item label="windows模板" prop="template">
              <el-row>
                <uploadFiles
                  ref="uploadComponent"
                  v-if="ruleForm.attchmentFileInfo.length==0"
                  @preserve="handleSave"
                  :uploadConfig="uploadConfig"
                ></uploadFiles>
                <el-col>
                  <div
                    class="tree_w"
                    v-if="ruleForm.attchmentFileInfo&&ruleForm.attchmentFileInfo.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in ruleForm.attchmentFileInfo"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,item.isSpecial)"
                                :disabled="item.disabled"
                                round
                              >删除</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载</el-button>
                            </div>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="国产机模板" prop="template">
              <el-row>
                <uploadFiles
                  ref="uploadComponentLinux"
                  v-if="ruleForm.attchmentFileInfoLinux.length==0"
                  @preserve="handleSave"
                  :uploadConfig="uploadConfigLinux"
                ></uploadFiles>
                <el-col>
                  <div
                    class="tree_w"
                    v-if="ruleForm.attchmentFileInfoLinux&&ruleForm.attchmentFileInfoLinux.length"
                  >
                    <el-scrollbar>
                      <div
                        v-for="(item,index) in ruleForm.attchmentFileInfoLinux"
                        :key="item.id"
                        class="comp_list"
                      >
                        <template>
                          <div class="command_file">
                            <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                            <span class="name">{{item.createrName}}</span>
                            <span class="name">{{item.createTime}}</span>
                            <div class="btns">
                              <el-button
                                type="warning"
                                size="mini"
                                @click.native="deleteRow(index,item.id,item.isSpecial)"
                                :disabled="item.disabled"
                                round
                              >删除</el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click.native="downFile(item)"
                                round
                              >下载</el-button>
                            </div>
                          </div>
                        </template>
                      </div>
                    </el-scrollbar>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave('save')">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "@/components/tree/tree-fawen";
import uploadFiles from "@/components/uploadFile/uploadFilePz";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const tableCols = [
  { label: "文件字头", prop: "fileHead", align: "center" },
  { label: "字号种类", prop: "wordNo", align: "center" },
  { label: "拟稿部门", prop: "draftDept", align: "center" }
];
export default {
  name: "Qxjdbpz",
  components: {
    mTable,
    treeCofig,
    uploadFiles,
    searchForm,
    selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      unitName: "",
      unitId: "",
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      // currentSelectSearchdata:JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
      // searchData: {
      // //  unitName: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
      //   unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
      // },

      draftDeptCheck: false,
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        isSpecial:0,
        noattachTitleCheck: true,
        subTempAddF: false, //是否可以上传附件 true是不能上传   false是可以上传
        formId:'forwindows',
        unitId: ""
      },
      uploadConfigLinux:{
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        isSpecial:1,//linux 
        noattachTitleCheck: true, //无附件文件名校验
        formId:'forLinux',
        subTempAddF: false, //是否可以上传附件 true是不能上传   false是可以上传
        unitId: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },

      sortDate: [{ prot: "date", order: "descnding" }],
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      draftCheckData: [], //拟稿部门选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      dispatchcswhcspz: {
        function: "getTcQbsignTypeDicByPage",
        page: 1,
        limit: 20,
        unitId: ""
      },
      //拟稿部门树
      bank_main: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept: true
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      unitForm: {
        function: "getOrgInfo"
      },
      ruleForm: {
        function: "",
        orgName: "",
        fileHead: "",
        wordNo: "",
        fontLimit: "",
        orderDeptName: "",
        sort: "",
        draftDept: "",
        template: "",
        remark: "",
        attachSort: [],
        templateFileInfo: [],
        attchmentFileInfo: [],
        attchmentFileInfoLinux: [],
      },
      saveOrUpdateTcQbsignTypeDic: {
        function: "saveOrUpdateTcQbsignTypeDic",
        id: ""
      },
      treeTradeCode: "", //完成并发送  树  拆
      //强制性要求
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        wordNo: [
          { required: true, message: "请输入字号种类", trigger: "blur" }
        ],
        fileHead: [
          { required: true, message: "请输入文件字头", trigger: "blur" }
        ],
        draftDept: [
          { required: true, message: "请输入拟稿部门", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.uploadConfig.unitId = this.uploadConfigLinux.unitId = this.unitId = org.id;
      this.handleLoadData();
      console.log(org, this.unitName , this.unitId);
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.searchDataInfo = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.searchDataInfoId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.searchDataInfo = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.searchDataInfoId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
          names = names.join(";");
          ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
          case "draft":
            this.ruleForm.draftDept = names;
            this.ruleForm.draftDeptId = ids;
            this.draftCheckData = this.checkData;
            break;
          case "zhu":
            this.ruleForm.ownDepartment = names;
            this.ruleForm.assistDeptId = ids;
            this.xieCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
      this.uploadConfig.subTempAddF =this.uploadConfigLinux.subTempAddF =(this.ruleForm.draftDept && this.ruleForm.draftDeptId && this.ruleForm.wordNo && this.ruleForm.fileHead)?false:true;
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "draftDept") {
          this.ruleForm.draftDeptId = "";
          this.chenCheckData = [];
        }
        if (name === "ownDepartment") {
          // this.ruleForm.assistDeptId = '';
          this.xieCheckData = [];
        }
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "draft":
          this.checkIds = this.ruleForm.draftDeptId
            ? this.ruleForm.draftDeptId.split(";")
            : [];
            this.draftCheckData = this.ruleForm.draftDept
          ? this.draftCheckData
          : [];
          this.checkData = this.draftCheckData;
          break;
      }
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(";");
      names = name.split(";");
      ids.map((item, n) => {
        obj.push({
          id: item,
          name: names[n]
        });
      });
      return obj;
    },
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      this.canTab = false;
      this.singelCheckF = true;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      this.clearCheckData("draftDept");
      this.dialogTit = "拟稿部门";
      this.showCompDialog();
      this.bank_main.wfeUnitId = this.unitId
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_main),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
    },
    // 初始化列表及分页
    handleLoadData(str) {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.dispatchcswhcspz));
      this.dispatchcswhcspz.unitName = this.unitName
      this.dispatchcswhcspz.unitId = this.unitId
      if(str){
        this.dispatchcswhcspz.page = 1;
        this.pagination.page = 1;
      }
      // console.log("****", this.dispatchcswhcspz);
      this.$post
        .postData(
          "getTcQbsignTypeDicByPage",
          JSON.stringify(this.dispatchcswhcspz),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.dispatchcswhcspz.page = res.data.page;
          this.pagination.total = res.data.total;

          //已上传的文件
          // this.uploadConfig.filesHas = this.ruleForm.templateFileInfo;
          this.ruleForm.attachSort = [];

          if(res.data.page>res.data.pages){
            this.dispatchcswhcspz.page = res.data.pages;
            this.pagination.page = res.data.pages;
            this.handleLoadData()
          }
        });
      // this.$post
      //   .postData(
      //     "getOrgInfo",
      //     JSON.stringify(this.unitForm),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.orgId = res.data.unitId;
      //   });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.dispatchcswhcspz.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //每页条数
    handleSizeChange(val) {
      // this.dispatchcswhcspz.limit = val;
      // this.pagination.pageSize = val;
      // this.tableData = [];
      // this.handleLoadData();
      this.dispatchcswhcspz.limit = val;
      this.pagination.limit = val;
      this.dispatchcswhcspz.page = this.pagination.page = 1;
      this.tableData = [];
      this.handleLoadData();
    },
    //点击每行数据弹窗弹出
    cellClick(row, column, cell, event) {
      // this.$post
      //   .postData(
      //     "getOrgInfo",
      //     JSON.stringify(this.unitForm),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.orgId = res.data.unitId;
      //   });
      this.$post
        .postData(
          "getTcTcQbsignTypeDicById",
          JSON.stringify({ function: "getTcTcQbsignTypeDicById", id: (row&&row.id)||this.ruleForm.id ,unitName:this.unitName,unitId:this.unitId}),
          this.$businessCode.qbgl
        )
        .then(res => {
          // this.$nextTick(() => {
          //   this.$refs.ruleForm.clearValidate();
          // });
          // this.ruleForm = Object.assign({}, res.data, {
          //   function: "saveOrUpdateTcQbsignTypeDic"
          // });
          this.ruleForm = res.data
          this.ruleForm['function'] = 'saveOrUpdateTcQbsignTypeDic'
          this.dialogVisible = true;
          console.log(this.ruleForm.templateFileInfo.length);
          if (res.data.draftDeptId) {
            this.draftCheckData = this.concatTreeData(
              res.data.draftDeptId,
              res.data.draftDept,
              "draft"
            );
          } else {
            this.draftCheckData = [];
            this.checkIds = [];
          }
          //上传附件
          this.uploadConfig.id = this.uploadConfigLinux.id = row.id||res.data.id;
          this.ruleForm.attchmentFileInfo = [];
          this.ruleForm.attchmentFileInfoLinux = [];
          if(res.data.templateFileInfo && res.data.templateFileInfo.length){
            res.data.templateFileInfo.map(files=>{
              if(files.isSpecial){//0： windows
                this.ruleForm.attchmentFileInfoLinux.push(files);
              }else{
                this.ruleForm.attchmentFileInfo.push(files);
              }
            })
          }
        });
      // this.handleSave();
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "saveOrUpdateTcQbsignTypeDic"
      });
    },
    handleSelectionChange(val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      this.deleteIds = idsArr.join(",");
    },
    // 批量删除
    handleBatchDelete() {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择一条数据进行删除！"
        });
        return;
      }
      this.$post
        .postData(
          "deleteTcQbsignTypeDicEntityListById",
          JSON.stringify({
            function: "deleteTcQbsignTypeDicEntityListById",
            id: this.deleteIds,
            unitName :this.unitName,
            unitId :this.unitId,
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
            });
            this.handleLoadData();
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 1000
            });
          }
          // this.handleLoadData();
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
    },
    handleSelect() {},
    handleAddData() {
      this.ruleForm = {
        orgName :this.unitName,
        orgId :this.unitId,
        fileHead :"",
        wordNo :"",
        orderDeptName :"",
        sort :"",
        remark :"",
        draftDept :"",
        draftDeptId :"",
        template :"",
        fontLimit :"",
        templateFileInfo :[],
        id :"",
        attchmentFileInfoLinux :[],
        attchmentFileInfo :[]
      }
      this.checkIds =[];
      this.draftCheckData =[];
      this.uploadConfig.id ="";
      this.uploadConfigLinux.id = '';
      this.uploadConfig.filesHas = [];
      // this.ruleForm.orgName = this.unitName
      // this.ruleForm.orgId = this.unitId
      // this.ruleForm.fileHead = "";
      // this.ruleForm.wordNo = "";
      // this.ruleForm.orderDeptName = "";
      // this.ruleForm.sort = "";
      // this.ruleForm.remark = "";
      // this.ruleForm.draftDept = "";
      // this.ruleForm.draftDeptId = "";
      // this.ruleForm.template = "";
      // this.ruleForm.fontLimit = "";
      // this.checkIds = [];
      // this.draftCheckData = [];
      // this.ruleForm.templateFileInfo = [];
      // this.uploadConfig.id = "";
      // this.ruleForm.id = "";
      this.dialogVisible = true;
    },
    //保存for上传
    async handleSaveForUpload(){
      let resBack = false;
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
       this.ruleForm.function = "saveOrUpdateTcQbsignTypeDic";
      this.ruleForm.unitName = this.ruleForm.orgName;
      this.ruleForm.unitId = this.ruleForm.orgId;
      await this.$post
        .postData(
          "saveOrUpdateTcQbsignTypeDic",
          JSON.stringify(this.ruleForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            resBack = true;
          }else{
            this.$message({
              type: "error",
              message: res.message
            });
            resBack = false;
          }
        })
        return resBack;
    },
    // 点击保存
    handleSave(type,flag) {
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (this.ruleForm.id && !type) {
        this.handleSaveForUpload().then(resSve =>{
          if(resSve){
            this.cellClick({ id: this.ruleForm.id });
          }
        })
        return;
      }
      // if (
      //   (type == "save" && !this.ruleForm.attchmentFileInfo &&
      //   (!this.ruleForm.attchmentFileInfo.length ||
      //     !this.ruleForm.attchmentFileInfo[0].filePath ||
      //     !this.ruleForm.attchmentFileInfo[0].fileName) )&&(type == "save" && !this.ruleForm.attchmentFileInfoLinux &&
      //   (!this.ruleForm.attchmentFileInfoLinux.length ||
      //     !this.ruleForm.attchmentFileInfoLinux[0].filePath ||
      //     !this.ruleForm.attchmentFileInfoLinux[0].fileName)) 
      // ) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请上传模板",
      //     duation: 1000
      //   });
      //   return;
      // }

      this.ruleForm.function = "saveOrUpdateTcQbsignTypeDic";
      this.ruleForm.unitName = this.ruleForm.orgName;
      this.ruleForm.unitId = this.ruleForm.orgId;
      this.$post
        .postData(
          "saveOrUpdateTcQbsignTypeDic",
          JSON.stringify(this.ruleForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.ruleForm.attchmentFileInfo = this.ruleForm.attchmentFileInfo||[];
            this.ruleForm.attchmentFileInfoLinux = this.ruleForm.attchmentFileInfoLinux||[];
            if (type && type != "uploadfile") {
              if (type=="save") {
                this.$message({
                  type: "success",
                  showClose: true,
                  offset: 400,
                  message: "保存成功",
                  duration: 1000
                });
              }
              this.$post
              .postData(
                "getTcTcQbsignTypeDicById",
                JSON.stringify({ function: "getTcTcQbsignTypeDicById", id: res.data.id ,unitName:this.unitName,unitId:this.unitId}),
                this.$businessCode.qbgl
              )
              .then(res => {
                this.ruleForm.attchmentFileInfo = [];
                this.ruleForm.attchmentFileInfoLinux = [];
                if(res.data.templateFileInfo && res.data.templateFileInfo.length){
                  res.data.templateFileInfo.map(files=>{
                    if(files.isSpecial){//0： windows
                      this.ruleForm.attchmentFileInfoLinux.push(files);
                    }else{
                      this.ruleForm.attchmentFileInfo.push(files);
                    }
                  })
                }
                this.$forceUpdate();
              });
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = this.uploadConfigLinux.id = this.ruleForm.id = res.data.id;
              if(flag == 'forwindows'){
                this.$refs.uploadComponent.uploadFileNow();
              }else{
                this.$refs.uploadComponentLinux.uploadFileNow();
              }
            }
            if (type && type != "uploadfile" && type != "callBacksave") {
              this.dialogVisible = false;
              this.handleLoadData();
            }
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 1000
            });
          }
          
          // this.handleLoadData();
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: res.message,
            duration: 1000
          });
          // if (type && type != "uploadfile") {
          //   this.dialogVisible = false;
          // }
        });
    },
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let flag = true;
      this.$refs.ruleForm.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            flag = false;
            break;
          }
        }
      });
      this.draftDeptCheck = true;
      if (!this.ruleForm.draftDept) {
        flag = false;
      }
      return flag;
    },
    //保存时校验
    saveCheck() {
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (
        !this.ruleForm.fileHead ||
        !this.ruleForm.wordNo ||
        !this.ruleForm.draftDept ||
        !this.ruleForm.orgName
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      }
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.ruleForm.attachSort.push(
        {
          id: this.ruleForm.templateFileInfo[n - 1].id,
          sort: this.ruleForm.templateFileInfo[n].sort
        },
        {
          id: this.ruleForm.templateFileInfo[n].id,
          sort: this.ruleForm.templateFileInfo[n - 1].sort
        }
      );
      midObj = this.ruleForm.templateFileInfo[n];
      this.ruleForm.templateFileInfo[n] = this.ruleForm.templateFileInfo[n - 1];
      this.ruleForm.templateFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.ruleForm.attachSort.push(
        {
          id: this.ruleForm.templateFileInfo[n + 1].id,
          sort: this.ruleForm.templateFileInfo[n].sort
        },
        {
          id: this.ruleForm.templateFileInfo[n].id,
          sort: this.ruleForm.templateFileInfo[n + 1].sort
        }
      );
      midObj = this.ruleForm.templateFileInfo[n];
      this.ruleForm.templateFileInfo[n] = this.ruleForm.templateFileInfo[n + 1];
      this.ruleForm.templateFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id,flag) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bank_deleteFileById.id = id;
          this.bank_deleteFileById.unitId = this.unitId;
          this.$post
            .postData(
              "deleteFileById",
              JSON.stringify(this.bank_deleteFileById),
              this.$businessCode.qbglfj
            )
            .then(res => {
              console.log(res);
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 500
                  });
                  // this.ruleForm.templateFileInfo.splice(n, 1);
                  // this.uploadConfig.filesHas = this.ruleForm.templateFileInfo;
                  if(flag == "0"){//0： windows
                    this.ruleForm.attchmentFileInfo.splice(n, 1);
                  }else{
                     this.ruleForm.attchmentFileInfoLinux.splice(n, 1);
                  }
                  this.$forceUpdate();
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "删除失败",
                    duration: 500
                  });
                }
              }
            });
        })
        .catch(() => {});
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    }
  },
  created() {
    if(sessionStorage.getItem('QBLIST')){
      this.dispatchcswhcspz = Object.assign(this.dispatchcswhcspz,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.dispatchcswhcspz.page, //第几页
      total: this.dispatchcswhcspz.totalCount, //共有条数
      limit: this.dispatchcswhcspz.limit, //每页条数
    }
    this.isGly = isGlyId();
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.uploadConfigLinux.code = this.$businessCode.qbglfj;
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    // //初始化修改交易线 (传后台)
    // this.uploadConfig.code = this.$businessCode.qbglfj;
    // this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    // this.handleLoadData();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.uploadConfig.unitId = this.uploadConfigLinux.unitId = this.unitId = res.data[0].unitCode||'';
      // this.uploadConfig.code = this.$businessCode.qbglfj;
      this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
      this.handleLoadData();
    })
  },
  watch: {
    "ruleForm.draftDept": {
      handler(newv) {
        this.uploadConfig.subTempAddF =this.uploadConfigLinux.subTempAddF =(this.ruleForm.draftDept && this.ruleForm.wordNo && this.ruleForm.fileHead)?false:true;
        this.$forceUpdate();
      },
      deep: true
    },
    "ruleForm.wordNo": {
      handler(newv) {
        this.uploadConfig.subTempAddF =this.uploadConfigLinux.subTempAddF =(this.ruleForm.draftDept && this.ruleForm.wordNo && this.ruleForm.fileHead)?false:true;
        this.$forceUpdate();
      },
      deep: true
    },
    "ruleForm.fileHead": {
      handler(newv) {
        this.uploadConfig.subTempAddF =this.uploadConfigLinux.subTempAddF =(this.ruleForm.draftDept && this.ruleForm.wordNo && this.ruleForm.fileHead)?false:true;
        this.$forceUpdate();
      },
      deep: true
    },
    
  }
};
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.bank_dispach_annotation {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fef7e7;
  border: 1px solid #ff6600;
  display: flex;
  font-size: 12px;
  margin: 40px 0;
  position: relative;
  .bank_dispach_annotation_current {
    padding: 0 30px 0 10px;
    span {
      color: #ff6600;
    }
  }
  .bank_article_illustrates {
    position: absolute;
    top: 3px;
    right: 10px;
  }
}
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;
    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }
    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
      text-align: right;
    }
    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .down {
      cursor: pointer;
    }
    .down:hover {
      color: #3b85ef;
    }
  }
}
.file_wp {
  margin-left: 0 !important;
}
/deep/ .dispatchcswhqbzlwhpage{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
.mt20 {
    margin-top: 7px  !important;
}
</style>