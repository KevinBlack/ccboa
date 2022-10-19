<template>
  <div class="process_order">
    <P class="favorites_title">收藏设置</P>
    <el-form ref="form" :model="formdata" label-width="80px">
      <el-form-item label="收藏目录">
        <el-input v-model="formdata.scFolder" :disabled="orEditor"></el-input>
      </el-form-item>
    </el-form>
    <div class="form_tid">格式为：C:\\文件夹\\文件</div>
    <div class="btn_box" v-if="!orEditor">
      <el-button type="primary" @click="savadata">保存</el-button>
    </div>
    <div class="btn_box2" v-if="orEditor">
      <el-button type="primary" @click="editordata">编辑</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'sysConfig',
        components: {},
        data() {
            return {
                formdata: {
                    scFolder: ""
                },
                orEditor: true
            }
        },
        methods: {
            loadData() {
                this.$api.dailyWork.getFavorAddress({}).then(res => {
                    if (res.data)
                        this.formdata = res.data;
                })
            },
            savadata() {
                this.$api.dailyWork.setFavorAddress(this.formdata && this.formdata.id ? "A08461521" : "A08461520",
                    {collectionConfig: this.formdata}).then(res => {
                    this.loadData()
                    this.orEditor = true
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                })
            },
            editordata() {
                this.orEditor = false
            }
        },
        created() {
            this.loadData()
        },
    }
</script>
<style scoped lang="less">
  .form_tid {
    color: #e13b3d;
    margin-left: 10px;
  }

  .btn_box,
  .btn_box2 {
    width: 100%;
    margin: 50px 40%;
  }

  .favorites_title {
    width: 100%;
    text-align: center;
    color: #e13b3d;
    font-size: 28px;
    margin-bottom: 24px;
  }
</style>
