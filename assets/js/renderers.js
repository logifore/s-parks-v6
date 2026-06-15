"use strict";

window.SparksRenderers = ((utils) => {
  const { escapeHtml, icon, image, pageShell } = utils;
  const content = window.SPARKS_CONTENT;
  const hrefFor = (route, value) => window.SparksRouter.hrefFor(route, value);
  const DEFAULT_ASSET = content.assets.items[0];
  const DEFAULT_CREATOR_ID = content.community.people[0];
  const DEFAULT_PROJECT_ID = "short-drama-a";

  const sceneVariants = {
    day: {
      label: "日景",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD50KCrw5wVryhxpMfaEmggeX1cBZMU1s4VdF3pI0A_dOPNgoxKioXnbicvkC6UBrZjxYK0oeq91HB8HHcJWYRE5JX42wXpEzTVGYvjemArJ5kmbP3vp7LsDrTV6ktJC4M808uvOO7Esv5oSsWPFnApB8kF2uvMRizXsHn9nAtgS1A1oI9hUBmSu879hX12I-1pXgwg9pT3_kwNxxvKm3o--GzuMKek95P8-VXlktSglX1znYPlJehDqi8cs-V41eHbyUehNo5fwCc4",
      note: "高可读日景，适合建立空间结构和角色走位。"
    },
    dusk: {
      label: "黄昏",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7903EgQexH-toZ4gGQjOCuBJNX4p301odfJoiKFhAHnMV-m8GNiGcqhBxKWhTyqH3GmKfehnEY_aezQPLiVzeiN-rr6i2XsqkKXpAbhOg6Vwq0A_6OdxfU5lh5nXFu0q_Xbdngbp_DQJxGAKNDwh9kB85FvpE05rKhlOQz1Ahlk4s6Qf4ECPgxkCtun-WC7D7WM5l421sZKYImigRdPBI6CON1c-fZgc4FTgTvLg6qhUri2hPmkVTaJ9Qk0Ir8RdBcnx8ta9T6fah",
      note: "暖色叙事氛围，适合情绪段落和过场镜头。"
    },
    night: {
      label: "夜景",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdH6WyohXnESBdFJDLR6riqwabx1rze5pixbieeJ_Bf23L_wQJ7l8dS5IO-J_p9ZV27-fHokgkr5AYMv8HXTAzmHNeVpJpeBwVQ8beVxzrtTQwE7PDJy7PAFH-HOGicr9gd0Fg8LnQCNgdAJ98LSHaEvJ3sVKZ8h_sAsMAi1yJr_j86MVBahKXce_kFxxhLTbdu15iVb1LhNTbmm6uFisLrJdVeFpr7-0Xc1IQU7cM5qXBbPJv6oCZSs7jbotmvDyyba4JELTIs_FG",
      note: "强反差夜景，适合悬疑、动作和霓虹风格。"
    }
  };

  const ROLE_LABELS = {
    guest: "游客",
    user: "普通用户",
    creator: "创作者",
    admin: "管理员"
  };

  function getAssetById(assetId) {
    return content.assets.items.find((item) => item.id === assetId) || DEFAULT_ASSET;
  }

  function getCreatorById(creatorId) {
    return content.creators[creatorId] || content.creators[DEFAULT_CREATOR_ID];
  }

  function getProjectById(projects, projectId) {
    return projects[projectId] || projects[DEFAULT_PROJECT_ID];
  }

  function getAuthProfile(state) {
    return state.authProfile || null;
  }

  function getRoleLabel(role) {
    return ROLE_LABELS[role] || ROLE_LABELS.user;
  }

  function isCreatorOwner(state, creatorId) {
    const profile = getAuthProfile(state);
    return Boolean(state.signedIn && profile && profile.role === "creator" && profile.creatorId === creatorId);
  }

  function isAdminViewer(state) {
    const profile = getAuthProfile(state);
    return Boolean(state.signedIn && profile && profile.role === "admin");
  }

  function roleStatusText(role) {
    const map = {
      guest: "未登录",
      user: "普通会员",
      creator: "签约创作者",
      admin: "平台管理员"
    };
    return map[role] || "普通会员";
  }

  function renderProfileActions(extraClass = "") {
    return `
      <div class="profile-page-actions${extraClass ? ` ${extraClass}` : ""}">
        <button class="button button-primary profile-page-exit" type="button" data-action="sign-out">${icon("logout")} 退出账号</button>
      </div>
    `;
  }

  function isAssetCollected(state, assetId) {
    return Object.values(state.projects || {}).some((project) => project.assets.some((entry) => entry.assetId === assetId));
  }

  function pressedAttr(active) {
    return `aria-pressed="${active ? "true" : "false"}"`;
  }

  function assetCard(asset, options = {}) {
    const wide = options.wide ? " wide" : "";
    return `
      <a class="image-card asset-card${wide}" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">
        ${image(asset.image, asset.name, "card-image")}
        <div class="asset-meta glass-panel">
          <div>
            <span>${escapeHtml(asset.category)}</span>
            <h3>${escapeHtml(asset.name)}</h3>
            <p>${escapeHtml(asset.meta)} · ${escapeHtml(asset.price)}</p>
          </div>
          ${icon("open_in_new")}
        </div>
      </a>
    `;
  }

  function creatorWorkCards(creator) {
    const works = creator.assets.map((id) => getAssetById(id));
    const primary = works[0];
    const secondary = works[1];
    const tertiary = works[2];
    return `
      <div class="creator-work-grid">
        <a class="creator-work-card creator-work-card-large" href="${escapeHtml(hrefFor("detail", primary.id))}" data-action="open-detail" data-asset="${escapeHtml(primary.id)}">
          ${image(primary.image, primary.name, "creator-work-image")}
          <div class="creator-work-overlay">
            <span class="eyebrow">01</span>
            <h3>${escapeHtml(primary.name)}</h3>
            <p>${escapeHtml(primary.meta)}</p>
          </div>
        </a>
        ${secondary ? `
          <a class="creator-work-card creator-work-card-side" href="${escapeHtml(hrefFor("detail", secondary.id))}" data-action="open-detail" data-asset="${escapeHtml(secondary.id)}">
            ${image(secondary.image, secondary.name, "creator-work-image")}
            <div class="creator-work-overlay">
              <span class="eyebrow">02</span>
              <h3>${escapeHtml(secondary.name)}</h3>
              <p>${escapeHtml(secondary.meta)}</p>
            </div>
          </a>
        ` : ""}
        ${tertiary ? `
          <a class="creator-work-card creator-work-card-side" href="${escapeHtml(hrefFor("detail", tertiary.id))}" data-action="open-detail" data-asset="${escapeHtml(tertiary.id)}">
            ${image(tertiary.image, tertiary.name, "creator-work-image")}
            <div class="creator-work-overlay">
              <span class="eyebrow">03</span>
              <h3>${escapeHtml(tertiary.name)}</h3>
              <p>${escapeHtml(tertiary.meta)}</p>
            </div>
          </a>
        ` : ""}
        <a class="creator-work-card creator-work-card-upload" href="#upload">
          <div class="creator-work-upload">
            ${icon("add")}
            <span>Upload New Work</span>
          </div>
        </a>
      </div>
    `;
  }

  function creatorCollectionCards(state) {
    const projects = Object.entries(state.projects || {});
    return `
      <div class="creator-collection-grid">
        ${projects.map(([id, project]) => `
          <article class="glass-panel creator-collection-card">
            <span class="eyebrow">${escapeHtml(project.stage)}</span>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.summary)}</p>
            <a class="button button-ghost compact" href="${escapeHtml(hrefFor("project", id))}" data-action="open-project" data-project="${escapeHtml(id)}">查看项目</a>
          </article>
        `).join("")}
      </div>
    `;
  }

  function refineAssetType(category) {
    const map = {
      "人物三视图": "角色",
      "场景图": "环境",
      "道具": "载具",
      "服装造型": "分镜脚本",
      "Prompt": "分镜脚本"
    };
    return map[category] || category;
  }

  function assetCategoryIcon(category) {
    const map = {
      "角色": "person",
      "环境": "landscape",
      "载具": "rocket_launch",
      "分镜脚本": "movie"
    };
    return map[category] || "folder";
  }

  function renderCreatorOnboarding(appContent) {
    const benefits = [
      {
        title: "行业领先的收益分成",
        text: "我们推出艺术家的作品，享受高达 85% 的收益分成，透明的结算体系确保您每一分付出都得到公平回报。",
        icon: "payments",
        stat: "85% 分成",
        previewAssetId: "architectural-atrium",
        previewLabel: "高端空间方案"
      },
      {
        title: "全球曝光",
        text: "连接全球顶级的游戏工作室、影视制作团队和建筑事务所。",
        icon: "public",
        stat: "120+ 工作室",
        previewAssetId: "neo-alley-sequence",
        previewLabel: "国际项目场景"
      },
      {
        title: "专业级工具集",
        text: "一键同步、版本控制与自动化渲染预览，简化您的发布流程。",
        icon: "architecture",
        stat: "48h 审核",
        previewAssetId: "samurai-triptych",
        previewLabel: "高标准角色资产"
      }
    ];
    const showcaseAssets = [
      {
        asset: getAssetById("architectural-atrium"),
        eyebrow: "Featured Space Pack",
        title: "极简中庭结构包",
        note: "白模建筑、透视参考与品牌空间镜头，一次锁定展示级空间语言。"
      },
      {
        asset: getAssetById("samurai-triptych"),
        eyebrow: "Character System",
        title: "角色一致性模板",
        note: "三视图 + 服装细节"
      },
      {
        asset: getAssetById("orbital-shuttle"),
        eyebrow: "Studio Delivery",
        title: "商业级载具规范",
        note: "展示台、材质脚本、硬表面拆解"
      }
    ];
    return pageShell("成为创作者", "加入顶级创作者社区", "把创作资产变成被全球顶尖工作室采用的标准作品。", `
      <section class="onboarding-shell">
        <section class="onboarding-hero">
          <div class="onboarding-copy">
            <h1>塑造未来的视觉。<br><span>加入顶级创作者社区。</span></h1>
            <p>在 S-parks，我们为追求极致的数字艺术家和设计师提供卓越的展示平台，将您的创意资产转化为被全球顶尖工作室采用的标准。</p>
            <div class="hero-actions left-actions">
              <a class="button button-primary" href="#upload">立即申请</a>
              <a class="button button-ghost" href="#community">了解详情</a>
            </div>
          </div>
          <div class="onboarding-hero-panel" aria-hidden="true">
            <article class="onboarding-stage-feature">
              ${image(showcaseAssets[0].asset.image, showcaseAssets[0].title, "onboarding-stage-image")}
              <div class="onboarding-stage-overlay">
                <span class="eyebrow">${escapeHtml(showcaseAssets[0].eyebrow)}</span>
                <strong>${escapeHtml(showcaseAssets[0].title)}</strong>
                <p>${escapeHtml(showcaseAssets[0].note)}</p>
              </div>
            </article>
            <div class="onboarding-stage-rail">
              ${showcaseAssets.slice(1).map((item) => `
                <article class="onboarding-stage-chip">
                  ${image(item.asset.image, item.title, "onboarding-stage-chip-image")}
                  <div>
                    <span class="eyebrow">${escapeHtml(item.eyebrow)}</span>
                    <strong>${escapeHtml(item.title)}</strong>
                    <p>${escapeHtml(item.note)}</p>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="onboarding-benefits">
          <div class="section-title">
            <h2>为什么选择 S-parks?</h2>
            <p>专为专业人士打造的创作生态。</p>
          </div>
          <div class="onboarding-grid">
            ${benefits.map((benefit, index) => `
              <article class="onboarding-card ${index === 2 ? "onboarding-card-featured" : ""}">
                <span class="support-icon">${icon(benefit.icon)}</span>
                <span class="onboarding-card-stat">${escapeHtml(benefit.stat)}</span>
                <h3>${escapeHtml(benefit.title)}</h3>
                <p>${escapeHtml(benefit.text)}</p>
                <div class="onboarding-card-media ${index === 2 ? "onboarding-card-media-featured" : ""}">
                  ${image(getAssetById(benefit.previewAssetId).image, benefit.previewLabel, "onboarding-feature-image")}
                  <div class="onboarding-card-media-copy">
                    <span class="eyebrow">${escapeHtml(benefit.previewLabel)}</span>
                    <strong>${escapeHtml(getAssetById(benefit.previewAssetId).name)}</strong>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
        <section class="onboarding-cta">
          <h2>准备好展现您的才华了吗?</h2>
          <p>申请流程简单快捷。提交您的作品集链接，我们的专业策展团队将在 48 小时内完成审核。</p>
          <a class="button button-primary" href="#upload">开始申请流程</a>
        </section>
      </section>
    `, "creator-onboarding-page");
  }

  function renderAccount(state) {
    if (!state.signedIn) {
      return pageShell("个人主页", "登录后查看个人主页", "普通用户主页", `
        <section class="account-shell">
          <section class="profile-overview profile-overview-guest">
            <article class="profile-identity-card profile-surface-card">
              <div class="profile-identity-main">
                <div class="account-avatar">${image("https://lh3.googleusercontent.com/aida-public/AB6AXuBl8whoU5MlIADYjJiOYQoBI2AAqeaFfBwFyBKVOHXyic5TlVsXl26WlsWzTeXdwuO1x8D1goEHUbNzeojIxQ1UOjmVGu2G3zzRL85LLHsBXxMjOoIy22ZSwN1TShvPC5Xn6LsA2gjcGl3xvC-OUM28MqwfDsmH3g6eeKMtBTbM-30EOkGoV6UmAXaLDMO0OXMCgG7H5_cqd6SWR6IfqpGmPm2B0VwTWQMCiPY4E5U6SPrgJGo6BS6Le1nPBHTC8ieblPVKvdfL8jYd", "account", "account-avatar-image")}</div>
                <div class="profile-identity-copy">
                  <span class="eyebrow profile-kicker">Account Access</span>
                  <h1>欢迎回来</h1>
                  <p class="profile-identity-primary">登录后继续查看已购素材、项目夹和账号设置。</p>
                  <div class="profile-identity-meta">
                    <span class="account-badge">未登录</span>
                    <span class="profile-meta-pill">游客模式</span>
                  </div>
                </div>
              </div>
            </article>
            <article class="account-creator-frame profile-surface-card profile-spotlight-card">
              <span class="eyebrow">Account Access</span>
              <h2>先登录再进入个人主页</h2>
              <p>V5 已经切到真实账号登录，普通用户、创作者和管理员会进入各自对应的主页。</p>
              <div class="account-entry-actions">
                <a class="button button-primary" href="#auth">前往登录</a>
                <a class="button button-ghost" href="#creator-onboarding">立即申请</a>
                <a class="button button-ghost" href="#creator?creator=elena-voss">进入创作者主页</a>
                <a class="button button-ghost" href="#assets">继续游客浏览</a>
              </div>
            </article>
          </section>
        </section>
      `, "account-page");
    }

    const profile = getAuthProfile(state);
    const purchased = (state.downloadRecords || []).map((record) => getAssetById(record.assetId));
    const sample = (purchased.length ? purchased : [])
      .concat(content.assets.items.filter((asset) => !purchased.some((entry) => entry.id === asset.id)))
      .slice(0, 3);
    const displayName = (profile && profile.displayName) || "S-parks 用户";
    const email = (profile && profile.email) || "未配置邮箱";
    const role = (profile && profile.role) || "user";
    return pageShell("个人主页", displayName, getRoleLabel(role), `
      <section class="account-shell">
        <section class="profile-overview profile-overview-user">
          <article class="profile-identity-card profile-surface-card">
            <div class="profile-identity-main">
              <div class="account-avatar">${image((profile && profile.avatarUrl) || "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8whoU5MlIADYjJiOYQoBI2AAqeaFfBwFyBKVOHXyic5TlVsXl26WlsWzTeXdwuO1x8D1goEHUbNzeojIxQ1UOjmVGu2G3zzRL85LLHsBXxMjOoIy22ZSwN1TShvPC5Xn6LsA2gjcGl3xvC-OUM28MqwfDsmH3g6eeKMtBTbM-30EOkGoV6UmAXaLDMO0OXMCgG7H5_cqd6SWR6IfqpGmPm2B0VwTWQMCiPY4E5U6SPrgJGo6BS6Le1nPBHTC8ieblPVKvdfL8jYd", "account", "account-avatar-image")}</div>
              <div class="profile-identity-copy">
                <span class="eyebrow profile-kicker">${escapeHtml(getRoleLabel(role))}</span>
                <h1>${escapeHtml(displayName)}</h1>
                <p class="profile-identity-primary">${escapeHtml(email)}</p>
                <div class="profile-identity-meta">
                  <span class="account-badge">${escapeHtml(roleStatusText(role))}</span>
                  <span class="profile-meta-pill">角色主页已启用</span>
                </div>
              </div>
            </div>
            ${renderProfileActions("profile-page-actions-inline")}
          </article>
          <article class="account-creator-frame profile-surface-card profile-spotlight-card">
            <span class="eyebrow">Creator Program</span>
            <h2>申请成为创作者</h2>
            <p>你现在使用的是真实账号登录。后续可继续把普通用户升级为创作者，沿用当前站内浏览、收藏和上传流程。</p>
            <div class="account-entry-actions">
              <a class="button button-primary" href="#creator-onboarding">立即申请</a>
              <a class="button button-ghost" href="#creator?creator=elena-voss">进入创作者主页</a>
              <a class="button button-ghost" href="#collections">查看项目夹</a>
            </div>
          </article>
        </section>
        <section class="account-summary">
          <article class="account-panel">
            <div class="account-panel-head">${icon("account_balance_wallet")}<h2>账户余额</h2></div>
            <strong>${escapeHtml(`￥${(state.pointsBalance / 100).toFixed(2)}`)}</strong>
            <a class="button button-primary compact" href="#membership">充值</a>
          </article>
          <article class="account-panel">
            <div class="account-panel-head">${icon("local_activity")}<h2>我的优惠券</h2></div>
            <strong>3 <span>张可用</span></strong>
            <a class="button button-ghost compact" href="#membership">查看全部</a>
          </article>
        </section>
        <section class="account-assets">
          <div class="section-title"><h2>我的已购素材</h2></div>
          <div class="account-asset-grid">
            ${sample.map((asset) => `
              <a class="account-asset-card" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">
                ${image(asset.image, asset.name, "account-asset-image")}
                <div class="account-asset-copy"><h3>${escapeHtml(asset.name)}</h3><p>${escapeHtml(asset.meta)}</p></div>
              </a>
            `).join("")}
          </div>
        </section>
        <section class="account-settings">
          <div class="section-title"><h2>设置与隐私</h2></div>
          <div class="account-settings-list">
            ${[
              "个人资料设置",
              "账号安全与密码",
              "账单与发票管理"
            ].map((item) => `
              <article class="account-settings-row">
                <span>${escapeHtml(item)}</span>
                ${icon("chevron_right")}
              </article>
            `).join("")}
          </div>
        </section>
      </section>
    `, "account-page");
  }

  function renderHome(appContent) {
    const { home, secondaryNav } = appContent;
    const actions = home.actions.map((action) => `
      <a class="button ${action.style === "primary" ? "button-primary" : "button-ghost"}" href="#${escapeHtml(action.route)}">
        ${escapeHtml(action.label)}${action.icon ? icon(action.icon) : ""}
      </a>
    `).join("");

    return `
      <section class="home-shell">
        <section class="home-hero-canvas">
          <div class="home-grid-lines" aria-hidden="true"></div>
          <div class="home-massive-type" aria-hidden="true">S-PARKS</div>
          <div class="home-hero-copy">
            <h1>S-PARKS<br><span>${escapeHtml(home.accent)}</span></h1>
            <p>创作者专享 / FOR CREATORS</p>
            <div class="hero-actions hero-actions-left">${actions}</div>
          </div>
          <a class="home-scroll-cue" href="#community">SCROLL DOWN</a>
        </section>

        <section class="home-vision">
          <div class="home-vision-copy">
            <span class="eyebrow">核心愿景 / Core Vision</span>
            <h2>多维素材<br><span>重塑创作</span></h2>
            <p>提供 AIGC 专业级角色三视图、分镜故事板、高精度场景图以及完整的短片资产体系，助力创作者从灵感到成片的跨越。</p>
          </div>
          <div class="home-vision-stack">
            ${home.trending.slice(0, 3).map((item, index) => `
              <a class="home-vision-card home-vision-card-${index + 1}" href="${escapeHtml(hrefFor("detail", item.id))}" data-action="open-detail" data-asset="${escapeHtml(item.id)}">
                ${image(item.image, item.name, "home-vision-image")}
                <div class="home-vision-card-copy">
                  ${icon(index === 0 ? "view_in_ar" : index === 1 ? "movie" : "landscape")}
                  <span>${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHtml(index === 0 ? "角色资产" : index === 1 ? "叙事分镜" : "高精场景")}</h3>
                  <p>${escapeHtml(item.meta)}</p>
                </div>
              </a>
            `).join("")}
          </div>
        </section>

        <section class="section-band home-creators">
          <div class="section-title">
            <span class="eyebrow">Featured</span>
            <h2>创作者推荐</h2>
            <a href="#community">查看全部 ${icon("arrow_right_alt")}</a>
          </div>
          <div class="home-creator-grid">
            ${home.creators.map((creatorRef, index) => `
              <a class="home-creator-card" href="${escapeHtml(hrefFor("creator", creatorRef.id))}" data-action="open-creator" data-creator="${escapeHtml(creatorRef.id)}">
                ${image(creatorRef.image, creatorRef.name, "home-creator-image")}
                <div class="home-creator-copy">
                  <span>${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHtml(creatorRef.name)}</h3>
                  <p>${escapeHtml(creatorRef.role)}</p>
                </div>
              </a>
            `).join("")}
          </div>
        </section>

        <section class="section-band home-feature-band">
          <div class="section-title">
            <span class="eyebrow">Functions</span>
            <h2>功能入口</h2>
          </div>
          <div class="home-feature-grid">
            ${secondaryNav.map((item) => `
              <a class="home-feature-card" href="#${escapeHtml(item.route)}">
                ${icon(item.icon)}
                <strong>${escapeHtml(item.label)}</strong>
                <span>进入原型</span>
              </a>
            `).join("")}
          </div>
        </section>
      </section>
    `;
  }

  function renderAssetBrowser(appContent, state, includeShell) {
    const { assets } = appContent;
    const categories = ["全部", "角色", "环境", "载具", "分镜脚本"];
    const selected = state.selectedCategory || "全部";
    const query = state.query.trim().toLowerCase();
    const matches = assets.items.filter((asset) => {
      const type = refineAssetType(asset.category);
      const target = `${asset.name} ${asset.meta} ${asset.category} ${type} ${asset.creator}`.toLowerCase();
      const categoryMatch = selected === "全部" || type === selected;
      return categoryMatch && (!query || target.includes(query));
    });

    const searchHref = hrefFor("search", {
      q: state.query.trim(),
      category: selected === "全部" ? "" : selected
    });
    const body = `
      <div class="control-bar control-bar-v4" role="region" aria-label="素材筛选">
        <div class="segmented-control" aria-label="素材分类">
          ${categories.map((filter) => `<button class="${filter === selected ? "active" : ""}" type="button" ${pressedAttr(filter === selected)} data-action="filter-category" data-category="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`).join("")}
        </div>
        <a class="button button-primary compact" href="${escapeHtml(searchHref)}">${icon("tune")} 高级筛选</a>
      </div>
      <div class="chips" aria-label="筛选维度">
        ${assets.facets.map((filter) => `<span>${escapeHtml(filter)}</span>`).join("")}
      </div>
      <div class="result-line">
        找到 <strong>${matches.length}</strong> 个素材
        ${query ? `<span class="result-pill">关键词 · ${escapeHtml(state.query)}</span>` : ""}
        ${selected !== "全部" ? `<span class="result-pill">分类 · ${escapeHtml(selected)}</span>` : ""}
      </div>
      <div class="asset-grid asset-grid-v4">
        ${matches.map((asset, index) => assetCard(asset, { wide: index === 0 })).join("") || `<article class="empty-state glass-panel"><h2>没有匹配素材</h2><p>换一个关键词或分类试试。</p></article>`}
      </div>
      <section class="scene-strip scene-strip-v4">
        <div class="section-title">
          <span class="eyebrow">Scene Variants</span>
          <h2>时间切换和构图一致性继续保留，并升级成更像精选陈列</h2>
          <p>原版的场景切换能力继续可用，V5 这一轮重点加入角色登录结构、管理员工作台和更完整的账号分流体验。</p>
        </div>
        <div class="scene-grid">
          ${assets.scenes.map((scene) => `<article class="glass-panel scene-card"><h3>${escapeHtml(scene.name)}</h3><p>${escapeHtml(scene.meta)}</p></article>`).join("")}
        </div>
      </section>
    `;

    if (!includeShell) return body;
    return pageShell("Assets", assets.title, assets.subtitle, body, "assets-page");
  }

  function renderAssets(appContent, state) {
    const selected = state.selectedCategory || "全部";
    const query = state.query.trim().toLowerCase();
    const categories = ["全部", "角色", "环境", "载具", "分镜脚本"];
    const matches = appContent.assets.items.filter((asset) => {
      const type = refineAssetType(asset.category);
      const target = `${asset.name} ${asset.meta} ${asset.category} ${type}`.toLowerCase();
      const categoryMatch = selected === "全部" || type === selected;
      return categoryMatch && (!query || target.includes(query));
    });
    const displayCards = [...matches];
    while (displayCards.length < 4) displayCards.push(null);
    return pageShell("素材库", appContent.assets.title, appContent.assets.subtitle, `
      <section class="asset-library-shell">
        <aside class="asset-sidebar">
          <div class="asset-sidebar-head">
            ${icon("folder")}
            <div><strong>资产分类</strong><span>Asset Categories</span></div>
          </div>
          <div class="asset-category-list">
            ${categories.map((category) => `
              <button class="asset-category-item ${selected === category ? "active" : ""}" type="button" ${pressedAttr(selected === category)} data-action="filter-category" data-category="${escapeHtml(category)}">
                ${icon(assetCategoryIcon(category))}
                <span>${escapeHtml(category)}</span>
              </button>
            `).join("")}
          </div>
          <div class="asset-sidebar-bottom">
            <button class="asset-create-category" type="button">${icon("add")} 新建分类</button>
            <a href="#collections">${icon("folder_special")} 回收站</a>
            <a href="#support">${icon("help")} 帮助中心</a>
          </div>
        </aside>
        <div class="asset-library-main">
          <div class="asset-library-toolbar">
            <div class="asset-library-actions">
              <button class="button button-ghost compact asset-toolbar-button" type="button">${icon("filter_list")} 筛选</button>
              <button class="button button-ghost compact asset-toolbar-button" type="button">${icon("sort")} 最新上传</button>
            </div>
          </div>
          <div class="asset-library-grid">
            ${displayCards.map((asset) => asset ? `
              <a class="asset-library-card" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">
                ${image(asset.image, asset.name, "asset-library-image")}
              </a>
            ` : `
              <article class="asset-library-card asset-library-card-placeholder" aria-hidden="true">
                <div class="asset-pending">Asset Render Pending</div>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `, "assets-page assets-page-v4");
  }

  function renderCommunity(appContent) {
    const { community, creators } = appContent;
    const body = `
      <section class="community-shell">
        <header class="community-hero">
          <h1>远见者</h1>
          <p>探索 AI 生成内容的先锋。由顶尖创作者呈现的策展画廊，不断突破数字艺术的边界。</p>
        </header>
        <div class="community-grid-v4">
          ${community.people.map((id, index) => {
            const person = creators[id];
            return `
              <a class="community-card-v4 ${index === 0 ? "community-card-v4-featured" : ""}" href="${escapeHtml(hrefFor("creator", id))}" data-action="open-creator" data-creator="${escapeHtml(id)}">
                <div class="community-card-v4-image-shell">
                  ${image(person.cover || person.image, person.name, "community-card-v4-image")}
                  ${index === 0 ? `<span class="community-badge">本周推荐</span>` : ""}
                </div>
                <div class="community-card-v4-copy">
                  ${index !== 0 ? image(person.image, person.name, "community-card-v4-avatar") : ""}
                  <div>
                    <h2>${escapeHtml(person.name)}</h2>
                    <span>${escapeHtml(person.role)}</span>
                  </div>
                  <p>${escapeHtml(person.bio)}</p>
                </div>
              </a>
            `;
          }).join("")}
        </div>
      </section>
    `;
    return pageShell("Community", community.title, community.subtitle, body, "community-page community-page-v4");
  }

  function renderSupport(appContent) {
    const { support } = appContent;
    const body = `
      <section class="support-shell">
        <header class="support-hero">
          <h1>${escapeHtml(support.title)}</h1>
          <p>${escapeHtml(support.subtitle)}</p>
          <form class="support-search" role="search">
            ${icon("search")}
            <input type="search" placeholder="搜索问题..." aria-label="搜索问题">
            <button class="button button-primary compact" type="submit">搜索</button>
          </form>
        </header>
        <div class="support-grid-v4">
          ${support.categories.map((category) => `
            <a class="support-card-v4" href="#support">
              <span class="support-icon">${icon(category.icon)}</span>
              <h2>${escapeHtml(category.title)}</h2>
              <p>${escapeHtml(category.text)}</p>
              <strong>查看详情 ${icon("arrow_forward")}</strong>
            </a>
          `).join("")}
        </div>
        <section class="faq-section-v4">
          <div class="section-title">
            <span class="eyebrow">FAQ</span>
            <h2>热门问题</h2>
          </div>
          <div class="faq-list-v4">
            ${support.faq.map((item, index) => `
              <details class="faq-item-v4" ${index === 0 ? "open" : ""}>
                <summary>${escapeHtml(item.question)} ${icon("expand_more")}</summary>
                <p>${escapeHtml(item.answer)}</p>
              </details>
            `).join("")}
          </div>
        </section>
      </section>
    `;
    return pageShell("Support", support.title, support.subtitle, body, "support-page support-page-v4");
  }

  function renderDetail(appContent, state) {
    const assetId = state.detailAssetId || DEFAULT_ASSET.id;
    const asset = getAssetById(assetId);
    const detail = appContent.details[asset.id];
    const creator = getCreatorById(detail.creatorId);
    const currentTime = state.sceneTime || "day";
    const variant = sceneVariants[currentTime] || sceneVariants.day;
    const previewLabel = asset.id === "river-dusk-suite" ? variant.label : "主视图";
    const collected = isAssetCollected(state, asset.id);
    const body = `
      <div class="detail-layout">
        <article class="image-card detail-preview">
          ${image(asset.id === "river-dusk-suite" ? variant.image : asset.image, `${detail.title} ${previewLabel}`, "card-image")}
          <div class="card-overlay"><h2>${escapeHtml(detail.price)}</h2><p>${escapeHtml(asset.id === "river-dusk-suite" ? variant.note : detail.subtitle)}</p></div>
        </article>
        <aside class="glass-panel detail-panel">
          <div class="chips">${detail.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          ${asset.id === "river-dusk-suite" ? `
            <div class="time-switch" aria-label="场景时间切换">
              ${Object.entries(sceneVariants).map(([key, item]) => `<button class="${key === currentTime ? "active" : ""}" type="button" ${pressedAttr(key === currentTime)} data-action="set-scene-time" data-time="${key}">${escapeHtml(item.label)}</button>`).join("")}
            </div>
          ` : ""}
          <div class="inline-profile glass-panel">
            ${image(creator.image, creator.name, "avatar")}
            <div>
              <span>${escapeHtml(creator.role)}</span>
              <h3>${escapeHtml(creator.name)}</h3>
            </div>
            <a class="button button-ghost compact" href="${escapeHtml(hrefFor("creator", detail.creatorId))}" data-action="open-creator" data-creator="${escapeHtml(detail.creatorId)}">查看主页</a>
          </div>
          <h2>Prompt</h2>
          <p class="prompt-box">${escapeHtml(detail.prompt)}</p>
          <div class="detail-stats">
            ${detail.stats.map((item) => `<article class="glass-panel metric-panel compact-metric"><span class="eyebrow">${escapeHtml(item.label)}</span><h3>${escapeHtml(item.value)}</h3></article>`).join("")}
          </div>
          <div class="glass-panel info-block compact-info">
            <span class="eyebrow">使用建议</span>
            <div class="info-list">${detail.notes.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>
          </div>
          <div class="hero-actions left-actions">
            <a class="button button-primary" href="${escapeHtml(hrefFor("licensing", asset.id))}">购买授权</a>
            <button class="button button-ghost" type="button" data-action="collect-asset">${collected ? "已收藏" : "收藏到项目夹"}</button>
          </div>
        </aside>
      </div>
      <div class="panel-grid">
        ${detail.panels.map((panel) => `<article class="glass-panel scene-card"><h3>${escapeHtml(panel)}</h3><p>未来这里接入多图组预览、下载权限和版权记录。</p></article>`).join("")}
      </div>
      <section class="scene-strip">
        <div class="section-title">
          <span class="eyebrow">相似素材</span>
          <h2>继续完善当前镜头组</h2>
        </div>
        <div class="asset-grid">
          ${detail.similar.map((id, index) => assetCard(getAssetById(id), { wide: index === 0 })).join("")}
        </div>
      </section>
    `;
    return pageShell("素材详情", detail.title, detail.subtitle, body, "detail-page");
  }

  function renderCreator(appContent, state) {
    const creatorId = state.activeCreatorId || DEFAULT_CREATOR_ID;
    const creator = getCreatorById(creatorId);
    const tab = state.creatorTab || "works";
    const ownerView = isCreatorOwner(state, creatorId);
    const ownerBanner = ownerView ? `
      <section class="glass-panel creator-owner-banner">
        <div>
          <span class="eyebrow">Creator Workspace</span>
          <h2>这是你的创作者主页</h2>
          <p>V5 会在保留原主页视觉的前提下，把上传、收益、审核状态和作品管理整合进来。</p>
        </div>
        <div class="creator-owner-grid">
          <article>
            <span>待审核</span>
            <strong>4 个素材</strong>
          </article>
          <article>
            <span>本月收益</span>
            <strong>￥18,600</strong>
          </article>
          <article>
            <span>草稿箱</span>
            <strong>${escapeHtml(state.uploadStatus || "草稿未提交")}</strong>
          </article>
        </div>
        <div class="creator-owner-actions">
          <a class="button button-primary" href="#upload">${icon("upload")} 上传新作品</a>
          <a class="button button-ghost" href="#downloads">${icon("download")} 查看收益与下载</a>
        </div>
      </section>
    ` : "";
    if (creatorId === "marcus-thorne") {
      const body = `
      <section class="creator-shell">
        <header class="creator-hero-v4">
          <div class="creator-hero-avatar">
            ${image(creator.image, creator.name, "creator-hero-avatar-image")}
          </div>
          <div class="creator-hero-copy">
            <span class="eyebrow profile-kicker">Creator Archive</span>
            <h1>${escapeHtml(creator.name)}</h1>
            <p>${escapeHtml(creator.bio)}</p>
            <div class="creator-hero-stats">
              ${Object.entries(creator.stats).map(([label, value]) => `
                <article class="creator-stat-card creator-stat-card-dark">
                  <strong>${escapeHtml(value)}</strong>
                  <span>${escapeHtml(label)}</span>
                </article>
              `).join("")}
            </div>
          </div>
          <div class="creator-hero-actions">
            <a class="button button-ghost" href="${ownerView ? "#upload" : "#support"}">${ownerView ? "作品设置" : "分享"}</a>
            <a class="button button-ghost" href="${ownerView ? "#downloads" : "#support"}">${ownerView ? "收益中心" : "联系"}</a>
          </div>
        </header>

        ${ownerView ? renderProfileActions() : ""}
        ${ownerBanner}

        <section class="creator-tools-banner">
          <div>
            <span class="eyebrow profile-kicker">${ownerView ? "Workspace Ready" : "Creator Upgrade"}</span>
            <h2>${ownerView ? "你的工作台已启用" : "Unlock Studio Tools"}</h2>
            <p>${ownerView ? "继续沿用你原本的创作者主页风格，同时把上传、审核与收益入口放进同一页面。" : "Join the creator program to access advanced rendering nodes, commercial licensing, and monetization features."}</p>
          </div>
          <a class="button button-primary" href="${ownerView ? "#upload" : "#creator-onboarding"}">${ownerView ? "继续上传" : "成为创作者"}</a>
        </section>

        <nav class="creator-tabs-v4" aria-label="创作者内容切换">
          <button class="${tab === "works" ? "active" : ""}" type="button" ${pressedAttr(tab === "works")} data-action="set-creator-tab" data-tab="works">个人作品</button>
          <button class="${tab === "assets" ? "active" : ""}" type="button" ${pressedAttr(tab === "assets")} data-action="set-creator-tab" data-tab="assets">已上传素材</button>
          <button class="${tab === "collections" ? "active" : ""}" type="button" ${pressedAttr(tab === "collections")} data-action="set-creator-tab" data-tab="collections">收藏</button>
        </nav>

        ${tab === "works" ? creatorWorkCards(creator) : ""}
        ${tab === "assets" ? `
          <div class="creator-assets-list">
            ${creator.assets.map((id) => {
              const asset = getAssetById(id);
              return `
                <a class="creator-asset-row" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">
                  ${image(asset.image, asset.name, "creator-asset-image")}
                  <div class="creator-asset-copy">
                    <h3>${escapeHtml(asset.name)}</h3>
                    <p>${escapeHtml(asset.meta)} · ${escapeHtml(asset.price)}</p>
                  </div>
                </a>
              `;
            }).join("")}
          </div>
        ` : ""}
        ${tab === "collections" ? creatorCollectionCards(state) : ""}
      </section>
    `;
      return pageShell("创作者主页", creator.name, creator.role, body, "creator-page creator-page-v4 creator-page-dark");
    }

    if (creatorId === "aria-jin") {
      return pageShell("创作者主页", creator.name, creator.role, `
        <section class="creator-studio-shell">
          <header class="creator-studio-hero">
            <div class="creator-studio-avatar">${image(creator.image, creator.name, "creator-studio-avatar-image")}</div>
            <div class="creator-studio-copy">
              <span class="eyebrow profile-kicker">Creator Studio</span>
              <h1>${escapeHtml(creator.name)}</h1>
              <p>${escapeHtml(creator.bio)}</p>
              <div class="chips">${creator.focus.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
            </div>
            <div class="creator-studio-actions">
              <a class="button button-primary" href="#upload">${icon("add")} 上传作品</a>
              <a class="button button-ghost" href="#downloads">${icon("payments")} 收益中心</a>
            </div>
          </header>
          ${ownerView ? renderProfileActions() : ""}
          ${ownerBanner}
          <div class="creator-studio-metrics">
            ${[
              ["总浏览量", "1.2M"],
              ["作品下载量", "34.5K"],
              ["关注者", "12.8K"],
              ["累计收益", "￥89,400"]
            ].map(([label, value]) => `<article class="creator-metric-card"><span>${label}</span><strong>${value}</strong></article>`).join("")}
          </div>
          <nav class="creator-studio-tabs" aria-label="Creator workspace tabs">
            <button class="${tab === "works" ? "active" : ""}" type="button" ${pressedAttr(tab === "works")} data-action="set-creator-tab" data-tab="works">My Works</button>
            <button class="${tab === "assets" ? "active" : ""}" type="button" ${pressedAttr(tab === "assets")} data-action="set-creator-tab" data-tab="assets">Shared Assets</button>
            <button class="${tab === "collections" ? "active" : ""}" type="button" ${pressedAttr(tab === "collections")} data-action="set-creator-tab" data-tab="collections">Collections</button>
          </nav>
          ${tab === "works" ? creatorWorkCards(creator) : ""}
          ${tab === "assets" ? `<div class="creator-assets-list">${creator.assets.map((id) => {
            const asset = getAssetById(id);
            return `<a class="creator-asset-row" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">${image(asset.image, asset.name, "creator-asset-image")}<div class="creator-asset-copy"><h3>${escapeHtml(asset.name)}</h3><p>${escapeHtml(asset.meta)}</p></div></a>`;
          }).join("")}</div>` : ""}
          ${tab === "collections" ? creatorCollectionCards(state) : ""}
        </section>
      `, "creator-page creator-page-studio");
    }

    return pageShell("创作者主页", creator.name, creator.role, `
      <section class="creator-gallery-shell">
        <header class="creator-gallery-hero">
          <div class="creator-gallery-avatar">${image(creator.image, creator.name, "creator-gallery-avatar-image")}</div>
          <div class="creator-gallery-copy">
            <span class="eyebrow profile-kicker">Curated Portfolio</span>
            <h1>${escapeHtml(creator.name)}</h1>
            <p>${escapeHtml(creator.role)} · Stockholm, SE</p>
            <div class="creator-gallery-actions">
              <a class="button button-ghost" href="${ownerView ? "#upload" : "#support"}">${ownerView ? "管理作品" : "Contact"}</a>
              <a class="button button-primary" href="${ownerView ? "#downloads" : "#collections"}">${ownerView ? "收益中心" : "Follow"}</a>
              <a class="icon-button" href="${ownerView ? "#collections" : "#support"}" aria-label="${ownerView ? "进入收藏" : "分享"}">${icon(ownerView ? "folder_special" : "share")}</a>
            </div>
          </div>
        </header>
        ${ownerView ? renderProfileActions() : ""}
        ${ownerBanner}
        <div class="creator-gallery-stats">
          ${Object.entries(creator.stats).map(([label, value]) => `<article class="creator-stat-card creator-stat-card-light"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`).join("")}
        </div>
        <nav class="creator-gallery-tabs" aria-label="创作者内容切换">
          <button class="${tab === "works" ? "active" : ""}" type="button" ${pressedAttr(tab === "works")} data-action="set-creator-tab" data-tab="works">个人作品</button>
          <button class="${tab === "assets" ? "active" : ""}" type="button" ${pressedAttr(tab === "assets")} data-action="set-creator-tab" data-tab="assets">已上传素材</button>
          <button class="${tab === "collections" ? "active" : ""}" type="button" ${pressedAttr(tab === "collections")} data-action="set-creator-tab" data-tab="collections">收藏</button>
        </nav>
        ${tab === "works" ? creatorWorkCards(creator) : ""}
        ${tab === "assets" ? `<div class="creator-assets-list">${creator.assets.map((id) => {
          const asset = getAssetById(id);
          return `<a class="creator-asset-row white" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">${image(asset.image, asset.name, "creator-asset-image")}<div class="creator-asset-copy"><h3>${escapeHtml(asset.name)}</h3><p>${escapeHtml(asset.meta)}</p></div></a>`;
        }).join("")}</div>` : ""}
        ${tab === "collections" ? creatorCollectionCards(state) : ""}
      </section>
    `, "creator-page creator-page-gallery");
  }

  function renderUpload(appContent, state) {
    const upload = appContent.flows.upload;
    const index = state.uploadStep || 0;
    const current = upload.steps[index];
    const body = `
      <div class="upload-shell">
        <aside class="glass-panel upload-sidebar">
          ${upload.steps.map((step, stepIndex) => `
            <button class="upload-step ${stepIndex === index ? "active" : ""}" type="button" data-action="go-upload-step" data-step="${stepIndex}">
              <span>${String(stepIndex + 1).padStart(2, "0")}</span>
              <strong>${escapeHtml(step.label)}</strong>
            </button>
          `).join("")}
        </aside>
        <section class="glass-panel upload-stage">
          <span class="eyebrow">当前步骤</span>
          <h2>${escapeHtml(current.label)}</h2>
          <p>当前状态：${escapeHtml(state.uploadStatus || "草稿未提交")}。这一页保留了专业工具式流程感，但不会上传任何文件。</p>
          <div class="form-grid upload-form-grid">
            ${current.fields.map((field) => `<label class="glass-panel form-field"><span>${escapeHtml(field)}</span><input type="text" placeholder="原型占位，不会提交真实数据"></label>`).join("")}
          </div>
          <div class="upload-preview-grid">
            ${upload.sidecards.map((card) => `<article class="glass-panel upload-sidecard"><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p></article>`).join("")}
          </div>
          <div class="workflow-actions">
            <button class="button button-ghost" type="button" data-action="prev-upload-step">上一步</button>
            <button class="button button-primary" type="button" data-action="${index === upload.steps.length - 1 ? "submit-upload" : "next-upload-step"}">${index === upload.steps.length - 1 ? "提交审核" : "下一步"}</button>
          </div>
        </section>
      </div>
      <div class="notice-panel glass-panel"><strong>安全说明</strong><p>当前没有后端接口，也不会上传文件或发送任何个人信息。正式开发时需要服务端校验、鉴权、限流和审核日志。</p></div>
    `;
    return pageShell("上传发布", upload.title, upload.subtitle, body, "upload-page");
  }

  function renderAuth(appContent, state) {
    const auth = appContent.flows.auth;
    const signedIn = state.signedIn;
    const configured = state.authConfigured;
    const busy = state.authBusy;
    const error = state.authError;
    const profile = getAuthProfile(state);
    const homeRoute = state.profileHomeHref || "#account";
    const authMode = state.authMode || "none";
    const body = `
      <div class="auth-grid">
        <article class="glass-panel auth-card auth-card-primary">
          <div class="auth-card-shell">
            <header class="auth-card-head">
              <span class="eyebrow">Account Access</span>
              <h2>${signedIn ? "当前已登录" : "登录注册"}</h2>
              <p>${signedIn ? "你已经接入当前角色主页，可直接进入个人空间继续操作。" : "继续沿用现有页面结构，只把账号校验、角色分流和主页入口接到真实流程里。"}</p>
            </header>
            ${signedIn ? `
              <div class="auth-status-block">
                <strong>${escapeHtml(profile ? profile.displayName : "S-parks 用户")}</strong>
                <p>${escapeHtml(profile ? profile.email : "")}</p>
                <span class="account-badge">${escapeHtml(roleStatusText(profile ? profile.role : "user"))}</span>
              </div>
              <div class="auth-actions">
                <a class="button button-primary" href="${escapeHtml(homeRoute)}">进入我的主页</a>
                <button class="button button-ghost" type="button" data-action="sign-out">退出登录</button>
              </div>
            ` : `
              <form class="auth-form" data-auth-form>
                <input name="identifier" type="text" placeholder="账号或邮箱" autocomplete="username">
                <input name="password" placeholder="密码" type="password" autocomplete="current-password">
                <button class="button button-primary" type="submit" ${busy ? "disabled" : ""}>${busy ? "登录中..." : "登录进入主页"}</button>
              </form>
              ${error ? `<p class="auth-message auth-message-error">${escapeHtml(error)}</p>` : ""}
              ${configured ? `
                <p class="auth-message">登录成功后会根据账号角色进入普通用户、创作者或管理员主页。</p>
                ${authMode === "local" ? `<p class="auth-message auth-message-warning">当前正在使用本地开发测试账号模式。部署到公开站点前应切换到真实 Supabase 配置。</p>` : ""}
              ` : `<p class="auth-message auth-message-warning">当前未启用任何登录配置。</p>`}
            `}
          </div>
        </article>
        <article class="glass-panel auth-card auth-card-secondary">
          <div class="auth-card-shell">
            <header class="auth-card-head">
              <span class="eyebrow">Role Routing</span>
              <h2>登录后会发生什么</h2>
              <p>账号会先完成身份识别，再把你导向对应的角色主页，保持原有浏览动线不被打断。</p>
            </header>
            <div class="auth-step-list">
              ${auth.steps.map((step) => `
                <p class="auth-step-item">
                  ${icon("check_circle")}
                  <span>${escapeHtml(step)}</span>
                </p>
              `).join("")}
            </div>
            <div class="auth-card-note">
              <strong>当前方案</strong>
              <p>保留原本登录页 UI，不重做页面，只把原型按钮改成真实账号校验和角色分流。</p>
            </div>
          </div>
        </article>
      </div>
    `;
    return pageShell("登录注册", auth.title, auth.subtitle, body, "auth-page");
  }

  function renderLicensing(appContent, state) {
    const flow = appContent.flows.licensing;
    const currentAssetId = state.detailAssetId || DEFAULT_ASSET.id;
    const currentAsset = appContent.details[currentAssetId];
    const purchased = state.downloadRecords.some((record) => record.assetId === currentAssetId);
    const body = `
      ${timeline(flow.steps, purchased ? 4 : 2)}
      <div class="license-stage">
        <div class="license-card glass-panel">
          <span>当前素材</span>
          <h2>${escapeHtml(currentAsset.title)}</h2>
          <p>${escapeHtml(currentAsset.price)} · 购买后自动写入下载中心。</p>
        </div>
        <div class="license-card glass-panel">
          <span>账户积分</span>
          <h2>${escapeHtml(state.pointsBalance.toLocaleString("zh-CN"))} 积分</h2>
          <p>${purchased ? "已生成授权记录，可进入下载阶段。" : "确认购买后将自动生成模拟授权记录。"}</p>
          <div class="hero-actions left-actions">
            <button class="button button-primary" type="button" data-action="buy-license">${purchased ? "已购买" : "确认购买授权"}</button>
            ${purchased ? `<a class="button button-ghost" href="#downloads">前往下载中心</a>` : ""}
          </div>
        </div>
      </div>
    `;
    return pageShell("购买授权", flow.title, flow.subtitle, body, "licensing-page");
  }

  function renderDownloads(appContent, state) {
    const downloadSummary = state.downloadSummary || appContent.downloads.summary;
    const downloadRecords = state.downloadRecords || appContent.downloads.records;
    const downloadActivity = state.downloadActivity || appContent.downloads.activity;
    const downloadQueue = state.downloadQueue || appContent.downloads.queue;
    const body = `
      <div class="creator-dashboard">
        ${downloadSummary.map((item) => `
          <article class="glass-panel metric-panel">
            <span class="eyebrow">${escapeHtml(item.label)}</span>
            <h3>${escapeHtml(item.value)}</h3>
            <p>围绕授权与下载形成更清楚的账户状态反馈。</p>
          </article>
        `).join("")}
      </div>
      <div class="downloads-grid">
        <article class="glass-panel downloads-panel">
          <span class="eyebrow">授权记录</span>
          ${downloadRecords.map((record) => {
            const asset = getAssetById(record.assetId);
            return `
              <div class="record-row">
                <div>
                  <strong>${escapeHtml(record.id)}</strong>
                  <h3>${escapeHtml(asset.name)}</h3>
                  <p>${escapeHtml(record.scope)} · ${escapeHtml(record.updated)}</p>
                </div>
                <div class="record-side">
                  <span>${escapeHtml(record.status)}</span>
                  <em>${escapeHtml(record.points)}</em>
                </div>
              </div>
            `;
          }).join("")}
        </article>
        <article class="glass-panel downloads-panel">
          <span class="eyebrow">最近活动</span>
          <div class="info-list">${downloadActivity.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>
          <div class="download-queue">
            ${downloadQueue.map((item) => `<article class="glass-panel queue-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}
          </div>
        </article>
      </div>
      <section class="scene-strip">
        <div class="section-title">
          <span class="eyebrow">最近下载</span>
          <h2>把已购素材重新组织成可继续工作的资产区</h2>
        </div>
        <div class="asset-grid">
          ${downloadRecords.map((record, index) => assetCard(getAssetById(record.assetId), { wide: index === 0 })).join("")}
        </div>
      </section>
    `;
    return pageShell("下载中心", appContent.downloads.title, appContent.downloads.subtitle, body, "downloads-page");
  }

  function renderMembership(appContent, state) {
    const flow = appContent.flows.membership;
    const selected = state.selectedPlan || "Trial";
    const body = `<div class="pricing-grid">${flow.tiers.map((tier) => `<article class="glass-panel price-card ${selected === tier.name ? "selected" : ""}"><span>${escapeHtml(tier.name)}</span><h2>${escapeHtml(tier.points)}</h2><p>${escapeHtml(tier.note)}</p><button class="button ${selected === tier.name ? "button-primary" : "button-ghost"} compact" type="button" data-action="select-plan" data-plan="${escapeHtml(tier.name)}">${selected === tier.name ? "当前方案" : "选择方案"}</button></article>`).join("")}</div>`;
    return pageShell("积分会员", flow.title, flow.subtitle, body, "membership-page");
  }

  function renderAdmin(appContent, state) {
    const flow = appContent.flows.admin;
    if (!state.signedIn) {
      return pageShell("管理员主页", flow.title, "需要登录", `
        <section class="account-shell">
          <section class="account-hero">
            <h1>管理员主页需要登录</h1>
            <p>请先使用管理员账号登录，再进入审核主页。</p>
            <div class="account-entry-actions">
              <a class="button button-primary" href="#auth">前往登录</a>
            </div>
          </section>
        </section>
      `, "admin-page");
    }

    if (!isAdminViewer(state)) {
      return pageShell("管理员主页", "当前账号无权限", "仅管理员可访问", `
        <section class="account-shell">
          <section class="account-creator-callout">
            <div class="account-creator-frame">
              <span class="eyebrow">Access Control</span>
              <h2>当前账号没有管理员权限</h2>
              <p>V5 已加上角色权限控制。普通用户和创作者不能进入管理员主页。</p>
              <div class="account-entry-actions">
                <a class="button button-primary" href="${escapeHtml(state.profileHomeHref || "#account")}">返回我的主页</a>
              </div>
            </div>
          </section>
        </section>
      `, "admin-page");
    }

    const profile = getAuthProfile(state);
    const reviews = (state.reviewItems && state.reviewItems.length ? state.reviewItems : flow.reviewItems).map((item) => ({
      ...item,
      status: state.reviewDecisions[item.id] || item.status
    }));
    const stats = {
      pending: reviews.filter((item) => item.status === "待审核").length,
      revise: reviews.filter((item) => item.status === "待补充").length,
      approved: reviews.filter((item) => item.status === "已通过").length,
      recheck: reviews.filter((item) => item.status === "复核中").length
    };
    const body = `
      <section class="admin-shell-v5">
        <section class="profile-overview profile-overview-admin">
          <article class="profile-identity-card profile-surface-card profile-surface-card-dark">
            <div class="profile-identity-main">
              <div class="account-avatar">${image((profile && profile.avatarUrl) || "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8whoU5MlIADYjJiOYQoBI2AAqeaFfBwFyBKVOHXyic5TlVsXl26WlsWzTeXdwuO1x8D1goEHUbNzeojIxQ1UOjmVGu2G3zzRL85LLHsBXxMjOoIy22ZSwN1TShvPC5Xn6LsA2gjcGl3xvC-OUM28MqwfDsmH3g6eeKMtBTbM-30EOkGoV6UmAXaLDMO0OXMCgG7H5_cqd6SWR6IfqpGmPm2B0VwTWQMCiPY4E5U6SPrgJGo6BS6Le1nPBHTC8ieblPVKvdfL8jYd", "admin", "account-avatar-image")}</div>
              <div class="profile-identity-copy">
                <span class="eyebrow profile-kicker">Admin Control</span>
                <h1>${escapeHtml(profile ? profile.displayName : "平台管理员")}</h1>
                <p class="profile-identity-primary">${escapeHtml(profile ? profile.email : "")}</p>
                <div class="profile-identity-meta">
                  <span class="account-badge">平台管理员</span>
                  <span class="profile-meta-pill">审核权限已启用</span>
                </div>
              </div>
            </div>
            ${renderProfileActions("profile-page-actions-inline")}
          </article>
          <article class="profile-surface-card profile-surface-card-dark profile-spotlight-card admin-spotlight-card">
            <span class="eyebrow">Moderation Pulse</span>
            <h2>把审核动作收进同一条阅读链路</h2>
            <p>这一版优先把待审核、待补充、复核与已通过状态对齐到同一套版式和操作区，减少审核时的视觉跳跃。</p>
            <div class="profile-meta-grid">
              <article>
                <span>待审核</span>
                <strong>${stats.pending} 个</strong>
              </article>
              <article>
                <span>复核中</span>
                <strong>${stats.recheck} 个</strong>
              </article>
            </div>
          </article>
        </section>

        <section class="account-summary">
          ${[
            ["待审核素材", `${stats.pending} 个`, "优先处理新提交素材"],
            ["待补充资料", `${stats.revise} 个`, "继续追踪版权与标签缺口"],
            ["本轮已通过", `${stats.approved} 个`, "保持审核节奏稳定"],
            ["版权复核", `${stats.recheck} 个`, "聚焦高风险条目"]
          ].map(([title, value, text]) => `
            <article class="account-panel">
              <div class="account-panel-head">${icon("shield")}<h2>${escapeHtml(title)}</h2></div>
              <strong>${escapeHtml(value)}</strong>
              <p>${escapeHtml(text)}</p>
            </article>
          `).join("")}
        </section>

        <section class="admin-toolbar">
          <div class="section-title">
            <h2>审核工作台</h2>
            <p>沿用个人主页的阅读节奏，把审核动作收进同一页面完成。</p>
          </div>
          <div class="account-entry-actions">
            <button class="button button-ghost" type="button" data-action="refresh-admin-queue">刷新队列</button>
          </div>
        </section>

        <section class="admin-review-list">
          ${reviews.map((item) => `
            <article class="glass-panel admin-review-card">
              <div class="admin-review-copy">
                <span class="eyebrow">${escapeHtml(item.id)} · ${escapeHtml(item.category || "素材审核")}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.owner)} · ${escapeHtml(item.risk)}</p>
              </div>
              <div class="admin-review-side">
                <strong class="admin-status-chip">${escapeHtml(item.status)}</strong>
                <div class="admin-review-actions">
                  <button class="button button-ghost compact" type="button" data-action="review-approve" data-id="${escapeHtml(item.id)}">通过</button>
                  <button class="button button-ghost compact" type="button" data-action="review-request-changes" data-id="${escapeHtml(item.id)}">待补充</button>
                  <button class="button button-ghost compact" type="button" data-action="review-reject" data-id="${escapeHtml(item.id)}">驳回</button>
                </div>
              </div>
            </article>
          `).join("")}
        </section>

        <section class="account-settings">
          <div class="section-title"><h2>审核准则速览</h2></div>
          <div class="account-settings-list">
            ${[
              "优先检查素材版权来源是否完整",
              "核对标签、风格和授权范围是否清晰",
              "对高风险条目保留复核状态",
              "所有管理员操作都应可继续扩展为审核日志"
            ].map((item) => `
              <article class="account-settings-row">
                <span>${escapeHtml(item)}</span>
                ${icon("chevron_right")}
              </article>
            `).join("")}
          </div>
        </section>
      </section>
    `;
    return pageShell("管理员主页", flow.title, flow.subtitle, body, "admin-page");
  }

  function renderSearch(appContent, state) {
    const flow = appContent.flows.search;
    const query = state.query.trim();
    const selected = state.selectedCategory || "全部";
    const body = `
      <div class="search-summary glass-panel">
        <span>当前搜索</span>
        <strong>${escapeHtml(query || "未输入关键词")}</strong>
        <p>${selected === "全部" ? "正在浏览全部素材。" : `当前只查看 ${escapeHtml(selected)} 分类。`}</p>
      </div>
      ${renderAssetBrowser(appContent, state, false)}
    `;
    return pageShell("搜索结果", flow.title, flow.subtitle, body, "search-page");
  }

  function renderCollections(appContent, state) {
    const projects = Object.entries(state.projects || appContent.projects);
    const count = state.collectionCount || 0;
    const pendingCount = state.pendingPurchaseCount || 0;
    const body = `
      <div class="creator-dashboard">
        <article class="glass-panel metric-panel">
          <span class="eyebrow">项目夹总数</span>
          <h3>${projects.length} 个</h3>
          <p>把收藏从素材堆积升级成真正的创作工作区。</p>
        </article>
        <article class="glass-panel metric-panel">
          <span class="eyebrow">已收藏素材</span>
          <h3>${count} 个</h3>
          <p>跨角色、场景、服装和道具统一管理。</p>
        </article>
        <article class="glass-panel metric-panel">
          <span class="eyebrow">待购买项</span>
          <h3>${pendingCount} 个</h3>
          <p>优先补齐正在推进的项目缺口。</p>
        </article>
      </div>
      <div class="collection-grid">${projects.map(([id, project], index) => `<article class="glass-panel collection-card">${icon("folder")}
      <h2>${escapeHtml(project.name)}</h2><div class="chips"><span>${escapeHtml(project.stage)}</span><span>${escapeHtml(project.owner)}</span></div><p>${index === 0 && count ? `已收藏 ${count} 个素材，包含武士角色三视图。` : escapeHtml(project.summary)}</p><div class="collection-meta">${project.stats.map((item) => `<span>${escapeHtml(item.value)}</span>`).join("")}</div><a class="button button-ghost compact" href="${escapeHtml(hrefFor("project", id))}" data-action="open-project" data-project="${escapeHtml(id)}">查看详情</a></article>`).join("")}</div>
    `;
    return pageShell("收藏夹", appContent.flows.collections.title, appContent.flows.collections.subtitle, body, "collections-page");
  }

  function renderProject(appContent, state) {
    const projects = state.projects || appContent.projects;
    const projectId = state.activeProjectId || DEFAULT_PROJECT_ID;
    const project = getProjectById(projects, projectId);
    const body = `
      <div class="project-shell">
        <article class="glass-panel project-summary">
          <span class="eyebrow">项目简介</span>
          <h2>${escapeHtml(project.name)}</h2>
          <div class="chips">
            <span>${escapeHtml(project.stage)}</span>
            <span>${escapeHtml(project.owner)}</span>
          </div>
          <p>${escapeHtml(project.summary)}</p>
          <div class="notice-panel glass-panel project-note"><strong>当前缺口</strong><p>${escapeHtml(project.note)}</p></div>
        </article>
        <article class="glass-panel project-summary">
          <span class="eyebrow">Prompt 备注</span>
          <div class="info-list">${project.prompts.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>
        </article>
      </div>
      <div class="creator-dashboard">
        ${project.stats.map((item) => `
          <article class="glass-panel metric-panel">
            <span class="eyebrow">${escapeHtml(item.label)}</span>
            <h3>${escapeHtml(item.value)}</h3>
            <p>帮助用户快速判断项目夹当前的补齐进度。</p>
          </article>
        `).join("")}
      </div>
      <div class="project-assets">
        ${project.assets.map((entry) => {
          const asset = getAssetById(entry.assetId);
          return `
            <article class="glass-panel project-asset-row">
              <div class="project-asset-copy">
                <span>${escapeHtml(entry.state)}</span>
                <h3>${escapeHtml(asset.name)}</h3>
                <p>${escapeHtml(asset.meta)} · ${escapeHtml(asset.price)}</p>
              </div>
              <div class="hero-actions left-actions">
                <a class="button button-ghost compact" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">查看素材</a>
                ${entry.state === "待购买" ? `<a class="button button-primary compact" href="${escapeHtml(hrefFor("detail", asset.id))}" data-action="open-detail" data-asset="${escapeHtml(asset.id)}">继续补齐</a>` : ""}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
    return pageShell("项目夹详情", "项目夹详情", "把收藏夹升级成真正可承载素材、购买状态和创作备注的项目工作区。", body, "project-page");
  }

  function timeline(steps, active = 1) {
    return `<div class="timeline">${steps.map((step, index) => `<article class="glass-panel timeline-step ${index < active ? "active" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(step)}</h2></article>`).join("")}</div>`;
  }

  const renderers = {
    home: renderHome,
    assets: renderAssets,
    community: renderCommunity,
    support: renderSupport,
    detail: renderDetail,
    creator: renderCreator,
    "creator-onboarding": renderCreatorOnboarding,
    account: (_, state) => renderAccount(state),
    upload: renderUpload,
    auth: renderAuth,
    licensing: renderLicensing,
    downloads: renderDownloads,
    membership: renderMembership,
    admin: renderAdmin,
    search: renderSearch,
    collections: renderCollections,
    project: renderProject
  };

  return { renderers };
})(window.SparksUtils);
