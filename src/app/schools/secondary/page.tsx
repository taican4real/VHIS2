import { PageBanner } from '@/components/layout/page-banner'
import { SectionHeading } from '@/components/layout/section-heading'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/components/ui/link'

export default function SecondaryPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="Secondary School"
        description="Secondary education at Victory Heritage International School."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Schools', href: '/schools' },
          { label: 'Secondary Division', href: '/schools/secondary' },
        ]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="8">
            <SectionHeading
              eyebrow="Secondary Education"
              heading="Preparing Tomorrow's Leaders Today"
              description="Developing independent thinkers who are ready to take on new challenges and possibilities."
            />

            <Typography variant="body-large">
              Our Secondary programme prepares students for future success. We focus on developing the
              independence, critical thinking and leadership skills that will enable students to take on new
              challenges and possibilities.
            </Typography>

            <article className="secondary-section">
              <Typography variant="h4">Junior Secondary School (JSS 1-3)</Typography>
              <Typography variant="body">
                [Junior Secondary curriculum and details to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="secondary-section">
              <Typography variant="h4">Senior Secondary School (SSS 1-3)</Typography>
              <Typography variant="body">
                [Senior Secondary curriculum and details to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="secondary-section">
              <Typography variant="h4">Teaching and Learning Approach</Typography>
              <Typography variant="body">
                [Secondary teaching and learning approach details to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="secondary-section">
              <Typography variant="h4">Laboratories and ICT Facilities</Typography>
              <Typography variant="body">
                [Secondary laboratory and ICT facilities details to be confirmed by VHIS.]
              </Typography>
            </article>
          </Stack>
        </Container>
      </Section>

      <Section padding="desktop">
        <Container>
          <Link href="/admissions" className="button button--primary">
            Learn About Admission Enquiries <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/schools" className="button button--outline">
            Return to Our Schools <span aria-hidden="true">↗</span>
          </Link>
        </Container>
      </Section>
    </main>
  )
}

import { CTASection } from '@/components/layout/cta-section'