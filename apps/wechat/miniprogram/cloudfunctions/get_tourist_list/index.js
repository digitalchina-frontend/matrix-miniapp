// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const nameSpace = [
    '武汉科学技术馆（武汉）',
    '辛亥革命博物馆',
    '八七会议地址纪念馆',
    '武汉横渡长江博物馆',
    '湖北美术馆',
    '武汉博物馆',
    '黄鹤楼',
    '木兰天池',
    '东湖',
    '武大樱园',
    '汉口江滩',
    '武汉欢乐谷',
    '楚河汉街',
    '湖北省博物馆',
  ];

  const descSpace = [
    '公园',
    '打卡圣地',
    '科普地标',
    '互动新颖',
    '遛娃打卡',
    '红色教育',
    '党史教育',
    '城市名片',
    '国家一级',
    '感悟艺术',
    '品味生活',
    '大江大河',
  ];

  const fakeData = [];
  for (let index = 0; index < 20; index++) {
    let Arr = [...descSpace];
    let arrNew = [];
    for (let i = 0; i < 3; i++) {
      let _num = Math.floor(Math.random() * Arr.length);
      let mm = Arr[_num];
      Arr.splice(_num, 1);
      arrNew.push(mm);
    }

    fakeData.push({
      name: nameSpace[index % nameSpace.length],
      img: 'https://picsum.photos/200?' + new Date().getTime() + '' + index,
      desc: '寓教于乐的科普基地',
      tags: arrNew,
      price: 0,
      distance: (Math.random() * 100).toFixed(2),
      height: 250 + Math.floor(Math.random() * 80),
      ifHot: Math.random() > 0.7,
    });
  }
  return {
    list: fakeData.sort((a, b) => {
      return Math.random() > 0.5 ? -1 : 1;
    }),
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};
