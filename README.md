# ts-vue-class-component-wp4-mobx-starter

**安装**

> npm i

**开发模式**

> npm run dev

**切换环境**

> npm config set crh-account-close-app:env development  (开发)

> npm config set crh-account-close-app:env test         (测试)

> npm config set crh-account-close-app:env production   (正式)

`切换API也类似，可把env换成api，客户也同理，env换成client，其他也可以根据需求追加配置项`

**正式打包**

> npm run build （文件打包到dist目录）

`每次打包前请确认config set是否设置正确，最好是每次打包前都重新配置命令过一次`

**开发规则**

* 凡是Vue组件一律写到 components中，根据类型分别放置 

  * modules (功能性为主，如上传组件)
  * pages (页面容器，一般为router定义的组件)
  * partials (可复用的局部UI容器，如 Footer Header)

* 样式风格，兼容css或stylus。`stylus 风格遵循格式：可以不带分号跟冒号，但必须要有大括号`，举例：

```stylus
html, body {
  font-size 20px
}
```

* 样式书写规则:

  * 所有变量数据统一放入 
  `src/assets/styles/themes/${CLIENT}/var.styl`，client 是对应前面提到的打包设置里的客户id，默认是default，这个文件会自动载入到每个stylus文件头部，确保不用import也可以调用变量数据，凡是可定义皮肤的颜色，按钮大小尺寸，函数方法等都要放置到这个样式内。
  
  * `src/assets/styles/global.styl` 这个文件为项目全局生效的样式，往里写样式前请确认样式是需要在全部页面都影响到的，如一些元素的默认样式，且这个样式不会因客户id的改变而发生很大的变化，如是可变的则放入对应的 `theme/${CLIENT}` 目录下。
  
  * 组件样式以及资源（包括页面组件）都单独放在组件目录下的 assets子目录里。如 
  `src/components/pages/home-page/assets`，assets目录里面的结构规则可以参考 src/assets

  * 功能性组件 (components/modules) 里的样式尽量精简跟独立，尽量不要依赖于全局的样式

* 组件开发注意点:
 
 * 页面组件需要用到数据共享的（跨页面的数据状态保持）请使用 Mobx **注意：功能性组件不要使用!会增加依赖**，且必须在 src/models 中定义对应的数据模型，如 账号数据可用 Account.ts或js，这里建议使用 ts，即便只加了简单的属性类型检查也可以。一些临时的数据可以直接用 Vue 自带的即可。

 * 尽量减少使用双向绑定 v-model（单向数据流可以减少一定的bug产出，如果逻辑不复杂可以使用）

 * 功能性组件尽量不做全局的事件抛出，转由容器组件代发。

 ```
 // 举例，上传功能组件上传完毕后，向外抛出一个 complete 事件：
 this.$emit('complete', uploadedFile);

 // 容器组件
 <Uploader @complete="onUploadSuccess" />
 ...
 import AppObserver from '@lib/...';
 onUploadSuccess(uploadedFile) {
   // 转发
   AppObserver.$emit('UPLOAD_SUCCESS', uploadedFile);
 }

 // 其他组件接收，处理
AppObserver.$on('UPLOAD_SUCCESS', uploadedFile => ...);
 ```

* 配置文件 (src/config)

  * 路由: router
  * 接口返回的code特殊状态对应的文案（默认接口自带了可被覆盖）: api-code
  * 不同客户常用文案: text
  * 其他的根据需要可以不断加入

`原则：尽量把字段文案变为可配置化，包括一些 input前面的label，即能做到统一也能方便万一要做成多国语言`

`如果一些配置信息可能频繁的在 Vue template 中渲染的，可以考虑放到 $lib/appGlobal中，这个会自动注入 Vue.prototype.$App 中`

* 第三方组件的选用原则，以及自开发的库注意点

  * 第三方： 依赖少，用户量大，尽量能在多端使用。如 axios
  * 自己开发：自己尽量做全面的自测，能编写测试脚本最佳。

* 接口调用:

  * 尽量不要直接在组件里直接调用，而是通过 model 里面写对应的方法来获取
  * 接口异常的反馈会有全局的事件抛出，可以单独写捕获组件来做对应处理，不要在具体的业务组件里去每个都单独处理
  * 涉及到接口的部分代码注释尽量详细，入参跟输出可以都写上去，发生变化了也要及时更新


* 几个核心库的选定，同类的不要再引入

  * 路由: vue-router
  * 状态管理: Mobx
  * 接口请求: axios
  * 其他待定...

`Promise部分尽量可以使用 try { async / await } + catch {} 的方式来代替，减少页面的逻辑嵌套`
