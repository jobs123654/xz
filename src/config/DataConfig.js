/*重心分析数据*/
export default {
  getNum(n){
    let s=n+``, i=6;
    for(let  j=0;j<i;j++){
      s+=Math.ceil(Math.random()*9)
    }
    return s;
  }
}
