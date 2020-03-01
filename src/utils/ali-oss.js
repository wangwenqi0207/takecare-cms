const OSS = require('ali-oss')

export const client = new OSS({
  region: 'oss-cn-hangzhou', // oss-cn-shenzhen.aliyuncs.com
  accessKeyId: 'LTAIbqxBSqfHEmbk',
  accessKeySecret: '9mVLDWtiX2Vl2UWsRr1umsm1ZQ4H4R',
  bucket: 'ecare-test'
})

export default client
// export const ali_oss_path = 'http://ecare-test.oss-cn-hangzhou.aliyuncs.com/'

