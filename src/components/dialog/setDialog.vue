<template>
  <div class="set-dialog" v-if="dialogVisible" v-dialogDrag>
    <!-- @click="dialogVisible = false" -->
    <div class="blank-wrap" @click="dialogVisible = false">
      <div
        @click.stop="dialogVisible = true"
        class="dialog-wrap el-dialog"
        :style="{
          width: setDialogWidth + '% !important', 
          height: setDialogHeight + '% !important',
          top: setDialogTop + '% !important',
          left: setDialogLeft + '% !important'
        }"
      >
        <div class="dw-header el-dialog__header">
          <span class="dw-header-title">{{setDialogTitle}}</span>
          <i class="dw-close el-dialog__close el-icon el-icon-close" @click.stop="dialogVisible = false"></i>
        </div>
        <div class="dw-content">
          <div class="mrg-b-20" v-if="setAttachLabel == 0" style="white-space: pre-line;word-break: break-all;">{{setDialogContent}}</div>
          <div class="dw-con-attach mrg-b-20" v-if="setAttachLabelFiles.length">
            <div class="dw-con-title">附件</div>
            <div class="attach-list">
              <div class="attach-item" v-for="(v, i) in setAttachLabelFiles" :key="i">
                <span class="name" :title="v.fileName" @click="downFile(v)">{{v.fileName}}</span>
                <span class="time">{{v.createTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dw-footer">
          <div class="dw-f-con">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click.stop="dialogVisible = false">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setDialog",
 
  props: {
    setDialogVisible: {
      type: Boolean,
      default: false
    },
    setDialogWidth: {
      type: Number,
      default: 80
    },
    setDialogHeight: {
      type: Number,
      default: 80
    },
    setDialogTop: {
      type: Number,
      default: 10
    },
    setDialogLeft: {
      type: Number,
      default: 10
    },
    setDialogTitle: {
      type: String,
      default: ""
    },
    setDialogContent: {
      type: String,
      default: ""
    },
    setAttachLabel: {
      type: String,
      default: "附件"
    },
    setAttachLabelFiles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialogVisible: false,
      TwoOpen:true
    };
  },
  watch: {
    setDialogVisible(v) {
      this.dialogVisible = true;
    }
  },
  methods: {
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    }
  },
  mounted() {
    document.onkeyup = e => {
      // console.log(e, e.key == "Escape" && e.keyCode == 27)
      if(e.key == "Escape" && e.keyCode == 27) {
        this.dialogVisible = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.set-dialog {
  width: 100%;
  height: 100%;
  .blank-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 2020;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
  }

  .dialog-wrap {
    position: relative;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    overflow: auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    .dw-header {
      padding: 15px 20px;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      background: #409eff;
      .dw-header-title {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }
      .dw-close {
        cursor: pointer;
        color: #fff;
      }
    }
    .dw-content {
      padding: 30px 20px;
      box-sizing: border-box;
      color: #666;
      word-break: break-all;
      overflow: auto;
      .dw-con-title {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .attach-list {
        padding: 10px;
        overflow: scroll;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
        .attach-item {
          display: flex;
          flex-flow: row nowrap;
          // margin-bottom: 8px;
          line-height: 30px;
          justify-content: space-between;
          .name {
            cursor: pointer;
            width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 30px;
            &:hover {
              color: #3b85ef;
            }
          }
        }
      }
    }
    .dw-footer {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex: auto;
      align-items: flex-end;
      .dw-f-con {
        width: 100%;
        text-align: right;
      }
    }
  }
}
</style>