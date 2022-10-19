<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="psn-mng-content">
          <!-- <el-tree
            ref="orgTree"
            :props="props"
            node-key="id"
            highlight-current
            accordion
            :data="treeData"
            lazy
            @node-click="handleNodeClick"
          >
            <span class="custtom-tree-node" slot-scope="{ node, data }">
              <span :title="data.name" class="show-ell">{{ data.name }}</span>
            </span>
          </el-tree> -->
          <el-tree
            ref="orgTree"
            node-key="id"
            :load="loadNode"
            @node-click="handleNodeClick"
            lazy
            :props="defaultProps"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-row style="margin-bottom: 20px;">
            <el-col :span="6">
              <el-button type="primary" size="small">新增</el-button>
            </el-col>
            <el-col :span="18" style="text-align: right;">
              <el-input placeholder="请输入查询关键字" style="width: 30%;">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="false"
            :isPagination="true"
            :isHandle="false"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            v-loading="tableLoading"
          ></m-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="showSysPost"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="用户岗位">
      <h6 class="back_tit">请选择用户岗位</h6>
        <el-row>
          <el-checkbox-group v-model="choseData">
            <el-col :span="6" v-for="(item, index) in sysPostData" :key="index" style="text-align: center;margin-bottom: 20px;">
              <el-checkbox :label="item.codeName">{{ item.codeName }}</el-checkbox>
            </el-col>
          </el-checkbox-group>
        </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSysPost = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from 'components/table/mTable.vue'

export default {
    name: 'PersonManage',
    components: {
      mTable
    },
    data () {
      return {
        pagination: {
          page: 1,
          limit: 10 
        },
        treeData: [],
        defaultProps: {
          children: [],
          label: "name",
          isLeaf: 'leaf'
        },
        treeForm: {
          "function":"unitTree",
          "unitCode":"",
          "flag":true
        },
        tableData: [],
        tableLoading: false,
        tableCols: [
          { label: '序号', prop: 'rownum_', align: 'center', width: '70' },
          { label: '姓名', prop: 'humanName', align: 'center' },
          { label: '当前配置', prop: 'role', align: 'center' },
          { label: '账号', prop: 'ACCOUNT', align: 'center' },
          { label: '配置岗位 ', type: 'Button', align: 'center',
            btnList: [
              {
                label: '设置',
                size: 'medium',
                type: 'text',
                circle: true,
                handle: row => {
                  this.handleOrgSet(row)
                }
              }
            ]
          }
        ],
        tableForm: {
          function: 'selUserRole',
          unitCode: "111111111"
        },
        setForm: {
          function: 'tcHumanRole',
          humanId: ''
        },
        saveSetForm: {
          function: 'tcHumanRoleUpdate',
          posts: '',
          humanId: 0
        },
        showSysPost: false,
        sysPostData: [],
        choseData: []
      }
    },
    methods: {
      // 分页
      handleCurrentChange(val){
        this.pagination.page = val
        this.handleLoadTable()
      },
      handleSizeChange(val){
        this.pagination.limit = val
        this.handleLoadTable()
      },
      // 角色设置
      handleOrgSet (row) {
        this.setForm.humanId = this.saveSetForm.humanId = row.humanId
        this.$post.postData('tcHumanRole', JSON.stringify(this.setForm), this.$businessCode.ggywgn).then((res) => {
          this.sysPostData = res.data
          this.sysPostData.forEach(element => {
            if (element.flag) {
              this.choseData.push(element.codeName)
            }
          })
          this.showSysPost = true
        })
      },
      handleSave () {
        let transArr = []
        for (let i = 0; i < this.choseData.length; i++) {
          for (let j = 0; j < this.sysPostData.length; j++) {
            if (this.sysPostData[j].codeName === this.choseData[i]) {
              transArr.push(this.sysPostData[j].dicId)
            }
          }
        }
        let ids = []
        ids = transArr.join(",")
        this.saveSetForm.posts = ids
        console.log(this.saveSetForm)
        this.$post.postData('tcHumanRoleUpdate', JSON.stringify(this.saveSetForm), this.$businessCode.ggywgn).then((res) => {
          if (res.success) {
            this.$message.success('保存成功!')
            this.showSysPost = false
            this.choseData = []
            this.handleLoadTable()
          }
        })
      },
      // 组织树操作
      handleNodeClick (data) {
        this.handleLoadTree(data)
        this.handleLoadTable(data)
      },
      handleLoadTree (obj,resolve) {
        this.treeForm.unitCode = obj.id
        this.$post.postData('unitTree', JSON.stringify(this.treeForm), this.$businessCode.ggywgn).then((res) => {
          // this.treeData = res.data 
          resolve(res.data)
        })
        this.handleLoadTable(obj)
      },
      // 表格数据请求
      handleLoadTable (obj) {
        if (obj) this.tableForm.unitCode = obj.id
        this.$post.postData('selUserRole', JSON.stringify(Object.assign(this.tableForm, this.pagination)), this.$businessCode.ggywgn).then((res) => {
          const transArr = res.data.rows
          this.tableData = transArr
          this.pagination.total = res.data.total
        })
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          let obj = {
            id: ''
          }
          this.handleLoadTree(obj,resolve)
        }
        if (node.level > 0) {
          let obj = {
            id: node.data.id
          }
          this.handleLoadTree(obj,resolve)
        }
      }
    },
    mounted () {
      this.handleLoadTable()
    }
}
</script>

<style lang="less" scoped>
.psn-mng-content {
  width: 100%;
  min-height: 900px;
  background-color: #fff;
}

.el-tree-node:focus>.el-tree-node__content {
  background-color: #fff !important;
}
.el-tree-node__content:hover {
  background-color: #fff !important;
}

.show-ell {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.back_tit {
  color: #409EFF;
  line-height: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
}
</style>
