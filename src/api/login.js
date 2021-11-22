import request from '@/utils/request';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function changeCodeImg() {
  return request({
    url: '/user/changeCodeImg',
    method: 'get'
  });
}

// 加载所有模板路由
export function getRouter(roule) {
  return request({
    url: '/adminTemplete/findAll',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
