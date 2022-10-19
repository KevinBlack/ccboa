export default {
  data() {
    return {}
  },
  methods: {
   handleChosDept(deptName) {
      this.$post.postData(
        "switchUserInfo",
        JSON.stringify({
          function: "switchUserInfo",
          human_Id: deptName
        }),
        this.$businessCode.ggywgn
      ).then((res) => {
       if(res&&res.success){
        return true;
       }else{
        return false;
       }
      }).catch(error => {
        return false
      })
    }
  }
}