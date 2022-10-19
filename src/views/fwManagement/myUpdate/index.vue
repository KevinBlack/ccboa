<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all">
      <optionalfield></optionalfield>
    </el-tab-pane>
    <el-tab-pane label="未发布" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已发布" name="tabs-done"></el-tab-pane>
    <el-row>
      <!-- <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row class="search_form">
            <el-col :span="4">
              <el-form-item label="示例标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="发送人" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="isAll || isMid">
              <el-form-item label="当前环节" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="isAll">
              <el-form-item label="状态" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="float:right">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
            <el-row>
              <el-form-item label="示例类型" prop="example">
                <el-radio-group v-model="ruleForm.example">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="模板"></el-radio>
                  <el-radio label="范文"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="文件类型" prop="file">
                <el-radio-group v-model="ruleForm.file">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="发文"></el-radio>
                  <el-radio label="签报"></el-radio>
                  <el-radio label="便函"></el-radio>
                  <el-radio label="呈送件"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col>
        </el-form>
      </el-col> -->
      <el-col style="margin: 20px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";

const allData = [
  { label: "序号", prop: "rownum_", align: "center" },
  { label: "示例类型", prop: "fileType", align: "center" },
  { label: "示例标题", prop: "fileTitle", align: "center" },
  { label: "文件类型", prop: "sampleType", align: "center" },
  { label: "当前环节", prop: "cur_node_name", align: "center" },
  { label: "可见范围", prop: "visible_range", align: "center" },
  { label: "关键字", prop: "keywords", align: "center" }
];
const otherData = [
  { label: "序号", prop: "rownum_", align: "center" },
  { label: "示例类型", prop: "fileType", align: "center" },
  { label: "示例标题", prop: "fileTitle", align: "center" },
  { label: "文件类型", prop: "sampleType", align: "center" },
  { label: "当前环节", prop: "cur_node_name", align: "center"},
  { label: "可见范围", prop: "visible_range", align: "center" },
  { label: "关键字", prop: "keywords", align: "center" }
  // { label: "状态", prop: "currentNode", align: "center" }
];

export default {
  name: "MyUpdate",
  components: {
    mTable,
    optionalfield
  },
  data() {
    return {
      bank_countersignature: {
        function: "getMyUpload",
        state: 0, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 10 //每页条数
      },
      down: false,
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        name: "",
        region: "",
        example: "全部",
        file: "全部",
        desc: ""
      },
      options: [],
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isAll: true,
      isMid: false,
      isComplete: false,
      tableData: [],
      tableCols: allData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 10 //每页条数
      },
      baowenzd: "A08461302"
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 页面初始化加载数据
    initData(tabindex) {
      let that = this;
      that.$post
        .postData(
          "getMyUpload",
          JSON.stringify(that.bank_countersignature),
          that.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          that.tableData = res.data.rows;
          let arr = that.tableData.map(el => {
            return JSON.parse(el.visible_range);
          });
          console.log(arr)
          let newtable = arr.map(ele => {
            return ele.map(e=>{
              return e.name
            })
          });
          console.log(newtable);
          let arr1 = newtable.map(i=>{
             return i.join(',')
          })
          console.log(arr1)
          that.tableData.forEach((el,i) => {
            arr1.forEach((a,index)=>{
              if(i==index){
                 el.visible_range = a
              }
            })
            ;
          });
          that.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      console.log(this.ruleForm.endTime);
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      if (tab.index == "0") {
        this.isAll = true;
        this.tableCols = allData;
      } else if (tab.index == "1") {
        this.isMid = true;
        this.isAll = false;
        this.tableCols = otherData;
      } else {
        this.tableCols = otherData;
        this.isComplete = true;
        this.isAll = false;
        this.isMid = false;
      }
      this.initData(tab.index);
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.pagination.limit = val;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      // this.$router.push({
      //   // path: "/countersignend",
      //   path: "/bankDispach",
      //   targ: '_blank',
      //   query: {
      //     id: row.id
      //   }
      // });
      const routeData = this.$router.resolve({
        path: "/updateDetail",
        query: {
          id: row.id
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {};
    }
  }
};
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}
.search_form label {
  width: 80px;
}
</style>
