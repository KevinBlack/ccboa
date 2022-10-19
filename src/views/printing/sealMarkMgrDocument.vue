<template>
  <div>
    <div id="printHtml" :class="[isType?'sealDocument': 'sealDocument display-none']">
        <el-row>
            <el-col>
            <el-button @click="printThis()" type="info" v-show="isShow" plain>打印</el-button>
            </el-col>
        </el-row>
        <table 
            cellspacing="0"  cellpadding="0"  class="printTableList"
            style="font-family: 宋体;font-size: 19px;"
        >
            <caption class="title-h1">{{title}}印章刻制审批单</caption>
            <tbody>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">印章类别</td>
                    <td colspan="3" class="td-center pc80">{{form.yzType}}</td>
                </tr>
                <tr class="h40px">
                    <td class="td-center pc20">印章单位</td>
                    <td class="td-center pc30">{{form.yzDept}}</td>
                    <td class="td-center pc12">申请日期</td>
                    <td class="td-center pc38">{{form.cdate}}</td>
                </tr>
                <tr class="h40px">
                    <td class="td-center pc20">申请人</td>
                    <td class="td-center pc30">{{form.creator}}</td>
                    <td class="td-center pc12">联系电话</td>
                    <td class="td-center pc38">{{form.tel}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">编号</td>
                    <td colspan="3" class="td-center pc80">{{form.documentNo}}</td>
                </tr>
                <tr class="h80px">
                    <td class="td-center pc20">申请理由（刻制依据）</td>
                    <td colspan="3" class="td-center pc80">{{form.reason}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">刻制印章名称</td>
                    <td colspan="3" class="td-center pc80">{{form.yzNewname}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">旧章名称</td>
                    <td colspan="3" class="td-center pc80">{{form.yzOldname}}</td>
                </tr>
                <tr class="h100px">
                    <td colspan="1" class="td-center pc20">申请单位主要负责人签批</td>
                    <td colspan="3" class="td-left pc80" v-if="list.qpYj.length > 0">
                        <template v-for="(item, index) in list.qpYj" >
                            <div class="message-one" :key="item.dateTime + index">
                                <div>
                                    <p>{{item.content}}</p>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.qm}}</span>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.dateTime}}</span>
                                </div>
                            </div>
                        </template>
                    </td>
					<td colspan="3" class="td-left pc80" v-else>{{form.qpYj}}</td>
                </tr>
				<tr class="h100px">
                    <td colspan="1" class="td-center pc20">有权签字人审批</td>
                    <td colspan="3" class="td-left pc80" v-if="list.yqQzrSp.length > 0">
                        <template v-for="(item, index) in list.yqQzrSp">
                            <div class="message-one" :key="item.dateTime + index">
                                <div>
                                    <p>{{item.content}}</p>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.qm}}</span>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.dateTime}}</span>
                                </div>
                            </div>
                        </template>
                    </td>
					<td colspan="3" class="td-left pc80" v-else>{{form.yqQzrSp}}</td>
                </tr>
                <tr class="h100px">
                    <td colspan="1" class="td-center pc20">归口管理部门审核</td>
                    <td colspan="3" class="td-left pc80" v-if="list.shYj.length > 0">
						<template v-for="(item, index) in list.shYj" >
                            <div class="message-one" :key="item.dateTime + index">
                                <div>
                                    <p>{{item.content}}</p>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.qm}}</span>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.dateTime}}</span>
                                </div>
                            </div>
                        </template>
					</td>
					<td colspan="3" class="td-left pc80" v-else>{{form.shYj}}</td>
                </tr>
                <tr class="h100px">
                    <td colspan="1" class="td-center pc20">办公室审核</td>
                    <td colspan="3" class="td-left pc80" v-if="list.offShYj.length > 0">
						<template v-for="(item, index) in list.offShYj" >
                            <div class="message-one" :key="item.dateTime + index">
                                <div>
                                    <p>{{item.content}}</p>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.qm}}</span>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.dateTime}}</span>
                                </div>
                            </div>
                        </template>
					</td>
					<td colspan="3" class="td-left pc80" v-else>{{form.offShYj}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">刻制单位</td>
                    <td colspan="3" class="td-center pc80">{{form.carvDept}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">批准刻制单位（公安部门）</td>
                    <td colspan="3" class="td-center pc80">{{form.conCarvDept}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">刻制情况</td>
                    <td colspan="3" class="td-center pc80">{{form.carvStatus}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">刻制日期</td>
                    <td colspan="3" class="td-center pc80">{{form.carvDate}}</td>
                </tr>
                <tr class="h40px">
                    <td class="td-center pc20">是否启用</td>
                    <td class="td-center pc30">{{form.isStartUsing}}</td>
                    <td class="td-center pc12">启用日期</td>
                    <td class="td-center pc38">{{form.usingDate}}</td>
                </tr>
                <tr class="h40px">
                    <td colspan="1" class="td-center pc20">印章交接方式</td>
                    <td colspan="3" class="td-center pc80">{{form.joinMethod}}</td>
                </tr>
                <tr class="h40px">
                    <td class="td-center pc20">取印时间</td>
                    <td class="td-center pc30">{{form.getSealDate}}</td>
                    <td class="td-center pc12">取印人</td>
                    <td class="td-center pc38">{{form.getSealPerson}}</td>
                </tr>
                <tr class="h40px">
                    <td class="td-center pc20">交印时间</td>
                    <td class="td-center pc30">{{form.handedSealDate}}</td>
                    <td class="td-center pc12">交印人</td>
                    <td class="td-center pc38">{{form.handedSealPerson}}</td>
                </tr>
                <tr class="h100px">
                    <td colspan="1" class="td-center pc20">备注</td>
                    <td colspan="3" class="td-left pc80" v-if="list.remark.length > 0">
						<template v-for="(item, index) in list.remark" >
                            <div class="message-one" :key="item.dateTime + index">
                                <div>
                                    <p>{{item.content}}</p>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.qm}}</span>
                                </div>
                                <div class="col-offset-16">
                                    <span>{{item.dateTime}}</span>
                                </div>
                            </div>
                        </template>
					</td>
					<td colspan="3" class="td-left pc80" v-else>{{form.remark}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>


<script>
export default {
    data () {
        return {
            form: {},
			list: {},
			isShow: true
        };
    },
	props: {
		isType: {
      		type: Boolean,
      		default() {
        		return true;
      		}
    	},
	},
    methods: {
        printThis () {
			this.isShow = false
			setTimeout(() => {
				document.execCommand("print");
				this.isShow = true
			}, 300);
        },
        // 加载页面数据
        loadData (id) {
            let params = {
				id: id,
                isreadflag: '1',
        		saveStatus: '0'
            };              
            this.$api.sealManage.markMgr.getMarkDetail(params).then(res => {
                console.log('getMarkMgrDetails查询详情回调:', res);
				res.data.view.getSealDate = this.formatTime(res.data.view.getSealDate)
				res.data.view.handedSealDate = this.formatTime(res.data.view.handedSealDate)
                this.form = res.data.view
        		this.list = res.data.opinion 
				this.getMarkType()
            }).catch(err => {});
        },
		getMarkType() {
      		var data = {
        		unitId: JSON.parse(localStorage.getItem('userInfo')).unitId,
        		departId: JSON.parse(localStorage.getItem('userInfo')).currUnitId,
        		sysConfig: '8'
      		};
      		this.$api.sealManage.markMgr.getMarkType(data).then(res => {
				res.yzType.forEach(element => {
					if(element.lable == this.form.yzType) {
						this.$nextTick(() => {
							this.$set(this.form, 'yzType', element.value)
						})
					}
				});
				console.log(this.form)
     		}).catch(err => {})
    	},
		formatTime(time) {
			var newDate = ''
			if(time != null && time != ''){
				var date = new Date(time)
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				var hour = date.getHours()
				var minutes = date.getMinutes()
				var seconds = date.getSeconds()
				newDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
			}
			return newDate
		}
    },
    created () {
        this.title = JSON.parse(localStorage.unitInfo)[0].unitName;
        const queryId = this.$route.query.id;
        if (queryId) {
            this.loadData(queryId);
        } 
    },
    mounted(){
      window.printjk = this;
    }
};
</script>
<style lang="less" rel="stylesheet/less">
.sealDocument {
    width: 900px;
    margin: 10px auto;
    padding: 35px;
    background-color: white;
    .h40px {
        height: 40px;
    }
    .h80px {
        height: 80px;
    }
    .h100px {
        height: 100px;
    }
    /* 对于table里的td, min-height好像不起作用 */
    .min-h40px {
        min-height: 40px;
    }
    .min-h80px {
        min-height: 80px;
    }
    .min-h100px {
        min-height: 100px;
    }
    .td-center {
        text-align: center;
        vertical-align: middle;
    }
    .td-left {
        text-align: left;
        vertical-align: middle;
    }
	.pc12 {
		width: 12%;
	}
    .pc15 {
        width: 15%;
    }
    .pc20 {
        width: 20%;
    }
    .pc25 {
        width: 25%;
    }
    .pc30 {
        width: 30%;
    }
	.pc38 {
		width: 38%;
	}
    .pc50 {
        width: 50%;
    }
    .pc80 {
        width: 80%;
    }
    .pc100 {
        width: 100%;
    }
    .col-offset-4 {
        margin-left: 16.6667%;
    }
    .col-offset-12 {
        margin-left: 50.00%;
    }
    .col-offset-16 {
        margin-left: 66.6667%;
		text-align: right;
    }
    .col-offset-20 {
        margin-left: 83.3333%;
    }
    .message-one {
        margin: 10px;
    }

  .docTable {
    table {
      border-color: #000;
    }
   
    .el-table--border,
    .el-table--group {
      border: none;
    }
    .el-table {
      color: #000;
      td {
        border-bottom: none;
      }
    }
    .el-table--border td {
      border-right: none;
    }
    .el-table--border th {
      border-right: 1px solid #000 !important;
    }
    .el-table th.is-leaf {
      border-bottom: 1px solid #000 !important;
    }
    .el-table thead,
    .el-table__empty-text {
      color: #000;
    }
  }
  .qianF {
    overflow: hidden;
    .p1 {
      float: left;
      // margin-left: 8px;
      margin-top: 10px;
      width: 100%;
    }
    .p2 {
      float: right;
      margin-right: 25px;
      margin-bottom: 8px;
      text-align: right;
    }
  }

  .piece {
    overflow: hidden;
  }
  .piece .text1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .piece .text2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }

  .beiZh {
    overflow: hidden;
  }
  .beiZh .content {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .beiZh .name {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }

  .chuanYue {
    overflow: hidden;
  }
  .chuanYue .chuanYue1 {
    float: left;
    margin-left: 8px;
    margin-top: 10px;
    width: 100%;
  }
  .chuanYue .chuanYue2 {
    float: right;
    margin-right: 25px;
    margin-bottom: 8px;
    text-align: right;
  }
  .printTableList {
    width: 94%;
    margin: 0 auto;
    // display: table;
    font-family: 宋体;
    tr {
    //   height: 40px;
      td {
        // width: 12%;
        // text-align: center;
        // vertical-align: middle;
      }
    }

  }
  .title-h1 {
    font-family: 宋体;
    font-size: 35px;
    text-align: center;
    line-height: 100px;
  }
  // .printButton {
  //   position: absolute;
  //   right: 28%;
  //   z-index: 10;
  //   top: 6%;
  // }
  td {
    border: 1px solid #000;
  }
  .tcont {
    padding-bottom: 5px;
    border-bottom: 1px solid #dac6c5;
  }
  .tcont:last-child {
    border-bottom: none;
  }
  .tcont2 {
    text-align: right;
    padding-top: 5px;
    width: 100%;
    height: 30px;
  }
  .tcont2 > div {
    float: right;
    /* background-color:#F2CACB; */
  }
  .issueTable {
    height: 100%;
    border-collapse: collapse;
    border: none;
    width: 100%;
  }
  .issueTable tr:nth-of-type(1) {
    border-top: none;
  }
  .issueTable tr:last-child {
    border-bottom: none;
  }
  .issueTable td {
    border: none;
  }
  .issueTable tr {
    line-height: 25px;
    text-align: center;
    border: solid 1px #000;
    border-left: none;
    border-right: none;
  }
  .d_flex {
    display: flex;
    padding-bottom: 20px;
    .d_b100 {
      width: 100%;
    }
    .d_f1 {
      flex: 1;
    }
  }
  .pos_r {
    position: relative;
  }
  .printButton {
    position: absolute;
    top: 55%;
    right: 3%;
  }
}
.display-none{
    position: absolute;
    top: 0px;
    z-index: -999;
}
</style>
