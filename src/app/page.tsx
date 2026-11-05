import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { Grid } from '@/components/layout/grid'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { Hero } from '@/components/homepage/hero'
import { DivisionCarousel } from '@/components/homepage/division-carousel'
import { DivisionCard } from '@/components/content/division-card'

const divisionSlides = [
  {
    division: 'Nursery School',
    title: 'A Strong Foundation for a Brighter Future.',
    description: 'A welcoming beginning shaped around curiosity, care and early discovery.',
    link: '/nursery',
    linkText: 'Discover Nursery',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1500&q=90',
    alt: 'Representative image of a young child exploring a classroom activity',
  },
  {
    division: 'Primary School',
    title: 'Building Knowledge, Confidence and Character.',
    description: 'A supportive next step for growing knowledge, skills and self-belief.',
    link: '/primary',
    linkText: 'Discover Primary',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1500&q=90',
    alt: 'Representative image of school-age children learning together',
  },
  {
    division: 'Secondary School',
    title: 'Preparing Tomorrow\'s Leaders Today.',
    description: 'A place to deepen understanding, develop independence and look ahead.',
    link: '/secondary',
    linkText: 'Discover Secondary',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1500&q=90',
    alt: 'Representative image of secondary-age students collaborating in class',
  },
]

export default function HomePage() {
  return (
    <main id="main" className="space-y-0">
      <Section padding="desktop">
        <Container>
          <Typography variant="eyebrow">
            <span className="eyebrow__rule"></span>
            One school community. Every stage of the journey.
          </Typography>
          <Stack space="4">
            <Hero
              eyebrow="A place to grow, learn &amp; belong"
              heading="A brighter future starts <em>together.</em>"
              description="An engaging school community for every step of the journey—from the first discovery in nursery to the confidence and curiosity that carry students forward."
              primaryCta={{
                href: '/admissions#enquiry',
                label: 'Make an admission enquiry',
              }}
              secondaryCta={{
                href: '/application-form',
                label: 'Preview application form (draft)',
              }}
            />
            <DivisionCarousel slides={divisionSlides} />
          </Stack>
        </Container>
      </Section>

      <Section padding="desktop">
        <Container narrow>
          <Stack space="8">
            <Typography variant="h2">
              One community, three <em>divisions.</em>
            </Typography>
            <Grid cols="desktop" gap="desktop">
              <DivisionCard
                number="01"
                kicker="Early years foundation"
                title="Nursery School"
                description="A welcoming beginning shaped around curiosity, care and early discovery."
                href="/nursery"
              />
              <DivisionCard
                number="02"
                kicker="Confident, capable learners"
                title="Primary School"
                description="A supportive next step for growing knowledge, skills and self-belief."
                href="/primary"
              />
              <DivisionCard
                number="03"
                kicker="Junior &amp; senior secondary"
                title="Secondary School"
                description="Developing independent thinkers who are ready to take on new challenges and possibilities."
                href="/secondary"
              />
            </Grid>
            <Stack space="4">
              <Typography variant="body">
                Explore all divisions and find the right fit for your child&rsquo;s journey.
              </Typography>
              <Link variant="text" href="/schools" className="button button--outline">
                Explore all school divisions <span aria-hidden="true">↗</span>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </main>
  )
}