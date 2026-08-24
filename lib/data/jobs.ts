import type { Locale } from '@/lib/site-data';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';

export type PublishedJob = {
  id: string;
  title: string;
  slug: string;
  location: string;
  employmentType: string;
};

const previewJobs: PublishedJob[] = [
  { id: 'preview-1', title: 'Production Engineer', slug: 'production-engineer', location: 'Chonburi', employmentType: 'Full time' },
  { id: 'preview-2', title: 'Quality Assurance Officer', slug: 'quality-assurance-officer', location: 'Thailand', employmentType: 'Full time' },
  { id: 'preview-3', title: 'Maintenance Technician', slug: 'maintenance-technician', location: 'Thailand', employmentType: 'Full time' },
];

export async function getPublishedJobs(locale: Locale): Promise<PublishedJob[]> {
  if (!isSupabaseConfigured()) return previewJobs;

  const supabase = await createClient();
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('id, location_id, employment_type_id')
    .order('published_at', { ascending: false });

  if (error) throw new Error(`Unable to load published jobs: ${error.message}`);
  if (!jobs?.length) return [];

  const jobIds = jobs.map((job) => job.id);
  const locationIds = jobs.flatMap((job) => job.location_id ? [job.location_id] : []);
  const employmentTypeIds = jobs.flatMap((job) => job.employment_type_id ? [job.employment_type_id] : []);
  const locales = locale === 'th' ? ['th'] : [locale, 'th'];

  const [translationsResult, locationsResult, typesResult] = await Promise.all([
    supabase.from('job_translations').select('job_id, locale, title, slug').in('job_id', jobIds).in('locale', locales),
    locationIds.length
      ? supabase.from('job_location_translations').select('location_id, locale, name').in('location_id', locationIds).in('locale', locales)
      : Promise.resolve({ data: [], error: null }),
    employmentTypeIds.length
      ? supabase.from('employment_type_translations').select('employment_type_id, locale, name').in('employment_type_id', employmentTypeIds).in('locale', locales)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const queryError = translationsResult.error || locationsResult.error || typesResult.error;
  if (queryError) throw new Error(`Unable to load job translations: ${queryError.message}`);

  const preferred = <T extends { locale: string }>(rows: T[]) =>
    rows.find((row) => row.locale === locale) ?? rows.find((row) => row.locale === 'th');

  return jobs.flatMap((job) => {
    const translation = preferred((translationsResult.data ?? []).filter((row) => row.job_id === job.id));
    if (!translation) return [];
    const location = preferred((locationsResult.data ?? []).filter((row) => row.location_id === job.location_id));
    const employmentType = preferred((typesResult.data ?? []).filter((row) => row.employment_type_id === job.employment_type_id));
    return [{
      id: job.id,
      title: translation.title,
      slug: translation.slug,
      location: location?.name ?? 'Thailand',
      employmentType: employmentType?.name ?? 'Full time',
    }];
  });
}
