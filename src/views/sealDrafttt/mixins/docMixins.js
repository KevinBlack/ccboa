/*
 * @Author: your name
 * @Date: 2020-12-26 17:07:27
 * @LastEditTime: 2021-06-16 16:59:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\sealDrafttt\mixins\docMixins.js
 */
export default {
  data () {
    return {
      // 用印信息弹窗
      sealInfoDialog: false,
      // 用印材料
      sealInfoForm: {
        title: ""
      },
      sealInfoTabData: [],
      sealInfoTabCols: [
        { label: "印章简称", prop: "sealName" },
        { label: "用印数", prop: "sealBatchSum" },
        { label: "已用印数", prop: "successCount" },
        { label: "印章类别", prop: "sealType" },
        { label: "所属印章机", prop: "sealMeachine" },
        { label: "用印机中的位置", prop: "sealPosition" }
      ],
      // 所有批次用印信息数组
      sealInfoArr: [
        // {
        //   title: 'yizi',
        //   sealName: '行章',
        //   sealBatchSum: parseInt(5),
        //   doneSeal: 0,
        //   sealType: "0",
        //   sealMeachine: "金鹰29",
        //   sealPosition: 1
        // },
        // {
        //   title: 'yizi1',
        //   sealName: '行章1',
        //   sealBatchSum: parseInt(7),
        //   doneSeal: 0,
        //   sealType: "0",
        //   sealMeachine: "金鹰29",
        //   sealPosition: 3
        // },
        // {
        //   title: 'yizi2',
        //   sealName: '行章2',
        //   sealBatchSum: parseInt(9),
        //   doneSeal: 0,
        //   sealType: "0",
        //   sealMeachine: "金鹰29",
        //   sealPosition: 2
        // },
      ],
      /**
       * 用印方式弹窗
       */
      useSealModeDialog: false,
      useSealModeForm: {
        useSealMode: ""
      },
      useSealModeRules: {
        useSealMode: {
          required: true,
          message: "请选择用印方式",
          trigger: "change"
        }
      },
      //盖章状态
      isShowSealState: false,
      //盖章状态表格
      tableSealStateData: [],
      rtfAssetList: [],
      tableSealStateCols: [
        { label: "材料名称", prop: "assentName" },
        { label: "印章简称", prop: "sealName" },
        { label: "用印数", prop: "sealBatchSum" },
        { label: "正常", prop: "successCount" },
        { label: "作废", prop: "cancelCount" },
        {
          label: "查看详情", type: 'Button',
          btnList: [
            {
              type: "primary",
              label: "查看",
              size: 'small',
              handle: row => {
                this.SealStateDetail(row)
              }
            }
          ]
        }
        // { label: "异常次数", prop: "errorCount" }
      ],
    }
  },
  methods: {
    //用印
    // 确定用印方式
    sureUseSealMode () {
      this.$refs.useSealModeDia.validate(valid => {
        if (valid) {
          // sealInfoTabCols: [
          // { label: '印章简称', prop: 'sealName' },
          // { label: '用印数', prop: 'sealBatchSum' },
          // { label: '已用印数', prop: 'doneSeal' },
          // { label: '印章类别', prop: 'sealType' },
          // { label: '所属印章机', prop: 'sealMeachine' },
          // { label: '用印机中的位置', prop: 'sealPosition' }
          // ],

          this.sealInfoArr = []
          this.sealInfoTabData = []
          let fldYyfsObj = {};
          this.tableData.map(item => {
            item.useSealArr.map(ssItem => {
              fldYyfsObj[ssItem.sealName] = ssItem.sealPosition;
            });
          });
          if (this.useSealModeForm.useSealMode === 0) {
            console.log('this.tableData', this.tableData);
            console.log('fldYyfsObj', fldYyfsObj);
            // sealInfoForm.title
            // this.tableData.TITLE
            // sealDetail
            // useSealCount
            // this.sealInfoArr

            this.tableData.map(item => {
              let sealStrArr = item.sealDetail.split(',')
              sealStrArr.map(sealStrArrItem => {
                let sealArr = sealStrArrItem.split(' ')
                if (fldYyfsObj[sealArr[0]] === '用印机') {
                  let sealInfo = item.useSealArr.find(ssItem => ssItem.sealName === sealArr[0])
                  let everyBatchObj = {
                    assentName: item.title,
                    sealName: sealArr[0],
                    sealBatchSum: parseInt(sealArr[1]) * parseInt(item.useSealCount),
                    doneSeal: 0,
                    sealMeachine: sealInfo.sealDeviceName,//用印机名称
                    machineId: sealInfo.machineId
                  }
                  Object.assign(everyBatchObj, sealInfo)
                  everyBatchObj.sealPosition = sealInfo.sealPots//印章在用印机中位置
                  this.sealInfoArr.push(everyBatchObj)
                }
              })
            })
          } else if (this.useSealModeForm.useSealMode === 1) {
            let sumarObj = JSON.parse(this.sumar)
            let sealInfo1 = {}
            for (const key in sumarObj) {
              if (sumarObj.hasOwnProperty(key)) {
                if (fldYyfsObj[key] === '用印机') {
                  let titleArr = []
                  let sealInfo = {}
                  console.log(this.tableData, '158')
                  this.tableData.map(item => {
                    if (item.sealDetail.includes(key)) {
                      titleArr.push(item.title)
                    }
                    sealInfo = item.useSealArr.find(ssItem => ssItem.sealName === key)
                    if (sealInfo) {
                      return sealInfo1 = sealInfo
                    }
                  });
                  sealInfo = sealInfo1
                  let title = titleArr.join(',')
                  const element = sumarObj[key];
                  let everyBatchObj = {
                    assentName: title,
                    sealName: key,
                    sealBatchSum: parseInt(element),
                    doneSeal: 0,
                    sealMeachine: sealInfo.sealDeviceName,//用印机名称
                    machineId: sealInfo.machineId
                  }
                  Object.assign(everyBatchObj, sealInfo)
                  everyBatchObj.sealPosition = sealInfo.sealPots//印章在用印机中位置
                  this.sealInfoArr.push(everyBatchObj)
                }
              }
            }
          }
          console.log("this.sealInfoArr0000", this.sealInfoArr);
          this.randomStr1 = this.getRandomStr();
          this.sealInfoArr.map((item, index) => {
            this.$set(item, "successCount", 0); //正常
            this.$set(item, "cancelCount", 0); //作废
            this.$set(item, "errorCount", 0); //异常
            this.$set(item, "markfilename", []);
            this.$set(item, "numIndex", index);
            this.$set(item, "id", this.randomStr1 + '_' + item.numIndex);
          });
          console.log("this.sealInfoArr1111", this.sealInfoArr);
          this.sealInfoTabData.push(this.sealInfoArr[0]);
          // this.sealInfoTabData[0].numID = 0;
          this.sealInfoForm.title = this.sealInfoTabData[0].assentName;
          this.$nextTick(() => {
            this.useSealModeDialog = false;
            this.sealInfoDialog = true;
          });
        }
      })
    },
    // 下一批
    nextBatch () {
      let data = JSON.parse(
        JSON.stringify(
          this.tableSealStateData.length > 0
            ? this.tableSealStateData
            : this.sealInfoArr
        )
      );
      console.log("data", data);
      let num = parseInt(this.sealInfoTabData[0].numIndex);
      num = num === data.length - 1 ? 0 : num + 1;
      this.sealInfoTabData.splice(0, 1, data[num]);
      // this.sealInfoTabData[0].numID = num;
      console.log("this.sealInfoTabData", this.sealInfoTabData);
      if (
        parseInt(this.sealInfoTabData[0].successCount) >=
        parseInt(this.sealInfoTabData[0].sealBatchSum)
      ) {
        this.nextBatch();
      }
      this.sealInfoForm.title = this.sealInfoTabData[0].assentName;
    },
    // 确定用印
    sureUseSeal () {
      // { label: '印章简称', prop: 'sealName' },
      // { label: '用印数', prop: 'sealBatchSum' },
      // { label: '已用印数', prop: 'doneSeal' },
      // { label: '印章类别', prop: 'sealType' },
      // { label: '所属印章机', prop: 'sealMeachine' },
      // { label: '用印机中的位置', prop: 'sealPosition' }

      if (!this.form.useTime) {
        this.$api.sealManage
          .getUseSealType({ sysConfig: "7" })
          .then(res => {
            this.form.useTime = res.newDateYY;
            this.$api.sealManage.updateDocument({
              useTime: this.form.useTime,
              id: this.$route.query.id
            }).then(res => {
              this.sureSealNoneTime()
            })
          });
      } else {
        this.sureSealNoneTime()
      }
    },
    sureSealNoneTime () {
      if (this.tableSealStateData.length === 0) {
        this.$api.sealManage
          .updateDocument({
            markMainForm: this.randomStr1,
            yyType: this.sealInfoArr,
            id: this.$route.query.id
          })
          .then(res => {
            this.tableSealStateData = JSON.parse(JSON.stringify(this.sealInfoArr));
            console.log("this.tableSealStateData", this.tableSealStateData);
            this.form.yyType = JSON.parse(
              JSON.stringify(this.tableSealStateData)
            );
            console.log("res", res);
            this.sealInfoDialog = false;
            this.beginSeal(this.sealInfoTabData[0]);
          });
      } else {
        this.sealInfoDialog = false;
        this.beginSeal(this.sealInfoTabData[0]);
      }
    },
    useSealMeth () {
      // **************************调取用印弹窗数据
      if (this.tableSealStateData.length > 0) {
        let isFinishSeal = this.tableSealStateData.every(item => {
          return parseInt(item.successCount) >= parseInt(item.sealBatchSum);
        });
        if (isFinishSeal) {
          this.$message({
            type: "warning",
            message: "已用印完成！"
          });
          throw new Error("用印完成");
        }
        this.sealInfoTabData = [];
        this.sealInfoTabData.push(this.tableSealStateData[0]);
        // this.sealInfoTabData[0].numID = 0;
        this.sealInfoForm.title = this.sealInfoTabData[0].assentName;
        this.$nextTick(() => {
          this.sealInfoDialog = true;
          if (
            parseInt(this.sealInfoTabData[0].successCount) >=
            parseInt(this.sealInfoTabData[0].sealBatchSum)
          ) {
            this.nextBatch();
          }
        });
        return;
      } else {
        if (this.fldYyfs && this.fldYyfs.includes("机器盖章")) {
          this.useSealModeDialog = true;
        } else {
          this.$api.sealManage
            .getUseSealType({ sysConfig: "7" })
            .then(res => {
              this.$api.sealManage.updateDocument({
                useTime: res.newDateYY,
                id: this.$route.query.id
              }).then(resSave => {
                this.form.useTime = res.newDateYY;
              })
            });
        }
      }
    }
  },
}

