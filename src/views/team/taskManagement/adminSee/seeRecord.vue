<template>
  <div>
    <el-container style=" border: 1px solid #eee">
      <el-aside width="280px" height="500px" style="border-right:1px solid #eee">
        <!-- <el-button
          type="primary"
          style="display:block;margin:10px auto;"
          icon="el-icon-circle-plus-outline"
          @click="addwork"
        >新增工作记录</el-button> -->

        <el-tree
          style="margin-top:20px"
          :data="data"
          node-key="id"
          :props="defaultProps"
        ></el-tree>
      </el-aside>
      <el-container>
        <el-header
          style="text-align: right; font-size: 12px;"
        >
          <!-- <div>
            <el-button type="primary" icon="el-icon-document">保存</el-button>
            <el-button type="primary" icon="el-icon-share">共享</el-button>
            <el-button type="primary" icon="el-icon-delete">删除</el-button>
          </div> -->
          <div class="search">
            <el-input v-model="search" placeholder="请输入关键字搜索"></el-input>
            <el-button type="primary">搜索</el-button>
          </div>
        </el-header>
        <el-main style="display:flex">
          <div class="left">
            <el-form :model="formData" style="width:95%;margin:0 auto;padding:0px">
              <el-form-item label="附件" prop="createname">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="8"
                  :file-list="fileList"
                >
                  <div class="update">
                    <el-button
                      size="small"
                      type="primary"
                      style="margin-right:10px;height:40px;line-height:20px"
                    >上传文件</el-button>
                    <div slot="tip" class="el-upload__tip" style="text-align:left;line-height:18px">
                      <p>
                        附件大小不超过20M,引入附件文件名(包括压缩包中的文件名)不能包含以下半角符号：空格
                        \ / , " : ; *
                        ?  > | . %
                        ·
                      </p>
                      <p>目前系统只支持pdf、ofd、doc、docx、wps、xlsx、xls、et、jpg、png、img格式附件的预览</p>
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="消息交流" >
                <el-input v-model="formData.msg" style="width:80%"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <!-- <el-button
              type="primary"
              style="display:block;margin:10px auto;"
              icon="el-icon-circle-plus-outline"
              @click="newCreate"
            >新建页面</el-button> -->
            <ul>
              <li class="list" v-for="item in workList" :key="item.id" @click="taskdetail(item.id)">
                <span>{{item.title}}</span>
                <el-button icon="el-icon-delete" @click="delwork(item.id)"></el-button>
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<script>

export default {
  components: {
 
  },
  data() {
    return {
      search:'',
      data: [
        {
          id: 1,
          label: "中国建设银行",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "团队共享",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "回收站",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      workList: [
        {
          id: 1,
          title: "aaa"
        },
        {
          id: 2,
          title: "bbb"
        }
      ],
      formData:{
        msg:''
      },
      fileList: [],
      
    };
  },
  created() {},
  methods: {
    //填写标题,获取标题
    taskdetail(id){
      console.log(id)
    },
    // 删除页面
    delwork(id){
      console.log(id)
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  line-height: 60px;
}
/deep/.el-aside {
  height: 500px;
  border-bottom: 1px solid #eee;
}
.search {
  display: flex;
  float: right;
  /deep/.el-button {
    height: 40px;
    margin-top: 10px;
    margin-left: 5px;
  }
}
/deep/.el-main {
  overflow: none;
}
.left {
  width: 1050px;
  height: 600px;
  border: 1px solid #eee;
}
.right {
  width: 250px;
  height: 600px;
  border: 1px solid #eee;
  margin-left: 20px;
}
.list {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  /deep/.el-button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    margin-right: 10px;
  }
  span {
    margin-left: 10px;
  }
}
.update {
  display: flex;
  /deep/ .el-upload__tip {
    margin-top: 0;
  }
}
/deep/.el-upload-list {
  height: 100px;
  border: 1px solid #eee;
  margin-top: 10px;
  overflow-y: scroll;
}
</style>