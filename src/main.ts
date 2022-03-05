import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router"

import App from "./App.vue"

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';



const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import('./pages/index.vue'),
    },
    {
      path: "/todoList",
      component: () => import('./pages/todoListPage.vue')
    },
    {
      path: "/loading",
      component: () => import("./pages/loadingPage.vue")
    },
    {
      path: "/sorttag",
      component: () => import("./pages/sortTagPage.vue")
    },
    
    {
      path: "/number",
      component: () => import("./pages/animationNumberPage.vue")
    },
    {
      path: "/pullList",
      component: () => import("./pages/pullListPage.vue")
    }
  ]
})

const app = createApp(App);

app.use(router).use(Antd).mount('#app')
