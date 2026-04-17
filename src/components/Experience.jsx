import { motion } from 'motion/react'
import { VerticalTimeline } from 'react-vertical-timeline-component'

import 'react-vertical-timeline-component/style.min.css'
import { experiences } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { textVariant } from '../utils/motion'

import ExperienceCard from './ExperienceCard'

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} sm:pl-16 pl-[2rem]`}>
          What I&apos;ve done so far
        </p>
        <h2 className={`${styles.sectionHeadText} sm:pl-16 pl-[2rem]`}>
          Work Experience
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

const WrappedExperience = SectionWrapper(Experience, 'work')
WrappedExperience.displayName = 'Experience'
export default WrappedExperience
