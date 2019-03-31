export default {
  //标题
  title:'基于GIS的城市空间形态量算与分析系统',
  //地图配置
  map:{
    option:{
      crs: L.CRS.NonEarthCRS({
        bounds: L.bounds([48.4, -7668.25],[8958.85, -55.58]),
        origin: L.point(48.4,-55.58)
      }),
       center: [-4500, 4000],
       maxZoom: 18,
       zoom: 1
    }
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
