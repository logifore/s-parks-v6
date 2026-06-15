# V5 测试账号映射

前端登录页支持输入“账号名”直接登录。

当前 `v5` 已把这 3 个测试账号直接写进前端配置，所以公开站点和本地预览都可以直接登录。
后续一旦补上 Supabase 配置，前端会优先切换成真实后端登录。

实际映射到 Supabase Auth 的邮箱如下：

- `yonghu` -> `yonghu@sparks.local`
- `chuangzuo` -> `chuangzuo@sparks.local`
- `admin` -> `admin@sparks.local`

默认角色绑定：

- `yonghu` -> `user`
- `chuangzuo` -> `creator`
- `admin` -> `admin`

当前默认创作者主页绑定：

- `chuangzuo` -> `elena-voss`

如果后续想换成别的创作者主页，只需要改：

- [seed_profiles.sql](/Users/ylfy/Desktop/workspace/sparks-v5/supabase/seed_profiles.sql)
