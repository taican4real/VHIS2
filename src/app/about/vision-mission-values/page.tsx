import { PageBanner } from '@/components/layout/page-banner'
import { SectionHeading } from '@/components/layout/section-heading'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Grid } from '@/components/layout/grid'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/components/ui/link'

export default function VisionMissionValuesPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="Vision, Mission & Core Values"
        description="The guiding statements that shape Victory Heritage International School."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About VHIS', href: '/about' },
          { label: 'Vision, Mission & Values', href: '/about/vision-mission-values' },
        ]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="10">
            <SectionHeading
              eyebrow="About Us"
              heading="Our Guiding Statements"
              description="Approved wording from VHIS management."
            />

            <article className="vmv-card">
              <Typography variant="h4">Vision</Typography>
              <Typography variant="body">
                [Vision statement to be confirmed by VHIS management.]
              </Typography>
            </article>

            <article className="vmv-card">
              <Typography variant="h4">Mission</Typography>
              <Typography variant="body">
                [Mission statement to be confirmed by VHIS management.]
              </Typography>
            </article>

            <Grid cols="desktop" gap="desktop">
              <article className="vmv-card">
                <Typography variant="h4">Core Values</Typography>
                <Typography variant="body">
                  [Core values to be confirmed by VHIS management.]
                </Typography>
              </article>
            </Grid>

            <div className="vmv-divider" />

            <Stack space="6">
              <Link href="/about" className="button button--outline">
                Back to About VHIS <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/schools" className="button button--outline">
                Our Schools <span aria-hidden="true">↗</span>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </main>
  )
}

import { CTASection } from '@/components/layout/cta-section'