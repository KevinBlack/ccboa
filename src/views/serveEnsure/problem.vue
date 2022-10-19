<!--用户手册页面   created by wanglong 2020-08-12 -->
<template>
  <div>
    <el-row>
      <el-form
        :model="searchForm"
        ref="searchForm"
        label-width="100px"
        class="demo-ruleForm"
        :class="{mtdown:down}"
      >
        <!-- <el-col :span='6'>
        <span style="font-size: 14px;">常见问题：</span>
        <el-select style="width:calc(100% - 120px)" v-model="searchForm.proCode">
          <el-option
            v-for="item in moduleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-col>-->
        <el-col :span="6">
          <el-form-item label="常见问题：" prop="proCode" ref="proCode">
            <el-select v-model="searchForm.proCode" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in moduleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机构名称" prop="unitName">
            <div class="dispatchcswhlshwh">
              <select-org-or-dept :orgOrDeptId="uniteCode" @select="selectOrg" :disabled="isSys">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="unitName"
                  suffix-icon="el-icon-arrow-down"
                  width="100%"
                />
              </select-org-or-dept>
            </div>
            <!-- <el-input v-model="ruleForm.mainOrganNames">
              <el-button
                slot="append"
                icon="el-icon-arrow-down"
                size="mini"
                style="height:32px;margin-left:10px;"
                @click="openDialog"
              ></el-button>
            </el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="searchFormFn">搜索</el-button>
          <el-button type="primary" @click="initData(1)">查看收藏</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row style="margin:20px 0 10px;" v-if="buttonShow">
      <el-button type="primary" @click="uploadHandBook">新增</el-button>
      <el-button type="primary" @click="batchDele">删除</el-button>
      <el-button type="primary" @click="edit">编辑</el-button>
    </el-row>
    <el-row>
      <el-col>
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @select="select"
          @cellClick="cellClick"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          v-loading="tableLoading"
        ></m-table>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      v-dialogDrag
      width="600px"
      height="600px"
      title="常见问题"
    >
      <el-card>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="4">
            <span class="bitian">*</span>
            <label for>机构名称:</label>
          </el-col>
          <el-col :span="18">
            <el-input v-model="fromData.muBanVo.unitNameIn" disabled></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 20px;">
          <el-col :span="4">
            <span class="bitian">*</span>
            <label for>问题名称:</label>
          </el-col>
          <el-col :span="18">
            <el-input v-model="fromData.muBanVo.proTitle" :disabled="!detailsBtn"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 20px;">
          <el-col :span="4">
            <span class="bitian">*</span>
            <label for>问题分类：</label>
          </el-col>
          <el-col :span="18">
            <el-select
              style="width:100%"
              placeholder="请选择"
              :disabled="!detailsBtn"
              @change="problemChange"
              v-model="fromData.muBanVo.proName"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 20px;">
          <el-col :span="4">
            <span class="bitian">*</span>
            <label for>问题内容:</label>
          </el-col>
          <el-col :span="18">
            <el-input type="textarea" v-model="fromData.muBanVo.remark" :disabled="!detailsBtn"></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <label for style="padding:20px;">附件</label>
          </el-col>
          <!-- <el-col :span="20">
            <el-upload
              class="upload-demo"
              action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>-->
          <span
            disabled
            class="fu_jian_style"
            v-if="!(fromData.muBanVo.attchmentFileInfo&&fromData.muBanVo.attchmentFileInfo.length) && !(fromData.muBanVo.attchmentFileInfo.length==0 && detailsBtn)"
          >暂无更多附件信息</span>

          <uploadFiles
            ref="uploadComponent"
            v-if="fromData.muBanVo.attchmentFileInfo.length==0 && detailsBtn"
            @preserve="preserve"
            :uploadConfig="uploadConfig"
          ></uploadFiles>
          <el-col :span="18">
            <el-scrollbar>
              <div
                v-for="(item,index) in fromData.muBanVo.attchmentFileInfo"
                :key="item.id"
                class="comp_list"
              >
                <template>
                  <div class="command_file">
                    <span
                      class="name down"
                      :title="item.fileName"
                      @click="viewFile(item)"
                    >{{item.fileName}}</span>
                    <div class="btns">
                      <el-button
                        type="warning"
                        size="mini"
                        v-if="detailsBtn"
                        @click.native="deleteRow(index,item.fileId)"
                        :disabled="item.disabled"
                        round
                      >删除</el-button>
                      <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-card>
      <span slot="footer" class="dialog-footer" v-if="detailsBtn">
        <el-button @click=" dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="preserve('save')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="部门" :visible.sync="treeVisible" v-dialogDrag width="30%" :before-close="handleClose">
      <el-scrollbar style="height:400px">
        <el-tree 
          show-checkbox
          ref="departTree"
          :data="treeData"
          :check-on-click-node="true"
          :check-strictly="false"
          :default-expand-all="true"
          @check="handleNodeClick"
          :load="loadNode"
          lazy
          node-key="id">
        </el-tree>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mTable from "components/table/mTable.vue";
// import scrollIntoForm from '@/util/scrollValid'
import uploadFiles from "@/components/uploadFile/uploadFile";
// import uploadFiles from "@/components/uploadFile/uploadSingelFile";
import selectOrgOrDept from "@/views/serveEnsure/selectOrgOrDept";

export default {
  name: "DispatchFile",
  components: {
    mTable,
    uploadFiles,
    selectOrgOrDept
  },
  data() {
    return {
      dialogTit: "选择部门",
      singelCheckF: true, // 单选true 多选为false
      treeTradeCode: "",
      uniteCode: "",
      isSys: false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      down: false,
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
        noattachTitleCheck: true,
        newcode: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },

      fileList: [],
      buttonShow: false,
      detailsBtn: true,
      dialogVisible: false,
      options: [
        {
          value: "1",
          label: "系统问题"
        },
        {
          value: "2",
          label: "应用问题"
        },
        {
          value: "3",
          label: "版本内容"
        }
      ],
      moduleOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "系统问题"
        },
        {
          value: "2",
          label: "应用问题"
        },
        {
          value: "3",
          label: "版本内容"
        }
      ],
      searchForm: {
        type: "", //1:全部； 2:收藏
        function: "getNormalList", //待后台提供
        // docName:"", //文档名称
        flag: "",
        proCode: "", //功能模块
        page: 1, //当前页数
        limit: 20 //每页条数
      },
      tableLoading: false,
      tableData: [],
      tableCols: [
        {
          label: "问题名称",
          type: "Html",
          prop: "proTitle",
          align: "center",
          html: row => {
            return `<span style="color: #409eff; cursor: pointer;">${row.proTitle}</span>`;
          },
          handle: row => {
            this.details(row.id, true);
          }
        },
        { label: "问题内容", prop: "remark", align: "center" },
        { label: "问题分类", prop: "proName", align: "center" },
        {
          label: "操作",
          type: "Button",
          align: "center",
          btnList: [
            {
              label: "下载",
              size: "mini",
              type: "default",
              icon: "el-icon-caret-bottom",
              isDisabled: row => {
                return !row.attachments;
              },
              handle: row => {
                this.downFile(row.attachments[0]);
              }
            },
            {
              label: "查看",
              size: "mini",
              type: "default",
              icon: "el-icon-view",
              isDisabled: row => {
                return !row.buttonView;
              },
              handle: row => {
                let fileInfo = {
                  id: row.id,
                  filePath: row.attachments[0].filePath,
                  fileName: row.attachments[0].fileName
                };
                this.getFileInfo(this, fileInfo).then(res => {
                  if (res.state) {
                    let fileType = [
                      ".doc",
                      ".docx",
                      ".wps",
                      ".xls",
                      ".xlsx",
                      "ppt"
                    ];
                    let openFileType = [".pdf", ".jpg", ".jpeg", ".png"];
                    let openPlugin = false;
                    let openPage = false;
                    fileType.map(item => {
                      if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                        openPlugin = true;
                      }
                    });
                    if (openPlugin) {
                      this.doDraft(res);
                    } else {
                      // window.open(((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                      //                     row.attachments[0].filePath +
                      //                     "&fileName=" +
                      //                     row.attachments[0].fileName)+'&openFile=true','_blank');
                      //pdf jpg 浏览器打开
                      openFileType.map(item => {
                        if (
                          res.fileName.toLocaleLowerCase().indexOf(item) > -1
                        ) {
                          openPage = true;
                        }
                      });
                      if (openPage) {
                        window.open(
                          (this.$post.getEnvState()
                            ? location.origin
                            : "http://localhost:8080") +
                            "/ecpweb/getLocalFile.action?relativePath=" +
                            res.filePath +
                            "&fileName=" +
                            res.fileName +
                            "&openFile=true",
                          "_blank"
                        );
                      } else {
                        downLoadFileReName(
                          (this.$post.getEnvState()
                            ? location.origin
                            : "http://localhost:8080") +
                            "/ecpweb/getLocalFile.action?relativePath=" +
                            res.filePath +
                            "&fileName=" +
                            res.fileName +
                            "&openFile=true",
                          fileName
                        );
                      }
                    }
                  }
                });
              }
            },
            {
              label: "收藏",
              size: "mini",
              type: "default",
              icon: "",
              handle: row => {
                if (row.scFlag == 1) {
                  this.cancelCollection(row.id);
                } else {
                  this.addCollection(row.id);
                }
              }
            }
          ]
        }
        // { label: '收藏', type: 'Html', align: 'center',
        //   html:row=>{
        //     if(row.scFlag == 1){
        //       return `<span class='el-icon-star-on' style='cursor:pointer;font-size:22px;color: #dede13'></span>`
        //       }else{
        //       return `<span class='el-icon-star-off' style='cursor:pointer;font-size:22px;' ></span>`
        //     }
        //   },
        //  handle: row => {
        //    if(row.scFlag == 1){
        //      this.cancelCollection(row.id);
        //      }else{
        //      this.addCollection(row.id);
        //     }
        //   }
        // }
      ],
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      selectItems: [],

      fromData: {
        function: "saveNormal",
        muBanVo: {
          attchmentFileInfo: [],
          id: "",
          proTitle: "",
          proCode: "",
          proName: "",
          remark: "",
          unitId: "",
          unitName: "",
          unitIdIn: "",
          unitNameIn: ""
        }
      },
      treeParams: {
        function: "getAllNodes",
        flag: true,
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      },
      treeData: [],
      unitIdList: [],
      ruleForm: {
        mainOrganNames: "",
        deptIds: ""
      },
      treeVisible: false
    }
  },
  methods: {
    openDialog() {
      this.$post
        .postData(
          "getAllNodes",
          JSON.stringify(Object.assign(this.treeParams)),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log(res);
          this.treeData = res.data;
          this.treeVisible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = result.id;
    },
    //懒加载数据
    loadNode(node, resolve) {
      // if (node.level === 0) {
      //   this.node_has = node;
      //   this.resolve_has = resolve;
      //   this.handleLoadTree(this.unitId, resolve,'root');
      // }
      // if (node.level > 0) {
        let obj = {
          id: node.data.id
        };
        this.handleLoadTree(obj, resolve);
      // }
    },
    handleLoadTree(obj, resolve,level) {
      let urlInfo = "getAllNodes";
      if(!this.handleLoadFlag){
        return false;
      }
      // if(this.isCY == true){
      //   this.treeForm.function = "getAllNodes"
      //   this.treeForm.unitCode = (obj && obj.id) || "";
      //     this.$post
      //     .postData(
      //       "getAllNodes",
      //       JSON.stringify(this.treeForm),
      //       this.treeTradeCode
      //     )
      //     .then(res => {
      //       resolve(res.data);
      //     });
      // }else{
        //跟节点与 展开节点接口不同
        // if(level == 'root'){
        //  this.treeForm = Object.assign({},this.treeForm,this.fromdata);
        //  this.treeForm.function = "getAllNodes";
        // }else{
        //  this.treeForm = {
        //   flag: this.subOrgFlag,
        //   function:"getAllNodes",
        //  };
        // }
        // this.treeForm.unitCode = (obj && obj.id) || "";
          this.$post
          .postData(
            this.treeForm.function,
            JSON.stringify(this.treeForm),
            this.treeTradeCode
          )
          .then(res => {
            let checkNowIds = [];//选中的id
            // if(res.data&&res.data.length){
            //   res.data.map((node)=>{
            //     if(node.TYPE == "user"){
            //       node.isLeaf = true;
            //     }

            //     if( node.TYPE != "user" && !this.searchByContact ){
            //       node.disabled = true;
            //     }
            //   })
            // }
            if(this.loadingTree && this.searchByContact){
              this.$nextTick(()=>{
                if(obj.level == 0){
                  this.openIds = [res.data&&res.data[0]&&res.data[0].id];
                }
                this.checkIds.map((checkItem)=>{
                  res.data.map((treeItem)=>{
                    if(treeItem.id == checkItem){
                      checkNowIds.push(checkItem);
                    }
                  })
                  this.$refs[this.getTreeName()].setCheckedKeys(checkNowIds);
                })
              })
            }
            resolve(res.data);
          });
      // }

    },
    handleNodeClick(data) {
      if(data.TYPE!="user"){
        this.$refs['departTree'].setCheckedKeys([]);
        return;
      }  
      // console.log(data);
      this.checKList = data;
      // console.log(this.checKList)
      this.$nextTick(()=>{
        this.$refs['departTree'].setCheckedKeys([data.id]);
      })
    },
    submit(){
      this.checkNode(this.checKList);
      this.handleClose();
    },
    //关闭弹窗
    handleClose() {
      this.treeVisible = false;
    },

    arrow() {
      this.down = !this.down;
    },
    // 选择机构
    selectOrg(org) {
      let that = this;
      that.unitName = org.unitName;
      that.unitId = org.id;
      let transInfo =
        (localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo"))) ||
        "";
      that.$post
      .postData(
        "checkRole",
        JSON.stringify({
          function: "checkRole"
        }),
        that.$businessCode.fwbz
      )
      .then(res => {
        that.buttonShow = (transInfo.unitId == that.unitId)&&res.flag;
      });
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
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName, this.unitId);
    },

    problemChange(e) {
      this.options.forEach(item => {
        if (item.label == e) {
          this.fromData.muBanVo.proCode = item.value;
        }
      });
    },
    test() {
      alert(111);
    },
    // 保存
    preserve(type) {
      console.log(this.fromData);
      // if (!scrollIntoForm) {
      //   return
      // }
      if (type == "save") {
        if (
          !this.fromData.muBanVo.proTitle ||
          this.fromData.muBanVo.proTitle == ""
        ) {
          this.$message({
            type: "error",
            message: "问题名称不能为空!"
          });
          return;
        }

        if (
          !this.fromData.muBanVo.proName ||
          this.fromData.muBanVo.proName == ""
        ) {
          this.$message({
            type: "error",
            message: "问题分类不能为空!"
          });
          return;
        }

        if (
          !this.fromData.muBanVo.remark ||
          this.fromData.muBanVo.remark == ""
        ) {
          this.$message({
            type: "error",
            message: "问题内容不能为空!"
          });
          return;
        }
      }

      // this.fromData.function = 'saveNormal'
      this.$post
        .postData(
          "saveNormal",
          JSON.stringify(this.fromData),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.dialogVisible = false;
              this.initData(this.searchForm.flag);
              window.location.reload();
            }
            if (type === "uploadfile") {
              this.uploadConfig.id = res.id;
              this.fromData.muBanVo.id = res.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
            if (!type) {
              this.details(res.id);
            }
          }

          // if (res.success) {
          //   this.$message({
          //     message: "保存成功!",
          //     type: "success"
          //   });
          //   // this.fromData.muBanVo.id = res.data.id;
          //   // if(res.data.id){
          //     this.dialogVisible = false;
          //   // }
          //   this.initData(this.searchForm.flag);
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sysSave() {},
    //mock数据
    handleMock() {
      const Mock = require("mockjs");
      const count = 6;
      this.tableData = [];
      this.pagination.total = 12;
      for (let i = 0; i < count; i++) {
        this.tableData.push(
          Mock.mock({
            id: "@increment",
            questionName: "@ctitle(1,4) 问题",
            questionContent: "@ctitle(5, 10)问题内容",
            questionType: "@cname",
            uploadTime: "@date(yyyy-MM-dd)",
            statues: "@boolean"
          })
        );
      }
    },
    //手册下载 ----:TODO (待后台提供接口文档)
    bookDownload(row) {
      console.log("row", row);
      return;
      let doDownloadFile = { function: "doDownloadFile" };
      doDownloadFile.fileName = row.docName;
      doDownloadFile.filePath = row.docPath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(doDownloadFile),
          this.$businessCode.fwbzfj
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
    },
    //手册查看----:TODO (查看页面确认)
    bookView(row) {
      console.log(row);
    },
    //手册新增  -----:TODO
    uploadHandBook() {
      this.dialogVisible = true;
      this.detailsBtn = true;
      this.fromData.muBanVo.unitName = this.fromData.muBanVo.unitNameIn = this.unitName;
      this.fromData.muBanVo.unitId = this.fromData.muBanVo.unitIdIn = this.unitId;
      this.fromData.muBanVo.proTitle = "";
      this.fromData.muBanVo.id = "";
      this.fromData.muBanVo.proCode = "";
      this.fromData.muBanVo.proName = "";
      this.fromData.muBanVo.remark = "";
      this.fromData.muBanVo.attchmentFileInfo = [];
      this.uploadConfig.id = "";
      this.$api.setting.organization
        .getTree({
          unitClass: 1,
          unitCode: "1"
        })
        .then(res => {
          if (res.data.length > 0) {
            this.fromData.muBanVo.unitName = this.fromData.muBanVo.unitNameIn =
              res.data[0].unitName || "";
            this.fromData.muBanVo.unitIdIn = this.fromData.muBanVo.unitIdIn =
              res.data[0].unitCode || "";
          }
        });
      console.log("上传弹窗");
    },
    //批量删除 -----:TODO
    batchDele() {
      if (this.selectItems.length < 1) {
        this.$message.closeAll();
        this.$message({
          type: "warning",
          message: "请至少选择一条数据",
          duration: 2 * 1000
        });
        return;
      }
      this.$confirm("是否确定删除当前选中数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = this.selectItems;
          // return
          //待后端提供接口
          this.$post
            .postData(
              "deleteNormalEntityListById",
              JSON.stringify({ id, function: "deleteNormalEntityListById" }),
              this.$businessCode.fwbz
            )
            .then(res => {
              if (res && res.success) {
                this.selectItems = [];
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.refreshTable();
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            });
        })
        .catch(() => {});
      //调用删除接口;
      // this.$post.postData("getSendOrderList", JSON.stringify(this.searchForm), this.$businessCode.fwbz).then(res => {
      //   console.log("列表数据",res);
      //   this.tableData = res.data && res.data.rows||[];
      //   this.pagination.total = res.data&&res.data.total||0;
      // })
    },
    //字典表查询 ---:TODO
    getOptions() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            res.data.unshift({
              label: "全部",
              value: ""
            });
            this.moduleOptions = res.data;
          }
        });
    },
    searchFormFn() {
      this.pagination.page = this.searchForm.page = 1;
      this.tableData = [];
      this.searchForm.flag = "";
      this.initData(this.searchForm.flag);
    },
    //多选操作
    select(rows) {
      let selectItems = [];
      rows.map(function(value, index) {
        selectItems.push(value.id);
      });
      this.selectItems = selectItems.join(",");
    },
    //查看当前问题--- :TODO
    cellClick(row, column, cell, event) {
      console.log(row);
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData(this.searchForm.flag);
    },
    //切换每页条数
    handleSizeChange(val) {
      this.pagination.page = this.searchForm.page = 1;
      this.searchForm.limit = val;
      this.pagination.limit = val;
      this.tableData = [];
      this.initData(this.searchForm.flag);
    },
    refreshTable() {
      this.pagination.page = this.searchForm.page = 1;
      this.initData(this.searchForm.flag);
    },
    handleOpenPage(path, id) {
      console.log(111);
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 页面初始化加载数据
    initData(flag) {
      this.searchForm.unitName = this.unitName;
      this.searchForm.unitId = this.unitId;

      this.searchForm.flag = flag == 1 ? 1 : "";
      this.$post
        .postData(
          "getNormalList",
          JSON.stringify(Object.assign(this.searchForm, this.ruleForm)),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("列表数据", res);
          this.tableData = (res.data && res.data.rows) || [];
          this.pagination.total = (res.data && res.data.total) || 0;
        });
      // this.handleMock();
      return;
      //this.$businessCode.fwbz : A0846C019 ---服务保障业务线
      //this.$businessCode.fwbzfj : A08462020 ---服务保障附件业务线
    },

    // 收藏
    addCollection(id) {
      console.log(id);
      this.$post
        .postData(
          "addCollection",
          JSON.stringify({ id, function: "addCollection" }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              message: "收藏成功",
              type: "success"
            });
            this.refreshTable();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: "收藏失败"
            });
          }
        });
    },
    // 取消收藏
    cancelCollection(id) {
      console.log(id);
      // return
      //待后端提供接口
      this.$post
        .postData(
          "cancelCollection",
          JSON.stringify({ id, function: "cancelCollection" }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              message: "取消收藏成功",
              type: "success"
            });
            this.refreshTable();
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: "取消收藏失败"
            });
          }
        });
    },

    // 编辑
    edit() {
      if (this.selectItems.split(",").length != 1 || !this.selectItems) {
        this.$message.closeAll();
        this.$message({
          type: "warning",
          message: "请选择一条数据进行编辑!",
          duration: 2 * 1000
        });
        return;
      }
      this.details(this.selectItems);
    },

    // 详情
    details(id, btnshow) {
      this.dialogVisible = true;
      if (btnshow) {
        this.detailsBtn = false;
      } else {
        this.detailsBtn = true;
      }
      this.$post
        .postData(
          "findNormalById",
          JSON.stringify({ id, function: "findNormalById" }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.fromData.muBanVo = res.data;
            this.fromData.muBanVo.unitIdIn = res.data.unitId;
            this.fromData.muBanVo.unitNameIn = res.data.unitName;
            this.uploadConfig.id = res.data.id;

            this.fromData.muBanVo.attchmentFileInfo = [];
            if (
              res.data.attachments[0].filePath &&
              res.data.attachments[0].fileName
            ) {
              this.fromData.muBanVo.attchmentFileInfo.push({
                filePath: res.data.attachments[0].filePath,
                fileName: res.data.attachments[0].fileName,
                fileId: res.data.attachments[0].id
              });
            }
          }
        });
    },

    //获取下拉框数据
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile
        ? flagFile.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = flagFile
        ? flagFile.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          zhengWenState: 0,
          id: this.fromData.muBanVo.id,
          JYcode: this.$businessCode.fwbzfj,
          flowTranId:this.$businessCode.fwbzfjLoad,
          fileName: fileInfo ? fileInfo.fileName : "",
          relativePath: fileInfo ? fileInfo.filePath : "",
          pageFlag: "fawen"
        }
      });
      window.open(data.href, "_blank");
    },
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fwbzfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                window.open(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName,
                  file.fileName
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 1500
              });
            }
          }
        });
    },
    deleteRow(n, id) {
      let that = this;
      this.bank_deleteFileById.id = id;
      console.log(this.bank_deleteFileById);
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.fwbzfj
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
              // this.details(this.fromData.muBanVo.id);
              this.fromData.muBanVo.attchmentFileInfo=[];
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
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fwbzfj
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
    this.treeTradeCode = this.$businessCode.fwbz;
    // this.$api.setting.organization
    //   .getTree({
    //     unitClass: 1,
    //     unitCode: "1"
    //   })
    //   .then(res => {
    //     if (res.data.length > 0) {
    //       this.unitName = res.data[0].unitName || "";
    //       this.unitId = res.data[0].unitCode || "";
    //     } else {
    //       let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
    //       this.unitName = this.ruleForm.mainOrganNames = JSON.parse(
    //         localStorage.getItem("userInfo")
    //       ).shortUnitName;
    //       this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
    //       this.addDis = true;
    //       this.identity = false;
    //       this.isSys = true;
    //     }
    //     this.initData();
    //   });
    this.unitName = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo")).shortUnitName;
    this.$post
      .postData(
        "checkRole",
        JSON.stringify({
          function: "checkRole"
        }),
        this.$businessCode.fwbz
      )
      .then(res => {
        if (res) {
          this.buttonShow = res.flag;
        } else {
          this.buttonShow = false;
        }
      });

    this.uploadConfig.code = this.$businessCode.fwbzfj;
    this.uploadConfig.newcode = this.$businessCode.fwbz;
    this.initData(this.searchForm.flag);
  }
};
</script>
<style lang="less" scoped>
label {
  line-height: 36px;
}

.bitian {
  color: #f56c6c;
  margin-right: 4px;
}
.mtdown {
  padding: 20px 0 80px 0;
}

/deep/ .dispatchcswhlshwh {
  .tree-div {
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
.fu_jian_style {
  font-size: 14px;
  color: #000;
  margin: 30px 0 0 0px;
  line-height: 2;
}

.command_file {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/ .el-icon-star-on:before {
  color: #dede13 !important;
}
</style>
