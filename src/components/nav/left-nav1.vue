<style scoped>
  .sider {
    width: 120px!important;
    height: 100%;
    position: fixed;
    left: 0;
    top: 61px;
    overflow: visible;
    z-index: 1;
    ul {
      height: 100%;
    }
    .btn-collapse {
      position: fixed;
      bottom: 20px;
      left: 10px;
    }
  }
    .el-submenu .el-menu-item{
        min-width: auto;
    }
    .heigh_100{
      height:100%!important;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        height: 100%;
        transition: all 0.3s ease-in-out;
        padding-top: 50px;
    }
    .el-menu-item{
      color:#409EFF;
      width: 140px;
    }
    /deep/ .el-menu-item:hover,.activeSub /deep/ .el-menu-item.el-col-6{
      background: #409EFF;
      color:#fff;
    }
    .el-menu-item:focus{
       background: none;
    }
    /deep/ .el-icon-arrow-left,.selectSide /deep/ .el-icon-arrow-left{
      color:#fff;
      display: inline;
    }
    .selectN,/deep/ .sublist-menu .el-menu-item:hover{
       color:#409EFF;
       background: none;
    }
    /deep/ .el-icon-arrow-left,/deep/  .el-icon-arrow-left{
        display: none;
        font-size: 12px;
        padding-left: 6px;
        padding-top: 2px;
    }
    /deep/ .el-menu-item:hover .el-icon-arrow-left,/deep/ .el-menu-item:focus .el-icon-arrow-left,/deep/ .el-menu-item .el-icon-arrow-left.selectIcon{
        display: inline;
    }
    /deep/ .el-menu{
      border:0;
    }
    .f-12{
      font-size: 12px;
    }
    /deep/ .sublist-menu .el-menu-item{
      color:#888;
    }
    .activeSub /deep/ .el-icon-arrow-left{
      right:6px;
    }
    .collapseAside{
      margin-left: -200px;
    }
    .selectSide.el-menu-item{
      background: #409EFF;
      color: #fff;
    }
</style>
<template>
    <div class="heigh_100">
      <el-aside :class="['sider',{'collapseAside':isCollapseFlag}]">
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapseFlag">
          <el-menu-item 
          v-for="(item, key) in sideTree" 
          @mouseenter.native="enterSide(key)" 
          @mouseleave.native="outSide(key)" 
          :class="{'selectSide':item.active}"
          :key="key">
            <span slot="title">{{item.name}}</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-left"></i>
          </el-menu-item>
        </el-menu>
        <div @mouseenter="enterPanel" @mouseleave="outPanel" v-show="openSubtree" class="el-menu--vertical" x-placement="right-start" style="position: absolute; top: 50px; left: 126px; z-index: 2073;">
          <ul role="menu" class="el-menu el-menu--popup el-menu--popup-right-start" style="width:800px;min-height:600px;">
            <li v-for="(item, key) in nowSubtree"
          :key="key" role="menuitem" aria-haspopup="true" class="el-submenu is-active" style="position:relative;">
              <el-row  @mouseenter.native="enterSideOne(key)" 
          @mouseleave.native="outSideOne(key)" 
          :class="{activeSub:item.active}">
                <el-col :span="6" class="el-menu-item" style="width:auto;">
                  <template class="f-12">
                    <span>{{item.name}}</span>
                    <i class="el-submenu__icon-arrow el-icon-arrow-left" :style="{'display':item.active?'inline':'none'}"></i>
                  </template>
                </el-col>
                <el-col :span="18">
                  <div class="el-menu--vertical sublist-menu" x-placement="right-start">
                      <ul role="menu" class="el-menu">
                        <li v-for="(sublist, index) in item.subTwo"
                            :key="index" role="menuitem" tabindex="-1" style="padding: 0 0 0 20px;float:left;">
                            <router-link :to="{
                              path:'',
                              params:{

                              }
                            }" :class="['el-menu-item',{'selectN':sublist.active}]">{{sublist.name}}</router-link>
                        </li>
                      </ul>
                  </div>
                </el-col>
              </el-row> 
            </li>
          </ul>
      </div>
    </el-aside>
    </div>
</template>
<script>
  export default {
    props:['collapseInfo'],
    data() {
      return {
        isCollapseFlag:false,
        nowSubtree: [],    //?????????????????????
        openSubtree: false,//?????????????????????
        nowSideNum: '',    //???????????????
        inPanel:false,
        sideTree: [
          {
            name: '??????',
            path: '',
            active: false
          },
          {
            name: '??????',
            path: '',
            active: false
          },
          {
            name: '????????????',
            path: '',
            active: false
          },
          {
            name: '????????????',
            path: '',
            active: false
          },
          {
            name: '??????',
            path: '',
            active: false
          },
          {
            name: '????????????',
            path: '',
            active: false
          },
          {
            name: '????????????',
            path: '',
            active: false
          },
          {
            name: '??????',
            path: '',
            active: false,
            subOne: [
              {
                name: '????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '??????????????????????????????',
                active: false
              },
              {
                name: '?????????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '??????????????????????????????',
                active: false
              },
              {
                name: '???????????????????????????',
                active: false
              }
            ]
          },
          {
            name: '??????',
            path: '',
            active: false,
            subOne: [
              {
                name: '???????????????',
                active: false
              },
              {
                name: '???????????????',
                active: false
              },
              {
                name: '?????????/????????????',
                active: false
              },
              {
                name: '?????????/????????????',
                active: false
              },
              {
                name: '?????????/????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '????????????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '????????????????????????',
                active: false
              },
              {
                name: '?????????????????????????????????',
                active: false
              },
              {
                name: '??????????????????????????????',
                active: false
              }
            ]
          },
          {
            name: '????????????',
            path: '',
            active: false,
            subOne: [
               {
                name: '??????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '???????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '?????????????????????',
                active: false
              },
              {
                name: '??????????????????',
                active: false
              },
              {
                name: '???????????????',
                active: false
              }
            ]
          },
          {
            name: '???????????????',
            path: '',
            active: false,
            subOne: [
              {
                name: '??????',
                active: false
              },
              {
                name: '??????',
                active: false
              },
              {
                name: '????????????',
                active: false
              },
              {
                name: '???????????????',
                active: false
              },
              {
                name: '????????????',
                active: false
              },
              {
                name: '??????',
                active: false
              }
            ]
          }
        ]
      };
    },
    mounted(){
    },
    methods: {
      enterSide(n) {
        this.nowSideNum = n;
        this.sideTree[n].active = true;
        this.sideTree.filter((item,index)=>{
          if(n==index){
            item.active = true;
          }else{
            item.active = false;
          }
        })
        this.nowSubtree = this.sideTree[n].subOne;
        this.openSubtree = true;
      },
      outSide(n) {
        this.openSubtree = false;
        this.sideTree[this.nowSideNum].active = false;
      },
      clickSide(n) {
        this.openSubtree = true;
        this.sideTree[n].active = true;
        this.nowSubtree = this.sideTree[n].subOne;
      },
      outPanel() {
        this.openSubtree = false;
        this.nowSubtree = [];
        this.sideTree[this.nowSideNum].active = false;
      },
      enterPanel() {
        this.sideTree[this.nowSideNum].active = true;
        this.sideTree.filter((item,index)=>{
          if(this.nowSideNum==index){
            item.active = true;
          }else{
            item.active = false;
          }
        })
        this.openSubtree = true;
      },
      enterSideOne(n) {
        this.nowSubtree[n].active = true;
      },
      outSideOne(n) {
        this.nowSubtree[n].active = false;
      },
      clickSideTwo(n, m) {
        this.nowSubtree[n].subTwo[m].active = true;
      }
    },
    watch:{
      collapseInfo(newv,oldv){
         this.isCollapseFlag = newv;
         this.openSubtree = false;
      }
    }
  };
</script>