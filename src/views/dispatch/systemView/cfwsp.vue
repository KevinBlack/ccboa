<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane name="tabs-all">
          <span slot="label">全部<el-badge :value="5" class="item" type="primary"></el-badge></span>
          <optionalfield></optionalfield>
        </el-tab-pane>
        <el-tab-pane name="tabs-wait">
            <span slot="label">待办<el-badge :value="1" class="item" type="primary"></el-badge></span>
        </el-tab-pane>
        <el-tab-pane name="tabs-done">
            <span slot="label">已办<el-badge :value="1" class="item" type="primary"></el-badge></span>
        </el-tab-pane>
        <el-row>
          <el-col>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm mt20 transition_wrap" :class="{mtdown:down}">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="接收日期"  prop="endTime">
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
                  <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发文字号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
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
                  <el-col :span = "17">
                    <el-form-item label="主办部门" prop="bumen">
                      <el-input v-model="ruleForm.bumen" readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span = "2" style="margin-left:20px;">
                    <el-button type="primary" @click="showCompDialog">选择</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="会签状态" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio :label="1">全部</el-radio>
                      <el-radio :label="2">流转</el-radio>
                      <el-radio :label="3">办结</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="发文类型" prop="resource1">
                    <el-radio-group v-model="ruleForm.resource1">
                      <el-radio :label="1">全部</el-radio>
                      <el-radio :label="2">行发文</el-radio>
                      <el-radio :label="3">部门发文</el-radio>
                      <el-radio :label="4">党务发文</el-radio>
                      <el-radio :label="5">会议纪要</el-radio>
                      <el-radio :label="6">工作简报</el-radio>
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
      </el-tabs>
    <treeCofig  :dialogTit="dialogTit" :checkIds="checkIds" :singelCheckF="singelCheckF" :dialogState="dialogState" @showCompDialog="showCompDialog"></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import treeCofig from '@/components/tree/tree-fawen';

const finshData = [{ label: "接收日期", prop: "date", align: "center", formatter(row,column){return row.date} },
        { label: "发文字号", prop: "fileId", align: "center" },
        { label: "标题", prop: "title", align: "center" }];
const otherData = [
        { label: "接收日期", prop: "date", align: "center" },
        { label: "发文字号", prop: "fileId", align: "center" },
        { label: "标题", prop: "title", align: "center" },
        { label: "当前环节", prop: "tache", align: "center" },
        { label: "操作人 ", prop: "person", align: "center" }
      ];

export default {
  name: "DispatchFile",
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
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: "",
        resource: 1,
        resource1: 1,
        desc: '',
        bumen:''
      },
      tableLoading:false,
      activeName: "tabs-all",
      sortDate:[{ prot: 'date', order: 'descnding'}],
      isEnd:false,
      tableData: [],
      tableCols: [
        { label: "接收日期", prop: "date", align: "center", sort: "true" },
        { label: "发文字号", prop: "fileId", align: "center" },
        { label: "标题", prop: "title", align: "center" },
        { label: "当前环节", prop: "tache", align: "center" },
        { label: "操作人 ", prop: "person", align: "center" }
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
