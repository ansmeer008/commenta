-- public 스키마 및 하위 테이블/함수에 대한 기본 접근 권한 부여
grant usage on schema public to anon, authenticated;
grant all privileges on all tables in schema public to anon, authenticated;
grant all privileges on all sequences in schema public to anon, authenticated;
grant all privileges on all functions in schema public to anon, authenticated;