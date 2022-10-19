
<template>
  <div class="selectDept">
      <div class="title">流水号维护</div>
      <div class="btn">
          <el-button type="primary" size="mini">关闭</el-button>
          <el-button type="primary" size="mini">保存</el-button>
      </div>
      <div class="main">
            <el-form label-width="80px">
                <el-form-item label="机构名称">
                    <el-input :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="年度">
                    <el-input :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="起始编号">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="当前最大编号">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
      </div>
  </div>
</template>

<script >
    export default {
    
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.title{
    font-size: 30px;
    color:rgb(14, 117, 214) ;
    text-align: center;
    margin-top: 30px;
    font-weight: bold;
}
.main{
    border: 1px solid rgb(218, 215, 215);
    padding: 15px 20px;
    width: 1200px;
    margin: 10px auto;
}
.btn{
    margin-left: 66px;
}
</style>
