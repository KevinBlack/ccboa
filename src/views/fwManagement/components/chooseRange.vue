<template>
  <div class="treeWrap">
    <el-dialog
      v-dialogDrag
      :title="subdialogTit"
      :visible.sync="subdialogVisible"
      @close="cancelSetDialog"
      append-to-body
    >
      <el-row>
        <el-col :span="12">
          <!-- <div class="title">选择部门</div> -->
          <div class="title"></div>
          <div class="choose_warp">
            <ul class="choose_left">
              <li
                v-for="(item,index) in leftData"
                :key="index"
                :class="activeIndex == index?'activeClass':''"
                :title="item.zuqunName"
                @click="tabChange(index)"
              >{{item.zuqunName}}</li>
            </ul>
            <el-divider direction="vertical"></el-divider>
            <div class="choose_right">
              <div v-for="(item,index) in leftData" :key="index">
                <div v-show="index == activeIndex" class="show_check">
                  <el-checkbox
                    :indeterminate="item.isIndeterminate"
                    v-model="item.checkAll"
                    @change="handleCheckAllChange($event,item)"
                  >全选</el-checkbox>
                  <el-checkbox-group
                    v-model="zNowCheckIds"
                    @change="handleCheckedCitiesChange(zNowCheckIds,index)"
                  >
                    <el-checkbox
                      v-for="checkItem in item.peizhiPeople"
                      :key="checkItem.id"
                      :label="checkItem.id"
                      :disabled="checkItem.disabled"
                    >{{checkItem.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>已选项</span>
            <el-button
              type="primary"
              @click.native="resetCheck"
              style="float:right"
              size="mini"
              :disabled="zNowCheckList.length==0"
              round
            >清空</el-button>
          </div>
          <div class="box_shadow comp_wrap">
            <div v-for="(item,index) in zNowCheckList" :key="index" class="comp_list">
              <el-row>
                <el-col :span="12" :title="item.name">{{item.name}}</el-col>
                <el-col :span="12" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="upRow(index)"
                    :disabled="index==0"
                    round
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="downRow(index)"
                    :disabled="index==zNowCheckList.length-1"
                    round
                  >下移</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    :disabled="item.disabled"
                    @click.native="deleteRow(item,index)"
                    round
                  >删除</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSetDialog">取 消</el-button>
        <el-button type="primary" @click="saveSetDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["subdialogTit", "chooseRangeData", "nowCheckList", "nowCheckIds"],
  data() {
    return {
      bank_redheader: {
        function: "selectUserByUnitTree",
        unitId: 1
      },
      zNowCheckList: this.nowCheckList,
      zNowCheckIds: this.nowCheckIds,
      newChooseRangeData: [],
      subdialogVisible: true,
      allData: [],
      leftData: [],
      rightData: [],
      checkList: [],
      checkAll: false,
      // checkedCities: [],
      lableCheck: [],
      // isIndeterminate: true,
      activeIndex: 0
    };
  },
  mounted() {
    this.getCompData();
    for (let key in this.allData) {
      this.$set(this.checkList, key, []);
    }
    console.log(this.checkList);
  },
  methods: {
    upRow(n) {
      let midObj;
      // this.zNowCheckList.push(
      //   {
      //     id: this.fromData.muBanVo.attachments[n - 1].id,
      //     sort: this.fromData.muBanVo.attachments[n].sort
      //   },
      //   {
      //     id: this.fromData.muBanVo.attachments[n].id,
      //     sort: this.fromData.muBanVo.attachments[n - 1].sort
      //   }
      // );
      midObj = this.zNowCheckList[n];
      this.zNowCheckList[n] = this.zNowCheckList[
        n - 1
      ];
      this.zNowCheckList[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      // this.zNowCheckList.push(
      //   {
      //     id: this.fromData.muBanVo.attachments[n + 1].id,
      //     sort: this.fromData.muBanVo.attachments[n].sort
      //   },
      //   {
      //     id: this.fromData.muBanVo.attachments[n].id,
      //     sort: this.fromData.muBanVo.attachments[n + 1].sort
      //   }
      // );
      midObj = this.zNowCheckList[n];
      this.zNowCheckList[n] = this.zNowCheckList[
        n + 1
      ];
      this.zNowCheckList[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(item) {
      let checkLen;

      this.zNowCheckList.forEach(value => {
        if (item.id == value.id) {
          let index = this.zNowCheckList.indexOf(value);
          this.zNowCheckList.splice(index, 1);
          checkLen = this.zNowCheckList.length;
        }
      });
      this.zNowCheckIds.forEach(value => {
        if (item.id == value) {
          let index = this.zNowCheckIds.indexOf(value);
          this.zNowCheckIds.splice(index, 1);
        }
      });
      this.leftData.forEach((v, i) => {
        this.leftData[this.leftData.indexOf(v)].checkAll = false;
        this.leftData[this.leftData.indexOf(v)].isIndeterminate =
          checkLen > 0 ? true : false;
      });
      this.handleCheckedCitiesChange(this.zNowCheckIds)
    },
    cancelSetDialog() {
      // this.$emit("subshowCompDialog",this.nowCheckList);
      this.$emit("subshowCompDialog", null, false);
      // this.resetCheck();
    },
    saveSetDialog() {
      // let nowCheckList = JSON.stringify(this.nowCheckList)
      this.$emit("subshowCompDialog", this.zNowCheckList, true);
      this.resetCheck();
    },
    getCompData() {
      // 请求数据
      let newData = this.chooseRangeData.map(item => {
        return Object.assign(
          item,
          { isIndeterminate: false },
          { checkedCities: [] },
          { checkAll: false }
        );
      });

      newData.forEach(item => {
        item.peizhiPeople = JSON.parse(item.peizhiPeople);
        item.peizhiPeople.map((n, i) => {
          this.zNowCheckList.map(m => {
            if (m.disabled && n.id == m.id) {
              item.peizhiPeople[i].disabled = true;
            }
          });
        });
      });
      console.log(newData);
      this.leftData = newData;
      //  console.log(Object.prototype.toString.call(this.leftData) == '[object Array]')
      this.tabChange(0);
      // this.nowCheckList = this.subtreeData||[];
    },
    tabChange(index) {
      this.activeIndex = index;
    },
    handleCheckAllChange(val, item) {
      item.checkedCities = val ? item.peizhiPeople : [];
      item.isIndeterminate = false;
      let nowCheckedArr = [];
      this.zNowCheckIds = [];
      this.leftData.forEach(item => {
        //  console.log(item.checkedCities)
        nowCheckedArr = nowCheckedArr.concat(item.checkedCities);
        item.checkedCities.forEach(node => {
          if (val) {
            this.zNowCheckIds.push(node.id);
          }
        });
      });
      this.zNowCheckList = nowCheckedArr;
    },
    handleCheckedCitiesChange(value, n) {
      let that = this;
      // let nowCheckedArr = [];
      // this.leftData.forEach(item => {
      //   //  console.log(item.checkedCities)
      //   nowCheckedArr = nowCheckedArr.concat(item.checkedCities);
      // });
      // this.nowCheckList = nowCheckedArr;
      // let checkedCount = item.checkedCities.length;
      // // console.log(item.peizhiPeople.length)
      // // console.log(checkedCount)
      // item.checkAll = checkedCount === item.peizhiPeople.length;
      // item.isIndeterminate = checkedCount > 0 && checkedCount < item.peizhiPeople.length;
      /******/
      let checkedCount = 0;
      let newCheckLists = [];
      value.forEach(item => {
        that.chooseRangeData[n].peizhiPeople.forEach(node => {
          if (item === node.id) {
            newCheckLists.push({ id: node.id, name: node.name });
            checkedCount++;
          }
        });
      });
      //清除当前tab 已勾选项
      that.zNowCheckList = that.zNowCheckList.filter(item => {
        let hasF = true;
        that.chooseRangeData[n].peizhiPeople.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      //过滤右侧已勾选项
      newCheckLists = newCheckLists.filter(item => {
        let hasF = true;
        that.zNowCheckList.forEach(node => {
          if (node.id === item.id) {
            hasF = false;
          }
        });
        return hasF;
      });
      that.chooseRangeData[n].isIndeterminate =
        checkedCount === that.chooseRangeData[n].peizhiPeople.length; //全选设置
      //对当前tab 勾选项进行合并
      // 原
      // value.length > 0
      //   ? (that.zNowCheckList = [].concat(that.zNowCheckList, newCheckLists))
      //   : that.zNowCheckList.filter(item => item.id != value.id)
      if (value.length > 0) {
        let hash = {};
        that.zNowCheckList = newCheckLists.reduce((item, next) => {
          hash[next.id] ? "" : hash[next.id] = true && item.push(next);
          return item
        }, [])
      } else {
        that.zNowCheckList = [].concat(that.zNowCheckList, newCheckLists)
      }
    },
    resetCheck() {
      let remainIds = [];
      this.leftData.forEach(item => {
        item.checkedCities = [];
        this.zNowCheckList = this.zNowCheckList.filter(n => {
          if (n.disabled) {
            remainIds.push(n.id);
          }
          return n.disabled;
        });
        item.checkAll = false;
        item.isIndeterminate = false;
        this.zNowCheckIds = [].concat(remainIds);
      });
    }
  }
  // watch: {
  //   subdialogState(newv, oldv) {
  //     if (newv) {
  //       this.getCompData();
  //     }
  //     this.subdialogVisible = newv;
  //   }
  // }
};
</script>
<style  lang="less" scoped>
.treeWrap .el-col-12 {
  padding-right: 20px;
}
.box_shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 10px;
  overflow: hidden;
  height: 28px;
}
.comp_wrap {
  height: 500px;
  padding: 14px;
  overflow-y: scroll;
  .comp_list {
    height: 42px;
    line-height: 42px;
  }
}
.pad_20 {
  padding: 20px;
}
// .activeClass{

// }
.choose_warp {
  width: 100%;
  height: 500px;
  border: 1px solid #d3d3d3;
  position: relative;
  .choose_left {
    width: 30%;
    height: 100%;
    overflow: auto;
    float: left;
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      font-size: 16px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .el-divider--vertical {
    height: 100%;
  }
  .choose_right {
    width: 67%;
    float: right;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    overflow-y: scroll;
    .show_check {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
.span-ellipsis {
  width: calc(100% - 58px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}

/deep/ .el-tabs__nav-scroll {
  height: 500px;
  overflow-y: scroll;
}
/deep/ .el-tabs--left .el-tabs__nav-wrap.is-left {
  padding-top: 2px;
}
/deep/ .el-checkbox-group .el-checkbox {
  margin-bottom: 20px;
  display: block;
}
</style>