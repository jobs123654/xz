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
      return [
          '2019','2000','1982',
      ]
   },
//    创建id
    getRanDomID(){
        let i=5,j=0,r=''
        for (;j<5;j++){
            r+=Math.ceil(Math.random()*9)
        }
        return r
    }
}
