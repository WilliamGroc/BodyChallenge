import Link from "next/link";
import Button from "./_components/button";

export default function Home() {
  return <main>
    <section>
      <Link href="/exercice/create"><Button>Create exercice</Button></Link>
    </section>
  </main>
}
