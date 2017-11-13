import { stringify } from 'qs';
import request from '../utils/request';

export async function queryBanner() {
  return request('/api/banner');
}
export async function queryNewmusic() {
  return request('/api/personalized/newsong?limit=3');
}
export async function queryDetails(data) {
  return request(`/api/music/url?id=${data.id}`);
}
export async function queryMusicDetails(data) {
  return request(`/api/song/detail?ids=${data.id}`);
}
export async function queryMusicLyric(data) {
  return request(`/api/lyric?id=${data.id}`);
}
export async function queryMusicSearch(data) {
  return request(`/api/search?keywords=${data.content}`);
}


//登陆注册
export async function queryUserList(data) {
  return request('http://z005.kmtongji.com/api/users',{
    credentials: 'include'
  });
}
export async function logout(data) {
  return request('http://z005.kmtongji.com/api/logout',{
    credentials: 'include'
  });
}
export async function userLogin(data) {
  return request('http://z005.kmtongji.com/api/login', {
    method: 'post',
    credentials: 'include',
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body: stringify(data)
  });
}
export async function setPassword(data) {
  return request('http://z005.kmtongji.com/api/users/setPassword', {
    method: 'post',
    credentials: 'include',
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body: stringify(data)
  });
}
export async function queryRegister(data) {
    return request('http://z005.kmtongji.com/api/register', {
      method: 'post',
      headers:{"Content-Type":"application/x-www-form-urlencoded"},
      body: stringify(data)
    });
}

