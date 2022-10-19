'
' @Author: your name
' @Date: 2020-12-22 19:32:00
' @LastEditTime: 2021-01-25 10:09:41
' @LastEditors: Please set LastEditors
' @Description: In User Settings Edit
' @FilePath: \OA30\src\views\publication\departInfo\choseDepart.vue
'
<!--
 * @Author: your name
 * @Date: 2020-10-26 15:27:24
 * @LastEditTime: 2021-01-27 11:40:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\departInfo\choseDepart.vue
--> 
<template>
  <div>
    <h2 class="apply_title">选择登记部门</h2>
    <div style="height:30px;width:100%;"></div>
    <el-form>
      <el-row>
        <el-form-item label="部门" style="marginLeft:20%">
          <el-select v-model="department" style="width:80%">
            <el-option
              v-for="(item,index) in departmentList"
              :key="index"
              :label="item.unitNames?item.unitNames:item.currUnitName"
              :value="item.currUnitId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <div style="width:100%;text-align:center;">
      <el-button type="primary" @click="savedata">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'departInfochoseDepart',
  data() {
    return {
      departmentList: [],//同一机构下的部门
      department: '',
    }
  },
  methods: {
    savedata() {
      if (this.department) {
        localStorage.removeItem('row')
        this.departmentList.map((item) => {
            if (item.currUnitId==this.department) {
              let objList=JSON.stringify(item)
              this.$intent.goNewPage(this, {
              path:'/publication/departInfo/depart',
              query:{objList:objList}
              });
            }
          })
      }else{
        this.$message({
          message: '请选择登记部门',
          type: 'error',
        })
      }
      this.$emit('closeDialog',false)
    },
    //  获取下拉数据 同一机构下的部门区分
    loadData() {
      const unitInfoArrays = JSON.parse(localStorage.getItem('unitInfo'))
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
      for (const i in unitInfoArrays) {
        if (unitInfoArrays[i].unitId === userInfoData.unitId) {
          this.departmentList.push(unitInfoArrays[i])
        }
      }
      this.department=this.departmentList[0].currUnitId
    }
  },
  created() {
    this.loadData()
  },
}
</script>
<style scoped>
.apply_title {
  width: 100%;
  text-align: center;
  color: royalblue;
  font-size: 30px;
}
</style>