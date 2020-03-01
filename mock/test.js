import Mock from 'mockjs'
// mock的数据要在index.js中使用
const data = Mock.mock({
  'items|20': [{
    id: '@id(5)',
    name: '@name',
    'policy|1': ['长护险', '残联', '民政', '卫健委'],
    'status|1': ['上架中', '未上架'],
    city: '@city',
    create_time: '@datetime',
    // picture: '我是图片',
    'price|1-500': 100
  }]
})

export default [
  {
    url: '/test/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }]
