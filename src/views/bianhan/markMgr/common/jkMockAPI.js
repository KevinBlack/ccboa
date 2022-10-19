/**
 * 这是模拟API的返回
 */
export default {
    // 同步方法
    doSync(name, isSuccess, succData, failData){
        console.log('同步方法:', name);
        return isSuccess ? succData : failData;
    },
    // 异步方法
    doAsync(name, isSuccess, succData, failData){
        console.log('异步方法：', name, isSuccess);
        return new Promise(function(resolve, reject){
            setTimeout(() => {
                return isSuccess ? resolve(succData) : reject(failData);
            }, 200);
        });
    }
}