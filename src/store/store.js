'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    filter: null,
    oompa: {},
    oompaList: [],
    renderOompaListFromService: true,
    renderOompaFromService: true,
    views: {
      main: 'ViewOompaMainList',
      detail: 'ViewOompaDetail'
    }
  },
  mutations: {
    clearOompaList (state) {
      state.oompaList = [];
    },
    setOompaList (state, oompas) {
      state.oompaList = state.oompaList.length === 0 ? oompas : state.oompaList.concat(oompas);
    },
    setOompa (state, oompa) {
      state.oompa = oompa;
    },
    setOompaFilter (state, filter) {
      state.filter = filter;
    },
    setStoreFlag (state, params) {
      if (params.view === state.views.main) {
        state.renderOompaListFromService = params.flag;
      } else if (params.view === state.views.detail) {
        state.renderOompaFromService = params.flag;
      }
    }
  },
  actions: {
    clearOompaList ({commit}) {
      commit('clearOompaList');
    },
    getOompas ({commit, dispatch, state}, params) {
      return dispatch('checkStorage', {objectKey: 'oommpa_list_' + params.page}).then((response) => {
        if (!response) {
          return Vue.http.get('https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=' + params.page)
            .then(response => {
              dispatch('setStorageData', {view: state.views.main, page: params.page, list: response.body.results});
              commit('setOompaList', response.body.results);
            },
            response => {
              throw (response);
            });
        } else {
          const storedList = JSON.parse(localStorage.getItem('oommpa_list_' + params.page));
          commit('setOompaList', storedList.list);
        }
      });
    },
    getOompaById ({commit, dispatch, state}, params) {
      return dispatch('checkStorage', {objectKey: 'oompa_' + params.id}).then((response) => {
        if (!response) {
          return Vue.http.get('https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/' + params.id)
            .then(response => {
              response.body.id = params.id;
              dispatch('setStorageData', {view: state.views.detail, oompa: response.body});
              commit('setOompa', response.body);
            },
            response => {
              throw (response);
            });
        } else {
          const storedObject = JSON.parse(localStorage.getItem('oompa_' + params.id));
          commit('setOompa', storedObject.oompa);
        }
      });
    },
    setOompaFilter ({commit}, params) {
      commit('setOompaFilter', params.filter);
    },
    // LocalStorage...
    setStorageData ({commit, state, dispatch}, params) {
      const variables = {
        timeStampString: null,
        objectKey: params.view === state.views.main ? 'oommpa_list_' + params.page : 'oompa_' + params.oompa.id,
        limitHours: 24
      };
      const object = params.view === state.views.main ? 'oompaList' : 'oompaItem';

      const storedObject = JSON.parse(localStorage.getItem(variables.objectKey));
      if (storedObject) {
        variables.timeStampString = storedObject.timpeStamp;
        dispatch('checkStoredObjectPeriod', variables).then((response) => {
          if (!response.callToService) {
            commit('setStoreFlag', {flag: response.callToService, view: params.view});
          }
        });
      } else {
        const objectToStore = {
          oompaList: {
            list: params.list,
            page: params.page,
            timpeStamp: new Date().getTime().toString()
          },
          oompaItem: {
            oompa: params.oompa,
            timpeStamp: new Date().getTime().toString()
          }
        };
        localStorage.setItem(variables.objectKey, JSON.stringify(objectToStore[object]));
        commit('setStoreFlag', {flag: false, view: params.view});
      }
    },
    checkStoredObjectPeriod ({state}, params) {
      const now = new Date().getTime().toString();
      const difference = Math.abs(Math.round(((now - params.timeStampString) / 1000) / (60 * 60)));
      return {callToService: difference > params.limitHours};
    },
    checkStorage ({state}, params) {
      return !!localStorage.getItem(params.objectKey);
    }
  }
});

export default store;
