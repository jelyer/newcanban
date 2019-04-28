import request from '@/utils/request'
import axios from 'axios'


//添加保存数据源
export function addSourseData(data) {
  return request({
    url: '/adminData/save',
    method: 'post',
    data
  })
}
