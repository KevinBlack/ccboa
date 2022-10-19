<template>
  <div class="save">
    <div class="saveHeader">
      <div class="title-text">印章系统配置</div>
    </div>
    <el-button v-if="!isSave" type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
    <el-button v-else type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
    <el-button type="primary" style="margin-left:20px;" @click="colose_btn">关闭</el-button>
    <div class="elementForm">
      <el-form ref="elForm" :model="mformData" label-width="180px">
<!--        <el-row>-->
<!--          <el-col :span="16">-->
<!--            <el-form-item label="" >-->
<!--              <el-input v-model="mformData.scUnitName"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <el-row>
           <el-col :span="14">
            <el-form-item label="※">
            <span style="color:red;font-weight: 700;">以下信息分隔符请用英文逗号“,”分隔!</span>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="机构名称">
              <el-input v-model="mformData.scUnitName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:24px">
            <el-button type="primary" @click="AselectOrg">选择</el-button>

          </el-col>
        </el-row>
        <el-row>
        <el-col :span="16">
          <el-form-item label="印章类别" >
            <el-input v-model="mformData.scUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left:24px">
          常规用印审批中，印章类别字段取值
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="公文，介绍信印章类别">
              <el-input v-model="mformData.scUnit2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            公文，介绍信印章类别字段取值
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="16">
            <el-form-item label="印章刻制类别（总行）">
              <el-input v-model="mformData.scFiletypeZh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            总行印章刻制类别字段取值
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="16">
            <el-form-item label="印章刻制类别">
              <el-input v-model="mformData.scFiletype"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            非总行印章刻制类别字段取值
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="常规用印审批用印性质">
              <el-input v-model="mformData.scFiletypeHw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            常规用印审批用印性质字段取值
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="经办人承诺">
              <el-input v-model="mformData.scStype"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            常规用印审批，经办人承诺默认意见取值
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="介绍信有效天数" >
              <el-input v-model="mformData.scSlevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:16px">
            天
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="发往单位类型">
              <el-input v-model="mformData.scSlimit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="废止原因">
              <el-input v-model="mformData.bjLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            印章废止原因字段取值
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="印章状态">
              <el-input v-model="mformData.haltMonths"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            印章登记，印章状态字段取值
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="维护类型">
              <el-input v-model="mformData.scEwm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            用印设备维护，维护类型字段取值
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="填写说明" >
              <el-input type="textarea" v-model="mformData.txsm" :rows="3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
              印章保管人登记，填写说明
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="归档打印次数">
              <el-input v-model="mformData.printno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:14px">
            份
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="印章名称">
              <el-input type="textarea" v-model="mformData.markName" :rows="3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            部门用印审批单中，印章名称字段取值
          </el-col>
        </el-row>
<!--退回原因-->
        <el-row>
          <el-form-item label="是否开启回退原因选择">
            <el-radio-group v-model="mformData.isOpenBackoutReason" @change="backReason">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="isBackReason">
          <el-col :span="16">
            <el-form-item label="回退原因">
              <el-input type="textarea" v-model="mformData.backoutReason" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--二维码功能-->
        <el-row>
          <el-form-item label="是否启用二维码功能">
            <el-radio-group v-model="mformData.isErweima" @change="twoCode">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="isCode">
          <el-col :span="16">
            <el-form-item label="启用二维码印章类别" >
              <el-input v-model="mformData.ewmMarkType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isCode">
          <el-form-item label="启用二维码用印类型" >
            <el-checkbox-group v-model="mformData.ewmMarkFlow" >
              <el-checkbox v-for="item in codemessage" :label="item.name" :key="item.id" :value="item.value"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row v-if="isCode">
          <el-col :span="16">
            <el-form-item label="二维码主体和事项字数总和">
              <el-input v-model="mformData.ewmZsTotal"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isCode">
          <el-col :span="16">
            <el-form-item label="二维码主体字数">
              <el-input v-model="mformData.ewmZtzs"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isCode">
          <el-col :span="16">
            <el-form-item label="二维码事项字数">
              <el-input v-model="mformData.ewmSxzs"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--开启用印业务管理控制-->
        <el-row>
          <el-form-item label="开启用印业务管理控制">
            <el-radio-group v-model="mformData.isYygl" @change="manCto">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="isManCto">
          <el-col :span="16">
            <el-form-item label="合法性审查意见采纳意见">
              <el-input type="textarea" v-model="mformData.hfSc" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isManCto">
          <el-col :span="16">
            <el-form-item label="业务事项有权签字人审批情况">
              <el-input type="textarea" v-model="mformData.qzSp" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isManCto">
          <el-col :span="16">
            <el-form-item label="是否属于业务归档范围">
              <el-input type="textarea" v-model="mformData.isGdfw" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isManCto">
          <el-col :span="16">
            <el-form-item label="有权签字人授权确认签字">
              <el-input type="textarea" v-model="mformData.sqQz" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--        -->
        <el-row>
          <el-col :span="16">
            <el-form-item label="是否开启提示">
              <el-radio-group v-model="mformData.isSendupbbgr">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            支行交接时向上级行印章保管人发送代办事宜
          </el-col>
        </el-row>
<!--     内设部门编号开启     -->
        <el-row>
          <el-col :span="16">
            <el-form-item label="内设部门编号开启">
              <el-radio-group v-model="mformData.isDeptinternalno">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-form-item label="编号方式">
              <el-radio-group v-model="mformData.deptinternalnoType">
                <el-radio label="1">按机构编号</el-radio>
                <el-radio label="2">按拟稿一级部门编号</el-radio>
                <el-radio label="3">按拟稿部门编号</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="编号范围">
            <el-checkbox-group v-model="mformData.deptinternalnoRange">
              <el-checkbox v-for="item in numRange" :label="item.name" :key="item.id" :value="item.value"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否开启空缺号">
            <el-radio-group v-model="mformData.isCheckNum">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
<!--        保管机构-->
        <el-row>
          <el-col :span="16">
            <el-form-item label="印章集中保管位置">
              <el-radio-group v-model="mformData.focusKeepLevel" @change="keepUnit">
                <el-radio label="1">默认</el-radio>
                <el-radio label="2">一级机构</el-radio>
                <el-radio label="3">指定机构</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left:24px">
            该功能主要用于解决三级机构印章非保管在上级行情况（无特殊情况的机构请选择‘默认’选项）
          </el-col>
        </el-row>
        <el-row style="margin-top:20px" v-if="iskeepUnit">
          <el-col :span="14">
            <el-form-item label="指定机构">
              <el-input v-model="mformData.keepUnit" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:24px">
            <el-button type="primary" @click="selectOrg">选择</el-button>
          </el-col>
        </el-row>


      </el-form>
    </div>
    <org-tree v-model="showOrgTree"
              :title="title"
              :isSingle="isSingle"
              :orgOrDept="orgOrDept"
              :orgOrDeptId="orgOrDeptId"
              @orgList="getOrgList" />
  </div>
</template>

<script type="text/ecmascript-6">
    import orgTree from 'components/tree/shiwuOrgTree'
    export default {
        name: 'save',
        components: {
            orgTree
        },
        props: {},
        data() {
            return {
                cList:[],
                codemessage:[
                        {name:'常规用印审批',id:'1',value:'常规'},
                        {name:'公文用印登记',id:'2',value:'公文'},
                        {name:'介绍信审批',id:'3',value:'介绍信'},
                        {name:'部门用印审批',id:'4',value:'部门'},
                ],
                numRange:[
                        {name:'常规用印审批',id:'1',value:'常规用印审批'},
                        {name:'部门用印审批',id:'2',value:'部门用印审批'},
                        {name:'印章销毁审批',id:'3',value:'印章销毁审批'},
                        {name:'公文用印登记',id:'4',value:'公文用印登记'},
                        {name:'印章刻制审批',id:'5',value:'印章刻制审批'},
                        {name:'印章保管交接',id:'6',value:'印章保管交接'},
                        {name:'介绍信审批',id:'7',value:'介绍信审批'},
                        {name:'印章废止审批',id:'8',value:'印章废止审批'},
                        {name:'用印机设备维护审批',id:'9',value:'用印机设备维护审批'},
                ],
                title: '选择部门',
                showOrgTree: false,
                isSingle: false,
                orgOrDept: 1,
                orgOrDeptId: '0',
                isSave:'',
                mformData: {
                    ewmMarkFlow:[],
                    isErweima:'0',
                    deptinternalnoRange:[],
                    isDeptinternalno:'0',
                    isSendupbbgr:'0',
                    focusKeepLevel:'1',
                    isYygl:'0',
                    isOpenBackoutReason:'0'
                },
                rules:[],
                id:'',
                isChoose:'1',//选择机构
                iskeepUnit:false,//指定机构
                isCode:false,//二维码
                isManCto:false,//用印管理控制
                isBackReason:false,//退回原因
            }
        },
        computed: {},
        methods: {
            backReason(){
                if(this.mformData.isOpenBackoutReason==='1'){
                    this.isBackReason=true
                }else{
                    this.isBackReason=false
                }

            },
            selectOrg() {
                this.isChoose='2'
                this.title = '选择机构'
                this.isSingle = true
                this.orgOrDept = 1
                this.orgOrDeptId = '0'
                this.showOrgTree = true
            },
            AselectOrg(){
                this.isChoose='1'
                this.title = '选择机构'
                this.isSingle = true
                this.orgOrDept = 1
                this.orgOrDeptId = '0'
                this.showOrgTree = true
            },
            //获取机构树
            getOrgList(org) {
                console.log("-------org------",org)
                if (this.orgOrDeptId == '0') {
                    if(this.isChoose=='1'){
                        this.$nextTick(()=>{
                            this.$set(this.mformData, 'scUnitName', org.unitName)
                            this.$set(this.mformData, 'scUnitId', org.id)
                        })
                    }else if(this.isChoose=='2'){
                        this.$nextTick(()=>{
                            this.$set(this.mformData, 'keepUnit', org.unitName)
                            this.$set(this.mformData, 'keepUnitId', org.id)
                        })
                    }
                }
            },
            edit_btn() {
                this.isSave = false
                console.log('isSave', this.isSava)
            },
            //指定机构
            keepUnit(){
                if(this.mformData.focusKeepLevel=='3'){
                    this.iskeepUnit=true
                }else{
                    this.iskeepUnit=false
                }
            },
            //判断二维码
            twoCode(){
                if(this.mformData.isErweima=='1'){
                    this.isCode=true
                }else{
                    this.isCode=false
                }
            },
            manCto(){
                if(this.mformData.isYygl=='1'){
                    this.isManCto=true
                }else{
                    this.isManCto=false
                }
            },
            //请求详情
            queryDeal() {
                this.$api.sealManage
                    .userConDeal({
                        id: this.id
                    })
                    .then((res) => {
                        this.mformData=res.data
                        if(this.mformData.ewmMarkFlow){
                            this.mformData.ewmMarkFlow=this.mformData.ewmMarkFlow&&this.mformData.ewmMarkFlow.split("#")
                        }else{
                            this.$set(this.mformData,'ewmMarkFlow',[])
                            // this.mformData.ewmMarkFlow=[]
                        }
                        console.log("----this.mformData.ewmMarkFlow---->",this.mformData.ewmMarkFlow)
                        if(this.mformData.deptinternalnoRange){
                            this.mformData.deptinternalnoRange=this.mformData.deptinternalnoRange&&this.mformData.deptinternalnoRange.split("#")
                        }else{
                            this.mformData.deptinternalnoRange=[]
                        }
                        //二维码
                        if(this.mformData.isErweima=='1'){
                            this.isCode=true
                        }else{
                            this.isCode=false
                        }
                        //制定机构
                        if(this.mformData.focusKeepLevel=='3'){
                            this.iskeepUnit=true
                        }else{
                            this.iskeepUnit=false
                        }
                        //用印管理控制
                        if(this.mformData.isYygl=='1'){
                            this.isManCto=true
                        }else{
                            this.isManCto=false
                        }
                        //回退原因
                        if(this.mformData.isOpenBackoutReason==='1'){
                            this.isBackReason=true
                        }else{
                            this.isBackReason=false
                        }
                    })
            },
            colose_btn() {
                this.$router.go(-1)
            },
            //保存数据
            save_btn() {
                this.mformData.ewmMarkFlow=this.mformData.ewmMarkFlow&&this.mformData.ewmMarkFlow.join("#")
                this.mformData.deptinternalnoRange=this.mformData.deptinternalnoRange&&this.mformData.deptinternalnoRange.join("#")
                this.$api.sealManage.userConCreate({
                        ...this.mformData
                    })
                    .then((res) => {
                        if(res.code=='SUCCESS'){
                            this.$message({
                                type:'success',
                                message:'保存成功'
                            })
                            this.$router.back()
                        }
                    }).catch((error)=>{
                        this.queryDeal()
                })
            },

        },

        mounted() {
           // setTimeout(()=>{
           //     this.mformData.isErweima='1'
           //     if(this.mformData.isErweima=='1'){
           //         this.isCode=true
           //     }
           //     console.log("000000000",this.isCode)
           // },0)
           //  this.$nextTick(()=>{
           //  })
        },
        created() {
          if(this.$route.query&&this.$route.query.id){
              this.id=this.$route.query.id
              this.queryDeal()
          }
        },
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .save {
    background: white;
    margin: 0 auto;
    

    .saveHeader {
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

    .process_content {
      width: 80%;
      min-height: 920px;
      padding: 20px 16px;
      margin: 0 auto;

      .bottom-span {
        display: block;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }

  .elementForm {
    width: 90%;
    margin: 0 auto;
    margin-top: 36px;
  }

  //上传附件
  .tree_w {
    height: 200px;
    padding: 20px;
    overflow: scroll;
    margin: 20px 0 0 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .command_file {
      display: flex;
      justify-content: space-between;
      min-width: 300px;
      font-size: 14px;

      .one_btn {
        width: 80px;
        height: 42px;
        line-height: 42px;
      }

      .btns {
        width: 300px;
        height: 42px;
        line-height: 42px;
        white-space: nowrap;
      }

      .name {
        white-space: nowrap;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        text-overflow: ellipsis;
        width: 200px;
        overflow: hidden;
      }

      .down {
        cursor: pointer;
      }

      .down:hover {
        color: #3b85ef;
      }
    }
  }
</style>

