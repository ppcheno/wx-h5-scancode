import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";

//自动引入模块
const modulesFile = require.context("./modules", false, /\.js$/);
let modules = {};
modulesFile.keys().forEach(key => {
  let name = key.replace(/(.*\/)*([^.]+).*/gi, "$2");
  modules[name] = modulesFile(key).default;
});

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  getters,
  state: { },
  mutations: {
  },
  actions: {
  },
})

export default store;