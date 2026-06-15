# S-parks V5 Supabase 接入说明

`sparks-v5` 已经按 `Supabase Auth + profiles` 的方式接好了前端结构。当前登录页已经支持“账号名或邮箱”两种输入方式，并默认带有本地测试账号兜底模式。

## 1. 填写前端配置

如果你现在只是想直接测试 3 个账号登录，这一步可以先跳过。
因为 `v5` 默认已经启用了本地测试账号模式。

只有在你准备切换到真实 Supabase 后端时，才需要填写下面这段配置。

编辑 [config.js](/Users/ylfy/Desktop/workspace/sparks-v5/assets/js/config.js)：

```js
window.SPARKS_CONFIG = {
  version: "sparks-v5.0.0",
  authStorageKey: "sparks-v5-session",
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY"
};
```

说明：

- `anon key` 可以放前端，这是 Supabase 的正常用法
- 真正高权限操作依靠 RLS 和角色策略约束
- 一旦这里填好有效配置，前端会优先走 Supabase 登录，不再走本地兜底账号

## 2. 执行数据库结构

在 Supabase SQL Editor 里执行：

- [supabase/schema.sql](/Users/ylfy/Desktop/workspace/sparks-v5/supabase/schema.sql)

它会创建：

- `public.profiles`
- `public.review_items`
- `public.review_logs`
- `profiles` 自动补全 trigger
- 基础 RLS 策略

如果你之前已经跑过旧版 SQL，建议重新执行最新的 `schema.sql`，因为 V5 新增了 `username` 字段。

## 3. 创建 3 个账号

在 Supabase 后台 `Authentication > Users` 里创建 3 个用户：

1. 普通用户
   - email: `yonghu@sparks.local`
   - password: 使用你当前测试密码
2. 创作者
   - email: `chuangzuo@sparks.local`
   - password: 使用你当前测试密码
3. 管理员
   - email: `admin@sparks.local`
   - password: 使用你当前测试密码

创建完成后，`profiles` 表会自动生成基础行。

说明：

- 前端输入时你可以直接输：
  - `yonghu`
  - `chuangzuo`
  - `admin`
- 前端会自动映射成上面这 3 个邮箱再去登录 Supabase
- 我没有把密码写进项目文件里，避免把测试密码长期留在代码里

## 4. 写入角色和主页映射

创建完账号后，在 SQL Editor 执行：

- [supabase/seed_profiles.sql](/Users/ylfy/Desktop/workspace/sparks-v5/supabase/seed_profiles.sql)

关键点：

- `creator_id` 必须对应你站内已有创作者 ID
- 当前我先按你的既有创作者页做了默认绑定：
  - `chuangzuo` -> `elena-voss`
- 目前可直接绑定：
  - `elena-voss`
  - `marcus-thorne`
  - `aria-jin`

如果你后面想把创作者账号改绑成别的创作者，只需要改 `seed_profiles.sql` 里的 `creator_id`。

## 5. 管理员审核数据

如果你想让管理员主页读取真实审核条目，可以往 `public.review_items` 插数据。

前端已经支持：

- 登录管理员账号
- 进入 `#admin`
- 读取审核列表
- 更新审核状态

如果 `review_items` 里还没有数据，页面会先显示本地默认审核卡片。

## 6. 当前 v5 已完成的部分

- 保留原登录页 UI
- 用真实登录结构替换原 `mock-login`
- 登录后按角色跳转主页
- 普通用户主页沿用原 `#account`
- 创作者主页沿用原 `#creator`
- 新增管理员主页式审核工作台
- 角色权限拦截
- 登录态本地持久化

## 7. 当前这 3 个账号的本地约定

- 普通用户账号：`yonghu`
- 创作者账号：`chuangzuo`
- 管理员账号：`admin`
- 对应邮箱：
  - `yonghu@sparks.local`
  - `chuangzuo@sparks.local`
  - `admin@sparks.local`

## 8. 你下一步只需要做

1. 填好 [config.js](/Users/ylfy/Desktop/workspace/sparks-v5/assets/js/config.js)
2. 在 Supabase 跑 [schema.sql](/Users/ylfy/Desktop/workspace/sparks-v5/supabase/schema.sql)
3. 在 Supabase Auth 后台手动创建上面 3 个用户
4. 跑 [seed_profiles.sql](/Users/ylfy/Desktop/workspace/sparks-v5/supabase/seed_profiles.sql)

这样这 3 个账号就会按角色进入不同主页。
