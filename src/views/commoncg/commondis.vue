<template>
  <div class="common" id="changguiyongyin">
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="{ active: active == '#wjys' }"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="{ active: active == '#qpyj' }"
          @click="toTarget('#qpyj')"
        >签批意见</a>
        <a
          v-if="form.isFsdDoc == '0'"
          href="javascript:void(0);"
          :class="{ active: active == '#scfj' }"
          @click="toTarget('#scfj')"
        >附件</a>
        <a
          href="javascript:void(0);"
          :class="{ active: active == '#ckht' }"
          v-if="form.allContent.length > 0"
          @click="toTarget('#ckht')"
        >查看合同</a>
      </div>
      <div class="common-header">
        <div class="back" @click="backDarft">
          <i class="el-icon-arrow-left"></i>
          <span>用印管理</span>
        </div>
        <div class="headerClick">
          <el-button @click="backDarft" class="bank_grid_comtent_active">关闭</el-button>
          <el-button
            @click="buttonClick('收回')"
            class="bank_grid_comtent_active"
            v-if="form.currentNode!='已办结'&&ifShouHui=='1'"
          >收回</el-button>
          <el-button @click="buttonClick('查看流程')" class="bank_grid_comtent_active">查看流程</el-button>

          <el-button @click="buttonClick('收藏')" class="bank_grid_comtent_active">收藏</el-button>
          <el-button @click="buttonClick('打印处理单')" class="bank_grid_comtent_active">打印处理单</el-button>
          <el-button
            @click="buttonClick('生成模板')"
            class="bank_grid_comtent_active"
            v-if="form.currentNode=='已办结'"
          >生成模板</el-button>
          <el-button
            @click="buttonClick('催办')"
            class="bank_grid_comtent_active"
            v-if="form.currentNode!='已办结'"
          >催办</el-button>
        </div>
      </div>
      <div class="shiwuTitle">{{ form.deptTableHeader }}常规用印审批单</div>
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        class="first-form"
        :rules="regSealFormRule"
      >
        <el-row class="box" :span="24">
          <el-col :span="8">
            <el-form-item label="当前环节:" label-width="90px">
              <span style="color: red">
                {{
                $route.query.id ? form.currentNode : "起草"
                }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前处理人:" label-width="100px">
              <span style="color: red">{{ humanName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否跨行:" label-width="90px">
              <!-- issave:'',//判断是否跨行 -->
              <span style="color: red">{{ issave }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: -200px">
          <div id="wjys" class="height_90" style="margin: 0"></div>
          <h6 class="bank_dispach_file_tit">文件要素</h6>
          <el-col :span="8">
            <el-form-item label="申请时间" prop="draftDate">
              <el-input v-model="form.draftDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用印时间" prop="userTime">
              <el-input v-model="form.userTime" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用印材料是否密件" prop="isFsdDoc" label-width="190px">
              <el-radio-group v-model="form.isFsdDoc" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <!-- <el-form-item label="用印部门" prop="yySdept">
            <el-input v-model="form.yySdept" :disabled="true"></el-input>
            </el-form-item>-->
            <el-form-item label="用印部门" prop="departFirstDepartment">
              <el-select
                v-model="form.departFirstDepartment"
                placeholder="请选择所属部门"
                :style="{ width: '100%' }"
                :disabled="true"
              >
                <!-- <el-option
                  v-for="(item, index) in draftOrganOption"
                  :key="index"
                  :label="item.firstUnitName"
                  :value="item.firstUnitId"
                ></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人" prop="draftUser">
              <el-input v-model="form.draftUser" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="form.tel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="编号" prop="documentNo">
              <el-input v-model="form.documentNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
          <el-form-item label="[2020]编号"></el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="发往单位类型" prop="sendType">
              <el-radio-group v-model="form.sendType" :disabled="true" @change="xtwn">
                <el-radio label="0">系统内</el-radio>
                <el-radio label="1">系统外</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="form.sendType == '1'">
            <el-form-item label="发往单位" prop="sendDept">
              <el-input v-model="form.sendDept" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" v-if="form.sendType == '0'">
            <el-form-item label="发往单位" prop="sendDept">
              <el-input v-model="form.sendDept" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="form.sendType == '0'">
            <el-button type="primary" @click="xuanze">选择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="用印事由" prop="reason">
              <el-input
                type="textarea"
                v-model="form.reason"
                :rows="5"
                resize="none"
                :disabled="true"
              ></el-input>
              <div class="d_flex">
                <el-row
                  class="d_b100"
                  v-for="(item, index) in reasons"
                  :key="index"
                  style="margin: 5px 0; border: 1px solid #ccc"
                >
                  <el-col :span="24" style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px">
                    <div class="br" style="min-height: 80px">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <div>{{item.ct}}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1" style="text-align: right">
            <el-button :disabled="true" @click="showWriteList('reason')">
              <i class="icon-font el-icon-edit select-chang"></i>
            </el-button>
          </el-col>-->
          <el-col>
            <el-form-item label="法律审查编号列表">
              <!-- <el-button @click="Yinr" :disabled="form.currentNode != '起草'" type="primary">引入</el-button> -->
              <!-- <el-button type="danger" @click="allScInfodel" :disabled="form.currentNode != '起草'">删除</el-button> -->
              <el-table
                border
                size="medium"
                :data="listdata"
                :style="{ width: '99.6%' }"
                :header-row-style="{ textAlign: 'center' }"
              >
                <el-table-column type="selection" width="50px" label="选择" align="center"></el-table-column>
                <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
                <el-table-column label="法律审查编号" align="center" prop="dicCode"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="FlvBh(scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="text-align:right;padding:5px 0">
            <el-button @click="Add" :disabled="true">增加</el-button>
            <el-button @click="Import" :disabled="true">导入合同材料</el-button>
            <el-button @click="toTarget('#ckht')" :disabled="true">查看合同</el-button>
            <el-button @click="del" :disabled="true">删除</el-button>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col>
            <el-form-item label="用印材料信息">
              <el-table
                border
                size="medium"
                :data="form.rtfAssetList"
                :style="{ width: '99.6%' }"
                :header-row-style="{ textAlign: 'center' }"
                @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="50px" label="选择" align="center"></el-table-column>
                <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
                <el-table-column label="用印材料标题" align="center">
                  <template slot-scope="scope">
                    <el-tooltip :content="scope.row.yytitle">
                      <el-input v-model="scope.row.yytitle" maxlength="50" :disabled="true"></el-input>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="用印性质" align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.yyxz" :disabled="true">
                      <el-option
                        v-for="(item, index) in yyxzdata"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="份数" align="center">
                  <!-- <template slot-scope="scope">
                  <el-input v-model="scope.row.num"></el-input>
                  </template>-->
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="true"
                      :min="1"
                      v-model="scope.row.num"
                      @change="handleChange(scope.$index, scope.row)"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="每份材料用印名称及个数" align="center">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="true"
                      type="primary"
                      v-if="scope.row.zong == ''"
                      @click="yyxz(1, scope.$index, scope.row)"
                    >用印选择</el-button>
                    <el-tooltip :content="scope.row.zong" v-else>
                      <el-button
                        readonly
                        :disabled="true"
                        type="primary"
                        @click="yyxz(2, scope.$index, scope.row)"
                      >{{ scope.row.zong }}</el-button>
                    </el-tooltip>
                    <!-- <span v-else @click="yyxz(2,scope.$index,scope.row)" :disabled="form.currentNode!='起草'">{{scope.row.zong}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column label="实际用印个数" align="center">
                  <template slot-scope="scope">
                    <el-input-number :min="0" v-model="scope.row.shijinum" :disabled="true"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
              <div
                style="
                  border: 1px solid #dcdfe6;
                  border-top: 0;
                  display: flex;
                  width: 99.6%;
                "
              >
                <p
                  style="
                    width: 51px;
                    border-right: 1px solid #dcdfe6;
                    text-align: center;
                  "
                >合计</p>
                <p>{{ texts }}</p>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="用印方式">
              <el-input v-model="form.yyFs" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="授权依据" prop="authBasis" ref="authBasis">
              <el-input v-model="form.authBasis" maxlength="200" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="法律性文件标准格式勾选依据" prop="lawAuthBasis" ref="lawAuthBasis">
              <el-input
                type="textarea"
                v-model="form.lawAuthBasis"
                maxlength="200"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="tableSealStateData.length > 0">
          <el-col>
            <el-form-item label="盖章状态">
              <m-table
                ref="SealStateTable"
                :isHandle="false"
                :tableData="tableSealStateData"
                :tableCols="tableSealStateCols"
                :isPagination="false"
                :isHeaderStyle="{}"
                :isBorder="true"
                :sortable="false"
                style="width: 100%"
              ></m-table>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <h6 class="bank_dispach_file_tit">签批意见</h6>
          <div id="qpyj" class="height_90" :style="{ position: 'absolute', zIndex: '-1' }"></div>

          <el-col v-if="isYygl == '1'">
            <el-form-item label="用印机构或部门对用印性质确认签字">
              <el-form border style="margin-left: 0px; width: 100%; padding: 0">
                <div class="border-bot same-div">
                  <el-form-item
                    label="合法性审查意见的采纳:"
                    style="height: 40px; margin: 0 20px"
                    prop="hfSc"
                  >
                    <!-- <template> -->
                    <el-radio-group v-model="form.hfSc" :disabled="true">
                      <el-radio :label="index" v-for="(item,index) in obj" :key="index">{{item}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="border-bot same-div">
                  <el-form-item label=" 业务事项有权签字人审批:" style="height:40px;margin:0 20px" prop="qzSp">
                    <el-radio-group v-model="form.qzSp" :disabled="true">
                      <el-radio :label="index" v-for="(item,index) in obj1" :key="index">{{item}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="same-div">
                  <el-form-item
                    label=" 是否属于业务档案归档范围:"
                    style="height: 40px; margin: 0 20px"
                    prop="isGdfw"
                  >
                    <!-- <template> -->
                    <el-radio-group v-model="form.isGdfw" :disabled="true">
                      <el-radio :label="index" v-for="(item,index) in obj2" :key="index">{{item}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-form>
            </el-form-item>
          </el-col>
          <el-col v-if="isYygl == '1'">
            <el-form-item label="有权签字人授权确认签字" align="center">
              <el-col :span="6">
                <div
                  style="
                    border: 1px solid #dcdfe6;
                    height: 81px;
                    line-height: 81px;
                  "
                >
                  <el-form-item prop="sqQz">
                    <el-col :span="3" style="padding-left:20px;">
                      <el-radio-group v-model="form.sqQz" :disabled="true">
                        <el-radio
                          :label="index"
                          v-for="(item, index) in obj3"
                          :key="index"
                          style="margin: 0; height: 40px; line-height: 40px"
                        >{{ item }}</el-radio>
                      </el-radio-group>
                    </el-col>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="2">
                <div style="border: 1px solid #dcdfe6; height: 81px">
                  <p class="border-bot" style="height: 40px; line-height: 40px">授权人</p>
                  <p style="height: 40px; line-height: 40px">被授权人</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="border:1px solid #DCDFE6;border-left:0">
                  <p style="height:40px;padding-top: 5px;">
                    <el-input v-model="form.sqPerson" :disabled="true"></el-input>
                  </p>
                  <p style="height:40px;padding-top: 5px;">
                    <el-input v-model="form.beSqPerson" :disabled="true"></el-input>
                  </p>
                </div>
              </el-col>
              <el-col :span="3">
                <div
                  style="
                    border: 1px solid #dcdfe6;
                    border-left: 0;
                    height: 82px;
                    line-height: 82px;
                  "
                >授权书名称编号</div>
              </el-col>
              <el-col :span="7">
                <div style="border:1px solid #DCDFE6;border-left:0;height:82px;padding-top: 25px;">
                  <el-input v-model="form.sqBookname" :disabled="true"></el-input>
                </div>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="23">
            <el-form-item label="上级行有权审批人审批" v-if="issave=='是'">
              <el-radio-group
                v-model="Havesp1"
                :disabled="editedIdeaFields.upLdBj"
                @change="ldBjbtn1"
                v-if="
                  !editedIdeaFields.upLdBj || !(upLdBjs && upLdBjs.length != 0)
                "
              >
                <el-radio label="0">同意</el-radio>
                <el-radio label="1">不同意</el-radio>
              </el-radio-group>
              <el-input
                type="textarea"
                v-model="form.upLdBj"
                :disabled="true"
                v-if="
                  !editedIdeaFields.upLdBj || !(upLdBjs && upLdBjs.length != 0)
                "
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in upLdBjs"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col v-if="issave == '是'" :span="23">
            <el-form-item label="上级行业务部门意见">
              <el-input
                type="textarea"
                v-model="form.shjiIdea"
                v-if="
                  !editedIdeaFields.shjiIdea ||
                  !(shjiIdeas && shjiIdeas.length != 0)
                "
                :disabled="true"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in shjiIdeas"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="上级行监印人审核" v-if="issave=='是'">
              <el-radio-group
                v-if="
                  !editedIdeaFields.jyYj2 || !(jyYj2s && jyYj2s.length != 0)
                "
                v-model="Havesp2"
                :disabled="editedIdeaFields.jyYj2"
                @change="ldBjbtn2"
              >
                <el-radio label="0">同意</el-radio>
                <el-radio label="1">不同意</el-radio>
              </el-radio-group>
              <el-input
                type="textarea"
                v-model="form.jyYj2"
                :disabled="true"
                v-if="
                  !editedIdeaFields.jyYj2 || !(jyYj2s && jyYj2s.length != 0)
                "
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in jyYj2s"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="有权审批人意见">
              <el-radio-group
                v-model="Havesp"
                :disabled="true"
                @change="ldBjbtn"
                v-if="!editedIdeaFields.ldBj || !(ldBjs && ldBjs.length != 0)"
              >
                <el-radio label="0">同意</el-radio>
                <el-radio label="1">不同意</el-radio>
              </el-radio-group>
              <el-input
                type="textarea"
                v-model="form.ldBj"
                :disabled="true"
                v-if="!editedIdeaFields.ldBj || !(ldBjs && ldBjs.length != 0)"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in ldBjs"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="监印人审核意见">
              <el-radio-group
                v-model="btnyj"
                :disabled="editedIdeaFields.jyYj"
                @change="btnyjbtn"
                v-if="!editedIdeaFields.jyYj || !(jyYjs && jyYjs.length != 0)"
              >
                <el-radio label="0">已监印</el-radio>
                <el-radio label="1">未监印</el-radio>
              </el-radio-group>
              <el-input
                type="textarea"
                v-model="form.jyYj"
                :disabled="true"
                v-if="!editedIdeaFields.jyYj || !(jyYjs && jyYjs.length != 0)"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in jyYjs"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="法律审查意见">
              <el-radio-group
                v-model="flscYj"
                :disabled="editedIdeaFields.flBj"
                v-if="!editedIdeaFields.flBj || !(flBjs && flBjs.length != 0)"
              >
                <el-radio label="0">同意</el-radio>
                <el-radio label="1">不同意</el-radio>
              </el-radio-group>
              <el-input
                type="textarea"
                v-model="form.flBj"
                :disabled="true"
                v-if="!editedIdeaFields.flBj || !(flBjs && flBjs.length != 0)"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in flBjs"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item :label="changGuiLabel.fzBj">
              <label slot="label" v-if="s">{{s}}</label>
              <!-- <el-input v-model="form.fzBj" :disabled="readFields.fzBj"></el-input> -->
              <el-radio-group
                v-model="fzBjflag"
                :disabled="true"
                v-if="!editedIdeaFields.fzBj || !(fzBjs && fzBjs.length != 0)"
              >
                <el-radio label="0">同意</el-radio>
                <el-radio label="1">不同意</el-radio>
              </el-radio-group>
              <el-input
                v-if="!editedIdeaFields.fzBj || !(fzBjs && fzBjs.length != 0)"
                type="textarea"
                v-model="form.fzBj"
                :rows="5"
                resize="none"
                :disabled="true"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in fzBjs"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="用印情况">
              <el-radio-group
                v-model="Yzbgr"
                :disabled="editedIdeaFields.yyBgr"
                @change="Yzbgrbtn"
                v-if="
                  !editedIdeaFields.yyBgr || !(yyBgrs && yyBgrs.length != 0)
                "
              >
                <el-radio label="0">已用印</el-radio>
                <el-radio label="1">双人已用印</el-radio>
              </el-radio-group>
              <el-input
                type="textarea"
                v-model="form.yyBgr"
                v-if="
                  !editedIdeaFields.yyBgr || !(yyBgrs && yyBgrs.length != 0)
                "
                :disabled="true"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in yyBgrs"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="23">
            <el-form-item label="复审情况">
              <el-input
                v-if="
                  !editedIdeaFields.retrialIdea || !(form.retrialIdeas && form.retrialIdeas.length != 0)
                "
                type="textarea"
                v-model="form.retrialIdea"
                maxlength="500"
                :disabled="true"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in form.retrialIdeas"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span>{{ item.lk }}</span>
                      <br />
                      <span>{{ item.ct }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="经办人承诺" v-if="form.jbrchns!==undefined&&form.jbrchns.length>0">
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in form.jbrchns"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <br />
                      <span>{{ item.ct }}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="经办人承诺" v-else>
              <el-checkbox v-model="checked" :disabled="true">{{form.jbrChn}}</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="thIdeas.length>0">
            <el-form-item label="退回原因">
              <!-- <el-input type="textarea" v-model="form.thIdea" :disabled="editedIdeaFields.yyBgr"></el-input> -->
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in thIdeas"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                v-model="form.remark"
                :rows="5"
                resize="none"
                :disabled="true"
              ></el-input>
              <div class="d_flex">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="24"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                    v-for="(item, index) in beizhu"
                    :key="index"
                  >
                    <div class="br">{{ item.nr }}</div>
                    <div class="adviceInfo">
                      <span class="pad_lr10">{{ item.lk }}</span>
                      <br />
                      <span>{{item.ct}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="form.allContent.length > 0">
          <h6 class="bank_dispach_file_tit">查看合同</h6>
          <div id="ckht" class="height_90" style="margin-top: 0"></div>
          <el-col style="margin-top: -200px">
            <el-form-item label="导入合同列表">
              <el-table
                border
                size="medium"
                :data="form.allContent"
                :style="{ width: '99.6%' }"
                :header-row-style="{ textAlign: 'center' }"
              >
                <el-table-column type="index" width="60px" label="序号" align="center"></el-table-column>
                <el-table-column label="导入合同编号" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.yytitle" readonly></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="viewFile(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isErweima == '1' && ewmMarkFlow">
          <el-col :span="24" style="text-align: center; margin-bottom: 20px">
            <span>二维码信息采集表</span>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日期">
              <el-input v-model="form.ewmRq" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="主体">
              <el-input
                v-model="form.ewmZt"
                :maxlength="ewmZtzs"
                show-word-limit
                :disabled="true"
                placeholder="指签约对象等文本出具的受众,可缩写、简写。"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事项">
              <el-input
                v-model="form.ewmSx"
                :maxlength="ewmSxzs"
                :disabled="true"
                show-word-limit
                placeholder="指该文本是什么，如贷款合同等。"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="form.isFsdDoc == '0'">
          <h6 class="bank_dispach_file_tit">附件</h6>
          <div id="scfj" class="height_90" style="margin-top: 0;height:0px;"></div>

          <el-col :span="23">
            <!-- <el-form-item>
              <span class="text-red">引入附件文件名（包括压缩包的文件名）不能包含-下半角符号：空格\/,“：;”？&lt;&gt;|.%`-</span>
            </el-form-item>-->
            <el-form-item label="附件上传" v-if="form.currentNode == '起草'">
              <!-- <el-input v-model="form.appendix"></el-input> -->
              <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="附件列表" v-if="attchmentFileInfo && attchmentFileInfo.length">
              <div class="tree_w">
                <el-scrollbar>
                  <div v-for="(item, index) in attchmentFileInfo" :key="item.id" class="comp_list">
                    <template>
                      <div class="command_file">
                        <span style="height:42px;line-height: 42px;">{{index+1}}、</span>
                        <span class="name down" @click="viewFile(item,null,item.fileName)">
                          {{
                          item.fileName
                          }}
                        </span>
                        <span class="name">{{ item.createrName }}</span>
                        <span class="name">{{ item.createTime }}</span>
                        <div class="btns">
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="upRow(index)"
                            v-if="attchmentFileInfo.length > 1"
                            :disabled="index == 0"
                            round
                          >上移</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downRow(index)"
                            v-if="attchmentFileInfo.length > 1"
                            :disabled="index == attchmentFileInfo.length - 1"
                            round
                          >下移</el-button>

                          <!-- <el-button
                            type="warning"
                            size="mini"
                            @click.native="deleteRow(index, item.id)"
                            round
                          >删除</el-button>-->
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downFile(item)"
                            round
                          >下载</el-button>
                        </div>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 用印选择弹出框 -->
    <!-- 
      用印选择弹窗
    -->
    <el-dialog title="用印选择" :visible.sync="selUseSealDialog" width="80%" class="bigDialog">
      <el-table ref="selUseSealTab" border size="medium" :data="selUseSealTableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="使用机构" prop="sealOrg"></el-table-column>
        <el-table-column label="印章名称" prop="sealName"></el-table-column>
        <el-table-column label="存放位置" prop="sealPosition"></el-table-column>
        <el-table-column label="本材料用印个数">
          <template slot-scope="scope">
            <el-input-number :min="0" v-model="scope.row.sealNum"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="selUseSealDialog = false">取消</el-button>
        <el-button type="primary" @click="sureSelUseSeal">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入合同编号弹窗 -->
    <el-dialog title="导入合同" :visible.sync="yinru" width="30%" :before-close="handleClose">
      <el-form ref="form1" :model="form1" label-width="200px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="CLPM系统信贷合同编号">
              <el-input v-model="form1.cpId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="cx">查询</el-button>
            <el-button type="primary" @click="ok">确定</el-button>
            <el-button @click="yinru = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 二维码弹窗 -->
    <el-dialog title="二维码" :visible.sync="erweima" class="dialogImport" :before-close="handleClose">
      <div class="ewm">
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>
      <span style="text-align: center; display: block; margin-top: 20px">
        <el-button @click="printThis">打印</el-button>
        <el-button type="primary" @click="overer">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 退回修改弹窗 -->
    <el-dialog title="退回" :visible.sync="Ths" width="30%" :before-close="handleClose">
      <el-form ref="Thdata" :model="Thdatas" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="退回原因">
              <el-input v-model="Thdatas.thyxs"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="thqds">退回</el-button>
            <el-button @click="ThQxs">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 退回修改弹窗 -->
    <el-dialog title="退回修改" :visible.sync="Th" width="30%" :before-close="handleClose">
      <el-form ref="Thdata" :model="Thdata" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="退回原因">
              <el-input v-model="Thdata.thyx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="thqd">退回</el-button>
            <el-button @click="ThQx">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 导入合同编号弹窗 -->
    <el-dialog title="增加法律审查单" :visible.sync="yinru1" width="30%" :before-close="handleClose">
      <el-form ref="form2" :model="form2" label-width="80px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="文件编号">
              <el-input v-model="form2.FLNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="拟稿人">
              <el-input v-model="form2.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" style="text-align: center">
            <el-button type="primary" @click="okyinru">确定</el-button>
            <el-button @click="yinru1 = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- <flow-chart v-model="showFlowChart" :tableData="flowChartList" :tableCols="tableCols"></flow-chart> -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <org-tree
      v-model="showOrgTree1"
      title="选择统计部门"
      @orgList="getOrgList1"
      :isSingle="true"
      :queryType="queryType"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
    ></org-tree>
    <select-person
      :canTab="false"
      :loadingTree="true"
      :treeData="treeData"
      :dialogType="dialogType"
      :offenUse="offenUse"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="请选择下一节点处理人"
      :checkIds="checkIds"
      :checkData="checkData"
      :fromdata="form"
      :singelCheckF="true"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <!--    常用批语-->
    <appendWriteList
      v-dialogDrag
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
    <!-- 
      用印方式弹窗
    -->
    <el-dialog title="选择用印方式" :visible.sync="useSealModeDialog" class="normalFormDia">
      <el-form
        ref="useSealModeDia"
        :model="useSealModeForm"
        label-width="100px"
        :rules="useSealModeRules"
        class="normalForm"
      >
        <el-form-item label="用印方式" prop="useSealMode">
          <el-radio-group v-model="useSealModeForm.useSealMode">
            <el-radio :label="0">按材料用印</el-radio>
            <el-radio :label="1">按印章用印</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="useSealWaytip">
          <el-form-item label="说明：" style="color: #f56c6c">
            例：材料A 有 10 份，每份盖行章1个，党委章2个，材料B 有 20
            份，每份盖行章2个，党委章1个。
            <p>
              1、按材料用印：以材料名称为基础，按相同序号的材料，使用同一种印章。如有多个印章，先盖完一种印章，再进行另一种印章。
              盖章次序为先盖材料A 行章 10*1 = 10份，材料A 党委章 10*2 =
              20个。再到材料B 行章 20*2=40份，材料B 党委章 20*1 =20份
            </p>
            <p>
              2、按印章用印：以印章名称为基础，按相同的印章，盖章完成后，再进行另一种印章用印。
              盖章次序为（材料A的行章10*1 + 材料B行章20*2） = 50
              个行章，（材料A的党委章10*2 + 材料B党委章20*1）= 40个党委章。
            </p>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="useSealModeDialog = false">取消</el-button>
        <el-button type="primary" @click="sureUseSealMode">确定</el-button>
      </div>
    </el-dialog>
    <!-- 
      用印信息弹窗
    -->
    <el-dialog title="本批次用印信息" :visible.sync="sealInfoDialog" class="normalFormDia">
      <el-form :model="sealInfoForm" label-width="100px" class="normalForm">
        <el-form-item label="用印材料">
          <el-input disabled v-model="sealInfoForm.title"></el-input>
        </el-form-item>
      </el-form>
      <m-table
        ref="sealInfoTab"
        :tableData="sealInfoTabData"
        :tableCols="sealInfoTabCols"
        :sortable="false"
        :isPagination="false"
      />
      <div slot="footer">
        <el-button @click="sealInfoDialog = false">退出用印</el-button>
        <el-button type="primary" @click="nextBatch">下一批</el-button>
        <el-button type="primary" @click="sureUseSeal">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="生成模板" :visible.sync="templateopen" class="normalFormDia">
      <el-form :model="template1" label-width="100px" class="normalForm">
        <el-form-item label="模板名称">
          <el-input v-model="template1.modelName"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="modelbtn">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用印查看图片&视频 -->
    <seal-img-detail ref="sealImgDetail"></seal-img-detail>
  </div>
</template>
<script>
import mTable from "@/components/table/tTable";
import mixins from "@/minixs/index";
import selectPerson from "components/tree/tree-fawen";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import orgTree from "components/tree/orgTree"; //部门选择组件
import flowChart from "components/dialog/flowChart";
import exportTable from "@/minixs/exportTable";
import QRCode from "qrcodejs2";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
// import openOrDownLoadFile from "@/minixs/openOrDownLoadFile";
import openOrDownLoadFile from "../../minixs/shiwuLineWord";
import appendWriteList from "components/viewFlow/perWrit";
import useSealMixins from "@/views/sealDrafttt/mixins/index";
import { Switch } from "element-ui";
import commonMixins from "./mixins/index";
import sealImgDetail from "views/sealDrafttt/components/sealImgDetail";
import formTextChange from "@/minixs/yongyinText/changgui"; //控制label
// import openOrDownLoadFile from "../../minixs/shiwuLineWord";
import viewDraft from "@/minixs/viewDraft";
import draftMuban from "@/minixs/draftMuban";
import dispatchIndex from "@/minixs/dispatchIndex";
import isNowUser from "@/minixs/isNowUser";
export default {
  name: "common",
  components: {
    selectPerson,
    uploadFileTs,
    orgTree,
    shiwuFlow,
    appendWriteList,
    mTable,
    sealImgDetail
  },
  mixins: [
    mixins,
    openOrDownLoadFile,
    useSealMixins,
    commonMixins,
    formTextChange,
    draftMuban,viewDraft,dispatchIndex,isNowUser
  ],
  data() {
    return {
      numYears:this.$route.query.numYear ?this.$route.query.numYear: "",
      ifShouHui: "",
      template1: {
        modelName: ""
      },
      templateopen: false,
      formdata: {},
      Shuitrue: true,
      finishTime: "",
      Havesp: "", //
      Havesp1: "", //
      Havesp2: "", //
      flscYj: "",
      Yzbgr: "",
      fzBjflag: "",
      btnyj: "", //是否监印
      documentNoNum: 0, //记录是否已生成编号
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      Thdata: {
        //退回原因
        thyx: ""
      },
      Thdatas: {
        //退回原因
        thyxs: ""
      },
      ht: false,
      hts: false,
      Th: false, //退回原因控制
      Ths: false, //退回原因控制
      offenDevices: [], //常用标语
      appendWriteDialog: false, //常用批语
      ewmZtzs: "",
      ewmSxzs: "",
      ewmMarkFlow: "",
      one: "",
      workflowId: "",
      showFlowChart: false,
      flowChartList: [],
      tableCols: [
        { label: "操作人Id", prop: "EXCID" },
        { label: "操作人名称", prop: "EXCNM" },
        { label: "节点名称", prop: "NODE" },
        { label: "节点ID", prop: "NODEID" },
        { label: "活动创建日期", prop: "TMS" }
      ],
      checked: false,
      draftOrganOption: [],
      isYygl: "",
      selUseSealDialog: false, //用印选择
      fen: "",
      form2: {
        FLNum: "【】号",
        name: ""
      },
      form1: {
        cpId: ""
      }, //引入表单数据
      yinru: false, //引入控制弹窗
      yinru1: false, //引入控制弹窗
      beizhu: [], //备注返回数据接收
      reasons: [],
      flBjs: [],
      upLdBjs: [],
      jyYjs: [],
      yyBgrs: [],
      thIdeas: [], //退回原因

      fzBjs: [], //备注返回数据接收
      shjiIdeas: [],
      jyYj2s: [],
      ldBjs: [],
      obj: {},
      obj1: {},
      obj2: {},
      obj3: {},
      showOrgTree1: false,
      selectDept1: {},
      orgOrDeptId: "", //控制id
      queryType: "", //查询级别
      orgOrDept: 0,

      bianhao: {
        statusType: "", //true
        markOrderType: "3" //
      },
      lk: "",
      dialogVisible: false,
      uploadConfig: {
        formId: "one",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      treeData: [], //树弹框数据
      dialogType: "next",
      offenUse: true,
      seletOptionsData: [],
      dialogTypeNow: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      regSealFormRule: {},
      humanName: "", //当前处理人
      issave: "", //判断是否跨行
      active: "#wjys",
      FEIbuttonList: [
        //按钮
        // { name: "保存", type: "baocun" },
        // { name: "生成编号", type: "scbh" },
        // { name: "用印", type: "yongyin" },
        // { name: "办结", type: "banjie" },
        // { name: "完成并发送", type: "wcbfs" },
        // { name: "删除此文", type: "shanchuciwen" },
        { name: "收回", type: "shouhui", show: true },
        { name: "查看流程", type: "cklc", show: true },
        { name: "打印处理单", type: "dycld", show: true },

        { name: "收藏", type: "shoucang", show: true },
        { name: "操作指南", type: "czzn", show: true }

        // { name: "查看合同", type: "ckht" },
        // { name: "发送上级行", type: "fssjh" },
        // { name: "扫描二维码", type: "smewm" },
        // { name: "发送下级行", type: "fsxjh" },
        // { name: "退回修改", type: "thxg" },
        // { name: "退回", type: "tuihui" },
        // { name: "安全门摄像", type: "security" },
        // { name: "转手工印", type: "ManualPrinting" },
        // { name: "发送上级行法律审查", type: "fssjhsc" },
        // { name: "反馈法律部门意见", type: "fkflbm" },
        // { name: "发送上级行审批", type: "fssp" },
        // { name: "反馈审批意见", type: "Fksp" },
        // { name: "查看视频", type: "LookTv" },
        // { name: "转手工印", type: "manual" }
      ],
      options: [],
      listdata: [],
      fujianid: "",
      clickTypes: "", //常用批语类型
      form: {
        deptTableHeader: "",
        allContent: [],
        departFirstDepartment: "", //拟稿一级部门
        departFirstDepartmentId: "", //id
        currentUser: "",
        currentUserId: "",
        draftOrgan: "",
        draftOrganId: "",
        draftDepartment: "", //用印部门
        draftDepartmentId: "",
        departName: "", //当前处理人部门
        departId: "",
        documentNoNum: "",
        id: "",
        ewmSx: "", //事项
        ewmZt: "", //主体
        ewmRq: "", //日期
        currentNode: "起草",
        allScInfo: "", //审查编号
        allFormInfo: "", //审查编号jiehe
        multiIdType: this.$route.query.multiIdType,
        draftDate: "", //申请时间
        userTime: "", //用印时间
        isFsdDoc: "0", //用印材料是否密件
        firstUnitId: JSON.parse(localStorage.getItem("userInfo")).firstUnitId,
        // yySdept: "", //用印部门
        draftUser: "", //经办人默认当前人
        draftUserId: "",
        tel: "", //联系电话
        documentNo: "", //编号
        title: "",
        reason: "", //用印事由
        sendType: "1", //发往单位类型
        sendDept: "", //发往单位
        rtfAssetList: [], //用印材料信息
        hfSc: "", //合法性审查意见的采纳:
        qzSp: "", // 业务事项有权签字人审批:
        isGdfw: "", //是否属于业务档案归档范围:
        sqQz: "", //有权签字人授权确认签字
        sqPerson: "", //授权人
        beSqPerson: "", //被授权人
        sqBookname: "", //授权书名称编号
        yyFs: "", //用印方式
        fzBj: "", //用印单位负责人审核意见
        flBj: "", //法律审查意见
        upLdBj: "", //上级行行领导审批
        ldBj: "", //有权人
        jyYj: "", //监印人审核
        jyYj2: "", //上级行监印人审核
        yyBgr: "", //监印保管人
        jbrChn: "", //经办人承诺
        // gzzt:'',//盖章状态
        remark: "", //备注
        fldHj: "",
        attach: "",
        attachTitle: "",
        shjiIdea: "",
        thIdea: "", //退回原因
        yyType: []
      },
      num1str: "",
      tableData: [],
      buttonList1: ["引入", "删除", "排序"],
      radio: "1",
      value: " ",
      value1: "",
      radio1: "n",
      dialogFormVisible: false,
      gridData: [
        {
          jigou: "总行",
          mc: "测试",
          address: "保险柜",
          useSealCount: 0
        },
        {
          jigou: "总行",
          mc: "测试",
          address: "保险柜",
          useSealCount: 0
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      num: 1,
      //可编辑意见域
      editedIdeaFields: {
        // reason: true, //用印事由
        remark: true, //备注
        flBj: true, //法律审查意见
        fzBj: true, //用印单位负责人审核意见
        upLdBj: true, //上级行行领导审批
        qzSp: true, // 业务事项有权签字人审批:
        sqQz: true, //有权签字人授权确认签字
        jyYj: true, //监印人审核
        jyYj2: true, //监印人审核
        yyBgr: true, //监印保管人
        shjiIdea: true, //上级行业务部门意见
        ldBj: true
      },
      //必填意见域
      requiredIdeaFields: {
        remark: "", //备注
        flBj: "", //法律审查意见
        fzBj: "", //用印单位负责人审核意见
        upLdBj: "", //上级行行领导审批
        qzSp: "", // 业务事项有权签字人审批:
        sqQz: "", //有权签字人授权确认签字
        jyYj: "", //监印人审核
        jyYj2: "", //监印人审核
        yyBgr: "", //监印保管人
        shjiIdea: "",
        ldBj: ""
      },
      //不可编辑控制域
      readFields: {
        reason: false, //用印事由
        draftDate: false, //申请时间
        userTime: false, //用印时间
        isFsdDoc: false, //用印材料是否密件
        yySdept: false, //用印部门
        draftUser: false, //经办人默认当前人
        tel: false, //联系电话
        documentNo: false, //编号
        title: false,
        sendType: false, //发往单位类型
        sendDept: false, //发往单位
        rtfAssetList: [], //用印材料信息
        yyFs: false, //用印方式
        jbrChn: false //经办人承诺
        // gzzt:'',//盖章状态
      },
      //必填控制域
      requiredFields: {
        reason: "", //用印事由
        draftDate: "", //申请时间
        userTime: "", //用印时间
        isFsdDoc: "", //用印材料是否密件
        yySdept: "", //用印部门
        documentNo: "", //编号
        title: "",
        sendType: "", //发往单位类型
        sendDept: "", //发往单位
        rtfAssetList: [], //用印材料信息
        yyFs: "", //用印方式
        // fzBj: "", //用印单位负责人审核意见
        flBj: "", //法律审查意见
        jbrChn: "" //经办人承诺
      },
      huanJieMessage: {},
      sendId: "",
      yydata: [],
      yydata1: [],
      ind: "",
      number: 0,
      texts: "",
      selUseSealTableData: [],
      isErweima: "",
      retrialIdeas: [],
      yyxzdata: [],
      fldYyfsObj: {},
      attchmentFileInfo: [],
      DAta: {},
      DAta1: {},
      erweima: false,
      scrollIntoViewOptions: {
        block: "start",
        behavior: "smooth"
      },
      Num: false,
      Noderecord: "",
      Noderecord1: "",
      nodedata: {},
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      ys: ""
    };
  },

  methods: {
    setConfig() {
      console.log("AAOOOAOAOAO");
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      );
      console.log(this.requiredFields, "ssww");
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.FEIbuttonList = this.showButton(
        this.FEIbuttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
      console.log(this.FEIbuttonList, "按钮11");
      
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //可编辑意见域
      console.log(this.requiredIdeaFields, "ss");
    },
    ldBjbtn2(val) {
      console.log(val);
      if (val === "0") {
        this.$set(this.form, "jyYj2", "同意 |");
      }
      if (val === "1") {
        this.$set(this.form, "jyYj2", "不同意 |");
      }
    },
    ldBjbtn1(val) {
      console.log(val);
      if (val === "0") {
        this.$set(this.form, "upLdBj", "同意 |");
      }
      if (val === "1") {
        this.$set(this.form, "upLdBj", "不同意 |");
      }
    },
    Yzbgrbtn(val) {
      if (val === "0") {
        this.$set(this.form, "yyBgr", "已用印 |");
      }
      if (val === "1") {
        this.$set(this.form, "yyBgr", "双人已用印 |");
      }
    },
    btnyjbtn(val) {
      if (val === "0") {
        this.form.jyYj = "已监印 |";
      }
      if (val === "1") {
        this.form.jyYj = "未监印 |";
      }
    },
    ldBjbtn(val) {
      if (val === "0") {
        this.form.ldBj = "同意 |";
      }
      if (val === "1") {
        this.form.ldBj = "不同意 |";
      }
    },
    deleteMassage(data) {
      console.log("data", data);
      this.$api.checkLz
        .perWritingDe({
          id: data
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz.perWritingSe({}).then(res => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    //新增批语
    addCommonUse(data) {
      console.log("data", data);
      this.$api.checkLz
        .perWritingCr({
          hyDnr: data
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$api.checkLz.perWritingSe({}).then(res => {
              this.offenDevices = res.data;
            });
          }
        });
    },
    writelistvalue(message) {
      console.log(message, "88888");
      switch (this.clickTypes) {
        case "ldBj":
          this.$set(
            this.form,
            "ldBj",
            (this.Havesp = 0 ? "同意" : "不同意" + message)
          );
          break;
        case "yyBgr":
          this.$set(this.form, "yyBgr", message);
          break;
        case "fzBj":
          this.$set(this.form, "fzBj", message);
          break;
        case "flBj":
          this.$set(this.form, "flBj", message);
          break;
        case "upLdBj":
          this.$set(this.form, "upLdBj", message);
          break;
        case "shjiIdea":
          this.$set(this.form, "shjiIdea", message);
          break;
        case "jyYj2":
          this.$set(this.form, "jyYj2", message);
          break;
        case "jyYj":
          this.$set(
            this.form,
            "jyYj",
            (this.btnyj = 0 ? "已监印" : "未监印" + message)
          );
          break;
        case "reason":
          this.$set(this.form, "reason", message);
          break;
      }
    },
    //打开常用批语弹窗并请求数据
    showWriteList(type) {
      this.$api.checkLz.perWritingSe({}).then(res => {
        this.offenDevices = res.data;
      });
      this.clickTypes = type;
      this.appendWriteDialog = true;
      this.$nextTick(() => {
        this.$refs.writelist.openDialog();
      });
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.attchmentFileInfo[n + 1].id,
          sort: this.attchmentFileInfo[n].sort
        },
        {
          id: this.attchmentFileInfo[n].id,
          sort: this.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.attchmentFileInfo[n];
      this.attchmentFileInfo[n] = this.attchmentFileInfo[n + 1];
      this.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.attchmentFileInfo[n - 1].id,
          sort: this.attchmentFileInfo[n].sort
        },
        {
          id: this.attchmentFileInfo[n].id,
          sort: this.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.attchmentFileInfo[n];
      this.attchmentFileInfo[n] = this.attchmentFileInfo[n - 1];
      this.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    // 打印二维码
    printThis() {
      document.execCommand("print");
    },

    FlvBh(val) {
      this.$intent.goNewPage(this, {
        path: "/sealManage/common/Fl",
        query: { data: JSON.stringify(val) }
      });
    },

    allScInfodel() {
      this.listdata = [];
      this.form.allFormInfo = "";
      this.form.allScInfo = "";
    },
    // onScroll() {
    //   const scrolled = Math.floor(
    //     document.body.scrollTop ||
    //       document.documentElement.scrollTop ||
    //       window.pageXOffset
    //   );
    //   if (scrolled < this.distance_wjys + 100) {
    //     this.active = "#wjys";
    //   } else if (
    //     scrolled >= this.distance_wjys - 100 &&
    //     scrolled < this.distance_qpyj
    //   ) {
    //     this.active = "#qpyj";
    //   } else {
    //     this.active = "#scfj";
    //   }
    // },
    //侧边滚动
    toTarget(target) {
      console.log(target);
      this.active = target;
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    xtwn(val) {
      console.log(val);
      this.form.sendDept = "";
      this.form.sendDeptId = "";
    },
    //附件删除
    deleteRow(n, id) {
      let arr = this.attach.split(",");
      arr.map((i, index) => {
        if (i == id) {
          arr.splice(index, 1);
        }
      });
      this.form.attach = arr.join(",");
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.attchmentFileInfo;
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
      });
    },
    // 附件下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.fileName
              );
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },
    // 确定
    yyxzok() {
      console.log(this.yydata);

      this.dialogFormVisible = false;
    },
    sureSelUseSeal() {
      // 已选择的用印
      let useSealArr = [];
      this.selUseSealTableData.map(item => {
        if (parseInt(item.sealNum) > 0) {
          useSealArr.push(item);
        }
      });
      console.log(useSealArr, "ssadasdasd");
      // let use =useSealArr.deepClone()
      // let use = deepClone(this.selUseSealTableData);
      // let use = JSON.parse(JSON.stringify(useSealArr));

      let use = deepClone(useSealArr);
      // console.log(use, "use");
      // let AA =  JSON.parse(JSON.stringify(this.form.rtfAssetList))
      this.form.rtfAssetList[this.ind].ss = use;

      this.yydata = useSealArr;

      // 印章名称及每份个数
      let sealDetailArr = [];
      this.yydata.map(item => {
        sealDetailArr.push(`${item.sealName} ${item.sealNum}`);
        console.log(item.sealPosition, "888888888888888");
      });
      if (sealDetailArr.length <= 0) {
        this.form.rtfAssetList[this.ind].zong = "";
      } else {
      }
      this.yydata.map((item, index) => {
        this.form.rtfAssetList[this.ind].zong = sealDetailArr.join(",");
      });
      this.handleChange();
      this.selUseSealDialog = false;
    },

    //用印材料列表监听
    handleChange(i, row) {
      if (row) {
        if (!row.zong) {
          this.$message.error("请选择每份材料及个数");
          return;
        }
      }
      this.DAta = {};
      let heji = [];
      let str = "";
      this.form.rtfAssetList.map((item, index) => {
        console.log(item, "大厦好说的");
        let yzArr = item.ss;
        yzArr.map(item => {
          console.log(item, "-------------------");
          if (this.DAta[item.sealPosition]) {
            console.log(this.DAta[item.sealPosition], "sdsdsd");
            console.log(item.sealName, "sdsdsd11111111111");
            let Arrs = this.DAta[item.sealPosition].split(",");
            let newArr = "";
            Arrs.map(i => {
              console.log(item, "***************");
              if (i == item.sealName) {
                newArr = true;
              }
            });
            if (!newArr) {
              this.$set(
                this.DAta,
                item.sealPosition,
                this.DAta[item.sealPosition] + "," + item.sealName + "&"
              );
            }
          } else {
            this.$set(this.DAta, item.sealPosition, item.sealName);
          }
        });
        let str = "";
        console.log(this.DAta, "ssssssssssssssssssssssssssssssss");
        for (const key in this.DAta) {
          console.log(key, "&&&&&&&*****&^^^^^^^");
          str +=
            (key == "用印机" ? "机器盖章" : "手工盖章") + "：" + this.DAta[key];
        }
        this.form.yyFs = str;
        let arr = item.zong.split(",");
        arr.map(ivv => {
          console.log(ivv.split(" ")[0]);

          heji.push(`${ivv.split(" ")[0]} ${item.num * ivv.split(" ")[1]}`);
        });
      });
      let obj = {};
      heji.map((item, index) => {
        if (!obj[item.split(" ")[0]]) {
          this.$set(obj, item.split(" ")[0], item.split(" ")[1]);
        } else {
          this.$set(
            obj,
            item.split(" ")[0],
            Number(obj[item.split(" ")[0]]) + Number(item.split(" ")[1])
          );
        }
      });
      console.log(obj);
      let s = "";
      let countSum = 0;
      for (var key in obj) {
        console.log(obj[key]);
        if (obj[key] == "NaN") {
          obj[key] = " ";
        } else {
          s += key + " " + obj[key] + "个,";
          countSum += Number(obj[key]);
        }
        // s += key + " " + obj[key] + "个";
      }
      this.texts = s;
      this.form.fldHj = s;
      this.form.yyCount = countSum;
      this.form.mockNum = countSum;
    },

    xuanze() {
      this.showOrgTree1 = true;
      this.one = "1";
    },
    getOrgList1(org) {
      console.log(org);
      if (this.one == "1") {
        this.$set(this.form, "sendDept", org.unitName);
        this.$set(this.form, "sendDeptId", org.id);
      } else {
        let param = {
          markOrderType: "3",
          unitId: org.id,
          id: this.sendId
        };
        this.$api.sealManage.sureHander({ ...param }).then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.$router.push("/sealManage/useSeal/draft/common/list");
          }
        });
      }
    },
    Yinr() {
      this.yinru1 = true;
      // let path = "/sealManage/useSeal/draft/common/yr";
      // this.$intent.goNewPage(this, {
      //   path,
      //   query: {}
      // });
    },
    Add() {
      this.number += 1;
      let params = {
        index: this.number,
        yytitle: "", //标题
        yyxz: "", //性质
        num: "", //分数
        zong: "",
        ss: []
      };
      this.form.rtfAssetList.push(params);
    },
    // 导入合同确定
    ok() {
      this.$api.sealManage
        .drsave(this.form1)
        .then(res => {
          if (res.code == "SUCCESS") {
            let params = {
              yytitle: this.form1.cpId, //标题
              yyxz: "", //性质
              num: "1", //分数
              zong: "",
              fileName: res.fileName,
              filePath: res.url
            };
            this.form.allContent.push(params);
            this.yinru = false;
            this.$message({
              type: "success",
              message: "操作成功"
            });
          }
        })
        .catch(res => {
          console.log(res, "0000000000000000000");
        });
    },
    //导入合同查询
    cx() {
      this.$api.sealManage.drcx(this.form1).then(res => {
        if (res.code == "SUCCESS") {
          console.log(res, "查询是是是是是送是是");
          this.$message({
            type: "success",
            message: res.msg
          });
        }
      });
    },
    //引入弹窗确定
    okyinru() {
      this.$api.sealManage.yinrus(this.form2).then(res => {
        if (res.code == "SUCCESS") {
          console.log(res, "yinrubainhao");
          this.listdata = res.list;
          this.form.allFormInfo = res.list;
          this.form.allScInfo = this.form2;
          this.yinru1 = false;
        }
        this.$message({
          type: "success",
          message: res.msg
        });
      });
    },

    //导入合同材料
    Import() {
      this.yinru = true;
    },
    // 用印选择
    yyxz(num, i, row) {
      console.log(num, i, row);
      this.ind = i;

      if (num == 2) {
        this.selUseSealTableData.map((ivv, is) => {
          console.log(ivv, "iccvvvvv");
          row.ss.map((item, index) => {
            if (item.sealName == ivv.sealName) {
              console.log(ivv.sealNum, "99999", item.sealNum);
              ivv.sealNum = item.sealNum;
            } else {
              this.$set(ivv, "sealNum", 0);
            }
          });
        });
      } else {
        this.selUseSealTableData.map(item => {
          this.$set(item, "sealNum", 0);
        });
      }
      this.selUseSealDialog = true;
    },
    //删除
    del() {
      let val = this.yydata1;
      // 获取选中行的索引的方法
      // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
      // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
      val.forEach((val, index) => {
        this.form.rtfAssetList.forEach((v, i) => {
          if (val.index === v.index) {
            // i 为选中的索引

            this.form.rtfAssetList.splice(i, 1);
          }
        });
      });
      this.handleChange();
    },
    //选中数据
    // handleSelectionChange(val) {
    //   this.yydata = val;
    // },
    handleSelectionChange1(val) {
      this.yydata1 = val;
    },

    //附件弹窗
    Browse() {
      this.dialogVisible = true;
    },
    //附件返回数据
    fileList(files) {
      console.log(files, "附件files");
      if (this.attchmentFileInfo && this.attchmentFileInfo.length) {
        this.attchmentFileInfo.push(...files);
      } else {
        this.attchmentFileInfo = files;
      }
      if (!this.form.attachsid) {
        this.form.attachsid = [];
      }
      files.forEach(item => {
        this.form.attachsid.push(item.id);
      });
      this.uploadConfig.filesHas = files;

      this.form.attach = this.form.attachsid.join(",");
      this.$forceUpdate();
    },
    //附件列表回显数据
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.fujianid,
          numYear:this.numYears
        })
        .then(res => {
          console.log(res, "33333333333333333333");
          this.$nextTick(() => {
            // this.$set(this.attchmentFileInfo, "attchmentFileInfo", res.data);
            this.attchmentFileInfo = res.data;
            this.uploadConfig.filesHas = this.attchmentFileInfo;
          });
        });
    },
    //必填配置
    setRuleConfig() {
      this.regSealFormRule = {
        draftDate: [
          {
            required: this.requiredFields.draftDate,
            message: "申请时间不能为空",
            trigger: "blur"
          }
        ],
        userTime: [
          {
            required: this.requiredFields.userTime,
            message: "用印时间不能为空",
            trigger: "blur"
          }
        ],
        isFsdDoc: [
          {
            required: this.requiredFields.isFsdDoc,
            message: "用印材料是否密件不能为空",
            trigger: "blur"
          }
        ],
        yySdept: [
          {
            required: this.requiredFields.yySdept,
            message: "用印部门不能为空",
            trigger: "blur"
          }
        ],
        documentNo: [
          {
            required: this.requiredFields.documentNo,
            message: "编号不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: this.requiredFields.title,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        sendType: [
          {
            required: this.requiredFields.sendType,
            message: "发往单位类型不能为空",
            trigger: "blur"
          }
        ],
        sendDept: [
          {
            required: this.requiredFields.sendDept,
            message: "发往单位不能为空",
            trigger: "blur"
          }
        ],
        hfSc: [
          {
            required: this.requiredIdeaFields.qzSp,
            message: "合法意见采纳不能为空",
            trigger: "blur"
          }
        ],
        qzSp: [
          {
            required: this.requiredIdeaFields.qzSp,
            message: "业务事项有权签字人审批不能为空",
            trigger: "blur"
          }
        ],
        isGdfw: [
          {
            required: this.requiredIdeaFields.qzSp,
            message: "是否属于业务档案归档范围不能为空",
            trigger: "blur"
          }
        ],
        sqQz: [
          {
            required: this.requiredIdeaFields.sqQz,
            message: "有权签字人授权确认签字不能为空",
            trigger: "blur"
          }
        ],
        sqPerson: [
          {
            required: this.requiredIdeaFields.sqQz,
            message: "授权人不能为空",
            trigger: "blur"
          }
        ],
        beSqPerson: [
          {
            required: this.requiredIdeaFields.sqQz,
            message: "被授权人不能为空",
            trigger: "blur"
          }
        ],
        sqBookname: [
          {
            required: this.requiredIdeaFields.sqQz,
            message: "授权书名称编号不能为空",
            trigger: "blur"
          }
        ],
        yyFs: [
          {
            required: this.requiredFields.yyFs,
            message: "用印方式不能为空",
            trigger: "blur"
          }
        ],
        fzBj: [
          {
            required: this.requiredIdeaFields.fzBj,
            message: "用印申请部门审核意见不能为空",
            trigger: "blur"
          }
        ],
        flBj: [
          {
            required: this.requiredIdeaFields.flBj,
            message: "法律审查意见不能为空",
            trigger: "blur"
          }
        ],
        upLdBj: [
          {
            required: this.requiredIdeaFields.upLdBj,
            message: "上级行行领导审批不能为空",
            trigger: "blur"
          }
        ],
        jyYj: [
          {
            required: this.requiredIdeaFields.jyYj,
            message: "监印人审核意见不能为空",
            trigger: "blur"
          }
        ],
        yyBgr: [
          {
            required: this.requiredIdeaFields.yyBgr,
            message: "监印保管人不能为空",
            trigger: "blur"
          }
        ],
        jbrChn: [
          {
            required: this.requiredFields.jbrChn,
            message: "请选择经办人承诺",
            trigger: "blur"
          }
        ],
        reason: [
          {
            required: this.requiredFields.reason,
            message: "用印事由不能为空",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.remark,
            message: "备注不能为空",
            trigger: "blur"
          }
        ],
        shjiIdea: [
          {
            required: this.requiredIdeaFields.shjiIdea,
            message: "上级行业务部门意见不能为空",
            trigger: "blur"
          }
        ],
        ldBj: [
          {
            required: this.requiredIdeaFields.ldBj,
            message: "有权审批人意见不能为空",
            trigger: "blur"
          }
        ]
      };
    },
    //完成并发送选人弹出框
    showCompDialog(data, status, type, params, dtype) {
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        let param = {
          markOrderType: "3",
          id: this.sendId || this.$route.query.id,
          nextUserId: String(data[0].idStr),
          nextUserName: data[0].name,
          nextAvyId: params.id,
          nextAvyName: params.name,
          unitId: data[0].deptId,
          wcfs: true
        };
        this.$api.sealManage.sureHander({ ...param }).then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.$router.push("/sealManage/useSeal/draft/common/list");
          }
          this.dialogState = false;
        });
      } else {
        this.dialogState = false;
      }
    },
    overer() {
      this.erweima = false;
      this.$refs.qrCodeUrl.innerHTML = "";
    },
    // 、、退回原因
    thqd() {
      this.form.thIdea = this.Thdata.thyx;
      this.Th = false;
      let param = {
        markOrderType: "3",
        thIdea: this.form.thIdea,
        id: this.sendId || this.$route.query.id
      };
      this.$api.sealManage.Tuih({ ...param }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.Thdata.thyx = "";
          // this.$router.push("/sealManage/useSeal");
        }
      });
    },
    ThQx() {
      this.Thdata.thyx = "";
      this.Th = false;
    },
    thqds() {
      this.form.thIdea = this.Thdatas.thyxs;
      this.Ths = false;
    },
    ThQxs() {
      this.Thdatas.thyxs = "";
      this.Ths = false;
    },
    // 生成模板确定
    modelbtn() {
      this.$api.sealManage
        .BanMban({
          markOrderType: "3",
          id: this.sendId || this.$route.query.id,
          modelName: this.template1.modelName
        })
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "生成模板成功！"
          });
          this.templateopen = false;
        })
        .catch(res => {
          console.log(res);
        });
    },
    buttonClick(i) {
      let that = this;
      switch (i) {
        case "生成模板":
          this.templateopen = true;
          break;
        case "催办":
          this.$api.sealManage
            .CuiBan({
              markOrderType: "3",
              id: this.sendId || this.$route.query.id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "催办成功！"
              });
            });
          break;
        case "扫描二维码":
          this.erweima = true;
          setTimeout(() => {
            let str =
              "日期:" +
              this.form.ewmRq +
              "事项：" +
              this.form.ewmSx +
              "主体：" +
              this.form.ewmZt;
            console.log(str);
            let qrcode = new QRCode(this.$refs.qrCodeUrl, {
              // eslint-disable-line no-unused-vars
              text: str,
              width: 150,
              height: 150,
              colorDark: "#000000",
              colorLight: "#ffffff"
              // correctLevel: QRCode.CorrectLevel.H
            });
            this.sA = qrcode;
          }, 500);
          break;

        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.sealManage
                .shoucang({
                  markOrderType: "3",
                  id: this.$route.query.id || this.sendId,
                  numYear:this.numYears
                })
                .then(res => {
                  console.log(res, "收藏");
                  let obj = {};
                  obj.filePath = res.filePath;
                  obj.fileName = res.fileName;
                  this.downFile(obj);
                  this.$message({
                    type: "success",
                    offset: "200",
                    message: "收藏完成"
                  });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "查看流程":
          this.$api.pubInfo
            .Lookcx({
              curProcessInstId: this.workflowId,
              subProcessInstId: this.num1str,
              numYear: this.numYears
            })
            .then(res => {
              console.log(res);
              this.flowChartList = res.data;
              this.$nextTick(() => {
                this.$refs.dialogLine.openDialog();
              });
            });
          break;
        case "收回":
          this.$api.sealManage
            .shouhui({
              id: this.$route.query.id,
              markOrderType: this.$route.query.markOrderType
            })
            .then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "操作成功！"
                });
                // this.$router.push("/sealManage/useSeal/draft/common/list");
                this.$intent.closeWindow(this);
              }
            });
          break;
        case "保存":
          break;
        case "完成并发送":
          // this.$api.sealManage.markMgr
          //   .getMarkProcess({ id: this.$route.query.id })
          //   .then(res => {
          //     console.log(res)
          //   });
          this.wcbfs();
          break;
        case "生成编号":
          if (this.documentNoNum === 1) {
            this.$message({
              type: "warning",
              message: "已生成编号！"
            });
            break;
          }
          if (this.isImpDocDis) {
            this.$message({
              type: "warning",
              message: "此审批单已办结，不可生成编号！"
            });
            break;
          }
          this.$api.sealManage
            .getSealNum({
              markOrderType: "3",
              // unitId: JSON.parse(localStorage.getItem('userInfo')).unitId,
              statusType: true,
              id: this.$route.query.id
            })
            .then(res => {
              this.documentNoNum = 1;
              this.$set(this.form, "documentNo", res.data);
            });
          break;
        case "发送上级行":
          this.one = "2";
          // this.form.jyYj = `${btnyj}=${form.jyYj}`;

          this.$refs["form"].validate(valid => {
            if (valid) {
              let params = {
                markOrderType: "3",
                id:
                  this.sendId || this.$route.query.id
                    ? this.$route.query.id
                    : "",
                multiIdType: this.form.multiIdType,
                SJH: "1"
              };
              //完成并发送
              this.$api.sealManage
                .sendDocument(Object.assign(this.form, params))
                .then(res => {
                  if (res.code == "SUCCESS") {
                    console.log(res, "完成并发送");
                    this.orgOrDeptId = res.unitId;
                    this.sendId = res.id;
                    this.showOrgTree1 = true;
                  }
                });
            }
          });
          break;
        case "办结":
          if (this.$route.query.id) {
            let param = {
              markOrderType: "3",
              id: this.sendId || this.$route.query.id,
              over: "true"
            };
            this.$api.sealManage.sureHander({ ...param }).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
              }
            });
          }
          break;
        case "打印处理单":
          this.printForm();
          break;
        case "操作指南":
          this.handBook("YZGL");
          break;
        case "查看视频":
          break;
        case "用印":
          // **************************调取用印弹窗数据
          if (this.form.yyFs && this.form.yyFs.includes("机器盖章")) {
            this.isShowSealState = true;
            this.useSealModeDialog = true;
          }
          this.$api.sealManage.getUseSealType({ sysConfig: "7" }).then(res => {
            this.form.userTime = res.newDateYY;
          });
          break;
      }
    },
    shoucang() {
      let shiwutitle = this.form.deptTableHeader + "常规用印审批单";
      let that = this;

      let draftInfo = this.attchmentFileInfo;
      exportTable.getPdf(
        shiwutitle,
        draftInfo,
        "changguiyongyin",
        this.$businessCode.fawglfj,
        shiwutitle,
        that
      );
    },
    wcbfs() {
      if (!this.checked) {
        this.$message({
          type: "success",
          message: "请勾选经办人承诺!"
        });
        return;
      }
      if (this.form.isFsdDoc == "0" && this.form.attach == "") {
        this.$message({
          type: "success",
          message: "请上传附件!"
        });
        return;
      }
      if (this.form.rtfAssetList.length <= 0) {
        this.$message.error("请添加用印材料信息");
        return;
      } else {
        this.form.rtfAssetList.map((item, index) => {
          console.log(item);
          if (!item.yytitle) {
            this.$message.error(
              "用印信息第" + (index + 1) + "行用印材料标题不能为空"
            );
            return;
          }
          if (!item.yyxz) {
            this.$message.error(
              "用印信息第" + (index + 1) + "用印性质不能为空"
            );
            return;
          }

          if (!item.zong) {
            this.$message.error(
              "用印信息第" + (index + 1) + "请选择用印材料及个数"
            );
            return;
          }
          if (item.yytitle && item.yyxz && item.zong) {
            this.eay = true;
          } else {
            this.eay = false;
          }
        });

        if (this.eay) {
          this.$refs["form"].validate(valid => {
            if (valid) {
              let num = [];
              let flag1;
              let flag2;
              let flag;
              let A = [];
              let w;
              let s;
              this.form.rtfAssetList.map(item => {
                switch (item.yyxz) {
                  case "非标准格式法律性文件":
                    if (this.flBjs !== undefined && this.flBjs.length > 0) {
                      //判断办公室综合处理 非标环节
                      for (let key in this.nodedata) {
                        console.log();
                        if (this.nodedata[key] == "this.Noderecord='5'") {
                          console.log(key);
                          w = key;
                          break;
                        }
                        // let o = {};
                        // this.$set(o, this.nodedata[key],key );
                        // A.push(o);

                        // num.push(key);
                      }
                      console.log(w, "!@@@@@@@@");
                      // A.map(item => {
                      //      s ="this.Noderecord='5'"
                      //     w = item.s
                      if (w) {
                        num.push(w);
                      } else {
                      }

                      // });
                      console.log(num, "2@@@@9999");
                    }
                    if (num.length === 0) {
                      console.log("ssss");
                      console.log(this.nodedata, "0o0o0o0o0o0o0o");
                      for (let key in this.nodedata) {
                        if (this.nodedata[key] == "this.Noderecord='1'") {
                          if (flag1 == "2") {
                            num = [];
                          }
                          flag1 = "1";
                          num.push(key);
                          break;
                        }
                        if (this.nodedata[key] == "this.Noderecord='4'") {
                          if (flag2 == "2") {
                            num = [];
                          }
                          flag2 = "1";
                          num.push(key);
                          break;
                        }
                      }
                    }
                    break;
                  case "非法律性文件":
                    console.log("feifa");
                    for (let key in this.nodedata) {
                      if (this.nodedata[key] == "this.Noderecord='2'") {
                        if (flag1 != "1") {
                          num.push(key);
                          flag1 = "2";
                        } else {
                          break;
                        }
                      }
                      if (this.nodedata[key] == "this.Noderecord='3'") {
                        if (flag2 != "1") {
                          num.push(key);
                          flag2 = "2";
                        } else {
                          break;
                        }
                      }
                    }
                    break;
                  case "标准格式法律性文件":
                    for (let key in this.nodedata) {
                      if (this.nodedata[key] == "this.Noderecord='2'") {
                        if (flag1 != "1") {
                          num.push(key);
                          flag1 = "2";
                        } else {
                          break;
                        }
                      }
                      if (this.nodedata[key] == "this.Noderecord='4'") {
                        if (flag2 == "2") {
                          num = [];
                        }
                        flag2 = "1";
                        num.push(key);
                        break;
                      }
                    }
                }
              });
              let params = {
                markOrderType: "3",
                id:
                  this.sendId || this.$route.query.id
                    ? this.$route.query.id
                    : "",
                multiIdType: this.form.multiIdType,
                nodeArr: num.length ? num : ""
              };
              console.log(this.form, "6789067896789");
              let btnyjs = this.btnyj;
              let Havesp = this.Havesp;
              let Yzbgr = this.Yzbgr;
              let formParamss = JSON.parse(JSON.stringify(this.form));
              if (btnyjs) {
                formParamss.jyYj = `${btnyjs}=${formParamss.jyYj}`;
              }
              if (Havesp) {
                formParamss.ldBj = `${Havesp}=${formParamss.ldBj}`;
              }
              if (Yzbgr) {
                formParamss.yyBgr = `${Yzbgr}=${formParamss.yyBgr}`;
              }
              //完成并发送
              this.$api.sealManage
                .sendDocument(Object.assign(formParamss, params))
                .then(res => {
                  if (res.code == "SUCCESS") {
                    console.log('resd',res)
                    this.orgOrDeptId = res.unitId;
                    this.seletOptionsData = res.list; //环节下拉数据
                    this.treeData = res.result.data; //部门
                    this.sendId = res.id;
                    this.dialogState = true;
                  }
                });
            }
          });
        }
      }
    },

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      console.log("-----flagFile--->", flagFile);
      var successInfo = { state: false };
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = flagFile.fileName;
      bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          console.log("-----res", res);
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },

    //打印处理单views/dispatch/printFile/dzfwcld
    printForm() {
      console.log("ss");
      let rowData = this.form;
      let copyRow = JSON.stringify(rowData);

      this.$intent.goNewPage(this, {
        path: "/sealManage/useSeal/draft/common/yr",
        query: { data: copyRow, id: this.$route.query.id }
      });
      // if (this.formData.isKh == 0) {
      //   this.$intent.goNewPage(this, {
      //     path: "/shiwuBenhang",
      //     query: { data: copyRow }
      //   });
      // } else if (this.formData.isKh == 1) {
      //   this.$intent.goNewPage(this, {
      //     path: "/shiwuBenhangkh",
      //     query: { data: copyRow }
      //   });
      // }
    },
    backDarft() {
      this.$intent.closeWindow(this);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    //生成编号
    //     scbh(val) {
    //       this.documentNo = val;
    //       this.bianhao.statusType = val;
    //       this.$api.sealManage.getSealNum(this.bianhao).then(res => {
    //         console.log(res, "生成编号");
    //         this.form.documentNo = res.data;
    //         var str1=res.data;//要截取@到.之间的内容
    // var str2=str1.substring(str1.indexOf("〕")+1,str1.indexOf("号"));
    // console.log(str2);
    //         this.getLink();
    //       });
    //     },

    //获取环节
    getLink() {
      let params = {
        markOrderType: "3",
        id: this.sendId || this.$route.query.id,
        multiIdType:
          this.$route.query.multiIdType || this.$route.query.markOrderType
      };
      this.$api.sealManage.getLink(params).then(res => {
        this.huanJieMessage = res.Fields;
        let arr = res.Fields.acyNodeNextBount;
        let obj = {};
        for (var key in arr) {
          console.log(key);
          console.log(arr[key]);
          obj[key] = arr[key].condition[0];
          // obj.push()
          // keys.push(key);
          // values.push(obj[key]); //取得value
        }
        this.nodedata = obj;
        this.setConfig();
        this.setRuleConfig();
      });
    },
    initData() {
      this.$api.sealManage
        .getUseSealType({ sysConfig: "3", departId: this.wcbfsId })
        .then(res => {
          console.log(res, "lll");
          // this.fen = res.deptTableHeaderad
          this.form.jbrChn = res.data.scStype;
          let arr, arr2, arr3, arr4, arr5;
          if (res.data.hfSc) {
            arr = res.data.hfSc.split(",");
            arr.map((item, index) => {
              this.$set(this.obj, index, item);
            });
          }
          if (res.data.qzSp) {
            arr2 = res.data.qzSp.split(",");
            arr2.map((item, index) => {
              this.$set(this.obj1, index, item);
            });
          }
          if (res.data.isGdfw) {
            arr3 = res.data.isGdfw.split(",");
            arr3.map((item, index) => {
              this.$set(this.obj2, index, item);
            });
          }
          if (res.data.sqQz) {
            arr4 = res.data.sqQz.split(",");
            arr4.map((item, index) => {
              this.$set(this.obj3, index, item);
            });
          }
          if (res.data.scSlimit) {
            arr5 = res.data.scSlimit.split(",");
            arr5.map((item, index) => {
              this.$set(this.obj4, index, item);
            });
          }
        })
        .catch(e => {});
    },
    getdetel() {
      this.setConfig();
      
      this.checked = true;
      // 详情接口
      this.$api.sealManage
        .ruledetel({ id: this.$route.query.id || this.sendId,numYear:this.numYears })
        .then(res => {
          // this.fen = res.data.draftOrgan
          // this.fen = res.form.deptTableHeader
          if (res.data.yyTypes) {
            this.randomStr1 = res.data.markMainForm;
            this.tableSealStateData = JSON.parse(
              JSON.stringify(res.data.yyTypes)
            );
            this.form.yyType = JSON.parse(JSON.stringify(res.data.yyTypes));
          }
          this.form = res.data;
          console.log('详情呀',res)
          
          this.ifShouHui = res.ifShouHui;
          console.log(res, "xiangiqng");
          this.formdata = res.data;
          let As = res.data.documentNo.split("〕")[1];
          console.log("true", As);

          if (As === "号") {
            this.documentNoNum1 = "1";
          } else {
            this.documentNoNum1 = "2";
          }
          //拟稿人部门
          this.form.departFirstDepartment = res.data.departFirstDepartment;
          this.form.departFirstDepartmentId = res.data.departFirstDepartmentId;
          //当前处理人部门
          //当前处理人部门 当前处理人的第一部门
          this.form.departName = res.data.departName;
          this.form.departId = res.data.departId;
          //拟稿人
          this.form.draftUser = res.data.draftUser;
          this.form.draftUserId = res.data.draftUserId;

          this.form.multiIdType = this.$route.query.markOrderType;
          console.log(this.form, "ldBjldBjldBjldBjldBj");
          //用yin材料信息
          this.form.rtfAssetList = JSON.parse(
            JSON.stringify(JSON.parse(res.data.rtfAssetList))
          );
          // 合同材料列表数据
          this.form.allContent = JSON.parse(
            JSON.stringify(JSON.parse(res.data.allContent))
          );
          this.fujianid = res.data.id;
          this.getFileList();
          this.listdata = res.data.allFormInfos;
          this.form.allFormInfo = res.data.allFormInfos;
          this.form.allScInfo = res.data.allScInfos;
          this.form.draftUser = res.data.draftUser; //详情经办人
          this.workflowId = res.data.workflowId;
          this.num1str = res.data.num1Str;
          this.texts = res.data.fldHj;
          if (res.data.ldBj) {
            this.Havesp = res.data.ldBj.split("=")[0];
            console.log(this.Havesp, "22");
            this.form.ldBj = res.data.ldBj.split("=")[1] || res.data.ldBj;
          }
          if (res.data.jyYj) {
            this.btnyj = res.data.jyYj.split("=")[0];
            console.log(this.btnyj, "11");
            this.form.jyYj = res.data.jyYj.split("=")[1] || res.data.jyYj;
          }
          if (res.data.jyYj2) {
            this.Havesp2 = res.data.jyYj2.split("=")[0];
            console.log(this.Havesp2, "Havesp2");
            this.form.jyYj2 = res.data.jyYj2.split("=")[1] || res.data.jyYj2;
          }
          if (res.data.yyBgr) {
            this.Yzbgr = res.data.yyBgr.split("=")[0];
            console.log(this.Yzbgr, "112");
            this.form.yyBgr = res.data.yyBgr.split("=")[1] || res.data.yyBgr;
          }
          if (res.data.flBj) {
            this.flscYj = res.data.flBj.split("=")[0];
            console.log(
              this.flscYj,
              "flscyjsssssssssssssssssssssssssssssssssssssssss"
            );
            console.log(this.flscYj, "flscYj");
            this.form.flBj = res.data.flBj.split("=")[1] || res.data.flBj;
          }
          if (res.data.upLdBj) {
            this.Havesp1 = res.data.upLdBj.split("=")[0];
            console.log(this.Yzbgr, "112");
            this.form.upLdBj = res.data.upLdBj.split("=")[1] || res.data.upLdBj;
          }
          if (res.data.fzBj) {
            this.fzBjflag = res.data.fzBj.split("=")[0];
            console.log(this.Yzbgr, "112");
            this.form.fzBj = res.data.fzBj.split("=")[1] || res.data.fzBj;
          }
          let id = res.data.sendUpUnitLabel;
          switch (id) {
            case "1":
              this.issave = "否";
              break;
            case "2":
              this.issave = "是";
              break;
            case "3":
              this.issave = "否";
              break;
            case "4":
              this.issave = "是";
              break;
            case "5":
              this.issave = "是";
              break;
            case "6":
              this.issave = "是";
              break;
          }
          if (res.data.ldBjs !== undefined && res.data.ldBjs.length > 0) {
            res.data.ldBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr;
            });
          }
          if (
            res.data.retrialIdeas !== undefined &&
            res.data.retrialIdeas.length > 0
          ) {
            res.data.retrialIdeas.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr;
            });
          }
          if (res.data.jyYjs !== undefined && res.data.jyYjs.length > 0) {
            res.data.jyYjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
            });
          }
          if (res.data.fzBjs !== undefined && res.data.fzBjs.length > 0) {
            res.data.fzBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
            });
          }
          if (res.data.jyYj2s !== undefined && res.data.jyYj2s.length > 0) {
            res.data.jyYj2s.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
            });
          }
          if (res.data.yyBgrs !== undefined && res.data.yyBgrs.length > 0) {
            res.data.yyBgrs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
            });
          } 
          if (res.data.flBjs !== undefined && res.data.flBjs.length > 0) {
            res.data.flBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
            });
          }
          if (res.data.upLdBjs !== undefined && res.data.upLdBjs.length > 0) {
            res.data.upLdBjs.map(item => {
              item.nr = item.nr.split("=")[1] || item.nr.split("=")[0];
            });
          }
          // this.humanName = res.data.currentUser; 
          if (res.data.authUserId) {
          this.humanName =
            res.data.authUserName + "（由" + res.data.currentUser + "授权）";
          } else {
            this.humanName = res.data.currentUser
          }
          this.form.currentNode = res.data.currentNode;
          this.sendId = res.data.id;
          this.uploadConfig.id = res.data.id;
          this.jyYj2s = res.data.jyYj2s;
          this.beizhu = res.data.beizhu; //备注
          this.retrialIdeas = res.data.retrialIdeas; //复审情况
          this.flBjs = res.data.flBjs; //法律审查意见
          this.upLdBjs = res.data.upLdBjs; //上级有权审批人审批
          this.ldBjs = res.data.ldBjs; //有权审批人审批
          this.jyYjs = res.data.jyYjs; //监印人审核
          this.yyBgrs = res.data.yyBgrs; //印章保管人
          this.thIdeas = res.data.thIdeas; //印章保管人
          this.fzBjs = res.data.fzBjs; //用印单位负责人审核意见
          this.shjiIdeas = res.data.shjiIdeas; //上级行业务部门数据'
        });
    }
  },
  mounted() {
    //label动态获取
    this.$nextTick(function() {
      this.formTextChange("yzgl_cgyy");
    });
    this.formdata = this.form;
    let Jb = JSON.parse(localStorage.getItem("userInfo"));
    this.orgOrDeptId = Jb.unitId;
  },
  created() {
    this.ys = this.$route.query.ys;
    this.initData();
    this.$api.sealManage.getUseSealType({ sysConfig: "7" }).then(res => {
      console.log(res, "用音箱孩子");
      // this.form.draftDate = res.newDateYY;
      this.ewmZtzs = res.data.ewmZtzs;
      this.ewmSxzs = res.data.ewmSxzs;
      this.isYygl = res.data.isYygl;
      this.isErweima = res.data.isErweima;
      this.form.ewmZsTotal = res.newDate;

      let arrn = {};
      res.data.scFiletypeHw.split(",").forEach((item, index) => {
        this.$set(this.yyxzdata, index, item);
      });
      // this.yyxzdata = res.data.values;

      if (res.data.ewmMarkFlow) {
        let arr = res.data.ewmMarkFlow.split("#");
        arr.map(item => {
          console.log(item);
          if (item == "常规用印审批") {
            this.ewmMarkFlow = item;
          }
        });
      }
    });

    if (this.$route.query.id) {
      this.getdetel();
      this.getLink();
      //获取当前登录人信息 、、用印部门数据
      let Jb = JSON.parse(localStorage.getItem("unitInfo"));
      console.log("当前登录人信息", Jb);
      this.draftOrganOption = Jb;
    } else {
      this.form.multiIdType = this.$route.query.multiIdType;

      //调用编号接口
      this.$api.sealManage
        .getSealNum({
          markOrderType: "3",
          statusType: false
        })
        .then(res => {
          this.$set(this.form, "documentNo", res.data);
        });
      var aData = new Date();
      console.log(aData); //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)
      this.form.draftDate =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();

      let data = this.$route.query.multiIdType;
      switch (data) {
        case "1":
          this.issave = "否";
          break;
        case "2":
          this.issave = "是";
          break;
        case "3":
          this.issave = "否";
          break;
        case "4":
          this.issave = "是";
          break;
        case "5":
          this.issave = "是";
          break;
        case "6":
          this.issave = "是";
          break;
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.ewm {
  width: 150px;
  margin: 0 auto;
}
.bank_dispach_content {
  width: 100%;
  height: auto;

  .bank_dispach_side_nav {
    width: 45px !important;
    height: auto !important;
    position: fixed !important;
    bottom: 8px !important;
    left: 4% !important;
    margin-left: -43px !important;
    text-align: center !important;

    a {
      width: 45px !important;
      height: 70px !important;
      border: 2px solid #3b85ef !important;
      font-size: 16px !important;
      margin: 15px 0 !important;
      color: #3b85ef !important;
      background: #fff !important;
      border-radius: 10px 0 0 10px !important;
      font-weight: 600 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .active {
      background: #3b85ef !important;
      color: #fff !important;
    }
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}
.common {
  background: #fff;
  .normalFormDia {
    .normalForm {
      border: none;
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  .common-header {
    width: 100%;
    display: flex;
    background: #409eff;
    justify-content: space-between;
    align-items: center;
    .back {
      line-height: 60px;
      height: 60px;
      margin-left: 2%;
      color: #eee;
    }
    .btn_box {
      display: flex;
      margin-right: 2%;
    }
  }
  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 35px;
    color: #409eff;
    font-weight: 800;
  }
  .el-form {
    border: 1px solid #dcdfe6;
    width: 92%;
    padding: 2% 2%;
    margin: auto;
    .box {
      width: 97%;
      border: 1px solid red;
      background: #fef7e7;
      box-sizing: border-box;
      height: 42px;
      margin: 0 0 30px 2%;
    }
  }
  textarea {
    width: 100%;
    resize: none;
  }
  .text-red {
    color: red;
  }
  .border-bot {
    border-bottom: 1px solid #dcdfe6;
  }
}
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;

    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }

    .btns {
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
    }

    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}

/deep/input::-webkit-input-placeholder {
  color: red;
}
/deep/input::-moz-input-placeholder {
  color: red;
}
/deep/input::-ms-input-placeholder {
  color: red;
}
/deep/ .dialogImport {
  .el-dialog {
    width: 20% !important;
  }
}
.useSealWaytip .el-form-item__label {
  color: #f56c6c !important;
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
.qianF {
  overflow: hidden;
  .p1 {
    float: left;
    margin-left: 8px;
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

.guoCh {
  overflow: hidden;
}
.guoCh .guoCh1 {
  float: left;
  margin-left: 8px;
  margin-top: 10px;
  width: 100%;
}
.guoCh .guoCh2 {
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

.tablePrint {
  width: 900px;
  margin: 0 auto;
  background-color: white;
  z-index: -999;
  position: fixed;
}
.printTableList {
  width: 94%;
  margin: 0 auto;

  tr {
    height: 32px;
    td {
      width: 12%;
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
  border: solid #000 1px;
  word-wrap: break-word;
  word-break: break-all;
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
  // display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }

  .br {
    word-wrap: break-word;
    word-break: break-all;
  }
}
.pos_r {
  position: relative;
}
.printButton {
  position: absolute !important;
  top: 1% !important;
  /*left: 3% !important;*/
  right: 1% !important;
}
.printButton1 {
  position: absolute !important;
  top: 1% !important;
  left: 10% !important;
  right: 1% !important;
}
.adviceInfo {
  line-height: 20px;
  font-size: 14px;
}
// /deep/.el-table td,
// .el-table th .is-leaf {
//   border-left: 1px solid #000 !important;
// }
// /deep/.is-center {
//   border-bottom: 1px solid #000 !important;
// }
</style>