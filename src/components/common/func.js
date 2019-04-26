export default{
    // 经纬度数组转普通数组
    lnglatToNormal(a){
      let r=[]
      a.map(e=>{
        r.push([e.lat,e.lng])
      })
      return r;
    },
    // 获取经济重心值
    getEconomicCenter(){

    },
    // 获取人口重心值
    getPopulationCenter(){

    },
    //获取紧凑度
    getCompactness(){

    },
    //  获取形状比
    getShapeRatio(){

    },
    //  获取延伸率
    getPercentageElongation(){

    },
//  获取年份
   getYears(){
      let i=1990,arr=[];
      for(;i<2019;i++){
        arr.push({

          name:i,
        })
      }
      return arr
   }
}
