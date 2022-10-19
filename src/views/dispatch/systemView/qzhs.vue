<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all">
        <optionalfield></optionalfield>
      </el-tab-pane>
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
      <el-row>
        <el-col>
              <el-select v-model="valueYear" placeholder="全部" @change="getTablesData">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
        </el-col>
         <el-col v-if="isEnd">
              <router-link tag="a" target="_blank" :to="{name:'BankDispach'}" class="btn-writeEnDspc">起草电子发文</router-link>
              <router-link tag="a" target="_blank" :to="{name:'BankDispach'}" class="btn-writeEnDspc">起草实物发文</router-link>
          </el-col>
          <el-col style="margin: 20px 0;">
            <mTable :isIndex="true" :tableData="tableData" :tableCols="tableCols"></mTable>
          </el-col>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";


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
    optionalfield
  },
  data() {
    return {
       options: [{
          value: '',
          label: '全部'
        }, {
          value: '2020',
          label: '2020'
        }, {
          value: '2019',
          label: '2019'
        }, {
          value: '2018',
          label: '2018'
        }, {
          value: '2017',
          label: '2017'
        }, {
          value: '2016',
          label: '2016'
        }],
        valueYear: '',
      down:false,
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
    arrow(){
      this.down = !this.down;
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTablesData(){
      console.log(this.valueYear)
      // this.$http.get('/getTble',function(){
      //   console.log("请求")
      // })
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
  bottom:0px;
  font-size:12px;
  text-align:center;
}
</style>
