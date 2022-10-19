export default {
  data() {
    return {}
  },
  methods: {
   async handleChosDept(deptName) {
      let resultInfo = {state:false,type:false};
      await this.$post.postData(
        "switchUserInfo",
        JSON.stringify({
          function: "switchUserInfo",
          human_Id: deptName
        }),
        this.$businessCode.ggywgn
      ).then((res) => {
       if(res&&res.success){
        resultInfo.type = true;
       }else{
        resultInfo.type = false;
       }
       resultInfo.state = true;
       return resultInfo;
      })
    }
  }
}