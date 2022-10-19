/**
* create by zx on 2020/8/26 19:33
* 类注释：选择部门
* 备注：
*/
<template>
  <div class="flowChart">
    <el-dialog title="选择部门" :visible.sync="dialogVisible" width="40%">
      <el-select v-model="selectDept" style="width:100%">
        <el-option
          v-for="item in deptList"
          :key="item.currUnitId"
          :label="item.currUnitName"
          :value="item.humanId">
        </el-option>
      </el-select>
      <el-row style="text-align: right;margin-top: 30px">
        <el-button @click="sure">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            value: {
                type: Boolean,
                default() {
                    return false
                }
            },
            deptList: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectDept:{
                type:Object,
                default(){
                    return{}
                }
            }
        },
        watch: {
            dialogVisible(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.dialogVisible = val
            },
        },
        data() {
            return {
                dialogVisible: false,
            }
        },
        computed: {},
        methods: {
            sure() {
                this.dialogVisible = false
                let select = {}
                if(isEmptyObject(this.selectDept)||this.selectDept!='')
                this.deptList.forEach(item => {
                    if (item.humanId == this.selectDept) {
                        select = item
                    }
                })
                this.$emit('surefun',select)                
            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
