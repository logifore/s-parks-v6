# S-parks V5 Release

S-parks V5 是对现有 `s-parks-v4-5` 仓库与 Vercel 项目的原位升级版本。这个版本在延续既有视觉方向的基础上，加入了角色化登录流、管理员主页式审核台和 Supabase 接入结构，并同步补齐正式发布所需的版本说明与更新记录。

## V5 重点

- 保留 V4.5 的路由、数据结构、素材浏览、收藏、购买授权、下载中心和上传流程能力。
- 新增角色化账号流，支持普通用户、创作者、管理员三种主页分流。
- 新增 `Supabase Auth + profiles` 前端接入结构，为真实账号体系预留正式链路。
- 把管理员审核能力整合进角色主页，统一审核、复核和待补充操作区域。
- 统一发布口径，直接替换升级现有 GitHub 仓库与 Vercel 项目到 `v5`。
- 当前仍是前端原型加登录结构接入层，未包含完整生产级支付、风控和后端业务闭环。

## 文件结构

- `index.html`: 静态应用外壳、CSP、导航、脚本加载。
- `assets/css/styles.css`: 设计系统、粒子层级、页面布局、移动端响应式样式。
- `assets/js/content.js`: 页面内容、素材数据和功能流程配置。
- `assets/js/utils.js`: HTML 转义、图标、图片和通用页面壳工具。
- `assets/js/renderers.js`: 各页面渲染器。
- `assets/js/router.js`: Hash 路由和标题映射。
- `assets/js/particles.js`: WebGL 粒子背景和 Canvas fallback。
- `assets/js/config.js`: 登录模式、前端版本号与 Supabase 公开配置。
- `assets/js/auth.js`: 账号登录、会话恢复、角色资料读取与审核数据读写。
- `assets/js/app.js`: 初始化入口、导航、搜索、事件绑定。
- `LEGAL_NOTES.md`: 商用、素材和安全注意事项。
- `SUPABASE_SETUP.md`: Supabase 接入步骤说明。
- `TEST_ACCOUNTS.md`: 本地测试账号映射说明。

## 路由

- `#home`: 首页 / 发现
- `#assets`: 素材库
- `#community`: 创作者社区
- `#support`: 支持中心
- `#detail`: 素材详情页原型
- `#upload`: 上传发布页原型
- `#auth`: 登录注册页原型
- `#account`: 个人主页入口
- `#creator-onboarding`: 创作者申请页原型
- `#licensing`: 购买授权页原型
- `#membership`: 积分会员页原型
- `#admin`: 审核后台页原型
- `#search`: 搜索结果页原型
- `#collections`: 收藏夹 / 项目夹原型

## 发布目标

- GitHub 仓库：发布后同步升级为 `https://github.com/logifore/s-parks-v5`
- Vercel 项目：延续现有线上项目做覆盖升级，并同步升级到 `s-parks-v5` 命名
- 发布策略：先核对现有仓库/项目链路，再把 `main` 与生产部署统一切到 `v5`

## 更新日志

- 详细发布记录见 `CHANGELOG.md`
- 当前版本号：`v5.0.2`

## 本地预览

```bash
python3 -m http.server 8765
```

然后打开：

```text
http://127.0.0.1:8765/
```

## 安全说明

V5 仍是前端原型，不包含私有服务端密钥、生产数据库凭据或真实用户数据。

本次已经落实的前端侧安全措施：
- 保持严格 CSP，不新增内联脚本或无必要的外部连接能力。
- 页面动态文本继续统一经过 HTML 转义，避免把内容直接注入 DOM。
- 粒子动画在窄屏和减少动态偏好场景下降级，降低移动端交互干扰与性能压力。
- 本地测试账号模式当前会随公开站点一起启用，适合临时测试，不适合长期保留。
- 不把 Supabase 私钥、后端管理凭据、真实授权数据或真实个人隐私引入当前仓库。

正式商用前必须迁移到服务端实现的安全能力：
- 登录认证、会话管理、权限控制、上传校验。
- 支付、授权记录、下载权限和审计日志。
- 接口限流、风控、防刷、内容审核和异常监控。
- 敏感配置管理、密钥轮换、数据脱敏与最小权限访问。
