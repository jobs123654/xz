import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    SecondMenuList:[]
  },
  mutations:{
    setSecondMenuList(state,v){
      state.SecondMenuList=v;
    },
    pushItemToSecondMenu(state,v){
      state.SecondMenuList.push(v);
    }
  },
  actions:{
     addItemToSecondMenu(){

     }
  }
});
