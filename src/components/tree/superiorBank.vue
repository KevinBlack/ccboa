
<!--发上级行选择树（部门&&环节）-->
<template>
  <div class="orgTree">
    <el-dialog
      :title="title"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      v-loading="loading"
    >
<!--    <div v-if="superbankOffenUse">-->
<!--      <div>选择下一处理环节</div>-->
<!--      <el-select-->
<!--        @change="getSelectInfo"-->
<!--        class="selectlist"-->
<!--        v-model="nextNodeId"-->
<!--        :placeholder='seletOptionsData[0].AVYNODENM'-->
<!--      >-->
<!--        <el-option-->
<!--          v-for="item in seletOptionsData"-->
<!--          :key="item.PCSAVYID"-->
<!--          :label="currentHuanjie"-->
<!--          :value="item.PCSAVYID"-->
<!--        ></el-option>-->
<!--      </el-select>-->
<!--     </div>-->
      <el-col :span="12">
        <div class="title">
        </div>
        <div class="tree_w box_shadow">

          <el-scrollbar>
            <el-tree
              ref="elTree"
              :props="props"
              show-checkbox
              :check-on-click-node="false"
              :check-strictly="true"
              :expand-on-click-node="false"
              @check="checkTree"
              node-key="id"
              :load="loadNode"
              lazy
            ></el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title">
          <span>已选项</span>
          <el-button
            type="primary"
            @click.native="resetCheck"
            style="float:right"
            size="mini"
            :disabled="nowCheckList.length==0"
            round
          >清空
          </el-button>
        </div>
        <div class="box_shadow tree_w">
          <el-scrollbar>
            <div v-for="(item,index) in nowCheckList" :key="index">
              <template>
                <div class="command_wrap">
                  <span class="name">{{item.unitName}}</span>
                  <div class="one_btn">
                    <el-button type="warning" size="mini" @click.native="deleteRow(index)" round>删除</el-button>
                  </div>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "orgTree",
        components: {},
        props: {
          //发送上级行隐藏下一环节处理下拉框 author:yangnajuan
          superbankOffenUse:{
              type:Boolean
          },

          seletOptionsData: {
                default: () => {
                    return [];
                },
                type: Array
            },
            title: {type: String, default: "发上级行"},
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
            treeType:{//可随意自定义字段，用于区分那个页面引用的该组件
              type:String,
              default(){
                return ''
              }
            },
            isSingle: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            //是否查询全部
            isSearchAll: {
                type: Boolean,
                default() {
                    return false
                }
            },
            //机构或者部门 机构为1，部门为0
            orgOrDept: {
                type: Number,
                default: 0
            },
            //部门或者机构id
            orgOrDeptId: {
                // default: () => {
                //     return [];
                // },
                type: String,
                default: JSON.parse(localStorage.getItem("userInfo")).unitId
            },
            //事物审批上级部门或者机构id
            upOrgOrDeptId: {
                // default: () => {
                //     return [];
                // },
                type: String,
                default: ""
            },
            //type为all时，拉取一级部门与机构 ,""拉取只拉去部门或者机构
            type: {
                type: String,
                default: ""
            },
            //条件查询机构级别    up:上级   low:下级  peer:同级 ''其他
            queryType:{
                type:String,
                default:"up"
            },
              //需要返回一级部门(dept1)
            opType: {
                type: String,
                default: ""
            },
        },
        data() {
            return {
                currentNode:'',//环节name
                nextNodeId:'',//环节ID
                loading: false,
                props: {
                    children: "children",
                    label: "unitName",
                    isLeaf: "leaf"
                },
                dialogVisible: false,
                nowCheckList: [],
                deparObj:{},
                deparId:'',
                currentHuanjie:'',
                isClickStr:''//是否可点击，不可点击传‘false’

            }
        },
        watch: {
            dialogVisible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.dialogVisible = val
            },
        },
        computed: {},
        methods: {
            getSelectInfo(){
              //seletOptionsData有可能为空，所以加了个判断。刘询说发上级行的时候那个list返回为空 author：yangnajuan 2020-12-24
               if(this.seletOptionsData.length!=0){
                let that = this
                this.seletOptionsData&&this.seletOptionsData.map(item=>{
                    if(that.nextNodeId==item.PCSAVYID){
                        that.currentNode=item.AVYNODENM

                    }
                })
                // deparObj = this.seletOptionsData.find(item => {
                //     return item.PCSAVYID === this.offenUseConfig.nextNodeId;
                // });
               }
            },
            loadNode(node, resolve) {
                this.loading = true
                if(this.treeType==='sw'&&node.level==1){
                  //事物审批发上级行仅展示一二级数据
                  this.isClickStr='false';
                }else{
                  this.isClickStr='';
                }
                // if (this.isSearchAll) {
                //     this.$api.setting.organization.getAllOrgOrDept({
                //         type: this.orgOrDept,
                //         unitCode:this.orgOrDeptId,
                //     }).then((res) => {
                //         this.loading = false
                //         let data = []
                //         res.data.map(item => {
                //             data.push({unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit})
                //         })
                //         return resolve(data);
                //     }).catch(err => {
                //         this.loading = false
                //     });
                // } else {
                //     this.$api.setting.organization.getTree({
                //         unitClass: this.orgOrDept,
                //         unitCode: node.data ? node.data.id : this.orgOrDeptId,
                //         type: this.type,
                //         queryType:this.queryType
                //     }).then((res) => {
                //         this.loading = false
                //         let data = []
                //         res.data.map(item => {
                //             data.push({unitName: item.unitName, id: item.unitCode, leaf: item.lastUnit})
                //         })
                //         return resolve(data);
                //     }).catch(err => {
                //         this.loading = false
                //     });
                // }

                 if (this.isSearchAll) {
                    this.$api.setting.organization
                        .getTree({
                            unitClass: this.orgOrDept,
                            searchType: 'dept-peer',
                            unitCode: node.data ? node.data.id : this.orgOrDeptId,
                            type: this.type,
                            queryType: this.queryType,
                            opType: this.opType,
                            seletSelf: node.data ? node.data.seletSelf : this.seletSelf,
                            isClickStr:this.isClickStr,//是否可点击，不可点击传‘false’
                        })
                        .then(res => {
                            console.log('发送上级行----->', res.data[0].unitCode)
                            this.$api.setting.organization
                                .getTree({
                                    unitClass: '0',
                                    searchType: 'dept-peer',
                                    unitCode: this.upOrgOrDeptId?this.upOrgOrDeptId:res.data[0].unitCode,
                                    type: res.data[0].type,
                                    queryType: 'peer',
                                    opType: res.data[0].opType,
                                    seletSelf: res.data[0].seletSelf,
                                })
                                .then(res => {
                                  this.loading = false;
                                  let data = [];
                                  res.data.map(item => {
                                      data.push({
                                          unitName: item.unitName,
                                          id: item.unitCode,
                                          leaf: item.lastUnit,
                                          deptType: item.deptType,
                                          isSyn: item.isSyn,
                                          unitClass: item.unitClass, //0:部门 1：机构 在信息刊物发布信息使用
                                      });
                                  });
                                  console.log('获取接口返回数据1----->', res.data)
                                  if(node.level==0){
                                      this.treeDateStore=res.data;
                                  }
                                  this.searchType = res.searchType;
                                  this.$refs.elTree.setCheckedNodes(this.nowCheckList);
                                  return resolve(data);
                                })
                        })
                        .catch(err => {
                            this.loading = false;
                        });
                } else {
                    this.$api.setting.organization
                        .getTree({
                            unitClass: this.orgOrDept,
                            searchType: 'dept-peer',
                            unitCode: node.data ? node.data.id : this.orgOrDeptId,
                            type: this.type,
                            queryType: this.queryType,
                            opType: this.opType,
                            seletSelf: node.data ? node.data.seletSelf : this.seletSelf,
                            isClickStr:this.isClickStr,//是否可点击，不可点击传‘false’
                        })
                        .then(res => {
                          this.loading = false;
                          let data = [];
                          res.data.map(item => {
                              data.push({
                                  unitName: item.unitName,
                                  id: item.unitCode,
                                  leaf: item.lastUnit,
                                  deptType: item.deptType,
                                  isSyn: item.isSyn,
                                  unitClass: item.unitClass, //0:部门 1：机构 在信息刊物发布信息使用
                              });
                          });
                          console.log('获取接口返回数据1----->', res.data)
                          if(node.level==0){
                              this.treeDateStore=res.data;
                          }
                          this.searchType = res.searchType;
                          this.$refs.elTree.setCheckedNodes(this.nowCheckList);
                          return resolve(data);
                        })
                        .catch(err => {
                            this.loading = false;
                        });
                }

            },
            checkTree(now, check, hascheck) {
                if (this.isSingle) {
                    this.$refs.elTree.setCheckedKeys([now.id]);
                }
                this.deparId=now.id
                this.$api.checkLz.iFmultipleDepar(
                    {
                        id:now.id
                    }
                ).then(res => {
                    if(!res.isHaveDeptZH){
                        this.$message({
                            type:'warning',
                            message:'此部门没有部门综合'
                        })
                    }else{
                        this.deparPer()
                        this.nowCheckList = this.$refs.elTree.getCheckedNodes();
                        this.nowCheckList[0].PCSAVYID=this.nextNodeId

                    }
                })
            },
            //通过部门id，请求人员详情
            deparPer(){
                this.$api.checkLz.multipleDeparPer(
                    {
                        unitCode:this.deparId
                    }
                ).then(res => {
                    this.nowCheckList[0].currentNode=this.currentNode
                    this.nowCheckList[0].deparObj=res.data.unitAndConfig
                })
            },
            deleteRow(index) {
                this.$refs.elTree.setChecked(this.nowCheckList[index], false);
                this.nowCheckList.splice(index, 1);
            },
            resetCheck() {
                this.$refs.elTree.setCheckedKeys([]);
                this.nowCheckList = [];
            },
            sure() {

                if(!this.currentNode&&!this.deparId){
                    this.$message({
                        type:'warning',
                        message:'请选择环节和部门'
                    })
                }else{
                  //如果seletOptionsData为空的话，这两个字段赋值为空，因为不确定有没有其他页面引用该组件，所以加判断，没有删除这两个字段。 author：yangnajuan 2020-12-24
                  if(this.seletOptionsData.length==0){
                    this.nowCheckList[0].PCSAVYID=''
                    this.nowCheckList[0].currentNode=''
                  }else{
                    this.nowCheckList[0].PCSAVYID=this.seletOptionsData[0].PCSAVYID
                    this.nowCheckList[0].currentNode=this.seletOptionsData[0].AVYNODENM
                  }

                    if (this.isSingle)
                        this.$emit("orgList", this.nowCheckList[0])
                    else
                        this.$emit("orgList", this.nowCheckList)
                    this.resetCheck()
                    this.dialogVisible = false
                }
            },
        },
        activated() {
        },
        mounted() {
        },
        created() {
        },
        beforeUpdate() {
          //seletOptionsData有可能为空，所以加了个判断。刘询说发上级行的时候那个list返回为空 author：yangnajuan 2020-12-24
          if(this.seletOptionsData.length!=0){
            this.currentHuanjie=this.seletOptionsData[0].AVYNODENM
            console.log('seletOptionsData',this.seletOptionsData)
          }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .title {
    font-size: 16px;
    color: #303133;
    margin-bottom: 10px;
    overflow: hidden;
    height: 28px;
  }

  .el-scrollbar {
    height: 100%;
  }

  .tree_w {
    max-width: 440px;
    height: 400px;
    padding-left: 20px;
  }

  .box_shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  .command_wrap {
    display: flex;
    justify-content: space-between;
    min-width: 300px;

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
      width: 280px;
      overflow: hidden;
    }
  }
  .selectlist {
    width: 100%;
    padding: 20px 0;
  }
</style>
