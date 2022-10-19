<!--
 * @Author: your name
 * @Date: 2020-07-31 15:53:34
 * @LastEditTime: 2020-08-11 14:22:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\query.vue
-->
/**
* create by lxx on 2020/01/18 16:00
* 类注释：
* 备注：会议预定/服务项目配置
*/
<template>
  <div class="services">
    <!-- <div class="servicesHeader">
      <div class="title-text">服务项目配置</div>
    </div>-->
    <div class="process_content">
      <div class="contentHeader">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <tTable
        :isIndex="true"
        :isPagination="true"
        :pagination="pagination"
        :pageSizeList = "[20,30,50,100,200]"
        :sortable="false"
        :tableData="tableData"
        :tableCols="tableCols"
        @refresh="search"
      ></tTable>
    </div>
    <el-dialog
      v-dialogDrag
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="80%"
      @closed="cleanDialog"
    >
      <div style="text-align:center;">
        <el-form
          :model="dialogForm"
          status-icon
          :rules="rules"
          ref="dialogForm"
          label-width="100px"
        >
          <el-form-item label="服务名称" prop="paramName">
            <el-input v-model="dialogForm.paramName"></el-input>
          </el-form-item>
          <el-form-item label="服务类型" prop="serviceType">
            <el-select v-model="dialogForm.serviceType" clearable style="width:100%">
              <el-option
                v-for="(op,inde) in servicesTypeList"
                :label="op.name"
                :value="op.value"
                :key="inde"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务说明" prop="paramExplain">
            <el-input type="textarea" :rows="3" v-model="dialogForm.paramExplain"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="paramSort">
            <el-input type="number" v-model.number="dialogForm.paramSort"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import tTable from "@/components/table/tTable";
export default {
  name: "services",
  components: {
    tTable
  },
  data() {
    return {
      dialogTitle:"",
      paramType: "0", //参数类型 0 服务项目  1会议类型
      // 分页数据
      pagination: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      tableCols: [
        { prop: "paramCode", label: "服务编码" },
        {
          prop: "serviceType",
          label: "服务类型",
          formatter: row => {
            let val = "无匹配";
            this.servicesTypeList.map(item => {
              if (item.value == row.serviceType) {
                val = item.name;
              }
            });
            return val;
          }
        },
        { prop: "paramName", label: "服务名称" },
        { prop: "paramExplain", label: "服务说明" },
        { prop: "paramSort", label: "服务排序" },
        {
          label: "操作",
          align: "center",
          type: "Button",
          btnList: [
            {
              type: "text",
              label: "编辑",
              handle: this.edit
            },
            {
              type: "text",
              label: "删除",
              handle: this.del
            }
          ]
        }
      ],
      tableData: [],
      dialogVisible: false,
      dialogForm: {
        paramType: "0",
        paramName: "",
        paramCode: "",
        serviceType: "",
        paramExplain: "",
        paramSort: ""
      },
      rules: {
        paramName: [
          { required: true, trigger: "blur", message: "请输入服务名称" }
        ]
      },
      servicesTypeList: [
        { name: "设备", value: 1 },
        { name: "服务", value: 2 }
      ]
    };
  },
  computed: {},
  methods: {
    search() {
      let httpData = {
        function: "doFindParam",
        paramType: "0",
        page: this.pagination.pageNum,
        limit: this.pagination.pageSize,
        totalCount: 0
      };
      this.$post
        .postData(
          "doFindParam",
          JSON.stringify(httpData),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res && res.success) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(erro => {
          this.$message.error("请求失败");
        });
    },
    add(){
      this.dialogTitle="新增";
      this.dialogVisible = true;
    },
    edit(row) {
      this.dialogTitle="编辑";
      this.dialogForm = deepClone(row);
      this.dialogVisible = true;
    },
    save() {
      this.$refs.dialogForm.validate((valid, object) => {
        if (valid) {
          let httpData = {
            function: "insertOrUpdate",
            ...this.dialogForm
          };
          this.$post
            .postData(
              "insertOrUpdate",
              JSON.stringify(httpData),
              this.$businessCode.hysyd
            )
            .then(res => {
              if (res && res.success) {
                this.dialogVisible = false;
                this.$message.success("保存成功！");
                this.search();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(erro => {
              this.$message.error("请求失败");
            });
        }
      });
    },
    del(row) {
      this.$confirm(
        "是否确认删除此项服务？",
        "提示",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              let httpData = {
                function: "deletePk",
                id: row.id,
                paramType: "0"
              };
              this.$post
                .postData(
                  "deletePk",
                  JSON.stringify(httpData),
                  this.$businessCode.hysyd
                )
                .then(res => {
                  if (res && res.success) {
                    this.$message.success("删除成功！");
                    this.search();
                  } else {
                    this.$message.error(res.data.message);
                  }
                })
                .catch(erro => {
                  this.$message.error("请求失败");
                });
            }
          }
        }
      );
    },
    cleanDialog() {
      this.dialogForm = {
        paramType: "0",
        paramName: "",
        paramCode: "",
        serviceType: "",
        paramExplain: "",
        paramSort: ""
      };
      this.$refs["dialogForm"].clearValidate();
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.search();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.services {
  margin: 0 auto;
  .servicesHeader {
    padding: 8px 70px;
    margin-top: 50px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .process_content {
    width: 92%;
    min-height: 920px;
    padding: 0px 16px;
    margin: 0 auto;
    .contentHeader {
      margin-bottom: 7px;
    }
  }
}
</style>
