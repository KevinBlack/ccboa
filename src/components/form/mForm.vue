/**
* create by zx on 2020-4-4 16:41
* 类注释：通用form
* 备注：
*/
<template>
  <el-form
    ref="editForm"
    :size="size"
    :inline="isInline"
    :label-width="labelWidth"
    :model="formData"
    :rules="formRules"
    :disabled="isAllDisabled"
  >
    <el-form-item v-for="item in formCfg" :label="item.label" :prop="item.prop" :key="item.label">
      <!-- 输入框 -->
      <el-input
        v-if="item.type==='input'"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disabled"
        clearable
        :style="{width:item.width?item.width:'300px'}"
      ></el-input>
      <!-- 文本域 -->
      <el-input
        v-if="item.type==='textarea'"
        type="textarea"
        :rows="item.rows?item.rows:2"
        :disabled="item.disabled"
        @change="item.change && item.change(formData[item.prop])"
        v-model="formData[item.prop]"
        :style="{width:item.width?item.width:'300px'}"
      ></el-input>
      <!-- 下拉框 -->
      <el-select
        v-if="item.type==='select'"
        v-model="formData[item.prop]"
        clearable
        @change="item.change && item.change(formData[item.prop])"
        @input="item.input && item.input(formData[item.prop])"
        :disabled="item.disabled"
        :style="{width:item.width?item.width:'300px'}"
      >
        <div v-if="item.isArray">
          <el-option v-for="(op,inde) in item.options" :label="op" :value="op" :key="inde"></el-option>
        </div>
        <div v-else>
          <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
        </div>
      </el-select>
      <!-- 单选 -->
      <el-radio-group
        v-if="item.type==='radio'"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disabled"
        :style="{width:item.width?item.width:'100%'}"
      >
        <el-radio
          v-for="ra in item.radios"
          :label="ra.value"
          :key="ra.value"
          :style="{lineHeight:2}"
        >{{ra.label}}</el-radio>
      </el-radio-group>
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="item.type==='radioButton'"
        v-model="formData[item.prop]"
        :style="{width:item.width?item.width:'300px'}"
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disabled"
      >
        <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
      </el-radio-group>
      <!-- 复选框 -->
      <div v-if="item.type==='checkbox'">
        <!-- 全选 -->
        <el-checkbox
          v-if="item.isNeedAllSel"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange(item)"
        >全选</el-checkbox>
        <el-checkbox-group
          v-model="formData[item.prop]"
          :style="{width:item.width}"
          @change="checkboxChange(item)"
          :disabled="item.disabled"
        >
          <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- 日期 -->
      <el-date-picker
        v-if="item.type==='date'"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disabled"
        :valueFormat="item.format"
        :style="{width:item.width}"
        clearable
      ></el-date-picker>
      <!-- 时间 -->
      <el-time-select
        v-if="item.type==='time'"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop])"
        :style="{width:item.width?item.width:'300px'}"
        :disabled="item.disabled"
        clearable
      ></el-time-select>
      <!-- 日期时间 -->
      <el-date-picker
        v-if="item.type==='dateTime'"
        type="datetime"
        v-model="formData[item.prop]"
        clearable
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disable"
        :style="{width:item.width?item.width:'300px'}"
      ></el-date-picker>
      <!-- 日期时间范围 -->
      <el-date-picker
        v-if="item.type==='datetimerange'"
        type="datetimerange"
        v-model="formData[item.prop]"
        clearable
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disable"
        :style="{width:item.width?item.width:'300px'}"
      ></el-date-picker>
      <!-- 滑块 -->
      <el-slider v-if="item.type==='Slider'" v-model="formData[item.prop]"></el-slider>
      <!-- 开关 -->
      <el-switch
        v-if="item.type==='switch'"
        v-model="formData[item.prop]"
        @change="item.change && item.change(formData[item.prop])"
        :disabled="item.disabled"
      ></el-switch>
      <!-- item后按钮 -->
      <el-button
        v-if="item.showAdditionButton"
        type="primary"
        class="additionStyle"
        :disabled="item.buttonDisabled"
        @click="item.additionButtonhandel && item.additionButtonhandel()"
      >{{item.additionButtonLabel}}</el-button>
      <div v-if="item.showMoreButton">
        <el-button
          v-for="(tem,index) in item.buttons"
          :key="index"
          class="additionStyle"
          :size="tem.size || size"
          :disabled="item.buttonDisabled"
          :type="tem.type?tem.type:'primary'"
          :icon="tem.icon"
          @click="tem.handle()"
        >{{tem.label}}</el-button>
      </div>
      <!-- item后提示语 -->
      <span
        v-if="item.showAdditionSpan"
        type="primary"
        class="additionStyle"
        :style="item.additionSpanStyle"
      >{{item.additionSpan}}</span>
    </el-form-item>
    <div style="display: flex" v-if="showButton">
      <div style="flex: 1"></div>
      <el-button @click="cancel()">取消</el-button>
      <el-button @click="sure()">保存</el-button>
    </div>
  </el-form>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mForm',
  components: {},
  props: {
    isInline: {
      type: Boolean,
      default: true
    },
    isAllDisabled: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      default: 'medium'
    },
    formCfg: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => {
      }
    },
    formRules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      checkAll: false,
      isIndeterminate: false
    }
  },
  computed: {},
  methods: {
    //多选中全选复选框change方法
    handleCheckAllChange (item) {
      if (this.checkAll) {
        this.formData[item.prop] = item.checkboxs.map(item => {
          return item.value
        })
      } else {
        this.formData[item.prop] = []
      }
      this.isIndeterminate = false;
    },
    //多选框change事件
    checkboxChange (item) {
      if (item.isNeedAllSel) {
        let checkedCount = this.formData[item.prop].length;
        this.checkAll = checkedCount === item.checkboxs.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < item.checkboxs.length;
      }
      item.change && item.change(this.formData[item.prop])
    },
    cancel () {
      this.$emit('cancel')
    },
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs.editForm.validate((valid) => {
          resolve(valid)
        })
      })
    },
    sure () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$emit('sure')
        } else {
          return false
        }
      })
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.additionStyle {
  margin-left: 2%;
  font-size: 12px;
}
</style>
