"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="system-page"><span>TK / ERROR</span><h1>Something interrupted the process.</h1><p>Please try again. If the problem continues, contact support with reference TK-UI-001.</p><button className="button button-primary" onClick={reset}>Try again</button></main>;
}
