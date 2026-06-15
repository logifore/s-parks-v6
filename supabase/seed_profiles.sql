update public.profiles
set username = 'yonghu',
    role = 'user',
    display_name = '普通用户',
    creator_id = null,
    status = 'active'
where email = 'yonghu@sparks.local';

update public.profiles
set username = 'chuangzuo',
    role = 'creator',
    display_name = '创作者',
    creator_id = 'elena-voss',
    status = 'active'
where email = 'chuangzuo@sparks.local';

update public.profiles
set username = 'admin',
    role = 'admin',
    display_name = '管理员',
    creator_id = null,
    status = 'active'
where email = 'admin@sparks.local';
