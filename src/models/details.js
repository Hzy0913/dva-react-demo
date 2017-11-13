import { queryDetails } from '../services/api';
import { queryMusicDetails } from '../services/api';
import { queryMusicLyric } from '../services/api';

export default {

  namespace: 'details',

  state: {
    musicdetailsurl:'',
    musicdetail:'',
    lrc:'',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryDetails({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryDetails, payload);
      console.log(response)
      yield put({ type: 'save',payload: response});
    },
    *queryMusicDetails({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryMusicDetails, payload);
      console.log(response)
      yield put({ type: 'musicsave',payload: response});
    },
    *queryMusicLyric({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryMusicLyric, payload);
      console.log(response)
      yield put({ type: 'musiclyricsave',payload: response});
    },

  },

  reducers: {
    save(state, action) {
      let musicurl=action.payload.data.data[0].url
      console.log(musicurl)
      return {
        ...state,
        musicdetailsurl: musicurl,
      }
    },
    musicsave(state, action) {
      // let musicurl=action.payload.data.data[0].url
      let musicdetial=action.payload.data.songs[0]
      return {
        ...state,
        musicdetail: musicdetial,
      }
    },
    musiclyricsave(state, action) {
      let lrccon=action.payload.data
      return {
        ...state,
        lrc: lrccon,
      }
    },
  },

};
