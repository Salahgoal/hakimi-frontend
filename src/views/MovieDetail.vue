<template>
  <div class="movie-detail">
    <!-- 1. 顶部导航：IMDB风格 - 与首页保持一致 -->
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
            >
              <el-menu-item index="1">
                <el-icon><House /></el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><Film /></el-icon>
                <span>电影</span>
              </el-menu-item>
              <el-menu-item index="3" router :route="{ path: '/user-profile' }">
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </el-header>

    <!-- 2. 主内容区：IMDB风格的电影详情 -->
    <div class="main-container">
      <div class="content-container">
        <!-- 面包屑导航：IMDB风格 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item><router-link to="/">首页</router-link></el-breadcrumb-item>
          <el-breadcrumb-item>{{ movieDetail.title }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 电影基本信息：IMDB风格布局 -->
        <div class="movie-info">
          <el-row :gutter="30">
            <!-- 左侧海报区：IMDB风格 -->
            <el-col :xs="24" :sm="8" :md="6" :lg="5" class="poster-col">
              <div class="poster-container">
                <img :src="movieDetail.poster" :alt="movieDetail.title" class="movie-poster" />
                <!-- 排名标签：IMDB风格的左上角排名 -->
                <div class="rank-tag">{{ movieDetail.rank }}</div>
                <!-- 海报操作按钮：IMDB风格 -->
                <div class="poster-actions">
                  <el-button type="primary" plain size="small" class="action-btn">想看</el-button>
                  <el-button type="success" plain size="small" class="action-btn">看过</el-button>
                </div>
              </div>
            </el-col>

            <!-- 右侧信息区：IMDB风格 -->
            <el-col :xs="24" :sm="16" :md="18" :lg="19" class="info-col">
              <!-- 电影标题：IMDB风格 -->
              <h2 class="movie-title">
                {{ movieDetail.title }}
                <span class="original-title">{{ movieDetail.originalTitle }}</span> ({{
                  movieDetail.year
                }})
              </h2>

              <!-- 评分区域：IMDB风格 -->
              <div class="score-section">
                <div class="score-card">
                  <div class="score-value">{{ movieDetail.score }}</div>
                  <div class="score-stars">
                    <el-rate v-model="movieDetail.score" :max="5" disabled />
                  </div>
                  <div class="score-count">{{ movieDetail.ratingCount }}人评价</div>
                </div>
                <div class="rating-distribution">
                  <div
                    v-for="(value, key) in movieDetail.ratingDistribution"
                    :key="key"
                    class="rating-item"
                  >
                    <span class="rating-label">{{ key }}星</span>
                    <div
                      style="
                        flex: 1;
                        height: 16px;
                        background-color: #444444;
                        border-radius: 8px;
                        margin: 0 10px;
                        overflow: hidden;
                      "
                    >
                      <div
                        :style="{
                          height: '100%',
                          backgroundColor: '#f5c518',
                          borderRadius: '8px',
                          width: value,
                          minWidth: value === '0.1%' ? '4px' : '0px',
                        }"
                      ></div>
                    </div>
                    <span class="rating-percent">{{ value }}</span>
                  </div>
                </div>
              </div>

              <!-- 操作按钮组：IMDB风格 -->
              <div class="action-buttons">
                <el-button type="primary" plain>想看</el-button>
                <el-button type="success" plain>看过</el-button>
                <el-button type="info" plain>写短评</el-button>
                <el-button type="warning" plain>写影评</el-button>
              </div>

              <!-- 电影元数据：IMDB风格 -->
              <div class="movie-meta">
                <div class="meta-row">
                  <span class="meta-label">导演:</span>
                  <span class="meta-value">{{ movieDetail.director }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">编剧:</span>
                  <span class="meta-value">{{ movieDetail.screenwriter }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">主演:</span>
                  <span class="meta-value">{{ movieDetail.actors }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">类型:</span>
                  <span class="meta-value">{{ movieDetail.type }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">制片国家/地区:</span>
                  <span class="meta-value">{{ movieDetail.region }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">语言:</span>
                  <span class="meta-value">{{ movieDetail.language }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">上映日期:</span>
                  <span class="meta-value">{{ movieDetail.releaseDate }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">片长:</span>
                  <span class="meta-value">{{ movieDetail.runtime }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">又名:</span>
                  <span class="meta-value">{{ movieDetail.aka }}</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">IMDb:</span>
                  <span class="meta-value"
                    ><a :href="movieDetail.imdb" target="_blank">{{ movieDetail.imdb }}</a></span
                  >
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 剧情简介：IMDB风格 -->
          <div class="movie-desc-section">
            <h3 class="section-title">剧情简介</h3>
            <div class="desc-content">
              <p
                v-for="(paragraph, index) in movieDetail.description.split('\n\n')"
                :key="index"
                class="desc-paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>

        <!-- 点评功能：IMDB风格 -->
        <div class="review-section">
          <el-card class="review-card" shadow="hover">
            <template #header>
              <div class="review-header">
                <h3 class="section-title">写短评</h3>
                <el-rate v-model="userRating" :max="5" show-score />
              </div>
            </template>
            <el-input
              v-model="userReview"
              type="textarea"
              :rows="4"
              placeholder="写下你的观影感受..."
              resize="none"
            />
            <div class="review-actions">
              <el-button type="primary" @click="submitReview" :loading="submitting"
                >提交短评</el-button
              >
            </div>
          </el-card>
        </div>

        <!-- 评价列表：IMDB风格 -->
        <div class="comments-section">
          <el-card class="comments-card" shadow="hover">
            <template #header>
              <div class="comments-header">
                <h3 class="section-title">用户短评 ({{ reviews.length }})</h3>
                <el-select v-model="sortBy" placeholder="排序方式">
                  <el-option label="最新" value="latest"></el-option>
                  <el-option label="评分高" value="high-score"></el-option>
                  <el-option label="评分低" value="low-score"></el-option>
                </el-select>
              </div>
            </template>
            <div v-if="reviews.length > 0" class="comments-list">
              <div v-for="review in sortedReviews" :key="review.id" class="comment-item">
                <div class="comment-header">
                  <span class="comment-user">{{ review.user }}</span>
                  <span class="comment-time">{{ review.time }}</span>
                  <el-rate v-model="review.rating" :max="5" disabled />
                </div>
                <div class="comment-content">{{ review.content }}</div>
              </div>
            </div>
            <div v-else class="no-comments">
              <el-empty description="暂无评价，快来抢沙发吧！" />
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 3. 底部：IMDB风格的深色底部 -->
    <el-footer class="footer">
      <div class="footer-content">
        <p>© 2026 哈基米电影 版权所有</p>
        <p>基于IMDB风格设计 | 探索电影的无限可能</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElRate, ElEmpty } from 'element-plus'
import { House, Film, User } from '@element-plus/icons-vue'

// 路由参数
const route = useRoute()
const movieId = ref(parseInt(route.query.id) || 1)

// 电影详情数据
const movieDetail = ref({
  id: 1,
  rank: 1,
  title: '肖申克的救赎',
  originalTitle: 'The Shawshank Redemption',
  year: 1994,
  score: 9.7,
  ratingCount: '324502',
  ratingDistribution: {
    5: '85.7%',
    4: '12.8%',
    3: '1.3%',
    2: '0.1%',
    1: '0.1%',
  },
  type: '剧情, 犯罪',
  region: '美国',
  language: '英语',
  releaseDate: '1994-09-23',
  runtime: '142分钟',
  director: '弗兰克·德拉邦特',
  screenwriter: '弗兰克·德拉邦特 / 斯蒂芬·金',
  actors: '蒂姆·罗宾斯, 摩根·弗里曼, 鲍勃·冈顿',
  aka: '月黑高飞(港) / 刺激1995(台)',
  imdb: 'https://www.imdb.com/title/tt0111161/',
  description:
    '20世纪40年代末，小有成就的银行家安迪·杜弗伦（蒂姆·罗宾斯饰）被冤枉杀害了妻子和她的情人，被判两个无期徒刑，锒铛入狱。在肖申克监狱的首次出现，安迪便引起了狱中"权威人物"瑞德（摩根·弗里曼饰）的注意。瑞德帮助囚犯们搞到各种违禁品，安迪请瑞德为他搞了一把小锤子，以及一幅丽塔·海华丝的海报。\n\n安迪利用自己的银行知识，开始为监狱官员洗钱、逃税，逐渐获得了他们的信任。同时，他也在帮助其他囚犯，建立了图书馆，教他们读书写字，甚至帮助一些囚犯获得了高中文凭。他的存在给肖申克监狱带来了一丝希望的曙光。\n\n安迪在监狱中遭遇了各种磨难，包括被"三姐妹"性侵，但他始终保持着希望。他用了19年的时间，用小锤子在牢房的墙上挖了一条地道，丽塔·海华丝的海报巧妙地遮住了洞口。在一个雷雨之夜，他通过地道逃出了监狱，并重获自由。\n\n安迪逃出监狱后，揭露了典狱长诺顿的腐败行为，诺顿最终自杀。瑞德在服刑40年后获得假释，他按照安迪的指示，找到了安迪留给他的钱，并前往墨西哥与安迪会合。两个老朋友在阳光明媚的海滩上重逢，开始了新的生活。\n\n影片通过监狱这个特殊环境，探讨了自由、希望和人性的主题。安迪在困境中保持希望，最终实现自我救赎，给人以深刻的启示。瑞德的旁白贯穿全片，为故事增添了一层哲学意味，他的那句"希望是美好的，也许是人间至善，而美好的事物永不消逝"成为了经典台词。\n\n《肖申克的救赎》改编自斯蒂芬·金的 novella《丽塔·海华丝及肖申克监狱的救赎》，虽然在奥斯卡颁奖典礼上颗粒无收，但它却成为了影迷心中的经典之作，在IMDb和豆瓣电影等平台上长期排名第一。',
  poster:
    'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
})

// 点评数据
const userRating = ref(5)
const userReview = ref('')
const submitting = ref(false)

// 评价列表
const reviews = ref([
  {
    id: 1,
    user: '电影爱好者',
    time: '2026-01-01 12:00',
    rating: 5,
    content:
      '这是一部经典中的经典，剧情紧凑，演员表演出色，主题深刻。安迪的坚韧和智慧令人钦佩，瑞德的友情也很感人。强烈推荐！',
  },
  {
    id: 2,
    user: '文艺青年',
    time: '2025-12-30 18:30',
    rating: 5,
    content:
      '影片通过监狱这个特殊环境，探讨了自由、希望和人性的主题。安迪在困境中保持希望，最终实现自我救赎，给人以深刻的启示。',
  },
  {
    id: 3,
    user: '普通观众',
    time: '2025-12-28 20:15',
    rating: 4,
    content:
      '虽然电影很长，但一点都不觉得无聊。故事情节引人入胜，演员的表演非常真实。结局很感人，值得一看。',
  },
])

// 排序方式
const sortBy = ref('latest')

// 排序后的评价
const sortedReviews = computed(() => {
  const result = [...reviews.value]
  if (sortBy.value === 'latest') {
    return result.sort((a, b) => new Date(b.time) - new Date(a.time))
  } else if (sortBy.value === 'high-score') {
    return result.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'low-score') {
    return result.sort((a, b) => a.rating - b.rating)
  }
  return result
})

// 提交点评
const submitReview = () => {
  if (!userReview.value.trim()) {
    ElMessage.warning('请输入点评内容')
    return
  }

  submitting.value = true

  // 模拟提交延迟
  setTimeout(() => {
    const newReview = {
      id: reviews.value.length + 1,
      user: '当前用户',
      time: new Date().toLocaleString('zh-CN'),
      rating: userRating.value,
      content: userReview.value,
    }

    reviews.value.unshift(newReview)
    userReview.value = ''
    userRating.value = 5
    submitting.value = false

    ElMessage.success('点评提交成功')
  }, 1000)
}

// 根据ID获取电影详情
const fetchMovieDetail = (id) => {
  // 模拟电影数据
  const movies = [
    {
      id: 1,
      rank: 1,
      title: '肖申克的救赎',
      originalTitle: 'The Shawshank Redemption',
      year: 1994,
      score: 9.7,
      ratingCount: '324502',
      ratingDistribution: {
        5: '85.7%',
        4: '12.8%',
        3: '1.3%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 犯罪',
      region: '美国',
      language: '英语',
      releaseDate: '1994-09-23',
      runtime: '142分钟',
      director: '弗兰克·德拉邦特',
      screenwriter: '弗兰克·德拉邦特 / 斯蒂芬·金',
      actors: '蒂姆·罗宾斯, 摩根·弗里曼, 鲍勃·冈顿',
      aka: '月黑高飞(港) / 刺激1995(台)',
      imdb: 'https://www.imdb.com/title/tt0111161/',
      description:
        '20世纪40年代末，小有成就的银行家安迪·杜弗伦（蒂姆·罗宾斯饰）被冤枉杀害了妻子和她的情人，被判两个无期徒刑，锒铛入狱。在肖申克监狱的首次出现，安迪便引起了狱中"权威人物"瑞德（摩根·弗里曼饰）的注意。瑞德帮助囚犯们搞到各种违禁品，安迪请瑞德为他搞了一把小锤子，以及一幅丽塔·海华丝的海报。\n\n安迪利用自己的银行知识，开始为监狱官员洗钱、逃税，逐渐获得了他们的信任。同时，他也在帮助其他囚犯，建立了图书馆，教他们读书写字，甚至帮助一些囚犯获得了高中文凭。他的存在给肖申克监狱带来了一丝希望的曙光。\n\n安迪在监狱中遭遇了各种磨难，包括被"三姐妹"性侵，但他始终保持着希望。他用了19年的时间，用小锤子在牢房的墙上挖了一条地道，丽塔·海华丝的海报巧妙地遮住了洞口。在一个雷雨之夜，他通过地道逃出了监狱，并重获自由。\n\n安迪逃出监狱后，揭露了典狱长诺顿的腐败行为，诺顿最终自杀。瑞德在服刑40年后获得假释，他按照安迪的指示，找到了安迪留给他的钱，并前往墨西哥与安迪会合。两个老朋友在阳光明媚的海滩上重逢，开始了新的生活。\n\n影片通过监狱这个特殊环境，探讨了自由、希望和人性的主题。安迪在困境中保持希望，最终实现自我救赎，给人以深刻的启示。瑞德的旁白贯穿全片，为故事增添了一层哲学意味，他的那句"希望是美好的，也许是人间至善，而美好的事物永不消逝"成为了经典台词。\n\n《肖申克的救赎》改编自斯蒂芬·金的 novella《丽塔·海华丝及肖申克监狱的救赎》，虽然在奥斯卡颁奖典礼上颗粒无收，但它却成为了影迷心中的经典之作，在IMDb和豆瓣电影等平台上长期排名第一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 2,
      rank: 2,
      title: '霸王别姬',
      originalTitle: 'Farewell My Concubine',
      year: 1993,
      score: 9.6,
      ratingCount: '289753',
      ratingDistribution: {
        5: '81.2%',
        4: '16.5%',
        3: '2.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '剧情, 爱情',
      region: '中国大陆, 中国香港',
      language: '汉语普通话',
      releaseDate: '1993-01-01',
      runtime: '171分钟',
      director: '陈凯歌',
      screenwriter: '芦苇 / 李碧华',
      actors: '张国荣, 巩俐, 张丰毅',
      aka: '再见，我的妾 / Farewell to My Concubine',
      imdb: 'https://www.imdb.com/title/tt0106332/',
      description:
        '段小楼（张丰毅饰）与程蝶衣（张国荣饰）是一对师兄弟，两人自小在戏班里长大，一起学习京剧。程蝶衣天生丽质，被师父选中扮演旦角，而段小楼则扮演生角。两人合演的《霸王别姬》誉满京城，成了名角儿。\n\n程蝶衣对师兄一往情深，他不仅是程蝶衣的师兄，更是他的"霸王"。他将自己完全融入了虞姬的角色中，分不清戏里戏外，认为自己就是虞姬，而段小楼就是霸王。然而段小楼却娶了妓女菊仙（巩俐饰）为妻，这让程蝶衣深受打击，他觉得自己的"霸王"被抢走了。\n\n程蝶衣因戏痴魔，他的一生都在追求"从一而终"的艺术境界。而段小楼则性格现实，他更看重的是现实生活。两人的性格差异和价值观的不同，导致了他们之间的矛盾逐渐加深。\n\n抗日战争期间，程蝶衣为了救段小楼，被迫为日本人唱戏，这成为了他后来的"罪名"。新中国成立后，两人的命运发生了巨大变化。在"文化大革命"中，程蝶衣因同性恋倾向和曾经为日本人唱戏而受到批判，段小楼为了自保，不得不与程蝶衣划清界限，甚至揭发他的"罪行"。菊仙也在这个过程中受到牵连，最终自杀。\n\n改革开放后，两人重逢，再次合演《霸王别姬》。程蝶衣在舞台上自刎，结束了自己的生命，实现了他"从一而终"的人生追求。他用生命诠释了什么是真正的艺术，什么是真正的爱情。\n\n影片通过两位京剧演员半个世纪的命运，展现了中国近现代社会的变迁，以及人性的复杂性和艺术的魅力。张国荣的表演尤为出色，他将程蝶衣的痴情、执着和悲剧性演绎得淋漓尽致，成为了中国电影史上的经典形象。巩俐和张丰毅的表演也非常精彩，为影片增色不少。\n\n《霸王别姬》获得了第46届戛纳国际电影节金棕榈奖，成为中国电影史上第一部获此殊荣的影片。它不仅在艺术上取得了巨大成功，也在商业上取得了不错的成绩，成为了中国电影的代表作之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDI2ZTk1NmQtMjBlOC00MDVmLTg2MTMtMWM4ODlmZmE5YzAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 3,
      rank: 3,
      title: '教父',
      originalTitle: 'The Godfather',
      year: 1972,
      score: 9.6,
      ratingCount: '276891',
      ratingDistribution: {
        5: '80.5%',
        4: '17.2%',
        3: '2.1%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 犯罪',
      region: '美国',
      language: '英语, 意大利语, 拉丁语',
      releaseDate: '1972-03-24',
      runtime: '175分钟',
      director: '弗朗西斯·福特·科波拉',
      screenwriter: '马里奥·普佐 / 弗朗西斯·福特·科波拉',
      actors: '马龙·白兰度, 阿尔·帕西诺, 詹姆斯·肯恩',
      aka: '教父(上)',
      imdb: 'https://www.imdb.com/title/tt0068646/',
      description:
        '改编自马里奥·普佐的同名小说，讲述了意大利移民科莱昂家族在美国的发家史以及家族内部的权力斗争。故事始于1945年，老教父维托·唐·科莱昂（马龙·白兰度饰）是黑手党的领袖，他的小儿子迈克尔（阿尔·帕西诺饰）原本不愿意参与家族事务，他是一名战争英雄，希望过正常人的生活。\n\n老教父的女儿康妮结婚当天，他拒绝了毒枭索洛佐的合作请求，导致索洛佐派人暗杀他。老教父中枪后，家族陷入危机。长子桑尼（詹姆斯·肯恩饰）接管了家族事务，但他性格冲动，最终被敌人暗杀。\n\n为了保护家族，迈克尔不得不卷入家族事务。他展现出了非凡的智慧和果断的决策能力，他为父亲报仇，处理了家族的敌人，并逐渐成长为新一代教父。然而，随着权力的增长，他也逐渐失去了自己的亲情和爱情。他的妻子凯（黛安·基顿饰）无法接受他的黑帮身份，最终离开了他。\n\n影片通过科莱昂家族的故事，展现了美国社会的黑暗面，以及权力、家庭和忠诚的主题。马龙·白兰度的表演尤为出色，他塑造的老教父形象成为电影史上的经典。他的那句"我会给他一个他无法拒绝的提议"成为了电影史上最著名的台词之一。\n\n阿尔·帕西诺也通过对迈克尔的演绎，展现了一个人如何在权力的腐蚀下逐渐改变。从一个纯真的战争英雄，到一个冷酷的黑帮领袖，他的转变令人震撼。\n\n《教父》被誉为黑帮电影的巅峰之作，它不仅在商业上取得了巨大成功，也获得了评论界的高度评价，成为电影史上最伟大的电影之一。影片的叙事风格、摄影技巧和音乐都成为了后来电影的参考范本。它获得了第45届奥斯卡金像奖最佳影片、最佳男主角和最佳改编剧本奖。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    },
    {
      id: 4,
      rank: 4,
      title: '教父2',
      originalTitle: 'The Godfather: Part II',
      year: 1974,
      score: 9.5,
      ratingCount: '198765',
      ratingDistribution: {
        5: '75.3%',
        4: '21.5%',
        3: '3.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 犯罪',
      region: '美国',
      language: '英语, 意大利语, 西班牙语, 拉丁语',
      releaseDate: '1974-12-12',
      runtime: '202分钟',
      director: '弗朗西斯·福特·科波拉',
      screenwriter: '弗朗西斯·福特·科波拉 / 马里奥·普佐',
      actors: '阿尔·帕西诺, 罗伯特·德尼罗, 罗伯特·杜瓦尔',
      aka: '教父续集',
      imdb: 'https://www.imdb.com/title/tt0071562/',
      description:
        '《教父2》是《教父》的续集，采用双线叙事结构，一条线讲述迈克尔·科莱昂（阿尔·帕西诺饰）在1958年成为家族领袖后的故事，另一条线讲述年轻的维托·科莱昂（罗伯特·德尼罗饰）在20世纪初移民美国后的发家史。\n\n迈克尔·科莱昂接管家族后，他试图将家族业务合法化，但遭到了各种阻碍。他的敌人包括其他黑帮家族、政府官员和甚至自己的亲人。他的哥哥弗雷多（约翰·凯泽尔饰）背叛了他，他的妻子凯（黛安·基顿饰）因为无法接受他的黑帮身份而离开了他。迈克尔逐渐变得冷酷无情，他的内心充满了孤独和痛苦。\n\n年轻的维托·科莱昂从西西里岛移民到美国后，他在纽约的小意大利区开始了自己的奋斗历程。他从一个底层工人做起，逐渐成为了黑帮领袖。他的智慧、勇气和正义感赢得了人们的尊重，他建立了科莱昂家族的基础。\n\n两条线索交织在一起，展现了科莱昂家族的历史和命运。影片通过对比迈克尔和维托的经历，探讨了权力、家庭和美国梦的主题。迈克尔试图超越父亲，但他最终却陷入了比父亲更深的黑暗之中。\n\n阿尔·帕西诺和罗伯特·德尼罗的表演都非常出色，他们分别展现了迈克尔的冷酷和维托的智慧。影片的叙事风格、摄影技巧和音乐都继承了第一部的风格，同时又有自己的创新。\n\n《教父2》获得了第47届奥斯卡金像奖最佳影片、最佳导演、最佳改编剧本、最佳男配角和最佳艺术指导奖，成为了电影史上最成功的续集之一。它与第一部一起，构成了一个完整的黑帮史诗，展现了美国社会的黑暗面和人性的复杂性。\n\n影片的结尾非常经典，迈克尔回忆起自己的家庭，想起了父亲的生日聚会，想起了自己曾经的纯真。但现在，他已经成为了一个孤独的黑帮领袖，他的家庭已经分崩离析。这个结尾令人深思，让人感受到了权力的腐蚀力和人性的脆弱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    },
    {
      id: 5,
      rank: 5,
      title: '阿甘正传',
      originalTitle: 'Forrest Gump',
      year: 1994,
      score: 9.5,
      ratingCount: '312456',
      ratingDistribution: {
        5: '78.9%',
        4: '18.2%',
        3: '2.7%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 爱情',
      region: '美国',
      language: '英语',
      releaseDate: '1994-06-23',
      runtime: '142分钟',
      director: '罗伯特·泽米吉斯',
      screenwriter: '艾瑞克·罗斯 / 温斯顿·格鲁姆',
      actors: '汤姆·汉克斯, 罗宾·怀特, 加里·西尼斯',
      aka: '福雷斯特·冈普',
      imdb: 'https://www.imdb.com/title/tt0109830/',
      description:
        '《阿甘正传》讲述了智商只有75的阿甘（汤姆·汉克斯饰）的传奇人生。他通过自己的努力和坚持，在多个领域取得了成功，包括橄榄球、越战、乒乓球等，成为了一个时代的传奇。\n\n阿甘从小就受到同学的欺负，但他的母亲（莎莉·菲尔德饰）一直鼓励他，告诉他"傻人有傻福"。他遇到了自己一生的挚爱珍妮（罗宾·怀特饰），虽然两人的关系经历了许多波折，但阿甘始终深爱着她。\n\n阿甘的人生充满了传奇色彩：他成为了橄榄球明星，受到了肯尼迪总统的接见；他参加了越南战争，获得了荣誉勋章；他成为了乒乓球冠军，访问了中国，为中美建交做出了贡献；他还开创了自己的捕虾事业，成为了百万富翁。\n\n然而，阿甘的心中始终只有珍妮。当珍妮生病时，阿甘陪伴在她身边，直到她去世。阿甘独自抚养他们的儿子小阿甘，过上了平静的生活。\n\n影片通过阿甘的故事，展现了美国从20世纪50年代到80年代的社会变迁，包括民权运动、越南战争、水门事件等重要历史事件。同时，也探讨了人性的善良、纯真和坚持的力量。\n\n汤姆·汉克斯的表演非常出色，他成功塑造了一个令人难忘的阿甘形象，获得了奥斯卡最佳男主角奖。他的表演自然、真实，将阿甘的纯真和执着演绎得淋漓尽致。\n\n《阿甘正传》获得了多项奥斯卡奖，包括最佳影片、最佳导演和最佳男主角等，成为电影史上的经典之作。影片中的经典台词"生活就像一盒巧克力，你永远不知道下一块是什么味道"也成为了流行文化的一部分，被广泛引用。\n\n影片的音乐也非常出色，其中包括多首经典老歌，如《San Francisco》、《Blowin\' in the Wind》等，为影片增添了浓厚的时代氛围。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 6,
      rank: 6,
      title: '泰坦尼克号',
      originalTitle: 'Titanic',
      year: 1997,
      score: 9.5,
      ratingCount: '305678',
      ratingDistribution: {
        5: '76.8%',
        4: '19.5%',
        3: '3.5%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 爱情, 灾难',
      region: '美国',
      language: '英语, 意大利语, 德语, 俄语',
      releaseDate: '1997-11-01',
      runtime: '194分钟',
      director: '詹姆斯·卡梅隆',
      screenwriter: '詹姆斯·卡梅隆',
      actors: '莱昂纳多·迪卡普里奥, 凯特·温斯莱特, 比利·赞恩',
      aka: '铁达尼号(港/台)',
      imdb: 'https://www.imdb.com/title/tt0120338/',
      description:
        '《泰坦尼克号》改编自1912年泰坦尼克号邮轮沉没的真实事件，讲述了穷画家杰克（莱昂纳多·迪卡普里奥饰）与贵族少女罗丝（凯特·温斯莱特饰）在船上相遇并相爱的感人故事。\n\n罗丝是一位贵族少女，她与未婚夫卡尔（比利·赞恩饰）一起乘坐泰坦尼克号前往美国。但她对这种贵族生活感到厌倦，想要结束自己的生命。这时，杰克出现了，他救下了罗丝，并与她相识相恋。\n\n杰克带罗丝体验了平民的生活，他们在三等舱跳舞，在船头看日落，在船舱里画画，度过了一段美好的时光。罗丝逐渐爱上了杰克的自由和活力，她决定离开卡尔，与杰克在一起。\n\n然而，就在他们计划未来的时候，泰坦尼克号撞上了冰山。船开始沉没，乘客们陷入了恐慌。杰克为了救罗丝，把她送上了救生艇，但自己却没能上去。\n\n在冰冷的海水中，杰克把生存的机会让给了罗丝，他鼓励罗丝要好好活下去，要做很多事情，要结婚生子，要环游世界。最终，杰克冻死在海水中，而罗丝则被救生艇救起。\n\n罗丝后来度过了漫长而充实的一生，她始终没有忘记杰克。她结婚生子，环游世界，做了许多杰克曾经梦想做的事情，包括骑马、坐飞机、探险等。\n\n影片通过这段感人的爱情故事，展现了人性的光辉和生命的可贵。同时，也通过逼真的特效，重现了泰坦尼克号沉没的悲剧场景，让观众感受到了灾难的残酷和生命的脆弱。\n\n《泰坦尼克号》获得了多项奥斯卡奖，包括最佳影片、最佳导演等，成为电影史上最成功的电影之一。影片的主题曲《My Heart Will Go On》由席琳·迪翁演唱，也成为了经典歌曲，广为传唱。\n\n莱昂纳多·迪卡普里奥和凯特·温斯莱特的表演都非常出色，他们成功塑造了杰克和罗丝这两个经典形象，他们的爱情故事感动了无数观众。影片中的经典场景，如"我是世界之王"和船头拥抱的画面，也成为了电影史上的经典镜头。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    },
    {
      id: 7,
      rank: 7,
      title: '千与千寻',
      originalTitle: '千と千尋の神隠し',
      year: 2001,
      score: 9.4,
      ratingCount: '234567',
      ratingDistribution: {
        5: '76.8%',
        4: '20.1%',
        3: '2.7%',
        2: '0.3%',
        1: '0.1%',
      },
      type: '动画, 奇幻',
      region: '日本',
      language: '日语',
      releaseDate: '2001-07-20',
      runtime: '125分钟',
      director: '宫崎骏',
      screenwriter: '宫崎骏',
      actors: '柊瑠美, 入野自由, 夏木真理',
      aka: '神隐少女(台) / Spirited Away',
      imdb: 'https://www.imdb.com/title/tt0245429/',
      description:
        '10岁的少女千寻与父母一同前往新家。在郊外的小路上，他们意外地进入了一个神秘的隧道，来到了一个奇幻的世界。这个世界里，万物都有灵性，人类在这里会变成猪。千寻的父母因为贪吃了给神灵的食物，变成了猪。\n\n千寻在这个世界里遇到了白龙，他告诉千寻，要想在这个世界里生存，必须找到工作。千寻在汤屋找到了一份工作，成为了汤婆婆的手下。在汤屋工作期间，千寻经历了许多奇幻的事情，她帮助了河神，认识了无脸男，还救了白龙。\n\n千寻在这个世界里逐渐成长，她变得勇敢、坚强。最终，她通过自己的努力，救回了父母，也找回了白龙的真实身份。\n\n《千与千寻》是宫崎骏执导的动画电影，由吉卜力工作室制作。影片以其精美的画面、深刻的主题和丰富的想象力而受到观众的喜爱。它获得了第75届奥斯卡金像奖最佳动画长片奖，成为了日本动画电影的代表作之一。\n\n影片探讨了成长、责任、勇气和爱的主题。千寻从一个普通的少女，成长为一个勇敢、有责任感的人。她的经历告诉我们，在面对困难时，我们要勇敢地面对，不要退缩。同时，影片也批评了贪婪、虚荣等负面品质，强调了诚实、善良的重要性。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 8,
      rank: 8,
      title: '盗梦空间',
      originalTitle: 'Inception',
      year: 2010,
      score: 9.3,
      ratingCount: '256789',
      ratingDistribution: {
        5: '74.5%',
        4: '21.8%',
        3: '3.4%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '科幻, 动作, 惊悚',
      region: '美国, 英国',
      language: '英语, 日语, 法语',
      releaseDate: '2010-07-16',
      runtime: '148分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '克里斯托弗·诺兰',
      actors: '莱昂纳多·迪卡普里奥, 约瑟夫·高登-莱维特, 艾伦·佩姬',
      aka: '奠基 / 全面启动',
      imdb: 'https://www.imdb.com/title/tt1375666/',
      description:
        '柯布（莱昂纳多·迪卡普里奥饰）是一名经验丰富的盗梦者，他能够潜入人们的梦境，窃取他们潜意识中的秘密。他的技能使他成为了企业间谍活动中的抢手人物，但也让他成为了国际逃犯，失去了自己的家庭。\n\n现在，柯布有了一个赎罪的机会，一个富商邀请他执行一项看似不可能的任务：不是窃取思想，而是植入思想。如果成功，柯布将获得自由，回到家人身边。\n\n柯布组建了一个团队，包括亚瑟（约瑟夫·高登-莱维特饰）、艾莉亚德妮（艾伦·佩姬饰）、伊姆斯（汤姆·哈迪饰）和齐藤（渡边谦饰）。他们开始了一项危险的任务，进入目标人物费舍尔（希里安·墨菲饰）的梦境，植入解散父亲公司的想法。\n\n然而，任务并不顺利，柯布的潜意识中的妻子梅尔（玛丽昂·歌迪亚饰）不断干扰他们的计划，给他们带来了巨大的危险。他们必须穿越多层梦境，面对各种挑战，才能完成任务。\n\n《盗梦空间》是克里斯托弗·诺兰执导的科幻动作电影，以其复杂的剧情、精彩的动作场面和深刻的主题而受到观众的喜爱。影片探讨了现实与梦境的界限，以及记忆、内疚和救赎的主题。\n\n影片的视觉效果非常出色，特别是重力反转的场景和城市折叠的场景，给观众带来了震撼的视觉体验。莱昂纳多·迪卡普里奥的表演也非常出色，他成功塑造了一个充满内疚和痛苦的盗梦者形象。\n\n《盗梦空间》获得了多项奥斯卡奖，包括最佳摄影、最佳视觉效果和最佳音效剪辑等，成为了电影史上的经典之作。影片的结尾也成为了电影史上最具争议的结尾之一，引发了观众的广泛讨论。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
      id: 9,
      rank: 9,
      title: '星际穿越',
      originalTitle: 'Interstellar',
      year: 2014,
      score: 9.3,
      ratingCount: '245678',
      ratingDistribution: {
        5: '73.2%',
        4: '22.5%',
        3: '4.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '科幻, 冒险, 剧情',
      region: '美国, 英国, 加拿大',
      language: '英语',
      releaseDate: '2014-11-07',
      runtime: '169分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '乔纳森·诺兰, 克里斯托弗·诺兰',
      actors: '马修·麦康纳, 安妮·海瑟薇, 杰西卡·查斯坦',
      aka: '星际启示录(港) / 星际效应(台)',
      imdb: 'https://www.imdb.com/title/tt0816692/',
      description:
        '在不远的未来，地球面临着粮食短缺和环境恶化的危机，人类的生存受到了严重威胁。前NASA宇航员库珀（马修·麦康纳饰）被招募加入一项秘密任务，前往太阳系外寻找新的家园。\n\n库珀和他的团队乘坐"永恒号"飞船，通过一个神秘的虫洞前往另一个星系。他们必须在几个可能适合人类居住的星球中做出选择，同时面对太空旅行中的各种危险和挑战。\n\n在旅途中，库珀与他的女儿墨菲（麦肯基·弗依饰，成年后由杰西卡·查斯坦饰）保持着联系，通过引力波传递信息。墨菲在家中也在努力破解一个神秘的代码，希望能够找到拯救地球的方法。\n\n随着任务的进行，库珀发现了一个关于虫洞和人类命运的惊天秘密。他必须做出艰难的选择，是继续执行任务寻找新家园，还是返回地球与家人团聚。\n\n《星际穿越》是克里斯托弗·诺兰执导的科幻冒险电影，以其壮观的视觉效果、深刻的科学概念和感人的亲情故事而受到观众的喜爱。影片探讨了爱、牺牲、人类命运和宇宙奥秘的主题。\n\n影片的科学顾问包括理论物理学家基普·索恩，他确保了影片中的科学概念尽可能准确。影片的视觉效果非常出色，特别是黑洞的呈现，给观众带来了震撼的视觉体验。\n\n马修·麦康纳和安妮·海瑟薇的表演都非常出色，他们成功塑造了勇敢、有责任感的宇航员形象。影片的音乐也非常出色，由汉斯·季默作曲，为影片增添了浓厚的情感氛围。\n\n《星际穿越》获得了多项奥斯卡奖，包括最佳视觉效果等，成为了电影史上的经典科幻电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 10,
      rank: 10,
      title: '忠犬八公的故事',
      originalTitle: "Hachi: A Dog's Tale",
      year: 2009,
      score: 9.3,
      ratingCount: '213456',
      ratingDistribution: {
        5: '72.8%',
        4: '23.5%',
        3: '3.4%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '剧情, 家庭',
      region: '美国, 英国',
      language: '英语',
      releaseDate: '2009-06-13',
      runtime: '93分钟',
      director: '莱塞·霍尔斯道姆',
      screenwriter: '斯蒂芬·P·林赛',
      actors: '理查·基尔, 萨拉·罗默尔, 琼·艾伦',
      aka: '秋田犬八千(港) / 忠犬小八(台)',
      imdb: 'https://www.imdb.com/title/tt1028532/',
      description:
        '大学教授帕克（理查·基尔饰）在小镇的车站上偶遇一只可怜的小秋田犬，它孤苦无依地蜷缩在车站的角落里。帕克出于同情，将它带回家中，给它取名为八公。\n\n八公与帕克一家相处得非常融洽，它每天都会陪帕克去车站上班，然后在傍晚准时到车站接帕克下班。这种习惯持续了多年，八公成为了车站的一道风景线，也成为了帕克生活中不可或缺的一部分。\n\n然而，有一天，帕克在上课时突发心脏病去世，再也没有回到车站。八公却依然每天到车站等待帕克，无论天气多么恶劣，无论时间多么漫长，它都坚持着这个习惯。\n\n八公的忠诚感动了小镇上的人们，他们开始关注这只忠诚的狗，并为它提供食物和 shelter。八公就这样等待了九年，直到它去世。\n\n《忠犬八公的故事》是根据真实事件改编的电影，讲述了一只秋田犬对主人的忠诚和爱。影片以其感人的故事、真实的情感和出色的表演而受到观众的喜爱。\n\n理查·基尔的表演非常出色，他成功塑造了一个温柔、善良的教授形象。而八公的扮演者，一只名叫Forest的秋田犬，也以其可爱的形象和自然的表演赢得了观众的喜爱。\n\n影片探讨了忠诚、爱和亲情的主题。八公的故事告诉我们，动物也有情感，它们的爱和忠诚有时甚至超过了人类。影片也提醒我们，要珍惜与家人和宠物在一起的时光，因为生命是短暂的，而爱是永恒的。\n\n《忠犬八公的故事》是一部适合全家人观看的电影，它不仅感人至深，也能让观众反思自己与动物的关系，以及什么是真正的爱和忠诚。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTY5MzQ1NjcyMl5BMl5BanBnXkFtZTcwOTc4MjQ1Mw@@._V1_.jpg',
    },
    {
      id: 11,
      rank: 11,
      title: '这个杀手不太冷',
      originalTitle: 'Léon',
      year: 1994,
      score: 9.4,
      ratingCount: '267890',
      ratingDistribution: {
        5: '75.6%',
        4: '21.2%',
        3: '3.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 动作, 犯罪',
      region: '法国',
      language: '英语, 意大利语, 法语',
      releaseDate: '1994-09-14',
      runtime: '110分钟',
      director: '吕克·贝松',
      screenwriter: '吕克·贝松',
      actors: '让·雷诺, 娜塔莉·波特曼, 加里·奥德曼',
      aka: '杀手莱昂 / 终极追杀令(台)',
      imdb: 'https://www.imdb.com/title/tt0110413/',
      description:
        '里昂（让·雷诺饰）是一名职业杀手，他沉默寡言，独来独往，住在纽约的一间公寓里。他的生活非常简单，除了执行杀手任务外，他最大的爱好就是照顾他的盆栽。\n\n玛蒂尔达（娜塔莉·波特曼饰）是一个12岁的小女孩，她住在里昂的隔壁。她的家庭非常不幸福，父亲是一个毒贩，经常虐待她和她的母亲、妹妹。\n\n一天，玛蒂尔达的父亲因为私吞了毒枭史丹菲尔（加里·奥德曼饰）的毒品，全家被史丹菲尔杀害。玛蒂尔达因为出去买东西而幸免于难，她逃到了里昂的公寓，请求里昂收留她。\n\n里昂起初不愿意收留玛蒂尔达，但在她的恳求下，最终还是答应了。玛蒂尔达逐渐了解了里昂的职业，并请求里昂教她如何成为一名杀手，她想要为家人报仇。\n\n里昂开始教玛蒂尔达一些基本的杀手技能，同时也逐渐对她产生了感情。玛蒂尔达也对里昂产生了依赖和爱意，她甚至向里昂表白，说自己爱上了他。\n\n然而，他们的幸福生活并没有持续多久。史丹菲尔发现了玛蒂尔达的存在，并开始追杀他们。里昂为了保护玛蒂尔达，决定与史丹菲尔同归于尽。\n\n《这个杀手不太冷》是吕克·贝松执导的动作犯罪电影，以其精彩的动作场面、深刻的人物刻画和感人的情感故事而受到观众的喜爱。影片探讨了爱、孤独和救赎的主题。\n\n让·雷诺的表演非常出色，他成功塑造了一个外冷内热的杀手形象。娜塔莉·波特曼的表演也非常出色，她在影片中展现了惊人的天赋，成功塑造了一个早熟、勇敢的小女孩形象。\n\n加里·奥德曼的表演也非常出色，他成功塑造了一个邪恶、疯狂的毒枭形象，成为了电影史上最经典的反派角色之一。\n\n《这个杀手不太冷》是一部充满温情和感动的电影，它不仅展现了杀手的冷酷一面，也展现了他内心柔软的一面。影片中的经典台词"人生总是那么痛苦吗？还是只有小时候是这样？""总是如此"也成为了电影史上的经典台词之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTc5MDY1MzY1MF5BMl5BanBnXkFtZTcwOTg4OTQzMQ@@._V1_.jpg',
    },
    {
      id: 12,
      rank: 12,
      title: '楚门的世界',
      originalTitle: 'The Truman Show',
      year: 1998,
      score: 9.2,
      ratingCount: '223456',
      ratingDistribution: {
        5: '70.5%',
        4: '24.3%',
        3: '5.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 科幻',
      region: '美国',
      language: '英语',
      releaseDate: '1998-06-05',
      runtime: '103分钟',
      director: '彼得·威尔',
      screenwriter: '安德鲁·尼科尔',
      actors: '金·凯瑞, 劳拉·琳妮, 艾德·哈里斯',
      aka: '真人Show(港) / 真人戏(台)',
      imdb: 'https://www.imdb.com/title/tt0120382/',
      description:
        '楚门·伯班克（金·凯瑞饰）是一个普通的保险业务员，他生活在一个名为"海景镇"的美丽小镇上，有一个温柔的妻子和一群友好的邻居。然而，楚门不知道的是，他的整个生活都是一个精心策划的电视节目。\n\n从楚门出生的那一刻起，他的生活就被摄像机全天候记录着，他的家人、朋友和邻居都是演员，他所生活的小镇是一个巨大的摄影棚。这个电视节目名为《楚门的世界》，已经播出了30年，是全球最受欢迎的电视节目之一。\n\n楚门逐渐开始怀疑自己的生活，他发现了一些奇怪的事情：他的妻子总是在做广告，他的朋友总是在重复同样的话，他的生活中总是出现一些巧合。他开始试图离开海景镇，但每次都被各种理由阻止。\n\n最终，楚门发现了真相，他决定勇敢地面对现实，离开这个虚假的世界。在节目制作人克里斯托夫（艾德·哈里斯饰）的百般阻挠下，楚门最终成功离开了海景镇，走向了真实的世界。\n\n《楚门的世界》是彼得·威尔执导的科幻剧情电影，以其独特的创意、深刻的主题和出色的表演而受到观众的喜爱。影片探讨了媒体的力量、个人自由和真实与虚假的界限等主题。\n\n金·凯瑞的表演非常出色，他成功塑造了一个从天真无邪到怀疑现实、最终勇敢追求自由的楚门形象。他的表演既幽默又感人，展现了他的多面才华。\n\n艾德·哈里斯的表演也非常出色，他成功塑造了一个冷酷、控制欲强的节目制作人形象。劳拉·琳妮的表演也非常出色，她成功塑造了一个表面温柔、实则是演员的妻子形象。\n\n《楚门的世界》是一部充满哲理和思考的电影，它提醒我们，在当今这个媒体发达的时代，我们每个人都可能成为"楚门"，被媒体和社会所控制。影片鼓励我们要勇敢地追求自由，寻找真实的自我。\n\n影片的结尾非常经典，楚门在离开海景镇前，向观众鞠躬致意，然后走出了摄影棚。这个场景象征着他从虚假的世界走向了真实的世界，也象征着他获得了真正的自由。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMDExZGMyMDYtY2JlNC00MGI1LWJiMDUtYWU3M2Y5NjU2MDVkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 13,
      rank: 13,
      title: '三傻大闹宝莱坞',
      originalTitle: '3 Idiots',
      year: 2009,
      score: 9.2,
      ratingCount: '234567',
      ratingDistribution: {
        5: '71.2%',
        4: '23.5%',
        3: '5.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '喜剧, 剧情, 爱情',
      region: '印度',
      language: '印地语, 英语',
      releaseDate: '2009-12-25',
      runtime: '170分钟',
      director: '拉库马·希拉尼',
      screenwriter: '维德胡·维诺德·乔普拉, 拉库马·希拉尼, 阿希贾特·乔希',
      actors: '阿米尔·汗, 卡琳娜·卡普, 马德哈万',
      aka: '三个傻瓜(台) / 作死不离3兄弟(港)',
      imdb: 'https://www.imdb.com/title/tt1187043/',
      description:
        '法兰（马德哈万饰）、拉杜（沙尔曼·乔希饰）和兰彻（阿米尔·汗饰）是印度帝国理工学院的三名学生，他们住在同一间宿舍里。兰彻是一个与众不同的学生，他不喜欢死记硬背，而是喜欢理解和创新。他经常挑战传统的教育制度，与校长"病毒"（波曼·伊拉尼饰）发生冲突。\n\n兰彻的朋友法兰和拉杜都面临着各自的问题：法兰的家人希望他成为一名工程师，而他真正的梦想是成为一名摄影师；拉杜的家庭非常贫困，他的父亲瘫痪在床，母亲是一名佣人，妹妹因为没有嫁妆而无法结婚，他感到非常压力。\n\n兰彻通过自己的智慧和乐观，帮助法兰和拉杜解决了他们的问题，同时也赢得了校长女儿皮娅（卡琳娜·卡普饰）的芳心。然而，兰彻的真实身份一直是一个谜，他在毕业前突然消失了。\n\n十年后，法兰和拉杜接到了一个电话，得知兰彻的消息，他们决定一起去寻找兰彻，揭开他的真实身份。\n\n《三傻大闹宝莱坞》是拉库马·希拉尼执导的喜剧剧情电影，以其幽默的剧情、深刻的主题和出色的表演而受到观众的喜爱。影片改编自奇坦·巴哈特的小说《五点人》，探讨了教育制度、友情、爱情和梦想等主题。\n\n阿米尔·汗的表演非常出色，他成功塑造了一个聪明、乐观、勇敢的兰彻形象。马德哈万和沙尔曼·乔希的表演也非常出色，他们成功塑造了法兰和拉杜这两个性格迥异的角色。\n\n卡琳娜·卡普的表演也非常出色，她成功塑造了一个聪明、独立的皮娅形象。波曼·伊拉尼的表演也非常出色，他成功塑造了一个严厉、传统的校长形象。\n\n《三傻大闹宝莱坞》是一部充满正能量的电影，它鼓励人们要追求自己的梦想，不要被传统的观念和制度所束缚。影片中的经典台词"All is well"（一切顺利）也成为了流行语，鼓励人们在面对困难时保持乐观的心态。\n\n影片的音乐也非常出色，其中的歌曲《Give Me Some Sunshine》和《Zoobi Doobi》等都非常受欢迎。影片的舞蹈场面也非常精彩，展现了印度电影的特色。\n\n《三傻大闹宝莱坞》是一部适合全家人观看的电影，它不仅幽默搞笑，也能让观众反思教育制度和人生意义，是一部非常有价值的电影。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzE0NjMxMzE2OV5BMl5BanBnXkFtZTcwODk1MTUyMw@@._V1_.jpg',
    },
    {
      id: 14,
      rank: 14,
      title: '放牛班的春天',
      originalTitle: 'Les Choristes',
      year: 2004,
      score: 9.3,
      ratingCount: '203456',
      ratingDistribution: {
        5: '72.5%',
        4: '23.2%',
        3: '4.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '剧情, 音乐',
      region: '法国, 瑞士, 德国',
      language: '法语',
      releaseDate: '2004-03-17',
      runtime: '97分钟',
      director: '克里斯托夫·巴拉蒂',
      screenwriter: '克里斯托夫·巴拉蒂, 菲利普·洛佩斯-屈瓦尔',
      actors: '杰拉尔·朱诺, 让-巴蒂斯特·莫尼耶, 弗朗西斯·贝尔兰德',
      aka: '歌声伴我心(港) / 唱诗班男孩(台)',
      imdb: 'https://www.imdb.com/title/tt0372824/',
      description:
        '1949年，克莱门特·马修（杰拉尔·朱诺饰）是一名才华横溢的音乐家，但他的音乐事业并不顺利，只能在一所名为"池塘之底"的寄宿学校当助理教师。这所学校里的学生都是一些问题少年，他们调皮捣蛋，不服管教，校长哈森（弗朗西斯·贝尔兰德饰）采用体罚的方式来管理他们。\n\n马修对这种教育方式非常不满，他决定用音乐来感化这些孩子。他发现这些孩子都有音乐天赋，于是他组建了一个合唱团，教他们唱歌。在马修的指导下，孩子们的音乐水平逐渐提高，他们的性格也逐渐变得开朗、善良。\n\n马修特别关注一个叫皮埃尔·莫安琦（让-巴蒂斯特·莫尼耶饰）的学生，他发现皮埃尔有着惊人的音乐天赋，但他的性格非常叛逆。马修通过音乐，逐渐打开了皮埃尔的心扉，帮助他走出了阴影。\n\n然而，马修的教育方式并不被校长哈森所认可，他认为马修是在浪费时间。最终，马修因为一次意外事件被校长解雇，但他留下的合唱团却继续存在，影响了一代又一代的学生。\n\n《放牛班的春天》是克里斯托夫·巴拉蒂执导的音乐剧情电影，以其感人的故事、优美的音乐和出色的表演而受到观众的喜爱。影片改编自法国作家乔治·夏帕克的同名小说，探讨了教育、音乐和人性的主题。\n\n杰拉尔·朱诺的表演非常出色，他成功塑造了一个温柔、有爱心的教师形象。让-巴蒂斯特·莫尼耶的表演也非常出色，他在影片中展现了惊人的音乐天赋，他的歌声非常优美，令人难忘。\n\n弗朗西斯·贝尔兰德的表演也非常出色，他成功塑造了一个严厉、冷酷的校长形象。其他小演员的表演也非常自然、真实，他们成功塑造了一群调皮捣蛋但又充满活力的孩子形象。\n\n《放牛班的春天》是一部充满温情和感动的电影，它告诉我们，音乐有着强大的力量，它可以感化人心，改变人的命运。影片也提醒我们，教育的目的不是惩罚和控制，而是引导和启发，每个孩子都有自己的天赋和潜力，需要我们去发现和培养。\n\n影片的音乐非常出色，由布鲁诺·库莱斯作曲，其中的歌曲《Vois sur ton chemin》（看看你的路）和《Cerf-volant》（风筝）等都非常受欢迎。影片的音乐不仅优美动听，也与剧情紧密结合，增强了影片的情感冲击力。\n\n《放牛班的春天》是一部适合全家人观看的电影，它不仅感人至深，也能让观众反思教育的意义和音乐的力量，是一部非常有价值的电影。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMzA0NjY4NjQtNjRlOC00MGVmLTg4MmQtYTQ5MjM4MWQ0MGVhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 15,
      rank: 15,
      title: '活着',
      originalTitle: 'To Live',
      year: 1994,
      score: 9.3,
      ratingCount: '198765',
      ratingDistribution: {
        5: '71.8%',
        4: '24.5%',
        3: '3.5%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '剧情, 历史',
      region: '中国大陆, 中国香港',
      language: '汉语普通话',
      releaseDate: '1994-05-17',
      runtime: '125分钟',
      director: '张艺谋',
      screenwriter: '余华, 芦苇',
      actors: '葛优, 巩俐, 姜武',
      aka: '人生 / Lifetimes',
      imdb: 'https://www.imdb.com/title/tt0108595/',
      description:
        '福贵（葛优饰）是一个富家少爷，他嗜赌如命，最终输掉了所有的家产，变得一贫如洗。他的父亲因此气死，母亲也病入膏肓。福贵浪子回头，开始靠演皮影戏维持生计，他的妻子家珍（巩俐饰）也回到了他的身边。\n\n然而，福贵的命运并没有就此好转。他被国民党抓去当壮丁，在战场上九死一生。解放后，他回到了家，与家珍和一双儿女团聚。但他的儿子有庆（董飞饰）却在一次献血中意外死亡，女儿凤霞（张璐饰）也因为难产而死。福贵经历了一次又一次的打击，但他始终没有放弃生活的希望。\n\n福贵的一生充满了苦难，但他始终保持着乐观的心态，坚强地活着。他的故事反映了中国近现代社会的变迁，以及普通中国人在历史洪流中的命运。\n\n《活着》是张艺谋执导的剧情历史电影，改编自余华的同名小说，以其深刻的主题、出色的表演和真实的情感而受到观众的喜爱。影片探讨了生命的意义、苦难的价值和人性的坚韧等主题。\n\n葛优的表演非常出色，他成功塑造了一个从纨绔子弟到历经沧桑的老人形象。他的表演自然、真实，将福贵的性格变化和内心世界展现得淋漓尽致，获得了戛纳国际电影节最佳男演员奖。\n\n巩俐的表演也非常出色，她成功塑造了一个温柔、坚强的妻子和母亲形象。她的表演细腻、感人，展现了家珍对福贵的爱和对家庭的责任感。\n\n其他演员的表演也非常出色，他们成功塑造了各种性格鲜明的角色，为影片增添了丰富的色彩。\n\n《活着》是一部充满现实主义色彩的电影，它通过福贵的一生，展现了中国近现代社会的变迁，包括抗日战争、解放战争、大跃进和文化大革命等重要历史事件。影片没有美化历史，而是真实地反映了这些历史事件对普通中国人生活的影响。\n\n影片的结尾非常感人，福贵和家珍虽然失去了很多亲人，但他们依然坚强地活着，与孙子苦根（肖聪饰）一起度过平静的晚年。这个结尾象征着生命的延续和希望的存在，也呼应了影片的主题：活着本身就是一种意义。\n\n《活着》是一部非常有深度和感染力的电影，它不仅展现了个人的命运，也反映了整个民族的历史。它提醒我们，要珍惜当下的生活，因为生命是宝贵的，活着就是最大的幸福。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTk3OTQ2ODg4MF5BMl5BanBnXkFtZTcwNDQ0NzU3Mw@@._V1_.jpg',
    },
    {
      id: 16,
      rank: 16,
      title: '海上钢琴师',
      originalTitle: "La leggenda del pianista sull'oceano",
      year: 1998,
      score: 9.3,
      ratingCount: '213456',
      ratingDistribution: {
        5: '72.5%',
        4: '23.2%',
        3: '4.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '剧情, 音乐',
      region: '意大利',
      language: '英语, 法语, 意大利语',
      releaseDate: '1998-10-28',
      runtime: '165分钟',
      director: '朱塞佩·托纳多雷',
      screenwriter: '亚利桑德罗·巴里克, 朱塞佩·托纳多雷',
      actors: '蒂姆·罗斯, 普路特·泰勒·文斯, 比尔·努恩',
      aka: '声光伴我飞(港) / 一九零零的传奇(台)',
      imdb: 'https://www.imdb.com/title/tt0120731/',
      description:
        '1900年，一个被遗弃在邮轮"弗吉尼亚号"上的婴儿被船员丹尼·博德曼（比尔·努恩饰）发现并收养，他给婴儿取名为"1900"。1900在邮轮上长大，他没有国籍，没有身份证，也没有家庭。\n\n1900从小就展现出了惊人的音乐天赋，他无师自通地学会了弹钢琴，并且成为了邮轮上的钢琴师。他的钢琴演奏技艺高超，能够根据乘客的表情和动作即兴创作音乐，赢得了乘客们的喜爱和尊重。\n\n1900的一生都在邮轮上度过，他从未下过船。他曾经有过下船的机会，但当他站在舷梯上，看着岸上高楼大厦鳞次栉比的景象时，他突然感到恐惧和迷茫，最终决定回到船上。\n\n1900的朋友马克斯（普路特·泰勒·文斯饰）是一名小号手，他曾经劝1900下船，去追求更广阔的世界，但1900始终没有答应。后来，马克斯离开了邮轮，开始了自己的生活。\n\n多年后，马克斯听说"弗吉尼亚号"即将被拆解，他决定回到船上，寻找1900。他找到了1900，劝他下船，但1900依然拒绝了。最终，1900与"弗吉尼亚号"一起沉入了海底。\n\n《海上钢琴师》是朱塞佩·托纳多雷执导的音乐剧情电影，以其优美的音乐、深刻的主题和出色的表演而受到观众的喜爱。影片探讨了孤独、自由、艺术和人生选择等主题。\n\n蒂姆·罗斯的表演非常出色，他成功塑造了一个才华横溢、孤独敏感的钢琴师形象。他的表演细腻、感人，将1900的内心世界展现得淋漓尽致。\n\n普路特·泰勒·文斯的表演也非常出色，他成功塑造了一个热情、真诚的小号手形象。比尔·努恩的表演也非常出色，他成功塑造了一个善良、幽默的船员形象。\n\n影片的音乐非常出色，由埃尼奥·莫里康内作曲，其中的钢琴曲《Playing Love》和《The Crave》等都非常受欢迎。影片的音乐不仅优美动听，也与剧情紧密结合，增强了影片的情感冲击力。\n\n《海上钢琴师》是一部充满诗意和哲思的电影，它通过1900的故事，探讨了人生的意义和选择的价值。1900选择留在船上，不是因为他害怕外面的世界，而是因为他找到了自己的归宿和价值。他的故事告诉我们，每个人都有自己的生活方式和选择，只要是适合自己的，就是最好的。\n\n影片的结尾非常经典，1900在邮轮被拆解前，与马克斯告别，然后继续在船上弹钢琴。当邮轮沉入海底时，1900依然在弹钢琴，仿佛置身于一个永恒的世界中。这个场景象征着艺术的永恒和精神的自由，也呼应了影片的主题：真正的自由不是向外追求，而是向内寻找。\n\n《海上钢琴师》是一部非常有深度和感染力的电影，它不仅展现了音乐的魅力，也探讨了人生的真谛。它提醒我们，要珍惜自己的选择，坚持自己的信念，因为每个人的人生都是独一无二的。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTk3OTQ2ODg4MF5BMl5BanBnXkFtZTcwNDQ0NzU3Mw@@._V1_.jpg',
    },
    {
      id: 17,
      rank: 17,
      title: '机器人总动员',
      originalTitle: 'WALL·E',
      year: 2008,
      score: 9.3,
      ratingCount: '245678',
      ratingDistribution: {
        5: '73.5%',
        4: '22.8%',
        3: '3.5%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '动画, 科幻, 冒险',
      region: '美国',
      language: '英语',
      releaseDate: '2008-06-27',
      runtime: '98分钟',
      director: '安德鲁·斯坦顿',
      screenwriter: '安德鲁·斯坦顿, 吉姆·里尔顿',
      actors: '本·贝尔特, 艾丽莎·奈特, 杰夫·格尔林',
      aka: '瓦力(港/台)',
      imdb: 'https://www.imdb.com/title/tt0910970/',
      description:
        '公元2805年，地球已经被人类污染得无法居住，人类被迫离开地球，乘坐飞船在太空中生活。留下了一群机器人WALL·E来清理地球的垃圾。700年后，只剩下一个WALL·E还在工作，它孤独地生活在地球上，只有一只蟑螂陪伴着它。\n\n一天，一艘飞船降落在地球上，带来了一个先进的机器人EVE，她的任务是寻找地球上是否还有生命的迹象。WALL·E对EVE一见钟情，开始跟随她。当EVE发现了一株植物后，她被召回了飞船。WALL·E也跟随她来到了飞船上，在那里，WALL·E和EVE经历了一系列冒险，最终帮助人类重新回到了地球。\n\n《机器人总动员》是安德鲁·斯坦顿执导的动画科幻电影，由皮克斯动画工作室制作，以其精美的画面、深刻的主题和感人的故事而受到观众的喜爱。影片探讨了环保、爱情、孤独和人类命运等主题。\n\n影片的前30分钟几乎没有对话，完全通过画面和音乐来讲述故事，但却非常引人入胜。WALL·E的形象设计非常可爱，它的一举一动都充满了人性的温暖，让观众不禁对它产生了深厚的感情。\n\nEVE的形象设计也非常精美，她的身体光滑、流线型，象征着先进的科技。但她也有自己的情感，在与WALL·E的相处中，逐渐变得温柔、有爱心。\n\n影片的配角也非常出色，包括飞船上的机器人Auto、船长和其他人类。他们的形象设计和性格塑造都非常成功，为影片增添了丰富的色彩。\n\n影片的视觉效果非常出色，地球的废墟景象和太空的浩瀚景象都制作得非常逼真。影片的音乐也非常出色，由托马斯·纽曼作曲，其中的主题曲《Down to Earth》由彼得·盖布瑞尔演唱，获得了奥斯卡最佳原创歌曲奖。\n\n《机器人总动员》是一部适合全家人观看的电影，它不仅娱乐性强，也能让观众反思人类与环境的关系，以及什么是真正的爱情和幸福。影片的结尾非常感人，人类在WALL·E和EVE的帮助下，重新回到了地球，开始了新的生活。这个结尾象征着希望的存在和人类的重生，也呼应了影片的主题：只要我们有勇气和爱心，就能够创造美好的未来。\n\n《机器人总动员》获得了多项奥斯卡奖，包括最佳动画长片奖，成为了皮克斯动画工作室的经典之作之一。它不仅在商业上取得了巨大成功，也获得了评论界的高度评价，成为了电影史上最伟大的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0MF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_.jpg',
    },
    {
      id: 18,
      rank: 18,
      title: '寻梦环游记',
      originalTitle: 'Coco',
      year: 2017,
      score: 9.1,
      ratingCount: '256789',
      ratingDistribution: {
        5: '69.8%',
        4: '25.2%',
        3: '4.7%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '动画, 音乐, 奇幻',
      region: '美国',
      language: '英语, 西班牙语',
      releaseDate: '2017-11-22',
      runtime: '105分钟',
      director: '李·昂克里奇, 阿德里安·莫利纳',
      screenwriter: '李·昂克里奇, 阿德里安·莫利纳, 马修·奥尔德里奇',
      actors: '安东尼·冈萨雷斯, 盖尔·加西亚·贝纳尔, 本杰明·布拉特',
      aka: '玩转极乐园(港) / 可可夜总会(台)',
      imdb: 'https://www.imdb.com/title/tt2380307/',
      description:
        '12岁的男孩米格（安东尼·冈萨雷斯配音）梦想成为一名音乐家，就像他的偶像歌神德拉库斯（本杰明·布拉特配音）一样。但是他的家族却禁止他接触音乐，因为他们认为音乐给家族带来了诅咒。\n\n在亡灵节这一天，米格为了追求自己的音乐梦想，偷了德拉库斯的吉他，结果意外穿越到了亡灵世界。在那里，米格遇到了他的祖先们，他们帮助米格寻找德拉库斯，希望能够得到他的祝福，回到现实世界。\n\n在这个过程中，米格发现了一个关于家族历史的秘密：德拉库斯其实是一个骗子，他谋杀了米格的曾祖父埃克托（盖尔·加西亚·贝纳尔配音），窃取了他的音乐作品。米格必须揭露这个真相，让他的家族重新接纳音乐。\n\n《寻梦环游记》是李·昂克里奇和阿德里安·莫利纳执导的动画音乐电影，由皮克斯动画工作室制作，以其精彩的音乐、深刻的主题和感人的故事而受到观众的喜爱。影片探讨了家庭、亲情、记忆和音乐的重要性等主题。\n\n影片的视觉效果非常出色，亡灵世界的设计非常精美，色彩鲜艳，充满了墨西哥传统文化的元素。影片的音乐也非常出色，由迈克·吉亚奇诺作曲，其中的歌曲《Remember Me》获得了奥斯卡最佳原创歌曲奖。\n\n影片的配音演员表现非常出色，安东尼·冈萨雷斯的配音充满了童真和热情，盖尔·加西亚·贝纳尔的配音充满了幽默和深情，本杰明·布拉特的配音充满了魅力和邪恶。\n\n《寻梦环游记》是一部适合全家人观看的电影，它不仅娱乐性强，也能让观众反思家庭的重要性和记忆的价值。影片的结尾非常感人，米格在埃克托的帮助下，揭露了德拉库斯的真相，让他的家族重新接纳了音乐。埃克托也因为米格的记忆而得以在亡灵世界继续存在，与他的女儿可可（安娜·奥菲丽亚·莫吉亚配音）团聚。\n\n这个结尾象征着家庭的力量和记忆的重要性，也呼应了影片的主题：家人是我们最宝贵的财富，记忆是我们与亲人之间永恒的纽带。\n\n《寻梦环游记》获得了多项奥斯卡奖，包括最佳动画长片奖和最佳原创歌曲奖，成为了皮克斯动画工作室的经典之作之一。它不仅在商业上取得了巨大成功，也获得了评论界的高度评价，成为了电影史上最伟大的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjIxMDkxNDA3OV5BMl5BanBnXkFtZTgwNjE5MTIzMzI@._V1_.jpg',
    },
    {
      id: 19,
      rank: 19,
      title: '心灵奇旅',
      originalTitle: 'Soul',
      year: 2020,
      score: 9.1,
      ratingCount: '223456',
      ratingDistribution: {
        5: '68.5%',
        4: '26.2%',
        3: '5.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '动画, 音乐, 奇幻',
      region: '美国',
      language: '英语',
      releaseDate: '2020-12-25',
      runtime: '101分钟',
      director: '彼特·道格特, 凯普·鲍尔斯',
      screenwriter: '彼特·道格特, 麦克·琼斯, 凯普·鲍尔斯',
      actors: '杰米·福克斯, 蒂娜·菲, 菲利西亚·拉斯海德',
      aka: '灵魂奇遇记(港) / 灵魂急转弯(台)',
      imdb: 'https://www.imdb.com/title/tt2948372/',
      description:
        '乔伊·高纳（杰米·福克斯配音）是一名中学音乐教师，他一直梦想成为一名职业爵士乐手。终于，他得到了一个机会，能够与著名的爵士乐手多萝西娅·威廉姆斯（安吉拉·贝塞特配音）一起演出。\n\n然而，在演出前的一天，乔伊因为兴奋过度，不小心掉进了一个下水道，他的灵魂离开了身体，进入了一个名为"生之来处"的地方。在那里，乔伊遇到了一个名为22（蒂娜·菲配音）的灵魂，她已经在"生之来处"待了几千年，一直不愿意投胎转世。\n\n乔伊和22一起经历了一系列冒险，他们回到了地球，进入了一只猫的身体和乔伊自己的身体，体验了不同的生活。在这个过程中，乔伊逐渐意识到，生活的意义不仅仅是追求梦想，还有很多其他美好的事物，比如品尝美食、欣赏风景、与朋友相处等。\n\n22也在这个过程中，逐渐发现了生活的美好，她决定投胎转世，开始自己的人生。乔伊也重新回到了自己的身体，继续追求自己的音乐梦想，但他的心态已经发生了变化，他更加珍惜当下的生活。\n\n《心灵奇旅》是彼特·道格特和凯普·鲍尔斯执导的动画音乐电影，由皮克斯动画工作室制作，以其深刻的主题、出色的音乐和感人的故事而受到观众的喜爱。影片探讨了生活的意义、梦想的价值和自我认知等主题。\n\n影片的视觉效果非常出色，"生之来处"和"灵魂世界"的设计非常精美，充满了想象力。影片的音乐也非常出色，由特伦特·雷诺和阿提喀斯·罗斯作曲，其中的爵士乐片段非常精彩，展现了音乐的魅力。\n\n杰米·福克斯的配音非常出色，他成功塑造了一个热情、执着的音乐教师形象。蒂娜·菲的配音也非常出色，她成功塑造了一个聪明、叛逆的灵魂形象。其他配音演员的表演也非常出色，他们成功塑造了各种性格鲜明的角色，为影片增添了丰富的色彩。\n\n《心灵奇旅》是一部适合全家人观看的电影，它不仅娱乐性强，也能让观众反思生活的意义和梦想的价值。影片的结尾非常感人，乔伊在经历了一系列冒险后，重新回到了自己的身体，继续追求自己的音乐梦想，但他的心态已经发生了变化，他更加珍惜当下的生活。22也成功投胎转世，开始了自己的人生。\n\n这个结尾象征着生命的循环和希望的存在，也呼应了影片的主题：生活的意义不仅仅是追求梦想，还有很多其他美好的事物，我们应该珍惜当下的每一刻。\n\n《心灵奇旅》获得了多项奥斯卡奖，包括最佳动画长片奖和最佳原创配乐奖，成为了皮克斯动画工作室的经典之作之一。它不仅在商业上取得了巨大成功，也获得了评论界的高度评价，成为了电影史上最伟大的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzIxMjYwMzY4Nl5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
    },
    {
      id: 20,
      rank: 20,
      title: '疯狂动物城',
      originalTitle: 'Zootopia',
      year: 2016,
      score: 9.2,
      ratingCount: '267890',
      ratingDistribution: {
        5: '70.8%',
        4: '24.5%',
        3: '4.5%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '动画, 冒险, 喜剧',
      region: '美国',
      language: '英语',
      releaseDate: '2016-03-04',
      runtime: '108分钟',
      director: '拜恩·霍华德, 瑞奇·摩尔, 杰拉德·布什',
      screenwriter: '杰拉德·布什, 菲尔·约翰斯顿, 拜恩·霍华德',
      actors: '金妮弗·古德温, 杰森·贝特曼, 伊德里斯·艾尔巴',
      aka: '优兽大都会(港) / 动物方城市(台)',
      imdb: 'https://www.imdb.com/title/tt2948372/',
      description:
        '朱迪·霍普斯（金妮弗·古德温配音）是一只兔子，她从小就梦想成为一名警察。虽然她的家人和朋友都不支持她，认为兔子不可能成为警察，但朱迪依然坚持自己的梦想，努力学习，最终成为了动物城警察局的第一名兔子警察。\n\n然而，朱迪在警察局里并没有受到重视，她被分配去开罚单，而不是处理重要的案件。为了证明自己的能力，朱迪主动要求处理一起失踪案，她必须在48小时内找到失踪的水獭先生。\n\n朱迪在调查过程中，遇到了一只狐狸尼克·王尔德（杰森·贝特曼配音），他是一个狡猾的骗子，但朱迪发现他对动物城非常熟悉，于是强迫他帮助自己调查案件。\n\n朱迪和尼克一起经历了一系列冒险，他们发现了一个巨大的阴谋：动物城的一些食肉动物突然变得狂暴，这引起了城内的恐慌。朱迪和尼克必须找出真相，阻止这个阴谋，维护动物城的和平。\n\n在调查过程中，朱迪和尼克逐渐建立了友谊，他们互相帮助，互相学习，最终成功破解了案件，揭露了真相。朱迪也证明了自己的能力，成为了一名优秀的警察。\n\n《疯狂动物城》是拜恩·霍华德、瑞奇·摩尔和杰拉德·布什执导的动画冒险喜剧电影，由迪士尼动画工作室制作，以其精彩的剧情、出色的配音和深刻的主题而受到观众的喜爱。影片探讨了偏见、包容、友谊和梦想等主题。\n\n影片的视觉效果非常出色，动物城的设计非常精美，充满了想象力。不同区域的设计都非常独特，比如撒哈拉广场、冰川镇、雨林区等，展现了不同动物的生活环境。\n\n金妮弗·古德温的配音非常出色，她成功塑造了一个勇敢、乐观的兔子警察形象。杰森·贝特曼的配音也非常出色，他成功塑造了一个狡猾但善良的狐狸形象。伊德里斯·艾尔巴的配音也非常出色，他成功塑造了一个严厉但公正的警察局局长形象。\n\n影片的配角也非常出色，包括树懒闪电（雷蒙德·S·佩尔西配音）、绵羊副市长（珍妮·斯蕾特配音）和大先生（汤姆·肯尼配音）等，他们的形象设计和配音都非常成功，为影片增添了丰富的色彩。\n\n《疯狂动物城》是一部适合全家人观看的电影，它不仅娱乐性强，也能让观众反思社会中的偏见和歧视问题。影片的结尾非常感人，朱迪和尼克成为了好朋友，他们一起维护动物城的和平。这个结尾象征着友谊的力量和包容的重要性，也呼应了影片的主题：只要我们互相理解、互相尊重，就能够创造一个更加美好的世界。\n\n《疯狂动物城》获得了多项奥斯卡奖，包括最佳动画长片奖，成为了迪士尼动画工作室的经典之作之一。它不仅在商业上取得了巨大成功，也获得了评论界的高度评价，成为了电影史上最伟大的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNjQzNDI4NTA3MF5BMl5BanBnXkFtZTgwNzY1OTQzMDI@._V1_.jpg',
    },
    {
      rank: 41,
      title: '心灵捕手',
      originalTitle: 'Good Will Hunting',
      year: 1997,
      score: 9.0,
      ratingCount: '198765',
      ratingDistribution: {
        5: '70.5%',
        4: '24.3%',
        3: '4.8%',
        2: '0.3%',
        1: '0.1%',
      },
      type: '剧情',
      region: '美国',
      language: '英语',
      releaseDate: '1997-12-05',
      runtime: '126分钟',
      director: '格斯·范·桑特',
      screenwriter: '马特·达蒙, 本·阿弗莱克',
      actors: '马特·达蒙, 罗宾·威廉姆斯, 本·阿弗莱克',
      aka: '骄阳似我(港/台)',
      imdb: 'https://www.imdb.com/title/tt0119217/',
      description:
        '麻省理工学院的数学教授在黑板上留下了一道难题，却被一个年轻的清洁工威尔解了出来。威尔是一个极具天赋的年轻人，但他却在街头打架斗殴，被送进了少年感化院。数学教授发现了威尔的天赋，决定帮助他，并为他请来了心理医生桑恩。\n\n桑恩与威尔进行了多次心灵对话，逐渐了解了威尔的内心世界。威尔从小被父母遗弃，受到了很多伤害，这导致他不敢面对自己的天赋，也不敢与他人建立亲密关系。桑恩通过自己的经历和真诚，逐渐打开了威尔的心扉，让他开始面对自己的过去，接受自己的天赋，并勇敢地追求自己的未来。\n\n同时，威尔与数学教授之间也建立了深厚的友谊。数学教授希望威尔能够充分发挥自己的天赋，成为一名数学家，而威尔则希望能够过自己想要的生活。最终，威尔在桑恩的帮助下，找到了自己的人生方向，决定离开波士顿，去寻找自己的真爱。\n\n影片通过威尔的故事，探讨了天赋、友谊、爱情和自我认同等主题。马特·达蒙和罗宾·威廉姆斯的表演都非常出色，尤其是罗宾·威廉姆斯，他凭借在影片中的精彩表演获得了奥斯卡最佳男配角奖。\n\n《心灵捕手》是一部感人至深的电影，它告诉我们，每个人都有自己的天赋和价值，我们应该勇敢地面对自己的过去，接受自己的现在，并努力追求自己的未来。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 42,
      rank: 42,
      title: '第六感',
      originalTitle: 'The Sixth Sense',
      year: 1999,
      score: 8.9,
      ratingCount: '234567',
      ratingDistribution: {
        5: '68.7%',
        4: '25.8%',
        3: '5.2%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '悬疑, 惊悚',
      region: '美国',
      language: '英语',
      releaseDate: '1999-08-06',
      runtime: '107分钟',
      director: 'M·奈特·沙马兰',
      screenwriter: 'M·奈特·沙马兰',
      actors: '布鲁斯·威利斯, 海利·乔·奥斯蒙, 托妮·科莱特',
      aka: '鬼眼(港/台)',
      imdb: 'https://www.imdb.com/title/tt0167404/',
      description:
        '儿童心理学家马尔科姆·克罗尔（布鲁斯·威利斯饰）在获得年度最佳心理学家奖项后，却被一名他曾经治疗过的患者枪杀。一年后，他遇到了一个名叫科尔（海利·乔·奥斯蒙饰）的男孩，科尔声称自己能够看到死人。\n\n马尔科姆开始治疗科尔，希望能够帮助他克服这个问题。在治疗过程中，马尔科姆逐渐发现，科尔所说的都是真的，他确实能够看到死人，而且这些死人并不知道自己已经死了。马尔科姆开始相信科尔，并帮助他学会如何与这些死人相处。\n\n同时，马尔科姆也在处理自己的婚姻问题，他与妻子的关系越来越疏远。随着治疗的深入，马尔科姆发现了一个惊人的真相：他自己其实已经死了，他是被那名患者枪杀后变成了鬼魂。他之所以能够看到妻子，是因为他的灵魂还没有离开这个世界，他还有未完成的事情。\n\n科尔帮助马尔科姆明白了这一点，并鼓励他与妻子告别，让他的灵魂得到安息。最终，马尔科姆与妻子告别，然后消失了。而科尔则学会了如何与死人相处，开始了新的生活。\n\n影片的结尾反转非常经典，让观众大吃一惊。海利·乔·奥斯蒙的表演非常出色，他成功塑造了一个能够看到死人的男孩形象，获得了奥斯卡最佳男配角提名。\n\n《第六感》是一部非常成功的悬疑惊悚片，它不仅在商业上取得了巨大成功，也获得了评论界的高度评价。影片的剧情紧凑，悬念迭起，结尾的反转更是让人回味无穷。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 43,
      rank: 43,
      title: '勇敢的心',
      originalTitle: 'Braveheart',
      year: 1995,
      score: 9.0,
      ratingCount: '215678',
      ratingDistribution: {
        5: '72.3%',
        4: '22.5%',
        3: '4.8%',
        2: '0.3%',
        1: '0.1%',
      },
      type: '历史, 战争',
      region: '美国',
      language: '英语, 法语, 拉丁语',
      releaseDate: '1995-05-24',
      runtime: '178分钟',
      director: '梅尔·吉布森',
      screenwriter: '兰道尔·华莱士',
      actors: '梅尔·吉布森, 苏菲·玛索, 帕特里克·麦高汉',
      aka: '惊世未了缘(港/台)',
      imdb: 'https://www.imdb.com/title/tt0112573/',
      description:
        '13世纪的苏格兰，威廉·华莱士（梅尔·吉布森饰）的父亲和哥哥被英格兰军队杀害。华莱士长大后，回到家乡，与青梅竹马的梅伦结婚。然而，英格兰军队却杀害了梅伦，这让华莱士悲愤交加，他决定领导苏格兰人民反抗英格兰的统治。\n\n华莱士组织了一支军队，与英格兰军队展开了多次战斗。他的勇气和领导力赢得了苏格兰人民的支持，他的军队也逐渐壮大。在斯特林桥战役中，华莱士带领苏格兰军队击败了英格兰军队，取得了重大胜利。\n\n然而，苏格兰的贵族们却害怕华莱士的权力，他们背叛了华莱士，与英格兰国王达成了协议。华莱士被英格兰军队俘虏，并被处以死刑。在行刑前，华莱士高呼"自由"，激励了苏格兰人民继续反抗英格兰的统治。\n\n最终，苏格兰贵族罗伯特·布鲁斯继承了华莱士的遗志，领导苏格兰人民赢得了独立。\n\n影片通过华莱士的故事，展现了苏格兰人民为了自由而战的精神。梅尔·吉布森的表演非常出色，他成功塑造了一个勇敢、坚定的苏格兰民族英雄形象。影片的战争场面非常壮观，音乐也非常感人。\n\n《勇敢的心》获得了多项奥斯卡奖，包括最佳影片、最佳导演和最佳摄影等。影片中的经典台词"自由"也成为了苏格兰民族精神的象征。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 44,
      rank: 44,
      title: '角斗士',
      originalTitle: 'Gladiator',
      year: 2000,
      score: 8.9,
      ratingCount: '245678',
      ratingDistribution: {
        5: '69.8%',
        4: '25.2%',
        3: '4.6%',
        2: '0.3%',
        1: '0.1%',
      },
      type: '历史, 动作',
      region: '美国',
      language: '英语, 拉丁语',
      releaseDate: '2000-05-05',
      runtime: '155分钟',
      director: '雷德利·斯科特',
      screenwriter: '大卫·弗兰佐尼, 约翰·洛根, 威廉·尼科尔森',
      actors: '罗素·克劳, 杰昆·菲尼克斯, 康妮·尼尔森',
      aka: '帝国骄雄(港), 神鬼战士(台)',
      imdb: 'https://www.imdb.com/title/tt0172495/',
      description:
        '罗马帝国的大将军马克西姆斯（罗素·克劳饰）是皇帝马可·奥勒留（理查德·哈里斯饰）最信任的人，他带领罗马军队取得了无数胜利。马可·奥勒留决定将皇位传给马克西姆斯，而不是自己的儿子康茂德（杰昆·菲尼克斯饰）。康茂德得知后，杀死了自己的父亲，并下令杀死马克西姆斯。\n\n马克西姆斯逃脱了追杀，但他的家人却被康茂德杀害。马克西姆斯被奴隶贩子抓住，成为了一名角斗士。在角斗士学校，马克西姆斯展现了出色的战斗技巧，逐渐成为了一名著名的角斗士。\n\n康茂德成为皇帝后，统治残暴，罗马人民生活在水深火热之中。马克西姆斯决定回到罗马，为自己的家人报仇，并推翻康茂德的统治。在罗马斗兽场，马克西姆斯与康茂德展开了一场生死决斗，最终杀死了康茂德，但自己也因伤势过重而死。\n\n影片通过马克西姆斯的故事，展现了罗马帝国的辉煌与衰落，以及人性的善恶。罗素·克劳的表演非常出色，他成功塑造了一个勇敢、正直的罗马将军形象，获得了奥斯卡最佳男主角奖。\n\n《角斗士》获得了多项奥斯卡奖，包括最佳影片、最佳男主角和最佳视觉效果等。影片的战争场面和角斗场面非常壮观，音乐也非常感人。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 45,
      rank: 45,
      title: '沉默的羔羊',
      originalTitle: 'The Silence of the Lambs',
      year: 1991,
      score: 8.9,
      ratingCount: '234567',
      ratingDistribution: {
        5: '68.7%',
        4: '25.8%',
        3: '5.2%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '惊悚, 犯罪',
      region: '美国',
      language: '英语',
      releaseDate: '1991-02-14',
      runtime: '118分钟',
      director: '乔纳森·戴米',
      screenwriter: '泰德·塔里',
      actors: '朱迪·福斯特, 安东尼·霍普金斯, 斯科特·格伦',
      aka: '沉默的羔羊',
      imdb: 'https://www.imdb.com/title/tt0102926/',
      description:
        '联邦调查局实习生克拉丽斯·史达琳（朱迪·福斯特饰）被派去调查一系列连环杀人案。凶手被称为"野牛比尔"，他绑架年轻女性，杀死她们，并剥下她们的皮。\n\n为了了解凶手的心理，克拉丽斯被派去采访被关押在精神病院的汉尼拔·莱克特博士（安东尼·霍普金斯饰）。汉尼拔是一名天才精神病学家，也是一名连环杀手，他以吃人肉而闻名。\n\n汉尼拔与克拉丽斯进行了多次对话，他逐渐了解了克拉丽斯的内心世界，同时也给了她一些关于"野牛比尔"的线索。克拉丽斯通过这些线索，逐渐接近了"野牛比尔"的真实身份。\n\n最终，克拉丽斯找到了"野牛比尔"的藏身之处，并成功将他击毙。而汉尼拔则从精神病院中逃脱，继续他的杀人生涯。\n\n影片通过克拉丽斯与汉尼拔之间的对话，展现了人性的黑暗面和心理变态者的内心世界。朱迪·福斯特和安东尼·霍普金斯的表演都非常出色，他们分别获得了奥斯卡最佳女主角和最佳男主角奖。\n\n《沉默的羔羊》是电影史上第一部获得奥斯卡最佳影片、最佳导演、最佳男主角、最佳女主角和最佳改编剧本五项大奖的电影。它不仅在商业上取得了巨大成功，也获得了评论界的高度评价。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 46,
      rank: 46,
      title: '记忆碎片',
      originalTitle: 'Memento',
      year: 2000,
      score: 8.7,
      ratingCount: '187654',
      ratingDistribution: {
        5: '63.2%',
        4: '28.5%',
        3: '7.8%',
        2: '0.4%',
        1: '0.1%',
      },
      type: '悬疑, 惊悚',
      region: '美国',
      language: '英语',
      releaseDate: '2000-03-17',
      runtime: '113分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '乔纳森·诺兰, 克里斯托弗·诺兰',
      actors: '盖·皮尔斯, 凯瑞-安·莫斯, 乔·潘托里亚诺',
      aka: '记忆碎片',
      imdb: 'https://www.imdb.com/title/tt0209144/',
      description:
        '莱昂纳多·谢尔比（盖·皮尔斯饰）是一名保险公司调查员，他的妻子被一名入室抢劫的歹徒杀害。莱昂纳多在与歹徒搏斗时头部受伤，导致他患上了短期记忆丧失症，他只能记住几分钟前发生的事情。\n\n为了找到杀害妻子的凶手，莱昂纳多通过纹身、照片和便条等方式来记录线索。他将重要的信息纹在自己的身上，将遇到的人的照片拍下来，并在照片背面写下他们的身份和关系。\n\n莱昂纳多的调查过程非常艰难，因为他总是忘记自己刚才做了什么，也不知道自己是否已经调查过某些线索。他遇到了一名自称是他朋友的男子泰迪（乔·潘托里亚诺饰），以及一名酒吧女招待娜塔莉（凯瑞-安·莫斯饰），他们都声称可以帮助他找到凶手。\n\n然而，随着调查的深入，莱昂纳多发现泰迪和娜塔莉都有自己的秘密，他们可能并不是在帮助他，而是在利用他。最终，莱昂纳多发现了一个惊人的真相：他其实已经找到了杀害妻子的凶手，并将其杀死了。但是，由于他的短期记忆丧失症，他忘记了这个事实，一直在重复调查这个已经解决的案件。\n\n影片采用了倒叙的叙事方式，从结尾开始，逐渐向前推进，让观众体验到莱昂纳多的记忆混乱。这种叙事方式非常独特，也非常有效，让观众更加深入地了解了莱昂纳多的内心世界。\n\n《记忆碎片》是克里斯托弗·诺兰的成名作，它展示了诺兰独特的叙事风格和导演才华。影片获得了多项奥斯卡提名，包括最佳原创剧本和最佳剪辑等。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 47,
      rank: 47,
      title: '拯救大兵瑞恩',
      originalTitle: 'Saving Private Ryan',
      year: 1998,
      score: 9.0,
      ratingCount: '256789',
      ratingDistribution: {
        5: '73.5%',
        4: '22.3%',
        3: '3.9%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '战争, 剧情',
      region: '美国',
      language: '英语, 德语, 法语',
      releaseDate: '1998-07-24',
      runtime: '169分钟',
      director: '史蒂文·斯皮尔伯格',
      screenwriter: '罗伯特·罗达特',
      actors: '汤姆·汉克斯, 马特·达蒙, 汤姆·塞兹摩尔',
      aka: '雷霆救兵(港), 抢救雷恩大兵(台)',
      imdb: 'https://www.imdb.com/title/tt0120815/',
      description:
        '1944年6月6日，盟军在诺曼底登陆，开始了对纳粹德国的反攻。在登陆过程中，瑞恩家的四个儿子都参与了战斗，其中三个已经牺牲，只剩下小儿子詹姆斯·瑞恩（马特·达蒙饰）还在战场上。\n\n为了不让瑞恩家绝后，美国陆军参谋长马歇尔将军下令组成一支小队，深入敌后，寻找并拯救瑞恩。约翰·米勒上尉（汤姆·汉克斯饰）被任命为小队队长，他带领着七名士兵，开始了这项危险的任务。\n\n小队在寻找瑞恩的过程中，遭遇了各种困难和危险，他们与德军展开了多次战斗，牺牲了多名队员。最终，他们找到了瑞恩，但瑞恩却不愿意离开自己的部队，他认为自己的职责是与战友们一起保卫桥梁。\n\n米勒上尉决定尊重瑞恩的选择，他带领小队留下来，与瑞恩的部队一起保卫桥梁。在战斗中，米勒上尉不幸牺牲，但他的牺牲换来了桥梁的安全，也换来了瑞恩的生命。\n\n影片通过这个故事，展现了战争的残酷和人性的光辉。汤姆·汉克斯的表演非常出色，他成功塑造了一个勇敢、坚定的上尉形象。影片的战争场面非常逼真，尤其是诺曼底登陆的场景，让观众感受到了战争的残酷和惨烈。\n\n《拯救大兵瑞恩》获得了多项奥斯卡奖，包括最佳导演和最佳摄影等。它被认为是电影史上最优秀的战争片之一，对后来的战争片产生了深远的影响。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 48,
      rank: 48,
      title: '阿凡达',
      originalTitle: 'Avatar',
      year: 2009,
      score: 8.8,
      ratingCount: '289765',
      ratingDistribution: {
        5: '65.7%',
        4: '27.8%',
        3: '6.2%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '科幻, 动作',
      region: '美国',
      language: '英语',
      releaseDate: '2009-12-18',
      runtime: '162分钟',
      director: '詹姆斯·卡梅隆',
      screenwriter: '詹姆斯·卡梅隆',
      actors: '萨姆·沃辛顿, 佐伊·索尔达娜, 西格妮·韦弗',
      aka: '神之化身(港), 阿凡达：水之道(续作)',
      imdb: 'https://www.imdb.com/title/tt0499549/',
      description:
        '在2154年，人类已经耗尽了地球的资源，开始在宇宙中寻找新的资源。他们发现了一个名为潘多拉的星球，这个星球上有一种非常珍贵的矿物元素"unobtanium"。\n\n为了开采这种矿物，人类在潘多拉星球上建立了基地，并创造了一种名为"阿凡达"的生物，它们是人类DNA与潘多拉星球上的原住民纳美人DNA的结合体。人类可以通过意识控制阿凡达，让它们在潘多拉星球上自由活动。\n\n前海军陆战队员杰克·萨利（萨姆·沃辛顿饰）因为瘫痪，无法正常行走，他被招募到潘多拉星球，控制一个阿凡达，作为卧底，了解纳美人的生活和文化，以便人类能够更好地开采矿物。\n\n杰克的阿凡达在潘多拉星球上遇到了纳美人公主奈蒂莉（佐伊·索尔达娜饰），奈蒂莉教他如何在潘多拉星球上生存，如何与纳美人相处。在这个过程中，杰克逐渐了解了纳美人的文化和价值观，他开始同情纳美人，并爱上了奈蒂莉。\n\n当人类决定摧毁纳美人的家园，开采矿物时，杰克站在了纳美人一边，他带领纳美人与人类展开了一场战争，最终成功阻止了人类的计划，保护了潘多拉星球的生态环境。\n\n影片通过杰克的故事，探讨了环境保护、文化冲突和人类与自然的关系等主题。影片的视觉效果非常出色，它使用了最先进的3D技术和电脑特效，创造了一个美丽、神奇的潘多拉星球。\n\n《阿凡达》是电影史上票房最高的电影之一，它的成功推动了3D电影的发展。影片获得了多项奥斯卡奖，包括最佳艺术指导、最佳摄影和最佳视觉效果等。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 49,
      rank: 49,
      title: '冰雪奇缘',
      originalTitle: 'Frozen',
      year: 2013,
      score: 8.5,
      ratingCount: '234567',
      ratingDistribution: {
        5: '58.7%',
        4: '32.5%',
        3: '8.3%',
        2: '0.4%',
        1: '0.1%',
      },
      type: '动画, 音乐',
      region: '美国',
      language: '英语',
      releaseDate: '2013-11-27',
      runtime: '102分钟',
      director: '克里斯·巴克, 珍妮弗·李',
      screenwriter: '珍妮弗·李',
      actors: '克里斯汀·贝尔, 伊迪娜·门泽尔, 乔纳森·格罗夫',
      aka: '魔雪奇缘(港), 冰雪奇缘(台)',
      imdb: 'https://www.imdb.com/title/tt2294629/',
      description:
        '阿伦黛尔王国的公主艾莎（伊迪娜·门泽尔饰）拥有控制冰雪的魔法能力，但她无法控制这种能力，经常会不小心伤害到别人。为了保护自己的妹妹安娜（克里斯汀·贝尔饰）和王国的人民，艾莎选择了封闭自己，不再与外界接触。\n\n在艾莎的加冕典礼上，她与安娜发生了争执，情绪失控的她不小心暴露了自己的魔法能力，整个王国被冰雪覆盖。艾莎感到非常害怕和内疚，她逃离了王国，躲到了深山里，在那里建造了一座冰雪城堡。\n\n安娜为了找回姐姐，拯救王国，踏上了寻找艾莎的旅程。在旅途中，她遇到了卖冰人克里斯托夫（乔纳森·格罗夫饰）、他的驯鹿斯文，以及一个会说话的雪人奥拉夫（乔什·加德饰）。他们一起经历了许多冒险，最终找到了艾莎。\n\n然而，艾莎再次失控，用魔法击中了安娜的心脏。安娜必须在被冻死之前，得到真爱的吻。克里斯托夫以为自己就是安娜的真爱，他赶回王国，希望能够吻她，但却发现安娜已经爱上了艾莎，她的真爱是姐姐。\n\n最终，安娜用自己的生命保护了艾莎，艾莎被安娜的爱感动，学会了控制自己的魔法能力，她用魔法解冻了整个王国，姐妹俩重归于好。\n\n影片通过艾莎和安娜的故事，探讨了姐妹情、自我接纳和真爱的主题。影片的音乐非常出色，其中的主题曲《Let It Go》成为了全球热门歌曲，获得了奥斯卡最佳原创歌曲奖。\n\n《冰雪奇缘》获得了多项奥斯卡奖，包括最佳动画长片和最佳原创歌曲等。它是迪士尼动画工作室的经典之作，也是电影史上最成功的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjA5ODk1NzkzMF5BMl5BanBnXkFtZTgwNzA4NjE4MDE@._V1_.jpg',
    },
    {
      id: 50,
      rank: 50,
      title: '飞屋环游记',
      originalTitle: 'Up',
      year: 2009,
      score: 8.9,
      ratingCount: '215678',
      ratingDistribution: {
        5: '68.7%',
        4: '26.5%',
        3: '4.5%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '动画, 冒险',
      region: '美国',
      language: '英语',
      releaseDate: '2009-05-29',
      runtime: '96分钟',
      director: '彼特·道格特, 鲍勃·彼德森',
      screenwriter: '彼特·道格特, 鲍勃·彼德森, 汤姆·麦卡锡',
      actors: '爱德华·阿斯纳, 乔丹·长井, 克里斯托弗·普卢默',
      aka: '冲天救兵(港), 天外奇迹(台)',
      imdb: 'https://www.imdb.com/title/tt1049413/',
      description:
        '78岁的卡尔·弗雷德里克森（爱德华·阿斯纳饰）是一名退休的气球推销员，他一生的梦想是与妻子艾丽一起去南美洲的"天堂瀑布"探险。然而，艾丽去世了，卡尔的梦想也随之破灭。\n\n当卡尔得知自己的房子将被拆除，他必须搬到养老院去住时，他决定实现自己和艾丽的梦想。他用无数个气球将自己的房子吊了起来，然后驾驶着房子飞向南美洲。\n\n在飞行过程中，卡尔发现房子里意外地多了一个"偷渡者"——8岁的男孩罗素（乔丹·长井饰），他是一名童子军，为了获得"帮助老人"的徽章而来到卡尔家。\n\n卡尔和罗素一起经历了许多冒险，他们遇到了一只会说话的狗道格，一只巨大的鸟凯文，以及卡尔的偶像——探险家查尔斯·穆兹（克里斯托弗·普卢默饰）。然而，穆兹却想要抓住凯文，将它带回文明世界。\n\n卡尔和罗素为了保护凯文，与穆兹展开了一场激烈的斗争。最终，卡尔意识到，与罗素和凯文在一起的时光，比实现自己的梦想更重要。他放弃了将房子飞到天堂瀑布的计划，而是选择与罗素和凯文一起生活。\n\n影片通过卡尔和罗素的故事，探讨了梦想、友谊和亲情的主题。影片的开头部分，通过无声的方式展现了卡尔和艾丽的一生，非常感人，被认为是电影史上最优秀的开场之一。\n\n《飞屋环游记》获得了多项奥斯卡奖，包括最佳动画长片和最佳原创配乐等。它是皮克斯动画工作室的经典之作，也是电影史上最成功的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_.jpg',
    },
    {
      id: 51,
      rank: 51,
      title: '小妇人',
      originalTitle: 'Little Women',
      year: 2019,
      score: 8.5,
      ratingCount: '156789',
      ratingDistribution: {
        5: '55.7%',
        4: '35.8%',
        3: '8.2%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '剧情, 爱情',
      region: '美国',
      language: '英语',
      releaseDate: '2019-12-25',
      runtime: '135分钟',
      director: '格蕾塔·葛韦格',
      screenwriter: '格蕾塔·葛韦格, 路易莎·梅·奥尔科特',
      actors: '西尔莎·罗南, 艾玛·沃森, 弗洛伦斯·皮尤',
      aka: '小妇人',
      imdb: 'https://www.imdb.com/title/tt3281548/',
      description:
        '马奇家有四个女儿：梅格（艾玛·沃森饰）、乔（西尔莎·罗南饰）、贝丝（伊莱扎·斯坎伦饰）和艾米（弗洛伦斯·皮尤饰）。她们生活在19世纪中期的美国，虽然家庭并不富裕，但她们的父母非常爱她们，教育她们要做一个有道德、有责任感的人。\n\n乔是一个独立、坚强的女孩，她梦想成为一名作家。她搬到纽约，开始了自己的写作生涯。梅格是一个温柔、善良的女孩，她嫁给了一个贫穷的教师，过着平凡但幸福的生活。贝丝是一个害羞、内向的女孩，她喜欢音乐，但却患上了重病。艾米是一个聪明、有野心的女孩，她前往欧洲学习艺术，希望能够成为一名艺术家。\n\n四个女孩在成长过程中，经历了许多快乐和悲伤。她们的母亲马奇太太（劳拉·邓恩饰）一直鼓励她们，教她们如何面对生活中的困难和挑战。她们的父亲马奇先生（鲍勃·奥登科克饰）则在南北战争中服役，为国家而战。\n\n最终，乔实现了自己的梦想，成为了一名成功的作家。她将自己和姐妹们的故事写成了一本书，名为《小妇人》。贝丝虽然去世了，但她的音乐和善良永远留在了姐妹们的心中。梅格和艾米也都找到了自己的幸福。\n\n影片通过马奇家四姐妹的故事，展现了女性的独立、坚强和善良，以及她们对梦想的追求。格蕾塔·葛韦格的改编非常成功，她将路易莎·梅·奥尔科特的经典小说改编成了一部现代、感人的电影。\n\n《小妇人》获得了多项奥斯卡提名，包括最佳影片、最佳女主角和最佳改编剧本等。西尔莎·罗南的表演非常出色，她成功塑造了一个独立、坚强的乔形象。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BOWYyZDE3MDYtNTQwZi00NGVmLWI1YTEtZWEyMTU4MmI3MThlXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    },
    {
      id: 52,
      rank: 52,
      title: '寄生虫',
      originalTitle: '기생충',
      year: 2019,
      score: 8.9,
      ratingCount: '234567',
      ratingDistribution: {
        5: '65.7%',
        4: '28.3%',
        3: '5.7%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '剧情, 惊悚',
      region: '韩国',
      language: '韩语',
      releaseDate: '2019-05-21',
      runtime: '132分钟',
      director: '奉俊昊',
      screenwriter: '奉俊昊, 韩珍元',
      actors: '宋康昊, 李善均, 赵汝贞',
      aka: '寄生上流(港/台)',
      imdb: 'https://www.imdb.com/title/tt6751668/',
      description:
        '基宇（崔宇植饰）是一个失业的年轻人，他和父母、妹妹一起住在首尔的一个半地下室里，生活非常贫困。一天，他的朋友敏赫（朴明勋饰）给他介绍了一份工作，让他去给一个富裕家庭的女儿做家教。\n\n基宇成功地获得了这份工作，他发现这个富裕家庭的主人朴社长（李善均饰）和他的妻子（赵汝贞饰）非常善良，但也非常单纯。基宇开始策划，将自己的妹妹基婷（朴素丹饰）介绍给朴社长的儿子做艺术老师，将自己的父亲基泽（宋康昊饰）介绍给朴社长做司机，将自己的母亲忠淑（张慧珍饰）介绍给朴社长的妻子做保姆。\n\n基宇一家成功地进入了朴社长的家庭，他们的生活得到了极大的改善。然而，他们的秘密却被朴社长家的前保姆（李姃垠饰）发现了。前保姆告诉基宇一家，她的丈夫（朴仁焕饰）一直住在朴社长家的地下室里，因为他欠了很多债，无法在外面生活。\n\n基宇一家与前保姆夫妇发生了冲突，最终导致了一场悲剧。朴社长发现了基宇一家的秘密，他对基泽的气味表示厌恶，这让基泽非常愤怒，他杀死了朴社长，然后躲进了地下室。\n\n影片通过基宇一家和朴社长一家的故事，探讨了社会阶级差异、贫富差距和人性的善恶等主题。奉俊昊的导演手法非常出色，他将喜剧和惊悚元素完美地结合在一起，创造了一部既幽默又深刻的电影。\n\n《寄生虫》获得了多项奥斯卡奖，包括最佳影片、最佳导演、最佳原创剧本和最佳国际影片等。它是第一部获得奥斯卡最佳影片奖的非英语电影，也是韩国电影史上的里程碑。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    },
    {
      id: 53,
      rank: 53,
      title: '1917',
      originalTitle: '1917',
      year: 2019,
      score: 8.5,
      ratingCount: '187654',
      ratingDistribution: {
        5: '58.7%',
        4: '33.5%',
        3: '7.5%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '战争, 剧情',
      region: '美国',
      language: '英语, 法语, 德语',
      releaseDate: '2019-12-25',
      runtime: '119分钟',
      director: '萨姆·门德斯',
      screenwriter: '萨姆·门德斯, 克里斯蒂·威尔逊-凯恩斯',
      actors: '乔治·麦凯, 迪恩-查尔斯·查普曼, 科林·费尔斯',
      aka: '1917：逆战救兵(港), 1917：战地传令兵(台)',
      imdb: 'https://www.imdb.com/title/tt8579674/',
      description:
        '1917年，第一次世界大战进入了第三个年头。英国军队与德国军队在法国北部的索姆河地区对峙。一天，英国军队的高级军官收到了一份情报，得知德国军队正在撤退，并在撤退前设置了陷阱，准备伏击英国军队。\n\n为了避免这场灾难，英国军队必须立即停止进攻。然而，负责进攻的德文郡团已经深入敌后，无法通过无线电联系。高级军官决定派两名年轻的士兵——斯科菲尔德（乔治·麦凯饰）和布莱克（迪恩-查尔斯·查普曼饰）——前往德文郡团，传达停止进攻的命令。\n\n斯科菲尔德和布莱克必须穿越敌人的防线，在24小时内到达德文郡团的驻地。他们的任务非常危险，因为他们要穿过敌人的战壕、地雷区和被炸毁的城镇。在途中，他们遇到了各种困难和危险，包括敌人的袭击、炮火的轰炸和桥梁的坍塌。\n\n最终，布莱克不幸牺牲，斯科菲尔德独自一人完成了任务。他成功地找到了德文郡团的指挥官，传达了停止进攻的命令，避免了一场灾难。\n\n影片采用了一镜到底的拍摄手法，让观众感受到了战争的紧张和残酷。这种拍摄手法非常独特，也非常有效，让观众更加深入地了解了斯科菲尔德和布莱克的内心世界。\n\n《1917》获得了多项奥斯卡奖，包括最佳摄影、最佳视觉效果和最佳音效等。萨姆·门德斯的导演手法非常出色，他成功地创造了一部紧张、感人的战争片。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    },
    {
      id: 54,
      rank: 54,
      title: '利刃出鞘',
      originalTitle: 'Knives Out',
      year: 2019,
      score: 8.2,
      ratingCount: '167890',
      ratingDistribution: {
        5: '52.3%',
        4: '36.7%',
        3: '10.5%',
        2: '0.4%',
        1: '0.1%',
      },
      type: '悬疑, 犯罪',
      region: '美国',
      language: '英语',
      releaseDate: '2019-11-27',
      runtime: '130分钟',
      director: '莱恩·约翰逊',
      screenwriter: '莱恩·约翰逊',
      actors: '丹尼尔·克雷格, 安娜·德·阿玛斯, 克里斯·埃文斯',
      aka: '锋回路转(台)',
      imdb: 'https://www.imdb.com/title/tt8946378/',
      description:
        '富豪小说家哈兰·斯隆比（克里斯托弗·普卢默饰）在自己85岁生日的第二天，被发现死在了自己的书房里，死因是割喉自杀。然而，著名侦探布兰克（丹尼尔·克雷格饰）却被匿名人士雇佣，前来调查这起案件，因为雇佣他的人认为哈兰的死并不是自杀，而是谋杀。\n\n布兰克开始调查哈兰的家人和仆人，他发现哈兰的家人都有谋杀他的动机：哈兰的大女儿琳达（杰米·李·柯蒂斯饰）和她的丈夫理查德（唐·约翰逊饰）可能因为商业利益而谋杀哈兰；哈兰的小儿子沃尔特（迈克尔·珊农饰）可能因为哈兰要解雇他而谋杀哈兰；哈兰的儿媳乔尼（托妮·科莱特饰）可能因为哈兰要停止给她经济支持而谋杀哈兰；哈兰的孙子兰森（克里斯·埃文斯饰）可能因为哈兰要修改遗嘱而谋杀哈兰。\n\n布兰克还发现，哈兰的护工玛塔（安娜·德·阿玛斯饰）是哈兰最信任的人，她也是唯一能够接近哈兰的人。玛塔有一个特殊的能力，就是如果她撒谎，就会不由自主地呕吐。布兰克利用这一点，逐渐了解了案件的真相。\n\n最终，布兰克发现，哈兰的死确实是自杀，但他的自杀是为了保护玛塔。哈兰在生日派对上得知，玛塔因为失误，给了他过量的止痛药，导致他只有几分钟的生命。为了保护玛塔，哈兰设计了一个自杀的计划，让玛塔能够摆脱嫌疑。\n\n然而，兰森却发现了哈兰的计划，他决定利用这个计划，杀死哈兰，并嫁祸给玛塔。最终，布兰克识破了兰森的阴谋，将他绳之以法。\n\n影片通过布兰克的调查过程，展现了一个充满悬念和反转的故事。莱恩·约翰逊的剧本非常出色，他创造了一个复杂、有趣的悬疑故事。丹尼尔·克雷格的表演非常出色，他成功塑造了一个聪明、幽默的侦探形象。\n\n《利刃出鞘》获得了多项奥斯卡提名，包括最佳原创剧本等。它是一部非常成功的悬疑片，也是电影史上最优秀的悬疑片之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMGUyYjUyMDUtNmQ0Yi00Yjg5LWIyZDUtZWY5MTM3Y2I3YTQ3XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
    },
    {
      id: 55,
      rank: 55,
      title: '小丑',
      originalTitle: 'Joker',
      year: 2019,
      score: 8.4,
      ratingCount: '215678',
      ratingDistribution: {
        5: '56.7%',
        4: '34.5%',
        3: '8.3%',
        2: '0.4%',
        1: '0.1%',
      },
      type: '剧情, 惊悚',
      region: '美国',
      language: '英语',
      releaseDate: '2019-10-04',
      runtime: '122分钟',
      director: '托德·菲利普斯',
      screenwriter: '托德·菲利普斯, 斯科特·西尔弗',
      actors: '华金·菲尼克斯, 罗伯特·德尼罗, 马克·马龙',
      aka: '小丑起源电影',
      imdb: 'https://www.imdb.com/title/tt7286456/',
      description:
        '阿瑟·弗莱克（华金·菲尼克斯饰）是一个生活在哥谭市的底层人物，他患有精神疾病，经常会不由自主地大笑。他的梦想是成为一名脱口秀喜剧演员，但他的表演却总是得不到观众的认可。\n\n阿瑟和他的母亲佩妮（弗兰西斯·康罗伊饰）一起生活，佩妮一直告诉他，他的父亲是哥谭市的富豪托马斯·韦恩（布莱特·卡伦饰）。阿瑟非常崇拜托马斯·韦恩，他希望能够得到托马斯·韦恩的认可和帮助。\n\n然而，阿瑟的生活却越来越糟糕。他失去了工作，被人欺负，他的母亲也去世了。在一次地铁上，阿瑟被三名华尔街精英欺负，他忍无可忍，杀死了这三名精英。\n\n这起谋杀案在哥谭市引起了轩然大波，越来越多的底层人物开始模仿阿瑟的行为，抗议社会的不公。阿瑟也逐渐陷入了疯狂，他开始以"小丑"的身份出现，在哥谭市制造混乱。\n\n最终，阿瑟在哥谭市的街头引发了一场暴乱，他成为了底层人物的代言人。而托马斯·韦恩则在暴乱中被杀死，他的儿子布鲁斯·韦恩（但丁·佩雷拉-奥尔森饰）则成为了孤儿，这也为后来的蝙蝠侠诞生埋下了伏笔。\n\n影片通过阿瑟的故事，探讨了社会不公、精神疾病和人性的黑暗面等主题。华金·菲尼克斯的表演非常出色，他成功塑造了一个复杂、可悲的小丑形象，获得了奥斯卡最佳男主角奖。\n\n《小丑》获得了多项奥斯卡奖，包括最佳男主角和最佳原创配乐等。它是DC扩展宇宙的一部独立电影，也是电影史上最成功的超级英雄电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 56,
      rank: 56,
      title: '寻梦环游记',
      originalTitle: 'Coco',
      year: 2017,
      score: 9.1,
      ratingCount: '245678',
      ratingDistribution: {
        5: '72.3%',
        4: '23.5%',
        3: '4.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '动画, 音乐',
      region: '美国',
      language: '英语, 西班牙语',
      releaseDate: '2017-11-22',
      runtime: '105分钟',
      director: '李·昂克里奇, 阿德里安·莫利纳',
      screenwriter: '阿德里安·莫利纳, 马修·奥尔德里奇, 李·昂克里奇',
      actors: '安东尼·冈萨雷斯, 盖尔·加西亚·贝纳尔, 本杰明·布拉特',
      aka: '玩转极乐园(港), 可可夜总会(台)',
      imdb: 'https://www.imdb.com/title/tt2380307/',
      description:
        '米格（安东尼·冈萨雷斯饰）是一个12岁的男孩，他生活在墨西哥的一个小镇上，他的家族是制鞋匠，但他却梦想成为一名音乐家。然而，他的家族却有一个禁忌，就是禁止接触音乐，因为米格的曾祖父埃克托（盖尔·加西亚·贝纳尔饰）曾经为了音乐而抛弃了家庭。\n\n在墨西哥的传统节日"亡灵节"期间，米格偷偷地参加了一个音乐比赛，他需要一把吉他来参赛。他想起了镇上的一座博物馆里有一把著名音乐家德拉库斯（本杰明·布拉特饰）的吉他，于是他决定去偷这把吉他。\n\n然而，当米格触摸到这把吉他时，他却被传送到了亡灵世界。在亡灵世界里，米格遇到了他的祖先们，包括他的曾祖母可可（安娜·奥菲丽亚·莫吉亚饰）。他的祖先们告诉他，他必须在天亮之前得到一位祖先的祝福，否则他就会永远留在亡灵世界。\n\n米格发现，他的曾祖父埃克托并不是一个抛弃家庭的人，而是被德拉库斯谋杀的。德拉库斯窃取了埃克托的音乐作品，成为了一名著名的音乐家。米格决定帮助埃克托，让他的名字能够被后人记住，这样他就不会在亡灵世界中消失。\n\n最终，米格和埃克托一起揭露了德拉库斯的罪行，埃克托的名字被后人记住，他也得到了家人的祝福。米格回到了现实世界，他的家族也解除了禁止接触音乐的禁忌，他开始追求自己的音乐梦想。\n\n影片通过米格的故事，探讨了家庭、亲情和记忆的主题。影片的音乐非常出色，其中的主题曲《Remember Me》获得了奥斯卡最佳原创歌曲奖。\n\n《寻梦环游记》获得了多项奥斯卡奖，包括最佳动画长片和最佳原创歌曲等。它是皮克斯动画工作室的经典之作，也是电影史上最成功的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjIxMDkxNDA3OV5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
    },
    {
      id: 57,
      rank: 57,
      title: '心灵奇旅',
      originalTitle: 'Soul',
      year: 2020,
      score: 9.1,
      ratingCount: '215678',
      ratingDistribution: {
        5: '71.2%',
        4: '24.5%',
        3: '4.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '动画, 音乐',
      region: '美国',
      language: '英语',
      releaseDate: '2020-12-25',
      runtime: '100分钟',
      director: '彼特·道格特, 凯普·鲍尔斯',
      screenwriter: '彼特·道格特, 麦克·琼斯, 凯普·鲍尔斯',
      actors: '杰米·福克斯, 蒂娜·菲, 菲利西亚·拉斯海德',
      aka: '灵魂奇遇记(港), 灵魂急转弯(台)',
      imdb: 'https://www.imdb.com/title/tt2948372/',
      description:
        '乔·加德纳（杰米·福克斯饰）是一名中学音乐老师，他的梦想是成为一名爵士乐钢琴家。一天，他获得了一个机会，能够与著名的爵士乐歌手多萝西娅·威廉姆斯（安吉拉·贝塞特饰）一起演出。然而，在去演出的路上，乔却不小心掉进了一个下水道，他的灵魂离开了他的身体，进入了"生之来处"。\n\n在"生之来处"，乔遇到了一个名为22（蒂娜·菲饰）的灵魂，22已经在这里待了几千年，她对地球生活没有任何兴趣，也不想转世为人。乔告诉22，地球生活非常美好，他希望能够回到地球，实现自己的梦想。\n\n为了回到地球，乔和22一起穿越了"生之来处"和"生之彼岸"，他们遇到了各种灵魂和神灵，经历了许多冒险。在这个过程中，乔逐渐意识到，生活的意义不仅仅是实现自己的梦想，而是要珍惜当下，享受生活中的每一个瞬间。\n\n最终，乔和22成功地回到了地球，乔实现了自己的梦想，与多萝西娅·威廉姆斯一起演出。而22也找到了自己对地球生活的兴趣，她决定转世为人，开始自己的人生。\n\n影片通过乔和22的故事，探讨了生活的意义、梦想和自我认同等主题。影片的音乐非常出色，其中的爵士乐配乐非常优美，获得了奥斯卡最佳原创配乐奖。\n\n《心灵奇旅》获得了多项奥斯卡奖，包括最佳动画长片和最佳原创配乐等。它是皮克斯动画工作室的经典之作，也是电影史上最成功的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzIxMjYwMzY4Nl5BMl5BanBnXkFtZTgwNjIxMTc2NzE@._V1_.jpg',
    },
    {
      id: 58,
      rank: 58,
      title: '疯狂动物城',
      originalTitle: 'Zootopia',
      year: 2016,
      score: 9.2,
      ratingCount: '267890',
      ratingDistribution: {
        5: '75.3%',
        4: '21.5%',
        3: '3.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '动画, 冒险',
      region: '美国',
      language: '英语',
      releaseDate: '2016-03-04',
      runtime: '108分钟',
      director: '拜恩·霍华德, 里奇·摩尔, 杰拉德·布什',
      screenwriter: '杰拉德·布什, 菲尔·约翰斯顿, 拜恩·霍华德',
      actors: '金妮弗·古德温, 杰森·贝特曼, 伊德里斯·艾尔巴',
      aka: '优兽大都会(港), 动物方城市(台)',
      imdb: 'https://www.imdb.com/title/tt2948356/',
      description:
        '朱迪·霍普斯（金妮弗·古德温饰）是一只兔子，她梦想成为一名警察。她通过自己的努力，成为了动物城警察局的第一位兔子警察。然而，她的同事们却因为她的体型小而看不起她，只给她分配了交通管制的工作。\n\n一天，朱迪遇到了一只狐狸尼克·王尔德（杰森·贝特曼饰），尼克是一个骗子，他经常利用自己的聪明才智来骗取其他动物的钱财。朱迪发现，动物城发生了一起神秘的案件，有14只食肉动物突然失踪了。她决定调查这起案件，证明自己的能力。\n\n朱迪和尼克一起展开了调查，他们发现，这些失踪的食肉动物并不是被绑架了，而是因为一种神秘的疾病，导致他们变得疯狂，攻击其他动物。朱迪和尼克追踪到了这种疾病的源头，发现是动物城的副市长贝尔韦德（珍妮·斯蕾特饰）在幕后操纵，她想要制造恐慌，让食肉动物失去在动物城的地位。\n\n最终，朱迪和尼克成功地揭露了贝尔韦德的阴谋，拯救了动物城。朱迪也成为了一名受人尊敬的警察，她和尼克成为了好朋友。\n\n影片通过朱迪和尼克的故事，探讨了偏见、包容和友谊的主题。影片的剧情非常精彩，充满了悬念和幽默。影片的角色设计也非常出色，各种动物形象都非常可爱、生动。\n\n《疯狂动物城》获得了多项奥斯卡奖，包括最佳动画长片等。它是迪士尼动画工作室的经典之作，也是电影史上最成功的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNjQzNDI4NTA3MF5BMl5BanBnXkFtZTgwNzY1OTQzMDI@._V1_.jpg',
    },
    {
      id: 59,
      rank: 59,
      title: '头脑特工队',
      originalTitle: 'Inside Out',
      year: 2015,
      score: 8.7,
      ratingCount: '223456',
      ratingDistribution: {
        5: '65.7%',
        4: '28.3%',
        3: '5.7%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '动画, 冒险',
      region: '美国',
      language: '英语',
      releaseDate: '2015-06-19',
      runtime: '95分钟',
      director: '彼特·道格特, 罗纳尔多·德尔·卡门',
      screenwriter: '彼特·道格特, 梅格·勒福夫, 乔什·库雷',
      actors: '艾米·波勒, 菲利丝·史密斯, 理查德·坎德',
      aka: '玩转脑朋友(港), 脑筋急转弯(台)',
      imdb: 'https://www.imdb.com/title/tt2096673/',
      description:
        '莱利（凯特林·迪亚斯饰）是一个11岁的女孩，她和父母一起从明尼苏达州搬到了旧金山。在她的大脑里，有五个情绪小人在控制着她的情绪：乐乐（艾米·波勒饰）、忧忧（菲利丝·史密斯饰）、怒怒（刘易斯·布莱克饰）、厌厌（敏迪·卡灵饰）和怕怕（比尔·哈德尔饰）。\n\n乐乐是莱利的主要情绪，她希望莱利能够永远快乐。然而，在搬家的过程中，莱利的核心记忆球被意外地吸出了大脑总部，乐乐和忧忧也被吸出了大脑总部，进入了莱利的长期记忆区。\n\n乐乐和忧忧必须穿过莱利的大脑，包括长期记忆区、想象国、遗忘河等地方，才能回到大脑总部。在这个过程中，她们遇到了各种困难和危险，也逐渐了解了彼此的重要性。\n\n同时，莱利的大脑总部只剩下怒怒、厌厌和怕怕，她们无法控制莱利的情绪，导致莱利的行为变得越来越奇怪。莱利开始想念明尼苏达州的生活，她决定偷偷地回到明尼苏达州。\n\n最终，乐乐和忧忧成功地回到了大脑总部，她们帮助莱利理解了自己的情绪，莱利也决定留在旧金山，开始新的生活。莱利的核心记忆球也变成了彩色的，这意味着她的情绪变得更加复杂和丰富。\n\n影片通过莱利和她的情绪小人的故事，探讨了情绪、记忆和成长的主题。影片的创意非常独特，它将人的情绪拟人化，让观众更加深入地了解了自己的情绪。\n\n《头脑特工队》获得了多项奥斯卡奖，包括最佳动画长片等。它是皮克斯动画工作室的经典之作，也是电影史上最成功的动画电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU4NDYxNTE@._V1_.jpg',
    },
    {
      id: 60,
      rank: 60,
      title: '星际穿越',
      originalTitle: 'Interstellar',
      year: 2014,
      score: 9.3,
      ratingCount: '276543',
      ratingDistribution: {
        5: '78.9%',
        4: '18.2%',
        3: '2.7%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '科幻, 冒险',
      region: '美国',
      language: '英语',
      releaseDate: '2014-11-07',
      runtime: '169分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '乔纳森·诺兰, 克里斯托弗·诺兰',
      actors: '马修·麦康纳, 安妮·海瑟薇, 杰西卡·查斯坦',
      aka: '星际启示录(港), 星际效应(台)',
      imdb: 'https://www.imdb.com/title/tt0816692/',
      description:
        '在不远的未来，地球面临着粮食短缺和环境恶化的危机，人类的生存受到了威胁。前NASA宇航员库珀（马修·麦康纳饰）在一次偶然的机会中，发现了一个神秘的坐标，这个坐标指向了NASA的秘密基地。\n\n在NASA的秘密基地里，库珀了解到，科学家们已经发现了一个虫洞，这个虫洞连接着地球和一个遥远的星系，那里可能有适合人类居住的星球。NASA计划派遣一支探险队，通过虫洞前往这个星系，寻找适合人类居住的星球，并建立殖民地。\n\n库珀被选为探险队的队长，他必须离开自己的女儿墨菲（麦肯基·弗依饰）和儿子汤姆（提莫西·查拉梅饰），前往这个遥远的星系。探险队由库珀、艾米莉亚·布兰德（安妮·海瑟薇饰）、多伊尔（韦斯·本特利饰）和罗米利（大卫·吉亚西饰）组成。\n\n在穿越虫洞后，探险队发现了三个可能适合人类居住的星球：米勒星球、曼恩星球和艾德蒙星球。他们首先前往米勒星球，但这个星球上的时间流速非常快，一小时相当于地球上的七年。在米勒星球上，探险队遭遇了巨浪，多伊尔不幸牺牲。\n\n然后，探险队前往曼恩星球，这个星球的发现者曼恩博士（马特·达蒙饰）是库珀的偶像。然而，曼恩博士却欺骗了探险队，他其实是为了自己的生存，才谎称这个星球适合人类居住。曼恩博士想要杀死库珀，夺走他们的飞船，但最终被库珀和艾米莉亚识破，曼恩博士在与库珀的搏斗中死亡。\n\n最后，库珀和艾米莉亚前往艾德蒙星球，库珀为了让艾米莉亚能够到达艾德蒙星球，牺牲了自己，进入了一个黑洞。在黑洞中，库珀发现了一个五维空间，他可以通过这个空间与过去的墨菲交流。库珀通过摩尔斯电码，将黑洞内部的数据传递给了墨菲，墨菲利用这些数据，成功地解决了地球的粮食危机和环境问题。\n\n最终，库珀被未来的人类从黑洞中救了出来，他回到了地球，与已经年老的墨菲团聚。艾米莉亚则成功地到达了艾德蒙星球，开始建立殖民地。\n\n影片通过库珀的故事，探讨了爱、亲情和人类的未来等主题。影片的视觉效果非常出色，它展示了虫洞、黑洞和五维空间等科学概念，让观众感受到了宇宙的神秘和美丽。\n\n《星际穿越》获得了多项奥斯卡奖，包括最佳视觉效果等。它是克里斯托弗·诺兰的经典之作，也是电影史上最成功的科幻电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      id: 61,
      rank: 61,
      title: '控方证人',
      originalTitle: 'Witness for the Prosecution',
      year: 1957,
      score: 9.6,
      ratingCount: '345678',
      ratingDistribution: {
        5: '85.7%',
        4: '13.2%',
        3: '1.0%',
        2: '0.1%',
        1: '0.0%',
      },
      type: '悬疑, 犯罪',
      region: '美国',
      language: '英语',
      releaseDate: '1957-12-17',
      runtime: '116分钟',
      director: '比利·怀尔德',
      screenwriter: '阿加莎·克里斯蒂, 比利·怀尔德, 哈里·库尼兹',
      actors: '泰隆·鲍华, 玛琳·黛德丽, 查尔斯·劳顿',
      aka: '雄才伟略(港)',
      imdb: 'https://www.imdb.com/title/tt0051201/',
      description:
        '伦敦著名刑案辩护律师韦菲爵士（查尔斯·劳顿饰）接受了心脏病治疗，但是身体依旧虚弱，第一天回家休养，护士一直严厉监督他服药，并杜绝烟酒。管家为了便于上楼，还专门为他修了电梯。但是，种种关心照顾，对于这位桀骜不驯、牙尖嘴利的大律师根本不起作用，反倒是一纸诉状令他倍感兴奋。\n\n律师梅休和当事人沃尔（泰隆·鲍华饰）登门拜访，请他出山打官司。原来，沃尔结识了富婆，两人相见甚欢，虽然仆人对他发明的打蛋器充满鄙夷，但是富婆却对他充满爱意，甚至为他修改了遗嘱，把8万英镑留给了他。然而，富婆却惨遭毒手。于是，沃尔成为警方的头号嫌疑犯。他的唯一证人是妻子克里斯汀（玛琳·黛德丽饰），然而后者登门时的冷漠与淡定，令韦菲爵士怀疑这其中另有隐情。在扑朔迷离的案件背后，隐藏着一个个环环相扣、不可告人的秘密……\n\n《控方证人》是比利·怀尔德执导的悬疑片，改编自阿加莎·克里斯蒂的同名小说。影片以其紧凑的剧情、出色的演员表演和出人意料的结局而闻名，被认为是悬疑电影的经典之作。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzk4ODU3MDMzNF5BMl5BanBnXkFtZTcwNjE3MDMyNA@@._V1_.jpg',
    },
    {
      id: 62,
      rank: 62,
      title: '消失的爱人',
      originalTitle: 'Gone Girl',
      year: 2014,
      score: 8.7,
      ratingCount: '312456',
      ratingDistribution: {
        5: '68.9%',
        4: '24.3%',
        3: '6.1%',
        2: '0.5%',
        1: '0.2%',
      },
      type: '悬疑, 惊悚',
      region: '美国',
      language: '英语',
      releaseDate: '2014-10-03',
      runtime: '149分钟',
      director: '大卫·芬奇',
      screenwriter: '吉莉安·弗琳',
      actors: '本·阿弗莱克, 罗莎蒙德·派克, 尼尔·帕特里克·哈里斯',
      aka: '失踪的女孩(港), 控制(台)',
      imdb: 'https://www.imdb.com/title/tt2267998/',
      description:
        '尼克（本·阿弗莱克饰）和艾米（罗莎蒙德·派克饰）是一对人人称羡的恩爱夫妻。艾米出身名门，聪明美丽，是著名的作家。尼克则是一个普通的大学教师，两人结婚五周年纪念日当天，艾米突然失踪了。\n\n警方介入调查后，发现了一系列可疑的线索：尼克的行为举止异常，家中有暴力痕迹，艾米的日记中也暗示尼克有暴力倾向。随着调查的深入，尼克成为了最大的嫌疑犯，媒体也对他进行了铺天盖地的负面报道。\n\n然而，事情的真相远非表面那么简单。艾米其实并没有死亡，而是精心策划了一起失踪案，目的是报复尼克的出轨行为。她伪造了自己被谋杀的证据，想要将尼克送进监狱。\n\n但是，计划总是赶不上变化。艾米在实施计划的过程中遇到了意外，不得不改变策略。最终，她决定回到尼克身边，继续扮演恩爱夫妻的角色，而尼克也因为各种原因，不得不接受这个现实。\n\n《消失的爱人》是大卫·芬奇执导的悬疑惊悚片，改编自吉莉安·弗琳的同名小说。影片以其暗黑的风格、复杂的人物关系和出人意料的剧情而受到观众和评论家的一致好评。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjA4MTEwMTc4N15BMl5BanBnXkFtZTgwMTE2MDU3MDE@._V1_.jpg',
    },
    {
      id: 63,
      rank: 63,
      title: '王牌特工：特工学院',
      originalTitle: 'Kingsman: The Secret Service',
      year: 2014,
      score: 8.8,
      ratingCount: '287654',
      ratingDistribution: {
        5: '72.3%',
        4: '22.1%',
        3: '5.0%',
        2: '0.5%',
        1: '0.1%',
      },
      type: '动作, 冒险',
      region: '英国, 美国',
      language: '英语',
      releaseDate: '2015-03-27',
      runtime: '129分钟',
      director: '马修·沃恩',
      screenwriter: '简·古德曼, 马修·沃恩, 马克·米勒, 戴夫·吉布森',
      actors: '塔伦·埃格顿, 科林·费尔斯, 塞缪尔·杰克逊',
      aka: '皇家特工：间谍密令(港), 金牌特务(台)',
      imdb: 'https://www.imdb.com/title/tt2802144/',
      description:
        '哈里·哈特（科林·费尔斯饰）是英国秘密特工组织金斯曼的成员，他的同事在一次任务中牺牲，留下了一个儿子艾格西（塔伦·埃格顿饰）。哈里一直关注着艾格西的成长，但是艾格西却因为家庭环境的影响，逐渐沦为了街头小混混。\n\n当金斯曼组织需要招募新成员时，哈里推荐了艾格西。艾格西进入了金斯曼的训练基地，开始了严格的特工训练。在训练过程中，他遇到了各种挑战，但是凭借着自己的智慧和勇气，逐渐脱颖而出。\n\n与此同时，一位名叫瓦伦丁（塞缪尔·杰克逊饰）的亿万富翁正在策划一场全球性的灾难，他想要通过一种特殊的 SIM 卡，控制人们的思想，从而减少地球上的人口。哈里和艾格西必须阻止瓦伦丁的阴谋，拯救世界。\n\n《王牌特工：特工学院》是马修·沃恩执导的动作冒险片，改编自马克·米勒的同名漫画。影片以其独特的风格、精彩的动作场面和幽默的台词而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNjRjOTRhNjUtODJjNi00NTc4LTkzNWQtYzE1N2Q1ZGE5ZTJkXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg',
    },
    {
      id: 64,
      rank: 64,
      title: '盗梦空间',
      originalTitle: 'Inception',
      year: 2010,
      score: 9.4,
      ratingCount: '389765',
      ratingDistribution: {
        5: '82.5%',
        4: '15.3%',
        3: '2.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '科幻, 动作',
      region: '美国, 英国',
      language: '英语',
      releaseDate: '2010-09-01',
      runtime: '148分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '克里斯托弗·诺兰',
      actors: '莱昂纳多·迪卡普里奥, 约瑟夫·高登-莱维特, 艾伦·佩吉',
      aka: '潜行凶间(港), 全面启动(台)',
      imdb: 'https://www.imdb.com/title/tt1375666/',
      description:
        '多姆·柯布（莱昂纳多·迪卡普里奥饰）是一位经验丰富的盗梦者，他能够潜入人们的梦境，窃取他们潜意识中的秘密。柯布的特殊技能使他成为了国际犯罪组织的目标，也让他失去了自己的家庭。\n\n柯布接到了一个特殊的任务：不是窃取思想，而是植入思想。这个任务被称为“inception”，即 inception。如果成功，柯布将获得自由，能够回到自己的家人身边。\n\n柯布组建了一支团队，包括亚瑟（约瑟夫·高登-莱维特饰）、艾莉亚德妮（艾伦·佩吉饰）、伊姆斯（汤姆·哈迪饰）和尤瑟夫（迪利普·劳饰）。他们的目标是在一位名叫罗伯特·费舍尔（希里安·墨菲饰）的年轻商人的潜意识中植入一个想法，让他解散自己父亲的商业帝国。\n\n为了完成这个任务，柯布和他的团队需要进入多层梦境，每一层梦境都有不同的时间流速和危险。在这个过程中，柯布必须面对自己的过去，特别是他的妻子梅尔（玛丽昂·歌迪亚饰）的幻影，她一直在干扰柯布的任务。\n\n《盗梦空间》是克里斯托弗·诺兰执导的科幻动作片，以其复杂的剧情、出色的视觉效果和深刻的哲学思考而受到观众和评论家的一致好评。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
      id: 65,
      rank: 65,
      title: '蝙蝠侠：黑暗骑士',
      originalTitle: 'The Dark Knight',
      year: 2008,
      score: 9.2,
      ratingCount: '376543',
      ratingDistribution: {
        5: '79.8%',
        4: '17.2%',
        3: '2.7%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '动作, 犯罪',
      region: '美国, 英国',
      language: '英语',
      releaseDate: '2008-07-18',
      runtime: '152分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '乔纳森·诺兰, 克里斯托弗·诺兰, 大卫·S·戈耶',
      actors: '克里斯蒂安·贝尔, 希斯·莱杰, 艾伦·艾克哈特',
      aka: '蝙蝠侠：黑夜之神(港), 蝙蝠侠：黑暗骑士(台)',
      imdb: 'https://www.imdb.com/title/tt0468569/',
      description:
        '蝙蝠侠（克里斯蒂安·贝尔饰）与吉姆·戈登警长（加里·奥德曼饰）和地区检察官哈维·登特（艾伦·艾克哈特饰）联手，开始了一个剿灭哥谭市犯罪组织的计划。他们的努力初见成效，犯罪率下降了，哥谭市似乎迎来了和平的曙光。\n\n然而，一个名叫小丑（希斯·莱杰饰）的疯狂罪犯的出现，打破了这种平静。小丑以其独特的犯罪方式和无法预测的行为，给哥谭市带来了前所未有的混乱。他不仅挑战蝙蝠侠，还威胁要摧毁整个城市。\n\n蝙蝠侠必须面对小丑的挑战，同时还要保护哥谭市的市民。在这个过程中，他不得不做出一些艰难的选择，甚至质疑自己的道德准则。\n\n《蝙蝠侠：黑暗骑士》是克里斯托弗·诺兰执导的蝙蝠侠系列电影的第二部，以其黑暗的风格、出色的演员表演和深刻的主题而受到观众和评论家的一致好评。希斯·莱杰在片中饰演的小丑一角，被认为是电影史上最经典的反派角色之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    },
    {
      id: 66,
      rank: 66,
      title: '泰坦尼克号',
      originalTitle: 'Titanic',
      year: 1997,
      score: 9.3,
      ratingCount: '412356',
      ratingDistribution: {
        5: '81.2%',
        4: '16.5%',
        3: '2.0%',
        2: '0.2%',
        1: '0.1%',
      },
      type: '爱情, 灾难',
      region: '美国',
      language: '英语',
      releaseDate: '1998-04-03',
      runtime: '194分钟',
      director: '詹姆斯·卡梅隆',
      screenwriter: '詹姆斯·卡梅隆',
      actors: '莱昂纳多·迪卡普里奥, 凯特·温斯莱特, 比利·赞恩',
      aka: '铁达尼号(港/台)',
      imdb: 'https://www.imdb.com/title/tt0120338/',
      description:
        '1912年4月10日，泰坦尼克号从英国南安普敦出发，开始了它的处女航，目的地是美国纽约。在船上，穷画家杰克·道森（莱昂纳多·迪卡普里奥饰）与富家小姐罗丝·德威特·布克特（凯特·温斯莱特饰）相遇并相爱。\n\n罗丝厌倦了上流社会的虚伪和束缚，她与杰克的相遇让她感受到了自由和真爱。然而，他们的爱情故事被一场突如其来的灾难所打断。1912年4月15日凌晨，泰坦尼克号与冰山相撞，船体开始沉没。\n\n在生死关头，杰克和罗丝必须面对各种挑战，包括船上的混乱、救生艇的短缺以及冰冷的海水。杰克为了保护罗丝，牺牲了自己的生命，将生存的机会留给了她。\n\n84年后，已经年老的罗丝（格劳瑞亚·斯图尔特饰）讲述了这段感人的爱情故事，她将杰克送给她的项链“海洋之心”扔回了大海，让它与杰克一起长眠在海底。\n\n《泰坦尼克号》是詹姆斯·卡梅隆执导的爱情灾难片，以其壮观的视觉效果、感人的爱情故事和出色的演员表演而成为电影史上最成功的电影之一。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    },
    {
      id: 67,
      rank: 67,
      title: '这个杀手不太冷',
      originalTitle: 'Léon',
      year: 1994,
      score: 9.4,
      ratingCount: '398765',
      ratingDistribution: {
        5: '83.5%',
        4: '14.3%',
        3: '2.0%',
        2: '0.1%',
        1: '0.1%',
      },
      type: '动作, 犯罪',
      region: '法国, 美国',
      language: '英语, 法语, 意大利语',
      releaseDate: '1994-09-14',
      runtime: '110分钟',
      director: '吕克·贝松',
      screenwriter: '吕克·贝松',
      actors: '让·雷诺, 娜塔莉·波特曼, 加里·奥德曼',
      aka: '杀手莱昂(港), 终极追杀令(台)',
      imdb: 'https://www.imdb.com/title/tt0110413/',
      description:
        '里昂（让·雷诺饰）是一位孤独的职业杀手，他住在纽约的一间公寓里，过着单调而规律的生活。他的邻居是一位名叫玛蒂尔达（娜塔莉·波特曼饰）的12岁小女孩，她的家庭非常不幸福。\n\n一天，玛蒂尔达的父亲因为私藏毒品而被腐败警察史丹菲尔（加里·奥德曼饰）杀害，玛蒂尔达因为外出购物而幸免于难。她逃到了里昂的公寓，请求里昂收留她。里昂起初拒绝了她的请求，但是最终还是心软了，收留了她。\n\n玛蒂尔达决定向里昂学习杀手技能，以便为她的家人报仇。里昂开始教导她如何使用枪支、如何跟踪目标以及如何执行暗杀任务。在这个过程中，他们之间建立了一种特殊的关系，超越了年龄和身份的界限。\n\n然而，他们的平静生活被史丹菲尔打破了。史丹菲尔发现了玛蒂尔达的踪迹，他开始追杀她和里昂。里昂和玛蒂尔达必须面对史丹菲尔的追杀，同时还要处理他们之间日益增长的感情。\n\n《这个杀手不太冷》是吕克·贝松执导的动作犯罪片，以其独特的风格、出色的演员表演和深刻的主题而受到观众和评论家的一致好评。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTc5MzY1NjUyMF5BMl5BanBnXkFtZTcwODg1MDU4NA@@._V1_.jpg',
    },
    {
      id: 68,
      rank: 68,
      title: '星际迷航',
      originalTitle: 'Star Trek',
      year: 2009,
      score: 8.5,
      ratingCount: '267845',
      ratingDistribution: {
        5: '65.3%',
        4: '27.5%',
        3: '6.8%',
        2: '0.3%',
        1: '0.1%',
      },
      type: '科幻, 动作',
      region: '美国',
      language: '英语',
      releaseDate: '2009-05-08',
      runtime: '127分钟',
      director: 'J·J·艾布拉姆斯',
      screenwriter: '罗伯托·奥奇, 亚历克斯·库兹曼, 吉恩·罗登贝瑞',
      actors: '克里斯·派恩, 扎克瑞·昆图, 伦纳德·尼莫伊',
      aka: '星空奇遇记(港), 星际争霸战(台)',
      imdb: 'https://www.imdb.com/title/tt0796366/',
      description:
        '在23世纪，人类已经开始了星际探索。詹姆斯·T·柯克（克里斯·派恩饰）是一个性格叛逆的年轻人，他被招募到星际舰队学院学习。在学院里，他遇到了斯波克（扎克瑞·昆图饰），一个半人类半瓦肯人的学员，两人一开始关系并不融洽。\n\n当罗慕伦人 Nero（埃里克·巴纳饰）穿越时空来到23世纪，对联邦星舰企业号发动攻击时，柯克和斯波克必须联手，共同应对这个威胁。他们被任命为企业号的船员，开始了他们的第一次任务。\n\n在任务中，柯克和斯波克逐渐建立了信任和友谊，他们一起面对各种挑战，包括与罗慕伦人的战斗、穿越危险的太空区域以及解决内部的冲突。\n\n《星际迷航》是J·J·艾布拉姆斯执导的科幻动作片，是星际迷航系列电影的第十一部，也是该系列的重启之作。影片以其精彩的动作场面、出色的视觉效果和幽默的台词而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwODQwNjA0Mg@@._V1_.jpg',
    },
    {
      id: 69,
      rank: 69,
      title: '银河护卫队',
      originalTitle: 'Guardians of the Galaxy',
      year: 2014,
      score: 8.7,
      ratingCount: '298765',
      ratingDistribution: {
        5: '69.8%',
        4: '24.2%',
        3: '5.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '科幻, 动作',
      region: '美国',
      language: '英语',
      releaseDate: '2014-08-01',
      runtime: '122分钟',
      director: '詹姆斯·古恩',
      screenwriter: '詹姆斯·古恩, 尼科尔·帕尔曼, 丹·阿布内特, 安迪·兰宁',
      actors: '克里斯·帕拉特, 佐伊·索尔达娜, 戴夫·巴蒂斯塔',
      aka: '银河守护队(港), 星际异攻队(台)',
      imdb: 'https://www.imdb.com/title/tt2015381/',
      description:
        '彼得·奎尔（克里斯·帕拉特饰）是一个从小被外星人绑架的地球人，他现在是一个名为“星爵”的星际盗贼。在一次盗窃任务中，他窃取了一个神秘的球体，这个球体引起了宇宙中许多势力的争夺，其中包括一个名叫罗南（李·佩斯饰）的邪恶外星人。\n\n为了躲避罗南的追杀，彼得必须与其他几个罪犯结盟，包括卡魔拉（佐伊·索尔达娜饰）、火箭浣熊（布莱德利·库珀配音）、树人格鲁特（范·迪塞尔配音）和德拉克斯（戴夫·巴蒂斯塔饰）。他们组成了银河护卫队，共同对抗罗南的威胁。\n\n在这个过程中，银河护卫队的成员们逐渐建立了友谊和信任，他们发现这个神秘的球体其实是一个无限宝石，拥有巨大的力量。如果罗南得到了这个宝石，他将能够摧毁整个宇宙。\n\n银河护卫队必须阻止罗南的阴谋，保护宇宙的和平。\n\n《银河护卫队》是詹姆斯·古恩执导的科幻动作片，改编自漫威漫画的同名系列。影片以其独特的风格、精彩的动作场面和幽默的台词而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg',
    },
    {
      id: 70,
      rank: 70,
      title: '星球大战：原力觉醒',
      originalTitle: 'Star Wars: The Force Awakens',
      year: 2015,
      score: 8.6,
      ratingCount: '301245',
      ratingDistribution: {
        5: '67.5%',
        4: '25.8%',
        3: '6.0%',
        2: '0.5%',
        1: '0.2%',
      },
      type: '科幻, 动作',
      region: '美国',
      language: '英语',
      releaseDate: '2015-12-18',
      runtime: '138分钟',
      director: 'J·J·艾布拉姆斯',
      screenwriter: 'J·J·艾布拉姆斯, 劳伦斯·卡斯丹, 迈克尔·阿姆特',
      actors: '黛西·雷德利, 约翰·波耶加, 哈里森·福特',
      aka: '星球大战：原力觉醒(港/台)',
      imdb: 'https://www.imdb.com/title/tt2488496/',
      description:
        '《星球大战：原力觉醒》的故事发生在《星球大战6：绝地归来》之后的30年。银河帝国已经被推翻，但是一个新的邪恶势力——第一秩序（First Order）崛起了。第一秩序由斯诺克（安迪·瑟金斯饰）领导，他的得力助手是凯洛·伦（亚当·德赖弗饰），一个年轻的黑暗绝地。\n\n雷伊（黛西·雷德利饰）是一个生活在贾库星球上的拾荒者，她在一次偶然的机会中发现了一个机器人BB-8，这个机器人携带了一张地图，指向了卢克·天行者（马克·哈米尔饰）的位置。卢克·天行者是最后的绝地武士，他在多年前失踪了。\n\n芬恩（约翰·波耶加饰）是一个第一秩序的冲锋队员，他在一次任务中拒绝执行命令，决定叛逃。他遇到了雷伊和BB-8，他们一起踏上了寻找卢克·天行者的旅程。\n\n在这个过程中，他们遇到了汉·索罗（哈里森·福特饰）和丘巴卡（彼特·梅犹饰），他们帮助雷伊和芬恩对抗第一秩序的威胁。\n\n《星球大战：原力觉醒》是J·J·艾布拉姆斯执导的科幻动作片，是星球大战系列电影的第七部，也是该系列的重启之作。影片以其精彩的动作场面、出色的视觉效果和对经典角色的回归而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_.jpg',
    },
    {
      id: 71,
      rank: 71,
      title: '阿凡达',
      originalTitle: 'Avatar',
      year: 2009,
      score: 8.8,
      ratingCount: '324567',
      ratingDistribution: {
        5: '72.5%',
        4: '23.0%',
        3: '4.0%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '科幻, 动作',
      region: '美国',
      language: '英语',
      releaseDate: '2009-12-18',
      runtime: '162分钟',
      director: '詹姆斯·卡梅隆',
      screenwriter: '詹姆斯·卡梅隆',
      actors: '萨姆·沃辛顿, 佐伊·索尔达娜, 西格妮·韦弗',
      aka: '阿凡达(港/台)',
      imdb: 'https://www.imdb.com/title/tt0499549/',
      description:
        "在2154年，人类已经耗尽了地球的自然资源，他们开始在宇宙中寻找新的资源。人类发现了一个名叫潘多拉的星球，这个星球上有一种叫做“unobtanium”的稀有矿物，这种矿物可以解决人类的能源危机。\n\n为了能够在潘多拉星球上生存，人类创造了一种叫做“阿凡达”的生物，这种生物是人类DNA和潘多拉星球上的纳美人（Na'vi）DNA的混合体。人类可以通过意识控制阿凡达，从而在潘多拉星球上活动。\n\n杰克·萨利（萨姆·沃辛顿饰）是一名前海军陆战队员，他的哥哥是一名阿凡达驾驶员，但是他的哥哥在一次事故中去世了。杰克被招募来代替他的哥哥，成为一名阿凡达驾驶员。\n\n杰克通过阿凡达在潘多拉星球上活动，他遇到了纳美人的公主奈蒂莉（佐伊·索尔达娜饰），奈蒂莉教导杰克纳美人的文化和生活方式。在这个过程中，杰克逐渐爱上了潘多拉星球和奈蒂莉，他开始质疑人类的行为。\n\n当人类决定摧毁纳美人的家园，以获取更多的unobtanium时，杰克必须做出选择：是站在人类一边，还是站在纳美人一边，保护潘多拉星球。\n\n《阿凡达》是詹姆斯·卡梅隆执导的科幻动作片，以其壮观的视觉效果、深刻的主题和出色的演员表演而成为电影史上最成功的电影之一。",
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTQyNTIzMw@@._V1_.jpg',
    },
    {
      id: 72,
      rank: 72,
      title: '霍比特人：意外之旅',
      originalTitle: 'The Hobbit: An Unexpected Journey',
      year: 2012,
      score: 8.4,
      ratingCount: '256789',
      ratingDistribution: {
        5: '62.5%',
        4: '28.3%',
        3: '8.0%',
        2: '1.0%',
        1: '0.2%',
      },
      type: '奇幻, 冒险',
      region: '美国, 新西兰',
      language: '英语',
      releaseDate: '2012-12-14',
      runtime: '169分钟',
      director: '彼得·杰克逊',
      screenwriter: '弗兰·威尔士, 菲利帕·鲍恩斯, 彼得·杰克逊, 吉尔莫·德尔·托罗, J·R·R·托尔金',
      actors: '伊恩·麦克莱恩, 马丁·弗瑞曼, 理查德·阿米蒂奇',
      aka: '哈比人：不思议之旅(港), 哈比人：意外旅程(台)',
      imdb: 'https://www.imdb.com/title/tt0903624/',
      description:
        '比尔博·巴金斯（马丁·弗瑞曼饰）是一个生活在夏尔的霍比特人，他过着平静而舒适的生活。然而，他的平静生活被一群矮人打破了。矮人国王索林·橡木盾（理查德·阿米蒂奇饰）和他的十二个矮人同伴，在甘道夫（伊恩·麦克莱恩饰）的带领下，来到了比尔博的家。\n\n甘道夫说服比尔博加入他们的冒险，一起前往孤山，夺回被巨龙史矛革（本尼迪克特·康伯巴奇配音）占领的矮人王国。比尔博起初拒绝了，但是在好奇心的驱使下，他最终还是加入了他们的队伍。\n\n在旅途中，比尔博和矮人们遇到了各种危险和挑战，包括食人妖、半兽人、座狼和精灵。他们还遇到了咕噜姆（安迪·瑟金斯饰），一个居住在地下的生物。比尔博从咕噜姆那里获得了一枚魔戒，这枚魔戒将改变他的一生。\n\n《霍比特人：意外之旅》是彼得·杰克逊执导的奇幻冒险片，改编自J·R·R·托尔金的同名小说。影片是《霍比特人》三部曲的第一部，以其壮观的视觉效果、精彩的动作场面和忠实于原著的改编而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTczMTMyMDQ1M15BMl5BanBnXkFtZTcwMTU4NDE3OA@@._V1_.jpg',
    },
    {
      id: 73,
      rank: 73,
      title: '冰雪奇缘',
      originalTitle: 'Frozen',
      year: 2013,
      score: 8.5,
      ratingCount: '278945',
      ratingDistribution: {
        5: '66.8%',
        4: '25.2%',
        3: '7.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 音乐',
      region: '美国',
      language: '英语',
      releaseDate: '2013-11-27',
      runtime: '102分钟',
      director: '克里斯·巴克, 珍妮弗·李',
      screenwriter: '珍妮弗·李, 克里斯·巴克, 肖恩·莫里斯, 汉斯·克里斯蒂安·安徒生',
      actors: '克里斯汀·贝尔, 伊迪娜·门泽尔, 乔纳森·格罗夫',
      aka: '魔雪奇缘(港), 冰雪奇缘(台)',
      imdb: 'https://www.imdb.com/title/tt2294629/',
      description:
        '阿伦黛尔王国的公主艾尔莎（伊迪娜·门泽尔配音）拥有一种特殊的能力，她可以制造冰雪和霜冻。然而，这种能力也给她带来了麻烦，因为她无法控制它。在她的加冕典礼上，她因为情绪失控，不小心用冰雪魔法覆盖了整个王国，导致王国陷入了永恒的冬天。\n\n艾尔莎的妹妹安娜（克里斯汀·贝尔配音）决定踏上旅程，寻找艾尔莎，帮助她控制自己的能力，拯救王国。在旅途中，安娜遇到了一个名叫克里斯托夫（乔纳森·格罗夫配音）的山民和他的驯鹿斯文，以及一个会说话的雪人奥拉夫（乔什·盖德配音）。\n\n安娜和她的朋友们必须面对各种挑战，包括恶劣的天气、危险的地形和一个名叫汉斯（圣蒂诺·方塔纳配音）的王子的背叛。最终，安娜和艾尔莎意识到，真正的力量不是控制冰雪，而是爱。\n\n《冰雪奇缘》是迪士尼动画工作室制作的动画音乐片，改编自汉斯·克里斯蒂安·安徒生的童话《雪皇后》。影片以其精彩的音乐、出色的动画效果和深刻的主题而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMzA0MDkxMTczMl5BMl5BanBnXkFtZTgwOTU1MTU1MTE@._V1_.jpg',
    },
    {
      id: 74,
      rank: 74,
      title: '小黄人大眼萌',
      originalTitle: 'Minions',
      year: 2015,
      score: 8.3,
      ratingCount: '245678',
      ratingDistribution: {
        5: '60.5%',
        4: '28.0%',
        3: '10.0%',
        2: '1.2%',
        1: '0.3%',
      },
      type: '动画, 喜剧',
      region: '美国',
      language: '英语',
      releaseDate: '2015-07-10',
      runtime: '91分钟',
      director: '皮埃尔·科芬, 凯尔·巴尔达',
      screenwriter: '布莱恩·林奇, 辛科·保罗, 肯·道里欧',
      actors: '桑德拉·布洛克, 乔·哈姆, 皮埃尔·科芬',
      aka: '迷你兵团(港), 小小兵(台)',
      imdb: 'https://www.imdb.com/title/tt2293640/',
      description:
        '小黄人是一种古老的生物，它们的存在就是为了服务最卑鄙的主人。在漫长的历史中，它们曾经服务过霸王龙、吸血鬼德古拉、拿破仑等各种邪恶的主人，但是每一个主人都因为各种原因而死亡。\n\n在经历了多次失败后，小黄人们感到非常沮丧，它们决定隐居在一个冰洞里，过上平静的生活。然而，这种平静的生活并没有持续多久，小黄人们开始感到无聊和空虚，它们渴望再次为一个邪恶的主人服务。\n\n凯文（皮埃尔·科芬配音）决定踏上旅程，寻找一个新的邪恶主人。他带着鲍勃（皮埃尔·科芬配音）和斯图尔特（皮埃尔·科芬配音）一起，穿越了整个世界，最终来到了1968年的纽约。\n\n在纽约，凯文、鲍勃和斯图尔特遇到了一个名叫斯嘉丽·杀人狂（桑德拉·布洛克配音）的女魔头，她是世界上最邪恶的女人。斯嘉丽雇佣了小黄人们，让它们帮助她实现统治世界的计划。\n\n然而，事情并没有按照计划进行，小黄人们在执行任务的过程中遇到了各种麻烦和挑战。最终，它们意识到，真正重要的不是服务一个邪恶的主人，而是彼此之间的友谊。\n\n《小黄人大眼萌》是皮埃尔·科芬和凯尔·巴尔达执导的动画喜剧片，是《神偷奶爸》系列的衍生作品。影片以其幽默的剧情、可爱的角色和精彩的动画效果而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTU0ODQzNDQ4NV5BMl5BanBnXkFtZTgwOTAwNjU4NzE@._V1_.jpg',
    },
    {
      id: 75,
      rank: 75,
      title: '寻梦环游记',
      originalTitle: 'Coco',
      year: 2017,
      score: 9.1,
      ratingCount: '312456',
      ratingDistribution: {
        5: '78.5%',
        4: '18.0%',
        3: '3.0%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '动画, 音乐',
      region: '美国',
      language: '英语, 西班牙语',
      releaseDate: '2017-11-22',
      runtime: '105分钟',
      director: '李·昂克里奇, 阿德里安·莫利纳',
      screenwriter: '李·昂克里奇, 阿德里安·莫利纳, 马修·奥德里奇',
      actors: '安东尼·冈萨雷斯, 盖尔·加西亚·贝纳尔, 本杰明·布拉特',
      aka: '玩转极乐园(港), 可可夜总会(台)',
      imdb: 'https://www.imdb.com/title/tt2380307/',
      description:
        '米格（安东尼·冈萨雷斯配音）是一个生活在墨西哥的男孩，他非常热爱音乐，梦想成为一名音乐家。然而，他的家族却有一个禁忌：禁止接触音乐。这是因为米格的曾祖父埃克托（盖尔·加西亚·贝纳尔配音）在多年前为了追求音乐梦想，抛弃了自己的家庭。\n\n在亡灵节这一天，米格决定违背家族的禁忌，参加一个音乐比赛。他偷偷地拿走了一把吉他，这把吉他属于墨西哥著名的音乐家德拉库斯（本杰明·布拉特配音）。然而，当他弹奏这把吉他时，他意外地穿越到了亡灵世界。\n\n在亡灵世界里，米格遇到了他的祖先们，包括他的曾祖母可可（安娜·奥菲丽亚·莫吉亚配音）。他还遇到了一个名叫埃克托的亡灵，埃克托帮助米格寻找德拉库斯，希望能够得到他的祝福，回到人类世界。\n\n在这个过程中，米格发现了一个关于他家族的秘密：德拉库斯其实是一个骗子，他谋杀了埃克托，窃取了他的音乐作品。米格必须揭露这个真相，让他的家族重新接纳音乐。\n\n《寻梦环游记》是皮克斯动画工作室制作的动画音乐片，以其精彩的音乐、出色的动画效果和深刻的主题而受到观众的喜爱。影片探讨了家庭、亲情和记忆的重要性，是一部适合全家人观看的电影。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_.jpg',
    },
    {
      id: 76,
      rank: 76,
      title: '蜘蛛侠：英雄归来',
      originalTitle: 'Spider-Man: Homecoming',
      year: 2017,
      score: 8.4,
      ratingCount: '287654',
      ratingDistribution: {
        5: '64.5%',
        4: '27.8%',
        3: '7.0%',
        2: '0.5%',
        1: '0.2%',
      },
      type: '动作, 科幻',
      region: '美国',
      language: '英语',
      releaseDate: '2017-07-07',
      runtime: '133分钟',
      director: '乔·沃茨',
      screenwriter:
        '乔纳森·戈尔茨坦, 约翰·弗朗西斯·戴利, 乔·沃茨, 克里斯托弗·福特, 克里斯·麦肯纳, 埃里克·萨默斯',
      actors: '汤姆·赫兰德, 迈克尔·基顿, 小罗伯特·唐尼',
      aka: '蜘蛛侠：强势回归(港), 蜘蛛人：返校日(台)',
      imdb: 'https://www.imdb.com/title/tt2250912/',
      description:
        '彼得·帕克（汤姆·赫兰德饰）是一个普通的高中生，他在一次实验中被一只放射性蜘蛛咬伤，获得了超能力。他成为了蜘蛛侠，开始在纽约市打击犯罪。\n\n在《美国队长3：内战》的事件后，彼得·帕克回到了学校，继续他的高中生活。他渴望成为一名复仇者联盟的成员，但是托尼·斯塔克（小罗伯特·唐尼饰）却希望他先专注于自己的学业，成为一名“友好的邻居蜘蛛侠”。\n\n然而，彼得·帕克并不满足于只打击街头犯罪，他想要证明自己的能力。当他发现一个名叫秃鹫（迈克尔·基顿饰）的罪犯正在使用外星技术制造武器时，他决定独自调查这个案件。\n\n在调查的过程中，彼得·帕克遇到了各种挑战，包括平衡他的超级英雄生活和高中生活，以及面对秃鹫的威胁。最终，他意识到，真正的英雄不是拥有超能力，而是有勇气去做正确的事情。\n\n《蜘蛛侠：英雄归来》是乔·沃茨执导的蜘蛛侠系列电影的重启之作，是漫威电影宇宙的第十六部电影。影片以其幽默的剧情、精彩的动作场面和出色的演员表演而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_.jpg',
    },
    {
      id: 77,
      rank: 77,
      title: '神奇女侠',
      originalTitle: 'Wonder Woman',
      year: 2017,
      score: 8.3,
      ratingCount: '276543',
      ratingDistribution: {
        5: '62.8%',
        4: '28.5%',
        3: '7.5%',
        2: '0.9%',
        1: '0.3%',
      },
      type: '动作, 科幻',
      region: '美国',
      language: '英语',
      releaseDate: '2017-06-02',
      runtime: '141分钟',
      director: '派蒂·杰金斯',
      screenwriter: '艾伦·海因伯格, 扎克·施奈德, 贾森·福克斯, 威廉·M·马斯顿',
      actors: '盖尔·加朵, 克里斯·派恩, 康妮·尼尔森',
      aka: '神奇女侠(港/台)',
      imdb: 'https://www.imdb.com/title/tt0451279/',
      description:
        '戴安娜（盖尔·加朵饰）是亚马逊族的公主，她生活在一个与世隔绝的岛屿天堂岛上。她从小就接受了严格的训练，成为了一名出色的战士。\n\n一天，一名英国飞行员史蒂夫·特雷弗（克里斯·派恩饰）坠毁在天堂岛上。他告诉戴安娜，外面的世界正在经历一场巨大的战争（第一次世界大战）。戴安娜相信，这场战争是由战神阿瑞斯（大卫·休里斯饰）引起的，她决定离开天堂岛，帮助史蒂夫阻止这场战争。\n\n戴安娜和史蒂夫来到了伦敦，他们遇到了史蒂夫的同事们，包括埃塔·坎蒂（露茜·戴维斯饰）、塞巴斯蒂安（埃伦·斯科特饰）和萨米尔（萨伊德·塔格马奥饰）。他们一起制定了一个计划，阻止德国将军鲁登道夫（丹尼·休斯顿饰）和化学家伊莎贝拉·丸（埃琳娜·安娜娅饰）使用一种致命的毒气武器。\n\n在这个过程中，戴安娜逐渐了解了人类的复杂性，她开始质疑自己的信念。最终，她意识到，真正的敌人不是阿瑞斯，而是人类内心的仇恨和贪婪。她必须使用自己的力量，保护人类，引导他们走向和平。\n\n《神奇女侠》是派蒂·杰金斯执导的超级英雄电影，改编自DC漫画的同名系列。影片以其精彩的动作场面、出色的演员表演和深刻的主题而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDFmZTkxMjQtYTQ2Mi00Nzc5LWExYzMtN2Y2ZDI1YmE5ZTU3XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg',
    },
    {
      id: 78,
      rank: 78,
      title: '雷神3：诸神黄昏',
      originalTitle: 'Thor: Ragnarok',
      year: 2017,
      score: 8.5,
      ratingCount: '291245',
      ratingDistribution: {
        5: '66.5%',
        4: '26.8%',
        3: '6.0%',
        2: '0.5%',
        1: '0.2%',
      },
      type: '动作, 科幻',
      region: '美国',
      language: '英语',
      releaseDate: '2017-11-03',
      runtime: '130分钟',
      director: '塔伊加·维迪提',
      screenwriter: '埃里克·皮尔森, 克雷格·凯尔, 克里斯托弗·约斯特',
      actors: '克里斯·海姆斯沃斯, 汤姆·希德勒斯顿, 凯特·布兰切特',
      aka: '雷神3：诸神黄昏(港/台)',
      imdb: 'https://www.imdb.com/title/tt3501632/',
      description:
        '雷神托尔（克里斯·海姆斯沃斯饰）在与火焰巨人苏尔特尔（克兰西·布朗配音）的战斗中，得知了一个预言：诸神黄昏即将来临，阿斯加德将被摧毁。托尔返回阿斯加德，发现他的弟弟洛基（汤姆·希德勒斯顿饰）伪装成他们的父亲奥丁（安东尼·霍普金斯饰），统治着阿斯加德。\n\n托尔和洛基找到了奥丁，奥丁告诉他们，他们的姐姐海拉（凯特·布兰切特饰）即将从监狱中释放出来。海拉是死亡女神，她的力量非常强大，托尔和洛基都不是她的对手。在与海拉的战斗中，托尔失去了他的锤子妙尔尼尔，被放逐到了一个名为萨卡的星球。\n\n在萨卡星球上，托尔被一个名叫宗师（杰夫·高布伦饰）的生物抓住，被迫参加角斗士比赛。他在比赛中遇到了他的老朋友绿巨人浩克（马克·鲁法洛饰），以及一个名叫瓦尔基里（泰莎·汤普森饰）的女战士。\n\n托尔、洛基、浩克和瓦尔基里组成了一个团队，决定返回阿斯加德，阻止海拉的统治，拯救阿斯加德的人民。在这个过程中，托尔发现了自己的真正力量，他不再依赖于他的锤子。\n\n《雷神3：诸神黄昏》是塔伊加·维迪提执导的雷神系列电影的第三部，是漫威电影宇宙的第十七部电影。影片以其幽默的剧情、精彩的动作场面和出色的演员表演而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODQ5MjI@._V1_.jpg',
    },
    {
      id: 79,
      rank: 79,
      title: '黑豹',
      originalTitle: 'Black Panther',
      year: 2018,
      score: 8.6,
      ratingCount: '302456',
      ratingDistribution: {
        5: '68.5%',
        4: '25.0%',
        3: '5.5%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动作, 科幻',
      region: '美国',
      language: '英语',
      releaseDate: '2018-02-16',
      runtime: '134分钟',
      director: '瑞恩·库格勒',
      screenwriter: '瑞恩·库格勒, 乔·罗伯特·科尔, 斯坦·李, 杰克·科比',
      actors: '查德维克·博斯曼, 露皮塔·尼永奥, 迈克尔·B·乔丹',
      aka: '黑豹(港/台)',
      imdb: 'https://www.imdb.com/title/tt1825683/',
      description:
        '特查拉（查德维克·博斯曼饰）是瓦坎达的国王，瓦坎达是一个位于非洲的神秘国家，拥有先进的科技和丰富的振金资源。特查拉在父亲特查卡（约翰·卡尼饰）去世后，回到瓦坎达继承王位。\n\n然而，特查拉的王位受到了挑战。一个名叫埃里克·克尔芒戈（迈克尔·B·乔丹饰）的人来到了瓦坎达，他声称自己是特查卡的私生子，拥有继承王位的权利。克尔芒戈是一个在海外长大的瓦坎达人，他对瓦坎达的孤立政策感到不满，希望利用瓦坎达的科技和资源，在全球范围内发动革命。\n\n特查拉必须与克尔芒戈进行战斗，保卫自己的王位和瓦坎达的和平。在这个过程中，他得到了他的妹妹舒莉（莱蒂希娅·赖特饰）、他的爱人娜吉亚（露皮塔·尼永奥饰）和他的将军奥克耶（丹娜·奎里拉饰）的帮助。\n\n《黑豹》是瑞恩·库格勒执导的超级英雄电影，改编自漫威漫画的同名系列。影片以其精彩的动作场面、出色的演员表演和深刻的主题而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg',
    },
    {
      id: 80,
      rank: 80,
      title: '加勒比海盗：黑珍珠号的诅咒',
      originalTitle: 'Pirates of the Caribbean: The Curse of the Black Pearl',
      year: 2003,
      score: 8.8,
      ratingCount: '334567',
      ratingDistribution: {
        5: '73.5%',
        4: '22.0%',
        3: '4.0%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '冒险, 奇幻',
      region: '美国',
      language: '英语',
      releaseDate: '2003-07-09',
      runtime: '143分钟',
      director: '戈尔·维宾斯基',
      screenwriter: '泰德·埃里奥特, 特里·鲁西奥, 斯图尔特·比蒂, 杰·沃尔伯特',
      actors: '约翰尼·德普, 奥兰多·布鲁姆, 凯拉·奈特莉',
      aka: '加勒比海盗：黑珍珠号的诅咒(港/台)',
      imdb: 'https://www.imdb.com/title/tt0325980/',
      description:
        '杰克·斯派罗船长（约翰尼·德普饰）是一位机智勇敢的海盗，他的船“黑珍珠号”被他的大副巴博萨（杰弗里·拉什饰）和船员们背叛并夺走了。巴博萨和他的船员们在一个神秘的岛屿上找到了一箱金币，但是他们不知道这些金币是被诅咒的。\n\n当巴博萨和他的船员们拿走金币后，他们变成了不死之身，只能在月光下显露出骷髅的形态。他们必须找到所有的金币，并将每一枚金币归还给宝箱，同时献上一滴每一个海盗的鲜血，才能解除诅咒。\n\n威尔·特纳（奥兰多·布鲁姆饰）是一位年轻的铁匠，他爱上了州长的女儿伊丽莎白·斯旺（凯拉·奈特莉饰）。当伊丽莎白被巴博萨和他的船员们绑架后，威尔·特纳决定寻求杰克·斯派罗船长的帮助，一起去营救伊丽莎白。\n\n杰克·斯派罗船长和威尔·特纳一起踏上了旅程，他们必须面对各种危险和挑战，包括与巴博萨和他的船员们的战斗，以及与英国皇家海军的冲突。最终，他们成功地营救了伊丽莎白，解除了诅咒，杰克·斯派罗船长也重新夺回了“黑珍珠号”。\n\n《加勒比海盗：黑珍珠号的诅咒》是戈尔·维宾斯基执导的加勒比海盗系列电影的第一部，以其精彩的动作场面、幽默的剧情和出色的演员表演而受到观众的喜爱。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjA5Mzg3Nw@@._V1_.jpg',
    },
    {
      id: 81,
      rank: 81,
      title: '指环王3：王者无敌',
      originalTitle: 'The Lord of the Rings: The Return of the King',
      year: 2003,
      score: 9.3,
      ratingCount: '298765',
      ratingDistribution: {
        5: '78.5%',
        4: '18.0%',
        3: '3.0%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '奇幻, 冒险',
      region: '美国, 新西兰',
      language: '英语',
      releaseDate: '2003-12-17',
      runtime: '201分钟',
      director: '彼得·杰克逊',
      screenwriter: '弗兰·威尔士, 菲利帕·鲍恩斯, 彼得·杰克逊, J·R·R·托尔金',
      actors: '伊恩·麦克莱恩, 维果·莫腾森, 伊利亚·伍德',
      aka: '魔戒三部曲：国王归来(港/台)',
      imdb: 'https://www.imdb.com/title/tt0167260/',
      description:
        '中土世界的终极之战，佛罗多与山姆前往末日火山销毁魔戒，阿拉贡等人则带领人类军队对抗索伦的黑暗军团。在这过程中，他们面临着各种挑战和考验，包括内心的恐惧、友情的考验以及牺牲的代价。最终，佛罗多成功销毁了魔戒，索伦被击败，中土世界恢复了和平。阿拉贡成为了人类的国王，与精灵公主阿尔温结婚。佛罗多则因为魔戒的伤害，最终选择前往西方仙境。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTM5NjMwMw@@._V1_.jpg',
    },
    {
      id: 82,
      rank: 82,
      title: '指环王2：双塔奇兵',
      originalTitle: 'The Lord of the Rings: The Two Towers',
      year: 2002,
      score: 9.2,
      ratingCount: '287654',
      ratingDistribution: {
        5: '76.0%',
        4: '20.0%',
        3: '3.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '奇幻, 冒险',
      region: '美国, 新西兰',
      language: '英语',
      releaseDate: '2002-12-18',
      runtime: '179分钟',
      director: '彼得·杰克逊',
      screenwriter: '弗兰·威尔士, 菲利帕·鲍恩斯, 彼得·杰克逊, J·R·R·托尔金',
      actors: '伊恩·麦克莱恩, 维果·莫腾森, 伊利亚·伍德',
      aka: '魔戒二部曲：双塔奇兵(港/台)',
      imdb: 'https://www.imdb.com/title/tt0167261/',
      description:
        '佛罗多与山姆继续前往魔多销毁魔戒，途中遇到了神秘的咕噜姆，他成为了他们的向导。与此同时，阿拉贡、莱戈拉斯和吉姆利追踪着被兽人掳走的皮平和梅里，途中遇到了罗翰国的国王希奥顿。他们帮助希奥顿对抗萨鲁曼的兽人军队，在圣盔谷展开了激烈的战斗。皮平和梅里则逃到了法贡森林，遇到了树人树须，树人决定帮助他们对抗萨鲁曼。最终，各方力量联合起来，为最终的决战做准备。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzE0YmY4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 83,
      rank: 83,
      title: '辛德勒的名单',
      originalTitle: "Schindler's List",
      year: 1993,
      score: 9.5,
      ratingCount: '265432',
      ratingDistribution: {
        5: '80.0%',
        4: '17.0%',
        3: '2.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '剧情, 历史, 战争',
      region: '美国',
      language: '英语, 希伯来语, 德语, 波兰语',
      releaseDate: '1993-12-15',
      runtime: '195分钟',
      director: '史蒂文·斯皮尔伯格',
      screenwriter: '斯蒂文·泽里安, 托马斯·肯尼利',
      actors: '连姆·尼森, 本·金斯利, 拉尔夫·费因斯',
      aka: '舒特拉的名单(港/台)',
      imdb: 'https://www.imdb.com/title/tt0108052/',
      description:
        '二战期间，德国商人奥斯卡·辛德勒在波兰克拉科夫开设了一家搪瓷厂，雇佣犹太工人为纳粹生产军需品。起初，他只是为了赚钱，但随着战争的进行，他逐渐意识到纳粹对犹太人的迫害。在他的会计伊扎克·斯特恩的帮助下，辛德勒开始利用自己的关系和财富，尽可能多地保护犹太人免受纳粹的屠杀。他制定了一份"辛德勒名单"，列出了他工厂里的犹太工人，这些工人因此得以幸存。战争结束后，辛德勒失去了所有的财富，但他拯救了超过1100名犹太人的生命。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzMtYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 84,
      rank: 84,
      title: '这个杀手不太冷',
      originalTitle: 'Léon',
      year: 1994,
      score: 9.4,
      ratingCount: '276543',
      ratingDistribution: {
        5: '78.0%',
        4: '19.0%',
        3: '2.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '剧情, 动作, 犯罪',
      region: '法国, 美国',
      language: '英语, 意大利语, 法语',
      releaseDate: '1994-09-14',
      runtime: '110分钟',
      director: '吕克·贝松',
      screenwriter: '吕克·贝松',
      actors: '让·雷诺, 娜塔莉·波特曼, 加里·奥德曼',
      aka: '杀手莱昂(港) / 终极追杀令(台)',
      imdb: 'https://www.imdb.com/title/tt0110413/',
      description:
        '纽约黑帮杀害了小女孩玛蒂尔达的全家，只有她因为外出买东西而幸免。玛蒂尔达逃到隔壁的杀手里昂家中，请求他的帮助。里昂是一个专业的杀手，他孤独地生活在纽约的公寓里，只有一盆绿萝陪伴着他。起初，里昂不愿意帮助玛蒂尔达，但最终还是心软了，收留了她。玛蒂尔达决定向里昂学习如何成为一名杀手，以便为家人报仇。在相处的过程中，两人逐渐产生了深厚的感情。最终，玛蒂尔达找到了杀害她家人的凶手史丹菲尔，并引来了史丹菲尔的报复。里昂为了保护玛蒂尔达，与史丹菲尔展开了激烈的战斗，最终牺牲了自己的生命。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BOTliMTY4NGQtMDYwMi00MTU4LTk3N2ItZTYwZWYzOGYwZDE1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 85,
      rank: 85,
      title: '盗梦空间',
      originalTitle: 'Inception',
      year: 2010,
      score: 9.3,
      ratingCount: '312456',
      ratingDistribution: {
        5: '76.0%',
        4: '20.0%',
        3: '3.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '科幻, 动作, 惊悚',
      region: '美国, 英国',
      language: '英语, 日语, 法语',
      releaseDate: '2010-07-16',
      runtime: '148分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '克里斯托弗·诺兰',
      actors: '莱昂纳多·迪卡普里奥, 约瑟夫·高登-莱维特, 艾伦·佩姬',
      aka: '潜行凶间(港) / 全面启动(台)',
      imdb: 'https://www.imdb.com/title/tt1375666/',
      description:
        '多姆·柯布是一名经验丰富的盗梦者，他能够潜入人们的梦境中，窃取他们潜意识中的秘密。柯布的特殊技能使他成为了企业间谍活动中的宝贵资产，但也使他成为了国际逃犯，失去了自己的家庭。现在，柯布有了一个赎罪的机会，一个最后的任务，这个任务不是窃取想法，而是植入一个想法。如果他成功了，他将获得他渴望的救赎和自由。但这个任务充满了危险，因为他们需要深入到多层梦境中，每一层梦境都有其独特的挑战和风险。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
      id: 86,
      rank: 86,
      title: '星际穿越',
      originalTitle: 'Interstellar',
      year: 2014,
      score: 9.3,
      ratingCount: '298765',
      ratingDistribution: {
        5: '77.0%',
        4: '19.0%',
        3: '3.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '科幻, 冒险, 剧情',
      region: '美国, 英国, 加拿大',
      language: '英语',
      releaseDate: '2014-11-07',
      runtime: '169分钟',
      director: '克里斯托弗·诺兰',
      screenwriter: '乔纳森·诺兰, 克里斯托弗·诺兰',
      actors: '马修·麦康纳, 安妮·海瑟薇, 杰西卡·查斯坦',
      aka: '星际启示录(港) / 星际效应(台)',
      imdb: 'https://www.imdb.com/title/tt0816692/',
      description:
        '在不久的将来，地球面临着粮食短缺和环境恶化的危机，人类的生存受到了威胁。前NASA宇航员库珀被招募参加一项秘密任务，前往太阳系外寻找新的可居住星球。库珀和他的团队通过一个神秘的虫洞穿越到了另一个星系，开始了一段充满未知和危险的星际之旅。在旅途中，他们遇到了各种挑战和考验，包括黑洞、时间膨胀、极端环境等。同时，库珀也在与时间赛跑，他希望能够尽快完成任务，回到地球与家人团聚。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_.jpg',
    },
    {
      id: 87,
      rank: 87,
      title: '黑客帝国',
      originalTitle: 'The Matrix',
      year: 1999,
      score: 9.1,
      ratingCount: '287654',
      ratingDistribution: {
        5: '74.0%',
        4: '21.0%',
        3: '4.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '科幻, 动作, 惊悚',
      region: '美国, 澳大利亚',
      language: '英语',
      releaseDate: '1999-03-31',
      runtime: '136分钟',
      director: '莉莉·沃卓斯基, 拉娜·沃卓斯基',
      screenwriter: '莉莉·沃卓斯基, 拉娜·沃卓斯基',
      actors: '基努·里维斯, 劳伦斯·菲什伯恩, 凯瑞-安·莫斯',
      aka: '22世纪杀人网络(港) / 骇客任务(台)',
      imdb: 'https://www.imdb.com/title/tt0133093/',
      description:
        '托马斯·安德森是一名普通的计算机程序员，同时也是一名黑客，化名尼奥。一天，他收到了一系列神秘的信息，引导他找到了莫菲斯，一个反抗组织的领袖。莫菲斯告诉尼奥，他所生活的世界是一个由机器创造的虚拟世界，称为"矩阵"，而真实的世界已经被机器统治，人类成为了机器的能量来源。尼奥被认为是传说中的"救世主"，他有能力推翻机器的统治，解放人类。尼奥开始接受训练，学习如何在矩阵中使用超能力，与机器的代理人"史密斯"展开了激烈的战斗。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    },
    {
      id: 88,
      rank: 88,
      title: '千与千寻',
      originalTitle: '千と千尋の神隠し',
      year: 2001,
      score: 9.4,
      ratingCount: '302456',
      ratingDistribution: {
        5: '79.0%',
        4: '18.0%',
        3: '2.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '动画, 奇幻, 冒险',
      region: '日本',
      language: '日语',
      releaseDate: '2001-07-20',
      runtime: '125分钟',
      director: '宫崎骏',
      screenwriter: '宫崎骏',
      actors: '柊瑠美, 入野自由, 夏木真理',
      aka: '神隐少女(台)',
      imdb: 'https://www.imdb.com/title/tt0245429/',
      description:
        '10岁的少女千寻与父母一起搬家，途中迷路进入了一个神秘的隧道，来到了一个神灵世界。在这个世界里，千寻的父母因为贪吃变成了猪，而千寻也逐渐变成了透明人。为了拯救父母，千寻必须在汤屋工作，汤屋是神灵们洗澡的地方，由魔女汤婆婆统治。千寻在汤屋遇到了白龙，他帮助千寻在这个世界生存下来。在汤屋工作期间，千寻经历了各种奇遇，她学会了坚强和勇敢，也明白了爱与责任的重要性。最终，千寻成功拯救了父母，也帮助白龙找回了自己的名字和记忆。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNTE1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    },
    {
      id: 89,
      rank: 89,
      title: '机器人总动员',
      originalTitle: 'WALL·E',
      year: 2008,
      score: 9.3,
      ratingCount: '287654',
      ratingDistribution: {
        5: '76.0%',
        4: '20.0%',
        3: '3.5%',
        2: '0.3%',
        1: '0.2%',
      },
      type: '动画, 科幻, 冒险',
      region: '美国',
      language: '英语',
      releaseDate: '2008-06-27',
      runtime: '98分钟',
      director: '安德鲁·斯坦顿',
      screenwriter: '安德鲁·斯坦顿, 吉姆·里尔顿',
      actors: '本·贝尔特, 艾丽莎·奈特, 杰夫·格尔林',
      aka: '瓦力(港/台)',
      imdb: 'https://www.imdb.com/title/tt0910970/',
      description:
        '公元2805年，地球已经被人类污染得无法居住，人类被迫离开地球，乘坐飞船在太空中生活。留下了一群机器人WALL·E来清理地球的垃圾。700年后，只剩下一个WALL·E还在工作，它孤独地生活在地球上，只有一只蟑螂陪伴着它。一天，一艘飞船降落在地球上，带来了一个先进的机器人EVE，她的任务是寻找地球上是否还有生命的迹象。WALL·E对EVE一见钟情，开始跟随她。当EVE发现了一株植物后，她被召回了飞船。WALL·E也跟随她来到了飞船上，在那里，WALL·E和EVE经历了一系列冒险，最终帮助人类重新回到了地球。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0MF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_.jpg',
    },
    {
      id: 90,
      rank: 90,
      title: '寻梦环游记',
      originalTitle: 'Coco',
      year: 2017,
      score: 9.1,
      ratingCount: '298765',
      ratingDistribution: {
        5: '74.0%',
        4: '21.0%',
        3: '4.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 音乐, 奇幻',
      region: '美国',
      language: '英语, 西班牙语',
      releaseDate: '2017-11-22',
      runtime: '105分钟',
      director: '李·昂克里奇, 阿德里安·莫利纳',
      screenwriter: '李·昂克里奇, 阿德里安·莫利纳, 马修·奥尔德里奇',
      actors: '安东尼·冈萨雷斯, 盖尔·加西亚·贝纳尔, 本杰明·布拉特',
      aka: '玩转极乐园(港) / 可可夜总会(台)',
      imdb: 'https://www.imdb.com/title/tt2380307/',
      description:
        '12岁的男孩米格梦想成为一名音乐家，就像他的偶像歌神德拉库斯一样。但是他的家族却禁止他接触音乐，因为他们认为音乐给家族带来了诅咒。在亡灵节这一天，米格为了追求自己的音乐梦想，偷了歌神的吉他，结果意外穿越到了亡灵世界。在那里，米格遇到了他的祖先们，他们帮助米格寻找歌神德拉库斯，希望能够得到他的祝福，回到现实世界。在这个过程中，米格发现了一个关于家族历史的秘密，也明白了家庭和亲情的重要性。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    },
    {
      id: 91,
      rank: 91,
      title: '冰雪奇缘',
      originalTitle: 'Frozen',
      year: 2013,
      score: 8.9,
      ratingCount: '312456',
      ratingDistribution: {
        5: '68.0%',
        4: '25.0%',
        3: '6.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 音乐, 奇幻',
      region: '美国',
      language: '英语',
      releaseDate: '2013-11-27',
      runtime: '102分钟',
      director: '克里斯·巴克, 珍妮弗·李',
      screenwriter: '珍妮弗·李, 克里斯·巴克, 马克·史密斯',
      actors: '克里斯汀·贝尔, 伊迪娜·门泽尔, 乔纳森·格罗夫',
      aka: '魔雪奇缘(港) / 冰雪大冒险(台)',
      imdb: 'https://www.imdb.com/title/tt2294629/',
      description:
        '阿伦黛尔王国的两位公主艾莎和安娜是一对亲密的姐妹。艾莎拥有控制冰雪的魔法能力，但她的魔法却在一次意外中伤害了安娜。为了保护安娜，艾莎开始隐藏自己的魔法，并且与安娜逐渐疏远。在艾莎的加冕典礼上，她的魔法意外暴露，整个王国被冰雪覆盖。艾莎逃离了王国，躲进了北山的冰城堡。安娜决定前往北山寻找艾莎，在途中，她遇到了山民克里斯托夫和他的驯鹿斯文，以及一个会说话的雪人奥拉夫。他们一起踏上了冒险之旅，最终帮助艾莎控制了自己的魔法，解冻了王国，姐妹俩也重新找回了彼此的亲情。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGYtNTc1Yy00YTQ5LWEzODEtZWM2ZjU4YzkxZjNjXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg',
    },
    {
      id: 92,
      rank: 92,
      title: '疯狂动物城',
      originalTitle: 'Zootopia',
      year: 2016,
      score: 9.2,
      ratingCount: '302456',
      ratingDistribution: {
        5: '72.0%',
        4: '23.0%',
        3: '4.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 冒险, 喜剧',
      region: '美国',
      language: '英语',
      releaseDate: '2016-03-04',
      runtime: '108分钟',
      director: '拜恩·霍华德, 里奇·摩尔, 杰拉德·布什',
      screenwriter: '杰拉德·布什, 菲尔·约翰斯顿, 拜恩·霍华德',
      actors: '金妮弗·古德温, 杰森·贝特曼, 伊德里斯·艾尔巴',
      aka: '优兽大都会(港) / 动物方城市(台)',
      imdb: 'https://www.imdb.com/title/tt2948356/',
      description:
        '在一个所有哺乳类动物和平共处的美丽世界中，兔子朱迪通过自己的努力，成为了动物城警察局第一位兔子警官。为了证明自己，她决心侦破一桩神秘的案件。在调查过程中，她遇到了狡猾的骗子狐狸尼克，两人不得不联手合作，揭开了一个涉及整个动物城的惊天阴谋。在这个过程中，朱迪和尼克逐渐建立了友谊，也明白了偏见和刻板印象的危害。最终，他们成功破获了案件，维护了动物城的和平与和谐。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTc5MDM1MTY3N15BMl5BanBnXkFtZTgwNTA4MDQ3NjE@._V1_.jpg',
    },
    {
      id: 93,
      rank: 93,
      title: '哪吒之魔童降世',
      originalTitle: '哪吒之魔童降世',
      year: 2019,
      score: 8.9,
      ratingCount: '324567',
      ratingDistribution: {
        5: '69.0%',
        4: '24.0%',
        3: '6.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 奇幻, 冒险',
      region: '中国大陆',
      language: '汉语普通话',
      releaseDate: '2019-07-26',
      runtime: '110分钟',
      director: '饺子',
      screenwriter: '饺子',
      actors: '吕艳婷, 囧森瑟夫, 瀚墨',
      aka: 'Ne Zha',
      imdb: 'https://www.imdb.com/title/tt10627722/',
      description:
        '天地灵气孕育出一颗能量巨大的混元珠，元始天尊将其提炼成灵珠和魔丸，灵珠投胎为人，助周伐纣时可堪大用；而魔丸则会诞出魔王，为祸人间。元始天尊启动了天劫咒语，3年后天雷将会降临，摧毁魔丸。太乙真人受命将灵珠托生于陈塘关李靖家的儿子哪吒身上。然而阴差阳错，灵珠和魔丸竟然被掉包。本应是灵珠英雄的哪吒却成了混世大魔王，而本应是魔丸的敖丙却成了灵珠转世。哪吒虽然调皮捣蛋顽劣不堪，却有一颗做英雄的心。然而面对众人对魔丸的误解和即将来临的天雷，哪吒是否命中注定会立地成魔？他将何去何从？',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNjk4NjE3MTU3Ml5BMl5BanBnXkFtZTgwOTkwMjM4NjM@._V1_.jpg',
    },
    {
      id: 94,
      rank: 94,
      title: '你的名字。',
      originalTitle: '君の名は。',
      year: 2016,
      score: 9.2,
      ratingCount: '302456',
      ratingDistribution: {
        5: '73.0%',
        4: '22.0%',
        3: '4.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 爱情, 奇幻',
      region: '日本',
      language: '日语',
      releaseDate: '2016-08-26',
      runtime: '106分钟',
      director: '新海诚',
      screenwriter: '新海诚',
      actors: '神木隆之介, 上白石萌音, 长泽雅美',
      aka: 'Your Name.',
      imdb: 'https://www.imdb.com/title/tt5311514/',
      description:
        '在彗星造访地球的一个月前，日本深山的某个乡下小镇里，女高中生宫水三叶每天都过着忧郁的生活。她对大都市的生活充满了向往。而在东京，男高中生立花泷也过着平凡的生活。突然有一天，三叶和泷发现他们在梦中交换了身体。三叶变成了泷，在东京过着她梦寐以求的生活；泷变成了三叶，在乡下体验着她从未经历过的生活。两人开始通过日记交流，逐渐了解彼此。然而，随着彗星的临近，他们发现了一个惊人的秘密，这个秘密将威胁到他们的生命和彼此的联系。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNjQ2Ni00MGY1LWI3MDgtNzc4MzQyN2JhNmQ2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    },
    {
      id: 95,
      rank: 95,
      title: '天气之子',
      originalTitle: '天気の子',
      year: 2019,
      score: 8.5,
      ratingCount: '276543',
      ratingDistribution: {
        5: '65.0%',
        4: '25.0%',
        3: '9.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 爱情, 奇幻',
      region: '日本',
      language: '日语',
      releaseDate: '2019-07-19',
      runtime: '112分钟',
      director: '新海诚',
      screenwriter: '新海诚',
      actors: '醍醐虎汰朗, 森七菜, 小栗旬',
      aka: 'Weathering with You',
      imdb: 'https://www.imdb.com/title/tt9426210/',
      description:
        '高一那年的夏天，帆高离开老家岛屿，独自来到东京。他的生活过得很艰难，只能在快餐店打工糊口。有一天，帆高遇到了一个奇怪的女孩阳菜，她拥有一种特殊的能力，可以通过祈祷来控制天气。阳菜利用这种能力，开始为人们提供"晴天服务"，帮助他们在雨天举办户外活动。帆高和阳菜逐渐建立了深厚的感情。然而，阳菜的能力也带来了代价，她的身体正在逐渐变得透明，最终可能会消失。为了拯救阳菜，帆高做出了一个重大的决定，这个决定将改变整个东京的命运。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BN2M1ZWQwOGUtZDI3OC00MWJhLTlkYWMtNjA3ODUxNmE3N2E3XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg',
    },
    {
      id: 96,
      rank: 96,
      title: '阿凡达',
      originalTitle: 'Avatar',
      year: 2009,
      score: 8.8,
      ratingCount: '312456',
      ratingDistribution: {
        5: '70.0%',
        4: '23.0%',
        3: '6.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '科幻, 动作, 冒险',
      region: '美国',
      language: '英语, 纳美语',
      releaseDate: '2009-12-18',
      runtime: '162分钟',
      director: '詹姆斯·卡梅隆',
      screenwriter: '詹姆斯·卡梅隆',
      actors: '萨姆·沃辛顿, 佐伊·索尔达娜, 西格妮·韦弗',
      aka: '天神下凡(港) / 神之化身(台)',
      imdb: 'https://www.imdb.com/title/tt0499549/',
      description:
        '在2154年，人类为了获取潘多拉星球上的稀有资源"不可得"，开始了对该星球的殖民。由于潘多拉星球的环境对人类有害，人类创造了一种名为"阿凡达"的生物，它们是人类DNA和潘多拉星球上的原住民纳美人DNA的混合体。前海军陆战队员杰克·萨利因为双腿瘫痪，被招募来控制一个阿凡达，以说服纳美人离开他们的家园。然而，当杰克与纳美人接触后，他逐渐爱上了这个星球和它的文化，也爱上了纳美人公主奈蒂莉。最终，杰克站在了纳美人一边，与人类展开了一场保卫潘多拉星球的战争。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTgtNTczMC00N2E3LWJhMTMtZTI3MTcyNTNiNTc1XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
    },
    {
      id: 97,
      rank: 97,
      title: '哈利·波特与魔法石',
      originalTitle: "Harry Potter and the Philosopher's Stone",
      year: 2001,
      score: 9.0,
      ratingCount: '298765',
      ratingDistribution: {
        5: '71.0%',
        4: '23.0%',
        3: '5.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '奇幻, 冒险',
      region: '英国, 美国',
      language: '英语',
      releaseDate: '2001-11-16',
      runtime: '152分钟',
      director: '克里斯·哥伦布',
      screenwriter: '史蒂夫·克洛夫斯, J·K·罗琳',
      actors: '丹尼尔·雷德克里夫, 艾玛·沃森, 鲁伯特·格林特',
      aka: '哈利波特：神秘的魔法石(港/台)',
      imdb: 'https://www.imdb.com/title/tt0241527/',
      description:
        '11岁的哈利·波特从小被寄养在姨父姨妈家，受尽了他们的虐待。在他11岁生日那天，他收到了霍格沃茨魔法学校的录取通知书，得知自己是一名巫师。哈利·波特来到霍格沃茨，开始了他的魔法学习之旅。在学校里，他结识了赫敏·格兰杰和罗恩·韦斯莱这两个好朋友。他们发现了一个关于魔法石的秘密，魔法石是一种可以制造长生不老药的神奇石头，被藏在霍格沃茨学校里。哈利·波特和他的朋友们必须阻止黑魔王伏地魔的追随者得到魔法石，因为伏地魔想要利用魔法石恢复自己的力量。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGI4YjkyXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg',
    },
    {
      id: 98,
      rank: 98,
      title: '哈利·波特与死亡圣器(下)',
      originalTitle: 'Harry Potter and the Deathly Hallows: Part 2',
      year: 2011,
      score: 9.2,
      ratingCount: '287654',
      ratingDistribution: {
        5: '74.0%',
        4: '22.0%',
        3: '3.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '奇幻, 冒险',
      region: '英国, 美国',
      language: '英语',
      releaseDate: '2011-07-15',
      runtime: '130分钟',
      director: '大卫·叶茨',
      screenwriter: '史蒂夫·克洛夫斯, J·K·罗琳',
      actors: '丹尼尔·雷德克里夫, 艾玛·沃森, 鲁伯特·格林特',
      aka: '哈利波特：死神的圣物(下)(港/台)',
      imdb: 'https://www.imdb.com/title/tt1201607/',
      description:
        '哈利·波特、赫敏·格兰杰和罗恩·韦斯莱继续他们的冒险，寻找并摧毁伏地魔的魂器。他们回到霍格沃茨学校，与伏地魔的军队展开了最终的决战。在这场决战中，许多巫师和女巫失去了生命，但哈利·波特最终战胜了伏地魔，拯救了魔法世界。影片改编自J·K·罗琳的同名小说，是哈利·波特系列电影的最后一部，为整个系列画上了一个圆满的句号。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwMzA4MDU4OA@@._V1_.jpg',
    },
    {
      id: 99,
      rank: 99,
      title: '狮子王',
      originalTitle: 'The Lion King',
      year: 1994,
      score: 9.1,
      ratingCount: '298765',
      ratingDistribution: {
        5: '72.0%',
        4: '22.0%',
        3: '5.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 冒险, 音乐',
      region: '美国',
      language: '英语',
      releaseDate: '1994-06-24',
      runtime: '88分钟',
      director: '罗杰·艾勒斯, 罗伯·明可夫',
      screenwriter: '艾琳·梅琪, 乔纳森·罗伯特, 琳达·沃尔夫顿',
      actors: '乔纳森·泰勒·托马斯, 马修·布罗德里克, 詹姆斯·厄尔·琼斯',
      aka: '狮子王(港/台)',
      imdb: 'https://www.imdb.com/title/tt0110357/',
      description:
        '在非洲的荣耀石，狮子王木法沙和王后沙拉碧生下了小王子辛巴。辛巴的叔叔刀疤因为嫉妒木法沙的王位，设计害死了木法沙，并让辛巴以为是自己害死了父亲，从而迫使辛巴逃离了荣耀石。辛巴在逃离的过程中，遇到了疣猪彭彭和猫鼬丁满，他们教会了辛巴"哈库那玛塔塔"的生活哲学。多年后，辛巴长成了一只强壮的狮子，他遇到了童年的朋友娜娜，娜娜告诉他刀疤统治下的荣耀石已经变得一片荒凉。辛巴在父亲的灵魂的指引下，决定回到荣耀石，挑战刀疤的统治。最终，辛巴战胜了刀疤，成为了新的狮子王，荣耀石也恢复了往日的繁荣。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWJjNjMtNmNlMDJjYzNjMjc1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
    },
    {
      id: 100,
      rank: 100,
      title: '百变狸猫',
      originalTitle: '平成狸合戦ぽんぽこ',
      year: 1994,
      score: 8.6,
      ratingCount: '276543',
      ratingDistribution: {
        5: '66.0%',
        4: '25.0%',
        3: '8.0%',
        2: '0.8%',
        1: '0.2%',
      },
      type: '动画, 奇幻, 喜剧',
      region: '日本',
      language: '日语',
      releaseDate: '1994-07-16',
      runtime: '119分钟',
      director: '宫崎骏',
      screenwriter: '宫崎骏, 高畑勋',
      actors: '古今亭志ん生, 古馆伊知郎, 三木纪平',
      aka: '平成狸合战(港/台) / Pom Poko',
      imdb: 'https://www.imdb.com/title/tt0110008/',
      description:
        '在日本的东京郊区，一群狸猫为了保护自己的家园，与人类展开了一场"战争"。随着城市的扩张，狸猫们的栖息地被不断破坏，它们的生存受到了严重的威胁。为了阻止人类的开发，狸猫们决定使用它们的变身能力，变成各种形态来吓唬人类，希望能够让人类停止开发。在这个过程中，狸猫们经历了许多有趣和感人的故事，也明白了保护环境的重要性。最终，狸猫们虽然没有完全阻止人类的开发，但它们找到了新的生存方式，与人类和谐共处。',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTU2MDk5MzA3OV5BMl5BanBnXkFtZTcwMzI1MTY5MQ@@._V1_.jpg',
    },
  ]

  const movie = movies.find((m) => m.id === parseInt(id))
  if (movie) {
    movieDetail.value = movie
  }
}

// 组件挂载时获取电影详情
onMounted(() => {
  fetchMovieDetail(movieId.value)
})
</script>

<style scoped>
:root {
  --imdb-bg-primary: #121212;
  --imdb-bg-secondary: #1e1e1e;
  --imdb-accent-gold: #f5c518;
  --imdb-text-primary: #ffffff;
  --imdb-text-secondary: #b3b3b3;
  --imdb-border-color: #333333;
}

/* 整体布局 */
.movie-detail {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--imdb-bg-primary);
  color: var(--imdb-text-primary);
}

/* 头部导航：IMDB风格 - 与首页保持一致 */
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
  flex: 1;
  padding: 30px 0;
  min-height: calc(100vh - 180px);
}

.content-container {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
}

/* 面包屑导航 */
.breadcrumb {
  margin-bottom: 20px;
  font-size: 12px;
}

.breadcrumb .el-breadcrumb__item__inner {
  color: var(--imdb-text-secondary);
}

.breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
  color: var(--imdb-accent-gold);
}

/* 电影信息 */
.movie-info {
  background-color: var(--imdb-bg-secondary);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--imdb-border-color);
}

/* 海报区域 */
.poster-col {
  margin-bottom: 20px;
}

.poster-container {
  text-align: center;
  position: relative;
}

.movie-poster {
  width: 100%;
  max-width: 200px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.movie-poster:hover {
  transform: translateY(-4px);
}

.poster-actions {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  width: 100%;
  font-size: 12px;
  padding: 6px 0;
  border-color: var(--imdb-accent-gold);
  color: var(--imdb-accent-gold);
}

.action-btn:hover {
  background-color: rgba(245, 197, 24, 0.1);
  border-color: var(--imdb-accent-gold);
  color: var(--imdb-accent-gold);
}

/* 排名标签 */
.rank-tag {
  display: inline-block;
  background-color: var(--imdb-accent-gold);
  color: var(--imdb-bg-primary);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* 电影标题 */
.movie-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--imdb-text-primary);
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.original-title {
  font-size: 18px;
  font-weight: 400;
  color: var(--imdb-text-secondary);
  margin-left: 12px;
}

/* 评分区域 */
.score-section {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--imdb-border-color);
}

.score-card {
  text-align: center;
}

.score-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--imdb-accent-gold);
  margin-bottom: 8px;
}

.score-stars {
  margin-bottom: 4px;
}

.score-stars .el-rate__icon {
  color: var(--imdb-accent-gold);
}

.score-count {
  font-size: 12px;
  color: var(--imdb-text-secondary);
}

.rating-distribution {
  flex: 1;
  min-width: 200px;
}

.rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
}

.rating-label {
  width: 40px;
  color: var(--imdb-text-secondary);
}

/* 评分条形图 */
.rating-bar {
  flex: 1;
  height: 16px;
  background-color: #444444;
  border-radius: 8px;
  margin: 0 10px;
  overflow: hidden;
  display: block;
}

.rating-fill {
  height: 100%;
  background-color: #ff0000;
  border-radius: 8px;
  transition: width 0.3s ease;
  min-width: 4px;
  display: block;
}

.rating-percent {
  color: var(--imdb-text-secondary);
  width: 50px;
  text-align: right;
}

/* 操作按钮组 */
.action-buttons {
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-buttons .el-button {
  border-color: var(--imdb-accent-gold);
  color: var(--imdb-accent-gold);
}

.action-buttons .el-button:hover {
  background-color: rgba(245, 197, 24, 0.1);
  border-color: var(--imdb-accent-gold);
  color: var(--imdb-accent-gold);
}

/* 电影元数据 */
.movie-meta {
  margin-bottom: 24px;
}

.meta-row {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
}

.meta-label {
  width: 100px;
  color: var(--imdb-text-secondary);
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
}

.meta-value {
  color: var(--imdb-text-primary);
  font-size: 14px;
  flex: 1;
  line-height: 1.4;
}

.meta-value a {
  color: var(--imdb-accent-gold);
  text-decoration: none;
}

.meta-value a:hover {
  text-decoration: underline;
}

/* 剧情简介 */
.movie-desc-section {
  margin-bottom: 30px;
  padding: 24px;
  background-color: var(--imdb-bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--imdb-border-color);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--imdb-text-primary);
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--imdb-border-color);
  margin-left: 16px;
}

.desc-content {
  line-height: 1.6;
  color: var(--imdb-text-primary);
}

.desc-paragraph {
  margin-bottom: 16px;
  font-size: 14px;
}

.desc-paragraph:last-child {
  margin-bottom: 0;
}

/* 点评功能 */
.review-section {
  margin-bottom: 30px;
}

.review-card {
  background-color: var(--imdb-bg-secondary);
  border: 1px solid var(--imdb-border-color);
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-header .section-title {
  margin: 0;
}

.review-card .el-rate__icon {
  color: var(--imdb-accent-gold);
}

.review-card .el-input__textarea {
  background-color: var(--imdb-bg-primary);
  border-color: var(--imdb-border-color);
  color: var(--imdb-text-primary);
}

.review-card .el-input__textarea:focus {
  border-color: var(--imdb-accent-gold);
  box-shadow: 0 0 0 2px rgba(245, 197, 24, 0.2);
}

.review-actions {
  margin-top: 16px;
  text-align: right;
}

.review-actions .el-button {
  background-color: var(--imdb-accent-gold);
  border-color: var(--imdb-accent-gold);
  color: var(--imdb-bg-primary);
  font-weight: 500;
}

.review-actions .el-button:hover {
  background-color: #e0b416;
  border-color: #e0b416;
  color: var(--imdb-bg-primary);
}

/* 评价列表 */
.comments-section {
  margin-bottom: 30px;
}

.comments-card {
  background-color: var(--imdb-bg-secondary);
  border: 1px solid var(--imdb-border-color);
  border-radius: 8px;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-header .section-title {
  margin: 0;
}

.comments-card .el-select {
  width: 150px;
}

.comments-card .el-select .el-input__wrapper {
  background-color: var(--imdb-bg-primary);
  border-color: var(--imdb-border-color);
}

.comments-card .el-select .el-input__wrapper:hover {
  border-color: var(--imdb-accent-gold);
}

.comments-card .el-select .el-input__inner {
  color: var(--imdb-text-primary);
}

.comments-list {
  margin-top: 16px;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--imdb-border-color);
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-user {
  font-weight: 500;
  color: var(--imdb-accent-gold);
  margin-right: 12px;
}

.comment-time {
  font-size: 12px;
  color: var(--imdb-text-secondary);
  margin-right: 16px;
}

.comment-header .el-rate__icon {
  color: var(--imdb-accent-gold);
  font-size: 14px;
}

.comment-content {
  color: var(--imdb-text-primary);
  line-height: 1.5;
  font-size: 14px;
}

.no-comments {
  padding: 40px 0;
  text-align: center;
}

.no-comments .el-empty__description {
  color: var(--imdb-text-secondary);
}

/* 底部 */
.footer {
  background-color: var(--imdb-bg-secondary);
  border-top: 1px solid var(--imdb-border-color);
  padding: 30px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  color: var(--imdb-text-secondary);
  font-size: 14px;
}

.footer-content p {
  margin: 8px 0;
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .content-container {
    max-width: 960px;
  }

  .movie-title {
    font-size: 28px;
  }
}

@media screen and (max-width: 992px) {
  .content-container {
    max-width: 720px;
  }

  .movie-title {
    font-size: 24px;
  }

  .score-section {
    flex-direction: column;
    gap: 20px;
  }
}

@media screen and (max-width: 768px) {
  .content-container {
    max-width: 540px;
  }

  .movie-title {
    font-size: 20px;
  }

  .original-title {
    font-size: 16px;
  }

  .score-value {
    font-size: 24px;
  }

  .movie-info {
    padding: 16px;
  }

  .movie-desc-section {
    padding: 16px;
  }
}

@media screen and (max-width: 480px) {
  .content-container {
    max-width: 100%;
    padding: 0 16px;
  }

  .movie-title {
    font-size: 18px;
  }

  .original-title {
    font-size: 14px;
    display: block;
    margin-left: 0;
    margin-top: 8px;
  }

  .score-section {
    gap: 16px;
  }

  .score-value {
    font-size: 20px;
  }

  .meta-row {
    flex-direction: column;
  }

  .meta-label {
    width: 100%;
    margin-bottom: 4px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .action-buttons .el-button {
    width: 100%;
  }
}
</style>
