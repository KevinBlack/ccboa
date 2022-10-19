<template>
  <div class="dispatchparameterspage">
    <el-row>
      <el-col :span="12" style="margin-bottom: 10px;">
        <el-button type="primary" size="small" :disabled="!haveData" @click="handleAddData">新增配置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;margin-bottom: 10px;">
        <el-button type="primary" size="small" @click="handleBatchDelete">删除</el-button>
      </el-col>
    </el-row>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @current-change="handleCurrentChange"
      @handleSelectionChange="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      :default-sort="sortDate"
    ></m-table>

    <el-dialog 
    v-dialogDrag
    :visible.sync="dialogVisible" :modal-append-to-body="false" title="专项督办配置">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
       <div style="height:500px;">
          <el-scrollbar style="height:100%;">
        <el-row>
         
          <el-col>
            <h3 class="titleGroup">专项督办配置</h3>
          </el-col>
          <el-col>
            <el-form-item label="机构名称">
                <el-input
                v-model="fromdata.unitName"
                style="width: 100%;" 
                >
                </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="基础积分" prop="term">
              <el-input v-model="fromdata.basicScore" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
						<el-form-item
						label="单次积分"
						>
								<div class="el-table__body-wrapper">
										<table cellspacing="0" cellpadding="0" border="1" class="el-table__body">
										<colgroup>
										<col name="el-table_13_column_55" width="100">
										<col name="el-table_13_column_55" width="200">
										<col name="el-table_13_column_55" width="150">
										<col name="el-table_13_column_55" width="200">
										</colgroup>
										<tbody>
												<tr class="el-table__row">
													<td colspan="2"><div class="cell">加分项</div></td>
													<td colspan="2"><div class="cell" style="padding-left:20px;">扣分项</div></td>
												</tr>
												<tr class="el-table__row">
													<td colspan="1"><div class="cell">承办按时反馈</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.addCbScore" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
														<el-button slot="preappend">加</el-button>
														<el-button slot="append">分</el-button>
														</el-input></div></td>
													<td colspan="1"><div class="cell" style="padding-left:20px;">超时反馈</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.delCsScore" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
														<el-button slot="append">分</el-button></el-input></div></td>
												</tr>
												<tr class="el-table__row" style="margin-top:10px;">
													<td colspan="1"><div class="cell">协办按时反馈</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.addXbScore" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
														<el-button slot="append">分</el-button></el-input></div></td>
													<td colspan="1"><div class="cell" style="padding-left:20px;">收到督办催办</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.delCbScore" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
														<el-button slot="append">分</el-button></el-input></div></td>
												</tr>
										</tbody>
										</table>
								</div>
						</el-form-item>
				</el-col>
				<el-col>
						<el-form-item
						label="积分权重"
						>
								<div class="el-table__body-wrapper">
										<table cellspacing="0" cellpadding="0" border="1" class="el-table__body">
										<colgroup>
										<col name="el-table_13_column_55" width="100">
										<col name="el-table_13_column_55" width="200">
										</colgroup>
										<tbody>
												<tr class="el-table__row">
													<td><div class="cell">督办等级</div></td>
													<td><div class="cell" style="padding-left:20px;">权重（保留两位小数）</div></td>
												</tr>
												<tr class="el-table__row">
													<td colspan="1"><div class="cell">I级</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.oneWeight" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
															</el-input></div></td>
												</tr>
												<tr class="el-table__row" style="margin-top:10px;">
													<td colspan="1"><div class="cell">II级</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.twoWeight" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
															</el-input></div></td>
												</tr>
												<tr class="el-table__row" style="margin-top:10px;">
													<td colspan="1"><div class="cell">III级</div></td>
													<td colspan="1"><div class="cell"><el-input v-model="fromdata.threeWeight" @input="value=value.replace(/[^\-\,\d\*\ ]/g,'')">
															</el-input></div></td>
												</tr>
												
										</tbody>
										</table>
								</div>
						</el-form-item>
				</el-col>
        </el-row>
      </el-scrollbar>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "components/tree/tree-fawen";
const tableCols = [
  { label: "机构名称", prop: "unitName", align: "center" },
  { label: "基础积分", prop: "basicScore", align: "center"},
  { label: "承办按时反馈项", prop: "addCbScore", align: "center"},
  { label: "协办按时反馈项", prop: "addXbScore", align: "center"},
  { label: "超时反馈", prop: "delCsScore", align: "center" },
  { label: "收到催办", prop: "delCbScore", align: "center" },
];

export default {
  name: 'Fwcspz',
  components: { mTable},
  data () {
    return {
      pagination: {
        pagNum: 1,
        total: 10,
        pageSize:10
      },
      bank_add:{
        function:"doScoreSaveOrUpdate",
      },
       bank_countersignature: {
        function: "selectScoreByPage",
        page: 1, //当前页数   
        limit: 10, //每页条数
        totalCount:0
      },
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },
      haveData: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      referForm: {
        function: 'selectXDHJyPage'
      },
       //主送、抄送
      bank_main: {
        function: "getTcPriDeliveryDic",
        organizationId: "root"
      },
      tableCols:tableCols,
			fromdata:{
        addCbScore:'',
        unitName:'',
        basicScore:'',
        delCsScore:'',
        addXbScore:'',
        delCbScore:'',
        oneWeight:'',
        twoWeight:'',
        threeWeight:'',
      },
      tableData: [],
      add:'',
      dialogVisible:false,
      ruleForm: {
        secretLimitType:"",//秘密期限类型
        term:"",//办理期限
        workTime:"",//工作日期
        orgName:"",//机构名称
        orgId:"",//机构id
        handleTime:"",//办理期限设置  :1: 以工作日设置办理期限 ,0:自然日设置办理期限
        remindTime:"",//提醒时间设置
        dayHours:"",//天或小时  1:天，0：小时
        timeType:"",//时间类型 1：以工作日设置提醒时间 0：以自然日设置提醒时间
        basis:"",//立项依据
        degree:"",//紧急程度
        number:"",//编号
        secretFlag:"",//秘密标志
        tradeSecret:"",//商业密级
        secretType:"",
        secretFlagContent:"",//解密条件
        isLockMain:"",//协办是否锁定为主文档
        handleDays:"",//办理天数
        isSenProtect:"",//是否启用敏感信息防护功能
      },
      // 强制性要求
      rules: {
       
      },
      haveData: true
    }
  },
  methods: {
    initData() {
      this.$post
        .postData(
          "selectScoreByPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.zxdb
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          if (this.tableData.length >=1) {
            this.haveData = false
          } else {
            this.haveData = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectType(){},
     // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1
      this.tableData = [];
      this.initData();
    },
    handleAddData () {
      this.fromdata ={
        addCbScore:'',
        unitName:'',
        basicScore:'',
        delCsScore:'',
        addXbScore:'',
        delCbScore:'',
        oneWeight:'',
        twoWeight:'',
        threeWeight:'',
      };
      this.dialogVisible = true;
      this.$post
      .postData('selectScoreById', JSON.stringify({function:'selectScoreById'}),this.$businessCode.zxdb)
      .then(res => {
        this.fromdata = Object.assign(this.fromdata,res.data)
      })
      
    },
    handleSave () {
      this.fromdata = Object.assign(this.fromdata,{function:'doScoreSaveOrUpdate'})
      this.$post
        .postData(
          "doScoreSaveOrUpdate",
          JSON.stringify(this.fromdata),  
          this.$businessCode.zxdb
        ).then(res=>{
            this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false;
          for (const key in this.ruleForm) {
            delete this.ruleForm[key]
          }
          this.initData();
        }).catch(err=>{
        })
    },
    cellClick(row, column, cell, event) {
      // this.$post
      //   .postData('selectScoreById', JSON.stringify({function:'selectScoreById',
      //   id:row.id}),this.$businessCode.zxdb)
      //   .then(res => {
      //     this.fromdata = Object.assign(this.fromdata,res.data)
      //     this.dialogVisible = true;
      //   })

      this.dialogVisible = true;
      this.fromdata = row
      this.fromdata = Object.assign(this.fromdata, {
        function: 'saveOrUpdateXDHJ'
      })
    },
    handleSelectionChange (val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      this.deleteIds = idsArr.join(";");
    },
    handleBatchDelete () {
      if (this.deleteIds === "") {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!'
        })
        return;
      }else{
        this.$post
        .postData(
          'doDelScoreById',
          JSON.stringify({
            function: "doDelScoreById",
            id: this.deleteIds
          }),
          this.$businessCode.zxdb
        )
        .then(res => {
          console.log('a',res)
          this.$message({
            type:"success",
            message:"删除成功"
          })
          this.initData();
        })
        .catch(err => {
          console.log('b',err);
        });
      }
    },
  },
  created () {
    this.initData();
  }
}
</script>

<style lang="less" scoped>
.titleGroup {
  color: #409EFF;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
}
</style>