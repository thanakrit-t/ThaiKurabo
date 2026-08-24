import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return <main className="system-page"><span>404</span><h1>The thread ends here.</h1><p>The page may have moved, changed, or never existed.</p><Link href="/" className="button button-primary">Return home<ArrowIcon /></Link></main>;
}
