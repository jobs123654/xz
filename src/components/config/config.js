export default {
  //标题
  title:'基于GIS的城市空间形态量算与分析系统',
  //地图配置
  map:{
    option:{
      crs:L.CRS.EPSG4326,
        center: [20, 80],//[117.67 , 39.65],
        maxZoom: 18,
        zoom: 2,
       measureControl:true,
    },
      url:"http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World",
      dataUrl:"http://support.supermap.com.cn:8090/iserver/services/data-world/rest/data",
      // url:"http://localhost:8090/iserver/services/map-hebei/rest/maps/base",
      // dataUrl:"http://localhost:8090/iserver/services/data-hebei/rest/data",
  },
  //导航菜单
  resourceMenu:[
    {
      name:'基础操作',
      children:[
        {
          name:'空间量算'
        },
        {
          name:'比例尺',
        },
        {
          name:'地图鹰眼',
        },
        {
          name:'地图平移',
        },
          {
              name:'清除',
          }
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
          {
              name:'清除',
          }
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
          {
              name:'清除',
          }
      ]
    },
    // {
    //   name:'城市空间量算',
    // },
    {
      name:'专题地图',
    },
    {
      name:'个人信息',
    },

  ],
//    在线编辑
    edit:[
        {
          name:'dot',
            title:'点选',
            _class:'btn btn-default glyphicon glyphicon-hand-up'
        },
        {
            name:'more',
            title:'批量选择',
            _class:'btn btn-default glyphicon glyphicon-link'
        },
        {
            name:'property',
            title:'属性',
            _class:'btn btn-default glyphicon glyphicon-pencil'
        },{
            name:'ok',
            title:'完成',
            _class:'btn btn-default glyphicon glyphicon-ok'
        },
    ]
}
