import request from '@/utils/request'
import axios from 'axios'


export function getbox1data(data) {
  return request({
    url: '/box1/img2data/',
    method: 'post',
    data,
  })
}
