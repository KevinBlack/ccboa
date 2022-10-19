<template>
<!-- 意见反馈页面   created by wanglong 2020-08-12 -->
        <el-row>
        <el-col :span="2">
            <el-button type="primary"  @click="dialogAdd = true">新增意见</el-button >
        </el-col>
        <el-col :span="10" label="">
            <el-input placeholder="请输入内容" v-model="searchVal">
                <el-button slot="append"  icon="el-icon-search" @click="searchValue"></el-button>
            </el-input>
        </el-col>
         
        <el-col :span="10" class="text-right">
            <el-radio-group v-model="radio">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="已回复"></el-radio-button>
                <el-radio-button label="待回复"></el-radio-button>
            </el-radio-group>
        </el-col>
        <el-col :span="2">
            <el-button type="info" plain @click="dropShow = !dropShow">筛选</el-button>
        </el-col>
         <div v-show="dropShow" class="dropdowndiv">
                <el-form
                    :model="searchForm"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                <el-form-item label="意见类型" prop="title">
                <el-input v-model="searchForm.title"></el-input>
                </el-form-item>

                <el-form-item label="拟稿日期">
                <div class="block">
                    <el-date-picker
                    style="width:100%"
                    @change="timeChange($event)"
                    v-model="searchForm.endTime"
                    type="daterange"
                    align="center"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    ></el-date-picker>
                </div>
                </el-form-item>

                <el-form-item label="应用名称" prop="title">
                <el-input v-model="searchForm.title"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="submitForm('searchForm')">立即创建</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>

                </el-form>
            </div>
        <el-col style="margin: 20px 0;">
            <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
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
         <el-button type="text" @click="dialogVisible = true">点击打开反馈内容弹窗</el-button>
            <el-dialog
            title="反馈"
            :visible.sync="dialogVisible"
            width="50%" 
            class="dialogfank"
            >
            <el-card class="box-card">
                <el-row style="margin-left:-3%">
                    <el-col :span="2">
                        <div class="yjfk">意见反馈</div>
                    </el-col>
                    <el-col :span="1">
                        <div class="zrow"></div>
                    </el-col>
                    <el-col :span="21" class="imgtype">
                        {{type}}
                        缺陷
                    </el-col>
                </el-row>
                <el-row class="mt20">
                    <el-col :span="2">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </el-col>
                    <el-col :span="4" class="bmclass">
                        {{bumen}}测试部门
                    </el-col>
                    <el-col :span="4">
                        {{time}}2020-08-12
                    </el-col>
                </el-row>
                <el-row class="mt20">
                    <el-col :span="2" class="heightTab"></el-col>
                    <el-col :span="20">
                        {{massage}}dasdas
                    </el-col>
                </el-row>
                <el-row class="mt20">
                    <el-col :span="2" class="heightTab"></el-col>
                    <el-col :span="20">
                        <img src="aaa.com" alt="">
                    </el-col>
                </el-row>
            </el-card>
            <el-row class="textheight">
                <el-col :span="4">回复内容</el-col>
                <el-col :span="20" class="hfcolor">（选择回复内容,设置为最佳回复）</el-col>
            </el-row>
            <el-card>
                <el-col :span="3" class="leftcolor">
                    最<br>佳<br>回<br>复
                </el-col>
            </el-card>
            <el-card class="box-card h45" style="margin-top:10px;">
              <el-scrollbar style="height:100%;">
                <el-row class="rowheight">
                  <el-col :span="2" class="colheight">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </el-col>
                  <el-col :span="1">
                        <div class="brow"></div>
                    </el-col>
                  <el-col :span="10" class="colheight colborderb">
                      <div>
                        <span class="fontb">测试发文</span> <span>{{timeb}}08-12 09:48</span> 
                      </div>
                      <div class="contenttext">
                        {{content}}1231231231
                      </div>
                  </el-col>
                </el-row>
                <el-row class="rowheight">
                  <el-col :span="11">
                        <div style="height:1px"></div>
                    </el-col>
                  <el-col :span="10" class="colheight colborderb colborderg">
                      <div>
                        <span class="fontb fontg">测试发文</span> <span>{{timeb}}08-12 09:48</span> <span class="zjhf">设置为最佳回复</span>
                      </div>
                      <div class="contenttext">
                        {{content}}1231231231
                      </div>
                  </el-col>
                  <el-col :span="1">
                        <div class="brog"></div>
                  </el-col>
                  <el-col :span="2" class="colheight">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </el-col>
                </el-row>
              </el-scrollbar>
            </el-card>
            <el-card class="box-card h15">
              <el-row>
                <el-col>
                  <el-input type="textarea" v-model="write" aria-placeholder="请输入">

                  </el-input>
                </el-col>
                <el-col>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传系统意见截图</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-col>
              </el-row>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogAdd = false">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
            </el-dialog>

            <el-dialog
            title="我的反馈"
            :visible.sync="dialogAdd"
            width="50%"
            >
            <el-card>
              <el-row>
                <el-col :span="2">
                    <label for="">意见类型：</label>
                </el-col>
                <el-col :span="20">
                <el-radio-group v-model="resource">
                  <el-radio label="建议"></el-radio>
                  <el-radio label="缺陷"></el-radio>
                  <el-radio label="需求"></el-radio>
                </el-radio-group>
                </el-col>
              </el-row>
            </el-card>

            <el-card class="mt10">
              <el-row>
                <el-col>
                  <el-select style="width:100%" v-model="value111" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-card>

            <el-row class="textheight">
                <el-col>非常感谢您的反馈意见，请提出您的建议！</el-col>
            </el-row>

            <el-card class="mt10">
              <el-row>
                <el-col>
                    <el-input type="textarea" v-model="text"></el-input>
                </el-col>
              </el-row>
            </el-card>

            <el-card class="mt10">
              <el-upload
                class="upload-demo"
                action="action"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传系统意见截图</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="dialogAdd = false">确 定</el-button>
            </span>
            </el-dialog>
        </el-row>
       

</template>

<script>
import mTable from "components/table/mTable.vue";
const otherData = [
  { label: "意见类型", prop: "createTime", align: "center" },
  { label: "附件？", prop: "createTime", align: "center" },
  { label: "应用名称", prop: "documentNo", align: "center" },
  { label: "反馈内容", prop: "title", align: "center" },
  { label: "回复人", prop: "sendType", align: "center" },
  { label: "反馈时间", prop: "currentNode", align: "center" },
  { label: "回复状态 ", prop: "currentUser", align: "center" },
  { label: '操作 ', type: 'Button', align: 'center',
                  btnList: [
                    {
                      label: '反馈',
                      size: 'medium',
                      type: 'default',
                      handle: row => {
                        this.handleEdit(row)
                      }
                    },{
                      label: '删除',
                      size: 'medium',
                      type: 'default',
                      handle: row => {
                        this.handleDelete(row)
                      }
                    },
                  ]
                },
]
export default {
  name: "DispatchFile",
  components: {
    mTable
  },
  data() {
    return {
      action:"",//上传文件的地址
      value111:"",
      dialogVisible:false,
      dialogAdd:false,
      write:"",
      radio:"全部",
      text:"",
      resource:"",
      dropShow:false,
      bank_countersignature: {
        function: "getSendOrderList",
        state: 1, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20 //每页条数
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      fileList:[],
      searchVal:'',//搜索内容
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchForm: {
        
      },
      tableLoading: false,
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: true,
      isAll: false,
      currentTab: '1',
      tableData: [],
      tableCols: otherData,
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 10 //每页条数
      }
    };
  },
  methods: {
    searchValue(){},//当前搜索内容
    timeChange(event) {
        console.log(event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 页面初始化加载数据
    initData() {
      this.$post
        .postData(
          "getSendOrderList",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          
          this.tableData = res.data.rows
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          
        });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = val;
      this.pagination.pageSize = val;
      this.pagination.pageNum = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
     
    },
    handleOpenPage (path, id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.dropShow = !this.dropShow
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  created() {
    //this.initData();
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
.text-right{
    text-align: right;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.arrowup{
  padding-left: 20px;
}
.type-radio{
    border: 1px solid #eee;
    padding: 1%;
    border-radius: 0%; 
}
.yjfk{
    background-color:#E6A23C;
    color:white;
    text-align: center;
    height:20px;
    line-height: 20px;
}
.zrow{
    border-width:10px;
    border-style: solid;
    border-color:transparent  transparent  transparent #E6A23C; 
}
.el-form-item{
    margin-bottom: 10px;
}
.imgtype{
    text-align: right;
}
.mt20{
    margin-top: 20px;
}
.mt10{
    margin-top: 10px;
}
.bmclass{
    font-size: 16px;
    color:#6666ce
}
.heightTab{
    height: 1px;
}
.imgclass{
    height: 70px;
}
.h25{
    height: 22vh;
}
.h45{
    height: 35vh;
}
/deep/.el-dialog{
    margin-top: 1vh !important;
}
.textheight{
    height:20px;
    padding-top: 10px;
    line-height: 20px;
}
.hfcolor{
    color:#FF9900;
    text-align: right;
}
.leftcolor{
    border-left:2px solid #FF9900;
    margin:-20px;
    height:10vh
}
.rowheight{
  height:5.1vh;
  margin-top: 15px;
  .brow{
    border-width:10px;
    border-style: solid;
    border-color:transparent #6666ce  transparent  transparent; 
  }
  .colheight{
    height: 100%;
    padding:3px;
    }
  .colborderb{
    border:1px solid #6666ce;
    .fontb{
      font-size:14px;
      color:#5d5d96;
    }
    .contenttext{
      line-height:3vh;
    }
    .fontg{
      color:green;
    }
    
  }
  .colborderg{border:1px solid green;}
  .brog{
    border-width:10px;
    border-style: solid;
    border-color:transparent transparent transparent green; 
  }
  .zjhf{
    color:#89bb89;
    margin-left: 20%;
  }
}
.h15{
  margin-top: 10px;
}
.dropdowndiv{
  width: 22%;
  position: absolute;
  z-index: 200;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  right: 4%;
  top: 4vh;
  border-radius: 10px;
}
</style>
