-- 1. EXTENSIONS (UUID 생성을 위해 필요)
create extension if not exists "uuid-ossp";

-- 2. TABLES 생성
-- profiles 테이블
create table public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    email varchar not null,
    nickname varchar not null,
    profile_url varchar,
    is_no_spoiler_mode boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- works 테이블
create table public.works (
    id uuid default gen_random_uuid() not null primary key,
    title varchar not null,
    author varchar not null,
    usage_count integer not null default 0,
    subscribe_count integer not null default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- tags 테이블
create table public.tags (
    id uuid default gen_random_uuid() not null primary key,
    work_id uuid references public.works(id) on delete cascade not null,
    name varchar not null,
    type varchar not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- commentaries 테이블
create table public.commentaries (
    id uuid default gen_random_uuid() not null primary key,
    content text not null,
    author_id uuid references public.profiles(id) on delete cascade not null,
    work_id uuid references public.works(id) on delete cascade not null,
    is_spoiler boolean not null default false,
    episode integer,
    img_urls text[] default '{}'::text[] not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- commentary_tags 테이블 (N:M 매핑 테이블)
create table public.commentary_tags (
    commentary_id uuid references public.commentaries(id) on delete cascade not null,
    tag_id uuid references public.tags(id) on delete cascade not null,
    primary key (commentary_id, tag_id)
);

-- subscriptions 테이블
create table public.subscriptions (
    id uuid default gen_random_uuid() not null primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    work_id uuid references public.works(id) on delete cascade not null,
    episode integer,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ROW LEVEL SECURITY (RLS) 활성화
alter table public.profiles enable row level security;
alter table public.works enable row level security;
alter table public.tags enable row level security;
alter table public.commentaries enable row level security;
alter table public.commentary_tags enable row level security;
alter table public.subscriptions enable row level security;

-- 4. RLS POLICIES (보안 정책) 정의

-- profiles 정책
create policy "profiles_select_policy" on public.profiles for select using (true);
create policy "profiles_insert_policy" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_policy" on public.profiles for update using (auth.uid() = id);

-- works 정책
create policy "works_select_policy" on public.works for select using (true);
create policy "works_insert_policy" on public.works for insert with check (auth.role() = 'authenticated');

-- tags 정책
create policy "tags_select_policy" on public.tags for select using (true);
create policy "tags_insert_policy" on public.tags for insert with check (auth.role() = 'authenticated');

-- commentaries 정책
create policy "commentaries_select_policy" on public.commentaries for select using (true);
create policy "commentaries_insert_policy" on public.commentaries for insert with check (auth.uid() = author_id);
create policy "commentaries_update_policy" on public.commentaries for update using (auth.uid() = author_id);
create policy "commentaries_delete_policy" on public.commentaries for delete using (auth.uid() = author_id);

-- commentary_tags 정책
create policy "commentary_tags_select_policy" on public.commentary_tags for select using (true);
create policy "commentary_tags_insert_policy" on public.commentary_tags for insert with check (
    exists (select 1 from public.commentaries where id = commentary_id and author_id = auth.uid())
);
create policy "commentary_tags_delete_policy" on public.commentary_tags for delete using (
    exists (select 1 from public.commentaries where id = commentary_id and author_id = auth.uid())
);

-- subscriptions 정책
create policy "subscriptions_all_policy" on public.subscriptions for all using (auth.uid() = user_id);