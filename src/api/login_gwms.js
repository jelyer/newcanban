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
  // console.log(roule)
  /* if (roule === 'admin') {
    return axios.get(
      ' https://www.easy-mock.com/mock/5ca8799b4f62671c250622a9/vlogin/user/getRouterAdmin'
    )
  } else {
    return axios.get(
      ' https://www.easy-mock.com/mock/5ca8799b4f62671c250622a9/vlogin/user/getRouteReditor'
    )
  }*/
  return request({
    // url: '/adminTemplete?operate=find',
    url: '/adminTemplete?operate=find',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
