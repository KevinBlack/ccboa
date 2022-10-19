<template>
  <!-- 常用批语 -->
  <div class="appendWriteList">
    <el-dialog title="常用批语" :visible.sync="dialogVisible">
      <el-form>
        <el-row>
          <el-col>
            <el-form-item>
              <el-input
                v-model="content"
                placeholder="添加常用批语"
                style="width: 100%;">
                <el-button slot="append" icon="el-icon-plus" @click="addAppendWriteList"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row v-for="(item,index) in messageList" :key="index" class="messagelist" style="margin:10px 0">
        <el-col :span="1">
          <el-radio v-model="radio1" :label="index" @change="selectMassageInfo(item.content)"></el-radio>
        </el-col>
        <el-col :span="23" class="piyu_info">
          <el-input
            :id="item.id"
            :value="item.content"
            placeholder="添加常用批语"
            style="width: 100%;">
            <el-button slot="append" icon="el-icon-delete" @click="deleteMassageInfo(item.id)">移除</el-button>
          </el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="dialogVisible = false">取 消</el-button>
        <el-button size="big" type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

    export default {
        props: {
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
        },
        watch: {
            dialogVisible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.dialogVisible = val
            },
        },
        data() {
            return {
                content: '',
                dialogVisible: false,
                sendmessage: '',
                radio1: "",
                messageList: [],
                bank_selectCommonUseList: {
                    function: "selectCommonUseList",
                    id: '',
                    userId: '',
                    userName: '',
                    content: '',
                    sort: '',
                    createtime: ''
                },
            };
        },
        methods: {
            sure() {
                this.dialogVisible = false;
                this.$emit("childsaveselect", this.sendmessage);
            },
            loadData() {
                let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
                this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
                this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
                this.bank_selectCommonUseList.function = 'selectCommonUseList';
                this.$post.postData(
                    'selectCommonUseList',
                    JSON.stringify(this.bank_selectCommonUseList),
                    this.$businessCode.ggywgn
                ).then(res => {
                    if (res && res.success) {
                        this.messageList = res.data;
                    }
                })
            },
            selectMassageInfo(message) {
                this.sendmessage = message
            },
            addAppendWriteList() {
                if (!this.content) {
                    return
                }
                let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
                this.bank_selectCommonUseList.id = "";
                this.bank_selectCommonUseList.content = this.content;
                this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
                this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
                this.bank_selectCommonUseList.function = 'doSaveCommonUse';
                this.$post.postData(
                    'doSaveCommonUse',
                    JSON.stringify(this.bank_selectCommonUseList),
                    this.$businessCode.ggywgn
                ).then(res => {
                    if (res && res.success) {
                        this.content = ""
                        this.loadData()
                    }
                })

            },
            deleteMassageInfo(id) {
                let userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || '';
                this.bank_selectCommonUseList.id = id;
                this.bank_selectCommonUseList.userId = userInfo && userInfo.humanId;
                this.bank_selectCommonUseList.userName = userInfo && userInfo.humanName;
                this.bank_selectCommonUseList.function = 'doDeleteCommonUseList';
                this.$post.postData(
                    'doDeleteCommonUseList',
                    JSON.stringify(this.bank_selectCommonUseList),
                    this.$businessCode.ggywgn
                ).then(res => {
                    if (res && res.success) {
                        this.loadData()
                    }
                })

            },
        },
        created() {
            this.loadData()
        }
    };
</script>
<style lang="less" scoped>
  .tr {
    text-align: right;
  }

  /deep/ .el-radio__label {
    display: none;
  }

  /deep/ .el-row {
    margin: 10px 0px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .piyu_info /deep/ .el-input__inner {
    border: 0;
    padding-left: 0;
  }

  /deep/ .el-input-group__append {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }
</style>
