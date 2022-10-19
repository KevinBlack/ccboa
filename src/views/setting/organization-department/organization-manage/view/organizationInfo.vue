<!--
 * @Author: wy
 * @Date: 2020-06-22 14:45:14
 * @LastEditTime: 2021-03-18 16:45:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\institutionInfo.vue
-->
<template>
  <div class="organizationInfo">
    <div class="handleButton">
      <el-button type="primary" @click="configOrgInfo()">编辑</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="orgInfoTable">
      <div class="orgInfoTitle">机构信息表</div>
      <!-- 机构索引信息 -->
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark titleFont">机构索引信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" v-for="(item,index) in orgIndex" :key="index">
          <el-col :span="12">
            <div class="grid-content bg-purple normalFont">{{item.label}}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light normalFont">{{orgIndexData[item.props]}}</div>
          </el-col>
        </el-row>
      </div>
      <!-- 机构配置信息 -->
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark titleFont">机构配置信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="5" v-for="(item,index) in orgConfigInfo" :key="index">
          <el-col :span="12">
            <div class="grid-content bg-purple normalFont required">
              {{item.label}}
              <span style="color:red" v-if="item.isImpot||false">*</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light normalFont">{{orgConfigInfoData[item.props]}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "orgManageViewDetail",
  components: {},
  props: {},
  data() {
    return {
      // 机构索引信息
      orgIndexData: {},
      orgIndex: [
        {
          label: "机构序号",
          prop: "unitCode",
        },
        {
          label: "机构全称",
          prop: "unitName",
        },
        {
          label: "机构简称",
          prop: "unitShort",
        },
        {
          label: "机构ID",
          prop: "unitCode",
        },
        {
          label: "上级机构（组织树）",
          prop: "unitPname",
        },
        {
          label: "上级机构（行政层次）",
          prop: "unitPname",
        },
        {
          label: "机构类别",
          prop: "unitTypeName",
        },
        {
          label: "机构管理员",
          prop: "dunitAdmin",
        },
      ],
      // 机构配置信息
      orgConfigInfoData: {},
      orgConfigInfo: [
        {
          label: "机构代字",
          prop: "unitHeader",
          isImpot: true,
        },
        {
          label: "是否有权直发",
          prop: "ifSend",
        },
        {
          label: "OA版本",
          prop: "oaVersion",
        },
        {
          label: "机构综合代表中文名",
          prop: "comDeputyCh",
        },
        {
          label: "机构综合代表注册名",
          prop: "comDeputyZh",
        },
        {
          //11
          label: "OA服务器名称",
          prop: "roleName",
        },
        {
          //11
          label: "OA数据库路径",
          prop: "uass",
        },
        {
          //11
          label: "发送函件库名称",
          prop: "department",
        },
        {
          //11
          label: "接收函件库名称",
          prop: "memberName",
        },
        {
          //11
          label: "OA短信发送函件库名称",
          prop: "roleName",
        },
        {
          //11
          label: "OA短信接收函件库名称",
          prop: "uass",
        },
        {
          //11
          label: "OA微信接收函件库",
          prop: "department",
        },
        {
          label: "统一待办接收函件库",
          prop: "memberName",
        },
        {
          label: "跨行签报管理员中文名",
          prop: "roleName",
        },
        {
          label: "跨行签报管理员注册名",
          prop: "uass",
        },
        {
          label: "跨行事务审批管理员中文名",
          prop: "department",
        },
        {
          label: "跨行事务审批管理员注册名",
          prop: "memberName",
        },
        {
          label: "移动服务",
          prop: "roleName",
        },
        {
          label: "是否有Oracle",
          prop: "uass",
        },
        {
          label: "是否启用Oracle",
          prop: "department",
        },
        {
          label: "管理员",
          prop: "memberName",
        },
        {
          label: "密码",
          prop: "roleName",
        },
        {
          label: "Oracle jdbc连接",
          prop: "uass",
        },
        {
          label: "OA同步至Oracle执行时间点",
          prop: "department",
        },
        {
          label: "Oracle同步至OA执行时间点",
          prop: "memberName",
        },
        {
          label: "该机构是否启用",
          prop: "roleName",
        },
        {
          label: "该机构下组织机构是否同步商密OA系统",
          prop: "roleName",
        },
      ],
    };
  },
  computed: {},
  methods: {
    configOrgInfo() {
      this.$router.push({
        path: "/setting/orgDepartment/orgManage/orgManageConfig",
        // query: {
        //   detail: JSON.stringify(row),
        // },
      });
    },
  },
  activated() {},
  mounted() {
    console.log(JSON.parse(this.$route.query.detail));
  },
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.organizationInfo {
  .orgInfoTable {
    padding: 8px 70px;
    .orgInfoTitle {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #ff0502;
      font-weight: 600;
      text-align: center;
      border-bottom: 2px solid #ff0502;
    }
    .el-row {
      margin-bottom: 3px;
      .el-row:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #d8e8f4;
    }
    .bg-purple {
      background: #e5f0fc;
    }
    .bg-purple-light {
      background: #e5f0fc;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .titleFont {
      font-size: 17px;
      text-align: center;
      line-height: 43px;
      font-weight: 600;
    }
    .normalFont {
      padding-left: 34px;
      font-size: 14px;
      text-align: left;
      line-height: 36px;
    }
  }
}
</style>
