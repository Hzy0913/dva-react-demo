import { queryUserList } from '../services/api';
import { logout } from '../services/api';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';


export default {

  namespace: 'userlist',

  state: {
      userlist:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryUserList({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryUserList, payload);
      if(response.err){
        yield put(routerRedux.push('/login'));
      }else {
        yield put({ type: 'saveUserlist',payload: response});
      }
    },
    *logout({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(logout, payload);
      yield put(routerRedux.push('/login'));
    },
  },

  reducers: {
    saveUserlist(state, action) {
      let data=action.payload.data
      Toast.hide()
      return {
        ...state,
        userlist: data,
      }
    },
  },

};
