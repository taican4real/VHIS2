import { PageBanner } from "@/components/layout/page-banner"
import { SectionHeading } from "@/components/layout/section-heading"
import { Section } from "@/components/layout/section"
import { Container } from "@/components/layout/container"
import { Stack } from "@/components/layout/stack"
import { Grid } from "@/components/layout/grid"
import { DivisionCard } from "@/components/content/division-card"
import { CTASection } from "@/components/layout/cta-section"
import { Typography } from "@/components/ui/typography"
import { Link } from "@/components/ui/link"

export default function SchoolsPage() {
  return (
    <main id="main" className="space-y-0">
      <PageBanner
        title="Our Schools"
        description="Victory Heritage International School — three divisions, one community."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Schools", href: "/schools" }]}
      />

      <Section padding="desktop">
        <Container>
          <Stack space="8">
            <SectionHeading
              eyebrow="Our Divisions"
              heading="Three divisions, one school community."
              description="Nursery, Primary and Secondary — each with its own character and programmes."
            />

            <Grid cols="desktop" gap="desktop">
              <DivisionCard
                number="01"
                kicker="Early years foundation"
                title="Nursery School"
                description="A welcoming beginning shaped around curiosity, care and early discovery."
                href="/schools/nursery"
              />
              <DivisionCard
                number="02"
                kicker="Confident, capable learners"
                title="Primary School"
                description="A supportive next step for growing knowledge, skills and self-belief."
                href="/schools/primary"
              />
              <DivisionCard
                number="03"
                kicker="Junior & senior secondary"
                title="Secondary School"
                description="Developing independent thinkers who are ready to take on new challenges and possibilities."
                href="/schools/secondary"
              />
            </Grid>

            <Stack space="6">
              <Link href="/schools/nursery" className="button button--outline">
                Learn More About Nursery <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/schools/primary" className="button button--outline">
                Learn More About Primary <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/schools/secondary" className="button button--outline">
                Learn More About Secondary <span aria-hidden="true">↗</span>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section padding="desktop">
        <CTASection
          eyebrow="Ready to find the right fit?"
          heading="Explore our divisions and discover where your child belongs."
          primaryLink={{ href: "/admissions", label: "Explore admissions" }}
          secondaryLink={{ href: "/school-life", label: "Learn about school life" }}
        />
      </Section>
    </main>
  )
}
