<template>
  <!-- 公文种类配置 -->
  <div class="doctypeconfiguratpage">
    <div class="type-btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="outerVisible=true">新增公文种类</el-button>
      <el-button @click="deleteSelect()">批量删除</el-button>
    </div>
    <el-row :gutter="20">
      <el-form>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="form.jh" placeholder="中国建设银行">
              <el-option label="中国建设银行" value="jianhang"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="form.hfw" placeholder="行发文">
              <el-option label="行发文" value="hangfawen"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      :isBorder="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @select='select'
    ></m-table> -->
    <el-table
      :data="tableData"
      @selection-change="select"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column prop="type" label="机构名称" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="smart" @click="handleShowTitle(scope.$index, scope.row)">{{ scope.row.type }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="dpctype" label="发文类型" align="center" :formatter="handleType"></el-table-column>
      <el-table-column prop="priority" label="紧急程度" align="center" :formatter="handleDegree"></el-table-column>
      <el-table-column prop="fileId" label="直发范围" align="center"></el-table-column>
      <el-table-column prop="person" label="会签字数限制" align="center"></el-table-column>
      <el-table-column prop="id" label="排序" align="center"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleOnSizeChange"
      @current-change="handleOnCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10,15,20,25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
    <el-dialog :visible.sync="outerVisible" title="公文种类配置">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo_ruleForm"
      >
        <el-col class="dispatchParameterize_col">
          <el-form-item label="机构名称" prop="name">
            <el-input v-model="ruleForm.feedstitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="发文种类" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="编号方式">
            <el-radio v-model="ruleForm.straightdelivery" label="1" class="alternative">代字</el-radio>
            <el-radio v-model="ruleForm.straightdelivery" label="2" class="alternative">代字</el-radio>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="文件字头" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="代字/红头" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="发文单位署名">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="字数限制">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="需要审核">
            <el-radio v-model="ruleForm.straightdelivery" label="1" class="alternative">是</el-radio>
            <el-radio v-model="ruleForm.straightdelivery" label="2" class="alternative">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="需要法律部门会签">
            <el-radio v-model="ruleForm.straightdelivery" label="1" class="alternative">是</el-radio>
            <el-radio v-model="ruleForm.straightdelivery" label="2" class="alternative">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="法律部门会签">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
            <el-button @click="showCompDialog"><i class="el-icon-arrow-down "></i>树弹框</el-button>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="排序">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="主办部门" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="模板标签" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="模板" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="dispatchParameterize_col">
          <el-form-item label="备注" prop="name">
            <el-input v-model="ruleForm.attachmenttitle" placeholder="中国建设银行"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="">保存</el-button>
      </div>
    </el-dialog>
    
    <treeCofig :dialogTit="dialogTit" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog"
    ></treeCofig>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/mTable.vue";
import treeCofig from '@/components/tree/tree-fawen';

export default {
  name: "doctypeconfiguratpage",
  components: {
    mTable,
    treeCofig
  },
  props: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      totalNum: 100,
      singelCheckF: false, // 单选true 多选为false
      dialogTit: 'sdf',    //弹框标题 
      dialogState: false,
      outerVisible: false,
      innerVisible:false,
      singelCheckF: false, // 单选true 多选为false
      dialogTit: 'sdf', // 弹框标题
      dialogState: false,
      form: {
        jh: "",
        
      },
      tableData: [],
      tableCols: [
        { label: "机构名称", prop: "type", align: "center" },
        { label: "发文类型", prop: "priority", align: "center" },
        { label: "紧急程度", prop: "date", align: "center" },
        { label: "直发范围", prop: "tache", align: "center" },
        { label: "会签字数限制 ", prop: "person", align: "center" },
        { label: "排序 ", prop: "person", align: "center" }
      ],
      pagination: { pageSize: 5, pageNum: 1, total: 20 },
      ruleForm: {
        feedstitle: "", //正文标题
        attachmenttitle: "", //附件标题
        dispachtype: "", //发文类型
        literally: "", //代字
        numberdispatch: "", //发文字号
        urgencydegree: "", //紧急程度
        differServ: "", //业务分类
        recordtype: "", //文种
        hostdepartment: "", //主办部门
        publishingunits: "", //联合发文单位
        drafter: "", //拟稿人
        phone: "", //联系电话
        draftday: "", //拟稿日期
        pursuant: "", //发文依据
        straighthairfile: "1", //直发文件
        straighthair: "", //直发范围
        directtype: "", //直发文种类
        straightdelivery: "1", //直发交付
        signdepartment: "", // 会签部门
        annualsign: "", // 行外会签
        lordsent: "", // 主送
        copysend: "", // 抄送
        banksent: "", //  本行发送
        opinionsissued: "", // 签发意见
        nucleardraft: "", // 核稿意见
        signon: "", //  会签意见
        auditopinion: "", //  审核意见
        remark: "", //  备注
        attachmentremark: "", //  附件备注
        individuallysend: "1", //  分别发送
        halfelectronic: "1" //  半电子
      },
      //强制性要求
      rules: {
        name: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
          { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
        ]
      },
      imageUrl: "",
      fileList: []
    };
  },
  methods: {
    handleMock() {
      const Mock = require("mockjs");
      const count = 10;
      for (let i = 0; i < count; i++) {
        this.tableData.push(
          Mock.mock({
            id: "@increment",
            type: "中国建设银行",
            "dpctype|1-4": 2,
            "priority|1-3": 2,
            title: "(@integer(1000,9999))@ctitle(5, 10)",
            date: "@date(yyyy-MM-dd)",
            tache: "发文",
            person: "@cname",
            fileId: "@ctitle(5, 6)【@date(yyyy)】号"
          })
        );
      }
    },
    handleOnSizeChange (val) {
      this.pageSize = val
    },
    handleOnCurrentChange (val) {
      this.pageNum = val
    },
    deleteSelect(rows) {//删除选中项，发送请求完成操作
        //this.$post.postNoLoading('/static/mkData.json',{},{},{})
      this.$axios({
        method:'get',
        url:'/static/mkData.json',
      }).then((res) => {
          console.log(res)
      })
    },
    select(rows, row) {//表格选中行
        console.log('选中')
      },
    showCompDialog() {
      this.dialogState = !this.dialogState;
    },
    
    handleDegree: function(row, colum, cellValue) {
      switch (row.priority) {
        case 1:
          return "一般";
        case 2:
          return "严重";
        case 3:
          return "紧急";
      
        default:
          return "";
      }
    },
    handleType: function(row, colum, cellValue) {
      switch (row.priority) {
        case 1:
          return "行发文";
        case 2:
          return "部门发文";
        case 3:
          return "党务发文";
        case 4:
          return "会议纪要";
      
        default:
          return "";
      }
    },
    handleShowTitle (index, row) {
      this.outerVisible = true
      this.ruleForm = row
    }
  },
  created() {
    this.handleMock();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
  .type-btn{
    width: 95%;
    height: 80px;
    padding-top: 20px;
    .el-button:first-child{
      float: left;
    }
    .el-button:nth-child(2){
      float: right;
    }

  }
.dispatchParameterize{
 width:100%;
  height:1100px;
  background:#fff;
}
</style>
<style>
.el-dialog__header {
  background-color: #409EFF;
}
.el-dialog__title {
  color: #fff;
  font-weight: 700;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    font-weight: 800;
}
.el-dialog__headerbtn:focus .el-dialog__close, .el-dialog__headerbtn:hover .el-dialog__close {
    color: #fff;
}
</style>
