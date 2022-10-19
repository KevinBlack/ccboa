<template>
  <div>
    <el-row>
      <el-col>
        <el-form ref="search" :model="search" label-width="90px" class="demo-ruleForm mt20">
          <el-row>
            <el-col :span="6">
              <el-form-item label="文件类型" prop="fileType">
                <el-select v-model="search.fileType" placeholder="请选择">
                  <el-option
                    v-for="item in fileType"
                    :key="item.value" 
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="示例标题" prop="fileTitle">
                <el-input v-model="search.fileTitle" placeholder="请输入示例标题进行搜索"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键词" prop="keywords">
                <el-input v-model="search.keywords" placeholder="请输入关键词进行搜索"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item prop="fabuTimeFrom" label="发布日期">
                <el-date-picker v-model="search.fabuTimeFrom" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" style></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line txtCenter" :span="1">-</el-col>
            <!-- <el-col class="line" :span="2">-</el-col> -->
            <el-col :span="4" >
              <el-form-item prop="fabuTimeTo" class="endTime">
                <el-date-picker v-model="search.fabuTimeTo" type="date" value-format="yyyy-MM-dd" placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="上传部门" prop="deptName">
                <el-input v-model="search.deptName"></el-input>
                <el-button
                  class="el-icon-arrow-down"
                  size="mini"
                  style="height:32px;margin-left:10px"
                  @click="openDialog"
                ></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="search.fileType=='发文'">
            <el-col :span="4">
              <el-form-item label="发文类型" prop="postType">
                <el-select v-model="search.postType" placeholder="请选择" @change="selectType">
                  <el-option
                    v-for="item in sendType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="业务分类" prop="ywType">
                <el-select v-model="search.ywType" placeholder="请选择">
                  <el-option
                    v-for="item in businessType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="代字红头" prop="redHead">
                <el-select v-model="search.redHead" placeholder="请选择">
                  <el-option
                    v-for="item in SredHead"
                    :key="item.redHead"
                    :label="item.redHead"
                    :value="item.redHead"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="文种" prop="documentCode">
                <el-select v-model="search.documentCode" placeholder="请选择">
                  <el-option
                    v-for="item in textType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="search.fileType=='签报'">
            <el-col :span="4">
              <el-form-item label="处理类型" prop="clType">
                <el-select v-model="search.clType" placeholder="请选择">
                  <el-option label="批件" value="批件"></el-option>
                  <el-option label="阅件" value="阅件"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="签报类型" prop="qianBaoType">
                <el-select v-model="search.qianBaoType" placeholder="请选择">
                  <el-option
                    v-for="item in qianbaoType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="签报字号" prop="qbNumber">
                <el-select v-model="search.qbNumber" placeholder="请选择">
                  <el-option
                    v-for="item in qbzihao"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="search.fileType=='呈送件'">
            <el-col :span="4">
              <el-form-item label="处理类型" prop="cltype">
                <el-select v-model="search.cltype" placeholder="请选择">
                  <el-option label="批件" value="批件"></el-option>
                  <el-option label="阅件" value="阅件"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="呈送字号" prop="csNumber">
                <el-select v-model="search.csNumber" placeholder="请选择">
                  <el-option label="建材呈" value="建材呈"></el-option>
                  <el-option label="ff" value="ff"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="float:right;margin-right:40px">
            <el-button type="primary" @click="submitForm">搜索</el-button>
            <el-button type="primary" @click="resetForm('search')">清空</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div slot="header" class="clearfix">
      <span>{{modelName}}收藏结果</span>
      <span class="num">(共{{total}}条)</span>
    </div>
    <!-- <div style="margin-top:20px">
      <el-button>模板</el-button>
      <el-button>范文</el-button>
    </div>-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:20px">
      <el-tab-pane label="模板" name="first"></el-tab-pane>
      <el-tab-pane label="范文" name="second"></el-tab-pane>
      <el-row>
        <el-col>
          <el-table
            :data="tableData"
            style="width:100%"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :default-sort="{ prot: 'date', order: 'descnding' }"
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="title" label="示例标题">
              <template slot-scope="scope">
                <el-button type="text" @click="detail(scope.row)">{{ scope.row.fileTitle }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="fileType" label="业务类型"></el-table-column>
            <el-table-column prop="deptName" width="240px" show-overflow-tooltip label="上传部门"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="fabuTime" sortable label="发布日期"></el-table-column>
            <el-table-column prop="avgScore" sortable label="综合评分"></el-table-column>
            <el-table-column prop="paraphraseNum" v-if="modelName=='模板'" sortable label="套用次数"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="cancel(scope.row)" type="text" size="small">取消收藏</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-tabs>
    <!-- 上传部门弹窗 -->
    <Dialog ref="dialog" @checkNode="checkNode" :treeData='treeData'></Dialog>
  </div>
</template>

<script>
// import {mapState, mapActions} from 'vuex'
import Dialog from "@/views/fwManagement/departDialog.vue";
import { Form } from "element-ui";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      getCollection_pamars: {
        function: "getCollection",
        querySearchVo: {},
        page: 1,
        limit: 10
      },
      sampleType:'模板',
      //   签报
      qbParams: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      //发文
      fwParams: {
        function: "getSendOrderDicByParam",
        organizationId: ""
      },
      bank_redheader: {
        function: "getTcDocTypeDicByParam",
        organizationId: "root",
        sendType: ""
      },
      treeParams: {
        function: "unitTreeFisrt",
        flag: false
      },
      cancel_pamars: {
        function: "cancel",
        id: ""
      },
      doDownloadFileParam: {
        function: "doDownloadFile",
        fileName:'',
        filePath:''
      },
      sendType: [], //发文类型
      businessType: [], //业务类型
      textType: [], //文种
      SredHead: [], //代字红头
      qianbaoType: [], //签报类型
      qbzihao:[],
      activeName: "first",
      search: {
        fileType: "",
        fileTitle: "",
        keywords: "",
        fabuTimeFrom: "",
        fabuTimeTo: "",
        deptName: "",
        deptId: "",
        postType: "",
        businessType: "",
        redHead: "",
        documentCode: "",
        clType: "",
        qianBaoType: "",
        qbNumber: "",
        csNumber: ""
      },
      fileType: [
        {
          value: "发文",
          label: "发文"
        },
        {
          value: "签报",
          label: "签报"
        },
        {
          value: "便函",
          label: "便函"
        },
        {
          value: "呈送件",
          label: "呈送件"
        }
      ],
      treeData:[],
      fileType1: [],
      modelName: "模板",
      total: 0,
      tableLoading: false,
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5, //每页数据
    };
  },
  // computed:{
  //   ...mapState(['qianbaoType'])
  // },
  created() {
    this.haveTableData();
    this.getQbList();
    this.getFwList();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.index);
      if (tab.index == "0") {
        this.modelName = "模板";
        this.sampleType = "模板";
        this.haveTableData();
      } else {
        this.modelName = "范文";
        this.sampleType = "范文";
        this.haveTableData();
      }
    },
    // 选择上传部门
    openDialog() {
      this.$refs.dialog.openDialog();
      this.$post
        .postData(
          "unitTreeFisrt",
          JSON.stringify(this.treeParams),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.treeData = res.data || [];
          this.treeData.filter((node,n)=>{
            if(n==0){
              node.disabled = true;
            }
          })||[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkNode(result) {
      console.log(result);
      this.search.deptName = result.name;
      this.search.deptId = result.id
    },
    // 搜索
    submitForm() {
      console.log(this.search)
      this.haveTableData();
    },
    //清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getQbList() {
      this.$post
        .postData(
          "getTcQbsignParamDicInfo",
          JSON.stringify(this.qbParams),
          this.$businessCode.qbgl
        )
        .then(res => {
          console.log(res);
          this.qianbaoType = JSON.parse(res.data.qianbaoType);
          this.qbzihao = JSON.parse(res.data.qbZihaoList) || [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFwList() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.fwParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.sendType = JSON.parse(res.data.sendType);
          console.log(this.sendType);
          this.businessType = JSON.parse(res.data.businessType);
          this.textType = JSON.parse(res.data.textType);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectType(value) {
      this.bank_redheader.sendType = value;
      this.getTcDocTypeDicByParam();
    },
    //获取代字红头
    getTcDocTypeDicByParam() {
      this.$post
        .postData(
          "getTcDocTypeDicByParam",
          JSON.stringify(this.bank_redheader),
          this.$businessCode.fawgl
        )
        .then(res => {
          // console.log(res)
          this.SredHead = (res && res.data) || [];
        });
    },
    //列表
    haveTableData() {
      this.getCollection_pamars.page = this.currentPage;
      this.getCollection_pamars.limit = this.pagesize;
      this.getCollection_pamars.querySearchVo = this.search;
      this.getCollection_pamars.querySearchVo.sampleType = this.sampleType
      this.$post
        .postData(
          "getCollection",
          JSON.stringify(this.getCollection_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.tableData = (res.data && res.data.rows) || [];
          this.total = res.data.total || 0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.currentPage = 1;
      this.haveTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.haveTableData();
    },
    //详情
    detail(row) {
      // this.$router.push({ name: "collectDetail", query: { id: id } });
      // const routeData = this.$router.resolve({
      //   path: "/collectDetail",
      //   query: {
      //     id: id
      //   }
      // });
      // window.open(routeData.href, "_blank");
      let fileInfo = row.attachments&&row.attachments.length&&row.attachments[0]||{};
      let routeData;
      let that = this;
      let pageData = {
        id: row.id,
        multiTenancyId: that.$route.query.multiTenancyId,
        processInstId: that.$route.query.processInstId,
        code: that.$route.query.pageFlag== 'signqutote' ?that.$businessCode.qbglfj:that.$businessCode.fawglfj,
        wenjianId: that.$route.query.wenjianId,
        page:  that.$route.query.pageFlag== 'signqutote' ? 'qianbao':'fawen',
      };
      // if(this.activeName == "first"){
        
        this.getFileInfo(that,fileInfo).then(res => {
          if (res.state) {
            pageData.fileName = res.fileName;
            pageData.filePath = res.filePath;
            pageData.filePathNew = row.attachments[0].filePath;
            // pageData.newFilePath = row.attachments[0].filePath;
            pageData.newFilePath = "/home/ap/nas/nas_d/000010000/2022/2/16";
            routeData = that.$router.resolve({
              path: "/collectDetail",
              query:pageData
            });
            window.open(routeData.href, "_blank");
          }
        })
    },
     //请求文件路径
    async getFileInfo(self,fileInfo) {
      var successInfo = { state: false };
      self.doDownloadFileParam.fileName = fileInfo.fileName;
      self.doDownloadFileParam.filePath = fileInfo.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.doDownloadFileParam),
          self.$businessCode.fwglfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
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
    //取消收藏
    cancel(row) {
      this.cancel_pamars.id = row.collectId;
      this.$post
        .postData(
          "cancel",
          JSON.stringify(this.cancel_pamars),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({
              message: "已取消收藏",
              type: "success"
            });
             this.haveTableData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.el-form-item__content {
  display: flex;
}
/deep/ .el-card__body {
  padding: 0;
}
.clearfix {
  height: 30px;
  border-bottom: 1px solid #eee;
  margin-top: 30px;
  font-weight: bolder;
}
.num {
  font-size: 12px;
}
/deep/.el-tabs--card > .el-tabs__header {
  border: none;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #e4e7ed;
  margin-right: 10px;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background: #409eff;
  color: #fff;
}
/deep/.endTime .el-form-item__content{
  margin-left: 0 !important;
}
</style>