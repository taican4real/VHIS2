import { PageBanner } from '@/components/layout/page-banner'
import { SectionHeading } from '@/components/layout/section-heading'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/components/ui/link'

export default function PrimaryPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="Primary School"
        description="Primary education at Victory Heritage International School."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Schools', href: '/schools' },
          { label: 'Primary Division', href: '/schools/primary' },
        ]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="8">
            <SectionHeading
              eyebrow="Primary Education"
              heading="Building Knowledge, Confidence and Character"
              description="A supportive next step for growing knowledge, skills and self-belief."
            />

            <Typography variant="body-large">
              Our Primary programme supports the continued development of confident, capable learners. We
              focus on developing knowledge, skills and self-belief that prepare students for the next stage
              of their educational journey.
            </Typography>

            <article className="primary-section">
              <Typography variant="h4">Curriculum and Learning</Typography>
              <Typography variant="body">
                [Primary curriculum and learning approach details to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="primary-section">
              <Typography variant="h4">Teaching and Learning Activities</Typography>
              <Typography variant="body">
                [Primary teaching and learning activities to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="primary-section">
              <Typography variant="h4">Extracurricular Activities</Typography>
              <Typography variant="body">
                [Primary extracurricular activities to be confirmed by VHIS.]
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