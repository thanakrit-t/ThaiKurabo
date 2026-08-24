import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { signIn } from '@/app/auth/actions';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const error = first(params.error);
  const message = first(params.message);

  return (
    <main className="auth-page">
      <section className="auth-panel technical-surface">
        <Link href="/"><Image src="/brand/kurabo-logo.png" alt="KURABO" width={220} height={68} priority /></Link>
        <div className="auth-copy"><h1>Welcome back.</h1><p>Sign in to contact Thai Kurabo, submit an application, and follow your requests.</p></div>
        <form className="auth-form" action={signIn}>
          {error && <p role="alert" className="form-message form-error">{error}</p>}
          {message && <p role="status" className="form-message form-success">{message}</p>}
          <label>Email address<input name="email" type="email" placeholder="name@company.com" autoComplete="email" required /></label>
          <label>Password<span className="label-action"><Link href="/forgot-password">Forgot password?</Link></span><input name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required /></label>
          <button type="submit" className="button button-primary">Sign in<ArrowIcon /></button>
          <p>No account yet? <Link href="/register">Create an account</Link></p>
        </form>
      </section>
      <aside className="auth-image"><Image src="/images/technology-hero.png" fill alt="Textile technology at Thai Kurabo" priority sizes="50vw" /><p>ONE THREAD AT A TIME</p></aside>
    </main>
  );
}
