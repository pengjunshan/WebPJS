import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入第三方vue-tree-table
import TreeTable from 'vue-table-with-tree-grid'
//公共css样式
import './assets/css/base.css'

//elementui库
// import './plugins/element.js'

// 导入工具类
import './utils.js'

// 导入axios
import './axios.js'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor, /* { default global options } */)

//阻止显示生产模式的消息
Vue.config.productionTip = false

// 把treetable添加到全局组件中
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
