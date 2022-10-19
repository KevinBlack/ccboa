/**
* create by zx on 2020/7/23 15:15
* 类注释：高管成员配置
* 备注：
*/
<template>
  <div class="settingTopManageMember">
    <el-form :model="formData" label-width="120px">
      <baseSearchForm ref="baseSearchForm" @reset="reset" @submit="submit">
        <el-col slot="oneLine" :span="18">
          <el-row>
            <el-col :span="8">
              <el-form>
                <el-form-item :label='settingMemberName+"姓名"' >
                  <el-select v-model="formData.leader" placeholder="请选择" :disabled="false" @change="getLeader">
                    <el-option
                      v-for="item in optionL"
                      :key="item.leaderId"
                      :label="item.leaderCnName"
                      :value="`${item.leaderId},${item.leaderCnName}`"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form>
                <el-form-item label="秘书姓名">
                  <el-select v-model="formData.sec" placeholder="请选择" :disabled="false" @change="getSec">
                    <el-option
                      v-for="item in optionM"
                      :key="item.secId"
                      :label="item.secCnName"
                      :value="`${item.secId},${item.secCnName}`"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </baseSearchForm>
      <el-col :span="6">
        <el-button type="primary" @click="toAdd">新增</el-button>
        <el-button type="danger" @click="toDelete">删除</el-button>
      </el-col>
    </el-form>
    <m-table
      ref="listTab"
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
<!--    <fd-form style="margin:0 10%" :data="formData" @submit="submit" :columns="formCfg"></fd-form>-->
  </div>

</template>

<!--<script type="text/ecmascript-6">
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: "settingTopManageMember",
  components: {
    FdForm
  },
  props: {
    settingMemberName: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      formCfg: [
        { type: 'button-primary', prop: '$submit', value: '保存 ' },
        [
          { type: 'input', prop: 'chineseName', style: { width: '600px' }, config: { rows: 8 } },
          { type: 'button-primary', prop: 'select', value: '选择', style: { 'margin-left': '10px' } },
          { type: 'formitem', label: '领导姓名', }
        ],
        [
          { type: 'input', prop: 'chineseName', style: { width: '600px' }, config: { rows: 8 } },
          { type: 'button-primary', prop: 'select', value: '选择', style: { 'margin-left': '10px' } },
          { type: 'formitem', label: '行领导秘书', }
        ],
        [
          { type: 'input', prop: 'chineseName', style: { width: '600px' }, config: { rows: 8 } },
          { type: 'formitem', label: '序号', }
        ],
      ],
      formData: {},
    }
  },
  computed: {},
  methods: {
    submit () {
    },
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;

  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
</style>-->

<script type="text/ecmascript-6">
    import mTable from "components/table/tTable"
    import baseSearchForm from "components/form/baseSearchForm"


    export default {
        inject:['reload'],
        methods: {
            //点击刷新
            refresh(){
                // 刷新单页面
                this.reload();
            }
        },
        name: "settingTopManageMember",
        components: {
            mTable,
            baseSearchForm
        },
        props: {
            settingMemberName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                optionL: [],
                optionM: [],
                showOrgTree: false,
                isSingle: false,
                orgOrDept: 1,
                orgOrDeptId: "0",
                isEdit: Boolean,

                selectRows: [],
                region: "",
                formData: {
                    leaderHumanId:'',
                    leaderCnName:'',
                    secHumanId:'',
                    secCnName:'',
                    unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
                },
                tableData: [],
                tableCols: [
                    { label: this.settingMemberName+"姓名", prop: "leaderCnName" },
                    { label: "秘书姓名", prop: "secCnName" },
                    { label: "序号", prop: "sort" },
                ],
                pagination: {
                    pageNum: 1,
                    pageSize: 10,
                },
            };
        },
        methods: {
            getLeader: function (val) {
                console.log("--------->", this.formData);
                let data=val.split(",")
                this.formData.leaderCnName=data[1];//获取label
                this.formData.leaderHumanId=data[0];//获取value
                console.log("--------->", this.formData);
            },
            getSec: function (val) {
                let data=val.split(",")
                this.formData.secCnName=data[1];//获取label
                this.formData.secHumanId=data[0];//获取value
            },
            reset () {
                this.formData = {
                    leaderHumanId:'',
                    leaderCnName:'',
                    secHumanId:'',
                    secCnName:'',
                    unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
                }
                this.loadData()
            },
            submit (params) {
                this.loadData()
            },
            loadData() {


                switch (this.settingMemberName) {
                    case "党委":
                        this.$api.secreatary.leaderActivity.listManagerNSec(this.formData, {
                            PAGE_JUMP: this.pagination.pageNum,
                            REC_IN_PAGE: this.pagination.pageSize
                        }).then(res => {
                            this.tableData = res.data;
                            this.pagination.total = res.total
                        })
                        break
                    case "高管":
                        console.log('this.formData', this.formData);
                        this.$api.secreatary.leaderActivity.listExecutiveNSec(this.formData, {
                            PAGE_JUMP: this.pagination.pageNum,
                            REC_IN_PAGE: this.pagination.pageSize
                        }).then(res => {
                            this.tableData = res.data;
                            this.pagination.total = res.total
                        })
                        break
                }

            },
            cellClick (row) {
                this.$router.push({
                    path: '/secretary/leaderActivity/settingMember/addParty',
                    query: {
                        detail:JSON.stringify(row)
                    }
                })
            },
            select(rows) {
                this.selectRows = rows;
            },
            toAdd() {
                switch (this.settingMemberName) {
                    case "党委":
                        this.$intent.go(this, {path: "/secretary/leaderActivity/settingMember/addParty"})
                        break
                    case "高管":
                        this.$intent.go(this, {path: "/secretary/leaderActivity/settingMember/addExecutive"})
                        break
                }

            },
            toDelete() {
                console.log("--------->", this.selectRows);
                if (this.selectRows.length == 0) {
                    this.$message({type: "error", message: "请先选择要删除的记录！"})
                    return
                }
                this.$confirm("是否要删除选中的记录?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let idsArr = [];
                    this.selectRows.forEach(item => {
                        idsArr.push(item.id);
                    });
                    this.$api.secreatary.dutyWork.deleteDutyMan({id: idsArr.join(",")}).then(res => {
                        if (res && res.code=='SUCCESS') {
                            this.$message({
                                type: "success",
                                message: res.msg,
                            });
                        }else{
                            this.$message({
                                type: "failed",
                                message: res.msg,
                            });
                        }
                        this.loadData()
                    })
                })

            },
        },
        created() {
            //请求领导姓名下拉框
            /*选择领导:所有具有[行签发岗位]的用户*/
            this.$api.secreatary.leaderActivity.getLeaderName({}).then((res) => {
                let arr = [];
                res.data.map((item, index) => {
                    let obj = {};
                    obj.index = index;
                    obj.leaderId = item.leaderId;
                    obj.leaderCnName = item.leaderCnName;

                    arr.push(obj);
                });
                this.optionL = arr;
                console.log(this.optionL);
            });
            //请求秘书姓名下拉框
            /*选择秘书:所有具有[行领导秘书岗位]的用户*/
            this.$api.secreatary.leaderActivity.getSecreatary({}).then((res) => {
                let arr = [];
                res.data.map((item, index) => {
                    let obj = {};
                    obj.index = index;
                    obj.secId = item.secId;
                    obj.secCnName = item.secCnName;
                    arr.push(obj);
                });
                this.optionM = arr;
            });
            this.loadData();
        },
    };
</script>




<style scoped lang="less" rel="stylesheet/less">
  .cSpace {
    width: 100%;
    height: 20px;
  }
  .settingTopManageMember {
    background: white;
    margin: 0 auto;
    min-height: 600px;
  .checkHeader {
    padding: 8px 70px;

  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
  }
  }
  .box {
    width: 80%;
    margin: 0 auto;
  .wrap {
    margin-top: 20px;
    border: 1px solid rgb(204, 204, 204);
    padding: 30px;
  }
  }
</style>
