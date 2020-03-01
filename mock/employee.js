import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id(5)',
    name: '@name',
    city: '@city',
    create_time: '@datetime',
  }]
})

export default [
  {
    url: '/employee/list',
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
