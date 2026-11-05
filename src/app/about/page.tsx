import { PageBanner } from '@/components/layout/page-banner'
import { SectionHeading } from '@/components/layout/section-heading'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { Stack } from '@/components/layout/stack'
import { Grid } from '@/components/layout/grid'
import { CTASection } from '@/components/layout/cta-section'
import { Typography } from '@/components/ui/typography'
import { Link } from '@/components/ui/link'

export default function AboutPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="About VHIS"
        description="Victory Heritage International School — one school community for nursery, primary and secondary education."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About VHIS', href: '/about' }]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="8">
            <SectionHeading
              eyebrow="About Us"
              heading="Welcome to Victory Heritage International School"
              description="One school community for every stage of the learning journey—from nursery to secondary."
            />

            <Typography variant="body-large">
              Victory Heritage International School is a modern, premium education institution dedicated to
              academic excellence, institutional credibility, and student-centred development. We provide a
              nurturing environment where every child can grow, learn and belong.
            </Typography>

            <Grid cols="desktop" gap="desktop">
              <article className="about-card">
                <Typography variant="h4">Our Story</Typography>
                <Typography variant="body">
                  Founded on the belief that every child deserves a strong foundation, VHIS has grown into a
                  trusted name in international education.
                </Typography>
              </article>
              <article className="about-card">
                <Typography variant="h4">Educational Philosophy</Typography>
                <Typography variant="body">
                  We believe in developing independent thinkers who are ready to take on new challenges and
                  possibilities, from early years through to secondary school.
                </Typography>
              </article>
              <article className="about-card">
                <Typography variant="h4">Our Community</Typography>
                <Typography variant="body">
                  One school community spanning Nursery, Primary and Secondary—united by purpose and shared values.
                </Typography>
              </article>
            </Grid>

            <div className="about-divider" />

            <Stack space="6">
              <Link href="/about/history" className="button button--outline">
                School History <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/about/vision-mission-values" className="button button--outline">
                Vision, Mission & Values <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/schools" className="button button--outline">
                Our Schools <span aria-hidden="true">↗</span>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section padding="desktop">
        <CTASection
          eyebrow="Ready to join us?"
          heading="Take the next step with confidence."
          description="We&rsquo;d be glad to help your family learn more about the VHIS community."
          primaryLink={{ href: '/admissions', label: 'Explore admissions' }}
          secondaryLink={{ href: '/admissions#enquiry', label: 'Make an enquiry' }}
        />
      </Section>
    </main>
  )
}
