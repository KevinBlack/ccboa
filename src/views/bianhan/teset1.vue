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
      <div class="authorizedTable">
        <div class="authorizedTitle">菜单权限配置</div>
        <el-scrollbar>
          <el-row>
            <el-col :span="12">
              <el-radio-group v-model="radio" @change="change('refresh')">
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
              :accordion="true"
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
              :accordion="true"
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
          <el-row>
            
              <el-checkbox-group v-model="checkedPositions">
                <el-col :span="12">
                  <el-checkbox :label="item.codeName" v-for="(item, index) in positionData" :key="item.codeName">{{item.codeName}}</el-checkbox>
                </el-col> 
              </el-checkbox-group>
            
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitPositons">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import menusApis from '@/httpTansun/api/setting/setSysConfig.js'
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  export default {
    name: 'authorized',
    components: {
        selectOrgOrDept
    },
    props: {},
    data () {
      
      return {
        radio: 1,
        loading: false,
        rightId: '',
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
        searchData: {
            orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
            draftId: JSON.parse(localStorage.getItem("userInfo")).unitId,  
        },
         //选择机构弹出框
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      }
    },
    computed: {},
    methods: {
      change(val){
        // this.loadMenus(val)
      },
         //选择机构名称
    selectOrg(org) {
        this.searchData.orgName = org.unitName;
        this.searchData.draftId = org.id;
        this.getCheckedNodes();
            },
      //取消按钮
      cancel(){
        this.checkedPositions = []
        // this.loadMenus()
      },
      //加载菜单数据
        loadMenus1(node, resolve) {
          let _this = this
          console.log(node)
          _this.loading = true
          let data ={}

          if (node&&node.level===0) {
            data= {
              rightId: '',
              unitNameId: '1'
            } 
          }else {
            data= {
              rightId: node.data.id,
              unitNameId: '1',
              type: node.data.type ? 'nextTreeRight' : ''
            }
          }
          menusApis.menuConfigTreeHasAuthorized(data).then((res) => {
            _this.loading = false
              console.log("----已授权菜单一级菜单----总行----",res)
              let data = []
              if (res.data.menu) {
                res.data.menu.map(item => {
                  data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
                _this.positionData = res.data.post
              } else {
                res.data.map(item => {
                  data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
              }
              
              return resolve(data);
          }).catch(err => {
            _this.loading = false
          });
          
        
      },

      //加载菜单数据
      loadMenus2(node, resolve) {
          let _this = this
          console.log(node)
          _this.loading = true
          let data ={}

          if (node&&node.level===0) {
            data= {
              rightId: '',
              unitNameId: '0'
            } 
          }else {
            data= {
              rightId: node.data.id,
              unitNameId: '0',
              type: node.data.type ? 'nextTreeRight' : ''
            }
          }
          menusApis.menuConfigTreeHasAuthorized(data).then((res) => {
            _this.loading = false
              console.log("----已授权菜单一级菜单------非总行-",res)
              let data = []
              if (res.data.menu) {
                res.data.menu.map(item => {
                  data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
                _this.positionData = res.data.post
              } else {
                res.data.map(item => {
                  data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext ? item.isNext : '', type: item.type ? item.type : ''})
                })
              }
              
              return resolve(data);
          }).catch(err => {
            _this.loading = false
          });
          
        
      },
            //打开岗位弹框
      openDialog() {
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
      //选中节点事件
      handleNodeClick(data){
        const _this = this
        const rightId = data.id
        console.log(data)
        // if (data.type&&data.type==='1') {
        //   _this.$message({
        //       message: '该级菜单一配有权限',
        //       type: 'error'
        //     })
        //     return
        // }
        if (_this.radio===1) {
          _this.$refs.tree1.setCheckedKeys([data.id]);
        } else {
          _this.$refs.tree2.setCheckedKeys([data.id]);
        }
        
        menusApis.menuConfigAuthoriedPositions({rightId: rightId, unitNameId: JSON.stringify(_this.radio)}).then((res) => {
              console.log("----已授权岗位-----",res)
              const checkedPositionsArr = []
              res.data.map(item => {
                checkedPositionsArr.push(item.codeName)
                  return checkedPositionsArr
              })
              _this.checkedPositions = checkedPositionsArr
              return resolve(res);
            }).catch(err => {
              _this.loading = false
          });
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
        menusApis.menuConfigAuthorizationUpdate(data).then((res) => {
                      this.loading = false
                      console.log("----提交岗位信息成功-----",res)
                      this.$router.go(0)
                      return resolve(res);
                  }).catch(err => {
                    this.$refs.tree.setCheckedKeys([]);
                      this.loading = false
                  });
        this.dialogFormVisible = false
        
      },
      //
      getCheckedKeys() {
        // console.log(this.$refs.tree.getCheckedKeys());
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
    .authorizedTable {
      padding: 0px 70px;
      .authorizedTitle {
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
          width:90%;
      }
      .el-scrollbar {
        height:400px;
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
  