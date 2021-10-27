import { majorScale, Pane } from 'evergreen-ui'
import React, { FC } from 'react'
import Container from '../components/container'
import FeatureSection from '../components/featureSection'
import Hero from '../components/hero'
import HomeNav from '../components/homeNav'
import { home } from '../content'

const Home: FC<{ content: { hero: any; features: any[] } }> = ({ content }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
        <Container>
          <Hero content={content.hero} />
        </Container>
      </header>
      <main>
        {content.features.map((feature, i) => (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            body={feature.body}
            image="/docs.png"
            invert={i % 2 === 0}
          />
        ))}
      </main>
      <footer>
        <Pane background="overlay" paddingY={majorScale(9)}>
          <Container>
            <Pane></Pane>
          </Container>
        </Pane>
      </footer>
    </Pane>
  )
}

/**
 * Should really get this content from our CMS
 */

export const getStaticProps = (ctx) => {
  return {
    props: {
      content: ctx.preview ? home.draft : home.published,
    },
  }
}

Home.defaultProps = {
  content: {
    features: [{ title: 'default feature', body: 'default body' }],
    hero: { title: 'default title', body: 'default body' },
  },
}

export default Home
