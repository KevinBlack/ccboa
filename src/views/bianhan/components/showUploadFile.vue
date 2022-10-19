/**
* create by yin on 2021/1/15 10:21
* 类注释：展示页面底部上传附件
* 备注：
*/
/**
* create by zx on 2020/8/26 19:33
* 类注释：选择部门
* 备注：

  组建组成：包含自定义区域和文件列表展示区

  参数：
@param canmoveOrdown[boolean],是否可以移动或下载
@param label[string],标题名称
@param fileList[array],内容数组
@param fileId[string]当前表单id
组建调用示例：
import fileList from '../showUploadFile'
<fileList :canmoveOrdown='canmoveOrdown'  
          label="制发单附件"
          :fileId='fileId'
          :fileList='fileList'>
     <p>这里是自定义内容，会显示在文件列表上方</p>
</fileList>
*/
<template>
  <el-form-item :label="label">
    <el-col :span="23">
      <slot></slot>
      <div class="tree_w" v-if="fileList&&fileList.length">
        <el-scrollbar>
          <div v-for="(item,index) in  fileList" :key="item.id" class="comp_list">
            <template>
              <div class="command_file">
                <span class="numName">{{index+1}}.</span>
                <span
                  class="name down filename"
                  :title="item.fileName"
                  @click="viewFile(item)"
                >{{item.fileName}}</span>
                <span class="name">{{item.createrName}}</span>
                <span class="name">{{item.createTime}}</span>
                <div class="btns">
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="upRow(index)"
                    v-if="fileList.length>1&&canmoveOrdown"
                    :disabled="index==0"
                    round
                  >上移</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click.native="downRow(index)"
                    v-if="fileList.length>1&&canmoveOrdown"
                    :disabled="index==fileList.length-1"
                    round
                  >下移</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    v-if="canmoveOrdown"
                    @click.native="deleteRow(index,item.id)"
                    :disabled="item.disabled"
                    round
                  >删除</el-button>
                  <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载</el-button>
                </div>
              </div>
            </template>
          </div>
        </el-scrollbar>
      </div>
    </el-col>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
export default {
  props: {
    fileList: {
      //附件列表
      type: Array,
      default() {
        return [];
      }
    },
    canmoveOrdown: {
      //是否可以移动或下载
      type: Boolean,
      default() {
        return true;
      }
    },
    label: {
      //组建名称
      type: String,
      default() {
        return "附件";
      }
    },
    fileId: {
      //当前表单id
      type: String,
      default() {
        return "";
      }
    }
  },
  mixins: [openOrDownLoadFile],
  data() {
    return {
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0,
        id: !!this.$route.query.id ? this.$route.query.id : ""
      },
      formid:this.fileId||sessionStorage.getItem('fileId')
    };
  },
  watch:{
    fileId(newval, oldval) {
      console.log("fileId:******" + newval);
      this.formid = newval;
    }
  },
  methods: {
  downFile(file) {
  	
  	let bank_doDownloadFile = {function: "doDownloadFile"}
    bank_doDownloadFile.fileName = file.fileName;
    bank_doDownloadFile.filePath = file.filePath;
  	
    this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
        .then(res => {
      if (res && res.success) {
        downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
          res.filePath +
          "&fileName=" +
          res.fileName, file.fileName);
      }else {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "下载失败",
          duration: 500
        });
      }
    })
  },
    upRow(n) {
      let midObj;
      let attachSort = [];
      let self=this;
      attachSort.push(
        {
          id: this.fileList[n - 1].id,
          sort: this.fileList[n].sort
        },
        {
          id: this.fileList[n].id,
          sort: this.fileList[n - 1].sort
        }
      );
      midObj = this.fileList[n];
      this.fileList[n] = this.fileList[n - 1];
      this.fileList[n - 1] = midObj;
      this.formid=this.fileId||sessionStorage.getItem('fileId');
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {
          if (!!this.formid&&sessionStorage.getItem('fileId')!='undefined') {
            self.getFileList();
          }else{
              self.$forceUpdate();
          }
        });
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      let self=this;
      attachSort.push(
        {
          id: this.fileList[n + 1].id,
          sort: this.fileList[n].sort
        },
        {
          id: this.fileList[n].id,
          sort: this.fileList[n + 1].sort
        }
      );
      midObj = this.fileList[n];
      this.fileList[n] = this.fileList[n + 1];
      this.fileList[n + 1] = midObj;
       this.formid=this.fileId||sessionStorage.getItem('fileId');
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {
          if (!!this.formid&&sessionStorage.getItem('fileId')!='undefined') {
            self.getFileList();
          }else{
            self.$forceUpdate();
          }
        });
    },
    //获取文件列表
    getFileList() {
      let self=this;
      try {
        this.$api.setSysConfig.getTextemList({ id: this.formid }).then(res => {
          self.uploadConfig.filesHas = self.fileList = res.data;
          self.$forceUpdate();
        });
      } catch (e) {
        console.log("移动后重新获取文件列表错误" + self.formid);
      }
    },
    // 附件删除
    deleteRow(n, id) {
      let self=this;
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$api.setSysConfig
          .deleFile({
            id: id
          })
          .then(res => {
            if (res && res.code == "SUCCESS") {
              self.fileList.splice(n, 1);
              self.$forceUpdate();
              self.uploadConfig.filesHas = this.fileList;
              self.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              self.$message({
                type: "error",
                showClose: true,
                message: "删除失败"
              });
            }
          });
      });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
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
    .numName{
      line-height: 42px;
    }
    .filename {
      min-width: 400px;
      margin-right: 20px;
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
