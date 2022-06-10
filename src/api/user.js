import request from '@/utils/request'

// 用户登录接口 获取用户信息接口 退出登录接口，换成真实的接口

// 登录
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}
// 退出登录
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
