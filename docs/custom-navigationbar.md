---
sidebar: auto
---

# 定制微信小程序导航栏样式

## 介绍

为了能够吸引用户注意，突出品牌形象，设计师在设计小程序主页时往往会在导航栏位置摆放一个宣传海报或欢迎语来突出主题；为了视觉上的美观，开发者需要修改默认导航栏的背景图片或者进行更深程度的样式定制。

在 web 开发中，这一点很容易做到，但是在微信小程序里，你需要了解微信提供的可配置选项以及相应的限制。

在阅读本文档后，您将能够：

- 通过配置隐藏默认导航栏
- 通过配置修改小程序菜单（胶囊按钮）的配色方案
- 使用微信基础 API 获取不同机型的状态栏高度
- 创建自定义导航栏组件以定制背景图片

## 自定义的边界

首先，小程序右上角的胶囊按钮的内容是不可自定义的，只能配置深色、浅色模式，官方文档是这样描述的：

> 小程序的所有页面，包括小程序内嵌网页和插件，微信都会在其右上角放置官方小程序菜单（胶囊按钮），开发者不可对其内容自定义，但可选择深浅两种基本配色以适应页面设计风格。官方小程序菜单将放置在界面固定位置，开发者在设计界面时请预留出该区域空间，若需要在此区域附近放置可交互元素，要特别注意交互事件是否会冲突，操作是否容易被使用

开发者可以控制的区域如图所示：

![wx-navigation](/images/matrix/miniapp/wx-navigation.png)

## 如何修改胶囊按钮的配色方案

要在微信小程序中配置配色方案，你需要在根目录下的 `app.json` 中配置 `navigationBarTextStyle` 字段：

```json
{
  "window": {
    "navigationBarTextStyle": "black" // 仅支持 black / white
  }
}
```

或者在页面组件的 `.json` 中配置：

```json
{
  "navigationBarTextStyle": "black"
}
```

两种配置方式的区别在于，根目录下的配置对所有页面生效，页面组件下的配置仅对该页面生效，同时配置两者时，优先级为：`页面 > 全局`。

`navigationBarTextStyle` 字段配置的是导航栏标题颜色，微信会根据标题颜色自动使用不同的配色方案，对应关系为：

```
"navigationBarTextStyle": "black" => 浅色主题
"navigationBarTextStyle": "white" => 深色主题
```

## 如何定制导航栏

首先，导航栏本身是支持配置的，但是可配置的内容比较有限，只能满足比较简单的需求，比如：修改导航栏背景色、添加一个返回主页按钮等；
如果你想修改导航栏的背景图片或是进行更深程度的定制，就需要开发一个自定义导航栏以替换默认导航栏。

在这一小节，你将创建一个自定义导航栏组件并还原默认导航栏的样式，最后修改背景图片。

### 第一步：隐藏默认导航栏

打开页面组件的 `.json` 配置文件并添加以下配置：

```json
{
  "navigationStyle": "custom"
}
```

重新编译后，默认导航栏就被隐藏了，但是你会发现页面内容和状态栏重叠到了一起，如图所示：

<img src="/images/matrix/miniapp/custom-navigation.png" alt="custom-navigation" style="width: 200px; margin:1rem;" />

### 第二步：实现一个样式和默认导航栏一致的自定义导航栏

现在你需要分析默认导航栏实现的功能和特性，尝试从头开始创建一个新的导航栏，实现和默认导航栏一致的功能：

- 固定在页面顶部
- 为系统状态栏留白
- 居中显示页面标题
- 在非首页、非页面栈最底层页面中展示回退按钮

1. 创建一个新组件：`navigationBar`，使用以下代码作为组件模板：

```html
<wxs src="./index.wxs" module="computed" />
<view class="dc-navigation">
  <view class="dc-navigation__content">
    <view
      wx:if="{{ computed.isSubPage({ currentPages }) }}"
      bindtap="back"
      class="dc-navigation__back icon-back"
    >
      back
    </view>
    自定义导航栏
  </view>
</view>
```

将导航栏固定在顶部，居中显示页面标题，并为系统状态栏留白：

```css
.dc-navigation {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: var(--status-bar-height); /* 为状态栏留白 */
  line-height: var(--nav-height);
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dc-navigation__content {
  text-align: center;
}

.dc-navigation__back {
  position: absolute;
  left: 1rem;
}
```

:::tip
系统状态栏默认为透明底，如果不给导航栏设置背景颜色，随着用户向下滚动页面，页面内容会透过状态栏显示出来，如图：

<img src="/images/matrix/miniapp/status-bar.png" alt="status-bar" style="width: 200px; margin:1rem;" />
:::

2. 获取页面路由栈，在非首页、非页面栈最底层页面中展示回退按钮：

首先获取路由栈：

```js
Component({
  data: {
    currentPages: [],
  },
  lifetimes: {
    attached: function () {
      this.getCurrentPages();
    },
  },
  methods: {
    getCurrentPages: function () {
      const currentPages = getCurrentPages();
      this.setData({
        currentPages,
      });
    },
    back: function () {
      wx.navigateBack();
    },
  },
});
```

在 wxs 文件中根据状态 `currentPages` 计算当前页是否为子页面：

```js
function isSubPage(data) {
  return data.currentPages.length > 1;
}

module.exports = {
  isSubPage: isSubPage,
};
```

:::tip
`getCurrentPages()` 是官方 API，[了解更多](https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html)
:::

3. 创建一个新组件：`pageLayout`，使用以下代码作为组件模板：

```html
<wxs src="./index.wxs" module="computed" />
<view class="page-layout" style="{{ computed.styles({ statusBarHeight }) }}">
  <navigation-bar />
  <slot></slot>
</view>
```

由于导航栏需要固定在页面顶部，已经脱离了文档流，所以我们要为布局组件添加 `padding-top`，防止页面内容被导航栏遮挡，但在这之前，我们需要获取不同机型的状态栏高度

```js
// pages/custom-navigationbar/components/pageLayout/index.js
Component({
  data: {
    statusBarHeight: 0,
  },
  lifetimes: {
    attached: function () {
      this.getStatusBarHeight();
    },
  },
  methods: {
    getStatusBarHeight: function () {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            statusBarHeight: res.statusBarHeight,
          });
        },
      });
    },
  },
});
```

使用 wxs 将 `statusBarHeight` 转换为一个 `style` 字符串，以声明 CSS 变量：

```js
function styles(data) {
  return '--status-bar-height:' + data.statusBarHeight + 'px';
}

module.exports = {
  styles: styles,
};
```

添加样式：

```css
.page-layout {
  --nav-height: 44px; /* 微信默认导航栏高度 */
  padding-top: calc(
    var(--status-bar-height) + var(--nav-height)
  ); /* 导航栏已经脱离文档流，为其留白 */
}
```

### 第三步：修改导航栏背景图片

在 `navigationBar` 组件的 `.wxss` 中添加以下声明：

```css{7,9}
.dc-navigation {
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: var(--status-bar-height);  /* 为状态栏留白 */
  line-height: var(--nav-height);
  background: url(https://636c-cloud1......) 20% 0%/150rpx 100% no-repeat;
  background-color: white;
  background-origin: content-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
```

## 总结

恭喜，您已经完成了这一部分的学习！

花点时间回想一下你到目前为止学到了什么，挑战一下自己，凭记忆回答以下问题：

- 如何修改胶囊按钮的配色？
- 如何隐藏默认导航栏？
- 如何为系统状态栏留白？
- 怎么在 CSS 中使用 JS 变量？

### 要点

- 微信小程序不支持自定义胶囊按钮的内容，仅支持配置深色/浅色模式
- 如果想深度定制导航栏，无法仅通过配置做到，也无法继承微信的组件，只能从新开发一个以替代微信导航栏
- 系统状态栏和胶囊按钮会覆盖在自定义导航栏之上，定制导航栏时需要注意为其留白
- 系统状态栏默认为透明色，需要在其下方填充一个背景色防止页面内容透过系统状态栏显示出来
- 自定义导航栏通常固定在页面顶部，脱离了文档流，需要注意为其留白防止页面内容被遮挡

### Source · Demo

- Source：[GitHub](https://github.com/digitalchina-frontend/matrix-miniapp/tree/main/apps/wechat/miniprogram/pages/custom-navigationbar)
- Demo：<br><img src="/images/matrix/miniapp/custom-navigationbar.jpg" alt="custom-navigationbar" style="width: 200px; margin:1rem;">
