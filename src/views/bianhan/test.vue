<!--
 * @Author: liyaling
 * @Date: 2020-11-10 10:36:10
 * @LastEditTime:
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\MenuPermissionConfig\permissionAssignment\unauthorized.vue
-->
<template>
    <div class="permissionAssignment">
      <div class="unauthorizedTable">
        <div class="unauthorizedTitle">菜单权限配置</div>
        <el-scrollbar class="">
          <el-row>
            <el-col :span="12">
              <el-radio-group v-model="radio"  @change="change">
                <el-radio :label="1">总行</el-radio>
                <el-radio :label="0">非总行</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12"><div class="buttons">
              <el-button type="primary" @click="openDialog">授权</el-button>
            </div></el-col>
          </el-row>
          <el-row>
            <div v-show="radio===1">
              <el-tree
                show-checkbox
                :check-on-click-node="true"
                node-key="id"
                ref="tree1"
                highlight-current
                :load="loadMenus1"
                      lazy
                :props="defaultProps"
                :check-strictly="true"
                @check="handleNodeClick"
                  >
              </el-tree>
            </div>
            <div v-show="radio===0">
              <el-tree
                show-checkbox
                :check-on-click-node="true"
                node-key="id"
                ref="tree2"
                highlight-current
                :load="loadMenus2"
                      lazy
                :props="defaultProps"
                :check-strictly="true"
                @check="handleNodeClick"
                  >
              </el-tree>
            </div>
          </el-row>


        </el-scrollbar>
      </div>
      <el-dialog title="岗位信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          
          <!-- <el-row> -->
            <el-col class="line" :span="4">岗位：</el-col>
            <el-col class="line" :span="20">
              <el-checkbox-group v-model="checkedPositions">
                <el-col :span="12">
                  <el-checkbox :label="item.codeName" v-for="(item, index) in positionData" :key="item.codeName">{{item.codeName}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitPositons">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>

  <script>
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  import { getTree } from '@/httpTansun/api/setting/organization.js'
  import menusApis from '@/httpTansun/api/setting/setSysConfig.js'
  export default {
    name: 'unauthorized',
    components: {
      selectOrgOrDept
    },
    props: {},
    data () {

      return {
        radio:1,
        isCan: false,
        loading: false,
        rightId: '',
        node:[],
        resolve: [],
        defaultProps: {
                children: "children",
                label: "rightName",
                isLeaf: "isNext"
                },
        positionData: [],
        checkedPositions: [],
        dialogFormVisible: false,
        form: {
          detailData: [],
          mtTmpOne: '',
          isDisabled: true
        },
        data: [],
      orgOrDeptId: "0",
      searchData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        draftId: JSON.parse(localStorage.getItem("userInfo")).unitId,  
        },
      }
    },
    computed: {},
    methods: {
      change(val){
      //  if (condition) {
         
      //  }
      },
      //选择机构名称
    selectOrg(org) {
        this.searchData.orgName = org.unitName;
        this.searchData.draftId = org.id;
        this.getCheckedNodes();
            },
      //弹出框
    openDialog(){
      let len1 = this.$refs.tree1.getCheckedKeys().length,
          len2 = this.$refs.tree2.getCheckedKeys().length
      
        if (len1===0 && len2===0) {
          this.$message({
                message: '请选择需要配置权限的菜单',
                type: 'error'
            })
            return
            
        } else {
          if (this.radio===1) {
              // if (!this.isCan) {
              //     this.$message({
              //       message: '该菜单已配有权限！',
              //       type: 'error'
              //   })
              //   return
              // } else {
              //   this.rightId = this.$refs.tree1.getCheckedKeys().join()
              // }
              this.rightId = this.$refs.tree1.getCheckedKeys().join()

            } else {
              // if (!this.isCan) {
              //     this.$message({
              //       message: '该菜单已配有权限！',
              //       type: 'error'
              //   })
              //   return
              // } else {
              //   this.rightId = this.$refs.tree2.getCheckedKeys().join()
              // }
              this.rightId = this.$refs.tree2.getCheckedKeys().join()
            }
          
          this.dialogFormVisible = true
        }
    },
      cancel(){
        this.checkedPositions = []
        // this.loadMenus(node, resolve)
        this.dialogFormVisible= false
      },
      //加载菜单数据
        loadMenus1(node, resolve) {
          const that = this
          that.node = node
          that.resolve = resolve
          that.loading = true
         console.log(node)
          if (node.level===0) {
            menusApis.menuConfigTreeList({unitNameId: '1'}).then((res) => {
              that.loading = false
                console.log("----菜单权限配置-----",res)
                let data = []
                res.data.menu.map(item => {
                    data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
                that.positionData = res.data.post
                return resolve(data);
            }).catch(err => {
              that.loading = false
            });
          }else {
            const data= {
              rightId: node.data.id,
              unitNameId: '1',
              type: node.data.type ? 'nextTreeRight' : ''
            }
            menusApis.menuConfigTree(data).then((res) => {
              that.loading = false
                console.log("----菜单权限树-----",res)
                let data = []
                res.data.map(item => {
                  data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
                return resolve(data);
            }).catch(err => {
              that.loading = false
            });
          }
         },
      //加载菜单数据
      loadMenus2(node, resolve) {
          const that = this
          that.loading = true
        //  console.log(that.currentNode.parent)
          if (node.level===0) {
            menusApis.menuConfigTreeList({unitNameId: '0'}).then((res) => {
              that.loading = false
                console.log("----菜单权限配置-----",res)
                let data = []
                res.data.menu.map(item => {
                    data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext, type: item.type ? item.type : ''})
                })
                that.positionData = res.data.post
                return resolve(data);
            }).catch(err => {
              that.loading = false
            });
          }else {
            const data= {
              rightId: node.data.id,
              unitNameId: '0',
              type: node.data.type ? 'nextTreeRight' : ''
            }
            menusApis.menuConfigTree(data).then((res) => {
              that.loading = false
                console.log("----菜单权限树-----",res)
                let data = []
                res.data.map(item => {
                  data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
                return resolve(data);
                that.cancel()
            }).catch(err => {
              that.loading = false
            });
          }
         },
            //打开岗位弹框
      getCheckedNodes() {
        this.dialogFormVisible = true
        },
      handleNodeClick(data){
        // if (this.radio===1) {
        //   console.log(data);
          
        //   if(data.type==='1'){
        //     this.isCan =true
        //   } else {
        //     this.isCan = false
        //   }
        // } else {
        //   console.log(data);
        //   console.log(this.$refs.tree2.getCheckedKeys().join());
        // }
        if (data.type&&data.type==='1') {
          console.log(this.$refs.tree1.getCheckedKeys())
          if (this.radio===1) {
            this.$refs.tree1.setCheckedKeys([]);
          } else {
            this.$refs.tree2.setCheckedKeys([]);
          }
            this.$message({
              message: '该菜单已配有权限',
              type: 'error'
            })
        }
        console.log(this.$refs.tree2.getCheckedKeys())
        console.log(data);
      },
      //提交岗位信息
      submitPositons(){
        const checkedPositions = this.checkedPositions
           const dicCodeArr = []
          this.positionData.map(item=>{
            if( checkedPositions.indexOf(item.codeName)!==-1) {
              dicCodeArr.push(item.dicCode)
              return dicCodeArr
            }
          })
          const dicCode = typeof dicCodeArr.join()==='string' ? dicCodeArr.join() : JSON.stringify(dicCodeArr.join())
          const data = {
            unitNameId: JSON.stringify(this.radio),
            rightId: this.rightId,
            dicCode: dicCode
          }
        menusApis.menuConfigAuthorization(data).then((res) => {
                      this.loading = false
                      console.log("----提交岗位信息-----",res)
                      this.$router.go(0)
                      return resolve(res);
                  }).catch(err => {
                      this.loading = false
                  });
        this.dialogFormVisible = false
        
      },
      //
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },

    },
    activated () {
    },
    mounted () {

    },
    created () {
      // this.loadMenus()
    }
  }
  </script>

  <style scoped lang="less" rel="stylesheet/less">
  .permissionAssignment {
    height: 100vh;
    .unauthorizedTable {
      padding: 0px 70px;
      .unauthorizedTitle {
        margin-bottom: 40px;
        border-bottom: 2px solid #409eff;
        font-size: 30px;
        line-height: 75px;
        color: #409eff;
        font-weight: 600;
        text-align: center;
      }
      .treeFrame {
          border: 1px solid grey;
          padding: 15px;
      }
      .el-scrollbar {
        height:500px;
        overflow:scroll;
      }
      .message {
        padding-left: 20px;
        color: #ff0502;
        font-size: 12px;
        line-height: 50px;
      }
    }
  }
  </style>
