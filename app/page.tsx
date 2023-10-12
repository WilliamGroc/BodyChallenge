import { SessionProvider } from 'next-auth/react'

export default function Home() {
  return <main>
    <nav>
      <div>
        Body challenge
      </div>
      <div><a href="/api/auth/signin">Login</a></div>
    </nav>
    <section></section>
  </main>
}
