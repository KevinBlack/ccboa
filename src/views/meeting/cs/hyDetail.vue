<!--
 * @Author: your name
 * @Date: 2020-08-03 14:12:57
 * @LastEditTime: 2020-10-13 14:46:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\cs\fkDetail.vue
--> 
/**
* create by zz on 2020/8/3 14:00
* 类注释：
* 备注：参数维护/会议系统配置/详情
*/
<template>
  <div class="hyDetail">
    <div class="headerClick">
      <!-- <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}</el-button>
      </div>
    </div>
    <div class="hyHeader">
      <div class="title-text">会议系统配置</div>
    </div>
    <fd-form
      v-if="!isEdit"
      style="margin:0 10%;"
      :data="formData"
      @event="itemClick"
      :columns="formCfg"
    ></fd-form>
    <fd-form
      v-else
      style="margin:0 10%;"
      :config="{labelWidth:'200px'}"
      :data="formData"
      @event="itemClick"
      @submit="formSubmitNormal"
      :columns="formCfg"
    ></fd-form>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
   
      <template>
        <el-transfer v-model="value" :data="data"></el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
      </el-dialog>-->
      <div class="right">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item)"
          :key="index"
          size="mini"
          plain
        >{{item}}</el-button>
      </div>
    </div>
    <div class="hyHeader">
      <div class="title-text">会议系统配置</div>
    </div>
    <el-form :model="formData" label-width="120px" style="padding:0 20%">
      <el-row>
        <el-col>
          <el-form-item label="机构名称">
            <el-input v-model="formData.scUnit" disabled></el-input>
            <!-- <el-select v-model="formData.scUnit" :disabled="isEdit">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="可填写签发意见的岗位">
            <el-input v-model="formData.mainSend" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="choose" type="primary" style="float:right" :disabled="isEdit">选择</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 可填写签发意见的岗位 -->
    <cy-person-list
      v-model="showCyPerson"
      title="选择可填写签发意见的岗位"
      :isSingle="false"
      :data="cyData"
      @personList="cyPersonList"
    ></cy-person-list>
  </div>
</template>

<script type="text/ecmascript-6">
import cyPersonList from "../../bianhan/components/cyPersonList";
// import FdForm from "vue-elementui-freedomen/components/form";
export default {
  name: "hyDetail",
  components: {
    cyPersonList
  },
  data () {
    // const generateData = _ => {
    //     const data = [];
    //     for (let i = 1; i <= 15; i++) {
    //       data.push({
    //         key: i,
    //         label: `备选项 ${ i }`,
    //         disabled: i % 4 === 0
    //       });
    //     }
    //     return data;
    //   };
    return {
      isEdit: true,
      buttonList: ["关闭", "编辑"],
      formData: {
      },
      // options: [
      //   {
      //     label: '总行',
      //     key: 's'
      //   }
      // ],
      gArr: [],
      gObj: {},
      // 可填写签发意见的岗位
      showCyPerson: false,
      cyData: [],
      id: ''
      // };
    };
  },
  computed: {},
  methods: {
    // setEditFormCfg () {
    //   this.formCfg = [
    //     { type: 'select', prop: 'scUnit', label: '机构名称', options: { 1: "qwer", 2: "df" }, span: 10, },
    //     { type: 'input', prop: 'mainSend', label: '可填写签发意见的岗位', span: 10, },
    //     { type: 'button-primary', value: '选择', prop: '$submit', span: 4 }
    //   ]
    // },
    // setDetFormCfg () {
    //   this.formCfg = [
    //     { type: "input", prop: "scUnit", label: "机构名称", span: 10, disabled: true },
    //     { type: "input", prop: "mainSend", label: "可填写签发意见的岗位", span: 10, disabled: true },
    //   ]
    // },
    // handleClose (done) {
    //   // console.log(this.value)
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();

    //     })
    //     .catch(_ => { });
    // },
    // formSubmitNormal (params) {
    //   // alert("提交的数据为" + JSON.stringify(params))
    //   this.dialogVisible = true
    // },
    // sure () {
    //   this.formData.mainSend = this.value.join(',')
    //   this.dialogVisible = false
    // },
    buttonClick (params) {
      switch (params) {
        case "编辑":
          this.isEdit = false
          this.buttonList = ["关闭", "保存"];
          // this.setEditFormCfg()
          break;
        case "保存":
          if (this.formData.scUnit && this.formData.mainSend) {
            this.isEdit = true;
            this.buttonList = ["关闭", "编辑"];
            // this.setDetFormCfg()
            // console.log(44444444, this.formData)
            this.$api.meeting.setUpdate(this.formData)
              .then(res1 => {
              })
          } else {
            this.$message({
              message: '机构名称、可填写签发意见的岗位不能为空',
              type: 'warning'
            });
          }

          break;
        case "关闭":
          this.$router.push('/meeting/cs/hy');
          break;
      }
    },
    choose () {
      this.toNext();
    },
    toNext () {
      this.gArr = []
      let st = localStorage.getItem('st')
      this.$api.setting.workFlow.getPostList({ st }).then(res => {
        let newArr = res.data
        newArr.forEach((item, index) => {
          this.gObj = {}
          this.gObj.name = item.codeName
          this.gObj.id = item.dicId
          this.gArr.push(this.gObj)
        })
        this.cyData = this.gArr;
        this.showCyPerson = true;
      })
    },
    cyPersonList (data) {
      let ids = [];
      let names = []
      data.map(item => {
        ids.push(item.id)
        names.push(item.name)
      })
      this.formData.mainSend = names.join(',')
      this.formData.mainSendId = ids.join(',')
    },
    loadData () {
      this.$api.meeting.settingDetail1({
        id: this.id
      }
      )
        .then(res1 => {
          // console.log(res1)
          // this.userId=res1.meetHyglSystemConfigDo.updateUserId
          this.formData = res1.meetHyglSystemConfigDo
          // this.formData.station = res1.meetHyglSystemConfigDo.mainSend


        })
      // console.log(1111111111, this.formData)

    },
    itemClick () { },
  },
  activated () { },
  mounted () { },
  created () {
    // this.isEdit = false;
    // this.setDetFormCfg()
    this.id = this.$route.query.id
    this.loadData()
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.hyDetail {
  background: white;
  margin: 0 auto;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-left: 20px;
      float: left;
    }
  }
  .hyHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>

