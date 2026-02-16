import { motion } from 'framer-motion'

import { services } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { fadeIn, textVariant } from '../utils/motion'

import ServiceCard from './ServiceCard'

const About = () => {
  return (
    <div className="-mt-[4rem]">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]"
      >
        I graduated from the{' '}
        <a href="https://www.utoronto.ca/" className="inline-link">
          University of Toronto
        </a>{' '}
        with a specialist in{' '}
        <a
          href="https://utsc.calendar.utoronto.ca/specialist-program-computer-science-software-engineering-stream-science-scspe0795"
          className="inline-link"
        >
          Software Engineering
        </a>
        , a major in Philosophy and minor in Mathematics. <br />
        <br />I have a passion for the craft of software development, with a
        particular specialization in developer tooling and performance
        optimization. If your codebase and developer tooling are a mess and in
        need of some TLC, or your app backend is out of date and slow, I&apos;m
        your person!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  )
}

const AboutSection = SectionWrapper(About, 'about')
AboutSection.displayName = 'AboutSection'
export default AboutSection
