export default function scrollIntoForm() {
  let that = this;
  let res = true;
  that.$refs.fromdata.validate((valid, object) => {
    if (!valid) {
      for (let i in object) {
        let dom = that.$refs[i];
        dom.$el.scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        break;
      }
      res = false;
    }
  });
  return res;
}