export default {

  data() {
    return {

    }
  },
  methods: {
    addData() {
      // this.deptList=JSON.parse(localStorage.getItem('unitInfo'))
      // if (this.deptList.length == 1) {
      //   this.$intent.goNewPage(this, {
      //     name: 'addproceorderdeal',
      //     query: {deptDetail: JSON.stringify(this.deptList[0])}
      //   })
      // } else {
      //   this.dialogVisible = true
      //   this.selectDept = this.deptList[0].humanId
      // }
      this.$api.bianhan.getDeptList({}).then(res => {
      	console.log(res.result)
        this.deptList = res.result;
        if (this.deptList.length == 1) {
          localStorage.setItem('bianhan',JSON.stringify(this.deptList[0]))
          this.$intent.goNewPage(this, {
            name: 'addproceorderdeal',
            query: {deptDetail:true}
          })
        } else {
          this.dialogVisible = true
          this.selectDept = this.deptList[0].humanId
        }
      })
    },


  }
}


