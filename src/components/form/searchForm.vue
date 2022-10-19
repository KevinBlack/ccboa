/**
* create by zx on 2020/8/8 16:22
* 类注释：
* 备注：
*/
<template>
  <div class="searchForm">
    <el-form :model="formData" label-width="120px">
      <el-row>
        <slot></slot>
        <el-col :span="6" style="text-align:right">
          <el-col v-if="!show&&hasShow" class="arrowup">
            <el-button type="primary" @click="submit">开始搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="info" size="small" @click="show=!show">
              <i class="el-icon-arrow-down el-icon--left"></i> 展开
            </el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <fd-form
      v-show="show"
      ref="fdForm"
      :config='config'
      :data="fdFormData"
      @event="itemClick"
      :columns="formCfg"
    ></fd-form>
    <!--  <el-row style="text-align: center;margin-bottom: 10px" v-if="show">
        <el-button type="primary" @click="submit">开始搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-row>-->
    <el-row>
      <el-col class="down" v-if="show&&hasShow">
        <el-button type="info" size="small" @click="show=!show">
          <i class="el-icon-arrow-up el-icon--left"></i> 收起
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
    import FdForm from "vue-elementui-freedomen/components/form";

    export default {
        name: "searchForm",
        components: {
            FdForm
        },
        props: {
            formData: {type: Object, default: () => ({})},
            formCfg: {
                type: Array,
                required: true
            },
            hasShow:{//是否有收起按钮，默认有
              type:Boolean,
              default(){
                return true
              }
            },
            //是否展开
            openshow:{
                type: Boolean,
                default() {
                    return false
                }
            },
            config:{
              type:Object,
              default(){
                return {labelWidth:'120px'}
              }
            }
        },
        data() {
            return {
                show: false,
                fdFormData: {},
                fdFormCfg: [],
            }
        },
        watch: {
            openshow(val) {
                this.show= val
            },
        },
        computed: {},
        methods: {
            setText(text, value) {
                this.$set(this.fdFormData, text, value)
        },
            itemClick(params) {
                if (params.prop == "$reset") {
                    this.reset()
                } else if (params.prop == "$submit") {
                    this.submits(params.row)
                } else {
                    Object.assign(params.row, this.formData)
                    this.$emit('event', params)
                }
            },
            submits(params) {
                let newObj = {}
                for (let key in params) {
                    if (params[key])
                        newObj[key] = params[key]
                }
                this.$emit('submit', Object.assign(this.formData, newObj))
            },
            submit() {
                let newObj = {}
                for (let key in this.fdFormData) {
                    if (this.fdFormData[key])
                        newObj[key] = this.fdFormData[key]
                }
                this.$emit('submit', Object.assign(this.formData, newObj))
            },
            reset() {
                this.$refs.fdForm.reset()
                this.$emit('reset')
                setTimeout(() => {
                    this.fdFormData = {}
                }, 100)
            }
        },
        activated() {
        },
        mounted() {
            setTimeout(() => {
                this.fdFormData = {}
            }, 100)
        },
        created() {
            this.show=this.openshow
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .down {
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
  }
</style>
