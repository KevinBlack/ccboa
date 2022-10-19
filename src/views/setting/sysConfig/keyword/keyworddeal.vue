<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="editordata">编辑</el-button>
    </div>
    <div class="ser-confiog">
      <p class="ser-config-title">类别词与部门对应</p>
      <div class="orgInfoTableBody">
        <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
          <el-col :span="6">
            <div class="grid-content bg-purple normalFont">
              {{item.label}}
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.props]}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "serverdeal",
        data() {
            return {
                id:'',
                orgIndexData: {},
                orgIndex: [
                    {
                        label: '机构名称',
                        prop: 'curBank',
                    }, {
                        label: '主题词',
                        prop: 'topicWord',
                    }, {
                        label: '对应部门',
                        prop: 'deptName',
                    },
                ],
            }
        },
        created() {
          this.id=this.$route.query.id
            this.loadData()
        },
        methods: {
            loadData(){
                this.$api.setSysConfig.dealKeyWord(
                    {
                        id:this.id
                    },

                ).then(res => {
                    // data: {id: "88b4e13f1bca411d83528ce0a6b15beb", curBank: null, curbankId: null, topicWord: null, deptName: null, …}__proto__: Object
                    // this.orgIndexData.curBank=res.data.curBank
                    // this.orgIndexData.topicWord=res.data.topicWord
                    // this.orgIndexData.deptName=res.data.deptName
                })
            },
            closedata() {
                console.log("关闭")
                this.$router.push('/setting/sysConfig/keyword')
            },
            editordata() {

                this.$router.push('/setting/sysConfig/keyword/keywordeditor')
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;

    .btn-list {
      margin-bottom: 20px;
    }

    .ser-config-title {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #d8e8f4;
      font-weight: 800;
    }

    .orgInfoTableBody {
      .el-row {
        margin-bottom: 3px;

        .el-row:last-child {
          margin-bottom: 0;
        }
      }

      .el-col {
        border-radius: 4px;
      }

      .bg-purple-dark {
        background: #d8e8f4;
      }

      .bg-purple {
        background: #e5f0fc;
      }

      .bg-purple-light {
        background: #e5f0fc;
      }

      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }

      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }

      .titleFont {
        font-size: 17px;
        text-align: center;
        line-height: 43px;
        font-weight: 600;
      }

      .normalFont {
        padding-left: 34px;
        font-size: 14px;
        text-align: left;
        line-height: 36px;
      }
    }
  }
</style>
