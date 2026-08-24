-- Thai Kurabo Supabase foundation
-- Based on database.md. Apply with `supabase db push` to a new project.

create extension if not exists pgcrypto;
create extension if not exists citext;
create schema if not exists internal;
revoke all on schema internal from anon, authenticated;

create type public.locale_code as enum ('th', 'en', 'ja');
create type public.profile_status as enum ('active', 'suspended', 'deactivated', 'anonymized');
create type public.content_status as enum ('draft', 'scheduled', 'published', 'archived');
create type public.media_visibility as enum ('public', 'private');
create type public.upload_status as enum ('pending', 'verified', 'rejected', 'quarantined', 'deleted');
create type public.contact_status as enum ('new', 'in_progress', 'waiting_for_user', 'resolved', 'closed');
create type public.job_status as enum ('draft', 'scheduled', 'published', 'closed', 'archived');
create type public.application_status as enum ('draft', 'new', 'screening', 'shortlisted', 'interview', 'offered', 'hired', 'rejected', 'withdrawn', 'archived');
create type public.application_public_status as enum ('draft', 'received', 'under_review', 'completed', 'withdrawn');
create type public.consent_action as enum ('granted', 'withdrawn');
create type internal.outbox_status as enum ('pending', 'processing', 'sent', 'failed', 'dead_letter');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  preferred_locale public.locale_code not null default 'th',
  status public.profile_status not null default 'active',
  email_verified_at timestamptz,
  last_login_at timestamptz,
  deactivation_requested_at timestamptz,
  anonymized_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_system boolean not null default false
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete restrict,
  granted_by uuid references public.profiles(id) on delete set null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);
create unique index user_roles_active_unique on public.user_roles(user_id, role_id) where revoked_at is null;

insert into public.roles (code, name, description, is_system) values
  ('member', 'Member', 'Website member', true),
  ('admin', 'Administrator', 'General administrator', true),
  ('content_editor', 'Content editor', 'CMS publishing access', true),
  ('hr_admin', 'HR administrator', 'Recruitment access', true),
  ('contact_agent', 'Contact agent', 'Contact request access', true),
  ('super_admin', 'Super administrator', 'Full administrative access', true);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  storage_path text not null unique,
  visibility public.media_visibility not null default 'private',
  original_name text not null,
  mime_type_declared text,
  mime_type_detected text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  checksum_sha256 text,
  width integer,
  height integer,
  alt_text_default text,
  upload_status public.upload_status not null default 'pending',
  uploaded_by uuid references public.profiles(id) on delete set null,
  verified_at timestamptz,
  quarantine_reason text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  page_type text not null,
  status public.content_status not null default 'draft',
  featured_media_id uuid references public.media_assets(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  last_editor_id uuid references public.profiles(id) on delete set null,
  scheduled_at timestamptz,
  published_at timestamptz,
  archived_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1 check (version > 0)
);

create table public.page_translations (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  locale public.locale_code not null,
  title text not null,
  slug text not null check (slug = lower(slug) and slug !~ '^/|/$'),
  summary text,
  seo_title text,
  seo_description text,
  canonical_path text,
  og_media_id uuid references public.media_assets(id) on delete set null,
  structured_data jsonb not null default '{}'::jsonb,
  search_text tsvector,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_id, locale),
  unique(locale, slug)
);

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  section_type text not null,
  sort_order integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.page_section_translations (
  section_id uuid not null references public.page_sections(id) on delete cascade,
  locale public.locale_code not null,
  heading text,
  body_json jsonb not null default '{}'::jsonb,
  cta_label text,
  cta_href text,
  accessibility_label text,
  primary key(section_id, locale)
);

create table public.policy_versions (
  id uuid primary key default gen_random_uuid(),
  policy_type text not null check (policy_type in ('privacy','terms','cookies','recruitment_privacy')),
  version text not null,
  locale public.locale_code not null,
  content_hash text not null,
  published_at timestamptz not null,
  content_page_id uuid references public.pages(id) on delete set null,
  is_active boolean not null default false,
  unique(policy_type, version, locale)
);
create unique index policy_versions_one_active on public.policy_versions(policy_type, locale) where is_active;

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  purpose text not null,
  policy_version_id uuid not null references public.policy_versions(id) on delete restrict,
  action public.consent_action not null,
  source text not null,
  ip_hash text,
  user_agent_summary text,
  occurred_at timestamptz not null default now(),
  request_id uuid not null default gen_random_uuid()
);

create table public.contact_categories (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  default_assignee_id uuid references public.profiles(id) on delete set null,
  sla_hours integer not null default 72 check (sla_hours > 0),
  is_active boolean not null default true,
  sort_order integer not null default 0
);
create table public.contact_category_translations (
  category_id uuid not null references public.contact_categories(id) on delete cascade,
  locale public.locale_code not null,
  name text not null,
  description text,
  primary key(category_id, locale)
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('TK-C-' || to_char(now(), 'YYYY') || '-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 8))),
  user_id uuid not null references public.profiles(id) on delete restrict,
  category_id uuid not null references public.contact_categories(id) on delete restrict,
  first_name text not null,
  last_name text not null,
  email citext not null,
  phone text,
  organization text,
  preferred_contact_method text,
  subject text not null,
  message_text text not null,
  status public.contact_status not null default 'new',
  assignee_id uuid references public.profiles(id) on delete set null,
  priority smallint not null default 0 check (priority between 0 and 3),
  sla_due_at timestamptz,
  resolved_at timestamptz,
  closed_at timestamptz,
  withdrawn_at timestamptz,
  consent_record_id uuid references public.consent_records(id) on delete restrict,
  legal_hold boolean not null default false,
  retention_until timestamptz,
  anonymized_at timestamptz,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1 check (version > 0)
);

create table public.departments (id uuid primary key default gen_random_uuid(), code text not null unique, is_active boolean not null default true, sort_order integer not null default 0);
create table public.department_translations (department_id uuid not null references public.departments(id) on delete cascade, locale public.locale_code not null, name text not null, primary key(department_id, locale));
create table public.job_locations (id uuid primary key default gen_random_uuid(), code text not null unique, is_active boolean not null default true, sort_order integer not null default 0);
create table public.job_location_translations (location_id uuid not null references public.job_locations(id) on delete cascade, locale public.locale_code not null, name text not null, address_text text, primary key(location_id, locale));
create table public.employment_types (id uuid primary key default gen_random_uuid(), code text not null unique, is_active boolean not null default true, sort_order integer not null default 0);
create table public.employment_type_translations (employment_type_id uuid not null references public.employment_types(id) on delete cascade, locale public.locale_code not null, name text not null, primary key(employment_type_id, locale));

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  status public.job_status not null default 'draft',
  department_id uuid references public.departments(id) on delete set null,
  location_id uuid references public.job_locations(id) on delete set null,
  employment_type_id uuid references public.employment_types(id) on delete set null,
  headcount integer not null default 1 check (headcount > 0),
  open_at timestamptz,
  close_at timestamptz,
  show_closed_message boolean not null default true,
  featured_media_id uuid references public.media_assets(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  archived_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1 check (version > 0),
  check (close_at is null or open_at is null or close_at > open_at)
);

create table public.job_translations (
  job_id uuid not null references public.jobs(id) on delete cascade,
  locale public.locale_code not null,
  title text not null,
  slug text not null,
  summary text,
  responsibilities_json jsonb not null default '[]'::jsonb,
  qualifications_json jsonb not null default '[]'::jsonb,
  benefits_json jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  search_text tsvector,
  primary key(job_id, locale),
  unique(locale, slug)
);

create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('TK-A-' || to_char(now(), 'YYYY') || '-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 8))),
  job_id uuid not null references public.jobs(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete restrict,
  job_title_snapshot text not null,
  job_location_snapshot text,
  first_name text not null,
  last_name text not null,
  email citext not null,
  phone text,
  address_json jsonb,
  birth_date date,
  nationality text,
  skills_json jsonb not null default '[]'::jsonb,
  expected_salary numeric(14,2),
  currency_code char(3),
  available_from date,
  internal_status public.application_status not null default 'draft',
  public_status public.application_public_status not null default 'draft',
  assignee_id uuid references public.profiles(id) on delete set null,
  submitted_at timestamptz,
  withdrawn_at timestamptz,
  completed_at timestamptz,
  consent_record_id uuid references public.consent_records(id) on delete restrict,
  retention_until timestamptz,
  legal_hold boolean not null default false,
  anonymized_at timestamptz,
  draft_saved_at timestamptz,
  draft_expires_at timestamptz,
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table internal.notification_outbox (
  id uuid primary key default gen_random_uuid(), event_type text not null, aggregate_type text not null,
  aggregate_id uuid, recipient citext not null, locale public.locale_code not null default 'th',
  template_code text not null, payload_json jsonb not null default '{}'::jsonb,
  status internal.outbox_status not null default 'pending', attempts integer not null default 0,
  max_attempts integer not null default 5, next_attempt_at timestamptz not null default now(),
  locked_at timestamptz, locked_by text, sent_at timestamptz, last_error_code text,
  idempotency_key text not null unique, created_at timestamptz not null default now()
);
create table internal.audit_logs (
  id bigserial primary key, actor_user_id uuid, actor_role text, action text not null,
  target_type text not null, target_id uuid, outcome text not null,
  safe_before jsonb, safe_after jsonb, reason text, request_id uuid,
  ip_hash text, user_agent_summary text, occurred_at timestamptz not null default now()
);
create table internal.idempotency_keys (
  scope text not null, key_hash text not null, user_id uuid, request_hash text not null,
  response_code integer, response_body_safe jsonb, resource_type text, resource_id uuid,
  expires_at timestamptz not null, created_at timestamptz not null default now(),
  primary key(scope, key_hash)
);

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger pages_updated_at before update on public.pages for each row execute function public.set_updated_at();
create trigger page_translations_updated_at before update on public.page_translations for each row execute function public.set_updated_at();
create trigger contact_submissions_updated_at before update on public.contact_submissions for each row execute function public.set_updated_at();
create trigger jobs_updated_at before update on public.jobs for each row execute function public.set_updated_at();
create trigger job_applications_updated_at before update on public.job_applications for each row execute function public.set_updated_at();

create or replace function public.has_role(required_role text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles ur join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and ur.revoked_at is null
      and (r.code = required_role or r.code = 'super_admin')
  );
$$;
grant execute on function public.has_role(text) to authenticated;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare member_role_id uuid;
begin
  insert into public.profiles(id, first_name, last_name, preferred_locale, email_verified_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    case when new.raw_user_meta_data ->> 'preferred_locale' in ('th','en','ja')
      then (new.raw_user_meta_data ->> 'preferred_locale')::public.locale_code else 'th' end,
    new.email_confirmed_at
  );
  select id into member_role_id from public.roles where code = 'member';
  insert into public.user_roles(user_id, role_id) values (new.id, member_role_id);
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create index profiles_status_created_idx on public.profiles(status, created_at desc);
create index pages_status_published_idx on public.pages(status, published_at desc) where deleted_at is null;
create index page_translations_search_idx on public.page_translations using gin(search_text);
create index contacts_user_submitted_idx on public.contact_submissions(user_id, submitted_at desc);
create index contacts_queue_idx on public.contact_submissions(status, assignee_id, submitted_at desc);
create index jobs_status_window_idx on public.jobs(status, open_at, close_at) where deleted_at is null;
create index applications_user_submitted_idx on public.job_applications(user_id, submitted_at desc);
create index applications_job_status_idx on public.job_applications(job_id, internal_status, submitted_at desc);
create index outbox_pending_idx on internal.notification_outbox(status, next_attempt_at) where status in ('pending','failed');
create index audit_target_idx on internal.audit_logs(target_type, target_id, occurred_at desc);

alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;
alter table public.media_assets enable row level security;
alter table public.pages enable row level security;
alter table public.page_translations enable row level security;
alter table public.page_sections enable row level security;
alter table public.page_section_translations enable row level security;
alter table public.policy_versions enable row level security;
alter table public.consent_records enable row level security;
alter table public.contact_categories enable row level security;
alter table public.contact_category_translations enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.departments enable row level security;
alter table public.department_translations enable row level security;
alter table public.job_locations enable row level security;
alter table public.job_location_translations enable row level security;
alter table public.employment_types enable row level security;
alter table public.employment_type_translations enable row level security;
alter table public.jobs enable row level security;
alter table public.job_translations enable row level security;
alter table public.job_applications enable row level security;

create policy profiles_read_own on public.profiles for select to authenticated using (id = auth.uid() or public.has_role('admin'));
create policy profiles_update_own on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy roles_read_authenticated on public.roles for select to authenticated using (true);
create policy user_roles_read_own on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role('admin'));
create policy media_public_read on public.media_assets for select to anon, authenticated using (visibility = 'public' and upload_status = 'verified' and deleted_at is null);
create policy media_own_read on public.media_assets for select to authenticated using (uploaded_by = auth.uid());
create policy pages_published_read on public.pages for select to anon, authenticated using (status = 'published' and published_at <= now() and deleted_at is null);
create policy page_translations_published_read on public.page_translations for select to anon, authenticated using (exists (select 1 from public.pages p where p.id = page_id and p.status = 'published' and p.published_at <= now() and p.deleted_at is null));
create policy page_sections_published_read on public.page_sections for select to anon, authenticated using (is_enabled and exists (select 1 from public.pages p where p.id = page_id and p.status = 'published' and p.published_at <= now() and p.deleted_at is null));
create policy page_section_translations_published_read on public.page_section_translations for select to anon, authenticated using (exists (select 1 from public.page_sections s join public.pages p on p.id = s.page_id where s.id = section_id and s.is_enabled and p.status = 'published' and p.published_at <= now() and p.deleted_at is null));
create policy active_policies_read on public.policy_versions for select to anon, authenticated using (is_active and published_at <= now());
create policy own_consents_read on public.consent_records for select to authenticated using (user_id = auth.uid());
create policy own_consents_insert on public.consent_records for insert to authenticated with check (user_id = auth.uid());
create policy active_contact_categories_read on public.contact_categories for select to anon, authenticated using (is_active);
create policy active_contact_category_translations_read on public.contact_category_translations for select to anon, authenticated using (exists (select 1 from public.contact_categories c where c.id = category_id and c.is_active));
create policy own_contacts_read on public.contact_submissions for select to authenticated using (user_id = auth.uid());
create policy own_contacts_insert on public.contact_submissions for insert to authenticated with check (user_id = auth.uid() and status = 'new');
create policy recruitment_lookups_read on public.departments for select to anon, authenticated using (is_active);
create policy department_translations_read on public.department_translations for select to anon, authenticated using (true);
create policy job_locations_read on public.job_locations for select to anon, authenticated using (is_active);
create policy job_location_translations_read on public.job_location_translations for select to anon, authenticated using (true);
create policy employment_types_read on public.employment_types for select to anon, authenticated using (is_active);
create policy employment_type_translations_read on public.employment_type_translations for select to anon, authenticated using (true);
create policy published_jobs_read on public.jobs for select to anon, authenticated using (status = 'published' and open_at <= now() and (close_at is null or close_at > now()) and deleted_at is null);
create policy published_job_translations_read on public.job_translations for select to anon, authenticated using (exists (select 1 from public.jobs j where j.id = job_id and j.status = 'published' and j.open_at <= now() and (j.close_at is null or j.close_at > now()) and j.deleted_at is null));
create policy own_applications_read on public.job_applications for select to authenticated using (user_id = auth.uid());
create policy own_application_drafts_insert on public.job_applications for insert to authenticated with check (user_id = auth.uid() and internal_status = 'draft' and public_status = 'draft');

-- Prevent members from changing administrative profile fields through the Data API.
revoke update on public.profiles from authenticated;
grant update(first_name, last_name, phone, preferred_locale, deactivation_requested_at, updated_at) on public.profiles to authenticated;
revoke all on all tables in schema internal from anon, authenticated;
revoke all on all sequences in schema internal from anon, authenticated;
