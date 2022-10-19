<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm mt20 transition_wrap" :class="{mtdown:down}">
          <el-row>
            <el-col :span="8">
              <el-form-item label="收文日期"  prop="endTime">
              <div class="block">
                <el-date-picker
                @change="timeChange(events)"
                  v-model="ruleForm.endTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收文编号" prop="num">
                <el-input v-model="ruleForm.num" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm" style="margin-left:20px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-down el-icon--left"></i> 展开</el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down" class="clearfix">
            <el-row>
              <el-col :span="6">
                <el-form-item label="来件单位">
                  <el-input v-model="ruleForm.unit" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "6">
                <el-form-item label="承办单位" prop="bumen">
                  <el-input v-model="ruleForm.bumen" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span = "2" style="margin-left:20px;">
                <el-button type="primary" @click="showCompDialog">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="收文来源" prop="rec">
                <el-radio-group v-model="ruleForm.rec">
                  <el-radio :label="1">全部</el-radio>
                  <el-radio :label="2">行内</el-radio>
                  <el-radio :label="3">行外</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="公文状态" prop="status">
                <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">全部</el-radio>
                  <el-radio :label="2">流转</el-radio>
                  <el-radio :label="3">办结</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="来件渠道" prop="channel">
                <el-radio-group v-model="ruleForm.channel">
                <el-radio :label="1">全部</el-radio>
                  <el-radio :label="2">民办机构</el-radio>
                  <el-radio :label="3">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="收件类型" prop="rectype">
                <el-radio-group v-model="ruleForm.rectype">
                <el-radio :label="1">全部</el-radio>
                  <el-radio :label="2">特快</el-radio>
                  <el-radio :label="3">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="密级" prop="security ">
                <el-radio-group v-model="ruleForm.security">
                <el-radio :label="1">全部</el-radio>
                  <el-radio :label="2">一般</el-radio>
                  <el-radio :label="3">秘密</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="缓急" prop="emergency">
                <el-radio-group v-model="ruleForm.emergency">
                <el-radio :label="1">全部</el-radio>
                  <el-radio :label="2">特急</el-radio>
                  <el-radio :label="3">急件</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="down">
                <el-button type="info" size="small"  @click="arrow()"> <i class="el-icon-arrow-up el-icon--left"></i> 收起</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-col>
      <el-col v-if="isEnd">
            <router-link tag="a" target="_blank" :to="{name:'BankDispach'}" class="btn-writeEnDspc">起草电子发文</router-link>
            <router-link tag="a" target="_blank" :to="{name:'BankDispach'}" class="btn-writeEnDspc">起草实物发文</router-link>
        </el-col>
        <el-col style="margin: 20px 0;">
          <m-table
              size="medium"
              :isSelection="false"
              :isIndex="true"
              :isPagination="true"
              :isHandle="false"
              :tableData="tableData"
              :tableCols="tableCols"
              :pagination="pagination"
              @cellClick = 'cellClick'
              v-loading = 'tableLoading'
              :default-sort = 'sortDate'
              ></m-table>
        </el-col>
    </el-row>
    <treeCofig  :dialogTit="dialogTit" :checkIds="checkIds" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog"></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import treeCofig from '@/components/tree/tree-fawen';

const finshData = [{ label: "收文日期", prop: "date", align: "center", formatter(row,column){return row.date} },
        { label: "收文编号", prop: "fileId", align: "center" }];
const otherData = [
        { label: "收文日期", prop: "date", align: "center" },
        { label: "收文编号", prop: "fileId", align: "center" },
        { label: "承办部门", prop: "title", align: "center" }
      ];

export default {
  name: "lettterMsg",
  components: {
    mTable,
    optionalfield,
    treeCofig
  },
  data() {
    return {
      singelCheckF: true, // 单选true 多选为false
      dialogTit: 'sdf', // 弹框标题
      dialogState: false,
      down:false,
      checkIds:[],
      value:'',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
     ruleForm: {
        statrTime:'',
        endTime:'',
        num: '',
        unit:'',
        channel:1,
        rectype:1,
        security:1,
        delivery: false,
        emergency:1,
        rec: 1,
        status: 1,
        type:1,
        desc: '',
        bumen:''
      },
      tableLoading:false,
      activeName: "tabs-all",
      sortDate:[{ prot: 'date', order: 'descnding'}],
      isEnd:false,
      tableData: [],
      tableCols: [
         { label: "收文日期", prop: "date", align: "center" },
         { label: "收文编号", prop: "fileId", align: "center" },
         { label: "承办部门", prop: "title", align: "center" }
      ],
      pagination: {
        pagNum: 1,
        total: 10
      },
    };
  },
  methods: {
    showCompDialog(data,type) {
      if(this.dialogState && type){
        this.ruleForm.bumen = data[0]?data[0].label:'';
        this.checkIds = data[0]?[].concat(data[0].id):[];
      }
      this.dialogState = !this.dialogState;
    },
    arrow(){
      this.down = !this.down;
    },
    timeChange(events){
      console.log(this.ruleForm.endTime)
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      if(tab.index == '3'){
        this.tableCols =  finshData
        this.isEnd = true
      }else{
        this.tableCols = otherData
        this.isEnd = false
      }
      this.tableLoading = false;
    },
    cellClick(row, column, cell, event){
     console.log(row)
    },
    handleMock () {
        const Mock = require('mockjs')
        for (let i = 0; i < 10; i++) {
            this.tableData.push(Mock.mock({
                id: '@increment',
                title: '@ctitle(5, 10)',
                date: '@date(yyyy-MM-dd)',
                tache: '综合处理',
                person: '@cname',
                fileId: '@ctitle(5, 6)【@date(yyyy)】号'
            }))
        }
    },
    submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
  },
  created() {
    this.handleMock();
  }
}
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
.btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
.mt20{
  padding: 20px 0 0 0;
  position: relative;
  border:1px solid #f0f0f0;
}
.mtdown{
  padding:20px 0 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
.down{
  position: absolute;
  bottom:-76px;
  font-size:12px;
  text-align:center;
}
.clearfix{
  clear: both;
}
.transition_wrap{
  transition: all 0.3s ease-in-out;
}
</style>
