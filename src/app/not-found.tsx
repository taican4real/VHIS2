import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="space-y-6">
      <section className="container">
        <h1>Page not found</h1>
        <p>The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
        <Link href="/" className="button">Return to homepage <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}