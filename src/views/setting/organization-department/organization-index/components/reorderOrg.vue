<!--
 * @Author: wy
 * @Date: 2020-06-28 10:27:58
 * @LastEditTime: 2020-08-28 15:09:20
 * @LastEditors: Please set LastEditors
 * @Description:调整下级结构顺序
 * @FilePath: \ccboa\src\views\system-manage\organization-department\organization-index\index.vue
-->
<template>
  <div class="reorderOrg">
    <m-table
      ref="orgTable"
      size="medium"
      :isSelection="true"
      :isHandle="true"
      :tableHandles="tableHandles"
      :tableData="tableData"
      :tableCols="tableCols"
      :isIndex="true"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
export default {
  name: 'reorderOrg',
  components: {
    mTable
  },
  props: {},
  data () {
    return {
      tableData: [
        {
          roleName: 2,
          memberNo: '07',
          uass: 4,
          department: 5
        },
        {
          roleName: 2,
          memberNo: '06',
          uass: 4,
          department: 5
        },
        {
          roleName: 2,
          memberNo: '05',
          uass: 4,
          department: 5
        },
        {
          roleName: 2,
          memberNo: '04',
          uass: 4,
          department: 5
        },
        {
          roleName: 2,
          memberNo: '03',
          uass: 4,
          department: 5
        },
        {
          roleName: 2,
          memberNo: '02',
          uass: 4,
          department: 5
        },
        {
          roleName: 2,
          memberNo: '01',
          uass: 4,
          department: 5
        }
      ],
      tableHandles: [
        {
          type: 'primary',
          label: '置顶',
          handle: () => {
            this.rowTop()
          }
        },
        {
          type: 'primary',
          label: '上移',
          handle: () => {
            this.rowUp()
          }
        },
        {
          type: 'primary',
          label: '下移',
          handle: () => {
            this.rowDown()
          }
        },
        {
          type: 'primary',
          label: '置底',
          handle: () => {
            this.rowBottom()
          }
        },
        {
          type: 'primary',
          label: '确定',
          handle: () => {
            this.saveOrder()
          }
        },
        {
          type: 'primary',
          label: '取消',
          handle: () => {
            this.$router.go(-1)
          }
        }
      ],
      tableCols: [
        { label: '机构序号', prop: 'memberNo' },
        { label: '机构简称', prop: 'roleName' },
        { label: '机构ID', prop: 'department' },
        { label: '机构全称', prop: 'uass' }
      ],
      pagination: {
        pageNum: 1,
        total: 10
      }
    }
  },
  computed: {},
  methods: {
    saveOrder () {
      this.$router.go(-1)
    },
    //置顶
    rowTop () {
      const selections = this.$refs.orgTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index !== 0) {
          this.tableData.unshift(this.tableData.splice(index, 1)[0])
        } else {
          this.$message({
            message: '该条数据已是第一条！',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //上移
    rowUp () {
      const selections = this.$refs.orgTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index !== 0) {
          this.tableData[index] = this.tableData.splice(index - 1, 1, this.tableData[index])[0]
        } else {
          this.tableData.push(this.tableData.shift())
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //下移
    rowDown () {
      const selections = this.$refs.orgTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index === this.tableData.length - 1) {
          this.tableData.unshift(this.tableData.pop())
        } else {
          this.tableData[index] = this.tableData.splice(index + 1, 1, this.tableData[index])[0]
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    //置底
    rowBottom () {
      const selections = this.$refs.orgTable.$refs.cesTable.selection
      if (selections.length === 1) {
        const index = selections[0].index
        if (index === this.tableData.length - 1) {
          this.$message({
            message: '该数据已是最后一条！',
            type: 'warning'
          })
        } else {
          this.tableData.push(this.tableData.splice(index, 1)[0])
        }
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    }
  },
  activated () {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.reorderOrg {
}
</style>
