const sendObj ={
  inline:"本行发送",
  outsideSign:"行外会签",
}
const signObj ={   
  inline:"本行发送",
  outsideSign:"行外会签",
}
export default function formTextChange(type){
  let textList = JSON.parse(localStorage.getItem('textList'))||''
  let typeData = {};
  switch(type){
    case "send":
      typeData = sendObj;  
      break;
    case "sign": 
      typeData = signObj;
    break;
  }
  if(!textList||textList.length==0){
    return typeData
  }else{
    let data = [];
    for(let i = 0;i<textList.length;i++){
      if(textList[i].modular != 'send'&&textList[i].modular != 'sign'){
        return typeData
      }else{
        if(textList[i].modular == type){
          data = textList[i]
          return Object.assign(typeData,data)
        }
      }
      
    }
  }
}
