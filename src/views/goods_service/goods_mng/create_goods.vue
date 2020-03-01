
/**
新增商品
action
  1 新增
  2修改
  3  查看
  分隔符：/~   Separator
*/
/**
 baseUnit （基本单位）
  '1': '天',
  '2': '天/月',
  '3': '次',
  '4': '个',
  '5': '个/月',
  '6': '月'

type(类型)
  1	生活照料
  2	医疗护理
  3	机构护理
  4	护理器材
  6	保险服务

classification（分类）
  1001	单日套餐（生活照料）
  1002	包月套餐（生活照料）
  2001	单项服务（医疗护理）
  3001	月床位费（机构护理）
  4001	自助餐具（护理器材）
  4002	排泄设备（护理器材）
  4003	起居设备（护理器材）
  4004	洗浴用品（护理器材）
  4005	移动设备（护理器材）
  4006	智能硬件（护理器材）
  6001	健康险（保险服务）
  6002	意外责任险（保险服务）
 */
<template>
  <!-- <div class="app-container"> -->
  <div id="scrollBox" class="ss" style="overflow:auto;height:100%">
    <sticky :z-index="10" class-name="sub-navbar" style="margin-bottom:20px" :sticky-top="130">
      <div class="gray_box">
        <div class="herfTab">
          <div class="float_left tabItem tab_active" @click="returnToView('baseView1',$event)">
            <span>基础信息</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView2',$event)">
            <span>销售信息</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView3',$event)">
            <span>图文信息</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView4',$event)">
            <span>活动/政策补贴</span>
          </div>
          <div class="float_left tabItem" @click="returnToView('baseView5',$event)">
            <span>支付信息</span>
          </div>
          <div class="float_right tabItem">
            <el-checkbox v-model="baseForm.status">立即上架</el-checkbox>
            <!-- <span>立即上架</span> -->
          </div>
        </div>
      </div>
    </sticky>
    <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="100px" class="demo-ruleForm" :disabled="form_disabled">
      <div class="gray_box baseView baseView1">
        <div>
          <h2 class="item_title">基础信息</h2>
          <div class="item_form">
            <!-- <el-form ref="baseForm" :model="baseForm" :rules="baseRules" label-width="100px" class="demo-ruleForm"> -->
            <el-row>
              <el-col :span="12" :xs="24" :sm="10">
                <el-form-item label="商品类型" prop="typeId">
                  <!-- <el-input v-model="baseForm.name" /> -->
                  <el-select v-model="baseForm.typeId" class="wid_320" placeholder="请选择" clearable size="normal" disabled @change="changeType">
                    <el-option v-for="item in goods_type" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="14">
                <el-form-item label="商品分类" prop="categoryId">
                  <!-- <el-input v-model="baseForm.name" class="wid_320" /> -->
                  <el-select v-model="baseForm.categoryId" class="wid_320" placeholder="请选择" clearable size="normal" disabled>
                    <el-option v-for="item in goods_category" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                  <router-link :to="{name:'商品列表',params:{changeType:1}}">
                    <!-- <el-button v-if="this.$route.query.action==1" type="primary" plain size="small" class="marg_20" @click.prevent="changeType()">切换类目</el-button> -->
                    <el-button v-if="this.$route.query.action==1" type="primary" plain size="small" class="marg_20">切换类目</el-button>
                  </router-link>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="18">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="baseForm.name" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="18">
                <el-form-item label="商品描述" prop="description">
                  <el-input v-model="baseForm.description" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="$route.query.action=='2'||$route.query.action=='3'">
              <el-col :xs="24" :sm="18">
                <el-form-item label="商品编号">
                  <el-input v-model="baseForm.code" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="this.$route.query.type!=3">
              <el-col :xs="24" :sm="18">
                <!-- <el-form-item label="服务城市" prop="areaIds">
                  <el-checkbox-group
                    v-model="baseForm.areaIds"
                  >
                    <el-checkbox v-for="(city,index) in cityOptions" :key="index" :label="city.value">{{ city.label }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>-->
                <el-form-item label="服务城市" prop="areaIds">
                  <div v-if="cityOptions.length?true:false">
                    <el-checkbox-group v-model="baseForm.areaIds">
                      <el-checkbox v-for="(city,index) in cityOptions" :key="index" :label="city.cityId+Separator+city.value">{{ city.label }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-else style="color:#FF0000">暂无服务城市~请先配置服务城市</div>

                </el-form-item>
              </el-col>
            </el-row>
            <!-- 基本信息--》机构护理 -->
            <el-row v-if="this.$route.query.type==3">
              <el-col :xs="24" :sm="18">
                <el-form-item label="护理机构" required>
                  <el-row>
                    <el-col :span="12" :xs="24" :sm="6">
                      <el-form-item prop="areaIds">
                        <el-select v-model="baseForm.areaIds" placeholder="请选择" size="small" clearable @change="changeOrganization">
                          <el-option v-for="(city,index) in cityOptions" :key="index" :value="city.cityId+Separator+city.value" :label="city.label">{{ city.label }}</el-option>
                          <!-- <el-option label="杭州" value="3301" />
                          <el-option label="义乌" value="330782" />
                          <el-option label="上海" value="31" />-->
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" :xs="24" :sm="18">
                      <el-form-item prop="pensionAgencyId">
                        <el-select v-model="baseForm.pensionAgencyId" class="org_select" placeholder="请选择养老机构" size="small" clearable>
                          <!-- <el-option label="养老机构一" value="7071778a-5b5f-4a76-bd6f-5807e5efa934" />
                          <el-option label="养老机构二" value="9c63bcb8-8912-417a-94e6-fe60bc200b8f" />
                          <el-option label="养老机构三" value="4a5cd0af-c915-4a6d-8f09-a7798261f80f" />-->
                          <!-- <el-option v-for="(item,index) in orgs" :key="index" :label="item.orgName" :value="item.orgId" /> -->
                          <el-option v-for="(item,index) in orgs" :key="index" :label="item.name" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 销售信息 -->
      <div v-if="this.$route.query.type==1||this.$route.query.type==5" class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">销售信息</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="10">
                <el-form-item label="价格" prop="basePrice">
                  <el-input v-model="baseForm.basePrice" />
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="8" :md="8" :lg="6">
                <!-- <el-form-item label="单位" required>
                  <el-input v-if="this.$route.query.type==1&&this.$route.query.classification==1001" placeholder="天" disabled>天</el-input>
                  <el-input v-if="this.$route.query.type==1&&this.$route.query.classification==1002" placeholder="月" disabled>月</el-input>
                  <el-input v-if="this.$route.query.type==1&&this.$route.query.classification==1003" placeholder="次" disabled>次</el-input>
                  <el-input v-if="this.$route.query.type==5&&this.$route.query.classification==5001" placeholder="月" disabled>月</el-input>
                </el-form-item>-->
                <el-form-item label="单位" required>
                  <el-input :value="baseUnitMap[baseForm.baseUnit]" disabled>{{ baseUnitMap[baseForm.baseUnit] }}</el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 保险服务 -->
      <div v-if="this.$route.query.type==6" class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">销售信息</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="10">
                <el-form-item label="价格" prop="basePrice">
                  <el-input v-model="baseForm.basePrice" />
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="8" :md="8" :lg="6">
                <!-- <el-form-item label="单位" required>
                  <el-input v-if="this.$route.query.type==1&&this.$route.query.classification==1001" placeholder="天" disabled>天</el-input>
                  <el-input v-if="this.$route.query.type==1&&this.$route.query.classification==1002" placeholder="月" disabled>月</el-input>
                  <el-input v-if="this.$route.query.type==1&&this.$route.query.classification==1003" placeholder="次" disabled>次</el-input>
                  <el-input v-if="this.$route.query.type==5&&this.$route.query.classification==5001" placeholder="月" disabled>月</el-input>
                </el-form-item>-->
                <el-form-item label="单位" required>
                  <el-input :value="baseUnitMap[baseForm.baseUnit]" disabled>{{ baseUnitMap[baseForm.baseUnit] }}</el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 医疗护理 -->
      <div v-if="this.$route.query.type==2" class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">销售信息/医疗护理</h2>
          <div class="item_form">
            <el-row>
              <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="10">
                <el-form-item label="价格" prop="basePrice">
                  <el-input v-model="baseForm.basePrice" />
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="单位" required>
                  <el-input :value="baseUnitMap[baseForm.baseUnit]" disabled>{{ baseUnitMap[baseForm.baseUnit] }}</el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 机构护理 -->
      <div v-if="this.$route.query.type==3" class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">销售信息/护理机构</h2>
          <div class="item_form">
            <el-row v-for="(item,index) in org_bed_info" :key="index">
              <el-col :span="6" :xs="12" :sm="12" :md="6" :lg="6">
                <el-form-item label="床位规格" required>
                  <el-input v-model="item.bedSpec" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :xs="12" :sm="12" :md="6" :lg="6">
                <el-form-item label="价格" required>
                  <el-input v-model="item.price" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :xs="12" :sm="12" :md="6" :lg="6">
                <el-form-item label="单位" required>
                  <!-- <el-input v-model="item.one" placeholder="月" disabled>月</el-input> -->
                  <el-input :value="baseUnitMap[item.unit]" disabled>{{ baseUnitMap[item.unit] }}</el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :xs="12" :sm="12" :md="6" :lg="6">
                <el-form-item label>
                  <el-button type="primary" plain size="mini" @click.prevent="add_bed_info(index)">添加</el-button>
                  <el-button v-if="index!=0" type="primary" plain size="mini" @click.passive="remove_bed_info(index)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 护理器材 -->
      <div v-if="this.$route.query.type==4" class="gray_box baseView baseView2">
        <div>
          <h2 class="item_title">销售信息/护理器材</h2>
          <div class="item_form">
            <el-row>
              <el-row>
                <el-checkbox v-model="hasPrice">售价</el-checkbox>
              </el-row>
              <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="10">
                <el-form-item label="价格" prop="salePrice">
                  <el-input v-model="baseForm.salePrice" />
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="单位" required>
                  <el-input disabled :value="baseUnitMap['4']" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 租金 -->
            <el-row>
              <el-row>
                <el-checkbox v-model="hasRent">租金</el-checkbox>
              </el-row>
              <el-col :span="12" :xs="24" :sm="10" :md="10" :lg="10">
                <el-form-item label="价格" prop="rentPrice">
                  <el-input v-model="baseForm.rentPrice" />
                </el-form-item>
              </el-col>
              <el-col :span="12" :xs="24" :sm="8" :md="8" :lg="6">
                <el-form-item label="单位" required>
                  <el-input disabled :value="baseUnitMap['5']" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="gray_box baseView baseView3">
        <div>
          <h2 class="item_title">图文信息</h2>
          <div v-if="false" class="item_form">
            <el-row>
              <el-form-item label="缩略图" style="margin-bottom:0">
                <el-col>
                  <div class="avatar-uploader">
                    <div class="el-upload el-upload--text listImgBox">
                      <i v-if="!listImg" class="el-icon-plus avatar-uploader-icon" />
                      <img v-else :src="listImg" alt style="width:110px;height:100px">
                    </div>
                  </div>
                </el-col>
                <my-upload v-if="false" v-model="show" field="img" :width="220" :height="200" img-format="png" :size="size" @src-file-set="srcFileSet" @crop-success="cropSuccess" />
              </el-form-item>
            </el-row>
          </div>
          <div class="item_form">
            <el-row>
              <el-form-item label="列表缩略图" prop="listPic" label-width="120px">
                <el-col>
                  <span>图片单张大小不超过3M，图片规格至少大于330*300</span>
                </el-col>
                <el-col style="position:relative;over-flow:hidden">
                  <div class="uploader-box-div">
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess_1" :on-progress="handleProgress_1" :before-upload="beforeAvatarUpload_1" :http-request="picUpload_1">
                      <i v-if="!thumbnail.url" slot="default" class="el-icon-plus avatar-uploader-icon" />
                      <!-- <el-progress v-if="upLoadFlage==true&&!item.url" type="circle" :percentage="upLoadImgPercentage" /> -->
                      <div v-if="thumbnail.url" class="slotBox" @click="clickStop">
                        <img class="el-upload-list__item-thumbnail" :src="thumbnail.url" alt style="width:100%;height:100%">
                        <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-preview" @click="handlePicturePreview(-1)">
                            <i class="el-icon-zoom-in" />
                          </span>
                          <!-- <span class="el-upload-list__item-preview" @click="handleDownload(index)">
                                  <i class="el-icon-download" />
                                </span>-->
                          <span v-if="($route.query.action=='2'||$route.query.action=='1')" class="el-upload-list__item-preview" @click="handleRemove(-1)">
                            <i class="el-icon-delete" />
                          </span>
                        </span>
                      </div>
                    </el-upload>
                  </div>
                </el-col>
              </el-form-item>
            </el-row>
          </div>
          <div class="item_form">
            <div class="pic_group">
              <el-row>
                <el-form-item label="图片" style="margin-bottom:0" prop="picInfo">
                  <el-col>
                    <span>图片单张大小不超过3M，图片规格至少大于750*360</span>
                  </el-col>
                  <el-col style="position:relative;over-flow:hidden">
                    <!-- v-for 循环 -->
                    <div v-for="(item,index) in productImages" :key="index" class="uploader-box-div" @click="getImgIndex(index)">
                      <!-- <el-upload
                        :key="index"
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :file-list="item.file"
                        :on-preview="handlePicturePreview"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                        :on-progress="handleProgress"
                        :before-upload="beforeAvatarUpload"
                        :http-request="picUpload"
                        :disabled="$route.query.action==3?true:false"
                      >
                        <i v-if="index==0" style="position:absolute;top:0;left:0;display:inline-block;width:100%;background:rgb(0,0,0,0.3);height:30px;line-height:30px;color:white;font-style:normal">主图</i>
                        <img v-if="item.url" :src="item.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>-->
                      <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :on-progress="handleProgress" :before-upload="beforeAvatarUpload" :http-request="picUpload">
                        <i v-if="index==0" style="position:absolute;z-index:1;top:0;left:0;display:inline-block;width:100%;background:rgb(0,0,0,0.3);height:30px;line-height:30px;color:white;font-style:normal">主图</i>
                        <i v-if="!item.url" slot="default" class="el-icon-plus avatar-uploader-icon" />
                        <!-- <el-progress v-if="upLoadFlage==true&&!item.url" type="circle" :percentage="upLoadImgPercentage" /> -->
                        <div v-if="item.url" class="slotBox" @click="clickStop">
                          <img class="el-upload-list__item-thumbnail" :src="item.url" alt style="width:100%;height:100%">
                          <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePicturePreview(index)">
                              <i class="el-icon-zoom-in" />
                            </span>
                            <!-- <span class="el-upload-list__item-preview" @click="handleDownload(index)">
                              <i class="el-icon-download" />
                            </span>-->
                            <span v-if="($route.query.action=='2'||$route.query.action=='1')" class="el-upload-list__item-preview" @click="handleRemove(index)">
                              <i class="el-icon-delete" />
                            </span>
                          </span>
                        </div>
                      </el-upload>
                      <el-dialog :visible.sync="picturePreviewDialog" width="500px">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                    </div>
                  </el-col>
                </el-form-item>
              </el-row>
            </div>
          </div>
          <div class="item_form">
            <el-row>
              <el-form-item label="被调用的文本编辑器图片上传" style="display:none;">
                <el-upload id="changeQuillImage" class="avatar-uploader avatar-uploader1" action="#" :show-file-list="false" :on-success="getImageSuccessTest" :on-progress="imgOnProgress" :before-upload="beforeAvatarUploadTest" :http-request="fnUploadRequestTest">
                  <!-- <img v-if="ruleForm.tradingCertificate" :src="ruleForm.tradingCertificate" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
                </el-upload>
              </el-form-item>
              <el-form-item label="图文详情" prop="richContent">
                <div v-loading="contentLoading" class="edit_container" style="width:60%">
                  <quill-editor ref="myQuillEditor" v-model="productDetail.content" class="ql-editor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" />
                </div>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
      <div class="gray_box baseView baseView4">
        <div>
          <h2 class="item_title">政策补贴</h2>
          <div class="item_form">
            <el-row v-if="this.$route.query.type==5">
              <el-form-item label="活动/政策补贴" prop="policySubsidyId" label-width="130px">
                <el-col>
                  <el-checkbox v-model="checked" style="width:200px">义乌长护险项目支付标准</el-checkbox>
                  <el-button type="text" @click.prevent="policyDetail(1)">查看政策详情</el-button>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row v-else>
              <!-- 政策补贴旧方式 -->
              <!-- <el-form-item label="活动/政策补贴" prop="policySubsidyId" label-width="130px">
                <ul
                  v-infinite-scroll="loadPolicy"
                  class="infinite-list"
                  style="height:200px;width:60%;overflow-y:auto"
                >
                  <li
                    v-for="(item,index) in policy"
                    :key="index"
                    class="el-col el-col-24 infinite-list-item"
                  >
                    <el-checkbox
                      v-model="item.checked"
                      class="wid_110"
                      style="width:300px"
                    >{{ item.name }}</el-checkbox>
                    <el-button type="text" @click.prevent="policyDetail(item.name,index)">查看政策详情</el-button>
                  </li>
                </ul>
                <div style="height:50px;padding-top:10px">
                  <p v-if="loadPolicyAction">加载中...</p>
                  <p v-if="loadPolicyNoMore">没有更多了...</p>
                </div>
              </el-form-item> -->

              <el-form-item label="活动/政策补贴" prop="policySubsidyId" label-width="130px">
                <div v-if="policy.length>0?true:false">
                  <ul v-infinite-scroll="loadPolicy" class="infinite-list" style="height:200px;width:60%;overflow-y:auto">
                    <li v-for="(item,index) in policy" :key="index" class="el-col el-col-24 infinite-list-item">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox :key="index" :label="item.id" style="width:300px"> {{ item.name }}</el-checkbox>
                        <el-button type="text" @click.prevent="policyDetail(item.name,index)">查看政策详情</el-button>
                      </el-checkbox-group>
                    </li>
                  </ul>
                  <div style="height:50px;padding-top:10px">
                    <p v-if="loadPolicyAction">
                      <!-- 加载中... -->
                      <i class="el-icon-loading" style="font-size:25px" />
                    </p>
                    <p v-if="loadPolicyNoMore">加载完毕...</p>
                  </div>
                </div>
                <div v-else>

                  <span style="color:#C0C4CC"> 暂无</span>
                </div>

              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
      <div class="gray_box baseView baseView5">
        <div>
          <h2 class="item_title">支付信息</h2>
          <div class="item_form">
            <el-row>
              <el-form-item label="支付方式" prop="payType">
                <el-col>
                  <el-radio v-model="baseForm.payType" label="1">在线支付</el-radio>
                </el-col>
                <el-col>
                  <el-radio v-model="baseForm.payType" label="2">预约</el-radio>
                  <span>预约费用</span>
                  <el-input v-model="baseForm.appointmentFee" style="width:120px" placeholder size="small" />
                </el-col>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
      <div v-show="($route.query.action=='2'||$route.query.action=='1')&&returnBotton==false" class="gray_box">
        <div>
          <h2 v-show="false" class="item_title">BAR</h2>
          <div class="item_form">
            <el-row>
              <el-form-item style="margin-bottom:0px">
                <el-button size="small" @click.prevent="onCancle">取消</el-button>
                <el-button size="small" type="primary" @click.prevent="onSubmit('baseForm')">确定</el-button>
              </el-form-item>
            </el-row>
          </div>
        </div>
      </div>
    </el-form>
    <div v-show="$route.query.action=='3'||returnBotton" class="gray_box">
      <div>
        <div class="item_form">
          <el-row>
            <!-- <el-form-item style="margin-bottom:0px"> -->
            <router-link :to="{path:'/goods_service/goods_mng/goods_list'}">
              <el-button size="small" type="primary">返回</el-button>
            </router-link>
            <!-- </el-form-item> -->
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "babel-polyfill"; // es6 shim
import myUpload from 'vue-image-crop-upload'
import Sticky from '@/components/Sticky'
import MinXin from '@/components/MiXins'
import { Debounce } from '@/utils/public'
import client from '@/utils/ali-oss.js'
import { dateFormat } from '@/utils/dateFormat.js'
import {
  searchOneGood,
  submitGoods,
  updateGoods,
  organizationsList
} from '@/api/goods'
import { searchCity } from '@/api/city'
import { loadByOrgType } from '@/api/employee.js'
import { policySearch } from '@/api/subsidyschemes'
import { Promise } from 'q'
import { isString } from 'util'

const Separator = '/~'
const cityOptions = [
  {
    label: '杭州',
    value: '3301'
  },
  {
    label: '义乌',
    value: '330782'
  },
  {
    label: '上海',
    value: '31'
  }
]
const bedInfo = { bedSpec: '', price: '111', unit: '6' }
const baseUnitMap = {
  '1': '天',
  '2': '天/月',
  '3': '次',
  '4': '个',
  '5': '个/月',
  '6': '月'
}
const ali_oss_path = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/'
const organizationsListData = {
  filters: [],
  numberPerPage: 20,
  currentPage: 1,
  sortList: [
    {
      columnName: 'Id',
      sortOrder: 0
    }
  ]
}
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ direction: 'rtl' }], // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ font: [] }], // 字体种类
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ align: [] }], // 对齐方式
  ['link', 'image'] // 链接、图片
  // ['clean'] // 清除文本格式
]
export default {
  name: 'CreateGoods',
  components: {
    Sticky,
    'my-upload': myUpload
  },
  mixins: [MinXin],
  data() {
    var picInfoValidate = (rule, value, callback) => {
      // console.log(this.imageUrl)
      const arr = this.productImages.some(item => {
        return item.url !== ''
      })
      if (arr && this.productImages[0].url !== '') {
        callback()
      } else {
        return callback(new Error('至少上传一张主图'))
      }
    }
    var richContentValidate = (rule, value, callback) => {
      if (this.productDetail.content !== '') {
        callback()
      } else {
        return callback(new Error('请填写图文详情！'))
      }
    }
    var listPicValidate = (rule, value, callback) => {
      // console.log(this.imageUrl)
      if (this.thumbnail && this.thumbnail.url !== '') {
        callback()
      } else {
        return callback(new Error('列表缩略图必传'))
      }
    }
    var cityValidate = (rule, value, callback) => {
      if (this.baseForm.areaIds && this.baseForm.areaIds.length) {
        callback()
      } else {
        return callback(new Error('至少选择一个服务城市'))
      }
    }
    var policyValidate = (rule, value, callback) => {
      if (this.checkList.length > 0) {
        callback()
      } else {
        return callback(new Error('至少选择一种政策补贴'))
      }
    }
    var payTypeValidate = (rule, value, callback) => {
      if (
        this.baseForm.payType === '2' &&
        this.baseForm.appointmentFee === ''
      ) {
        return callback(new Error('请输入预约费用'))
      } else {
        callback()
      }
    }

    var salePriceValidate = (rule, value, callback) => {
      const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (this.hasPrice) {
        if (this.baseForm.salePrice == '') {
          return callback(new Error('售价不能为空！'))
        }
        if (!reg.test(this.baseForm.salePrice)) {
          return callback(new Error('精确到两位小数'))
        }
        callback()
      } else {
        callback()
      }
    }
    var rentPriceValidate = (rule, value, callback) => {
      const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (this.hasRent) {
        if (this.baseForm.rentPrice == '') {
          return callback(new Error('租金不能为空！'))
        }
        if (!reg.test(this.baseForm.rentPrice)) {
          return callback(new Error('精确到两位小数'))
        }
        callback()
      } else {
        callback()
      }
    }
    var basePriceValidate = (rule, value, callback) => {
      const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (this.baseForm.basePrice == '') {
        return callback(new Error('租金不能为空！'))
      }
      if (!reg.test(this.baseForm.basePrice)) {
        return callback(new Error('精确到两位小数'))
      }
      callback()
    }
    return {
      checkList: [], // 勾选中的政策补贴
      Separator,
      organizationsListData,
      form_disabled: false,
      listImg: '',
      show: false,
      size: 1.1,
      disabled: false,
      uploadDisabled: false, // 图片上传禁用
      // isOnline: true,
      baseUnitMap: baseUnitMap,
      cityOptions,
      checked: false,
      handleChange: false,
      orgs: [
        // {
        //   'orgName': '怡乐新村',
        //   'orgId': '7071778a-5b5f-4a76-bd6f-5807e5efa934'
        // },
        // {
        //   'orgName': '义乌康乐园',
        //   'orgId': '9c63bcb8-8912-417a-94e6-fe60bc200b8f'
        // }
      ],
      loadPolicyAction: false,
      loadPolicyNoMore: false,
      policyInfo: {
        currentPage: 1,
        numberPerPage: 10
      },
      policy: [
        // {
        //   checked: false,
        //   id: "08d72767-6a5f-c623-7658-f1c6318dcd2b",
        //   index: "1,长护险政策",
        //   name: "长护险政策补贴"
        // },
        // {
        //   checked: false,
        //   id: "8f01820c-f068-4e29-abe8-f19948460652",
        //   index: "2",
        //   name: "民政政策补贴"
        // },
        // {
        //   checked: false,
        //   id: "3",
        //   index: "3",
        //   name: "残联政策补贴"
        // },
        // {
        //   checked: false,
        //   id: "4",
        //   index: "4",
        //   name: "卫健委政策补贴"
        // }
      ],
      baseForm: {
        status: true,
        name: '',
        typeId: '',
        categoryId: '',
        description: '',
        code: '',
        areaIds: [],
        // areaIds: '',
        areaCodes: '',
        pensionAgencyId: '',
        basePrice: '',
        baseUnit: '',
        appointmentFee: '',
        payType: '1',
        policySubsidyId: '',
        salePrice: '',
        rentPrice: ''
      },
      baseRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        picInfo: [
          { required: true, validator: picInfoValidate, trigger: 'change' }
        ],
        richContent: [
          { required: true, validator: richContentValidate, trigger: 'change' }
        ],
        listPic: [
          { required: true, validator: listPicValidate, trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入商品编码', trigger: 'blur' }],
        areaIds: [
          {
            required: true,
            validator: cityValidate,
            trigger: ['change', 'blur']
          }
        ],
        areaCodes: [
          { required: true, message: '选择服务城市', trigger: 'change' }
        ],
        pensionAgencyId: [
          { required: true, message: '请选择护理机构', trigger: 'change' }
        ],
        basePrice: [
          { required: true, validator: basePriceValidate, trigger: 'blur' }
        ],
        policySubsidyId: [
          // { required: true, validator: policyValidate, trigger: 'change' }
          { required: false, trigger: 'change' }
        ],
        payType: [
          { required: true, validator: payTypeValidate, trigger: 'change' }
        ],
        salePrice: [
          { required: true, validator: salePriceValidate, trigger: 'blur' }
        ],
        rentPrice: [
          { required: true, validator: rentPriceValidate, trigger: 'blur' }
        ]
      },
      // 图文详情
      content: '',
      contentLoading: false,
      productDetail: {
        // 商品内容对象
        content: ''
      },
      // 列表缩略图
      thumbnail: {
        name: '',
        url: '',
        isPrimary: true
      },
      productImages: [
        {
          name: '图一',
          url: '',
          isPrimary: false
        },
        {
          name: '图2',
          url: '',
          isPrimary: false
        },
        {
          name: '图3',
          url: '',
          isPrimary: false
        },
        {
          name: '图4',
          url: '',
          isPrimary: false
        }
      ],
      imgIndex: '',
      // payType: '1',
      // order: '',
      // appointmentFee: '',
      // imageUrl: '',
      goods_type: [
        {
          value: '1',
          label: '生活照料'
        },
        {
          value: '2',
          label: '医疗护理'
        },
        {
          value: '3',
          label: '机构护理'
        },
        {
          value: '4',
          label: '护理器材'
        },
        {
          value: '5',
          label: '长护险护理包'
        },
        {
          value: '6',
          label: '保险服务'
        }
      ],
      goods_category: [
        {
          value: '1001',
          label: '单日套餐'
        },
        {
          value: '1002',
          label: '包月套餐'
        }
      ],
      org_bed_info: [
        {
          bedSpec: 'A间',
          price: '1500',
          unit: '6'
        },
        {
          bedSpec: 'B间',
          price: '1600',
          unit: '6'
        },
        {
          bedSpec: 'C间',
          price: '1700',
          unit: '6'
        },
        {
          bedSpec: 'D间',
          price: '1800',
          unit: '6'
        },
        {
          bedSpec: 'E间',
          price: '1900',
          unit: '6'
        }
      ],
      hasPrice: true,
      hasRent: false,
      editorOption: {
        modules: {
          // theme: 'snow',
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  let action = '3'
                  const query = window.location.href.split('?')[1]
                  const query_arr = query.split('&')
                  query_arr.forEach((item, index) => {
                    if (item.split('=')[0] == 'action') {
                      action = item.split('=')[1]
                    }
                  })
                  if (action == '1' || action == '2') {
                    document.querySelector('#changeQuillImage input').click()
                  } else {
                    this.quill.format('image', false)
                  }
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      returnBotton: false,
      upLoadFlage: false, // 上传进度条标记
      upLoadImgPercentage: 0,
      dialogImageUrl: '',
      picturePreviewDialog: false,
      suoluetu: {
        name: '缩略图',
        url: '',
        isPrimary: false
      },
      action: '1'
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  // computed: {
  // },
  watch: {
    'baseForm.typeId': {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal)
        this.watchType(newVal)
        if (!this.handleChange) {
          // 是否为手动切换分类
          this.baseForm.categoryId = this.$route.query.classification
        }
      },
      immediate: true,
      deep: true
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {
    this._policySearch()
    this._searchCity()
    this._judge()
    // console.log(this.$route)
    // console.log(this.productImages)
    if (document.getElementById('scrollBox')) {
      document
        .getElementById('scrollBox')
        .addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    }
    this._quillDisable()
    this.baseForm.typeId = this.$route.query.type // 商品类型
    if (this.$route.query.action == 1) {
      switch (
        this.$route.query.classification // 根据商品分类字典，渲染单位
      ) {
        case '1001':
          this.baseForm.baseUnit = '1'
          break
        case '1003':
          this.baseForm.baseUnit = '3'
          break
        case '2001':
          this.baseForm.baseUnit = '3'
          break
        default:
          this.baseForm.baseUnit = '6'
      }
    }
    this.$refs['baseForm'].clearValidate()
    // console.log(this.$refs['baseForm'])
    // ----------------------------
  },
  destroyed: function() {
    if (document.getElementById('scrollBox')) {
      document
        .getElementById('scrollBox')
        .removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    }
  },
  methods: {
    loadByOrgType() {
      loadByOrgType().then(res => {
        if (res.resultCode == '000000' && res.data) {
          this.orgs = res.data
        } else {
          this.$message.error('渲染机构失败！')
        }
      })
    },
    _organizationsList(data) {
      organizationsList(data).then(res => {
        console.log(res.data)
        this.orgs = res.data
      })
    },
    _policySearch() {
      const data = {
        numberPerPage: this.policyInfo.numberPerPage,
        currentPage: this.policyInfo.currentPage,
        productTypes: [Number(this.$route.query.type)],
        sortList: [
          {
            columnName: 'Id',
            sortOrder: 1
          }
        ]
        // "filters": [
        //   {
        //     "key": "typeId",
        //     "value": 1
        //   }
        // ]
      }
      this.loadPolicyAction = true
      this.loadPolicyNoMore = false
      policySearch(data)
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.policy = this.policy.concat(res.data)
            this.loadPolicyAction = false
          } else {
            this.loadPolicyAction = false
            this.loadPolicyNoMore = true
          }
          // if (!this.policy.length) {
          //   this.$message.warning('未获取到政策补贴~')
          // }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('远程获取政策列表失败！')
        })
    },
    _searchCity() {
      const data = {
        filters: [
          {
            filterLogic: 1,
            key: 'CityLevel',
            value: '1'
          },
          {
            filterLogic: 1,
            key: 'CityLevel',
            value: '2'
          }
        ],
        numberPerPage: 20,
        currentPage: 1,
        sortList: [
          {
            columnName: 'Id',
            sortOrder: 0
          }
        ]
      }
      searchCity(data)
        .then(res => {
          // if (res.data && res.data.length) {
          if (res.data) {
            const array = res.data
            array.forEach((item, index) => {
              item.value = item.cityCode
              item.label = item.name
              item.cityId = item.id
            })
            this.cityOptions = array
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getImgIndex(index) {
      this.imgIndex = index
    },
    changeType() {
      // this.$message.success('切换分类')
      this.handleChange = true
      this.baseForm.categoryId = ''
    },
    changeOrganization(val) {
      this.baseForm.pensionAgencyId = ''
      if (val && val.indexOf(Separator)) {
        const cityCode = val.split(Separator)[1]
        const filterOrganizationData = {
          filters: [
            {
              key: 'CityCode',
              filterType: 0,
              value: cityCode
            }
          ],
          numberPerPage: 20,
          currentPage: 1,
          sortList: [
            {
              columnName: 'Id',
              sortOrder: 0
            }
          ]
        }
        this._organizationsList(filterOrganizationData)
      }
    },
    watchType(event) {
      // console.log(event)
      switch (event) {
        case '1':
          this.goods_category = [
            {
              value: '1001',
              label: '单日套餐'
            },
            {
              value: '1002',
              label: '包月套餐'
            },
            {
              value: '1003',
              label: '单项服务'
            }
          ]
          break
        case '2':
          this.goods_category = [
            {
              value: '2001',
              label: '单次服务'
            }
          ]
          break
        case '3':
          this.goods_category = [
            {
              value: '3001',
              label: '月床位费'
            }
          ]
          break
        case '4':
          this.goods_category = [
            {
              value: '4001',
              label: '自助餐具'
            },
            {
              value: '4002',
              label: '排泄设备'
            },
            {
              value: '4003',
              label: '起居设备'
            },
            {
              value: '4004',
              label: '洗浴用品'
            },
            {
              value: '4005',
              label: '移动设备'
            },
            {
              value: '4006',
              label: '智能硬件'
            }
          ]
          break
        case '6':
          this.goods_category = [
            {
              value: '6001',
              label: '健康险'
            },
            {
              value: '6002',
              label: '意外责任险'
            }
          ]
          break
        case '5':
          this.goods_category = [
            {
              value: '5001',
              label: '护理项目'
            }
          ]
      }
    },
    policyDetail(val) {
      alert(val)
    },
    add_bed_info(index) {
      this.org_bed_info.push(bedInfo)
    },
    remove_bed_info(index) {
      this.org_bed_info.splice(index, 1)
    },
    onCancle() {
      this.$router.push({ path: `/goods_service/goods_mng/goods_list` })
    },
    onSubmit: Debounce(function(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(this.productDetail)
        // console.log(this.productImages)
        // console.log(this.baseForm)
        const formInfo = this.beforeSubmit(
          this.baseForm.typeId,
          this.baseForm.categoryId
        )
        console.log(formInfo)
        if (valid) {
          // this.$message.success('表单提交')
          if (this.$route.query.action == '1') {
            // 新增
            // this.$message.success('请求新增接口')
            // const data = {
            //   'data': formInfo,
            //   'correlationId': '369c0bde-350b-4870-b8f5-2a6a8faf789b',
            //   'invokingUser': '98a0762b-730a-4eac-b46c-51cdb523a15c',
            //   'businessProcessName': 'ProductSearchService'
            // }
            const data = formInfo
            submitGoods(data).then(response => {
              // console.log(response)
              this.$message.success('商品信息保存成功')
              this.returnBotton = true
            })
          }
          if (this.$route.query.action == '2') {
            // 修改
            // this.$message.success('请求修改接口')
            // const data = {
            //   'data': formInfo,
            //   'correlationId': '369c0bde-350b-4870-b8f5-2a6a8faf789b',
            //   'invokingUser': '98a0762b-730a-4eac-b46c-51cdb523a15c',
            //   'businessProcessName': 'ProductSearchService'
            // }
            const data = formInfo
            updateGoods(data).then(response => {
              // console.log(response)
              this.$message.success('商品信息修改成功')
              this.returnBotton = true
              // this.$router.push('/goods_service/goods_mng/goods_list')
            })
          }
          // console.log(this.baseForm)
        } else {
          this.$message.error('表单填写不合法')
          // console.log(this.baseForm)
          return false
        }
      })
    }, 500),
    beforeSubmit(typeId, categoryId) {
      console.log(typeId, categoryId)
      console.log(this.checkList)
      console.log(this.policy)

      const productSubsidySchemes = []
      // 填充政策补贴names
      const policySubsidyNames = []
      this.checkList.forEach((item, index) => {
        this.policy.forEach((item2, index2) => {
          if (item == item2.id) {
            policySubsidyNames.push(item2.name)
            productSubsidySchemes.push({
              subsidySchemeId: item2.id,
              subsidySchemeName: item2.name
            })
          }
        })
      })
      const policyData = JSON.parse(JSON.stringify(this.policy))
      // 获取政策补贴
      // let policyInfo= this._getCheckedPolicy(policyData)//弃用
      if (!this.baseForm.code) {
        // this.baseForm.code = (new Date()).valueOf()
        this.baseForm.code = this.guid()
      }
      const transForm = JSON.parse(JSON.stringify(this.baseForm))

      // 赋值政策补贴Ids
      // transForm.policySubsidyId= policyInfo.policySubsidyId
      // transForm.policySubsidyNames=policySubsidyNames.join(',')
      // transForm.policySubsidyId= this.checkList.join(',')//政策补贴格式调整，弃用

      // if(!productSubsidySchemes.length){
      //   productSubsidySchemes=''
      // }
      transForm.productSubsidySchemes = productSubsidySchemes

      delete transForm.policySubsidyId
      delete transForm.salePrice
      delete transForm.rentPrice
      const pathTree = [transForm.typeId, transForm.categoryId]
      transForm.categoryTreePath = pathTree.join(',')
      // 商品立即上架
      if (this.baseForm.status === true) {
        transForm.status = 2
      } else {
        transForm.status = 0
      }

      if (transForm.payType == 1) {
        // 判断商品支付类型
        delete transForm.appointmentFee
      } else {
        transForm.appointmentFee = this.baseForm.appointmentFee
      }
      // 图文详情(富文本)
      transForm.productDetail = this.productDetail
      // 图片列表
      let emptyImgCount = 0
      const conArray = []
      conArray.push(this.thumbnail)
      transForm.productImages = conArray
      transForm.productImages = transForm.productImages.concat(JSON.parse(JSON.stringify(this.productImages)))
      // transForm.productImages = JSON.parse(JSON.stringify(this.productImages))
      // transForm.productImages = transForm.productImages.concat(conArray)
      console.log(transForm.productImages)
      for (const index in transForm.productImages) {
        if (transForm.productImages[index].url == '') {
          emptyImgCount++
          delete transForm.productImages[index]
        }
      }
      transForm.productImages.length = 5 - emptyImgCount
      // ---------------------------------------------------------------
      // 分割areaIds和areaCodes
      const productAreas = []
      const array1 = []
      const array2 = []
      let temp = []
      if (
        typeId == 1 ||
        typeId == 2 ||
        typeId == 4 ||
        typeId == 5 ||
        typeId == 6
      ) {
        // 绑定的areaIds数据类型为Array
        if (transForm.areaIds) {
          transForm.areaIds.forEach((item, index) => {
            if (item.indexOf(Separator)) {
              temp = item.split(Separator)
              array1.push(temp[0])
              array2.push(temp[1])
              productAreas.push({
                areaId: temp[0],
                areaCode: temp[1]
                // 'areaName':temp[2]
              })
            } else {
              console.log('地区areaId/areaCode分割方式不正确！')
            }
          })
        } else {
          console.log('绑定的数据为空')
        }
      } else {
        if (transForm.areaIds.indexOf(Separator)) {
          temp = transForm.areaIds.split(Separator)
          array1.push(temp[0])
          array2.push(temp[1])
          productAreas.push({
            areaId: temp[0],
            areaCode: temp[1]
            // 'areaName':temp[2]
          })
        }
      }

      transForm.areaIds = array1
      transForm.areaCodes = array2

      transForm.areaIds = transForm.areaIds.join(',')
      transForm.areaCodes = transForm.areaCodes.join(',')

      delete transForm.areaCodes
      delete transForm.areaIds

      transForm.productAreas = JSON.parse(JSON.stringify(productAreas))
      // 判断商品类型
      if (typeId == 1 || typeId == 2 || typeId == 6 || typeId == 5) {
        // delete transForm.areaCodes
        // transForm.areaCodes = '3301,330782'

        delete transForm.pensionAgencyId
        // console.log(transForm)
        return transForm
      }

      if (typeId == 3) {
        // delete transForm.areaIds
        // transForm.areaIds = '1003'
        // transForm.areaIds = '3301,330782'
        delete transForm.basePrice
        delete transForm.baseUnit

        transForm.productMarketInfos = this.org_bed_info
        return transForm
      }

      if (typeId == 4) {
        // 护理器材租赁和出售情况
        // delete transForm.areaCodes
        // transForm.areaCodes = 'areaCodes:1001,1002'
        delete transForm.basePrice
        delete transForm.baseUnit
        delete transForm.pensionAgencyId
        const productMarketInfos = []
        if (this.hasPrice) {
          const hasPriceObj = {
            price: this.baseForm.salePrice,
            unit: '4',
            hasPrice: true
          }
          productMarketInfos.push(hasPriceObj)
        } else {
          productMarketInfos.push({
            price: '',
            unit: '4',
            hasPrice: false
          })
        }
        if (this.hasRent) {
          const hasRentObj = {
            price: this.baseForm.rentPrice,
            unit: '6',
            hasRent: true
          }
          productMarketInfos.push(hasRentObj)
        } else {
          productMarketInfos.push({ price: '', unit: '6', hasRent: false })
        }
        transForm.productMarketInfos = productMarketInfos
        return transForm
      }
    },
    beforeAvatarUpload_1(file) {
      console.log(file)
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3
      const isScale = file.size >= 330 * 300

      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
        return false
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        return false
      }
      // if (!isScale) {
      //   // this.$message.error('上传图片规格至少为330*300!')
      //   this.$message.error('图片像素过低')
      //   return false
      // }
      // const readyDocument = new FileReader()
      // let isSize = false
      // readyDocument.readAsDataURL(file)
      // readyDocument.onload = function() {
      //   const res = this.result
      //   isSize = that.canvasDataURL(res,330,300)
      //   if (!isSize) {
      //     that.$message.error('图片规格比例不是330*300!')
      //   }
      // }
      const isSize = new Promise(function(resolve, reject) {
        const img = new Image()
        const _URL = window.URL || window.webkitURL
        img.onload = function() {
          if (img.width % 330 != 0 || img.height % 300 != 0) {
            reject()
          } else {
            resolve()
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error('上传的图片长宽比例必须是330*300')
          return Promise.reject()
        }
      )
      return isSize

      // this.$message.warning('图片格式验证！')
      // return true
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3
      const isScale = file.size >= 750 * 360

      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
        return false
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
        return false
      }
      // if (!isScale) {
      //   // this.$message.error('上传图片规格至少为750*360!')
      //   this.$message.error('图片分辨率过低~')
      //   return false
      // }
      const isSize = new Promise(function(resolve, reject) {
        const img = new Image()
        const _URL = window.URL || window.webkitURL
        img.onload = function() {
          if (img.width % 750 != 0 || img.height % 360 != 0) {
            reject()
          } else {
            resolve()
          }
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error('上传的图片长宽比例必须是750*360')
          return Promise.reject()
        }
      )
      return isSize
    // return false
    },
    canvasDataURL(path, pWith, pHeight) {
      var scale = pWith
      var img = new Image()
      img.src = path
      // 此写法不正确
      var flage = new Promise(function(resolve, reject) {
        img.onload = function() {
          var w = this.width
          var h = this.height
          console.log(`图片长${h},宽${w}`)
          // if (w != pWith || h != pHeight) {
          //   flage = false
          //   return false
          // } else {
          //   flage = true
          //   return true
          // }
          if (w % pWith || h % pHeight) {
            reject()
          // console.log("比例不对")
          // flage = false
          // return false
          } else {
            resolve()
          // console.log("比例正确")
          // flage = true
          // console.log('角色',flage)
          // return true
          }
        }
      // console.log('dkjsf',flage)
      })
      return flage
    },
    handleProgress_1(event, file, fileList) {},
    handleProgress(event, file, fileList) {
    //   console.log(event)
      console.log(file)
      this.upLoadFlage = true
      this.upLoadImgPercentage = Number(file.percentage.toFixed(0))
    },
    handleAvatarSuccess(res, file) {
    // this.productImages[this.imgIndex].url = URL.createObjectURL(file.raw)
      console.log(file)
      this.productImages[this.imgIndex].url = ali_oss_path + file.response.name
      this.productImages[this.imgIndex].name = file.name
    },
    handleAvatarSuccess_1(res, file) {
    // this.productImages[this.imgIndex].url = URL.createObjectURL(file.raw)
      console.log(file)
      this.thumbnail.url = ali_oss_path + file.response.name
      this.thumbnail.name = file.name
    },
    handleRemove(index) {
      console.log(index)
      const that = this
      this.upLoadFlage = false
      that.$nextTick(() => {
        if (index == -1) {
          that.thumbnail.url = ''
        } else {
          that.productImages[index].url = ''
        }
      })
    },
    handlePicturePreview(index) {
      console.log(index)
      const that = this
      this.dialogImageUrl = ''
      that.$nextTick(() => {
        if (index == -1) {
          that.dialogImageUrl = this.thumbnail.url
          that.picturePreviewDialog = true
        } else {
          that.dialogImageUrl = this.productImages[index].url
          that.picturePreviewDialog = true
        }
      })
    },
    handleDownload(index) {},
    clickStop(e) {
      const event = window.event || e
      if (window.event) {
      // 只有ie识别
        event.cancelBubble = true
      } else {
        event.stopPropagation()
      }
    },
    picUpload_1(file) {
      this.upLoadFlage = false
      const that = this
      const files = file.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      const fileNames = `product/${dateFormat(
        new Date(),
        'yyyyMMdd'
      )}/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`

      client
        .multipartUpload(fileNames, file.file, {
          progress: function(p) {
            const e = {}
            e.percent = Math.floor(p * 100)
            file.onProgress(e)
          }
        })
        .then(result => {
        // 下面是如果对返回结果再进行处理，根据项目需要

          if (result.res.status === 200) {
            console.log('返回状态码200')
            file.onSuccess(result, file)
            that.$message({
              message: '上传成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          that.$message.error('上传失败')
        })
    },
    picUpload(file) {
      this.upLoadFlage = false
      const that = this
      const files = file.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      const fileNames = `product/${dateFormat(
        new Date(),
        'yyyyMMdd'
      )}/${this.$moment().format('YYYYMMDDHHmmssSSS')}${suffix}`

      client
        .multipartUpload(fileNames, file.file, {
          progress: function(p) {
            const e = {}
            e.percent = Math.floor(p * 100)
            file.onProgress(e)
          }
        })
        .then(result => {
        // 下面是如果对返回结果再进行处理，根据项目需要

          if (result.res.status === 200) {
            console.log('返回状态码202')
            file.onSuccess(result, file)
            that.$message({
              message: '上传成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          that.$message.error('上传失败')
        })
    },
    onEditorReady(editor) {
    // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus(val) {
    // 富文本获得焦点时的事件
    },
    onEditorChange() {}, // 内容改变事件
    redrawProductImages(resImages) {
      // const productImages = [{ name: '图一', url: '', isPrimary: false }]
      const productImages = []
      resImages.forEach((item, index) => {
        if (item.isPrimary) {
        // this.productImages[0].name=item.name
        // this.productImages[0].url=item.url
        // productImages[0] = item
          this.thumbnail = item
        } else {
          productImages.push(item)
        }
      })
      const pushData = { name: '替补图片', url: '', isPrimary: false }
      // if (resImages && resImages.length < 5) {
      //   const items = 4 - resImages.length
      //   for (let i = 0; i < items; i++) {
      //     productImages.push(JSON.parse(JSON.stringify(pushData))) // 直接赋值浅拷贝，指向同一对象，需要深拷贝
      //   }
      // }
      if (resImages && resImages.length < 6) {
        const items = 4 - productImages.length
        for (let i = 0; i < items; i++) {
          productImages.push(JSON.parse(JSON.stringify(pushData))) // 直接赋值浅拷贝，指向同一对象，需要深拷贝
        }
      }
      return productImages
    },
    // 缩略图部分
    srcFileSet(file) {
      console.log(file)
    },
    cropSuccess(imgDataUrl) {
    //  imgDataUrl其实就是经过base64转码过的图片
      this.listImg = imgDataUrl
      // console.log(imgDataUrl)// 这里打印出来的是base64格式的资源，太长了
      // base64转blob格式
      const arr = imgDataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const bdata = new Blob([u8arr], { type: mime })
      console.log(bdata)

      // var OSS = require('ali-oss')
      // var client = new OSS({
      //   region: 'oss-cn-hangzhou',
      //   accessKeyId: 'LTAIbqxBSqfHEmbk',
      //   accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
      //   bucket: 'ecare-test' }
      // )
      client
        .multipartUpload('product/test/base64.jpg', bdata, {
          progress: function(p) {
            const e = {}
            e.percent = Math.floor(p * 100)
          // console.log('Progress: ' + p)
          // option.onProgress(e)
          // console.log(e.percent)
          // 显示上传进度条
          // this.videoFlag = true
          // this.videoUploadPercent = e.percent
          }
        })
        .then(
          val => {
            console.info('66', val)
            if (val.res.statusCode === 200) {
            // this.videoFlag = false
            // this.videoUploadPercent = 0
            // // this.videoForm.videoUploadId = res.data.uploadId
            // this.videoForm.Video = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/video/20190807/test.mp4'
            // option.onSuccess(val)
              return val
            } else {
            // option.onError('上传失败')
            }
          },
          err => {
          // option.onError('上传失败')
            reject(err)
          }
        )
    // console.log(bdata)
    // console.log(new Blob([u8arr], { type: mime })) ;//这里打印base64转成blob的资源，根据自己的项目需求去转吧
    },
    // guid() {
    //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    //     c
    //   ) {
    //     var r = (Math.random() * 16) | 0
    //     var v = c == 'x' ? r : (r & 0x3) | 0x8
    //     return v.toString(16)
    //   })
    // },
    // 编码格式统一
    guid() {
      return (
        10 +
      this.$moment().format('YYYYMMDDHHmmssSSSS') +
      parseInt(Math.random() * 9000 + 1000)
      )
    },
    _judge() {
      if (this.$route.query.action) {
        this.action = this.$route.query.action
      }
      if (this.$route.query.action == '3') {
        this.form_disabled = true
      } else {
        this.form_disabled = false
      }
      if (this.$route.query.action == '2' || this.$route.query.action == '3') {
      // 修改---查看
        if (this.$route.query.id) {
          searchOneGood(this.$route.query.id).then(response => {
            const data = response
            // --------------公共基本信息
            console.log(data.productImages)
            this.suoluetu = data.productImages[0]
            this.listImg = this.suoluetu.url // 原缩略图
            this.productImages = this.redrawProductImages(data.productImages)
            this.baseForm.status = data.status == 2
            this.productDetail = data.productDetail
            if (this.$route.query.action == '2') {
              // 富文本编辑器神坑处理
              this.$nextTick(function() {
                this.$refs.myQuillEditor.quill.enable(true) // quill弃用
                this.$refs.myQuillEditor.quill.blur()
              })
            }
            this.baseForm.id = data.id // 修改，详情时传来的id
            // this.baseForm.categoryTreePath=data.categoryTreePath
            this.baseForm.name = data.name
            this.baseForm.description = data.description
            this.baseForm.code = data.code
            this.baseForm.payType = data.payType + ''
            this.baseForm.appointmentFee = data.appointmentFee
            this.baseForm.basePrice = data.basePrice
            this.baseForm.baseUnit = data.baseUnit + ''

            if (data.productSubsidySchemes && data.productSubsidySchemes.length) {
              // this.baseForm.policySubsidyId = data.productSubsidySchemes
              this.checkList = []
              data.productSubsidySchemes.forEach((item, index) => {
                this.checkList.push(item.subsidySchemeId)
              })

            // console.log(this.checkList)
            // 单个商品存在多个报销政策
            // const policyArray = data.policySubsidyId.split(",");
            // this.checkList=policyArray
            // console.log(policyArray)
            // policyArray.forEach((item, index) => {
            //   this.policy.forEach((item2, index2) => {
            //     if (item === item2.id) {
            //       item2.checked = true;
            //     }
            //   });
            // });
            }

            // -------------------------------------------------------------
            // if (data.areaIds) {
            //   const dataArray = data.areaIds.split(',')// 服务城市分割数组
            //   const array = []
            //   for (const item of dataArray) {
            //     // if (item != 1 && item != 2 && item != 3) {
            //     if (item != 3301 && item != 330782 && item != 31) {
            //       console.log('areaIds返回数据分割城市出错' + item)
            //     } else {
            //       array.push(item)
            //     }
            //   }
            //   this.baseForm.areaIds = array
            // } else {
            //   this.baseForm.areaIds = []
            // }

            // this.baseForm.areaCodes = data.areaCodes

            // 通过城市加载机构
            if (this.$route.query.type == '3') {
              const filterOrganizationData = {
                filters: [
                  {
                    key: 'CityCode',
                    filterType: 0,
                    value:
                    data.productAreas && data.productAreas.length
                      ? data.productAreas[0].areaCode
                      : null
                  }
                ],
                numberPerPage: 20,
                currentPage: 1,
                sortList: [
                  {
                    columnName: 'Id',
                    sortOrder: 0
                  }
                ]
              }
              this._organizationsList(filterOrganizationData)
            }

            // 服务城市弃用
            // if (data.areaIds && data.areaCodes) {
            //   let AreaIds = data.areaIds.split(",");
            //   let AreaCodes = data.areaCodes.split(",");
            //   let temp = [];
            //   AreaIds.forEach((item, index) => {
            //     temp.push(item + Separator + AreaCodes[index]);
            //   });
            //   // 当商品类型是机构时，areaIds数组转为字符串
            //   if (this.$route.query.type === "3") {
            //     this.baseForm.areaIds = temp.toString();
            //   } else {
            //     this.baseForm.areaIds = temp;
            //   }
            //   // this.baseForm.areaIds=[]
            //   // this.baseForm.areaCodes=''
            // } else {
            //   console.log("未获取到服务城市~");
            //   if (this.$route.query.type === "3") {
            //     this.baseForm.areaIds = "";
            //   } else {
            //     this.baseForm.areaIds = [];
            //   }
            //   this.baseForm.areaCodes = "";
            // }

            if (data.productAreas && data.productAreas.length) {
              console.log(data.productAreas)
              const temp = []
              data.productAreas.forEach((item, index) => {
                temp.push(item.areaId + Separator + item.areaCode)
              })
              // 当商品类型是机构时，areaIds数组转为字符串
              if (this.$route.query.type === '3') {
                this.baseForm.areaIds = temp.toString()
              } else {
                this.baseForm.areaIds = temp
              }
            } else {
              console.log('未获取到productAreas~')
              if (this.$route.query.type === '3') {
                this.baseForm.areaIds = ''
              } else {
                this.baseForm.areaIds = []
              }
            }

            this.baseForm.pensionAgencyId = data.pensionAgencyId
            // console.log(this.baseForm.pensionAgencyId)
            if (this.$route.query.type == 3) {
            // 机构床位信息循环
              this.org_bed_info = []
              data.productMarketInfos.forEach((item, index) => {
              // this.org_bed_info.push({ 'bedSpec': item.bedSpec, 'price': item.price, 'unit': item.unit + '', 'id': item.id })
                this.org_bed_info.push({
                  bedSpec: item.bedSpec,
                  price: item.price,
                  unit: 6 + '',
                  id: item.id
                })
              })
            }

            if (this.$route.query.type == 4) {
            // 器材出售情况
              if (
                data.productMarketInfos &&
              data.productMarketInfos.length == 2
              ) {
                data.productMarketInfos.forEach((item, index) => {
                  if (item.hasPrice) {
                    this.hasPrice = true
                    this.baseForm.salePrice = item.price
                  }
                  if (item.hasRent) {
                    this.hasRent = true
                    this.baseForm.rentPrice = item.price
                  }
                })
              } else {
                this.$message.error('床位数据丢失或格式错误！！！')
              }
            }
          })
        }
      } else {
        if (this.$route.query.action == '1' && this.$route.query.type === '3') {
          this.baseForm.areaIds = ''
          this._organizationsList(organizationsListData)
        }
      }
    },
    _quillDisable() {
      if (this.$route.query.action == '3' || this.$route.query.action == '2') {
        this.$refs.myQuillEditor.quill.enable(false) // quill禁用
        // if(this.$route.query.action == '2'){
        //   // 富文本编辑器神坑处理
        //   this.$nextTick(function() {
        //     this.$refs.myQuillEditor.quill.enable(true) // quill弃用
        //     this.$refs.myQuillEditor.quill.blur()
        //   })
        // }
      }
    },
    loadPolicy() {
      console.log('loadPolicy')
      this.policyInfo.currentPage++
      // this.loadPolicyAction=true
      // setTimeout(()=>{
      //   this.loadPolicyAction=false
      // },1000)
      this._policySearch()
    // this.loadPolicyAction=false
    },
    _getCheckedPolicy(policy) {
      const policyInfo = {}
      const policyIds = []
      const policyNames = []
      let policySubsidyId = ''
      let policySubsidyName = ''
      const filterData = policy.filter(function(item) {
        return item.checked == true
      })

      filterData.forEach((item, index) => {
        policyIds.push(item.id)
        policyNames.push(item.name)
      })
      if (policyIds.length) {
        policySubsidyId = policyIds.join(',')
      }
      if (policyNames.length) {
        policySubsidyName = policyNames.join(',')
      }

      policyInfo.policySubsidyId = policySubsidyId
      policyInfo.policySubsidyName = policySubsidyName
      return policyInfo
    },
    // 改写富文本图片上传

    beforeAvatarUploadTest(file) {
      console.log('上传前验证~')
      const that = this
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      if (!isJPG && !isPng) {
        this.$message.error('上传商品图片只能是 JPG 或PNG格式!')
      }
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isLt3M
    },
    fnUploadRequestTest(option) {
      console.log(option)
      const files = option.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const name = `${fileName}_${date}${suffix}`
      const fileNames = `product/${dateFormat(
        new Date(),
        'yyyyMMdd'
      )}/${fileName}_${date}${suffix}`

      console.log(fileNames)
      client
        .multipartUpload(fileNames, files, {
          progress: function(p) {
            const e = {}
            e.percent = Math.floor(p * 100)
            option.onProgress(e)
          }
        })
        .then(
          result => {
            if (result.res.status === 200) {
              option.onSuccess(result, option)
              // this.$message({
              //   message: '上传成功~~~',
              //   type: 'success'
              // })
              // console.log('转码成功~~',this.$refs.myQuillEditor.quill.getSelection())
              const vm = this
              const quill = this.$refs.myQuillEditor.quill
              console.log(
                '转码成功~~',
                this.$refs.myQuillEditor.quill.getSelection()
              )
              var quillLength
              var length
              // 获取光标所在位置
              // 判断如果用户没有将光标移入富文本而是直接上传图片的情况
              // var quillLength = vm.$refs.myQuillEditor1.quill.getSelection();
              // if(vm.$refs.myQuillEditor1.quill.getSelection){
              //   length = quill.getSelection().index
              // }else{
              //   length = 0
              // }
              quillLength = quill.getSelection()
              if (quillLength) {
                length = quill.getSelection().index
              } else {
                length = 0
              }

              // 插入图片 result.name为服务器返回的图片地址
              quill.insertEmbed(
                length,
                'image',
                'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/' + result.name
              )
              // 调整光标到最后
              quill.setSelection(length + 1)
            }
          },
          err => {
            result.onError('文本图片上传失败')
            reject(err)
          }
        )
        .catch(err => {
          this.$message.error('程序出错')
        })
    },
    imgOnProgress(event, file, fileList) {
      this.contentLoading = true
    },
    getImageSuccessTest(res, file) {
      this.$message({
        message: '上传成功！',
        type: 'success'
      })
      this.contentLoading = false
    }
  }
}
</script>
<style scoped lang='scss'>
li {
  list-style: none;
}
.float_left {
  float: left;
}
.float_right {
  float: right;
  margin-right: 30px;
}
.app-container {
  background: #f2f2f2;
  margin: 0px;
}
.gray_box {
  border: 1px solid #dddddd;
  margin-bottom: 20px;
  background: #ffffff;
}
.herfTab {
  background: #ffffff;
  position: relative;
  overflow: hidden;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  .tabItem {
    width: 130px;
    line-height: 57px;
    border-top: 3px solid transparent;
  }
  .tab_active {
    border-color: #409eff;
    background: rgba(30, 144, 255, 0.2);
    color: #3e8dff;
  }
}
.item_title {
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 55px;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
  padding-left: 20px;
}
.item_form {
  padding: 20px;
}
.wid_320 {
  width: 320px;
}
.marg_20 {
  margin-left: 20px;
}
.wid_110 {
  width: 110px;
}
.uploader-box-div .avatar-uploader {
  float: left;
  margin-right: 20px;
}
// 图片上传
.uploader-box-div .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader-box-div .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.uploader-box-div .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.uploader-box-div .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
//  .edit_container .ql-container{
//     height: 400px;
//   }
.org_select {
  width: 100%;
}
.listImgBox {
  width: 110px;
  height: 100px;
}
</style>

<style lang="scss">
//  图片上传
.uploader-box-div .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader-box-div .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.uploader-box-div .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.uploader-box-div .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.edit_container .ql-container {
  height: 400px;
}
</style>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.slotBox {
  position: relative;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.slotBox .el-upload-list__item-actions:hover {
  opacity: 1;
}
.slotBox .el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  z-index: 2;
}
.slotBox .el-upload-list__item-actions span {
  cursor: pointer;
  margin-right: 10px;
}
.slotBox .el-upload-list__item {
  line-height: 1.8;
}
.bg-box {
  background: #fff;
  background-image: url('http://ecare-test.oss-cn-hangzhou.aliyuncs.com/product/test/mao.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
<style>
.editor {
  line-height: normal !important;
  height: 800px;
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>
