<template>
  <div class="ces-table-page">
    <!-- 表格操作按钮 -->
    <div class="ces-handle" v-if="isHandle">
      <el-button
        v-for="(item,index) in tableHandles"
        :key="index"
        :size="item.size || size"
        :type="item.type"
        :icon="item.icon"
        :circle="item.circle"
        @click="item.handle()"
      >{{item.label}}</el-button>
    </div>
    <!-- 数据表格 -->
    <div class="ces-table">
      <el-table
        :data="tableData"
        :size="size"
        :id="id"
        :height="height"
        :isDB ="isDB"
        :isHome="isHome"
        :state="state"
        :border="isBorder"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        @select="select"
        @select-all="selectAll"
        @sort-change="sorts"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        @current-change="handleTableCurrentChange"
        :cell-style="cellStyle"
        :highlight-current-row="highlightcurrentrow"
        @cell-click="cellClick"
        :defaultSelections="defaultSelections"
        :row-class-name="tableRowClassName"
        ref="cesTable"
      >
        <el-table-column v-if="isSelection" width="30px"
        :selectable="selectable"
        type="selection" align="center"></el-table-column>
        <el-table-column v-if="isSingelCheck" width="30px" align="center">
          <template slot-scope="scope">
            <el-radio
              :label="scope.$index"
              v-model="templateRadio"
              :disabled="scope.row.dispatchDate"
              @change.native="handleTemplateRadio(scope.row)"
              style="margin-left: 5px;"
              class="radio_self"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-if="isIndex" type="index" :index="inedxMethod" :lable="indexLabel" align="center" width="50"></el-table-column>
        <!-- 数据栏 -->
        <!---->
        <el-table-column
          v-for="item in tableCols"
          :key="item.id"
          :prop="item.prop"
          :formatter="item.formatter"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :min-width="item.minwidth"
          show-overflow-tooltip
          :align="item.align||'center'"
          :render-header="item.require?renderHeader:null"
        >
          <template slot-scope="scope">
            <!-- html -->
            <span v-if="item.type==='Html'" v-html="item.html(scope.row)" @click="item.handle(scope.row)"></span>
            <!-- 直接传入死按钮 -->
            <span v-if="item.type==='Button'">
              <el-button
                v-for="(btn,index) in item.formatter||item.btnList"
                v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row))"
                :key="index"
                :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                :type="btn.type"
                :style="btn.style"
                :size="btn.size || size"
                :circle="btn.circle || false"
                :icon="btn.icon==''?(scope.row.scFlag == 1?'el-icon-star-on':'el-icon-star-off'):btn.icon"
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
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type==='Checkbox'"
              v-model="scope.row[item.prop]"
              @change="item.change && item.change(scope.row)"
            >
              <el-checkbox
                v-for="(ra,index) in item.checkboxs"
                :key="index"
                :label="ra.value"
              >{{ra.label}}</el-checkbox>
            </el-checkbox-group>
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
    </div>
    <!-- 分页 -->
    <div class="ces-pagination" v-if="isPagination&&tableData.length">
      <div style="flex: 1;line-height: 30px">
        <!-- 共{{pagination.total}}条 -->
      </div>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next,jumper"
        :current-page.sync="pagination.page"
        @current-change="handleCurrentChange"
        :page-size="pagination.limit"
        :total="pagination.total"
        @size-change="handleSizeChange"
        :page-sizes="isIndexPage == true ?[20,30,50,100,200,500]:[20,30,50,100,200]"
      ></el-pagination>
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
    sortable: { type: [String, Boolean], default: "custom" },
    isHome: { type: Boolean, default: false },
    isIndexDb: { type: Boolean, default: false },
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
    isIndexPage: { type: Boolean, default: false },
    // 分页数据
    pagination: {
      type: Object,
      default: () => ({ limit: 10, page: 1, total: 10 })
    },
    searchDataIndex: { type: Object, default: () => ({ orderSort: "", order: "" }) },
    highlightcurrentrow: { type: Boolean, default: false },

  },
  data () {
    return {
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
    cellStyle(row){
      this.$emit("tableRowClassName",row);
      if(row.row.dispatchDate) {
        return 'font-weight: bolder;background-color: #C0C4CC;'
      }
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
      if(this.isHome){
        if(row.row.UPDATE_FLAG == '1'&&row.row.DATA_TYPE != 'LSZSQ' && row.row.DATA_TYPE !=  'LSZSQ'&& row.row.DATA_TYPE != 'SEC_BACK'){
          return 'warning-cell';
        }else if(((row.row.readFlag == 0||row.row.READFLAG == 0)&&row.row.UPDATE_FLAG != '1')||((row.row.DATA_TYPE == 'LSZSQ'|| row.row.DATA_TYPE =='SEC_BACK')&&row.row.UPDATE_FLAG == '1'&&row.row.READFLAG == 0)){
          if(this.state!='1'&&this.isIndexDb)return
         return 'warning-row';
        }
        return '';
      }else{
        if(this.state!='1')return
        if(row.row.readFlag == 0||row.row.READFLAG == 0){
          return 'warning-row';
        }
        return '';
      }
      
    },
    sorts({ column, prop, order }) {
      if (order == "ascending") {
        this.searchDataIndex.orderSort = "asc";
      } else if (order == "descending") {
        this.searchDataIndex.orderSort = "desc";
      } else {
        this.searchDataIndex.orderSort = "";
      }
      this.searchDataIndex.order = prop;
      this.$emit("refresh", true, this.pagination);
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
    handleTemplateRadio (rows) {
      this.$emit("handleTemplateRadio", rows);
    },
    //行点击事件
    cellClick (row, column, cell, event) {
      this.$emit("cellClick", row, column, cell, event);
    },
    selectable (row,index){
      this.$emit("selectable", row, index);
      if(this.isDB&&((row.isUndertakeOver&&row.isUndertakeOver == '3')||(row.isUndertakeOver&&row.isUndertakeOver == '2'))){
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
    },
    renderHeader (h, obj) {
      return h("span", { class: "ces-table-require" }, obj.column.label);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.ces-pagination {
  margin-top: 5px;
  display: flex;
}

.ces-table {
  border-radius: 5px;
  border: 1px solid #eee;
}

.ces-table-require::before {
  content: "*";
  color: red;
}
.radio_self {
  .el-radio__label {
    display: none !important;
  }
}
/deep/.el-table .el-table__row{
  cursor: pointer;
}
/deep/.el-table .warning-row {
  color: red;
}
/deep/.el-table .warning-cell {
  color: blue;
}
/deep/.el-table__row .cell.el-tooltip{
  width: 100% !important;
}

</style>
