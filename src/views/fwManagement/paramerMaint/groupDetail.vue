<template>
  <div>
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left" @click="goBack"></i>
          返回
        </p>

        <div class="grid_comtent">
          <el-button plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button plain @click="preserve">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">示例可见范围配置</h3>
    </header>
    <el-form
      :model="formData.zihaoTypeDic"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
      style="width:60%;margin:0 auto;"
    >
      <el-form-item label="群组名称" prop="zuqunName">
        <el-input type="text" v-model="formData.zihaoTypeDic.zuqunName"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input
          type="text"
          v-model.number="formData.zihaoTypeDic.sorting"
          oninput="if(value<0)value=0;value=value.replace(/[^\d]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="可见范围" prop="peizhiPeople">
        <el-input disabled v-model="text" style="width:90%" placeholder="请选择配置人员"></el-input>
        <el-button
          class="el-icon-arrow-down"
          size="mini"
          style="height:40px;margin-left:10px"
          @click="openDialog"
        ></el-button>
      </el-form-item>
      <treeChild
        :subtreeData="subtreeData"
        :subdialogTit="subdialogTit"
        :suboffenUse="suboffenUse"
        :subcheckIds="subcheckIds"
        :subcanTab="subcanTab"
        :subsingelCheckF="subsingelCheckF"
        :subdialogState="subdialogState"
        :nowCheckList="nowCheckList"
        :nowCheckIds="nowCheckIds"
        @subshowCompDialog="subshowCompDialog"
      ></treeChild>
    </el-form>
  </div>
</template>

<script>
import treeChild from "../components/groupTree.vue";
export default {
  components: {
    treeChild
  },
  data() {
    return {
      nowCheckIds: [],  // 选中数据的id
      nowCheckList: [], // 选中的数据
      treeParams: {
        function: "unitTreeFisrt",
        flag: false
      },
      formData: {
        function: "save",
        zihaoTypeDic: {
          id: "",
          zuqunName: "",
          sorting: 0,
          peizhiPeople: []
        }
      },
      detailParams: {
        function: "findById",
        id: ""
      },
      rules: {
        zuqunName: [
          { required: true, message: "请输入群组名称", trigger: "blur" }
        ],
        // text: [{ required: true, message: "请选择可见范围", trigger: "blur" }],
        peizhiPeople: [
          {
            // type: "array",
            required: true,
            message: "请至少选择一个配置人员"
          }
        ]
      },
      suboffenUse: true, //是否可设置常用
      subcanTab: false, //是否可切换
      subsingelCheckF: false, // 单选true 多选为false
      subdialogTit: "选择可见范围", // 弹框标题
      checkstrictly: true,
      subdialogState: false,
      subcheckIds: [],
      subtreeData: [
        {
          name: "部门",
          id: "bum",
          tree: "treeList",
          data: [
            {
              id: 1,
              name: "一级 1"
            },
            {
              id: 5,
              name: "一级 2"
            },
            {
              id: 8,
              name: "一级 3"
            }
          ]
        },
        {
          name: "行领导",
          id: "hld",
          tree: "treeList",
          data: [
            {
              id: 11,
              name: "领导"
            },
            {
              id: 12,
              name: "管理"
            },
            {
              id: 16,
              name: "团体"
            }
          ]
        },
        {
          name: "行组织",
          id: "hzz",
          tree: "treeList",
          data: [
            {
              id: 110,
              name: "案件"
            },
            {
              id: 120,
              name: "事件"
            },
            {
              id: 160,
              name: "活动"
            }
          ]
        }
      ],
      dialogVisible: false,
      text: "",
      checkTree: []
    };
  },
  created() {
    this.getTreeList();
    console.log(this.$route.query.id);
    this.getDetail();
  },
  methods: {
    //关闭
    handelclose() {
      this.goBack();
    },
    //保存
    preserve() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // alert("submit!");
          console.log(typeof this.formData.zihaoTypeDic.peizhiPeople);
          if (this.$route.query.id !== undefined) {
            if (typeof this.formData.zihaoTypeDic.peizhiPeople == "string") {
              this.formData.zihaoTypeDic = {
                id: this.$route.query.id,
                zuqunName: this.formData.zihaoTypeDic.zuqunName,
                sorting: this.formData.zihaoTypeDic.sorting,
                peizhiPeople: JSON.parse(
                  this.formData.zihaoTypeDic.peizhiPeople
                )
              };
            } else {
              this.formData.zihaoTypeDic = {
                id: this.$route.query.id,
                zuqunName: this.formData.zihaoTypeDic.zuqunName,
                sorting: this.formData.zihaoTypeDic.sorting,
                peizhiPeople: this.formData.zihaoTypeDic.peizhiPeople
              };
            }
          }
          console.log(this.formData);
          this.$post
            .postData(
              "save",
              JSON.stringify(this.formData),
              this.$businessCode.fwgl1
            )
            .then(res => {
              console.log(res);
              if (res.success) {
                this.$message({
                  message: "保存成功!",
                  type: "success"
                });
                this.$router.push("/paramerMaint");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // this.formData.zihaoTypeDic.peizhiPeople = this.checkTree;
    },
    //获取详情
    getDetail() {
      if (this.$route.query.id !== undefined) {
        this.detailParams.id = this.$route.query.id;
        this.$post
          .postData(
            "findById",
            JSON.stringify(this.detailParams),
            this.$businessCode.fwgl1
          )
          .then(res => {
            console.log(res);
            Object.assign(this.formData.zihaoTypeDic, res.data);
            if (!res.data.sorting) {
              this.formData.zihaoTypeDic.sorting = null;
            }
            this.nowCheckList = JSON.parse(res.data.peizhiPeople);
            JSON.parse(res.data.peizhiPeople).forEach(item => {
              this.nowCheckIds.push(item.id);
            });

            console.log(this.formData.zihaoTypeDic);
            var list = JSON.parse(res.data.peizhiPeople);
            

            console.log(list);
            var arr = list.map(el => {
              return el.name;
            });
            this.text = arr.join(",");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //返回
    goBack() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close();
    },
    //获取树
    getTreeList() {
      this.$post
        .postData(
          "unitTreeFisrt",
          JSON.stringify(this.treeParams),
          this.$businessCode.fwgl1
        )
        .then(res => {
          console.log(res);
          this.subtreeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择抄送人
    openDialog() {
      this.subdialogState = true;
    },
    // 选择抄送人弹窗
    subshowCompDialog(result, type) {
      this.subdialogState = !this.subdialogState;
      if (type) {
        console.log(result);
        // this.checkTree = result;
        this.formData.zihaoTypeDic.peizhiPeople = this.nowCheckList = result;

        let newlist = result.map(val => {
          this.nowCheckIds.push(val.id);
          return val.name;
        });
        this.text = newlist.toString();
      }
    }
  }
};
</script>

<style lang='less' scoped>
.bank_dispack_side {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .bank_dispach_back {
    width: 200px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}
.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
}

.bank_dispach_tit {
  display: block;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
</style>