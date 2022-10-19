/**自定义导出dialog */
<template>
      <el-dialog v-dialogDrag :visible.sync="dialogVisible"  @close="handleClose">
      <div slot="title" class="custom_title">{{title}}<span>请勾选需要导出列</span></div>
        <el-row>
          <el-col class="check_area">
            <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                <span class="check_area_title">文件状态</span>
                <el-checkbox :indeterminate="isStateCheck" v-model="isStateAll" @change="handleStateAll">全选</el-checkbox>
              </el-col>
              <el-checkbox-group v-model="stateList" @change="stateChange">
                <el-col v-for='item in stateListData' :key='item.prop' :span="item.width" :offset="item.offset">
                    <el-checkbox :label="item.label" :prop="item.prop"></el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-col>
          <el-col class="check_area">
            <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                <span class="check_area_title">文件要素</span>
                <el-checkbox :indeterminate="isElementCheck" v-model="isElementAll" @change="handleElementAll">全选</el-checkbox>
              </el-col>
              <el-checkbox-group v-model="elementList" @change="elementChange">
                <el-col v-for='item in elementListData' :key='item.prop' :span="item.width" :offset="item.offset">
                    <el-checkbox :label="item.label" :prop="item.prop"></el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-col>
          <el-col class="check_area">
            <el-row>
              <el-col :span="24" style="margin-bottom:10px;">
                <span class="check_area_title">发送对象</span>
                <el-checkbox :indeterminate="isObjCheck" v-model="isObjAll" @change="handleObjAll">全选</el-checkbox>
              </el-col>
              <el-checkbox-group v-model="objList" @change="objChange">
                <el-col v-for='item in objListData' :key='item.prop' :span="item.width" :offset="item.offset">
                    <el-checkbox :label="item.label" :prop="item.prop"></el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-row>
          </el-col>
        </el-row>
 
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
        <el-button type="primary" @click="handleSaveCustom">导 出</el-button>
      </span>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
export default {
  name: "exportself",
  components: {},
  props: {
    title: { type: String, default: "自定义导出列" },
    dialogState:{type:Boolean,default:false},
    dialogWidth: {
      type: String,
      default: '80%'
    },
    stateLists:{
        type:Array,
        default(){
            return ['当前环节','操作人']
        }
    },
    stateListDatas:{
        type:Array,
        default(){
            return [{label:'当前环节',prop:'currentNode'},
                    {label:'操作人',prop:'currentUser'}]
        }
    },
    elementLists:{
        type:Array,
        default(){
            return ['拟稿日期','拟稿部门','编号','类型','标题','承办部门']
        }
    },
    elementListDatas:{
        type:Array,
        default(){
            return [{label:'拟稿日期',prop:''},
                    {label:'拟稿部门',prop:''},
                    {label:'抄送',prop:''},
                    {label:'编号',prop:''},
                    {label:'类型',prop:''},
                    {label:'拟稿人',prop:''},
                    {label:'标题',prop:''},
                    {label:'反馈方式',prop:''},
                    {label:'联系电话',prop:''},
                    {label:'承办部门',prop:''},
                    {label:'主送',prop:''},
                    {label:'附件标题',prop:''}]
        }
    },
    objLists:{
        type:Array,
        default(){
            return []
        }
    },
    objListDatas:{
        type:Array,
        default(){
            return [{label:'传阅人员未阅',prop:'currentNode'},
                    {label:'传阅人员已阅',prop:'currentUser'}]
        }
    }
  },
  watch: {
      dialogState(newVal,old){
          this.dialogVisible=newVal;
      }
  },
  data () {
    return {
      stateList:this.stateLists,
      stateListData:this.stateListDatas,
      elementList:this.elementLists,
      elementListData:this.elementListDatas,
      objList:this.objLists,
      objListData:this.objListDatas,
      dialogVisible: false,
      isStateCheck:false,
      isStateAll:false,
      isElementCheck:false,
      isElementAll:false,
      isObjCheck:false,
      isObjAll:false,
    }
  },
  computed: {
  },
  methods: {
    handleClose(){
        this.dialogVisible = false;
        this.$emit("handleClose", this.dialogVisible);
    },
    handleData(data){
     let Data=data.map((item,index)=>{
            switch(index%3){
                case 0:
                    item={...item,width:8,offset:1};
                    break;
                case 1:
                    item={...item,width:8,offset:0};
                    break;
                case 2:
                    item={...item,width:7,offset:0};
                    break;
                default:
                    item={...item,width:8,offset:0};
                    break;

            }
          return item;
         }) 
    return Data;
    },
    handleStateAll(val) {
      let that = this;
      that.stateList = [];
      if (val) {
        that.stateListData.forEach((item => {
          that.stateList.push(item.label)
        }))
        console.log(that.stateList)
      } else {
        that.stateList = [];
      }
      that.isStateCheck = false;
    },
    stateChange(val) {
      let checkedCount = val.length
      this.isStateAll = checkedCount === this.stateListData.length
      this.isStateCheck = checkedCount > 0 && checkedCount < this.stateListData.length
    },
    handleElementAll(val) {
      let that = this;
      that.elementList = [];
      if (val) {
        that.elementListData.forEach((item => {
          that.elementList.push(item.label)
        }))
        console.log(that.elementList)
      } else {
        that.elementList = [];
      }
      that.isElementCheck = false;
    },
    elementChange(val) {
      let checkedCount = val.length
      this.isElementAll = checkedCount === this.elementListData.length
      this.isElementCheck = checkedCount > 0 && checkedCount < this.elementListData.length
    },
    handleObjAll(val) {
      let that = this;
      that.objList = [];
      if (val) {
        that.objListData.forEach((item => {
          that.objList.push(item.label)
        }))
        console.log(that.objList)
      } else {
        that.objList = [];
      }
      that.isObjCheck = false;
    },
    objChange(val) {
      let checkedCount = val.length
      this.isObjAll = checkedCount === this.objListData.length
      this.isObjCheck = checkedCount > 0 && checkedCount < this.objListData.length
    },
    handleSaveCustom(){
       this.checkList = [].concat(this.stateList, this.elementList, this.objList)
      if (this.checkList.length<1) {
        this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请选择导出字段!",
            duration: 1500,
          })
          return;
      }
      this.$emit('handleSaveCustom', this.checkList)
    }
  },
  activated () {
  },
  mounted () {
      this.elementListData=this.handleData(this.elementListData);
      this.stateListData=this.handleData(this.stateListData);
      this.objListData=this.handleData(this.objListData);
      if(this.stateList.length===this.stateListData.length){
      this.isStateCheck=true;
      this.isStateAll=true;
      }
      if(this.stateList.length===this.stateList.length){
      this.isElementCheck=true;
      this.isElementAll=true;
      }
      if(this.stateList.length===this.stateList.length){
      this.isObjCheck=true;
      this.isObjAll=true;
      }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
/deep/ .check_area {
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
  .check_area_title {
    font-weight: bold;
    margin-right: 20px;
  }
}
.custom_title {
  color: #fff;
  font-weight: 700;
  line-height: 24px;
  font-size: 18px;
  span {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style> 