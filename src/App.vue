<template>
  <div id="app">
    <el-scrollbar style="height:100%">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // 关掉当前浏览器页面的时候清空该页面存储的localStorage，在重新打开该网址需要重新登录
    // window.onbeforeunload = function(e) {
    //   // alert(window.localStorage.getItem('refreshToken'))
    //   var storage = window.localStorage
    //   // console.log(storage)
    //   storage.clear()
    // }

    // /*区分关闭和刷新，关闭退出登录 start*/
    // window.onload = function(){
    //   if(!window.sessionStorage["tempFlag"]){
    //     var storage = window.localStorage
    //     // console.log(storage)
    //     storage.clear()
    //     location.reload();   //不能省，强制跳到登陆页
    //   }else{
    //     window.sessionStorage.removeItem("tempFlag");
    //   }
    // }
    // window.onunload = function (){
    //   window.sessionStorage["tempFlag"] = true;
    // }
    // window.onbeforeunload = function (){
    //   window.sessionStorage["tempFlag"] = true;
    // }

    // 一个判断页面是否真的关闭和刷新的好方法：
    // 这段代码就是判断触发onbeforeunload事件时，鼠标是否点击了关闭按钮，或者按了ALT+F4来关闭网页，如果是，则认为系统是关闭网页，否则在认为系统是刷新网页。
    // 没有效果
    // window.onbeforeunload=function(event){
    //   // alert("===onbeforeunload===");
    //   if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){
    //       // alert("你关闭了浏览器");
    //       var storage = window.localStorage
    //       storage.clear()
    //   }else{
    //       // alert("你正在刷新页面");
    //   }
    // }
  }
}
</script>
<style lang="scss">
  * {
    margin: 0px;
    padding: 0px;
  }
  #app {
    overflow-y: hidden;
    font-size: 16px;
    .el-pagination {
      margin-top: 0px;
      text-align: right;
      padding: 0 60px;
    }
    //表格字体大小
    .el-table--mini, .el-table--small, .el-table__expand-icon {
      font-size: 14px;
    }
    // 分页的字体大小
    .el-pagination__sizes .el-input .el-input__inner {
      font-size: 14px;
    }
    .el-pager li {
      font-size: 14px;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]) {
      font-size: 14px;
    }
    .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
      font-size: 14px;
    }
    .el-pager li {
      border: 1px solid #DCDFE6;
    }
    .el-pager li.active {
      color: #fff;
      cursor: pointer;
      background: #409eff;
      border: 1px solid #409eff;
    }
    .el-pagination .btn-prev {
      border: 1px solid #DCDFE6;
    }
    .el-pagination .btn-next {
      border: 1px solid #DCDFE6;
    }
    // // element表头错位问题
    // .el-table th.gutter {
    //   display: table-cell!important;
    // }
    // .el-table colgroup.gutter{
    //   display: table-cell!important;
    // }
    // element表头样式

    // 表格字体大小
    .el-form-item__label {
      font-size: 16px;
      color: rgb(102, 102, 102);
      // text-align: right;
      font-weight: 400;
      font-style: normal;
    }

    // 按钮的大小
    // .el-button {
    //   font-size: 18px;
    // }

    // // 富文本上传图片底部会显示不完全
    // .ql-editor {
    //   padding: 12px 12px 100px;
    // }
    // 富文本样式
    .edit_container .ql-container{
      height: 400px;
    }
  }
  .el-scrollbar__view{
    height: 100%;
  }
  // .el-scrollbar{
	//   height: 100%;
	// }
	// .el-scrollbar__wrap{
	//   overflow: scroll;
	//   overflow-x:auto;
	//   overflow-y:auto;
	// }
#app .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
// #app .el-form-item.is-required .el-form-item__label:before {
//     content: '*';
//     color: #f56c6c;
//     margin-right: 0px;
// }
// body .el-table th.gutter{
//     display: table-cell!important;
// }
.el-table .el-table--border{
  border: 1px solid #EEF1FA;
}
</style>
<style>
  /* // element表头错位问题 */
body .el-table th.gutter{
  display: table-cell!important;
  width: 30px!important;
}
body .el-table colgroup.gutter{
  display: table-cell!important;
}
</style>

