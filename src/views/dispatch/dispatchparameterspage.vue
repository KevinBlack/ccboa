<template>
<nav-article>
<!-- 发文参数配置 -->
  <div class="dispatchparameterspage">
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

      <el-dialog :visible.sync="dialogVisible" title="发文参数配置">
        <!-- 当前配置 -->
        <p class="dispatchParameterize_annotation">
          参数间以英文半角“；”进行分割
        </p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo_ruleForm"
        >
          <el-col class="dispatchParameterize_col">
            <el-form-item label="机构名称" prop="name">
              <el-input
                v-model="ruleForm.feedstitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="发文类型" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="紧急程度">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="业务分类">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="文种">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="电子发文秘密类型" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="电子发文保管期限" prop="name" >
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="商业密级" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="解密条件" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="秘密标志" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="工作秘密标志" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="有主题词">
              <el-radio
                v-model="ruleForm.straightdelivery"
                label="1"
                class="alternative"
                >是</el-radio
              >
              <el-radio
                v-model="ruleForm.straightdelivery"
                label="2"
                class="alternative"
                >否</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="启用二维码">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="直发范围" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="直发文件种类" prop="name">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="会签意见字数限制">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="字数超限原因最少字数限制">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="字数超限原因不能包含关键字">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="无需限制正文字数的标题关键字">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="无需限制正文字数的代字/红头">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="dispatchParameterize_col">
            <el-form-item label="默认正文模板">
              <el-input
                v-model="ruleForm.attachmenttitle"
                placeholder="中国建设银行"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="">保存</el-button>
        </div>
      </el-dialog>
  </div>
</nav-article>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/mTable.vue'
export default {
  name: 'dispatchparameterspage',
  components: {
      mTable
  },
  props: {},
  data () {
     return {
      pageNum: 1,
      pageSize: 15,
      totalNum: 100,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      tableCols: [
        { label: '序号', prop: 'title', align: 'center' },
        { label: '机构名称', prop: 'type', align: 'center' },
        { label: '发文类型', prop: 'priority', align: 'center' },
        { label: '紧急程度', prop: 'date', align: 'center' },
        { label: '直发范围', prop: 'tache', align: 'center' },
        { label: '会签字数限制 ', prop: 'person', align: 'center' },
        { label: '排序 ', prop: 'person', align: 'center' }
      ],
      pagination: {pageSize: 5, pageNum: 1, total: 20},
      active: "#wjys",
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      ruleForm: {
        feedstitle: "", //正文标题
        attachmenttitle: "", //附件标题
       
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
    }
},
methods: {
    handleMock () {
      const Mock = require('mockjs')
      const count = 10
      for (let i = 0; i < count; i++) {
        this.tableData.push(Mock.mock({
          id: '@increment',
          type: '公文处理',
          'priority|1-3': 2,
          title: '(@integer(1000,9999))@ctitle(5, 10)',
          date: '@date(yyyy-MM-dd)',
          tache: '发文',
          person: '@cname',
          fileId: '@ctitle(5, 6)【@date(yyyy)】号'
        }))
      }
    },
    handleOnSizeChange (val) {
      this.pageSize = val
    },
    handleOnCurrentChange (val) {
      this.pageNum = val
    },
    handleShowTitle () {
      this.dialogVisible = true
    }
  },
  created () {
    this.handleMock()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.dispatchParameterize_content{
  width:100%;
  height:1700px;
  background:#fff;
}
.dispatchParameterize_annotation {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 30px 0;
        padding: 0 10px;
        position: relative;
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
