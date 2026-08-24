-- Restrict member writes to safe columns. Administrative transitions will use
-- security-definer RPCs in the workflow integration phase.

revoke insert, update, delete on public.contact_submissions from authenticated;
grant insert (
  user_id, category_id, first_name, last_name, email, phone, organization,
  preferred_contact_method, subject, message_text, consent_record_id
) on public.contact_submissions to authenticated;

revoke insert, update, delete on public.job_applications from authenticated;
grant insert (
  job_id, user_id, job_title_snapshot, job_location_snapshot, first_name, last_name,
  email, phone, address_json, skills_json, expected_salary, currency_code,
  available_from, consent_record_id, draft_saved_at, draft_expires_at
) on public.job_applications to authenticated;
grant update (
  first_name, last_name, phone, address_json, skills_json, expected_salary,
  currency_code, available_from, consent_record_id, draft_saved_at, draft_expires_at
) on public.job_applications to authenticated;

create policy own_application_drafts_update on public.job_applications
for update to authenticated
using (user_id = auth.uid() and internal_status = 'draft')
with check (user_id = auth.uid() and internal_status = 'draft' and public_status = 'draft');

insert into public.contact_categories (code, sla_hours, sort_order) values
  ('product_enquiry', 72, 10),
  ('technology', 72, 20),
  ('corporate_information', 120, 30),
  ('recruitment', 72, 40),
  ('other', 120, 50)
on conflict (code) do nothing;

insert into public.contact_category_translations (category_id, locale, name)
select id, values_to_insert.locale::public.locale_code, values_to_insert.name
from public.contact_categories
cross join lateral (
  values
    ('th', case code when 'product_enquiry' then 'สอบถามผลิตภัณฑ์' when 'technology' then 'เทคโนโลยี' when 'corporate_information' then 'ข้อมูลองค์กร' when 'recruitment' then 'สมัครงาน' else 'อื่น ๆ' end),
    ('en', case code when 'product_enquiry' then 'Product enquiry' when 'technology' then 'Technology' when 'corporate_information' then 'Corporate information' when 'recruitment' then 'Recruitment' else 'Other' end),
    ('ja', case code when 'product_enquiry' then '製品に関するお問い合わせ' when 'technology' then '技術' when 'corporate_information' then '企業情報' when 'recruitment' then '採用情報' else 'その他' end)
) as values_to_insert(locale, name)
on conflict (category_id, locale) do nothing;
