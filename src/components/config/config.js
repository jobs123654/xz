export default {
  //标题
  title:'基于GIS的城市空间形态量算与分析系统',
  //地图配置
  map:{
    option:{
      crs:L.CRS.EPSG4326,
        center: [ 39.56,118.34],//[117.67 , 39.65],
        // maxZoom: 10,
        zoom: 8,
       measureControl:true,
    },
      url:"http://101.200.50.47:8090/iserver/services/map-00/rest/maps/唐山市",
      dataUrl:"http://101.200.50.47:8090/iserver/services/data-00/rest/data",
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
          name:'视图切换',
        },

      ],
      event:'showTool'
    },
    {
      name:'在线编辑',
      children:[

      ],
      event:'showEdit'
    },
      {
          name:'区域网格',
          children:[
          ],
          event:'areaGridShow'
      },
    {
      name:'形态分析',
      children:[
        // {
        //   name:'重心迁移分析',
        // },
        // {
        //   name:'紧凑度分析',
        // },
        // {
        //   name:'延伸率分析',
        // },
        // {
        //   name:'形状比分析',
        // },

      ],
      event:'xingtai'
    },

    // {
    //   name:'专题地图',
    //   children:[],
    //   event:'themeShow'
    // },
    {
      name:'个人信息',
      children:[],
      event:''
    },

  ],
//    在线编辑
    edit: {
       tools:[
         {
           name:'dot',
           title:'点选',
           _class:'btn btn-default glyphicon glyphicon-hand-up',
           event:'queryByPoint',
         },
         {
           name:'more',
           title:'画面',
           _class:'btn btn-default glyphicon glyphicon-link',
           event:'drawPolygon',
         },
         {
           name:'property',
           title:'属性',
           _class:'btn btn-default glyphicon glyphicon-pencil',
           event:'',
         }
       ],
       areas:[
         {

           name:'选择用地类型',

           checked:false,
         },
         {

           name:'居住用地',

           checked:false,
         },
         {
           name:'公共设施用地',

           checked:false,
         },
         {
           name:'商业用地',

           checked:false,
         },
         {
           name:'工业用地',

           checked:false,
         },
         {
           name:'道路交通用地',

           checked:false,
         },
       ]
    },
//   指标计算
   target:{
     title:'指标分析',
     selectTitle:'选择指标',
     selectTime:'选择年份',
     cityTitle:'选择城区',
     items:[
       {
         name:'重心迁移分析',
         children:[
           {
             name:'经济重心迁移'
           },
           {
             name:'人口重心迁移'
           },
         ]
       },
       {
         name:'延伸率分析',
       },
       {
         name:'形状比分析',
       },
       {
         name:'紧凑度分析',
       },

     ],
     citys:[
       {
         id:'1',
         name:'路南区',
         isChecked:false
       },
       {
         id:'2',
         name:'路北区',
         isChecked:false
       },
       {
         id:'3',
         name:'丰南区',
         isChecked:false
       },
       {
         id:'4',
         name:'丰润区',
         isChecked:false
       },
       {
         id:'5',
         name:'滦南县',
         isChecked:false
       },
       {
         id:'6',
         name:'唐海县',
         isChecked:false
       },
     ],
   },
//   查询
   citysQuery:{
     dataSourceName:'11111111111',
     dataSetName:'',//Capitals
   },


//专题图
  theme:{
    props:[
      {
        name:'属性1',
      },
      {
        name:'属性2',
      },
    ],
    fillColor:'#CCFFFF',
    strokeColor:'#CCFF00',
    opacity:'1',
  },
//区域网格
    areaGrid:[
        {
            year:'2019',
            color:'red',
            type:[
                {

                    name:'居住用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'公共设施用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'商业用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'工业用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'道路交通用地',
                    url:'',
                    checked:false,
                },

            ]
        },
        {
            year:'2000',
            color:'blue',
            type:[
                {

                    name:'居住用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'公共服务用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'公共设施用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'工业用地',
                    url:'',
                    checked:false,

                },
                {
                    name:'行政办公用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'教育用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'公园',
                    url:'',
                    checked:false,
                },

            ]
        },
        {
            year:'1975',
            color:'yellow',
            type:[
                {

                    name:'居住用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'公共设施用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'商业用地',
                    url:'',
                    checked:false,
                },
                {
                    name:'工业用地',
                    url:'',
                    checked:false,

                },
                {
                    name:'道路交通用地',
                    url:'',
                    checked:false,
                },

            ]
        },
    ],
    maps:[
        {
            name:'标准视图',
            url:'http://101.200.50.47:8090/iserver/services/map-00/rest/maps/唐山市'
        },
        {
            name:'2019年',
            url:'http://101.200.50.47:8090/iserver/services/map-00/rest/maps/唐山市2019'
        },
        {
            name:'2000年',
            url:'http://101.200.50.47:8090/iserver/services/map-00/rest/maps/唐山市2000'
        },
        {
            name:'1975年',
            url:'http://101.200.50.47:8090/iserver/services/map-00/rest/maps/唐山市1975'
        },
    ]
}
