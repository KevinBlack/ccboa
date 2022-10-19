
 <template>
  <div class="fileHandleDetail">
    <div>
      <!-- <i class="el-icon-arrow-left"></i> -->
      <!-- <span class="title">文件办理单</span> -->
      <!-- <div class="btn">
        <el-button v-if="isTackBack" @click="tackBack">收回</el-button>
        <template v-if="disabled">
          <el-button
            v-for="(item,index) in buttonListDone"
            @click="buttonClick(item.name)"
            :key="index"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
        <template v-if="!disabled">
          <el-button
            v-for="(item,index) in buttonList"
            @click="buttonClick(item.name)"
            :key="index"
            v-show="buttonList[index].show"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
      </div>-->
      <div class="headerClick" v-if="disabled">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonListDone"
          @click="buttonClick(item.name)"
          v-show="buttonListDone[index].show"
          :key="index"
          plain
        >{{item.name}}</el-button>
      </div>
      <div class="headerClick" v-if="!disabled">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <!--    选择人员树-->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="dataForm"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <div class="shiwuTitle">{{dataForm.draftOrgan}}文件办理单</div>
    <div class="container" id="loadPdf">
      <div class="c-header">
        <span style="margin-left: 16px;">当前环节:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
        <span style="margin-left: 30px;">当前处理人:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentUser}}</span>
      </div>
      <el-form
        label-position="right"
        id="aaa"
        class="dataForm"
        label-width="80px"
        style="margin-top: 30px;"
        :rules="rules"
        ref="dataForm"
        :model="dataForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="documentNo">
              <el-input v-model="dataForm.documentNo" :disabled="readFields.Findex || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="createDate">
              <el-input v-model="dataForm.createDate" :disabled="readFields.createDate || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来文单位" prop="fromDept">
              <el-input v-model="dataForm.fromDept" :disabled="readFields.FromDept || disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文号" prop="fileCode">
              <el-input v-model="dataForm.fileCode" :disabled="readFields.FileCode || disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文件标题" prop="title">
          <el-input v-model="dataForm.title" :disabled="readFields.Title || disabled"></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <el-select
            v-model="dataForm.hqDept"
            placeholder="请选择"
            style="width:100%"
            :disabled="readFields.hqDept || disabled"
            value-key="hqDeptId"
            @change="selectChange"
          >
            <el-option
              v-for="item in hqDepts"
              :key="item.hqDeptId"
              :label="item.hqDept"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--     领导批示     -->
        <!-- <el-form-item label="领导批示" prop="leaderIdea">
          <el-row
            v-if="(dataForm.leaderIdeaList &&　dataForm.leaderIdeaList.length==0) || !editedIdeaFields.LDidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.leaderIdea"
                :disabled="editedIdeaFields.LDidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length!=0">
            <el-row
              v-for="item in dataForm.leaderIdeaList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="领导批示" prop="leaderIdea">
              <el-row
                v-if="(dataForm.leaderIdeaList && dataForm.leaderIdeaList.length==0) ||!editedIdeaFields.LDidea"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.leaderIdea"
                    resize="none"
                    :disabled="editedIdeaFields.LDidea || disabled"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.LDidea || disabled)"
                  :span="1"
                  style="text-align: right;"
                >
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('leaderIdea')"
                  ></i>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.leaderIdeaList && dataForm.leaderIdeaList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.leaderIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     收文部门拟办意见     -->
        <!-- <el-form-item label="收文部门拟办意见" prop="receiveIdea">
          <el-row
            v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0) || !editedIdeaFields.Proidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.receiveIdea"
                :disabled="editedIdeaFields.Proidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.receiveIdeaList&&dataForm.receiveIdeaList.length!=0">
            <el-row
              v-for="item in dataForm.receiveIdeaList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="收文部门拟办意见" prop="receiveIdea">
              <el-row
                v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0) ||!editedIdeaFields.Proidea"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.receiveIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Proidea || disabled"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.Proidea || disabled)"
                  :span="1"
                  style="text-align: right;"
                >
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('receiveIdea')"
                  ></i>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.receiveIdeaList && dataForm.receiveIdeaList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.receiveIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="过程意见" prop="processIdea">
          <el-row
            v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0) || !editedIdeaFields.Gcyjidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.processIdea"
                :disabled="editedIdeaFields.Gcyjidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.processIdeaList&&dataForm.processIdeaList.length!=0">
            <el-row
              v-for="item in dataForm.processIdeaList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="过程意见" prop="processIdea">
              <el-row
                v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0) ||!editedIdeaFields.Gcyjidea"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.processIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Gcyjidea || disabled"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.Gcyjidea || disabled)"
                  :span="1"
                  style="text-align: right;"
                >
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('processIdea')"
                  ></i>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.processIdeaList && dataForm.processIdeaList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.processIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     最终意见     -->
        <!-- <el-form-item label="最终意见" prop="finalIdea">
          <el-row
            v-if="(dataForm.deptIdeaList && dataForm.deptIdeaList.length==0) || !editedIdeaFields.HQidea"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.finalIdea"
                :disabled="editedIdeaFields.HQidea || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.deptIdeaList&&dataForm.deptIdeaList.length!=0">
            <el-row v-for="item in dataForm.deptIdeaList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="最终意见" prop="finalIdea">
              <el-row
                v-if="(dataForm.deptIdeaList && dataForm.deptIdeaList.length==0) ||!editedIdeaFields.HQidea"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.finalIdea"
                    resize="none"
                    :disabled="editedIdeaFields.HQidea || disabled"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.HQidea || disabled)"
                  :span="1"
                  style="text-align: right;"
                >
                  <i
                    class="icon-font el-icon-edit select-chang"
                    @click="showWriteList('finalIdea')"
                  ></i>
                </el-col>
              </el-row>

              <div class="d_flex" v-if="dataForm.deptIdeaList && dataForm.deptIdeaList.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.deptIdeaList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--     备注区域     -->
        <!-- <el-form-item label="备注" prop="remark"></el-form-item> -->
        <!--     备注区域     -->
        <!-- <el-form-item label="备注" prop="remark">
          <el-row
            v-if="(dataForm.remarkDealList && dataForm.remarkDealList.length==0) || !editedIdeaFields.Remark"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.remark"
                :disabled="editedIdeaFields.Remark || disabled"
              ></el-input>
            </el-col>
          </el-row>
          <template v-if="dataForm.remarkList&&dataForm.remarkList.length!=0">
            <el-row v-for="item in dataForm.remarkList" :key="item.id" style="margin-bottom: 3px">
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
          <template v-if="dataForm.remarkDealList&&dataForm.remarkDealList.length!=0">
            <el-row
              v-for="item in dataForm.remarkDealList"
              :key="item.id"
              style="margin-bottom: 3px"
            >
              <div class="d_flex">
                <el-row class="d_b100">
                  <el-col class="d_b10001" :span="24">
                    <div class="advice">{{item.content}}</div>
                    <div class="adviceInfo">
                      {{item.deptName}}
                      <span class="pad_lr10">{{item.createUser}}</span>
                      <p></p>
                      {{item.createTime}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div
                class="el-icon-delete"
                @click="deleteItem(item)"
                style="font-size:20px;margin-left:10px;cursor:pointer;float:right"
                v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
              ></div>
            </el-row>
          </template>
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row
                v-if="(dataForm.remarkDealList && dataForm.remarkDealList.length==0) ||!editedIdeaFields.Remark"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.remark"
                    resize="none"
                    :disabled="editedIdeaFields.Remark || disabled"
                  ></el-input>
                </el-col>
              </el-row>
              <div
                class="d_flex"
                v-if="dataForm.remarkDealList && dataForm.remarkDealList.length!=0"
              >
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    :span="23"
                    v-for="(item, index) in dataForm.remarkDealList"
                    :key="item.id"
                    style="background: rgba(224, 224, 224, 0.34); padding: 5px 10px"
                  >
                    <div
                      class="el-icon-delete"
                      @click="deleteItem(item)"
                      style="font-size:15px;margin-left:10px;cursor:pointer;float:right"
                      v-if="item.createTime==lastOptionTime&&item.createUserId==currentUserId&&actionType==0"
                    ></div>
                    <div style="word-break: break-all;">{{ item.content }}</div>
                    <div class="adviceInfo">
                      <span style="margin-right:10px">{{ item.deptName }}</span>
                      <span>{{item.createUser}}</span>
                      <br />
                      <span>{{item.createTime}}</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件" prop="attachid">
          <!-- <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts> -->
          <el-col :span="23">
            <div
              class="tree_w"
              v-if="dataForm.attchmentFileInfoZhi&&dataForm.attchmentFileInfoZhi.length"
            >
              <el-scrollbar>
                <div
                  v-for="(item,index) in  dataForm.attchmentFileInfoZhi"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span class="numName">{{index+1}}.</span>
                      <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
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
              </el-scrollbar>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="办理状态" :visible.sync="handleStateDialog" center>
      <el-table :data="stateData">
        <el-table-column prop="TMS" label="发送时间" width="200"></el-table-column>
        <el-table-column prop="UNITNM" label="部门" width="200"></el-table-column>
        <el-table-column prop="STATUS" label="办理状态"></el-table-column>
        <el-table-column prop="AVYEXCTRNM" label="处理人" width="200"></el-table-column>
        <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
      </el-table>
    </el-dialog>
    <checkFlowDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></checkFlowDialog>

    <!--    常用批语-->
    <appendWriteList
      :offenDevices="offenDevices"
      ref="writelist"
      v-if="appendWriteDialog"
      @childsaveselect="writelistvalue"
      @addCommonUse="addCommonUse"
      @deleId="deleteMassage"
    ></appendWriteList>
  </div>
</template>
  
<script >
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/tree/treeTansun";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import appendWriteList from "components/viewFlow/perWrit";
import commonCall from "../minixs/commonCall.js";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "docDetail",
  components: {
    // uploadFileTs,
    selectPerson,
    checkFlowDialog,
    appendWriteList
  },
  mixins: [minixs, openOrDownLoadFile, commonCall, viewDraft],

  data() {
    return {
      numyear: this.$route.query.numyear ? this.$route.query.numyear : "",
      handleStateDialog: false,
      showFlowChart: false,
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前处理人id
      lastOptionTime: 0, //最新意见时间
      isSaved: false,
      loadingTree: false,
      hqDepts: {},
      stateData: [
        {
          TMS: "2020-10-20",
          UNITNM: "",
          STATUS: "",
          AVYEXCTRNM: "",
          ENDTM: ""
        }
      ],
      tableData: [],
      actionType: "1",
      disabled: false,
      id: "",
      fileArr: [],
      identify: 0,
      rules: {},
      //人员数相关配置
      canTab: false,
      dialogVisible: false,
      treeData: [{ name: "中国建设银行", id: "007" }],
      seletOptionsData: [],
      offenUse: true,
      dialogType: "dosend",
      dialogTypeNow: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false, //显示隐藏
      backFlag1: "",
      addNewSug: false,
      isSaved: false,
      dataForm: {
        draftOrganFullName: "",
        currentNode: "",
        currentNodeId: "",
        currentUser: "",
        documentNo: "",
        createDate: "",
        fromDept: "",
        fileCode: "",
        title: "",
        hqDept: "",
        leaderIdea: "",
        receiveIdea: "",
        processIdea: "",
        finalIdea: "",
        remarkDeal: "",
        attachId: "",
        isReadFlag: "",
        remarkList: [],
        receiveIdeaList: [],
        processIdeaList: [],
        leaderIdeaList: [],
        deptIdeaList: [],
        remarkDeaList: []
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      //流程环节信息
      flowLinkInfo: {},
      buttonListDone: [
        { name: "关闭", type: "close", show: true },
        { name: "收回", type: "tackBack", show: false },
        { name: "查看流程", type: "checkFlow", show: true },
        { name: "打印处理单", type: "printHandleNote", show: true }
        // {name: '维护'},
        // {name: '流程调度'},
        // {name: '操作指南'},
      ],
      buttonList: [
        { name: "关闭", type: "close", show: false },
        { name: "保存", type: "save", show: true },
        { name: "发送下一办理人", type: "toNextPerson", show: false },
        { name: "办结", type: "banjie", show: false },
        { name: "查看流程", type: "checkFlow", show: false },
        { name: "打印处理单", type: "printHandleNote", show: false },
        { name: "操作指南", type: "operatorGuide", show: false },
        { name: "维护", type: "maintain", show: false },
        { name: "流程调度", type: "flowDispatch", show: false }
      ],
      //不可编辑控制域
      readFields: {
        FromDept: false, //来文单位
        FileCode: false, //文号
        Title: false, //标题
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false //日程
      },
      //必填控制域
      requiredFields: {
        FromDept: false, //来文单位
        FileCode: false, //文号
        Title: false, //标题
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false //日程
      },
      //可编辑意见域
      editedIdeaFields: {
        LDidea: true, //领导批示
        Proidea: true, //收文部门拟办意见
        Gcyjidea: true, //过程意见
        HQidea: true, //部门办理情况
        Remark: true, //备注
        RemarkDeal: true //备注
      },
      //必填意见域
      requiredIdeaFields: {
        HQidea: false, //部门办理情况
        LDidea: false, //领导批示
        Proidea: false, //收文部门拟办意见
        Gcyjidea: false, //过程意见
        Remark: false, //备注
        RemarkDeal: false //备注
      }
    };
  },
  mounted() {},
  computed: {
    isTackBack: function() {
      if (this.dataForm.isReadFlag === "0" || this.actionType === "1") {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.actionType = this.$route.query.identify;
    this.id = this.$route.query.id;
    this.getDetailIfo();
  },
  methods: {
    //删除意见域
    deleteItem(val) {
      apis
        .adminFileDealDel({ id: val.id })
        .then(res => {
          if ((res.code = "SUCCESS")) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getDetailIfo();
          }
        })
        .catch(err => {
          this.$message({
            type: "success",
            message: err.msg
          });
        });
    },
    //返回上一处理人
    backPerson() {
      apis
        .backPersonwjbld({
          ...this.dataForm
        })
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.$intent.closeWindow(this);
          } else {
            this.$intent.closeWindow(this);
          }
        });
    },
    getFileList() {
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.dataForm.parentId,numYear:this.numyear })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.dataForm, "attchmentFileInfoZhi", res.data);
          });
        });
    },
    //设置部门名称
    selectChange() {
      const hqDept = this.dataForm.hqDept;
      this.dataForm.hqDeptId = hqDept.hqDeptId;
      this.dataForm.hqDept = hqDept.hqDept;

      console.log("----设置部门名称------->", this.dataForm.hqDept);
    },
    //初始化校验规则
    initRules() {
      this.rules = {
        fromDept: [
          {
            required: this.requiredFields.FromDept,
            message: "不能为空",
            trigger: "change"
          }
        ],
        fileCode: [
          {
            required: this.requiredFields.FileCode,
            message: "不能为空",
            trigger: "change"
          }
        ],
        hqDept: [
          {
            required: this.requiredFields.hqDept,
            message: "不能为空",
            trigger: "change"
          }
        ],
        documentNo: [
          {
            required: this.requiredFields.Findex,
            message: "不能为空",
            trigger: "change"
          }
        ],
        createDate: [
          {
            required: this.requiredFields.createDate,
            message: "不能为空",
            trigger: "change"
          }
        ],
        title: [
          {
            required: this.requiredFields.Title,
            message: "不能为空",
            trigger: "change"
          }
        ],
        attachid: [
          {
            required: this.requiredFields.attachid,
            message: "不能为空",
            trigger: "change"
          }
        ], //附件ID

        callContent: [
          {
            required: this.requiredIdeaFields.HQidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        leaderIdea: [
          {
            required: this.requiredIdeaFields.LDidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        receiveIdea: [
          {
            required: this.requiredIdeaFields.Proidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        processIdea: [
          {
            required: this.requiredIdeaFields.Gcyjidea,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remarkDeal: [
          {
            required: this.requiredIdeaFields.RemarkDeal,
            message: "不能为空",
            trigger: "change"
          }
        ]
      };
    },
    //按钮控制
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.onClose();
          break;
        case "保存":
          this.save();
          break;
        case "发送下一办理人":
          // this.send("发送下一办理人");
          if (this.backFlag1 && !!this.dataForm.oldUserName) {
            this.$confirm(
              "是否返回" + this.dataForm.oldUserName + "?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.backPerson();
              })
              .catch(() => {
                this.send("发送下一办理人");
              });
          } else {
            this.send("发送下一办理人");
          }
          break;
        case "办结":
          if (
            !this.dataForm.finalIdea &&
            this.dataForm.deptIdeaList.length == 0
          ) {
            this.$message({ type: "error", message: "请填写最终意见" });
          } else {
            this.$confirm("是否办结").then(() => {
              this.send("办结");
            });
          }
          break;
        case "查看流程":
          this.checkFlow();
          break;
        case "打印处理单":
          this.onPrint();
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
        case "流程调度":
          this.send("流程调度");
          break;
        case "维护":
          this.maintain();
          break;
        case "收回":
          this.tackBack();
          break;

        default:
          break;
      }
    },
    //获取文件处理单详情

    getDetailIfo() {
      const that = this;
      const data = {
        id: that.id,
        btnType: this.actionType,
        numYear:this.numyear
      };
      apis.docHandlingDetail(data).then(res => {
        if (res.code === "SUCCESS") {
          that.$nextTick(() => {
            // res.data.remarkList = res.remark;
            if (res.remark && res.remark.length > 0) {
              res.data.remarkList = res.remark.filter(item => {
                that.lastOptionTime =
                  that.lastOptionTime > item.createTime
                    ? that.lastOptionTime
                    : item.createTime;
                return item;
              });
            } else {
              res.data.remarkList = res.remark;
            }
            // res.data.remarkDealList = res.remarkDeal;
            if (res.remarkDeal && res.remarkDeal.length > 0) {
              res.data.remarkDealList = res.remarkDeal.filter(item => {
                that.lastOptionTime =
                  that.lastOptionTime > item.createTime
                    ? that.lastOptionTime
                    : item.createTime;
                return item;
              });
            } else {
              res.data.remarkDealList = res.remarkDeal;
            }
            // res.data.receiveIdeaList = res.receiveIdea;
            if (res.receiveIdea && res.receiveIdea.length > 0) {
              res.data.receiveIdeaList = res.receiveIdea.filter(item => {
                that.lastOptionTime =
                  that.lastOptionTime > item.createTime
                    ? that.lastOptionTime
                    : item.createTime;
                return item;
              });
            } else {
              res.data.receiveIdeaList = res.receiveIdea;
            }
            // res.data.processIdeaList = res.processIdea;
            if (res.processIdea && res.processIdea.length > 0) {
              res.data.processIdeaList = res.processIdea.filter(item => {
                that.lastOptionTime =
                  that.lastOptionTime > item.createTime
                    ? that.lastOptionTime
                    : item.createTime;
                return item;
              });
            } else {
              res.data.processIdeaList = res.processIdea;
            }
            // res.data.deptIdeaList = res.deptIdea;
            if (res.deptIdea && res.deptIdea.length > 0) {
              res.data.deptIdeaList = res.deptIdea.filter(item => {
                that.lastOptionTime =
                  that.lastOptionTime > item.createTime
                    ? that.lastOptionTime
                    : item.createTime;
                return item;
              });
            } else {
              res.data.deptIdeaList = res.deptIdea;
            }
            // res.data.leaderIdeaList = res.leaderIdea;
            if (res.leaderIdea && res.leaderIdea.length > 0) {
              res.data.leaderIdeaList = res.leaderIdea.filter(item => {
                that.lastOptionTime =
                  that.lastOptionTime > item.createTime
                    ? that.lastOptionTime
                    : item.createTime;
                return item;
              });
            } else {
              res.data.leaderIdeaList = res.leaderIdea;
            }
            that.dataForm = res.data;
            this.backFlag1 = res.backFlag1;
            console.log(that.dataForm);
            if (
              this.dataForm.leaderIdea ||
              this.dataForm.finalIdea ||
              this.dataForm.processIdea ||
              this.dataForm.receiveIdea ||
              this.dataForm.remark
            ) {
              this.addNewSug = true;
            }
            if (that.actionType === "0") {
              that.getControlArea();
              that.getHandleDeps();
              that.disabled = false;
            } else {
              that.disabled = true;
            }

            const userInfo = localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo"))
              : {};
            // 在 已办 时， 判断显示 收回 按钮
            let tackBackIndex = that.buttonListDone.findIndex(
              item => item.type === "tackBack"
            );
            if (
              that.actionType === "1" &&
              res.data.isReadFlag === "0" &&
              userInfo.humanCode == this.dataForm.oldUserCode
            ) {
              tackBackIndex >= 0 &&
                that.$set(that.buttonListDone, tackBackIndex, {
                  ...that.buttonListDone[tackBackIndex],
                  show: true
                });
            } else {
              tackBackIndex >= 0 &&
                that.$set(that.buttonListDone, tackBackIndex, {
                  ...that.buttonListDone[tackBackIndex],
                  show: false
                });
            }

            that.getFileList();
          });
        }
      });
    },
    //获取办理部门和日期
    getHandleDeps() {
      apis
        .getHandleDeps({numYear:this.numyear})
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            if (this.actionType === "4") {
              this.dataForm.createDate = res.data.createDate;
            }
            this.hqDepts = res.data.hqDept;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    fileList(files) {
      console.log("11" + files);
      if (
        this.dataForm.attchmentFileInfo &&
        this.dataForm.attchmentFileInfo.length
      ) {
        this.dataForm.attchmentFileInfo.push(...files);
      } else {
        this.dataForm.attchmentFileInfo = files;
      }
      let fileid = [];
      files.forEach(item => {
        fileid.push(item.id);
      });
      this.dataForm.attach = fileid.join(",");
      console.log(this.dataForm.attach);
      this.$forceUpdate();
    },
    //打印处理单
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/printFormDetail",
        query: {
          id: this.id,
          type: 2,
          title: "文件办理单",
          addNewSug: this.isSaved || this.addNewSug,
          numYear:this.numyear
        }
      });
      window.open(routerData.href, "_blank");
    },
    //关闭按钮
    onClose() {
      if (this.actionType === "0" || this.actionType === "4") {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save();
              this.isSaved = true;
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // this.$confirm("是否退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cencelButtonText: "取消"
      // })
      //   .then(() => {
      //     this.$intent.closeWindow(this);
      //   })
      //   .catch(() => {
      //     this.$intent.closeWindow(this);
      //   });
    },
    //保存按钮
    save(val) {
      let _this = this;
      //主流程已经保存过，走更新接口
      apis
        .docHandlingDetailEdit(_this.dataForm)
        .then(res => {
          if (res.code === "SUCCESS") {
            _this.isSaved = true;
            _this.$message({
              type: "success",
              message: "保存成功！"
            });
            if (val) {
              _this.selectOrgAndPerson(val);
            }
          }
        })
        .catch(err => {
          _this.isSaved = false;
          _this.$message({
            type: "error",
            message: err.message.message
          });
        });
    },
    //选人成功-发送下一处理人
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        let id_name = [];
        data &&
          data.map(item => {
            item.id = "" + item.id;
            console.log("item.id", item.id);
            if (item.id.indexOf("#") > -1) {
              // let itemId = item.id.split('#')[0]
              // id_name.push(itemId + '_' + item.name)
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            } else if (item.id.indexOf("#") == -1) {
              // id_name.push(item.id + '_' + item.name)
              chooseDataName.push(item.name);
              let itemId = item.id + "#" + item.deptId;
              chooseDataId.push(itemId);
            }
          });
        // console.log("------选人----", chooseDataName)
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");
        this.dataForm.currentNodeId = params.id;
        this.dataForm.currentNode = params.name;
        apis
          .toNextPerson(this.dataForm)
          .then(res => {
            if (res.code === "SUCCESS") {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$intent.closeWindow(this);
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err.message
            });
          });
      }
    },
    //获取控制域信息
    getControlArea() {
      const that = this;
      const id = this.dataForm.id;
      apis
        .docHandlingDetailControl({
          id: id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            that.flowLinkInfo = res.Fields;
            that.setConfig();
            that.initRules();
          }

          console.log("----liuchenghuanjie---", this.flowLinkInfo);
        });
    },
    //设置控制域
    setConfig() {
      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.flowLinkInfo.requiredFields
      );
      this.readFields = this.setReadFields(
        this.readFields,
        this.flowLinkInfo.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.flowLinkInfo.visibleButtons,
        this.flowLinkInfo.visibleButtonsBycondition
      ); //按钮
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.flowLinkInfo.editedIdeaFields,
        this.flowLinkInfo.editedIdeaFieldsBycondition
      ); //可编辑意见域
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.flowLinkInfo.requiredIdeaFields
      ); //可编辑意见域
      console.log("----rules----", this.editedIdeaFields);
    },
    //发送下一办理人按钮
    send(val) {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          _this.selectOrgAndPerson(val);
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //选择机构人员
    selectOrgAndPerson(val) {
      const _this = this;
      if (val === "发送下一办理人") {
        apis
          .getOrgAndPerson({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.loadingTree = true;
            _this.dialogState = true;
            this.$nextTick(() => {
              _this.seletOptionsData = res.data.list;
            });
          })
          .catch(err => {
            console.log(err);
          });
        _this.dataForm.handleButton = val;
      } else if (val === "流程调度") {
        apis
          .docHandlingGetOrgAndPerson({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.loadingTree = true;
            _this.dialogState = true;
            this.$nextTick(() => {
              _this.seletOptionsData = res.data.list;
            });
          })
          .catch(err => {
            console.log(err);
          });
        _this.dataForm.handleButton = "发送下一办理人";
      } else {
        _this.dataForm.handleButton = val;
        apis
          .toNextPerson(this.dataForm)
          .then(res => {
            if (res.code === "SUCCESS") {
              _this.$intent.closeWindow(this);
              _this.$message({
                type: "success",
                message: "办结完成"
              });
            }
          })
          .catch(err => {
            _this.$message({
              type: "error",
              message: err.message
            });
          });
      }
    },
    //收回
    tackBack() {
      apis
        .docHandlingTackBack({ id: this.dataForm.id,numYear:this.numyear})
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this);
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },

    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .docHandlingCheckFlow({ id: this.dataForm.id,numYear:this.numyear })
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log("查看流程", res);
            _this.showFlowChart = true;
            _this.tableData = res.data;
            _this.$nextTick(() => {
              _this.$refs.dialogLine.openDialog();
            });
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //维护
    maintain() {
      apis
        .editOrMatainanFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //流程调度
    flowDispatch() {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          apis
            .docHandlingDispatch({
              id: _this.dataForm.id
            })
            .then(res => {
              _this.loadingTree = true;
              _this.dialogState = true;
              this.$nextTick(() => {
                _this.seletOptionsData = res.data.list;
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    },
    // 常用批语数据写入
    writelistvalue(data) {
      console.log("常用批语数据写入", this.clickTypes, data);
      if (this.clickTypes && data) {
        const newValue = (this.dataForm[this.clickTypes] || "") + data;
        this.$set(
          this.dataForm,
          this.clickTypes,
          newValue && newValue.length > 500
            ? newValue.substring(0, 500)
            : newValue
        );
      }
    }
  }
};
</script>
  
  <style scoped lang="less" rel="stylesheet/less">
.fileHandleDetail {
  background-color: #ffffff !important;
}
.el-header {
  background-color: rgb(64, 158, 255);
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
.btnstyle {
  color: rgb(14, 117, 214);
}
.btnstyle:hover {
  background-color: rgb(14, 117, 214);
  color: cornsilk;
}
.shiwuTitle {
  width: 100%;
  min-height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.container {
  width: 80%;
  min-height: 920px;
  padding: 20px 16px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.c-header {
  width: 95%;
  margin-left: 5%;
  height: 40px !important;
  margin-bottom: 20px;
  line-height: 40px;
  // border: 1px solid #f9aa21;
  border: 1px solid #f60;
  background: #fef7e7;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.d_b10001 {
  border: 1px solid #ccc;
  padding-left: 15px;
  background-color: #e4e7ed52 !important;
}
.advice {
  word-wrap: break-word;
}
.adviceInfo {
  // position: absolute;
  bottom: 0;
  right: 10px;
}
</style>
  