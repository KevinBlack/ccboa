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
            <el-button type="primary" @click="getCheckedNodes">授权</el-button>
            <el-button type="primary" @click="delMenu">删除</el-button>
          </div></el-col>
        </el-row>
        <el-tree
        show-checkbox
        :check-on-click-node="true"
        :accordion="true"
        node-key="id"
        ref="tree"
        highlight-current
        :load="loadMenus"
              lazy
        :props="defaultProps"
        @check="handleNodeClick"
        >
      </el-tree>
      
      
      </div>
    </div>
    <el-dialog title="岗位信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          
            <el-checkbox-group v-model="checkedPositions" @change="handleCheckedPositions">
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
export default {
  name: 'authorized',
  components: {
  },
  props: {},
  data () {
    
    return {
      loading: false,
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
    }
  },
  computed: {},
  methods: {
    //删除已授权菜单
    delMenu(){
      const data = {
        rightId: this.$refs.tree.getCheckedKeys().slice(0,1).join()
      }
      menusApis.menuConfigTreeDelHasAuthorized(data).then((res) => {
            this.loading = false
            console.log("----删除已授权菜单-----",res)
            this.loadMenus()
            return resolve(res);
        }).catch(err => {
            this.loading = false
        });
    },
    //取消按钮
    cancel(){
      this.checkedPositions = []
      this.loadMenus()
    },
    //加载菜单数据
      loadMenus(node, resolve) {
        let _this = this
        console.log(node)
        _this.loading = true
        let data ={}
        if (node.level===0) {
          data= {
            rightId: ''
          } 
        }else {
          data= {
            rightId: node.data.id
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
        if (node.level!==0) {
          menusApis.menuConfigHasAuthorization(data).then((res) => {
            console.log("----获取已授权岗位1-----",res)
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
      }
      
    },
          //打开岗位弹框
    getCheckedNodes() {
      this.dialogFormVisible = true
      },
    //
    handleCheckedPositions(value){
      
      console.log(this.checkedPositions.join())
      console.log("---",value)
    },
    //
    handleNodeClick(data){
      console.log(data);
      this.$refs.tree.setCheckedKeys([data.id]);
      console.log(this.$refs.tree.getCheckedKeys().join());
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
          rightId: this.$refs.tree.getCheckedKeys().join(),
          dicCode: dicCode
        }
      menusApis.menuConfigAuthorization(data).then((res) => {
                    this.loading = false
                    console.log("----提交岗位信息成功-----",res)
                    return resolve(res);
                }).catch(err => {
                  this.$refs.tree.setCheckedKeys([]);
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
