<template>
    <div class="treeSelect-Wrap">
        <!-- 设置close-on-click-modal后设置close方法应该是不起作用的 -->
        <el-dialog :title="title" :visible.sync="isShow">
            <div>
                <el-row>
                    <el-col :span="12">
                            <!-- :show-checkbox="show-checkbox" -->
                        <el-card class="box-card">
                            <div slot="header" class="clearfix card-header">
                                <el-row>
                                    <el-col :span="24">
                                        <span>待选项</span>
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <el-tree 
                                    :lazy="lazy"  :load="load"  :data="data"  :props="props" ref="tree"
                                    :show-checkbox="showCheckbox" node-key="id"
                                    @node-click="handleNodeClick"
                                    @check="checkTree"
                                ></el-tree>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix card-header">
                                <el-row>
                                    <el-col :span="18">
                                        <span>已选项</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button 
                                            type="primary" round size="mini"
                                            :disabled="nowCheckList.length==0"
                                            @click.native="clearSelectRows()"
                                        >清空</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-for="(item, index) in nowCheckList" :key="index" class="oneItem">
                                 <template>
                                    <el-row>
                                        <el-col :span="18">
                                            <span :title="item.name" class="name">{{item.name}}</span>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button
                                                type="warning" size="mini" round
                                                @click.native="deleteSelectRow(index)"
                                            >删除</el-button>
                                        </el-col>
                                    </el-row>
                                </template>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSetDialog">取 消</el-button>
                <el-button type="primary" @click="saveSetDialog">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { checkServerIdentity } from 'tls';
    export default {
        props: {
            // 如果懒加载，则需要和load配合起来使用
            lazy: {type: Boolean, default: false},
            load: [Function],
            isShow: {type:Boolean, default: false},
            checkboxType: {type:String, default: 'single'},
            // 'show-checkbox': {type: 'Boolean', default: true},
            props: {type:Object, default: () => {return {children: 'children', label: 'name', isLeaf: 'isLeaf'}} },
            data: {type: Array, default: () => []},
            title: {type: String, default: '选择'}
            // processes: {type: Array, default: () => []},
            // // 当前所在流程中的步骤
            // active: {type: Number, default: 0},
            // // 每个 step 的间距，不填写将自适应间距。支持百分比。
            // space: [Number, String],
        },
        data(){
            return {
                // 选择的人.对象数组eg:[{name:'小红'},...]
                nowCheckList: [{name:'小红'}, {name: '小东'}],
                showCheckbox: true,   
                fruit: 'fruit',     // 标示可选项的字段。即有这个字段的node可以到已选项中去
            }
        },
        computed: {
           
        },
        methods: {
            // 复选框被点击的时候触发
            // 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
            // 包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
            checkTree(nowNode, checkStatus){
                console.log(nowNode, checkStatus);
                console.log(this.$refs.tree.getCheckedNodes());
                console.log(this.$refs.tree.getCheckedKeys());
                // 如果所有的选中项中有当前节点，则为勾选；否则为取消勾选
                var isSelected = checkStatus.checkedKeys.indexOf(nowNode.id) >= 0;

                // 勾选时
                if (isSelected) {
                    // 是单选模式，设置只选中最后的勾选项
                    if (this.checkboxType === 'single') {
                        this.$refs.tree.setCheckedKeys( [nowNode.id] );
                    // 是多选模式
                    } else {
                        
                    }
                }
                // 存储所有的勾选项
                let checkedNodes = this.$refs.tree.getCheckedNodes();
                this.nowCheckList = checkedNodes.filter(function(item){
                    if (item.fruit) { return true; }
                });
            },
            // 点击节点。data是节点的信息
            handleNodeClick(data){
                console.log('点击节点', data);
            },
            // 点击取消按钮
            cancelSetDialog(){
                this.$emit('compSelect', null);
            },
            // 点击确认按钮
            saveSetDialog(){
                this.$emit('compSelect', {});
            },
            // 清空选择项
            clearSelectRows(){
                this.nowCheckList = [];
            },
            // 删除选择项的某一项
            deleteSelectRow(index){
                this.nowCheckList.splice(index, 1); // 移除指定的项
            }
        },
        created: function(){
            console.log('tree-select created');
            if (this.checkboxType === 'single') {
                this.showCheckbox = true;   // 显示复选框

            } else if (this.checkboxType === 'multiple') {
                this.showCheckbox = true;   // 显示复选框
            }
        },
        mounted: function(){
            window.jktree = this;
            console.log('tree-select mounted');
        },
        watch: {
           
        },
        updated: function(){

        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .box-card {
        height: 300px;
    }
    .card-header {
        height: 28px;
    }
    .oneItem {
        height: 40px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>