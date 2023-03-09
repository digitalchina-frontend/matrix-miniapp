import{_ as p,M as l,p as c,q as o,R as n,t as s,N as t,a1 as e}from"./framework-5866ffd3.js";const i="/matrix-miniapp/images/matrix/miniapp/scroll-tolower.png",u="/matrix-miniapp/images/matrix/miniapp/scenic-filter.png",r="/matrix-miniapp/images/matrix/miniapp/scroll-top.png",d="/matrix-miniapp/images/matrix/miniapp/scroll-animation.png",k="/matrix-miniapp/images/matrix/miniapp/matrix-mw001.png",m={},v=e(`<h1 id="景区列表" tabindex="-1"><a class="header-anchor" href="#景区列表" aria-hidden="true">#</a> 景区列表</h1><h2 id="业务背景" tabindex="-1"><a class="header-anchor" href="#业务背景" aria-hidden="true">#</a> 业务背景</h2><p>景区旅游是旅游行业中一个细分领域，主要涵盖了各种自然风景、人文景观、历史遗迹、博物馆等旅游景点。景区旅游具有独特的旅游价值，是人们观光、休闲、自然体验、文化交流的重要途径。</p><p>随着人们生活水平的不断提高，景区旅游的需求也在不断增长。为了满足游客的多样化需求，景区旅游业提供了各种多样的旅游产品，如导游服务、景区门票、住宿餐饮等。</p><p>景区旅游业在开展业务时，需要考虑多方面的因素，如景区规划、游客安全、环境保护、服务质量等。同时，景区旅游业也需要适应市场变化，不断提升服务水平，提高游客满意度。</p><p>在景区旅游业的发展过程中，旅游信息化技术发挥着重要作用。例如，通过景区旅游 APP 和网站，游客可以方便地预订门票和服务，同时也可以了解景区的详细信息。因此，景区旅游业也需要不断探索信息化技术，以提高服务效率</p><h2 id="业务场景" tabindex="-1"><a class="header-anchor" href="#业务场景" aria-hidden="true">#</a> 业务场景</h2><p>作为一个 驴友， 我希望通过 一款小程序 查看到 目的地相关的景区列表， 从而快速检索 目的的相关的景区的关键信息</p><ul><li><p>在快速检索的过程中 我希望了解到 景区的评级，用户的评分等级，往年的人流量/接待量 ...</p></li><li><p>我希望能够 按照 多个不同的维度 对信息进行排序</p></li></ul><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2><p>对上述业务场景进行分析后，从技术的角度，景区列表这一功能可以拆分出以下子功能：</p><ul><li>数据展现：向用户展示所有景点的相关信息（包括景点图片、景点名称、景点类型、门票价格等）；</li><li>数据分页：当数据量较大时，一次性请求并渲染所有景点会导致性能问题，需要提供上拉加载更多功能，对数据进行分页展示；</li><li>数据过滤：不同的用户有不同的述求，需要提供筛选器，以便于用户按照景点类型、景点所在地等维度对数据进行过滤；</li><li>数据排序：需要提供选择器，以便于用户按照门票价格、相对距离等重要的指标对数据进行排序；</li><li>数据刷新：用户可能在一个页面停留较长时间，如果在这期间数据更新了，需要提供下拉刷新功能手动刷新数据。</li></ul><p>整个解决方案会添加一个页面组件和两个业务组件，涉及的部分目录结构如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>miniprogram
├── components
│   ├── filter
│   └── scenicSpotCard
├── pages
│   └── scenicSpotList
└── app.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p><ul><li><code>Filter</code> 组件是顶部的选择器组，负责提供 UI 让用户选择过滤、排序的选项，并在用户选择后通知 <code>ScenicSpotList</code> 拉取对应数据；</li><li><code>ScenicSpotCard</code> 组件是景点卡片，负责渲染景点的图片和相关信息；</li><li><code>scenicSpotList</code> 组件是景点列表，负责管理景点卡片，提供数据拉取、渲染、分页、刷新等功能。</li></ul><h3 id="功能点一-数据展现" tabindex="-1"><a class="header-anchor" href="#功能点一-数据展现" aria-hidden="true">#</a> 功能点一：数据展现</h3>`,17),g={href:"https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html",target:"_blank",rel:"noopener noreferrer"},h=n("code",null,"<scroll-view>",-1),b=e('<div class="custom-container tip"><p class="custom-container-title">为什么使用 scroll-view 而不是 view ？</p><p>首先，不用 <code>&lt;scroll-view&gt;</code>，开发者自己通过 <code>&lt;view&gt;</code> 也能实现这些功能。</p><p>使用 <code>&lt;scroll-view&gt;</code> 的目的在于节约造轮子所花的时间，因为这个组件提供了“滚动浏览”这一常见场景下的特殊业务功能，比如：</p><ul><li>控制滚动位置，并提供过渡的动画效果</li><li>监听滚动至顶部/底部的对应事件</li><li>等等</li></ul><p>因此，选用 <code>&lt;scroll-view&gt;</code> 而不是 <code>&lt;view&gt;</code> 可以帮助我们提升开发效率。</p></div>',1),q=n("code",null,"wx:for",-1),w={href:"https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html",target:"_blank",rel:"noopener noreferrer"},x=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--pages/scenicSpotList/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scroll-view</span> <span class="token attr-name">scroll-y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scroll-view-item<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">wx:</span>for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{list}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">wx:</span>key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 景点卡片的内容 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后完善景点卡片的内容并封装为 <code>ScenicSpotCard</code>：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--components/scenicSportCard/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{item.img}}<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>content<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- ... --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">为什么要封装景点卡片？</p><p>封装景点卡片的目的主要是让代码更加利于理解和维护，以及未来在其他业务场景中复用它的可能性。</p><p>但主要还是为了可维护性，把繁杂的代码拆分为更小粒度的代码块，用合适的名称命名组件，都有利于团队成员维护这块代码。</p></div><h3 id="功能点二-数据分页" tabindex="-1"><a class="header-anchor" href="#功能点二-数据分页" aria-hidden="true">#</a> 功能点二：数据分页</h3><p>在生产环境中，数据源中往往会有大量的数据，如果一次性向数据源请求所有景点数据并显示，会造成以下问题：</p><ol><li>数据库要处理大量的数据，负载过高影响数据库性能；</li><li>网络开销大，响应速度慢，用户体验差。</li></ol><p>所以，用分页的形式展示数据是很有必要的；有别于传统 Web 开发中分页器的形式，在移动端应用中，实现数据分页的形式往往是上拉加载更多（或者叫无限滚动列表），即在用户滚动时动态附加数据项，一次性增加的数据项称为一页数据，直到用户遍历完所有页的数据。</p><p>在微信小程序中，可以监听 <code>scrolltolower</code> 事件来检查何时滚动至页面底部，然后加载更多数据。</p><p><img src="`+i+`" alt="scroll-tolower"></p><p>无限滚动的基础实现：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--pages/scenicSpotList/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scroll-view</span> <span class="token attr-name">scroll-y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">bindscrolltolower</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scrolltolower<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- ... --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// pages/scenicSpotList/index.js</span>
<span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">scrolltolower</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 防抖</span>
    <span class="token comment">// 更多数据检查</span>
    <span class="token comment">// 附加更多数据</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="可选的优化方案" tabindex="-1"><a class="header-anchor" href="#可选的优化方案" aria-hidden="true">#</a> 可选的优化方案</h4><p>在完成基础的无限滚动列表后，接下来要考虑的就是它的性能问题；当列表中的元素页数非常多时，我们可以回收一些不在视口中的元素来优化性能。</p>`,15),f={href:"https://github.com/wechat-miniprogram/recycle-view",target:"_blank",rel:"noopener noreferrer"},_=e(`<ol><li>设置最低限度的列表长度（后称 listSize），listSize 要比视口在一个时刻可以显示的最大项数要大，通常是它的 3 倍（即前一屏、当前屏、后一屏），并且一旦确定就不再动态增减元素，也就意味着要用重新渲染新数据模拟加载数据的效果；</li><li>监听滚动事件，在滚动至两端时重新渲染列表并调整滚动位置；</li><li>为了不影响用户的使用体验，每次重新渲染都要为视图容器填充相同高度的空元素（使用内边距 <code>padding</code> 替代空元素性能更好）。</li></ol><h3 id="功能点三-数据过滤" tabindex="-1"><a class="header-anchor" href="#功能点三-数据过滤" aria-hidden="true">#</a> 功能点三：数据过滤</h3><p>由于景点列表的数据是分页展示的，前端页面不具备全量数据，所以数据过滤功能通常由后端 API 实现，前端只需提供选择器的视图，并将参数传递给后端 API 即可。</p><p>在景点列表中添加选择器 UI：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--pages/scenicSpotList/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- ... --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line"> </div><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--components/filter/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 展开下拉列表时的遮罩 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mask<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">wx:</span>if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{activeKey}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">bindtap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>closeSelect<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>filter-container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name"><span class="token namespace">wx:</span>for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{filters}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">wx:</span>key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>key<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>filter-item<span class="token punctuation">&quot;</span></span> <span class="token attr-name">bindtap</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>openSelect<span class="token punctuation">&quot;</span></span> <span class="token attr-name">data-key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{item.key}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 选择器标签，包含文本和箭头 --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>select-container<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">wx:</span>if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{activeKey===item.key}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- 下拉选项列表 --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上术语对应 UI 如图所示：</p><p><img src="`+u+'" alt="scenic-filter"></p>',8),S={href:"https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html",target:"_blank",rel:"noopener noreferrer"},y=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--pages/scenicSpotList/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- getList 是自定义事件的名称，refresh 是重新请求数据的方法 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name"><span class="token namespace">bind:</span>getList</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>refresh<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- ... --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// components/filter/index.js</span>
<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">selectItem</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 将用户的选择作为参数触发自定义事件 getList</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">triggerEvent</span><span class="token punctuation">(</span><span class="token string">&#39;getList&#39;</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="需要注意的细节" tabindex="-1"><a class="header-anchor" href="#需要注意的细节" aria-hidden="true">#</a> 需要注意的细节:</h4><p>用户可能会在滚动列表一段时间后对数据进行过滤，此时需要重置分页相关状态并重置滚动位置。</p>`,4),L={href:"https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html",target:"_blank",rel:"noopener noreferrer"},j=n("code",null,"<scroll-view>",-1),E=e('<p><img src="'+r+'" alt="scroll-top"><img src="'+d+`" alt="scroll-animation"></p><p>首先，绑定一个用于控制滚动条位置的状态：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--pages/scenicSpotList/index.wxml--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name"><span class="token namespace">bind:</span>getList</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>refresh<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scroll-view</span> <span class="token attr-name">scroll-y</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scroll-top</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{top}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scroll-with-animation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">bindscrolltolower</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scrolltolower<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- ... --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scroll-view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line"> </div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在合适的时机重置状态 <code>top</code> 即可：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// pages/scenicSpotList/index.js</span>
<span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 重置分页状态</span>
    <span class="token comment">// 请求列表数据</span>
    <span class="token comment">// 重置滚动位置</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="功能点四-数据排序" tabindex="-1"><a class="header-anchor" href="#功能点四-数据排序" aria-hidden="true">#</a> 功能点四：数据排序</h3><p>数据排序的实现在<a href="#%E5%8A%9F%E8%83%BD%E7%82%B9%E4%B8%89-%E6%95%B0%E6%8D%AE%E8%BF%87%E6%BB%A4">功能点三：数据过滤</a>中已经讲述，区别只是向后端传递参数不同，这里不再赘述。</p><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>以上就是这篇文章的所有内容，希望这篇文章能够帮助到你！</p><h2 id="source-·-demo" tabindex="-1"><a class="header-anchor" href="#source-·-demo" aria-hidden="true">#</a> Source · Demo</h2>`,10),B={href:"https://github.com/digitalchina-frontend/matrix-miniapp/tree/main/apps/wechat/miniprogram/domains/tour/pages/mw001",target:"_blank",rel:"noopener noreferrer"},I=n("li",null,[s("Demo："),n("br"),n("img",{src:k,alt:"matrix",style:{width:"200px",margin:"1rem"}})],-1),A=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),s(" 参考")],-1),C={href:"https://developers.weixin.qq.com/miniprogram/dev/framework/",target:"_blank",rel:"noopener noreferrer"},P={href:"https://medium.com/walmartglobaltech/infinite-scrolling-the-right-way-11b098a08815",target:"_blank",rel:"noopener noreferrer"};function D(N,M){const a=l("ExternalLinkIcon");return c(),o("div",null,[v,n("p",null,[s("一个景点列表往往包含了多个景点卡片，卡片的数量是不确定的，那么列表的高度往往会超出页面，因此需要一个可以滚动浏览的视图（通常是纵向滚动）对内容进行展示，在微信小程序中，视图容器 "),n("a",g,[h,t(a)]),s(" 可以满足这一需求。")]),b,n("p",null,[s("有了视图容器，接下来可以使用 "),q,s(" 控制属性绑定一个数组，使用数组中的各项数据渲染景点卡片，细节参考："),n("a",w,[s("WXML 语法参考 / 列表渲染"),t(a)]),s("。")]),x,n("p",null,[s("微信小程序提供了一套官方解决方案 "),n("a",f,[s("recycle-view "),t(a)]),s("，只要列表中的每一项都固定高度就可以使用，基本思路是：")]),_,n("p",null,[s("最后通过 "),n("a",S,[s("事件通信"),t(a)]),s(" 的方式，在用户选择过滤选项后，通知景点列表组件传递对应参数并刷新列表：")]),y,n("p",null,[s("如何以较好的用户体验重置滚动位置，可以使用 "),n("a",L,[j,t(a)]),s(" 中的以下属性做到：")]),E,n("ul",null,[n("li",null,[s("Source："),n("a",B,[s("GitHub"),t(a)])]),I]),A,n("ul",null,[n("li",null,[n("a",C,[s("微信官方文档"),t(a)])]),n("li",null,[n("a",P,[s("Infinite Scroll’ing the right way"),t(a)])])])])}const W=p(m,[["render",D],["__file","MW001.html.vue"]]);export{W as default};
