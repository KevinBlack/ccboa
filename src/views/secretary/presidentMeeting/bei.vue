<!--
 * @Author: your name
 * @Date: 2020-11-20 17:00:05
 * @LastEditTime: 2020-11-20 17:00:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\secretary\presidentMeeting\bei.vue
--> 
 // 删除
    // del_btn() {
    //   // if (this.deleteArry) {
    //     this.$confirm('是否确定删除当前选中数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     }).then(() => {
    //       this.$api.duty.DeleteTableData({ ids: this.id}).then((res) => {
    //         if (res.code == 'SUCCESS') {
    //           // this.deleteArry = ''
    //           this.$message({
    //             message: '删除成功',
    //             type: 'success',
    //           })
    //         }
    //         this.loadData()
    //       })
    //     })
    //   // } else {
    //   //   this.$message({
    //   //     type: 'warning',
    //   //     message: '请选择要删除的数据',
    //   //   })
    //   // }
    // },
    //  save_btn() {
    //   this.$refs.addForm.validate((valid) => {
    //     if (valid) {
    //       this.btnType = 'save'
    //       this.isSave = !this.isSave
    //       if (this.tabsType === '00002') {
    //         this.$api.duty.saveFormData({ ...this.formData, route: this.tabsType }).then((res) => {
    //           this.$message.success('保存成功')
    //           this.isSave = true
    //         })
    //       } else {
    //         this.$api.duty
    //           .saveFormData({ ...this.formData, columnType: this.tabsType })
    //           .then((res) => {
    //             this.$message.success('保存成功')
    //             this.isSave = true
    //           })
    //       }
    //     }
    //   })
    // },