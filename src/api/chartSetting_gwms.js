import request from '@/utils/request';
import axios from 'axios';

// 添加保存数据源
export function addSourseData(data) {
  return request({
    url: '/adminData?operate=add',
    method: 'post',
    data
  });
}

// 加载所有数据源
export function getSourDataAll() {
  return request({
    url: '/adminData?operate=find',
    method: 'get'
  });
}

// 修改模板
export function publistTem(data) {
  return request({
    url: '/adminTemplete?operate=update',
    method: 'post',
    data
  });
}

// 发布模板
export function publishTems(data) {
  return request({
    url: '/adminTemplete?operate=publish',
    method: 'post',
    data
  });
}

// 删除模板
export function delTemById(data) {
  return request({
    url: '/adminTemplete?operate=del',
    method: 'post',
    data
  });
}

// 修改数据源
export function editSourData(data) {
  return request({
    url: '/adminData?operate=update',
    method: 'post',
    data
  });
}

// 删除数据源
export function delSourData(data) {
  return request({
    url: '/adminData?operate=del',
    method: 'post',
    data
  });
}

// 加载所有模板
export function getTempleteAll() {
  return request({
    url: '/adminTemplete?operate=find',
    method: 'get'
  });
}

// 保存属性设置
export function saveTemplateSetting(data) {
  return request({
    url: '/adminTemplete?operate=add',
    method: 'post',
    data
  });
}

// 修改模板配置
export function updataTemSetting(data) {
  return request({
    url: '/adminTemplete?operate=update',
    method: 'post',
    data
  });
}

// 根据模板Id查找模板配置
export function getTempById(data) {
  return request({
    url: '/adminTemplete?operate=find',
    method: 'post',
    data
  });
}

// 根据模板dataKey获取数据
export function getDataByDataKey(data) {
  return request({
    url: '/adminTemplete?operate=excute',
    method: 'post',
    data
  });
}
