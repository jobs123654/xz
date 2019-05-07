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
    getResultForJCD(e){
      if (Array.isArray(e)&&e.length>0){
        return e.map(i=>Math.sqrt(parseFloat(i.properties['area']))/parseFloat(i.properties['length']))
      }
    },
   //获取人口经济重心
   getimportant(param,index){
     const getCoorX= (e,i)=>{
       if (e)
         return  e.coor[0]*e.num[i].num
     };
     const getCoorY=  (e,i)=>{
       if (e)
         return  e.coor[1]*e.num[i].num
     };

     //i 年的结果[人口、经济]
     let x=0,y=0,n=0;
     param.map(e=>{
       x+=getCoorX(e,index)
       n+=parseFloat(e.num[index].num)
       y+=getCoorY(e,index)
     })
     return [x/n,y/n]
   },
//  获取年份
   getYears(){
      return [
          '2019','2000','1975',
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
