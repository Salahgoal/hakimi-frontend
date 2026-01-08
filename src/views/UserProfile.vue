<template>
  <div class="user-profile">
    <!-- 1. 顶部导航：与其他页面保持一致的IMDB风格 -->
    <el-header class="header" shadow="bottom">
      <div class="header-container">
        <el-row align="middle" justify="space-between">
          <!-- 网站标题 -->
          <el-col>
            <h1 class="site-title">哈基米<span class="title-highlight">电影</span></h1>
          </el-col>

          <!-- 主导航菜单 -->
          <el-col>
            <el-menu
              default-active="3"
              mode="horizontal"
              background-color="transparent"
              text-color="#b3b3b3"
              active-text-color="#f5c518"
              router
            >
              <el-menu-item index="1" :route="{ path: '/' }">
                <el-icon><House /></el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><Film /></el-icon>
                <span>电影</span>
              </el-menu-item>
              <el-menu-item index="3" :route="{ path: '/user-profile' }">
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </el-header>

    <!-- 2. 个人中心内容区 -->
    <div class="main-container">
      <div class="content-container">
        <!-- 用户信息卡片 -->
        <div class="user-info-card">
          <div class="user-avatar">
            <img
              src="https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar%20portrait%20professional%20headshot%20neutral%20background&image_size=square"
              alt="用户头像"
              class="avatar-img"
            />
          </div>
          <div class="user-details">
            <h2 class="user-name">哈基米用户</h2>
            <p class="user-stats">
              <span class="stat-item"
                >看过 <strong>{{ watchedMovies.length }}</strong> 部电影</span
              >
              <span class="stat-item"
                >想看 <strong>{{ watchlistMovies.length }}</strong> 部电影</span
              >
              <span class="stat-item"
                >发表 <strong>{{ ratings.length }}</strong> 条评价</span
              >
            </p>
          </div>
        </div>

        <!-- 电影列表标签页 -->
        <el-tabs v-model="activeTab" class="movie-tabs">
          <!-- 看过的电影 -->
          <el-tab-pane label="看过的电影" name="watched">
            <el-row :gutter="24" class="movie-grid">
              <el-col
                v-for="movie in watchedMovies"
                :key="movie.id"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="5"
                class="movie-col"
              >
                <div class="movie-card">
                  <div class="poster-container">
                    <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
                    <div class="score-tag">
                      <span class="score-icon">★</span>
                      <span class="score-value">{{ movie.score }}</span>
                    </div>
                  </div>
                  <div class="movie-info">
                    <h3 class="movie-title">{{ movie.title }}</h3>
                    <div class="user-rating" v-if="getUserRating(movie.id)">
                      <span class="rating-label">我的评分：</span>
                      <span class="rating-stars">{{
                        getRatingStars(getUserRating(movie.id))
                      }}</span>
                    </div>
                    <router-link
                      :to="{ path: '/movie-detail', query: { id: movie.id } }"
                      class="detail-btn"
                    >
                      查看详情
                    </router-link>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 想看的电影 -->
          <el-tab-pane label="想看的电影" name="watchlist">
            <el-row :gutter="24" class="movie-grid">
              <el-col
                v-for="movie in watchlistMovies"
                :key="movie.id"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="5"
                class="movie-col"
              >
                <div class="movie-card">
                  <div class="poster-container">
                    <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
                    <div class="score-tag">
                      <span class="score-icon">★</span>
                      <span class="score-value">{{ movie.score }}</span>
                    </div>
                  </div>
                  <div class="movie-info">
                    <h3 class="movie-title">{{ movie.title }}</h3>
                    <div class="watchlist-status">
                      <el-tag size="small" type="info">已加入想看</el-tag>
                    </div>
                    <router-link
                      :to="{ path: '/movie-detail', query: { id: movie.id } }"
                      class="detail-btn"
                    >
                      查看详情
                    </router-link>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 我的评分与评价 -->
          <el-tab-pane label="我的评分与评价" name="ratings">
            <div class="ratings-list">
              <div v-for="rating in ratings" :key="rating.id" class="rating-item">
                <div class="rating-movie-info">
                  <img
                    :src="getMoviePoster(rating.movieId)"
                    :alt="getMovieTitle(rating.movieId)"
                    class="rating-movie-poster"
                  />
                  <div class="rating-movie-details">
                    <h3 class="rating-movie-title">{{ getMovieTitle(rating.movieId) }}</h3>
                    <div class="rating-stars">{{ getRatingStars(rating.score) }}</div>
                    <div class="rating-date">{{ rating.date }}</div>
                  </div>
                </div>
                <div class="rating-content">
                  <p class="rating-comment">{{ rating.comment }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 底部：与其他页面保持一致 -->
    <el-footer class="footer">
      <div class="footer-content">
        <p>© 2026 哈基米电影 版权所有</p>
        <p>基于IMDB风格设计 | 探索电影的无限可能</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { House, Film, User } from '@element-plus/icons-vue'
import poster1 from '@/assets/images/1.webp'
import poster2 from '@/assets/images/2.webp'
import poster3 from '@/assets/images/3.webp'
import poster4 from '@/assets/images/4.webp'
import poster5 from '@/assets/images/5.webp'
import poster6 from '@/assets/images/6.webp'
import poster7 from '@/assets/images/7.webp'
import poster8 from '@/assets/images/8.webp'
import poster9 from '@/assets/images/9.webp'
import poster10 from '@/assets/images/10.webp'

// 响应式数据
const activeTab = ref('watched')

// 模拟用户数据
const watchedMovies = ref([
  {
    id: 1,
    title: '肖申克的救赎',
    score: 9.7,
    poster: poster1,
  },
  {
    id: 2,
    title: '霸王别姬',
    score: 9.6,
    poster: poster2,
  },
  {
    id: 3,
    title: '教父',
    score: 9.6,
    poster: poster3,
  },
  {
    id: 4,
    title: '阿甘正传',
    score: 9.5,
    poster: poster5,
  },
])

const watchlistMovies = ref([
  {
    id: 5,
    title: '泰坦尼克号',
    score: 9.5,
    poster: poster6,
  },
  {
    id: 6,
    title: '千与千寻',
    score: 9.4,
    poster: poster7,
  },
  {
    id: 7,
    title: '盗梦空间',
    score: 9.3,
    poster: poster8,
  },
])

const ratings = ref([
  {
    id: 1,
    movieId: 1,
    score: 5,
    comment: '经典中的经典，每一次观看都有新的感悟。自由的力量是无穷的。',
    date: '2026-01-01',
  },
  {
    id: 2,
    movieId: 2,
    score: 5,
    comment: '中国电影的巅峰之作，程蝶衣的形象深入人心。',
    date: '2026-01-02',
  },
  {
    id: 3,
    movieId: 3,
    score: 4.5,
    comment: '黑帮电影的教科书，马龙·白兰度的表演堪称完美。',
    date: '2026-01-03',
  },
])

// 方法：获取用户对电影的评分
const getUserRating = (movieId) => {
  const rating = ratings.value.find((r) => r.movieId === movieId)
  return rating ? rating.score : null
}

// 方法：获取电影海报
const getMoviePoster = (movieId) => {
  const movie = [...watchedMovies.value, ...watchlistMovies.value].find((m) => m.id === movieId)
  return movie ? movie.poster : ''
}

// 方法：获取电影标题
const getMovieTitle = (movieId) => {
  const movie = [...watchedMovies.value, ...watchlistMovies.value].find((m) => m.id === movieId)
  return movie ? movie.title : '未知电影'
}

// 方法：将评分转换为星级
const getRatingStars = (score) => {
  const fullStars = Math.floor(score)
  const hasHalfStar = score % 1 >= 0.5
  let stars = ''

  for (let i = 0; i < fullStars; i++) {
    stars += '★'
  }

  if (hasHalfStar) {
    stars += '☆'
  }

  return stars
}
</script>

<style scoped>
/* 全局样式变量：与其他页面保持一致 */
:root {
  --imdb-bg-primary: #121212;
  --imdb-bg-secondary: #1e1e1e;
  --imdb-bg-tertiary: #2d2d2d;
  --imdb-accent-gold: #f5c518;
  --imdb-text-primary: #ffffff;
  --imdb-text-secondary: #b3b3b3;
  --imdb-text-tertiary: #808080;
  --imdb-border-color: #333333;
  --imdb-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 全局布局 */
.user-profile {
  min-height: 100vh;
  background-color: var(--imdb-bg-primary);
  color: var(--imdb-text-primary);
}

/* 顶部导航：与其他页面保持一致 */
.header {
  background-color: var(--imdb-bg-secondary);
  padding: 0;
  height: 60px;
  z-index: 20;
  position: relative;
  border-bottom: 1px solid var(--imdb-border-color);
}

.header-container {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
}

.site-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--imdb-text-primary);
  margin: 0;
}

.title-highlight {
  color: var(--imdb-accent-gold);
}

/* 主内容区 */
.main-container {
  padding: 30px 0;
  min-height: calc(100vh - 180px);
}

.content-container {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
}

/* 用户信息卡片 */
.user-info-card {
  display: flex;
  align-items: center;
  background-color: var(--imdb-bg-secondary);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid var(--imdb-border-color);
}

.user-avatar {
  margin-right: 30px;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--imdb-accent-gold);
}

.user-details h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--imdb-text-primary);
  margin: 0 0 10px 0;
}

.user-stats {
  display: flex;
  gap: 30px;
  margin: 0;
  color: var(--imdb-text-secondary);
}

.stat-item strong {
  color: var(--imdb-accent-gold);
  margin-left: 5px;
}

/* 电影标签页 */
.movie-tabs {
  background-color: var(--imdb-bg-secondary);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--imdb-border-color);
}

/* 电影网格布局 */
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 20px;
}

.movie-col {
  flex: 0 0 calc(20% - 24px);
  max-width: calc(20% - 24px);
}

/* 电影卡片：与其他页面保持一致 */
.movie-card {
  background-color: var(--imdb-bg-tertiary);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--imdb-border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--imdb-shadow);
  border-color: var(--imdb-accent-gold);
}

.poster-container {
  position: relative;
  height: 320px;
  overflow: hidden;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.movie-card:hover .movie-poster {
  transform: scale(1.05);
}

.score-tag {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--imdb-accent-gold);
  color: var(--imdb-bg-primary);
  font-size: 14px;
  font-weight: 700;
  padding: 6px 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
}

.score-icon {
  font-size: 12px;
}

.score-value {
  font-size: 14px;
}

/* 电影信息 */
.movie-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--imdb-text-primary);
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-rating {
  margin: 8px 0;
  color: var(--imdb-text-secondary);
  font-size: 14px;
}

.rating-label {
  margin-right: 5px;
}

.rating-stars {
  color: var(--imdb-accent-gold);
  font-size: 14px;
}

.watchlist-status {
  margin: 8px 0;
}

.detail-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: var(--imdb-accent-gold);
  color: var(--imdb-bg-primary);
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: center;
  margin-top: auto;
}

.detail-btn:hover {
  background-color: #e6b400;
  color: var(--imdb-bg-primary);
  transform: translateY(-1px);
}

/* 评分列表 */
.ratings-list {
  margin-top: 20px;
}

.rating-item {
  background-color: var(--imdb-bg-tertiary);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--imdb-border-color);
}

.rating-movie-info {
  display: flex;
  margin-bottom: 15px;
}

.rating-movie-poster {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.rating-movie-details {
  flex: 1;
}

.rating-movie-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--imdb-text-primary);
  margin: 0 0 10px 0;
}

.rating-date {
  color: var(--imdb-text-tertiary);
  font-size: 14px;
  margin-top: 5px;
}

.rating-content {
  margin-top: 10px;
}

.rating-comment {
  color: var(--imdb-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* 底部：与其他页面保持一致 */
.footer {
  background-color: var(--imdb-bg-secondary);
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid var(--imdb-border-color);
  margin-top: 40px;
}

.footer-content {
  color: var(--imdb-text-secondary);
  font-size: 14px;
}

.footer-content p {
  margin: 0 0 6px 0;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .movie-col {
    flex: 0 0 calc(25% - 24px);
    max-width: calc(25% - 24px);
  }

  .poster-container {
    height: 280px;
  }
}

@media screen and (max-width: 992px) {
  .movie-col {
    flex: 0 0 calc(33.333% - 24px);
    max-width: calc(33.333% - 24px);
  }

  .poster-container {
    height: 240px;
  }

  .user-info-card {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .user-avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 768px) {
  .movie-col {
    flex: 0 0 calc(50% - 24px);
    max-width: calc(50% - 24px);
  }

  .poster-container {
    height: 200px;
  }

  .header {
    height: 50px;
  }

  .site-title {
    font-size: 20px;
  }

  .main-container {
    padding: 20px 0;
  }
}

@media screen and (max-width: 480px) {
  .movie-col {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .poster-container {
    height: 180px;
  }

  .header {
    height: 45px;
  }

  .site-title {
    font-size: 18px;
  }

  .user-info-card {
    padding: 16px;
  }

  .avatar-img {
    width: 80px;
    height: 80px;
  }

  .user-details h2 {
    font-size: 20px;
  }

  .user-stats {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .rating-movie-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .rating-movie-poster {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
