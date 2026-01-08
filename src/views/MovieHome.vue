<template>
  <div class="movie-home">
    <!-- 1. 顶部导航：IMDB风格 - 深色背景 + 金色强调 -->
    <el-header class="header" shadow="bottom">
      <div class="header-container">
        <el-row align="middle" justify="space-between">
          <!-- 网站标题：保留"哈基米电影" -->
          <el-col>
            <h1 class="site-title">哈基米<span class="title-highlight">电影</span></h1>
          </el-col>

          <!-- 主导航菜单：IMDB风格的导航选项 -->
          <el-col>
            <el-menu
              default-active="1"
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
              <el-menu-item index="2" :route="{ path: '/movie-collection' }">
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

    <!-- 2. 搜索区：IMDB风格的搜索框 -->
    <div class="search-section" :class="{ sticky: isScrolled }">
      <div class="content-container">
        <div class="search-wrapper">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索电影、电视剧、演员、导演..."
            prefix-icon="Search"
            class="search-input"
          >
            <template #append>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 3. 主内容区：电影列表 -->
    <div class="main-container">
      <div class="content-container">
        <el-row :gutter="30">
          <!-- 电影列表：IMDB风格的网格布局 -->
          <el-col :xs="24" class="content-col">
            <!-- 页面标题 -->
            <div class="page-header">
              <h2 class="page-title">哈基米电影</h2>
              <p class="page-subtitle">探索全球最受欢迎的电影</p>
            </div>

            <!-- 电影列表：IMDB风格的网格布局 -->
            <el-row gutter="24" class="movie-grid">
              <el-col
                v-for="movie in filteredMovies"
                :key="movie.id"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="5"
                class="movie-col"
              >
                <div class="movie-card">
                  <!-- 海报区域：IMDB风格 - 大尺寸海报 + 评分标签 -->
                  <div class="poster-container">
                    <img
                      :src="movie.poster"
                      :alt="movie.title"
                      class="movie-poster"
                      @error="handlePosterError"
                    />
                    <!-- 排名标签 -->
                    <div class="rank-tag">{{ movie.rank }}</div>
                    <!-- 评分标签 -->
                    <div class="score-tag">
                      <span class="score-icon">★</span>
                      <span class="score-value">{{ movie.score }}</span>
                    </div>
                  </div>

                  <!-- 电影信息：IMDB风格的紧凑布局 -->
                  <div class="movie-info">
                    <h3 class="movie-title">{{ movie.title }}</h3>
                    <p class="movie-desc">{{ movie.desc }}</p>
                    <!-- 查看详情按钮：IMDB风格的金色按钮 -->
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
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 4. 底部：IMDB风格的深色底部 -->
    <el-footer class="footer">
      <div class="footer-content">
        <p>© 2026 哈基米电影 版权所有</p>
        <p>基于IMDB风格设计 | 探索电影的无限可能</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { House, Film, User } from '@element-plus/icons-vue'
const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster'

// 1. 响应式数据：搜索关键词
const searchKeyword = ref('')
const isScrolled = ref(false)
// 路由实例
const router = useRouter()

// 5. 滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
}

// 6. 处理海报加载失败
const handlePosterError = (e) => {
  e.target.src = defaultPoster
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 2. 原始电影数据（可后续抽离到 api/movie.js 中，通过 Axios 获取）
const movieData = ref([
  {
    id: 1,
    rank: 1,
    title: '肖申克的救赎',
    score: 9.7,
    desc: '银行家蒙冤入狱，以坚韧与智慧终获自由，诠释希望的力量。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 2,
    rank: 2,
    title: '霸王别姬',
    score: 9.6,
    desc: '京剧师徒的一生沉浮，与时代交织的人性悲歌。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDI2ZTk1NmQtMjBlOC00MDVmLTg2MTMtMWM4ODlmZmE5YzAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 3,
    rank: 3,
    title: '教父',
    score: 9.6,
    desc: '黑手党家族的兴衰史，迈克尔从平民蜕变为新一代教父。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
  },
  {
    id: 4,
    rank: 4,
    title: '教父2',
    score: 9.5,
    desc: '双线叙事，讲述老教父发家史与新教父的家族扩张。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
  },
  {
    id: 5,
    rank: 5,
    title: '阿甘正传',
    score: 9.5,
    desc: '智商75的阿甘，用坚持与善良书写传奇人生。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 6,
    rank: 6,
    title: '泰坦尼克号',
    score: 9.5,
    desc: '豪华邮轮沉没之际，穷画家与贵族少女的凄美爱情。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
  },
  {
    id: 7,
    rank: 7,
    title: '千与千寻',
    score: 9.4,
    desc: '少女千寻意外来到神灵世界，在汤屋工作成长的奇幻冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 8,
    rank: 8,
    title: '盗梦空间',
    score: 9.3,
    desc: '造梦师柯布通过共享梦境窃取机密，却陷入层层梦境迷宫。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
  },
  {
    id: 9,
    rank: 9,
    title: '星际穿越',
    score: 9.3,
    desc: '宇航员 Cooper 穿越虫洞寻找新家园，拯救地球上的人类。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 10,
    rank: 10,
    title: '忠犬八公的故事',
    score: 9.3,
    desc: '秋田犬八公每天到车站等待已故主人，坚守十年的感人故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTY5MzQ1NjcyMl5BMl5BanBnXkFtZTcwOTc4MjQ1Mw@@._V1_.jpg',
  },
  {
    id: 11,
    rank: 11,
    title: '这个杀手不太冷',
    score: 9.4,
    desc: '职业杀手与小女孩的忘年之交，在黑帮追杀中绽放人性光辉。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTc5MDY1MzY1MF5BMl5BanBnXkFtZTcwOTg4OTQzMQ@@._V1_.jpg',
  },
  {
    id: 12,
    rank: 12,
    title: '楚门的世界',
    score: 9.2,
    desc: '楚门发现自己生活在真人秀中，决心冲破虚假世界寻找真相。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDExZGMyMDYtY2JlNC00MGI1LWJiMDUtYWU3M2Y5NjU2MDVkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 13,
    rank: 13,
    title: '三傻大闹宝莱坞',
    score: 9.2,
    desc: '三个大学生的校园故事，对传统教育制度的幽默批判。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzE0NjMxMzE2OV5BMl5BanBnXkFtZTcwODk1MTUyMw@@._V1_.jpg',
  },
  {
    id: 14,
    rank: 14,
    title: '放牛班的春天',
    score: 9.3,
    desc: '音乐老师用歌声感化问题少年，在寄宿学校创造奇迹。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzA0NjY4NjQtNjRlOC00MGVmLTg4MmQtYTQ5MjM4MWQ0MGVhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  },
  {
    id: 15,
    rank: 15,
    title: '活着',
    score: 9.3,
    desc: '福贵一生历经磨难，在动荡年代中坚强生存的人生史诗。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTk3OTQ2ODg4MF5BMl5BanBnXkFtZTcwNDQ0NzU3Mw@@._V1_.jpg',
  },
  {
    id: 16,
    rank: 16,
    title: '海上钢琴师',
    score: 9.3,
    desc: '天才钢琴师1900一生从未下船，在海上演绎传奇人生。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA4NDEzNzEyMl5BMl5BanBnXkFtZTcwNTgwMDk1Mw@@._V1_.jpg',
  },
  {
    id: 17,
    rank: 17,
    title: '机器人总动员',
    score: 9.3,
    desc: '机器人 WALL-E 在废弃地球遇到 EVE，展开太空冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_.jpg',
  },
  {
    id: 18,
    rank: 18,
    title: '寻梦环游记',
    score: 9.1,
    desc: '男孩米格穿越到亡灵世界，寻找音乐梦想与家族秘密。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjIxMDkxNDA3OV5BMl5BanBnXkFtZTgwNjE5MTIzMzI@._V1_.jpg',
  },
  {
    id: 19,
    rank: 19,
    title: '心灵奇旅',
    score: 9.1,
    desc: '灵魂导师与失意音乐老师的旅程，探索生命的真正意义。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzIxMjYwMzY4Nl5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
  },
  {
    id: 20,
    rank: 20,
    title: '疯狂动物城',
    score: 9.2,
    desc: '兔子朱迪成为警察，与狐狸尼克联手破解动物城谜案。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjQzNDI4NTA3MF5BMl5BanBnXkFtZTgwNzY1OTQzMDI@._V1_.jpg',
  },
])

// 计算属性：自动筛选电影（响应搜索条件变化）
const filteredMovies = computed(() => {
  let result = [...movieData.value]

  // 关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(
      (movie) =>
        movie.title.toLowerCase().includes(keyword) || movie.desc.toLowerCase().includes(keyword),
    )
  }

  return result
})

// 4. 方法：处理搜索
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词！')
    return
  }
  // 跳转到电影大全页面并传递搜索关键词
  router.push({
    path: '/movie-collection',
    query: { keyword: searchKeyword.value.trim() },
  })
}
</script>

<style scoped>
/* IMDB风格的全局样式变量 */
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
.movie-home {
  min-height: 100vh;
  background-color: var(--imdb-bg-primary);
  color: var(--imdb-text-primary);
}

/* 1. 顶部导航：IMDB风格 - 深色背景 + 金色强调 */
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

/* 2. 搜索区：IMDB风格的搜索框 */
.search-section {
  background-color: var(--imdb-bg-secondary);
  padding: 20px 0;
  border-bottom: 1px solid var(--imdb-border-color);
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 滚动时的固定效果 */
.search-section.sticky {
  position: sticky;
  top: 0;
  z-index: 15;
  margin-top: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 3. 主内容区：左侧筛选 + 右侧电影列表 */
.main-container {
  padding: 30px 0;
  min-height: calc(100vh - 180px);
}

.content-container {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
}

/* 内容区 */
.content-col {
  padding-left: 0 !important;
}

/* 页面标题 */
.page-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--imdb-border-color);
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--imdb-text-primary);
  margin: 0 0 8px 0;
}

.page-subtitle {
  color: var(--imdb-text-secondary);
  margin: 0;
  font-size: 16px;
}

/* 搜索栏 */
.search-wrapper {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 800px;
  background-color: var(--imdb-bg-tertiary);
  border-color: var(--imdb-border-color);
  color: var(--imdb-text-primary);
  border-radius: 4px;
}

.search-input:focus {
  border-color: var(--imdb-accent-gold);
  box-shadow: 0 0 0 2px rgba(245, 197, 24, 0.2);
}

.search-input::placeholder {
  color: var(--imdb-text-tertiary);
}

/* 电影网格布局 */
.movie-grid {
  justify-content: flex-start;
}

.movie-col {
  margin-bottom: 30px;
}

/* 电影卡片：IMDB风格 */
.movie-card {
  background-color: var(--imdb-bg-secondary);
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

/* 海报容器：IMDB风格 */
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

/* 排名标签：IMDB风格的左上角排名 */
.rank-tag {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--imdb-accent-gold);
  color: var(--imdb-bg-primary);
  font-size: 14px;
  font-weight: 700;
  padding: 4px 10px;
  z-index: 2;
}

/* 评分标签：IMDB风格的右上角评分 */
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

/* 电影信息：IMDB风格的紧凑布局 */
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

.movie-desc {
  font-size: 13px;
  color: var(--imdb-text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.4;
  flex: 1;
}

/* 查看详情按钮：IMDB风格的金色按钮 */
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

/* 底部：IMDB风格的深色底部 */
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

/* 响应式设计：IMDB风格的移动端适配 */
@media screen and (max-width: 1200px) {
  .poster-container {
    height: 280px;
  }
}

@media screen and (max-width: 992px) {
  .sidebar-col {
    position: static;
    margin-bottom: 30px;
  }

  .content-col {
    padding-left: 0 !important;
  }

  .poster-container {
    height: 240px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .header {
    height: 50px;
  }

  .site-title {
    font-size: 20px;
  }

  .main-container {
    padding: 20px 0;
  }

  .poster-container {
    height: 200px;
  }

  .movie-col {
    margin-bottom: 20px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 20px;
  }

  .sidebar {
    padding: 16px;
  }

  .sidebar-title {
    font-size: 16px;
    margin-bottom: 16px;
  }
}

@media screen and (max-width: 480px) {
  .header {
    height: 45px;
  }

  .site-title {
    font-size: 18px;
  }

  .search-section {
    padding: 16px 0;
    margin-top: 8px;
  }

  .main-container {
    padding: 16px 0;
  }

  .poster-container {
    height: 180px;
  }

  .movie-info {
    padding: 12px;
  }

  .movie-title {
    font-size: 14px;
  }

  .movie-desc {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .detail-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .score-tag {
    padding: 4px 8px;
    font-size: 12px;
  }

  .rank-tag {
    padding: 3px 8px;
    font-size: 12px;
  }
}
</style>
