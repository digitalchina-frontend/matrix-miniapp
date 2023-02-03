// components/filter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    filters:[
      {
        name:'全部类型',
        key:'type',
        options:[
          '全部类型','自然风光','名胜古迹','文博场馆','游船演出','亲子乐园','动植物园','体育赛事','其他'
        ]
      },
      {
        name:'全部地区',
        key:'area',
        options:[
          '全部地区','江岸区','江汉区','硚口区','汉阳区','武昌区'
        ]
      },
      {
        key:'sort',
        name:'智能排序',
        options:[
          '智能排序','距离优先','价格优先'
        ]
      }
    ],
    activeKey:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
