"use strict";

window.SPARKS_CONTENT = {
  nav: [
    { route: "home", label: "发现" },
    { route: "assets", label: "素材" },
    { route: "community", label: "创作者" },
    { route: "support", label: "支持" }
  ],
  secondaryNav: [
    { route: "detail", label: "素材详情", icon: "image_search" },
    { route: "creator", label: "创作者主页", icon: "account_circle" },
    { route: "creator-onboarding", label: "成为创作者", icon: "group_add" },
    { route: "account", label: "个人主页", icon: "badge" },
    { route: "upload", label: "上传发布", icon: "upload" },
    { route: "auth", label: "登录注册", icon: "passkey" },
    { route: "licensing", label: "购买授权", icon: "license" },
    { route: "downloads", label: "下载中心", icon: "download" },
    { route: "membership", label: "积分会员", icon: "workspace_premium" },
    { route: "admin", label: "审核后台", icon: "admin_panel_settings" },
    { route: "search", label: "搜索结果", icon: "travel_explore" },
    { route: "collections", label: "收藏夹", icon: "folder_special" },
    { route: "project", label: "项目夹详情", icon: "folder_open" }
  ],
  home: {
    eyebrow: "Specialized Success System Strategy Support Sparks",
    title: "S-parks 影像社区",
    accent: "创作者专享",
    intro: "为 AIGC 视频创作者提供角色、服装、场景、道具和提示词参考素材，让抽卡式创作变成可检索、可收藏、可授权的专业流程。",
    actions: [
      { label: "注册 / 登录", style: "primary", route: "auth", icon: "arrow_forward" },
      { label: "游客访问", style: "secondary", route: "assets" }
    ],
    valueCards: [
      { title: "素材共享", text: "把未进入正片的高质量素材沉淀为可再次售卖的资产。" },
      { title: "创作分成", text: "创作者通过上传、授权和会员积分流转获得收益。" },
      { title: "方便高效", text: "先看图、再筛选、最后复制提示词或购买素材。" }
    ],
    creators: [
      {
        id: "elena-voss",
        name: "Elena Voss",
        role: "电影级艺术专家",
        bio: "擅长超现实建筑电影景观生成。",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2uQGrYC9t7Qzyf_3ftO8u2S1_5SIJqht0Qx8mFeceKqjX9DYzNrWcvOkvB3-oZWY6_08ULVd_90s6ldfysS3zCdxGDHfUEd5uAkWZsqapO_z9tgr8_oVtWugWff4b3kYVKbGajxXz_niK0IC55kQpEbyBIlEfE2JrUTkHgKttvmy8haghqIOgLsfsFlQhfxWzkfxjl0BOSTX-tnD9dBt5EZ75oST7ForgY7MQwe86KZzAyu23wCcfsazAfutDkAQlnEY-oTTMcu8s"
      },
      {
        id: "marcus-thorne",
        name: "Marcus Thorne",
        role: "动效设计师",
        bio: "探索 AI 动画中的时间一致性边界。",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClllIkti7dVJlDhmjrfUsm_BYJ3ovUvsy4DBcceIqXae0RfhraoHQ9ErDhv4PdKHRJVQNVyawbP5aSUwOKkC5PNcpIt84HDY4XIudup6-JBbULnPmPmI3pXnAKwkWPFceFWykyLXHb2Al4HD39J4KtLl_OQ0b2HoGID2esfR_EXaOFl3a2Bkv_YOC8kJisuEcFCdFch9ofPUXMijbHOBbHrFzRfRQez86GtOoHo2dS_BCbwkKuOwF-IwZOYqfB0c1MQqnIZCZmxfpz"
      },
      {
        id: "aria-jin",
        name: "Aria Jin",
        role: "分镜师 AI",
        bio: "通过提示词工程实现一致的叙事序列生成。",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6faf56I5pihVezeYVoWFIjr23UebGjKG4UNEpf8COKtXTyvojr3UlRu7PhLN_zx54zhTSa3MylV1h7sPjB6PCVUKAhZSORuQuD2Xe37o_IcfhmBCi968F93A-1i6NHuOyLyP9sE7gczUtXyMLMkXZ7ArL2JBr3MHDMahY5PA7k4bpWS0wwB_DFHptnr6mCl9Py1-7nhVVJkm6xooOHUAUIC-EU76I0gWHYihQ73_nSalsJjhDbCmpM_qgVOpgg64ytOuPefl4cxX-"
      }
    ],
    trending: [
      { id: "samurai-triptych", name: "武士三视图", meta: "人物三视图 • 可商用待审核", route: "detail", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMl-LzABzOoeFIT8dCS3WnkYv2hew--xAypkY6L4uQh-rzZcRdC0r-kcHYTJB2r6EhgYf0zmrPCZ0VBOw9DLWE8uDcJZgb_LRTf7emg-hedxv4BNakWzwetL5HUdqGSrVHgskgqySoYlNnNO7IeHYAIR9F7nWclIgw6jRcKy25AQsOglJLSwGPipsihhIp__xNDlGLxmgoKNWSINu_7zoiOVMRTYXCdBKWreBkz68y3hEroOPg-BnEeAkmegncHZzdVaqzDWBUIx0D" },
      { id: "river-dusk-suite", name: "日落河边场景组", meta: "日 / 夜 / 黄昏切换", route: "detail", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7903EgQexH-toZ4gGQjOCuBJNX4p301odfJoiKFhAHnMV-m8GNiGcqhBxKWhTyqH3GmKfehnEY_aezQPLiVzeiN-rr6i2XsqkKXpAbhOg6Vwq0A_6OdxfU5lh5nXFu0q_Xbdngbp_DQJxGAKNDwh9kB85FvpE05rKhlOQz1Ahlk4s6Qf4ECPgxkCtun-WC7D7WM5l421sZKYImigRdPBI6CON1c-fZgc4FTgTvLg6qhUri2hPmkVTaJ9Qk0Ir8RdBcnx8ta9T6fah" },
      { id: "han-robe-look", name: "汉人服装造型", meta: "古风服装 • 写实组", route: "detail", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXH3xM75SyT5jyNmXQ-jn8g_BZFPZUSZ_bIL2TIzuMwXxxzaVxCUQk-6CnxwNWIOnBwtiiYj_w-n7mQbk8oSqoEsEO1OAWiZkBrjGippRdEPj9yU54iX1T1hSq1oCz4ztNjg1ndVN0eEbWvxfolYHIS5r8f-K8qGByo5TPHYjzKXojnumzaCcTXf_DCz3vx0oAgpZg0e-2WNu2vOhxMMbESSap_Yaxd59w056m7K3rYXPwAdAL-oVVHz8dqhFMn0k4OdGyP2AFp3a" },
      { id: "terminal-mk2", name: "Terminal MK-II", meta: "道具参考 • OBJ", route: "detail", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB82r5i5VkcP5DEKmB7NFFcKAjrcbQomRX7yle7cj31mWeETTWcz2ygMWIPGtUZUAp57BF3iqUJExOMDofvxGmnCTgvqxskPv4680BRQTKWFB2llC8H0hgL1H1T35-qQupQM1ctgxCMHD3AHaiAWCb8UuQwKIUHbOTXm17z9c52hzNIY7ULwC1SJflKHpF7HPe0IqeR5Dztu8XzYq8lnfTi47_2V61eIJ-5wu8ZgPjFWYbG6L2-G4BjGHHe8pMbMaou1vo4sXzC1rr" }
    ]
  },
  assets: {
    title: "素材库",
    subtitle: "参考 ShotDeck 式克制网格，把角色三视图、场景图、服装造型和道具资产统一为可搜索的 AIGC 视频素材库。",
    filters: ["人物三视图", "场景图", "服装造型", "道具", "Prompt"],
    facets: ["分类", "风格", "光线", "色彩", "年代", "授权状态"],
    items: [
      { id: "samurai-triptych", name: "武士角色三视图", meta: "正面 / 侧面 / 背面", category: "人物三视图", price: "120 积分", creator: "Elena Voss", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs2rPZzfnkJY6m1Pzhc8LoHsJcG2j-YLlMHKZWXaRp1CylamFt09bLrWb25XIi2bUD8jFDs2u0frXhIeDjuNHboJl50XR3InuCNbIY11Le_LHSmx02laCpECT55iW2KXaAcRaME_ykfrVVFyLlpjfFClug_QQJy1wBxql1M_b_JK1xutMjmGqaTWgguVl4Zygn2WpRv_XO0a8vQ4e_19LGR-0SJNhcci7QYTsrBebCZpQo1jPjXh_CgGSIs0UquUt9z0yYcsbx0gZQ" },
      { id: "river-dusk-suite", name: "日落河边场景组", meta: "日 / 夜 / 黄昏", category: "场景图", price: "180 积分", creator: "Marcus Thorne", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD50KCrw5wVryhxpMfaEmggeX1cBZMU1s4VdF3pI0A_dOPNgoxKioXnbicvkC6UBrZjxYK0oeq91HB8HHcJWYRE5JX42wXpEzTVGYvjemArJ5kmbP3vp7LsDrTV6ktJC4M808uvOO7Esv5oSsWPFnApB8kF2uvMRizXsHn9nAtgS1A1oI9hUBmSu879hX12I-1pXgwg9pT3_kwNxxvKm3o--GzuMKek95P8-VXlktSglX1znYPlJehDqi8cs-V41eHbyUehNo5fwCc4" },
      { id: "han-robe-look", name: "汉人服装造型", meta: "古风 / 写实 / 长袍", category: "服装造型", price: "90 积分", creator: "Aria Jin", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXH3xM75SyT5jyNmXQ-jn8g_BZFPZUSZ_bIL2TIzuMwXxxzaVxCUQk-6CnxwNWIOnBwtiiYj_w-n7mQbk8oSqoEsEO1OAWiZkBrjGippRdEPj9yU54iX1T1hSq1oCz4ztNjg1ndVN0eEbWvxfolYHIS5r8f-K8qGByo5TPHYjzKXojnumzaCcTXf_DCz3vx0oAgpZg0e-2WNu2vOhxMMbESSap_Yaxd59w056m7K3rYXPwAdAL-oVVHz8dqhFMn0k4OdGyP2AFp3a" },
      { id: "terminal-mk2", name: "Terminal MK-II", meta: "OBJ • 8K Maps", category: "道具", price: "60 积分", creator: "Marcus Thorne", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB82r5i5VkcP5DEKmB7NFFcKAjrcbQomRX7yle7cj31mWeETTWcz2ygMWIPGtUZUAp57BF3iqUJExOMDofvxGmnCTgvqxskPv4680BRQTKWFB2llC8H0hgL1H1T35-qQupQM1ctgxCMHD3AHaiAWCb8UuQwKIUHbOTXm17z9c52hzNIY7ULwC1SJflKHpF7HPe0IqeR5Dztu8XzYq8lnfTi47_2V61eIJ-5wu8ZgPjFWYbG6L2-G4BjGHHe8pMbMaou1vo4sXzC1rr" },
      { id: "mecha-hangar-bay", name: "机甲机库场景", meta: "机库 / 冷色 / 体积光", category: "场景图", price: "160 积分", creator: "Marcus Thorne", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdH6WyohXnESBdFJDLR6riqwabx1rze5pixbieeJ_Bf23L_wQJ7l8dS5IO-J_p9ZV27-fHokgkr5AYMv8HXTAzmHNeVpJpeBwVQ8beVxzrtTQwE7PDJy7PAFH-HOGicr9gd0Fg8LnQCNgdAJ98LSHaEvJ3sVKZ8h_sAsMAi1yJr_j86MVBahKXce_kFxxhLTbdu15iVb1LhNTbmm6uFisLrJdVeFpr7-0Xc1IQU7cM5qXBbPJv6oCZSs7jbotmvDyyba4JELTIs_FG" },
      { id: "orbital-shuttle", name: "轨道穿梭机", meta: "载具 / 硬表面 / 展示台", category: "道具", price: "140 积分", creator: "Elena Voss", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANCDkIh8-bQbWpNLM0ixlhJcCz5oJuBBX2e5qAAVY7QlHeCNsvIz_OW1FP9RddaZCfm57n287yQ2ozeAxkMQbuVSdBCBQ8qqsvbrJvQb8VpsbETIdXROOuAjdooEoWLT782n_DWTO04tDagI2buMMr7-5CqpHGCg_vageoAbkplKL0pgwbQBdrhWTiiReDplww7656DGqks2UBAIoelU2wTl_kpresb3nvGavrKl7Gd1X66ebC1L6bftI8fSNleDEVrvuEMQnBdG_M" },
      { id: "neo-alley-sequence", name: "霓虹街巷序列", meta: "城市 / 雨夜 / 长镜头", category: "场景图", price: "150 积分", creator: "Aria Jin", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7903EgQexH-toZ4gGQjOCuBJNX4p301odfJoiKFhAHnMV-m8GNiGcqhBxKWhTyqH3GmKfehnEY_aezQPLiVzeiN-rr6i2XsqkKXpAbhOg6Vwq0A_6OdxfU5lh5nXFu0q_Xbdngbp_DQJxGAKNDwh9kB85FvpE05rKhlOQz1Ahlk4s6Qf4ECPgxkCtun-WC7D7WM5l421sZKYImigRdPBI6CON1c-fZgc4FTgTvLg6qhUri2hPmkVTaJ9Qk0Ir8RdBcnx8ta9T6fah" },
      { id: "storyboard-epsilon", name: "Epsilon 分镜脚本", meta: "剧情板 / 过场 / 节奏设计", category: "Prompt", price: "85 积分", creator: "Aria Jin", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6faf56I5pihVezeYVoWFIjr23UebGjKG4UNEpf8COKtXTyvojr3UlRu7PhLN_zx54zhTSa3MylV1h7sPjB6PCVUKAhZSORuQuD2Xe37o_IcfhmBCi968F93A-1i6NHuOyLyP9sE7gczUtXyMLMkXZ7ArL2JBr3MHDMahY5PA7k4bpWS0wwB_DFHptnr6mCl9Py1-7nhVVJkm6xooOHUAUIC-EU76I0gWHYihQ73_nSalsJjhDbCmpM_qgVOpgg64ytOuPefl4cxX-" },
      { id: "architectural-atrium", name: "极简中庭结构包", meta: "建筑 / 白模 / 透视参考", category: "场景图", price: "110 积分", creator: "Elena Voss", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2uQGrYC9t7Qzyf_3ftO8u2S1_5SIJqht0Qx8mFeceKqjX9DYzNrWcvOkvB3-oZWY6_08ULVd_90s6ldfysS3zCdxGDHfUEd5uAkWZsqapO_z9tgr8_oVtWugWff4b3kYVKbGajxXz_niK0IC55kQpEbyBIlEfE2JrUTkHgKttvmy8haghqIOgLsfsFlQhfxWzkfxjl0BOSTX-tnD9dBt5EZ75oST7ForgY7MQwe86KZzAyu23wCcfsazAfutDkAQlnEY-oTTMcu8s" },
      { id: "console-array-pro", name: "控制台阵列 Pro", meta: "终端 / UI 灯效 / 控制室", category: "道具", price: "95 积分", creator: "Marcus Thorne", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB82r5i5VkcP5DEKmB7NFFcKAjrcbQomRX7yle7cj31mWeETTWcz2ygMWIPGtUZUAp57BF3iqUJExOMDofvxGmnCTgvqxskPv4680BRQTKWFB2llC8H0hgL1H1T35-qQupQM1ctgxCMHD3AHaiAWCb8UuQwKIUHbOTXm17z9c52hzNIY7ULwC1SJflKHpF7HPe0IqeR5Dztu8XzYq8lnfTi47_2V61eIJ-5wu8ZgPjFWYbG6L2-G4BjGHHe8pMbMaou1vo4sXzC1rr" }
    ],
    scenes: [
      { name: "竹林夜景", meta: "室外 • 冷色 • 武侠" },
      { name: "日落河边", meta: "黄昏 • 暖色 • 古风" },
      { name: "霓虹街角", meta: "夜景 • 赛博朋克" },
      { name: "精神山脉 Alpha", meta: "超宽 32:9 全景环境" }
    ]
  },
  details: {
    "samurai-triptych": {
      title: "武士角色三视图",
      subtitle: "围绕角色一致性设计的完整三视图素材，适合角色设定、服装统一和镜头前置测试。",
      creatorId: "elena-voss",
      price: "120 积分",
      tags: ["人物三视图", "古风", "武士", "服装", "正侧背"],
      prompt: "cinematic ancient warrior character sheet, front side back view, detailed costume, neutral pose, high consistency",
      panels: ["正面", "侧面", "背面", "服装细节", "表情参考", "动作参考"],
      similar: ["han-robe-look", "river-dusk-suite"],
      stats: [
        { label: "一致性评分", value: "92 / 100" },
        { label: "已购项目", value: "18 个" },
        { label: "推荐用途", value: "角色设定" }
      ],
      notes: ["适合先锁定角色正侧背，再延展动作和表情。", "服装细节已经适合进入短剧角色统一阶段。"]
    },
    "river-dusk-suite": {
      title: "日落河边场景组",
      subtitle: "同一构图下的日景、黄昏、夜景三时段切换，适合剧情过场与情绪统一。",
      creatorId: "marcus-thorne",
      price: "180 积分",
      tags: ["场景图", "古风", "日夜切换", "河边", "镜头环境"],
      prompt: "riverside cinematic environment, same framing, daylight dusk night variants, atmospheric consistency, wide shot",
      panels: ["日景构图", "黄昏情绪", "夜景反差", "机位说明", "色彩脚本", "相似环境"],
      similar: ["samurai-triptych", "terminal-mk2"],
      stats: [
        { label: "时间变体", value: "3 组" },
        { label: "已购项目", value: "11 个" },
        { label: "推荐用途", value: "剧情过场" }
      ],
      notes: ["同机位时间切换适合节省反复抽卡。", "黄昏版本适合作为情绪高潮段落的视觉基底。"]
    },
    "han-robe-look": {
      title: "汉人服装造型",
      subtitle: "偏写实的古风服装造型组合，适合人物定装和风格统一。",
      creatorId: "aria-jin",
      price: "90 积分",
      tags: ["服装造型", "古风", "写实", "长袍", "角色定装"],
      prompt: "ancient hanfu costume design sheet, realistic fabrics, silhouette variants, front details, cinematic styling",
      panels: ["主造型", "布料纹理", "肩颈细节", "腰封变化", "配色替换", "搭配建议"],
      similar: ["samurai-triptych", "river-dusk-suite"],
      stats: [
        { label: "造型变体", value: "6 组" },
        { label: "已购项目", value: "7 个" },
        { label: "推荐用途", value: "服装统一" }
      ],
      notes: ["更适合作为主角和群演的定装参考基底。", "建议和角色三视图搭配购买。"]
    },
    "terminal-mk2": {
      title: "Terminal MK-II",
      subtitle: "适合赛博空间或控制室镜头的硬表面道具参考，带模型规格说明。",
      creatorId: "marcus-thorne",
      price: "60 积分",
      tags: ["道具", "赛博朋克", "终端", "硬表面", "控制台"],
      prompt: "futuristic terminal prop, hard surface design, cinematic control room object, moody lighting, clean topology reference",
      panels: ["正视图", "结构拆解", "按钮布局", "材质说明", "使用场景", "模型规格"],
      similar: ["river-dusk-suite", "han-robe-look"],
      stats: [
        { label: "结构模块", value: "4 层" },
        { label: "已购项目", value: "5 个" },
        { label: "推荐用途", value: "控制室镜头" }
      ],
      notes: ["适合与赛博环境和控制室场景打包使用。", "更偏概念参考，正式商用前建议补更多视角。"]
    },
    "mecha-hangar-bay": {
      title: "机甲机库场景",
      subtitle: "冷色工业机库与体积光结合，适合机甲出场、维修与调度镜头。",
      creatorId: "marcus-thorne",
      price: "160 积分",
      tags: ["场景图", "机库", "冷色", "体积光", "工业"],
      prompt: "mecha hangar interior, volumetric light, cold industrial bay, cinematic scene reference, wide angle",
      panels: ["主机库", "侧视机位", "吊装区", "维修台", "灯光脚本", "材质说明"],
      similar: ["terminal-mk2", "river-dusk-suite"],
      stats: [
        { label: "机位变体", value: "5 组" },
        { label: "已购项目", value: "13 个" },
        { label: "推荐用途", value: "机甲出场" }
      ],
      notes: ["适合搭配硬表面道具与机甲角色。", "可直接用于高压工业氛围段落。"]
    },
    "orbital-shuttle": {
      title: "轨道穿梭机",
      subtitle: "带展示台和多角度参考的科幻穿梭机资产，适合载具特写与片头展示。",
      creatorId: "elena-voss",
      price: "140 积分",
      tags: ["道具", "载具", "科幻", "穿梭机", "硬表面"],
      prompt: "orbital shuttle concept, hard surface spacecraft, studio display platform, cinematic product showcase",
      panels: ["主视角", "尾部推进", "俯视", "展示台", "材质脚本", "比例参考"],
      similar: ["terminal-mk2", "mecha-hangar-bay"],
      stats: [
        { label: "视角数量", value: "6 组" },
        { label: "已购项目", value: "9 个" },
        { label: "推荐用途", value: "载具展示" }
      ],
      notes: ["适合片头载具展示和转场建立镜头。", "硬表面细节足够支持近景裁切。"]
    },
    "neo-alley-sequence": {
      title: "霓虹街巷序列",
      subtitle: "连续雨夜街巷镜头素材，适合都市赛博与潜行叙事。",
      creatorId: "aria-jin",
      price: "150 积分",
      tags: ["场景图", "霓虹", "街巷", "雨夜", "都市"],
      prompt: "neon alley cinematic sequence, rainy cyber city lane, moody reflections, long shot continuity",
      panels: ["街口", "巷内", "灯牌近景", "湿地反光", "情绪色板", "镜头建议"],
      similar: ["river-dusk-suite", "terminal-mk2"],
      stats: [
        { label: "连续镜头", value: "4 段" },
        { label: "已购项目", value: "10 个" },
        { label: "推荐用途", value: "都市过场" }
      ],
      notes: ["适合作为赛博都市章节的连续过场。", "适合叠加角色剪影和字幕信息。"]
    },
    "storyboard-epsilon": {
      title: "Epsilon 分镜脚本",
      subtitle: "围绕项目 Epsilon 的剧情节奏整理出的分镜脚本与 prompt 组合。",
      creatorId: "aria-jin",
      price: "85 积分",
      tags: ["Prompt", "分镜脚本", "剧情", "节奏", "连续性"],
      prompt: "cinematic storyboard sequence, act one structure, pacing guide, prompt pack for continuity",
      panels: ["开场", "中段", "情绪推进", "角色转场", "镜头节奏", "prompt 组合"],
      similar: ["han-robe-look", "neo-alley-sequence"],
      stats: [
        { label: "分镜段落", value: "12 段" },
        { label: "已购项目", value: "8 个" },
        { label: "推荐用途", value: "剧情设计" }
      ],
      notes: ["适合前期搭建项目节奏和镜头语言。", "可与环境素材打包使用提高统一性。"]
    },
    "architectural-atrium": {
      title: "极简中庭结构包",
      subtitle: "白模建筑中庭与透视参考，适合展览、品牌空间和未来室内镜头。",
      creatorId: "elena-voss",
      price: "110 积分",
      tags: ["场景图", "建筑", "中庭", "白模", "透视"],
      prompt: "minimal architectural atrium, white gallery interior, perspective study, cinematic space design",
      panels: ["中庭主景", "立面透视", "俯视结构", "楼梯细节", "光线方案", "构图参考"],
      similar: ["samurai-triptych", "orbital-shuttle"],
      stats: [
        { label: "结构视图", value: "5 组" },
        { label: "已购项目", value: "6 个" },
        { label: "推荐用途", value: "品牌空间" }
      ],
      notes: ["适合展厅、品牌空间和未来住宅镜头。", "白模构图很适合继续衍生材质版本。"]
    },
    "console-array-pro": {
      title: "控制台阵列 Pro",
      subtitle: "适合控制室、舰桥和监控区的终端阵列道具套件。",
      creatorId: "marcus-thorne",
      price: "95 积分",
      tags: ["道具", "控制台", "舰桥", "监控", "终端"],
      prompt: "console array prop kit, bridge control terminal, cinematic command center, UI glow accents",
      panels: ["终端列阵", "侧面布局", "按键区", "灯效版本", "组合建议", "场景搭配"],
      similar: ["terminal-mk2", "mecha-hangar-bay"],
      stats: [
        { label: "组合模块", value: "7 组" },
        { label: "已购项目", value: "9 个" },
        { label: "推荐用途", value: "舰桥控制室" }
      ],
      notes: ["适合做舰桥或监控区的主道具群。", "灯效版本适合切换告警状态。"]
    }
  },
  creators: {
    "elena-voss": {
      name: "Elena Voss",
      role: "签约创作者",
      status: "电影级艺术专家",
      bio: "聚焦高概念人物与场景的一致性生产，擅长将抽象灵感转成具备商业可用性的视觉资产包。",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2uQGrYC9t7Qzyf_3ftO8u2S1_5SIJqht0Qx8mFeceKqjX9DYzNrWcvOkvB3-oZWY6_08ULVd_90s6ldfysS3zCdxGDHfUEd5uAkWZsqapO_z9tgr8_oVtWugWff4b3kYVKbGajxXz_niK0IC55kQpEbyBIlEfE2JrUTkHgKttvmy8haghqIOgLsfsFlQhfxWzkfxjl0BOSTX-tnD9dBt5EZ75oST7ForgY7MQwe86KZzAyu23wCcfsazAfutDkAQlnEY-oTTMcu8s",
      cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdH6WyohXnESBdFJDLR6riqwabx1rze5pixbieeJ_Bf23L_wQJ7l8dS5IO-J_p9ZV27-fHokgkr5AYMv8HXTAzmHNeVpJpeBwVQ8beVxzrtTQwE7PDJy7PAFH-HOGicr9gd0Fg8LnQCNgdAJ98LSHaEvJ3sVKZ8h_sAsMAi1yJr_j86MVBahKXce_kFxxhLTbdu15iVb1LhNTbmm6uFisLrJdVeFpr7-0Xc1IQU7cM5qXBbPJv6oCZSs7jbotmvDyyba4JELTIs_FG",
      stats: { uploads: "128 个素材", revenue: "本月授权 4.2k", followers: "8.4k 关注", rating: "98% 通过率" },
      packs: ["角色三视图精选包", "神殿环境序列", "服装统一参考包"],
      friends: ["Marcus Thorne", "Aria Jin", "Nox Liang"],
      focus: ["角色一致性", "电影级构图", "剧情场景包"],
      assets: ["samurai-triptych", "architectural-atrium", "orbital-shuttle"],
      milestones: ["连续 6 周保持高通过率", "最新上传包进入热门推荐", "创作者合作请求 12 条"],
      workspace: ["角色包正在整理为可售卖合集", "河边场景正在补夜景桥段", "计划新增女主角定装系列"]
    },
    "marcus-thorne": {
      name: "Marcus Thorne",
      role: "共同创作伙伴",
      status: "动效与概念艺术",
      bio: "关注时间一致性与动态镜头语法，常把环境、道具和镜头运动一起打包成实用素材组。",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClllIkti7dVJlDhmjrfUsm_BYJ3ovUvsy4DBcceIqXae0RfhraoHQ9ErDhv4PdKHRJVQNVyawbP5aSUwOKkC5PNcpIt84HDY4XIudup6-JBbULnPmPmI3pXnAKwkWPFceFWykyLXHb2Al4HD39J4KtLl_OQ0b2HoGID2esfR_EXaOFl3a2Bkv_YOC8kJisuEcFCdFch9ofPUXMijbHOBbHrFzRfRQez86GtOoHo2dS_BCbwkKuOwF-IwZOYqfB0c1MQqnIZCZmxfpz",
      cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7903EgQexH-toZ4gGQjOCuBJNX4p301odfJoiKFhAHnMV-m8GNiGcqhBxKWhTyqH3GmKfehnEY_aezQPLiVzeiN-rr6i2XsqkKXpAbhOg6Vwq0A_6OdxfU5lh5nXFu0q_Xbdngbp_DQJxGAKNDwh9kB85FvpE05rKhlOQz1Ahlk4s6Qf4ECPgxkCtun-WC7D7WM5l421sZKYImigRdPBI6CON1c-fZgc4FTgTvLg6qhUri2hPmkVTaJ9Qk0Ir8RdBcnx8ta9T6fah",
      stats: { uploads: "76 个素材", revenue: "本月授权 1.8k", followers: "5.1k 关注", rating: "94% 通过率" },
      packs: ["动态环境过场包", "赛博道具合集", "夜景构图模板"],
      friends: ["Elena Voss", "Aria Jin", "Luca Moss"],
      focus: ["时间一致性", "环境叙事", "赛博道具"],
      assets: ["river-dusk-suite", "terminal-mk2", "mecha-hangar-bay", "console-array-pro"],
      milestones: ["新环境包下载率提升", "赛博道具合集进入编辑精选", "收到 3 个团队合作邀约"],
      workspace: ["正在打磨控制室道具扩展包", "夜景环境计划做 3 组光色变化", "准备整理镜头节奏参考文档"]
    },
    "aria-jin": {
      name: "Aria Jin",
      role: "审核中创作者",
      status: "合成时尚",
      bio: "擅长把服装、妆造和角色提示词组织成可直接投入 AIGC 剧情创作的样式库。",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6faf56I5pihVezeYVoWFIjr23UebGjKG4UNEpf8COKtXTyvojr3UlRu7PhLN_zx54zhTSa3MylV1h7sPjB6PCVUKAhZSORuQuD2Xe37o_IcfhmBCi968F93A-1i6NHuOyLyP9sE7gczUtXyMLMkXZ7ArL2JBr3MHDMahY5PA7k4bpWS0wwB_DFHptnr6mCl9Py1-7nhVVJkm6xooOHUAUIC-EU76I0gWHYihQ73_nSalsJjhDbCmpM_qgVOpgg64ytOuPefl4cxX-",
      cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDXH3xM75SyT5jyNmXQ-jn8g_BZFPZUSZ_bIL2TIzuMwXxxzaVxCUQk-6CnxwNWIOnBwtiiYj_w-n7mQbk8oSqoEsEO1OAWiZkBrjGippRdEPj9yU54iX1T1hSq1oCz4ztNjg1ndVN0eEbWvxfolYHIS5r8f-K8qGByo5TPHYjzKXojnumzaCcTXf_DCz3vx0oAgpZg0e-2WNu2vOhxMMbESSap_Yaxd59w056m7K3rYXPwAdAL-oVVHz8dqhFMn0k4OdGyP2AFp3a",
      stats: { uploads: "32 个素材", revenue: "等待首批审核", followers: "2.7k 关注", rating: "审核中" },
      packs: ["古风定装合集", "面部妆造参考", "角色衣柜模板"],
      friends: ["Elena Voss", "Marcus Thorne", "Sena Ko"],
      focus: ["服装样式库", "角色妆造", "Prompt 组合"],
      assets: ["han-robe-look", "neo-alley-sequence", "storyboard-epsilon"],
      milestones: ["首批素材正在等待审核", "主页资料完成度 92%", "已整理 4 组角色衣柜组合"],
      workspace: ["补齐发饰和鞋履细节参考", "优化古风服装关键词结构", "准备提交第二组妆造素材"]
    }
  },
  community: {
    title: "创作者社区",
    subtitle: "头像、简介、作品、素材包、签约状态和共同创作好友，让素材平台也具备作品社区和交易身份。",
    people: ["elena-voss", "marcus-thorne", "aria-jin"]
  },
  support: {
    title: "支持中心",
    subtitle: "围绕账户、上传、审核、授权和创作者收益提供帮助。正式商用前需要补充真实条款和申诉流程。",
    categories: [
      { icon: "manage_accounts", title: "账户管理", text: "资料设置、密码恢复、个人主页和创作者身份认证。" },
      { icon: "cloud_upload", title: "上传与资产", text: "文件格式、大小限制、标签规范、版权声明和素材优化建议。" },
      { icon: "gavel", title: "审核与准则", text: "内容政策、审核流程、创作者行为准则以及违规举报。" }
    ],
    faq: [
      { question: "新用户积分如何发放？", answer: "原型设定为两周内每日赠送 100 积分，仅用于图片类型单个素材。" },
      { question: "素材为什么需要审核？", answer: "为了降低版权、低质量、重复内容和违规素材进入公开交易区的风险。" },
      { question: "正式上线前还缺什么？", answer: "真实认证、支付、授权协议、服务器校验、日志、限流和内容审核后台。" }
    ]
  },
  flows: {
    upload: {
      title: "上传发布",
      subtitle: "把上传从简单占位表单升级成有流程感的工具页，仍保持纯前端模拟，不做真实上传。",
      steps: [
        { key: "basic", label: "基础信息", fields: ["素材类型", "标题", "一句话说明"] },
        { key: "files", label: "文件与预览", fields: ["封面图", "多图组", "画幅比例"] },
        { key: "prompt", label: "标签与 Prompt", fields: ["关键词标签", "Prompt", "风格说明"] },
        { key: "rights", label: "版权声明", fields: ["模型来源", "版权确认", "是否独家"] },
        { key: "pricing", label: "定价方案", fields: ["单张价格", "打包策略", "公开售卖"] },
        { key: "review", label: "预览提交", fields: ["提交审核", "返回修改", "风险提示"] }
      ],
      sidecards: [
        { title: "封面预览", text: "在右侧工作台实时确认当前素材在素材库和下载中心里的呈现方式。" },
        { title: "版权风险提示", text: "原型阶段先把模型来源、素材归属、是否独家这些高风险信息前置。" },
        { title: "公开售卖建议", text: "优先保证标签清晰、标题可搜索、价格和授权边界一眼能看懂。" }
      ]
    },
    auth: {
      title: "注册 / 登录",
      subtitle: "V5 开始接入真实账号认证，支持账号名或邮箱登录，并按角色进入不同的个人主页。",
      steps: ["账号登录", "读取角色资料", "进入对应主页", "保持登录态"]
    },
    licensing: {
      title: "购买 / 授权",
      subtitle: "先完成当前素材购买，再把结果沉淀到独立的下载中心里，形成真正闭环。",
      steps: ["确认素材", "检查积分", "生成授权记录", "进入下载中心"]
    },
    membership: {
      title: "积分会员",
      subtitle: "新用户每日赠送积分，Plus / Pro 会员按月获得更高额度。",
      tiers: [
        { name: "Trial", points: "100 / 日", note: "注册后两周，仅图片单素材" },
        { name: "Plus", points: "10,000 / 月", note: "适合个人短剧创作者" },
        { name: "Pro", points: "30,000 / 月", note: "适合团队与批量制作" }
      ]
    },
    admin: {
      title: "管理员主页",
      subtitle: "把审核后台整合进管理员个人主页，在保留原有 UI 气质的基础上集中处理审核、版权复核与内容补充。",
      queue: ["待审核 24", "版权复核 6", "标签需补充 11", "通过 168"],
      reviewItems: [
        { id: "SP-2048", title: "武士三视图", owner: "LogiFore", risk: "版权声明完整", status: "待审核", category: "角色资产" },
        { id: "SP-2049", title: "日落河边场景组", owner: "LogiFore", risk: "需补充模型来源", status: "复核中", category: "场景图" },
        { id: "SP-2050", title: "汉人服装造型", owner: "Aria Jin", risk: "标签不足", status: "待补充", category: "服装造型" }
      ]
    },
    search: {
      title: "搜索结果",
      subtitle: "关键词、标签和类型筛选共同驱动素材发现。当前为前端原型搜索，不请求服务器。"
    },
    collections: {
      title: "收藏夹 / 项目夹",
      subtitle: "用户可把素材收进短剧项目、角色设定夹或场景参考夹。"
    }
  },
  downloads: {
    title: "授权记录与下载中心",
    subtitle: "把购买结果、下载状态和积分流水放进同一处，让用户知道买完之后下一步该去哪。",
    records: [
      { id: "LIC-240611-01", assetId: "samurai-triptych", status: "可下载", points: "-120", scope: "单项目商用", updated: "刚刚生成" },
      { id: "LIC-240610-14", assetId: "river-dusk-suite", status: "已下载", points: "-180", scope: "多镜头参考", updated: "昨天 21:40" }
    ],
    activity: ["下载武士角色三视图", "生成日落河边场景组授权记录", "同步项目夹《短剧项目 A》"],
    summary: [
      { label: "可下载素材", value: "12 个" },
      { label: "本周授权", value: "4 条" },
      { label: "剩余积分", value: "9,880" }
    ],
    queue: [
      { title: "待打包下载", text: "2 个素材正在等待生成下载包。" },
      { title: "授权即将到期提醒", text: "1 条测试授权需要在正式版补齐续期逻辑。" }
    ]
  },
  projects: {
    "short-drama-a": {
      name: "短剧项目 A",
      summary: "围绕古风短剧筹备的角色与场景参考夹，当前重点是统一角色服装和河边对手戏环境。",
      note: "需要继续补齐反派角色、夜景桥段和一版更强烈的黄昏情绪环境。",
      stage: "筹备中",
      owner: "LogiFore Studio",
      assets: [
        { assetId: "samurai-triptych", state: "已购" },
        { assetId: "river-dusk-suite", state: "已购" },
        { assetId: "han-robe-look", state: "待购买" }
      ],
      prompts: ["角色提示词需统一头发长度和腰封结构。", "河边场景建议保留同机位三时段切换。"],
      stats: [
        { label: "已收集素材", value: "3 / 6" },
        { label: "已购完成度", value: "67%" },
        { label: "待补缺口", value: "反派 + 夜景" }
      ]
    },
    "martial-roles": {
      name: "武侠角色库",
      summary: "用于沉淀常用的角色三视图、服装和招式参考。",
      note: "适合继续扩展不同年龄层和门派差异。",
      stage: "整理中",
      owner: "角色设定库",
      assets: [
        { assetId: "samurai-triptych", state: "已购" },
        { assetId: "han-robe-look", state: "待购买" }
      ],
      prompts: ["优先补齐女性角色和老年角色的体态变化。"],
      stats: [
        { label: "已收集素材", value: "2 / 5" },
        { label: "已购完成度", value: "50%" },
        { label: "待补缺口", value: "年龄层变化" }
      ]
    },
    "river-scenes": {
      name: "河边场景参考",
      summary: "为剧情过场积累统一环境基底，减少反复抽卡。",
      note: "下一步补齐桥段近景与逆光版本。",
      stage: "扩展中",
      owner: "环境板块",
      assets: [
        { assetId: "river-dusk-suite", state: "已购" }
      ],
      prompts: ["保留日景和夜景的水面反差，黄昏色温再暖一些。"],
      stats: [
        { label: "已收集素材", value: "1 / 4" },
        { label: "已购完成度", value: "25%" },
        { label: "待补缺口", value: "近景与逆光" }
      ]
    },
    "wishlist": {
      name: "待购买素材",
      summary: "临时收纳打算稍后购买的素材。",
      note: "等待积分补足或会员方案升级。",
      stage: "待处理",
      owner: "收藏清单",
      assets: [
        { assetId: "terminal-mk2", state: "待购买" },
        { assetId: "han-robe-look", state: "待购买" }
      ],
      prompts: ["赛博控制室道具可与未来社区短片项目联动。"],
      stats: [
        { label: "已收集素材", value: "2 / 2" },
        { label: "已购完成度", value: "0%" },
        { label: "待补缺口", value: "积分与会员" }
      ]
    }
  }
};
