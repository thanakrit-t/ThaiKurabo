import Link from 'next/link';
import Image from 'next/image';
import { requestPasswordReset } from '@/app/auth/actions';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ForgotPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const message = Array.isArray(params.message) ? params.message[0] : params.message;

  return (
    <main className="simple-auth">
      <Link href="/"><Image src="/brand/kurabo-logo.png" alt="KURABO" width={200} height={62} /></Link>
      <h1>Reset your password.</h1>
      <p>Enter your email. We will send instructions if the account is eligible.</p>
      <form className="auth-form" action={requestPasswordReset}>
        {error && <p role="alert" className="form-message form-error">{error}</p>}
        {message && <p role="status" className="form-message form-success">{message}</p>}
        <label>Email address<input name="email" type="email" placeholder="name@company.com" autoComplete="email" required /></label>
        <button className="button button-primary" type="submit">Send reset instructions</button>
      </form>
      <Link href="/login">Back to sign in</Link>
    </main>
  );
}
