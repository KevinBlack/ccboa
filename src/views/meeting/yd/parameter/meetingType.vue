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
* 备注：会议预定/会议类型配置
*/
<template>
  <div class="meetingType">
    <!-- <div class="meetingTypeHeader">
      <div class="title-text">会议类型配置</div>
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
          <el-form-item label="会议类型" prop="paramName">
            <el-input v-model="dialogForm.paramName"></el-input>
          </el-form-item>
          <el-form-item label="类型编码" prop="paramCode">
            <el-input v-model="dialogForm.paramCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="paramSort">
            <el-input type="number" placeholder="请填写数字" v-model.number="dialogForm.paramSort"></el-input>
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
  name: "meetingType",
  components: {
    tTable
  },
  data() {
    return {
      paramType: "1", //参数类型 0 服务项目  1会议类型
      // 分页数据
      pagination: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      tableCols: [
        { prop: "paramName", label: "会议类型" },
        { prop: "paramCode", label: "类型编码" },
        { prop: "paramSort", label: "排序" },
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
      dialogTitle:"",//弹窗标题
      dialogVisible: false,
      dialogForm: {
        paramType: "1",
        paramName: "",
        paramCode: "",
        paramSort: ""
      },
      rules: {
        paramName: [
          { required: true, trigger: "blur", message: "请输入会议类型" }
        ]
      },
      httpConfig: {
        code: ""
      }
    };
  },
  computed: {},
  methods: {
    search() {
      let httpData = {
        function: "doFindParam",
        paramType: "1",
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
    edit(row) {
      this.dialogTitle="编辑";
      this.dialogVisible = true;
      this.dialogForm = deepClone(row);
    },
    add(){
      this.dialogTitle="新增";
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
      this.$confirm("确认删除此项会议类型？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        callback: action => {
          if (action == "confirm") {
            let httpData = {
              paramType: "0",
              function: "deletePk",
              id: row.id
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
      });
    },
    cleanDialog() {
      this.dialogForm = {
        paramType: "1",
        paramName: "",
        paramCode: "",
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
.meetingType {
  margin: 0 auto;
  .meetingTypeHeader {
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
