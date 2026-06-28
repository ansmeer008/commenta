-- commentaries 성능 최적화 (복합 인덱스)
create index idx_commentaries_work_episode on public.commentaries (work_id, episode desc);
create index idx_commentaries_author_id on public.commentaries (author_id);

-- subscriptions 마이페이지 조회 최적화
create index idx_subscriptions_user_id on public.subscriptions (user_id);

-- tags 작품별 태그 조회 최적화
create index idx_tags_work_id on public.tags (work_id);

-- 1. 코멘터리 추가/삭제 시 works.usage_count 자동 증감 함수 및 트리거
create or replace function public.handle_commentary_count()
returns trigger as $$
begin
    if (TG_OP = 'INSERT') then
        update public.works set usage_count = usage_count + 1 where id = NEW.work_id;
    elsif (TG_OP = 'DELETE') then
        update public.works set usage_count = usage_count - 1 where id = OLD.work_id;
    end if;
    return null;
end;
$$ language plpgsql security definer;

create trigger on_commentary_created_or_deleted
    after insert or delete on public.commentaries
    for each row execute function public.handle_commentary_count();


-- 2. 구독 추가/삭제 시 works.subscribe_count 자동 증감 함수 및 트리거
create or replace function public.handle_subscription_count()
returns trigger as $$
begin
    if (TG_OP = 'INSERT') then
        update public.works set subscribe_count = subscribe_count + 1 where id = NEW.work_id;
    elsif (TG_OP = 'DELETE') then
        update public.works set subscribe_count = subscribe_count - 1 where id = OLD.work_id;
    end if;
    return null;
end;
$$ language plpgsql security definer;

create trigger on_subscription_created_or_deleted
    after insert or delete on public.subscriptions
    for each row execute function public.handle_subscription_count();


-- 특정 작품(work_id) 내에서 공백을 제거한 태그 이름이 중복되지 않도록 유니크 인덱스 설정
create unique index idx_tags_work_id_name_unique 
on public.tags (work_id, replace(name, ' ', ''));