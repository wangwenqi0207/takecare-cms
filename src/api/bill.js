// import request from '@/utils/request'
import request from '@/utils/request-6004'

export function billList(data) {
  return request({
    url: `/auth/long_nursing_bill/find_list/${data.currentPage}/10`,
    method: 'post',
    data: data.data
  })
}
export function billUpload(data) {
  return request({
    url: `/auth/long_nursing_bill/upload_excel`,
    method: 'post',
    data: data
  })
}

