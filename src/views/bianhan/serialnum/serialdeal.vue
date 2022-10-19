<template>
  <div class="annual_sear">
    <p class="annual_title">流水号维护</p>
    <div class="annual_content">
      <div class="content_box">
        <el-form label-width="120px" :model="formdata" :rules="rules" ref="validateform">
          <el-form-item label="机构名称">
            <el-input v-model="formdata.unitName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="代字">
            <el-input v-model="formdata.firstDeptName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年度">
            <el-input v-model="formdata.yearNo" :disabled="true"></el-input>
          </el-form-item>
          <!-- <el-form-item label="起始编号">
            <el-input v-model="formdata.delNoStr" :disabled="true"></el-input>
          </el-form-item> -->
          <el-form-item label="最大编号" prop="fileNo">
            <el-input v-model.number="formdata.fileNo" :disabled="selectedit" ></el-input>
          </el-form-item>
          <el-form-item label="漏号" prop="delNoStr">
            <el-input v-model="formdata.delNoStr" :disabled="selectedit" placeholder="请按示例格式输入数字，示例：1,2,3"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn_list">
          <el-button @click="closewin">关闭</el-button>
          <el-button type="primary" @click="editdata" v-if="selectedit">编辑</el-button>
          <el-button type="primary" @click="editsave" v-if="!selectedit">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
        name: 'serialdeal',
        components: {},
        data() {
            return {
                serialId: '',
                humanUnit:'',
                selectedit: true,
                formdata: {
                    unitName: '',
                    firstDeptName: '',
                    yearNo: '',
                    fileNo: '',
                    delNoStr: '',

                },
                fileNostore:'',//原始最大编号
                rules: {
                  delNoStr:[ 
                    { validator: (rule,vale,callback)=>{
                      let reg=new RegExp("^[,0-9]+$");
                       if(!vale){
                          return true;
                       }
                       if(vale.trim()!=''&&!reg.test(vale)){
                         callback(new Error('请按示例格式输入数字，示例：1,2,3'))
                       }
                    }, trigger: "change"}
                   ],
                   fileNo:[{ required: true,message: "不能为空", trigger: "change" }]
                }
            }
        },
        created() {
            this.serialId = this.$route.query.id
            this.humanUnit = this.$route.query.humanUnit
            if (this.serialId) {
                this.querySerialDeal()
            }
        },
        methods: {
            closewin() {
                this.$router.push("/bianhan/serialnum")
            },
            editdata() {
                this.selectedit = false
            },
            editsave() {
                let valids=true
                this.$refs["validateform"].validate((valid) => {
                  valids=valid;
                  if(!valid){
                  this.$message({
                        type: 'error',
                        message: "请按提示输入数据"
                    })
                }
                });
                if(!valids){
                  return false;
                }
                // if(this.formdata.fileNo<this.fileNostore){
                //      this.$message({
                //         type: 'error',
                //         message: "最大编号值不能小于原始值"
                //     })
                //     return false;
                // }

                 this.selectedit = true;
                this.$api.bianhan.alertSerial(this.formdata).then(res => {
                    this.$router.back()
                    this.$message({
                        type: 'sucess',
                        message: "保存成功"
                    })
                })
            },
            querySerialDeal() {
                this.$api.bianhan.serialDeal({id: this.serialId,humanUnit:this.humanUnit}).then(res => {
                    this.formdata = res.data
                    this.fileNostore=res.data.fileNo;
                })
            }
        }
    }
</script>
<style scoped lang="less">
  .annual_sear {
    margin: 0 auto;

    .annual_title {
      width: 100%;
      height: 70px;
      color: #2b66e3;
      text-align: center;
      font-size: 36px;
    }

    .annual_content {
      width: 100%;
      height: 500px;
      border: 1px solid #c3c3c3;
      padding: 16px;

      .content_box {
        width: 90%;
        height: 100%;
        margin: 0 auto;
      }
    }
  }

  .btn_list {
    width: 30%;
    height: 50px;
    display: flex;
    margin: 0 auto;
    margin-top: 60px;

    div {
      width: 80px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 4px;
      cursor: pointer;
      margin: 16px;
    }

    div:first-child {
      background: #2b66e3;
      color: #fff;
    }

    div:last-child {
      border: 1px solid #2b66e3;
      color: #2b66e3;
    }
  }
</style>
