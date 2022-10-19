<template>
  <div class="content">
    <p class="base-title">设计元素集合设置</p>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">保存</el-button>
    </div>

    <!-- 设计元素基本信息 -->
    <div class="box">
      <div class="leftinto">设计元素基本信息</div>
      <div class="right" id="baseInfo">
        <fd-form :data="firstData" :columns="firstCfg" @submit="btnEvent"></fd-form>
      </div>
    </div>

    <!-- 意见域 -->
    <div class="box1">
      <div class="leftinto">
        <p>意见域</p>
        <span>（维修单配置中对应意见信息）</span>
      </div>
      <div class="infotable">
        <fd-form :data="adviseformData" :columns="adviseformCfg" ref="adviseForm"></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          @cellClick="xixi"
          :isSingle="true"
          :isHandle="true"
          :tableData="opinionFldData"
          :tableCols="adviseCols"
          :isSelection="true"
          :isIndex="true"
          @select="adviseSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="adviseAdd" :disabled="onOff">添加</el-button>
        <el-button type="primary" plain @click="adviseUpdate">更新</el-button>
        <el-button type="primary" plain @click="adviseDel">删除</el-button>
        <el-button type="primary" plain @click="adviseUpMove">上移</el-button>
        <el-button type="primary" plain @click="adviseDownMove">下移</el-button>
      </div>
      <div></div>
    </div>

    <!-- 控制域 -->
    <div class="box1">
      <div class="leftinto">
        <p>控制域</p>
        <span>(维护单配置中对应主文档信息）</span>
      </div>
      <div class="infotable">
        <fd-form :data="ctrlformData" :columns="ctrlformCfg" @submit="btnEvent" ref="ctrlForm"></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          :isHandle="false"
          :tableData="controlFldData"
          :tableCols="ctrlCols"
          :isSingle="true"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @cellClick="ctrlClick"
          @select="ctrlSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="ctrlAdd" :disabled="ctrlOnoff">添加</el-button>
        <el-button type="primary" plain @click="ctrlUpdate">更新</el-button>
        <el-button type="primary" plain @click="ctrlDel">删除</el-button>
        <el-button type="primary" plain @click="ctrlUpMove">上移</el-button>
        <el-button type="primary" plain @click="ctrlDownMove">下移</el-button>
      </div>
      <div></div>
    </div>

    <!-- 部门域 -->
    <div class="box1">
      <div class="leftinto">
        <p>部门域</p>
        <span>(维护单配置中对应其他信息)</span>
      </div>
      <div class="infotable">
        <fd-form
          :data="departformData"
          :columns="departformCfg"
          @submit="btnEvent"
          ref="departForm"
        ></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          @cellClick="departClick"
          :isPagination="false"
          :tableData="deptFldData"
          :isSingle="true"
          :tableCols="departCols"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @select="departSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="departAdd" :disabled="departOnoff">添加</el-button>
        <el-button type="primary" plain @click="departUpdate">更新</el-button>
        <el-button type="primary" plain @click="departDel">删除</el-button>
        <el-button type="primary" plain @click="departUpMove">上移</el-button>
        <el-button type="primary" plain @click="departDownMove">下移</el-button>
      </div>
      <div></div>
    </div>
    <!-- 人员域 -->
    <div class="box1">
      <div class="leftinto">
        <p>人员域</p>
        <span>(维护单配置中对应其他信息)</span>
      </div>
      <div class="infotable">
        <fd-form
          :data="personformData"
          :columns="personformCfg"
          @submit="btnEvent"
          ref="personForm"
        ></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          :isHandle="false"
          @cellClick="personClick"
          :tableData="peopleFldData"
          :tableCols="personCols"
          :isSingle="true"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @select="personSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="personAdd" :disabled="personOnoff">添加</el-button>
        <el-button type="primary" plain @click="personUpdate">更新</el-button>
        <el-button type="primary" plain @click="personDel">删除</el-button>
        <el-button type="primary" plain @click="personUpMove">上移</el-button>
        <el-button type="primary" plain @click="personDownMove">下移</el-button>
      </div>
      <div></div>
    </div>
    <!-- 区域 -->
    <div class="box1">
      <div class="leftinto">
        <p>区域</p>
        <span>(维护单配置中对应中间文档的意见信息)</span>
      </div>
      <div class="infotable">
        <fd-form :data="areaformData" :columns="areaformCfg" @submit="btnEvent" ref="areaForm"></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          :isHandle="false"
          :tableData="zoneFldData"
          :tableCols="areaCols"
          :isSingle="true"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @cellClick="areaClick"
          @select="areaSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="areaAdd" :disabled="areaOnoff">添加</el-button>
        <el-button type="primary" plain @click="areaUpdate">更新</el-button>
        <el-button type="primary" plain @click="areaDel">删除</el-button>
        <el-button type="primary" plain @click="areaUpMove">上移</el-button>
        <el-button type="primary" plain @click="areaDownMove">下移</el-button>
      </div>
      <div></div>
    </div>

    <!-- 操作按钮 -->
    <div class="box1">
      <div class="leftinto">
        <p>操作按钮</p>
        <!-- <span>(维护单配置中对应中间文档的意见信息)</span> -->
      </div>
      <div class="infotable">
        <fd-form
          :data="operateformData"
          :columns="operateformCfg"
          @submit="btnEvent"
          ref="operateForm"
        ></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          :isHandle="false"
          :tableData="buttonFldData"
          :tableCols="operateCols"
          :isSingle="true"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @cellClick="operateClick"
          @select="operateSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="operateAdd" :disabled="operateOnoff">添加</el-button>
        <el-button type="primary" plain @click="operateUpdate">更新</el-button>
        <el-button type="primary" plain @click="operateDel">删除</el-button>
        <el-button type="primary" plain @click="operateUpMove">上移</el-button>
        <el-button type="primary" plain @click="operateDownMove">下移</el-button>
      </div>
      <div></div>
    </div>

    <!-- 环节特性 -->
    <div class="box1">
      <div class="leftinto">
        <p>环节特性</p>
        <!-- <span>(维护单配置中对应中间文档的意见信息)</span> -->
      </div>
      <div class="infotable">
        <fd-form
          :data="stepspropformData"
          :columns="stepspropformCfg"
          @submit="btnEvent"
          ref="stepspropForm"
        ></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          :isHandle="false"
          :tableData="nodeFldData"
          :tableCols="stepspropCols"
          :isSelection="true"
          :isSingle="true"
          :isIndex="true"
          indexLabe="序号"
          @cellClick="stepspropClick"
          @select="stepspropSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="stepspropAdd" :disabled="stepspropOnoff">添加</el-button>
        <el-button type="primary" plain @click="stepspropUpdate">更新</el-button>
        <el-button type="primary" plain @click="stepspropDel">删除</el-button>
        <el-button type="primary" plain @click="stepspropUpMove">上移</el-button>
        <el-button type="primary" plain @click="stepspropDownMove">下移</el-button>
      </div>
      <div></div>
    </div>

    <!-- 约束条件 -->
    <div class="box1">
      <div class="leftinto">
        <p>约束条件</p>
        <!-- <span>(维护单配置中对应中间文档的意见信息)</span> -->
      </div>
      <div class="infotable">
        <fd-form
          :data="restainformData"
          :columns="restainformCfg"
          @submit="btnEvent"
          ref="restainForm"
        ></fd-form>
        <m-table
          @refresh="loadData()"
          @selection-change="getRowDatas(row)"
          size="medium"
          :isPagination="false"
          :isHandle="false"
          :tableData="conditionFldData"
          :tableCols="restainCols"
          :isSingle="true"
          :isSelection="true"
          :isIndex="true"
          indexLabe="序号"
          @cellClick="restainClick"
          @select="restainSelect"
        ></m-table>
      </div>

      <div class="btn-aside">
        <el-button type="primary" plain @click="restainAdd" :disabled="restainOnoff">添加</el-button>
        <el-button type="primary" plain @click="restainUpdate">更新</el-button>
        <el-button type="primary" plain @click="restainDel">删除</el-button>
        <el-button type="primary" plain @click="restainUpMove">上移</el-button>
        <el-button type="primary" plain @click="restainDownMove">下移</el-button>
      </div>
      <div></div>
    </div>

    <!-- 备注 -->
    <div class="box1">
      <div class="leftinto">
        <p>备注</p>
      </div>
      <div class="lastinfotable">
        <fd-form :data="remark" :columns="lasttipsformCfg" @submit="btnEvent" class="lasttips"></fd-form>
      </div>
      <!-- <div class="btn-aside"></div> -->
      <div></div>
    </div>
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">保存</el-button>
    </div>
  </div>
</template>
<script>
    import FdForm from "vue-elementui-freedomen/components/form";
    import mTable from "@/components/table/tTable";

    export default {
        name: "designElementAdd",
        components: {
            FdForm,
            mTable,
        },
        data() {
            return {
                id: "",
                editArr: [],
                onOff: false,
                ctrlOnoff: false,
                departOnoff: false,
                restainOnoff: false,
                stepspropOnoff: false,
                operateOnoff: false,
                areaOnoff: false,
                personOnoff: false,
                rows: [], //意见域选中数组
                adviseIdx: "", //单击数据行获取到的索引
                ctrlRows: [],
                ctrlIdx: "",
                departRows: [],
                departIdx: "",
                personRows: [],
                personIdx: "",
                areaRows: [],
                postList: [],//岗位
                areaIdx: "",
                operateRows: [],
                operateIdx: "",
                stepspropRows: [],
                stepspropIdx: "",
                restainRows: [],
                restainIdx: "",
                firstData: {}, //基本信息数据表格
                firstCfg: [
                    //基本信息配置
                    {
                        type: "input",
                        label: "序号",
                        prop: "number",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "集合名称",
                        prop: "designSetName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "集合ID",
                        prop: "designSetId",
                        span: 12,
                        rule: "must",
                    },
                    {type: "input", label: "表单名称", prop: "formName", span: 12},
                ],
                adviseformData: {}, //意见域表单信息
                adviseformCfg: [
                    //意见域表单信息配置
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 8,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 8,
                        rule: "must",
                    },
                    {
                        type: "select",
                        prop: "areaType",
                        span: 8,
                        options: {可编辑: "可编辑", 计算: "计算"},
                        label: "域类型",
                    },
                ],
                adviseCols: [
                    //意见域表格表头配置
                    {label: "设计元素中文名", prop: "chineseName"},
                    {label: "设计元素英文名", prop: "englishName"},
                    {label: "域类型", prop: "areaType"},
                ],
                opinionFldData: [
                    //意见域表格数据
                    // { chineseName: "默认数据", englishName: "defaultData", areaType: "9999" },
                    // { chineseName: "我哈哈哈", englishName: "你嘻嘻", areaType: "他呵呵" },
                ],
                ctrlformData: {}, //控制欲表单信息
                ctrlformCfg: [
                    //控制欲表单信息配置
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "select",
                        prop: "areaType",
                        span: 8,
                        options: {可编辑: "可编辑", 计算: "计算"},
                        label: "域类型",
                    },
                    {
                        type: "select",
                        prop: "dataType",
                        span: 8,
                        options: {
                            文本: "文本",
                            组合框: "组合框",
                            复选框: "复选框",
                            单选按钮: "单选按钮",
                            列表框: "列表框",
                            对话框列表: "对话框列表",
                            RTF文本: "RTF文本",
                            日期时间: "日期时间",
                            数值: "数值",
                        },
                        label: "数据类型",
                    },
                    {type: "input", label: "备注", prop: "remark", span: 8},
                ],
                ctrlCols: [
                    //控制域表格配置
                    {label: "中文名", prop: "chineseName"},
                    {label: "英文名", prop: "englishName"},
                    {label: "域类型", prop: "areaType"},
                    {label: "数据类型", prop: "dataType"},
                    {label: "备注", prop: "remark"},
                ],
                controlFldData: [
                    //控制域表格数据
                ],
                departformData: {},
                departformCfg: [
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 12,
                        rule: "must",
                        placeholder: "部门名|部门全层次ID",
                        rule: "must",
                    },
                ],
                departCols: [
                    {label: "中文名", prop: "chineseName"},
                    {label: "英文名", prop: "englishName"},
                ],
                deptFldData: [],

                personformData: {},
                personformCfg: [
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 12,
                        rule: "must",
                        placeholder: "部门名|部门全层次ID",
                    },
                ],
                personCols: [
                    {label: "中文名", prop: "chineseName"},
                    {label: "英文名", prop: "englishName"},
                ],
                peopleFldData: [],
                areaformData: {},
                areaformCfg: [
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 12,
                        rule: "must",
                        //   placeholder: "部门名|部门全层次ID",
                    },
                ],
                areaCols: [
                    {label: "中文名", prop: "chineseName"},
                    {label: "英文名", prop: "englishName"},
                ],
                zoneFldData: [],
                operateformData: {},
                operateformCfg: [
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 8,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 8,
                        rule: "must",
                    },

                    {
                        type: 'select-multiple',
                        label: "岗位控制",
                        prop: 'postContro',
                        options: '1,2',
                        span: 8,
                        style: {width: '100%'}
                    },
                ],
                operateCols: [
                    {label: "中文名", prop: "chineseName"},
                    {label: "英文名", prop: "englishName"},
                    {label: "岗位控制", prop: "postContro"},
                ],
                buttonFldData: [],

                stepspropformData: {},
                stepspropformCfg: [
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 12,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 12,
                        rule: "must",
                    },
                ],
                stepspropCols: [
                    {label: "中文名", prop: "chineseName"},
                    {label: "英文名", prop: "englishName"},
                ],
                nodeFldData: [],
                restainformData: {},
                restainformCfg: [
                    {type: "input", label: "中文名", prop: "name", span: 6},
                    {
                        type: "input",
                        label: "ID",
                        prop: "id",
                        span: 6,
                    },
                    {type: "input", label: "代码", prop: "word", span: 6},
                    {type: "input", label: "提示语", prop: "hint", span: 6},
                ],
                restainCols: [
                    {label: "中文名", prop: "name"},
                    {label: "ID", prop: "id"},
                    {label: "代码", prop: "word"},
                    {label: "提示语", prop: "hint"},
                ],
                conditionFldData: [],
                remark: {},
                lasttipsformCfg: [{type: "input", label: "", prop: "remark", span: 24}],
            };
        },
        methods: {
            makeUpMove(selectArea, DataName) {
                if (selectArea) {
                    const index = selectArea.index;
                    if (index == 0) {
                        this.$message({
                            type: "warning",
                            message: "第一条数据不可以上移！",
                        });
                        return;
                    }
                    DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
                    this.$message({
                        title: "成功",
                        message: "上移成功",
                        type: "success",
                    });
                } else {
                    this.$message({
                        type: "warning",
                        message: "你没有选中数据",
                    });
                    return;
                }
            },
            makeDownMove(selectArea, DataName) {
                if (selectArea) {
                    const index = selectArea.index;
                    if (index == DataName.length - 1) {
                        this.$message({
                            type: "warning",
                            message: "最后一条数据不可以下移！",
                        });
                        return;
                    }
                    DataName[index] = DataName.splice(index + 1, 1, DataName[index])[0];
                    this.$message({
                        title: "成功",
                        message: "下移成功",
                        type: "success",
                    });
                } else {
                    this.$message({
                        type: "warning",
                        message: "你没有选中数据",
                    });
                    return;
                }
            },
            //意见域
            adviseAdd() {
                //意见域添加按钮
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.adviseformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.adviseformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.adviseformData.areaType === "") {
                        this.$alert("请选择域类型", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("请选择域类型");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.opinionFldData.some((item) => {
                        return item.englishName == this.adviseformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.opinionFldData.push(
                        JSON.parse(JSON.stringify(this.adviseformData))
                    );
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.adviseForm.reset();
                    this.adviseformData = {
                        chineseName: "",
                        englishName: "",
                        areaType: "",
                    };
                }
            },
            // ///////////////////
            adviseDel() {
                let theLength = this.rows;
                if (theLength) {
                    let startIndex = this.rows.index;
                    // // for (let i=this.rows.length;i>=0;i--){
                    // //     if (this.rows[i-1].index==)
                    // // }
                    // for (let i = this.opinionFldData.length; i >= 0; i--) {
                    //
                    // }
                    this.opinionFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.rows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },

            adviseSelect(rows) {
                //意见域选中行
                this.rows = rows;
                console.log("-------this.rows-------", this.rows);
            },

            adviseUpdate() {
                if (this.adviseIdx !== "") {
                    let startIndex = this.adviseIdx;
                    this.opinionFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.adviseformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.adviseForm.reset();
                    this.adviseformData = {
                        chineseName: "",
                        englishName: "",
                        areaType: "",
                    };
                    this.adviseIdx = "";
                    this.onOff = false;
                } else {
                    // this.onOff = false;
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            adviseUpMove() {
                this.makeUpMove(this.rows, this.opinionFldData);
            },
            adviseDownMove() {
                this.makeDownMove(this.rows, this.opinionFldData);
            },
            xixi(row, column, cell, event) {
                this.onOff = true;
                //意见域单击更新
                this.adviseIdx = row.index;
                this.adviseformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                    areaType: row.areaType,
                };
            },
            //按钮
            closedata() {
                //关闭按钮
                console.log("关闭");
                this.$router.go(-1);
            },
            editordata() {
                //保存按钮
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                        },
                    });
                    return;
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                        },
                    });
                    return;
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                        },
                    });
                    return;
                }
                if (this.id) {
                    this.$api.designDictionary
                        .designElementUpdate({
                            designConfigOrderVo: {
                                id: this.id,
                                buttonFldDatas: this.buttonFldData,
                                deptFldDatas: this.deptFldData,
                                conditionFldDatas: this.conditionFldData,
                                controlFldDatas: this.controlFldData,
                                designSetId: this.firstData.designSetId,
                                designSetName: this.firstData.designSetName,
                                formName: this.firstData.formName,
                                nodeFldDatas: this.nodeFldData,
                                number: this.firstData.number,
                                opinionFldDatas: this.opinionFldData,
                                peopleFldDatas: this.peopleFldData,
                                remark: this.remark.remark,
                                zoneFldDatas: this.zoneFldData,
                            },
                        })
                        .then((res) => {
                            if (res.code == "SUCCESS") {
                                this.$message({
                                    title: "成功",
                                    message: "更新成功",
                                    type: "success",
                                });
                                // console.log("00000000000",res)
                                this.$router.go(-1);
                            }
                        });
                } else {
                    this.$api.designDictionary
                        .upopinionFldData({
                            designConfigOrderVo: {
                                buttonFldDatas: this.buttonFldData,
                                deptFldDatas: this.deptFldData,
                                conditionFldDatas: this.conditionFldData,
                                controlFldDatas: this.controlFldData,
                                designSetId: this.firstData.designSetId,
                                designSetName: this.firstData.designSetName,
                                formName: this.firstData.formName,
                                nodeFldDatas: this.nodeFldData,
                                number: this.firstData.number,
                                opinionFldDatas: this.opinionFldData,
                                peopleFldDatas: this.peopleFldData,
                                remark: this.remark.remark,
                                zoneFldDatas: this.zoneFldData,
                            },
                        })
                        .then((res) => {
                            if (res.code == "SUCCESS") {
                                this.$message({
                                    title: "成功",
                                    message: "保存成功",
                                    type: "success",
                                });
                                // console.log("00000000000",res)
                                this.$router.go(-1);
                            }
                        })
                        .catch((error) => {
                        });
                }
            },
            //控制域
            ctrlSelect(rows) {
                this.ctrlRows = rows;
            },
            ctrlClick(row) {
                this.ctrlOnoff = true;
                this.ctrlIdx = row.index;
                this.ctrlformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                    areaType: row.areaType,
                    dataType: row.dataType,
                    remark: row.remark,
                };
            },
            ctrlAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.ctrlformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.ctrlformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.ctrlformData.areaType === "") {
                        this.$alert("请选择域类型", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("请选择域类型");
                            },
                        });
                        return;
                    } else if (this.ctrlformData.dataType === "") {
                        this.$alert("请选择数据类型", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("请选择数据类型");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.controlFldData.some((item) => {
                        return item.englishName == this.ctrlformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.controlFldData.push(JSON.parse(JSON.stringify(this.ctrlformData)));
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.ctrlForm.reset();
                    this.ctrlformData = {
                        chineseName: "",
                        englishName: "",
                        areaType: "",
                        dataType: "",
                        remark: "",
                    };
                }
            },
            ctrlDel() {
                let theLength = this.ctrlRows;
                if (theLength) {
                    let startIndex = this.ctrlRows.index;
                    this.controlFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.ctrlRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            ctrlUpdate() {
                if (this.ctrlIdx !== "") {
                    let startIndex = this.ctrlIdx;
                    this.controlFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.ctrlformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.ctrlForm.reset();
                    this.ctrlformData = {
                        chineseName: "",
                        englishName: "",
                        areaType: "",
                    };
                    this.ctrlIdx = "";
                    this.ctrlOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            ctrlUpMove() {
                this.makeUpMove(this.ctrlRows, this.controlFldData);
            },
            ctrlDownMove() {
                this.makeDownMove(this.ctrlRows, this.controlFldData);
            },
            //部门域
            departSelect(rows) {
                this.departRows = rows;
            },
            departClick(row) {
                // console.log(row);
                this.departOnoff = true;
                this.departIdx = row.index;
                this.departformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                };
            },
            departAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.departformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.departformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.deptFldData.some((item) => {
                        return item.englishName == this.departformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.deptFldData.push(JSON.parse(JSON.stringify(this.departformData)));
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.departForm.reset();
                    this.departformData = {
                        chineseName: "",
                        englishName: "",
                        // areaType: "",
                        // dataType: "",
                        // remark: "",
                    };
                }
            },
            departDel() {
                let theLength = this.departRows;
                if (theLength) {
                    let startIndex = this.departRows.index;
                    this.deptFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.departRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            departUpdate() {
                if (this.departIdx !== "") {
                    let startIndex = this.departIdx;
                    this.deptFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.departformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.departForm.reset();
                    this.departformData = {
                        chineseName: "",
                        englishName: "",
                    };
                    this.departIdx = "";
                    this.departOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            departUpMove() {
                this.makeUpMove(this.departRows, this.deptFldData);
            },
            departDownMove() {
                this.makeDownMove(this.departRows, this.deptFldData);
            },

            //人员域
            personSelect(rows) {
                this.personRows = rows;
            },
            personClick(row) {
                // console.log(row);
                this.personOnoff = true;
                this.personIdx = row.index;
                this.personformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                };
            },
            personAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.personformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.personformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.peopleFldData.some((item) => {
                        return item.englishName == this.personformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.peopleFldData.push(
                        JSON.parse(JSON.stringify(this.personformData))
                    );
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.personForm.reset();
                    this.personformData = {
                        chineseName: "",
                        englishName: "",
                    };
                }
            },
            personDel() {
                let theLength = this.personRows;
                if (theLength) {
                    let startIndex = this.personRows.index;
                    this.peopleFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.personRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            personUpdate() {
                if (this.personIdx !== "") {
                    let startIndex = this.personIdx;
                    this.peopleFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.personformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.personForm.reset();
                    this.personformData = {
                        chineseName: "",
                        englishName: "",
                    };
                    this.personIdx = "";
                    this.personOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            personUpMove() {
                this.makeUpMove(this.personRows, this.peopleFldData);
            },
            personDownMove() {
                this.makeDownMove(this.personRows, this.peopleFldData);
            },

            //区域
            areaSelect(rows) {
                this.areaRows = rows;
            },
            areaClick(row) {
                // console.log(row);
                this.areaOnoff = false;
                this.areaIdx = row.index;
                this.areaformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                };
            },
            areaAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.areaformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.areaformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.zoneFldData.some((item) => {
                        return item.englishName == this.areaformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.zoneFldData.push(JSON.parse(JSON.stringify(this.areaformData)));
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.areaForm.reset();
                    this.areaformData = {
                        chineseName: "",
                        englishName: "",
                    };
                }
            },
            areaDel() {
                let theLength = this.areaRows;
                if (theLength) {
                    let startIndex = this.areaRows.index;
                    this.zoneFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.areaRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            areaUpdate() {
                if (this.areaIdx !== "") {
                    let startIndex = this.areaIdx;
                    this.zoneFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.areaformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.areaForm.reset();
                    this.areaformData = {
                        chineseName: "",
                        englishName: "",
                    };
                    this.areaIdx = "";
                    this.areaOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            areaUpMove() {
                this.makeUpMove(this.areaRows, this.zoneFldData);
            },
            areaDownMove() {
                this.makeDownMove(this.areaRows, this.zoneFldData);
            },
            //操作按钮
            operateSelect(rows) {
                this.operateRows = rows;
            },
            operateClick(row) {
                // console.log(row);
                this.operateOnoff = true;
                this.operateIdx = row.index;

                this.operateformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                    postContro:row.postContro? row.postContro.replace(/#/g, ","):"",
                };
            },
            operateAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.operateformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.operateformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.buttonFldData.some((item) => {
                        return item.englishName == this.operateformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.operateformData.postContro = this.operateformData.postContro.join("#")
                    this.buttonFldData.push(
                        JSON.parse(JSON.stringify(this.operateformData))
                    );
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.operateForm.reset();
                    this.operateformData = {
                        chineseName: "",
                        englishName: "",
                        postContro: [],
                    };
                }
            },
            operateDel() {
                let theLength = this.operateRows;
                if (theLength) {
                    let startIndex = this.operateRows.index;
                    this.buttonFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.operateRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            operateUpdate() {
                if (this.operateIdx !== "") {
                    let startIndex = this.operateIdx;
                    this.operateformData.postContro = this.operateformData.postContro.join("#")
                    this.buttonFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.operateformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.operateForm.reset();
                    this.operateformData = {
                        chineseName: "",
                        englishName: "",
                        postContro: [],
                    };
                    this.operateIdx = "";
                    this.operateOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            operateUpMove() {
                this.makeUpMove(this.operateRows, this.buttonFldData);
            },
            operateDownMove() {
                this.makeDownMove(this.operateRows, this.buttonFldData);
            },

            //环节特性
            stepspropSelect(rows) {
                this.stepspropRows = rows;
            },
            stepspropClick(row) {
                // console.log(row);
                this.stepspropOnoff = true;
                this.stepspropIdx = row.index;
                this.stepspropformData = {
                    chineseName: row.chineseName,
                    englishName: row.englishName,
                    // postContro: row.postContro,
                };
            },
            stepspropAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.stepspropformData.chineseName === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.stepspropformData.englishName === "") {
                        this.$alert("英文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("英文名不得为空！请输入");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.nodeFldData.some((item) => {
                        return item.englishName == this.stepspropformData.englishName;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素英文名已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.nodeFldData.push(
                        JSON.parse(JSON.stringify(this.stepspropformData))
                    );
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.stepspropForm.reset();
                    this.stepspropformData = {
                        chineseName: "",
                        englishName: "",
                    };
                }
            },
            stepspropDel() {
                let theLength = this.stepspropRows;
                if (theLength) {
                    let startIndex = this.stepspropRows.index;
                    this.nodeFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.stepspropRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            stepspropUpdate() {
                if (this.stepspropIdx !== "") {
                    let startIndex = this.stepspropIdx;
                    this.nodeFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.stepspropformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.stepspropForm.reset();
                    this.stepspropformData = {
                        chineseName: "",
                        englishName: "",
                        // postContro: "",
                    };
                    this.stepspropIdx = "";
                    this.stepspropOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            stepspropUpMove() {
                this.makeUpMove(this.stepspropRows, this.nodeFldData);
            },
            stepspropDownMove() {
                this.makeDownMove(this.stepspropRows, this.nodeFldData);
            },
            //约束条件
            restainSelect(rows) {
                this.restainRows = rows;
            },
            restainClick(row) {
                // console.log(row);
                this.restainOnoff = true;
                this.restainIdx = row.index;
                this.restainformData = {
                    name: row.name,
                    id: row.id,
                    word: row.word,
                    hint: row.hint,

                    // postContro: row.postContro,
                };
            },
            restainAdd() {
                if (!this.firstData.number) {
                    this.$alert("序号不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("序号不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetName) {
                    this.$alert("集合名称不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合名称不能为空！请输入");
                        },
                    });
                } else if (!this.firstData.designSetId) {
                    this.$alert("集合ID不能为空！请输入", "警告", {
                        confirmButtonText: "确定",
                        callback: () => {
                            console.log("集合ID不能为空！请输入");
                        },
                    });
                } else {
                    if (this.restainformData.name === "") {
                        this.$alert("中文名不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("中文名不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.restainformData.id === "") {
                        this.$alert("ID不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("ID不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.restainformData.word === "") {
                        this.$alert("代码不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("代码不得为空！请输入");
                            },
                        });
                        return;
                    } else if (this.restainformData.hint === "") {
                        this.$alert("提示语不得为空！请输入", "警告", {
                            confirmButtonText: "确定",
                            callback: () => {
                                console.log("提示语不得为空！请输入");
                            },
                        });
                        return;
                    }
                    var isRepeat = this.conditionFldData.some((item) => {
                        return item.id == this.restainformData.id;
                    });
                    if (isRepeat) {
                        this.$message({
                            message: "添加失败，设计元素ID已经存在",
                            type: "error",
                        });
                        return;
                    }
                    this.conditionFldData.push(
                        JSON.parse(JSON.stringify(this.restainformData))
                    );
                    this.$message({
                        title: "成功",
                        message: "添加成功",
                        type: "success",
                    });
                    this.$refs.restainForm.reset();
                    this.restainformData = {
                        name: "",
                        id: "",
                        word: "",
                        hint: "",
                    };
                }
            },
            restainDel() {
                let theLength = this.restainRows;
                if (theLength) {
                    let startIndex = this.restainRows.index;
                    this.conditionFldData.splice(startIndex, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.restainRows = [];
                } else {
                    this.$message({
                        type: "warning",
                        message: "请至少选中一条数据",
                    });
                }
            },
            restainUpdate() {
                if (this.restainIdx !== "") {
                    let startIndex = this.restainIdx;
                    this.conditionFldData.splice(
                        startIndex,
                        1,
                        JSON.parse(JSON.stringify(this.restainformData))
                    );
                    this.$message({
                        type: "success",
                        message: "更新成功",
                    });
                    this.$refs.restainForm.reset();
                    this.restainformData = {
                        name: "",
                        id: "",
                        word: "",
                        hint: "",
                    };
                    this.restainIdx = "";
                    this.restainOnoff = false;
                } else {
                    this.$message({
                        type: "warning",
                        message: "请单击需要更新的数据",
                    });
                }
            },
            restainUpMove() {
                this.makeUpMove(this.restainRows, this.conditionFldData);
            },
            restainDownMove() {
                this.makeDownMove(this.restainRows, this.conditionFldData);
            },
            loadData() {
                console.log("loaddata");
            },
            btnEvent() {
            },
            getRowDatas(row) {
            },
        },
        mounted() {
            this.id = this.$route.query.id;
            if (this.id) {
                this.$api.designDictionary.designElementFind(this.id).then((res) => {
                    this.editArr = res.data;
                    //重新编辑
                    this.firstData = this.editArr;
                    this.opinionFldData = this.editArr.opinionFldDatas;
                    this.controlFldData = this.editArr.controlFldDatas;
                    this.deptFldData = this.editArr.deptFldDatas;
                    this.peopleFldData = this.editArr.peopleFldDatas;
                    this.zoneFldData = this.editArr.zoneFldDatas;
                    this.buttonFldData = this.editArr.buttonFldDatas;
                    this.nodeFldData = this.editArr.nodeFldDatas;
                    this.conditionFldData = this.editArr.conditionFldDatas;
                    this.remark = this.editArr;
                });
            }
            let st = localStorage.getItem('st')
            this.$api.setting.workFlow.getPostList({st}).then(res => {

                res.data.map(item => {
                    // this.postList.push({label: item.codeName, value: item.dicId})
                    this.postList.push(item.codeName + "|" + item.dicId)
                })
                this.operateformCfg = [
                    {
                        type: "input",
                        label: "中文名",
                        prop: "chineseName",
                        span: 8,
                        rule: "must",
                    },
                    {
                        type: "input",
                        label: "英文名",
                        prop: "englishName",
                        span: 8,
                        rule: "must",
                    },
                    {
                        type: 'select-multiple',
                        label: "岗位控制",
                        prop: 'postContro',
                        options: this.postList.join(","),
                        span: 8,
                        style: {width: '100%'}
                    },
                ];
                console.log("------->", this.postList)
            })
        },
    };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    line-height: 36px;
    background: #fff;

    .base-title {
      width: 100%;
      margin: 16px 0px;
      text-align: center;
      color: #3b85f0;
      font-size: 30px;
      font-weight: bolder;
    }

    .btn-list {
      display: flex;
      justify-content: center;
      margin: 20px;
    }

    .box {
      display: flex;
      border-radius: 10px;
      border: 1px solid #409eff;
      margin-bottom: 10px;
      box-shadow: 3px 3px 3px rgb(132, 245, 247);

      .leftinto {
        width: 8%;
        display: flex;
        color: #606266;
        flex-direction: column;
        justify-content: center;
        padding: 0 10px;
        border-right: 1px solid #409eff;
        text-align: center;
      }

      .right {
        padding: 22px 22px 0 0;
        flex: 1;
      }
    }

    .box1 {
      width: 100%;
      height: 100%;
      display: flex;
      border: 1px solid #409eff;
      border-radius: 10px;
      margin-bottom: 10px;
      box-shadow: 3px 3px 3px rgb(161, 243, 245);

      .leftinto {
        width: 8%;
        display: flex;
        color: #606266;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-size: 14px;
      }

      .infotable {
        padding: 22px 5px 0 5px;
        width: 85%;
        border-left: 1px solid #409eff;
        border-right: 1px solid #409eff;
      }

      .lastinfotable {
        padding: 22px 5px 0 5px;
        flex: 1;

        border-left: 1px solid #409eff;
        border-right: 1px solid #409eff;
      }

      .lasttips {
        transform: translateX(-55px);
      }

      .btn-aside {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          margin: 8px;
        }
      }
    }
  }
</style>
