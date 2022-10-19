/**
 * create by zx on 2020/9/2 10:07
 * 类注释：表单控制
 * 备注：
 */

export default {
  data() {
    return {}
  },
  methods: {
    /**
     * 按钮展示
     * @param buttonList   全部按钮  [{name: '保存', type: 'baocun', show: false},]
     * @param showButton  展示按钮
     * @param conditionButton 带约束条件的按钮
     * @returns {*}
     */
    showButton(buttonList, showButton, conditionButton) {
      buttonList.map(item => {
        item.show = false
      })
      let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"))
      if (showButton) {
        for (let item in showButton) {
          for (let i = 0; i < buttonList.length; i++) {
            if (item == buttonList[i].type) {
              if (showButton[item].role && showButton[item].role.length > 0) {
                tcHumanRole.map(items => {
                  if (showButton[item].role.indexOf(items.dicId + "") != -1) {
                    buttonList[i].show = true
                  }
                })
              } else {
                buttonList[i].show = true
              }
            }
          }
        }
      }
      if (conditionButton) {
        for (let item in conditionButton) {
          let roleIsOk = false;
          if (conditionButton[item].role && conditionButton[item].role.length > 0) {
            tcHumanRole.map(items => {
              if (conditionButton[item].role.indexOf(items.dicId + "") != -1) {
                roleIsOk = true
              }
            })
          } else {
            roleIsOk = true
          }
          if (conditionButton[item].condition) {
            let role = conditionButton[item].condition.join("&&")
            for (let i = 0; i < buttonList.length; i++) {
              if (item == buttonList[i].type && this.conditionIsOk(role) && roleIsOk) {
                buttonList[i].show = true
                break
              }
            }
          }
        }
      }
      return buttonList
    },

    /**
     *语句转换
     * @param value
     * @returns {any}
     */
    conditionIsOk(value) {
      try {
        return eval(value)
      } catch (e) {
        console.log("执行约束条件出错：", e, value)
        return false
      }
    },

    /**
     * 设置必填意见域
     * @param vue
     * @param allRequiredIdeaFields
     * @param requiredIdeaFields
     * @returns {*}
     */
    setRequiredIdeaFields(allRequiredIdeaFields, requiredIdeaFields) {
      if (requiredIdeaFields && requiredIdeaFields.length > 0) {
        requiredIdeaFields.forEach(item => {//必填意见域
          this.$set(allRequiredIdeaFields, item, true)
        })
      }
      return allRequiredIdeaFields
    },

    /**
     * 设置可编辑意见域
     * @param vue
     * @param allEditedIdeaFields
     * @param editedIdeaFields
     * @returns {*}
     */
    setEditedIdeaFields(allEditedIdeaFields, editedIdeaFields, conditionEditedIdeaFields) {
      if (editedIdeaFields && editedIdeaFields.length > 0) {
        editedIdeaFields.forEach(item => {//可编辑意见域
          this.$set(allEditedIdeaFields, item, false)
        });
      }
      if (conditionEditedIdeaFields)
        for (let item in conditionEditedIdeaFields) {////带约束条件的可编辑意见域
          let val = conditionEditedIdeaFields[item].condition.join("&")
          for (let items in allEditedIdeaFields) {
            try {
              if (item == items && this.conditionIsOk(val)) {
                this.$set(allEditedIdeaFields, items, false)
                break
              }
            } catch (e) {
              console.log("设置束条件的可编辑意见域语句出错：", val)
            }
          }
        }
      return allEditedIdeaFields
    },

    /**
     * 设置必填控制域
     * @param vue
     * @param allRequiredFields
     * @param requiredFields
     * @returns {*}
     */
    setRequiredFields(allRequiredFields, requiredFields) {
      if (requiredFields && requiredFields.length > 0) {
        requiredFields.forEach(item => {//必填控制域
          this.$set(allRequiredFields, item, true)
        })
      }
      return allRequiredFields
    },

    /**
     * 设置不可编辑控制域
     * @param vue
     * @param allReadFields
     * @param readFields
     * @returns {*}
     */
    setReadFields(allReadFields, readFields) {
      if (readFields && readFields.length > 0) {
        readFields.forEach(item => {//不可编辑控制域
          this.$set(allReadFields, item, true)
        })
      }
      return allReadFields
    },

    /**
     * 带约束条件的环节
     * @param allNextNode 所有环节
     * @param acyNodeNextBount  约束条件的环节
     */
    shoNextNode(allNextNode, acyNodeNextBount) {
      let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"))
      if (acyNodeNextBount) {
        for (let item in acyNodeNextBount) {
          let roleIsOk = false;
          if (acyNodeNextBount[item].role && acyNodeNextBount[item].role.length > 0) {
            tcHumanRole.map(items => {
              if (acyNodeNextBount[item].role.indexOf(items.dicId + "") != -1) {
                roleIsOk = true
              }
            })
          } else {
            roleIsOk = true
          }
          if (acyNodeNextBount[item].condition) {
            let role = acyNodeNextBount[item].condition.join("&&")
            for (let i = allNextNode.length; i > 0; i--) {
              //PCSAVYID下一环节节点ｉｄ
              if (item == allNextNode[i - 1].PCSAVYID) {
                if (!(this.conditionIsOk(role) && roleIsOk)) {
                  allNextNode.splice(i - 1, 1);
                }
              }
            }
          }
        }
      }
      return allNextNode
    },

    // 发文依据
    handleImport() {
      this.showImport = true;
      this.bankImport = "";
      this.documentCode = "〔〕号";
    },
    handleImportSure() {
      let that = this
      if(that.bankImport == "") {
        that.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "文件类型不能为空！",
          duration: 500
        });
        return;
      }
      if(that.documentCode == "") {
        that.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "文号不能为空！",
          duration: 500
        });
        return;
      }
      let transJudge = false
      if(that.importDataArr.length>0) {
        that.importDataArr.forEach(item => {
          if(item.documentCode == that.documentCode) {
            transJudge = true
          } 
        });
      }
      if (transJudge) {
        that.$message({
          type: "error",
            showClose: true,
            offset: 400,
            message: "已存在本文件字号依据，不可重复添加！",
            duration: 500
          });
        return;
      }
      if(that.bankImport!="") {
        let transJYX = ''
        switch (that.bankImport) {
          case "CN000":   //发文 
            transJYX = 'A0846C001'
            break;
          case "CN001":   //收文 
            transJYX = 'A0846C003'
            break;
          case "CN002":   //签报 
            transJYX = 'A0846C005'
            break;
        }
        if(that.bankImport == '4') {
          that.$api.checkLz.importBas(
            {
              documentNo: that.documentCode,
              currentUserOldId: that.nowUserId
            }
          ).then(res => {
            let transObj = {}
            if (!res.result.id) {
              transObj = {
                documentCode: that.documentCode,
                id: "",
                title: that.documentCode,
                bankImport: that.bankImport
              }
            } else {
              transObj = {
                documentCode: res.result.documentNo,
                id: res.result.id,
                title: res.result.title,
                bankImport: that.bankImport
              }
            }
            that.importDataArr.push(transObj)
            that.fromdata.sendBasis = that.importDataArr
            that.showImport = false
            that.showImportData = true
            that.preserve()
          })
        } else {
          let obj = {
            function: "importBasis",
            multiTenancyId: that.bankImport,
            documentCode: that.documentCode
          };

          that.$post
          .postData("importBasis", JSON.stringify(obj), transJYX)
          .then(res => {
            if (res && res.data) {
              res.data.bankImport = that.bankImport;
              that.bank_import = res.data;
              that.importDataArr.push(res.data);
            } else {
              let transObj = {
                documentCode: that.documentCode,
                id: "",
                title: "",
                bankImport: that.bankImport
              }
              that.importDataArr.push(transObj);
            }
            that.fromdata.sendBasis = that.importDataArr.filter(item => item.documentCode);
            that.showImport = false;
            that.showImportData = true;
            that.preserve();
            console.log(that.fromdata.sendBasis)
          });
        }
      }
    },
    handleCheckImport(data) {
      if (data.id == ''||!data.id) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "该文件不存在于库中！",
          duration: 500
        });
        return;
      } else {
        if(data.bankImport == '4') {
          this.handleOpenPage("/proceHas", data.id, '2');
          return;
        }
        if (data.orderType && data.orderType !== "") {
          if (data.orderType == "非跨行") {
            this.handleOpenPage("/signquoteOverFkhDispatch", data.id,"",data.draftDepartmentId);
          } else if (data.orderType == "跨行请示") {
            this.handleOpenPage("/signquoteOverKhQshDispatch", data.id,"",data.draftDepartmentId);
          } else if (data.orderType == "跨行审批") {
            this.handleOpenPage("/signquoteOverKhSphDispatch", data.id,"",data.draftDepartmentId);
          } else if (data.orderType == "实物") {
            this.handleOpenPage("/signquoteOverEntityDispatch", data.id,"",data.draftDepartmentId);
          }
        } else {
          this.showImportList = true;
          this.bank_import = data;
        }
      }
    },
    handleOpenPage(path, id, readType,draftDepartmentId) {
      let a = this.bankImport == '4' ? 'type' : 'readFlag'
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          a : readType,
          draftDepartmentId:draftDepartmentId,
          From: "Import"
        }
      });
      window.open(routeData.href, "_blank");
    },
    handleDeleteImport(data) {
      let that = this
      that.fromdata.sendBasis.forEach((item, index) => {
        if (item.documentCode == data.documentCode) {
          that.fromdata.sendBasis.splice(index, 1);
        }
      });
      if (that.fromdata.sendBasis.length == 0) {
        that.showImportData = false;
      }
      that.preserve();
    },
    //定密依据弹窗数值
    secretGistsbox() {
      this.secretBaslsDialogVisible = true;
      this.selectSecretType.secretType = this.fromdata.secretType;
      this.$post
        .postData(
          "selectSecretType",
          JSON.stringify(this.selectSecretType),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.secretBaslsList = res.data || [];
          this.secretBaslsList = this.secretBaslsList.map((item, n) => {
            var obj = {
              label: item.label.split("(xx)")
            };
            obj.label.map((node, m) => {
              obj.subkey = n + "" + m;
            });
            obj.subval = "";
            return obj;
          });
          this.$forceUpdate();
        });
    },
    //定密依据输入框值获取  并且确定
    savesecretBasls() {
      var str = "";
      var pstr = true;

      //填值
      if (this.secretBaslsYJ !== "") {
        this.secretBaslsList.map((item, n) => {
          if (n == this.secretBaslsYJ) {
            item.label.map((node, m) => {
              if (m < item.label.length - 1) {
                str += node + $("#" + n + m).val();
                if (!$("#" + n + m).val()) {
                  pstr = false;
                  return;
                }
              } else {
                str += node;
              }
            });
          }
        });
      }

      if (!pstr && this.secretBaslsYJ !== "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择或输入该选项的定密依据内容",
          duration: 2000
        });
        return;
      }
      this.secretBaslsDialogVisible = false;
      this.fromdata.secretGists = str;
    },
  }
}
