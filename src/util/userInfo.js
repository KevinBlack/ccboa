export default {
  /**
   * 是否有综合岗位
   * @returns {boolean}
   */
  isZongHe() {
    let isZongHe = false;
    let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"));
    tcHumanRole.forEach(item => {
      if (item.codeName.indexOf("综合") != -1) {
        isZongHe = true;
      }
    })
    return isZongHe
  },
  /**
   * 是否含有岗位
   * @returns {boolean}
   */
  isHasGan() {
    return JSON.parse(localStorage.getItem("tcHumanRole")).length > 0
  }
}
