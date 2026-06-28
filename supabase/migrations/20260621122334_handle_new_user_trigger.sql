-- 기존 함수 및 트리거 완전 초기화
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 1. 새로운 유저가 가입할 때 실행될 함수(Function) 정의
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer -- 중요: 관리자 권한으로 실행하여 public.profiles에 쓸 수 있게 함
as $$
begin
  insert into public.profiles (id, email, nickname, created_at,        
    is_no_spoiler_mode,
    profile_url)
  values (
    new.id, -- auth.users의 UUID
    new.email, -- 유저 이메일
    coalesce(new.raw_user_meta_data->>'nickname', 'User_' || substr(new.id::text, 1, 8)),
    now(),
    false,
    null
  );
  return new;
end;
$$;

-- 2. auth.users 테이블에 insert 이벤트가 발생하면 위 함수를 실행하는 트리거(Trigger) 생성
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();