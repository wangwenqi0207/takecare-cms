import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id(5)',
    name: '@name',
    'policy|1': ['长护险', '残联', '民政', '卫健委'],
    'status|1': ['上架中', '未上架'],
    city: '@city',
    create_time: '@datetime',
    'type|1': ['生活照料', '医疗护理', '机构护理'],
    'classification|1': ['单日套餐', '包月套餐', '单项服务', '月床位费'],
    picture: '@image()',
    // picture: '我是图片',
    'price|1-500': 100
  }]
})

export default [
  {
    url: '/goods/list',
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
