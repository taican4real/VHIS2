import { PageBanner } from '@/components/layout/page-banner'
import { SectionHeading } from '@/components/layout/section-heading'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/components/ui/link'

export default function NurseryPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="Nursery School"
        description="Early childhood education at Victory Heritage International School."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Schools', href: '/schools' },
          { label: 'Nursery Division', href: '/schools/nursery' },
        ]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="8">
            <SectionHeading
              eyebrow="Early Childhood Education"
              heading="A Strong Foundation for a Brighter Future"
              description="Nursery School at VHIS provides a welcoming beginning shaped around curiosity, care and early discovery."
            />

            <Typography variant="body-large">
              Our Nursery programme is designed to support the earliest learners as they take their first steps
              in a school environment. We focus on developing curiosity, confidence and the foundational skills
              that will carry students forward through their educational journey.
            </Typography>

            <article className="nursery-section">
              <Typography variant="h4">Our Approach</Typography>
              <Typography variant="body">
                [Nursery curriculum and approach details to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="nursery-section">
              <Typography variant="h4">Learning Environment</Typography>
              <Typography variant="body">
                [Nursery facilities and learning environment details to be confirmed by VHIS.]
              </Typography>
            </article>

            <article className="nursery-section">
              <Typography variant="h4">Early Childhood Activities</Typography>
              <Typography variant="body">
                [Early childhood learning activities to be confirmed by VHIS.]
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