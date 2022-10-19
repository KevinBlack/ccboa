<!--
 * @Author: wy
 * @Date: 2020-08-13 15:07:40
 * @LastEditTime: 2021-08-05 15:53:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\views\setting\processControl\main\linkSetting.vue
-->
<template>
  <div class="linkSetting">
    <div class="handleButton">
      <el-button type="primary" @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="edit()">
        {{
        isDisabled === "0" ? "编辑" : "保存"
        }}
      </el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">环节定义</div>
      <el-form
        ref="linkForm"
        style="margin: 0 5% 0 2%"
        label-width="180px"
        v-model="formData"
        :disabled="isDisabled === '0'"
        :rules="rules"
      >
        <el-form-item label="环节名称" prop="avyNodeNm">
          <el-input v-model="formData.avyNodeNm" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否起止环节" prop="avyNodeTpcd">
          <el-radio-group v-model="formData.avyNodeTpcd">
            <el-radio label="0101">是</el-radio>
            <el-radio label="0121">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理模式" v-if="$route.query.isChild === '1'">
          <el-select :style="{ width: '100%' }" v-model="formData.modelType">
            <el-option
              v-for="item in form.modelTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 子流程才有 -->
        <el-row v-if="isDisabled === '0'">
          <el-form-item label="缺省处理人">
            <el-input v-model="formData.defaultProcessor"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-else>
          <el-col :span="10">
            <el-form-item label="缺省处理人">
              <el-radio-group v-model="formAddData.defaultProType">
                <el-radio label="0">指定人员</el-radio>
                <el-radio label="1">指定表单域</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <div class="flexSetting" v-if="formAddData.defaultProType === '1'">
              <el-input v-model="formData.defaultProcessor" readonly></el-input>
              <el-button
                type="primary"
                class="needMarginLeft"
                @click="
                  selectMatchValue(
                    '缺省处理人（指定表单域）',
                    'defaultProcessor',
                    selectObj.peopleFldDatas
                  )
                "
              >选择</el-button>
              <!-- <el-select :style="{width:'100%'}" v-model="formData.defaultProcessor">
                <el-option
                  v-for="item in form.formFieldsOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
            </div>
            <div class="flexSetting" v-else>
              <el-input v-model="formData.defaultProcessor" readonly></el-input>
              <el-button
                type="primary"
                class="needMarginLeft"
                @click="
                  selectTree(
                    '缺省处理人（指定人员）',
                    'defaultProcessor',
                    memberList,
                    true
                  )
                "
              >选择</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- 处理人选择范围 -->
        <div class="handlerRange">
          <div class="handlerLabel labelStyle">
            <span>处理人选择范围</span>
          </div>
          <div class="handlerContent">
            <div class="partSession">
              <div class="innerLabel labelStyle">
                <span>部门</span>
              </div>
              <div class="innerContent">
                <div class="leftCkeckbox labelStyle">
                  <el-checkbox v-model="formAddData.department" label="0">指定部门类型</el-checkbox>
                </div>
                <div class="rightContent">
                  <el-radio-group
                    v-model="formData.deptType"
                    :disabled="!formAddData.department.includes('0')"
                  >
                    <!-- 部门类型 hld行领导 bgs办公室 falv法律部门 gg高管 nk内控合规部 -->
                    <!-- <el-radio label="hld">行领导</el-radio>
                    <el-radio label="bgs">办公室</el-radio>
                    <el-radio label="falv">法律部门</el-radio>
                    <el-radio label="gg">高管</el-radio>
                    <el-radio label="nk">内控合规部</el-radio>-->
                    <!-- 备用：改成实时获取部门类型 -->
                    <el-radio
                      v-for="item in departOption"
                      :key="item.id"
                      :label="item.deptTypeName"
                      @change="$forceUpdate()"
                    >{{ item.deptTypeId }}</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="innerContent">
                <div class="leftCkeckbox labelStyle">
                  <el-checkbox v-model="formAddData.department" label="1">指定部门名称</el-checkbox>
                </div>
                <div class="rightContent flexSetting">
                  <el-input v-model="formData.unitNmAttr" readonly></el-input>
                  <el-button
                    type="primary"
                    class="needMarginLeft"
                    @click="selectDepart"
                    :disabled="!formAddData.department.includes('1')"
                  >选择</el-button>
                </div>
              </div>
              <div class="innerContent">
                <div class="leftCkeckbox labelStyle">
                  <el-checkbox v-model="formAddData.department" label="2">指定部门域</el-checkbox>
                </div>
                <div class="rightContent flexSetting">
                  <el-input v-model="formData.deptFields" readonly></el-input>
                  <el-button
                    type="primary"
                    class="needMarginLeft"
                    @click="
                      selectMatchValue(
                        '指定部门域',
                        'deptFields',
                        selectObj.deptFldDatas
                      )
                    "
                    :disabled="!formAddData.department.includes('2')"
                  >选择</el-button>
                </div>
                <div class="rightContent">
                  <el-checkbox-group v-model="formData.deptPositionArr">
                    <!-- 01部门正职 02部门副职 03部门综合代表 05包含下级部门 -->
                    <el-checkbox label="01" name="deptPositionArr">部门正职</el-checkbox>
                    <el-checkbox label="02" name="deptPositionArr">部门副职</el-checkbox>
                    <el-checkbox label="03" name="deptPositionArr">部门综合代表</el-checkbox>
                    <el-checkbox label="05" name="deptPositionArr">包含下级部门</el-checkbox>
                  </el-checkbox-group>
                </div>
                <p class="tips">*只能指定“部门类型”、“部门名称”、“部门域”中任意一项</p>
              </div>
            </div>
            <div class="partSession">
              <div class="innerLabel labelStyle">
                <span>人员</span>
              </div>

              <div class="innerContent">
                <div class="leftCkeckbox labelStyle">
                  <el-checkbox v-model="formAddData.man" label="0">指定人员</el-checkbox>
                </div>
                <div class="rightContent flexSetting">
                  <el-input v-model="formData.humanNmAttr" readonly></el-input>
                  <el-button
                    type="primary"
                    class="needMarginLeft"
                    @click="selectTree('指定人员', 'humanNmAttr', memberList)"
                    :disabled="!formAddData.man.includes('0')"
                  >选择</el-button>
                </div>
              </div>
              <div class="innerContent">
                <div class="leftCkeckbox labelStyle">
                  <el-checkbox v-model="formAddData.man" label="1">指定人员域</el-checkbox>
                </div>
                <div class="rightContent flexSetting" style="marginbottom: 10px">
                  <el-input v-model="formData.peopleField" readonly></el-input>
                  <el-button
                    type="primary"
                    class="needMarginLeft"
                    @click="
                      selectMatchValue(
                        '指定人员域',
                        'peopleField',
                        selectObj.peopleFldDatas
                      )
                    "
                    :disabled="!formAddData.man.includes('1')"
                  >选择</el-button>
                </div>
                <p class="tips">*只能指定“人员”、“人员域”中任意一项</p>
              </div>
            </div>
            <div class="partSession">
              <div class="innerLabel labelStyle">
                <span>岗位</span>
              </div>
              <div class="innerContent">
                <div class="leftCkeckbox labelStyle">
                  <el-checkbox v-model="formAddData.post">指定岗位</el-checkbox>
                </div>
                <div class="rightContent flexSetting">
                  <el-input v-model="formData.gwNm" readonly :disabled="!formAddData.post"></el-input>
                  <el-button
                    type="primary"
                    class="needMarginLeft"
                    @click="selectMatchValue('指定岗位', 'gwNm', postList)"
                    :disabled="!formAddData.post"
                  >选择</el-button>
                </div>
              </div>
            </div>
            <div class="partSession">
              <div class="innerLabel labelStyle" style="width: 200px; text-align: center">
                <span>逻辑关联</span>
              </div>
              <div class="innerContent">
                <div class="rightContent flexSetting">
                  部门
                  <el-select
                    v-model="formAddData.partRelation1"
                    :style="{ margin: '0 2%' }"
                    @input="$forceUpdate()"
                  >
                    <el-option
                      v-for="item in form.relativeB"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>人员
                  <el-select
                    v-model="formAddData.partRelation2"
                    :style="{ margin: '0 2%' }"
                    @input="$forceUpdate()"
                  >
                    <el-option
                      v-for="item in form.relativeB"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>岗位
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form-item label="可见操作按钮" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.visibleButtons" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="
              selectMatchValue(
                '可见操作按钮',
                'visibleButtons',
                selectObj.buttonFldDatas
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="带约束条件的可见操作按钮" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.visibleButtonsBycondition" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            :disabled="isConditionDisable"
            @click="
              selectMatchValue(
                '带约束条件的可见操作按钮',
                'visibleButtonsBycondition',
                selectObj.buttonFldDatas,
                true
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="可编辑的意见域" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.editedIdeaFields" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="
              selectMatchValue(
                '可编辑意见域',
                'editedIdeaFields',
                selectObj.opinionFldDatas
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="带约束条件的可编辑意见域" class="el-form-itemUnique">
          <el-input
            type="textarea"
            autosize
            v-model="formData.editedIdeaFieldsBycondition"
            readonly
          ></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            :disabled="isConditionDisable"
            @click="
              selectMatchValue(
                '带约束条件的可编辑意见域',
                'editedIdeaFieldsBycondition',
                selectObj.opinionFldDatas,
                true
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="必填的意见域" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.requiredIdeaFields" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="
              selectMatchValue(
                '必填的意见域',
                'requiredIdeaFields',
                selectObj.opinionFldDatas
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="不可编辑的控制域" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.readFields" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="
              selectMatchValue(
                '不可编辑的控制域',
                'readFields',
                selectObj.controlFldDatas
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="必填的控制域" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.requiredFields" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="
              selectMatchValue(
                '必填的控制域',
                'requiredFields',
                selectObj.controlFldDatas
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="环节特征" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.nodeSpecialAttribute" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="
              selectMatchValue(
                '环节特征',
                'nodeSpecialAttribute',
                selectObj.nodeFldDatas
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="带约束条件的环节特征" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.nodeSpecialAttBycondition" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            :disabled="isConditionDisable"
            @click="
              selectMatchValue(
                '带约束条件的环节特征',
                'nodeSpecialAttBycondition',
                selectObj.nodeFldDatas,
                true
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="后续环节" class="el-form-itemUnique" prop="acyNodeNext">
          <el-input type="textarea" autosize v-model="formData.acyNodeNext" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            @click="selectMatchValue('后续环节', 'acyNodeNext', afterNodes)"
          >选择</el-button>
        </el-form-item>
        <el-form-item label="带约束条件的后续环节" class="el-form-itemUnique">
          <el-input type="textarea" autosize v-model="formData.acyNodeNextBount" readonly></el-input>
          <el-button
            type="primary"
            class="needMarginLeft"
            :disabled="isConditionDisable"
            @click="
              selectMatchValue(
                '带约束条件的后续环节',
                'acyNodeNextBount',
                afterNodes,
                true
              )
            "
          >选择</el-button>
        </el-form-item>
        <el-form-item label="子流程">
          <el-select :style="{ width: '100%' }" multiple v-model="formData.callTpIdList">
            <el-option
              v-for="item in form.childrenFlowOpt"
              :key="item.pTplNo"
              :label="item.pTplNm"
              :value="item.pTplNo"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!--
      **普通选择弹框
    -->
    <el-dialog :title="titleText" :visible.sync="dialogVisiable" width="80%">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="selectedData[selectProps]"
          :data="selectData"
          :props="{
            key: 'key',
            label: 'key',
          }"
          :targetOrder="targetOrder"
          :titles="['待选', '已选']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}',
          }"
        >
          <span slot-scope="{ option }">{{ option.key }}</span>
        </el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="selectSure()">确 定</el-button>
      </span>
    </el-dialog>
    <!--
      **树状选人弹框
    -->
    <tree-person
      v-model="showOrgPer"
      :isSingle="isSingles"
      :humanType="humanType"
      :unitCode="unitCode"
      :unitClass="unitClass"
      @orgList="getperList"
      :selectDept="selectDept"
      :isNeedChild="isNeedChild"
    ></tree-person>
    <!-- <select-person
      :orgId="orgId"
      :canTab="false"
      :loadingTree="true"
      :treeData="treeData"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="'请选择' + dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />-->
    <!-- 
      选择部门弹框
    -->
    <org-tree
      v-model="showOrgTree"
      title="请选择指定部门"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      opType="dept1"
      queryType
      @orgList="getOrgList"
    ></org-tree>
    <!--
      **带约束条件的选择弹框
    -->
    <addToRight
      v-model="addToRightVisible"
      :title="titleText"
      :isShowCondition="true"
      :allData="allData"
      :selectData="selectedData[selectProps]"
      :conditionInfo="conditionInfo"
      @sure="addToRightSure"
    />
  </div>
</template>

<script >
//  import selectPerson from 'components/tree/tree-fawen'
import selectPerson from "components/tree/treeTansun";
import treePerson from "components/tree/sysTreePerson";
import addToRight from "components/dialog/addToRight";
import orgTree from "components/tree/orgTree";
export default {
  name: "linkSetting",
  components: {
    selectPerson,
    addToRight,
    orgTree,
    treePerson,
  },
  props: {},
  data() {
    return {
      /**
       * 表单
       */
      //表单是否禁用
      isDisabled: "0",
      formData: {
        deptPositionArr: [],
      },
      //额外拟定字段（不传后端）
      formAddData: {
        condition: "",
        formEar: "",
        partRelation1: "and",
        partRelation2: "or",
        department: [],
        man: [],
      },
      departOption: {},
      form: {
        childrenFlowOpt: [],
        modelTypeOption: [
          {
            label: "单人",
            value: "01",
          },
          {
            label: "多人",
            value: "02",
          },
        ],
        relativeB: [
          {
            label: "包含（AND）",
            value: "and",
          },
          {
            label: "并存（OR）",
            value: "or",
          },
          {
            label: "排除（NOT）",
            value: "not",
          },
        ],
      },
      rules: {
        avyNodeNm: [
          { required: true, message: "请输入环节名称", trigger: "blur" },
        ],
      },
      /**
       * 选择弹框
       */
      //部分弹框数据
      selectObj: {},
      //选择岗位
      postList: [],
      //选择人员
      memberList: [],
      //选择部门
      departmentList: [],
      //后续节点
      afterNodes: [],
      //单个弹框数据
      selectData: [],
      targetOrder: "shift",
      //所选择赋值的input框的字段名
      selectProps: "",
      //是否可见
      dialogVisiable: false,
      //弹框标题
      titleText: "",
      //已选数据
      selectedData: {},
      /**
       * 树状选人弹框
       */
      showOrgPer: false,
      isSingles: false,
      isNeedChild: "yes",
      unitClass: 0,
      humanType: 3,
      unitCode: this.$route.query.groupId,
      selectDept: [],
      // orgId: this.$route.query.groupId,
      // treeData: [], //树弹框数据
      // dialogTit: "",
      // dialogType: "next",
      // checkIds: [], //选中id列表
      // checkData: [], //选中数据
      // dialogState: false, //显示隐藏
      // singelCheckF: false, // 单选true 多选为false
      // hasRadio: false, //是否單選
      // dialogTypeNow: "next",
      // seletOptionsData: [],
      //保存时树形选择框的数据
      formTreeData: {},
      /**
       * 选择部门弹出框
       */
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 0,
      orgOrDeptId: this.$route.query.groupId,
      /**
       * 带约束条件的选择弹框
       */
      allData: [],
      conditionInfo: {
        label: "约束条件",
        value: "",
        options: [],
      },
      //控制带约束条件的按钮是否可选
      isConditionDisable: false,
      addToRightVisible: false,
    };
  },
  watch: {
    "formAddData.department"(val) {
      console.log("val", val);
      // formData.deptType / formData.unitNmAttr / formData.deptFields
      if (!val.includes("0")) {
        this.formData.deptType = "";
      }
      if (!val.includes("1")) {
        this.formData.unitNmAttr = "";
        this.formData.unitIdAttr = "";
      }
      if (!val.includes("2")) {
        this.formData.deptFields = "";
      }
    },
    // formAddData.man / formData.humanNmAttr / formData.peopleField
    "formAddData.man"(val) {
      if (!val.includes("0")) {
        this.formData.humanNmAttr = "";
        this.formTreeData.humanNmAttr = "";
      }
      if (!val.includes("1")) {
        console.log("this.formTreeData", this.formTreeData);
        this.formData.peopleField = "";
      }
    },
    "formAddData.post"(val) {
      if (!val) {
        this.formData.gwNm = "";
        this.formAddData.gwId = "";
      }
    },
  },
  computed: {},
  methods: {
    // 选择部门弹窗
    selectDepart() {
      this.showOrgTree = true;
    },
    getOrgList(org) {
      let unitNmAttr = [];
      let unitIdAttr = [];
      org.map((item) => {
        unitNmAttr.push(item.unitName);
        unitIdAttr.push(item.id);
      });
      this.formData.unitNmAttr = unitNmAttr.join(",");
      this.formData.unitIdAttr = unitIdAttr.join(",");
    },
    //编辑
    edit() {
      if (this.isDisabled === "1") {
        //保存
        if (!this.formData.avyNodeNm) {
          this.$message({
            type: "warning",
            message: "请输入必填项",
          });
          return;
        }
        //peopleField,humanNmAttr,,deptFields,unitNmAttr,deptType
        // let departCount = 0
        // if (this.formData.deptFields && this.formData.deptFields !== '') {
        //   departCount++
        // }
        // if (this.formData.unitNmAttr && this.formData.unitNmAttr !== '') {
        //   departCount++
        // }
        // if (this.formData.deptType && this.formData.deptType !== '') {
        //   departCount++
        // }

        // if ((this.formData.peopleField && this.formData.peopleField !== '')
        //   && (this.formData.humanNmAttr && this.formData.humanNmAttr !== '')) {
        //   this.$message({
        //     type: 'warning',
        //     message: '处理人选择范围指定人员只能选择一项'
        //   })
        //   return
        // } else if (departCount > 1) {
        //   this.$message({
        //     type: 'warning',
        //     message: '处理人选择范围指定部门只能选择一项'
        //   })
        //   return
        // } else {
        let params = {
          tplId: this.$route.query.tplId,
          nextNodeAttr: this.formData.acyNodeNext,
          multiTenancyId: this.$route.query.multiTenancyId,
          defaultProcessor: {
            type: this.formAddData.defaultProType,
            formEar:
              this.formAddData.formEar === ""
                ? this.formData.defaultProcessor
                : this.formAddData.formEar,
          },
          humanIdAttr: this.formTreeData.humanNmAttr,
          pcsAvyId: this.$route.query.pcsAvyId
            ? this.$route.query.pcsAvyId
            : "",
          partRelation:
            this.formAddData.partRelation1 +
            "|" +
            this.formAddData.partRelation2,
          gwId: this.formAddData.gwId,
        };
        this.formData.deptPosition = this.formData.deptPositionArr.join(",");
        let paramsObj = {};
        Object.assign(paramsObj, this.formData, params);
        paramsObj.groupId = this.$route.query.groupId;
        this.$api.setting.workFlow.addLinkDefine(paramsObj).then((res) => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.$router.back();
        });
        // }
      }
      this.isDisabled === "0"
        ? (this.isDisabled = "1")
        : (this.isDisabled = "0");
    },

    //选择(普通选择框及有约束条件的选择框)
    selectMatchValue(titleText, props, selectData, isCondition = false) {
      if (props !== "defaultProcessor") {
        if (this.formData[props]) {
          this.$set(this.selectedData, props, this.formData[props].split(","));
        }
      }
      this.selectProps = props;
      selectData &&
        selectData[0] &&
        !selectData[0].key &&
        selectData.map((item) => {
          item.chineseName &&
            (item.key = `${item.chineseName}|${item.englishName}`);
          item.avyNodeNm && (item.key = `${item.avyNodeNm}|${item.pcsAvyId}`);
          item.codeName && (item.key = item.codeName);
        });
      if (isCondition) {
        let allConditionData = [];
        if (this.selectedData[props]) {
          this.conditionInfo.options.map((conditionItem) => {
            selectData.map((selectItem) => {
              allConditionData.push(
                `${conditionItem.nameWord}&$&${selectItem.key}`
              );
            });
          });
          let selectedD = [];
          this.selectedData[props].map((item) => {
            if (allConditionData.includes(item)) {
              selectedD.push(item);
            }
          });
          this.selectedData[props] = JSON.parse(JSON.stringify(selectedD));
        }
        this.addToRightVisible = true;
        this.allData = selectData;
      } else {
        this.selectData = selectData;
        if (this.selectedData[props]) {
          let selectedD = [];
          this.selectedData[props].map((selectedItem) => {
            let selectDataIndex = this.selectData.findIndex((selectItem) => {
              return selectItem.key === selectedItem;
            });
            if (selectDataIndex !== -1) {
              selectedD.push(selectedItem);
            }
          });
          this.selectedData[props] = JSON.parse(JSON.stringify(selectedD));
        }
        this.dialogVisiable = true;
      }
      this.titleText = `请选择${titleText}`;
    },
    //普通选择框确定
    selectSure() {
      console.log("oooooo");
      // if (this.selectProps === "defaultProcessor") {
      //   if (this.selectedData.defaultProcessor.length > 1) {
      //     this.$message({
      //       type: "warning",
      //       message: "请选择一位缺省处理人！",
      //     });
      //     return;
      //   }
      // }
      if (this.selectProps === "gwNm") {
        if (this.selectedData.gwNm && this.selectedData.gwNm.length > 3) {
          this.$message({
            type: "warning",
            message: "最多可指定三个岗位",
          });
          return;
        }
        let gwIdArr = [];
        this.postList.map((item) => {
          this.selectedData.gwNm &&
            this.selectedData.gwNm.length &&
            this.selectedData.gwNm.map((itemGw) => {
              if (item.key === itemGw) {
                gwIdArr.push(item.dicId);
              }
            });
        });
        this.formAddData.gwId = gwIdArr.join(",");
      }
      if (
        this.selectedData[this.selectProps] &&
        this.selectedData[this.selectProps].length > 0
      ) {
        this.formData[this.selectProps] = this.selectedData[
          this.selectProps
        ].join(",");
      } else {
        this.formData[this.selectProps] = "";
      }

      this.dialogVisiable = false;
    },
    //有约束条件的选择框确定
    addToRightSure(type, rightData) {
      this.formData[this.selectProps] = rightData.join(",");
    },
    //选择树形弹出框
    selectTree(dialogTit, props, dataList, singles) {
      this.isSingles = singles ? true : false;
      console.log("dataList", dataList);
      // this.singelCheckF = singelCheckF;
      this.selectProps = props;
      // this.dialogTit = dialogTit;
      // this.treeData = JSON.parse(JSON.stringify(dataList));
      this.showOrgPer = true;
    },
    getperList(data) {
      if (data && data.length === 0) {
        this.formData[this.selectProps] = "";
        this.formTreeData[this.selectProps] = "";
        return;
      }
      let nameArr = [];
      let idArr = [];
      data.map((item) => {
        nameArr.push(item.perName);
        idArr.push(String(item.deptHumanId));
      });
      if (this.selectProps === "defaultProcessor") {
        this.formAddData.formEar = nameArr[0] + "|" + idArr[0];
        this.formData[this.selectProps] = this.formAddData.formEar;
      } else {
        this.formData[this.selectProps] = nameArr.join(",");
      }
      this.formTreeData[this.selectProps] = idArr.join(",");
    },
    // showCompDialog(data, status, type, params, dtype) {
    //   if (status) {
    //     if (data.length === 0) {
    //       this.formData[this.selectProps] = "";
    //       this.formTreeData[this.selectProps] = "";
    //     } else {
    //       let nameArr = [];
    //       let idArr = [];
    //       data.map((item) => {
    //         nameArr.push(item.name);
    //         idArr.push(String(item.idStr));
    //       });
    //       if (this.selectProps === "defaultProcessor") {
    //         this.formAddData.formEar = nameArr[0] + "|" + idArr[0];
    //         this.formData[this.selectProps] = this.formAddData.formEar;
    //       } else {
    //         this.formData[this.selectProps] = nameArr.join(",");
    //       }
    //       this.formTreeData[this.selectProps] = idArr.join(",");
    //     }
    //   }
    //   console.log("-------->", data, status, type, params, dtype);
    //   this.dialogState = false;
    // },
    //获取设计元素
    getDesignList() {
      this.$api.setting.workFlow
        .getDesignList({ designSetId: this.$route.query.designSetId })
        .then((res) => {
          this.selectObj = JSON.parse(JSON.stringify(res.data));
          if (
            this.selectObj.conditionFldDatas &&
            this.selectObj.conditionFldDatas.length > 0
          ) {
            this.conditionInfo.options = JSON.parse(
              JSON.stringify(this.selectObj.conditionFldDatas)
            );
            this.conditionInfo.options.map((item) => {
              item.nameWord = `${item.name}|${item.id}`;
            });
            this.$set(
              this.conditionInfo,
              "value",
              this.conditionInfo.options[0].nameWord
            );
          } else {
            this.isConditionDisable = true;
          }
        });
      let st = localStorage.getItem("st");
      //岗位
      this.$api.setting.workFlow.getPostList({ st }).then((res) => {
        this.postList = JSON.parse(JSON.stringify(res.data));
      });
      //人员
      this.$api.setting.workFlow.getMemberList({ st }).then((res) => {
        this.memberList = JSON.parse(JSON.stringify(res.data));
      });
      //部门
      this.$api.setting.workFlow.getDepartmentList({ st }).then((res) => {
        this.departmentList = JSON.parse(JSON.stringify(res.data));
      });
      //后续环节
      this.$api.setting.workFlow
        .getAfterNodes({
          tplId: this.$route.query.tplId,
          multiTenancyId: this.$route.query.multiTenancyId,
          groupId: this.$route.query.groupId,
        })
        .then((res) => {
          this.afterNodes = JSON.parse(JSON.stringify(res.data));
        });
      //子流程
      this.$api.setting.workFlow
        .getChildrenNodes({
          tplVldStcd: this.$route.query.tplVldStcd,
          wfFcnId: "02",
          multiTenancyId: this.$route.query.multiTenancyId,
          unitCode: this.$route.query.groupId,
        })
        .then((res) => {
          this.form.childrenFlowOpt = JSON.parse(JSON.stringify(res.data));
        });
    },
  },
  activated() {},
  mounted() {
    this.getDesignList();
    if (this.$route.query.type) {
      //新增
      this.isDisabled = "1";
    } else {
      //查看
      this.isDisabled = "0";
      this.$api.setting.workFlow
        .viewLinkDefine(this.$route.query)
        .then((res) => {
          let resData = JSON.parse(JSON.stringify(res.data));
          this.formData = resData.extAttributes;
          if (this.formData.gwNm) {
            this.$set(this.formAddData, "post", true);
            this.formAddData.gwId = this.formData.gwId;
          }
          if (this.formData.humanIdAttr) {
            this.formTreeData.humanNmAttr = this.formData.humanIdAttr;
          }
          if (!this.formData.deptPositionArr) {
            this.$set(this.formData, "deptPositionArr", []);
          }
          if (this.formData.defaultProcessor) {
            let defaultProcessor = JSON.parse(this.formData.defaultProcessor);
            this.$set(
              this.formData,
              "defaultProcessor",
              defaultProcessor.formEar
            );
          }
          this.$set(this.formData, "avyNodeNm", resData.avyNodeNm);
          this.$set(this.formData, "callTpIdList", resData.callTpIdList);
          this.$set(this.formData, "avyNodeTpcd", resData.avyNodeTpcd);
          this.formData.acyNodeNext = resData.acyNodeNext;
          if (this.formData.partRelation) {
            let partRelationArr = this.formData.partRelation.split("|");
            this.formAddData.partRelation1 = partRelationArr[0];
            this.formAddData.partRelation2 = partRelationArr[1];
          }
          //formAddData.department/formData.deptType/formData.unitNmAttr/formData.deptFields/formData.humanNmAttr/formData.peopleField
          if (this.formData.deptType) {
            this.formAddData.department.push("0");
          }
          if (this.formData.unitNmAttr) {
            this.formAddData.department.push("1");
          }
          if (this.formData.deptFields) {
            this.formAddData.department.push("2");
          }
          if (this.formData.humanNmAttr) {
            this.formAddData.man.push("0");
          }
          if (this.formData.peopleField) {
            this.formAddData.man.push("1");
          }
          console.log("this.formD", this.formData);
        });
    }
    // 备用：改成实时获取部门类型
    this.$api.setting.workFlow.getDeptList({ deptConfig: {} }).then((res) => {
      res.data.map((item, index) => {
        if (item.deptTypeName === "ybbm") {
          res.data.splice(index, 1);
        }
      });
      this.departOption = res.data;
      console.log("this.departOption", this.departOption);
    });
  },
  created() {
    console.log("this.$route.query.groupId", this.$route.query.groupId);
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.linkSetting {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 35px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #409eff;
    }
    .el-form-itemUnique .el-form-item__content {
      display: flex !important;
    }

    .needMarginLeft {
      margin-left: 10px;
    }
    .flexSetting {
      display: flex !important;
    }
    .el-button {
      height: 32px !important;
    }
    .labelStyle {
      float: left;
      text-align: right;
      vertical-align: middle;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .handlerRange:after {
      display: table;
      content: "";
      clear: both;
    }
    .handlerRange {
      .handlerLabel {
        width: 180px;
      }
      .handlerContent {
        margin-left: 180px;
        .partSession {
          margin-bottom: 25px;
          .tips {
            padding-left: 4%;
            font-size: 12px;
            color: #ff0502;
          }
        }
        .innerLabel {
          padding-right: 15px;
          width: 70px;
        }
        .innerContent {
          margin-left: 70px;
          margin-bottom: 10px;
          .leftCkeckbox {
            text-align: left;
            float: left;
            width: 130px;
          }
          .rightContent {
            margin-left: 130px;
            line-height: 40px;
            display: block;
          }
        }
      }
    }
  }
  .el-dialog {
    width: 80% !important;
  }
  .el-transfer {
    width: 100%;
  }
  .el-transfer .el-transfer-panel {
    width: 42% !important;
  }
}
</style>
