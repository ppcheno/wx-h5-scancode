import { getScanCode,getCode } from "@/api/scancode";

const state = {};
const mutations = {};

const actions = {
    getScanCode({ commit }, payload){
        return new Promise((resolve,reject)=>{
            getScanCode(payload)
             .then(res=>{
                 resolve(res);
             })
             .catch(err=>{
                 reject(err);
             });
        });
    },
    getCode({commit},payload){
        return new Promise((resolve,reject)=>{
            getCode(payload)
             .then(res=>{
                 resolve(res);
             })
             .catch(err=>{
                 reject(err);
             });
        });
    },
};

export default{
  namespaced: true,
  state,
  mutations,
  actions
};