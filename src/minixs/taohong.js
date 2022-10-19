/*
 * @Author: your name
 * @Date: 2020-10-31 09:20:16
 * @LastEditTime: 2021-06-25 16:28:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\minixs\taohong.js
 */
/**
 * create by cx on 2020/9/29
 * 类注释：金格套红操作
 * 备注：
 */
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'fawenInfo',
      'signquoteInfo',
      'chengkanInfo',
      'dinggaoInfo',
      'departQc',
      'msgzinfo',
      'departJsx',
      'msgzlxinfo',
      'hyqjinfo',
    ])
  },
  methods: {
    // 筛选对象的方法
    filterObj(obj, arr) {
      if (typeof obj !== "object" || !Array.isArray(arr)) {
        throw new Error("参数格式不正确");
      }
      const result = {};
      Object.keys(obj)
        .filter(key => arr.includes(key))
        .forEach(key => {
          result[key] = obj[key];
        });
      return result;
    },
    timesConcat(item, name) {
      if (name.indexOf('日期') > -1) {
        let times = item && item.split("-") || '';
        if (times.length) {
          item = times[0] + '年' + times[1].replace(/^0/, '') + '月' + times[2].replace(/^0/, '') + '日';
        }
      }
      return item;
    },
    fawenTemplate() {
      for (var item in this.fawenInfo) {
        this.fawenInfo[item] = this.timesConcat(this.fawenInfo[item], item);
        this.WebOfficeObj.WebSetBookmarks(item, this.fawenInfo[item]);
      }
    },
    signquoteTemplate() {
      for (var item in this.signquoteInfo) {
        this.signquoteInfo[item] = this.timesConcat(this.signquoteInfo[item], item);
        this.WebOfficeObj.WebSetBookmarks(item, this.signquoteInfo[item]);
      }
    },
    chengkanTemplate() {
      for (var item in this.chengkanInfo) {
        this.chengkanInfo[item] = this.timesConcat(this.chengkanInfo[item], item);
        this.WebOfficeObj.WebSetBookmarks(item, this.chengkanInfo[item]);
      }
      // let obj = ['bmgz', 'fhgz', 'ldps', 'zbhb', 'zgsgz']
      // let newObj = this.filterObj(this.chengkanInfo, obj);
      // Object.keys(newObj).map(key => {
      //   console.log(newObj[key], '获取newObj')
      //   newObj[key] = this.timesConcat(newObj[key], key);
      //   this.WebOfficeObj.WebSetBookmarks.call(
      //     this.WebOfficeObj,
      //     key,
      //     newObj[key]
      //   );
      // });
    },
    dingGaoTemplate() {
      for (var item in this.dinggaoInfo) {
        this.dinggaoInfo[item] = this.timesConcat(this.dinggaoInfo[item], item);
        this.WebOfficeObj.WebSetBookmarks(item, this.dinggaoInfo[item]);
      }
    },
    departTemplate() {
      for (var item in this.departQc) {
        this.departQc[item] = this.timesConcat(this.departQc[item], item);
        this.WebOfficeObj.WebSetBookmarks(item, this.departQc[item]);
      }
    },
    jsxTemplate(){
      console.log(this.departJsx.objKow, '获取介绍信得相关数据')
      for (var item in this.departJsx.objKow) {
        this.WebOfficeObj.WebSetBookmarks(item, this.departJsx.objKow[item]);
      }
    },
    msgzTemplate() {
      for (var item in this.msgzinfo) {
        this.WebOfficeObj.WebSetBookmarks(item, this.msgzinfo[item]);
      }
    },
    msgzQjTemplate() {
      for (var item in this.hyqjinfo) {
        this.WebOfficeObj.WebSetBookmarks(item, this.hyqjinfo[item]);
      }
    },
    msgzLxTemplate() {
      console.log(this.msgzlxinfo, '生成联系单的vuex中的储值----taohong.js')
      for (var item in this.msgzlxinfo) {
        this.WebOfficeObj.WebSetBookmarks(item, this.msgzlxinfo[item]);
      }
    },
  },
}
