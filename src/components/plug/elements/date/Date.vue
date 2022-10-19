<!--
 * @Author: your name
 * @Date: 2020-09-21 18:07:41
 * @LastEditTime: 2020-09-25 16:41:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\components\plug\elements\date\Date.vue
--> 
<template>
  <div>
    <el-time-select
      v-if="dateType(mixin_type(item)) === 'date-time'"
      v-model="item.value"
      :picker-options="(item.config && item.config.pickerOptions) || {
                start: '06:00',
                step: '00:15',
                end: '22:00'
            }"
      @change="change"
      :disabled="item.disabled"
      :valueFormat="item.valueFormat"
      :style="mixin_style(item.style, item.value, item.data)"
      :class="mixin_class(item.class, item.value, item.$data)"
      :placeholder="item.placeholder"
    ></el-time-select>
    <el-date-picker
      v-else-if="dateType(mixin_type(item)) === 'date-datetime'"
      v-model="item.value"
      type="datetime"
      @change="change"
      :disabled="item.disabled"
      :valueFormat="item.valueFormat"
      :style="mixin_style(item.style, item.value, item.data)"
      :class="mixin_class(item.class, item.value, item.$data)"
      :placeholder="item.placeholder"
    ></el-date-picker>
    <el-date-picker
      v-else-if="dateType(mixin_type(item)) === 'date-year'"
      v-model="item.value"
      type="year"
      @change="change"
      :disabled="item.disabled"
      :valueFormat="item.valueFormat"
      :style="mixin_style(item.style, item.value, item.data)"
      :class="mixin_class(item.class, item.value, item.$data)"
      :placeholder="item.placeholder"
    ></el-date-picker>
    <el-date-picker
      v-else-if="dateType(mixin_type(item)) === 'daterange'"
      v-model="item.value"
      :disabled="item.disabled"
      type="daterange"
      :valueFormat="item.valueFormat"
      @change="change"
      :range-separator="item.rangeSeparator"
      style="width:100%"
      :style="mixin_style(item.style, item.value, item.data)"
      :class="mixin_class(item.class, item.value, item.$data)"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-date-picker
      v-else-if="dateType(mixin_type(item)) === 'daterangedefault'"
      v-model="item.value"
      :disabled="item.disabled"
      type="daterange"
      @change="change"
      :range-separator="item.rangeSeparator"
      style="width:100%"
      :style="mixin_style(item.style, item.value, item.data)"
      :class="mixin_class(item.class, item.value, item.$data)"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00','23:59:59']"
      value-format="timestamp"
    ></el-date-picker>
    <el-date-picker
      v-else
      v-model="item.value"
      type="date"
      @change="change"
      :disabled="item.disabled"
      :valueFormat="item.valueFormat"
      :style="mixin_style(item.style, item.value, item.data)"
      :class="mixin_class(item.class, item.value, item.$data)"
      :placeholder="item.placeholder"
    ></el-date-picker>
  </div>
</template>
<script>
import base from "../../mixins/base.js";

export default {
  props: ["item"],
  mixins: [base],
  name: "fddate",
  data() {
    return {};
  },
  methods: {
    change() {
      this.mixin_event({
        type: "change",
        prop: this.item.prop,
        value: this.item.value,
      });
    },
    dateType(type) {
            const typeMap = {
                'date-time': 'date-time',
                'date-datetime': 'date-datetime',
                'date-year': 'date-year',
                'date-daterange': 'daterange',
                'date-daterangedefault':'daterangedefault',
                'date': 'date',
            }
            return typeMap[type]
   },
  },
  created() {
    if (this.item.value === void 0) {
      this.$set(this.item, "value", "");
    }
    this.item.$data[this.item.prop] = this.item.value;
    this.mixin_config("date");
  },
};
</script>
