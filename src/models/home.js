import { routerRedux } from 'dva/router';
import { queryBanner } from '../services/api';
import { queryNewmusic } from '../services/api';
import { queryMusicSearch } from '../services/api';

export default {

  namespace: 'home',

  state: {
    banner: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    newmusic:[],
    searchList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryBanner({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryBanner, payload);
      console.log(response)
      yield put({ type: 'save',payload: response});
    },
    *queryNewmusic({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryNewmusic, payload);
      console.log(response)
      yield put({ type: 'saveNewmusic',payload: response});
    },
    *queryMusicSearch({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryMusicSearch, payload);
      yield put({ type: 'searchmusic',payload: response});
      yield put( routerRedux.push('/details/517567264'));
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload.data.banners)
      return {
        ...state,
        banner: action.payload.data.banners,
      }
    },
    saveNewmusic(state, action) {
      let newmusiclist=action.payload.data.result.slice(0,3)
      return {
        ...state,
        newmusic: newmusiclist
      }
    },
    searchmusic(state, action) {
       let searchmusiclist=action.payload.data.result.songs
        return {
          ...state,
          searchList: searchmusiclist
        }

    },
  },

};
