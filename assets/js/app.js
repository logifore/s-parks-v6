"use strict";

(() => {
  const content = window.SPARKS_CONTENT;
  const router = window.SparksRouter;
  const particles = window.SparksParticles;
  const { escapeHtml } = window.SparksUtils;
  const assetIds = new Set(content.assets.items.map((item) => item.id));
  const creatorIds = new Set(Object.keys(content.creators));
  const projectIds = new Set(Object.keys(content.projects));
  const DEFAULT_ASSET_ID = content.assets.items[0].id;
  const DEFAULT_CREATOR_ID = content.community.people[0];
  const DEFAULT_PROJECT_ID = "short-drama-a";
  const CREATOR_TABS = new Set(["works", "assets", "collections"]);
  const FILTER_CATEGORIES = new Set(["全部", "角色", "环境", "载具", "分镜脚本"]);
  const SCENE_TIME_KEYS = new Set(["day", "dusk", "night"]);

  function cloneValue(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function cloneProjects() {
    return cloneValue(content.projects);
  }

  function cloneDownloadRecords() {
    return cloneValue(content.downloads.records);
  }

  function cloneDownloadActivity() {
    return [...content.downloads.activity];
  }

  function cloneDownloadQueue() {
    return cloneValue(content.downloads.queue);
  }

  function normalizeFilterCategory(category) {
    return FILTER_CATEGORIES.has(category) ? category : "全部";
  }

  function getAssetById(assetId) {
    return content.assets.items.find((item) => item.id === assetId) || content.assets.items[0];
  }

  function isKnownAsset(assetId) {
    return assetIds.has(assetId);
  }

  function isKnownCreator(creatorId) {
    return creatorIds.has(creatorId);
  }

  function isKnownProject(projectId) {
    return projectIds.has(projectId);
  }

  function countPendingPurchases() {
    const pending = new Set();
    Object.values(state.projects).forEach((project) => {
      project.assets.forEach((entry) => {
        if (entry.state !== "已购") pending.add(entry.assetId);
      });
    });
    return pending.size;
  }

  const state = {
    route: router.routeFromHash(),
    query: "",
    menuOpen: false,
    creatorMenuOpen: false,
    selectedCategory: "全部",
    sceneTime: "day",
    collectionCount: 0,
    uploadStatus: "草稿未提交",
    uploadStep: 0,
    signedIn: false,
    licensePurchased: false,
    selectedPlan: "Trial",
    creatorTab: "works",
    reviewDecisions: {},
    detailAssetId: DEFAULT_ASSET_ID,
    activeCreatorId: DEFAULT_CREATOR_ID,
    activeProjectId: DEFAULT_PROJECT_ID,
    projects: cloneProjects(),
    downloadRecords: cloneDownloadRecords(),
    downloadActivity: cloneDownloadActivity(),
    downloadQueue: cloneDownloadQueue(),
    pointsBalance: 10000,
    downloadSummary: [],
    pendingPurchaseCount: 0
  };

  function recomputeCollectionCount() {
    const unique = new Set();
    Object.values(state.projects).forEach((project) => {
      project.assets.forEach((entry) => unique.add(entry.assetId));
    });
    state.collectionCount = unique.size;
  }

  function recomputeProjectStats(projectId) {
    const project = state.projects[projectId];
    if (!project) return;
    const total = Math.max(project.assets.length + (projectId === "wishlist" ? 0 : 3), project.assets.length);
    const purchased = project.assets.filter((entry) => entry.state === "已购").length;
    const missing = project.assets.filter((entry) => entry.state !== "已购").map((entry) => {
      return getAssetById(entry.assetId).name;
    });
    project.stats = [
      { label: "已收集素材", value: `${project.assets.length} / ${total}` },
      { label: "已购完成度", value: `${Math.round((purchased / Math.max(project.assets.length, 1)) * 100)}%` },
      { label: "待补缺口", value: missing.length ? missing.slice(0, 2).join(" + ") : "已补齐" }
    ];
  }

  function recomputeAllProjectStats() {
    Object.keys(state.projects).forEach(recomputeProjectStats);
  }

  function recomputeDownloadSummary() {
    const downloadable = state.downloadRecords.filter((record) => record.status === "可下载").length;
    state.downloadSummary = [
      { label: "可下载素材", value: `${downloadable} 个` },
      { label: "本周授权", value: `${state.downloadRecords.length} 条` },
      { label: "剩余积分", value: `${state.pointsBalance.toLocaleString("zh-CN")} 积分` }
    ];
  }

  function recomputePendingPurchaseCount() {
    state.pendingPurchaseCount = countPendingPurchases();
  }

  function recomputeProjectDerivedState() {
    recomputeAllProjectStats();
    recomputeCollectionCount();
    recomputePendingPurchaseCount();
  }

  function recomputeDownloadDerivedState() {
    recomputeDownloadSummary();
    recomputePendingPurchaseCount();
  }

  function syncRouteState() {
    state.route = router.routeFromHash();
    const params = router.paramsFromHash();
    const query = typeof params.q === "string" ? params.q : "";

    if (state.route === "detail" || state.route === "licensing") {
      state.detailAssetId = isKnownAsset(params.asset) ? params.asset : DEFAULT_ASSET_ID;
      state.sceneTime = SCENE_TIME_KEYS.has(params.time) ? params.time : state.sceneTime || "day";
    }

    if (state.route === "creator") {
      state.activeCreatorId = isKnownCreator(params.creator) ? params.creator : DEFAULT_CREATOR_ID;
      state.creatorTab = CREATOR_TABS.has(params.tab) ? params.tab : state.creatorTab || "works";
    }

    if (state.route === "project") {
      state.activeProjectId = isKnownProject(params.project) ? params.project : DEFAULT_PROJECT_ID;
    }

    if (state.route === "assets" || state.route === "search") {
      state.selectedCategory = normalizeFilterCategory(params.category);
      state.query = query;
    } else if (query) {
      state.query = query;
    }
  }

  recomputeProjectDerivedState();
  recomputeDownloadSummary();

  const app = document.getElementById("app");
  const header = document.querySelector(".site-header");
  const brandLink = document.querySelector(".brand");
  const nav = document.querySelector("[data-site-nav]");
  const menuButton = document.querySelector("[data-menu-button]");
  const headerActions = document.querySelector(".header-actions");
  const searchInput = document.getElementById("site-search");
  const siteFooter = document.querySelector(".site-footer");
  let creatorMenuCloseTimer = 0;
  let lastMenuFocusTarget = null;
  let focusMainOnNextHashChange = true;

  function isMobileViewport() {
    return window.innerWidth <= 920;
  }

  function setElementModalState(element, hidden) {
    if (!element) return;
    element.inert = hidden;
    element.setAttribute("aria-hidden", String(hidden));
  }

  function syncMobileModalState() {
    const mobileOverlayOpen = state.menuOpen && isMobileViewport();
    setElementModalState(app, mobileOverlayOpen);
    setElementModalState(brandLink, mobileOverlayOpen);
    setElementModalState(headerActions, mobileOverlayOpen);
    setElementModalState(siteFooter, mobileOverlayOpen);
    nav.inert = !state.menuOpen && isMobileViewport();
  }

  function updateSearchField() {
    if (searchInput.value !== state.query) searchInput.value = state.query;
  }

  function buildAssetRouteParams() {
    const params = {};
    const query = state.query.trim();
    if (query) params.q = query;
    if (state.selectedCategory !== "全部") params.category = state.selectedCategory;
    return params;
  }

  function currentDetailRouteParams() {
    const params = { asset: state.detailAssetId };
    if (SCENE_TIME_KEYS.has(state.sceneTime)) params.time = state.sceneTime;
    return params;
  }

  function focusFirstMenuItem() {
    const target = nav.querySelector("a, button");
    if (target) target.focus({ preventScroll: true });
  }

  function setMenuOpen(open) {
    const wasOpen = state.menuOpen;
    state.menuOpen = Boolean(open);
    if (state.menuOpen && isMobileViewport()) {
      lastMenuFocusTarget = document.activeElement instanceof HTMLElement ? document.activeElement : menuButton;
    }
    if (!state.menuOpen) {
      state.creatorMenuOpen = false;
    }
    document.body.dataset.menuOpen = String(state.menuOpen);
    syncMobileModalState();
    if (state.menuOpen && isMobileViewport()) {
      window.requestAnimationFrame(focusFirstMenuItem);
    }
    if (wasOpen && !state.menuOpen && isMobileViewport()) {
      window.requestAnimationFrame(() => {
        (lastMenuFocusTarget || menuButton).focus({ preventScroll: true });
      });
    }
  }

  function closeMenu() {
    if (!state.menuOpen) return;
    setMenuOpen(false);
    updateChrome();
  }

  function clearCreatorMenuTimer() {
    if (!creatorMenuCloseTimer) return;
    window.clearTimeout(creatorMenuCloseTimer);
    creatorMenuCloseTimer = 0;
  }

  function setCreatorMenuOpen(open, keepVisibleForOneSecond = false) {
    clearCreatorMenuTimer();
    if (!open && keepVisibleForOneSecond) {
      creatorMenuCloseTimer = window.setTimeout(() => {
        state.creatorMenuOpen = false;
        updateChrome();
      }, 1000);
      return;
    }
    state.creatorMenuOpen = Boolean(open);
    updateChrome();
  }

  function renderNav() {
    nav.innerHTML = content.nav.map((item) => {
      if (item.route === "community") {
        return `
          <div class="nav-item nav-item-with-submenu" data-nav-group="creator" data-open="false">
            <a href="#community" data-route="community" data-creator-trigger="true" aria-haspopup="true" aria-expanded="false">${escapeHtml(item.label)}</a>
            <button class="nav-submenu-toggle" type="button" aria-label="展开创作者菜单" aria-haspopup="true" aria-expanded="false" data-creator-menu-toggle>
              <span class="material-symbols-outlined" aria-hidden="true">expand_more</span>
            </button>
            <div class="nav-submenu" aria-label="创作者菜单">
              <a href="#community" data-route="community">浏览创作者</a>
              <a href="#creator-onboarding" data-route="creator-onboarding">成为创作者</a>
            </div>
          </div>
        `;
      }
      return `<a href="#${escapeHtml(item.route)}" data-route="${escapeHtml(item.route)}">${escapeHtml(item.label)}</a>`;
    }).join("");
  }

  function currentPageTone() {
    if (state.route === "community" || state.route === "account" || state.route === "creator-onboarding") {
      return "light";
    }
    if (state.route === "creator") {
      return state.activeCreatorId === "marcus-thorne" ? "dark" : "light";
    }
    return "dark";
  }

  function render(focusMain = false) {
    syncRouteState();
    setMenuOpen(false);
    document.body.dataset.route = state.route;
    document.body.dataset.pageTone = currentPageTone();
    app.innerHTML = router.renderRoute(state.route, state);
    updateSearchField();
    document.title = `S-parks | ${router.navLabel(state.route)}`;
    updateChrome();
    if (focusMain) app.focus({ preventScroll: true });
  }

  function rerender(message) {
    document.body.dataset.route = state.route;
    document.body.dataset.pageTone = currentPageTone();
    app.innerHTML = router.renderRoute(state.route, state);
    updateSearchField();
    updateChrome();
    if (message) showToast(message);
  }

  function updateChrome() {
    nav.querySelectorAll("a[data-route]").forEach((link) => {
      const route = link.dataset.route;
      const active = route === state.route
        || (route === "community" && (state.route === "creator" || state.route === "creator-onboarding"));
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "page" : "false");
    });
    nav.classList.toggle("open", state.menuOpen);
    menuButton.setAttribute("aria-expanded", String(state.menuOpen));
    menuButton.setAttribute("aria-label", state.menuOpen ? "关闭导航" : "打开导航");
    nav.setAttribute("aria-hidden", String(!state.menuOpen && window.innerWidth <= 920));
    const creatorGroup = nav.querySelector("[data-nav-group='creator']");
    const creatorTrigger = nav.querySelector("[data-creator-trigger='true']");
    const creatorMenuToggle = nav.querySelector("[data-creator-menu-toggle]");
    if (creatorGroup) creatorGroup.dataset.open = String(state.creatorMenuOpen);
    if (creatorTrigger) creatorTrigger.setAttribute("aria-expanded", String(state.creatorMenuOpen));
    if (creatorMenuToggle) creatorMenuToggle.setAttribute("aria-expanded", String(state.creatorMenuOpen));
    header.dataset.elevated = String(window.scrollY > 8);
    syncMobileModalState();
  }

  function showToast(message) {
    const old = document.querySelector(".toast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.append(toast);
    window.setTimeout(() => toast.remove(), 2200);
  }

  function goToRoute(route, value = "", options = {}) {
    const nextHash = router.hrefFor(route, value);
    focusMainOnNextHashChange = options.focusMain !== false;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      rerender();
      if (focusMainOnNextHashChange) app.focus({ preventScroll: true });
      focusMainOnNextHashChange = true;
    }
  }

  function handleAction(target) {
    const action = target.dataset.action;
    if (!action) return;

    if (action === "filter-category") {
      state.selectedCategory = normalizeFilterCategory(target.dataset.category);
      if (state.route === "assets" || state.route === "search") {
        goToRoute(state.route, buildAssetRouteParams(), { focusMain: false });
      } else {
        rerender(`已筛选：${state.selectedCategory}`);
      }
      return;
    }

    if (action === "set-scene-time") {
      state.sceneTime = target.dataset.time || "day";
      if (state.route === "detail" || state.route === "licensing") {
        goToRoute(state.route, currentDetailRouteParams(), { focusMain: false });
      } else {
        rerender("已切换场景时间");
      }
      return;
    }

    if (action === "open-detail") {
      state.detailAssetId = isKnownAsset(target.dataset.asset) ? target.dataset.asset : DEFAULT_ASSET_ID;
      goToRoute("detail", state.detailAssetId);
      return;
    }

    if (action === "open-creator") {
      state.activeCreatorId = isKnownCreator(target.dataset.creator) ? target.dataset.creator : DEFAULT_CREATOR_ID;
      state.creatorTab = "works";
      goToRoute("creator", { creator: state.activeCreatorId, tab: state.creatorTab });
      return;
    }

    if (action === "set-creator-tab") {
      state.creatorTab = CREATOR_TABS.has(target.dataset.tab) ? target.dataset.tab : "works";
      if (state.route === "creator") {
        goToRoute("creator", { creator: state.activeCreatorId, tab: state.creatorTab }, { focusMain: false });
      } else {
        rerender();
      }
      return;
    }

    if (action === "open-project") {
      state.activeProjectId = isKnownProject(target.dataset.project) ? target.dataset.project : DEFAULT_PROJECT_ID;
      goToRoute("project", state.activeProjectId);
      return;
    }

    if (action === "collect-asset") {
      state.activeProjectId = DEFAULT_PROJECT_ID;
      const project = state.projects[state.activeProjectId];
      const assetId = state.detailAssetId;
      const exists = project.assets.some((entry) => entry.assetId === assetId);
      if (!exists) {
        project.assets.unshift({ assetId, state: state.downloadRecords.some((record) => record.assetId === assetId) ? "已购" : "待购买" });
        project.prompts.unshift(`新增素材《${getAssetById(assetId).name}》待继续整理用途说明。`);
        recomputeProjectStats(state.activeProjectId);
        recomputeCollectionCount();
        recomputePendingPurchaseCount();
        rerender("已加入短剧项目 A");
        return;
      }
      rerender("已加入短剧项目 A");
      return;
    }

    if (action === "go-upload-step") {
      state.uploadStep = Number(target.dataset.step || 0);
      rerender();
      return;
    }

    if (action === "next-upload-step") {
      state.uploadStep = Math.min(state.uploadStep + 1, content.flows.upload.steps.length - 1);
      rerender("继续完善上传信息");
      return;
    }

    if (action === "prev-upload-step") {
      state.uploadStep = Math.max(state.uploadStep - 1, 0);
      rerender();
      return;
    }

    if (action === "submit-upload") {
      state.uploadStatus = "已提交审核 · 等待平台复核";
      rerender("素材已进入模拟审核队列");
      return;
    }

    if (action === "save-draft") {
      state.uploadStatus = "草稿已保存到本地原型";
      rerender("草稿已保存");
      return;
    }

    if (action === "mock-login") {
      state.signedIn = true;
      rerender("已进入原型账户状态");
      return;
    }

    if (action === "buy-license") {
      const assetId = state.detailAssetId;
      const detail = content.details[assetId];
      const alreadyPurchased = state.downloadRecords.some((record) => record.assetId === assetId);
      if (!alreadyPurchased) {
        const numericPrice = Number.parseInt(detail.price, 10) || 0;
        state.pointsBalance = Math.max(0, state.pointsBalance - numericPrice);
        state.downloadRecords.unshift({
          id: `LIC-${Date.now()}`,
          assetId,
          status: "可下载",
          points: `-${numericPrice}`,
          scope: "单项目商用",
          updated: "刚刚生成"
        });
        state.downloadActivity.unshift(`生成《${detail.title}》授权记录`);
        if (state.downloadQueue.length) {
          state.downloadQueue[0] = { title: "待打包下载", text: `《${detail.title}》已加入待打包下载队列。` };
        }
        Object.values(state.projects).forEach((project) => {
          project.assets.forEach((entry) => {
            if (entry.assetId === assetId) entry.state = "已购";
          });
        });
        recomputeProjectDerivedState();
        recomputeDownloadDerivedState();
      }
      state.licensePurchased = true;
      rerender(alreadyPurchased ? "该素材已存在授权记录" : "已生成模拟授权记录");
      return;
    }

    if (action === "select-plan") {
      state.selectedPlan = target.dataset.plan || "Trial";
      rerender(`已选择 ${state.selectedPlan}`);
      return;
    }

    if (action === "review-approve" || action === "review-reject") {
      const id = target.dataset.id;
      state.reviewDecisions[id] = action === "review-approve" ? "已通过" : "已驳回";
      rerender(`${id} ${state.reviewDecisions[id]}`);
    }
  }

  function bindEvents() {
    window.addEventListener("hashchange", () => {
      render(focusMainOnNextHashChange);
      focusMainOnNextHashChange = true;
    });
    window.addEventListener("scroll", updateChrome, { passive: true });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) {
        setMenuOpen(false);
      }
      updateChrome();
    }, { passive: true });

    menuButton.addEventListener("click", () => {
      setMenuOpen(!state.menuOpen);
      updateChrome();
    });

    nav.addEventListener("click", (event) => {
      const menuToggle = event.target.closest("[data-creator-menu-toggle]");
      if (menuToggle) {
        event.preventDefault();
        event.stopPropagation();
        setCreatorMenuOpen(!state.creatorMenuOpen);
        return;
      }
    });

    const creatorMenuGroup = nav.querySelector("[data-nav-group='creator']");
    if (creatorMenuGroup) {
      creatorMenuGroup.addEventListener("mouseenter", () => setCreatorMenuOpen(true));
      creatorMenuGroup.addEventListener("mouseleave", () => setCreatorMenuOpen(false, true));
      creatorMenuGroup.addEventListener("focusin", () => setCreatorMenuOpen(true));
      creatorMenuGroup.addEventListener("focusout", (event) => {
        if (creatorMenuGroup.contains(event.relatedTarget)) return;
        setCreatorMenuOpen(false, true);
      });
      creatorMenuGroup.addEventListener("click", (event) => {
        if (event.target.closest("a[data-route]")) setCreatorMenuOpen(false);
      });
    }

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a[data-route]")) {
        setCreatorMenuOpen(false);
        closeMenu();
      }
    });

    searchInput.addEventListener("input", (event) => {
      state.query = event.target.value;
      goToRoute("search", buildAssetRouteParams(), { focusMain: false });
    });

    document.addEventListener("click", (event) => {
      if (!state.menuOpen || window.innerWidth > 920) return;
      const insideMenu = event.target.closest("[data-site-nav], [data-menu-button]");
      if (!insideMenu) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setCreatorMenuOpen(false);
        closeMenu();
      }
    });

    app.addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (target) handleAction(target);
    });

    app.addEventListener("submit", (event) => event.preventDefault());
  }

  renderNav();
  bindEvents();
  particles.init(document.getElementById("particle-canvas"));
  render(false);
})();
