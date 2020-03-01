// 新增小区
<template>
  <div id="map">
    <div class="add_housing">
      <h4 style="margin-bottom:20px;margin-top:20px;">新增小区</h4>
      <el-form>
        <el-form-item class="margin-top: 30px;">
          <el-input id="keyword" v-model="housing" placeholder="请输入小区名称" name="keyword" />
          <div id="container" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="add_housing">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { AreaAdd } from '@/api/community'
export default {
  name: 'Housing',
  data() {
    return {
      housing: '',
      address_detail: null // 详细地址
    }
  },
  mounted() {
    this.getHousing()
  },
  methods: {
    getHousing() {
      var th = this
      var windowsArr = []
      var marker = []
      var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [120.211877, 30.255194], // 地图中心点
        zoom: 13, // 地图显示的缩放级别
        keyboardEnable: false
      })
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        var autoOptions = {
          city: '杭州', // 城市，默认全国
          input: 'keyword'// 使用联想输入的input的id
        }
        var autocomplete = new AMap.Autocomplete(autoOptions)
        var placeSearch = new AMap.PlaceSearch({
          city: '杭州',
          map: map
        })
        AMap.event.addListener(autocomplete, 'select', function(e) {
          // TODO 针对选中的poi实现自己的功能
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name)
          // console.log('经度',e.poi.location.lng)
          // console.log('纬度',e.poi.location.lat)
        })
      })
    },
    close() {
      this.$router.push('/community/community_list/list')
    },
    add_housing() {
      if (this.housing == '') {
        this.$message({
          message: '请您输入小区名',
          type: 'warning'
        })
      }
      var communityId = this.$route.query.communityId
      var data = {
        'data': {
          'communityId': communityId,
          'name': this.housing,
          'address': '详细地址',
          'id': null
        },
        'correlationId': 'b0ae9046-28d5-4410-8992-b9d0d74b7e4e',
        'invokingUser': '6fdbb671-1f3a-41fb-9d3d-b602781b7e3e',
        'businessProcessName': 'ResidentialAreaCreateService'
      }
      AreaAdd(data).then(res => {
        console.log(res)
        this.$router.push('/community/community_list/list')
      })
    }
  }
}
</script>

<style scoped lang="scss">
 #myMap{
    width: 400px;
    height: 400px;
    font-family: "微软雅黑";
    display: none;
    z-index: 100;
}
.el-input{
  width:40%;
}
</style>

