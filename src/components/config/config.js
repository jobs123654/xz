export default {
  //标题
  title:'基于GIS的城市空间形态量算与分析系统',
  //地图配置
  map:{
    option:{
      crs:L.Proj.CRS("EPSG:4326", {
        origin: [114.59, 42.31],
        scaleDenominators: [100000, 50000, 25000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 1]
      }),
       center: [39.79, 116.85],
       maxZoom: 5,
       zoom: 0,
    },
    url:"http://support.supermap.com.cn:8090/iserver/services/map-jingjin/rest/maps/京津地区地图",
  },
  //导航菜单
  resourceMenu:[
    {
      name:'基础操作',
      children:[
        {
          name:'地图缩放',
        },
        {
          name:'地图鹰眼',
        },
        {
          name:'地图平移',
        },
      ]
    },
    {
      name:'数据管理',
      children:[
        {
          name:'数据检索',
        },
        {
          name:'在线编辑',
        },
      ]
    },
    {
      name:'形态分析',
      children:[
        {
          name:'重心迁移分析',
        },
        {
          name:'紧凑度分析',
        },
        {
          name:'延伸率分析',
        },
        {
          name:'形状比分析',
        },
      ]
    },
    // {
    //   name:'城市空间量算',
    // },
    {
      name:'专题地图',
    },
    {
      name:'个人中心',
    },
  ]
}
