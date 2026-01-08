<template>
  <div class="movie-collection">
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
              default-active="2"
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

    <!-- 2. 搜索区：与首页保持一致的IMDB风格 -->
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

    <!-- 3. 主内容区：筛选 + 电影列表 -->
    <div class="main-container">
      <div class="content-container">
        <el-row :gutter="30">
          <!-- 左侧筛选区 -->
          <el-col :xs="24" :md="6" class="sidebar-col">
            <div class="sidebar">
              <h3 class="sidebar-title">筛选电影</h3>

              <!-- 类型筛选 -->
              <div class="filter-group">
                <h4 class="filter-title">类型</h4>
                <el-select v-model="filterType" placeholder="全部类型" clearable>
                  <el-option label="剧情" value="剧情"></el-option>
                  <el-option label="喜剧" value="喜剧"></el-option>
                  <el-option label="动作" value="动作"></el-option>
                  <el-option label="爱情" value="爱情"></el-option>
                  <el-option label="科幻" value="科幻"></el-option>
                  <el-option label="悬疑" value="悬疑"></el-option>
                  <el-option label="恐怖" value="恐怖"></el-option>
                  <el-option label="动画" value="动画"></el-option>
                  <el-option label="冒险" value="冒险"></el-option>
                  <el-option label="犯罪" value="犯罪"></el-option>
                </el-select>
              </div>

              <!-- 地区筛选 -->
              <div class="filter-group">
                <h4 class="filter-title">地区</h4>
                <el-select v-model="filterRegion" placeholder="全部地区" clearable>
                  <el-option label="美国" value="美国"></el-option>
                  <el-option label="中国" value="中国"></el-option>
                  <el-option label="日本" value="日本"></el-option>
                  <el-option label="韩国" value="韩国"></el-option>
                  <el-option label="英国" value="英国"></el-option>
                  <el-option label="法国" value="法国"></el-option>
                  <el-option label="德国" value="德国"></el-option>
                  <el-option label="印度" value="印度"></el-option>
                  <el-option label="意大利" value="意大利"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </div>

              <!-- 排序筛选 -->
              <div class="filter-group">
                <h4 class="filter-title">排序</h4>
                <el-select v-model="filterSort" placeholder="默认排序" clearable>
                  <el-option label="评分从高到低" value="score-desc"></el-option>
                  <el-option label="评分从低到高" value="score-asc"></el-option>
                  <el-option label="排名从高到低" value="rank-desc"></el-option>
                  <el-option label="排名从低到高" value="rank-asc"></el-option>
                  <el-option label="年份从新到旧" value="year-desc"></el-option>
                  <el-option label="年份从旧到新" value="year-asc"></el-option>
                </el-select>
              </div>

              <!-- 重置筛选 -->
              <div class="filter-actions">
                <el-button type="default" @click="resetFilters">重置筛选</el-button>
              </div>
            </div>
          </el-col>

          <!-- 右侧电影列表 -->
          <el-col :xs="24" :md="18" class="content-col">
            <!-- 页面标题 -->
            <div class="page-header">
              <h2 class="page-title">IMDB TOP 100</h2>
              <p class="page-subtitle">全球最受欢迎的100部电影</p>
            </div>

            <!-- 电影列表 -->
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
                  <!-- 海报区域 -->
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

                  <!-- 电影信息 -->
                  <div class="movie-info">
                    <h3 class="movie-title">{{ movie.title }}</h3>
                    <p class="movie-desc">{{ movie.desc }}</p>
                    <!-- 查看详情按钮 -->
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

            <!-- 无结果提示 -->
            <div v-if="filteredMovies.length === 0" class="no-results">
              <el-empty description="未找到匹配的电影"></el-empty>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 4. 底部 -->
    <el-footer class="footer">
      <div class="footer-content">
        <p>© 2026 哈基米电影 版权所有</p>
        <p>基于IMDB风格设计 | 探索电影的无限可能</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { House, Film, User } from '@element-plus/icons-vue'
const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster'

// 1. 响应式数据
const searchKeyword = ref('')
const isScrolled = ref(false)
const filterType = ref('')
const filterRegion = ref('')
const filterSort = ref('')
// 路由实例
const route = useRoute()

// 2. 滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 60
}

// 3. 监听路由参数变化
const handleRouteChange = () => {
  if (route.query.keyword) {
    searchKeyword.value = route.query.keyword
  }
}

// 4. 处理海报加载失败
const handlePosterError = (e) => {
  e.target.src = defaultPoster
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化时检查路由参数
  handleRouteChange()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 监听路由变化
watch(() => route.query, handleRouteChange, { immediate: true })

// 3. IMDB TOP 100 电影数据（前50部）
const movieData = ref([
  {
    id: 1,
    rank: 1,
    title: '肖申克的救赎',
    score: 9.7,
    year: 1994,
    desc: '银行家蒙冤入狱，以坚韧与智慧终获自由，诠释希望的力量。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 2,
    rank: 2,
    title: '霸王别姬',
    score: 9.6,
    year: 1993,
    desc: '京剧师徒的一生沉浮，与时代交织的人性悲歌。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDI2ZTk1NmQtMjBlOC00MDVmLTg2MTMtMWM4ODlmZmE5YzAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '剧情',
    region: '中国',
  },
  {
    id: 3,
    rank: 3,
    title: '教父',
    score: 9.6,
    year: 1972,
    desc: '黑手党家族的兴衰史，迈克尔从平民蜕变为新一代教父。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    type: '犯罪',
    region: '美国',
  },
  {
    id: 4,
    rank: 4,
    title: '教父2',
    score: 9.5,
    year: 1974,
    desc: '双线叙事，讲述老教父发家史与新教父的家族扩张。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    type: '犯罪',
    region: '美国',
  },
  {
    id: 5,
    rank: 5,
    title: '阿甘正传',
    score: 9.5,
    year: 1994,
    desc: '智商75的阿甘，用坚持与善良书写传奇人生。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 6,
    rank: 6,
    title: '泰坦尼克号',
    score: 9.5,
    year: 1997,
    desc: '豪华邮轮沉没之际，穷画家与贵族少女的凄美爱情。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    type: '爱情',
    region: '美国',
  },
  {
    id: 7,
    rank: 7,
    title: '千与千寻',
    score: 9.4,
    year: 2001,
    desc: '少女千寻意外来到神灵世界，在汤屋工作成长的奇幻冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 8,
    rank: 8,
    title: '盗梦空间',
    score: 9.3,
    year: 2010,
    desc: '造梦师柯布通过共享梦境窃取机密，却陷入层层梦境迷宫。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 9,
    rank: 9,
    title: '星际穿越',
    score: 9.3,
    year: 2014,
    desc: '宇航员 Cooper 穿越虫洞寻找新家园，拯救地球上的人类。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 10,
    rank: 10,
    title: '忠犬八公的故事',
    score: 9.3,
    year: 2009,
    desc: '秋田犬八公每天到车站等待已故主人，坚守十年的感人故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTY5MzQ1NjcyMl5BMl5BanBnXkFtZTcwOTc4MjQ1Mw@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 11,
    rank: 11,
    title: '这个杀手不太冷',
    score: 9.4,
    year: 1994,
    desc: '职业杀手与小女孩的忘年之交，在黑帮追杀中绽放人性光辉。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTc5MDY1MzY1MF5BMl5BanBnXkFtZTcwOTg4OTQzMQ@@._V1_.jpg',
    type: '犯罪',
    region: '法国',
  },
  {
    id: 12,
    rank: 12,
    title: '楚门的世界',
    score: 9.2,
    year: 1998,
    desc: '楚门发现自己生活在真人秀中，决心冲破虚假世界寻找真相。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDExZGMyMDYtY2JlNC00MGI1LWJiMDUtYWU3M2Y5NjU2MDVkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 13,
    rank: 13,
    title: '三傻大闹宝莱坞',
    score: 9.2,
    year: 2009,
    desc: '三个大学生的校园故事，对传统教育制度的幽默批判。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzE0NjMxMzE2OV5BMl5BanBnXkFtZTcwODk1MTUyMw@@._V1_.jpg',
    type: '喜剧',
    region: '印度',
  },
  {
    id: 14,
    rank: 14,
    title: '放牛班的春天',
    score: 9.3,
    year: 2004,
    desc: '音乐老师用歌声感化问题少年，在寄宿学校创造奇迹。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzA0NjY4NjQtNjRlOC00MGVmLTg4MmQtYTQ5MjM4MWQ0MGVhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '剧情',
    region: '法国',
  },
  {
    id: 15,
    rank: 15,
    title: '活着',
    score: 9.3,
    year: 1994,
    desc: '福贵一生历经磨难，在动荡年代中坚强生存的人生史诗。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTk3OTQ2ODg4MF5BMl5BanBnXkFtZTcwNDQ0NzU3Mw@@._V1_.jpg',
    type: '剧情',
    region: '中国',
  },
  {
    id: 16,
    rank: 16,
    title: '海上钢琴师',
    score: 9.3,
    year: 1998,
    desc: '天才钢琴师1900一生从未下船，在海上演绎传奇人生。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA4NDEzNzEyMl5BMl5BanBnXkFtZTcwNTgwMDk1Mw@@._V1_.jpg',
    type: '剧情',
    region: '意大利',
  },
  {
    id: 17,
    rank: 17,
    title: '机器人总动员',
    score: 9.3,
    year: 2008,
    desc: '机器人 WALL-E 在废弃地球遇到 EVE，展开太空冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 18,
    rank: 18,
    title: '寻梦环游记',
    score: 9.1,
    year: 2017,
    desc: '男孩米格穿越到亡灵世界，寻找音乐梦想与家族秘密。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjIxMDkxNDA3OV5BMl5BanBnXkFtZTgwNjE5MTIzMzI@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 19,
    rank: 19,
    title: '心灵奇旅',
    score: 9.1,
    year: 2020,
    desc: '灵魂导师与失意音乐老师的旅程，探索生命的真正意义。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzIxMjYwMzY4Nl5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 20,
    rank: 20,
    title: '疯狂动物城',
    score: 9.2,
    year: 2016,
    desc: '兔子朱迪成为警察，与狐狸尼克联手破解动物城谜案。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjQzNDI4NTA3MF5BMl5BanBnXkFtZTgwNzY1OTQzMDI@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 21,
    rank: 21,
    title: '蝙蝠侠：黑暗骑士',
    score: 9.3,
    year: 2008,
    desc: '蝙蝠侠与小丑的巅峰对决，探讨正义与邪恶的边界。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    type: '动作',
    region: '美国',
  },
  {
    id: 22,
    rank: 22,
    title: '十二怒汉',
    score: 9.4,
    year: 1957,
    desc: '12名陪审员对一宗谋杀案的不同看法，展现司法公正的重要性。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 23,
    rank: 23,
    title: '辛德勒的名单',
    score: 9.5,
    year: 1993,
    desc: '商人辛德勒在二战期间拯救犹太人性命的真实故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNWIzZDRkZWUtY2E1MS00NWJkLTkwODQtYTIyYTgxNjU1OGY4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 24,
    rank: 24,
    title: '指环王3：王者无敌',
    score: 9.3,
    year: 2003,
    desc: '中土世界的终极之战，佛罗多与山姆前往末日火山销毁魔戒。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTM5NjMwMw@@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 25,
    rank: 25,
    title: '低俗小说',
    score: 8.9,
    year: 1994,
    desc: '多线叙事的黑色幽默电影，展现黑帮世界的荒诞与人性。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    type: '犯罪',
    region: '美国',
  },
  {
    id: 26,
    rank: 26,
    title: '搏击俱乐部',
    score: 9.0,
    year: 1999,
    desc: '失眠症患者与肥皂制造商组建搏击俱乐部，引发一系列疯狂事件。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzFjMWViNWUtNmIxZS00MjA2LTkwZDEtN2ViYzk4MTNkMGI2XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 27,
    rank: 27,
    title: '指环王2：双塔奇兵',
    score: 9.2,
    year: 2002,
    desc: '佛罗多与山姆继续前往魔多，阿拉贡等人则与洛汗国并肩作战。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzE0YmY4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 28,
    rank: 28,
    title: '指环王1：护戒使者',
    score: 9.1,
    year: 2001,
    desc: '霍比特人佛罗多继承魔戒，踏上销毁魔戒的危险旅程。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 29,
    rank: 29,
    title: '闻香识女人',
    score: 9.1,
    year: 1992,
    desc: '失明退伍军人与高中生的友谊之旅，展现生命的尊严与价值。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BM2NlNmE1Y2EtY2MzOS00OTJlLTg2YTAtZmQxODczMDkwZDM5XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 30,
    rank: 30,
    title: '黑客帝国',
    score: 9.0,
    year: 1999,
    desc: '程序员尼奥发现世界是虚拟的，加入反抗机器的战斗。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 31,
    rank: 31,
    title: '美丽心灵',
    score: 9.0,
    year: 2001,
    desc: '数学家纳什与精神分裂症抗争，最终获得诺贝尔奖的故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzA4ZGM0MWUtZmQ5MS00OGU5LThlZWEtN2JmNjBhZmE1MWNmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 32,
    rank: 32,
    title: '千钧一发',
    score: 8.9,
    year: 1997,
    desc: '在基因决定命运的未来，文森特为实现梦想与 Jerome 交换身份。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 33,
    rank: 33,
    title: '猫鼠游戏',
    score: 8.9,
    year: 2002,
    desc: '天才骗子弗兰克与FBI探员卡尔的猫鼠追逐，展现智慧与毅力的对决。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjRjMzQxNWYtMzczNS00MDc0LWIxN2MtZGM3ZmU3ZWEzNWQzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    type: '犯罪',
    region: '美国',
  },
  {
    id: 34,
    rank: 34,
    title: '致命魔术',
    score: 8.9,
    year: 2006,
    desc: '两位魔术师为争夺顶尖地位，展开一场致命的竞争。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg',
    type: '悬疑',
    region: '美国',
  },
  {
    id: 35,
    rank: 35,
    title: '无间道',
    score: 9.3,
    year: 2002,
    desc: '警察与黑帮的双面卧底，在身份认同的危机中挣扎。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTgzNTIwMDYwM15BMl5BanBnXkFtZTYwMTM0MzY2._V1_.jpg',
    type: '犯罪',
    region: '中国香港',
  },
  {
    id: 36,
    rank: 36,
    title: '当幸福来敲门',
    score: 9.1,
    year: 2006,
    desc: '推销员克里斯·加德纳的奋斗故事，从破产到成功的励志传奇。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAwMDg3MTgwMF5BMl5BanBnXkFtZTcwMTMyNjk1Mw@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 37,
    rank: 37,
    title: '七宗罪',
    score: 8.8,
    year: 1995,
    desc: '两名警探追查连环杀手，凶手按照七宗罪的教义行凶。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '犯罪',
    region: '美国',
  },
  {
    id: 38,
    rank: 38,
    title: '音乐之声',
    score: 9.1,
    year: 1965,
    desc: '修女玛丽亚成为特拉普家庭的家庭教师，用音乐改变他们的生活。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTY5OTM2MDE5NV5BMl5BanBnXkFtZTYwNDg4MzA3._V1_.jpg',
    type: '音乐',
    region: '美国',
  },
  {
    id: 39,
    rank: 39,
    title: '黑客帝国2：重装上阵',
    score: 8.7,
    year: 2003,
    desc: '尼奥继续与机器对抗，探索矩阵的真相和自己的命运。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWJjM2ItNjE4MzA4NGQxNzMyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 40,
    rank: 40,
    title: '黑客帝国3：矩阵革命',
    score: 8.7,
    year: 2003,
    desc: '尼奥与机器的最终对决，决定人类与机器的命运。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzRlYmZmNjMtNjc1OC00NjU3LWJmNjktM2M5NTYzZjE1OWQxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 41,
    rank: 41,
    title: '心灵捕手',
    score: 9.0,
    year: 1997,
    desc: '天才清洁工威尔与心理教授桑恩的心灵对话，寻找自我价值。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 42,
    rank: 42,
    title: '第六感',
    score: 8.9,
    year: 1999,
    desc: '儿童心理学家帮助能看见鬼魂的男孩，发现自己的秘密。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '悬疑',
    region: '美国',
  },
  {
    id: 43,
    rank: 43,
    title: '勇敢的心',
    score: 9.0,
    year: 1995,
    desc: '苏格兰民族英雄威廉·华莱士领导反抗英格兰统治的故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '历史',
    region: '美国',
  },
  {
    id: 44,
    rank: 44,
    title: '角斗士',
    score: 8.9,
    year: 2000,
    desc: '罗马将军马克西姆斯被背叛沦为角斗士，为复仇而战。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '历史',
    region: '美国',
  },
  {
    id: 45,
    rank: 45,
    title: '沉默的羔羊',
    score: 8.9,
    year: 1991,
    desc: '联邦调查局实习生克拉丽斯·史达琳寻求汉尼拔·莱克特博士的帮助，抓捕连环杀手。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '惊悚',
    region: '美国',
  },
  {
    id: 46,
    rank: 46,
    title: '记忆碎片',
    score: 8.7,
    year: 2000,
    desc: '患有短期记忆丧失症的莱昂纳多，通过纹身和照片寻找杀害妻子的凶手。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '悬疑',
    region: '美国',
  },
  {
    id: 47,
    rank: 47,
    title: '拯救大兵瑞恩',
    score: 9.0,
    year: 1998,
    desc: '二战期间，一支美军小队深入敌后，寻找并拯救二等兵瑞恩。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '战争',
    region: '美国',
  },
  {
    id: 48,
    rank: 48,
    title: '阿凡达',
    score: 8.8,
    year: 2009,
    desc: '残疾军人杰克通过阿凡达计划，融入潘多拉星球的纳美人，为保护家园而战。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 49,
    rank: 49,
    title: '冰雪奇缘',
    score: 8.5,
    year: 2013,
    desc: '姐妹艾莎与安娜的冒险，艾莎必须控制自己的冰雪魔法。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA5ODk1NzkzMF5BMl5BanBnXkFtZTgwNzA4NjE4MDE@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  // 51-100部电影数据
  {
    id: 51,
    rank: 51,
    title: '小妇人',
    score: 8.5,
    year: 2019,
    desc: '马奇家四姐妹的成长故事，展现女性的独立与梦想。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BOWYyZDE3MDYtNTQwZi00NGVmLWI1YTEtZWEyMTU4MmI3MThlXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 52,
    rank: 52,
    title: '寄生虫',
    score: 8.9,
    year: 2019,
    desc: '贫穷家庭渗透富裕家庭的故事，揭露社会阶级差异。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    type: '剧情',
    region: '韩国',
  },
  {
    id: 53,
    rank: 53,
    title: '1917',
    score: 8.5,
    year: 2019,
    desc: '一战期间两名士兵的使命，用一镜到底展现战争的残酷。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    type: '战争',
    region: '美国',
  },
  {
    id: 54,
    rank: 54,
    title: '利刃出鞘',
    score: 8.2,
    year: 2019,
    desc: '富豪小说家死亡之谜，侦探布兰克展开调查。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMGUyYjUyMDUtNmQ0Yi00Yjg5LWIyZDUtZWY5MTM3Y2I3YTQ3XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    type: '悬疑',
    region: '美国',
  },
  {
    id: 55,
    rank: 55,
    title: '小丑',
    score: 8.4,
    year: 2019,
    desc: '底层人物亚瑟·弗莱克的悲剧转变，成为哥谭市的小丑。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 56,
    rank: 56,
    title: '寻梦环游记',
    score: 9.1,
    year: 2017,
    desc: '男孩米格穿越到亡灵世界，寻找音乐梦想与家族秘密。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjIxMDkxNDA3OV5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 57,
    rank: 57,
    title: '心灵奇旅',
    score: 9.1,
    year: 2020,
    desc: '灵魂导师与失意音乐老师的旅程，探索生命的真正意义。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzIxMjYwMzY4Nl5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 58,
    rank: 58,
    title: '疯狂动物城',
    score: 9.2,
    year: 2016,
    desc: '兔子朱迪成为警察，与狐狸尼克联手破解动物城谜案。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjQzNDI4NTA3MF5BMl5BanBnXkFtZTgwNzY1OTQzMDI@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 59,
    rank: 59,
    title: '头脑特工队',
    score: 8.7,
    year: 2015,
    desc: '小女孩莱利的情绪管理，五种情绪小人的冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU4NDYxNTE@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 60,
    rank: 60,
    title: '星际穿越',
    score: 9.3,
    year: 2014,
    desc: '宇航员 Cooper 穿越虫洞寻找新家园，拯救地球上的人类。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 61,
    rank: 61,
    title: '控方证人',
    score: 9.6,
    year: 1957,
    desc: '律师为谋杀案嫌疑人辩护，发现真相的反转故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzk4ODU3MDMzNF5BMl5BanBnXkFtZTcwNjE3MDMyNA@@._V1_.jpg',
    type: '悬疑',
    region: '美国',
  },
  {
    id: 62,
    rank: 62,
    title: '消失的爱人',
    score: 8.7,
    year: 2014,
    desc: '妻子失踪后，丈夫成为嫌疑人，真相逐渐揭露。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA4MTEwMTc4N15BMl5BanBnXkFtZTgwMTE2MDU3MDE@._V1_.jpg',
    type: '悬疑',
    region: '美国',
  },
  {
    id: 63,
    rank: 63,
    title: '王牌特工：特工学院',
    score: 8.4,
    year: 2014,
    desc: '街头混混被招募为特工，接受严格训练并执行任务。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAzOTg0MDY3M15BMl5BanBnXkFtZTgwNDc3NzE1MTE@._V1_.jpg',
    type: '动作',
    region: '美国',
  },
  {
    id: 64,
    rank: 64,
    title: '白日梦想家',
    score: 8.4,
    year: 2013,
    desc: '摄影助理沃尔特·米蒂的奇幻冒险，寻找人生意义。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA3NTA2NTQwMV5BMl5BanBnXkFtZTcwMjc0MTIxOQ@@._V1_.jpg',
    type: '喜剧',
    region: '美国',
  },
  {
    id: 65,
    rank: 65,
    title: '地心引力',
    score: 7.7,
    year: 2013,
    desc: '宇航员在太空遭遇事故，独自求生返回地球。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 66,
    rank: 66,
    title: '少年派的奇幻漂流',
    score: 9.1,
    year: 2012,
    desc: '少年派与孟加拉虎在海上漂流，历经奇幻冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTYzMTE5OTQ1MF5BMl5BanBnXkFtZTcwODA3OTM4OA@@._V1_.jpg',
    type: '冒险',
    region: '美国',
  },
  {
    id: 67,
    rank: 67,
    title: '复仇者联盟',
    score: 8.1,
    year: 2012,
    desc: '超级英雄团队联合对抗洛基，保卫地球。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: '动作',
    region: '美国',
  },
  {
    id: 68,
    rank: 68,
    title: '蝙蝠侠：黑暗骑士崛起',
    score: 8.8,
    year: 2012,
    desc: '蝙蝠侠归来，与贝恩和猫女展开对决。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg',
    type: '动作',
    region: '美国',
  },
  {
    id: 69,
    rank: 69,
    title: '饥饿游戏',
    score: 7.8,
    year: 2012,
    desc: '女孩凯特尼斯参加生存游戏，反抗压迫制度。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA4MTM1MTg4MF5BMl5BanBnXkFtZTcwNDQyNTkxNQ@@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 70,
    rank: 70,
    title: '哈利·波特与死亡圣器(下)',
    score: 8.9,
    year: 2011,
    desc: '哈利与伏地魔的最终对决，魔法世界的命运之战。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzgtNDk0Zi00OWZiLTmE2YjltOGU3NTYyZmYzMzE1XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 71,
    rank: 71,
    title: '盗梦空间',
    score: 9.3,
    year: 2010,
    desc: '造梦师柯布通过共享梦境窃取机密，却陷入层层梦境迷宫。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 72,
    rank: 72,
    title: '社交网络',
    score: 8.2,
    year: 2010,
    desc: 'Facebook创始人马克·扎克伯格的创业故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTM2ODk0NDAwMF5BMl5BanBnXkFtZTcwNTM1MDc2Mw@@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 73,
    rank: 73,
    title: '玩具总动员3',
    score: 8.8,
    year: 2010,
    desc: '玩具们被捐赠到幼儿园，展开新的冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 74,
    rank: 74,
    title: '阿凡达',
    score: 8.8,
    year: 2009,
    desc: '残疾军人杰克通过阿凡达计划，融入潘多拉星球的纳美人，为保护家园而战。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '科幻',
    region: '美国',
  },
  {
    id: 75,
    rank: 75,
    title: '飞屋环游记',
    score: 8.9,
    year: 2009,
    desc: '老人卡尔用气球带着房子飞向南美洲，与男孩罗素展开冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTc4NDIxNTQ5MF5BMl5BanBnXkFtZTcwNDg5MzA5Mg@@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 76,
    rank: 76,
    title: '贫民窟的百万富翁',
    score: 8.6,
    year: 2008,
    desc: '孟买贫民窟青年参加游戏节目，回忆人生经历。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNzA1NjE3NjgxMF5BMl5BanBnXkFtZTcwMjU1MDI3MQ@@._V1_.jpg',
    type: '剧情',
    region: '英国',
  },
  {
    id: 77,
    rank: 77,
    title: '蝙蝠侠：黑暗骑士',
    score: 9.3,
    year: 2008,
    desc: '蝙蝠侠与小丑的巅峰对决，探讨正义与邪恶的边界。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzIxMDkxNTA3OV5BMl5BanBnXkFtZTcwNzc0MTIxMw@@._V1_.jpg',
    type: '动作',
    region: '美国',
  },
  {
    id: 78,
    rank: 78,
    title: '机器人总动员',
    score: 9.3,
    year: 2008,
    desc: '机器人 WALL-E 在废弃地球遇到 EVE，展开太空冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 79,
    rank: 79,
    title: '料理鼠王',
    score: 8.7,
    year: 2007,
    desc: '老鼠雷米梦想成为厨师，与人类林奎尼合作。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMTMxMzMzMw@@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 80,
    rank: 80,
    title: '加勒比海盗：黑珍珠号的诅咒',
    score: 8.8,
    year: 2003,
    desc: '海盗杰克·斯派罗与威尔·特纳寻找黑珍珠号，解开诅咒。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjA5Mzg3Nw@@._V1_.jpg',
    type: '冒险',
    region: '美国',
  },
  {
    id: 81,
    rank: 81,
    title: '指环王3：王者无敌',
    score: 9.3,
    year: 2003,
    desc: '中土世界的终极之战，佛罗多与山姆前往末日火山销毁魔戒。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTM5NjMwMw@@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 82,
    rank: 82,
    title: '指环王2：双塔奇兵',
    score: 9.2,
    year: 2002,
    desc: '佛罗多与山姆继续前往魔多，阿拉贡等人则与洛汗国并肩作战。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzE0YmY4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 83,
    rank: 83,
    title: '猫鼠游戏',
    score: 8.9,
    year: 2002,
    desc: '天才骗子弗兰克与FBI探员卡尔的猫鼠追逐，展现智慧与毅力的对决。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNjRjMzQxNWYtMzczNS00MDc0LWIxN2MtZGM3ZmU3ZWEzNWQzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    type: '犯罪',
    region: '美国',
  },
  {
    id: 84,
    rank: 84,
    title: '怪物公司',
    score: 8.7,
    year: 2001,
    desc: '怪物公司员工毛怪和大眼仔与人类女孩阿布的冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTY1MTY3NTQxN15BMl5BanBnXkFtZTcwNzQwNjQwMg@@._V1_.jpg',
    type: '动画',
    region: '美国',
  },
  {
    id: 85,
    rank: 85,
    title: '指环王1：护戒使者',
    score: 9.1,
    year: 2001,
    desc: '霍比特人佛罗多继承魔戒，踏上销毁魔戒的危险旅程。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
    type: '奇幻',
    region: '美国',
  },
  {
    id: 86,
    rank: 86,
    title: '美丽心灵',
    score: 9.0,
    year: 2001,
    desc: '数学家纳什与精神分裂症抗争，最终获得诺贝尔奖的故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzA4ZGM0MWUtZmQ5MS00OGU5LThlZWEtN2JmNjBhZmE1MWNmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    type: '剧情',
    region: '美国',
  },
  {
    id: 87,
    rank: 87,
    title: '初恋这件小事',
    score: 9.3,
    year: 2010,
    desc: '平凡女孩小水为了暗恋的学长阿亮，努力变得更好的故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTM4MTc2MDU4M15BMl5BanBnXkFtZTcwMDk0MTI2NQ@@._V1_.jpg',
    type: '爱情',
    region: '泰国',
  },
  {
    id: 88,
    rank: 88,
    title: '你的名字。',
    score: 9.2,
    year: 2016,
    desc: '男女主角在梦中交换身体，展开跨越时空的寻找。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzE1MS00MzM4LWI5ZWEtMTVmMjlkMjE4OTZlXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 89,
    rank: 89,
    title: '天气之子',
    score: 8.3,
    year: 2019,
    desc: '男孩帆高与能控制天气的女孩阳菜的故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 90,
    rank: 90,
    title: '言叶之庭',
    score: 8.9,
    year: 2013,
    desc: '高中生孝雄与神秘女性雪野在雨天的庭园中相遇。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTU5MzYxODU3MV5BMl5BanBnXkFtZTcwMDc1ODg5Nw@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 91,
    rank: 91,
    title: '秒速5厘米',
    score: 8.8,
    year: 2007,
    desc: '少年远野贵树与少女筱原明里的纯爱故事，关于成长与错过。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTk2NTY5NDQ1Ml5BMl5BanBnXkFtZTcwMzM1MzQ1Mw@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 92,
    rank: 92,
    title: '起风了',
    score: 8.8,
    year: 2013,
    desc: '日本零式战斗机设计者堀越二郎的故事，关于梦想与爱情。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjA3MjAwMDkwNl5BMl5BanBnXkFtZTcwNjU0NjY1OQ@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 93,
    rank: 93,
    title: '幽灵公主',
    score: 9.2,
    year: 1997,
    desc: '阿席达卡为解除诅咒，卷入人类与森林神灵的战争。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzJlN2Q5ZDItMWU3MS00ODJmLWFlOWQtNzcxN2JkMDU4OTY0XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 94,
    rank: 94,
    title: '天空之城',
    score: 9.2,
    year: 1986,
    desc: '少女希达与少年巴鲁寻找天空之城拉普达的冒险。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjE5OTE4MTk4N15BMl5BanBnXkFtZTcwOTg5MDU1Mw@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 95,
    rank: 95,
    title: '龙猫',
    score: 9.2,
    year: 1988,
    desc: '姐妹俩与龙猫的奇幻冒险，关于亲情与自然。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTllN2I2NWYtMWQwYi00OTU2LWE0NWUtNzEwNmY4MTBiZGMxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 96,
    rank: 96,
    title: '风之谷',
    score: 9.1,
    year: 1984,
    desc: '公主娜乌西卡在风之谷与虫群的战争中寻求和平。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNTk4NWVjZTAtMTZmZS00YjNlLTk2MTUtODk0Y2JjMjA4ZWIxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 97,
    rank: 97,
    title: '侧耳倾听',
    score: 9.1,
    year: 1995,
    desc: '少女月岛雯与男孩天泽圣司的青春故事，关于梦想与爱情。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZWE1MTY5Y2YtNjU4Yy00Y2NlLTk3NjMtYjEwNjA0NTY0MTc1XkEyXkFqcGdeQXVyNzEyMDQxNjg@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 98,
    rank: 98,
    title: '魔女宅急便',
    score: 9.1,
    year: 1989,
    desc: '小魔女琪琪离开家，在海边城市展开独立生活。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMTMxMzMzMw@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 99,
    rank: 99,
    title: '红猪',
    score: 9.0,
    year: 1992,
    desc: '一战飞行员变成红猪，在亚得里亚海当赏金猎人。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2UxOTY2MjctYTFlNi00N2FkLTk1YTUtMzViODA4MjUyM2ZmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
  {
    id: 100,
    rank: 100,
    title: '百变狸猫',
    score: 8.6,
    year: 1994,
    desc: '狸猫们为了保护家园，与人类展开斗争的故事。',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTU2MDk5MzA3OV5BMl5BanBnXkFtZTcwMzI1MTY5MQ@@._V1_.jpg',
    type: '动画',
    region: '日本',
  },
])

// 4. 计算属性：筛选和搜索逻辑
const filteredMovies = computed(() => {
  let result = [...movieData.value]

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(
      (movie) =>
        movie.title.toLowerCase().includes(keyword) || movie.desc.toLowerCase().includes(keyword),
    )
  }

  // 类型筛选
  if (filterType.value) {
    result = result.filter((movie) => movie.type === filterType.value)
  }

  // 地区筛选
  if (filterRegion.value) {
    result = result.filter((movie) => movie.region === filterRegion.value)
  }

  // 排序筛选
  if (filterSort.value) {
    switch (filterSort.value) {
      case 'score-desc':
        result.sort((a, b) => b.score - a.score)
        break
      case 'score-asc':
        result.sort((a, b) => a.score - b.score)
        break
      case 'rank-desc':
        result.sort((a, b) => b.rank - a.rank)
        break
      case 'rank-asc':
        result.sort((a, b) => a.rank - b.rank)
        break
      case 'year-desc':
        result.sort((a, b) => b.year - a.year)
        break
      case 'year-asc':
        result.sort((a, b) => a.year - b.year)
        break
    }
  }

  return result
})

// 5. 方法：处理搜索
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词！')
    return
  }
  if (filteredMovies.value.length === 0) {
    ElMessage.info(`未找到与「${searchKeyword.value}」匹配的电影`)
    return
  }
  ElMessage.success(`找到 ${filteredMovies.value.length} 部匹配电影`)
}

// 6. 方法：重置筛选
const resetFilters = () => {
  filterType.value = ''
  filterRegion.value = ''
  filterSort.value = ''
  searchKeyword.value = ''
}
</script>

<style scoped>
/* 全局样式变量 */
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
.movie-collection {
  min-height: 100vh;
  background-color: var(--imdb-bg-primary);
  color: var(--imdb-text-primary);
}

/* 顶部导航 */
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

/* 搜索区 */
.search-section {
  background-color: var(--imdb-bg-secondary);
  padding: 20px 0;
  border-bottom: 1px solid var(--imdb-border-color);
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-section.sticky {
  position: sticky;
  top: 0;
  z-index: 15;
  margin-top: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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

/* 侧边栏 */
.sidebar-col {
  position: sticky;
  top: 140px;
  align-self: flex-start;
}

.sidebar {
  background-color: var(--imdb-bg-secondary);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--imdb-border-color);
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--imdb-text-primary);
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--imdb-border-color);
}

.filter-group {
  margin-bottom: 20px;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--imdb-text-secondary);
  margin: 0 0 10px 0;
}

.filter-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--imdb-border-color);
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

/* 电影网格 */
.movie-grid {
  justify-content: flex-start;
}

.movie-col {
  margin-bottom: 30px;
}

/* 电影卡片 */
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

/* 海报容器 */
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

/* 排名标签 */
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

/* 评分标签 */
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

.movie-desc {
  font-size: 13px;
  color: var(--imdb-text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.4;
  flex: 1;
}

/* 查看详情按钮 */
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

/* 无结果提示 */
.no-results {
  margin: 40px 0;
  text-align: center;
}

/* 底部 */
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
