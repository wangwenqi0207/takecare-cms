/**
 * 三个参数
 * file：一个是文件(类型是图片格式)，
 * w：一个是文件压缩的后宽度，宽度越小，字节越小
 * objDiv：一个是容器或者回调函数
 * https://blog.csdn.net/qq_23375733/article/details/86594420 web前端 图片压缩后上传到阿里云oss
 */
export function photoCompress(file, w, objDiv) {
  var ready = new FileReader()
  /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,
    如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file)
  ready.onload = function() {
    var re = this.result
    canvasDataURL(re, w, objDiv)
  }
}

/**
 * 按比例压缩图片
 */
function canvasDataURL(path, obj, callback) {
  var img = new Image()
  img.src = path
  img.onload = function() {
    var that = this
    // 默认按比例压缩
    var w = that.width
    var h = that.height
    var scale = w / h
    w = obj.width || w
    h = obj.height || (w / scale)
    var quality = 0.7 // 默认图片质量为0.7
    // 生成canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // 创建属性节点
    var anw = document.createAttribute('width')
    anw.nodeValue = w
    var anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)

    // ctx.fillStyle = "#fff"

    // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // for(var i = 0; i < imageData.data.length; i += 4) {
    //   // 当该像素是透明的,则设置成白色
    //   if(imageData.data[i + 3] == 0) {
    //     imageData.data[i] = 255;
    //     imageData.data[i + 1] = 255;
    //     imageData.data[i + 2] = 255;
    //     imageData.data[i + 3] = 255;
    //   }
    // }
    // ctx.putImageData(imageData, 0, 0);

    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    // quality值越小，所绘制出的图像越模糊
    // var base64 = canvas.toDataURL('image/jpeg', quality);
    var base64 = canvas.toDataURL('image/png', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}

/**
 * 将以base64的图片url数据转换为Blob 用url方式表示的base64图片数据
 */
export function convertBase64UrlToBlob(urlData) {
  var arr = urlData.split(','); var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * 生成文件名
 */
function timestamp() {
  var time = new Date()
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return '' + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s)
}

function add0(m) {
  return m < 10 ? '0' + m : m
}

// // 创建OSSClient实例
// let client = new OSS({
//     region: 'oss-cn-hangzhou', // 你的oss地址 ，具体位置见下图
//     accessKeyId: 'LTAIbqxBSqfHEmbk', // 你的ak
//     accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R', // 你的secret
//     // stsToken: '<Your securityToken(STS)>',//这里我暂时没用，注销掉
//     bucket: 'ecare-test'// 你的oss名字
// });
