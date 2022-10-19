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
      <div class="treeFrame">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="12"><div class="buttons">
            <el-button type="primary" @click="dialogFormVisible = true">授权</el-button>
            <!-- <el-button type="primary" @click="delMenu">删除</el-button> -->
          </div></el-col>
        </el-row>
        <el-tree
        show-checkbox
        :check-strictly="true"
        :check-on-click-node="true"
        :accordion="true"
        node-key="id"
        ref="tree"
        highlight-current
        :load="loadMenus"
              lazy
        :props="defaultProps"
        @check-change="handleNodeClick"
        >
      </el-tree>


      </div>
    </div>
    <el-dialog title="岗位信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row style="margin-bottom: 10px" :gutter="10">
          <el-col :span="6">
            <select-org-or-dept @select="selectOrg" :orgOrDeptId="orgOrDeptId">
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择"
                v-model="searchData.orgName"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-col>
        </el-row>

            <el-col class="line" :span="4">岗位：</el-col>
            <el-col class="line" :span="20">
              <el-checkbox-group v-model="checkedPositions">
                <el-col :span="12">
                  <el-checkbox :label="item.codeName" v-for="(item, index) in positionData" :key="item.codeName">{{item.codeName}}</el-checkbox>
                </el-col>
              </el-checkbox-group>
            </el-col>
            

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitPositons">确 定</el-button>
      </div>
    </el-dialog>
    <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
      
    ></org-tree>
  </div>
</template>

<script>
import orgTree from "components/tree/orgTree";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import menusApis from '@/httpTansun/api/setting/setSysConfig.js'
import { getTree } from '@/httpTansun/api/setting/organization.js'
export default {
  name: 'authorized',
  components: {
    selectOrgOrDept,
    orgTree
  },
  props: {},
  data () {

    return {
      loading: false,
      orgOrDeptId: "1",
      searchData: {
                    orgName: '',
                    draftId: JSON.parse(localStorage.getItem("userInfo")).unitId,   
                },
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
      checkedId:"",
      //选择机构弹出框
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      //主子流程与流程模板传参变化
      tplVldStcd: '07',

      searchData: {
        groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        multiTenancyId: ''
      },
    }
  },
  computed: {},
  methods: {
    //选择机构名称
    selectOrg(org) {
        this.searchData.orgName = org.unitName;
        this.searchData.draftId = org.id;
        this.getCheckedNodes();
        console.log('111111111111111111111111111111111')
            },
    //选择机构弹出框
    selOrg (stype) {
      this.showOrgTree = true
      this.sendTempForm.stype = stype
      if (stype === 0) {
        this.isSingle = false
      } else {
        this.isSingle = true
      }
    },
    getOrgList (org) {
      console.log('org', org);
      if (this.sendTempForm.stype === 0) {
        let nameArr = []
        org.map(item => {
          nameArr.push(item.unitName)
          this.sendTempForm.txnIttChnlCgyCodeArr.push(item.id)
        })
        this.sendTempForm.txnIttChnlCgyCodeArrName = nameArr.join(',')
      } else {
        this.$set(this.flowTempForm, 'txnIttChnlCgyCode', org.unitName)
        this.flowTempForm.id = org.id
      }
    },
    //取消按钮
    cancel(){
      this.checkedPositions = []
      // this.loadMenus(node, resolve)
      this.dialogFormVisible= false
    },
    //加载菜单数据
      loadMenus(node, resolve) {
        let _this = this
        console.log(node)
        _this.loading = true
        let data = {}
        if (node.level===0) {
           data= {
            rightId: ''
          }
        }else {
           data= {
            rightId: typeof node.data.id==='string' ?  node.data.id : JSON.stringify(node.data.id)
          }
        }
        
        menusApis.menuConfigTreeHasAuthorized(data).then((res) => {
          _this.loading = false
            console.log("----已授权菜单权限配置-----",res)
            let data = []
            if (res.data.menu) {
              res.data.menu.map(item => {
                data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext})
              })
              _this.positionData = res.data.post
            } else {
              res.data.map(item => {
                data.push({rightName: item.rightName, id: item.rightId, leaf: item.isNext})
              })
            }

            return resolve(data);
        }).catch(err => {
          _this.loading = false
        });

    },
          //获取已授权岗位
    getCheckedNodes() {
      console.log("已授权",this.checkedId)
      let data= {
            rightId: this.checkedId
          }
      menusApis.menuConfigTreeDelHasAuthorized(data).then((res) => {
            console.log("----获取已授权岗位1-----",res)
            const checkedPositionsArr = []
            res.data.map(item => {
              checkedPositionsArr.push(item.codeName)
                return checkedPositionsArr
            })
            this.checkedPositions = checkedPositionsArr
            
            return resolve(res);
          }).catch(err => {
            this.loading = false
        });
      
      },
      //设置选项框 单选状态
    handleNodeClick(checkedNodes, ifCheked){
      console.log(checkedNodes,ifCheked);
      
      if (ifCheked) {
        this.checkedId = checkedNodes.id
        this.$refs.tree.setCheckedNodes([checkedNodes])
      }
    },
    //提交授权岗位信息
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
          rightId: this.$refs.tree.getCheckedKeys().join(),
          dicCode: dicCode
        }
      menusApis.menuConfigHasAuthorization(data).then((res) => {
                    this.loading = false
                    console.log("----提交岗位信息成功-----",res)
                    return resolve(res);
                }).catch(err => {
                  
                    this.loading = false
                });
      this.dialogFormVisible = false
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
