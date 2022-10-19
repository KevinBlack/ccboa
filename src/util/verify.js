export default function handleVerify (obj) {
  console.log(1)
  for (const key in obj) {
    if (obj[key] === '') {
      this.$message({
        type: 'danger',
        message: '请检查必填字段!'
      })
      return false
    } else {
      return true
    }
  }
}
