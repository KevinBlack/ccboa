<!--
 * @Author: your name
 * @Date: 2020-12-30 10:36:36
 * @LastEditTime: 2021-12-17 17:45:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\sealDrafttt\components\sealImgDetail.vue
-->
<template>
  <div class="sealImgDetail">
    <el-dialog title="用印详情" :visible.sync="sealImgVisable">
      <el-tabs v-model="activePanelName">
        <el-tab-pane label="图片" name="img">
          <el-form label-width="150px">
            <el-form-item label="请选择图片名称">
              <el-select v-model="imgName" :style="{ width: '100%' }">
                <el-option
                  v-for="(item, index) in imgInfo"
                  :key="index"
                  :value="item.id"
                  :label="item.fileName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-image">
            <div class="block" :style="{ textAlign: 'center' }">
              <el-image
                style="width: 310px; height: 420px"
                :src="baseStr"
                fit="contain"
                v-show="imgStrShow"
              ></el-image>
              <img style="width: 310px; height: 420px" v-show="imgShow" @click="lookImg(imgUrl)" :src="imgUrl" alt="">
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频" name="video">
          <div v-if="isHasVideo">
            <div
              class="itemVideo"
              v-for="(item, index) in videoPathArr"
              :key="index"
            >
              <a :href="item.url" target="_blank">{{ item.innerContent }}</a>
            </div>
            <div class="tips">* 点击链接下载并观看视频</div>
            <!-- http://127.0.0.1:8989/SealWebService?wsdl -->
          </div>
          <div v-else>
            <div
              data-v-5c9e273a=""
              class="el-image"
              style="width: 100%; height: 220px"
            >
              <div class="el-image__error">加载失败</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button type="primary" @click="sealImgVisable = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    onlyVideo: { type: Boolean, default: false }
  },
  data () {
    return {
      imgStrShow: false,
      imgShow: false,
      imgUrl: '',
      imgUrlPath: '',
      imgUrlName: '',
      activePanelName: 'img',
      sealImgVisable: false,
      imgName: '',
      imgInfo: [],
      baseStr: '',
      row: {},
      machineIdHj: "",
      // 视频路径数组
      videoPathArr: [],
      // 能否获取到视频
      isHasVideo: false
    }
  },
  watch: {
    imgName (val) {
      this.baseStr = ''
      this.loadImg(val)
    },
    activePanelName: {
      handler (val) {
        if (val === 'video') {
          this.videoPathArr = []
          this.getVideoPath()
        }
      },
      immediate: true
    }
  },
  methods: {
    lookImg(imgUrl) {
      this.$intent.goNewPage(this, {
        path: '/sealManage/useSeal/draft/common/photo',
        query: {
          name: this.imgUrlName,
          url: this.imgUrlPath,
        },
      })
    },
    loadImg (id) {
      this.$api.sealManage.getImg({
        ids: id,
        orderId: this.$route.query.id,
        fileId: this.row.id,
      }).then(res => {
        let ig = res.list[0]
        this.imgUrlPath = ig.filePath
        this.imgUrlName = ig.fileName
        console.log('查看图片列表---->', ig)
        if (ig.imgStr) {
          this.imgStrShow = true
          let baseStr = ig.imgStr
          this.baseStr = 'data:image/jpg;base64,' + baseStr
        } else {
          this.imgShow = true
          console.log('查看图片的id')
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify({
                function: "doDownloadFile",
                fileName: ig.fileName,
                filePath: ig.filePath
              }),
              this.$businessCode.fawglfj
            )
            .then(res => {
              console.log(res, '获取印章图片')
              var host = window.location.host;
              this.imgUrl = "http://" +
                            host +
                            "/ecpweb/getLocalFile.action?relativePath=" +
                            res.filePath +
                            "&fileName=" +
                            res.fileName +
                            "&openFile=true";
            });
        }
          // 循环上传图片接口 异步
          // for (let index = 0; index < 100; index++) {
          //   console.log(index)
          //   this.$api.sealManage.uploadImg({
          //     orderId: this.$route.query.id,
          //     fileName: 's884fo5WPvHYeo73NuWIRdRUAwIrnIjQme_0_1_1.jpg',
          //     fileId: new Date().getTime(),
          //     base64Str: this.baseStr
          //   }).then(res => {
          //     if (res.code == "SUCCESS") {
          //       console.log('上传成功的张数', index)
          //     }
          //   })
          // }
          // // 循环上传图片 同步
        
          // let rLength = 100
          // let _this = this
          // async function recurImg(j, rLength) {
          //   await _this.$api.sealManage.uploadImg({
          //     orderId: _this.$route.query.id,
          //     fileName: 's884fo5WPvHYeo73NuWIRdRUAwIrnIjQme_0_1_1.jpg',
          //     fileId: new Date().getTime(),
          //     base64Str: _this.baseStr
          //   }).then(res => {
          //     if (res.code == "SUCCESS") {
          //       console.log('上传图片次数', j)
          //     }
          //   })
          //   if (++j < rLength) {
          //     recurImg(j, rLength)
          //   }
          //   if (j == rLength) {
          //     return true
          //   }
          // }
          // recurImg(0, rLength)
      })
    },
    show (row) {
      this.row = row
      if (this.activePanelName === 'img') {
        this.$api.sealManage.getImgList({
          orderId: this.$route.query.id,
          fileId: row.id,
        }).then(res => {
          this.imgInfo = res.list
          this.imgName = res.list[0] && res.list[0].id
          this.sealImgVisable = true
        })
      } else {
        this.videoPathArr = []
        this.getVideoPath()
        this.sealImgVisable = true
      }
    },
    /**
     * 获取视频地址
     */
    async getVideoPath () {
      let action = 'getsealinfo'
      let randomStr = this.row.id
      console.log('this.row', this.row);
      console.log('randomStr', randomStr);
      let machineId = this.row.machineId
      let resData = await this.$api.sealManage.useSealDevice.registerDetail({
        machineId
      })
      console.log("🚀 ~ file: sealImgDetail.vue ~ line 141 ~ getVideoPath ~ resData", resData)
      // let ipConfig=resData.data.machineServerIp
      let ipConfig = 'localhost'
      // 暂时写死
      // let machineId = '29'
      // let machineId = 'SG361101812006'
      // let machineId = '18110652'
      // let data = ''
      // //SOAP
      // data = '<?xml version="1.0" encoding="utf-8"?>';
      // data = data + '<soap:Envelope  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:xsd="http://www.w3.org/2001/XMLSchema"  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
      // data = data + '<soap:Body>';
      // data = data + '<WSMAIN xmlns="http://server.ccb.com/">'; //这里就是发布的方法名和xml文档中的命名空间地址（图中画线部分）
      // data = data + '<WSXML >';
      // data = data + '<request>'
      // data = data + '<item name="action" >' + action + '</item>'
      // data = data + '<item name="sealunid" >' + randomStr + '</item>'
      // data = data + '<item name="machineid" >' + machineId + '</item>'
      // data = data + '</request>'
      // data = data + '</WSXML>';
      // data = data + '</WSMAIN>';
      // data = data + '</soap:Body>';
      // data = data + '</soap:Envelope>';


      let data1 = '';
      data1 = '<?xml version="1.0" encoding="utf-8"?>';
      data1 = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://server.ccb.com/">';
      data1 = data1+'<soapenv:Header/>';
      data1 = data1+'<soapenv:Body>';
      data1 = data1+'<ser:WSMAIN>';
      data1 = data1+'<!--Optional:-->';
      data1 = data1+'<WSXML><![CDATA[<?xml version="1.0" encoding="UTF-8"?>';
      data1 = data1+'<request>';
      data1 = data1+'<item name="action">' + action + '</item>';
      data1 = data1+'<item name="sealunid">' + randomStr + '</item>';
      data1 = data1+'<item name="machineid">' + machineId + '</item>';
      data1 = data1+'</request>';
      data1 = data1+']]></WSXML>';
      data1 = data1+'</ser:WSMAIN>';
      data1 = data1+'</soapenv:Body>';
      data1 = data1+'</soapenv:Envelope>';
      console.log('data', data1);
      let loading = this.$loading({
        lock: true,
        text: "loading"
      })
      setTimeout(() => {
        if (loading) {
          loading.close();
        }
      }, 10000)
      var xmlhttp = new XMLHttpRequest()
      let serverUrl = `http://${ipConfig}:8080/gssws/services/SealWebService?wsdl`
      // let serverUrl = 'http://localhost:8080/gssws/services/SealWebService?wsdl'
      xmlhttp.open("POST", serverUrl, true);
      xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
      xmlhttp.send(data1);
      console.log('send----------------------');
      let that = this
      xmlhttp.onreadystatechange = function () {
        console.log('onreadystatechange');
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          loading.close()
          console.log('200-------------------------',xmlhttp);
          var returnInfo = xmlhttp.responseText;
          console.log('returnInfo', returnInfo);
          if (returnInfo.indexOf("404") > -1) {
            that.$message({
              type: 'warning',
              message: '未找到服务器地址错误404！'
            })
            that.isHasVideo = false
            return
          }
          var begin = returnInfo.indexOf("<WSMAINReturn>");
          var end = returnInfo.lastIndexOf("</WSMAINReturn>");

          if (begin == '-1' || end == '-1') {
            begin = returnInfo.indexOf("<return>");
            end = returnInfo.lastIndexOf("</return>");
            returnInfo = returnInfo.substring(begin + 8, end);
            returnInfo = returnInfo.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#xD;/g, "").replace(/&#xA;/g, "").replace(/]]&amp;gt;/g, "").replace(/([#[+])/g, "").replace(/&amp;lt;!CDATA/g, "")
            this.machineIdHj = 'hj'
            console.log('ys', returnInfo);
          } else {
            returnInfo = returnInfo.substring(begin + 14, end);
            returnInfo = returnInfo.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#xD;/g, "").replace(/&#xA;/g, "");
            console.log('yesssssssssssss', returnInfo);
          }
          /**
           * 解析返回报文
           */
          let domParser = new DOMParser();
          let xmlDoc = domParser.parseFromString(returnInfo, 'text/xml');
          console.log('xmlDoc', xmlDoc);
          let responsestatusDom = xmlDoc.getElementsByTagName('responsestatus')[0]
          let responsestatus = responsestatusDom.innerHTML || responsestatusDom.textContent
          let responsetextDom = xmlDoc.getElementsByTagName('responsetext')[0]
          let responsetext = responsetextDom.innerHTML || responsetextDom.textContent
          console.log('responsestatus', responsestatus);
          if (parseInt(responsestatus) !== 100) {
            that.$message({
              type: 'warning',
              message: responsetext
            })
            that.isHasVideo = false
            return
          }
          that.isHasVideo = true
          let resxml = xmlDoc.getElementsByTagName('resxml')[0]
          // let children = resxml.children
          let children = resxml.getElementsByTagName('item')
          console.log('children', children);
          let responseObj = {}
          for (let i = 0; i < children.length; i++) {
            const element = children[i];
            console.log(element);
            let key = element.getAttribute('name')
            if (element.innerHTML) {//Google
              responseObj[key] = element.innerHTML
            } else {//IE
              responseObj[key] = element.textContent
            }
          }
          console.log('responseObj', responseObj);
          let videoList = responseObj.vidname.split("$$")
          if (this.machineIdHj == 'hj') {
            console.log(this.machineIdHj)
            videoList.map((item, index) => {
              let videoUrl = {};
              videoUrl.url = responseObj.vidpath.replace(/amp;/g, "") + item
              videoUrl.innerContent = index + 1 + '. ' + item
              that.videoPathArr.push(videoUrl)
            })
          } else {
            videoList.map((item, index) => {
              let videoUrl = {};
              videoUrl.url = responseObj.vidpath + item
              videoUrl.innerContent = index + 1 + '. ' + item
              that.videoPathArr.push(videoUrl)
            })
          }
          console.log('this.videoPathArr', that.videoPathArr);
          console.log(`获取到视频，输出isHasVideo`, that.isHasVideo)
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
.sealImgDetail {
  .itemVideo {
    padding-left: 20px;
    a {
      font-size: 16px;
      line-height: 34px;
    }
    a:hover {
      color: #409eff;
    }
  }
  .tips {
    margin-top: 3px;
    padding-left: 25px;
    font-size: 12px;
    color: #f56c6c;
  }
}
</style>
