import { PageBanner } from '@/components/layout/page-banner'
import { SectionHeading } from '@/components/layout/section-heading'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/components/ui/link'

export default function HistoryPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="School History"
        description="The establishment, background and development of Victory Heritage International School."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About VHIS', href: '/about' },
          { label: 'School History', href: '/about/history' },
        ]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="8">
            <SectionHeading
              eyebrow="Our Story"
              heading="A Legacy of Learning"
              description="All dates and historical claims are subject to verification by VHIS management."
            />

            <Typography variant="body-large">
              Victory Heritage International School was established with a vision to provide modern, premium
              education that combines academic excellence with student-centred development.
            </Typography>

            <article className="history-section">
              <Typography variant="h4">Establishment</Typography>
              <Typography variant="body">
                [School establishment date and founding story to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="history-section">
              <Typography variant="h4">Growth and Development</Typography>
              <Typography variant="body">
                [School growth, campus development and expansion milestones to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="history-section">
              <Typography variant="h4">Milestones</Typography>
              <Typography variant="body">
                [Important milestones and achievements to be verified by VHIS.]
              </Typography>
            </article>
          </Stack>
        </Container>
      </Section>

      <Section padding="desktop">
        <Container>
          <Link href="/about" className="button button--outline">
            Back to About VHIS <span aria-hidden="true">↗</span>
          </Link>
        </Container>
      </Section>
    </main>
  )
}

import { CTASection } from '@/components/layout/cta-section'