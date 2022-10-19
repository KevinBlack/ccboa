<template>
  <div class="file_table">
    <div class="file_wh">
      <el-scrollbar>
      <el-table
        :data="tableData"
        :size="size"
        :id="id"
        height="350"
        :border="isBorder"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @select="select"
        @select-all="selectAll"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        @current-change="handleTableCurrentChange"
        :cell-style="cellStyle"
        :highlight-current-row="highlightcurrentrow"
        @cell-click="cellClick"
        :defaultSelections="defaultSelections"
        :row-class-name="tableRowClassName"
        ref="fileTable"
      >
        <el-table-column v-if="isSingelCheck" width="46px" align="center">
          <template slot-scope="scope">
            <el-radio
              :label="scope.$index"
              v-model="templateRadio"
              @change.native="handleTemplateRadio(scope.row,templateRadio)"
              style="margin-left: 10px;"
              class="radio_self"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-if="isSelection" width="50px" 
        :selectable="selectable"
        type="selection" align="center"></el-table-column>
        <el-table-column v-if="isIndex" type="index" :index="inedxMethod" align="center" width="70"></el-table-column>
        <!-- 数据栏 -->
        <el-table-column
          v-for="item in tableCols"
          :key="item.id"
          :prop="item.prop"
          :formatter="item.formatter"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :sortable="item.sort"
          :render-header="item.require?renderHeader:null"
        >
          <template slot-scope="scope">
            <!-- html -->
            <span v-if="item.type==='Html'" v-html="item.html(scope.row)" @click="item.handle(scope.row)"></span>
            <!-- 直接传入死按钮 -->
            <span v-if="item.type==='Button'">
              <el-button
                v-for="(btn,index) in item.formatter||item.btnList"
                v-if="btn.label!='删除'||!scope.row.PEOPFLAG"
                :key="index"
                :disabled="scope.row.fileId!=changeFileId"
                :type="btn.type"
                :style="btn.style"
                :circle="btn.circle || false"
                :icon="btn.icon"
                @click.stop="btn.handle(scope.row)" 
              >{{btn.label}}</el-button>
            </span>
            <!--根据状态显示不同按钮-->
            <span v-if="item.type==='button'">
              <el-button
                v-for="(btn,index) in item.formatter(scope.row)"
                :key="index"
                :type="btn.type"
                :size="btn.size || size"
                :icon="btn.icon"
                @click.stop="btn.handle(scope.row)"
              >{{btn.label}}</el-button>
            </span>
            <!-- 输入框 -->
            <el-input
              v-if="item.type==='Input'"
              v-model="scope.row[item.prop]"
              :size="size"
              @focus="item.focus && item.focus(scope.row)"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              v-if="item.type==='Select'"
              v-model="scope.row[item.prop]"
              :size="size"
              :props="item.props"
              @change="item.change && item.change(scope.row)"
            >
              <el-option
                v-for="op in item.options"
                :label="op[item.props.label]"
                :value="op[item.props.value]"
                :key="op[item.props.value]"
              ></el-option>
            </el-select>
            <!-- 单选 -->
            <el-radio-group
              v-if="item.type==='Radio'"
              v-model="scope.row[item.prop]"
              @change="item.change && item.change(scope.row)"
            >
              <el-radio
                v-for="(ra,index) in item.radios"
                :key="index"
                :label="ra.value"
              >{{ra.label}}</el-radio>
            </el-radio-group>
            <!-- 评价 -->
            <el-rate
              v-if="item.type==='Rate'"
              v-model="scope.row[item.prop]"
              @change="item.change && item.change(scope.row)"
            ></el-rate>
            <!-- 开关 -->
            <el-switch
              v-if="item.type==='Switch'"
              v-model="scope.row[item.prop]"
              @change="item.change && item.change(scope.row)"
            ></el-switch>
            <!-- 图像 -->
            <img
              v-if="item.type==='Image'"
              :src="scope.row[item.prop]"
              @click="item.handle && item.handle(scope.row)"
            />
            <!-- 滑块 -->
            <el-slider
              v-if="item.type==='Slider'"
              v-model="scope.row[item.prop]"
              @change="item.change && item.change(scope.row)"
            ></el-slider>
            <!-- 默认 -->
            <span
              v-if="!item.type"
              :style="item.itemStyle && item.itemStyle(scope.row)"
              :class="item.itemClass && item.item.itemClass(scope.row)"
            >{{(item.formatter && item.formatter(scope.row)) || scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 表格型号：mini,medium,small
    size: { type: String, default: "medium" },
    id: { type: String, default: "table" },
    isDB: { type: Boolean, default: false },
    state: { type: [String, Number]},
    isBorder: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    height:{ type: String, default: '' },
    // 表格操作
    isHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] },
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格列配置
    tableCols: { type: Array, default: () => [] },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    // 是否显示表格单选框
    isSingelCheck: { type: Boolean, default: false },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: "序号" },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 分页数据
    pagination: {
      type: Object,
      default: () => ({ limit: 10, page: 1, total: 10 })
    },
    highlightcurrentrow: { type: Boolean, default: false },
  },
  data () {
    return {
      changeFileId:'',
      templateRadio: false,
      Height: 0,
      pageSize: 1
    };
  },
  mounted () {

  },
  watch: {
    defaultSelections (val) {
      this.$nextTick(function () {
        if (Array.isArray(val)) {
          val.forEach(row => {
            this.$refs.cesTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.cesTable.toggleRowSelection(val);
        }
      });
    }
  },
  methods: {
    resetRadioInfo(){
      this.templateRadio = "";
    },
    cellStyle(row){
      this.$emit("tableRowClassName",row);
      if(this.isDB){
        if(row.row.isUndertakeOver){
          if(row.column.label == '事由提要'){
            return 'color:blue';
          }
          if(row.column.label == '查看流程'){
            if(row.row.isUndertakeOver !="3"){
              return 'color:blue';
            }
          }
        }
        return '';
      }
      //warning-cellreturn row.isUndertakeOver ==1 ? "已反馈": (row.isUndertakeOver ==2? "持续跟踪":" ");
          
    },
    inedxMethod(index){
      let curpage = this.pagination.page;
      let limitpage = this.pagination.limit;
      return (index+1) + (curpage-1)*limitpage
    },
    tableRowClassName(row) { 
      this.$emit("tableRowClassName", row);
      if(this.state!='1')return
      console.log(row.row.readFlag)
      if(row.row.readFlag == 0||row.row.READFLAG == 0){
        return 'warning-row';
      }
      return '';
    },
    // 表格勾选
    select (rows, row) {
      this.$emit("select", rows, row);
    },
    // 全选
    selectAll (rows) {
      this.$emit("select", rows);
    },
    handleSelectionChange (val) {
      this.$emit("handleSelectionChange", val);
    },
    handleTemplateRadio (rows,numb) {
      this.$emit("handleTemplateRadio", rows,numb);
      this.changeFileId = rows.fileId;
    },
    //行点击事件
    cellClick (row, column, cell, event) {
      this.$emit("cellClick", row, column, cell, event);
    },
    selectable (row,index){
      this.$emit("selectable", row, index);
      if(row.isUndertakeOver&&row.isUndertakeOver == '3'){
        return false
      }else{
        return true
      }
    },
    handleCurrentChange (val) {
      this.pagination.page = val
      this.templateRadio = '';
      this.$emit("handleCurrentChange", val);
    },
    handleTableCurrentChange (val) {
      this.$emit('handleTableCurrentChange', val)
    },
    handleSizeChange (val) {
      this.pagination.limit = val
      this.pagination.page =1;
      this.$emit("handleSizeChange", val);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
  /deep/ .el-radio__label{
    display: none;
  }
  .file_table{
    /deep/ .el-table__body-wrapper{
      .cell.el-tooltip{
        white-space: normal;
      }
    }
  }
  .el-table--medium td, .el-table--medium th{
    padding: 0;
  }
</style>
