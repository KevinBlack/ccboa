<template>
  <div>
    <el-row class="d_b100 opinionTbody" v-if="opinionText&&opinionText.length">
      <div v-for="(item) in opinionText" :key="item.id" class="opinionTd">
        <div v-if="item.status" class="d_flex">
          <el-col
            class="pos_r"
          >
            <div class="lineContent" v-if="isRemarks">
              {{ item.content }}
              <span class="pad_lr10" style="margin-left:20px;">({{ item.departmentName }}</span>
              <span class="pad_lr10" style="margin-left:10px;">{{ item.userName }}</span>
              <span class="pad_lr10 timeFont" style="margin-left:10px;">{{ item.createTime }})</span>
            </div>
            <div class="lineContent" v-if="!isRemarks">
              <div>{{item.content}}</div>
              <div class="adviceInfo">
                {{ item.departmentName }}
                <span class="pad_lr10">{{ item.userName }}</span>
                <br>
                <span class="pad_lr10 timeFont">{{ item.createTime }}</span>
              </div>
            </div>
            <div
              class="deletIcon"
              v-if="item.createTime ==sendOpinionMaxTime&&item.userId==nowUserId&&item.nodeCode==curNodeCode&&canDelet"
              @click="deletService(item.id)"
            >
              <!-- <button
              type="button"
              class="el-button el-button--default dimi_btn"
              @click="deletService(item.id)"
              >
              <i class="el-icon-delete"></i>
              </button> -->
              <i data-v-648654e0="" class="icon-font el-icon-delete"></i>
            </div>
          </el-col>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "opinionText",
  props: {
    opinionText: {type: [Array,Object]},
    isRemarks: {type: Boolean, default: false},//是否备注意见
    isCy: {type: Boolean, default: false},//是否传阅意见
    isCYexplain: {type: Boolean, default: false},//是否传阅说明
    isObj: {type: Boolean, default: false},//传阅意见是否为Object样式
    isArr: {type: Boolean, default: false},//传阅意见是否为Arrary样式
    isLength: {type: Boolean, default: false},//一次传阅意见是否有值
    canDelet: {type: Boolean, default: true},
    isLong:  { type: Boolean, default: false },//字数超限
  },
  data() {
    return {};
  },
  methods: {
  },
  mounted(){
    console.log(this);
    
  }
};
</script>

<style lang="less" scoped>
.opinionTbody {
  background-color: #e4e7ed52 !important;
  color: #000;
  padding: 5px 15px 5px 5px !important;
  border: 1px solid #E4E7ED !important;
  border-radius: 4px !important;
  margin-top: 5px;
}

.lineContent {
  line-height: 24px;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-line;
}

.adviceInfo {
  font-size: 14px !important;
  line-height: 20px;
}

.timeFont {
  font-size: 13px;
}

.pad_lr10 {
  padding: 0;
}

.isLeft {
  color: red;
}

.d_b100 {
  width: 100%;
}

.lineRight {
  text-align: left;
  margin-left: 10px;
}

.opinionTd {
  margin-bottom: 10px;
}

.deletIcon {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: -40px;
}

.disable_w {
  width: 100%;
}
.isBlue{
  color:blue;
}
</style>
