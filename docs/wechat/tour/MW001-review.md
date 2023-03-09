# wechat 旅游业景区列表 UI 调整及云函数 mock 数据

## 介绍

在已有的样式基础上将单列样式改写为双列瀑布流布局，并且将前端 mock 数据转移至云函数

## 需求分析

- 瀑布流布局：景区列表现需要改为双列瀑布流形式展示，单个景区卡片由左右布局改为上下布局。

- 更多筛选：景区列表的筛选维度可能有很多，用户可以点击筛选看到更多的筛选维度选项。

- 云函数：引入云函数模拟数据请求。

## UI 调整

### **瀑布流布局**

将已有单列布局改为瀑布流布局有多种方式，这里在不过多变更原有代码的基础上，我们采用`column-count: 2`的样式整体转为双列瀑布流布局然后进行相应调整

```html
<view class="box">
  <view wx:for="{{list}}" wx:key="name" class="box-item">
    <scenic-spot-card class="scroll-view-item" item="{{item}}" />
  </view>
</view>
```

```css
.box {
  column-count: 2;
  column-gap: 30rpx;
  padding: 32rpx;
}
```

这里会产生一个很棘手的问题，column-count 布局虽然会变成两列瀑布流，但是它的排列顺序是先上下排序，然后再左右排序，与我们正常的需求正好相反：

实际产生的布局效果：

![column-count-1](/images/matrix/miniapp/column-count-1.png)

我们期望的布局效果：

![column-count-2](/images/matrix/miniapp/column-count-2.png)

为了解决这个问题，我们这里将请求的数据进行顺序处理：

```js
const list = res.result.list; //请求到数据
// column-count布局会使数据先从上到下排布，滚动刷新会打乱原有顺序
// 重置数据顺序以实现左右顺序分布
// 1. 将每次分页请求的数据奇偶顺序打乱：[1,2,3,4] --> [1,3,2,4]
let temp = [];
let temp1 = [];
for (let i = 0; i < list.length; i++) {
  i % 2 == 0 ? temp.push(list[i]) : temp1.push(list[i]);
}
const newList = temp.concat(temp1);
// 2. 然后将请求到的数据平分分别插入已有数据中间和最后
const dataList = _this.data.list;
dataList.splice(_this.data.list.length / 2, 0, ...newList.slice(0, 10));

_this.setData({
  list: _this.page === 1 ? newList : dataList.concat(newList.slice(10)),
  triggered: false,
});
```

这样我们就解决了顺序错乱的问题，当然用 css 布局实现瀑布流的方法也还是有问题的，当每个单元高度差距过大导致左右两列高度不平均的情况会出现空白，如果实际需求不会出现高度差距过大的情况可以用这个方案简洁有效，如果需求有这样的情况，可以参考[微信小程序原生瀑布流](https://juejin.cn/post/6844904162170241037)，实现起来会相对来说比较复杂。

### **更多筛选**

景区列表的筛选维度可能有很多，用户可以点击筛选看到更多的筛选维度选项。这里给大家展示常见的单选筛选

![more_select](/images/matrix/miniapp/more_select.png)

在已有的筛选上，将最后一个筛选展开元素改为 form 表单，由于与原生 radio 样式难以修改的原因，这里需要将点击确认前后的表单选择状态分开储存。

```html
<form catchsubmit="formSubmit" catchreset="formReset">
  <view wx:for="{{item.filters}}" wx:key="key" wx:for-item="option">
    <view style="padding: 20rpx 32rpx">
      <text>{{option.text}}</text>
    </view>
    <radio-group
      class="my-radio"
      name="{{option.key}}"
      data-key="{{option.key}}"
      bindchange="radioChange"
    >
      // 确认前后的选择状态分开储存
      <radio
        wx:for="{{option.options}}"
        wx:for-item="option_item"
        wx:key="option_item"
        value="{{option_item}}"
        checked="{{option_item === params[option.key]}}"
        class="radio-index"
      >
        <view class="radio-item {{moreSelect[option.key] === option_item ? 'active' : ''}}">
          {{option_item}}
        </view>
      </radio>
    </radio-group>
  </view>
  <view class="btn-area">
    <button class="reset-btn" formType="reset">重置</button>
    <button class="submit-btn" formType="submit">确认</button>
  </view>
</form>
```

以下是相关 js 代码：

```js
// 利用js控制单选框选中样式
radioChange(e) {
  const moreSelect = {
    ...this.data.moreSelect,
    [e.currentTarget.dataset.key]: e.detail.value,
  };
  this.setData({
    moreSelect, // 确认前的选择状态
  });
},
// 表单重置
formReset() {
  this.setData({
    moreSelect: {},
  });
},
// 点击确认，表单提交
formSubmit(e) {
  const params = {
    ...this.data.params,
    ...e.detail.value,
  };
  this.setData({
    params,
    activeKey: '',
  });
  this.triggerEvent('getList', params);
},
```

这里需要注意修改原生组件样式问题，开发者工具里面不会显示隐藏的组件 css，需要去官方文档示例 F12 寻找，覆盖原有样式需要加`!important`。

```css
/* 修改小程序内置单选框样式，在组件内部修改不生效？ */
.wx-radio-input {
  background-color: #f7f7f7 !important;
  border-color: #f7f7f7 !important;
  width: 160rpx !important;
  height: 60rpx !important;
  border-radius: 60rpx !important;
}
.wx-radio-input.wx-radio-input-checked {
  background: linear-gradient(92.08deg, #ff825a 3.72%, #eb5c30 98.63%) !important;
}
wx-radio .wx-radio-input.wx-radio-input-checked:before {
  content: '' !important;
}
```

## **云函数**

为了模拟真是数据请求环境，我们这里引入云函数 mock 列表数据，首先在新建小程序的时候要勾选云开发，并需要账号开通云开发，以具备云开发的能力。

1. 配置 project.config.json，新建云函数目录

```json
{
  "cloudfunctionRoot": "cloudfunctions/"
}
```

![cloudFun-1](/images/matrix/miniapp/cloudFun-1.png)

2. 右键云函数目录，新建 node.js 云函数

![cloudFun-2](/images/matrix/miniapp/cloudFun-2.png)

3. 编写 node.js 实现所需接口

```js
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
```

至此，一个云函数就新建完成，完成后右键对应接口文件夹上传并部署，等待部署完成就可以调用了。

4. 调用云函数

调用云函数前需要初始化`wx.cloud.init();`，这里推荐在 app.js 中全局调用

然后在请求数据的位置调用即可

```js
wx.cloud
  .callFunction({
    // 云函数名称
    name: 'get_tourist_list',
    // 传给云函数的参数
    data: {
      startIndex: (this.page - 1) * 20 + 1,
    },
  })
  .then(function (res) {
    console.log(res);
  });
```

更多云函数及云开发用法参考微信官方文档[我的第一个云函数](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/getting-started.html)

## **总结**

到这里我们的景区列表 UI 调整及云函数的引用就基本完成了

在这一个列表 demo 中我们用到了许多常用微信原生 api，你学会了几个呢，如果你对我们的 demo 有什么[意见或想法](https://github.com/digitalchina-frontend/matrix-miniapp/issues)也可以提出来
