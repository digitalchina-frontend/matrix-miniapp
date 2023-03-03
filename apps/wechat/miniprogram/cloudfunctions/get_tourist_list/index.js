// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const fakeData = [];
  for (let index = 0; index < 20; index++) {
    fakeData.push({
      name: '景区' + (event.startIndex + index),
      img: 'https://picsum.photos/200?' + new Date().getTime() + '' + index,
      desc: '这是一个景区' + (event.startIndex + index),
      tags: ['公园', '打卡圣地'],
      price: Math.floor(Math.random() * 100),
      distance: (Math.random() * 100).toFixed(2),
      height: 260 + Math.floor(Math.random() * 40),
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
