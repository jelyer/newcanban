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

//加载所有数据源
export function getSourDataAll() {
  return request({
    url: '/adminData/findAll',
    method: 'get'
  })
}

//加载所有模板
export function getTempleteAll() {
  return request({
    url: '/adminTemplete/findAll',
    method: 'get'
  })
}

//保存属性设置
export function saveTemplateSetting(data){
  return request({
    url:'/adminTemplete/save',
    method:'post',
    data
  })
}

//修改模板配置
export function updataTemSetting(data){
  return request({
    url:'/adminTemplete/update',
    method:'post',
    data
  })
}

//根据模板Id查找模板配置
export function getTempById(data){
  return request({
    url:'/adminTemplete/findModel',
    method:'post',
    data
  })
}
