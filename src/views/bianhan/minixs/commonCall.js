/**
 * create by yyl on 2021/12/09 14:42
 * 类注释：秘书工作 - 文件、电话中 常用批语的使用
 * 备注：已经在秘书工作 - 文件、电话中使用，后续修改需要考虑到这两个模块
 */

export default {
  data () {
    return {
      appendWriteDialog: false, // 常用批语 dialog 显示
      offenDevices: [], // 常用批语展示数据
      clickTypes: '', // 当前点击添加常用批语的字段
    }
  },
  methods: {
    // 显示常用批语的 dialog
    showWriteList(type) {
      this.getWriteList().then(() => {
        this.clickTypes = type;
        this.appendWriteDialog = true;
        this.$nextTick(() => {
          this.$refs.writelist.openDialog();
        });
      })
    },
    // 获取常用批语
    getWriteList () {
      return new Promise((resolve, reject) => {
        this.$api.meeting.perWritingSe({}).then((res) => {
          if (res.code === "SUCCESS") {
            this.offenDevices = res.data;
            resolve()
          } else {
            reject()
          }
        });
      })
    },
    //新增批语
    addCommonUse(data) {
      this.$api.meeting
        .perWritingCr({
          hyDnr: data,
        })
        .then((res) => {
          if (res.code == "SUCCESS") {
            this.getWriteList()
          }
        });
    },
    // 删除一条常用批语
    deleteMassage(data) {
      console.log("data", data);
      this.$api.meeting.perWritingDe({
        id: data,
      })
      .then((res) => {
        if (res.code == "SUCCESS") {
          this.getWriteList()
        }
      });
    },
    
    // 将需要提交的数据放入 各自的 dataForm 中
    writelistvalue () {
      throw new Error('需要重写')
    }
  }
}