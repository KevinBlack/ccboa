<!--
 * @Author: your name
 * @Date: 2021-12-17 14:14:24
 * @LastEditTime: 2021-12-17 18:35:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa-web\src\views\sealDrafttt\components\photo.vue
--> 
<template>
  <div>
    <div class="btn">
      <el-button @click="SetImgRotate(0)">左旋转</el-button>
      <el-button @click="SetImgRotate(1)">右旋转</el-button>
    </div>
    <div class="photo">
      <img id="imag" :src="url" alt />
      <!-- <img id="imag" src="../../../assets/images/background.png" alt /> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: this.$route.query.url,
      imgName: this.$route.query.name,
      rotate : 0,
      url: ""
    };
  },
  methods: {
    SetImgRotate(index) {
      let img = document.getElementById('imag')
      if (index == 0) {
        // console.log('左旋转')
        this.rotate = (this.rotate - 90) % 360
      }
      if (index == 1) {
        // console.log('右旋转')
        this.rotate = (this.rotate + 90) % 360
      }
      img.style.transform=  'rotate(' + this.rotate + 'deg)'
    }
  },
  created() {
    this.$post
      .postData(
        "doDownloadFile",
        JSON.stringify({
          function: "doDownloadFile",
          fileName: this.imgName,
          filePath: this.imgUrl
        }),
        this.$businessCode.fawglfj
      )
      .then(res => {
        var host = window.location.host;
        this.url =
          "http://" +
          host +
          "/ecpweb/getLocalFile.action?relativePath=" +
          res.filePath +
          "&fileName=" +
          res.fileName +
          "&openFile=true";
      });
  }
};
</script>
<style lang="less" scoped>
.photo{
  width: 60%;
  margin: 0 auto;
}
#imag{
  width: 100%;
}
</style>