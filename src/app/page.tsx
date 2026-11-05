import Link from 'next/link'

export default function HomePage() {
  return (
    <main id="main" className="space-y-12">
      <section className="announcement">
        <div className="container announcement__inner">
          <span>One school community. Every stage of the journey.</span>
          <Link href="/admissions">Explore admissions <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow"><span className="eyebrow__rule"></span>A place to grow, learn &amp; belong</p>
            <h1>A brighter future<br /><em>starts together.</em></h1>
            <p className="hero__intro">An engaging school community for every step of the journey—from the first discovery in nursery to the confidence and curiosity that carry students forward.</p>
            <div className="hero__actions">
              <Link href="/admissions#enquiry" className="button">Make an admission enquiry <span aria-hidden="true">↗</span></Link>
              <Link href="/application-form" className="text-link">Preview application form (draft)</Link>
            </div>
            <div className="hero__note"><span className="note-dot" aria-hidden="true"></span> Nursery · Primary · Secondary</div>
          </div>
          <div className="hero-showcase" aria-label="Explore our three school divisions">
            <div className="hero-showcase__image" id="slide-image" role="img" aria-label="Representative image of a welcoming early learning classroom" />
            <div className="hero-showcase__shade" />
            <div className="hero-showcase__top">
              <span className="showcase-label">A school for every chapter</span>
              <span className="showcase-count"><span id="slide-number">01</span><span className="showcase-count__slash">/</span>03</span>
            </div>
            <div className="hero-showcase__content" aria-live="polite" aria-atomic="true">
              <p className="hero-showcase__division" id="slide-division">Nursery School</p>
              <h2 id="slide-title">A Strong Foundation for a Brighter Future.</h2>
              <p className="hero-showcase__description" id="slide-description">A welcoming beginning shaped around curiosity, care and early discovery.</p>
              <a href="/nursery" className="button button--small" id="slide-link">Discover Nursery <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-showcase__controls">
              <button id="previous-slide" aria-label="Previous division slide">←</button>
              <div className="carousel-dots" role="tablist" aria-label="Division slides">
                {[0, 1, 2].map((i) => (
                  <button key={i} role="tab" aria-selected={i === 0} aria-controls={`slide-${i}`} className="carousel-dot" data-slide={i} />
                ))}
              </div>
              <button id="next-slide" aria-label="Next division slide">→</button>
            </div>
          </div>
        </div>
      </section>

      <section className="schools">
        <div className="container">
          <p className="eyebrow"><span className="eyebrow__rule"></span>Our schools</p>
          <h2>One community, three <em>divisions.</em></h2>
          <div className="school-grid">
            <article className="school-card">
              <div className="school-card__number">01</div>
              <div className="school-card__body">
                <p className="card-kicker">Early years foundation</p>
                <h3>Nursery School</h3>
                <p>A welcoming beginning shaped around curiosity, care and early discovery.</p>
                <Link href="/nursery" className="text-link">Explore Nursery <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="school-card">
              <div className="school-card__number">02</div>
              <div className="school-card__body">
                <p className="card-kicker">Confident, capable learners</p>
                <h3>Primary School</h3>
                <p>A supportive next step for growing knowledge, skills and self-belief.</p>
                <Link href="/primary" className="text-link">Explore Primary <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="school-card">
              <div className="school-card__number">03</div>
              <div className="school-card__body">
                <p className="card-kicker">Junior &amp; senior secondary</p>
                <h3>Secondary School</h3>
                <p>Developing independent thinkers who are ready to take on new challenges and possibilities.</p>
                <Link href="/secondary" className="text-link">Explore Secondary <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </div>
          <div className="section-action">
            <Link href="/schools" className="text-link">Explore all school divisions <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  )
}