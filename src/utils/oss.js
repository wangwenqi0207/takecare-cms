'use strict'
import { dateFormat } from '@/utils/upload'

var OSS = require('ali-oss')

export default {

  /**
   * 创建随机字符串
   * @param num
   * @returns {string}
   */
  randomString(num) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let res = ''
    for (let i = 0; i < num; i++) {
      var id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },

  /**
   * 创建oss客户端对象
   * @returns {*}
   */
  createOssClient() {
    return new Promise((resolve, reject) => {
      const client = new OSS({
        // region: 'oss-cn-qingdao', // 请设置成你的
        // accessKeyId: 'xxxxxxxxxxxx', // 请设置成你的
        // accessKeySecret: 'xxxxxxxxxxxx', // 请设置成你的
        // bucket: 'xxxxxxxxxxxx' // 请设置成你的

        region: 'oss-cn-hangzhou', // 你的oss地址 ，具体位置见下图
        accessKeyId: 'LTAIbqxBSqfHEmbk', // 你的ak
        accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R', // 你的secret
        // stsToken: '<Your securityToken(STS)>',//这里我暂时没用，注销掉
        bucket: 'ecare-test'// 你的oss名字
        // bucket:ecare-test
        // region:oss-cn-hangzhou.aliyuncs.com
        // ACCESS_KEY:LTAIbqxBSqfHEmbk
        // ACCESS_KEY_SECRET:9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R
      })
      resolve(client)
    })
  },
  /**
   * 文件上传
   * @param option 参考csdn: https://blog.csdn.net/qq_27626333/article/details/81463139
   */
  ossUploadFile(option) {
    console.log(option)
    const file = option.file
    const self = this
    return new Promise((resolve, reject) => {
      const date = dateFormat(new Date(), 'yyyyMMdd') // 当前时间
      const dateTime = dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
      const randomStr = self.randomString(4)//  4位随机字符串
      const extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
      const fileName = 'video/' + date + '/' + dateTime + '_' + randomStr + extensionName // 文件名字（相对于根目录的路径 + 文件名）
      // 执行上传
      self.createOssClient().then(client => {
        // 异步上传,返回数据
        resolve({
          fileName: file.name,
          fileUrl: fileName
        })
        // 上传处理
        // 分片上传文件
        client.multipartUpload(fileName, file, {
          progress: function(p) {
            const e = {}
            e.percent = Math.floor(p * 100)
            // console.log('Progress: ' + p)
            option.onProgress(e)
          }
        }).then((val) => {
          console.info(val)
          if (val.res.statusCode === 200) {
            option.onSuccess(val)
            return val
          } else {
            option.onError('上传失败')
          }
        }, err => {
          option.onError('上传失败')
          reject(err)
        })
      })
    })
  }
}
