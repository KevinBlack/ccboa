/**
* create by zx on 2020-6-29 11:34
* 类注释：空布局
* 备注：
*/
<template>
  <div class="addToRight">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
    >
      <el-form v-if="isShowCondition">
        <el-form-item :label="conditionInfo.label">
          <el-select v-model="conditionInfo.value">
            <el-option
              v-for="item in conditionInfo.options"
              :key="item.nameWord"
              :label="item.nameWord"
              :value="item.nameWord"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-row>
        <el-col :span="10">
          <div class="left-right el-transfer-panel" style="float: right">
            <p class="el-transfer-panel__header" @click.prevent="allSelLeft()">
              <label
                class="el-checkbox"
                :class="{ 'is-checked': isLeftAllChecked }"
              >
                <span
                  class="el-checkbox__input"
                  :class="{
                    'is-checked': isLeftAllChecked,
                    'is-indeterminate': isLeftIndeterminate,
                  }"
                >
                  <span class="el-checkbox__inner"></span>
                  <input
                    type="checkbox"
                    aria-hidden="false"
                    class="el-checkbox__original"
                    value
                  />
                </span>
                <span class="el-checkbox__label">待选</span>
              </label>
            </p>
            <div class="el-transfer-panel__body">
              <div
                role="group"
                aria-label="checkbox-group"
                class="el-checkbox-group el-transfer-panel__list"
              >
                <label
                  class="el-checkbox el-transfer-panel__item"
                  v-for="(item, index) in leftData"
                  :key="index"
                  :class="{ 'is-checked': isLeftCheckedObj[index] }"
                  @click.prevent="leftClick(item, index)"
                >
                  <span
                    class="el-checkbox__input"
                    :class="{ 'is-checked': isLeftCheckedObj[index] }"
                  >
                    <span class="el-checkbox__inner"></span>
                    <input
                      type="checkbox"
                      aria-hidden="false"
                      class="el-checkbox__original"
                      :value="item.key"
                    />
                  </span>
                  <span class="el-checkbox__label">
                    <span>{{ item.key }}</span>
                    <!---->
                  </span>
                </label>
              </div>
              <p class="el-transfer-panel__empty" style="display: none">
                无数据
              </p>
            </div>
            <!-- <div
              v-for="(item,index) in leftData"
              @click="leftClick(index)"
              :key="index"
            >{{item.key}}</div>-->
          </div>

          <!-- @dblclick="dbLeftClick(index)" -->
        </el-col>
        <el-col :span="4" style="text-align: center; margin-top: 130px">
          <el-row class="btn">
            <el-button
              @click="del"
              type="primary"
              icon="el-icon-arrow-left"
              :disabled="leftBtnDis"
            ></el-button>
            <el-button
              @click="add"
              type="primary"
              icon="el-icon-arrow-right"
              :disabled="rightBtnDis"
            ></el-button>
          </el-row>
        </el-col>
        <el-col :span="10">
          <div class="left-right el-transfer-panel" style="float: left">
            <p class="el-transfer-panel__header" @click.prevent="allSelRight()">
              <label
                class="el-checkbox"
                :class="{ 'is-checked': isRightAllChecked }"
              >
                <span
                  class="el-checkbox__input"
                  :class="{
                    'is-checked': isRightAllChecked,
                    'is-indeterminate': isRightIndeterminate,
                  }"
                >
                  <span class="el-checkbox__inner"></span>
                  <input
                    type="checkbox"
                    aria-hidden="false"
                    class="el-checkbox__original"
                    rightValue
                  />
                </span>
                <span class="el-checkbox__label">已选</span>
              </label>
            </p>
            <div class="el-transfer-panel__body">
              <div
                role="group"
                aria-label="checkbox-group"
                class="el-checkbox-group el-transfer-panel__list"
              >
                <label
                  class="el-checkbox el-transfer-panel__item"
                  v-for="(item, index) in rightData"
                  :key="index"
                  :class="{ 'is-checked': isRightCheckedObj[index] }"
                  @click.prevent="rightClick(index)"
                >
                  <!-- is-checked -->
                  <span
                    class="el-checkbox__input"
                    :class="{ 'is-checked': isRightCheckedObj[index] }"
                  >
                    <span class="el-checkbox__inner"></span>
                    <input
                      type="checkbox"
                      aria-hidden="false"
                      class="el-checkbox__original"
                      :value="item.key"
                    />
                  </span>
                  <span class="el-checkbox__label">
                    <span>{{ item }}</span>
                    <!---->
                  </span>
                </label>
              </div>
              <p class="el-transfer-panel__empty" style="display: none">
                无数据
              </p>
            </div>
            <!-- <div v-for="(item,index) in rightData" @click="rightClick(index)" :key="index">{{item}}</div> -->
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "addToRight",
  components: {},
  props: {
    type: { type: String, default: "1" },
    dialogWidth: {
      type: String,
      default: '80%'
    },
    isShowCondition: {
      type: Boolean,
      default: false
    },
    conditionInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    allData: {
      type: [Array, String],
      default () {
        return [];
      }
    },
    selectData: {
      type: [Array, String],
      default () {
        return [];
      }
    },
    title: { type: String, default: "标题" },
    value: {
      type: Boolean,
      default () {
        return false
      }
    },
  },
  watch: {
    dialogVisible (val) {
      this.$emit('input', val)
    },
    value (val) {
      console.log('val', val);
      this.dialogVisible = val
      // if (!val) {
      //   console.log(1234567890);
      //   this.rightData = []
      // }
    },
    allData (val) {
      if (Array.isArray(this.allData)) {
        this.leftData = JSON.parse(JSON.stringify(this.allData))
      } else {
        this.leftData = this.allData.split(",")
      }
    },
    // isLeftAllChecked (val) {

    //   this.leftData.map((item, index) => {
    //     this.$set(this.isLeftCheckedObj, index, this.isLeftAllChecked)
    //   })
    // }
  },
  data () {
    return {
      dialogVisible: false,
      rightValue: false,
      //待选框数据
      leftData: [],
      /**
       * 待选是否选中
       * key:leftData[index]
       * value:true/false
       */
      isLeftCheckedObj: {},
      /**
       * 同上（待选是否选中）
       */
      isRightCheckedObj: {},
      //待选是否全选
      isLeftAllChecked: false,
      //待选半选中状态
      isLeftIndeterminate: false,
      //待选是否全选
      isRightAllChecked: false,
      //待选半选中状态
      isRightIndeterminate: false,
      // 左右按钮是否禁用
      leftBtnDis: true,
      rightBtnDis: true
    }
  },
  computed: {
    //已选框数据
    rightData () {
      if (Array.isArray(this.selectData)) {
        return deepClone(this.selectData)
      } else {
        return this.selectData.split(",")
      }
    }
  },
  methods: {
    rightClick (index) {
      this.isRightIndeterminate = true
      if (this.isRightCheckedObj[index]) {
        this.$set(this.isRightCheckedObj, index, false)
      } else {
        this.leftBtnDis = false
        this.$set(this.isRightCheckedObj, index, true)
      }
      if (Object.keys(this.isRightCheckedObj).length === this.rightData.length) {
        let isAllRightTrue = Object.values(this.isRightCheckedObj).every(item => {
          return item === true
        })
        console.log('isAllRightTrue', isAllRightTrue);
        if (isAllRightTrue) {
          console.log('isAllRightTrue------------');
          this.isRightAllChecked = true
          this.isRightIndeterminate = false
        } else {
          let isAllRightFalse = Object.values(this.isRightCheckedObj).every(item => {
            return item === false
          })
          if (isAllRightFalse) {
            console.log('isAllRightFalse------------');
            this.leftBtnDis = true
            this.isRightAllChecked = false
            this.isRightIndeterminate = false
          }
        }
      }
    },
    leftClick (item, index) {
      if (!this.conditionInfo.value) {
        this.$message({
          type: 'warning',
          message: '请先选择约束条件'
        })
        return
      }
      this.isLeftIndeterminate = true
      console.log('isLeftAllChecked', this.isLeftAllChecked);
      if (this.isLeftAllChecked) {
        console.log('1111111111');
        this.isLeftAllChecked = false
      }
      if (this.rightData.indexOf(`${this.conditionInfo.value}&$&${this.leftData[index].key}`) != -1) {
        this.$message({
          type: 'warning',
          message: '请选择未添加过的数据！'
        })
      } else {
        if (this.isLeftCheckedObj[index]) {
          this.$set(this.isLeftCheckedObj, index, false)
        } else {
          this.rightBtnDis = false
          this.$set(this.isLeftCheckedObj, index, true)
        }
      }

      console.log(Object.keys(this.isLeftCheckedObj).length, '------------------', this.leftData.length);
      console.log('this.isLeftCheckedObj', this.isLeftCheckedObj);
      if (Object.keys(this.isLeftCheckedObj).length === this.leftData.length) {
        let isAllLeftTrue = Object.values(this.isLeftCheckedObj).every(item => {
          return item === true
        })
        console.log('isAllLeftTrue', isAllLeftTrue);
        if (isAllLeftTrue) {
          console.log('isAllLeftTrue------------');
          this.isLeftAllChecked = true
          this.isLeftIndeterminate = false
        } else {
          let isAllLeftFalse = Object.values(this.isLeftCheckedObj).every(item => {
            return item === false
          })
          if (isAllLeftFalse) {
            console.log('isAllLeftFalse------------');
            this.rightBtnDis = true
            this.isLeftAllChecked = false
            this.isLeftIndeterminate = false
          }
        }
      }
    },
    add () {
      let isLeftCheckedKeys = Object.keys(this.isLeftCheckedObj)
      isLeftCheckedKeys.map(item => {
        if (this.isLeftCheckedObj[item]) {
          this.rightData.push(`${this.conditionInfo.value}&$&${this.leftData[item].key}`)
          this.$set(this.isLeftCheckedObj, item, false)
        }
      })
      this.isLeftAllChecked = false
      this.isLeftIndeterminate = false
      this.rightBtnDis = true
    },
    // dbLeftClick (index) {
    //   if (this.rightData.indexOf(this.leftData[index]) != -1) {
    //   } else {
    //     this.rightData.push(this.leftData[index])
    //   }
    // },
    del () {
      let isRightCheckedKeys = Object.keys(this.isRightCheckedObj)
      isRightCheckedKeys.sort((a, b) => {
        return b - a
      })
      isRightCheckedKeys.map(item => {
        if (this.isRightCheckedObj[item]) {
          this.rightData.splice(item, 1)
        }
      })
      this.isRightCheckedObj = {}
      this.isRightAllChecked = false
      this.isRightIndeterminate = false
      this.leftBtnDis = true
    },
    allSelLeft () {
      for (let item of this.leftData) {
        if (this.rightData.indexOf(`${this.conditionInfo.value}&$&${item.key}`) != -1) {
          this.$message({
            type: 'warning',
            message: '请选择未添加过的数据！'
          })
          return
        }
      }
      if (this.isLeftIndeterminate) {
        this.isLeftIndeterminate = false
        this.isLeftAllChecked = true
        this.leftData.map((item, index) => {
          this.$set(this.isLeftCheckedObj, index, true)
        })
      } else {
        this.isLeftAllChecked = !this.isLeftAllChecked
        if (this.isLeftAllChecked) {
          this.rightBtnDis = false
        } else {
          this.rightBtnDis = true
        }
        this.leftData.map((item, index) => {
          this.$set(this.isLeftCheckedObj, index, this.isLeftAllChecked)
        })
      }
    },
    allSelRight () {
      if (this.isRightIndeterminate) {
        this.isRightIndeterminate = false
        this.isRightAllChecked = true
        this.rightData.map((item, index) => {
          this.$set(this.isRightCheckedObj, index, true)
        })
      } else {
        this.isRightAllChecked = !this.isRightAllChecked
        if (this.isRightAllChecked) {
          this.leftBtnDis = false
        } else {
          this.leftBtnDis = true
        }
        this.rightData.map((item, index) => {
          this.$set(this.isRightCheckedObj, index, this.isRightAllChecked)
        })
      }
    },
    addAll () {
      this.rightData = deepClone(this.leftData)
    },
    delAll () {
      this.rightData = [];
      this.isRightAllChecked = false
    },
    sure () {
      this.dialogVisible = false
      this.$emit('sure', this.type, this.rightData)
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {

    if (Array.isArray(this.allData)) {
      this.leftData = JSON.parse(JSON.stringify(this.allData))
      console.log("------allData-->", this.allData);
      console.log("------11111-->", this.leftData)
    } else {
      this.leftData = this.allData.split(",")
    }
    console.log("-------->", this.leftData)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.left-right {
  height: 303px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  line-height: 30px;
  width: 97%;
}
</style>
