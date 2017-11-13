import { queryRegister } from '../services/api';
import { setPassword } from '../services/api';
import { userLogin } from '../services/api';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';


export default {
  namespace: 'login',
  state: {
    isregistersuccess:false
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *queryRegister({ payload }, { call, put,select }) {  // eslint-disable-line
      const response = yield call(queryRegister, payload);
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      yield put({ type: 'register',payload: response});
      let isregister = yield select(data => data.login)
      let loginuser={
        username:payload.username,
        password:payload.password,
      }
      yield call(userLogin, loginuser)
      if(isregister){
        Toast.success('注册成功', 1.6);
        yield delay(300)
        yield put(routerRedux.push('/userlist'));
      }
    },
    *userLogin({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(userLogin, payload);
      if(response.err){
        Toast.fail('您输入的账号或密码不正确', 1.6);
      }else if(response.data.user){
        yield put(routerRedux.push('/userlist'));
      }else {
        Toast.fail('登录失败', 1.6);
      }
    },
    *modifyuserLogin({ payload }, { call, put }) {  // eslint-disable-line
      var modifyloginboj={
        username:payload.username,
        password:payload.password,
      }
      var setpassworld={
        password:payload.setpassworld,
      }
      const response = yield call(userLogin, modifyloginboj);
      if(response.err){
        Toast.fail('您输入的账号或密码不正确', 1.6);
      }else if(response.data.user){
        const response = yield call(setPassword, setpassworld);
        if(response.data.errno === 0){
          Toast.success('您的密码修改成功', 1.6);
        }else {
          Toast.fail('修改失败', 1.6);
        }
      }else {
        Toast.fail('您的原始密码输入不正确', 1.6);
      }
    },
  },
  // user
  reducers: {
    register(state, action) {
      let data=action.payload.data
      if(data.message=="A user with the given username is already registered"){
        Toast.fail('该邮箱已注册', 1.6);
        return false
      }else if(data.user){
        return {
          ...state,
          isregistersuccess: true,
        }
      }else {
        Toast.fail('注册失败', 1.6);
        return false
      }
    },
    login(state, action){

    }
  },

};
