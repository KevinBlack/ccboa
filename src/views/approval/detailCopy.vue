<template>
  <div class="qcDetail">
    <el-dialog
      title="文号选择"
      :visible.sync="isdialog"
      width="40%"
      height="200px"
      :before-close="handleClose"
    >
      <el-button type="primary" @click="currentCode">当前文号</el-button>

      <div style="margin-top:26px">
        <el-radio-group v-model="deleteapplyCode" v-for="item in delCode" :key="item.index">
          <el-radio :label="item" style="margin-right:16px;">{{item}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="delecurrentCode">确定</el-button>
        <el-button>取消</el-button>
      </span>
    </el-dialog>
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <div class="headerClick">
      <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}
        </el-button>
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">中国建设银行{{titleData.draftDepartment}}审批处理单</div>
    </div>

    <div class="process_content">
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
            <p>
              是否跨行：
              <span>
                <el-radio-group v-model="formData.isKh">
<!--                  <el-radio :label="0">非跨行</el-radio>-->
                  <!--                  <el-radio :label="1">跨行(本级行)</el-radio>-->
                  <!--                  <el-radio :label="2">跨行（下级行上报）</el-radio>-->
                  <el-radio :label="0">非跨行</el-radio>
                  <el-radio :label="1">跨行</el-radio>

                </el-radio-group>
              </span>
            </p>
            <el-button
              type="primary"
              style="float:right;margin-right:50px;height:20px;width:110px;font-size:10px;margin-top:1px;line-height:4px;text-align:center;"
            >查看审批说明
            </el-button>
          </div>
        </div>
        <div id="wjys" class="height_90"></div>
        <h6 class="bank_dispach_file_tit">文件要素</h6>

        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请项目">
                <el-input v-model="formData.applyProjectName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管部门">
                <el-input v-model="formData.mainDepart"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批编号">
                <el-input v-model="formData.approveNo" :disabled="true"></el-input>
                <!--                <el-button type="primary" style="margin-left:20px;" @click="generateNum">生成编号</el-button>-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请日期">
                <el-date-picker v-model="formData.approveTime" type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请部门">
                <el-row>
                  <el-col :span="24">
                    <el-select style="width:100%" v-model="formData.draftDepartment">
                      <el-option v-for="item in 3" :key="item" :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                <el-input v-model="formData.contactName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input v-model="formData.contacTel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="依据">
              <el-button type="primary">引入</el-button>
              <el-button type="primary">删除</el-button>
            </el-form-item>
          </el-row>
          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90"></div>
          <el-form-item label="事由提要">
            <el-input type="textarea" :rows="3" v-model="formData.reason"></el-input>
          </el-form-item>
          <el-form-item label="审批意见">
            <el-input type="textarea" :rows="3" :disabled="true" v-model="formData.examineIdea"></el-input>
          </el-form-item>
          <el-form-item label="申请单位意见">
            <el-input type="textarea" :rows="3" v-model="formData.exaunitIdea"></el-input>
          </el-form-item>
          <el-form-item label="办理情况">
            <el-input type="textarea" :rows="3" v-model="formData.blIdea"></el-input>
          </el-form-item>
          <el-form-item label="传阅意见">
            <el-input type="textarea" :rows="3" :disabled="true" v-model="formData.cyIdea"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" v-model="formData.mark"></el-input>
          </el-form-item>
          <el-row v-show="!fromType">
            <el-col :span="24">
              <el-form-item label="传阅人员" style="margin-top:20px">
                <el-row>
                  <el-col>
                   <el-form-item label="未阅">
                      <el-input v-model="formData.unreadPerson"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                     <el-form-item label="已阅">
                      <el-input v-model="formData.readPerson"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <h6 class="bank_dispach_file_tit">附件</h6>
          <div id="scfj" class="height_90"></div>
          <div class="bottom-span">
            <span>引入附件文件名（包括压缩包的文件名）不能包含以下半角符号：空格/\,:;""?&lt;&gt;|、%.-</span>
          </div>
          <el-row>
            <el-col :span="16">
              <el-form-item label="附件：">
                <el-input type="textarea" :rows="2" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" style="margin-left:20px;">浏览</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-button type="primary" style="margin-left:20px;">引入</el-button>
              <el-button type="primary" style="margin-left:20px;">删除</el-button>
              <el-button type="primary" style="margin-left:20px;">排序</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <flow-chart v-model="showFlowChart" :tableData="flowChartList"></flow-chart>
  </div>
</template>

<script type="text/ecmascript-6">
    import selectPerson from 'components/tree/tree-fawen'
    import flowChart from "components/dialog/flowChart";

    export default {
        name: "qcDetail",
        components: {
            selectPerson,
            flowChart
        },
        data() {
            return {
                titleData: {},
                active: "#wjys",
                scrollIntoViewOptions: {
                    block: "start",
                    behavior: "smooth"
                },
                seletOptionsData: [],
                flowChartList: [],
                showFlowChart: false,
                delCode: [],
                deleteapplyCode: '',
                resData: {},
                isdialog: false,
                listCode: '',
                btnType: '1',
                offenUse: true,
                dialogType: "next",
                checkIds: [], //选中id列表
                checkData: [], //选中数据
                dialogState: false,//显示隐藏
                singelCheckF: false, // 单选true 多选为false
                dialogTypeNow: "next",
                treeData: [{name: "中国建设银行", id: '007'}],
                rowData: {},
                fromType: "",
                checkType: [],
                select: "",
                radio: "",
                rules: {},
                formData: {},
                khType: '',
                buttonList: [
                    // {name:"关闭",type:'guanbi',show: true},
                    "关闭",
                    "保存",
                    "完成并发送",
                    "生成编号",
                    "处理申请",
                    "查看流程",
                    "办结",
                    "传阅",
                    "传阅收回",
                    "收回",
                    "退回上一处理人",
                    "打印处理单",
                    "删除此文",
                    "收藏",
                    "操作指南",
                    "维护",
                    "流程调度",
                ],
                id: ''
            };
        },
        computed: {},
        methods: {
            toTarget(target) {
                const toElement = document.querySelector(target);
                toElement.scrollIntoView(this.scrollIntoViewOptions);
            },
            onScroll() {
                const scrolled = Math.floor(
                    document.body.scrollTop ||
                    document.documentElement.scrollTop ||
                    window.pageXOffset
                );
                if (scrolled < this.distance_wjys) {
                    this.active = "#wjys";
                } else if (scrolled >= this.distance_wjys - 200 && scrolled < this.distance_qpyj) {
                    this.active = "#qpyj";
                } else {
                    this.active = "#scfj";
                }
            },
            buttonClick(params) {
                switch (params) {
                    case '关闭':
                        this.$router.push('/approval/checkLz')
                    case '保存':
                        this.saveData();
                        break
                    case '完成并发送':
                        this.finAndSend()
                        break
                    case "办结":
                        this.finUpData()
                        break
                    case "传阅":
                        this.CyMessage()
                        break
                    case '传阅收回':
                        this.circulRe()
                        break
                    case '查看流程':
                        this.$api.checkLz.flowDeal({workFlowId: this.formData.workFlowId}).then(res => {
                            this.showFlowChart = true;
                            this.flowChartList = res.list
                        })
                        break
                    case '收回':
                        this.lzRegin()
                        break
                    case '退回上一处理人':
                        this.backPrevious()
                        break
                    case '生成编号':
                        this.generateNum()
                        break
                    case '删除此文':
                        this.delete_btn()
                        break
                }
            },
            saveData() {
                if (this.id) {
                    this.formData.id = this.id
                    this.$api.checkLz.checkLzAlter(
                        this.formData
                    ).then(res => {
                        if (res.code == "SUCCESS") {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                    })
                } else {
                    this.formData.currentNode = '起草'
                    this.$api.checkLz.checkLzCreate(
                        this.formData
                    ).then(res => {
                        if (res.code == "SUCCESS") {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        }
                    })
                }
            },
            //删除此文
            delete_btn() {
                this.$api.checkLz.checkLzDelete(
                    {id: this.id}
                ).then(res => {
                    if (res.code == "SUCCESS") {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.$router.go(-1)
                    this.loadData()
                })
            },
            //传阅收回
            circulRe() {
                this.$api.checkLz.CYretrieve(
                    {
                        id: this.id
                    }
                ).then(res => {
                    if (res.code == "SUCCESS") {
                        this.$message({
                            message: '收回成功',
                            type: 'success'
                        });
                    }
                })
            },
            //完成并发送
            finAndSend() {
                this.btnType = '1'
                this.offenUse = true
                this.$api.checkLz.ZFqueryPerTree(
                    {
                        ccbToken: localStorage.getItem('st'),
                        pcsAvyId: this.rowData.pcsAvyId,
                        tplNo: this.rowData.tplNo,
                        multiID: this.rowData.multiID
                    }
                ).then(res => {
                    this.dialogState = true
                    this.seletOptionsData = res.list
                })
            },
            //办结
            finUpData() {
                this.formData.id = this.id
                this.$api.checkLz.checkLzAlter(
                    {
                        ...this.formData,
                        currentNode: '办结',
                        workFlowId: this.rowData.workFlowId,
                        tplNo: this.rowData.tplNo,
                        pcsAvyId: this.rowData.pcsAvyId,
                        avyId: this.rowData.avyId,
                        multiID: this.rowData.multiID
                    }
                ).then(res => {
                    if (res.code == "SUCCESS") {
                        this.$message({
                            message: '办结成功',
                            type: 'success'
                        });
                    }
                })
            },
            //请求详情
            queryDeal() {
                this.$api.checkLz.checkLzDeal(
                    {
                        id: this.id,
                        isKh: this.khType
                    }
                ).then(res => {
                    this.formData = res.data
                    if (this.formData.isKh) {
                        this.formData.isKh = parseInt(this.formData.isKh)
                    }
                })
            },
            //选人成功
            showCompDialog(data, status, type, params, dtype) {
                this.dialogState = false;
                console.log('data', data, 'status', status, 'type', type, 'params', params, 'dtype', dtype);
                if (status) {
                    let chooseDataName = []
                    let chooseDataId = []
                    data && data.map(item => {
                        chooseDataName.push(item.name)
                        chooseDataId.push(item.id)
                    })
                    this.formData.currentNode = params.name
                    this.formData.khType = this.khType
                    this.formData.id = this.id

                    if (this.btnType == "1") {
                        this.formData.currentUser = chooseDataName.join(",")
                        this.formData.currentUserId = chooseDataId.join(",")
                        console.log("完成并发送")
                        this.$api.checkLz.checkLzAlter(
                            {
                                ...this.formData,
                                workFlowId: this.rowData.workFlowId,
                                tplNo: this.rowData.tplNo,
                                pcsAvyId: this.rowData.pcsAvyId,
                                avyId: this.rowData.avyId,
                                nextAvyId: params.id,
                                multiID: this.rowData.multiID
                            }
                        ).then(res => {
                            if (res.code == "SUCCESS") {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            }
                        })
                    } else if (this.btnType == "2") {
                        this.formData.curUserNames = chooseDataName.join(",")
                        this.formData.curUserIds = chooseDataId.join(",")
                        console.log("传阅")
                        this.$api.checkLz.checkCYCreate(
                            this.formData
                        ).then(res => {
                            if (res.code == "SUCCESS") {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            }
                        })
                    } else {
                        return
                    }
                }
            },
            //选择人员树
            selectShareMan() {
                this.dialogState = true
                this.$api.dailyWork.shareUser(
                    {
                        st: localStorage.getItem('st'),
                        unitCode: this.uniCode
                    }
                ).then(res => {

                })
            },
            //传阅人员
            CyMessage() {
                this.btnType = '2'
                this.offenUse = false
                this.dialogState = true
                this.$api.checkLz.CYqueryPerTree(
                    {
                        ccbToken: localStorage.getItem('st'),
                    }
                ).then(res => {

                })
            },
            //生成编号
            generateNum() {
                this.isdialog = true
                this.$api.checkLz.createNum(
                    this.formData
                ).then(res => {
                    this.resData = res
                    this.delCode = res.delList
                    
                })
            },
            //发送编号
            sendNum() {
                this.$api.checkLz.createNumCode(
                    {
                        id: this.formData.id,
                        type: this.formData.type,
                        no: this.formData.no,
                        isKh: this.formData.isKh.toString(),
                        applyNo: this.formData.approveNo,
                        unitHeader: this.resData.unitHeader,
                        applyProjectName: this.formData.applyProjectName,
                        year: this.resData.year
                    }
                ).then(res => {

                })
            },
            //制发收回
            lzRegin() {
                this.$api.checkLz.LZretrieve(
                    {
                        id: this.id,
                        avyId: this.rowData.avyId,
                    }
                ).then(res => {
                    this.$message({
                        type: 'success',
                        message: '收回成功'
                    })
                })
            },
            handleClose() {
                this.isdialog = false
            },
            //退回上一处理人
            backPrevious() {
                this.$api.checkLz.backDealPer(
                    {
                        id: this.id,
                        avyId: this.rowData.avyId,
                        pcsAvyId: this.rowData.pcsAvyId,
                        workFlowId: this.rowData.workFlowId,
                        tplNo: this.rowData.tplNo,
                        multiID: this.rowData.multiID,
                        superId: this.rowData.superId
                    }
                ).then(res => {

                })
            },
            currentCode() {
                this.isdialog = false
                this.listCode = this.resData.projectShortName + this.resData.unitHeader + '【' + this.resData.year + '】' + '第' + this.resData.fileNo + '号'
                this.formData.approveNo = this.listCode
                console.log("当前文号")
                this.formData.type = '1'
                this.formData.no = this.resData.fileNo
                this.sendNum()
            },
            delecurrentCode() {
                this.isdialog = false
                let listCode = this.resData.projectShortName + this.resData.unitHeader + '【' + this.resData.year + '】' + '第' + this.deleteapplyCode + '号'
                this.formData.approveNo = listCode
                this.formData.type = '2'
                this.formData.no = this.deleteapplyCode
                this.sendNum()
            }
        },
        activated() {
        },
        created() {
            if (this.$route.query.type) {
                this.fromType = this.$route.query.type;
                this.rowData = JSON.parse(this.$route.query.data)
                this.id = this.rowData.id
                this.khType = this.rowData.isKh
                this.queryDeal()
            }
            if (this.$route.query.dataForm) {
                this.titleData = this.$route.query.dataForm
                // this.$set(this.formData, 'approveDepart', this.titleData)
                this.formData.draftDepartment = this.titleData.draftDepartment
                this.formData.applyProjectName = this.titleData.applyProjectName
                this.formData.isKh = this.titleData.isKh
                this.titleData.pmOrgan ? this.formData.pmOrgan = this.titleData.pmOrgan : this.formData.pmOrgan = ''
                console.log(this.titleData)
            }
        },
        mounted() {
            // 一次性计算赋值，减少滚动计算节点位置次数
            this.distance_wjys = document.querySelector("#wjys").offsetTop - 60;
            this.distance_qpyj = document.querySelector("#qpyj").offsetTop - 60;
            this.distance_scfj = document.querySelector("#scfj").offsetTop - 60;
            this.$nextTick(() => {
                document.querySelector("#bank_dispach_content").addEventListener("scroll", this.onScroll);
            });
            window.addEventListener("scroll", this.onScroll, true);
        },
    };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .qcDetail {
    // background: white;
    margin: 0 auto;

    .headerClick {
      background: #409eff;
      color: white;
      height: 50px;
      line-height: 50px;

      .right {
        margin-left: 20px;
        float: left;
      }
    }

    .qcHeader {
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
      min-height: 920px;
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
            float: left;

            span {
              color: #f9aa21;
            }
          }
        }
      }

      .bottom-span {
        span {
          display: block;
          margin-left: 10%;
          font-size: 14px;
          color: red;
          line-height: 20px;
        }
      }
    }
  }

  .bank_grid_comtent_active {
    border: 1px solid #fff;
    background: #0563c8;
    color: #fff;
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

  .height_90 {
    height: 200px;
    margin-top: -200px;
  }
</style>
