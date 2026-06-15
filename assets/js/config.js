"use strict";

window.SPARKS_CONFIG = {
  version: "sparks-v5.0.2",
  authStorageKey: "sparks-v5-session",
  localAuthFallbackEnabled: true,
  localAccounts: [
    {
      username: "yonghu",
      email: "yonghu@sparks.local",
      password: "123456",
      displayName: "普通用户",
      role: "user",
      creatorId: "",
      avatarUrl: ""
    },
    {
      username: "chuangzuo",
      email: "chuangzuo@sparks.local",
      password: "123456",
      displayName: "创作者",
      role: "creator",
      creatorId: "elena-voss",
      avatarUrl: ""
    },
    {
      username: "admin",
      email: "admin@sparks.local",
      password: "admin123456",
      displayName: "管理员",
      role: "admin",
      creatorId: "",
      avatarUrl: ""
    }
  ],
  supabaseUrl: "",
  supabaseAnonKey: ""
};
