<template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="right">
        <el-button type="primary" plain size="mini" @click="close">关闭</el-button>
        <el-button type="primary" plain size="mini">保存并关闭</el-button>
        <el-button type="primary" plain size="mini">保存</el-button>
        <el-button type="primary" plain size="mini">生成编号</el-button>
        <el-button type="primary" plain size="mini" @click="tiaozhuan">跳转到缺少页面</el-button>

      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">《每日动态》（副刊）采编</div>
      <div class="small-title">
        <p>第期</p>
        <p>总第期</p>
      </div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>测试总收文</span>
          </p>
          <p>
            当前处理人：
            <span>测试总收文</span>
          </p>
          <div style="float:right">

            <p>
              编辑时间：
            </p>
            <el-date-picker style="height: 35px;top: -3px;margin-left: -15px;" value-format="yyyy-MM-d" v-model="formData.tougaoTime" type="date"></el-date-picker>
          </div>
        </div>

      </div>
      <div class="bank_dispach_content" id="bank_dispach_content">
        <div class="editShow" v-show="editShow">
          <el-form>
            <el-col style="padding:16px;margin-left:10px">
              <el-row :span="18">
                <el-form-item label="时间段">
                  <el-date-picker v-model="formData.dataDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" style="width:70%" start-placeholder="开始日期" end-placeholder="结束日期" />
                  <el-button type="primary" style="margin-left:10px">选择日期</el-button>
                  <el-button type="primary" style="margin-left:20px">稿件刷新</el-button>
                </el-form-item>
              </el-row>
            </el-col>
          </el-form>
          <m-table @refresh="loadData()" @cellClick="cellClick" @select="select" :searchData="searchData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
          <el-form :rules="rules" :model="formData" label-width="120px">
            <el-row>
              <el-col :span="4">
                <el-form-item>
                  <el-button type="primary">并稿</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button type="primary">采用</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button type="primary">联系供稿人</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-form :rules="rules" :model="formData" label-width="120px" style="background-color:#fafafa;padding-top:20px">
          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary">选择栏目</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary">查看并稿</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary">载入稿件</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="caretBottom" icon="el-icon-caret-bottom"></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="editShow = !editShow" icon="el-icon-caret-top"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <p>审核意见</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
export default {
  name: 'index',
  components: {
    mTable,
  },

  data() {
    return {
      editShow: false,
      rules: {},
      input: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      // elForm:{},
      value: '',
      searchData: {},
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 20, //每页条数
      },
      formData: {
        khType: '',
      },
      tableData: [
        {
          title: '1',
          applyTime: '9',
          applyTime1: '9',
          applyTime2: '9',
          applyNo: '9',
          title2: '9',
        },
      ],
      tableCols: [
        { label: '标题', prop: 'title' },
        { label: '评审意见', prop: 'applyTime' },
        { label: '租刊意见', prop: 'applyTime1' },
        { label: '最新审评人', prop: 'applyTime2' },
        { label: '投稿单位', prop: 'applyNo' },
        { label: '更新时间', prop: 'title2' },
      ],
    }
  },
  computed: {},
  methods: {
    tiaozhuan() {
      this.$router.push({
        path: '/publication/editJournal/editRentFirst',
      })
    },
    close() {
      this.$router.back()
    },
    caretBottom() {
      try {
        var obj = document.all.tdDocList
        showhide(obj)
        if (objButton) {
          if (obj.style.display == '') {
            objButton.value = ' \u25B2 '
          } else {
            objButton.value = ' \u25B3 '
          }
        }
        if (document.all.divDocList.innerText == '') {
          getDocList()
        }
      } catch (e) {
        // AlertError('\u201Cbtn_ShowHideDocList(objButton)\u201D\u51FD\u6570\u51FA\u9519\uFF1A', e)
      }
    },
    cellClick(row) {
      // console.log(row)
      // let rowdata=JSON.stringify(row)
      this.$intent.goNewPage(this, { name: 'editRentDetial', query: {} })
    },
    select() {},
  },
  activated() {},
  created() {},
  mounted() {},
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.process_content /deep/ .el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
  border: 0px;
}
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  padding: 50px 0px;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-right: 130px;
      float: right;
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
    .small-title {
      text-align: center;
      line-height: 1.5;
      font-weight: 600;
    }
  }
  .process_content {
    width: 80%;
    min-height: 460px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .cur_box {
      width: 100%;
      // margin-left: 5%;
      height: 35px;
      margin-bottom: 20px;
      line-height: 35px;
      border: 1px solid #f60;
      background: #fef7e7;

      .cur_sess {
        width: 100%;
        padding-right: 40px;
        p {
          padding-right: 20px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 20px;
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
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 16px;
}
</style>
