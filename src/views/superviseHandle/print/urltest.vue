<template>
  <div>
    <el-card style="margin:5% auto;width:50%;">
			<header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行接口测试</h3>
    </header>
			
				<el-form
					ref="fromdata"
					label-width="130px" 
				>
					<el-row>
						<el-col :span="8">
							<el-form-item label="key值">
								<el-input v-model="key"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="value值">
								<el-input v-model="value"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8" style="text-align:center">
							<el-button type="primary" @click="addFromData">添加</el-button>
						</el-col>
						<el-col>
							<el-form-item label="接口名称" class="is-required">
								<el-input v-model="url"></el-input>
							</el-form-item>
						</el-col>
						<el-col>
							<el-form-item label="交易线" class="is-required">
								<el-select
									v-model="code"
									placeholder="请选择"
									style="width:100%"
								>
									<el-option value label="请选择"></el-option>
									<el-option
										v-for="(item,index) in codeList"
										:key="index"
										:value="item"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col v-for="(item,index) in items" :key="index">
							<el-form-item :label="item.key">
									<el-input readonly v-model="item.value">
										<el-button slot="append" @click="removeFormData(index)">删除</el-button>
									</el-input>
							</el-form-item>
						</el-col>
						<el-col>
							<el-row class="center" style="text-align: center;">
								<el-button type="primary" @click="initData">搜索</el-button>
								<el-button type="primary" @click="resetForm">重置</el-button>
							</el-row>
						</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col>
						<el-form-item label="请求结果">
							<el-input v-model="urlRus" type="textarea" autosize resize="none" readonly></el-input>		
						</el-form-item>
					</el-col>
				</el-row>
			
			</el-form>
		</el-card>
	
  </div>
</template>


<script>
import codeList from "@/util/businessCode";
export default {
  data() {
    return {
			url:"",
			code:"",
			key:"",
			value:"",
			codeList:codeList,
			items: [],
			urlRus:"",
    };
  },
  methods: {
		removeFormData(item){
			this.items.splice(item, 1)
		},
		addFromData(){
			this.items.push({
				key:this.key,
				value:this.value,
			})
			this.key='';
			this.value='';
			this.$forceUpdate();
		},
		resetForm(formName){
			this.items = [];
			this.code = '';
			this.url = '';
			this.key = '';
			this.value = '';
			this.urlRus = '';
		},
		initData(){
			if(!this.url||!this.code){
				this.$message({
					message: "请输入必填项",
					type: "error"
				});
			}
			let obj={};
			this.items.map((e,item)=>{
				obj[e.key] = e.value;
			})
			this.$post.postData(
				this.url,
				JSON.stringify(obj),
				this.code
			)
			.then(res => {
				this.urlRus = JSON.stringify(res)
			})
			.catch(err => {
				this.urlRus = JSON.stringify(err)
			});
		},

  },
  created() {
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.bank_dispach_header {
  width: 100%;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.el-col-8{
	float: left;
}
</style>