<template>
  <div class="proceHas">
    <div class="headerClick">
      <div class="right">
        <el-button plain class="bank_grid_comtent_active" @click="buttonClick('关闭')" style="margin-right: 10px">关闭
        </el-button>
<!--        <span v-if="$route.query.type == '1'">-->
<!--          <el-button plain @click="buttonClick('收回')">收回</el-button>-->
<!--          <el-button plain @click="buttonClick('催办')">催办</el-button>-->
<!--          <el-button plain @click="buttonClick('传阅')">传阅</el-button>-->
<!--          <el-button v-if="formdata.wyPle" plain @click="buttonClick('传阅收回')">传阅收回</el-button>-->
<!--          <el-button v-if="formdata.undertakeDepartment" plain @click="buttonClick('查看回执')">查看回执</el-button>-->

<!--          <el-button plain @click="buttonClick('查看传阅记录')">查看传阅记录</el-button>-->
<!--          <el-button plain @click="buttonClick('查看流程')">查看流程</el-button>-->
<!--          <el-button plain @click="buttonClick('打印处理单')">打印处理单</el-button>-->
<!--          <el-button plain @click="buttonClick('操作指南')">操作指南</el-button>-->
<!--          <el-button plain @click="buttonClick('收藏')">收藏</el-button>-->
<!--        </span>-->
<!--        <span v-else>-->
<!--          <el-button plain @click="buttonClick('归档')">归档</el-button>-->
<!--          <el-button plain @click="buttonClick('查看流程')">查看流程</el-button>-->
<!--          &lt;!&ndash;          <el-button v-if="formdata.undertakeDepartment" plain @click="buttonClick('查看回执')">查看回执</el-button>&ndash;&gt;-->
<!--          <el-button plain @click="buttonClick('打印处理单')">打印处理单</el-button>-->
<!--          <el-button plain @click="buttonClick('操作指南')">操作指南</el-button>-->
<!--          <el-button plain @click="buttonClick('收藏')">收藏</el-button>-->
<!--        </span>-->
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">{{formdata.deptTableHead}}</div>
    </div>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >签批意见</a>
        <a
          href="javascript:void(0);"
          :class="active == '#scfj' ? 'active' : ''"
          @click="toTarget('#scfj')"
        >附件</a>
      </div>

      <div class="bank_dispach_file">
        <div class="process_content">
          <el-form label-width="120px" :model="formdata" disabled>
            <div class="cur_box">
              <div class="cur_sess">
                <p>
                  当前环节：
                  <span>{{formdata.currentNode}}</span>
                </p>
                <p>
                  当前处理人：
                  <span>{{formdata.currentNowName}}</span>
                </p>
              </div>
              <div class="feed_back">
                <p class="label_title">反馈方式</p>
                <template>
                  <el-radio-group v-model="formdata.feedbackMode" disabled>
                    <el-radio :label="'0'">无需反馈</el-radio>
                    <el-radio :label="'1'">反馈意见</el-radio>
                    <el-radio :label="'2'">反馈意见及附件</el-radio>
                  </el-radio-group>
                </template>
              </div>
            </div>

            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <el-row>
              <el-col :span="formdata.feedbackMode!='0'?16:24">
                <el-form-item label="正文标题">
                  <el-input v-model="formdata.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.feedbackMode!='0'">
                <el-form-item label="反馈截止时间">
                  <el-date-picker type="date" format="yyyy-MM-dd" v-model="formdata.feedTime"
                                  style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="isZonghe?16:24">
                <el-form-item label="编号" prop="documentNo">
                  <el-input v-model="formdata.documentNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formdata.bnbh">
                <el-form-item label="" prop="isbnbh" style="text-align: right">
                  <el-checkbox v-model="formdata.bnbh" true-label="1" false-label="0">
                    部内便函
                  </el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="主送">
              <el-input v-model="formdata.main"></el-input>
            </el-form-item>
            <el-form-item label="抄送">
              <el-input v-model="formdata.copy"></el-input>
            </el-form-item>

            <div class="editor_box">
              <label>便函内容</label>
              <UE  :config="config"  id="UE" ref="ue"></UE>
            </div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿部门">
                  <el-input v-model="formdata.draftDepartment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拟稿日期">
                  <el-date-picker type="date" v-model="formdata.draftTime" style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="拟稿人">
                  <el-input v-model="formdata.draftUser" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="formdata.phone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="移动端展示">
              <el-radio-group v-model="formdata.isMobileServiceShow" :disabled="true">
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">签批意见</h6>
            <div id="qpyj" class="height_90"></div>

            <el-form-item label="签发意见" prop="opinionSend">
              <template>
                <div v-for="item in formdata.sendList" :key="item.id" style="margin-bottom: 3px">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-input
                          type="textarea"
                          :value="item.content"
                          :disabled="true"
                          rows="3"
                          class="d_f1"
                        ></el-input>
                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <el-row v-if="!formdata.sendList||formdata.sendList.length==0">
                  <el-col :span="24">
                    <el-input type="textarea" :rows="3" v-model="formdata.opinionSend"></el-input>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
            <el-form-item label="审核意见" prop="opinionCheck">
              <template>
                <div v-for="item in formdata.checkList" :key="item.id" style="margin-bottom: 3px">
                  <div class="d_flex">
                    <el-row class="d_b100">
                      <el-col :span="24">
                        <el-input
                          type="textarea"
                          :value="item.content"
                          :disabled="true"
                          rows="3"
                          class="d_f1"
                        ></el-input>
                        <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <el-row v-if="!formdata.checkList||formdata.checkList.length==0">
                  <el-col :span="24">
                    <el-input type="textarea" :rows="3" v-model="formdata.opinionCheck"></el-input>
                  </el-col>
                </el-row>
              </template>
            </el-form-item>
            <el-form-item label="传阅意见" prop="cyyj">
              <div v-for="item in formdata.cyList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        rows="3"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <el-row v-if="!formdata.checkList||formdata.checkList.length==0">
                <el-col :span="24">
                  <el-input type="textarea" :rows="3" v-model="formdata.cyyj" disabled="false"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
              <div v-for="item in formdata.commentsList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        rows="3"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">{{item.departmentName}}<span class="pad_lr10">{{item.userName}}</span>{{item.createTime}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <el-input
                v-if="!formdata.checkList||formdata.checkList.length==0"
                type="textarea"
                v-model="formdata.comments"
                placeholder="填写意见不可多余500字"
                maxlength="500"
                :rows="3"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="传阅人员">
              <el-input :disabled="true" v-model="formdata.wyPle"></el-input>
              <el-input :disabled="true" v-model="formdata.yyPle"></el-input>
            </el-form-item>
            <h6 class="bank_dispach_file_tit">附件</h6>
            <div id="scfj" class="height_90"></div>
            <el-form-item>
              <el-col :span="23">
                <div
                  class="tree_w" v-if="formdata.attchmentFileInfo&&formdata.attchmentFileInfo.length">
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in  formdata.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list">
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <div class="btns">
                            <el-button
                              type="primary"
                              size="mini"
                              @click.native="downFile(item)"
                              round
                            >下载
                            </el-button>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
<!--    <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart>-->
<!--    <select-person-->
<!--      :canTab="false"-->
<!--      :loadingTree="loadingTree"-->
<!--      :hasRadio="hasRadio"-->
<!--      :offenUse="offenUse"-->
<!--      :treeData="treeData"-->
<!--      :dialogType="dialogType"-->
<!--      :seletOptionsData="seletOptionsData"-->
<!--      :dialogTypeNow="dialogTypeNow"-->
<!--      dialogTit="选择人员"-->
<!--      :checkIds="checkIds"-->
<!--      :checkData="checkData"-->
<!--      :singelCheckF="singelCheckF"-->
<!--      :dialogState="dialogState"-->
<!--      @showCompDialog="showCompDialog"></select-person>-->
<!--    <cy-person-list v-model="showCyPerson"-->
<!--                    title="选择人员"-->
<!--                    :isSingle="false"-->
<!--                    :data="cyData"-->
<!--                    @personList="cysh"></cy-person-list>-->
  </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapActions} from "vuex"
    import flowChart from "components/dialog/flowChart";
    import selectPerson from 'components/tree/tree-fawen'
    // import userInfo from "../../../util/userInfo";
    // import cyPersonList from "../components/cyPersonList";
    import UE from 'components/editor/ue.vue';

    export default {
        name: "proceHas",
        components: {

            flowChart,
            selectPerson,
            // cyPersonList,
            UE
        },
        props: {},
        data() {
            return {
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350,
                    toolbars: [[
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                        'horizontal', 'date', 'time', 'spechars', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'preview', 'searchreplace', 'help', 'drafts'
                    ]]
                },
                showCyPerson: false,
                cyData:[],
                active: "#wjys",
                scrollIntoViewOptions: {
                    block: "start",
                    behavior: "smooth"
                },
                id: '',
                flowChartList: [],
                showFlowChart: false,
                buttonList: [],
                formdata: {},
                treeData: [],//人员树
                dialogType: "next",
                checkIds: [], //选中id列表
                checkData: [], //选中数据
                dialogState: false,//显示隐藏
                singelCheckF: true, // 单选true 多选为false
                hasRadio: false,//是否單選
                dialogTypeNow: "next",
                seletOptionsData: [],
                offenUse: true,
                loadingTree: true
            }
        },
        computed: {
            ...mapGetters([
                'todoItem'
            ])
        },
        methods: {
            isZonghe() {
                return userInfo.isZongHe()
            },
            onScroll() {
                const scrolled = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset);
                if (scrolled < this.distance_qpyj - 100) {
                    this.active = "#wjys";
                } else if (scrolled > this.distance_qpyj- 180 && scrolled < this.distance_scfj-200) {
                    this.active = "#qpyj";
                } else {
                    this.active = "#scfj";
                }
                console.log(this.active)
            },
            toTarget(target) {
                const toElement = document.querySelector(target);
                toElement.scrollIntoView(this.scrollIntoViewOptions);
            },
            loadData() {
                this.$api.bianhan.distriDeal({id: this.id}).then(res => {
                    this.formdata = res.bHMainOrderDo;
                    this.formdata.sendList = res.sendList;
                    this.formdata.commentsList = res.commentsList;
                    this.formdata.cyList = res.cyList;
                    this.formdata.checkList = res.checkList;
                    setTimeout(() => {
                        this.$refs.ue.setUEContent(this.formdata.content)
                    }, 1000)
                    this.getFileList()
                })
            },
            buttonClick(params) {
                switch (params) {
                    case "关闭":
                        this.$intent.closeWindowImpo(this)
                        break
                    case '收回':
                        this.$api.bianhan.zfBack({
                            id: this.id,
                            avyId: this.todoItem.avyId,
                            oldCurrentNode: this.todoItem.oldCurrentNode
                        }).then(res => {
                            this.$message({type: "sucess", message: "收回成功"})
                            this.$intent.closeWindow(this)
                        })
                        break
                    case "查看流程":
                        this.$api.bianhan.getLiuCheng({id: this.id,type:"0"}).then(res => {
                            this.showFlowChart = true;
                            this.flowChartList = res.list
                        })
                        break
                    case "打印处理单":
                        this.$intent.go(this,{path:"/bianhanZf",query:{id:this.id}})
                        break
                    case "查看回执":

                        break
                    case "操作指南":
                        downLoadFileReName('/ecpweb/page/ccboa/static/file/便函操作指南.docx',"便函操作管理指南.docx")
                        break
                    case "收藏":

                        break
                    case "催办":
                        this.$api.bianhan.cuiban({id: this.id, type: '0'}).then(res => {
                            this.$message({
                                message: '催办成功',
                                type: 'success'
                            });
                        })
                        break
                    case '传阅':
                        this.singelCheckF = false;
                        this.offenUse = false;
                        this.dialogTypeNow = 'cy';
                        this.loadingTree = true;
                        this.dialogState = true;
                        break;
                    case '传阅收回':
                        this.singelCheckF = false;
                        this.offenUse = false;
                        this.dialogTypeNow = 'cysh';
                        this.loadingTree = false
                        this.$api.bianhan.getNoCyList({parentDocId: this.id}).then(res => {
                            if (res.data.length == 0) {
                                this.$message({type: "success", message: "暂无未阅人员"})
                            } else {
                                res.data.forEach(item => {
                                    item.name = item.curUserCn
                                })
                                this.cyData = res.data;
                                this.showCyPerson = true;
                            }
                        })
                        break;
                }
            },
            //选人成功后
            showCompDialog(data, status, type, params, dtype) {
                this.dialogState = false;
                switch (dtype) {
                    case "cy":
                        this.cy(data)
                        break
                    default:
                        break
                }
            },
            //传阅收回
            cysh(data) {
                let ids = [];
                data.map(item => {
                    ids.push(item.id)
                })
                this.$api.bianhan.cheHuiCy({ids: ids.join(",")}).then(res => {
                    this.loadData()
                    this.$message({
                        message: '传阅收回成功',
                        type: 'success'
                    });
                })
            },
            //发传阅
            cy(person) {
                let ids = [], names = [];
                person.forEach(item => {
                    ids.push(item.id)
                    names.push(item.name)
                })
                this.formdata.curUserId = ids.join(',')
                this.formdata.curUserName = names.join(',')
                this.formdata.currentNode = "制发";
                this.$api.bianhan.sendChuanYue(this.formdata).then(res => {
                    this.loadData()
                    this.$message({
                        message: '传阅成功',
                        type: 'success'
                    });
                })
            },
            getFileList() {
                this.$api.setSysConfig.getTextemList({id: this.id}).then(res => {
                    this.formdata.attchmentFileInfo = res.data
                })
            },
            downFile(file) {
                let bank_doDownloadFile = {function: "doDownloadFile"}
                bank_doDownloadFile.fileName = file.fileName;
                bank_doDownloadFile.filePath = file.filePath;
                this.$post
                    .postData(
                        "doDownloadFile",
                        JSON.stringify(bank_doDownloadFile),
                        this.$businessCode.fawglfj
                    )
                    .then(res => {
                        if (res) {
                            if (res && res.success) {
                                downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName, file.fileName);
                                // location.href =
                                //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                //     res.filePath +
                                //     "&fileName=" +
                                //     res.fileName;
                            } else {
                                this.$message({
                                    type: "error",
                                    showClose: true,
                                    offset: 400,
                                    message: "下载失败",
                                    duration: 500
                                });
                            }
                        }
                    });
            },
        },
        activated() {
        },
        mounted() {
            this.$nextTick(()=>{
                this.$refs.ue.setDsabled();
            })
            this.distance_wjys = document.querySelector("#wjys").offsetTop-60;
            this.distance_qpyj = document.querySelector("#qpyj").offsetTop-60;
            this.distance_scfj = document.querySelector("#scfj").offsetTop-60;
            this.$nextTick(() => {
                document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
            });
            window.addEventListener("scroll", this.onScroll, true);
        },
        created() {
            this.id = this.$route.query.id;
            this.loadData()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .bank_grid_comtent_active {
    border: 1px solid #fff;
    background: #0563c8;
    color: #fff;
  }
  .height_90 {
    height: 200px;
    margin-top: -200px;
  }
  .bank_dispach_content {
    width: 100%;
    height: auto;

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

      .active {
        background: #3b85ef;
        color: #fff;
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


  .proceHas {
    min-height: 1000px;
    margin: 0 auto;

    .headerClick {
      background: #409eff;
      color: white;
      height: 70px;
      line-height: 70px;

      .left {
        margin-left: 20px;
      }

      .right {
        margin-right: 20px;
        float: right;
      }
    }

    .formHeader {
      padding: 8px 70px;

      .title-text {
        margin-bottom: 5px;
        font-size: 42px;
        line-height: 75px;
        color: #409eff;
        font-weight: 500;
        text-align: center;
      }
    }

    .process_content {
      width: 80%;
      background: white;
      min-height: 920px;
      padding: 20px 16px;
      margin: 0 auto;
      border: 1px solid #ccc;

      .cur_box {
        width: 97%;
        margin-left: 3%;
        height: 30px;
        border: 1px solid #f9aa21;
        background: #fef7e7;

        .el-radio-group {
          margin-top: 9px !important;
          margin-right: 12px !important;
        }

        .el-radio {
          margin-right: 0 !important;
          margin-left: 16px !important;
        }

        .cur_sess {
          float: left;
          display: flex;
          margin-top: 12px;

          p {
            // height: 30px;
            line-height: 6px;
            font-size: 14px;
            color: #0f100e;
            margin-left: 16px;

            span {
              color: #f9aa21;
            }
          }
        }

        .feed_back {
          float: right;
          display: flex;
          font-size: 14px;
          height: 30px;
          line-height: 6px;
          color: #0f100e;

          .label_title {
            margin-top: 12px;
          }
        }
      }

      .form_taxt {
        width: 90%;
        height: 100%;
        margin: 0 auto;

        .el-form-item__label {
          text-align: left !important;
        }

        .annex_btn_list {
          width: 86%;
          margin: 0 auto;
          margin-top: 16px;
          display: flex;

          div {
            width: 60px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background: #0562c7;
            color: #fff;
            border-radius: 5px;
            margin-left: 16px;
            cursor: pointer;
          }

          div:nth-child(4) {
            width: 120px;
            height: 30px;
            color: #0562c7;
            background: #fff;
            border: 1px solid #0562c7;
          }

          div:nth-child(5) {
            width: 120px;
            height: 30px;
            color: #0562c7;
            background: #fff;
            border: 1px solid #0562c7;
          }
        }
      }

      .editor_box {
        height: 450px;
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

  .select-chang {
    padding: 5px;
    font-size: 18px;
    margin-right: 8px;
    cursor: pointer;
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
  //上传附件
  .tree_w {
    height: 200px;
    padding: 20px;
    overflow: scroll;
    margin: 20px 0 0 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .command_file {
      display: flex;
      justify-content: space-between;
      min-width: 300px;
      font-size: 14px;

      .one_btn {
        width: 80px;
        height: 42px;
        line-height: 42px;
      }

      .btns {
        width: 300px;
        height: 42px;
        line-height: 42px;
        white-space: nowrap;
      }

      .name {
        white-space: nowrap;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        text-overflow: ellipsis;
        width: 200px;
        overflow: hidden;
      }

      .down {
        cursor: pointer;
      }

      .down:hover {
        color: #3b85ef;
      }
    }
  }
</style>
