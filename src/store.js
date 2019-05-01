import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    SecondMenuList:[],
    user:{
      zh:'0000',
      name:'2019',
      pwd:'',
      sex:'男',
      email:'1234565432@qq.com',
      phone:'15532456754',
      address:'北京市朝阳区',
    },
    showCenter:false,
    distance:0,
    area:0,
    features:[],
    queryParam:{},
    currentLayer:{},
    currentPolygon:{},
    currentResult:{}
  },
  mutations:{
    setSecondMenuList(state,v){
      state.SecondMenuList=v;
    },
    pushItemToSecondMenu(state,v){
      state.SecondMenuList.push(v);
    },
    setQueryParam(state,v){
        state.queryParam=v;
    },
    setCurrentResult(state,v){
      state.currentResult=v;
    },
    setCurrentPolygon(state,v){
      state.currentPolygon=v;
    },
    putCurrentLayer(state,v){
      state.currentLayer=v;
    },
    setFeatures(state,v){
      state.features=v;
    },

    clearFeatures(state){
      state.features=[]
    },
    setUser(state,v){
      state.user=v;
    },
    setShowCenter(state,v){
      state.showCenter=v;
    },
    setDistance(state,v){
       state.distance=v;
    },
    setArea(state,v){
       state.area=v;
    }
  },
  actions:{
     addItemToSecondMenu(){

     }
  }
});
