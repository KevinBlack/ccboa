<template>
      <el-container>
        <el-header>
           <el-row :gutter = "24">
              <el-col :span = "20">
                    <el-select v-model="filters.selectValueMain"  @change="getSubData(filters.selectValueMain)">
                        <el-option v-for="item in selectMain" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="filters.selectValueSub"  @change="getListData($event)">
                        <el-option v-for="(item,index) in selectSub" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
              </el-col>

              <el-col :span = "2">
                  <el-button type="primary" @click="addDialogOpen()" style="float:right">新建</el-button>
              </el-col>
              <el-col :span = "2">
                  <el-button type="danger">删除</el-button>
              </el-col>
           </el-row>
        </el-header>
         <el-main>
            <m-table
              size = 'medium'
              :isIndex='false'
              :isPagination='true'
              :isBorder='true'
              :isSelection='true'
              :pagination='pagination'
              :tableCols='tableCols'
              :tableData='tableData'
              :page-size="pagination.pageSize"
              :total="pagination.total"
              @selectAll = 'selectAll'
              @select = 'select'
              @cellClick = 'cellClick'
            >
            </m-table>
         </el-main>
          <mDetails :id="id"  ref="dialogDetail" :type="type" v-if="detailShow"></mDetails>
      </el-container>
</template>

<script>
import mTable from "components/table/mTable.vue";
import mDetails from "./processDetails"
import addProcess from "./components/addProcess"

let selectMain = [{value:'role',label:'总行'},{value:'role1',label:'总行1'},{value:'role2',label:'总行3'}];


export default {
  name: "mainProcess",
  components: {
    mTable,
    mDetails,
    addProcess
  },
  data() {
    return {
      type:'',//是否新增
      id:'',
      detailShow:false,
      addShow:false,
      selectMain:selectMain,
      selectSub:[],
      filters: {
        selectValueMain:'',
        selectValueSub:''
      },
      tableCols:[
        {"label":"主流程名称","prop":'title',align:'center'},
        {"label":'起始环节',"prop":'title1',align:'center'},
        {"label":'所有环节',"prop":'title2',align:'center'},
      ],
      tableData:[
        {id:"1",title:'title',title1:'title1',title2:'a',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'a',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'a',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:"1",title:'title',title1:'title1',title2:'12312321',date:'center'},
        {id:'2',title:'title1',title1:'title2',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},
        {id:'3',title:'title2',title1:'title3',title2:'12312321',date:'center'},

      ],
      
      pagination: {
        pagNum: 5,
        pageSize:10,
        total: 100
      },
      
    };
  },
  methods: {
    //请求列表
    initData(){
        //this.$post
        // .postData("getNextNodeInfo", JSON.stringify(this.bank_selectConfig))
        // .then(res => {
        //   console.log("下拉框", res.data);
        //   this.seletOptionsData = res.data || [];
        //   this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
        //   this.$post
        //     .postData("selOrgTreeByWfNode", JSON.stringify(this.bank_send))
        //     .then(res => {
        //     });
        // });
    },
    getSubData(selectValueMain) {
      console.log(selectValueMain)
      let allrole = [{"pro":'role',"label":'总行子数据'},{"pro":'role',"label":'总行子数据1'},{"pro":'role',"label":'总行子数据2'},
      {"pro":'role1',"label":'总行1子数据'},{"pro":'role1',"label":'总行1子数据1'},{"pro":'role1',"label":'总行1子数据2'},
      {"pro":'role2',"label":'总行2子数据'},{"pro":'role2',"label":'总行2子数据1'},{"pro":'role2',"label":'总行2子数据2'}];
      let subData = [];
      this.selectSub = [];
      for(let i = 0;i <allrole.length; i++){
        if(selectValueMain === allrole[i].pro)subData.push({label: allrole[i].label, value: allrole[i].pro})
      }
      this.selectSub = subData
    },
    getListData(opt) {
      //console.log(opt);
    },
    //detail
    cellClick(row, column, cell, event){
      this.type="editLink";
      this.detailShow = true;
      this.$nextTick(()=>{
        this.$refs.dialogDetail.openDialog();
      })
    },
    //add
    addDialogOpen(){
      this.type="addLink";
      this.detailShow = true;
      this.$nextTick(()=>{
        this.$refs.dialogDetail.openDialog();
      })
    },
    // 表格勾选
    select(rows, row) {
      //console.log('select', rows, row);
    },
    // 全选
    selectAll(rows) {
     //console.log('select', rows)
    },
    
    
    //单选框切换
    checkModelTwo(){
      this.form.chcekShow = !this.form.chcekShow
    }
  },
  created() {
  }
}
</script>

<style lang="less" scoped>
  .fr{
      float: right;
  }
  .mr10{
    margin-right: 10px;
  }
</style>
