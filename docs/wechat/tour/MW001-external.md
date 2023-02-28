# wechat 旅游业景区列表制作

## 介绍

带领大家实现微信小程序中的景区列表页面和功能

## 描述

- 本文旨在让初次接手旅游业小程序开发可以快速上手，能够通过文章和 demo 熟悉开发模式和微信 api，尽可能减少学习成本

- 演示 demo 采用微信原生，后续会更新 uniapp 版本

## 需求分析

- 列表展示：景区列表需要以列表形式展示，包括景区名称、缩略图、景区简介等基本信息，方便用户浏览和选择。

- 筛选功能：用户可以通过筛选条件来缩小景区列表范围，例如按照景区类型、地理位置、门票价格等筛选，从而更快地找到自己感兴趣的景区。

- 分页功能：景区列表可能会很长，需要分页展示，每页展示一定数量的景区信息，用户可以通过翻页来查看不同页数的景区列表。

## 目录结构

demo 目录结构展示

```text
page
|—— scenicSpotList
|   |—— compoents
|   |   |—— filter
|   |   |__ scenicSpotCard
|   |__ index.js
|   |__ index.wxml
|   |__ index.json
|   |__ index.wxss
|__app.js
```

## 页面搭建

### **列表展示**

这里和我么搭建 html 页面基本一样，将页面封装为两个组件，分别是顶部数据操作和数据展示，如图

<img src="/images/matrix/miniapp/page.png" width="215"/>

页面结构代码已放在仓库，有需要可自行观看[代码](https://github.com/digitalchina-frontend/matrix-miniapp/blob/main/miniprogram/pages/scenicSpotList/index.wxml)

父组件构造

```html
<!-- 选择器组件，为事件绑定自定义方法 -->
<filter bind:getList="refresh"></filter>
<!-- 数据展示组件 -->
<scroll-view scroll-y="true">
  <scenic-spot-card wx:for="{{list}}" wx:key="name" item="{{item}}" />
  <view wx:if="{{done}}">已全部加载完成</view>
</scroll-view>
```

这里的`<scenic-spot-card>`标签是数据展示组件

```html
<view class="item">
  <image class="img" src="{{item.img}}" bindload="imgLoad"></image>
  <view class="content">...</view>
</view>
```

### **分页功能**

页面进行数据展示时无论 pc 端还是移动端都会面临需要展示很多数据的时候，那这时我们就需要对数据传输数量进行限制，从而减轻服务器压力、提高数据加载的稳定性，增加用户体验感

列表分页还要注意以下几点：

1. 初始数据加载：页面加载时，需要加载第一页的数据并显示在列表中。
2. 滚动加载更多数据：当用户滚动到列表底部时，需要继续加载下一页数据并显示在列表中。

在上面数据展示时使用[scroll-view](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)就是便于进行分页,它是一个可滚动的视图容器，支持各种事件，比如滚动开始和滚动结束等，其中有着两个属性能帮助我们更好的实现分页`bindscrolltolower`和`lower-threshold`

![bindscrolltolower](/images/matrix/miniapp/bindscrolltolower.png)

![lower-threshold](/images/matrix/miniapp/lower-threshold.png)

添加触底事件

```html
<scroll-view class="list" scroll-y="true" bindscrolltolower="onScrollToLower">
  <!-- 列表项 -->
  <scenic-spot-card wx:for="{{list}}" wx:key="name" item="{{item}}" />
  <!-- 加载状态提示 -->
  <view wx:if="{{loading}}">正在加载中...</view>
  <view wx:if="{{noMoreData}}">没有更多数据了</view>
</scroll-view>
```

下面是相关 js 文件

```js
Page({
  data: {
    list: [], // 列表数据
    page: 1, // 当前页数
    pageSize: 10, // 每页数据条数
    loading: false, // 是否正在加载数据
    noMoreData: false, // 是否已经加载完所有数据
  },

  onLoad: function () {
    // 加载第一页数据
    this.loadData();
  },

  // 加载数据
  loadData: function () {
    if (this.data.loading || this.data.noMoreData) {
      // 如果正在加载或已经加载完所有数据，则不再重复加载数据
      return;
    }

    this.setData({ loading: true });

    // 发送网络请求获取数据
    wx.request({
      url: 'xxx',
      data: { page: this.data.page, pageSize: this.data.pageSize },
      success: (res) => {
        const data = res.data;

        if (data.length === 0) {
          // 如果没有更多数据了，则设置状态为已经加载完所有数据
          this.setData({ noMoreData: true });
        } else {
          // 如果还有数据，则将数据添加到列表中
          this.setData({ list: this.data.list.concat(data) });
          this.setData({ page: this.data.page + 1 });
        }
      },
      complete: () => {
        // 请求完成后，将 loading 状态设置为 false
        this.setData({ loading: false });
      },
    });
  },

  // 滚动到底部时触发
  onScrollToLower: function () {
    // 加载下一页数据
    this.loadData();
  },
});
```

### **筛选功能**

筛选功能是列表必不可少的部分，用户需要筛选出符合某些特定条件的数据，这时候就可以使用列表筛选功能来快速定位到所需数据，提供更加个性化的数据查看，降低查找难度，提高用户体验。

实现筛选可以分为以下步骤：

1. 获取筛选条件：通过用户在页面上选择筛选条件，例如选择某个分类、输入搜索关键词等，获取用户选择的筛选条件。
2. 发起请求：将筛选条件作为参数，发起请求获取符合条件的列表数据。
3. 列表展示：将返回的数据渲染在页面上，展示给用户。

在微信原生标签中有着[`<picker>`](https://developers.weixin.qq.com/miniprogram/dev/component/picker.html),但是大多数都不符合我们的需求，我们这里就自己写一个组件。

在列表筛选组件`filter`中添加完整的页面结构

```html
<view>
  <!-- 点击展开遮罩 -->
  <view class="mask" wx:if="{{activeKey}}" bindtap="closeSelect"></view>
  <!-- 对刷选条件展示 -->
  <view class="filter-container">
    <!-- 给每一个可点击下拉的筛选项一个key值 -->
    <view wx:for="{{filters}}" wx:key="key">
      <view class="filter-item" bindtap="openSelect" data-key="{{item.key}}">
        <text class="name“>{{params[item.key]|| item.name}}</text>
        <view class="arrow ">▲</view>
      </view>
      <view class="select-container" wx:if="{{activeKey===item.key}}">
        <view
          class="select-item"
          wx:for="{{item.options}}"
          wx:for-item="option"
          wx:key="option"
          bindtap="selectItem"
          data-key="{{item.key}}"
          data-item="{{option}}"
        >
          {{option}}
        </view>
      </view>
    </view>
  </view>
</view>
```

下面是相关 js 代码

```js
Component({
  data: {
    filters: []，// 获取下拉列表所有数据
    activeKey: "", // 判断遮罩层是否打开
    params: {}, // 放置列表上方可点击下拉的字段
  },
  methods: {

  // 点击选择器
    openSelect(e) {
      // 根据拿到的key值判断是否打开遮罩层
      if (e.currentTarget.dataset.key === this.data.activeKey) {
        this.closeSelect()
      } else {
        // 将key值赋值给activeKey，方便判断点击的是哪个选择器进而渲染数据
        this.setData({
          activeKey: e.currentTarget.dataset.key,
        })
      }
    },
    // 关闭遮罩层
    closeSelect() {
      this.setData({
        activeKey: "",
      })
    },
    // 点击后整合数据调用父组件中的方法
    selectItem(e) {
      const params = {
        ...this.data.params,
        [e.currentTarget.dataset.key]: e.currentTarget.dataset.item,
      }
      this.setData({
        params,
        activeKey: "",
      })

      // <filter bind:getList="refresh"></filter> 调用父组件方法
      this.triggerEvent("getList", params)
    },
  },
})
```

在这个子组件中我们对事件绑定了自定义方法，然后在子组件传值调用了父组件方法可以查看，具体可查看[文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)

### **总结**

到这里我们的景区列表就基本实现了，当然了还有 css 样式没有写出来，可以到[项目仓库](https://github.com/digitalchina-frontend/matrix-miniapp/tree/main/apps/wechat)中去查看

在这一个列表 demo 中我们用到了许多常用微信原生 api，你学会了几个呢，如果你对我们的 demo 有什么[意见或想法](https://github.com/digitalchina-frontend/matrix-miniapp/issues)也可以提出来
