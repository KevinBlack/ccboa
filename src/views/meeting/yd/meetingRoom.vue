<!--
 * @Author: your name
 * @Date: 2020-08-01 11:03:25
 * @LastEditTime: 2020-08-01 18:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\blueDetail.vue
-->
<script src="../../../minixs/index.js"></script>/**
* create by zz on 2020/8/1 17:00
* 类注释：
* 备注：会议预订/参数维护/参数配置/新建文档
*/
<template>
  <div class="meetingRoom">
    <div class="headerClick">
      <div class="right">
        <el-button size="small" @click="save" plain v-if="paramInfo.status=='1'">保存</el-button>
        <el-button size="small" @click="closeWindow" plain>关闭</el-button>
      </div>
    </div>
    <div class="meetingRoomHeader">
      <div class="title-text">{{pageTitle}}会议室信息单</div>
    </div>

    <div class="process_content">
      <el-form ref="formData" :rules="rules" :model="formData" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称">
              <el-input v-model="formData.hostDepartment" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
<!--            <el-form-item label="会议室位置" prop="address">
              <el-input v-model="formData.address" disabled>
                <el-button
                  slot="append"
                  icon="el-icon-circle-plus-outline"
                  :disabled="paramInfo.status=='2'"
                  @click="dialog1Visible=true"
                >选择</el-button>
              </el-input>
            </el-form-item>-->
            <el-form-item label="会议室位置" prop="address">
              <el-input v-model="formData.address" :disabled="paramInfo.status=='2'"  maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="会议室名称" prop="roomName">
              <el-input v-model="formData.roomName" :disabled="paramInfo.status=='2'"  maxlength="200"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">
            <el-form-item label="会议室类型" prop="roomType">
              <el-select
                v-model="formData.roomType"
                placeholder="请选择"
                :disabled="paramInfo.status=='2'"
              >
                <el-option
                  v-for="item in meetingRoomTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议室布局" prop="layoutType">
              <el-radio-group v-model="formData.layoutType" @change="clean" :disabled="paramInfo.status=='2'">
                <el-radio :label="'1'">长桌型</el-radio>
                <el-radio :label="'2'">主席台型</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.layoutType=='1'">
            <el-form-item label="会议室座位数" prop="roomSeat">
              <el-input
                v-model="formData.roomSeat"
                @input="toNumber(formData.roomSeat,'roomSeat')"
                :disabled="paramInfo.status=='2'"
                 maxlength="200"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.layoutType=='2'">
            <el-form-item label="主席座位数" prop="hostSeat">
              <el-input
                @input="toNumber(formData.hostSeat,'hostSeat')"
                v-model="formData.hostSeat"
                :disabled="paramInfo.status=='2'"
                 maxlength="200"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.layoutType=='2'">
            <el-form-item label="观众席座位数" prop="rows">
              <el-input
                v-model="formData.rows"
                @input="toNumber(formData.rows,'rows')"
                :disabled="paramInfo.status=='2'"
                style="width:50%;"
                 maxlength="200"
              >
                <span slot="append">行</span>
              </el-input>
              <el-input
                v-model="formData.lines"
                @input="toNumber(formData.lines,'lines')"
                :disabled="paramInfo.status=='2'"
                style="width:50%;"
                 maxlength="200"
              >
                <span slot="append">列</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="节假日是否开放">
              <el-radio-group v-model="formData.holidaysStatus" :disabled="paramInfo.status=='2'">
                <el-radio :label="'1'">关闭</el-radio>
                <el-radio :label="'0'">开启</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最大容纳人数">
              <el-input
                v-model="formData.maxRong"
                @input="toNumber(formData.maxRong,'maxRong')"
                :disabled="paramInfo.status=='2'"
                 maxlength="200"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需提前预订天数" prop="advanceTime">
              <el-input
                v-model="formData.advanceTime"
                @input="toNumber(formData.advanceTime,'advanceTime')"
                :disabled="paramInfo.status=='2'"
                 maxlength="200"
              >
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否对外事开放" prop="isOpen"
            >
              <el-radio-group v-model="formData.isOpen" :disabled="paramInfo.status=='2'">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否允许上传附件" prop="isUpload"
            >
              <el-radio-group v-model="formData.isUpload" :disabled="paramInfo.status=='2'">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行领导会议专用" prop="isLeaderUse"
            >
              <el-radio-group v-model="formData.isLeaderUse" :disabled="paramInfo.status=='2'">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否审批" prop="approvalType"
            >
              <el-radio-group v-model="formData.approvalType" :disabled="paramInfo.status=='2'">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- required: formData.approvalType=='1',trigger: 'blur',message: '请输入审批时限' -->
            <el-form-item label="审批时限" prop="approvalTime" :rules="[{required: true,pattern:/^[1-9]\d*$/,message:'请输入大于0的整数'}]">
              <el-input v-model="formData.approvalTime" @input="toNumber(formData.approvalTime,'approvalTime')" :disabled="paramInfo.status=='2'"  maxlength="200">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人" prop="roomAdmin">
              <el-input v-model="formData.roomAdmin" :disabled="paramInfo.status=='2'"  maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="roomPhone">
              <el-input v-model="formData.roomPhone" @input="toNumber(formData.roomPhone,'roomPhone','phone')" :disabled="paramInfo.status=='2'"  maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="可提供服务">
              <el-checkbox-group
                v-model="formData.roomServiceArrayId"
                :disabled="paramInfo.status=='2'"
              >
                <el-checkbox
                  v-for="item in serviceList"
                  :label="item.paramName"
                  :key="item.paramCode"
                >{{item.paramName}}</el-checkbox>
              </el-checkbox-group>
              <el-input v-if="serviceList.length==0" value="无提供服务" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="管理员反馈">
              <el-input
                type="textarea"
                :rows="3"
                maxlength="500"
                v-model="formData.feedback"
                :disabled="paramInfo.status=='2'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                maxlength="500"
                v-model="formData.remark"
                :disabled="paramInfo.status=='2'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序" prop="sort"> 
              <el-input v-model="formData.sort" @input="toNumber(formData.sort,'sort')" :disabled="paramInfo.status=='2'"  maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="附件">
            <uploadFile
              ref="uploadComponent"
              @preserve="save"
              @initsearch="initPage"
              :uploadConfig="uploadConfig"
            ></uploadFile>
            <el-col>
              <div class="tree_w" v-if="formData.attchment&&formData.attchment.length">
                <el-scrollbar>
                  <div v-for="(item,index) in  formData.attchment" :key="index" class="comp_list">
                    <template>
                      <div class="command_file">
                        <span class="name" style="width: 50px;">{{index+1}}</span>
                        <!-- 预览 -->
                        <span
                          class="name down"
                          :title="item.fileName"
                          @click="viewDraftFile(item.fileName,item.filePath,$businessCode.hysydfj)"
                        >{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                        <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(item,'up')"
                              v-if="formData.attchment.length>1"
                              :disabled="index==0  || formData.isLock == 1 || uploadConfig.subTempAddF"
                              round
                            >上移</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downRow(item,'down')"
                              v-if="formData.attchment.length>1"
                              :disabled="(index==formData.attchment.length-1)  || (formData.isLock == 1) || uploadConfig.subTempAddF"
                              round
                            >下移</el-button>
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled || formData.isLock == 1 || uploadConfig.subTempAddF"
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
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <closeMessage @btnCloseHandler="btnCloseHandler" :closeHandler="closeHandler"></closeMessage>
<!--    <el-dialog v-dialogDrag title="会议室空间绑定" :visible.sync="dialog1Visible" width="80%">
      <el-row>
        <el-col class="treebox" :span="8">
          <el-tree
            :data="spaceTree"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-col>
        <el-col class="contentbox" :span="15" :offset="1">
          <mtable
            :height="'461'"
            :loading="tableLoading"
            :isPagination="false"
            :sortable="false"
            :tableData="tableData"
            :tableCols="tableCols"
          ></mtable>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog1Visible=false">取消</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
import mtable from "@/components/table/mTable";
import uploadFile from "@/components/uploadFile/meetUploadlFile";
import closeMessage from '@/components/closeMessage/index';
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "meetingRoom",
  components: {
    mtable,
    uploadFile,
    closeMessage
  },
  data() {
    var seat_required = (rule, value, callback) => {
      if (!this.formData.rows) {
        callback(new Error("请输入观众席行"));
      } else if (!this.formData.lines) {
        callback(new Error("请输入观众席列"));
      } else {
        callback();
      }
    };
    return {
      closeHandler:false,
      pageTitle: "",
      paramInfo: {
        status: "" //1:编辑、2：只读
      },
      dialog1Visible: false,
      rules: {
        address: [
          {
            required: false,
            trigger: "blur",
            message: "请选择会议室地址"
          }
        ],
        roomName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入会议室名称"
          }
        ],
     /*   roomType: [
          {
            required: true,
            trigger: "blur",
            message: "请输入会议室类型"
          }
        ],*/
        layoutType: [
          {
            required: true,
            trigger: "blur",
            message: "请选择会议室布局"
          }
        ],
        hostSeat: [
          {
            required: true,
            trigger: "blur",
            message: "请输入座位数"
          }
        ],
        roomSeat: [
          {
            required: true,
            trigger: "blur",
            message: "请输入座位数"
          }
        ],
        rows: [
          { validator: seat_required, trigger: "blur" },
          {required: true,trigger: "blur"}
        ],
        advanceTime: [
          {
            required: true,
            trigger: "blur",
            message: "请输入提前预定天数"
          }
        ],
        approvalType: [
          {
            required: true,
            trigger: "blur",
            message: "请选择是否审批"
          }
        ],
        roomAdmin: [
          {
            required: true,
            trigger: "blur",
            message: "请输入联系人"
          }
        ],
        roomPhone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入联系电话"
          }
        ]
      },
      formData: {
        hostDepartment: "",
        address: "",
        roomFloor: "", //绑定空间树节点id
        roomPositionId: "", //空间信息Id
        roomName: "",
        //roomType: "",
        layoutType: "1",
        rows: null,
        lines: null,
        roomSeat: null,
        hostSeat: null,
        maxRong: null,
        holidaysStatus: "1",
        isOpen:"0",
        isUpload:"0",
        roomAdmin: "",
        roomPhone: "",
        advanceTime: "",
        isLeaderUse: "0",
        approvalType: "1",
        approvalTime: "",
        roomServiceArrayId: [],
        feedback: "",
        remark: "",
        sort:"",
        attchment: []
      },
      spaceTree: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      /*meetingRoomTypeList: [
        { label: "小会议室", value: "1" },
        { label: "中会议室", value: "2" },
        { label: "大会议室", value: "3" },
        { label: "VIP会议室", value: "4" }
      ],*/
      serviceList: [],
      /*tableCols: [
        { prop: "name", label: "空间名称", align: "center" },
        { prop: "encode", label: "空间编码", align: "center" },
        {
          label: "操作",
          align: "center",
          type: "Button",
          btnList: [
            {
              type: "primary",
              size: "small",
              label: "已绑定",
              style: "width:100px",
              isShow:row => {
                let ifShow=false;
                if(row.isBinding>0){
                  ifShow=true;
                }
                return ifShow;
              },
              isDisabled:()=>{
                return true;
              },
            },
            {
              type: "primary",
              size: "small",
              label: "绑定",
              style: "width:100px",
              isShow:row => {
                let ifShow=false;
                if(row.isBinding==0){
                  ifShow=true;
                }
                return ifShow;
              },
              handle: row => {
                return this.bangding(row);
              },
            },
          ]
        }
      ],
      tableData: [],
      tableLoading: false,
      dialogInfo: {
        address: ""
      },*/
      searchData: {
        function: "hys",
        operationType: "11",
        catalogNo: "",
        spcType: "HYS"
      },
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        attachTitle: "", //附件标题
        noattachTitleCheck:true,//是否不校验附件名称
        subTempAddF: true //是否可以上传附件 true是不能上传   false是可以上传
      },
      //附件上移，下移
      bank_upDownFile: {
        function: "changeAttachSort",
        fileId: "",
        sortType: ""
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
      //保存
      saveFun: {
        function: "hys",
        operationType: "1" //1新增 2修改
      },
    };
  },
  mixins: [viewDraft],
  computed: {},
  methods: {
    closeWindow() {
      if (this.paramInfo.status == "2") {
        window.close();
      } else {
        this.closeHandler = true;
      }
    },
    async btnCloseHandler(val){
      if(val == 1){
        window.close();
      }else if(val == 2){
        await this.save();
        window.location.href = "about:blank";
        window.opener.location.reload();window.close();
      }else{
        this.closeHandler = false
      }
    },
    /* 页面左侧空间树方法 */
    initTree() {
      this.$post
        .postData(
          "kjfz",
          JSON.stringify({
            function: "kjfz",
            operationType: "4",
            name: "",
            unitName: JSON.parse(localStorage.getItem("userInfo")).shortUnitName
          }),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.data) {
            this.spaceTree = res.data.menu;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存
    save(type) {
      this.uploadConfig.subTempAddF = true;
      this.$refs.formData.validate((valid, object) => {
        if (valid) {
          this.uploadConfig.subTempAddF = false;
          var obj = Object.assign(this.saveFun, this.formData);
          let roomId=getFormId(
            this.$route.query.roomId,
            "roomId"
          );
          if(roomId || this.paramInfo.status=='2'){
            this.saveFun.operationType = "2";
          }
          this.$post
            .postData("hys", JSON.stringify(obj), this.$businessCode.hysyd)
            .then(res => {
              if (res && res.success) {
                if (res.data && res.data.roomId) {
                  this.formData.roomId=JSON.parse(JSON.stringify(res.data.roomId));
                  this.uploadConfig.id = res.data.roomId;
                  getFormId(
                    this.$route.query.roomId,
                    "roomId",
                    res.data.roomId
                  );
                }
                if(type=='uploadfile'){
                  this.$refs.uploadComponent.uploadFileNow('1');
                }
                if (type!='uploadfile'&&type!='file') {//type:uploadfile 无roomId表单上传附件 file有roomId表单附件上传
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "保存成功",
                    duration: 1000
                  });
                }
              }
            });
        } else {
          this.uploadConfig.subTempAddF = false;
          if (type == "uploadfile" || type =="file") {
            this.$message.error("请先完成页面必填内容再上传附件！");
          }
        }
      });
    },
    handleNodeClick(data) {
      this.tableLoading = true;
      if (data && data.id) {
        this.searchData.catalogNo = data.id;
      }
      this.$post
        .postData(
          "hys",
          JSON.stringify(this.searchData),
          this.$businessCode.hysyd
        )
        .then(res => {
          this.tableLoading = false;
          if (res && res.data) {
            this.tableData = res.data.pbiSpaceOutVo;
          }
        })
        .catch(err => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    bangding(row, node) {
      this.formData.address = row.address;
      this.formData.roomPositionId = row.encode;
      this.formData.roomFloor = row.catalogNo;
      this.dialog1Visible = false;
    },
    //所需服务列表
    getMeetTypeList() {
      let httpData = {
        function: "doFindParams",
        paramType: "0"
      };
      this.$post
        .postData(
          "doFindParams",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.serviceList = res.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(erro => {
          this.$message.error("请求失败");
        });
    },
    //正文跳转
    doDraft(fileInfo,saveName) {
      let data;
      let fileConfig = fileInfo;
      data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id: getFormId(this.$route.query.roomId, "roomId"),
          zhengWenState: 0,//是否可编辑
          JYcode: this.$businessCode.hysydfj,
          relativePath: fileConfig ? fileConfig.filePath : "",
          fileName: fileConfig ? fileConfig.fileName : "",
          tmpFileName: fileConfig ? fileConfig.fileNameTh : "",
          tmpFilePath: fileConfig ? fileConfig.filePathTh : "",
          showBtns: this.zhengWenState == 0 ? false : true,
          saveSpecialFileName:saveName
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.formData.attachSort.push(
        {
          id: this.formData.attchment[n - 1].id,
          sort: this.formData.attchment[n].sort
        },
        {
          id: this.formData.attchment[n].id,
          sort: this.formData.attchment[n - 1].sort
        }
      );
      midObj = this.formData.attchment[n];
      this.formData.attchment[n] = this.formData.attchment[n - 1];
      this.formData.attchment[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(item, type) {
      this.bank_upDownFile.fileId = item.id;
      this.bank_upDownFile.sortType = type;
      this.$post
        .postData(
          "changeAttachSort",
          JSON.stringify(this.bank_upDownFile),
          this.$businessCode.hysydfjDownload
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              this.initPage('changesort');
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "改变顺序失败,请联系管理员",
                duration: 1500
              });
            }
          }
        });
    },
    deleteRow(n, id) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bank_deleteFileById.id = id;
          this.$post
            .postData(
              "deleteFileById",
              JSON.stringify(this.bank_deleteFileById),
              this.$businessCode.hysydfjDownload
            )
            .then(res => {
              if (res) {
                if (res && res.success) {
                  this.$message({
                    type: "success",
                    showClose: true,
                    offset: 400,
                    message: "删除成功",
                    duration: 1000
                  });
                  this.formData.attchment.splice(n, 1);
                  this.uploadConfig.filesHas = this.formData.attchment;
                } else {
                  this.$message({
                    type: "error",
                    showClose: true,
                    offset: 400,
                    message: "删除失败",
                    duration: 1000
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
          this.$businessCode.hysydfjDownload
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
                duration: 1000
              });
            }
          }
        });
    },
    clean(){
      this.formData.roomSeat=null;
      this.formData.hostSeat=null;
      this.formData.rows=null;
      this.formData.lines=null;
    },
    //页面初始化数据
    initPage(flags) {
      let roomId=getFormId(
        this.$route.query.roomId,
        "roomId"
      );
      if (roomId) {
        this.uploadConfig.id = roomId;
        this.saveFun.operationType = "2";
        var obj = {
          function: "hys",
          operationType: "5",
          roomId: roomId
        };
        this.$post
          .postData("hys", JSON.stringify(obj), this.$businessCode.hysyd)
          .then(res => {
            if (res && res.rows) {
              this.uploadConfig.filesHas=JSON.parse(JSON.stringify(res.rows.attchment));
              this.formData.attchment=res.rows.attchment && JSON.parse(JSON.stringify(res.rows.attchment));
              if(flags){
                this.save("file");
                return
              }
              this.formData = Object.assign(this.formData,res.rows);
              this.serviceList = [];
              if (res.rows.serviceList && res.rows.serviceList.length > 0) {
                for (var i = 0; i < res.rows.serviceList.length; i++) {
                  if(res.rows.serviceList[i]!=''){
                    this.serviceList.push({
                      paramCode:"code" + i,
                      paramName:res.rows.serviceList[i]
                    });
                  }
                }
              }
            }
          });
      } else {
        this.getMeetTypeList();
        this.formData.hostDepartment = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitName;
        this.formData.unitId =
          JSON.parse(localStorage.getItem("userInfo")).unitName +
          JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.formData.roomAdmin = JSON.parse(
          localStorage.getItem("userInfo")
        ).humanName;
      }
    },
    toNumber(val,key,type){
      if(type=='phone'){
        val=val.replace(/[\u4e00-\u9fa5]/g,'');
      }else{
        val=val.replace(/[^\d]/g,'');
      }
      this.formData[key]=val;
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.pageTitle=JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.paramInfo.status = this.$route.query.status;
    //初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.hysydfj;
    this.paramInfo = this.$route.query;
    this.uploadConfig.subTempAddF = this.paramInfo.status == "2" ? true : false;
    //this.initTree();
    this.initPage();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.meetingRoom {
  background-color: rgb(240, 245, 250);
  margin: 0 auto;
  .boxborder{
    padding: 0 15px;
    border: 1px solid #DCDFE6;
    background: #fff;
    display: inline-block;
    width: 100%;
  }

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-left: 20px;
      float: left;
    }
  }

  .meetingRoomHeader {
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
    width: 92%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
    //上传附件
    .tree_w {
      height: 200px;
      padding: 20px;
      overflow: scroll;
      margin: 20px 0 0 130px;
      margin-left: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      .command_file {
        display: flex;
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
        }
        .name {
          white-space: nowrap;
          height: 42px;
          padding: 0 10px;
          line-height: 42px;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .down {
          cursor: pointer;
          min-width: 550px;
          padding: 0 50px 0 10px;
          cursor: pointer;
          flex: auto;
        }
        .down:hover {
          color: #3b85ef;
        }
      }
    }
  }
}
.row {
  height: 100%;
}
.treebox {
  height: 500px;
  overflow: scroll;
  border: 1px solid #aaa;
}
.contentbox {
  height: 500px;
  overflow: scroll;
  // border: 1px solid #aaa;
}
/deep/ .el-radio__label {
  width: 40px;
  display: inline-block;
}
</style>
<style>
.meetingRoom .el-select {
  display: block;
}
.meetingRoom .file_wp {
  margin-left: 0 !important;
}
.meetingRoom .el-row {
  min-height: 60px;
}
</style>
