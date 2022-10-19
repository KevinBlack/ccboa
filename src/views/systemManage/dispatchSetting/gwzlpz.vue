<template>
  <div class="dispatchparameterspage">
    <el-row>
      <el-form
        label-width="120px"
      >
        <el-col :span="8">
          <el-form-item label="机构名称">
            <div class="dispatchcswhlshwh">
              <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                <el-input
                  type="text"
                  readonly="readonly"
                 
                  v-model="unitName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="margin-left: 20px;">
          <el-button type="primary" size="small" @click="handleLoadData('1')">查询</el-button>
        </el-col>
        <el-col :span="8" style="text-align:center;margin-bottom: 10px;">
          <!-- <el-select style="width: 200px;" size="small" v-model="optionDepartInitial">
            <el-option
              v-for="item in optionDepart"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
          <el-form-item label="发文类型">
            <el-select
              size="small"
              style="width:100%;"
              v-model="ruleForm.sendTypeOut"
              @change="handleDocTypeChange($event,'1')"
            >
              <el-option value label="请选择"></el-option>
              <el-option
                v-for="item in optionType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleAddData">新增公文种类配置</el-button>
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="false"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          @selectAll="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :page-sizes="[10,15,20,25,30]"
        ></m-table>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :before-close="handleCancel"
      v-dialogDrag
      title="公文种类配置"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo_ruleForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="文件类型" prop="sendTypeIn">
              <el-select v-model="ruleForm.sendTypeIn" @change="handleDocTypeChange($event,'2')" style="width:100%">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="sendTypeitem in SsendType"
                  :key="sendTypeitem.label"
                  :label="sendTypeitem.label"
                  :value="sendTypeitem.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号方式" prop="codeMethod" ref="codeMethod">
              <el-radio
                v-model="ruleForm.codeMethod"
                label="0"
                class="alternative"
                @click.native="setReQ(true)"
                @change="inputChange"
              >代字:XXXX:X号</el-radio>
              <el-radio
                v-model="ruleForm.codeMethod"
                label="1"
                class="alternative"
                @click.native="setReQ(false)"
                @change="inputChange"
              >代字:XXXX:第X期</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需要核稿" prop="isCheckFile">
              <!-- <el-radio
                v-model="ruleForm.isCheckFile"
                label="1"
                class="alternative"
                @change="inputChange"
              >是</el-radio>
              <el-radio
                v-model="ruleForm.isCheckFile"
                label="2"
                class="alternative"
                @change="inputChange"
              >否</el-radio> -->
              <el-radio-group v-model="ruleForm.isCheckFile" @change="inputChange">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需要法律部门会签" prop="isLawSign">
              <!-- <el-radio
                v-model="ruleForm.isLawSign"
                label="1"
                class="alternative"
                @change="inputChange"
              >是</el-radio>
              <el-radio
                v-model="ruleForm.isLawSign"
                label="0"
                class="alternative"
                @change="inputChange"
              >否</el-radio> -->
              <el-radio-group v-model="ruleForm.isLawSign" @change="inputChange">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需要填写办文说明" prop="isExplain">
              <!-- <el-radio
                v-model="ruleForm.isExplain"
                label="1"
                class="alternative"
                @change="inputChange"
              >是</el-radio>
              <el-radio
                v-model="ruleForm.isExplain"
                label="0"
                class="alternative"
                @change="inputChange"
              >否</el-radio> -->
              <el-radio-group v-model="ruleForm.isExplain" @change="inputChange">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="文件字头" prop="fileWordHead" ref="fileWordHead">
              <el-input v-model="ruleForm.fileWordHead"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="代字/红头" prop="redHead" ref="redHead">
              <el-input v-model="ruleForm.redHead"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="发文单位署名" prop="sendUnitName" ref="sendUnitName">
              <el-input v-model="ruleForm.sendUnitName"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字数限制" prop="wordsLimit">
              <el-input v-model="ruleForm.wordsLimit" type="number"></el-input>
              <span>*说明:配置为0时,正文字数将不受限制</span>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="法律部门会签" prop="lawDepartmentSign">
              <el-input v-model="ruleForm.lawDepartmentSign">
                <el-button slot="append" @click="getTreeData('hui')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="主办部门" prop="ownDepartment">
              <el-input v-model="ruleForm.ownDepartment">
                <el-button slot="append" @click="getTreeData('zhu')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="模板标签" prop="templateLabel">
              <el-input v-model="ruleForm.templateLabel"></el-input>
              <span>*说明：模板标签对应关系格式为“标签名称|表单域名称”，多个标签请用半角分好隔开。</span>
            </el-form-item>
          </el-col>-->
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
          <el-col>
            <el-form-item label="备注" prop="comments">
              <el-input v-model="ruleForm.comments"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleForm.sendTypeIn!='联合发文模板'">
            <el-form-item label="关联联合发文模板">
              <el-select v-model="ruleForm.unitedRedHead" @change="handleUniteChange" style="width:100%">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="unitedRedHeadItem in SunitedRedHead"
                  :key="unitedRedHeadItem.label"
                  :label="unitedRedHeadItem.label"
                  :value="unitedRedHeadItem.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave('save')">保存</el-button>
      </div>
    </el-dialog>

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
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "@/components/table/mTable.vue";
import treeCofig from "@/components/tree/tree-fawen";
import uploadFiles from "@/components/uploadFile/uploadFilePz";
import selectOrgOrDept from "@/components/select/selectOrgOrDept";
import dispatchFJWH from "@/minixs/dispatchFJWH";

const tableCols = [
  { label: "代字/红头", prop: "redHead", align: "center" },
  { label: "文件字头", prop: "fileWordHead", align: "center" },
  { label: "主办部门", prop: "ownDepartment", align: "center" },
  { label: "修改日期", prop: "updateTime", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
];
export default {
  name: "Gwzlpz",
  components: {
    mTable,
    uploadFiles,
    treeCofig,
    selectOrgOrDept
  },
  mixins: [dispatchFJWH],
  data() {
    return {
      uploadConfigLinux:{
        id: "",
        url: "uploadFiles",
        code: "",
        sendObjData: [],
        hasFuCheck: true, //是否有特殊发送附件选择
        sendObjSpecialFile: [], //当前操作的附件与部门序号
        checkChange: false,
        width: "auto",
        unitId: '',
        isSpecial:1,//linux 
        noattachTitleCheck: true, //无附件文件名校验
        formId:'forLinux',
        subTempAddF: false //是否可以上传附件 true是不能上传   false是可以上传
      },
      isGly:false,
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        sendObjData: [],
        hasFuCheck: true, //是否有特殊发送附件选择
        sendObjSpecialFile: [], //当前操作的附件与部门序号
        checkChange: false,
        width: "auto",
        unitId: '',
        noattachTitleCheck: true, //无附件文件名校验
        formId:'forwindows',
        subTempAddF: false //是否可以上传附件 true是不能上传   false是可以上传
      },

      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      // 下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam"
      },
      //主送、抄送
      bank_main: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept: true,
        wfeUnitId: ''
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        unitId: "",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        unitId:"",
        id: ""
      },
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      xieCheckData: [], //协办选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      SsendType: [],
      SunitedRedHead: [],
      ruleForm: {
        function: "saveOrUpdate",
        attchmentFileInfo: [],
        attchmentFileInfoLinux: [],
        unitName: "",
        unitId: "",
        orgName: "",
        orgId: "",
        sendType: "",
        sendTypeOut: "",
        sendTypeIn: "",
        fileWordHead: "",
        redHead: "",
        sendUnitName: "",
        wordsLimit: "",
        codeMethod: "0",
        isCheckFile: "2",
        isLawSign: "0",
        isExplain: "0",
        lawDepartmentSign: "",
        sort: "",
        ownDepartment: "",
        template: "",
        comments: "",
        docTypeDicId: "",
        lawDepartmentSignIds: "",
        unitedRedHead: ""
      },
      fileId: "",
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        codeMethod: [
          { required: true, message: "请选择编号方式", trigger: "blur" }
        ],
        sendTypeIn: [
          { required: true, message: "请输入文件类型", trigger: "change" }
        ],
        fileWordHead: [
          { required: true, message: "请输入文件字头", trigger: "blur" }
        ],
        redHead: [
          { required: true, message: "请输入代字/红头", trigger: "blur" }
        ],
        sendUnitName: [
          { required: true, message: "发文单位署名", trigger: "blur" }
        ]
      },
      optionDepartInitial: "",
      optionType: [],
      deleteIds: "",
      checkedArr: []
    };
  },
  methods: {
    handleUniteChange(val) {
      this.ruleForm.unitedRedHead = val;
    },
    initData(val) {
      let that = this;
      this.ruleForm.function = "selectByPage"
      if(val=="1"||val=="2") {
        this.pagination.page = 1;
      }
      console.log("****", this.ruleForm);
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      that.$post
        .postData(
          "selectByPage",
          JSON.stringify(Object.assign({},that.ruleForm, that.pagination)),
          that.$businessCode.fawgl
        )
        .then(res => {
          that.tableData = res.data.rows;
          that.pagination.total = res.data.total;
          that.$forceUpdate();
        });
      
      that.uploadConfig.filesHas = that.ruleForm.attchmentFileInfo;
      that.ruleForm.attachSort = [];
    },
    handleLoadData(val) {
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.bank_main.wfeUnitId = this.uploadConfigLinux.unitId = this.uploadConfig.unitId = this.unitId;
      
      if(val=="1") {
        this.getSendOrderDicByParam().then(successState => {
          if(successState) {
            this.initData(val);
          }
        });
      } else {
        this.initData(val);
      }
    },
    // 下拉列表
    async getSendOrderDicByParam() {
      var successState = false;
      this.ruleForm.function = "getSendOrderDicByParam"
      let transSendTypeOut = "";
      transSendTypeOut = this.ruleForm.sendTypeOut;
      await this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.ruleForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.optionType = JSON.parse(res.data.sendType);
          let objNo = this.optionType.length;
          objNo.toString();
          let transObj = {
            label: '联合发文模板',
            value: objNo
          }
          this.optionType.push(transObj);
          
          // this.optionType[0] = {
          //   label : "",
          //   value : ""
          // }
          // this.ruleForm.sendTypeOut = transSendTypeOut==""?this.optionType[0].label:transSendTypeOut;
          this.SsendType = this.optionType;
          successState = true;
        });
      return successState;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.tableData = [];
      this.handleLoadData();
    },
    handleSizeChange(val) {
      this.pagination.limit = val;
      this.pagination.page = 1
      this.tableData = [];
      this.handleLoadData();
    },
    setReQ(n) {
      this.rules.sendUnitName[0].required = n ? true : false;
      this.$forceUpdate();
    },
    //数据更新
    inputChange(e) {
      this.$forceUpdate();
    },
    cellClick(row, column, cell, event) {
      let that = this;
      // let transSengType = that.ruleForm.sendType
      that.fileId = row.docTypeDicId;
      that.$post
        .postData(
          "selectById",
          JSON.stringify({ function: "selectById", id: row.docTypeDicId, unitId: that.unitId }),
          that.$businessCode.fawgl
        )
        .then(res => {
          that.ruleForm = Object.assign({}, that.ruleForm, res.data, {
            function: "saveOrUpdate"
          });
          that.SunitedRedHead = res.data.unitedRedHeadMap&&JSON.parse(res.data.unitedRedHeadMap)||[];
          that.ruleForm.sendTypeIn = that.ruleForm.sendType;
          // that.ruleForm.sendType = transSengType;
          that.ruleForm.unitName = that.ruleForm.orgName = that.unitName;
          that.ruleForm.unitId = that.ruleForm.orgId = that.unitId;
          that.ruleForm.codeMethod = that.ruleForm.codeMethod && that.ruleForm.codeMethod.toString() || "0";
          that.ruleForm.isCheckFile = that.ruleForm.isCheckFile && that.ruleForm.isCheckFile.toString() || "2";
          that.ruleForm.isLawSign = that.ruleForm.isLawSign && that.ruleForm.isLawSign.toString() || "0";
          that.ruleForm.isExplain = (that.ruleForm.isExplain && that.ruleForm.isExplain.toString()) || "0";
          if (res.data.lawDepartmentSignIds) {
            that.chenCheckData = that.concatTreeData(
              res.data.lawDepartmentSignIds,
              res.data.lawDepartmentSign,
              "dosend"
            );
          }
          that.fileId = that.uploadConfig.id = that.uploadConfigLinux.id = res.data.docTypeDicId || "";
          that.ruleForm.attchmentFileInfo = [];
          that.ruleForm.attchmentFileInfoLinux = [];
          if(res.data.attachmentPoList && res.data.attachmentPoList.length){
            res.data.attachmentPoList.map(files=>{
              if(files.isSpecial){//0： windows
                that.ruleForm.attchmentFileInfoLinux.push(files);
              }else{
                that.ruleForm.attchmentFileInfo.push(files);
              }
            })
          }
          // if (res.data.filePath && res.data.fileName) {
          //   that.ruleForm.attchmentFileInfo.push({
          //     filePath: res.data.filePath,
          //     fileName: res.data.fileName,
          //     fileId: res.data.fileId
          //   });
          // }
          that.dialogVisible = true;
          that.rules.sendUnitName[0].required =
            that.ruleForm.codeMethod == "1" ? false : true;
          that.$forceUpdate();
        });
    },
    handleSelectionChange(val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].docTypeDicId);
      }
      this.deleteIds = idsArr.join(";");
    },
    handleBatchDelete() {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post
              .postData(
                "doDeleteEntityList",
                JSON.stringify({
                  function: "doDeleteEntityList",
                  docTypeDicId: this.deleteIds,
                  unitId: this.unitId
                }),
                this.$businessCode.fawgl
              )
              .then(res => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.handleLoadData("1");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            });
          });
      }
    },
    handleAddData() {
      this.ruleForm.function = "saveOrUpdate";
      this.ruleForm.orgName = this.ruleForm.unitName = this.unitName;
      this.ruleForm.orgId = this.ruleForm.unitId = this.unitId;
      this.ruleForm.attchmentFileInfo = [];
      this.ruleForm.attchmentFileInfoLinux = [];
      this.ruleForm.sendTypeOut = this.ruleForm.sendType;
      this.ruleForm.sendTypeIn = this.ruleForm.sendType;
      this.ruleForm.codeMethod = "0";
      this.ruleForm.isCheckFile = "2";
      this.ruleForm.isLawSign = "0";
      this.ruleForm.isExplain = "0";
      this.ruleForm.fileWordHead = "";
      this.ruleForm.redHead = "";
      this.ruleForm.sendUnitName = "";
      this.ruleForm.wordsLimit = "";
      this.ruleForm.lawDepartmentSign = "";
      this.ruleForm.sort = "";
      this.ruleForm.ownDepartment = "";
      this.ruleForm.template = "";
      this.ruleForm.comments = "";
      this.ruleForm.docTypeDicId = "";
      this.ruleForm.lawDepartmentSignIds = "";
      this.ruleForm.unitTemplate = "";
      this.checkData = [];
      this.checkIds = [];
      this.chenCheckData = [];
      this.xieCheckData = [];
      
      this.uploadConfig.id = '';
      this.uploadConfigLinux.id = '';
      this.dialogVisible = true;
    },
    scrollIntoForm() {
      let that = this;
      let res = true;
      that.$refs.ruleForm.validate((valid, object) => {
        if (!valid) {
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
          res = false;
        }
      });
      return res;
    },
    //删除模板时保存
    async saveForDeleteAndUpload() {
      let resBack = false;
      let transSendType = this.ruleForm.sendTypeIn;
      if (!this.scrollIntoForm()) {
        return;
      }
      if (!this.ruleForm.sendTypeIn || this.ruleForm.sendTypeIn == "") {
        this.$message({
          type: "error",
          message: "文件类型不能为空!"
        });
        return;
      }
      this.ruleForm.function = "saveOrUpdate";
      await this.$post
        .postData(
          "saveOrUpdate",
          JSON.stringify(this.ruleForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            this.ruleForm = Object.assign({}, this.ruleForm, res.data);
            this.ruleForm.sendTypeIn = transSendType;
            this.fileId = res.data.docTypeDicId;
            resBack = true;
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
            resBack = false;
          }
        });
      return resBack;
    },
    //手动保存
    handleSave(type,flag) {
      let that = this;
      if (!that.scrollIntoForm()) {
        return;
      }
      if (!that.ruleForm.sendTypeIn || that.ruleForm.sendTypeIn == "") {
        that.$message({
          type: "error",
          message: "文件类型不能为空!"
        });
        return;
      }
      if(that.fileId&&!type){
        that.saveForDeleteAndUpload().then(resSave=>{
         if(resSave){
           that.cellClick({ docTypeDicId: that.fileId});
         }
        })
        return
      }
      that.ruleForm.function = "saveOrUpdate";
      that.ruleForm.sendType = that.ruleForm.sendTypeIn;
      that.$post
        .postData(
          "saveOrUpdate",
          JSON.stringify(that.ruleForm),
          that.$businessCode.fawgl
        )
        .then(res => {
          if (res && res.success) {
            that.ruleForm = Object.assign({}, that.ruleForm, res.data);
            that.ruleForm.attchmentFileInfo = that.ruleForm.attchmentFileInfo||[];
            that.ruleForm.attchmentFileInfoLinux = that.ruleForm.attchmentFileInfoLinux||[];
            that.ruleForm.ownDepartment = "";
            if (type && type != "uploadfile") {
              if (type=="save") {
                that.$message({
                  type: "success",
                  message: "保存成功!"
                });
                that.handleLoadData("1");
              }
              that.dialogVisible = type==="callBacksave";
              that.ruleForm.sendType = that.ruleForm.sendTypeOut = that.ruleForm.sendTypeIn;
              that.$post
              .postData(
                "selectById",
                JSON.stringify({ function: "selectById", id: res.data.docTypeDicId, unitId: that.unitId }),
                that.$businessCode.fawgl
              )
              .then(res => {
                that.ruleForm = Object.assign({}, that.ruleForm, res.data);
                that.ruleForm.codeMethod = that.ruleForm.codeMethod && that.ruleForm.codeMethod.toString() || "0";
                that.ruleForm.isCheckFile = that.ruleForm.isCheckFile && that.ruleForm.isCheckFile.toString() || "2";
                that.ruleForm.isLawSign = that.ruleForm.isLawSign && that.ruleForm.isLawSign.toString() || "0";
                that.ruleForm.isExplain = that.ruleForm.isExplain && that.ruleForm.isExplain.toString() || "0";
                that.ruleForm.attchmentFileInfo = [];
                that.ruleForm.attchmentFileInfoLinux = [];
                if(res.data.attachmentPoList && res.data.attachmentPoList.length){
                  res.data.attachmentPoList.map(files=>{
                    if(files.isSpecial){//0： windows
                      that.ruleForm.attchmentFileInfoLinux.push(files);
                    }else{
                      that.ruleForm.attchmentFileInfo.push(files);
                    }
                  })
                }
                // location.reload(); // 0628
                this.$forceUpdate();
              });
            } else {
              that.uploadConfig.id = that.uploadConfigLinux.id = res.data.docTypeDicId;
              if(flag == 'forwindows'){
                that.$refs.uploadComponent.uploadFileNow();
              }else{
                that.$refs.uploadComponentLinux.uploadFileNow();
              }
              that.fileId = res.data.docTypeDicId;
            }
          }
        });
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleDocTypeChange(val,tag) {
      console.log(val, tag);
      if(tag=='1') {
        this.ruleForm.sendType = this.ruleForm.sendTypeOut = val;
        this.handleLoadData("2");
      } else if(tag=='2') {
        this.ruleForm.sendType = this.ruleForm.sendTypeIn = val;
      }
      this.$forceUpdate();
    },
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      switch (n) {
        case "hui":
          name = "法律部门会签";
          clearName = "lawDepartmentSign";
          break;
        case "zhu":
          name = "主办部门";
          clearName = "ownDepartment";
          this.singelCheckF = true;
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_main),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
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
          case "hui":
            this.ruleForm.lawDepartmentSign = names;
            this.ruleForm.lawDepartmentSignIds = ids;
            this.chenCheckData = this.checkData;
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
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "lawDepartmentSign") {
          this.ruleForm.lawDepartmentSignIds = "";
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
        case "hui":
          this.checkIds = this.ruleForm.lawDepartmentSignIds
            ? this.ruleForm.lawDepartmentSignIds.split(";")
            : [];
          this.checkData = this.chenCheckData;
          if (this.dialogTypeBack) {
            this.checkData = [];
            this.checkIds = [];
          }
          break;
        case "zhu":
          this.checkIds = this.ruleForm.assistDeptId
            ? this.ruleForm.assistDeptId.split(";")
            : [];
          this.checkData = this.xieCheckData;
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

    // 附件上传下载排序
    preserve() {},
    upRow(n) {
      let midObj;
      this.ruleForm.attachSort.push(
        {
          id: this.ruleForm.attchmentFileInfo[n - 1].id,
          sort: this.ruleForm.attchmentFileInfo[n].sort
        },
        {
          id: this.ruleForm.attchmentFileInfo[n].id,
          sort: this.ruleForm.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.ruleForm.attchmentFileInfo[n];
      this.ruleForm.attchmentFileInfo[n] = this.ruleForm.attchmentFileInfo[
        n - 1
      ];
      this.ruleForm.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.ruleForm.attachSort.push(
        {
          id: this.ruleForm.attchmentFileInfo[n + 1].id,
          sort: this.ruleForm.attchmentFileInfo[n].sort
        },
        {
          id: this.ruleForm.attchmentFileInfo[n].id,
          sort: this.ruleForm.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.ruleForm.attchmentFileInfo[n];
      this.ruleForm.attchmentFileInfo[n] = this.ruleForm.attchmentFileInfo[
        n + 1
      ];
      this.ruleForm.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id,flag) {
      this.$confirm("确定删除此模板?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let that = this;
          this.bank_deleteFileById.id = id;
          this.bank_deleteFileById.unitId = this.unitId;
          this.$post
            .postData(
              "deleteFileById",
              JSON.stringify(this.bank_deleteFileById),
              this.$businessCode.fawglfj
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 500
                  });
                  if(flag == "0"){//0： windows
                    that.ruleForm.attchmentFileInfo.splice(n, 1);
                    that.uploadConfig.filesHas =
                      that.ruleForm.attchmentFileInfo;
                  }else{
                     that.ruleForm.attchmentFileInfoLinux.splice(n, 1);
                    that.uploadConfigLinux.filesHas =
                      that.ruleForm.attchmentFileInfoLinux;
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
        .catch(() => {
          return;
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.bank_doDownloadFile.unitId = this.unitId;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
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
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.uploadConfig.code = this.$businessCode.fawglfj;
    this.uploadConfigLinux.code = this.$businessCode.fawglfj;
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'安徽分行';
      this.uploadConfig.unitId= this.unitId = res.data[0].unitCode||'U130000';
      this.handleLoadData("1");
    })
    // this.getSendOrderDicByParam();
  },
  watch: {
    "ruleForm.fileWordHead": {
      handler(newv) {
        this.uploadConfig.subTempAddF = this.uploadConfigLinux.subTempAddF = (this.ruleForm.fileWordHead&&this.ruleForm.redHead)?false:true;
        this.$forceUpdate();
      },
      deep: true
    },
    "ruleForm.redHead": {
      handler(newv) {
        this.uploadConfig.subTempAddF = this.uploadConfigLinux.subTempAddF  = (this.ruleForm.fileWordHead&&this.ruleForm.redHead)?false:true;
        this.$forceUpdate();
      },
      deep: true
    }
  }
};
</script>

<style  lang="less" scoped>
.tree_w {
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
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
</style>