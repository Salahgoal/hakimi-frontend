import { createRouter, createWebHistory } from 'vue-router'
// 导入电影列表组件
import MovieHome from '../views/MovieHome.vue'
// 导入电影详情组件
import MovieDetail from '../views/MovieDetail.vue'
// 导入个人中心组件
import UserProfile from '../views/UserProfile.vue'
// 导入电影大全组件
import MovieCollection from '../views/MovieCollection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Vite语法（Vue CLI用process.env.BASE_URL）
  routes: [
    {
      path: '/', // 根路径指向电影列表
      name: 'MovieHome',
      component: MovieHome,
    },
    // 添加详情页路由
    {
      path: '/movie-detail',
      name: 'MovieDetail',
      component: MovieDetail,
    },
    // 添加个人中心路由
    {
      path: '/user-profile',
      name: 'UserProfile',
      component: UserProfile,
    },
    // 添加电影大全路由
    {
      path: '/movie-collection',
      name: 'MovieCollection',
      component: MovieCollection,
    },
  ],
})

export default router
