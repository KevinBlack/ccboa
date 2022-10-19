<template>
  <div class="content">
    <div class="btn-list">
      <el-button type="primary" @click="closedata">关闭</el-button>
      <el-button type="primary" @click="savedata">保存</el-button>
    </div>
    <div class="formdata">
      <p class="base-title">节假日配置</p>
      <fd-form
        style="margin:0 1%"
        ref="fdForm"
        @event="itemClick"
        :data="applyformData"
        :columns="applyformCfg"
        :config="serverconfig"
      ></fd-form>

      <el-dialog
        title="选择日期"
        :visible.sync="dialogVisible"
        width="30%">
        <calendar v-model="selectData" @noNeed="noNeed">
        </calendar>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import FdForm from 'vue-elementui-freedomen/components/form'
    import calendar from './main'

    export default {
        name: 'servereditor',
        components: {
            FdForm,
            calendar
        },
        created() {
            this.applyformData = this.$route.query.detail ? JSON.parse(this.$route.query.detail) : {}
            this.selectData = this.$route.query.detail ? JSON.parse(this.$route.query.detail).year : "";
            this.setConfig()
        },
        data() {
            return {
                type: -1,
                dialogVisible: false,
                selectData: "",
                need: true,
                applyformData: {},
                applyformCfg: [],
                serverconfig: {
                    labelWidth: '160px'
                }
            }
        },
        watch: {
            selectData(val) {
                if (formatBData(val, "YYYY") != this.applyformData.year) {
                    this.$message({type: "error", message: '选择年份不正确'})
                    return
                }
                if (this.need) {
                    this.need = false
                    return;
                }
                switch (this.type) {
                    case 0:
                        if (this.applyformData.holidays.indexOf(formatBData(val, "YYYY-MM-DD")) != -1)
                            this.$message({type: "error", message: "已添加过该日期"})
                        else
                            this.$set(this.applyformData, 'holidays', this.applyformData.holidays + (this.applyformData.holidays ? "," : "") + formatBData(val, "YYYY-MM-DD"))
                        break
                    case 1:
                        if (this.applyformData.workDays.indexOf(formatBData(val, "YYYY-MM-DD")) != -1)
                            this.$message({type: "error", message: "已添加过该日期"})
                        else
                            this.$set(this.applyformData, 'workDays', this.applyformData.workDays + (this.applyformData.workDays ? "," : "") + formatBData(val, "YYYY-MM-DD"))
                        break
                    case 2:
                        if (this.applyformData.restDays.indexOf(formatBData(val, "YYYY-MM-DD")) != -1)
                            this.$message({type: "error", message: "已添加过该日期"})
                        else
                            this.$set(this.applyformData, 'restDays', this.applyformData.restDays + (this.applyformData.restDays ? "," : "") + formatBData(val, "YYYY-MM-DD"))
                        break
                    case 3:
                        if (this.applyformData.springHolidays.indexOf(formatBData(val, "YYYY-MM-DD")) != -1)
                            this.$message({type: "error", message: "已添加过该日期"})
                        else
                            this.$set(this.applyformData, 'springHolidays', this.applyformData.springHolidays + (this.applyformData.springHolidays ? "," : "") + formatBData(val, "YYYY-MM-DD"))
                        break
                }
                this.setConfig()
            }
        },
        methods: {
            noNeed() {
                this.need = true
            },
            setConfig() {
                this.applyformCfg = [
                    {
                        type: 'date-year',
                        prop: 'year',
                        label: '年份',
                        span: 22,
                        style: {width: '100%'},
                        rule: "must",
                        valueFormat: "yyyy",
                        disabled: !isEmptyObject(this.$route.query.detail)
                    },
                    {
                        type: 'input-area',
                        prop: 'holidays',
                        label: '法定节假日',
                        span: 22,
                        style: {width: '100%'},
                        config: {rows: 3}
                    },
                    {type: 'button-primary', value: '选择日期', span: 2, prop: 'button1', style: {'margin-left': '-60px'}},
                    {
                        type: 'input-area',
                        prop: 'workDays',
                        label: '调为工作日的休息日',
                        span: 22,
                        style: {width: '100%'},
                        config: {rows: 3}
                    },
                    {type: 'button-primary', value: '选择日期', span: 2, prop: 'button2', style: {'margin-left': '-60px'}},
                    {
                        type: 'input-area',
                        prop: 'restDays',
                        label: '调为休息日的工作日',
                        span: 22,
                        style: {width: '100%'},
                        config: {rows: 3}
                    },
                    {type: 'button-primary', value: '选择日期', span: 2, prop: 'button3', style: {'margin-left': '-60px'}},
                    {
                        type: 'input-area',
                        prop: 'springHolidays',
                        label: '春节',
                        span: 22,
                        style: {width: '100%'},
                        config: {rows: 3}
                    },
                    {type: 'button-primary', value: '选择日期', span: 2, prop: 'button4', style: {'margin-left': '-60px'}},
                    {
                        type: 'input-area',
                        prop: 'yearHolidays',
                        label: '全年节假日',
                        span: 22,
                        style: {width: '100%'},
                        config: {rows: 5}
                    },
                ]
            },
            closedata() {
                this.$confirm("是否保存并退出当前页面?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.savedata();
                    })
                    .catch(() => {
                        this.$router.push('/setting/sysConfig/otherconfig/holiday')
                    });


            },
            savedata() {
                this.$refs.fdForm.submit().then(data => {
                    this.$api.setSysConfig.setHoliday({
                        calendars: this.applyformData,
                        type: this.$route.query.detail ? "1" : "0"
                    }).then(res => {
                        this.$router.back()
                    })
                })
            },
            itemClick(params) {
                switch (params.prop) {
                    case 'year':
                        this.type = -1;
                        this.selectData = params.row.year
                        this.applyformData.holidays = ''
                        this.applyformData.workDays = ''
                        this.applyformData.restDays = ''
                        this.applyformData.springHolidays = ''
                        this.applyformData.yearHolidays = ''
                        break
                    case "button1":
                        if (!this.applyformData.year){
                            this.$message({type: "error", message: '请先选择年份'})
                            return
                        }
                        this.type = 0
                        this.dialogVisible = true
                        break
                    case "button2":
                        if (!this.applyformData.year){
                            this.$message({type: "error", message: '请先选择年份'})
                            return
                        }
                        this.type = 1
                        this.dialogVisible = true
                        break
                    case "button3":
                        if (!this.applyformData.year){
                            this.$message({type: "error", message: '请先选择年份'})
                            return
                        }
                        this.type = 2
                        this.dialogVisible = true
                        break
                    case "button4":
                        if (!this.applyformData.year){
                            this.$message({type: "error", message: '请先选择年份'})
                            return
                        }
                        this.type = 3
                        this.dialogVisible = true
                        break
                }
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;

    .formdata {
      margin-top: 24px;

    }

    .base-title {
      margin: 22px;
      color: #3c86f0;
    }

    .pay-tid {
      width: 100%;
      text-align: center;
      margin: 20px 0px;
    }
  }
</style>
