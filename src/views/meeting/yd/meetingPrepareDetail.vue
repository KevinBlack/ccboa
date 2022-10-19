<!--
 * @Author: your name
 * @Date: 2020-08-01 11:03:25
 * @LastEditTime: 2020-08-01 18:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\blueDetail.vue
-->
/**
* create by zz on 2020/8/1 17:00
* 类注释：
* 备注：会议预订/参数维护/参数配置/新建文档
*/
<template>
  <div class="meetingRoom">
    <div class="headerClick">
      <div class="right">
        <el-button size="small" @click="closeWindow" plain>关闭</el-button>
        <el-button size="small" @click="print" plain>打印</el-button>
      </div>
    </div>
    <div class="meetingRoomHeader">
      <div class="title-text">{{pageTitle}}会议保障需求单</div>
    </div>

    <div class="process_content">
      <el-form :model="formData" label-width="120px" disabled>
        <el-row>
          <el-col :span="16">
            <el-form-item label="会议名称">
              <el-input v-model="formData.meetingName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议类型">
              <el-input v-model="formData.meetType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用日期">
              <el-input v-model="formData.meetUseDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-input v-model="formData.meetStartTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间">
              <el-input v-model="formData.meetEndTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议室名称">
              <el-input v-model="formData.roomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.layoutType=='1'">
            <el-form-item label="座位数">
              <el-input v-model.number="formData.roomSeat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.layoutType=='2'">
            <el-form-item label="主席座位数">
              <el-input v-model.number="formData.hostSeat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="formData.layoutType=='2'">
            <el-form-item label="观众席座位数">
              <el-input v-model.number="formData.rows" style="width:50%;">
                <span slot="append">行</span>
              </el-input>
              <el-input v-model.number="formData.cols" style="width:50%;">
                <span slot="append">列</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="参会人数">
              <el-input v-model="formData.attendNums"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">
            <el-form-item label="保障人数">
              <el-input v-model="formData.guaranteeNums"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="会议室位置">
              <el-input v-model="formData.roomAddres"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主办部门">
              <el-input v-model="formData.hostDepartment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人">
              <el-input v-model="formData.orderUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="formData.orderUserPhon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="可提供服务">
              <el-input v-model="formData.needServices"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="用途">
              <el-input type="textarea" :autosize="{minRows: 2, maxRows: 6}" v-model="formData.useFor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <div v-if="formData.bz && formData.bz.length==1 && formData.bz[0].status==0">
                <el-input
                  type="textarea"
                  resize="none"
                  autosize
                  v-model="formData.meetRemark"
                ></el-input>
              </div>
              <div v-else>
                <opinionText
                  :opinionText="formData.bz"
                  :isRemarks="true"
                  :canDelet="false"
                ></opinionText>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import opinionText from "@/components/opinionText/index";
export default {
  name: "meetingPrepareDetail",
  components: {opinionText},
  data() {
    return {
      pageTitle: "",
      formData: {
        meetingName: "",
        meetUseDate: "",
        meetStartTime: "",
        meetEndTime: "",
        meetType: "",
        roomSeat: "",
        layoutType: "1",
        attendNums: "",
        guaranteeNums: "",
        roomAddres: "",
        hostDepartment: "",
        orderUserName: "",
        orderUserPhon: "",
        needServices: "",
        useFor: "",
        meetRemark: "",
        thyy: [{ status: 0 }], //退回原因列表
        shyj: [{ status: 0 }], //审批意见列表
        bz: [{ status: 0 }], //备注列表
        sqbmyj: [{ status: 0 }] //申请部门意见列表
      }
    };
  },
  computed: {},
  methods: {
    // 打印
    print() {
      const routeData = this.$router.resolve({
        path: "/meeting/yd/meetingRoomPrint",
        query: {
          pageData: JSON.stringify(this.formData)
        }
      });
      window.open(routeData.href, "_blank");
    },
    closeWindow() {
      window.close();
    },
    //初始值
    getFormDataById() {
      this.$post
        .postData(
          "getRoomOrderDetail",
          JSON.stringify({
            function: "getRoomOrderDetail",
            id: this.$route.query.id,
            roomId:this.$route.query.roomId,
          }),
          this.$businessCode.hysyd
        )
        .then(res => {
          if (res.data) {
            let data = JSON.parse(JSON.stringify(res.data));
            this.formData = Object.assign(
              this.formData,
              JSON.parse(JSON.stringify(res.data.po))
            );
            this.formData.shyj = res.data.shyj;
            this.formData.sqbmyj = res.data.sqbmyj;
            this.formData.bz = res.data.bz;
            this.formData.thyy = res.data.thyy;
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    //this.formData = JSON.parse(this.$route.query.routeData);
    this.pageTitle=JSON.parse(localStorage.getItem("userInfo")).unitName;
    this.getFormDataById();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.meetingRoom {
  background-color: rgb(240, 245, 250);
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

  .meetingRoomHeader {
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
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
    .d_flex {
      display: flex;
      padding-bottom: 20px;
      .d_b100 {
        width: 100%;
      }
      .d_f1 {
        flex: 1;
      }
      .adviceInfo {
        position: absolute;
        width: 100%;
        right: 20px;
        bottom: 0;
        text-align: right;
        color: #606266;
      }
    }
  }
}
.row {
  height: 100%;
}
.treebox {
  height: 50vh;
  border: 1px solid #aaa;
}
.contentbox {
  height: 50vh;
  // border: 1px solid #aaa;
}
</style>
<style>
.meetingRoom .el-select {
  display: block;
}
.meetingRoom .file_wp {
  margin-left: 0 !important;
}
</style>
