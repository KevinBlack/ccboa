/**
 * create by lyl on 2020/12/18 16:13
 * 类注释：秘书工作-电话办理单详情
 * 备注：
 */
 <template>
  <div class="fileHandleDetail">
    <div>
      <!-- <i class="el-icon-arrow-left"></i> -->
      <!-- <span class="title">电话办理单</span> -->
      <!-- <div class="btn">
        <template v-if="disabledAll">
          <el-button
            v-for="(item,index) in buttonListDone"
            @click="buttonClick(item.name)"
            :key="index"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>

        <template v-if="!disabledAll">
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
      <div class="headerClick" v-if="disabledAll">
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonListDone"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="item.show"
          plain
        >{{item.name}}</el-button>
      </div>
      <div class="headerClick" v-if="!disabledAll">
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
    <div class="shiwuTitle">{{dataForm.draftOrgan}}电话办理单</div>
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
              <el-input v-model="dataForm.documentNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="createDate">
              <el-input v-model="dataForm.createDate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-input v-model="dataForm.startTime" :disabled="readFields.sTime || disabledAll"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-input v-model="dataForm.endTime" :disabled="readFields.eTime || disabledAll"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="通话单位" prop="title">
              <el-input v-model="dataForm.title" :disabled="readFields.Title || disabledAll"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来电人员" prop="callPle">
              <el-input v-model="dataForm.callPle" :disabled="readFields.callPeople || disabledAll"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来电人员电话" label-width="120px" prop="callTel">
              <el-input v-model="dataForm.callTel" :disabled="readFields.callTel || disabledAll"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="记录人员" prop="creator">
              <el-input v-model="dataForm.creator" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="记录人员电话" label-width="120px" prop="tel">
              <el-input v-model="dataForm.tel" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="通话内容" prop="callContent">
          <el-input
            type="textarea"
            v-model="dataForm.callContent"
            :disabled="readFields.callContent || disabledAll"
          ></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <el-select
            v-model="dataForm.hqDept"
            placeholder="请选择"
            style="width:100%"
            :disabled="readFields.hqDept || disabledAll"
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
            v-if="(dataForm.leaderIdeaList && dataForm.leaderIdeaList.length==0) || !editedIdeaFields.LDidea_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.leaderIdea"
                :disabled="editedIdeaFields.LDidea_1 || disabledAll"
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
                v-if="(dataForm.leaderIdeaList && dataForm.leaderIdeaList.length==0)|| !editedIdeaFields.LDidea_1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.leaderIdea"
                    resize="none"
                    :disabled="editedIdeaFields.LDidea_1 || disabledAll"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.LDidea_1 || disabledAll)"
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
        <!--     处理意见     -->
        <!-- <el-form-item label="处理意见" prop="proIdea">
          <el-row
            v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0) || !editedIdeaFields.Proidea_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.proIdea"
                :disabled="editedIdeaFields.Proidea_1 || disabledAll"
              ></el-input>
            </el-col>
          </el-row>

          <template v-if="dataForm.receiveIdeaList && dataForm.receiveIdeaList.length!=0">
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
            <el-form-item label="处理意见" prop="proIdea">
              <el-row
                v-if="(dataForm.receiveIdeaList && dataForm.receiveIdeaList.length==0)|| !editedIdeaFields.Proidea_1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.proIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Proidea_1 || disabledAll"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.Proidea_1 || disabledAll)"
                  :span="1"
                  style="text-align: right;"
                >
                  <i class="icon-font el-icon-edit select-chang" @click="showWriteList('proIdea')"></i>
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
        <!--     过程意见     -->
        <!-- <el-form-item label="过程意见" prop="processIdea">
          <el-row
            v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0) || !editedIdeaFields.Gcyjidea_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.processIdea"
                :disabled="editedIdeaFields.Gcyjidea_1 || disabledAll"
              ></el-input>
            </el-col>
          </el-row>

          <template v-if="dataForm.processIdeaList && dataForm.processIdeaList.length!=0">
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
                v-if="(dataForm.processIdeaList && dataForm.processIdeaList.length==0)|| !editedIdeaFields.Gcyjidea_1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.processIdea"
                    resize="none"
                    :disabled="editedIdeaFields.Gcyjidea_1 || disabledAll"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.Gcyjidea_1 || disabledAll)"
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
            v-if="(dataForm.deptIdeaList && dataForm.deptIdeaList.length==0) || !editedIdeaFields.zzyj"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.finalIdea"
                :disabled="editedIdeaFields.zzyj || disabledAll"
              ></el-input>
            </el-col>
          </el-row>

          <template v-if="dataForm.deptIdeaList && dataForm.deptIdeaList.length!=0">
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
                v-if="(dataForm.deptIdeaList && dataForm.deptIdeaList.length==0)|| !editedIdeaFields.zzyj"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.finalIdea"
                    resize="none"
                    :disabled="editedIdeaFields.zzyj || disabledAll"
                  ></el-input>
                </el-col>
                <el-col
                  v-if="!(editedIdeaFields.zzyj || disabledAll)"
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
        <!-- <el-form-item label="备注" prop="remark">
          <el-row
            v-if="(dataForm.remarkList && dataForm.remarkList.length==0) ||!editedIdeaFields.Remark_1"
          >
            <el-col :span="24">
              <el-input
                type="textarea"
                :autosize="{minRow:5,maxRow:15}"
                placeholder="填写不可多于500字"
                maxlength="500"
                show-word-limit
                v-model="dataForm.remark"
                :disabled="editedIdeaFields.Remark_1 || disabledAll"
              ></el-input>
            </el-col>
          </el-row>

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
          <template v-if="dataForm.remarkList && dataForm.remarkList.length!=0">
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
        </el-form-item>-->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row
                v-if="(dataForm.remarkDealList && dataForm.remarkDealList.length==0) ||!editedIdeaFields.Remark_1"
              >
                <el-col :span="23">
                  <el-input
                    type="textarea"
                    v-model="dataForm.remark"
                    resize="none"
                    :disabled="editedIdeaFields.Remark_1 || disabledAll"
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
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-row
                v-if="(dataForm.remarkList && dataForm.remarkList.length==0)|| !editedIdeaFields.Remark_1"
              >
                <el-input
                  type="textarea"
                  v-model="dataForm.remark"
                  resize="none"
                  :disabled="editedIdeaFields.Remark_1 || disabledAll"
                ></el-input>
              </el-row>
              <div class="d_flex" v-if="dataForm.remarkList.length!=0">
                <el-row class="d_b100" style="margin: 5px 0;">
                  <el-col
                    v-for="(item, index) in dataForm.remarkList"
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
        </el-row>-->
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
import appendWriteList from "components/viewFlow/perWrit";
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/tree/treeTansun";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/phonenote.js";
import minixs from "@/minixs/index";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
import commonCall from "../minixs/commonCall.js";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "handleDetail",
  components: {
    // uploadFileTs,
    selectPerson,
    checkFlowDialog,
    appendWriteList
  },
  mixins: [minixs, openOrDownLoadFile, commonCall,viewDraft],

  data() {
    return {
      numYear: '',
      handleStateDialog: false,
      showFlowChart: false,
      currentUserId: JSON.parse(localStorage.getItem("userInfo")).humanId, //当前处理人id
      lastOptionTime: 0, //最新意见时间
      isSaved: false,
      loadingTree: false,
      hqDepts: {},
      currentUser: "",
      curDeptName: "",
      humanId: "",
      addNewSug: false,
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
      disabledAll: false,
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
        callContent: "",
        remark: "",
        attachId: "",
        isReadFlag: "",
        remarkList: [],
        receiveIdeaList: [],
        processIdeaList: [],
        leaderIdeaList: [],
        deptIdeaList: []
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      backFlag1: "",
      //流程环节信息
      flowLinkInfo: {},
      buttonListDone: [
        { name: "关闭", type: "close", show: true },
        // { name: "查看办理状态" },
        { name: "收回", type: "tackBack", show: false },
        { name: "查看流程", type: "checkFlow", show: true },
        { name: "打印处理单", type: "printHandleNote", show: true },
        { name: "操作指南", type: "operatorGuide", show: true }
        // { name: "维护", type: "maintain", show: true }
      ],
      buttonList: [
        { name: "关闭", type: "close", show: false },
        { name: "保存", type: "save", show: true },
        { name: "发送下一办理人", type: "toNextPerson", show: false },
        { name: "办结", type: "hqbanjie", show: false },
        { name: "查看流程", type: "checkFlow", show: false },
        { name: "打印处理单", type: "printHandleNote", show: false },
        { name: "操作指南", type: "operatorGuide", show: false },
        { name: "维护", type: "maintain", show: false },
        { name: "流程调度", type: "flowDispatch", show: false }
      ],
      //不可编辑控制域
      readFields: {
        sTime: false, //开始时间
        eTime: false, //结束时间
        Title: false, //通话单位
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false, //日程
        callPeople: false, //来电人员
        callTel: false, //来电人员电话
        Creator: false, //记录人员
        Tel: false, //记录人员电话
        callContent: false //通话内容
      },
      //必填控制域
      requiredFields: {
        sTime: false, //开始时间
        eTime: false, //结束时间
        Title: false, //通话单位
        hqDept: false, //办理部门
        Findex: false, //编号
        attachid: false, //附件ID
        createDate: false, //日程
        callPeople: false, //来电人员
        callTel: false, //来电人员电话
        Creator: false, //记录人员
        Tel: false, //记录人员电话
        callContent: false //通话内容
      },
      //可编辑意见域
      editedIdeaFields: {
        LDidea_1: true, //领导批示
        Proidea_1: true, //处理意见
        Gcyjidea_1: true, //过程意见
        zzyj: true, //最终意见
        Remark_1: true, //备注
        RemarkDeal: true
      },
      //必填意见域
      requiredIdeaFields: {
        LDidea_1: false, //领导批示
        Proidea_1: false, //处理意见
        Gcyjidea_1: false, //过程意见
        zzyj: false, //最终意见
        Remark_1: false, //备注
        RemarkDeal: false
      }
    };
  },
  mounted() {},
  created() {
    const query = this.$route.query || {}
    this.numYear = query.numYear || ''
    this.actionType = this.$route.query.identify;
    if (this.actionType === "2") {
      const operatorGuideIndex = this.buttonListDone.findIndex(
        item => item.type === "operatorGuide"
      );
      if (operatorGuideIndex >= 0)
        this.buttonListDone[operatorGuideIndex].show = false;
    }
    this.curDeptName = JSON.parse(
      localStorage.getItem("userInfo")
    ).firstUnitName;
    this.currentUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
    this.humanId = JSON.parse(localStorage.getItem("userInfo")).humanId;
    this.id = this.$route.query.id;
    this.getDetailIfo();
  },
  methods: {
    //删除意见域
    deleteItem(val) {
      apis
        .adminPhoneNoteDel({ id: val.id })
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
    getFileList() {
      //制发单附件
      this.$api.setSysConfig
        .getTextemList({ id: this.dataForm.parentId, numYear: this.numYear })
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
        startTime: [
          {
            required: this.requiredFields.sTime,
            message: "不能为空",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: this.requiredFields.eTime,
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
        callPle: [
          {
            required: this.requiredFields.callPeople,
            message: "不能为空",
            trigger: "change"
          }
        ],
        callTel: [
          {
            required: this.requiredFields.callTel,
            message: "不能为空",
            trigger: "change"
          }
        ],
        creator: [
          {
            required: this.requiredFields.Creator,
            message: "不能为空",
            trigger: "change"
          }
        ],
        tel: [
          {
            required: this.requiredFields.Tel,
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

        finalIdea: [
          {
            required: this.requiredIdeaFields.zzyj,
            message: "不能为空",
            trigger: "change"
          }
        ],
        leaderIdea: [
          {
            required: this.requiredIdeaFields.LDidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        proIdea: [
          {
            required: this.requiredIdeaFields.Proidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        processIdea: [
          {
            required: this.requiredIdeaFields.Gcyjidea_1,
            message: "不能为空",
            trigger: "change"
          }
        ],
        remark: [
          {
            required: this.requiredIdeaFields.Remark_1,
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
        case "收回":
          this.tackBack();
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
          this.readMe();
          break;
        case "流程调度":
          this.send("流程调度");
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
        case "维护":
          this.maintain();
          break;

        default:
          break;
      }
    },
    //收回
    tackBack() {
      apis
        .phoneHandleTackBack({ id: this.dataForm.id })
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
    //返回上一处理人
    backPerson() {
      apis
        .backPersondhbld({
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
    //获取文件办理单详情

    getDetailIfo() {
      const _this = this;
      const data = {
        id: _this.id,
        btnType: _this.actionType,
        numYear: this.numYear
      };
      apis.phoneHandleDetail(data).then(res => {
        if (res.code === "SUCCESS") {
          _this.dataForm = res.data;
          // const data = res.data
          // _this.dataForm.remarkList = res.remark;
          if (res.remark && res.remark.length > 0) {
            _this.dataForm.remarkList = res.remark.filter(item => {
              _this.lastOptionTime =
                _this.lastOptionTime > item.createTime
                  ? _this.lastOptionTime
                  : item.createTime;
              return item;
            });
          } else {
            _this.dataForm.remarkList = res.remark;
          }
          _this.backFlag1 = res.backFlag1;
          // _this.dataForm.remarkDealList = res.remarkDeal;
          if (res.remarkDeal && res.remarkDeal.length > 0) {
            _this.dataForm.remarkDealList = res.remarkDeal.filter(item => {
              _this.lastOptionTime =
                _this.lastOptionTime > item.createTime
                  ? _this.lastOptionTime
                  : item.createTime;
              return item;
            });
          } else {
            _this.dataForm.remarkDealList = res.remarkDeal;
          }
          // _this.dataForm.receiveIdeaList = res.receiveIdea;
          if (res.receiveIdea && res.receiveIdea.length > 0) {
            _this.dataForm.receiveIdeaList = res.receiveIdea.filter(item => {
              _this.lastOptionTime =
                _this.lastOptionTime > item.createTime
                  ? _this.lastOptionTime
                  : item.createTime;
              return item;
            });
          } else {
            _this.dataForm.receiveIdeaList = res.receiveIdea;
          }
          console.log(res.receiveIdea, "res.receiveIdea");
          // _this.dataForm.processIdeaList = res.processIdea;
          if (res.processIdea && res.processIdea.length > 0) {
            _this.dataForm.processIdeaList = res.processIdea.filter(item => {
              _this.lastOptionTime =
                _this.lastOptionTime > item.createTime
                  ? _this.lastOptionTime
                  : item.createTime;
              return item;
            });
          } else {
            _this.dataForm.processIdeaList = res.processIdea;
          }
          // _this.dataForm.deptIdeaList = res.deptIdea;
          if (res.deptIdea && res.deptIdea.length > 0) {
            _this.dataForm.deptIdeaList = res.deptIdea.filter(item => {
              _this.lastOptionTime =
                _this.lastOptionTime > item.createTime
                  ? _this.lastOptionTime
                  : item.createTime;
              return item;
            });
          } else {
            _this.dataForm.deptIdeaList = res.deptIdea;
          }
          // _this.dataForm.leaderIdeaList = res.leaderIdea;
          if (res.leaderIdea && res.leaderIdea.length > 0) {
            _this.dataForm.leaderIdeaList = res.leaderIdea.filter(item => {
              _this.lastOptionTime =
                _this.lastOptionTime > item.createTime
                  ? _this.lastOptionTime
                  : item.createTime;
              return item;
            });
          } else {
            _this.dataForm.leaderIdeaList = res.leaderIdea;
          }
          if (
            this.dataForm.leaderIdea ||
            this.dataForm.proIdea ||
            this.dataForm.processIdea ||
            this.dataForm.finalIdea ||
            this.dataForm.remark
          ) {
            this.addNewSug = true;
          }
          if (_this.actionType === "0") {
            _this.getControlArea();
            _this.disabledAll = false;
          } else {
            _this.disabledAll = true;
          }

          const userInfo = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : {};
          // 在 已办 时， 判断显示 收回 按钮
          let tackBackIndex = _this.buttonListDone.findIndex(
            item => item.type === "tackBack"
          );

          if (
            _this.actionType === "1" &&
            res.data.isReadFlag === "0" &&
            userInfo.humanCode == this.dataForm.oldUserCode
          ) {
            tackBackIndex >= 0 &&
              _this.$set(_this.buttonListDone, tackBackIndex, {
                ..._this.buttonListDone[tackBackIndex],
                show: true
              });
          } else {
            tackBackIndex >= 0 &&
              _this.$set(_this.buttonListDone, tackBackIndex, {
                ..._this.buttonListDone[tackBackIndex],
                show: false
              });
          }

          _this.getFileList();
        }
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
        path: "/telPrintDetail",
        query: {
          id: this.dataForm.id,
          type: "2",
          addNewSug: this.isSaved || this.addNewSug,
          title: "电话办理单",
          numYear: this.numYear
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
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
        // this.$confirm("是否保存并退出当前页面?", "提示", {
        //   confirmButtonText: "确定",
        //   cencelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        //     this.save();
        //     this.$intent.closeWindow(this);
        //   })
        //   .catch(() => {});
      } else {
        // this.$confirm("是否确认退出当前页面?", "提示", {
        //   confirmButtonText: "确定",
        //   cencelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        this.$intent.closeWindow(this);
        // })
        // .catch(() => {});
      }
    },
    //保存按钮
    save(val) {
      let _this = this;
      //如果已经保存过，走更新接口
      apis
        .phoneHandleSave(_this.dataForm)
        .then(res => {
          console.log(_this.dataForm, "_this.dataForm");
          if (res.code === "SUCCESS") {
            _this.isSaved = true;
            // _this.dataForm.id = res.data;
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
            message: err
          });
        });
    },
    //选人成功-完成并发送/
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
        this.toNextPerson();
      }
    },
    //获取控制域信息
    getControlArea() {
      const id = this.actionType !== "4" ? this.dataForm.id : "";
      apis
        .phoneHandleGetControl({
          id: id
        })
        .then(res => {
          this.flowLinkInfo = res.Fields;
          this.setConfig();
          this.initRules();

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
      console.log("----rules----", this.rules);
    },
    //发送下一办理人、流程调度、办结
    send(val) {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (!_this.dataForm.id) {
            _this.save(val);
          } else {
            _this.selectOrgAndPerson(val);
          }
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //选择机构人员-
    selectOrgAndPerson(val) {
      const _this = this;
      if (val === "流程调度") {
        apis
          .flowDispatchHandle({
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
      } else if (val === "发送下一办理人") {
        _this.dataForm.handleButton = val;
        apis
          .getOrgAndPerson(this.dataForm)
          .then(res => {
            // if (res.code === "SUCCESS") {
            //   _this.seletOptionsData = res.data.list;
            //   _this.treeData = res.data.result.data;
            //   if (res.data.result.message == "Loading") {
            //     _this.loadingTree = true;
            //   } else {
            //     _this.loadingTree = false;
            //   }
            //   _this.dialogState = true;
            // }
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
        _this.dataForm.handleButton = val;
        _this.toNextPerson();
      }
    },
    //发送下一办理人、完成并发送、办结
    toNextPerson() {
      const _this = this;
      apis
        .phoneHandleDoneAndSend(this.dataForm)
        .then(res => {
          if (res.code === "SUCCESS") {
            _this.$message({
              type: "success",
              message: res.msg
            });
            _this.$intent.closeWindow(this);
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //获取办理部门和日期
    getHandleDeps() {
      apis
        .getHandleDeps()
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            this.dataForm.createDate = res.data.createDate;
            this.hqDepts = res.data.hqDept;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .checkFlowHandle({ id: this.dataForm.id, numYear: this.numYear })
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
            message: err
          });
        });
    },

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
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
    //操作指南
    readMe() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "BHGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.dataForm.id,
                    zhengWenState: 0,
                    JYcode: "A08462002",
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
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
            message: err
          });
        });
    },
    //流程调度
    flowDispatch() {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          apis
            .flowDispatch({
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
    //下载
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
// .d_flex {
//   // position: relative;
//       border: 1px solid #ccc;
//     padding-left: 10px;
// }
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
</style>
