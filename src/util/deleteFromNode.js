export function deleteFromNode(copyFrom,deleteFromArr){
   let copyFromData = JSON.stringify(JSON.parse(copyFrom))
   for(let i = 0; i< deleteFromArr.length;i++){
      delete copyFromData.deleteFromArr[i];
   }
   return copyFromData
}
