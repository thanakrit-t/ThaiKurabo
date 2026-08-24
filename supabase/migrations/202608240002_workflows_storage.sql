-- Workflow child records, admin access, and Storage policies.

create table public.contact_attachments (
  submission_id uuid not null references public.contact_submissions(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key(submission_id, media_asset_id)
);
create table public.contact_status_history (
  id uuid primary key default gen_random_uuid(), submission_id uuid not null references public.contact_submissions(id) on delete cascade,
  from_status public.contact_status, to_status public.contact_status not null, changed_by uuid references public.profiles(id) on delete set null,
  reason text, created_at timestamptz not null default now(), request_id uuid not null default gen_random_uuid()
);
create table public.contact_notes (
  id uuid primary key default gen_random_uuid(), submission_id uuid not null references public.contact_submissions(id) on delete cascade,
  body_text text not null, author_id uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);

create table public.application_education (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references public.job_applications(id) on delete cascade,
  level text, institution text not null, field_of_study text, graduation_year integer, sort_order integer not null default 0
);
create table public.application_experience (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references public.job_applications(id) on delete cascade,
  company text not null, job_title text not null, started_on date, ended_on date, is_current boolean not null default false,
  summary text, sort_order integer not null default 0, check (ended_on is null or started_on is null or ended_on >= started_on)
);
create table public.application_documents (
  application_id uuid not null references public.job_applications(id) on delete cascade,
  media_asset_id uuid not null references public.media_assets(id) on delete restrict,
  document_type text not null check (document_type in ('resume','portfolio','certificate','other')),
  created_at timestamptz not null default now(), primary key(application_id, media_asset_id)
);
create table public.application_status_history (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references public.job_applications(id) on delete cascade,
  from_internal_status public.application_status, to_internal_status public.application_status not null,
  from_public_status public.application_public_status, to_public_status public.application_public_status not null,
  changed_by uuid references public.profiles(id) on delete set null, reason text,
  created_at timestamptz not null default now(), request_id uuid not null default gen_random_uuid()
);
create table public.application_notes (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references public.job_applications(id) on delete cascade,
  body_text text not null, author_id uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz
);

create trigger contact_notes_updated_at before update on public.contact_notes for each row execute function public.set_updated_at();
create trigger application_notes_updated_at before update on public.application_notes for each row execute function public.set_updated_at();

alter table public.contact_attachments enable row level security;
alter table public.contact_status_history enable row level security;
alter table public.contact_notes enable row level security;
alter table public.application_education enable row level security;
alter table public.application_experience enable row level security;
alter table public.application_documents enable row level security;
alter table public.application_status_history enable row level security;
alter table public.application_notes enable row level security;

create policy own_contact_attachments_read on public.contact_attachments for select to authenticated using (exists (select 1 from public.contact_submissions s where s.id = submission_id and s.user_id = auth.uid()));
create policy own_contact_history_read on public.contact_status_history for select to authenticated using (exists (select 1 from public.contact_submissions s where s.id = submission_id and s.user_id = auth.uid()));
create policy own_education_all on public.application_education for all to authenticated using (exists (select 1 from public.job_applications a where a.id = application_id and a.user_id = auth.uid() and a.internal_status = 'draft')) with check (exists (select 1 from public.job_applications a where a.id = application_id and a.user_id = auth.uid() and a.internal_status = 'draft'));
create policy own_experience_all on public.application_experience for all to authenticated using (exists (select 1 from public.job_applications a where a.id = application_id and a.user_id = auth.uid() and a.internal_status = 'draft')) with check (exists (select 1 from public.job_applications a where a.id = application_id and a.user_id = auth.uid() and a.internal_status = 'draft'));
create policy own_documents_read on public.application_documents for select to authenticated using (exists (select 1 from public.job_applications a where a.id = application_id and a.user_id = auth.uid()));
create policy own_application_history_read on public.application_status_history for select to authenticated using (exists (select 1 from public.job_applications a where a.id = application_id and a.user_id = auth.uid()));

create policy admin_profiles_all on public.profiles for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_roles_all on public.roles for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_user_roles_all on public.user_roles for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_media_all on public.media_assets for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_pages_all on public.pages for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_page_translations_all on public.page_translations for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_page_sections_all on public.page_sections for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_section_translations_all on public.page_section_translations for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_contacts_all on public.contact_submissions for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_contact_attachments_all on public.contact_attachments for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_contact_history_all on public.contact_status_history for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_contact_notes_all on public.contact_notes for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_jobs_all on public.jobs for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_job_translations_all on public.job_translations for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_applications_all on public.job_applications for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_education_all on public.application_education for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_experience_all on public.application_experience for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_documents_all on public.application_documents for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_application_history_all on public.application_status_history for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));
create policy admin_application_notes_all on public.application_notes for all to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('public-media', 'public-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/svg+xml']),
  ('contact-attachments', 'contact-attachments', false, 10485760, array['application/pdf','image/jpeg','image/png']),
  ('application-documents', 'application-documents', false, 15728640, array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('private-exports', 'private-exports', false, 52428800, null)
on conflict (id) do nothing;

create policy public_media_objects_read on storage.objects for select to anon, authenticated using (bucket_id = 'public-media');
create policy authenticated_private_upload on storage.objects for insert to authenticated with check (bucket_id in ('contact-attachments','application-documents') and (storage.foldername(name))[1] = auth.uid()::text);
create policy owner_private_objects_read on storage.objects for select to authenticated using (bucket_id in ('contact-attachments','application-documents') and (storage.foldername(name))[1] = auth.uid()::text);
create policy owner_pending_objects_delete on storage.objects for delete to authenticated using (bucket_id in ('contact-attachments','application-documents') and (storage.foldername(name))[1] = auth.uid()::text);
