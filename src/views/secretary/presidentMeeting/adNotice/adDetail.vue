<template>
  <div class="zfTwo">
    <div class="headerClick">
      <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>会议主办单</span>
      </div>
      <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
            v-show="buttonList[index].show"
          :key="index"
          size="mini"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">中国建设银行行长办公会议预通知</div>
    </div>
    <div class="process_content" id="bank_dispach_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{this.formData.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{this.formData.currentUser}}</span>
          </p>
        </div>
      </div>
      <el-form ref="elForm" :model="formData" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人">
              <el-input v-model="formData.draftUser" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="formData.tel" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期">
              <el-input v-model="formData.draftDate" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称">
              <el-input v-model="formData.title" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议候场地点">
          <el-input v-model="formData.hyHcdd" :disabled="isOnly"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议时间">
              <el-input v-model="formData.hyTime" :style="{width:'100%'}" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议地点">
              <el-input v-model="formData.hyAdress" :style="{width:'100%'}" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议候场地点">
              <el-input v-model="formData.hyHcdd" :style="{width:'100%'}" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议材料要求" style="color:red">
          <p>请按如下要求上传会议材料</p>
          <p>1、请将会议议题正文嵌套模板，并以审议/研究XXXXXX的形式命名</p>
          <p>2、请将秘书处审议通过的议题文件转成PDF形式后打包上传</p>
        </el-form-item>
        <el-form-item label="会议通知">
          <el-table
            :data="hYData"
            :row-class-name="tableRowClassName"
            @select="handleSelectionChange1"
            border
            ref="multipleTable"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ytOrderNum" label="议题序号" width="70">
              <!-- <template slot-scope="scope">
                        <el-input v-model="scope.row.ytOrderNum" placeholder="议题序号" disabled></el-input>
              </template>-->
            </el-table-column>
            <el-table-column prop="ytMc" label="议题名称" width="100">
              <!-- <template slot-scope="scope">
                        <el-input v-model="scope.row.ytMc" placeholder="议题名称" disabled></el-input>
              </template>-->
            </el-table-column>
            <el-table-column prop="strZhbr" label="主汇报人" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.strZhbr" placeholder="主汇报人"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="hyCl" label="会议材料" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  align="center"
                  @click="handleEdit(scope.$index, scope.row)"
                >上传</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="isGzzd" label="是否是规章制度类议题" width="110">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isGzzd" size="mini">
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="2">否</el-radio-button>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="isLegal" label="是否已通过合规性检查" width="110">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isLegal" size="mini">
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="2">否</el-radio-button>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="lxDeptName" label="列席部门" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                >选择</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="shyj" label="审核意见"></el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "adDetail",
  components: {},
  props: {},
  data() {
    return {
      // hYData: [{
      //   ytOrderNum:'一',
      //   ytMc:'议题一',
      //   strZhbr:'张三',
      //   // radio:'1',
      //   isGzzd:'1',
      //   isLegal:'1',
      //   hyCl:'',
      //   lxDeptName:'',
      //   shyj:'此议题暂无审核意见',
      // }],
      id: "",
      isOnly: "",
      tzId: "",
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
      draftForm: {},
      option1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      //  firstCfg: [],
      treeData: [], //人员树
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [],
      offenUse: true,
      loadingTree: true,
      hYData:[],
      formData: {
        // hYData: [
        //   // {
        //     // ytOrderNum:'一',
        //     // ytMc:'议题一',
        //     // strZhbr:'张三',
        //     // // radio:'1',
        //     // isGzzd:'1',
        //     // isLegal:'1',
        //     // hyCl:'',
        //     // lxDeptName:'',
        //     // shyj:'此议题暂无审核意见',
        //   // },
        // ],
        // hYrules: {
        //   strZhbr: [
        //     { required: true, message: "主汇报人不能为空", trigger: "blur" },
        //   ],
        // },
      },
      rules:{},
      rowData: {},
      jbNm: "",
       buttonList: [
                    {name:"关闭",show:true},
                    {name:"保存",show:true},
                    {name:"完成并发送",show:true},
                    {name:"反馈",show:true},
                    {name:"此议题暂不上会",show:true},
                    {name:"查看流程",show:true},
                    {name:"操作指南",show:true},
                    
                ],
    };
  },
  methods: {
      buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "保存":
          this.save_btn();
          break;
        case "反馈":
          this.back_btn();
          break;
          case "此议题暂不上会":
          this.nosub_btn();
          break;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      //    //把每一行的索引放进row
      //   row.index = rowIndex;
    },
    handleSelectionChange1(rows, row) {
    },
    btnEvent() {},
    // showCompDialog(){},
  
    // 关闭
     close_btn() {
        this.$confirm('确认关闭？')
          .then(()=> {
           this.$router.back()
          })
      },
// 保存
        save_btn() { 
         let rowInfo = this.$refs.multipleTable.selection[0]
          //  this.$refs["elForm"].validate((valid) => {
        // if (valid) {
          // this.formData.hyTime = this.formData.hyTime.getTime()
          this.$api.secreatary.meeting.getAdUpdate(rowInfo).then((res) => {
              this.$message.success('保存成功');          
            })  
        // }
      // }
      // ); 
        },
        // 反馈
        back_btn(){
           this.$api.secreatary.meeting.getAdback({
            id:this.id,
            tzId:this.tzId,
          }).then((res) => {
              this.$message.success('反馈成功');          
            })  
        },
// 此议题暂不上会
    nosub_btn(){
       this.$api.secreatary.meeting.noSubmit({
            id:this.id,
            // tzId:this.tzId,
          }).then((res) => {
              this.$message.success('操作成功');          
            }) 
    },
    open1() {
      this.$message("请与总行办公室秘书处联系，联系电话：67588001");
    },

    // 获取会议内容
    getTable() {
      //  console.log('--------------------- this.tzId',this.tzId)
      this.$api.secreatary.meeting
        .getHyTable(
          {
            tzId: this.tzId,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {         
          res.data &&
            res.data.map((item) => {
              item.type = true;
            });
          this.hYData = res.data;
          this.hYData.id= res.data[0].id;
          //  console.log('  this.hYData.id-----------------------',  this.hYData.id)
        });
    },
    // 加载详情
    loadData() {
      this.$api.secreatary.meeting.getAdDetail({ id: this.id }).then((res) => {
        // console.log(
        //   "---------------------res.data.tzId加载详情",
        //   res.data.tzId
        // );
        this.tzId = res.data.tzId;
        this.formData = res.data;
        this.getTable();
      });
    },
    // 删除
    del() {},
    //设置控制域
    setConfig() {},
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    this.id = JSON.parse(this.$route.query.rowData).id;
    this.loadData();
  },
  mounted() {
    // this.open1();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.box {
  display: flex;
  border: 1px solid #dcdfe6;
  padding-bottom: 10px;
  border-radius: 4px;
  .right {
    padding: 10px 10px 0 0;
    flex: 1;
  }
}
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.zfTwo {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .left {
      margin-left: 20px;
      cursor: pointer;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

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

  .process_content {
    width: 80%;
    // min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          display: inline-block;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .editor_box {
      height: 500px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 120px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}
.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.bank_dispach_side_nav {
  width: 45px;
  height: auto;
  position: fixed;
  bottom: 8px;
  left: 10%;
  margin-left: -43px;
  text-align: center;

  a {
    width: 45px;
    height: 70px;
    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    width: 45px;
    height: 70px;

    border: 2px solid #3b85ef;
    font-size: 16px;
    margin: 15px 0;
    color: #3b85ef;
    background: #fff;
    border-radius: 10px 0 0 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    background: #3b85ef;
    color: #fff;
  }
}
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}
.con-left {
  float: left;
  width: 80%;
  border-right: 1px solid #ccc;
  .con-left-p1 {
    width: 12%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #ccc;
    border-left: 0;
    border-top: 0;
  }
  .con-left-p2 {
    width: 88%;
    height: 30px;
    line-height: 30px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
  .bottom-none {
    border-bottom: 0;
  }
}
.con-right {
  float: left;
  width: 20%;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.adviceInfo {
  position: absolute;
  width: 95%;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.pad_lr10 {
  padding: 0 10px;
}
.chuanyue1 {
  border-bottom: 1px solid #ccc;
}
.chuanyue-p1,
.chuanyue-p2 {
  width: 10%;
  height: 50px;
  line-height: 50px;
  float: left;
  border-right: 1px solid #ccc;
  text-align: center;
}
.chuanyue-p2 {
  width: 90%;
  border: 0;
  text-align: left;
}
.par {
  position: relative;
  .par-child {
    position: absolute;
    top: 30px;
  }
}
/deep/.radio-form .el-radio {
  margin: 10px;
}
</style>
