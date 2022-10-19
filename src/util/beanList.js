/**
 * create by zx on 2020/7/15 14:43
 * 类注释：数据字典
 * 备注：
 */
export default {
  bianHanType: {
    '1': '制发',
    '2': "承办",
    '10':'制发',
    '11':'制发',
    '13':'制发',
    '20':'承办',
    '21':'承办',
    '23':'承办'
  },
  bianHanFeedbackMode:{
    '0':'无需反馈',
    '1':'反馈意见',
    '2':'反馈意见及附件'
  },
  logType: {
    '1': "登录",
    "2": "操作",
    "3": "收藏"
  },
  moduleType: {
    "APP": "业务",
    "SYS": "系统"
  },
  yesOrNo: {
    '1': "是",
    '0': "否",
  },

  bianhanNumberControl: {
    '0': '     ',
    '1': '出部门编号检验'
  },

  bianhanNumberType: {
    "0": "机构名称",
    "1": "一级部门名称"
  },
  ueconfig:{//ueditor配置信息
    initialFrameWidth: null,
    autoHeightEnabled:false,//是否自动长高
    initialFrameHeight: 350,//
    fontsize:[ 
      //设置字体大小，以对象形式传入{字体大小名称，字体大小数值} ，
      //需要结合改动ueditor.all.js获取fontsize的方法才能实现
      //ueditor源码位置editorui.fontsize=function(){}
      // { name: '\u5c0f\u56db', val: 14},
      // { name: '\u56db\u53f7', val: 16},
      // { name: '\u4e09\u53f7', val: 18},
      { name: '\u521d\u53f7', val: 56},
      { name: '\u5c0f\u521d', val: 48},
      { name: '\u4e00\u53f7', val: 35},
      { name: '\u5c0f\u4e00', val: 32},
      { name: '\u4e8c\u53f7', val: 29},
      { name: '\u5c0f\u4e8c', val: 24},
      { name: '\u4e09\u53f7', val: 21},
      { name: '\u5c0f\u4e09', val: 20},
      { name: '\u56db\u53f7', val: 19},
      { name: '\u5c0f\u56db', val: 16},
      { name: '\u4e94\u53f7', val: 14},//5号
      { name: '\u5c0f\u4e94', val: 12},
      { name: '\u516d\u53f7', val: 10},

    ],
      //wordCount
    wordCount:true,          //是否开启字数统计
    wordCountMsg:'当前已输入 {#count} 个字，您还可以输入{#leave} 个字。正文字数不能超过5000字，若内容过长请以附件形式上传',   //当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符
    maximumWords:5000,       //允许的最大字符数
    //超出字数限制提示  留空支持多语言自动切换，否则按此配置显示
    wordOverFlowMsg:'<span style="color:red;">正文字数不能超过5000字，若内容过长请以附件形式上传</span>',

    toolbars: [[//编辑器按钮配置，控制富文本编辑器显示那些按钮
      'undo', 'redo', '|',
      'fontfamily', 'fontsize', '|',
      'justifyleft', 'justifycenter', 'justifyright', '|',
      'bold', 'italic', 'underline',  '|',
      'horizontal', 'time','date', 'spechars', 'link', '|',
      'rowspacingtop', 'rowspacingbottom','lineheight','insertorderedlist', 'insertunorderedlist', 
      'searchreplace'
    ]]
  }
}

// class PromisePool{
//     constructor(max,fn){
//       this.max=max;//最大并发数
//       this.fn=fn;//自定义请求函数
//       this.pool=[];//并发池
//       this.list=[];//剩余的请求地址
//       this.callback=this.callback;
//     }
//     start(list){
//       this.list=list;//先循环把并发池塞满
//       while(this.pool.length<this.max&&!!this.list.length){
//         let item=this.list.shift();
//         this.setTask(item);
//       }
//       //利用Promise.race方法来获得并发池中某任务完成的信号
//       let race=Promise.race(this.pool);
//       return this.run(race);
//     }
//     run(race){
//       race.then(res=>{
//         //每当并发吃跑完一个任务，就再塞入一个任务
//         let item=this.list.shift();
//         this.setTask(item);
//         return this.run(Promise.race(this.pool));
//       })
//     }
//     setTask(item){
//       if(!item) return;
//       let task=this.fn(item);
//       this.pool.push(task);//将该任务推入pool并发池中
//       console.log(`\x1B[43m ${item}开始，当前并发数${this.pool.length}]`)
//       task.then(res=>{
//         //请求结束后，将Promise任务从并发池中移除
//         this.pool.splice(this.pool.indexOf(task),1);
//         this.callback(this.list.length);
//         console.log(`\x1B[43m ${item}结束，当前并发数${this.pool.length}]`)
//       })
//     }
// }

// //调用
// cost pool=new PromisePool(5,requestFn,(num)=>{
//    if(num===0){
//      //所用任务执行完毕
//    }
// })
// pool.start(fileData);
