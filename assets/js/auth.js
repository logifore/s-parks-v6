"use strict";

window.SparksAuth = (() => {
  const config = window.SPARKS_CONFIG || {};
  const SESSION_KEY = config.authStorageKey || "sparks-v5-session";
  const PROFILE_FIELDS = "id,email,username,display_name,role,creator_id,avatar_url,status";
  const LOCAL_AUTH_DOMAIN = "sparks.local";
  const LOCAL_ACCOUNTS = Array.isArray(config.localAccounts) ? config.localAccounts : [];

  function isPlaceholder(value) {
    return !value || String(value).includes("YOUR_") || String(value).includes("REPLACE_");
  }

  function getSupabaseUrl() {
    return String(config.supabaseUrl || "").replace(/\/+$/, "");
  }

  function getAnonKey() {
    return String(config.supabaseAnonKey || "");
  }

  function isSupabaseConfigured() {
    return !isPlaceholder(getSupabaseUrl()) && !isPlaceholder(getAnonKey());
  }

  function isLocalDevHost() {
    const hostname = window.location.hostname || "";
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "";
  }

  function isLocalAuthEnabled() {
    return Boolean(config.localAuthFallbackEnabled) && LOCAL_ACCOUNTS.length > 0 && isLocalDevHost();
  }

  function isConfigured() {
    return isSupabaseConfigured() || isLocalAuthEnabled();
  }

  function getMode() {
    if (isSupabaseConfigured()) return "supabase";
    if (isLocalAuthEnabled()) return "local";
    return "none";
  }

  function baseHeaders(accessToken) {
    const headers = {
      apikey: getAnonKey()
    };
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    return headers;
  }

  function jsonHeaders(accessToken) {
    return {
      ...baseHeaders(accessToken),
      "Content-Type": "application/json"
    };
  }

  function readStoredSession() {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredSession(session) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function clearStoredSession() {
    window.localStorage.removeItem(SESSION_KEY);
  }

  function ensureConfigured() {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase 尚未配置，请先填写 assets/js/config.js。");
    }
  }

  async function request(path, options = {}) {
    ensureConfigured();
    const response = await window.fetch(`${getSupabaseUrl()}${path}`, options);
    const raw = await response.text();
    const payload = raw ? JSON.parse(raw) : null;
    if (!response.ok) {
      const message = payload && (payload.msg || payload.message || payload.error_description || payload.error);
      throw new Error(message || "请求 Supabase 失败。");
    }
    return payload;
  }

  function normalizeSession(payload) {
    if (!payload || !payload.access_token) {
      throw new Error("登录成功，但未收到有效会话。");
    }
    const expiresAt = payload.expires_at || Math.floor(Date.now() / 1000) + Number(payload.expires_in || 3600);
    return {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_at: expiresAt,
      expires_in: payload.expires_in,
      token_type: payload.token_type || "bearer",
      user: payload.user || null
    };
  }

  function normalizeIdentifier(identifier) {
    const value = String(identifier || "").trim().toLowerCase();
    if (!value) return "";
    if (value.includes("@")) return value;
    return `${value}@${LOCAL_AUTH_DOMAIN}`;
  }

  function usernameFromEmail(email) {
    return String(email || "").split("@")[0] || "";
  }

  function normalizeProfile(row, user) {
    const metadata = user && user.user_metadata ? user.user_metadata : {};
    const email = (row && row.email) || (user && user.email) || "";
    return {
      id: (row && row.id) || (user && user.id) || "",
      email,
      username: (row && row.username) || metadata.username || usernameFromEmail(email),
      displayName: (row && row.display_name) || metadata.display_name || metadata.full_name || usernameFromEmail(email) || "S-parks 用户",
      role: (row && row.role) || metadata.role || "user",
      creatorId: (row && row.creator_id) || metadata.creator_id || "",
      avatarUrl: (row && row.avatar_url) || metadata.avatar_url || "",
      status: (row && row.status) || metadata.status || "active"
    };
  }

  function normalizeReviewItem(row) {
    return {
      id: row.id,
      title: row.title || row.asset_title || "未命名素材",
      owner: row.owner_name || row.owner || row.creator_name || "未知创作者",
      risk: row.risk_note || row.risk || row.note || "待补充说明",
      status: row.status || "待审核",
      category: row.category || "未分类",
      createdAt: row.created_at || "",
      previewImageUrl: row.preview_image_url || ""
    };
  }

  function findLocalAccount(identifier) {
    const normalized = normalizeIdentifier(identifier);
    return LOCAL_ACCOUNTS.find((account) => {
      return normalizeIdentifier(account.username) === normalized
        || normalizeIdentifier(account.email) === normalized;
    }) || null;
  }

  function buildLocalAuthPayload(account) {
    const userId = `local-${account.username}`;
    return {
      session: {
        provider: "local",
        access_token: `local-token-${account.username}`,
        refresh_token: "",
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        expires_in: 60 * 60 * 24 * 30,
        token_type: "bearer",
        user: {
          id: userId,
          email: account.email,
          user_metadata: {
            username: account.username,
            display_name: account.displayName,
            role: account.role,
            creator_id: account.creatorId,
            avatar_url: account.avatarUrl || "",
            status: "active"
          }
        }
      },
      user: {
        id: userId,
        email: account.email,
        user_metadata: {
          username: account.username,
          display_name: account.displayName,
          role: account.role,
          creator_id: account.creatorId,
          avatar_url: account.avatarUrl || "",
          status: "active"
        }
      },
      profile: {
        id: userId,
        email: account.email,
        username: account.username,
        displayName: account.displayName,
        role: account.role,
        creatorId: account.creatorId || "",
        avatarUrl: account.avatarUrl || "",
        status: "active"
      }
    };
  }

  async function fetchProfile(userId, accessToken, user) {
    const query = `/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=${PROFILE_FIELDS}&limit=1`;
    const rows = await request(query, {
      method: "GET",
      headers: baseHeaders(accessToken)
    });
    return normalizeProfile(Array.isArray(rows) ? rows[0] : null, user);
  }

  async function signIn(identifier, password) {
    if (!isSupabaseConfigured()) {
      if (!isLocalAuthEnabled()) {
        throw new Error("当前未配置 Supabase，也没有启用本地测试账号。");
      }
      const account = findLocalAccount(identifier);
      if (!account || account.password !== password) {
        throw new Error("账号或密码错误。");
      }
      const payload = buildLocalAuthPayload(account);
      writeStoredSession(payload.session);
      return payload;
    }
    const email = normalizeIdentifier(identifier);
    const payload = await request("/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ email, password })
    });
    const session = normalizeSession(payload);
    writeStoredSession(session);
    const profile = await fetchProfile(session.user.id, session.access_token, session.user);
    return { session, user: session.user, profile };
  }

  async function refreshSession(refreshToken) {
    const payload = await request("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    const session = normalizeSession(payload);
    writeStoredSession(session);
    return session;
  }

  async function fetchUser(accessToken) {
    return request("/auth/v1/user", {
      method: "GET",
      headers: baseHeaders(accessToken)
    });
  }

  async function restoreSession() {
    if (!isConfigured()) return null;
    const stored = readStoredSession();
    if (!stored || !stored.access_token) return null;

    if (!isSupabaseConfigured()) {
      if (!isLocalAuthEnabled()) {
        clearStoredSession();
        return null;
      }
      const account = LOCAL_ACCOUNTS.find((item) => item.username === String(stored.user && stored.user.user_metadata && stored.user.user_metadata.username || "").trim());
      if (!account) {
        clearStoredSession();
        return null;
      }
      return buildLocalAuthPayload(account);
    }

    let session = stored;
    const now = Math.floor(Date.now() / 1000);

    try {
      if (session.expires_at && session.expires_at <= now + 30 && session.refresh_token) {
        session = await refreshSession(session.refresh_token);
      }
      const user = await fetchUser(session.access_token);
      session.user = user;
      writeStoredSession(session);
      const profile = await fetchProfile(user.id, session.access_token, user);
      return { session, user, profile };
    } catch (error) {
      clearStoredSession();
      throw error;
    }
  }

  async function signOut(accessToken) {
    if (isConfigured() && accessToken) {
      try {
        await request("/auth/v1/logout", {
          method: "POST",
          headers: jsonHeaders(accessToken)
        });
      } catch (error) {
        // Ignore network/auth cleanup failures and clear local session anyway.
      }
    }
    clearStoredSession();
  }

  async function fetchReviewItems(accessToken) {
    const rows = await request("/rest/v1/review_items?select=id,title,owner_name,risk_note,status,category,created_at,preview_image_url&order=created_at.desc", {
      method: "GET",
      headers: baseHeaders(accessToken)
    });
    return Array.isArray(rows) ? rows.map(normalizeReviewItem) : [];
  }

  async function updateReviewStatus(reviewId, status, accessToken) {
    const rows = await request(`/rest/v1/review_items?id=eq.${encodeURIComponent(reviewId)}`, {
      method: "PATCH",
      headers: {
        ...jsonHeaders(accessToken),
        Prefer: "return=representation"
      },
      body: JSON.stringify({ status })
    });
    if (!Array.isArray(rows) || !rows.length) {
      throw new Error("审核状态更新后未返回记录。");
    }
    return normalizeReviewItem(rows[0]);
  }

  return {
    isConfigured,
    isSupabaseConfigured,
    isLocalAuthEnabled,
    getMode,
    normalizeIdentifier,
    signIn,
    signOut,
    restoreSession,
    fetchReviewItems,
    updateReviewStatus
  };
})();
