<template>
  <!-- <div> -->
  <div style="background: white;margin: 0 auto;" class="conferDetail">
    <div class="headerClick">
      <!-- <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>会议主办单</span>
      </div>-->
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        v-show="buttonList[index].show"
        :key="index"
        size="mini"
        plain
      >{{item.name}}</el-button>
    </div>
    <div style="padding: 8px 70px;">
      <div class="shiwuTitle">{{unitName}}行长办公会议通知</div>
    </div>
    <div
      class="process_content"
      id="bank_dispach_content"
      style="width:95%;margin:0 auto;padding: 20px 16px;border: 1px solid #ccc;
    background: #fff;"
    >
      <el-form ref="elForm" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人" prop="draftUser">
              <el-input v-model="formData.draftUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话"
              prop="tel"
              :rules="[
            {required:true,message:'联系电话不能为空',trigger:'blur'},
            {validator:checkTel,trigger:'blur'}
            ]"
            >
              <el-input v-model="formData.tel" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期" prop="draftDate">
              <el-input v-model="formData.draftDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称" prop="title">
              <el-input v-model="formData.title" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="会议时间" prop="hyTimeStr">
              <el-date-picker
                v-model="formData.hyTimeStr"
                type="datetime"
                @input="datetimeChange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="会议时间" prop="hyDate">
              <el-date-picker
                v-model="formData.hyDate"
                type="date"
                @input="datetimeChange"
                disabled
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="10px" prop="timeDate">
              <el-time-picker
                v-model="formData.timeDate"
                format="HH:mm:ss"
                disabled
                value-format="HH:mm:ss"
                placeholder="选择时间"
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <!-- 选择会议地点 -->
          <el-col :span="12">
            <el-form-item label="会议地点" prop="hyAdress">
              <el-input v-model="formData.hyAdress" placeholder="请选择" disabled @focus="focusEvent" />
              <el-dialog title="会议室" :visible.sync="dialogMeeting">
                <hy-table
                  @select="handleSelectionChange"
                  @handleCurrentChange="hYplace"
                  @handleSizeChange="hYplace"
                  size="medium"
                  :isIndex="true"
                  :isHandle="true"
                  :tableData="gridDatadd"
                  :tableCols="gridDataddCols"
                  :pagination="paginationHys"
                  :isSelection="true"
                ></hy-table>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogMeeting = false">取 消</el-button>
                  <el-button type="primary" @click="getSelected()">确 定</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会议候场地点" prop="hyHcdd">
          <el-input v-model="formData.hyHcdd" disabled></el-input>
        </el-form-item>
        <el-form-item label="主持人" prop="zcName">
          <el-input class="left" v-model="formData.zcName" disabled style="width:91%"></el-input>
          <el-button class="right" @click="selectZcPerson" type="primary" disabled size="large">选择</el-button>
        </el-form-item>
        <!-- 出席 -->
        <el-form-item label="出席">
          <el-row :span="24" style="margin-bottom:20px">
            <el-col :span="2">
              <div class="tooltip">
                <span>行领导</span>
              </div>
            </el-col>
            <el-col :span="22">
              <div class="leaders" prop="cxLd">
                <el-input class="left" v-model="formData.cxLd" disabled style="width:90%"></el-input>
                <el-button
                  class="right"
                  @click="selectPerson('行领导')"
                  type="primary"
                  disabled
                  size="medium"
                >选择</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="2">
              <div class="tooltip">
                <span>高管</span>
              </div>
            </el-col>
            <el-col :span="22">
              <div class="leaders">
                <el-input class="left" v-model="formData.cxGg" disabled style="width:90%"></el-input>
                <el-button
                  class="right"
                  @click="selectPerson('高管')"
                  disabled
                  type="primary"
                  size="medium"
                >选择</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-row :span="24" style="margin-bottom:20px">
          <div style="float:right;">
            <el-button
              class="right"
              @click="addBank"
              type="primary"
              size="medium"
              disabled
              style="margin-left:10px"
            >添加</el-button>
            <el-button class="right" type="primary" disabled size="medium" @click="delBank">删除</el-button>
          </div>
        </el-row>
        <el-form-item label="缺席">
          <!-- 行领导 -->
          <div class="tooltip">
            <span>行领导</span>
            <div class="bankLeaders" v-for="(item,index) in bankList" :key="index">
              <el-row :span="24" style="margin-bottom:20px">
                <el-col :span="22">
                  <el-row :span="24" type="flex" justify="space-between">
                    <el-col :span="10">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="1">
                          <el-checkbox v-model="item.checked" disabled @change="clickMe(item)"></el-checkbox>
                        </el-col>
                        <el-col :span="2">
                          <div class="tooltip">
                            <span>领导</span>
                          </div>
                        </el-col>
                        <el-col :span="19">
                          <el-input v-model="item.ldName" disabled class="input-with-select">
                            <el-button
                              slot="append"
                              @click="selectHang('行领导',index)"
                              type="primary"
                              disabled
                            >选择</el-button>
                          </el-input>
                          <!-- <el-input v-model="leaders1" class="input-with-select" >
                          <el-button slot="append" @click="selectHang('行领导')" type="primary">选择</el-button>
                          </el-input>-->
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="13">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="3">
                          <div class="tooltip">
                            <span>缺席原因</span>
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <el-input
                            class="left"
                            disabled
                            v-model="item.LdqxReason"
                            style="width:100%"
                          ></el-input>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-row :span="24" style="margin-bottom:20px">
          <div style="float:right;">
            <el-button
              class="right"
              @click="addBanky"
              disabled
              type="primary"
              size="medium"
              style="margin-left:10px"
            >添加</el-button>
            <el-button class="right" type="primary" size="medium" disabled @click="delBanky">删除</el-button>
          </div>
        </el-row>

        <el-form-item>
          <!-- 高管 -->
          <div class="tooltip">
            <span>高管</span>
            <div class="bankLeaders" v-for="(item,index) in bankListed" :key="index">
              <el-row :span="24" style="margin-bottom:20px">
                <el-col :span="22">
                  <el-row :span="24" type="flex" justify="space-between">
                    <el-col :span="10">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="1">
                          <el-checkbox v-model="item.checked" disabled @change="clickHld(item)"></el-checkbox>
                          <!-- <el-cascader :options="options" :show-all-levels="false"></el-cascader> -->
                        </el-col>
                        <el-col :span="2">
                          <div class="tooltip">
                            <span>高管</span>
                          </div>
                        </el-col>
                        <el-col :span="19">
                          <el-input v-model="item.GgName" class="input-with-select">
                            <el-button
                              slot="append"
                              @click="selectHang('高管',index)"
                              type="primary"
                              disabled
                            >选择</el-button>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="13">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="3">
                          <div class="tooltip">
                            <span>缺席原因</span>
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <el-input
                            class="left"
                            disabled
                            v-model="item.GgqxReason"
                            style="width:100%"
                          ></el-input>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="right">
            <el-button type="primary" size="mini" plain @click="downFile_new">下载会议材料</el-button>
            <el-button type="primary" size="mini" plain disabled @click="create_new">新增议题</el-button>
            <el-button type="primary" size="mini" plain disabled @click="adviseUpMove">上移</el-button>
            <el-button type="primary" size="mini" plain disabled @click="adviseDownMove">下移</el-button>
            <el-button type="primary" size="mini" plain disabled @click="adviseDel">删除</el-button>
            <el-button type="primary" size="mini" plain @click="adviseProcess">查看参会部门流程</el-button>
            <el-button type="primary" size="mini" plain disabled @click="back">退回</el-button>
            <el-button type="primary" size="mini" plain @click="lookBack">查看退回情况</el-button>
          </div>
        </el-form-item>
        <!-- 会议内容 -->
        <el-form-item label="会议内容">
          <el-table
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :data="opinionFldData"
            :row-class-name="tableRowClassName"
            @row-click="onRowClick"
            @selection-change="setChange"
            @select="adviseSelect"
            ref="hynRmultipleTable"
            border
            style="width: 100%"
          >
            <!-- :data="bmTableData"
            @row-click="getDetails"
            @select="handleSelectionChange1"
            border
            ref="multipleTable"-->
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="orderNumInt" label="议题序号" width="100"></el-table-column>
            <el-table-column prop="ytMc" label="议题名称" width="150"></el-table-column>
            <el-table-column prop="deptName" label="主汇报部门" width="150"></el-table-column>
            <el-table-column prop="strZhbr" label="主汇报人" width="150"></el-table-column>
            <el-table-column label="会议材料">
              <template slot-scope="scope">
                <div class="comp_list">
                  <div
                    v-for="(item,index) in  scope.row.attchmentFileInfo"
                    :key="item.id"
                    class="comp_list"
                  >
                    <div v-if="scope.row.ytzFlag !== '0' && scope.row.ytzFlag !== '1'">
                      <span class="numName">{{index+1}}.</span>
                      <span class="name down">{{item.fileName}}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="strLxName" label="列席部门"></el-table-column>
            <el-table-column prop="isGzzd" label="是否为规章制度类议题" :formatter="formatIsGzzd" width="80"></el-table-column>
            <el-table-column
              prop="isLegal"
              label="是否已通过合规性检查"
              :formatter="formatIsLegal"
              width="80"
            ></el-table-column>
            <el-table-column prop="ytzFlag" label="议题状态" :formatter="formatIsTicked" width="100"></el-table-column>
          </el-table>
        </el-form-item>
        <!-- 报名信息 -->
        <el-form-item label="报名信息">
          <div style="height:40px">
            <div class="right">
              <el-button size="mini" type="primary" disabled @click="saveBm">保存</el-button>
              <el-button size="mini" type="primary" disabled @click="editBm">编辑</el-button>
              <el-button type="primary" size="mini" @click="qjdBm">生成请假单</el-button>
              <el-button size="mini" type="primary" @click="contactBm">生成联系单</el-button>
            </div>
          </div>
          <!-- <div> -->
          <el-row style="margin-bottom:15px">
            <el-col :span="1">
              <span class="dou">董事</span>
            </el-col>
            <el-col :span="23">
              <el-input v-model="formData.lxDs" disabled placeholder="请输入董事姓名" />
            </el-col>
          </el-row>
          <el-row style="margin-bottom:17px">
            <el-col :span="1">
              <span class="dou">监事</span>
            </el-col>
            <el-col :span="23">
              <el-input v-model="formData.lxJs" disabled placeholder="请输入监事姓名" />
            </el-col>
          </el-row>
          <!-- </div> -->
          <!-- 报名信息表格 -->
          <el-table
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :data="bmTableData"
            @select="handleSelectionChange1"
            border
            ref="multipleTable"
            style="width: 100%"
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column type="index" prop="ytOrderNum" label="序号" width="100"></el-table-column>
            <el-table-column prop="ytName" label="议题名称" width="130"></el-table-column>
            <el-table-column prop="lxDeptName" label="部门" width="130"></el-table-column>
            <el-table-column prop="chName" label="姓名" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.chName" placeholder="姓名" :disabled="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="isPersonInCharge" label="是否为本部门主要负责人" align="center">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.isPersonInCharge" size="mini">
                  <el-radio-button :disabled="scope.row.type" label="1">是</el-radio-button>
                  <el-radio-button :disabled="scope.row.type" label="2">否</el-radio-button>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="leaveReason" label="部门主要负责人请假理由">
              <template slot-scope="scope">
                <el-input v-model="scope.row.leaveReason" :disabled="scope.row.type"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="chCellPhone" label="手机号码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.chCellPhone" :disabled="scope.row.type"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <!-- 选择人员树-->
      <tree-person
        v-model="showOrgPer"
        :isSingle="isSingles"
        :humanType="humanType"
        :unitCode="unitCode"
        :unitClass="unitClass"
        @orgList="getperList"
        :selectDept="selectDept"
        :isNeedChild="isNeedChild"
      ></tree-person>
      <!-- 选择行领导树-->
      <sys-per
        v-model="dialogStateLD"
        :isSingle="isSingle"
        :humanType="humanType"
        :unitCode="unitCode"
        :unitClass="unitClass"
        :seletSelf="seletSelf"
        :selectDept="selectDeptLD"
        @orgList="showCompDialogLD"
      />
      <!-- 选择高管树-->
      <sys-per
        v-model="dialogStateGG"
        :isSingle="isSingle"
        :humanType="humanType"
        :unitCode="unitCode"
        :unitClass="unitClass"
        :seletSelf="seletSelf"
        :selectDept="selectDeptGG"
        @orgList="showCompDialogGG"
      />
      <!-- 选择缺席领导树-->
      <sys-per
        v-model="dialogState3"
        :isSingle="isSingles"
        :humanType="humanType"
        :unitCode="unitCode"
        :unitClass="unitClass"
        :seletSelf="seletSelf"
        :selectDept="selectDeptQxLd"
        @orgList="showCompDialogQxLd"
      />
      <!-- 选择缺席高管树-->
      <sys-per
        v-model="dialogState4"
        :isSingle="isSingles"
        :humanType="humanType"
        :unitCode="unitCode"
        :unitClass="unitClass"
        :seletSelf="seletSelf"
        :selectDept="selectDeptQxGG"
        @orgList="showCompDialogQxGG"
      />
      <!-- 选择议题表格 -->
      <el-dialog title="选择议题" :visible.sync="selectYitiVisible">
        <div style="margin: 15px 0">
          <el-row :span="24" type="flex" justify="space-between">
            <!-- 按日期 -->
            <el-col :span="10">
              <el-date-picker
                v-model="formData.yTvalue"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="timeChange"
              ></el-date-picker>
              <!-- {{yTvalue}} -->
            </el-col>
            <!-- 按主汇报部门 -->
            <el-col :span="10" style="padding-left:15px">
              <el-select v-model="formData.deptName" placeholder="请选择" @change="deptNameChange">
                <el-option
                  v-for="item in mainOptions"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>

        <!-- @refresh="loadData()" -->
        <m-table
          @refresh="load()"
          @select="chooseYt"
          size="medium"
          :isIndex="true"
          :isHandle="false"
          @cell-click="getDetails"
          :tableData="choosetableData"
          :tableCols="choosetableCols"
          :pagination="pagination"
          :isSelection="true"
          :searchData="searchData"
        ></m-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectYitiVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看参会部门流程 -->
      <el-dialog title="查看参会部门流程" :visible.sync="showFlowChart">
        <m-table
          size="medium"
          :tableData="chooseSerData"
          :tableCols="chooseSerCol"
          :isPagination="false"
          :sortable="false"
          :isIndex="true"
          :isHandle="false"
        ></m-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showFlowChart = false">取 消</el-button>
          <el-button type="primary" @click="showFlowChart = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看退回情况 -->
      <el-dialog title="退回情况" :visible.sync="seeselectVisible">
        <m-table
          size="medium"
          :tableData="seetableData"
          :tableCols="seetableSreCol"
          :isPagination="false"
          :sortable="false"
        ></m-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectVisible = false">取 消</el-button>
          <el-button type="primary" @click="seecloSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 发送预通知对话框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible">
        <el-form :model="preForm" :rules="ruleForm1">
          <el-form-item label="发送对象" :label-width="formLabelWidth" prop="isMainReport">
            <el-radio v-model="preForm.isMainReport" label="1">议题报送人</el-radio>
            <el-radio v-model="preForm.isMainReport" label="0">部门综合</el-radio>
          </el-form-item>
          <el-form-item label="反馈截止时间" :label-width="formLabelWidth" prop="deadLine">
            <el-date-picker v-model="preForm.deadLine" type="datetime" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendPre">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 发送报名通知对话框 -->
      <el-dialog title="提示" :visible.sync="dialogVisibleBm">
        <el-form :model="preFormBm" :rules="ruleFormBm">
          <el-form-item label="反馈截止时间" :label-width="formLabelWidth" prop="deadLineBm">
            <el-date-picker v-model="preFormBm.deadLineBm" type="datetime" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleBm = false">取 消</el-button>
          <el-button type="primary" @click="sendPreBm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 退回预通知弹框 -->
      <el-dialog title="提示" :visible.sync="dialogVisibleBack">
        <el-form :model="preFormOne" :rules="ruleForm2">
          <el-form-item label="审核意见" :label-width="formLabelWidth" prop="fldShyj">
            <el-input v-model="preFormOne.fldShyj">议题报送人</el-input>
          </el-form-item>
          <el-form-item label="反馈截止时间" :label-width="formLabelWidth" prop="ThdeadLine">
            <el-date-picker v-model="preFormOne.ThdeadLine" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleBack = false">取 消</el-button>
          <el-button type="primary" @click="backYt">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="dialogVisibleBaYT" width="30%">
        <el-row :span="24" type="flex" justify="space-between">
          <!-- 按日期 -->
          <el-col :span="10">
            <span class="text_yt">请您先保存，再进行新增议题</span>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleBaYT = false">取 消</el-button>
          <el-button type="primary" @click="backButton()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 下载会议材料 -->
      <el-dialog title="上会材料" :visible.sync="dialogVisibleFile" width="40%">
        <div class="comp_list">
          <template>
            <div class="command_file">
              <el-col>
                <div class="tree_w">
                  <div v-for="(item,index) in  attchmentFile" :key="item.id" class="comp_list">
                    <template>
                      <div class="command_file">
                        <span class="numName">{{index+1}}.</span>
                        <span
                          class="name down"
                          @click="viewFile(item,null,item.fileName)"
                        >{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                        <div class="btns">
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
                </div>
              </el-col>
            </div>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleFile = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleFile = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>

    <!--打印table-->
    <el-table :data="bmTableData" :tableCols="tableCols" v-show="false" id="tableforPrint">
      <el-table-column
        v-for="item in tableCols"
        :key="item.id"
        :prop="item.prop"
        :fixed="item.fixed"
        show-overflow-tooltip
        :label="item.label"
        :width="item.width"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
import hyTable from "@/components/table/mTable";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import mTable from "@/components/table/tTable";
import selectPerson from "components/tree/treeTansun";
import sysPer from "components/tree/sysPer.vue";
import orgTree from "components/tree/orgTree";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import minixs from "@/minixs/index";
import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
import exportTable from "@/minixs/exportTable";
import treePerson from "components/tree/sysTreePerson";
export default {
  name: "conferDetail",
  components: {
    hyTable, //会议室列表
    shiwuFlow, //查看流程组件
    selectPerson,
    mTable,
    orgTree,
    uploadFileTs,
    upfileList,
    sysPer,
    treePerson
  },
  mixins: [minixs, openOrDownLoadFile],
  props: {},
  data() {
    return {
      showOrgPer: false,
      isSingles: true,
      isNeedChild: "yes",
      isSingle: true,
      humanType: 3,
      selectDept: [],
      seletSelf: 1,
      offenUse: false,
      unitCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
      unitClass: 0,
      selectDeptLD: [],
      selectDeptGG: [],
      selectDeptQxLd: [],
      selectDeptQxGG: [],
      depart: "", //金格状态
      newData: {}, //会议内容
      newQjData: {},
      newLxData: {},
      //单位名称
      unitName: JSON.parse(localStorage.userInfo).unitName,
      jingearr: [],
      jingearr1: [],
      dialogVisibleFile: false,
      attchmentFile: [], //下载会议材料内容
      meetingTime: "",
      objKow: {
        contant: "",
        meetingName: "",
        meetingTime: "",
        meetingPlace: "",
        hostPerson: "",
        attendHangLingDao: "",
        attendHangGaoGuan: "",
        absentHangLingDaoReason: "",
        absentHangGaoGuanReason: "",
        director: "",
        supervisor: ""
      },
      pubMait1: {
        meetingName: "",
        ytName: "",
        canhuibumen: "",
        canhuiperson: "",
        tel: ""
      },
      pubMait: {
        meetingName: "",
        leaveReason: ""
      },
      npmYt: {},
      ifView: Number, //打开正文时的状态值
      startTime: "",
      endTime: "",
      orderInfo: [],
      yTvalue: [],
      opinionData: [],
      currentTableOrg: {},
      id: "", //主办单id
      //正文模板附件
      uploadConfig: {
        formId: "msgz",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      title: "选择部门",
      shiwuState: "viewFile",
      showFlowChart: false,
      showFlowChartOne: false,
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      leaders: "",
      ldId: "",
      LDid: "", //领导ID
      GGid: "", //高管ID
      mange: "",
      GgName: "",
      ldName: "",
      GgqxReason: "",
      LdqxReason: "",
      bankList: [],
      LDbankList: "",
      bankListed: [],
      GGbankListed: "",
      isQc: false,
      checked: true,
      editArray: [],
      lxJs: "",
      lxDs: "",
      isPersonInCharge: "1",
      bmTableData: [],
      BmDataAry: "",
      label: "1",
      fileIdfier: [], //附件标示符数组
      fileIdStr: "",
      preForm: {
        deadLine: "",
        isMainReport: ""
      },
      preFormBm: {
        deadLineBm: ""
      },
      preFormOne: {
        ThdeadLine: "",
        fldShyj: ""
      },
      formLabelWidth: "220px",
      dialogVisible: false,
      dialogVisibleBm: false,
      dialogVisibleBack: false,
      dialogVisibleBaYT: false,
      selectVisible: false,
      seeselectVisible: false,
      searchData: {
        sort: "desc",
        sortKey: "sbSj" //按上报时间倒序
      },
      mainOptions: [],
      options: [],
      value: "",
      ytzFlag: "0",
      isSubmit: "0",
      workFlowId: "", //查看参会流程ID
      gridDataddCols: [
        // { label: "会议室名称", prop: "roomName" },
        // { label: "会议地点", prop: "address" },
        // { label: "最大容纳人数", prop: "maxRong" },
        // {
        //   prop: "orderStatu",
        //   label: "状态",
        //   align: "center"
        // },
        // { label: "管理员", prop: "roomAdmin" },
        // { label: "管理员电话", prop: "roomPhone" }
        { label: "会议室名称", prop: "roomName" },
        { label: "会议室设备", prop: "serviceList" },
        { label: "座位数", prop: "maxRong" },
        {
          prop: "orderStatu",
          label: "状态",
          align: "center"
        },
        { label: "会议室联系人", prop: "roomAdmin" },
        { label: "联系人电话", prop: "roomPhone" }
      ],
      meettableCols: [
        { label: "议题序号", prop: "orderNum" },
        { label: "议题名称", prop: "ytMc" },
        { label: "主汇报部门", prop: "deptName" },
        { label: "主汇报人", prop: "strZhbr" },
        { label: "议题文件", prop: "attach" },
        { label: "列席部门", prop: "strLxName" },
        { label: "是否为规章制度类议题", prop: "isGzzd" },
        { label: "是否已通过合规性检查", prop: "isLegal" },
        { label: "是否已发送过预通知", prop: "isTicked" }
      ],
      choosetableCols: [
        // { label: "序号", prop: "rowNumber" },
        { label: "主汇报部门", prop: "deptName" },
        { label: "上报时间", prop: "sbSj" },
        { label: "议题名称", prop: "ytMc" },
        { label: "联系人", prop: "curuserChinaName" },
        { label: "联系电话", prop: "tel" }
      ],
      choosetableSreCol: [
        { label: "序号", prop: "rowNumber" },
        { label: "汇报部门", prop: "deptName" },
        { label: "操作时间", prop: "deptName" },
        { label: "处理人", prop: "sbSj" },
        { label: "处理记录", prop: "ytMc" }
      ],
      choosetableSearchCol: [
        { label: "序号", prop: "rowNumber" },
        { label: "汇报部门", prop: "deptName" },
        { label: "操作时间", prop: "deptName" },
        { label: "处理人", prop: "sbSj" },
        { label: "处理记录", prop: "ytMc" }
      ],
      seetableSreCol: [
        { label: "序号", prop: "orderNum" },
        { label: "议题名称", prop: "fldYtmc" },
        { label: "审核意见", prop: "fldShyj" },
        { label: "退回时间", prop: "backTime" }
      ],
      chooseSerCol: [
        { label: "议题名称", prop: "ytMc" },
        { label: "当前处理人", prop: "EXCNM" },
        { label: "当前环节", prop: "NODE" },
        { label: "操作时间", prop: "TM" }
      ],
      isBorder: false,
      tableCols: [
        { label: "议题名称", prop: "ytName", child: [] },
        { label: "部门", prop: "lxDeptName", child: [] },
        { label: "姓名", prop: "chName", child: [] },
        { label: "手机号码", prop: "chCellPhone", child: [] }
      ],
      choosetableData: [
        // {deptName:'1',sbSj:'3',ytMc:'4',cur/userChinaName:'5',tel:'6'}
      ],
      seetableData: [],
      chooseSerData: [],
      chooseSearchData: [],
      selectYitiVisible: false,
      adviseIdx: "", //单击数据行获取到的索引
      opinionFldData: [
        // {ytMc:'议题名称a',deptName:'主汇报部门a',strZhbr:'主汇报人a',strLxName:''}
      ],
      opinObj: "", //金格议题
      deleteArry: "",
      leader: "",
      manage: "",
      treeData: [],
      treeDataLD: [],
      treeDataGG: [],
      defaultProps: {
        children: "children",
        label: "unitShort"
      },
      treeDataOne: [],
      treeDataTwo: [],
      treeDataThree: [],
      treeDataFour: [],
      seletOptionsData: [],
      seletOptionsDataLD: [],
      seletOptionsDataGG: [],
      seletOptionsData1: [],
      seletOptionsData2: [],
      seletOptionsData3: [],
      seletOptionsData4: [],
      offenUse: false,
      offenUse1: false,
      offenUse2: false,
      offenUse3: false,
      offenUse4: false,
      checkIds: [], //选中id列表
      checkIdsLD: [],
      checkIdsGG: [],
      checkData: [], //选中数据
      tempArrZc: [],
      checkDataLD: [], //选中数据
      tempArrLD: [],
      checkDataGG: [], //选中数据
      tempArrGG: [],
      checkIds1: [], //选中id列表
      checkData1: [], //选中数据
      checkIds2: [], //选中id列表
      checkData2: [], //选中数据
      checkIds3: [], //选中id列表
      checkData3: [], //选中数据
      checkIds4: [], //选中id列表
      checkData4: [], //选中数据
      singelCheckF: false, // 单选true 多选为false
      singelCheckFLD: false,
      singelCheckFGG: false,
      dialogState: false, // 默认隐藏选择人员树结构
      dialogStateLD: false,
      dialogStateGG: false,
      dialogType: "",
      dialogTypeNow: "",
      singelCheckF1: false, // 单选true 多选为false
      dialogState3: false, // 默认隐藏选择人员树结构
      dialogState4: false, // 默认隐藏选择人员树结构
      dialogType1: "",
      dialogType3: "",
      dialogType4: "",
      dialogTypeNow1: "",
      dialogTypeNow3: "",
      dialogTypeNow4: "",
      singelCheckF2: false, // 单选true 多选为false
      singelCheckF3: false, // 单选true 多选为false
      singelCheckF4: false, // 单选true 多选为false
      dialogState2: false, // 默认隐藏选择人员树结构
      dialogType2: "",
      dialogTypeNow2: "",
      inputValue: "",
      delArr: [], //删除行领导数据
      delHldArr: [], //删除高管数据
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      paginationHys: {
        limit: 20,
        page: 1,
        total: 1
      },
      value1: "",
      hyAdress: "",
      gridDatadd: [], //会议室
      dialogMeeting: false,
      dialogFormVisible: false,
      tableData: [],
      search: "",
      firstData: {},
      option1: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      buttonList: [
        { name: "关闭", type: "guanbi", show: true },
        // { name: "保存", type: "baocun", show: true },
        // { name: "发送预通知", type: "fasongyutongzhi", show: true },
        // { name: "收回预通知", type: "shouhuiyutongzhi", show: true },
        // { name: "发送报名通知", type: "fasongbaomingtongzhi", show: true },
        // { name: "收回报名通知", type: "shouhuibaomingtongzhi", show: true },
        // { name: "发送正式通知", type: "fasongzhengshitongzhi", show: true },
        // { name: "收回正式通知", type: "shouhuizhengshitongzhi", show: true },
        { name: "生成会议单", type: "shengchenghuiyidan", show: true },
        // { name: "删除此文", type: "shanchuciwen", show: true },
        { name: "打印处理单", type: "dayinchulidan", show: true },
        { name: "操作指南", type: "caozuozhinan", show: true }
      ],
      formData: {
        currentNode: "起草",
        draftDate: formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss"),
        type: "",
        hyAdress: "",
        id: "",
        attchmentFileInfo: [] //浏览的所有文件数组
        // attachid: "" //储存附件id
      },
      attchmentFileInfo: [], //浏览的所有文件数组
      rowData: {},
      idnew: "", //更新初次id
      jbNm: "",
      sendArry: [],
      arrInfoNum: [],
      addArry: [],
      indexObj: [],
      indexObj1: [],
      multipleSelection: [],
      hyType: "", //会议室状态
      multipleSelection1: [],
      multipleSelection2: [],
      hystartTime: "",
      hyendTime: "",
      hyendTimestr: "",
      rules: {
        tel: [
          {
            // pattern: /^1[3456789]\d{9}$/,
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          }
        ],
        title: [{ required: true, message: "请输入会议名称", trigger: "blur" }],
        hyDate: [
          { required: true, message: "请填写会议日期", trigger: "blur" }
        ],
        timeDate: [
          { required: true, message: "请填写会议时间", trigger: "blur" }
        ],
        hyAdress: [
          { required: true, message: "请选择会议地点", trigger: "change" }
        ]
      },
      ruleForm1: {
        isMainReport: [
          { required: true, message: "请选择发送对象", trigger: "change" }
        ],
        deadLine: [
          { required: true, message: "请选择反馈截止时间", trigger: "change" }
        ]
      },
      ruleFormBm: {
        deadLineBm: [
          { required: true, message: "请选择反馈截止时间", trigger: "change" }
        ]
      },
      ruleForm2: {
        fldShyj: [
          { required: true, message: "请填写审核意见", trigger: "blur" }
        ],
        ThdeadLine: [
          { required: true, message: "请选择反馈截止时间", trigger: "change" }
        ]
      },
      onlyId: ""
    };
  },
  computed: {},
  methods: {
    //联系电话校验
    checkTel(rule, value, callback) {
      if (value) {
        if (/[\u4e00-\u9fa5]/g.test(value)) {
          callback(new Error("联系电话不能输入汉字！"));
        } else {
          callback();
        }
      }
      callback();
    },
    // 数据转换
    formatIsGzzd(row) {
      return row.isGzzd === "0" ? "否" : row.isGzzd === "1" ? "是" : "";
    },
    formatIsLegal(row) {
      return row.isLegal === "0" ? "否" : row.isLegal === "1" ? "是" : "";
    },
    formatIsTicked(row) {
      return row.ytzFlag === "0"
        ? "未发送预通知"
        : row.ytzFlag === "1"
        ? "已发送预通知"
        : row.ytzFlag === "2"
        ? "预通知已反馈"
        : row.ytzFlag === "3"
        ? "已发送报名通知"
        : row.ytzFlag === "4"
        ? "报名通知已反馈"
        : row.ytzFlag === "5"
        ? "已发送正式通知"
        : row.ytzFlag === "6"
        ? "预通知已退回"
        : row.ytzFlag === "7"
        ? "已收回报名通知"
        : row.ytzFlag === "8"
        ? "已收回正式通知"
        : "";
    },
    datetimeChange(e) {
      // this.formData.hyTimeStr = e;
      // console.log(this.formData.hyTimeStr.indexOf(" "));
      // this.hystartTime = this.formData.hyTimeStr.substring(
      //   0,
      //   this.formData.hyTimeStr.indexOf(" ")
      // );
      // this.hyendTime = this.formData.hyTimeStr.substring(
      //   this.formData.hyTimeStr.indexOf(" "),
      //   this.formData.hyTimeStr.lastIndexOf(":")
      // );
      // this.hyendTimestr = this.hyendTime.trim();
      // console.log(this.hystartTime, "999999999", this.hyendTimestr);
      // this.$forceUpdate();
    },
    // dateThChange(e) {
    //   this.preFormOne.ThdeadLine = e;
    //   console.log(this.preFormOne.ThdeadLine);
    //   // this.$forceUpdate();
    // },
    focusEvent() {
      if (!this.formData.hyDate || !this.formData.timeDate) {
        this.$message({
          type: "warning",
          message: "请先选择会议时间"
        });
      } else {
        this.dialogMeeting = true;
        this.hYplace();
      }
    },
    hYplace() {
      // this.hystartTime = this.formData.hyDate;
      // this.hyendTimestr = this.formData.timeDate;
      // console.log(this.hystartTime, this.hyendTimestr);
      let curNum = 1;
      this.$post
        .postData(
          "hysTy",
          JSON.stringify({
            operationType: "4",
            roomType: "",
            roomName: "",
            function: "hysTy",
            currentPageNum: curNum,
            meetUseDate: this.formData.hyDate.trim(),
            meetStartTime: this.formData.timeDate.trim(),
            meetEndTime: "",
            ...this.paginationHys
          }),
          "A0846C088"
        )
        .then(res => {
          if (res && res.success) {
            this.gridDatadd = res.data.rows;
            console.log(this.gridDatadd, "gridDatadd");
            this.paginationHys.total = res.data.totalCount;
          }

          //  else {
          //   this.$message.error(res.data.message);
          // }
        });
    },
    // 预定会议室
    getMeeting() {
      // this.hystartTime = this.formData.hyTimeStr.substring(
      //   0,
      //   this.formData.hyTimeStr.indexOf(" ")
      // );
      // this.hyendTime = this.formData.hyTimeStr.substring(
      //   this.formData.hyTimeStr.indexOf(" "),
      //   this.formData.hyTimeStr.lastIndexOf(":")
      // );
      // this.hyendTimestr = this.hyendTime.trim();
      // this.hystartTime = this.formData.hyDate;
      // this.hyendTimestr = this.formData.timeDate;
      // console.log(this.hystartTime, this.hyendTimestr);

      let attendNums =
        this.formData.zcName +
        "," +
        this.formData.cxLd +
        "," +
        this.formData.cxGg +
        "," +
        this.formData.lxDs +
        "," +
        this.formData.lxJs;
      let attendlist = [];
      attendlist.push(attendNums.split(","));
      let attLength = attendlist[0].length;
      console.log(attendNums, attLength, "00000000000000");
      this.$post
        .postData(
          "createOrder",
          JSON.stringify({
            function: "createOrder",
            roomId: this.formData.roomId,
            meetUseDate: this.formData.hyDate.trim(),
            meetType: "一般会议",
            meetStartTime: this.formData.timeDate.trim(),
            meetEndTime: "",
            meetingName: this.formData.title,
            roomName: this.formData.hyAdress,
            hostDepartment: this.formData.draftDepartment,
            attendNums: attLength,
            hostName: this.formData.zcName,
            orderUserName: this.formData.draftUser,
            orderUserPhon: this.formData.tel,
            isSecrete: "1",
            needServices: this.formData.needServices,
            attendUsers: this.formData.cxLd,
            conferenceContent: "",
            auditComment: "",
            cancelReason: "因行长办公会议召开,会议室预定取消"
          }),
          "A0846C088"
        )
        .then(res => {});
    },
    lookBack() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;

      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else if (ytLength > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条数据"
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meetings
          .seeReturn({ ytIds: ytIds, tzId: this.id })
          .then(res => {
            this.seetableData = res.data;
            res.data &&
              res.data.map(item => {
                item.backTime = formatData(
                  item.backTime,
                  "YYYY-MM-DD HH:mm:ss"
                );
              });
          });
        this.seeselectVisible = true;
      }
    },

    // 会议内容
    onExchangeChange(index) {
      let tmpObj = this.opinionFldData[index];
      this.$set(this.opinionFldData, index, tmpObj);
    },
    change(index) {
      let tmpObj = this.opinionFldData[index];
      this.$set(this.opinionFldData, index, tmpObj);
    },
    handleEdit(index, row) {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.onlyId = row.id;
      this.orgOrDeptId = "1";
      this.showOrgTree = true;
    },
    // / 选择机构按钮方法
    getOrgList(org) {
      var opinionFldData = this.opinionFldData;
      for (let i = 0; i < opinionFldData.length; i++) {
        if (opinionFldData[i].id == this.onlyId) {
          opinionFldData[i].strLxName = org.unitName;
          opinionFldData[i].strLxId = org.id;
        }
      }
      this.$set(this, "opinionFldData", opinionFldData);
    },
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id,
          fileId: this.formData.attachid,
          fileType: "0"
        })
        .then(res => {});
    },
    getFileList() {
      this.orderInfo.forEach((item, index) => {
        this.$api.setSysConfig.getTextemList({ id: item.id }).then(res => {
          this.$nextTick(() => {
            console.log(res.data, "res.data");
            this.attchmentFileInfo = res.data;
            this.opinionFldData.forEach((item, index) => {
              if (this.attchmentFileInfo.length > 0) {
                if (item.id == this.attchmentFileInfo[0].dataId) {
                  item.attchmentFileInfo = this.attchmentFileInfo;
                }
              }
            });
            this.$forceUpdate();
          });
        });
      });
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n - 1
      ];
      this.formData.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },

    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n + 1
      ];
      this.formData.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    deleteRow(n, id) {
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
                this.formData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
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
    downFile_new() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "请选择一条议题"
        });
      } else if (ytLength > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条议题"
        });
      } else {
        this.$confirm(
          "所收藏文件属于建设银行内部信息，您有责任妥善保存，未经允许不得外传!",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(res => {
          let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
          console.log(ytIds);
          // attchmentFile
          this.dialogVisibleFile = true;
          this.$api.setSysConfig.getTextemList({ id: ytIds }).then(res => {
            this.$nextTick(() => {
              this.attchmentFile = res.data;
              this.$forceUpdate();
            });
          });
        });
      }
    },
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
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "保存":
          this.save_btn();
          break;
        case "发送预通知":
          this.send_btn();
          break;
        case "收回预通知":
          this.back_btn();
          break;
        case "发送报名通知":
          this.sendBm_btn();
          break;
        case "收回报名通知":
          this.backBm_btn();
          break;
        case "发送正式通知":
          this.sendZsBm_btn();
          break;
        case "收回正式通知":
          this.backZs_btn();
          break;
        case "生成会议单":
          this.send();
          break;
        case "删除此文":
          this.del_btn();
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
        case "打印处理单":
          this.print_btn();
          break;
      }
    },
    addBank(index) {
      this.bankList.push({ ldName: "", LdqxReason: "", checked: false });
    },
    addBanky(index) {
      this.bankListed.push({ GgName: "", GgqxReason: "", checked: false });
    },
    clickMe(e, checked, item) {
      if (e.checked) {
        this.delArr.push(e);
      }
    },
    clickHld(e, checked, item) {
      if (e.checked) {
        this.delHldArr.push(e);
      }
    },
    delBank() {
      if (this.delArr.length > 0) {
        let delArray = JSON.parse(JSON.stringify(this.bankList));
        let swichKey = false;
        let delID = []; //存放删除数据的ID
        let flag = false;
        this.$confirm("是否删除该条数据?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          for (let i = 0; i < delArray.length; i++) {
            if (delArray[i].checked) {
              if (delArray[i].LDid) {
                delID.push(delArray[i].LDid);
                swichKey = true;
                this.$api.secreatary.meetings
                  .removeAbsence({ id: delID.join(",") })
                  .then(() => {
                    this.$message({
                      type: "success ",
                      message: "删除成功!"
                    });
                    this.attendanced();
                    this.bankList = delArray;
                  });
              } else {
                delArray.splice(i, 1);
                i--;
                swichKey = false;
              }
            }
          }
          this.bankList = delArray;
          if ((swichKey = true)) {
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请先选择需要删除的内容"
        });
      }
    },
    delBanky() {
      if (this.delHldArr.length > 0) {
        let delArry = JSON.parse(JSON.stringify(this.bankListed));
        let swichKey = false;
        let delID = []; //存放删除数据的ID
        let flag = false;
        this.$confirm("是否删除该条数据?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          for (let i = 0; i < delArry.length; i++) {
            if (delArry[i].checked) {
              if (delArry[i].GGid) {
                delID.push(delArry[i].GGid);
                swichKey = true;
                this.$api.secreatary.meetings
                  .removeAbsence({ id: delID.join(",") })
                  .then(() => {
                    this.$message({
                      type: "success ",
                      message: "删除成功!"
                    });
                    this.Ggattendanced();
                    this.bankListed = delArry;
                    this.$forceUpdate();
                  });
              } else {
                delArry.splice(i, 1);
                i--;
                swichKey = false;
              }
            }
          }
          this.bankListed = delArry;
          if ((swichKey = true)) {
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请先选择需要删除的内容"
        });
      }
      // if (this.delHldArr.length > 0) {
      //   let delArry = JSON.parse(JSON.stringify(this.bankListed));
      //   // console.log(delArray);
      //   let swichKey = false;
      //   let delID = []; //存放删除数据的ID
      //   let flag = false;
      //   for (let i = 0; i < delArry.length; i++) {
      //     if (delArry[i].checked) {
      //       if (delArry[i].LDid) {
      //         delID.push(delArry[i].LDid);
      //         console.log(delID);
      //         swichKey = true;
      //       } else {
      //         delArray.splice(i, 1);
      //         i--;
      //         swichKey = false;
      //       }
      //     }
      //   }
      //   this.bankListed = delArry;
      //   if ((swichKey = true)) {
      //     this.$api.secreatary.meetings
      //       .removeAbsence({ id: delID.join(",") })
      //       .then(() => {
      //         this.$confirm("是否删除该条数据?", {
      //           confirmButtonText: "确定",
      //           cancelButtonText: "取消",
      //           type: "warning"
      //         }).then(() => {
      //           this.$message({
      //             type: "success ",
      //             message: "删除成功!"
      //           });
      //           this.attendanced();
      //           this.bankListed = delArry;
      //           this.$forceUpdate();
      //         });
      //       });
      //   }
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: "请先选择需要删除的内容"
      //   });
      // }
      // if (this.delArray.length > 0) {
      // let delArry = JSON.parse(JSON.stringify(this.bankListed));
      // console.log(delArry);
      // let swichKey = false;
      // let delID = []; //存放删除数据的ID
      // for (let i = 0; i < delArry.length; i++) {
      //   if (delArry[i].checked) {
      //     if (delArry[i].LDid) {
      //       delID.push(delArry[i].LDid);
      //       console.log(delID);
      //       swichKey = true;
      //     } else {
      //       delArry.splice(i, 1);
      //       i--;
      //       swichKey = false;
      //     }
      //   }
      // }
      // this.bankListed = delArry;
      // if ((swichKey = true)) {
      //   this.$api.secreatary.meetings
      //     .removeAbsence({ id: delID.join(",") })
      //     .then(() => {
      //       this.$confirm("是否删除该条数据?", {
      //         confirmButtonText: "确定",
      //         cancelButtonText: "取消",
      //         type: "warning"
      //       }).then(() => {
      //         this.$message({
      //           type: "success ",
      //           message: "删除成功!"
      //         });
      //         this.attendanced();
      //         this.bankListed = delArry;
      //         this.$forceUpdate();
      //       });
      //     });
      // }
      // }else{
      //   this.$message({
      //     type: "warning",
      //     message: "请先选择需要删除的内容"
      //   });
      // }
    },
    // 发送报名通知
    sendBm_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else {
        if (!this.id) {
          this.$api.secreatary.meetings
            .saveMain({ ...this.formData })
            .then(res => {
              this.id = res.data.id;
              sessionStorage.setItem("zbId", res.data.id);
              // this.createFile();
              this.attendanced();
              this.Ggattendanced();
            });
        } else {
          this.$api.secreatary.meetings
            .saveMain({ ...this.formData, id: this.id })
            .then(res => {
              // this.createFile();
            });
        }
        this.dialogVisibleBm = true;
      }
    },
    // 收回报名通知
    backBm_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meetings
          .backBmNotice({ id: this.id, ytIds: this.sendArry })
          .then(res => {
            this.$api.secreatary.meetings
              .hyTable(
                {
                  tzId: this.id
                },
                {
                  PAGE_JUMP: this.pagination.pageNum,
                  REC_IN_PAGE: this.pagination.pageSize
                }
              )
              .then(res => {
                this.opinionFldData = res.data;
                this.getFileList();
              });
            this.$message({
              type: "success",
              message: "收回成功"
            });
          });
      }
    },
    // 发送正式通知
    sendZsBm_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meetings
          .sendZsNotice({ id: this.id, ytIds: this.sendArry })
          .then(res => {
            // var mesg = res.msg.trim();
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.getHyTable();
          })
          .catch(res => {
            // var mesg = res.msg.trim();
            this.$message({
              message: res.msg,
              type: "warning"
            });
          });
      }
    },
    // 收回正式通知
    backZs_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else {
        let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
        this.$api.secreatary.meetings
          .backZsNotice({ id: this.id, ytIds: this.sendArry })
          .then(res => {
            this.$api.secreatary.meetings
              .hyTable(
                {
                  tzId: this.id
                },
                {
                  PAGE_JUMP: this.pagination.pageNum,
                  REC_IN_PAGE: this.pagination.pageSize
                }
              )
              .then(res => {
                this.opinionFldData = res.data;
                this.getFileList();
              });
            this.$message({
              type: "success",
              message: "收回成功"
            });
          });
      }
    },
    // 保存报名通知
    saveBm() {
      let ytLength = this.$refs.multipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else if (ytLength > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条数据"
        });
      } else {
        this.$api.secreatary.meetings
          .updateBm(this.multipleSelection1)
          .then(res => {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.bmTable();
            this.multipleSelection1.type = true;
          });
      }
    },
    // handleSelectionChange2(rows, row){
    //  let dataArry = [];
    //   row.map(function (value, index) {
    //     dataArry.push(value.id);
    //   });
    //   this.addArry = dataArry.join(",");
    //   console.log('---------------------------------chooseYt', this.addArry);
    //    this.$refs.hynRmultipleTable.clearSelection();
    //   this.$refs.hynRmultipleTable.toggleRowSelection(row);
    //   this.multipleSelection2 = row;
    //   console.log( ' this.multipleSelection2',this.multipleSelection2);
    // },

    handleSelectionChange1(rows, row) {
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(row);
      this.multipleSelection1 = row;
      console.log(this.multipleSelection1);
      this.bmTableData.forEach(item => {
        item.type = true;
      });
    },
    getDetails(row) {
      console.log("getDetails", row); //此时就能拿到整行的信息
    },
    // 编辑报名信息
    editBm() {
      let id = this.multipleSelection1.id;
      console.log("ytIds", id);
      let ytLength = this.$refs.multipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else if (ytLength > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条数据"
        });
      } else {
        this.bmTableData.forEach(item => {
          // 当前选中的id
          if (item.id == id) {
            item.type = false;
          } else {
            item.type = true;
          }
        });
      }
    },
    // 请假单模板：qjAttach;
    // 请假单名称：qjAttachTitle;
    //生成请假单
    qjdBm() {
      // console.log(this.bmTableData);
      this.pubMait.meetingName = this.formData.title ? this.formData.title : "";
      this.pubMait.leaveReason = this.newQjData.context.join("");
      // this.pubMait.leave = this.BmDataAry ? this.BmDataAry : "";
      console.log(this.pubMait);
      for (var item in this.pubMait) {
        console.log(item, "书签名");
        console.log(this.pubMait[item], "每一项的值");
      }
      this.ifView = 1;
      this.shiwuState = "viewFile";
      this.formData.id = this.id;
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = this.formData.qjAttachTitle;
      bank_doDownloadFile.filePath = this.formData.qjAttach;
      //跳转金格之前先保存表单数据
      this.$api.secreatary.meetings.saveMain({ ...this.formData }).then(res => {
        this.$post
          .postData(
            "doDownloadFile",
            JSON.stringify(bank_doDownloadFile),
            "A0846C071"
          )
          .then(res => {
            if (res && res.success) {
              res.ifView = 1;
              this.$store.dispatch("setMsgzQjinfo", this.pubMait);
              this.depart = "scqjd";
              this.doDraft(res); //使用金格控件打开申请
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          });
      });
    },
    // 联系单模板： communcatAttach;
    // 联系单模板名称： communcatAttachTitle;
    //生成联系单
    contactBm() {
      if (this.bmTableData.length <= 0) {
        return;
      }
      exportTable.exportExcel("电话联系单", "#tableforPrint", true);
      // this.pubMait1.meetingName = this.formData.title;
      // this.pubMait1.ytName = this.newLxData.lxList.join("");
      // // this.pubMait1.canhuibumen = this.newLxData.canhuitest.join("");
      // // this.pubMait1.canhuiperson = this.newLxData.canhuiuser.join("");
      // // this.pubMait1.tel = this.newLxData.phone.join("");
      // for (var item in this.pubMait1) {
      //   console.log(item, "书签名");
      //   console.log(this.pubMait1[item], "每一项的值");
      // }
      // this.ifView = 1;
      // this.shiwuState = "viewFile";
      // this.formData.id = this.id;
      // let bank_doDownloadFile = { function: "doDownloadFile" };
      // bank_doDownloadFile.fileName = this.formData.communcatAttachTitle;
      // bank_doDownloadFile.filePath = this.formData.communcatAttach;
      // //跳转金格之前先保存表单数据
      // this.$api.secreatary.meetings.saveMain({ ...this.formData }).then(res => {
      //   this.$post
      //     .postData(
      //       "doDownloadFile",
      //       JSON.stringify(bank_doDownloadFile),
      //       "A0846C071"
      //     )
      //     .then(res => {
      //       if (res && res.success) {
      //         console.log(bank_doDownloadFile);
      //         res.ifView = 1;
      //         // cosnole.log(this.pubMait1, "生成联系单的vuex中的储值");
      //         this.$store.dispatch("setMsgzLxinfo", this.pubMait1);
      //         this.depart = "sclxd";
      //         this.doDraft(res); //使用金格控件打开申请
      //       } else {
      //         this.$message({
      //           type: "error",
      //           showClose: true,
      //           offset: 400,
      //           message: "下载失败",
      //           duration: 500
      //         });
      //       }
      //     });
      // });
      // }
    },
    //主汇报部门
    mainSelect() {
      let data = "";
      this.$api.secreatary.meetings.mainDepartSelect(data).then(res => {
        this.mainOptions = res.data;
        // console.log("-----------------", this.mainOptions);
      });
    },
    //主汇报部门筛选
    deptNameChange() {
      this.load();
    },
    backButton() {
      this.dialogVisibleBaYT = false;
      this.save_btn();
    },
    //会议时间筛选
    timeChange() {
      if (this.formData.yTvalue && this.formData.yTvalue.length) {
        this.startTime = this.formData.yTvalue[0]
          ? this.formData.yTvalue[0]
          : "";
        this.endTime = this.formData.yTvalue[1] ? this.formData.yTvalue[1] : "";
      }
      this.load(); //获取议题列表弹窗
    },
    // 新增议题
    create_new() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$api.secreatary.meetings
              .saveMain({ ...this.formData })
              .then(res => {
                this.id = res.data.id;
                sessionStorage.setItem("zbId", res.data.id);
                this.$intent.replace(this, {
                  path: "/secretary/presidentMeeting/conferList/conferDetail",
                  query: { type: 1, id: this.id }
                });
                this.HldaddqueXimeeage();
                this.HggaddqueXimeeage();
                this.selectYitiVisible = true;
                this.mainSelect();
                this.load(); //获取议题列表弹窗
              });
          } else {
            this.$api.secreatary.meetings
              .saveMain({ ...this.formData, id: this.id })
              .then(res => {
                // this.id = res.data.id;
                this.HldaddqueXimeeage();
                this.HggaddqueXimeeage();
                this.selectYitiVisible = true;
                this.mainSelect();
                this.load(); //获取议题列表弹窗
              });
          }
        }
      });
    },
    // 退回
    back() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "请勾选议题"
        });
      } else {
        this.$api.secreatary.meetings
          .saveMain({ ...this.formData, id: this.id })
          .then(res => {
            this.dialogVisibleBack = true;
          });
      }
    },
    backYt() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else if (ytLength > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条议题"
        });
      } else {
        let ytId = this.$refs.hynRmultipleTable.selection[0].id;
        let feedback = this.$refs.hynRmultipleTable.selection[0].isTicked;
        let ytflag = this.$refs.hynRmultipleTable.selection[0].ytzFlag;
        let ThdeadLine = formatData(
          this.preFormOne.ThdeadLine.getTime(),
          "YYYY-MM-DD HH:mm:ss"
        );
        console.log(ThdeadLine, "ThdeadLine");
        console.log(feedback, "feedback");
        if (ytflag == "6") {
          this.$message({
            type: "warning",
            message: "议题已退回"
          });
        } else {
          if (feedback == 1) {
            this.dialogVisibleBack = true;
            this.$api.secreatary.meetings
              .backYiti({
                ytId: ytId,
                fldShyj: this.preFormOne.fldShyj,
                jzTime: ThdeadLine
              })
              .then(res => {
                this.getHyTable();
                this.dialogVisibleBack = false;
              });
          } else {
            this.$message({
              type: "warning",
              message: "请选择已反馈的议题"
            });
          }
        }
      }
    },
    // 议题列表弹窗
    load() {
      this.$api.secreatary.meetings
        .getTopicList(
          {
            isSubmit: "0",
            ytStatus: "1",
            startTime: this.startTime,
            endTime: this.endTime,
            deptId: this.formData.deptName,
            ...this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          // console.log(this.pagination.total);
          this.choosetableData = res.data;
          res.data &&
            res.data.map(item => {
              item.sbSj = formatData(item.sbSj, "YYYY-MM-DD");
            });
        });
    },
    chooseYt(row) {
      // console.log(row);
      let dataId = [];
      let dataArray = [];
      row.map(function(value, index) {
        dataId.push(value.tzId);
        dataArray.push(value.id);
      });
      var idAry = dataId[0];
      this.addArry = dataArray.join(",");
      for (let n = 0; n < dataId.length; n++) {
        if (idAry) {
          this.$message({
            type: "warning",
            message: "此议题已被其他主办单添加！"
          });
        }
      }
    },
    onRowClick(row) {},
    newYt() {
      this.$api.secreatary.meetings
        .newYiti(
          {
            id: this.id, //主办添加议题
            ytIds: this.addArry,
            isAdded: "0"
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          // this.getHyTable();
          this.$api.secreatary.meetings
            .hyTable(
              {
                tzId: this.id
              },
              {
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize
              }
            )
            .then(res => {
              this.orderInfo = res.data;
              this.opinionFldData = res.data;
            });
        });
    },
    submit() {
      if (!this.id) {
        this.$api.secreatary.meetings
          .saveMain({ ...this.formData })
          .then(res => {
            this.id = res.data.id;
            this.newYt();
          });
      } else {
        this.newYt();
      }
      this.selectYitiVisible = false;
    },
    cloSubmit() {
      this.selectVisible = false;
    },
    seecloSubmit() {
      this.seeselectVisible = false;
    },
    // 上移下移
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    adviseSelect(rows) {
      //意见域选中行
      this.rows = rows;
    },
    // 获取议题选中数据ID
    setChange(value) {
      let dataArry = [];
      value.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.sendArry = dataArry.join(",");
    },
    adviseUpMove() {
      this.makeUpMove(this.rows, this.opinionFldData);
    },
    adviseDownMove() {
      this.makeDownMove(this.rows, this.opinionFldData);
    },
    makeUpMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据"
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == 0) {
          this.$message({
            type: "warning",
            message: "第一条数据不可以上移！"
          });
          return;
        }
        DataName[index] = DataName.splice(index - 1, 1, DataName[index])[0];
        this.$nextTick(() => {
          DataName[index].orderNumInt++;
          DataName[index - 1].orderNumInt--;
          this.orderInfo = DataName;
          this.saveOrder();
        });
        this.$message({
          title: "成功",
          message: "上移成功",
          type: "success"
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据"
        });
        return;
      }
    },
    makeDownMove(selectArea, DataName) {
      if (selectArea.length) {
        if (selectArea.length > 1) {
          this.$message({
            type: "warning",
            message: "只可以移动一条数据"
          });
          return;
        }
        const index = selectArea[0].index;
        if (index == DataName.length - 1) {
          this.$message({
            type: "warning",
            message: "最后一条数据不可以下移！"
          });
          return;
        }
        DataName[index] = DataName.splice(index + 1, 1, DataName[index])[0];
        this.$nextTick(() => {
          DataName[index].orderNumInt--;
          DataName[index + 1].orderNumInt++;
          this.orderInfo = DataName;
          this.saveOrder();
        });
        this.$message({
          title: "成功",
          message: "下移成功",
          type: "success"
        });
      } else {
        this.$message({
          type: "warning",
          message: "你没有选中数据"
        });
        return;
      }
    },
    // 删除
    adviseDel(row) {
      let sendLength = this.$refs.hynRmultipleTable.selection.length;
      if (sendLength == 0) {
        this.$message({
          type: "warning",
          message: "请至少选中一条数据"
        });
      } else {
        this.$api.secreatary.meetings
          .delYiti({ ytIds: this.sendArry, id: this.id })
          .then(res => {
            // this.getHyTable();
            this.$api.secreatary.meetings
              .hyTable(
                {
                  tzId: this.id
                },
                {
                  PAGE_JUMP: this.pagination.pageNum,
                  REC_IN_PAGE: this.pagination.pageSize
                }
              )
              .then(res => {
                this.orderInfo = res.data;
                this.opinionFldData = res.data;
              });
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
      }
    },
    //查看部门参会流程
    adviseProcess(row) {
      // let ytIds = this.$refs.hynRmultipleTable.selection[0].id;
      let sendLength = this.$refs.hynRmultipleTable.selection.length;
      if (sendLength == 0) {
        this.$message({
          type: "warning",
          message: "请至少选中一条数据"
        });
      } else {
        this.$api.secreatary.meetings
          .ckViewProcess({
            ytIds: this.sendArry
          })
          .then(res => {
            this.showFlowChart = true;
            res.data.map(item => {
              item.TM = formatData(item.TM, "YYYY-MM-DD HH:mm:ss");
              console.log(item.TM);
            });
            this.chooseSerData = res.data;
          });
      }
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    // 选人
    selectZcPerson() {
      this.showOrgPer = true;
      // this.checkData = [];
      // this.tempArrZc = [];
      // let idArr = [];
      // let nameArr = [];
      // if (this.formData.zcName) {
      //   idArr = this.formData.zcNameId.split(",");
      //   nameArr = this.formData.zcName.split(",");
      // }
      // if (idArr && idArr.length > 0) {
      //   idArr.forEach((item, index) => {
      //     let obj = {};
      //     obj.id = item;
      //     obj.name = nameArr[index];
      //     this.tempArrZc.push(obj);
      //   });
      // }
      // this.checkData = this.tempArrZc;
      // this.dialogState = true;
      // this.singelCheckF = true;
    },
    handleClick(data, checked, node) {
      if (checked == true) {
        this.checkedId = data.idStr;
        this.$refs.myTree.setCheckedNodes([data]);
      }
    },
    handleNodeClick(data, checked, node) {
      this.checkedId = data.idStr;
      this.$refs.myTree.setCheckedNodes([data]);
    },
    selectPerson(data) {
      switch (data) {
        case "行领导":
          this.dialogStateLD = true; // 关闭选择人员树弹窗
          this.selectDeptLD = [];
          this.tempArrLD = [];
          let idArr = [];
          let nameArr = [];
          if (this.formData.cxLd) {
            idArr = this.formData.cxLdId.split(",");
            nameArr = this.formData.cxLd.split(",");
          }
          if (idArr && idArr.length > 0) {
            idArr.forEach((item, index) => {
              let obj = {};
              obj.depHumanId = item;
              obj.perName = nameArr[index];
              this.tempArrLD.push(obj);
            });
          }
          this.selectDeptLD = this.tempArrLD;
          break;
        case "高管":
          this.dialogStateGG = true; // 关闭选择人员树弹窗
          this.selectDeptGG = [];
          this.tempArrGG = [];
          let idArrGG = [];
          let nameArrGG = [];
          if (this.formData.cxGg) {
            idArrGG = this.formData.cxGgId.split(",");
            nameArrGG = this.formData.cxGg.split(",");
          }
          if (idArrGG && idArrGG.length > 0) {
            idArrGG.forEach((item, index) => {
              let obj = {};
              obj.depHumanId = item;
              obj.perName = nameArrGG[index];
              this.tempArrGG.push(obj);
            });
          }
          this.selectDeptGG = this.tempArrGG;
          break;
      }
    },
    selectHang(data, index) {
      switch (data) {
        case "行领导":
          // this.dialogStateLD = true; // 关闭选择人员树弹窗
          // this.selectDeptLD = [];
          // this.tempArrLD = [];
          // let idArr = [];
          // let nameArr = [];
          // if (this.formData.cxLd) {
          //   idArr = this.formData.cxLdId.split(",");
          //   nameArr = this.formData.cxLd.split(",");
          // }
          // if (idArr && idArr.length > 0) {
          //   idArr.forEach((item, index) => {
          //     let obj = {};
          //     obj.depHumanId = item;
          //     obj.perName = nameArr[index];
          //     this.tempArrLD.push(obj);
          //   });
          // }
          // this.selectDeptLD = this.tempArrLD;
          this.indexObj = index;
          this.dialogState3 = true; // 显示选择人树结构
          this.singelCheckF3 = false;
          break;
        case "高管":
          this.indexObj1 = index;
          this.dialogState4 = true; // 显示选择人树结构
          this.singelCheckF4 = false;
          break;
      }
    },
    //选主持人成功
    getperList(perList) {
      console.log(perList, "perList");
      let receivePersonId = [];
      let selectDataName = [];
      perList &&
        perList.map(item => {
          receivePersonId.push(item.deptHumanId);
          selectDataName.push(item.perName);
        });
      this.formData.zcName = selectDataName.join(",");
      this.formData.zcNameId = receivePersonId.join(",");
    },
    showCompDialogLD(data, status, type, params, dtype) {
      this.dialogStateLD = false; // 关闭选择人员树弹窗
      let receivePersonId = [];
      let selectDataName = [];
      data &&
        data.map(item => {
          receivePersonId.push(item.depHumanId);
          selectDataName.push(item.perName);
        });
      console.log(selectDataName);
      this.formData.cxLd = selectDataName.join(",");
      this.formData.cxLdId = receivePersonId.join(",");
      this.save_new();
    },
    showCompDialogGG(data, status, type, params, dtype) {
      this.dialogStateGG = false; // 关闭选择人员树弹窗
      console.log(data);
      let receivePersonId = [];
      let selectDataName = [];
      data &&
        data.map(item => {
          receivePersonId.push(item.depHumanId);
          selectDataName.push(item.perName);
        });
      this.formData.cxGg = selectDataName.join(",");
      this.formData.cxGgId = receivePersonId.join(",");
      this.save_new();
    },
    showCompDialogQxLd(data, status, type, params, dtype) {
      this.dialogState3 = false; // 关闭选择人员树弹窗
      let receivePersonId = [];
      let selectDataName = [];
      data &&
        data.map(item => {
          receivePersonId.push(item.depHumanId);
          selectDataName.push(item.perName);
        });
      this.bankList[this.indexObj].ldName = selectDataName.join(",");
      this.bankList[this.indexObj].ldId = receivePersonId.join(",");
    },
    showCompDialogQxGG(data, status, type, params, dtype) {
      this.dialogState4 = false; // 关闭选择人员树弹窗
      let receivePersonId = [];
      let selectDataName = [];
      data &&
        data.map(item => {
          receivePersonId.push(item.depHumanId);
          selectDataName.push(item.perName);
        });
      this.bankListed[this.indexObj1].GgName = selectDataName.join(",");
      this.bankListed[this.indexObj1].ldId = receivePersonId.join(",");
    },
    // 添加 行领导缺席信息
    HldaddqueXimeeage() {
      for (let k = 0; k < this.bankList.length; k++) {
        if (this.bankList[k].LDid) {
          this.$api.secreatary.meetings
            .addAbsence({
              tzId: this.id,
              ldId: this.bankList[k].ldId + "",
              ldName: this.bankList[k].ldName,
              qxReason: this.bankList[k].LdqxReason,
              id: this.bankList[k].LDid,
              managerFlag: 1
            })
            .then(res => {});
        } else {
          this.$api.secreatary.meetings
            .addAbsence({
              tzId: this.id,
              ldId: this.bankList[k].ldId + "",
              ldName: this.bankList[k].ldName,
              qxReason: this.bankList[k].LdqxReason,
              managerFlag: 1
            })
            .then(res => {});
        }
      }
    },
    // 添加 高管缺席信息
    HggaddqueXimeeage() {
      for (let i = 0; i < this.bankListed.length; i++) {
        if (this.bankListed[i].GGid) {
          this.$api.secreatary.meetings
            .addAbsence({
              tzId: this.id,
              ldId: this.bankListed[i].ldId + "",
              ldName: this.bankListed[i].GgName,
              qxReason: this.bankListed[i].GgqxReason,
              id: this.bankListed[i].GGid,
              managerFlag: 0
            })
            .then(res => {});
        } else {
          this.$api.secreatary.meetings
            .addAbsence({
              tzId: this.id,
              ldId: this.bankListed[i].ldId + "",
              ldName: this.bankListed[i].GgName,
              qxReason: this.bankListed[i].GgqxReason,
              managerFlag: 0
            })
            .then(res => {});
        }
      }
    },
    //领导缺席列表
    attendanced() {
      this.$api.secreatary.meetings
        .AbsenceList({
          tzId: this.id,
          managerFlag: 1
        })
        .then(res => {
          // this.bankList = [];
          res.data.map(item => {
            this.bankList.push({
              ldName: item.ldName,
              ldId: item.ldId,
              LdqxReason: item.qxReason,
              LDid: item.id,
              checked: false
            });
          });
          let LDarray = [];
          this.bankList.map(item => {
            LDarray.push(item.ldName);
          });
          this.LDbankList = LDarray.join(",");
        });
    },
    //高管缺席列表
    Ggattendanced() {
      this.$api.secreatary.meetings
        .AbsenceList({
          tzId: this.id,
          managerFlag: 0
        })
        .then(res => {
          // this.bankListed = [];
          res.data.map(item => {
            this.bankListed.push({
              GgName: item.ldName,
              ldId: item.ldId,
              GgqxReason: item.qxReason,
              GGid: item.id,
              checked: false
            });
          });
          let GGarray = [];
          this.bankListed.map(item => {
            GGarray.push(item.GgName);
          });
          this.GGbankListed = GGarray.join(",");
        });
    },
    // 选择会议室
    // 保存选中结果
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.hYmultipleTable.clearSelection();
        this.$refs.hYmultipleTable.toggleRowSelection(val.pop());
      } else {
        this.multipleSelection = val;
      }
    },
    //  获取选中结果
    getSelected() {
      console.log(this.multipleSelection[0], "获取会议室");
      this.hyType = this.multipleSelection[0].orderStatu;
      console.log(this.hyType, "会议室状态");
      this.$set(this.formData, "hyAdress", this.multipleSelection[0].roomName);
      this.$set(this.formData, "roomId", this.multipleSelection[0].roomId);
      console.log(this.formData.roomId);
      this.$set(this.formData, "meetType", this.multipleSelection[0].meetType);
      this.$set(
        this.formData,
        "isSecrete",
        this.multipleSelection[0].isSecrete
      );
      let serviceList = this.multipleSelection[0].serviceList;
      let service = "";
      let serviceAry = [];
      serviceList.forEach(item => {
        serviceAry.push(item);
      });
      service = serviceAry.join(",");
      console.log(service);
      this.$set(this.formData, "needServices", service);
      // this.$set(this.formData, "cancelReason", this.multipleSelection[0].roomName);
      // this.formData.hyAdress = this.multipleSelection[0].name;
      this.dialogMeeting = false;
    },
    btnEvent() {},
    //  关闭
    close_btn() {
      // this.$confirm("确认关闭？").then(() => {
      //   this.$intent.closeWindow(this);
      // });
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.saveMethod();
            this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    //保存方法
    saveMethod() {
      this.bmTableData.map(item => {
        item.type = false;
      });
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$api.secreatary.meetings
              .saveMain({ ...this.formData })
              .then(res => {
                this.id = res.data.id;
                this.HldaddqueXimeeage();
                this.HggaddqueXimeeage();
                // this.attendanced();
                // this.Ggattendanced();
                sessionStorage.setItem("zbId", res.data.id);
                this.$intent.replace(this, {
                  path: "/secretary/presidentMeeting/conferList/conferDetail",
                  query: { type: 1, id: this.id }
                });
                this.createFile();
                // this.attendanced();
                // this.Ggattendanced();
                if (this.hyType == "空闲") {
                  this.getMeeting();
                }
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              });
          } else {
            this.$api.secreatary.meetings
              .saveMain({ ...this.formData, id: this.id })
              .then(res => {
                this.HldaddqueXimeeage();
                this.HggaddqueXimeeage();
                // this.attendanced();
                // this.Ggattendanced();
                this.$intent.replace(this, {
                  path: "/secretary/presidentMeeting/conferList/conferDetail",
                  query: { type: 1, id: this.id }
                });
                this.createFile();
                console.log(this.hyType, "会议室");
                if (this.hyType == "空闲") {
                  this.getMeeting();
                }
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              });
          }
        }
      });
    },
    save_new() {
      if (!this.id) {
        this.$api.secreatary.meetings
          .saveMain({ ...this.formData })
          .then(res => {
            this.id = res.data.id;
          });
      } else {
        this.$api.secreatary.meetings
          .saveMain({ ...this.formData, id: this.id })
          .then(res => {});
      }
    },
    // 保存按钮
    save_btn() {
      this.saveMethod();
      // this.HldaddqueXimeeage();
      // this.HggaddqueXimeeage();
    },
    sendPre() {
      let ytzJzTime = formatData(
        this.preForm.deadLine.getTime(),
        "YYYY-MM-DD HH:mm:ss"
      );

      this.$api.secreatary.meetings
        .sendPreNotice({
          id: this.id,
          ytIds: this.sendArry,
          isMainReport: this.preForm.isMainReport,
          ytzJzTime: ytzJzTime
        })
        .then(res => {
          this.$api.secreatary.meetings
            .hyTable(
              {
                tzId: this.id
              },
              {
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize
              }
            )
            .then(res => {
              this.orderInfo = res.data;
              this.opinionFldData = res.data;
              if (this.hyType == "可用") {
                this.getMeeting();
              }
            });

          this.$message({
            message: res.msg,
            type: "success"
          });
          this.dialogVisible = false;
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "warning"
          });
          this.dialogVisible = false;
        });
    },
    //报名通知框
    sendPreBm() {
      let bmtzJzTime = formatData(
        this.preFormBm.deadLineBm.getTime(),
        "YYYY-MM-DD HH:mm:ss"
      );
      console.log(bmtzJzTime, "bmtzJzTime");
      this.$api.secreatary.meetings
        .sendBmNotice({
          id: this.id,
          ytIds: this.sendArry,
          bmtzJzTime: bmtzJzTime
        })
        .then(res => {
          // var mesg = res.msg.trim();
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getHyTable();

          this.dialogVisibleBm = false;
        })
        .catch(res => {
          // var mesg = res.msg.trim();
          this.$message({
            message: res.msg,
            type: "warning"
          });
          this.dialogVisibleBm = false;
        });
    },
    // 发送预通知
    send_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "请勾选议题"
        });
      } else {
        // this.saveMethod();
        if (!this.id) {
          this.$api.secreatary.meetings
            .saveMain({ ...this.formData })
            .then(res => {
              this.id = res.data.id;
              this.createFile();
              this.attendanced();
              this.Ggattendanced();
            });
        } else {
          this.$api.secreatary.meetings
            .saveMain({ ...this.formData, id: this.id })
            .then(res => {});
        }
        this.dialogVisible = true;
      }
    },
    // 收回预通知
    back_btn() {
      let ytLength = this.$refs.hynRmultipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "您还没有选择议题"
        });
      } else {
        this.$api.secreatary.meetings
          .backPreNotice({
            id: this.id,
            ytIds: this.sendArry
          })
          .then(res => {
            // this.getHyTable();
            this.$api.secreatary.meetings
              .hyTable(
                {
                  tzId: this.id
                },
                {
                  PAGE_JUMP: this.pagination.pageNum,
                  REC_IN_PAGE: this.pagination.pageSize
                }
              )
              .then(res => {
                this.orderInfo = res.data;
                this.opinionFldData = res.data;
              });
            this.$message({
              message: "收回成功",
              type: "success"
            });
          });
      }
    },
    // 主办单模板：tzAttach;
    // 主办单模板名称：tzAttachTitle;
    //生成会议单
    send() {
      console.log(this.meetingTime, "meetingTime");

      this.objKow.meetingName = this.formData.title ? this.formData.title : "";
      this.objKow.meetingTime = this.meetingTime ? this.meetingTime : "";
      this.objKow.meetingPlace = this.formData.hyAdress
        ? this.formData.hyAdress
        : "";
      this.objKow.hostPerson = this.formData.zcName ? this.formData.zcName : "";
      this.objKow.director = this.formData.lxDs ? this.formData.lxDs : "";
      this.objKow.supervisor = this.formData.lxJs ? this.formData.lxJs : "";
      this.objKow.attendHangLingDao = this.formData.cxLd
        ? this.formData.cxLd
        : "";
      this.objKow.attendHangGaoGuan = this.formData.cxGg
        ? this.formData.cxGg
        : "";
      this.objKow.absentHangLingDaoReason = this.LDbankList
        ? this.LDbankList
        : "";
      this.objKow.absentHangGaoGuanReason = this.GGbankListed
        ? this.GGbankListed
        : "";
      this.newData.content.forEach((item, index) => {
        this.newData.content[index] = item + this.newLxData.lxList.join("");
      });
      console.log("newData------", this.newData);
      this.objKow.contant = this.newData.content
        ? this.newData.content.join("")
        : "";
      // this.objKow.issue = this.opinionFldData ? this.opinionFldData : "";
      for (var item in this.objKow) {
        console.log(item, "书签名");
        console.log(this.objKow[item], "每一项的值");
      }
      this.ifView = 1;
      this.shiwuState = "viewFile";
      this.formData.id = this.id;
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = this.formData.tzAttachTitle;
      bank_doDownloadFile.filePath = this.formData.tzAttach;
      //跳转金格之前先保存表单数据
      // this.$api.secreatary.meetings.saveMain({ ...this.formData }).then(res => {
      //   console.log(this.objKow, "2711");
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          "A0846C071"
        )
        .then(res => {
          if (res && res.success) {
            res.ifView = 1;
            this.$store.dispatch("setMsgzinfo", this.objKow);
            console.log(this.objKow);
            this.depart = "schyd";
            this.doDraft(res); //使用金格控件打开申请
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "下载失败",
              duration: 500
            });
          }
        });
      // });
    },
    // doDraftOne(fileInfo) {
    //   console.log(fileInfo, "---------------生成联系单");
    //   let data = this.$router.resolve({
    //     path: "/openAndSave_WordHk",
    //     query: {
    //       tanSun: "3",
    //       state: fileInfo && fileInfo.flag === "cakan" ? "viewFile" : "newFile",
    //       id: this.id ? this.id : "1",
    //       zhengWenState: this.ifView,
    //       JYcode: "A08462002",
    //       relativePath: fileInfo ? fileInfo.filePath : "",
    //       fileName: fileInfo ? fileInfo.fileName : "测试.doc",
    //       tmpFilePath: fileInfo ? fileInfo.filePath : "",
    //       tmpFileName: fileInfo ? fileInfo.fileName : "测试.doc",
    //       cleanDraftFlag: false,
    //       multiTenancyId: "000076767qwq0",
    //       showBtns: true,
    //       depart: 3,
    //       EditType: "2"
    //     }
    //   });
    //   this.$forceUpdate();
    //   window.open(data.href, "_blank");
    // },
    //打开金格文档申请跳转
    doDraft(fileInfo) {
      console.log(fileInfo, "---------------生成会议单");
      let data = this.$router.resolve({
        path: "/openAndSave_WordHk",
        query: {
          tanSun: "3",
          state: "viewFile",
          id: this.id ? this.id : "1",
          zhengWenState: this.ifView,
          JYcode: "A08462002",
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : "测试.doc",
          tmpFilePath: fileInfo ? fileInfo.filePath : "",
          tmpFileName: fileInfo ? fileInfo.fileName : "测试.doc",
          cleanDraftFlag: false,
          multiTenancyId: "000076767qwq0",
          showBtns: true,
          depart: this.depart,
          saveNameAndNumber: this.formData.title,
          EditType: "2"
        }
      });
      // console.log(fileInfo, "fileInfo");
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 删除此文
    del_btn() {
      this.$confirm("是否确定删除当前选中数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$api.secreatary.meetings.del({ id: this.id }).then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
          this.del_meet();
          this.$intent.closeWindow(this);
        });
      });
    },
    //删除会议室
    del_meet() {
      // this.hystartTime = this.formData.hyTimeStr.substring(
      //   0,
      //   this.formData.hyTimeStr.indexOf(" ")
      // );
      // this.hyendTime = this.formData.hyTimeStr.substring(
      //   this.formData.hyTimeStr.indexOf(" "),
      //   this.formData.hyTimeStr.lastIndexOf(":")
      // );
      // this.hyendTimestr = this.hyendTime.trim();
      this.$post
        .postData(
          "cancelOrderTy",
          JSON.stringify({
            function: "cancelOrderTy",
            meetUseDate: this.formData.hyDate.trim(),
            meetStartTime: this.formData.timeDate.trim()
          }),
          "A0846C088"
        )
        .then(res => {});
    },
    //打印处理单
    print_btn() {
      this.$intent.goNewPage(this, {
        path: "/conferDetailDy",
        query: { id: this.id }
      });
    },
    //设置控制域
    setConfig() {},
    // 获取详情
    getDetail() {
      this.$api.secreatary.meetings
        .getMainDetail({
          id: this.id
        })
        .then(res => {
          this.formData = res.data;
          this.formData.hyTimeStr = formatData(
            res.data.hyTime,
            "YYYY-MM-DD HH:mm:ss"
          );
          this.meetingTime = res.data.hyTimeStr;
          this.formData.hyDate = this.formData.hyTimeStr.substring(
            0,
            this.formData.hyTimeStr.indexOf(" ")
          );
          this.formData.timeDate = this.formData.hyTimeStr.substring(
            this.formData.hyTimeStr.indexOf(" ")
            // this.formData.hyTimeStr.lastIndexOf(":")
          );
          console.log(this.formData.hyDate, this.formData.timeDate);
          this.ifView = 1;
        });
    },
    // 获取会议内容
    getHyTable() {
      this.$api.secreatary.meetings
        .hyTable(
          {
            tzId: this.id
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.orderInfo = res.data;
          this.opinionFldData = res.data;
          this.newData = {
            content: []
          };
          this.opinionFldData.map((item, index) => {
            this.newData.content.push(
              index +
                1 +
                "," +
                item.ytMc +
                item.deptName +
                item.strZhbr +
                "汇报" +
                item.strLxName +
                "测试参会人员 列席" +
                "\n"
            );
          });
          // this.opinObj = res.data;
          // this.opinionFldData[0].forEach((item,index=>{
          //  this.opinObj = item.ytMc+' '+item.deptName+' '+item.strZhbr+' '+item.strLxName+' '
          // }))
          // console.log('this.opinObjthis.opinObjthis.opinObj',this.opinObj);
          this.getFileList();
          // // 为嵌套死循环而做的更改
          // let arrInfo = this.orderInfo;
          // let arrInfoId = {};
          // for (let i = 0; i < arrInfo.length; i++) {
          //   this.arrInfoNum.push({
          //     id: arrInfo[i].id,
          //     orderNum: arrInfo[i].orderNumInt
          //   });
          // }
          // this.$api.secreatary.meetings
          //   .saveorder({ myData: this.arrInfoNum })
          //   .then(res => {});
        });
    },
    saveOrder() {
      let arrInfo = this.orderInfo;
      let arrInfoId = {};
      for (let i = 0; i < arrInfo.length; i++) {
        this.arrInfoNum.push({
          id: arrInfo[i].id,
          orderNum: arrInfo[i].orderNumInt
        });
      }
      this.$api.secreatary.meetings
        .saveorder({ myData: this.arrInfoNum })
        .then(res => {
          // this.getHyTable();
        });
    },
    // 获取报名信息
    bmTable() {
      this.$api.secreatary.meetings
        .getBmTable({
          tzId: this.id
        })
        .then(res => {
          res.data &&
            res.data.map(item => {
              item.type = true;
            });
          // this.isSubmit = res.data.isSubmit;
          this.bmTableData = res.data;
          this.newQjData = {
            context: []
          };
          this.newLxData = {
            lxList: []
          };
          // if (this.bmTableData) {
          this.bmTableData.map((item, index) => {
            console.log(item, "2222222");
            // console.log(item.leaveReason, "23213213");
            this.newQjData.context.push(
              item.lxDeptName + "\n" + item.leaveReason + "" + "\n"
            );
            this.newLxData.lxList.push(
              item.ytName +
                "   " +
                item.lxDeptName +
                "   " +
                item.chName +
                "   " +
                (item.chCellPhone ? item.chCellPhone : "") +
                "\n"
            );
          });
          // }
        });
    }
  },
  activated() {},
  updated() {},
  created() {
    let type = this.$route.query.type;
    switch (Number(type)) {
      case 0:
        this.formData.draftDepartment = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitName
          : "";
        this.formData.draftDepartmentId = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId.toString()
          : "";
        this.formData.draftUser = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "";
        this.formData.draftUserId = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "";
        this.isQc = true;
        break;
      case 1:
        sessionStorage.setItem("id", this.$route.query.id);
        this.id = sessionStorage.getItem("id");
        console.log(this.id, "0000000000000000000000000000000000000000000");
        this.isQc = true;
        // this.hYplace();
        this.getDetail();
        this.getHyTable();
        this.bmTable();
        this.attendanced();
        this.Ggattendanced();
        break;
    }
  },
  mounted() {}
};
</script>

<style  lang="less" rel="stylesheet/less">
.conferDetail {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-radio-button__orig-radio:disabled:checked + .el-radio-button__inner {
    background-color: #aab0b3 !important;
    color: #fff !important;
  }
  .tooltip {
    color: #606266;
  }
  .dou {
    font-size: 14px;
    color: #606266;
  }
  .meetingYd {
    margin: 20px 10%;
  }
  .header-title {
    font-size: 16px;
    width: 100%;
    margin-top: 20px;
    //   display: flex;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .header {
    font-size: 12px;
    display: flex;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .box {
    display: flex;
    border: 1px solid #dcdfe6;
    padding-bottom: 10px;
    border-radius: 4px;
    .right {
      padding: 10px 10px 0 0;
      flex: 1;
    }
  }
  .bank_grid_comtent_active {
    border: 1px solid #fff;
    background: #0563c8;
    color: #fff;
  }
  .zfTwo {
    background: white;
    margin: 0 auto;

    .headerClick {
      background: #409eff;
      color: white;
      height: 50px;
      line-height: 50px;

      .left {
        margin-left: 20px;
        cursor: pointer;
      }

      .right {
        margin-right: 20px;
        float: right;
      }
    }
    .el-form-item__content {
      line-height: 0px;
    }
    .formHeader {
      margin-top: 50px;
      padding: 8px 70px;

      .title-text {
        margin-bottom: 15px;
        font-size: 30px;
        line-height: 75px;
        color: #409eff;
        font-weight: 600;
        text-align: center;
      }
    }

    .process_content {
      width: 80%;
      padding: 20px 16px;
      margin: 0 auto;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .current_box {
        width: 95%;
        margin-left: 5%;
        height: 30px;
        margin-bottom: 20px;
        line-height: 30px;
        border: 1px solid #f9aa21;
        background: #fef7e7;

        .cur_sess {
          p {
            font-size: 14px;
            color: #0f100e;
            margin-left: 16px;
            display: inline-block;
            span {
              color: #f9aa21;
            }
          }
        }
      }
    }
  }
  //上传附件
  .tree_w {
    height: 200px;
    padding: 20px;
    overflow: scroll;
    margin: 20px 0 0 0px;
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
      .numName {
        white-space: nowrap;
        height: 42px;
        line-height: 42px;
        display: inline-block;
        text-overflow: ellipsis;
        width: 20px;
      }
      .down {
        cursor: pointer;
      }

      .down:hover {
        color: #3b85ef;
      }
    }
  }
  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;

    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active {
      background: #3b85ef;
      color: #fff;
    }
  }
  .clear-fix:after {
    clear: both;
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    overflow: hidden;
  }
  .adviceInfo {
    position: absolute;
    width: 95%;
    bottom: 0;
    text-align: right;
    color: #606266;
  }
}
</style>