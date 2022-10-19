/**
* create by zx on 2020/7/23 09:38
* 类注释：
* 备注：
*/
<template>
  <div class="topTheform">
    <div class="common-header">
      <div class="headerClick">
        <el-button @click="closeData('关闭')" class="bank_grid_comtent_active">关闭</el-button>
        <el-button @click="closeData('保存')" class="bank_grid_comtent_active">保存</el-button>
        <el-button @click="closeData('删除')" v-if="delFlag" class="bank_grid_comtent_active">删除</el-button>
        <el-button
          @click="closeData('加至领导资料库')"
          v-if="!isNeedButton"
          class="bank_grid_comtent_active"
        >加至领导资料库</el-button>
        <el-button
          v-if="isNeedButton"
          @click="closeData('查看领导资料库')"
          class="bank_grid_comtent_active"
        >查看领导资料库</el-button>
        <el-button @click="closeData('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button>
        <el-button @click="closeData('操作指南')" class="bank_grid_comtent_active">操作指南</el-button>

        <!-- <el-button @click="closeData('加入值班动态')" class="bank_grid_comtent_active">加入值班动态</el-button> -->
      </div>
    </div>
    <div class="formHeader">
      <div class="shiwuTitle">{{unitName}}高管成员活动安排</div>
      <div class="content">
        <el-row style="margin-bpttom:20px;">
          <el-col :offset="20">
            <el-radio-group v-model="form.isShareFlag">
              <el-radio label="1">共享</el-radio>
              <el-radio label="0">不共享</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          style="margin-top:20px;"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="活动名称" prop="title">
                <el-input
                  v-model="form.title"
                  ref="input"
                  v-if="ishow"
                  @keyup.enter.native="changeInput"
                ></el-input>

                <el-select
                  ref="select"
                  v-if="!ishow"
                  @change="change"
                  @visible-change="visibleChange"
                  v-model.trim="form.title"
                  filterable
                  allow-create
                  default-first-options
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in mobanList"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开始日期" prop="startDate">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间" prop="startTime">
                <el-time-select
                  v-model="form.startTime"
                  :picker-options="{start: '07:00',step: '01:00',end: '18:00'}"
                ></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间" prop="endTime">
                <el-time-select
                  v-model="form.endTime"
                  :picker-options="{start: '07:00',step: '01:00',end: '18:00'}"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="同时添加至">
                <el-date-picker
                  v-model="form.newDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="活动类型" prop="activeType">
                <el-select v-model="form.activeType" placeholder="请选择活动类型">
                  <el-option
                    v-for="(item,index) in ActivityTypes"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行领导" prop="leaderCheckedValue">
                <el-select v-model="form.leaderCheckedValue"  multiple placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.leaderHumanId"
                    :label="item.leaderCnName"
                    :value="item.leaderHumanId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="8">
              <el-form-item label="参会行领导">
                <el-select v-model="form.attendBankLeader" multiple placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.leaderHumanId"
                    :label="item.leaderCnName"
                    :value="item.leaderHumanId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="活动地点" prop="activeAddress">
                <el-input v-model="form.activeAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="活动内容" prop="draftDate">
                <el-input type="textarea" v-model="form.activeContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="form.remark"
                  :rows="5"
                  resize="none"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "topTheform",
  components: {},
  props: {},
  mixins: [viewDraft],
  data() {
    return {
      leaderCheckedValue: [], // 行领导默认
      unitName: JSON.parse(localStorage.getItem("userInfo")).unitName,
      leaderActiveDataId: "",
      sendId: "", //表单id
      delFlag: false,
      // data: [],
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        activeType: [{ required: true, message: "活动类型", trigger: "blur" }],
        startDate: [{ required: true, message: "开始日期", trigger: "blur" }],
        startTime: [{ required: true, message: "开始时间", trigger: "blur" }],
        endTime: [{ required: true, message: "结束时间", trigger: "blur" }],
        leaderCheckedValue: [
          { required: true, message: "行领导", trigger: "blur" }
        ],
        activeAddress: [
          { required: true, message: "活动地点", trigger: "blur" }
        ]
      },
      ishow: true,
      mobanList: [], //shuju
      mobanAry: [],
      LookId: "",
      options: [],
      options1: [],
      form: {
        isShareFlag: "1", //是否共享
        title: "", //活动名称
        startDate: "", //开始日期
        startTime: "", //开始时间
        endTime: "", //结束时间
        newDate: "", //添加至时间
        activeAddress: "", //活动地址
        activeType: "", //活动类型
        activeContent: "", //活动内容
        remark: "", //备注
        // attendBankLeader: "", //名称
        leaderCheckedValue: "" //行领导id
      },
      ActivityTypes: []
    };
  },
  computed: {
    isNeedButton() {
      return this.leaderActiveDataId ? true : false;
    }
  },
  methods: {
    // 获取行领导
    loadData() {
      const query = this.$route.query;
      this.$api.secreatary.activety.topFormbank({}).then(res => {
        console.log(res, "行领导");
        this.options1 = res.data.data;

        this.options = res.data.data2;

        const userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) || {};

        // 查询需要的默认领导
        let leaderCheckedValue = [];
        if (Array.isArray(this.options)) {
          const leadershipInquire = this.options.filter(item => item.leaderHumanId === userInfo.humanCode)
          const secretaryInquire  = this.options.filter(item => {
            if (!item.secHumanId) return false;
            const secHumanIdArr = item.secHumanId.split('#').filter(item => item);
            return secHumanIdArr.includes(userInfo.humanCode)
          })

          // 判断领导是不是空的，如果领导是空的那就用秘书查出来的
          if ((leadershipInquire && leadershipInquire.length > 0) || (secretaryInquire && secretaryInquire.length > 0)) {
            leaderCheckedValue = (leadershipInquire.length > 0 ? leadershipInquire : secretaryInquire).map(item => item.leaderHumanId)
          }

          console.log('leaderCheckedValue', leaderCheckedValue)
        }

        // 保留默认数据 用来做对比用
        this.leaderCheckedValue = leaderCheckedValue;

        // 在起草阶段，并且查询到数据的时候赋值
        if (query.stausType == '0' && leaderCheckedValue.length > 0) {
          this.$set(this.form, 'leaderCheckedValue', leaderCheckedValue)
        }
      });
    },

    // 行领导选中值发生变化时
    leaderCheckedValueChange (tag) {
      console.log('行领导选中值发生变化时', tag)
      if (Array.isArray(this.leaderCheckedValue) && this.leaderCheckedValue.length > 0) {
        this.leaderCheckedValue.forEach((item, index) => {
          if (!(this.form.leaderCheckedValue.includes(item))) {
            this.form.leaderCheckedValue.splice(index, 0, item)
          }
        })
      }
    },

    // 行领导移除的 值，
    leaderCheckedValueRemoveTag (tag) {
      const bool = this.leaderCheckedValue.includes(tag);
      if (bool) {
        const index = this.leaderCheckedValue.findIndex(item => item == tag);
        if (!(this.form.leaderCheckedValue.includes(tag))) {
          this.form.leaderCheckedValue.splice(index, 0, tag)
        }
      }
    },

    // 标题 输入框
    changeInput(v) {
      if (v.keyCode == 13 && (this.mobanList && this.mobanList.length > 0)) {
        this.ishow = false;
        this.$nextTick(() => {
          this.$refs.select.focus();
        });
      }
    },
    visibleChange (bool) {
      if (!bool) {
        this.ishow = true;
      }
    },
    change(v) {
      console.log(v);
      // console.log(JSON.parse(this.mobanAry));
      for (let k = 0; k < JSON.parse(this.mobanAry).length; k++) {
        console.log(JSON.parse(this.mobanAry)[k]);
        if (JSON.parse(this.mobanAry)[k].search(v) != -1) {
          // console.log( JSON.parse(this.mobanAry)[k], "this.mobanAry[k]");
          var indx = JSON.parse(this.mobanAry)[k].substring(
            JSON.parse(this.mobanAry)[k].indexOf("**#") + 3,
            JSON.parse(this.mobanAry)[k].length
          );
        }
      }
      console.log(indx);

      console.log(this.mobanLiss[indx], "this.mobanLiss[indx]");

      this.form = { ...this.mobanLiss[indx] };
      // 获取行领导的id 进而获取行领导的名字 赋值给表单 {已完成}
      // 保存的时候  根据msg 判断 coverFlag  是否覆盖  是1 其他情况都是 0   {待开发}
      let iD = '';
      if (Array.isArray(this.mobanLiss[indx].leaderCheckedValue)) {
        iD = this.mobanLiss[indx].leaderCheckedValue.join("").trim()
      } else {
        iD = this.mobanLiss[indx].leaderCheckedValue.split("#").join("").trim()
      }
      console.log(iD, "iD");

      this.options.forEach(item => {
        if (this.mobanLiss[indx].leaderCheckedValue.indexOf(item.leaderHumanId) > 0)
          this.$nextTick(() => {
            if (Array.isArray(this.form.leaderCheckedValue)) {
              !this.form.leaderCheckedValue.includes(item.leaderHumanId) && this.form.leaderCheckedValue.push(item.leaderHumanId);
            } else {
              this.form.leaderCheckedValue = [item.leaderHumanId];
            }
            console.log(this.form.leaderCheckedValue, this.form);
          });
      });
      this.$set(this.form, "isShareFlag", "1");
      this.ishow = true
    },
    // 获取当前时间
    getTime() {
      var date = new Date();
      var sperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 1 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      return year + sperator1 + month + sperator1 + strDate;
    },
    moban() {
      this.$api.secreatary.activety
        .mobanList({ startDate: this.form.startDate })
        .then(res => {
          this.mobanAry = JSON.stringify(res.data.resultString);
          console.log(res.data.resultString, "this.mobanAry");

          this.mobanList = res.data.resultString;
          for (let i = 0; i < this.mobanList.length; i++) {
            this.mobanList[i] = this.mobanList[i].split("**#")[0];
          }
          console.log(this.mobanList);

          this.mobanLiss = res.data.result;
          console.log(this.mobanLiss, "this.mobanLiss");
        });
    },
    closeData(i) {
      switch (i) {
        case "打印处理单":
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/Printtheform",
            query: { id: this.form.id }
          });
          break;
        case "操作指南":
          this.caozuozhinan();
          break;
        case "删除":
          this.$api.secreatary.activety
            .deldata({ id: this.form.id })
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "删除成功"
                });
                this.$intent.closeWindow(this);
              }
            });
          break;
        case "关闭":
          this.$confirm("是否保存并退出当前页面?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            distinguishCancelAndClose: true,
            type: "warning",
            callback: action => {
              if (action === "confirm") {
                //点是
                if (!this.form.leaderCheckedValue.length) {
                  this.form.leaderCheckedValue = "";
                }
                this.form.leaderCheckedValue = this.form.leaderCheckedValue.toString();
                // this.form.attendBankLeader = this.form.attendBankLeader.toString(); //行领导专属组回显
                this.$api.secreatary.activety
                  .gaoguanSave(this.form)
                  .then(res => {
                    if (res.code === "SUCCESS") {
                      this.$message({
                        message: "保存成功",
                        type: "success"
                      });
                      this.form.leaderCheckedValue =
                        this.form.leaderCheckedValue &&
                        this.form.leaderCheckedValue.split(",");
                      this.form.id = res.data.data[0].id;
                    }
                  });
                this.$intent.closeWindow(this);
              } else if (action === "cancel") {
                //点否
                this.$intent.closeWindow(this);
              } else if (action === "close") {
                //点右上角的x
              }
            }
          });
          // this.$confirm("是否保存并退出当前页面?", "提示", {
          //   confirmButtonText: "是",
          //   cancelButtonText: "否",
          //   distinguishCancelAndClose: true,
          //   type: "warning",
          //   callback: action => {
          //     if (action === "confirm") {
          //       //点是
          //       this.Savedata();
          //       this.$intent.closeWindow(this);
          //     } else if (action === "cancel") {
          //       //点否
          //       this.$intent.closeWindow(this);
          //     } else if (action === "close") {
          //       //点右上角的x
          //     }
          //   }
          // });

          break;
        case "保存":
          this.Savedata();
          break;
        case "加至领导资料库":
          if (!this.form.id)
            return this.$message({
              message: "请先保存数据",
              type: "warning"
            });
          let that = this;
          let parsm = {
            leaderActiveId: this.$route.query.id
              ? this.$route.query.id
              : this.form.id, //表单id
            id: this.form.leaderActiveDataId
              ? this.form.leaderActiveDataId
              : "", //加至id
            title: this.form.title, //活动名称
            activeDate: this.form.startDate, //日期
            activeTime: this.form.startTime, //时间
            activeAddress: this.form.activeAddress, //地点
            activeType: this.form.activeType, //活动类型
            activeContent: this.form.activeContent, //活动描述
            // attendMemCn: this.form.attendBankLeader, //主持行领导
            attendMemCnId: this.form.leaderCheckedValue.toString() //主持行领导id
          };
          this.$api.secreatary.activety.gaoguanAdd(parsm).then(res => {
            console.log(res.code, "加至领导资料库");
            if (res.code === "SUCCESS") {
              this.$message({
                showClose: true,
                type: "success",
                message: "加至领导资料库成功"
              });
              this.LookId = res.data.data.id;
              this.leaderActiveDataId = res.data.data.id;
            }
          });
          break;
        case "查看领导资料库":
          if (this.LookId) {
            this.$intent.goNewPage(this, {
              path: "/secretary/datumManage/activityManage",
              query: { data: this.LookId, type: "datumManage_index" }
            });
          }
          break;
      }
    },
    Savedata() {
      this.$refs["form"].validate((valid, object) => {
        // if (valid) {
        //   if (!this.form.leaderCheckedValue.length) {
        //     this.form.leaderCheckedValue = "";
        //   }
        //   this.form.leaderCheckedValue = this.form.leaderCheckedValue.toString();
        //   this.$api.secreatary.activety.gaoguanSave(this.form).then(res => {
        //     if (res.code === "SUCCESS") {
        //       this.$message({
        //         message: "保存成功",
        //         type: "success"
        //       });
        //       this.form.leaderCheckedValue =
        //         this.form.leaderCheckedValue &&
        //         this.form.leaderCheckedValue.split(",");
        //       this.form.id = res.data.data[0].id;
        //       this.details(this.form.id);
        //       this.$intent.replace(this, {
        //         path: "/secretary/leaderActivity/topTheform",
        //         query: { id: res.data.data[0].id }
        //       });
        //     }
        //   });
        if (valid) {
          if (!this.form.leaderCheckedValue.length) {
            this.form.leaderCheckedValue = "";
          }
          this.form.leaderCheckedValue = this.form.leaderCheckedValue.toString();
          this.$api.secreatary.activety.gaoguanSave(this.form).then(res => {
            if (res.msg == "是否覆盖") {
              this.$confirm("是否覆盖?", "提示", {
                confirmButtonText: "是",
                cancelButtonText: "否",
                distinguishCancelAndClose: true,
                type: "warning",
                callback: action => {
                  if (action === "confirm") {
                    //点是
                    this.form.coverFlag = 1;
                    this.$api.secreatary.activety
                      .gaoguanSave(this.form)
                      .then(res => {
                        this.$message({
                          message: res.msg,
                          type: "success"
                        });
                        this.form.id = res.data.data[0].id;
                        console.log(this.form.id);
                        this.form.leaderCheckedValue =
                          this.form.leaderCheckedValue &&
                          this.form.leaderCheckedValue.split(",");
                        this.$intent.replace(this, {
                          path: "/secretary/leaderActivity/topTheform",
                          query: { id: res.data.data[0].id }
                        });
                      });
                  } else if (action === "cancel") {
                    //点否
                    // this.$intent.closeWindow(this);
                  } else if (action === "close") {
                    //点右上角的x
                  }
                }
              });
            } else {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              // this.$api.secreatary.activety
              //   .gaoguanSave(this.form)
              //   .then(res => {
              this.form.leaderCheckedValue =
                this.form.leaderCheckedValue &&
                this.form.leaderCheckedValue.split(",");
              this.form.id = res.data.data[0].id;
              this.details(res.data.data[0].id);
              // this.$intent.replace(this, {
              //   path: "/secretary/leaderActivity/topTheform",
              //   query: { id: res.data.data[0].id }
              // });
              // });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请输入必填项后保存！"
          });
          //滚动到必填项
          for (let i in object) {
            let dom = this.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            break;
          }
        }
      });
    },
    details(id) {
      this.$api.secreatary.activety.gaoguanxq({ id: id }).then(res => {
        console.log(res, "详情");
        this.form = res.data.data;
        this.delFlag = res.data.flag;
        console.log(this.form, "sss");
        this.form.leaderCheckedValue = this.form.leaderCheckedValue.split(","); //行领导专属组回显
        // this.form.attendBankLeader = this.form.attendBankLeader.split(","); //行领导专属组回显
        this.LookId = res.data.data.id;
        this.leaderActiveDataId = res.data.data.leaderActiveDataId;
      });
    },
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "YZGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.sendId || this.$route.query.id, //表单id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    }
  },
  activated() {},
  mounted() {},
  watch: {
    "form.startTime": function(newArr, oldVal) {
      console.log("watch->form.startTime:", newArr, oldVal);
      if (this.form.endTime) {
        if (newArr > this.form.endTime) {
          this.$message({
            type: "error",
            message: "开始时间不能大于结束时间"
          });
        }
      }
    },
    "form.endTime": function(newA, oldV) {
      console.log("watch->form.endTime:", newA, oldV);
      if (this.form.startTime) {
        if (newA < this.form.startTime) {
          this.$message({
            type: "error",
            message: "结束时间不能小于开始时间"
          });
        }
      }
    }
  },
  created() {
    // 行领导数据
    this.loadData();
    //活动类型
    this.$api.secreatary.activety.ActivityType({}).then(res => {
      console.log(res, "活动类型");
      this.ActivityTypes = res.data;
    });
    this.$set(this.form, "startDate", this.getTime()); // 时间自动获取
    this.moban();
    // this.form.one = ['13000011252']
    //判断是否查看表单详情
    if (this.$route.query.id) {
      let id = this.$route.query.id;
      this.details(id);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.topTheform {
  .el-form {
    border: 1px solid #dcdfe6;
    width: 90%;
    padding: 2% 2%;
    margin: auto;
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

  .message {
    margin: 10px 10%;

    .tables {
      margin-top: 20px;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
      border-left: 1px solid #eee;

      .line {
        display: flex;
        border-top: 1px solid #eee;
        line-height: 40px;

        .left {
          width: 150px;
          text-align: center;
          border-right: 1px solid #eee;
        }

        .right {
          margin-left: 20px;
          flex: 1;
        }
      }

      .line-item {
        line-height: 25px;
        font-size: 13px;
      }
    }
  }
}
</style>
