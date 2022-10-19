/**收藏单
@param formdata[object] 页面数据
@param formList[object] 页面数据
@param iscypage[boolean]  页面是否来自传阅页面
@param pagetype[string] 表单属于制发单还是承办单,取值‘zf’,'cb'
@param editedIdeaFields[object]可编辑意见域
 */
<template>
  <table class="shoucangTable">
    <caption>{{formdata.deptTableHead}}</caption>
    <tr v-if="iscypage">
      <td>当前环节</td>
      <td>{{formdata.currentNode}}</td>
    </tr>
    <tr>
      <td>当前处理人</td>
      <td v-if="!iscypage">{{formdata.currentNowName}}</td>
      <td v-if="iscypage">{{currentUser}}</td>
    </tr>
    
    <tr>
      <td>反馈方式</td>
      <td>{{formdata.feedbackMode=='0'?'无需反馈':(formdata.feedbackMode=='1'?'反馈意见':'反馈意见及附件')}}</td>
    </tr>
    <tr>
      <td>正文标题</td>
      <td>{{formdata.title}}</td>
    </tr>
    <tr v-if="formdata.feedbackMode=='1'||formdata.feedbackMode=='2'">
      <td>反馈截止日期</td>
      <td>{{formdata.feedTime}}</td>
    </tr>
    <tr>
      <td>编号</td>
      <td>
        {{formdata.documentNo}}
        <template
          v-if="formdata.currentNode=='综合处理'||formdata.bnbh==1"
        >{{formdata.bnbh=='1'?'部内便函':''}}</template>
      </td>
    </tr>
    <tr v-if="!!pagetype&&pagetype!='zf'">
      <td>接收日期</td>
      <td>{{formdata.receiveDate}}</td>
    </tr>
    <tr>
      <td>主送</td>
      <td>{{formdata.main}}</td>
    </tr>
    <tr>
      <td>抄送</td>
      <td>{{formdata.copy}}</td>
    </tr>
    <tr>
      <td>内容</td>
      <td>
        <div v-html="formdata.content" style="max-width:916px"></div>
      </td>
    </tr>
    <tr>
      <td>拟稿部门</td>
      <td>{{formdata.draftDepartmentOne}}</td>
    </tr>
    <tr>
      <td>拟稿日期</td>
      <td>{{formdata.draftTime}}</td>
    </tr>
    <tr>
      <td>拟稿人</td>
      <td>{{formdata.draftUser}}</td>
    </tr>
    <tr>
      <td>联系电话</td>
      <td>{{formdata.phone}}</td>
    </tr>
    <tr v-if="isZH">
      <td>{{formdata.showApp=='1'?'移动端展示':'pc端展示'}}</td>
      <td></td>
    </tr>
    <tr>
      <td>签发意见</td>
      <td>
        <template>
          <format-form-fild :isInput='isInput' :arrayList="formdata.sendList"></format-form-fild>
        </template>
      </td>
    </tr>
    <tr v-if="!!pagetype&&pagetype!='zf'">
      <td>最终意见</td>
      <td>
        <template>
          <format-form-fild :isInput='isInput' :arrayList="formdata.zzOpinion"></format-form-fild>
        </template>
      </td>
    </tr>
    <tr v-if="!!pagetype&&pagetype!='zf'">
      <td>过程意见</td>
      <td>
        <template>
          <format-form-fild :isInput='isInput' :arrayList="formdata.processList"></format-form-fild>
        </template>
      </td>
    </tr>
    <tr v-if="!!pagetype&&pagetype=='zf'">
      <td>审核意见</td>
      <td>
        <template>
          <format-form-fild :isInput='isInput' :arrayList="formdata.checkList"></format-form-fild>
          <div
            v-if="!editedIdeaFields.shyj||!(formdata.checkList && formdata.checkList.length!=0)"
          >{{formdata.opinionCheck}}</div>
        </template>
      </td>
    </tr>
    <tr v-if="!iscypage">
      <td>传阅意见</td>
      <td>
        <div v-for="item in formdata.cyList" :key="item.id">
          <div class="d_flex">
            <el-row class="d_b100">
              <el-col :span="23" style="background: #e0e0e057;padding: 5px 10px;">
                <div style="min-height:80px">{{item.content}}</div>
                <div v-for="file in item.attachmentPos" :key="file.id">
                  <span class="name down" @click="viewFile(file)">{{file.fileName}}</span>
                </div>
                <div class="adviceInfo">
                  {{item.departmentName}}
                  <span class="pad_lr10">{{item.userName}}</span>
                  <p class="creat_time">{{item.createTime}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div
          v-if="!editedIdeaFields.cyyj|| !(formdata.cyList && formdata.cyList.length!=0)"
        >{{formdata.cyyj}}</div>
      </td>
    </tr>
    <tr v-if="iscypage">
      <td>一次传阅意见</td>
      <td>
        <div v-for="item in formdata.cyList" :key="item.id" style="margin-bottom: 3px">
          <div class="d_flex">
            <el-row class="d_b100">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :value="item.content"
                  rows="3"
                  class="d_f1"
                ></el-input>
                <div v-for="file in item.attachmentPos" :key="file.id">
                  <span class="name down" @click="viewFile(file)">{{file.fileName}}</span>
                </div>
                <div class="adviceInfo">
                  {{item.departmentName}}
                  <span class="pad_lr10">{{item.userName}}</span>
                  <p class="creat_time">{{item.createTime}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </td>
    </tr>
    <tr v-if="iscypage">
      <td>二次传阅意见</td>
      <td>
        <div v-for="item in formdata.twocyList" :key="item.id" style="margin-bottom: 3px">
          <div class="d_flex">
            <el-row class="d_b100">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  :value="item.content"
                  rows="3"
                  class="d_f1"
                ></el-input>
                <div v-for="file in item.attachmentPos" :key="file.id">
                  <span class="name down" @click="viewFile(file)">{{file.fileName}}</span>
                </div>
                <div class="adviceInfo">
                  {{item.departmentName}}
                  <span class="pad_lr10">{{item.userName}}</span>
                  <p class="creat_time">{{item.createTime}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>备注</td>
      <td>
        <template>
          <format-form-fild :isInput='isInput' :arrayList="formdata.commentsList"></format-form-fild>
          <div
            v-if="!editedIdeaFields.Remark||!(formdata.commentsList && formdata.commentsList.length!=0)"
          >{{formdata.comments}}</div>
        </template>
      </td>
    </tr>
    <tr v-if="!iscypage">
      <td rowspan="2">传阅人员</td>
      <td>未阅:{{formdata.wyPle}}</td>
    </tr>
    <tr v-if="!iscypage">
      <td>已阅：{{formdata.yyPle}}</td>
    </tr>
    <tr v-if="iscypage">
      <td>一次传阅人员</td>
      <td>{{formdata.cyry}}</td>
    </tr>
    <tr v-if="iscypage">
      <td rowspan="2">二次传阅人员</td>
      <td>未阅:{{formdata.wyPle}}</td>
    </tr>
    <tr v-if="iscypage">
      <td>已阅：{{formdata.yyPle}}</td>
    </tr>
    <tr
      v-if="!!pagetype&&pagetype=='zf'&&!iscypage&&formdata.feedbackMode!=0&&formdata.undertakeDepartment"
    >
      <td>承办单位</td>
      <td>
        <el-row>
          <el-col :span="23">
            <el-table :data="cbList" border id="table">
              <el-table-column label-class-name="displayClass">
                <template slot="header">{{formdata.title}}{{formdata.documentNo}}反馈意见</template>

                <el-table-column prop="undertakeDepartment" label="部门名称" width="200"></el-table-column>
                <el-table-column  width="628">
                  <template slot="header">
                    <span>意见</span>
                  </template>
                  <template slot-scope="scope">
                    <format-form-fild :isInput='isInput' :arrayList="scope.row.opinionDoList"></format-form-fild>
                    <div
                      class="name down"
                      v-for="item in  scope.row.attachList"
                      :key="item.id"
                    >{{item.fileName}}</div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </td>
    </tr>
    <tr v-if="!!pagetype&&pagetype=='zf'&&formdata.feedbackMode==0&&formdata.undertakeDepartment">
      <td>承办单位</td>
      <td>
        <el-row style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;">
          <el-col
            style="border: 1px solid #ccc;padding:0 4px;border-top: 0;border-left: 0;"
            v-for="item in cbList"
            :key="item.id"
            :span="6"
          >{{item.undertakeDepartment}}</el-col>
        </el-row>
      </td>
    </tr>
    <!-- <tr v-show="formdata.attchmentFileInfo&&formdata.attchmentFileInfo.length">
      <td>制发单附件</td>
      <td>
        <el-col :span="23">
          <div class="tree_w">
            <div v-for="item in formdata.attchmentFileInfo" :key="item.id" class="comp_list">
              <template>
                <div class="command_file">
                  <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                  <span class="name">{{item.createrName}}</span>
                  <span class="name">{{item.createTime}}</span>
                </div>
              </template>
            </div>
          </div>
        </el-col>
      </td>
    </tr>
    <tr v-if="(pagetype=='cb'||(pagetype=='zf'&&iscypage))&&formdata.attchmentFileInfo&&formdata.attchmentFileInfo.length">
      <td>承办单附件</td>
      <td>
        <el-col :span="23">
          <div class="tree_w">
            <div v-for="item in  formdata.attchmentFileInfo" :key="item.id" class="comp_list">
              <template>
                <div class="command_file">
                  <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                  <span class="name">{{item.createrName}}</span>
                  <span class="name">{{item.createTime}}</span>
                </div>
              </template>
            </div>
          </div>
        </el-col>
      </td>
    </tr> -->
  </table>
</template>

<script type="text/ecmascript-6">
import formatFormFild from "../components/formatFormFiled";
export default {
  components: { formatFormFild },
  props: {
    iscypage: {
      type: Boolean,
      default() {
        return false;
      }
    },
    editedIdeaFields: {
      type: Object,
      default() {
        return { Remark: true, cyyj: true, shyj: true, yjps: true };
      }
    }, //可编辑意见域
    pagetype: {
      type: String,
      default() {
        return "zf";
      }
    },
    formdata: {
      cyyj: ""
    },
    formList:{}
  },
  data() {
    return {
      currentUser:JSON.parse(localStorage.getItem('userInfo')).shortCurrUnitName+' '+JSON.parse(localStorage.getItem('userInfo')).humanName,
      isZH: JSON.parse(localStorage.getItem("userInfo")).unitId == "111111111",
      isInput:true
    };
  },
  watch: {
    formdata: {
      handler(newv) {
        this.formdata = newv;
        if (!this.formdata.deptTableHead) {
          this.$set(
            this.formdata,
            "deptTableHead",
            this.formdata.deptTableHeader
          );
        }
      },
      deep: true
    },
    formList: {
      handler(newv) {
        this.formList = newv;
      },
      deep: true
    }
  },
  computed: {
    cbList(){
      return this.formdata.cbList||this.formList.cbList
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
  /deep/td,th{border: 1px solid #DDD;}
</style>