/*
 * @Author: your name
 * @Date: 2020-12-25 11:41:07
 * @LastEditTime: 2021-05-31 16:27:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \30ccboa\src\views\commoncg\mixins\index.js
 */
export default {
  data () {
    return {
     

    }
  },
  methods: {
      conditionIsOk(value) {
        console.log(value,'value.vlas')
          try {
            return eval(value)
          } catch (e) {
            return false
          }
        },
      shoNextNodes(allNextNode, acyNodeNextBount,A) {
          console.log(allNextNode,acyNodeNextBount,'我待用',A)
          let tcHumanRole = JSON.parse(localStorage.getItem("tcHumanRole"))
          if (acyNodeNextBount) {
            for (let item in acyNodeNextBount) {
              console.log(item)
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
                console.log(acyNodeNextBount[item].condition,'id')
                let role = acyNodeNextBount[item].condition.join("&&")
                console.log()
                for (let i = allNextNode.length; i > 0; i--) {
                  //PCSAVYID下一环节节点ｉｄ
                  if (item == allNextNode[i - 1].PCSAVYID) {
                    if (!A && roleIsOk) {
                  // console.log(allNextNode[i - 1],'ss',A)

                      // console.log('sss333ssss',allNextNode[i-1])
                      allNextNode = [allNextNode[i-1]]
                      //  allNextNode.splice(i, 1);
                      //  console.log(allNextNode.splice(i, 1),'allNextNode.splice(i, 1);')
                    }else{
                      // allNextNode.splice(i-1, 1);
                      console.log('sss333')
                    }
                  }
                }
              }
            }
          }
          return allNextNode
        },
  }
}
