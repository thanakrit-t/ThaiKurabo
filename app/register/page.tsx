import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { signUp } from '@/app/auth/actions';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <main className="auth-page">
      <section className="auth-panel technical-surface">
        <Link href="/"><Image src="/brand/kurabo-logo.png" alt="KURABO" width={220} height={68} priority /></Link>
        <div className="auth-copy"><h1>Create your account.</h1><p>One account lets you contact us, apply for jobs, and track every submission.</p></div>
        <form className="auth-form" action={signUp}>
          {error && <p role="alert" className="form-message form-error">{error}</p>}
          <div className="field-row">
            <label>First name<input name="firstName" placeholder="First name" autoComplete="given-name" required /></label>
            <label>Last name<input name="lastName" placeholder="Last name" autoComplete="family-name" required /></label>
          </div>
          <label>Email address<input name="email" type="email" placeholder="name@company.com" autoComplete="email" required /></label>
          <label>Password<input name="password" type="password" placeholder="At least 8 characters" minLength={8} autoComplete="new-password" required /></label>
          <label>Preferred language<select name="locale" defaultValue="en"><option value="en">English</option><option value="th">ไทย</option><option value="ja">日本語</option></select></label>
          <label className="check-field"><input name="privacyAccepted" type="checkbox" required /> I accept the privacy notice and terms of use.</label>
          <button type="submit" className="button button-primary">Create account<ArrowIcon /></button>
          <p>Already registered? <Link href="/login">Sign in</Link></p>
        </form>
      </section>
      <aside className="auth-image"><Image src="/images/about.png" fill alt="Thai Kurabo" priority sizes="50vw" /><p>WOVEN FOR WHAT COMES NEXT</p></aside>
    </main>
  );
}
