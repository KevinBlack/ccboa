
/**
* create by zz on 2020/8/4 10:40
* 类注释：
* 备注：参数维护/反馈配置/详情/编辑
*/
<template>
 <div class="fkEdit">
     <div class="headerClick">
      <div class="right">
        <el-button v-for="(item,index) in buttonList" @click="buttonClick(item)" :key="index" size="mini" plain>{{item}}
        </el-button>
      </div>
    </div>
    <div class="fkHeader">
      <div class="title-text">反馈信息配置</div>
    </div>
    <div class="process_content">
      <el-form :rules="rules" :model="formData" label-width="120px">
        <!-- <el-row>
          <el-col :span="24"> -->
            <el-form-item label="机构名称">
                <el-select style="width:100%" v-model="select">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
            </el-form-item>
          <!-- </el-col>
        </el-row> -->
         <el-form-item label="类型">
             <el-select style="width:100%" v-model="select">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-row>
            <el-col :span="8"><el-form-item label="中文名"><el-input></el-input></el-form-item></el-col>
            <el-col :span="8"><el-form-item label="英文名"><el-input></el-input></el-form-item></el-col>
            <el-col :span="8">
                <el-form-item label="是否必填">
                    <el-select style="width:100%" v-model="select">
                        <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <m-table
            @refresh="loadData()"
            @cellClick="cellClick"
            size="medium"
            :tableData="tableData"
            :tableCols="tableCols"
            :isSelection='true'
            :isIndex='true'
          ></m-table>
        <el-button v-for="(item,index) in buttonList2" @click="buttonClick2(item)" :key="index" size="mini" plain>{{item}}
        </el-button>

      </el-form>
    </div>

 </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/mTable'
 export default {
     name:"fkDetail",
     components: {
       mTable
     },
     data () {
       return {
           buttonList: ['关闭', '保存'],
           buttonList2: ['添加', '更新', '删除', '上移', '下移'],
           rules: {},
           select:[],
           options1: [],
           options2: [],
           options3: [{
                value: '选项1',
                label: '是'
                },{
                value: '选项2',
                label: '否'
            }],
        //  value: '',
         formData: {},
         tableData:[
                    {
                        chinese: '行名',
                        english: 'abc',
                        if: '是',
                    },
                    {
                        chinese: '部门',
                        english: 'def',
                        if: '否',
                    },
            ],
            tableCols:[
                    {label: '反馈中文名', prop: 'chinese'},
                    {label: '反馈英文名', prop: 'english'},
                    {label: '是否必填', prop: 'if'},
            ],
       }
     },
    computed: {},
    methods: {
        buttonClick(params){
            switch (params) {
                    case '保存':
                        // this.$intent.go(this,{path:"/meeting/cs/hyEdit"})
                        break
                    case '关闭':
                        this.$router.back();
                        break
                }
        },
        buttonClick2(){},
      loadData(){},
      cellClick(){},
    },
    activated() {
    },
    mounted() {
    },
    created() {
    }
 }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fkEdit{
      background: white;
      margin: 0 auto;
      padding-bottom: 20px;
      .headerClick {
      background: #409eff;
      color: white;
      height: 50px;
      line-height: 50px;

      .right {
        margin-left: 20px;
        float: left;
      }
    }
        .fkHeader {
            padding: 8px 70px;

            .title-text {
            margin-bottom: 15px;
            font-size: 30px;
            line-height: 75px;
            color: #409EFF;
            font-weight: 600;
            text-align: center;
            }
        }
        .process_content {
          width: 80%;
          // min-height: 920px;
          padding: 20px 16px;
          margin: 0 auto;
          border: 1px solid #ccc;
        }
    }
</style>
