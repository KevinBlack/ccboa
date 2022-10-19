/**
 * create by zx on 2020/9/2 10:07
 * 类注释：页面跳转
 * 备注：
 */

export default {
  /**
   * 按钮展示
   * @param buttonList   全部按钮  [{name: '保存', type: 'baocun', show: false},]
   * @param showButton  展示按钮
   * @param conditionButton 带约束条件的按钮
   * @returns {*}
   */
  showButton(vue,buttonList, showButton, conditionButton) {
    if (showButton && showButton.length > 0) {
      showButton.forEach(item => {//按钮
        for (let i = 0; i < buttonList.length; i++) {
          if (item == buttonList[i].type) {
            buttonList[i].show = true
            break
          }
        }
      })
    }
    if (conditionButton) {
      for (let item in conditionButton) {
        let val = conditionButton[item].join("&")
        for (let i = 0; i < buttonList.length; i++) {
          try {
            if (item == buttonList[i].type && eval(val)) {
              buttonList[i].show = true
              break
            }
          }catch (e) {
              console.log("设置按钮显示条件语句出错：",val)
          }
        }
      }
    }
    return buttonList
  },

  /**
   * 设置必填意见域
   * @param vue
   * @param allRequiredIdeaFields
   * @param requiredIdeaFields
   * @returns {*}
   */
  setRequiredIdeaFields(vue, allRequiredIdeaFields, requiredIdeaFields) {
    if (requiredIdeaFields && requiredIdeaFields.length > 0) {
      requiredIdeaFields.forEach(item => {//必填意见域
        vue.$set(allRequiredIdeaFields, item, true)
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
  setEditedIdeaFields(vue, allEditedIdeaFields, editedIdeaFields, conditionEditedIdeaFields) {
    if (editedIdeaFields && editedIdeaFields.length > 0) {
      editedIdeaFields.forEach(item => {//可编辑意见域
        vue.$set(allEditedIdeaFields, item, false)
      });
    }
    if (conditionEditedIdeaFields)
      for (let item in conditionEditedIdeaFields) {////带约束条件的可编辑意见域
        let val = conditionEditedIdeaFields[item].join("&")
        for (let items in allEditedIdeaFields) {
          try {
            if (item == items && eval(val)) {
              vue.$set(allEditedIdeaFields, items, false)
              break
            }
          }catch (e) {
            console.log("设置束条件的可编辑意见域语句出错：",val)
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
  setRequiredFields(vue, allRequiredFields, requiredFields) {
    if (requiredFields && requiredFields.length > 0) {
      requiredFields.forEach(item => {//必填控制域
        vue.$set(allRequiredFields, item, true)
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
  setReadFields(vue, allReadFields, readFields) {
    if (readFields && readFields.length > 0) {
      readFields.forEach(item => {//不可编辑控制域
        vue.$set(allReadFields, item, true)
      })
    }
    return allReadFields
  }

}
