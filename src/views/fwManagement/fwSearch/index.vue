<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="search" ref="search" label-width="90px" class="demo-ruleForm mt20">
          <el-row>
            <el-col :span="8">
              <el-form-item label="文件类型" prop="fileType">
                <el-select v-model="search.fileType" placeholder="请选择" :disabled="pageFlag" style="width:100%;">
                  <el-option
                    v-for="item in fileTypes"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="示例标题" prop="fileTitle">
                <el-input v-model="search.fileTitle" placeholder="请输入示例标题进行搜索"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关键词" prop="keywords">
                <el-input v-model="search.keywords" placeholder="请输入关键词进行搜索"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发布日期">
                <el-form-item prop="fabuTimeFrom">
                  <el-date-picker
                    v-model="search.fabuTimeFrom"
                    type="date"
                    placeholder="起始日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-col class="line txtCenter" :span="1">-</el-col>
                <el-form-item prop="fabuTimeTo">
                  <el-date-picker
                    v-model="search.fabuTimeTo"
                    type="date"
                    placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
            <el-col :span="6">
              <el-form-item label="发文类型" prop="postType">
                <el-select v-model="search.postType" placeholder="请选择" @change="selectType" style="width:100%;">
                  <el-option
                    v-for="item in sendType"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务分类" prop="businessType">
                <el-select v-model="search.businessType" placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in businessType"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="代字红头" prop="redHead">
                <el-select v-model="search.redHead" placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in SredHead"
                    :key="item.redHead"
                    :label="item.redHead"
                    :value="item.redHead"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="文种" prop="documentCode">
                <el-select v-model="search.documentCode" placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in textType"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="search.fileType=='签报'">
            <el-col :span="6">
              <el-form-item label="处理类型" prop="dealType">
                <el-select v-model="search.dealType" placeholder="请选择">
                  <el-option label="批件" value="批件"></el-option>
                  <el-option label="阅件" value="阅件"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签报类型" prop="qianBaoType">
                <el-select v-model="search.qianBaoType" placeholder="请选择">
                  <el-option
                    v-for="item in qianbaoType"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签报字号" prop="qbNumber">
                <el-select v-model="search.qbNumber" placeholder="请选择">
                  <el-option
                    v-for="item in qbNumber"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="search.fileType=='呈送件'">
            <el-col :span="6">
              <el-form-item label="处理类型" prop="dealType">
                <el-select v-model="search.dealType" placeholder="请选择">
                  <el-option label="批件" value="批件"></el-option>
                  <el-option label="阅件" value="阅件"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="呈送字号" prop="csNumber">
                <el-select v-model="search.csNumber" placeholder="请选择">
                  <el-option
                    v-for="item in fileType1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
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
      <span>{{modelName}}查询结果</span>
      <span class="num">(共{{pagination.total}}条)</span>
    </div>
    <!-- <div style="margin-top:20px">
      <el-button>模板</el-button>
      <el-button>范文</el-button>
    </div>-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:20px">
      <el-tab-pane label="模板" name="first"></el-tab-pane>
      <el-tab-pane label="范文" name="second" v-if="!pageFlag"></el-tab-pane>
      <el-row>
        <el-col>
          <!-- <el-table
            :data="tableData"
            style="width:100%"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :default-sort="{ prot: 'date', order: 'descnding' }"
            highlight-current-row
            @row-click="change"
          >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="fileTitle" label="示例标题" width="240">
              <template slot-scope="scope">
                <el-button type="text">{{ scope.row.title }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="fileType" label="业务类型" width="240"></el-table-column>
            <el-table-column prop="deptName" label="上传部门" show-overflow-tooltip width="240"></el-table-column>
            <el-table-column prop="author" label="作者" width="240"></el-table-column>
            <el-table-column prop="fabuTime" sortable label="发布日期" width="240"></el-table-column>
            <el-table-column prop="avgScore" sortable label="综合评分"></el-table-column>
            <el-table-column prop="paraphraseNum" v-if="modelName=='模板'" sortable label="套用次数"></el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="search.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>-->
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @cellClick="change"
            v-loading="false"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
    <!-- 上传部门弹窗 -->
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import Dialog from "@/views/fwManagement/departDialog.vue";

const tableCols = [
  { label: "业务类型", prop: "fileType", align: "center", width: "100px" },
  { label: "上传部门", prop: "deptName", align: "center", width: "220px" },
  { label: "标题", prop: "fileTitle", align: "center", minwidth:"40%" },
  { label: "作者", prop: "author", align: "center", width: "110px" },
  { label: "发布日期", prop: "fabuTime", align: "center", width: "120px" },
  { label: "综合评分", prop: "avgScore", align: "center", width: "80px" },
  { label: "套用次数", prop: "paraphraseNum", align: "center", width: "80px" }
]
export default {
  components: {
    Dialog,
    mTable
  },
  data() {
    return {
      activeName: "first",
      //   签报
      qbParams: {
        function: "getTcQbsignParamDicInfo",
        organizationId: ""
      },
      doDownloadFileParam: {
        function: "doDownloadFile",
        fileName:'',
        filePath:''
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
      search: {
        function: "QueryMuBanDocument",
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
        dealType: "",
        qianBaoType: "",
        qbNumber: "",
        csNumber: "",
        page: 1,
        limit: 10,
        sampleType: 0
      },
      treeParams: {
        function: "unitTreeFisrt",
        flag: false
      },
      fileTypes: [
        {
          value: "1",
          label: "发文"
        },
        {
          value: "2",
          label: "签报"
        },
        // {
        //   value: "3",
        //   label: "便函"
        // },
        // {
        //   value: "4",
        //   label: "呈送件"
        // }
      ],
      fileType1: [],
      //发文下拉框数据
      sendType: [], //发文类型
      businessType: [], //业务类型
      textType: [], //文种
      SredHead: [], //代字红头
      //签报
      qianbaoType: [], //签报类型
      qbNumber: [],
      modelName: "模板",
      total: 0,
      tableLoading: false,
      tableData: [],
      tableCols: tableCols,
      treeData: [],
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      },
      pageFlag:'',
    };
  },
  created() {
    this.pageFlag = this.$route.query.pageFlag;
    this.transfromDatas(this.pageFlag);
    localStorage.setItem("closeFanWenpages","");//套用时关闭标示
    this.getQbList();
    this.getFwList();
    if(this.pageFlag){
      this.handleClick({index:0})
    }
  },
  methods: {
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.submitForm()
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.tableData = []
      this.submitForm()
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
    transfromDatas(n){
      switch(n){
        case 'bankDispach':
        this.search.fileType = '发文'
        break;
        case 'signqutote':
        this.search.fileType = '签报'
        break;
        default:
        this.search.fileType = ''
        break;
      }
    },
    handleClick(tab, event) {
      console.log(tab.index);
      this.search.sampleType = tab.index;
      if (tab.index == "0") {
        this.modelName = "模板";
        this.activeName = 'first';
      } else {
        this.modelName = "范文";
        this.activeName = 'second';
      }
      
      this.submitForm()
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
          this.qbNumber = JSON.parse(res.data.qbZihaoList);
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
          console.log(res);
          this.sendType = JSON.parse(res.data.sendType);
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
          if (res.data) {
            this.SredHead = res.data;
          }
        });
    },
    //选择上传部门
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
          this.treeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkNode(result) {
      // console.log(result);
      this.search.deptName = result.name;
      this.search.deptId = result.id;
    },
    submitForm() {
      this.$post
        .postData(
          "QueryMuBanDocument",
          JSON.stringify(Object.assign(this.search, this.pagination)),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows;
          this.pagination.total = res.data&&res.data.total||0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change(row) {
      //  console.log(row)
      // this.$router.push({ name: "collectDetail", query: { id: row.id } });
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
      if(this.pageFlag){
        pageData.showT = true;
      }
      // if(this.activeName == "first"){
        
        this.getFileInfo(that,fileInfo).then(res => {
          if (res.state) {
            pageData.fileName = res.fileName;
            pageData.filePath = res.filePath;
            pageData.filePathNew = row.attachments[0].filePath;
            // pageData.newFilePath = row.attachments[0].filePath;
            pageData.newFilePath = "/home/ap/nas/nas_d/000010000/2022/2/16";
            // console.log(pageData);
            routeData = that.$router.resolve({
              path: "/collectDetail",
              query:pageData
            });
            window.open(routeData.href, "_blank");
          }
        })
      // }else{
      //       routeData = that.$router.resolve({
      //       path: "/collectDetail",
      //       query:pageData
      //     });
      //     window.open(routeData.href, "_blank");
      // }
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
</style>