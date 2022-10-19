<!--
 * @Author: your name
 * @Date: 2020-07-31 15:53:34
 * @LastEditTime: 2020-08-11 14:22:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\yd\query.vue
-->
/**
* create by lxx on 2020/01/18 16:00
* 类注释：
* 备注：会议预定/空间管理
*/
<template>
  <div class="space">
    <div class="process_content">
      <el-row :gutter="20">
        <el-col :span="6" class="treeBox">
          <el-tree
            :data="spaceTree"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="search">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{node.label}}</span>
              <span>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click.stop="() => options(node,data,'1')">
                </el-button>
                <el-button
                  type="primary"
                  v-if="!data.flag"
                  size="mini"
                  icon="el-icon-minus"
                  @click.stop="() => options(node, data,'3')">
                </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  icon="el-icon-edit-outline"
                  @click.stop="() => options(node, data,'2')">
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18" class="spaceBox">
          <div class="spaceHeader">
            <el-button type="primary" class="btn" @click="add()" size="medium">新增</el-button>
          </div>
          <div class="spaceContent">
            <tTable
              :loading="tableLoading"
              :isIndex="true"
              :isPagination="true"
              :pagination="pagination"
              :pageSizeList = "[20,30,50,100,200]"
              :sortable="false"
              :tableData="tableData"
              :tableCols="tableCols"
              @refresh="search"
            ></tTable>
          </div>
        </el-col>
    </el-row>
    </div>
    <el-dialog
      v-dialogDrag
      :visible.sync="spaceDialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="新增/编辑空间"
      @close="reset('formData')">
      <el-form ref="formData" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="空间编码">
              <el-input v-model="formData.encode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="空间类型">
              <el-input v-model="formData.spcType" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="空间名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="空间地址" prop="address">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="面积(㎡)" prop="square">
              <el-input v-model="formData.square"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.comments"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="spaceDialogVisible = false;">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :visible.sync="nodeDialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="编辑"
      @closed="reset('treeNode')">
      <el-form ref="treeNode" :rules="rules" :model="treeNode" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单名称">
              <el-input placeholder="请输入菜单名称" v-model="treeNode.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nodeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nodeOption">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
let id=1;
import tTable from "@/components/table/tTable";
export default {
  name: "space",
  components: {
    tTable
  },
  data() {
    return {
      spaceDialogVisible:false,
      nodeDialogVisible:false,
      spaceTree:[],
      defaultProps: {
        children: "children",
        label: "name",
      },
      searchData: {
        function: "kj",
        operationType:'4',
        encode:'',
        name:'',
        catalogNo:'',
        type:''
      },
      tableLoading: false,
      sortDate: [],
      tableData: [],
      tableCols: [
        { label: "空间编码", prop: "encode", align: "center" },
        { label: "空间名称", prop: "name", align: "center" },
        { label: "空间地址", prop: "address", align: "center" },
        { label: "面积", prop: "square", align: "center" },
        { label: "空间类型", prop: "spcType", align: "center" },
        {
          label: "操作",
          align: "center",
          type: "Button",
          width: "200",
          btnList: [
            {
              type: "text",
              label: "编辑",
              handle: this.editBtn
            },
            {
              type: "text",
              label: "删除",
              handle: this.delBtn
            }
          ]
        }
      ],
      pagination: {
        pageNum: 1, //第几页
        total: 0, //共有条数
        pageSize : 20 //每页条数
      },
      formData:{
        encode:'',
        spcType:'HYS',
        name:'',
        address:'',
        square:'',
        comments:'',
      },
      dialogType:'1',
      rules:{
        name:[
            {
              required: true,
              trigger: "blur",
              message: "请输入空间名称"
            }
          ],
        address:[
            {
              required: true,
              trigger: "blur",
              message: "请输入空间地址"
            }
          ],
        square:[
            {
              required: true,
              trigger: "blur",
              message: "请输入空间面积"
            }
          ]
      },
      treeNode:{//空间节点树弹窗form表单对象
        name:'',
        type:'add'
      },
      currentNode:{},//点击的当前节点的 Node 对象
      currentNodeData:{},//点击的当前节点的数据
    };
  },
  computed: {
  },
  methods: {
    /* 页面左侧空间树方法 */
    initTree(){
      this.$post
        .postData(
          "kjfz",
          JSON.stringify({
            function:'kjfz',
            operationType:'4',
            name:'',
            unitName:JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
          }),this.$businessCode.hysyd
        )
        .then(res => {
          if(res && res.data){
            this.spaceTree=res.data.menu;
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    options(node,data,type){
      this.currentNode=node;
      this.currentNodeData=data;
      this.treeNode.type=type;
      if(this.treeNode.type=='1'){
        this.nodeDialogVisible=true;
        this.treeNode.name='';
      }else if(this.treeNode.type=='2'){
        this.nodeDialogVisible=true;
        this.treeNode.name=data.name;
        this.treeNode.id=data.id;
      }else{
        this.$confirm("确认删除此节点？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        callback: action => {
          if (action == "confirm") {
            this.nodeOption();
          }
        }
      });
      }
    },
    nodeOption(){
      let obj={
        function:'kjfz',
        operationType:this.treeNode.type,
        id:'',
        name:'',
        type:'',
        parents:'',
      };
       switch(this.treeNode.type){
        case '1':
          obj.name=this.treeNode.name;
          obj.parents=this.currentNodeData.id;
          break
        case '2':
          obj.name=this.treeNode.name;
          obj.id=this.treeNode.id;
          break
        case '3':
          obj.id=this.currentNodeData.id;
          break
      }
      this.$post
        .postData(
          "kjfz",
          JSON.stringify(obj),
          this.$businessCode.hysyd
        )
        .then(res => {
          if(res && res.success){
            this.nodeDialogVisible=false;
            this.initTree();
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "操作成功",
              duration: 1000,
            });
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "操作失败",
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });

    },
    /* 页面右侧表格相关方法 */
    editBtn(row){
      this.spaceDialogVisible=true;
      this.formData=JSON.parse(JSON.stringify(row));
      this.dialogType='2'
    },
    add(){
      if(this.searchData.catalogNo==''){
        this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "请先选择空间节点",
                duration: 1000
              });
      }else{
        this.spaceDialogVisible=true;
        this.dialogType='1'
      }
    },
    delBtn(row){
      this.$confirm(
        "是否确认删除此项空间？",
        "提示",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          callback: action => {
            if (action == "confirm") {
              this.dialogType='3';
              this.btnFun('3',row);
            }
          }
        }
      );
    },
    submit(){
      this.$refs.formData.validate((valid, object) => {
        if (valid) {
          this.btnFun(this.dialogType);
        }
      });
    },
    search(data){
      this.tableLoading=true;
      this.searchData.currentPageNum=this.pagination.pageNum;
      this.searchData.pageSize=this.pagination.pageSize;
      if(data&&data.id){
        this.searchData.catalogNo=data.id;
      }
      this.$post
      .postData(
        "kj",
        JSON.stringify(this.searchData),
        this.$businessCode.hysyd
      )
      .then(res => {
        this.tableLoading=false;
        if(res && res.data){
          this.tableData=res.data.rows;
          this.pagination.total=res.data.total;
        }
      })
      .catch(err => {
        this.tableLoading=false;
        console.log(err);
      });
    },
    btnFun(type,row){
      let fun={
            function: "kj",
            operationType:type,//操作类型 1新增 2修改 3删除 4查询
          };
          if(type=='1'){
            fun.catalogNo=this.searchData.catalogNo;
            fun.status='1';//使用状态，（0：不可用，1：可用）
            var obj = Object.assign(fun, this.formData);
          }else if(type=='2'){
            var obj = Object.assign(fun, this.formData);
          }else if(type=='3'){
            var obj ={
              function: "kj",
              operationType:type,//操作类型 1新增 2修改 3删除 4查询
              spcId:row.spcId
            };
          }
      this.$post
      .postData(
        "kj",
        JSON.stringify(obj),
         this.$businessCode.hysyd
      )
      .then(res => {
        if(res && res.success){
          this.search();
          let message='';
          if(type=='1'){
            message="新增成功";
          }else if(type=='2'){
            message="修改成功";
          }else if(type=='3'){
            message="删除成功";
          }
          if(type!='3'){
            this.spaceDialogVisible=false;
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: message,
              duration: 1000,
            });
          }else{
            this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 1000
              });
          }
        }else{
          if(res.message){
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: res.message,
                duration: 1000
              });
            }
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    reset(formName){
      this.formData={
        encode:'',
        spcType:'HYS',
        name:'',
        address:'',
        square:'',
        comments:'',
      };
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.initTree();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.space{
  //background-color: rgb(240, 245, 250);
  margin: 0 auto;
  .spaceHeader{
    height: 50px;
    .btn{
      float: right;
    }
  }
  .process_content{
    //min-height: 920px;
    .treeBox{
      height: calc(100vh - 200px);
      border: 1px solid #409eff;
      overflow: scroll;
      padding: 10px;
      border-radius: 5px;
    }

  }
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<style lang="less" rel="stylesheet/less">
.space{
  .el-button--mini{
    padding:5px;
  }
}
</style>
