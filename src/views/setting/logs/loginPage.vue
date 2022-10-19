/**
* create by zx on 2021-1-4 15:38
* 类注释：
* 备注：yangshengqiang
*/
<template>
  <div class="selectCollectLogs">
    <div class="formHeader">
      <div class="title-text">数据库操作查询</div>
    </div>
    <el-row>
        <el-col>
          <el-form
            label-width="100px"
          >
            <el-row>
              <el-col :span="24">
              	<textarea rows="8" v-model="formData.sqlServer" style="width: 100%; padding: 15px; border: 1px solid #ccc; border-radius: 6px;" ></textarea>
              </el-col>
              <el-col :span="24">
                <el-col class="arrowup">
                  <el-button type="primary" @click="submit">查询</el-button>
                  <el-button type="primary" @click="reset">重置</el-button>
                </el-col>
              </el-col>
              <el-col :span="24" v-show="showDialog"  style="padding-top:20px; ">
              	<div class="msgInfo"><strong style="color: #f60;">接口反馈信息：</strong>{{msgInfo}}</div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
  </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: "loginPage",
        props: {},
        data() {
            return {
	            	formData:{
	            		sqlServer:'',
	            	},
                showDialog: false,
                msgInfo:''
            }
        },
        computed: {},
        methods: {
            reset() {
                this.formData.sqlServer = ''
                	this.showDialog=false
            },
            submit() {
            	console.log(this.sqlServer)
                this.loadData()
            },
            loadData() {
                this.$api.setting.logs.getDataInfo(this.formData).then(res => {
                	this.showDialog=true
                    this.msgInfo = res.msg;
                })
            },
        },
        activated() {
        },
        mounted() {

        },
        created() {
                	this.showDialog=false
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  .msgInfo {
    padding: 15px;
    border: 1px dashed #f60;
    color: #555;
    font-size: 12px;
    border-radius: 6px;
    width: 100%;
    height: 100px; background: #fafafa;
  }
</style>
